import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

test("buf input rejects null", () => {
	const message = sodium.from_string("test");
	const key = new Uint8Array(sodium.crypto_secretbox_KEYBYTES);
	expect(() => sodium.crypto_secretbox_easy(message, null, key)).toThrow();
});

test("unsized_buf input rejects null", () => {
	const nonce = new Uint8Array(sodium.crypto_secretbox_NONCEBYTES);
	const key = new Uint8Array(sodium.crypto_secretbox_KEYBYTES);
	expect(() => sodium.crypto_secretbox_easy(null, nonce, key)).toThrow();
});

test("minsized_buf input rejects null", () => {
	const keypair = sodium.crypto_box_keypair();
	expect(() =>
		sodium.crypto_box_seal_open(null, keypair.publicKey, keypair.privateKey),
	).toThrow();
});
