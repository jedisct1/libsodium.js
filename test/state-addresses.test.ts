import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

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
