(function (root) {
  function expose_wrappers(exports, libsodiumModule) {
    "use strict";

    var output_format = "uint8array";

    var libsodium;
    var ready = libsodiumModule.ready.then(function () {
      libsodium = libsodiumModule;

      function libsodiumInit() {
        if (libsodium._sodium_init() !== 0) {
          throw new Error("libsodium was not correctly initialized.");
        }

/*{{exports_here}}*/
      }

      /* Test to make sure everything works. If not, switch to asm.js fallback. */

      try {
        libsodiumInit();
        var message = new Uint8Array([98, 97, 108, 108, 115]);
        var nonce = exports.randombytes_buf(exports.crypto_secretbox_NONCEBYTES);
        var key = exports.randombytes_buf(exports.crypto_secretbox_KEYBYTES);
        var encrypted = exports.crypto_secretbox_easy(message, nonce, key);
        var decrypted = exports.crypto_secretbox_open_easy(encrypted, nonce, key);

        if (exports.memcmp(message, decrypted)) {
          return;
        }
      }
      catch (err) { 
        if (libsodium.useBackupModule == null) {
          throw new Error("Both wasm and asm failed to load" + err)
        }
      }

      libsodium.useBackupModule();
      libsodiumInit();
    });

    // List of functions and constants defined in the wrapped libsodium
    function symbols() {
      return Object.keys(exports).sort();
    }

    function increment(bytes) {
      if (!(bytes instanceof Uint8Array)) {
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
      if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array)) {
        throw new TypeError("Only Uint8Array instances can added");
      }
      var j = a.length,
        c = 0 | 0,
        i = 0 | 0;
      if (b.length != a.length) {
        throw new TypeError("Arguments must have the same length");
      }
      for (i = 0; i < j; i++) {
        c >>= 8;
        c += a[i] + b[i];
        a[i] = c & 0xff;
      }
    }

    function is_zero(bytes) {
      if (!(bytes instanceof Uint8Array)) {
        throw new TypeError("Only Uint8Array instances can be checked");
      }
      var d = 0 | 0;
      for (var i = 0 | 0, j = bytes.length; i < j; i++) {
        d |= bytes[i];
      }
      return d === 0;
    }

    function memzero(bytes) {
      if (!(bytes instanceof Uint8Array)) {
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
        throw new TypeError(
          "Only instances of identical length can be compared"
        );
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
        throw new TypeError(
          "Only instances of identical length can be compared"
        );
      }
      for (var gt = 0 | 0, eq = 1 | 1, i = b1.length; i-- > 0;) {
        gt |= ((b2[i] - b1[i]) >> 8) & eq;
        eq &= ((b2[i] ^ b1[i]) - 1) >> 8;
      }
      return gt + gt + eq - 1;
    }

    function pad(buf, blocksize) {
      if (!(buf instanceof Uint8Array)) {
        throw new TypeError("buffer must be a Uint8Array");
      }
      blocksize |= 0;
      if (blocksize <= 0) {
        throw new Error("block size must be > 0");
      }
      var address_pool = [],
        padded,
        padded_buflen_p = _malloc(4),
        st = 1 | 0,
        i = 0 | 0,
        k = buf.length | 0,
        bufx = new AllocatedBuf(k + blocksize);
      address_pool.push(padded_buflen_p);
      address_pool.push(bufx.address);
      for (
        var j = bufx.address, jmax = bufx.address + k + blocksize; j < jmax; j++
      ) {
        libsodium.HEAPU8[j] = buf[i];
        k -= st;
        st = ~(((((k >>> 48) | (k >>> 32) | (k >>> 16) | k) & 0xffff) - 1) >> 16) &
          1;
        i += st;
      }
      if (
        libsodium._sodium_pad(
          padded_buflen_p,
          bufx.address,
          buf.length,
          blocksize,
          bufx.length
        ) !== 0
      ) {
        _free_and_throw_error(address_pool, "internal error");
      }
      bufx.length = libsodium.getValue(padded_buflen_p, "i32");
      padded = bufx.to_Uint8Array();
      _free_all(address_pool);
      return padded;
    }

    function unpad(buf, blocksize) {
      if (!(buf instanceof Uint8Array)) {
        throw new TypeError("buffer must be a Uint8Array");
      }
      blocksize |= 0;
      if (blocksize <= 0) {
        throw new Error("block size must be > 0");
      }
      var address_pool = [],
        unpadded_address = _to_allocated_buf_address(buf),
        unpadded_buflen_p = _malloc(4);
      address_pool.push(unpadded_address);
      address_pool.push(unpadded_buflen_p);
      if (
        libsodium._sodium_unpad(
          unpadded_buflen_p,
          unpadded_address,
          buf.length,
          blocksize
        ) !== 0
      ) {
        _free_and_throw_error(address_pool, "unsupported/invalid padding");
      }
      buf = new Uint8Array(buf);
      buf = buf.subarray(0, libsodium.getValue(unpadded_buflen_p, "i32"));
      _free_all(address_pool);
      return buf;
    }

    //---------------------------------------------------------------------------
    // Codecs
    //
    function from_string(str) {
      if (typeof TextEncoder === "function") {
        return new TextEncoder().encode(str);
      }
      str = unescape(encodeURIComponent(str));
      var bytes = new Uint8Array(str.length);
      for (var i = 0, j = str.length; i < j; i++) {
        bytes[i] = str.charCodeAt(i);
      }
      return bytes;
    }

    function to_string(bytes) {
      if (typeof TextDecoder === "function") {
        return new TextDecoder("utf-8", {
          fatal: true
        }).decode(bytes);
      }

      var toStringChunkSize = 8192,
        numChunks = Math.ceil(bytes.length / toStringChunkSize);
      if (numChunks <= 1) {
        try {
          return decodeURIComponent(
            escape(String.fromCharCode.apply(null, bytes))
          );
        } catch (_) {
          throw new TypeError("The encoded data was not valid.");
        }
      }
      var totalString = "";
      var sequenceReadOffset = 0;
      for (var i = 0; i < numChunks; i++) {
        var currentChunk = Array.prototype.slice.call(
          bytes,
          i * toStringChunkSize + sequenceReadOffset,
          (i + 1) * toStringChunkSize + sequenceReadOffset
        );
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

          if (currentByte >= 240) {
            //Beginning of a 4-byte UTF-8 sequence
            sequenceLength = 4;
            sequenceDetectionComplete = true;
          } else if (currentByte >= 224) {
            //Beginning of a 3-byte UTF-8 sequence
            sequenceLength = 3;
            sequenceDetectionComplete = true;
          } else if (currentByte >= 192) {
            //Beginning of a 2-byte UTF-8 sequence
            sequenceLength = 2;
            sequenceDetectionComplete = true;
          } else if (currentByte < 128) {
            //A one byte UTF-8 char
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

    function from_hex(input) {
      var address_pool = [],
        input = _any_to_Uint8Array(address_pool, input, "input"),
        result = new AllocatedBuf(input.length / 2),
        result_str,
        input_address = _to_allocated_buf_address(input),
        hex_end_p = _malloc(4),
        hex_end;
      address_pool.push(input_address);
      address_pool.push(result.address);
      address_pool.push(result.hex_end_p);
      if (
        libsodium._sodium_hex2bin(
          result.address,
          result.length,
          input_address,
          input.length,
          0,
          0,
          hex_end_p
        ) !== 0
      ) {
        _free_and_throw_error(address_pool, "invalid input");
      }
      hex_end = libsodium.getValue(hex_end_p, "i32");
      if (hex_end - input_address !== input.length) {
        _free_and_throw_error(address_pool, "incomplete input");
      }
      result_str = result.to_Uint8Array();
      _free_all(address_pool);
      return result_str;
    }

    function to_hex(input) {
      input = _any_to_Uint8Array(null, input, "input");
      var str = "",
        b,
        c,
        x;
      for (var i = 0; i < input.length; i++) {
        c = input[i] & 0xf;
        b = input[i] >>> 4;
        x =
          ((87 + c + (((c - 10) >> 8) & ~38)) << 8) |
          (87 + b + (((b - 10) >> 8) & ~38));
        str += String.fromCharCode(x & 0xff) + String.fromCharCode(x >>> 8);
      }
      return str;
    }

    var base64_variants = {
      ORIGINAL: 1 | 0,
      ORIGINAL_NO_PADDING: 3 | 0,
      URLSAFE: 5 | 0,
      URLSAFE_NO_PADDING: 7 | 0
    };

    function check_base64_variant(variant) {
      if (variant == undefined) {
        return base64_variants.URLSAFE_NO_PADDING;
      }
      if (
        variant !== base64_variants.ORIGINAL &&
        variant !== base64_variants.ORIGINAL_NO_PADDING &&
        variant !== base64_variants.URLSAFE &&
        variant != base64_variants.URLSAFE_NO_PADDING
      ) {
        throw new Error("unsupported base64 variant");
      }
      return variant;
    }

    function from_base64(input, variant) {
      variant = check_base64_variant(variant);
      var address_pool = [],
        input = _any_to_Uint8Array(address_pool, input, "input"),
        result = new AllocatedBuf(input.length * 3 / 4),
        result_bin,
        input_address = _to_allocated_buf_address(input),
        result_bin_len_p = _malloc(4),
        b64_end_p = _malloc(4),
        b64_end;
      address_pool.push(input_address);
      address_pool.push(result.address);
      address_pool.push(result.result_bin_len_p);
      address_pool.push(result.b64_end_p);
      if (
        libsodium._sodium_base642bin(
          result.address,
          result.length,
          input_address,
          input.length,
          0,
          result_bin_len_p,
          b64_end_p,
          variant
        ) !== 0
      ) {
        _free_and_throw_error(address_pool, "invalid input");
      }
      b64_end = libsodium.getValue(b64_end_p, "i32");
      if (b64_end - input_address !== input.length) {
        _free_and_throw_error(address_pool, "incomplete input");
      }
      result.length = libsodium.getValue(result_bin_len_p, "i32");
      result_bin = result.to_Uint8Array();
      _free_all(address_pool);
      return result_bin;
    }

    function to_base64(input, variant) {
      variant = check_base64_variant(variant);
      input = _any_to_Uint8Array(address_pool, input, "input");
      var address_pool = [],
        nibbles = Math.floor(input.length / 3) | 0,
        remainder = input.length - 3 * nibbles,
        b64_len =
        nibbles * 4 +
        (remainder !== 0 ?
          (variant & 2) === 0 ? 4 : 2 + (remainder >>> 1) :
          0),
        result = new AllocatedBuf(b64_len + 1),
        result_b64,
        input_address = _to_allocated_buf_address(input);
      address_pool.push(input_address);
      address_pool.push(result.address);
      if (
        libsodium._sodium_bin2base64(
          result.address,
          result.length,
          input_address,
          input.length,
          variant
        ) === 0
      ) {
        _free_and_throw_error(address_pool, "conversion failed");
      }
      result.length = b64_len;
      result_b64 = to_string(result.to_Uint8Array());
      _free_all(address_pool);
      return result_b64;
    }

    function output_formats() {
      return ["uint8array", "text", "hex", "base64"];
    }

    function _format_output(output, optionalOutputFormat) {
      var selectedOutputFormat = optionalOutputFormat || output_format;
      if (!_is_output_format(selectedOutputFormat)) {
        throw new Error(
          selectedOutputFormat + " output format is not available"
        );
      }
      if (output instanceof AllocatedBuf) {
        if (selectedOutputFormat === "uint8array") {
          return output.to_Uint8Array();
        } else if (selectedOutputFormat === "text") {
          return to_string(output.to_Uint8Array());
        } else if (selectedOutputFormat === "hex") {
          return to_hex(output.to_Uint8Array());
        } else if (selectedOutputFormat === "base64") {
          return to_base64(
            output.to_Uint8Array(),
            base64_variants.URLSAFE_NO_PADDING
          );
        } else {
          throw new Error(
            'What is output format "' + selectedOutputFormat + '"?'
          );
        }
      } else if (typeof output === "object") {
        // Composed output. Example: key pairs
        var props = Object.keys(output);
        var formattedOutput = {};
        for (var i = 0; i < props.length; i++) {
          formattedOutput[props[i]] = _format_output(
            output[props[i]],
            selectedOutputFormat
          );
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
      result.set(
        libsodium.HEAPU8.subarray(this.address, this.address + this.length)
      );
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
      if (addresses) {
        for (var i = 0; i < addresses.length; i++) {
          _free(addresses[i]);
        }
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
        _free_and_throw_type_error(
          address_pool,
          varName + " cannot be null or undefined"
        );
      }
    }

    function _any_to_Uint8Array(address_pool, varValue, varName) {
      _require_defined(address_pool, varValue, varName);
      if (varValue instanceof Uint8Array) {
        return varValue;
      } else if (typeof varValue === "string") {
        return from_string(varValue);
      }
      _free_and_throw_type_error(
        address_pool,
        "unsupported input type for " + varName
      );
    }

/*{{wraps_here}}*/

    exports.add = add;
    exports.base64_variants = base64_variants;
    exports.compare = compare;
    exports.from_base64 = from_base64;
    exports.from_hex = from_hex;
    exports.from_string = from_string;
    exports.increment = increment;
    exports.is_zero = is_zero;
    exports.libsodium = libsodiumModule;
    exports.memcmp = memcmp;
    exports.memzero = memzero;
    exports.output_formats = output_formats;
    exports.pad = pad;
    exports.unpad = unpad;
    exports.ready = ready;
    exports.symbols = symbols;
    exports.to_base64 = to_base64;
    exports.to_hex = to_hex;
    exports.to_string = to_string;

    return exports;
  }

  var _onload =
    typeof root.sodium === "object" && typeof root.sodium.onload === "function" ?
    root.sodium.onload :
    null;
  if (typeof define === "function" && define.amd) {
    define(["exports", "/*{{libsodium}}*/"], expose_wrappers);
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    expose_wrappers(exports, require("/*{{libsodium}}*/"));
  } else {
    root.sodium = expose_wrappers((root.commonJsStrict = {}), root.libsodium);
  }
  _onload && root.sodium.ready.then(function () {
    _onload(root.sodium)
  });
})(this);
