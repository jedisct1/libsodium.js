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

// Only the unused stack should be cleared, nothing around it
test("stackzero only clears the free stack", () => {
	const lib = sodium.libsodium;
	const end = lib._emscripten_stack_get_end();
	const sp = lib._emscripten_stack_get_current();
	const below = lib.HEAPU8.slice(0, end);
	const above = lib.HEAPU8.slice(sp, sp + 4096);
	lib.HEAPU8.fill(0xaa, end, sp);
	sodium.stackzero();
	expect(lib.HEAPU8.subarray(end, sp).every((b: number) => b === 0)).toBeTrue();
	expect(Buffer.compare(lib.HEAPU8.subarray(0, end), below)).toBe(0);
	expect(Buffer.compare(lib.HEAPU8.subarray(sp, sp + 4096), above)).toBe(0);
});
