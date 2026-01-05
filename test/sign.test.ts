import { beforeEach, expect, test } from "bun:test";
const test_helper = require('./test_helper');

let sodium = await test_helper.init();

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

test("crypto_sign_ed25519_to_curve25519", () => {
    const secretkey = sodium.from_hex('411a2c2227d2a799ebae0ed94417d8e8ed1ca9b0a9d5f4cd743cc52d961e94e2' +
        'da49154c9e700b754199df7974e9fa4ee4b6ebbc71f89d8d8938335ea4a1409d');
    const publickey = sodium.from_hex('da49154c9e700b754199df7974e9fa4ee4b6ebbc71f89d8d8938335ea4a1409d');
    const x25519SecretKey = sodium.crypto_sign_ed25519_sk_to_curve25519(secretkey);
    const x25519PublicKey = sodium.crypto_sign_ed25519_pk_to_curve25519(publickey);
    expect(sodium.to_hex(x25519SecretKey)).toBe('60c783b8d1674b7081b72a105b55872502825d4ec638028152e085b54705ad7e');
    expect(sodium.to_hex(x25519PublicKey)).toBe('5a791d07cfb39060c8e9b641b6a915a3126cd14ddc243a9928c490c8e1f59e7c');
});