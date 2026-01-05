import { beforeEach, describe, expect, test } from "bun:test";
const test_helper = require('./test_helper');

let sodium = await test_helper.init();

test("crypto_auth", () => {
    const key = sodium.crypto_auth_keygen();
    const message = sodium.from_string('Science, math, technology, engineering, and compassion for others.');
    const mac = sodium.crypto_auth(message, key);
    expect(sodium.crypto_auth_verify(mac, message, key)).toBe(true);
});

// ============================================================================
// HMAC-SHA256 Tests
// ============================================================================

describe("crypto_auth_hmacsha256", () => {
    const HMACSHA256_BYTES = 32;
    const HMACSHA256_KEYBYTES = 32;

    test("keygen produces correct size key", () => {
        const key = sodium.crypto_auth_hmacsha256_keygen();
        expect(key).toBeInstanceOf(Uint8Array);
        expect(key.length).toBe(HMACSHA256_KEYBYTES);
    });

    test("one-shot produces correct size output", () => {
        const key = sodium.crypto_auth_hmacsha256_keygen();
        const message = sodium.from_string('Test message for HMAC-SHA256');
        const mac = sodium.crypto_auth_hmacsha256(message, key);
        expect(mac).toBeInstanceOf(Uint8Array);
        expect(mac.length).toBe(HMACSHA256_BYTES);
    });

    test("same input + key produces same MAC (deterministic)", () => {
        const key = sodium.crypto_auth_hmacsha256_keygen();
        const message = sodium.from_string('Deterministic test message');
        const mac1 = sodium.crypto_auth_hmacsha256(message, key);
        const mac2 = sodium.crypto_auth_hmacsha256(message, key);
        expect(sodium.to_hex(mac1)).toBe(sodium.to_hex(mac2));
    });

    test("different key produces different MAC", () => {
        const key1 = sodium.crypto_auth_hmacsha256_keygen();
        const key2 = sodium.crypto_auth_hmacsha256_keygen();
        const message = sodium.from_string('Test message');
        const mac1 = sodium.crypto_auth_hmacsha256(message, key1);
        const mac2 = sodium.crypto_auth_hmacsha256(message, key2);
        expect(sodium.to_hex(mac1)).not.toBe(sodium.to_hex(mac2));
    });

    test("verification succeeds with correct MAC", () => {
        const key = sodium.crypto_auth_hmacsha256_keygen();
        const message = sodium.from_string('Message to verify');
        const mac = sodium.crypto_auth_hmacsha256(message, key);
        expect(sodium.crypto_auth_hmacsha256_verify(mac, message, key)).toBe(true);
    });

    test("verification fails with wrong MAC", () => {
        const key = sodium.crypto_auth_hmacsha256_keygen();
        const message = sodium.from_string('Message to verify');
        const mac = sodium.crypto_auth_hmacsha256(message, key);
        // Corrupt the MAC
        const wrongMac = new Uint8Array(mac);
        wrongMac[0] ^= 0xff;
        expect(sodium.crypto_auth_hmacsha256_verify(wrongMac, message, key)).toBe(false);
    });

    test("verification fails with wrong key", () => {
        const key1 = sodium.crypto_auth_hmacsha256_keygen();
        const key2 = sodium.crypto_auth_hmacsha256_keygen();
        const message = sodium.from_string('Message to verify');
        const mac = sodium.crypto_auth_hmacsha256(message, key1);
        expect(sodium.crypto_auth_hmacsha256_verify(mac, message, key2)).toBe(false);
    });

    test("streaming API produces same result as one-shot", () => {
        const key = sodium.crypto_auth_hmacsha256_keygen();
        const message = sodium.from_string('Test message for streaming');
        
        // One-shot
        const macOneShot = sodium.crypto_auth_hmacsha256(message, key);
        
        // Streaming
        const state = sodium.crypto_auth_hmacsha256_init(key);
        sodium.crypto_auth_hmacsha256_update(state, message);
        const macStreaming = sodium.crypto_auth_hmacsha256_final(state);
        
        expect(sodium.to_hex(macStreaming)).toBe(sodium.to_hex(macOneShot));
    });

    test("multiple updates work correctly", () => {
        const key = sodium.crypto_auth_hmacsha256_keygen();
        const part1 = sodium.from_string('First part ');
        const part2 = sodium.from_string('Second part ');
        const part3 = sodium.from_string('Third part');
        const fullMessage = sodium.from_string('First part Second part Third part');
        
        // One-shot with full message
        const macOneShot = sodium.crypto_auth_hmacsha256(fullMessage, key);
        
        // Streaming with multiple updates
        const state = sodium.crypto_auth_hmacsha256_init(key);
        sodium.crypto_auth_hmacsha256_update(state, part1);
        sodium.crypto_auth_hmacsha256_update(state, part2);
        sodium.crypto_auth_hmacsha256_update(state, part3);
        const macStreaming = sodium.crypto_auth_hmacsha256_final(state);
        
        expect(sodium.to_hex(macStreaming)).toBe(sodium.to_hex(macOneShot));
    });

    test("empty message works", () => {
        const key = sodium.crypto_auth_hmacsha256_keygen();
        const message = new Uint8Array(0);
        const mac = sodium.crypto_auth_hmacsha256(message, key);
        expect(mac.length).toBe(HMACSHA256_BYTES);
        expect(sodium.crypto_auth_hmacsha256_verify(mac, message, key)).toBe(true);
    });
});

// ============================================================================
// HMAC-SHA512 Tests
// ============================================================================

describe("crypto_auth_hmacsha512", () => {
    const HMACSHA512_BYTES = 64;
    const HMACSHA512_KEYBYTES = 32;

    test("keygen produces correct size key", () => {
        const key = sodium.crypto_auth_hmacsha512_keygen();
        expect(key).toBeInstanceOf(Uint8Array);
        expect(key.length).toBe(HMACSHA512_KEYBYTES);
    });

    test("one-shot produces correct size output", () => {
        const key = sodium.crypto_auth_hmacsha512_keygen();
        const message = sodium.from_string('Test message for HMAC-SHA512');
        const mac = sodium.crypto_auth_hmacsha512(message, key);
        expect(mac).toBeInstanceOf(Uint8Array);
        expect(mac.length).toBe(HMACSHA512_BYTES);
    });

    test("same input + key produces same MAC (deterministic)", () => {
        const key = sodium.crypto_auth_hmacsha512_keygen();
        const message = sodium.from_string('Deterministic test message');
        const mac1 = sodium.crypto_auth_hmacsha512(message, key);
        const mac2 = sodium.crypto_auth_hmacsha512(message, key);
        expect(sodium.to_hex(mac1)).toBe(sodium.to_hex(mac2));
    });

    test("different key produces different MAC", () => {
        const key1 = sodium.crypto_auth_hmacsha512_keygen();
        const key2 = sodium.crypto_auth_hmacsha512_keygen();
        const message = sodium.from_string('Test message');
        const mac1 = sodium.crypto_auth_hmacsha512(message, key1);
        const mac2 = sodium.crypto_auth_hmacsha512(message, key2);
        expect(sodium.to_hex(mac1)).not.toBe(sodium.to_hex(mac2));
    });

    test("verification succeeds with correct MAC", () => {
        const key = sodium.crypto_auth_hmacsha512_keygen();
        const message = sodium.from_string('Message to verify');
        const mac = sodium.crypto_auth_hmacsha512(message, key);
        expect(sodium.crypto_auth_hmacsha512_verify(mac, message, key)).toBe(true);
    });

    test("verification fails with wrong MAC", () => {
        const key = sodium.crypto_auth_hmacsha512_keygen();
        const message = sodium.from_string('Message to verify');
        const mac = sodium.crypto_auth_hmacsha512(message, key);
        // Corrupt the MAC
        const wrongMac = new Uint8Array(mac);
        wrongMac[0] ^= 0xff;
        expect(sodium.crypto_auth_hmacsha512_verify(wrongMac, message, key)).toBe(false);
    });

    test("verification fails with wrong key", () => {
        const key1 = sodium.crypto_auth_hmacsha512_keygen();
        const key2 = sodium.crypto_auth_hmacsha512_keygen();
        const message = sodium.from_string('Message to verify');
        const mac = sodium.crypto_auth_hmacsha512(message, key1);
        expect(sodium.crypto_auth_hmacsha512_verify(mac, message, key2)).toBe(false);
    });

    test("streaming API produces same result as one-shot", () => {
        const key = sodium.crypto_auth_hmacsha512_keygen();
        const message = sodium.from_string('Test message for streaming');
        
        // One-shot
        const macOneShot = sodium.crypto_auth_hmacsha512(message, key);
        
        // Streaming
        const state = sodium.crypto_auth_hmacsha512_init(key);
        sodium.crypto_auth_hmacsha512_update(state, message);
        const macStreaming = sodium.crypto_auth_hmacsha512_final(state);
        
        expect(sodium.to_hex(macStreaming)).toBe(sodium.to_hex(macOneShot));
    });

    test("multiple updates work correctly", () => {
        const key = sodium.crypto_auth_hmacsha512_keygen();
        const part1 = sodium.from_string('First part ');
        const part2 = sodium.from_string('Second part ');
        const part3 = sodium.from_string('Third part');
        const fullMessage = sodium.from_string('First part Second part Third part');
        
        // One-shot with full message
        const macOneShot = sodium.crypto_auth_hmacsha512(fullMessage, key);
        
        // Streaming with multiple updates
        const state = sodium.crypto_auth_hmacsha512_init(key);
        sodium.crypto_auth_hmacsha512_update(state, part1);
        sodium.crypto_auth_hmacsha512_update(state, part2);
        sodium.crypto_auth_hmacsha512_update(state, part3);
        const macStreaming = sodium.crypto_auth_hmacsha512_final(state);
        
        expect(sodium.to_hex(macStreaming)).toBe(sodium.to_hex(macOneShot));
    });

    test("empty message works", () => {
        const key = sodium.crypto_auth_hmacsha512_keygen();
        const message = new Uint8Array(0);
        const mac = sodium.crypto_auth_hmacsha512(message, key);
        expect(mac.length).toBe(HMACSHA512_BYTES);
        expect(sodium.crypto_auth_hmacsha512_verify(mac, message, key)).toBe(true);
    });
});

// ============================================================================
// HMAC-SHA512/256 Tests
// ============================================================================

describe("crypto_auth_hmacsha512256", () => {
    const HMACSHA512256_BYTES = 32;
    const HMACSHA512256_KEYBYTES = 32;

    test("keygen produces correct size key", () => {
        const key = sodium.crypto_auth_hmacsha512256_keygen();
        expect(key).toBeInstanceOf(Uint8Array);
        expect(key.length).toBe(HMACSHA512256_KEYBYTES);
    });

    test("one-shot produces correct size output", () => {
        const key = sodium.crypto_auth_hmacsha512256_keygen();
        const message = sodium.from_string('Test message for HMAC-SHA512/256');
        const mac = sodium.crypto_auth_hmacsha512256(message, key);
        expect(mac).toBeInstanceOf(Uint8Array);
        expect(mac.length).toBe(HMACSHA512256_BYTES);
    });

    test("same input + key produces same MAC (deterministic)", () => {
        const key = sodium.crypto_auth_hmacsha512256_keygen();
        const message = sodium.from_string('Deterministic test message');
        const mac1 = sodium.crypto_auth_hmacsha512256(message, key);
        const mac2 = sodium.crypto_auth_hmacsha512256(message, key);
        expect(sodium.to_hex(mac1)).toBe(sodium.to_hex(mac2));
    });

    test("different key produces different MAC", () => {
        const key1 = sodium.crypto_auth_hmacsha512256_keygen();
        const key2 = sodium.crypto_auth_hmacsha512256_keygen();
        const message = sodium.from_string('Test message');
        const mac1 = sodium.crypto_auth_hmacsha512256(message, key1);
        const mac2 = sodium.crypto_auth_hmacsha512256(message, key2);
        expect(sodium.to_hex(mac1)).not.toBe(sodium.to_hex(mac2));
    });

    test("verification succeeds with correct MAC", () => {
        const key = sodium.crypto_auth_hmacsha512256_keygen();
        const message = sodium.from_string('Message to verify');
        const mac = sodium.crypto_auth_hmacsha512256(message, key);
        expect(sodium.crypto_auth_hmacsha512256_verify(mac, message, key)).toBe(true);
    });

    test("verification fails with wrong MAC", () => {
        const key = sodium.crypto_auth_hmacsha512256_keygen();
        const message = sodium.from_string('Message to verify');
        const mac = sodium.crypto_auth_hmacsha512256(message, key);
        // Corrupt the MAC
        const wrongMac = new Uint8Array(mac);
        wrongMac[0] ^= 0xff;
        expect(sodium.crypto_auth_hmacsha512256_verify(wrongMac, message, key)).toBe(false);
    });

    test("verification fails with wrong key", () => {
        const key1 = sodium.crypto_auth_hmacsha512256_keygen();
        const key2 = sodium.crypto_auth_hmacsha512256_keygen();
        const message = sodium.from_string('Message to verify');
        const mac = sodium.crypto_auth_hmacsha512256(message, key1);
        expect(sodium.crypto_auth_hmacsha512256_verify(mac, message, key2)).toBe(false);
    });

    test("streaming API produces same result as one-shot", () => {
        const key = sodium.crypto_auth_hmacsha512256_keygen();
        const message = sodium.from_string('Test message for streaming');
        
        // One-shot
        const macOneShot = sodium.crypto_auth_hmacsha512256(message, key);
        
        // Streaming
        const state = sodium.crypto_auth_hmacsha512256_init(key);
        sodium.crypto_auth_hmacsha512256_update(state, message);
        const macStreaming = sodium.crypto_auth_hmacsha512256_final(state);
        
        expect(sodium.to_hex(macStreaming)).toBe(sodium.to_hex(macOneShot));
    });

    test("multiple updates work correctly", () => {
        const key = sodium.crypto_auth_hmacsha512256_keygen();
        const part1 = sodium.from_string('First part ');
        const part2 = sodium.from_string('Second part ');
        const part3 = sodium.from_string('Third part');
        const fullMessage = sodium.from_string('First part Second part Third part');
        
        // One-shot with full message
        const macOneShot = sodium.crypto_auth_hmacsha512256(fullMessage, key);
        
        // Streaming with multiple updates
        const state = sodium.crypto_auth_hmacsha512256_init(key);
        sodium.crypto_auth_hmacsha512256_update(state, part1);
        sodium.crypto_auth_hmacsha512256_update(state, part2);
        sodium.crypto_auth_hmacsha512256_update(state, part3);
        const macStreaming = sodium.crypto_auth_hmacsha512256_final(state);
        
        expect(sodium.to_hex(macStreaming)).toBe(sodium.to_hex(macOneShot));
    });

    test("empty message works", () => {
        const key = sodium.crypto_auth_hmacsha512256_keygen();
        const message = new Uint8Array(0);
        const mac = sodium.crypto_auth_hmacsha512256(message, key);
        expect(mac.length).toBe(HMACSHA512256_BYTES);
        expect(sodium.crypto_auth_hmacsha512256_verify(mac, message, key)).toBe(true);
    });

    test("produces different output than hmacsha256", () => {
        // HMAC-SHA512/256 uses SHA512 with truncation, so it differs from HMAC-SHA256
        const key = sodium.crypto_auth_hmacsha256_keygen(); // All use same key size
        const message = sodium.from_string('Test message');
        
        const mac256 = sodium.crypto_auth_hmacsha256(message, key);
        const mac512256 = sodium.crypto_auth_hmacsha512256(message, key);
        
        // HMAC-SHA256 and HMAC-SHA512/256 should produce different outputs
        expect(sodium.to_hex(mac256)).not.toBe(sodium.to_hex(mac512256));
    });
});
