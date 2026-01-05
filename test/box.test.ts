import { beforeEach, expect, test } from "bun:test";
const test_helper = require('./test_helper');

let sodium = await test_helper.init();

test("crypto_box", () => {
    const message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    const aliceKeypair = sodium.crypto_box_keypair();
    const aliceSecret = aliceKeypair.privateKey;
    const alicePublic = aliceKeypair.publicKey;
    const bobKeypair = sodium.crypto_box_keypair();
    const bobSecret = bobKeypair.privateKey;
    const bobPublic = bobKeypair.publicKey;
    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

    const boxed = sodium.crypto_box_easy(message, nonce, bobPublic, aliceSecret);
    const unboxed = sodium.crypto_box_open_easy(boxed, nonce, alicePublic, bobSecret);
    expect(unboxed).toEqual(message);
});

test("crypto_box_seal", () => {
    const message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    const aliceKeypair = sodium.crypto_box_keypair();
    const aliceSecret = aliceKeypair.privateKey;
    const alicePublic = aliceKeypair.publicKey;

    const boxed = sodium.crypto_box_seal(message, alicePublic);
    const unboxed = sodium.crypto_box_seal_open(boxed, alicePublic, aliceSecret);
    expect(unboxed).toEqual(message);
});