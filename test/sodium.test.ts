import { beforeEach, expect, test } from "bun:test";
const test_helper = require('./test_helper');

let sodium = await test_helper.init();

test("crypto_auth", () => {
    const key = sodium.crypto_auth_keygen();
    const message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    const mac = sodium.crypto_auth(message, key);
    expect(sodium.crypto_auth_verify(mac, message, key)).toBe(true);
});

test("crypto_kdf", () => {
    const key = sodium.from_hex('808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f');
    const context = 'NaClTest';

    const subkey = sodium.crypto_kdf_derive_from_key(32, 1, context, key);
    const expected_subkey_hex = 'bce6fcf118cac2691bb23975a63dfac02282c1cd5de6ab9febcbb0ec4348181b';
    expect(sodium.to_hex(subkey)).toBe(expected_subkey_hex);

    const subkey2 = sodium.crypto_kdf_derive_from_key(32, 2, context, key);
    const expected_subkey2_hex = '877cf1c1a2da9b900c79464acebc3731ed4ebe326a7951911639821d09dc6dda';
    expect(sodium.to_hex(subkey)).toBe(expected_subkey_hex);

    const key2 = sodium.crypto_kdf_keygen();
    const subkey3 = sodium.crypto_kdf_derive_from_key(32, 1, context, key2);
    expect(subkey3).not.toEqual(subkey);
});

test("crypto_kx", () => {
    const clientKeyypair = sodium.crypto_kx_keypair();
    const clientSecret = clientKeyypair.privateKey;
    const clientPublic = clientKeyypair.publicKey;

    const seed = sodium.crypto_generichash(sodium.crypto_kx_SEEDBYTES,
        sodium.from_string('Unit test static key seed goes here. Nothing too complicated. No randomness needed, really.'));
    const serverKeyypair = sodium.crypto_kx_seed_keypair(seed);
    const serverSecret = serverKeyypair.privateKey;
    const serverPublic = serverKeyypair.publicKey;

    const clientKeys = sodium.crypto_kx_client_session_keys(clientPublic, clientSecret, serverPublic);
    const serverKeys = sodium.crypto_kx_server_session_keys(serverPublic, serverSecret, clientPublic);

    expect(clientKeys.sharedRx).toEqual(serverKeys.sharedTx);
    expect(clientKeys.sharedTx).toEqual(serverKeys.sharedRx);
});

test("crypto_secretbox", () => {
    let message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    let key = sodium.crypto_secretbox_keygen();
    let nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

    let ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);
    let decrypted = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
    expect(decrypted).toEqual(message);
});

test("crypto_scalarmult", () => {
    const aliceKeypair = sodium.crypto_box_keypair();
    const aliceSecret = aliceKeypair.privateKey;
    const alicePublic = aliceKeypair.publicKey;
    const bobKeypair = sodium.crypto_box_keypair();
    const bobSecret = bobKeypair.privateKey;
    const bobPublic = bobKeypair.publicKey;

    const shared1 = sodium.crypto_scalarmult(aliceSecret, bobPublic);
    const shared2 = sodium.crypto_scalarmult(bobSecret, alicePublic);
    expect(shared1).toEqual(shared2);

    const zero = sodium.from_hex('0000000000000000000000000000000000000000000000000000000000000000');
    expect(shared1).not.toEqual(zero);
});