import { beforeEach, expect, test } from "bun:test";
const test_helper = require('./test_helper');

let sodium = await test_helper.init();

test("crypto_secretbox", () => {
    let message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    let key = sodium.crypto_secretbox_keygen();
    let nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

    let ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);
    let decrypted = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
    expect(decrypted).toEqual(message);
});
