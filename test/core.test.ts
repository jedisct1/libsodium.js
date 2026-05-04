import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

test("crypto_core_hchacha20 checks optional constant length", () => {
	const input = new Uint8Array(sodium.crypto_core_hchacha20_INPUTBYTES);
	const key = new Uint8Array(sodium.crypto_core_hchacha20_KEYBYTES);
	const constant = new Uint8Array(sodium.crypto_core_hchacha20_CONSTBYTES);

	expect(sodium.crypto_core_hchacha20(input, key, constant).length).toBe(
		sodium.crypto_core_hchacha20_OUTPUTBYTES,
	);
	expect(() =>
		sodium.crypto_core_hchacha20(input, key, constant.slice(1)),
	).toThrow();
});

test("crypto_core_hsalsa20 checks optional constant length", () => {
	const input = new Uint8Array(sodium.crypto_core_hsalsa20_INPUTBYTES);
	const key = new Uint8Array(sodium.crypto_core_hsalsa20_KEYBYTES);
	const constant = new Uint8Array(sodium.crypto_core_hsalsa20_CONSTBYTES);

	expect(sodium.crypto_core_hsalsa20(input, key, constant).length).toBe(
		sodium.crypto_core_hsalsa20_OUTPUTBYTES,
	);
	expect(() =>
		sodium.crypto_core_hsalsa20(input, key, constant.slice(1)),
	).toThrow();
});
