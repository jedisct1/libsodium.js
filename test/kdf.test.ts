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

test("crypto_kdf_hkdf_sha256 supports one-shot and streaming extraction", () => {
	const ikm = sodium.from_hex("0b".repeat(22));
	const salt = sodium.from_hex("000102030405060708090a0b0c");
	const context = "f0f1f2f3f4f5f6f7f8f9";
	const prk = sodium.crypto_kdf_hkdf_sha256_extract(salt, ikm);

	expect(sodium.to_hex(prk)).toBe(
		"077709362c2e32df0ddc3f0dc47bba6390b6c73bb50f9c3122ec844ad7c2b3e5",
	);
	expect(
		sodium.to_hex(sodium.crypto_kdf_hkdf_sha256_expand(42, context, prk)),
	).toBe(
		"e030b6755e42e40d698bc2bbad71cae4a5704f02d0bcc9b405eab29c5a328e429bfa4301035e09c51ba8",
	);

	const state = sodium.crypto_kdf_hkdf_sha256_extract_init(salt);
	sodium.crypto_kdf_hkdf_sha256_extract_update(state, ikm.slice(0, 7));
	sodium.crypto_kdf_hkdf_sha256_extract_update(state, ikm.slice(7));
	expect(sodium.crypto_kdf_hkdf_sha256_extract_final(state)).toEqual(prk);
});

test("crypto_kdf_hkdf_sha512 supports one-shot and streaming extraction", () => {
	const ikm = sodium.from_hex("0b".repeat(22));
	const salt = sodium.from_hex("000102030405060708090a0b0c");
	const context = "libsodium.js HKDF";
	const prk = sodium.crypto_kdf_hkdf_sha512_extract(salt, ikm);

	expect(prk).toHaveLength(sodium.crypto_kdf_hkdf_sha512_KEYBYTES);
	expect(sodium.crypto_kdf_hkdf_sha512_expand(42, context, prk)).toHaveLength(
		42,
	);

	const state = sodium.crypto_kdf_hkdf_sha512_extract_init(salt);
	sodium.crypto_kdf_hkdf_sha512_extract_update(state, ikm.slice(0, 7));
	sodium.crypto_kdf_hkdf_sha512_extract_update(state, ikm.slice(7));
	expect(sodium.crypto_kdf_hkdf_sha512_extract_final(state)).toEqual(prk);
});

test("crypto_kdf_derive_from_key rejects invalid subkey lengths", () => {
	const key = sodium.crypto_kdf_keygen();
	const context = "NaClTest";

	expect(() =>
		sodium.crypto_kdf_derive_from_key(
			sodium.crypto_kdf_BYTES_MIN - 1,
			1,
			context,
			key,
		),
	).toThrow();
	expect(() =>
		sodium.crypto_kdf_derive_from_key(
			sodium.crypto_kdf_BYTES_MAX + 1,
			1,
			context,
			key,
		),
	).toThrow();

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
