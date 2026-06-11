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

test("crypto_secretbox_easy buffers get zeroed", () => {
	const key = sodium.randombytes_buf(sodium.crypto_secretbox_KEYBYTES);
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
	sodium.crypto_secretbox_easy(sodium.from_string("hello"), nonce, key);
});

test("crypto_kem_enc buffers get zeroed", () => {
	const keypair = sodium.crypto_kem_keypair();
	sodium.crypto_kem_enc(keypair.publicKey);
});

test("sodium.pad buffers get zeroed", () => {
	sodium.pad(sodium.from_string("plaintext"), 16);
});
