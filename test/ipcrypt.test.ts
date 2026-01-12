import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

test("crypto_ipcrypt constants", () => {
	expect(sodium.crypto_ipcrypt_BYTES).toBe(16);
	expect(sodium.crypto_ipcrypt_KEYBYTES).toBe(16);
	expect(sodium.crypto_ipcrypt_ND_KEYBYTES).toBe(16);
	expect(sodium.crypto_ipcrypt_ND_TWEAKBYTES).toBe(8);
	expect(sodium.crypto_ipcrypt_ND_INPUTBYTES).toBe(16);
	expect(sodium.crypto_ipcrypt_ND_OUTPUTBYTES).toBe(24);
	expect(sodium.crypto_ipcrypt_NDX_KEYBYTES).toBe(32);
	expect(sodium.crypto_ipcrypt_NDX_TWEAKBYTES).toBe(16);
	expect(sodium.crypto_ipcrypt_NDX_INPUTBYTES).toBe(16);
	expect(sodium.crypto_ipcrypt_NDX_OUTPUTBYTES).toBe(32);
	expect(sodium.crypto_ipcrypt_PFX_KEYBYTES).toBe(32);
	expect(sodium.crypto_ipcrypt_PFX_BYTES).toBe(16);
});

test("crypto_ipcrypt basic encrypt/decrypt", () => {
	const key = sodium.crypto_ipcrypt_keygen();
	expect(key.length).toBe(sodium.crypto_ipcrypt_KEYBYTES);

	// Simulate an IPv4 address (192.168.1.1) padded to 16 bytes
	const ip = new Uint8Array(16);
	ip[0] = 192;
	ip[1] = 168;
	ip[2] = 1;
	ip[3] = 1;

	const encrypted = sodium.crypto_ipcrypt_encrypt(ip, key);
	expect(encrypted.length).toBe(sodium.crypto_ipcrypt_BYTES);
	expect(encrypted).not.toEqual(ip);

	const decrypted = sodium.crypto_ipcrypt_decrypt(encrypted, key);
	expect(decrypted).toEqual(ip);
});

test("crypto_ipcrypt deterministic", () => {
	const key = sodium.crypto_ipcrypt_keygen();
	const ip = new Uint8Array(16);
	ip[0] = 10;
	ip[1] = 0;
	ip[2] = 0;
	ip[3] = 1;

	const encrypted1 = sodium.crypto_ipcrypt_encrypt(ip, key);
	const encrypted2 = sodium.crypto_ipcrypt_encrypt(ip, key);
	expect(encrypted1).toEqual(encrypted2);
});

test("crypto_ipcrypt_nd encrypt/decrypt (non-deterministic)", () => {
	const key = sodium.crypto_ipcrypt_keygen();
	const ip = new Uint8Array(16);
	ip[0] = 172;
	ip[1] = 16;
	ip[2] = 0;
	ip[3] = 1;

	// Non-deterministic: different tweaks produce different ciphertexts
	const tweak1 = sodium.randombytes_buf(sodium.crypto_ipcrypt_ND_TWEAKBYTES);
	const tweak2 = sodium.randombytes_buf(sodium.crypto_ipcrypt_ND_TWEAKBYTES);

	const encrypted1 = sodium.crypto_ipcrypt_nd_encrypt(ip, tweak1, key);
	const encrypted2 = sodium.crypto_ipcrypt_nd_encrypt(ip, tweak2, key);
	expect(encrypted1.length).toBe(sodium.crypto_ipcrypt_ND_OUTPUTBYTES);
	expect(encrypted1).not.toEqual(encrypted2);

	const decrypted1 = sodium.crypto_ipcrypt_nd_decrypt(encrypted1, key);
	const decrypted2 = sodium.crypto_ipcrypt_nd_decrypt(encrypted2, key);
	expect(decrypted1).toEqual(ip);
	expect(decrypted2).toEqual(ip);
});

test("crypto_ipcrypt_ndx encrypt/decrypt (extended non-deterministic)", () => {
	const key = sodium.crypto_ipcrypt_ndx_keygen();
	expect(key.length).toBe(sodium.crypto_ipcrypt_NDX_KEYBYTES);

	const ip = new Uint8Array(16);
	ip[0] = 8;
	ip[1] = 8;
	ip[2] = 8;
	ip[3] = 8;

	const tweak1 = sodium.randombytes_buf(sodium.crypto_ipcrypt_NDX_TWEAKBYTES);
	const tweak2 = sodium.randombytes_buf(sodium.crypto_ipcrypt_NDX_TWEAKBYTES);

	const encrypted1 = sodium.crypto_ipcrypt_ndx_encrypt(ip, tweak1, key);
	const encrypted2 = sodium.crypto_ipcrypt_ndx_encrypt(ip, tweak2, key);
	expect(encrypted1.length).toBe(sodium.crypto_ipcrypt_NDX_OUTPUTBYTES);
	expect(encrypted1).not.toEqual(encrypted2);

	const decrypted1 = sodium.crypto_ipcrypt_ndx_decrypt(encrypted1, key);
	const decrypted2 = sodium.crypto_ipcrypt_ndx_decrypt(encrypted2, key);
	expect(decrypted1).toEqual(ip);
	expect(decrypted2).toEqual(ip);
});

test("crypto_ipcrypt_pfx encrypt/decrypt (prefix-preserving)", () => {
	const key = sodium.crypto_ipcrypt_pfx_keygen();
	expect(key.length).toBe(sodium.crypto_ipcrypt_PFX_KEYBYTES);

	const ip = new Uint8Array(16);
	ip[0] = 1;
	ip[1] = 1;
	ip[2] = 1;
	ip[3] = 1;

	const encrypted = sodium.crypto_ipcrypt_pfx_encrypt(ip, key);
	expect(encrypted.length).toBe(sodium.crypto_ipcrypt_PFX_BYTES);
	expect(encrypted).not.toEqual(ip);

	const decrypted = sodium.crypto_ipcrypt_pfx_decrypt(encrypted, key);
	expect(decrypted).toEqual(ip);
});

test("crypto_ipcrypt_pfx is deterministic", () => {
	const key = sodium.crypto_ipcrypt_pfx_keygen();
	const ip = new Uint8Array(16);
	ip[0] = 192;
	ip[1] = 0;
	ip[2] = 2;
	ip[3] = 1;

	const encrypted1 = sodium.crypto_ipcrypt_pfx_encrypt(ip, key);
	const encrypted2 = sodium.crypto_ipcrypt_pfx_encrypt(ip, key);
	expect(encrypted1).toEqual(encrypted2);
});
