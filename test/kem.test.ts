import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

test("crypto_kem constants and primitive", () => {
	expect(sodium.crypto_kem_PRIMITIVE).toBe("xwing");
	expect(sodium.crypto_kem_primitive()).toBe("xwing");
	expect(sodium.crypto_kem_PUBLICKEYBYTES).toBe(1216);
	expect(sodium.crypto_kem_SECRETKEYBYTES).toBe(32);
	expect(sodium.crypto_kem_CIPHERTEXTBYTES).toBe(1120);
	expect(sodium.crypto_kem_SHAREDSECRETBYTES).toBe(32);
	expect(sodium.crypto_kem_SEEDBYTES).toBe(32);

	expect(sodium.crypto_kem_mlkem768_PUBLICKEYBYTES).toBe(1184);
	expect(sodium.crypto_kem_mlkem768_SECRETKEYBYTES).toBe(2400);
	expect(sodium.crypto_kem_mlkem768_CIPHERTEXTBYTES).toBe(1088);
	expect(sodium.crypto_kem_mlkem768_SHAREDSECRETBYTES).toBe(32);
	expect(sodium.crypto_kem_mlkem768_SEEDBYTES).toBe(64);

	expect(sodium.crypto_kem_xwing_PUBLICKEYBYTES).toBe(1216);
	expect(sodium.crypto_kem_xwing_SECRETKEYBYTES).toBe(32);
	expect(sodium.crypto_kem_xwing_CIPHERTEXTBYTES).toBe(1120);
	expect(sodium.crypto_kem_xwing_SHAREDSECRETBYTES).toBe(32);
	expect(sodium.crypto_kem_xwing_SEEDBYTES).toBe(32);
});

test("crypto_kem round-trip", () => {
	const { publicKey, privateKey, keyType } = sodium.crypto_kem_keypair();
	expect(keyType).toBe("xwing");

	const { ciphertext, sharedSecret } = sodium.crypto_kem_enc(publicKey);
	expect(ciphertext.length).toBe(sodium.crypto_kem_CIPHERTEXTBYTES);
	expect(sharedSecret.length).toBe(sodium.crypto_kem_SHAREDSECRETBYTES);

	const decapsulated = sodium.crypto_kem_dec(ciphertext, privateKey);
	expect(decapsulated).toEqual(sharedSecret);
});

test("crypto_kem seed keypair is deterministic", () => {
	const seed = sodium.randombytes_buf(sodium.crypto_kem_SEEDBYTES);
	const pair1 = sodium.crypto_kem_seed_keypair(seed);
	const pair2 = sodium.crypto_kem_seed_keypair(seed);
	expect(pair1).toEqual(pair2);
});

test("crypto_kem_xwing deterministic encapsulation uses the seed", () => {
	const { publicKey, privateKey } = sodium.crypto_kem_xwing_keypair();
	const seed = sodium.randombytes_buf(64);
	const enc1 = sodium.crypto_kem_xwing_enc_deterministic(publicKey, seed);
	const enc2 = sodium.crypto_kem_xwing_enc_deterministic(publicKey, seed);
	const enc3 = sodium.crypto_kem_xwing_enc_deterministic(
		publicKey,
		sodium.randombytes_buf(64),
	);

	expect(enc1).toEqual(enc2);
	expect(enc3.ciphertext).not.toEqual(enc1.ciphertext);
	expect(sodium.crypto_kem_xwing_dec(enc1.ciphertext, privateKey)).toEqual(
		enc1.sharedSecret,
	);
});

test("crypto_kem_mlkem768 round-trip and deterministic encapsulation", () => {
	const seed = sodium.randombytes_buf(sodium.crypto_kem_mlkem768_SEEDBYTES);
	const pair = sodium.crypto_kem_mlkem768_seed_keypair(seed);
	expect(pair.keyType).toBe("ml-kem-768");

	const seed32 = sodium.randombytes_buf(32);
	const enc1 = sodium.crypto_kem_mlkem768_enc_deterministic(
		pair.publicKey,
		seed32,
	);
	const enc2 = sodium.crypto_kem_mlkem768_enc_deterministic(
		pair.publicKey,
		seed32,
	);
	const enc3 = sodium.crypto_kem_mlkem768_enc(pair.publicKey);

	expect(enc1).toEqual(enc2);
	expect(enc3.ciphertext).not.toEqual(enc1.ciphertext);
	expect(
		sodium.crypto_kem_mlkem768_dec(enc1.ciphertext, pair.privateKey),
	).toEqual(enc1.sharedSecret);
	expect(
		sodium.crypto_kem_mlkem768_dec(enc3.ciphertext, pair.privateKey),
	).toEqual(enc3.sharedSecret);
});
