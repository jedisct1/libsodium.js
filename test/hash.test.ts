import { beforeEach, expect, test } from "bun:test";
const test_helper = require('./test_helper');

let sodium = await test_helper.init();

test("crypto_shorthash", () => {
    let key = sodium.from_hex('808182838485868788898a8b8c8d8e8f');
    const message0 = sodium.from_string('This is short input0');
    const mac0 = sodium.crypto_shorthash(message0, key);
    expect(sodium.to_hex(mac0)).toBe('ef589fb9ef4196b3');

    const message1 = sodium.from_string('This is short input1');
    const mac1 = sodium.crypto_shorthash(message1, key);
    expect(sodium.to_hex(mac1)).toBe('5e8f01039bc53eb7');
});

test("crypto_generichash", () => {
    const message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    const piece1 = message.slice(0, 16);
    const piece2 = message.slice(16);
    const h = sodium.crypto_generichash(32, message);
    const expected_hash_hex = '47c1fdbde32b30b9c54dd47cf88ba92d2d05df1265e342c9563ed56aee84ab02';
    expect(sodium.to_hex(h)).toBe(expected_hash_hex);

    let state = sodium.crypto_generichash_init(null, 32);
    sodium.crypto_generichash_update(state, piece1);
    sodium.crypto_generichash_update(state, piece2);
    const h2 = sodium.crypto_generichash_final(state, 32);
    expect(h2).toEqual(h);

    const key = sodium.crypto_generichash_keygen();
    const h3 = sodium.crypto_generichash(32, message, key);
    expect(h3).not.toEqual(h);
});


test("crypto_generichash2", () => {
    const key = sodium.from_hex('4777a57dadf099111c8c21954b0b470b1990f34623990d32bf0340795ff858d8');
    const message = sodium.from_string('This is just - something to authenticate');
    const mac1 = sodium.crypto_generichash(32, message, key);
    const expected_mac_hex = 'e229536f8c0d462126f040126392b46151200531f7bd12061a2237833a0ccdba';
    expect(sodium.to_hex(mac1)).toBe(expected_mac_hex);

    const part1 = message.slice(0, 16);
    const part2 = message.slice(16);
    let state = sodium.crypto_generichash_init(key, 32);
    sodium.crypto_generichash_update(state, part1);
    sodium.crypto_generichash_update(state, part2);
    const mac2 = sodium.crypto_generichash_final(state, 32);
    expect(mac1).toEqual(mac2);

    const mac3 = sodium.crypto_generichash(32, part1, key);
    expect(mac3).not.toEqual(mac1);
});