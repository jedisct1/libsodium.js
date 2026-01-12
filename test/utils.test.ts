import { expect, test } from "bun:test";

const test_helper = require("./test_helper");

const sodium = await test_helper.init();

test("randombyte_buf", () => {
	for (let i = 0; i < 100; i++) {
		const a = sodium.randombytes_buf(100);
		const b = sodium.randombytes_buf(100);
		expect(a).not.toEqual(b);
	}
});

test("randombyte_uniform", () => {
	for (let i = 0; i < 10; i++) {
		const a = sodium.randombytes_uniform(0x3fffffff);
		const b = sodium.randombytes_uniform(0x3fffffff);
		expect(a).not.toEqual(b);
	}
});

test("sodium_compare", () => {
	const a = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others",
	);
	const b = sodium.from_string(
		"Science, math, technology, engineering, and compassion for others",
	);
	const c = sodium.from_string(
		"Science, math, technology, engineering, and compassion for OTHERS",
	);
	expect(sodium.compare(a, b)).toBe(0);
	expect(sodium.compare(a, c)).toBe(1);
	expect(sodium.compare(c, b)).toBe(-1);
});

test("sodium_increment", () => {
	let a = sodium.from_hex("80808080");
	let b = sodium.from_hex("81808080");
	sodium.increment(a);
	expect(sodium.memcmp(b, a)).toBe(true);

	a = sodium.from_hex("ffffffff");
	b = sodium.from_hex("00000000");
	sodium.increment(a);
	expect(sodium.memcmp(b, a)).toBe(true);
});

test("sodium_is_zero", () => {
	let buf = sodium.from_hex("00");
	expect(sodium.is_zero(buf, 1)).toBe(true);
	buf = sodium.from_hex("01");
	expect(sodium.is_zero(buf, 1)).toBe(false);
});

test("sodium_memcmp", () => {
	const a = sodium.from_hex("80808080");
	const b = sodium.from_hex("81808080");
	const c = sodium.from_hex("81808080");
	expect(sodium.memcmp(a, b)).toBe(false);
	expect(sodium.memcmp(b, c)).toBe(true);
});

test("sodium_memzero", () => {
	const buf = sodium.from_hex("80808080");
	sodium.memzero(buf);
	expect(sodium.to_hex(buf)).toBe("00000000");
});

test("sodium_pad", () => {
	for (let i = 0; i < 100; i++) {
		const buf = sodium.randombytes_buf(sodium.randombytes_uniform(96) + 16);
		const size = sodium.randombytes_uniform(96) + 5;
		const padded = sodium.pad(buf, size);
		const unpadded = sodium.unpad(padded, size);
		expect(unpadded).toEqual(buf);
	}
});

test("sodium_add", () => {
	const one = sodium.from_hex("01000000");
	const big = sodium.from_hex("fe000000");
	sodium.add(big, one);
	expect(big).toEqual(sodium.from_hex("ff000000"));
	sodium.add(big, one);
	expect(big).toEqual(sodium.from_hex("00010000"));
});
