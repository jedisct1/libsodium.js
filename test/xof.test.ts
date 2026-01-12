import { expect, test } from "bun:test";

const test_helper = require("../test/test_helper");

const sodium = await test_helper.init();

test("crypto_xof_shake128 one-shot", () => {
	const message = sodium.from_string("test message");
	const hash32 = sodium.crypto_xof_shake128(32, message);
	expect(hash32.length).toBe(32);

	const hash64 = sodium.crypto_xof_shake128(64, message);
	expect(hash64.length).toBe(64);

	// First 32 bytes should be the same
	expect(hash64.slice(0, 32)).toEqual(hash32);

	// Empty message should work
	const empty_hash = sodium.crypto_xof_shake128(32, new Uint8Array(0));
	expect(empty_hash.length).toBe(32);
});

test("crypto_xof_shake256 one-shot", () => {
	const message = sodium.from_string("test message");
	const hash32 = sodium.crypto_xof_shake256(32, message);
	expect(hash32.length).toBe(32);

	const hash64 = sodium.crypto_xof_shake256(64, message);
	expect(hash64.length).toBe(64);

	// First 32 bytes should be the same
	expect(hash64.slice(0, 32)).toEqual(hash32);
});

test("crypto_xof_turboshake128 one-shot", () => {
	const message = sodium.from_string("test message");
	const hash32 = sodium.crypto_xof_turboshake128(32, message);
	expect(hash32.length).toBe(32);

	const hash64 = sodium.crypto_xof_turboshake128(64, message);
	expect(hash64.length).toBe(64);

	// First 32 bytes should be the same
	expect(hash64.slice(0, 32)).toEqual(hash32);
});

test("crypto_xof_turboshake256 one-shot", () => {
	const message = sodium.from_string("test message");
	const hash32 = sodium.crypto_xof_turboshake256(32, message);
	expect(hash32.length).toBe(32);

	const hash64 = sodium.crypto_xof_turboshake256(64, message);
	expect(hash64.length).toBe(64);

	// First 32 bytes should be the same
	expect(hash64.slice(0, 32)).toEqual(hash32);
});

test("crypto_xof_shake128 streaming", () => {
	const message = sodium.from_string("test message");

	// One-shot for comparison
	const oneshot = sodium.crypto_xof_shake128(64, message);

	// Streaming
	const state = sodium.crypto_xof_shake128_init();
	sodium.crypto_xof_shake128_update(state, message);
	const out1 = sodium.crypto_xof_shake128_squeeze(state, 32);
	const out2 = sodium.crypto_xof_shake128_squeeze(state, 32);

	// Concatenated output should match one-shot
	const streaming = new Uint8Array([...out1, ...out2]);
	expect(streaming).toEqual(oneshot);
});

test("crypto_xof_shake256 streaming", () => {
	const message = sodium.from_string("test message");

	// One-shot for comparison
	const oneshot = sodium.crypto_xof_shake256(64, message);

	// Streaming
	const state = sodium.crypto_xof_shake256_init();
	sodium.crypto_xof_shake256_update(state, message);
	const out1 = sodium.crypto_xof_shake256_squeeze(state, 32);
	const out2 = sodium.crypto_xof_shake256_squeeze(state, 32);

	// Concatenated output should match one-shot
	const streaming = new Uint8Array([...out1, ...out2]);
	expect(streaming).toEqual(oneshot);
});

test("crypto_xof_turboshake128 streaming", () => {
	const message = sodium.from_string("test message");

	// One-shot for comparison
	const oneshot = sodium.crypto_xof_turboshake128(64, message);

	// Streaming
	const state = sodium.crypto_xof_turboshake128_init();
	sodium.crypto_xof_turboshake128_update(state, message);
	const out1 = sodium.crypto_xof_turboshake128_squeeze(state, 32);
	const out2 = sodium.crypto_xof_turboshake128_squeeze(state, 32);

	// Concatenated output should match one-shot
	const streaming = new Uint8Array([...out1, ...out2]);
	expect(streaming).toEqual(oneshot);
});

test("crypto_xof_turboshake256 streaming", () => {
	const message = sodium.from_string("test message");

	// One-shot for comparison
	const oneshot = sodium.crypto_xof_turboshake256(64, message);

	// Streaming
	const state = sodium.crypto_xof_turboshake256_init();
	sodium.crypto_xof_turboshake256_update(state, message);
	const out1 = sodium.crypto_xof_turboshake256_squeeze(state, 32);
	const out2 = sodium.crypto_xof_turboshake256_squeeze(state, 32);

	// Concatenated output should match one-shot
	const streaming = new Uint8Array([...out1, ...out2]);
	expect(streaming).toEqual(oneshot);
});

test("crypto_xof_shake128 init_with_domain", () => {
	const message = sodium.from_string("test message");

	// Standard domain (0x1F) should produce different output than custom domain
	const state_standard = sodium.crypto_xof_shake128_init();
	sodium.crypto_xof_shake128_update(state_standard, message);
	const out_standard = sodium.crypto_xof_shake128_squeeze(state_standard, 32);

	const state_custom = sodium.crypto_xof_shake128_init_with_domain(0x20);
	sodium.crypto_xof_shake128_update(state_custom, message);
	const out_custom = sodium.crypto_xof_shake128_squeeze(state_custom, 32);

	// Outputs should be different with different domains
	expect(out_standard).not.toEqual(out_custom);
});

test("crypto_xof_shake256 init_with_domain", () => {
	const message = sodium.from_string("test message");

	const state_standard = sodium.crypto_xof_shake256_init();
	sodium.crypto_xof_shake256_update(state_standard, message);
	const out_standard = sodium.crypto_xof_shake256_squeeze(state_standard, 32);

	const state_custom = sodium.crypto_xof_shake256_init_with_domain(0x20);
	sodium.crypto_xof_shake256_update(state_custom, message);
	const out_custom = sodium.crypto_xof_shake256_squeeze(state_custom, 32);

	expect(out_standard).not.toEqual(out_custom);
});

test("crypto_xof_turboshake128 init_with_domain", () => {
	const message = sodium.from_string("test message");

	const state_standard = sodium.crypto_xof_turboshake128_init();
	sodium.crypto_xof_turboshake128_update(state_standard, message);
	const out_standard = sodium.crypto_xof_turboshake128_squeeze(
		state_standard,
		32,
	);

	const state_custom = sodium.crypto_xof_turboshake128_init_with_domain(0x20);
	sodium.crypto_xof_turboshake128_update(state_custom, message);
	const out_custom = sodium.crypto_xof_turboshake128_squeeze(state_custom, 32);

	expect(out_standard).not.toEqual(out_custom);
});

test("crypto_xof_turboshake256 init_with_domain", () => {
	const message = sodium.from_string("test message");

	const state_standard = sodium.crypto_xof_turboshake256_init();
	sodium.crypto_xof_turboshake256_update(state_standard, message);
	const out_standard = sodium.crypto_xof_turboshake256_squeeze(
		state_standard,
		32,
	);

	const state_custom = sodium.crypto_xof_turboshake256_init_with_domain(0x20);
	sodium.crypto_xof_turboshake256_update(state_custom, message);
	const out_custom = sodium.crypto_xof_turboshake256_squeeze(state_custom, 32);

	expect(out_standard).not.toEqual(out_custom);
});

test("crypto_xof constants", () => {
	expect(sodium.crypto_xof_shake128_BLOCKBYTES).toBe(168);
	expect(sodium.crypto_xof_shake128_STATEBYTES).toBe(256);
	expect(sodium.crypto_xof_shake256_BLOCKBYTES).toBe(136);
	expect(sodium.crypto_xof_shake256_STATEBYTES).toBe(256);
	expect(sodium.crypto_xof_turboshake128_BLOCKBYTES).toBe(168);
	expect(sodium.crypto_xof_turboshake128_STATEBYTES).toBe(256);
	expect(sodium.crypto_xof_turboshake256_BLOCKBYTES).toBe(136);
	expect(sodium.crypto_xof_turboshake256_STATEBYTES).toBe(256);
});

test("crypto_xof_shake128 streaming multi-part input", () => {
	const part1 = sodium.from_string("test ");
	const part2 = sodium.from_string("message");
	const full = sodium.from_string("test message");

	// One-shot
	const oneshot = sodium.crypto_xof_shake128(32, full);

	// Streaming with multiple updates
	const state = sodium.crypto_xof_shake128_init();
	sodium.crypto_xof_shake128_update(state, part1);
	sodium.crypto_xof_shake128_update(state, part2);
	const streaming = sodium.crypto_xof_shake128_squeeze(state, 32);

	expect(streaming).toEqual(oneshot);
});

test("crypto_xof output format hex", () => {
	const message = sodium.from_string("test message");
	const hash_hex = sodium.crypto_xof_shake128(32, message, "hex");
	expect(typeof hash_hex).toBe("string");
	expect(hash_hex.length).toBe(64); // 32 bytes = 64 hex chars
});
