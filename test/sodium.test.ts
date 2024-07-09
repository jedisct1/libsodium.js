import {beforeEach, expect, test} from "bun:test";
const test_helper = require('./test_helper');

let sodium = await test_helper.init();

test("crypto_aead_aegis128l", () => {
    const message = sodium.randombytes_buf(128);
    const ad = sodium.randombytes_buf(128);
    const key = sodium.crypto_aead_aegis128l_keygen();
    const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis128l_NPUBBYTES);
    const ciphertext = sodium.crypto_aead_aegis128l_encrypt(message, ad, null, nonce, key);
    const decrypted = sodium.crypto_aead_aegis128l_decrypt(null, ciphertext, ad, nonce, key);
    expect(decrypted).toEqual(message);
});

test("crypto_aead_aegis256", () => {
    const message = sodium.randombytes_buf(128);
    const ad = sodium.randombytes_buf(128);
    const key = sodium.crypto_aead_aegis256_keygen();
    const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis256_NPUBBYTES);
    const ciphertext = sodium.crypto_aead_aegis256_encrypt(message, ad, null, nonce, key);
    const decrypted = sodium.crypto_aead_aegis256_decrypt(null, ciphertext, ad, nonce, key);
    expect(decrypted).toEqual(message);
});

test("crypto_aead_xchacha20poly1305_ietf", () => {
    const message_hex =
        '4c616469657320616e642047656e746c656d656e206f662074686520636c6173' +
        '73206f66202739393a204966204920636f756c64206f6666657220796f75206f' +
        '6e6c79206f6e652074697020666f7220746865206675747572652c2073756e73' +
        '637265656e20776f756c642062652069742e';
    const message = sodium.from_hex(message_hex);
    const ad = sodium.from_hex('50515253c0c1c2c3c4c5c6c7');
    const nonce = sodium.from_hex('404142434445464748494a4b4c4d4e4f5051525354555657');
    const key = sodium.from_hex('808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f');
    const ciphertext = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(message, ad, null, nonce, key);
    const ciphertext_hex = sodium.to_hex(ciphertext);
    const expected_ciphertext_hex =
        'bd6d179d3e83d43b9576579493c0e939572a1700252bfaccbed2902c21396cbb' +
        '731c7f1b0b4aa6440bf3a82f4eda7e39ae64c6708c54c216cb96b72e1213b452' +
        '2f8c9ba40db5d945b11b69b982c1bb9e3f3fac2bc369488f76b2383565d3fff9' +
        '21f9664c97637da9768812f615c68b13b52e' +
        'c0875924c1c7987947deafd8780acf49';
    expect(ciphertext_hex).toBe(expected_ciphertext_hex);

    const decrypted = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, ciphertext, ad, nonce, key);
    expect(decrypted).toEqual(message);

    const key2 = sodium.crypto_aead_xchacha20poly1305_ietf_keygen();
    const ciphertext2 = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(message, ad, null, nonce, key2);
    const decrypted2 = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, ciphertext2, ad, nonce, key2);
    expect(ciphertext2).not.toEqual(ciphertext);
    expect(decrypted2).toEqual(message);
});

test("crypto_auth", () => {
    const key = sodium.crypto_auth_keygen();
    const message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    const mac = sodium.crypto_auth(message, key);
    expect(sodium.crypto_auth_verify(mac, message, key)).toBe(true);
});

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

test("crypto_generichash", () => {
    const message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    const piece1 = message.slice(0, 16);
    const piece2 = message.slice(16);
    const h = sodium.crypto_generichash(32, message);
    const expected_hash_hex = '47c1fdbde32b30b9c54dd47cf88ba92d2d05df1265e342c9563ed56aee84ab02';
    expect(sodium.to_hex(h)).toBe(expected_hash_hex);

    let state = sodium.crypto_generichash_init(null, 32);
    sodium.crypto_generichash_update(state, piece1);
    sodium.crypto_generichash_update(state, piece2);
    const h2 = sodium.crypto_generichash_final(state, 32);
    expect(h2).toEqual(h);

    const key = sodium.crypto_generichash_keygen();
    const h3 = sodium.crypto_generichash(32, message, key);
    expect(h3).not.toEqual(h);
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

    expect(clientKeys.rx).toEqual(serverKeys.tx);
    expect(clientKeys.tx).toEqual(serverKeys.rx);
});

test("crypto_secretbox", () => {
    let message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    let key = sodium.crypto_secretbox_keygen();
    let nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

    let ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);
    let decrypted = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
    expect(decrypted).toEqual(message);
});

test("crypto_shorthash", () => {
    let key = sodium.from_hex('808182838485868788898a8b8c8d8e8f');
    const message0 = sodium.from_string('This is short input0');
    const mac0 = sodium.crypto_shorthash(message0, key);
    expect(sodium.to_hex(mac0)).toBe('ef589fb9ef4196b3');

    const message1 = sodium.from_string('This is short input1');
    const mac1 = sodium.crypto_shorthash(message1, key);
    expect(sodium.to_hex(mac1)).toBe('5e8f01039bc53eb7');
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

test("crypto_secretbox", () => {
    let message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    let key = sodium.crypto_secretbox_keygen();
    let nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

    let ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);
    let decrypted = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
    expect(decrypted).toEqual(message);
});

test("crypto_sign", () => {
    const message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    const keypair = sodium.crypto_sign_keypair();
    const secretKey = keypair.privateKey;
    const publicKey = keypair.publicKey;

    const signed = sodium.crypto_sign(message, secretKey);
    const verified = sodium.crypto_sign_open(signed, publicKey);
    expect(verified).toEqual(message);

    const signature = sodium.crypto_sign_detached(message, secretKey);
    const verified2 = sodium.crypto_sign_verify_detached(signature, message, publicKey);
    expect(verified2).toBe(true);

    const message2 = sodium.from_string('Science, math, technology, engineering, and compassion for others. XYZ');
    const verified3 = sodium.crypto_sign_verify_detached(signature, message2, publicKey);
    expect(verified3).toBe(false);
});
