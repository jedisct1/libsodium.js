import { afterEach, beforeEach, expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

// Monkey patch to verify freed memory is zeroed
const sizes = new Map<number, number>();
let origMalloc: (size: number) => number;
let origFree: (addr: number) => void;

beforeEach(() => {
	sizes.clear();
	origMalloc = sodium.libsodium._malloc;
	origFree = sodium.libsodium._free;
	sodium.libsodium._malloc = (size: number) => {
		const addr = origMalloc(size);
		sizes.set(addr, size);
		return addr;
	};
	sodium.libsodium._free = (addr: number) => {
		const size = sizes.get(addr);
		if (size != null) {
			const region = sodium.libsodium.HEAPU8.subarray(addr, addr + size);
			expect(region.every((b: number) => b === 0)).toBe(true);
			sizes.delete(addr);
		}
		origFree(addr);
	};
});

afterEach(() => {
	sodium.libsodium._malloc = origMalloc;
	sodium.libsodium._free = origFree;
});

test("free rejects invalid addresses", () => {
	for (const bad of [undefined, null, NaN, 0, -1, 1.5, "foo", true]) {
		expect(() => sodium.free(bad)).toThrow(TypeError);
	}
});

test("crypto_xof_shake128_update rejects invalid addresses", () => {
	const message = sodium.from_string("hello");
	for (const bad of [undefined, null, NaN, 0, -1, 1.5, "foo", true]) {
		expect(() => sodium.crypto_xof_shake128_update(bad, message)).toThrow(
			TypeError,
		);
	}
});

test("free accepts valid state", () => {
	const state = sodium.crypto_xof_shake128_init();
	sodium.crypto_xof_shake128_update(state, sodium.from_string("data"));
	expect(() => sodium.free(state)).not.toThrow();
});

test("free rejects double-free", () => {
	const state = sodium.crypto_xof_shake128_init();
	sodium.free(state);
	expect(() => sodium.free(state)).toThrow(Error);
});

test("free rejects untracked state", () => {
	const garbage = sodium.libsodium._malloc(256);
	expect(() => sodium.free(garbage)).toThrow(Error);
	// Manually zero because `garbage` is untracked
	sodium.libsodium.HEAPU8.fill(0, garbage, garbage + 256);
	sodium.libsodium._free(garbage);
});

test("crypto_sign_final_create accepts valid state", () => {
	const message = sodium.from_string("hello");
	const keypair = sodium.crypto_sign_keypair();
	const state = sodium.crypto_sign_init();
	sodium.crypto_sign_update(state, message);
	expect(() =>
		sodium.crypto_sign_final_create(state, keypair.privateKey),
	).not.toThrow();
});

test("crypto_xof_shake128_update rejects untracked state", () => {
	const garbage = sodium.libsodium._malloc(256);
	const message = sodium.from_string("hello");
	expect(() => sodium.crypto_xof_shake128_update(garbage, message)).toThrow(
		Error,
	);
	// Manually zero because `garbage` is untracked
	sodium.libsodium.HEAPU8.fill(0, garbage, garbage + 256);
	sodium.libsodium._free(garbage);
});

test("crypto_xof_shake128_update rejects freed state", () => {
	const message = sodium.from_string("hello");
	const state = sodium.crypto_xof_shake128_init();
	sodium.free(state);
	expect(() => sodium.crypto_xof_shake128_update(state, message)).toThrow(
		Error,
	);
});

test("crypto_sign_final_create rejects double-final", () => {
	const message = sodium.from_string("hello");
	const keypair = sodium.crypto_sign_keypair();
	const state = sodium.crypto_sign_init();
	sodium.crypto_sign_update(state, message);
	sodium.crypto_sign_final_create(state, keypair.privateKey);
	expect(() =>
		sodium.crypto_sign_final_create(state, keypair.privateKey),
	).toThrow(Error);
});
