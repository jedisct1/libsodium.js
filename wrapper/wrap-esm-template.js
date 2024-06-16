"use strict";

import initSodiumESM from "./libsodium.esm.js";

const output_format = "uint8array";

export const libsodium = await initSodiumESM();

/* Initialize. */
if (libsodium._sodium_init() !== 0) {
  throw new Error("libsodium was not correctly initialized.");
}

/*{{exports_here}}*/

/*{{utils_here}}*/

/*{{wraps_here}}*/

/* Test to make sure everything works. */
try {
  var message = new Uint8Array([98, 97, 108, 108, 115]);
  var nonce = randombytes_buf(crypto_secretbox_NONCEBYTES);
  var key = randombytes_buf(crypto_secretbox_KEYBYTES);
  var encrypted = crypto_secretbox_easy(message, nonce, key);
  var decrypted = crypto_secretbox_open_easy(encrypted, nonce, key);

  if (!memcmp(message, decrypted)) {
    throw new Error("Init test failed");
  }
}
catch (err) {
  throw new Error("Failed to load" + err)
}
