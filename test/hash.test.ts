import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

test("crypto_shorthash", () => {
	const key = sodium.from_hex("808182838485868788898a8b8c8d8e8f");
	const message0 = sodium.from_string("This is short input0");
	const mac0 = sodium.crypto_shorthash(message0, key);
	expect(sodium.to_hex(mac0)).toBe("ef589fb9ef4196b3");

	const message1 = sodium.from_string("This is short input1");
	const mac1 = sodium.crypto_shorthash(message1, key);
	expect(sodium.to_hex(mac1)).toBe("5e8f01039bc53eb7");
});

test("crypto_generichash", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const piece1 = message.slice(0, 16);
	const piece2 = message.slice(16);
	const h = sodium.crypto_generichash(32, message);
	const expected_hash_hex =
		"47c1fdbde32b30b9c54dd47cf88ba92d2d05df1265e342c9563ed56aee84ab02";
	expect(sodium.to_hex(h)).toBe(expected_hash_hex);

	const state = sodium.crypto_generichash_init(null, 32);
	sodium.crypto_generichash_update(state, piece1);
	sodium.crypto_generichash_update(state, piece2);
	const h2 = sodium.crypto_generichash_final(state, 32);
	expect(h2).toEqual(h);

	const key = sodium.crypto_generichash_keygen();
	const h3 = sodium.crypto_generichash(32, message, key);
	expect(h3).not.toEqual(h);
});

test("crypto_generichash_init allocates the runtime state size", () => {
	const stateBytes = sodium.libsodium._crypto_generichash_statebytes();
	const allocations: number[] = [];
	const originalMalloc = sodium.libsodium._malloc;

	sodium.libsodium._malloc = (length: number) => {
		allocations.push(length);
		return originalMalloc(length);
	};

	try {
		const state = sodium.crypto_generichash_init(null, 32);
		sodium.crypto_generichash_final(state, 32);
	} finally {
		sodium.libsodium._malloc = originalMalloc;
	}

	expect(allocations).toContain(stateBytes);
});

test("crypto_generichash2", () => {
	const key = sodium.from_hex(
		"4777a57dadf099111c8c21954b0b470b1990f34623990d32bf0340795ff858d8",
	);
	const message = sodium.from_string(
		"This is just - something to authenticate",
	);
	const mac1 = sodium.crypto_generichash(32, message, key);
	const expected_mac_hex =
		"e229536f8c0d462126f040126392b46151200531f7bd12061a2237833a0ccdba";
	expect(sodium.to_hex(mac1)).toBe(expected_mac_hex);

	const part1 = message.slice(0, 16);
	const part2 = message.slice(16);
	const state = sodium.crypto_generichash_init(key, 32);
	sodium.crypto_generichash_update(state, part1);
	sodium.crypto_generichash_update(state, part2);
	const mac2 = sodium.crypto_generichash_final(state, 32);
	expect(mac1).toEqual(mac2);

	const mac3 = sodium.crypto_generichash(32, part1, key);
	expect(mac3).not.toEqual(mac1);
});

test("crypto_generichash rejects out-of-range hash_length", () => {
	const message = sodium.from_string("hello");

	expect(() =>
		sodium.crypto_generichash(sodium.crypto_generichash_BYTES_MIN - 1, message),
	).toThrow();
	expect(() =>
		sodium.crypto_generichash(sodium.crypto_generichash_BYTES_MAX + 1, message),
	).toThrow();
	expect(() =>
		sodium.crypto_generichash_init(
			null,
			sodium.crypto_generichash_BYTES_MIN - 1,
		),
	).toThrow();
	expect(() =>
		sodium.crypto_generichash_init(
			null,
			sodium.crypto_generichash_BYTES_MAX + 1,
		),
	).toThrow();

	const min_hash = sodium.crypto_generichash(
		sodium.crypto_generichash_BYTES_MIN,
		message,
	);
	expect(min_hash.length).toBe(sodium.crypto_generichash_BYTES_MIN);

	const max_hash = sodium.crypto_generichash(
		sodium.crypto_generichash_BYTES_MAX,
		message,
	);
	expect(max_hash.length).toBe(sodium.crypto_generichash_BYTES_MAX);
});

test("crypto_generichash_final rejects out-of-range hash_length", () => {
	const message = sodium.from_string("hello");

	const bad_state = sodium.crypto_generichash_init(null, 32);
	sodium.crypto_generichash_update(bad_state, message);
	expect(() =>
		sodium.crypto_generichash_final(
			bad_state,
			sodium.crypto_generichash_BYTES_MIN - 1,
		),
	).toThrow();

	const bad_state2 = sodium.crypto_generichash_init(null, 32);
	sodium.crypto_generichash_update(bad_state2, message);
	expect(() =>
		sodium.crypto_generichash_final(
			bad_state2,
			sodium.crypto_generichash_BYTES_MAX + 1,
		),
	).toThrow();

	const min_state = sodium.crypto_generichash_init(
		null,
		sodium.crypto_generichash_BYTES_MIN,
	);
	sodium.crypto_generichash_update(min_state, message);
	const min_hash = sodium.crypto_generichash_final(
		min_state,
		sodium.crypto_generichash_BYTES_MIN,
	);
	expect(min_hash.length).toBe(sodium.crypto_generichash_BYTES_MIN);

	const max_state = sodium.crypto_generichash_init(
		null,
		sodium.crypto_generichash_BYTES_MAX,
	);
	sodium.crypto_generichash_update(max_state, message);
	const max_hash = sodium.crypto_generichash_final(
		max_state,
		sodium.crypto_generichash_BYTES_MAX,
	);
	expect(max_hash.length).toBe(sodium.crypto_generichash_BYTES_MAX);
});

test("crypto_generichash_blake2b_salt_personal rejects out-of-range subkey_len", () => {
	const key = sodium.crypto_generichash_keygen();
	const id = new Uint8Array(sodium.crypto_generichash_blake2b_SALTBYTES);
	const ctx = new Uint8Array(sodium.crypto_generichash_blake2b_PERSONALBYTES);

	expect(() =>
		sodium.crypto_generichash_blake2b_salt_personal(
			sodium.crypto_generichash_BYTES_MIN - 1,
			key,
			id,
			ctx,
		),
	).toThrow();
	expect(() =>
		sodium.crypto_generichash_blake2b_salt_personal(
			sodium.crypto_generichash_BYTES_MAX + 1,
			key,
			id,
			ctx,
		),
	).toThrow();

	const min_subkey = sodium.crypto_generichash_blake2b_salt_personal(
		sodium.crypto_generichash_BYTES_MIN,
		key,
		id,
		ctx,
	);
	expect(min_subkey.length).toBe(sodium.crypto_generichash_BYTES_MIN);

	const max_subkey = sodium.crypto_generichash_blake2b_salt_personal(
		sodium.crypto_generichash_BYTES_MAX,
		key,
		id,
		ctx,
	);
	expect(max_subkey.length).toBe(sodium.crypto_generichash_BYTES_MAX);
});

// SHA-256 Tests

test("crypto_hash_sha256 - one-shot basic", () => {
	const message = sodium.from_string("test message");
	const hash = sodium.crypto_hash_sha256(message);

	// Check output size is correct (32 bytes for SHA-256)
	expect(hash.length).toBe(sodium.crypto_hash_sha256_BYTES);
	expect(hash.length).toBe(32);
});

test("crypto_hash_sha256 - known test vector", () => {
	// Standard SHA-256 test vector: SHA-256("abc")
	const message = sodium.from_string("abc");
	const hash = sodium.crypto_hash_sha256(message);
	const expected =
		"ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
	expect(sodium.to_hex(hash)).toBe(expected);
});

test("crypto_hash_sha256 - deterministic", () => {
	const message = sodium.from_string("deterministic test input");
	const hash1 = sodium.crypto_hash_sha256(message);
	const hash2 = sodium.crypto_hash_sha256(message);
	expect(hash1).toEqual(hash2);
});

test("crypto_hash_sha256 - different inputs produce different hashes", () => {
	const message1 = sodium.from_string("input one");
	const message2 = sodium.from_string("input two");
	const hash1 = sodium.crypto_hash_sha256(message1);
	const hash2 = sodium.crypto_hash_sha256(message2);
	expect(hash1).not.toEqual(hash2);
});

test("crypto_hash_sha256 - streaming API", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const piece1 = message.slice(0, 16);
	const piece2 = message.slice(16);

	// One-shot hash
	const hash1 = sodium.crypto_hash_sha256(message);

	// Streaming hash
	const state = sodium.crypto_hash_sha256_init();
	sodium.crypto_hash_sha256_update(state, piece1);
	sodium.crypto_hash_sha256_update(state, piece2);
	const hash2 = sodium.crypto_hash_sha256_final(state);

	// Both should produce the same result
	expect(hash1).toEqual(hash2);
});

test("crypto_hash_sha256 - streaming with multiple updates", () => {
	const part1 = sodium.from_string("Hello, ");
	const part2 = sodium.from_string("World");
	const part3 = sodium.from_string("!");
	const fullMessage = sodium.from_string("Hello, World!");

	// One-shot hash of full message
	const hash1 = sodium.crypto_hash_sha256(fullMessage);

	// Streaming hash with multiple updates
	const state = sodium.crypto_hash_sha256_init();
	sodium.crypto_hash_sha256_update(state, part1);
	sodium.crypto_hash_sha256_update(state, part2);
	sodium.crypto_hash_sha256_update(state, part3);
	const hash2 = sodium.crypto_hash_sha256_final(state);

	expect(hash1).toEqual(hash2);
});

// SHA-512 Tests

test("crypto_hash_sha512 - one-shot basic", () => {
	const message = sodium.from_string("test message");
	const hash = sodium.crypto_hash_sha512(message);

	// Check output size is correct (64 bytes for SHA-512)
	expect(hash.length).toBe(sodium.crypto_hash_sha512_BYTES);
	expect(hash.length).toBe(64);
});

test("crypto_hash_sha512 - known test vector", () => {
	// Standard SHA-512 test vector: SHA-512("abc")
	const message = sodium.from_string("abc");
	const hash = sodium.crypto_hash_sha512(message);
	const expected =
		"ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f";
	expect(sodium.to_hex(hash)).toBe(expected);
});

test("crypto_hash_sha512 - deterministic", () => {
	const message = sodium.from_string("deterministic test input");
	const hash1 = sodium.crypto_hash_sha512(message);
	const hash2 = sodium.crypto_hash_sha512(message);
	expect(hash1).toEqual(hash2);
});

test("crypto_hash_sha512 - different inputs produce different hashes", () => {
	const message1 = sodium.from_string("input one");
	const message2 = sodium.from_string("input two");
	const hash1 = sodium.crypto_hash_sha512(message1);
	const hash2 = sodium.crypto_hash_sha512(message2);
	expect(hash1).not.toEqual(hash2);
});

test("crypto_hash_sha512 - streaming API", () => {
	const message = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others.",
	);
	const piece1 = message.slice(0, 16);
	const piece2 = message.slice(16);

	// One-shot hash
	const hash1 = sodium.crypto_hash_sha512(message);

	// Streaming hash
	const state = sodium.crypto_hash_sha512_init();
	sodium.crypto_hash_sha512_update(state, piece1);
	sodium.crypto_hash_sha512_update(state, piece2);
	const hash2 = sodium.crypto_hash_sha512_final(state);

	// Both should produce the same result
	expect(hash1).toEqual(hash2);
});

test("crypto_hash_sha512 - streaming with multiple updates", () => {
	const part1 = sodium.from_string("Hello, ");
	const part2 = sodium.from_string("World");
	const part3 = sodium.from_string("!");
	const fullMessage = sodium.from_string("Hello, World!");

	// One-shot hash of full message
	const hash1 = sodium.crypto_hash_sha512(fullMessage);

	// Streaming hash with multiple updates
	const state = sodium.crypto_hash_sha512_init();
	sodium.crypto_hash_sha512_update(state, part1);
	sodium.crypto_hash_sha512_update(state, part2);
	sodium.crypto_hash_sha512_update(state, part3);
	const hash2 = sodium.crypto_hash_sha512_final(state);

	expect(hash1).toEqual(hash2);
});

// crypto_hash (default hash function - SHA-512)

test("crypto_hash - one-shot basic", () => {
	const message = sodium.from_string("test message");
	const hash = sodium.crypto_hash(message);

	// crypto_hash is SHA-512, so output is 64 bytes
	expect(hash.length).toBe(sodium.crypto_hash_BYTES);
	expect(hash.length).toBe(64);
});

test("crypto_hash - same as crypto_hash_sha512", () => {
	// crypto_hash should produce the same result as crypto_hash_sha512
	const message = sodium.from_string("abc");
	const hash1 = sodium.crypto_hash(message);
	const hash2 = sodium.crypto_hash_sha512(message);
	expect(hash1).toEqual(hash2);
});

test("crypto_hash - known test vector", () => {
	// Same as SHA-512 test vector since crypto_hash uses SHA-512
	const message = sodium.from_string("abc");
	const hash = sodium.crypto_hash(message);
	const expected =
		"ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f";
	expect(sodium.to_hex(hash)).toBe(expected);
});

test("crypto_hash - deterministic", () => {
	const message = sodium.from_string("deterministic test input");
	const hash1 = sodium.crypto_hash(message);
	const hash2 = sodium.crypto_hash(message);
	expect(hash1).toEqual(hash2);
});

test("crypto_hash - different inputs produce different hashes", () => {
	const message1 = sodium.from_string("input one");
	const message2 = sodium.from_string("input two");
	const hash1 = sodium.crypto_hash(message1);
	const hash2 = sodium.crypto_hash(message2);
	expect(hash1).not.toEqual(hash2);
});

test("crypto_hash_sha3256 - known test vector and streaming", () => {
	const message = sodium.from_string("abc");
	const oneShot = sodium.crypto_hash_sha3256(message);
	expect(oneShot.length).toBe(sodium.crypto_hash_sha3256_BYTES);
	expect(sodium.to_hex(oneShot)).toBe(
		"3a985da74fe225b2045c172d6bd390bd855f086e3e9d525b46bfe24511431532",
	);

	const state = sodium.crypto_hash_sha3256_init();
	sodium.crypto_hash_sha3256_update(state, sodium.from_string("a"));
	sodium.crypto_hash_sha3256_update(state, sodium.from_string("bc"));
	expect(sodium.crypto_hash_sha3256_final(state)).toEqual(oneShot);
});

test("crypto_hash_sha3512 - known test vector and streaming", () => {
	const message = sodium.from_string("abc");
	const oneShot = sodium.crypto_hash_sha3512(message);
	expect(oneShot.length).toBe(sodium.crypto_hash_sha3512_BYTES);
	expect(sodium.to_hex(oneShot)).toBe(
		"b751850b1a57168a5693cd924b6b096e08f621827444f70d884f5d0240d2712e10e116e9192af3c91a7ec57647e3934057340b4cf408d5a56592f8274eec53f0",
	);

	const state = sodium.crypto_hash_sha3512_init();
	sodium.crypto_hash_sha3512_update(state, sodium.from_string("a"));
	sodium.crypto_hash_sha3512_update(state, sodium.from_string("bc"));
	expect(sodium.crypto_hash_sha3512_final(state)).toEqual(oneShot);
});
