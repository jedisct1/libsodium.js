import { expect, test } from "bun:test";

const test_helper = require("./test_helper");

const sodium = await test_helper.init();

test("crypto_secretbox", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);
	const decrypted = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
	expect(decrypted).toEqual(message);
});

// ==================== DETACHED ENCRYPTION TESTS ====================

test("crypto_secretbox_detached returns separate ciphertext and MAC", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const result = sodium.crypto_secretbox_detached(message, nonce, key);

	// Result should have ciphertext and mac properties
	expect(result.cipher).toBeDefined();
	expect(result.mac).toBeDefined();

	// Ciphertext should be same length as message (no MAC appended)
	expect(result.cipher.length).toBe(message.length);

	// MAC should be MACBYTES in length
	expect(result.mac.length).toBe(sodium.crypto_secretbox_MACBYTES);
});

test("crypto_secretbox_open_detached round-trip", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const { cipher, mac } = sodium.crypto_secretbox_detached(message, nonce, key);
	const decrypted = sodium.crypto_secretbox_open_detached(
		cipher,
		mac,
		nonce,
		key,
	);

	expect(decrypted).toEqual(message);
});

test("crypto_secretbox_open_detached with tampered MAC fails", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const { cipher, mac } = sodium.crypto_secretbox_detached(message, nonce, key);

	// Tamper with the MAC
	const tamperedMac = new Uint8Array(mac);
	tamperedMac[0] ^= 0xff;

	expect(() => {
		sodium.crypto_secretbox_open_detached(cipher, tamperedMac, nonce, key);
	}).toThrow();
});

test("crypto_secretbox_open_detached with tampered ciphertext fails", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const { cipher, mac } = sodium.crypto_secretbox_detached(message, nonce, key);

	// Tamper with the ciphertext
	const tamperedCipher = new Uint8Array(cipher);
	tamperedCipher[0] ^= 0xff;

	expect(() => {
		sodium.crypto_secretbox_open_detached(tamperedCipher, mac, nonce, key);
	}).toThrow();
});

test("crypto_secretbox_open_detached with wrong key fails", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const key = sodium.crypto_secretbox_keygen();
	const wrongKey = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const { cipher, mac } = sodium.crypto_secretbox_detached(message, nonce, key);

	expect(() => {
		sodium.crypto_secretbox_open_detached(cipher, mac, nonce, wrongKey);
	}).toThrow();
});

test("crypto_secretbox_detached with random binary data", () => {
	const message = sodium.randombytes_buf(256);
	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const { cipher, mac } = sodium.crypto_secretbox_detached(message, nonce, key);
	const decrypted = sodium.crypto_secretbox_open_detached(
		cipher,
		mac,
		nonce,
		key,
	);

	expect(decrypted).toEqual(message);
});

test("crypto_secretbox_detached with empty message", () => {
	const message = new Uint8Array(0);
	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const { cipher, mac } = sodium.crypto_secretbox_detached(message, nonce, key);

	// Empty message should result in empty ciphertext
	expect(cipher.length).toBe(0);
	// MAC should still be MACBYTES
	expect(mac.length).toBe(sodium.crypto_secretbox_MACBYTES);

	const decrypted = sodium.crypto_secretbox_open_detached(
		cipher,
		mac,
		nonce,
		key,
	);
	expect(decrypted).toEqual(message);
});
