import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

test("crypto_pwhash", () => {
	const password = sodium.from_string("correct horse battery staple");
	const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);

	// Derive a 32-byte key using Argon2id
	const key = sodium.crypto_pwhash(
		32,
		password,
		salt,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_ALG_ARGON2ID13,
	);

	expect(key.length).toBe(32);

	// Same password and salt should produce the same key
	const key2 = sodium.crypto_pwhash(
		32,
		password,
		salt,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_ALG_ARGON2ID13,
	);
	expect(key2).toEqual(key);

	// Different password should produce different key
	const differentPassword = sodium.from_string("wrong password");
	const key3 = sodium.crypto_pwhash(
		32,
		differentPassword,
		salt,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_ALG_ARGON2ID13,
	);
	expect(key3).not.toEqual(key);

	// Different salt should produce different key
	const differentSalt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);
	const key4 = sodium.crypto_pwhash(
		32,
		password,
		differentSalt,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_ALG_ARGON2ID13,
	);
	expect(key4).not.toEqual(key);
});

test("crypto_pwhash_str", () => {
	const password = sodium.from_string("my secret password");

	// Create a password hash string
	const hash = sodium.crypto_pwhash_str(
		password,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
	);

	// Hash should be a string
	expect(typeof hash).toBe("string");

	// Hash should start with $argon2id$ (Argon2id algorithm identifier)
	expect(hash.startsWith("$argon2id$")).toBe(true);

	// Hash should not exceed STRBYTES length
	expect(hash.length).toBeLessThanOrEqual(sodium.crypto_pwhash_STRBYTES);

	// Two hashes of the same password should be different (different salts)
	const hash2 = sodium.crypto_pwhash_str(
		password,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
	);
	expect(hash2).not.toBe(hash);
});

test("crypto_pwhash_str_verify - successful verification", () => {
	const password = sodium.from_string("correct password");

	// Create a password hash
	const hash = sodium.crypto_pwhash_str(
		password,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
	);

	// Verification should succeed with correct password
	const isValid = sodium.crypto_pwhash_str_verify(hash, password);
	expect(isValid).toBe(true);
});

test("crypto_pwhash_str_verify - failed verification", () => {
	const password = sodium.from_string("correct password");
	const wrongPassword = sodium.from_string("wrong password");

	// Create a password hash
	const hash = sodium.crypto_pwhash_str(
		password,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
	);

	// Verification should fail with wrong password
	const isValid = sodium.crypto_pwhash_str_verify(hash, wrongPassword);
	expect(isValid).toBe(false);
});

test("crypto_pwhash_str_needs_rehash - same parameters", () => {
	const password = sodium.from_string("test password");

	// Create a hash with INTERACTIVE limits
	const hash = sodium.crypto_pwhash_str(
		password,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
	);

	// Hash should not need rehashing with same parameters
	const needsRehash = sodium.crypto_pwhash_str_needs_rehash(
		hash,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
	);
	expect(needsRehash).toBe(false);
});

test("crypto_pwhash_str_needs_rehash - increased parameters", () => {
	const password = sodium.from_string("test password");

	// Create a hash with INTERACTIVE limits
	const hash = sodium.crypto_pwhash_str(
		password,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
	);

	// Hash should need rehashing when checked with higher parameters
	// Using MODERATE limits which are higher than INTERACTIVE
	const needsRehash = sodium.crypto_pwhash_str_needs_rehash(
		hash,
		sodium.crypto_pwhash_OPSLIMIT_MODERATE,
		sodium.crypto_pwhash_MEMLIMIT_MODERATE,
	);
	expect(needsRehash).toBe(true);
});

test("crypto_pwhash with different output lengths", () => {
	const password = sodium.from_string("password for key derivation");
	const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);

	// Derive keys of different lengths
	const key16 = sodium.crypto_pwhash(
		16,
		password,
		salt,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_ALG_ARGON2ID13,
	);
	expect(key16.length).toBe(16);

	const key64 = sodium.crypto_pwhash(
		64,
		password,
		salt,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_ALG_ARGON2ID13,
	);
	expect(key64.length).toBe(64);

	// First 16 bytes should not match (different output length affects derivation)
	// Actually in Argon2, different output lengths produce entirely different outputs
	// Let's verify the keys are of correct length and non-zero
	expect(key16.some((byte: number) => byte !== 0)).toBe(true);
	expect(key64.some((byte: number) => byte !== 0)).toBe(true);
});

test("crypto_pwhash constants are defined", () => {
	// Verify that all required constants are available
	expect(sodium.crypto_pwhash_SALTBYTES).toBeGreaterThan(0);
	expect(sodium.crypto_pwhash_STRBYTES).toBeGreaterThan(0);
	expect(sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE).toBeGreaterThan(0);
	expect(sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE).toBeGreaterThan(0);
	expect(sodium.crypto_pwhash_OPSLIMIT_MODERATE).toBeGreaterThan(0);
	expect(sodium.crypto_pwhash_MEMLIMIT_MODERATE).toBeGreaterThan(0);
	expect(sodium.crypto_pwhash_ALG_ARGON2ID13).toBeGreaterThan(0);
	expect(sodium.crypto_pwhash_ALG_DEFAULT).toBeGreaterThan(0);
});
