"use strict";

import initSodiumESM from "./libsodium.esm.js";

const output_format = "uint8array";

export const libsodium = await initSodiumESM();

const exports = {};
export default exports;

/*{{utils_here}}*/

/*{{wraps_here}}*/

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
    var nonce = randombytes_buf(exports.crypto_secretbox_NONCEBYTES);
    var key = randombytes_buf(exports.crypto_secretbox_KEYBYTES);
    var encrypted = crypto_secretbox_easy(message, nonce, key);
    var decrypted = crypto_secretbox_open_easy(encrypted, nonce, key);

    if (memcmp(message, decrypted)) {
      return;
    }
  }
  catch (err) {
    throw new Error("Failed to load" + err)
  }
}
export const ready = init();
