import { expect, test } from "bun:test";

const test_helper = require("./test_helper");

const sodium = await test_helper.init();

// ============================================================================
// Key Generation Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305_keygen generates correct size key", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	expect(key.length).toBe(
		sodium.crypto_secretstream_xchacha20poly1305_KEYBYTES,
	);
});

test("crypto_secretstream_xchacha20poly1305_keygen generates unique keys", () => {
	const key1 = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const key2 = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	expect(key1).not.toEqual(key2);
});

// ============================================================================
// Init Push Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305_init_push returns state and header", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const result = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	expect(result).toBeDefined();
	expect(result.state).toBeDefined();
	expect(result.header).toBeDefined();
	expect(result.header.length).toBe(
		sodium.crypto_secretstream_xchacha20poly1305_HEADERBYTES,
	);
});

test("crypto_secretstream_xchacha20poly1305_init_push generates unique headers", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const result1 = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
	const result2 = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	// Headers should be unique even with the same key
	expect(result1.header).not.toEqual(result2.header);
});

// ============================================================================
// Push (Encryption) Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305_push encrypts message", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state, header: _header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Hello, World!");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		state,
		message,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
	);

	expect(ciphertext).toBeDefined();
	expect(ciphertext.length).toBe(
		message.length + sodium.crypto_secretstream_xchacha20poly1305_ABYTES,
	);
});

test("crypto_secretstream_xchacha20poly1305_push with TAG_FINAL", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state, header: _header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Final message");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		state,
		message,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	expect(ciphertext).toBeDefined();
	expect(ciphertext.length).toBe(
		message.length + sodium.crypto_secretstream_xchacha20poly1305_ABYTES,
	);
});

test("crypto_secretstream_xchacha20poly1305_push with additional data", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state, header: _header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Message with AD");
	const ad = sodium.from_string("additional data");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		state,
		message,
		ad,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
	);

	expect(ciphertext).toBeDefined();
	expect(ciphertext.length).toBe(
		message.length + sodium.crypto_secretstream_xchacha20poly1305_ABYTES,
	);
});

test("crypto_secretstream_xchacha20poly1305_push multiple chunks", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state, header: _header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const messages = [
		sodium.from_string("First chunk"),
		sodium.from_string("Second chunk"),
		sodium.from_string("Third chunk"),
	];

	const ciphertexts = [];
	for (let i = 0; i < messages.length - 1; i++) {
		ciphertexts.push(
			sodium.crypto_secretstream_xchacha20poly1305_push(
				state,
				messages[i],
				null,
				sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
			),
		);
	}

	// Last chunk with FINAL tag
	ciphertexts.push(
		sodium.crypto_secretstream_xchacha20poly1305_push(
			state,
			messages[messages.length - 1],
			null,
			sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
		),
	);

	expect(ciphertexts.length).toBe(3);
	ciphertexts.forEach((ct, i) => {
		expect(ct.length).toBe(
			messages[i].length + sodium.crypto_secretstream_xchacha20poly1305_ABYTES,
		);
	});
});

// ============================================================================
// Init Pull Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305_init_pull returns state", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: _pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);

	expect(pullState).toBeDefined();
});

// ============================================================================
// Pull (Decryption) Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305_pull decrypts message", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Hello, World!");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		message,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
	);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);
	const result = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		null,
	);

	expect(result).toBeDefined();
	expect(result.message).toEqual(message);
	expect(result.tag).toBe(
		sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
	);
});

test("crypto_secretstream_xchacha20poly1305_pull returns correct tag for FINAL", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Final message");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		message,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);
	const result = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		null,
	);

	expect(result.message).toEqual(message);
	expect(result.tag).toBe(
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);
});

test("crypto_secretstream_xchacha20poly1305_pull with additional data", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Message with AD");
	const ad = sodium.from_string("additional data");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		message,
		ad,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
	);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);
	const result = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		ad,
	);

	expect(result.message).toEqual(message);
	expect(result.tag).toBe(
		sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
	);
});

test("crypto_secretstream_xchacha20poly1305_pull with wrong additional data fails", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Message with AD");
	const ad = sodium.from_string("additional data");
	const wrongAd = sodium.from_string("wrong additional data");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		message,
		ad,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
	);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);

	// Decryption with wrong AD returns false
	const result = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		wrongAd,
	);
	expect(result).toBe(false);
});

// ============================================================================
// Full Round-Trip Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305 full round-trip single message", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const originalMessage = sodium.from_string(
		"This is a test message for encryption.",
	);
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		originalMessage,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);
	const { message, tag } = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		null,
	);

	expect(message).toEqual(originalMessage);
	expect(tag).toBe(sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL);
});

test("crypto_secretstream_xchacha20poly1305 full round-trip multiple messages", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const messages = [
		sodium.from_string("First chunk of data"),
		sodium.from_string("Second chunk of data"),
		sodium.from_string("Third chunk of data"),
		sodium.from_string("Final chunk"),
	];

	// Encrypt all messages
	const ciphertexts = [];
	for (let i = 0; i < messages.length - 1; i++) {
		ciphertexts.push(
			sodium.crypto_secretstream_xchacha20poly1305_push(
				pushState,
				messages[i],
				null,
				sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
			),
		);
	}
	ciphertexts.push(
		sodium.crypto_secretstream_xchacha20poly1305_push(
			pushState,
			messages[messages.length - 1],
			null,
			sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
		),
	);

	// Decrypt all messages
	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);
	const decrypted = [];
	const tags = [];

	for (const ct of ciphertexts) {
		const result = sodium.crypto_secretstream_xchacha20poly1305_pull(
			pullState,
			ct,
			null,
		);
		decrypted.push(result.message);
		tags.push(result.tag);
	}

	// Verify all messages match
	for (let i = 0; i < messages.length; i++) {
		expect(decrypted[i]).toEqual(messages[i]);
	}

	// Verify tags
	for (let i = 0; i < messages.length - 1; i++) {
		expect(tags[i]).toBe(
			sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
		);
	}
	expect(tags[messages.length - 1]).toBe(
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);
});

test("crypto_secretstream_xchacha20poly1305 round-trip with binary data", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	// Generate random binary data
	const binaryData = sodium.randombytes_buf(1024);

	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		binaryData,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);
	const { message, tag } = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		null,
	);

	expect(message).toEqual(binaryData);
	expect(tag).toBe(sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL);
});

test("crypto_secretstream_xchacha20poly1305 round-trip with empty message", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const emptyMessage = new Uint8Array(0);

	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		emptyMessage,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);
	const { message, tag } = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		null,
	);

	expect(message.length).toBe(0);
	expect(tag).toBe(sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL);
});

// ============================================================================
// Rekey Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305_rekey during encryption", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const messages = [
		sodium.from_string("Before rekey"),
		sodium.from_string("After rekey"),
	];

	// Encrypt first message
	const ciphertext1 = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		messages[0],
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
	);

	// Rekey the push state
	sodium.crypto_secretstream_xchacha20poly1305_rekey(pushState);

	// Encrypt second message
	const ciphertext2 = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		messages[1],
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	// Initialize pull state and decrypt
	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);

	const result1 = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext1,
		null,
	);
	expect(result1.message).toEqual(messages[0]);

	// Rekey the pull state
	sodium.crypto_secretstream_xchacha20poly1305_rekey(pullState);

	const result2 = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext2,
		null,
	);
	expect(result2.message).toEqual(messages[1]);
});

test("crypto_secretstream_xchacha20poly1305_rekey with TAG_REKEY", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const messages = [
		sodium.from_string("Before automatic rekey"),
		sodium.from_string("After automatic rekey"),
	];

	// Encrypt first message with TAG_REKEY (triggers automatic rekey)
	const ciphertext1 = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		messages[0],
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_REKEY,
	);

	// Encrypt second message (after automatic rekey)
	const ciphertext2 = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		messages[1],
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	// Initialize pull state and decrypt
	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);

	const result1 = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext1,
		null,
	);
	expect(result1.message).toEqual(messages[0]);
	expect(result1.tag).toBe(
		sodium.crypto_secretstream_xchacha20poly1305_TAG_REKEY,
	);

	// Pull should automatically rekey based on TAG_REKEY
	const result2 = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext2,
		null,
	);
	expect(result2.message).toEqual(messages[1]);
	expect(result2.tag).toBe(
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);
});

test("crypto_secretstream_xchacha20poly1305 decryption fails without rekey", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const messages = [
		sodium.from_string("Before rekey"),
		sodium.from_string("After rekey"),
	];

	// Encrypt first message
	const ciphertext1 = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		messages[0],
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
	);

	// Rekey the push state
	sodium.crypto_secretstream_xchacha20poly1305_rekey(pushState);

	// Encrypt second message
	const ciphertext2 = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		messages[1],
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	// Initialize pull state and decrypt first message
	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);

	const result1 = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext1,
		null,
	);
	expect(result1.message).toEqual(messages[0]);

	// Try to decrypt second message WITHOUT rekeying - returns false
	const result2 = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext2,
		null,
	);
	expect(result2).toBe(false);
});

// ============================================================================
// Wrong Key Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305 decryption with wrong key fails", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const wrongKey = sodium.crypto_secretstream_xchacha20poly1305_keygen();

	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Secret message");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		message,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	// Initialize pull with wrong key (init_pull doesn't validate key)
	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		wrongKey,
	);
	// But pull should fail to decrypt - returns false
	const result = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		null,
	);
	expect(result).toBe(false);
});

test("crypto_secretstream_xchacha20poly1305 decryption with corrupted ciphertext fails", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Secret message");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		message,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	// Corrupt the ciphertext
	const corruptedCiphertext = new Uint8Array(ciphertext);
	corruptedCiphertext[0] ^= 0xff;

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);

	// Pull with corrupted ciphertext returns false
	const result = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		corruptedCiphertext,
		null,
	);
	expect(result).toBe(false);
});

test("crypto_secretstream_xchacha20poly1305 decryption with corrupted header fails", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Secret message");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		message,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	// Corrupt the header
	const corruptedHeader = new Uint8Array(header);
	corruptedHeader[0] ^= 0xff;

	// Initialize pull with corrupted header (doesn't throw)
	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		corruptedHeader,
		key,
	);
	// But pull should fail to decrypt - returns false
	const result = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		null,
	);
	expect(result).toBe(false);
});

// ============================================================================
// TAG Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305_TAG_PUSH", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	const message = sodium.from_string("Message with PUSH tag");
	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		message,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_PUSH,
	);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);
	const result = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		null,
	);

	expect(result.message).toEqual(message);
	expect(result.tag).toBe(
		sodium.crypto_secretstream_xchacha20poly1305_TAG_PUSH,
	);
});

// ============================================================================
// Constants Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305 constants are defined", () => {
	expect(sodium.crypto_secretstream_xchacha20poly1305_KEYBYTES).toBeDefined();
	expect(
		sodium.crypto_secretstream_xchacha20poly1305_HEADERBYTES,
	).toBeDefined();
	expect(sodium.crypto_secretstream_xchacha20poly1305_ABYTES).toBeDefined();
	expect(
		sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
	).toBeDefined();
	expect(sodium.crypto_secretstream_xchacha20poly1305_TAG_PUSH).toBeDefined();
	expect(sodium.crypto_secretstream_xchacha20poly1305_TAG_REKEY).toBeDefined();
	expect(sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL).toBeDefined();
});

test("crypto_secretstream_xchacha20poly1305 constants have expected values", () => {
	// Based on libsodium documentation
	expect(sodium.crypto_secretstream_xchacha20poly1305_KEYBYTES).toBe(32);
	expect(sodium.crypto_secretstream_xchacha20poly1305_HEADERBYTES).toBe(24);
	expect(sodium.crypto_secretstream_xchacha20poly1305_ABYTES).toBe(17);
	expect(sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE).toBe(0);
	expect(sodium.crypto_secretstream_xchacha20poly1305_TAG_PUSH).toBe(1);
	expect(sodium.crypto_secretstream_xchacha20poly1305_TAG_REKEY).toBe(2);
	expect(sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL).toBe(3);
});

// ============================================================================
// Large Data Tests
// ============================================================================

test("crypto_secretstream_xchacha20poly1305 handles large data", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	// 64KB of random data
	const largeData = sodium.randombytes_buf(65536);

	const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
		pushState,
		largeData,
		null,
		sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
	);

	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);
	const { message, tag } = sodium.crypto_secretstream_xchacha20poly1305_pull(
		pullState,
		ciphertext,
		null,
	);

	expect(message).toEqual(largeData);
	expect(tag).toBe(sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL);
});

test("crypto_secretstream_xchacha20poly1305 streaming large file simulation", () => {
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
	const { state: pushState, header } =
		sodium.crypto_secretstream_xchacha20poly1305_init_push(key);

	// Simulate streaming a file in 4KB chunks
	const chunkSize = 4096;
	const numChunks = 10;
	const chunks = [];

	for (let i = 0; i < numChunks; i++) {
		chunks.push(sodium.randombytes_buf(chunkSize));
	}

	// Encrypt all chunks
	const ciphertexts = [];
	for (let i = 0; i < chunks.length - 1; i++) {
		ciphertexts.push(
			sodium.crypto_secretstream_xchacha20poly1305_push(
				pushState,
				chunks[i],
				null,
				sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
			),
		);
	}
	ciphertexts.push(
		sodium.crypto_secretstream_xchacha20poly1305_push(
			pushState,
			chunks[chunks.length - 1],
			null,
			sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
		),
	);

	// Decrypt all chunks
	const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
		header,
		key,
	);

	for (let i = 0; i < chunks.length; i++) {
		const { message, tag } = sodium.crypto_secretstream_xchacha20poly1305_pull(
			pullState,
			ciphertexts[i],
			null,
		);
		expect(message).toEqual(chunks[i]);

		if (i < chunks.length - 1) {
			expect(tag).toBe(
				sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
			);
		} else {
			expect(tag).toBe(sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL);
		}
	}
});
