(function (root, factory) {
	if (typeof process === "object" && typeof process.stdout === "undefined") {
		process.stderr = process.stdout = { write: function() { } };
	}
	if (typeof define === "function" && define.amd) {
		define(["exports", "libsodium"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("libsodium"));
	} else {
		var cb = root.sodium && root.sodium.onload;
		factory((root.sodium = {}), root.libsodium);
		if (typeof cb === "function") {
			cb(root.sodium);
		}
	}
}(this, function (exports, libsodium) {
	"use strict";
	Object.defineProperty(exports, '__esModule', { value: true });

	var output_format = "uint8array";

	libsodium._sodium_init();

	// List of functions and constants defined in the wrapped libsodium
	function symbols() {
		return Object.keys(exports).sort();
	}

	function increment(bytes) {
		if (! bytes instanceof Uint8Array) {
			throw new TypeError("Only Uint8Array instances can be incremented");
		}
        var c = 1 << 8;
		for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            c >>= 8;
            c += bytes[i];
			bytes[i] = c & 0xff;
		}
	}

	function memzero(bytes) {
		if (! bytes instanceof Uint8Array) {
			throw new TypeError("Only Uint8Array instances can be wiped");
		}
		for (var i = 0 | 0, j = bytes.length; i < j; i++) {
			bytes[i] = 0;
		}
	}

	function memcmp(b1, b2) {
		if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
			throw new TypeError("Only Uint8Array instances can be compared");
		}
		if (b1.length !== b2.length) {
			throw new TypeError("Only instances of identical length can be compared");
		}
		for (var d = 0 | 0, i = 0 | 0, j = b1.length; i < j; i++) {
			d |= b1[i] ^ b2[i];
		}
		return d === 0;
	}

	function compare(b1, b2) {
		if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
			throw new TypeError("Only Uint8Array instances can be compared");
		}
		if (b1.length !== b2.length) {
			throw new TypeError("Only instances of identical length can be compared");
		}
		for (var gt = 0 | 0, eq = 1 | 1, i = 0 | 0, j = b1.length; i < j; i++) {
            gt |= ((b2[i] - b1[i]) >> 8) & eq;
            eq &= ((b2[i] ^ b1[i]) - 1) >> 8;
		}
		return (gt + gt + eq) - 1;
	}

	//---------------------------------------------------------------------------
	// Codecs

	function from_string(str) {
		if (typeof TextEncoder === "function") {
			return new TextEncoder("utf-8").encode(str);
		}
		str = unescape(encodeURIComponent(str));
		var bytes = new Uint8Array(str.length);
		for (var i = 0; i < str.length; i++) {
			bytes[i] = str.charCodeAt(i);
		}
		return bytes;
	}

	function to_string(bytes) {
		if (typeof TextDecoder === "function") {
			return new TextDecoder("utf-8", {fatal: true}).decode(bytes);
		}

		try {
			return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
		}
		catch (_) {
			throw new TypeError("The encoded data was not valid.");
		}
	}

	function from_hex(str) {
		if (!is_hex(str)) throw new TypeError("The provided string doesn't look like hex data");
		var result = new Uint8Array(str.length / 2);
		for (var i = 0; i < str.length; i += 2) {
			result[i >>> 1] = parseInt(str.substr(i, 2), 16);
		}
		return result;
	}

	function to_hex(bytes) {
		var str = "", b, c, x;
		for (var i = 0; i < bytes.length; i++) {
			c = bytes[i] & 0xf;
			b = bytes[i] >>> 4;
			x = (87 + c + (((c - 10) >> 8) & ~38)) << 8 |
			    (87 + b + (((b - 10) >> 8) & ~38));
			str += String.fromCharCode(x & 0xff) + String.fromCharCode(x >>> 8);
		}
		return str;
	}

	function is_hex(str) {
		return (typeof str === "string" && /^[0-9a-f]+$/i.test(str) && str.length % 2 === 0);
	}

	function from_base64(sBase64, nBlocksSize) {
		function _b64ToUint6(nChr) {
			return nChr > 64 && nChr < 91 ?
				nChr - 65 : nChr > 96 && nChr < 123 ?
				nChr - 71 : nChr > 47 && nChr < 58 ?
				nChr + 4 : nChr === 43 ?
				62 : nChr === 47 ?
				63 :
				0;
		}
		var
			sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
			nInLen = sB64Enc.length,
			nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
			taBytes = new Uint8Array(nOutLen);
		for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
			nMod4 = nInIdx & 3;
			nUint24 |= _b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
			if (nMod4 === 3 || nInLen - nInIdx === 1) {
				for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
					taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
				}
				nUint24 = 0;
			}
		}
		return taBytes;
	}

	function to_base64(aBytes, noNewLine) {
		function _uint6ToB64(nUint6) {
			return nUint6 < 26 ?
				nUint6 + 65 : nUint6 < 52 ?
				nUint6 + 71 : nUint6 < 62 ?
				nUint6 - 4 : nUint6 === 62 ?
				43 : nUint6 === 63 ?
				47 :
				65;
		}
		if (typeof aBytes === "string") {
			throw new Exception("input has to be an array");
		}
		var nMod3 = 2,
			sB64Enc = "";
		for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
			nMod3 = nIdx % 3;
			if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0 && !noNewLine) {
				sB64Enc += "\r\n";
			}
			nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
			if (nMod3 === 2 || aBytes.length - nIdx === 1) {
				sB64Enc += String.fromCharCode(_uint6ToB64(nUint24 >>> 18 & 63), _uint6ToB64(nUint24 >>> 12 & 63), _uint6ToB64(nUint24 >>> 6 & 63), _uint6ToB64(nUint24 & 63));
				nUint24 = 0;
			}
		}
		return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==");
	}

	function output_formats() {
		return ["uint8array", "text", "hex", "base64"];
	}

	function _format_output(output, optionalOutputFormat) {
		var selectedOutputFormat = optionalOutputFormat || output_format;
		if (!_is_output_format(selectedOutputFormat)) throw new Error(selectedOutputFormat + " output format is not available");
		if (output instanceof AllocatedBuf) {
			if (selectedOutputFormat === "uint8array") return output.to_Uint8Array();
			else if (selectedOutputFormat === "text") return libsodium.Pointer_stringify(output.address, output.length);
			else if (selectedOutputFormat === "hex") return to_hex(output.to_Uint8Array());
			else if (selectedOutputFormat === "base64") return to_base64(output.to_Uint8Array());
			else throw new Error("What is output format \"" + selectedOutputFormat + "\"?");
		} else if (typeof output === "object") { //Composed output. Example : key pairs
			var props = Object.keys(output);
			var formattedOutput = {};
			for (var i = 0; i < props.length; i++) {
				formattedOutput[props[i]] = _format_output(output[props[i]], selectedOutputFormat);
			}
			return formattedOutput;
		} else if (typeof output === "string") {
			return output;
		} else {
			throw new TypeError("Cannot format output");
		}
	}

	function _is_output_format(format) {
		var formats = output_formats();
		for (var i = 0; i < formats.length; i++) {
			if (formats[i] === format) return true;
		}
		return false;
	}

	function _check_output_format(format) {
		if (!format) {
			return;
		} else if (typeof format !== "string") {
			throw new TypeError("When defined, the output format must be a string");
		} else if (!_is_output_format(format)) {
			throw new Error(format + " is not a supported output format");
		}
	}

	//---------------------------------------------------------------------------
	// Memory management

	// AllocatedBuf: address allocated using _malloc() + length
	function AllocatedBuf(length) {
		this.length = length;
		this.address = _malloc(length);
	}

	// Copy the content of a AllocatedBuf (_malloc()'d memory) into a Uint8Array
	AllocatedBuf.prototype.to_Uint8Array = function () {
		var result = new Uint8Array(this.length);
		result.set(libsodium.HEAPU8.subarray(this.address, this.address + this.length));
		return result;
	};

	// _malloc() a region and initialize it with the content of a Uint8Array
	function _to_allocated_buf_address(bytes) {
		var address = _malloc(bytes.length);
		libsodium.HEAPU8.set(bytes, address);
		return address;
	}

	function _malloc(length) {
		var result = libsodium._malloc(length);
		if (result === 0) {
			throw {
				message: "_malloc() failed",
				length: length
			};
		}
		return result;
	}

	function _free(address) {
		libsodium._free(address);
	}

	function _free_all(addresses) {
		for (var i = 0; i < addresses.length; i++) {
			_free(addresses[i]);
		}
	}

	function _free_and_throw_error(address_pool, err) {
		_free_all(address_pool);
		throw new Error(err);
	}

	function _free_and_throw_type_error(address_pool, err) {
		_free_all(address_pool);
		throw new TypeError(err);
	}

	function _require_defined(address_pool, varValue, varName) {
		if (varValue == undefined) {
			_free_and_throw_type_error(address_pool, varName + " cannot be null or undefined");
		}
	}

	function _any_to_Uint8Array(address_pool, varValue, varName) {
		_require_defined(address_pool, varValue, varName);
		if (varValue instanceof Uint8Array) {
			return varValue;
		} else if (typeof varValue === "string") {
			return from_string(varValue);
		}
		_free_and_throw_type_error(address_pool, "unsupported input type for " + varName);
	}

	{{wraps_here}}

	exports.compare = compare;
	exports.from_base64 = from_base64;
	exports.from_hex = from_hex;
	exports.from_string = from_string;
	exports.increment = increment;
	exports.libsodium = libsodium;
	exports.memcmp = memcmp;
	exports.memzero = memzero;
	exports.output_formats = output_formats;
	exports.symbols = symbols;
	exports.to_base64 = to_base64;
	exports.to_hex = to_hex;
	exports.to_string = to_string;

	{{exports_here}}
	return exports;
}));
