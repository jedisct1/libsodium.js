import { expect, test } from "bun:test";

const test_helper = require("./test_helper");

const sodium = await test_helper.init();

test("crypto_box", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const aliceKeypair = sodium.crypto_box_keypair();
	const aliceSecret = aliceKeypair.privateKey;
	const alicePublic = aliceKeypair.publicKey;
	const bobKeypair = sodium.crypto_box_keypair();
	const bobSecret = bobKeypair.privateKey;
	const bobPublic = bobKeypair.publicKey;
	const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

	const boxed = sodium.crypto_box_easy(message, nonce, bobPublic, aliceSecret);
	const unboxed = sodium.crypto_box_open_easy(
		boxed,
		nonce,
		alicePublic,
		bobSecret,
	);
	expect(unboxed).toEqual(message);
});

test("crypto_box_seal", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const aliceKeypair = sodium.crypto_box_keypair();
	const aliceSecret = aliceKeypair.privateKey;
	const alicePublic = aliceKeypair.publicKey;

	const boxed = sodium.crypto_box_seal(message, alicePublic);
	const unboxed = sodium.crypto_box_seal_open(boxed, alicePublic, aliceSecret);
	expect(unboxed).toEqual(message);
});

// ==================== DETACHED ENCRYPTION TESTS ====================

test("crypto_box_detached returns separate ciphertext and MAC", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const aliceKeypair = sodium.crypto_box_keypair();
	const aliceSecret = aliceKeypair.privateKey;
	const _alicePublic = aliceKeypair.publicKey;
	const bobKeypair = sodium.crypto_box_keypair();
	const _bobSecret = bobKeypair.privateKey;
	const bobPublic = bobKeypair.publicKey;
	const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

	const result = sodium.crypto_box_detached(
		message,
		nonce,
		bobPublic,
		aliceSecret,
	);

	// Result should have ciphertext and mac properties
	expect(result.ciphertext).toBeDefined();
	expect(result.mac).toBeDefined();

	// Ciphertext should be same length as message (no MAC appended)
	expect(result.ciphertext.length).toBe(message.length);

	// MAC should be MACBYTES in length
	expect(result.mac.length).toBe(sodium.crypto_box_MACBYTES);
});

test("crypto_box_open_detached round-trip", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const aliceKeypair = sodium.crypto_box_keypair();
	const aliceSecret = aliceKeypair.privateKey;
	const alicePublic = aliceKeypair.publicKey;
	const bobKeypair = sodium.crypto_box_keypair();
	const bobSecret = bobKeypair.privateKey;
	const bobPublic = bobKeypair.publicKey;
	const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

	// Alice encrypts to Bob
	const { ciphertext, mac } = sodium.crypto_box_detached(
		message,
		nonce,
		bobPublic,
		aliceSecret,
	);

	// Bob decrypts from Alice
	const decrypted = sodium.crypto_box_open_detached(
		ciphertext,
		mac,
		nonce,
		alicePublic,
		bobSecret,
	);

	expect(decrypted).toEqual(message);
});

test("crypto_box_open_detached with tampered MAC fails", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const aliceKeypair = sodium.crypto_box_keypair();
	const aliceSecret = aliceKeypair.privateKey;
	const alicePublic = aliceKeypair.publicKey;
	const bobKeypair = sodium.crypto_box_keypair();
	const bobSecret = bobKeypair.privateKey;
	const bobPublic = bobKeypair.publicKey;
	const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

	const { ciphertext, mac } = sodium.crypto_box_detached(
		message,
		nonce,
		bobPublic,
		aliceSecret,
	);

	// Tamper with the MAC
	const tamperedMac = new Uint8Array(mac);
	tamperedMac[0] ^= 0xff;

	expect(() => {
		sodium.crypto_box_open_detached(
			ciphertext,
			tamperedMac,
			nonce,
			alicePublic,
			bobSecret,
		);
	}).toThrow();
});

test("crypto_box_open_detached with tampered ciphertext fails", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const aliceKeypair = sodium.crypto_box_keypair();
	const aliceSecret = aliceKeypair.privateKey;
	const alicePublic = aliceKeypair.publicKey;
	const bobKeypair = sodium.crypto_box_keypair();
	const bobSecret = bobKeypair.privateKey;
	const bobPublic = bobKeypair.publicKey;
	const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

	const { ciphertext, mac } = sodium.crypto_box_detached(
		message,
		nonce,
		bobPublic,
		aliceSecret,
	);

	// Tamper with the ciphertext
	const tamperedCiphertext = new Uint8Array(ciphertext);
	tamperedCiphertext[0] ^= 0xff;

	expect(() => {
		sodium.crypto_box_open_detached(
			tamperedCiphertext,
			mac,
			nonce,
			alicePublic,
			bobSecret,
		);
	}).toThrow();
});

test("crypto_box_open_detached with wrong key fails", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const aliceKeypair = sodium.crypto_box_keypair();
	const aliceSecret = aliceKeypair.privateKey;
	const alicePublic = aliceKeypair.publicKey;
	const bobKeypair = sodium.crypto_box_keypair();
	const bobPublic = bobKeypair.publicKey;
	const eveKeypair = sodium.crypto_box_keypair();
	const eveSecret = eveKeypair.privateKey;
	const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

	// Alice encrypts to Bob
	const { ciphertext, mac } = sodium.crypto_box_detached(
		message,
		nonce,
		bobPublic,
		aliceSecret,
	);

	// Eve tries to decrypt (using wrong key)
	expect(() => {
		sodium.crypto_box_open_detached(
			ciphertext,
			mac,
			nonce,
			alicePublic,
			eveSecret,
		);
	}).toThrow();
});

test("crypto_box_detached with random binary data", () => {
	const message = sodium.randombytes_buf(256);
	const aliceKeypair = sodium.crypto_box_keypair();
	const aliceSecret = aliceKeypair.privateKey;
	const alicePublic = aliceKeypair.publicKey;
	const bobKeypair = sodium.crypto_box_keypair();
	const bobSecret = bobKeypair.privateKey;
	const bobPublic = bobKeypair.publicKey;
	const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

	const { ciphertext, mac } = sodium.crypto_box_detached(
		message,
		nonce,
		bobPublic,
		aliceSecret,
	);
	const decrypted = sodium.crypto_box_open_detached(
		ciphertext,
		mac,
		nonce,
		alicePublic,
		bobSecret,
	);

	expect(decrypted).toEqual(message);
});
