import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

// These tests verify that TypeScript correctly infers return types based on outputFormat.
// The tests use type assertions that would fail to compile if the types were wrong.

test("default outputFormat returns Uint8Array", () => {
	const key = sodium.crypto_secretbox_keygen();

	// TypeScript should infer Uint8Array, not Uint8Array | string
	const result: Uint8Array = key;
	expect(result).toBeInstanceOf(Uint8Array);
});

test("explicit uint8array outputFormat returns Uint8Array", () => {
	const key = sodium.crypto_secretbox_keygen("uint8array");

	const result: Uint8Array = key;
	expect(result).toBeInstanceOf(Uint8Array);
});

test("null outputFormat returns Uint8Array", () => {
	const key = sodium.crypto_secretbox_keygen(null);

	const result: Uint8Array = key;
	expect(result).toBeInstanceOf(Uint8Array);
});

test("hex outputFormat returns string", () => {
	const key = sodium.crypto_secretbox_keygen("hex");

	const result: string = key;
	expect(typeof result).toBe("string");
});

test("base64 outputFormat returns string", () => {
	const key = sodium.crypto_secretbox_keygen("base64");

	const result: string = key;
	expect(typeof result).toBe("string");
});

test("text outputFormat returns string", () => {
	const message = sodium.from_string("hello");
	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	// Encrypt then decrypt with text output
	const cipher = sodium.crypto_secretbox_easy(message, nonce, key);
	const decrypted = sodium.crypto_secretbox_open_easy(
		cipher,
		nonce,
		key,
		"text",
	);

	const result: string = decrypted;
	expect(typeof result).toBe("string");
});

// Object return types

test("keypair with default format returns object with Uint8Array fields", () => {
	const keys = sodium.crypto_box_keypair();

	// TypeScript should infer { publicKey: Uint8Array; privateKey: Uint8Array; keyType: string }
	const pk: Uint8Array = keys.publicKey;
	const sk: Uint8Array = keys.privateKey;
	const kt: string = keys.keyType;

	expect(pk).toBeInstanceOf(Uint8Array);
	expect(sk).toBeInstanceOf(Uint8Array);
	expect(typeof kt).toBe("string");
});

test("keypair with hex format returns object with string fields", () => {
	const keys = sodium.crypto_box_keypair("hex");

	// TypeScript should infer { publicKey: string; privateKey: string; keyType: string }
	const pk: string = keys.publicKey;
	const sk: string = keys.privateKey;
	const kt: string = keys.keyType;

	expect(typeof pk).toBe("string");
	expect(typeof sk).toBe("string");
	expect(typeof kt).toBe("string");
});

test("detached encryption with default format returns Uint8Array fields", () => {
	const message = sodium.from_string("test");
	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const result = sodium.crypto_secretbox_detached(message, nonce, key);

	const cipher: Uint8Array = result.cipher;
	const mac: Uint8Array = result.mac;

	expect(cipher).toBeInstanceOf(Uint8Array);
	expect(mac).toBeInstanceOf(Uint8Array);
});

test("detached encryption with hex format returns string fields", () => {
	const message = sodium.from_string("test");
	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const result = sodium.crypto_secretbox_detached(message, nonce, key, "hex");

	const cipher: string = result.cipher;
	const mac: string = result.mac;

	expect(typeof cipher).toBe("string");
	expect(typeof mac).toBe("string");
});

// Functions that can return false

test("secretstream pull with default format can return false", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state, header } = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("test");
	const tag = sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE;
	const cipher = sodium.crypto_secretstream_xchacha20poly1305_push(state, message, null, tag);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, key);
	const result = sodium.crypto_secretstream_xchacha20poly1305_pull(pullState, cipher, null);

	// TypeScript should infer { message: Uint8Array; tag: number } | false
	if (result !== false) {
		const msg: Uint8Array = result.message;
		const t: number = result.tag;
		expect(msg).toBeInstanceOf(Uint8Array);
		expect(typeof t).toBe("number");
	}
});

test("secretstream pull with hex format can return false", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state, header } = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("test");
	const tag = sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE;
	const cipher = sodium.crypto_secretstream_xchacha20poly1305_push(state, message, null, tag);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, key);
	const result = sodium.crypto_secretstream_xchacha20poly1305_pull(pullState, cipher, null, "hex");

	// TypeScript should infer { message: string; tag: number } | false
	if (result !== false) {
		const msg: string = result.message;
		const t: number = result.tag;
		expect(typeof msg).toBe("string");
		expect(typeof t).toBe("number");
	}
});
