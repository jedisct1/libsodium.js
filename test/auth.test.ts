import { beforeEach, expect, test } from "bun:test";
const test_helper = require('./test_helper');

let sodium = await test_helper.init();

test("crypto_auth", () => {
    const key = sodium.crypto_auth_keygen();
    const message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    const mac = sodium.crypto_auth(message, key);
    expect(sodium.crypto_auth_verify(mac, message, key)).toBe(true);
});
