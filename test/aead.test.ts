import { expect, test } from "bun:test";

const test_helper = require("./test_helper");

const sodium = await test_helper.init();

test("crypto_aead_aegis128l", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(128);
	const key = sodium.crypto_aead_aegis128l_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis128l_NPUBBYTES);
	const ciphertext = sodium.crypto_aead_aegis128l_encrypt(
		message,
		ad,
		null,
		nonce,
		key,
	);
	const decrypted = sodium.crypto_aead_aegis128l_decrypt(
		null,
		ciphertext,
		ad,
		nonce,
		key,
	);
	expect(decrypted).toEqual(message);
});

test("crypto_aead_aegis256", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(128);
	const key = sodium.crypto_aead_aegis256_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis256_NPUBBYTES);
	const ciphertext = sodium.crypto_aead_aegis256_encrypt(
		message,
		ad,
		null,
		nonce,
		key,
	);
	const decrypted = sodium.crypto_aead_aegis256_decrypt(
		null,
		ciphertext,
		ad,
		nonce,
		key,
	);
	expect(decrypted).toEqual(message);
});

test("crypto_aead_xchacha20poly1305_ietf", () => {
	const message_hex =
		"4c616469657320616e642047656e746c656d656e206f662074686520636c6173" +
		"73206f66202739393a204966204920636f756c64206f6666657220796f75206f" +
		"6e6c79206f6e652074697020666f7220746865206675747572652c2073756e73" +
		"637265656e20776f756c642062652069742e";
	const message = sodium.from_hex(message_hex);
	const ad = sodium.from_hex("50515253c0c1c2c3c4c5c6c7");
	const nonce = sodium.from_hex(
		"404142434445464748494a4b4c4d4e4f5051525354555657",
	);
	const key = sodium.from_hex(
		"808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f",
	);
	const ciphertext = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
		message,
		ad,
		null,
		nonce,
		key,
	);
	const ciphertext_hex = sodium.to_hex(ciphertext);
	const expected_ciphertext_hex =
		"bd6d179d3e83d43b9576579493c0e939572a1700252bfaccbed2902c21396cbb" +
		"731c7f1b0b4aa6440bf3a82f4eda7e39ae64c6708c54c216cb96b72e1213b452" +
		"2f8c9ba40db5d945b11b69b982c1bb9e3f3fac2bc369488f76b2383565d3fff9" +
		"21f9664c97637da9768812f615c68b13b52e" +
		"c0875924c1c7987947deafd8780acf49";
	expect(ciphertext_hex).toBe(expected_ciphertext_hex);

	const decrypted = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
		null,
		ciphertext,
		ad,
		nonce,
		key,
	);
	expect(decrypted).toEqual(message);

	const key2 = sodium.crypto_aead_xchacha20poly1305_ietf_keygen();
	const ciphertext2 = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
		message,
		ad,
		null,
		nonce,
		key2,
	);
	const decrypted2 = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
		null,
		ciphertext2,
		ad,
		nonce,
		key2,
	);
	expect(ciphertext2).not.toEqual(ciphertext);
	expect(decrypted2).toEqual(message);
});

test("crypto_aead_chacha20poly1305_keygen", () => {
	const key = sodium.crypto_aead_chacha20poly1305_keygen();
	expect(key.length).toBe(sodium.crypto_aead_chacha20poly1305_KEYBYTES);
});

test("crypto_aead_chacha20poly1305 encrypt/decrypt", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_NPUBBYTES,
	);

	const ciphertext = sodium.crypto_aead_chacha20poly1305_encrypt(
		message,
		ad,
		null,
		nonce,
		key,
	);
	expect(ciphertext.length).toBe(
		message.length + sodium.crypto_aead_chacha20poly1305_ABYTES,
	);

	const decrypted = sodium.crypto_aead_chacha20poly1305_decrypt(
		null,
		ciphertext,
		ad,
		nonce,
		key,
	);
	expect(decrypted).toEqual(message);
});

test("crypto_aead_chacha20poly1305 decrypt with wrong key fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_keygen();
	const wrongKey = sodium.crypto_aead_chacha20poly1305_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_NPUBBYTES,
	);

	const ciphertext = sodium.crypto_aead_chacha20poly1305_encrypt(
		message,
		ad,
		null,
		nonce,
		key,
	);

	expect(() => {
		sodium.crypto_aead_chacha20poly1305_decrypt(
			null,
			ciphertext,
			ad,
			nonce,
			wrongKey,
		);
	}).toThrow();
});

test("crypto_aead_chacha20poly1305 AD verification", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const wrongAd = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_NPUBBYTES,
	);

	const ciphertext = sodium.crypto_aead_chacha20poly1305_encrypt(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Decryption with wrong AD should fail
	expect(() => {
		sodium.crypto_aead_chacha20poly1305_decrypt(
			null,
			ciphertext,
			wrongAd,
			nonce,
			key,
		);
	}).toThrow();
});

test("crypto_aead_chacha20poly1305_ietf_keygen", () => {
	const key = sodium.crypto_aead_chacha20poly1305_ietf_keygen();
	expect(key.length).toBe(sodium.crypto_aead_chacha20poly1305_ietf_KEYBYTES);
});

test("crypto_aead_chacha20poly1305_ietf encrypt/decrypt", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
	);

	const ciphertext = sodium.crypto_aead_chacha20poly1305_ietf_encrypt(
		message,
		ad,
		null,
		nonce,
		key,
	);
	expect(ciphertext.length).toBe(
		message.length + sodium.crypto_aead_chacha20poly1305_ietf_ABYTES,
	);

	const decrypted = sodium.crypto_aead_chacha20poly1305_ietf_decrypt(
		null,
		ciphertext,
		ad,
		nonce,
		key,
	);
	expect(decrypted).toEqual(message);
});

test("crypto_aead_chacha20poly1305_ietf decrypt with wrong key fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_ietf_keygen();
	const wrongKey = sodium.crypto_aead_chacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
	);

	const ciphertext = sodium.crypto_aead_chacha20poly1305_ietf_encrypt(
		message,
		ad,
		null,
		nonce,
		key,
	);

	expect(() => {
		sodium.crypto_aead_chacha20poly1305_ietf_decrypt(
			null,
			ciphertext,
			ad,
			nonce,
			wrongKey,
		);
	}).toThrow();
});

test("crypto_aead_chacha20poly1305_ietf AD verification", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const wrongAd = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
	);

	const ciphertext = sodium.crypto_aead_chacha20poly1305_ietf_encrypt(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Decryption with wrong AD should fail
	expect(() => {
		sodium.crypto_aead_chacha20poly1305_ietf_decrypt(
			null,
			ciphertext,
			wrongAd,
			nonce,
			key,
		);
	}).toThrow();
});

// ==================== DETACHED ENCRYPTION TESTS ====================

// --- crypto_aead_chacha20poly1305 detached ---

test("crypto_aead_chacha20poly1305_encrypt_detached returns separate ciphertext and MAC", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_NPUBBYTES,
	);

	const result = sodium.crypto_aead_chacha20poly1305_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Result should have ciphertext and mac properties
	expect(result.ciphertext).toBeDefined();
	expect(result.mac).toBeDefined();

	// Ciphertext should be same length as message (no MAC appended)
	expect(result.ciphertext.length).toBe(message.length);

	// MAC should be ABYTES in length
	expect(result.mac.length).toBe(sodium.crypto_aead_chacha20poly1305_ABYTES);
});

test("crypto_aead_chacha20poly1305_decrypt_detached round-trip", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_NPUBBYTES,
	);

	const { ciphertext, mac } =
		sodium.crypto_aead_chacha20poly1305_encrypt_detached(
			message,
			ad,
			null,
			nonce,
			key,
		);
	const decrypted = sodium.crypto_aead_chacha20poly1305_decrypt_detached(
		null,
		ciphertext,
		mac,
		ad,
		nonce,
		key,
	);

	expect(decrypted).toEqual(message);
});

test("crypto_aead_chacha20poly1305_decrypt_detached with tampered MAC fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_NPUBBYTES,
	);

	const { ciphertext, mac } =
		sodium.crypto_aead_chacha20poly1305_encrypt_detached(
			message,
			ad,
			null,
			nonce,
			key,
		);

	// Tamper with the MAC
	const tamperedMac = new Uint8Array(mac);
	tamperedMac[0] ^= 0xff;

	expect(() => {
		sodium.crypto_aead_chacha20poly1305_decrypt_detached(
			null,
			ciphertext,
			tamperedMac,
			ad,
			nonce,
			key,
		);
	}).toThrow();
});

test("crypto_aead_chacha20poly1305_decrypt_detached with tampered ciphertext fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_NPUBBYTES,
	);

	const { ciphertext, mac } =
		sodium.crypto_aead_chacha20poly1305_encrypt_detached(
			message,
			ad,
			null,
			nonce,
			key,
		);

	// Tamper with the ciphertext
	const tamperedCiphertext = new Uint8Array(ciphertext);
	tamperedCiphertext[0] ^= 0xff;

	expect(() => {
		sodium.crypto_aead_chacha20poly1305_decrypt_detached(
			null,
			tamperedCiphertext,
			mac,
			ad,
			nonce,
			key,
		);
	}).toThrow();
});

// --- crypto_aead_chacha20poly1305_ietf detached ---

test("crypto_aead_chacha20poly1305_ietf_encrypt_detached returns separate ciphertext and MAC", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
	);

	const result = sodium.crypto_aead_chacha20poly1305_ietf_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Result should have ciphertext and mac properties
	expect(result.ciphertext).toBeDefined();
	expect(result.mac).toBeDefined();

	// Ciphertext should be same length as message (no MAC appended)
	expect(result.ciphertext.length).toBe(message.length);

	// MAC should be ABYTES in length
	expect(result.mac.length).toBe(
		sodium.crypto_aead_chacha20poly1305_ietf_ABYTES,
	);
});

test("crypto_aead_chacha20poly1305_ietf_decrypt_detached round-trip", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
	);

	const { ciphertext, mac } =
		sodium.crypto_aead_chacha20poly1305_ietf_encrypt_detached(
			message,
			ad,
			null,
			nonce,
			key,
		);
	const decrypted = sodium.crypto_aead_chacha20poly1305_ietf_decrypt_detached(
		null,
		ciphertext,
		mac,
		ad,
		nonce,
		key,
	);

	expect(decrypted).toEqual(message);
});

test("crypto_aead_chacha20poly1305_ietf_decrypt_detached with tampered MAC fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
	);

	const { ciphertext, mac } =
		sodium.crypto_aead_chacha20poly1305_ietf_encrypt_detached(
			message,
			ad,
			null,
			nonce,
			key,
		);

	// Tamper with the MAC
	const tamperedMac = new Uint8Array(mac);
	tamperedMac[0] ^= 0xff;

	expect(() => {
		sodium.crypto_aead_chacha20poly1305_ietf_decrypt_detached(
			null,
			ciphertext,
			tamperedMac,
			ad,
			nonce,
			key,
		);
	}).toThrow();
});

test("crypto_aead_chacha20poly1305_ietf_decrypt_detached with tampered ciphertext fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_chacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
	);

	const { ciphertext, mac } =
		sodium.crypto_aead_chacha20poly1305_ietf_encrypt_detached(
			message,
			ad,
			null,
			nonce,
			key,
		);

	// Tamper with the ciphertext
	const tamperedCiphertext = new Uint8Array(ciphertext);
	tamperedCiphertext[0] ^= 0xff;

	expect(() => {
		sodium.crypto_aead_chacha20poly1305_ietf_decrypt_detached(
			null,
			tamperedCiphertext,
			mac,
			ad,
			nonce,
			key,
		);
	}).toThrow();
});

// --- crypto_aead_xchacha20poly1305_ietf detached ---

test("crypto_aead_xchacha20poly1305_ietf_encrypt_detached returns separate ciphertext and MAC", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_xchacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES,
	);

	const result = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Result should have ciphertext and mac properties
	expect(result.ciphertext).toBeDefined();
	expect(result.mac).toBeDefined();

	// Ciphertext should be same length as message (no MAC appended)
	expect(result.ciphertext.length).toBe(message.length);

	// MAC should be ABYTES in length
	expect(result.mac.length).toBe(
		sodium.crypto_aead_xchacha20poly1305_ietf_ABYTES,
	);
});

test("crypto_aead_xchacha20poly1305_ietf_decrypt_detached round-trip", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_xchacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES,
	);

	const { ciphertext, mac } =
		sodium.crypto_aead_xchacha20poly1305_ietf_encrypt_detached(
			message,
			ad,
			null,
			nonce,
			key,
		);
	const decrypted = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt_detached(
		null,
		ciphertext,
		mac,
		ad,
		nonce,
		key,
	);

	expect(decrypted).toEqual(message);
});

test("crypto_aead_xchacha20poly1305_ietf_decrypt_detached with tampered MAC fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_xchacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES,
	);

	const { ciphertext, mac } =
		sodium.crypto_aead_xchacha20poly1305_ietf_encrypt_detached(
			message,
			ad,
			null,
			nonce,
			key,
		);

	// Tamper with the MAC
	const tamperedMac = new Uint8Array(mac);
	tamperedMac[0] ^= 0xff;

	expect(() => {
		sodium.crypto_aead_xchacha20poly1305_ietf_decrypt_detached(
			null,
			ciphertext,
			tamperedMac,
			ad,
			nonce,
			key,
		);
	}).toThrow();
});

test("crypto_aead_xchacha20poly1305_ietf_decrypt_detached with tampered ciphertext fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_xchacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES,
	);

	const { ciphertext, mac } =
		sodium.crypto_aead_xchacha20poly1305_ietf_encrypt_detached(
			message,
			ad,
			null,
			nonce,
			key,
		);

	// Tamper with the ciphertext
	const tamperedCiphertext = new Uint8Array(ciphertext);
	tamperedCiphertext[0] ^= 0xff;

	expect(() => {
		sodium.crypto_aead_xchacha20poly1305_ietf_decrypt_detached(
			null,
			tamperedCiphertext,
			mac,
			ad,
			nonce,
			key,
		);
	}).toThrow();
});

// --- crypto_aead_aegis128l detached ---

test("crypto_aead_aegis128l_encrypt_detached returns separate ciphertext and MAC", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_aegis128l_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis128l_NPUBBYTES);

	const result = sodium.crypto_aead_aegis128l_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Result should have ciphertext and mac properties
	expect(result.ciphertext).toBeDefined();
	expect(result.mac).toBeDefined();

	// Ciphertext should be same length as message (no MAC appended)
	expect(result.ciphertext.length).toBe(message.length);

	// MAC should be ABYTES in length
	expect(result.mac.length).toBe(sodium.crypto_aead_aegis128l_ABYTES);
});

test("crypto_aead_aegis128l_decrypt_detached round-trip", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_aegis128l_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis128l_NPUBBYTES);

	const { ciphertext, mac } = sodium.crypto_aead_aegis128l_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);
	const decrypted = sodium.crypto_aead_aegis128l_decrypt_detached(
		null,
		ciphertext,
		mac,
		ad,
		nonce,
		key,
	);

	expect(decrypted).toEqual(message);
});

test("crypto_aead_aegis128l_decrypt_detached with tampered MAC fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_aegis128l_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis128l_NPUBBYTES);

	const { ciphertext, mac } = sodium.crypto_aead_aegis128l_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Tamper with the MAC
	const tamperedMac = new Uint8Array(mac);
	tamperedMac[0] ^= 0xff;

	expect(() => {
		sodium.crypto_aead_aegis128l_decrypt_detached(
			null,
			ciphertext,
			tamperedMac,
			ad,
			nonce,
			key,
		);
	}).toThrow();
});

test("crypto_aead_aegis128l_decrypt_detached with tampered ciphertext fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_aegis128l_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis128l_NPUBBYTES);

	const { ciphertext, mac } = sodium.crypto_aead_aegis128l_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Tamper with the ciphertext
	const tamperedCiphertext = new Uint8Array(ciphertext);
	tamperedCiphertext[0] ^= 0xff;

	expect(() => {
		sodium.crypto_aead_aegis128l_decrypt_detached(
			null,
			tamperedCiphertext,
			mac,
			ad,
			nonce,
			key,
		);
	}).toThrow();
});

// --- crypto_aead_aegis256 detached ---

test("crypto_aead_aegis256_encrypt_detached returns separate ciphertext and MAC", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_aegis256_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis256_NPUBBYTES);

	const result = sodium.crypto_aead_aegis256_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Result should have ciphertext and mac properties
	expect(result.ciphertext).toBeDefined();
	expect(result.mac).toBeDefined();

	// Ciphertext should be same length as message (no MAC appended)
	expect(result.ciphertext.length).toBe(message.length);

	// MAC should be ABYTES in length
	expect(result.mac.length).toBe(sodium.crypto_aead_aegis256_ABYTES);
});

test("crypto_aead_aegis256_decrypt_detached round-trip", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_aegis256_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis256_NPUBBYTES);

	const { ciphertext, mac } = sodium.crypto_aead_aegis256_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);
	const decrypted = sodium.crypto_aead_aegis256_decrypt_detached(
		null,
		ciphertext,
		mac,
		ad,
		nonce,
		key,
	);

	expect(decrypted).toEqual(message);
});

test("crypto_aead_aegis256_decrypt_detached with tampered MAC fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_aegis256_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis256_NPUBBYTES);

	const { ciphertext, mac } = sodium.crypto_aead_aegis256_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Tamper with the MAC
	const tamperedMac = new Uint8Array(mac);
	tamperedMac[0] ^= 0xff;

	expect(() => {
		sodium.crypto_aead_aegis256_decrypt_detached(
			null,
			ciphertext,
			tamperedMac,
			ad,
			nonce,
			key,
		);
	}).toThrow();
});

test("crypto_aead_aegis256_decrypt_detached with tampered ciphertext fails", () => {
	const message = sodium.randombytes_buf(128);
	const ad = sodium.randombytes_buf(64);
	const key = sodium.crypto_aead_aegis256_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis256_NPUBBYTES);

	const { ciphertext, mac } = sodium.crypto_aead_aegis256_encrypt_detached(
		message,
		ad,
		null,
		nonce,
		key,
	);

	// Tamper with the ciphertext
	const tamperedCiphertext = new Uint8Array(ciphertext);
	tamperedCiphertext[0] ^= 0xff;

	expect(() => {
		sodium.crypto_aead_aegis256_decrypt_detached(
			null,
			tamperedCiphertext,
			mac,
			ad,
			nonce,
			key,
		);
	}).toThrow();
});
