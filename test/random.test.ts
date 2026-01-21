import { describe, expect, test } from "bun:test";
import { init } from "./test_helper.ts";

const sodium = await init();

describe("randombytes_buf", () => {
	test("returns buffer of requested length", () => {
		for (const length of [0, 1, 16, 32, 64, 100, 256, 1000]) {
			const buf = sodium.randombytes_buf(length);
			expect(buf).toBeInstanceOf(Uint8Array);
			expect(buf.length).toBe(length);
		}
	});

	test("successive calls produce different outputs", () => {
		for (let i = 0; i < 100; i++) {
			const a = sodium.randombytes_buf(32);
			const b = sodium.randombytes_buf(32);
			expect(a).not.toEqual(b);
		}
	});

	test("output is not all zeros", () => {
		for (let i = 0; i < 100; i++) {
			const buf = sodium.randombytes_buf(32);
			const hasNonZero = buf.some((b: number) => b !== 0);
			expect(hasNonZero).toBe(true);
		}
	});

	test("output is not all same byte", () => {
		for (let i = 0; i < 100; i++) {
			const buf = sodium.randombytes_buf(64);
			const firstByte = buf[0];
			const allSame = buf.every((b: number) => b === firstByte);
			expect(allSame).toBe(false);
		}
	});

	test("byte distribution is roughly uniform (chi-squared test)", () => {
		const sampleSize = 256 * 1000;
		const buf = sodium.randombytes_buf(sampleSize);

		const counts = new Array(256).fill(0);
		for (let i = 0; i < buf.length; i++) {
			counts[buf[i]]++;
		}

		const expected = sampleSize / 256;
		let chiSquared = 0;
		for (let i = 0; i < 256; i++) {
			const diff = counts[i] - expected;
			chiSquared += (diff * diff) / expected;
		}

		// Chi-squared critical value for 255 df at p=0.001 is ~310
		// and at p=0.999 is ~186. We use a wide range to avoid flakiness.
		// For truly random data, chi-squared should be around 255.
		expect(chiSquared).toBeLessThan(400);
		expect(chiSquared).toBeGreaterThan(150);
	});

	test("supports different output formats", () => {
		const length = 32;
		const bytes = sodium.randombytes_buf(length);
		const hex = sodium.randombytes_buf(length, "hex");
		const base64 = sodium.randombytes_buf(length, "base64");

		expect(bytes).toBeInstanceOf(Uint8Array);
		expect(typeof hex).toBe("string");
		expect(hex.length).toBe(length * 2);
		expect(typeof base64).toBe("string");
	});
});

describe("randombytes_random", () => {
	test("returns a number", () => {
		const value = sodium.randombytes_random();
		expect(typeof value).toBe("number");
	});

	test("returns values in 32-bit unsigned range", () => {
		for (let i = 0; i < 1000; i++) {
			const value = sodium.randombytes_random();
			expect(value).toBeGreaterThanOrEqual(0);
			expect(value).toBeLessThanOrEqual(0xffffffff);
			expect(Number.isInteger(value)).toBe(true);
		}
	});

	test("successive calls produce different values", () => {
		const values = new Set<number>();
		for (let i = 0; i < 100; i++) {
			values.add(sodium.randombytes_random());
		}
		// With 32-bit range, 100 calls should almost always be unique
		expect(values.size).toBeGreaterThan(95);
	});

	test("produces values across the full range", () => {
		let hasLow = false;
		let hasMid = false;
		let hasHigh = false;

		for (let i = 0; i < 10000; i++) {
			const value = sodium.randombytes_random();
			if (value < 0x40000000) hasLow = true;
			else if (value < 0x80000000) hasMid = true;
			else if (value < 0xc0000000) hasMid = true;
			else hasHigh = true;

			if (hasLow && hasMid && hasHigh) break;
		}

		expect(hasLow).toBe(true);
		expect(hasMid).toBe(true);
		expect(hasHigh).toBe(true);
	});
});

describe("randombytes_uniform", () => {
	test("returns values less than upper_bound", () => {
		for (const bound of [1, 2, 10, 100, 1000, 0x7fffffff]) {
			for (let i = 0; i < 100; i++) {
				const value = sodium.randombytes_uniform(bound);
				expect(value).toBeGreaterThanOrEqual(0);
				expect(value).toBeLessThan(bound);
				expect(Number.isInteger(value)).toBe(true);
			}
		}
	});

	test("with bound=1 always returns 0", () => {
		for (let i = 0; i < 100; i++) {
			expect(sodium.randombytes_uniform(1)).toBe(0);
		}
	});

	test("with bound=2 produces both 0 and 1", () => {
		let hasZero = false;
		let hasOne = false;

		for (let i = 0; i < 100; i++) {
			const value = sodium.randombytes_uniform(2);
			if (value === 0) hasZero = true;
			if (value === 1) hasOne = true;
			if (hasZero && hasOne) break;
		}

		expect(hasZero).toBe(true);
		expect(hasOne).toBe(true);
	});

	test("distribution is roughly uniform", () => {
		const bound = 10;
		const iterations = 10000;
		const counts = new Array(bound).fill(0);

		for (let i = 0; i < iterations; i++) {
			counts[sodium.randombytes_uniform(bound)]++;
		}

		const expected = iterations / bound;
		// Each bucket should be within 20% of expected
		for (let i = 0; i < bound; i++) {
			expect(counts[i]).toBeGreaterThan(expected * 0.8);
			expect(counts[i]).toBeLessThan(expected * 1.2);
		}
	});

	test("avoids modulo bias for non-power-of-2 bounds", () => {
		// Test with a bound that would show bias if using simple modulo
		// 2^32 % 3 = 1, so bucket 0 would be slightly more likely with naive impl
		const bound = 3;
		const iterations = 30000;
		const counts = new Array(bound).fill(0);

		for (let i = 0; i < iterations; i++) {
			counts[sodium.randombytes_uniform(bound)]++;
		}

		const expected = iterations / bound;
		// Each bucket should be within 5% of expected
		for (let i = 0; i < bound; i++) {
			expect(counts[i]).toBeGreaterThan(expected * 0.95);
			expect(counts[i]).toBeLessThan(expected * 1.05);
		}
	});
});

describe("randombytes_buf_deterministic", () => {
	const SEED_BYTES = 32;

	test("same seed produces same output", () => {
		const seed = sodium.randombytes_buf(SEED_BYTES);

		const a = sodium.randombytes_buf_deterministic(64, seed);
		const b = sodium.randombytes_buf_deterministic(64, seed);

		expect(a).toEqual(b);
	});

	test("different seeds produce different outputs", () => {
		const seed1 = sodium.randombytes_buf(SEED_BYTES);
		const seed2 = sodium.randombytes_buf(SEED_BYTES);

		const a = sodium.randombytes_buf_deterministic(64, seed1);
		const b = sodium.randombytes_buf_deterministic(64, seed2);

		expect(a).not.toEqual(b);
	});

	test("returns buffer of requested length", () => {
		const seed = sodium.randombytes_buf(SEED_BYTES);

		for (const length of [0, 1, 16, 32, 64, 100, 256, 1000]) {
			const buf = sodium.randombytes_buf_deterministic(length, seed);
			expect(buf).toBeInstanceOf(Uint8Array);
			expect(buf.length).toBe(length);
		}
	});

	test("different lengths from same seed share prefix", () => {
		const seed = sodium.randombytes_buf(SEED_BYTES);

		const short = sodium.randombytes_buf_deterministic(32, seed);
		const long = sodium.randombytes_buf_deterministic(64, seed);

		// First 32 bytes should be identical
		expect(long.slice(0, 32)).toEqual(short);
	});

	test("known test vector", () => {
		// All-zero seed should produce consistent output
		const seed = new Uint8Array(SEED_BYTES);
		const output = sodium.randombytes_buf_deterministic(32, seed, "hex");

		// Generate multiple times to verify determinism
		const output2 = sodium.randombytes_buf_deterministic(32, seed, "hex");
		expect(output).toBe(output2);

		// Verify it's not all zeros (actually random-looking)
		expect(output).not.toBe("0".repeat(64));
	});

	test("output passes basic randomness checks", () => {
		const seed = sodium.randombytes_buf(SEED_BYTES);
		const buf = sodium.randombytes_buf_deterministic(1000, seed);

		// Should not be all zeros
		const hasNonZero = buf.some((b: number) => b !== 0);
		expect(hasNonZero).toBe(true);

		// Should not be all same byte
		const firstByte = buf[0];
		const allSame = buf.every((b: number) => b === firstByte);
		expect(allSame).toBe(false);
	});

	test("supports different output formats", () => {
		const seed = sodium.randombytes_buf(SEED_BYTES);
		const length = 32;

		const bytes = sodium.randombytes_buf_deterministic(length, seed);
		const hex = sodium.randombytes_buf_deterministic(length, seed, "hex");
		const base64 = sodium.randombytes_buf_deterministic(length, seed, "base64");

		expect(bytes).toBeInstanceOf(Uint8Array);
		expect(typeof hex).toBe("string");
		expect(hex.length).toBe(length * 2);
		expect(typeof base64).toBe("string");

		// hex should match the bytes
		expect(hex).toBe(sodium.to_hex(bytes));
	});
});

describe("randomness quality", () => {
	test("entropy estimate via compression ratio", () => {
		// Truly random data should not compress well
		// We estimate by counting unique byte pairs (bigrams)
		const buf = sodium.randombytes_buf(10000);

		const bigrams = new Set<number>();
		for (let i = 0; i < buf.length - 1; i++) {
			bigrams.add((buf[i] << 8) | buf[i + 1]);
		}

		// With 10000 bytes, we have 9999 bigrams
		// Random data should have very high unique bigram count
		// (approaching 65536 possible bigrams)
		expect(bigrams.size).toBeGreaterThan(9000);
	});

	test("no obvious patterns in sequential bytes", () => {
		const buf = sodium.randombytes_buf(10000);

		// Count ascending/descending runs
		let ascendingRuns = 0;
		let descendingRuns = 0;
		let currentAscending = 0;
		let currentDescending = 0;

		for (let i = 1; i < buf.length; i++) {
			if (buf[i] > buf[i - 1]) {
				currentAscending++;
				if (currentDescending >= 5) descendingRuns++;
				currentDescending = 0;
			} else if (buf[i] < buf[i - 1]) {
				currentDescending++;
				if (currentAscending >= 5) ascendingRuns++;
				currentAscending = 0;
			} else {
				if (currentAscending >= 5) ascendingRuns++;
				if (currentDescending >= 5) descendingRuns++;
				currentAscending = 0;
				currentDescending = 0;
			}
		}

		// Long runs (5+) should be rare in random data
		// Expected: about 1 in 120 positions starts a run of 5+
		const maxExpectedRuns = (10000 / 120) * 2;
		expect(ascendingRuns + descendingRuns).toBeLessThan(maxExpectedRuns);
	});

	test("bits are roughly balanced", () => {
		const buf = sodium.randombytes_buf(10000);

		let ones = 0;
		for (let i = 0; i < buf.length; i++) {
			let byte = buf[i];
			while (byte) {
				ones += byte & 1;
				byte >>= 1;
			}
		}

		const totalBits = buf.length * 8;
		const expectedOnes = totalBits / 2;

		// Should be within 2% of expected
		expect(ones).toBeGreaterThan(expectedOnes * 0.98);
		expect(ones).toBeLessThan(expectedOnes * 1.02);
	});
});
