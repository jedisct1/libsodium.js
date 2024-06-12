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

/*{{utils_here}}*/

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
