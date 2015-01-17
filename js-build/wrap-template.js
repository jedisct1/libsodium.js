var sodium = (function () {
	'use strict';
	var exports = {};

	var libsodium = require('libsodium');
	var result_encoding = 'uint8array';

    (function() {
        var implementation_name = libsodium.Runtime.addFunction(function() {
            return "js";
        });

        var random = libsodium.Runtime.addFunction(function() {
            return (libsodium.randomValues(1)[0] | 0) & 0xffffffff;
        });

        var stir = libsodium.Runtime.addFunction(function() {
            libsodium.randomValues = null;
            try {
                function randomValuesStandard($len) {
                    $len = $len | 0;
                    var buf = new Int8Array($len);
                    window.crypto.getRandomValues(buf);
                    return buf;
                }
                randomValuesStandard(8);
                libsodium.randomValues = randomValuesStandard;
            } catch (e) {
                try {
                    var crypto = require('crypto');
                    function randomValuesIOJS($len) {
                        $len = $len | 0;
                        return crypto.randomBytes($len);
                    }
                    randomValuesIOJS(8);
                    libsodium.randomValues = randomValuesIOJS;
                } catch (e) {
                    throw 'No secure random number generator found';
                }
            }
            return 0;
        });

        var uniform = libsodium.Runtime.addFunction(function($upper_bound) {
            $upper_bound = $upper_bound | 0;
            if ($upper_bound >>> 0 < 2) {
                return 0;
            }
            var min = ((0 - $upper_bound | 0) >>> 0) % ($upper_bound >>> 0) | 0, r;
            do {
                r = libsodium._randombytes_random();
            } while (r >>> 0 < min >>> 0);

            return (r >>> 0) % ($upper_bound >>> 0) | 0;
        });

        var buf = libsodium.Runtime.addFunction(function($buf, $len) {
            $buf = $buf | 0;
            $len = $len | 0;
            libsodium.writeArrayToMemory(libsodium.randomValues($len), $buf);
        });

        var close = libsodium.Runtime.addFunction(function() {
            return 0;
        });

        var st = libsodium._malloc(6 * 4);
        libsodium.setValue(st + 0 * 4, implementation_name, 'i32');
        libsodium.setValue(st + 1 * 4, random, 'i32');
        libsodium.setValue(st + 2 * 4, stir, 'i32');
        libsodium.setValue(st + 3 * 4, uniform, 'i32');
        libsodium.setValue(st + 4 * 4, buf, 'i32');
        libsodium.setValue(st + 5 * 4, close, 'i32');
        libsodium._randombytes_set_implementation(st);
    })();

	libsodium._sodium_init();

	//---------------------------------------------------------------------------
	// Horrifying UTF-8, base64 and hex codecs

	//UTF8 to Uint8Array
	function string_to_Uint8Array(s){
		var escapedStr = unescape(encodeURIComponent(s));

		var latin1 = new Uint8Array(escapedStr.length);
		for (var i = 0; i < escapedStr.length; i++) {
			var c = escapedStr.charCodeAt(i);
			if ((c & 0xff) !== c) throw {message: "Cannot encode string in Latin1", str: s};
			latin1[i] = (c & 0xff);
		}
		return latin1;
	}

	//Uint8Array to UTF8
	function uint8Array_to_String(b){
		var encoded = [];
		for (var i = 0; i < b.length; i++) {
			encoded.push(String.fromCharCode(b[i]));
		}
		encoded = encoded.join('');
		return decodeURIComponent(escape(encoded));
	}

	function to_hex(bs) {
	var encoded = [];
	for (var i = 0; i < bs.length; i++) {
		encoded.push("0123456789abcdef"[(bs[i] >> 4) & 15]);
		encoded.push("0123456789abcdef"[bs[i] & 15]);
	}
	return encoded.join('');
	}

	function from_hex(s) {
		if (!is_hex(s)) throw new TypeError('The provided string doesn\'t look like hex data');
		var result = new Uint8Array(s.length / 2);
		for (var i = 0; i < s.length / 2; i++) {
			result[i] = parseInt(s.substr(2*i,2),16);
		}
		return result;
	}

	function is_hex(s){
		return (typeof s == 'string' && /^([a-f]|[0-9])+$/i.test(s) && s.length % 2 == 0);
	}

	/**
	* Base64 <-> Uint8Array conversion tools.
	* Harvested from MDN:
	* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
	*/
	function b64ToUint6 (nChr) {
		return nChr > 64 && nChr < 91 ?
			nChr - 65
			: nChr > 96 && nChr < 123 ?
			nChr - 71
			: nChr > 47 && nChr < 58 ?
			nChr + 4
			: nChr === 43 ?
			62
			: nChr === 47 ?
			63
			:
			0;
	}

	function base64DecToArr (sBase64, nBlocksSize) {
		var
			sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
			nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);
		for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
			nMod4 = nInIdx & 3;
			nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
			if (nMod4 === 3 || nInLen - nInIdx === 1) {
				for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
					taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
				}
				nUint24 = 0;
			}
		}
		return taBytes;
	}

	/* Base64 string to array encoding */

	function uint6ToB64 (nUint6) {
		return nUint6 < 26 ?
			nUint6 + 65
			: nUint6 < 52 ?
			nUint6 + 71
			: nUint6 < 62 ?
			nUint6 - 4
			: nUint6 === 62 ?
			43
			: nUint6 === 63 ?
			47
			:
			65;
	}

	function base64EncArr (aBytes, noNewLine) {
		var nMod3 = 2, sB64Enc = "";
		for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
			nMod3 = nIdx % 3;
			if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0 && !noNewLine) { sB64Enc += "\r\n"; }
			nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
			if (nMod3 === 2 || aBytes.length - nIdx === 1) {
			sB64Enc += String.fromCharCode(uint6ToB64(nUint24 >>> 18 & 63), uint6ToB64(nUint24 >>> 12 & 63), uint6ToB64(nUint24 >>> 6 & 63), uint6ToB64(nUint24 & 63));
			nUint24 = 0;
			}
		}
		return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==');
	}
	var to_base64 = base64EncArr;
	var from_base64 = base64DecToArr;

	function available_encodings(){
		return ['hex', 'base64', 'utf8', 'uint8array'];
	}

	function set_encoding(enc){
		if (typeof enc != 'string') throw new TypeError('encoding name must be a string');
		if (!is_encoding(enc)) throw new Error(enc + ' encoding is not available');
		result_encoding = enc;
	}

	function get_encoding(){
		return result_encoding;
	}

	function encodeResult(result, optionalEncoding){
		var selectedEncoding = optionalEncoding || result_encoding;
		if (!is_encoding(selectedEncoding)) throw new Error(selectedEncoding + ' encoding is not available');
		if (result instanceof TargetBuffer) {
			var buf = result.extractBytes();
			if (selectedEncoding == 'uint8array') return buf;
			else if (selectedEncoding == 'utf8') return uint8Array_to_String(buf);
			else if (selectedEncoding == 'hex') return to_hex(buf);
			else if (selectedEncoding == 'base64') return to_base64(buf);
			else throw new Error('Internal error: what is encoding "' + selectedEncoding + '"?');
		} else if (typeof result == 'object') { //Composed results. Example : key pairs
			var props = Object.keys(result);
			var encodedResult = {};
			for (var i = 0; i < props.length; i++){
				encodedResult[props[i]] = encodeResult(result[props[i]], selectedEncoding);
			}
			return encodedResult;
		} else if (typeof result == 'string') {
			return result;
		} else { //What to do if we have a result to encode, that is not a buffer nor an object?
			throw new TypeError('Cannot encode result');
		}
	}

	function is_encoding(enc){
		var encs = available_encodings();
		var encFound = false;
		for (var i = 0; i < encs.length; i++) if (encs[i] == enc) encFound = true;
		return encFound;
	}

	//---------------------------------------------------------------------------
	// Allocation

	function MALLOC(nbytes) {
	var result = libsodium._malloc(nbytes);
	if (result === 0) {
		throw {message: "malloc() failed", nbytes: nbytes};
	}
	return result;
	}

	function FREE(pointer) {
	libsodium._free(pointer);
	}

	//---------------------------------------------------------------------------

	function injectBytes(bs, leftPadding) {
	var p = leftPadding || 0;
	var address = MALLOC(bs.length + p);
	libsodium.HEAPU8.set(bs, address + p);
	for (var i = address; i < address + p; i++) {
		libsodium.HEAPU8[i] = 0;
	}
	return address;
	}

	function check_injectBytes(function_name, what, thing, expected_length, leftPadding) {
	check_length(function_name, what, thing, expected_length);
	return injectBytes(thing, leftPadding);
	}

	function extractBytes(address, length) {
	var result = new Uint8Array(length);
	result.set(libsodium.HEAPU8.subarray(address, address + length));
	return result;
	}

	//---------------------------------------------------------------------------

	//Returns the list of functions and constants defined in the wrapped libsodium
	function symbols(){
		return Object.keys(exports).sort();
	}

	function check(function_name, result) {
	if (result !== 0) {
		throw {message: "libsodium." + function_name + " signalled an error"};
	}
	}

	function check_length(function_name, what, thing, expected_length) {
	if (thing.length !== expected_length) {
		throw {message: "libsodium." + function_name + " expected " +
			expected_length + "-byte " + what + " but got length " + thing.length};
	}
	}

	function TargetBuffer(length) {
	this.length = length;
	this.address = MALLOC(length);
	}

	TargetBuffer.prototype.extractBytes = function (offset) {
	var result = extractBytes(this.address + (offset || 0), this.length - (offset || 0));
	FREE(this.address);
	this.address = null;
	return result;
	};

	function free_all(addresses) {
	for (var i = 0; i < addresses.length; i++) {
		FREE(addresses[i]);
	}
	}

	{wraps_here}

	exports.uint8Array_to_String = uint8Array_to_String;
	exports.string_to_Uint8Array = string_to_Uint8Array;
	exports.to_hex              = to_hex;
	exports.from_hex            = from_hex;
	exports.is_hex              = is_hex;
	exports.to_base64           = to_base64;
	exports.from_base64         = from_base64;
	exports.available_encodings = available_encodings;
	exports.set_encoding        = set_encoding;
	exports.get_encoding        = get_encoding;
	exports.symbols             = symbols;
	exports.raw                 = libsodium;
	exports.init                = libsodium._sodium_init;

	{exports_here}

	return exports;
})();

var module = module || { }, exports = module.exports = sodium;
