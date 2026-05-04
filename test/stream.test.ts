import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

function directStreamXorIc(
	functionName: string,
	message: Uint8Array,
	nonce: Uint8Array,
	counterLo: number,
	counterHi: number,
	key: Uint8Array,
): Uint8Array {
	const libsodium = sodium.libsodium;
	const addressPool: number[] = [];
	const output = new Uint8Array(message.length);

	const allocate = (bytes: Uint8Array): number => {
		const address = libsodium._malloc(bytes.length);
		addressPool.push(address);
		libsodium.HEAPU8.set(bytes, address);
		return address;
	};

	const outputAddress = libsodium._malloc(output.length);
	addressPool.push(outputAddress);

	const messageAddress = allocate(message);
	const nonceAddress = allocate(nonce);
	const keyAddress = allocate(key);

	try {
		const ret = libsodium[functionName](
			outputAddress,
			messageAddress,
			message.length,
			0,
			nonceAddress,
			counterLo,
			counterHi,
			keyAddress,
		);
		expect(ret).toBe(0);
		output.set(
			libsodium.HEAPU8.subarray(outputAddress, outputAddress + output.length),
		);
		return output;
	} finally {
		for (const address of addressPool) {
			libsodium._free(address);
		}
	}
}

test("crypto_stream_chacha20_xor_ic supports the full 64-bit counter", () => {
	const message = sodium.from_string("high counter chacha20 test vector");
	const nonce = sodium.randombytes_buf(
		sodium.crypto_stream_chacha20_NONCEBYTES,
	);
	const key = sodium.crypto_stream_chacha20_keygen();
	const counter = 1n << 32n;

	const wrapped = sodium.crypto_stream_chacha20_xor_ic(
		message,
		nonce,
		counter,
		key,
	);
	const direct = directStreamXorIc(
		"_crypto_stream_chacha20_xor_ic",
		message,
		nonce,
		0,
		1,
		key,
	);

	expect(wrapped).toEqual(direct);
});

test("crypto_stream_xchacha20_xor_ic supports the full 64-bit counter", () => {
	const message = sodium.from_string("high counter xchacha20 test vector");
	const nonce = sodium.randombytes_buf(
		sodium.crypto_stream_xchacha20_NONCEBYTES,
	);
	const key = sodium.crypto_stream_xchacha20_keygen();
	const counter = 1n << 32n;

	const wrapped = sodium.crypto_stream_xchacha20_xor_ic(
		message,
		nonce,
		counter,
		key,
	);
	const direct = directStreamXorIc(
		"_crypto_stream_xchacha20_xor_ic",
		message,
		nonce,
		0,
		1,
		key,
	);

	expect(wrapped).toEqual(direct);
});
