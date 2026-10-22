import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

function contains(haystack: Uint8Array, needle: Uint8Array): boolean {
	return Buffer.from(
		haystack.buffer,
		haystack.byteOffset,
		haystack.byteLength,
	).includes(needle);
}

// Change test target if ChaCha20 stops leaving data in wasm stack
test("stackzero removes plaintext remnants", () => {
	const key = sodium.crypto_aead_xchacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES,
	);
	const message = sodium.randombytes_buf(9);
	const ciphertext = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
		message,
		null,
		null,
		nonce,
		key,
	);
	sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
		null,
		ciphertext,
		null,
		nonce,
		key,
	);
	expect(contains(sodium.libsodium.HEAPU8, message)).toBeTrue();
	sodium.stackzero();
	expect(contains(sodium.libsodium.HEAPU8, message)).toBeFalse();
});
