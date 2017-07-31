(function (root, factory) {
    if (typeof process === "object" && typeof process.stdout === "undefined") {
        process.stderr = process.stdout = { write: function() { } };
    }
    if (typeof define === "function" && define.amd) {
        define(["exports", "{{libsodium}}"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("{{libsodium}}"));
    } else {
        var cb = root.sodium && root.sodium.onload;
        factory((root.sodium = {}), root.libsodium);
        if (typeof cb === "function") {
            cb(root.sodium);
        }
    }
}(this, (function (exports, libsodium) {
    "use strict";

    var output_format = "uint8array";

    if (libsodium._sodium_init() !== 0) {
        throw new Error("libsodium was not correctly initialized.");
    }

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

    function add(a, b) {
        if (! a instanceof Uint8Array || ! b instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can added");
        }
        var j = a.length, c = 0 | 0, i = 0 | 0;
        if (b.length != a.length) {
            throw new TypeError("Arguments must have the same length");
        }
        for (i = 0; i < j; i++) {
            c >>= 8;
            c += (a[i] + b[j]);
            a[i] = c & 0xff;
        }
    }

    function is_zero(bytes) {
        if (! bytes instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can be checked");
        }
        var d = 0 | 0;
        for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            d |= bytes[i];
        }
        return d === 0;
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
        for (var gt = 0 | 0, eq = 1 | 1, i = b1.length; i-- > 0;) {
            gt |= ((b2[i] - b1[i]) >> 8) & eq;
            eq &= ((b2[i] ^ b1[i]) - 1) >> 8;
        }
        return (gt + gt + eq) - 1;
    }

    //---------------------------------------------------------------------------
    // Codecs
    //
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

        var toStringChunkSize = 8192,
            numChunks = Math.ceil(bytes.length / toStringChunkSize);
        if (numChunks <= 1) {
            try {
                return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
            }
            catch (_) {
                throw new TypeError("The encoded data was not valid.");
            }
        }
        var totalString = '';
        var sequenceReadOffset = 0;
        for (var i = 0; i < numChunks; i++) {
            var currentChunk =
                Array.prototype.slice.call(bytes,
                                           i * toStringChunkSize + sequenceReadOffset,
                                           (i + 1) * toStringChunkSize + sequenceReadOffset);
            //Depending on how much we have shifted
            if (currentChunk.length == 0) {
                continue;
            }

            //Checking that we didn't cut the buffer in the middle of a UTF8 sequence.
            //If we did, remove the bytes of the "cut" sequence and
            //decrement sequenceReadOffset for each removed byte
            var sequenceDetectionComplete,
                sequenceIndex = currentChunk.length,
                sequenceLength = 0;

            //This loop will read the chunk from its end, looking for sequence start bytes
            do {
                sequenceIndex--;
                var currentByte = currentChunk[sequenceIndex];

                if (currentByte >= 240) { //Beginning of a 4-byte UTF-8 sequence
                    sequenceLength = 4;
                    sequenceDetectionComplete = true;
                } else if (currentByte >= 224) { //Beginning of a 3-byte UTF-8 sequence
                    sequenceLength = 3;
                    sequenceDetectionComplete = true;
                } else if (currentByte >= 192) { //Beginning of a 2-byte UTF-8 sequence
                    sequenceLength = 2;
                    sequenceDetectionComplete = true;
                } else if (currentByte < 128) { //A one byte UTF-8 char
                    sequenceLength = 1;
                    sequenceDetectionComplete = true;
                }
                //The values between [128, 192[ are part of a UTF-8 sequence.
                //The loop will not exit in that case, and will iterate one byte backwards instead
            } while (!sequenceDetectionComplete);

            var extraBytes = sequenceLength - (currentChunk.length - sequenceIndex);
            for (var j = 0; j < extraBytes; j++) {
                sequenceReadOffset--;
                currentChunk.pop();
            }

            totalString += to_string(currentChunk);
        }
        return totalString;
    }

    /* not constant-time */
    function from_hex(str) {
        if (!is_hex(str)) {
            throw new TypeError("The provided string doesn't look like hex data");
        }
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

    function output_formats() {
        return ["uint8array", "text", "hex"];
    }

    function _format_output(output, optionalOutputFormat) {
        var selectedOutputFormat = optionalOutputFormat || output_format;
        if (!_is_output_format(selectedOutputFormat)) {
            throw new Error(selectedOutputFormat + " output format is not available");
        }
        if (output instanceof AllocatedBuf) {
            if (selectedOutputFormat === "uint8array") {
                return output.to_Uint8Array();
            } else if (selectedOutputFormat === "text") {
                return to_string(output.to_Uint8Array());
            } else if (selectedOutputFormat === "hex") {
                return to_hex(output.to_Uint8Array());
            } else {
                throw new Error("What is output format \"" + selectedOutputFormat + "\"?");
            }
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
            if (formats[i] === format) {
                return true;
            }
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
    //
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

    exports.add = add;
    exports.compare = compare;
    exports.from_hex = from_hex;
    exports.from_string = from_string;
    exports.increment = increment;
    exports.is_zero = is_zero;
    exports.libsodium = libsodium;
    exports.memcmp = memcmp;
    exports.memzero = memzero;
    exports.output_formats = output_formats;
    exports.symbols = symbols;
    exports.to_hex = to_hex;
    exports.to_string = to_string;

    {{exports_here}}
    return exports;
})));
