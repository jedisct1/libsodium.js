import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

test("free rejects invalid addresses", () => {
	for (const bad of [undefined, null, NaN, 0, -1, 1.5, "foo", true]) {
		expect(() => sodium.free(bad)).toThrow(TypeError);
	}
});

test("crypto_sign_update rejects invalid state_address values", () => {
	const message = sodium.from_string("hello");
	for (const bad of [undefined, null, NaN, 0, -1, 1.5, "foo", true]) {
		expect(() => sodium.crypto_sign_update(bad, message)).toThrow(TypeError);
	}
});
