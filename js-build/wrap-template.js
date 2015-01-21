'use strict';
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['libsodium'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('libsodium'));
	} else {
		root.sodium = factory(root.libsodium || Module);
	}
}(this, function (libsodium) {
	var output_format = 'uint8array';

	libsodium._sodium_init();

	// List of functions and constants defined in the wrapped libsodium
	function symbols() {
		return Object.keys(exports).sort();
	}

	//---------------------------------------------------------------------------
	// Codecs

	function from_string(str) {
		if (typeof TextEncoder === 'function') {
			return new TextEncoder('utf-8').encode(str);
		}
		str = unescape(encodeURIComponent(str));
		var bytes = new Uint8Array(str.length);
		for (var i = 0; i < str.length; i++) {
			bytes[i] = str.charCodeAt(i);
		}
		return bytes;
	}

	function from_hex(s) {
		if (!is_hex(s)) throw new TypeError('The provided string doesn\'t look like hex data');
		var result = new Uint8Array(s.length / 2);
		for (var i = 0; i < s.length; i += 2) {
			result[i >>> 1] = parseInt(s.substr(i, 2), 16);
		}
		return result;
	}

	function to_hex(bytes) {
		var str = '', b, c, x;
		for (var i = 0; i < bytes.length; i++) {
			c = bytes[i] & 0xf;
			b = bytes[i] >>> 4;
			x = (87 + c + (((c - 10) >> 31) & -39)) << 8 |
			    (87 + b + (((b - 10) >> 31) & -39));
			str += String.fromCharCode(x & 0xff) + String.fromCharCode(x >>> 8);
        }
        return str;
	}

	function is_hex(s) {
		return (typeof s === 'string' && /^([a-f]|[0-9])+$/i.test(s) && s.length % 2 == 0);
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
		if (typeof aBytes === 'string') {
			throw new Exception('input has to be an array');
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
		return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==');
	}

	function output_formats() {
		return ['uint8array', 'text', 'hex', 'base64'];
	}

	function _formatOutput(output, optionalOutputFormat) {
		var selectedOutputFormat = optionalOutputFormat || output_format;
		if (!_is_output_format(selectedOutputFormat)) throw new Error(selectedOutputFormat + ' output format is not available');
		if (output instanceof AllocatedBuf) {
			if (selectedOutputFormat == 'uint8array') return output.toUint8Array();
			else if (selectedOutputFormat == 'text') return libsodium.Pointer_stringify(output.address, output.length);
			else if (selectedOutputFormat == 'hex') return to_hex(output.toUint8Array());
			else if (selectedOutputFormat == 'base64') return to_base64(output.toUint8Array());
			else throw new Error('What is output format "' + selectedOutputFormat + '"?');
		} else if (typeof output == 'object') { //Composed output. Example : key pairs
			var props = Object.keys(output);
			var formattedOutput = {};
			for (var i = 0; i < props.length; i++) {
				formattedOutput[props[i]] = _formatOutput(output[props[i]], selectedOutputFormat);
			}
			return formattedOutput;
		} else if (typeof output == 'text') {
			return output;
		} else {
			throw new TypeError('Cannot format output');
		}
	}

	function _is_output_format(format) {
		var formats = output_formats();
		for (var i = 0; i < formats.length; i++) {
			if (formats[i] === format) return true;
		}
		return false;
	}

	function _checkOutputFormat(format) {
		if (!format) {
			return;
		} else if (typeof format !== 'string') {
			throw new TypeError('When defined, the output format must be a string');
		} else if (!_is_output_format(format)) {
			throw new Error(format + ' is not a supported output format');
		}
	}

	//---------------------------------------------------------------------------
	// Memory management

	// AllocatedBuf: pointer allocated using _malloc() + length
	function AllocatedBuf(length) {
		this.length = length;
		this.address = _MALLOC(length);
	}

	// Copy the content of a AllocatedBuf (_malloc()'d memory) into a Uint8Array
	AllocatedBuf.prototype.toUint8Array = function () {
		var result = new Uint8Array(this.length);
		result.set(libsodium.HEAPU8.subarray(this.address, this.address + this.length));
		return result;
	};

	// _malloc() a region and initialize it with the content of a Uint8Array
	function _toAllocatedBufAddress(bytes) {
		var address = _MALLOC(bytes.length);
		libsodium.HEAPU8.set(bytes, address);
		return address;
	}

	function _MALLOC(nbytes) {
		var result = libsodium._malloc(nbytes);
		if (result === 0) {
			throw {
				message: "malloc() failed",
				nbytes: nbytes
			};
		}
		return result;
	}

	function _FREE(pointer) {
		libsodium._free(pointer);
	}

	function _free_all(addresses) {
		for (var i = 0; i < addresses.length; i++) {
			_FREE(addresses[i]);
		}
	}

	function _throwError(toDealloc, err) {
		_free_all(toDealloc);
		throw new Error(err);
	}

	function _throwTypeError(toDealloc, err) {
		_free_all(toDealloc);
		throw new TypeError(err);
	}

	function _requireDefined(toDealloc, varValue, varName) {
		if (varValue == undefined) {
			_throwTypeError(toDealloc, varName + ' cannot be null or undefined');
		}
	}

	function _inputToUint8Array(toDealloc, varValue, varName) {
		_requireDefined(toDealloc, varValue, varName);
		if (varValue instanceof Uint8Array) {
			return varValue;
		} else if (typeof varValue === 'string') {
			return from_string(varValue);
		}
		_throwTypeError(toDealloc, 'unsupported input type for ' + varName);
	}

	{{wraps_here}}

	var exports = {
			from_base64: from_base64,
			from_hex: from_hex,
			from_string: from_string,
			libsodium: libsodium,
			output_formats: output_formats,
			symbols: symbols,
			to_base64: to_base64,
			to_hex: to_hex
	};

	{{exports_here}}

	return exports;
}));
