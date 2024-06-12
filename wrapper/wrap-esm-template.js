"use strict";

import initSodiumESM from "./libsodium.esm.js";

const output_format = "uint8array";

const libsodium = await initSodiumESM();

const exports = {};

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
exports.memcmp = memcmp;
exports.memzero = memzero;
exports.output_formats = output_formats;
exports.pad = pad;
exports.unpad = unpad;
exports.symbols = symbols;
exports.to_base64 = to_base64;
exports.to_hex = to_hex;
exports.to_string = to_string;

async function init() {
  function libsodiumInit() {
    if (libsodium._sodium_init() !== 0) {
      throw new Error("libsodium was not correctly initialized.");
    }

    /*{{exports_here}}*/
  }

  /* Test to make sure everything works. */

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
    throw new Error("Failed to load" + err)
  }

  exports.libsodium = libsodium;
}
exports.ready = init();

export default exports;
