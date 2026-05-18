import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

test("crypto_onetimeauth_init checks key length", () => {
	const key = new Uint8Array(sodium.crypto_onetimeauth_KEYBYTES);

	expect(() => sodium.crypto_onetimeauth_init(key)).not.toThrow();
	expect(() => sodium.crypto_onetimeauth_init(key.slice(1))).toThrow();
});

test("crypto_onetimeauth_init requires a key", () => {
	expect(() => sodium.crypto_onetimeauth_init()).toThrow();
	expect(() => sodium.crypto_onetimeauth_init(null)).toThrow();
});
