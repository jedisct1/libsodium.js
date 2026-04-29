import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

test("crypto_kdf", () => {
	const key = sodium.from_hex(
		"808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f",
	);
	const context = "NaClTest";

	const subkey = sodium.crypto_kdf_derive_from_key(32, 1, context, key);
	const expected_subkey_hex =
		"bce6fcf118cac2691bb23975a63dfac02282c1cd5de6ab9febcbb0ec4348181b";
	expect(sodium.to_hex(subkey)).toBe(expected_subkey_hex);

	const _subkey2 = sodium.crypto_kdf_derive_from_key(32, 2, context, key);
	const _expected_subkey2_hex =
		"877cf1c1a2da9b900c79464acebc3731ed4ebe326a7951911639821d09dc6dda";
	expect(sodium.to_hex(subkey)).toBe(expected_subkey_hex);

	const key2 = sodium.crypto_kdf_keygen();
	const subkey3 = sodium.crypto_kdf_derive_from_key(32, 1, context, key2);
	expect(subkey3).not.toEqual(subkey);
});

test("crypto_kdf rejects out-of-range subkey_len", () => {
	const key = sodium.from_hex(
		"808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f",
	);
	const context = "NaClTest";

	// libsodium returns -1 key len errors, but wrapper previously 
	// ignored the error and returned partially-initialized output
	expect(() =>
		sodium.crypto_kdf_derive_from_key(12, 1, context, key),
	).toThrow();
	expect(() =>
		sodium.crypto_kdf_derive_from_key(0, 1, context, key),
	).toThrow();
	expect(() =>
		sodium.crypto_kdf_derive_from_key(128, 1, context, key),
	).toThrow();

	// check boundry lengths
	const min_subkey = sodium.crypto_kdf_derive_from_key(
		sodium.crypto_kdf_BYTES_MIN,
		1,
		context,
		key,
	);
	expect(min_subkey.length).toBe(sodium.crypto_kdf_BYTES_MIN);

	const max_subkey = sodium.crypto_kdf_derive_from_key(
		sodium.crypto_kdf_BYTES_MAX,
		1,
		context,
		key,
	);
	expect(max_subkey.length).toBe(sodium.crypto_kdf_BYTES_MAX);
});
