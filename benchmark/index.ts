// biome-ignore lint/suspicious/noExplicitAny: Dynamic require of sodium library
const sodium: any = require("../dist/browsers-sumo/sodium");

interface BenchmarkResult {
	name: string;
	iterations: number;
	totalMs: number;
	avgMs: number;
	opsPerSec: number;
	throughputMBps?: number;
}

const MIN_BENCHMARK_TIME_MS = 500;

async function benchmark(
	name: string,
	fn: () => void,
	options: { iterations?: number; warmup?: number; dataSize?: number } = {},
): Promise<BenchmarkResult> {
	const { iterations = 10000, warmup = 100, dataSize } = options;

	for (let i = 0; i < warmup; i++) {
		fn();
	}

	let actualIterations = iterations;
	let totalMs: number;

	const calibrationStart = performance.now();
	for (let i = 0; i < 100; i++) {
		fn();
	}
	const calibrationTime = performance.now() - calibrationStart;
	const estimatedTimePerOp = calibrationTime / 100;

	if (estimatedTimePerOp * iterations < MIN_BENCHMARK_TIME_MS) {
		actualIterations = Math.ceil(MIN_BENCHMARK_TIME_MS / estimatedTimePerOp);
	}

	const start = performance.now();
	for (let i = 0; i < actualIterations; i++) {
		fn();
	}
	totalMs = performance.now() - start;

	const avgMs = totalMs / actualIterations;
	const opsPerSec = (actualIterations / totalMs) * 1000;
	const throughputMBps = dataSize
		? (dataSize * actualIterations) / (totalMs * 1000)
		: undefined;

	return {
		name,
		iterations: actualIterations,
		totalMs,
		avgMs,
		opsPerSec,
		throughputMBps,
	};
}

function formatResult(result: BenchmarkResult): string {
	const throughput = result.throughputMBps
		? ` | ${result.throughputMBps.toFixed(2).padStart(8)} MB/s`
		: "";
	return `${result.name.padEnd(55)} ${result.avgMs.toFixed(6).padStart(12)} ms | ${result.opsPerSec.toFixed(0).padStart(10)} ops/s${throughput}`;
}

function printHeader(title: string): void {
	console.log("\n" + "=".repeat(90));
	console.log(title);
	console.log("=".repeat(90));
}

function printResults(results: BenchmarkResult[]): void {
	for (const result of results) {
		console.log(formatResult(result));
	}
}

async function benchmarkPwhash(): Promise<void> {
	printHeader("crypto_pwhash (Argon2id) - Password Hashing");

	const password = sodium.from_string("correct horse battery staple");
	const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);

	const results: BenchmarkResult[] = [];

	results.push(
		await benchmark(
			"crypto_pwhash (INTERACTIVE, 32 bytes)",
			() => {
				sodium.crypto_pwhash(
					32,
					password,
					salt,
					sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
					sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
					sodium.crypto_pwhash_ALG_ARGON2ID13,
				);
			},
			{ iterations: 5, warmup: 1 },
		),
	);

	results.push(
		await benchmark(
			"crypto_pwhash_str (INTERACTIVE)",
			() => {
				sodium.crypto_pwhash_str(
					password,
					sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
					sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
				);
			},
			{ iterations: 5, warmup: 1 },
		),
	);

	const hash = sodium.crypto_pwhash_str(
		password,
		sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
		sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
	);
	results.push(
		await benchmark(
			"crypto_pwhash_str_verify (INTERACTIVE)",
			() => {
				sodium.crypto_pwhash_str_verify(hash, password);
			},
			{ iterations: 5, warmup: 1 },
		),
	);

	printResults(results);
}

async function benchmarkSecretbox(): Promise<void> {
	printHeader("crypto_secretbox (XSalsa20-Poly1305) - Secret-key Encryption");

	const key = sodium.crypto_secretbox_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

	const results: BenchmarkResult[] = [];

	results.push(
		await benchmark("crypto_secretbox_keygen", () => {
			sodium.crypto_secretbox_keygen();
		}),
	);

	for (const size of [64, 1024, 16384, 65536]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`crypto_secretbox_easy (${size} bytes)`,
				() => {
					sodium.crypto_secretbox_easy(message, nonce, key);
				},
				{ dataSize: size },
			),
		);

		const ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);
		results.push(
			await benchmark(
				`crypto_secretbox_open_easy (${size} bytes)`,
				() => {
					sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
				},
				{ dataSize: size },
			),
		);
	}

	printResults(results);
}

async function benchmarkBox(): Promise<void> {
	printHeader("crypto_box (X25519-XSalsa20-Poly1305) - Public-key Encryption");

	const alice = sodium.crypto_box_keypair();
	const bob = sodium.crypto_box_keypair();
	const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

	const results: BenchmarkResult[] = [];

	results.push(
		await benchmark(
			"crypto_box_keypair",
			() => {
				sodium.crypto_box_keypair();
			},
			{ iterations: 1000 },
		),
	);

	const boxSeed = sodium.randombytes_buf(sodium.crypto_box_SEEDBYTES);
	results.push(
		await benchmark(
			"crypto_box_seed_keypair",
			() => {
				sodium.crypto_box_seed_keypair(boxSeed);
			},
			{ iterations: 1000 },
		),
	);

	for (const size of [64, 1024]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`crypto_box_easy (${size} bytes)`,
				() => {
					sodium.crypto_box_easy(message, nonce, bob.publicKey, alice.privateKey);
				},
				{ iterations: 1000, dataSize: size },
			),
		);

		const ciphertext = sodium.crypto_box_easy(
			message,
			nonce,
			bob.publicKey,
			alice.privateKey,
		);
		results.push(
			await benchmark(
				`crypto_box_open_easy (${size} bytes)`,
				() => {
					sodium.crypto_box_open_easy(
						ciphertext,
						nonce,
						alice.publicKey,
						bob.privateKey,
					);
				},
				{ iterations: 1000, dataSize: size },
			),
		);
	}

	results.push(
		await benchmark(
			"crypto_box_beforenm (precompute shared key)",
			() => {
				sodium.crypto_box_beforenm(bob.publicKey, alice.privateKey);
			},
			{ iterations: 1000 },
		),
	);

	const sharedKey = sodium.crypto_box_beforenm(bob.publicKey, alice.privateKey);
	const message1k = sodium.randombytes_buf(1024);
	results.push(
		await benchmark(
			"crypto_box_easy_afternm (1024 bytes, precomputed)",
			() => {
				sodium.crypto_box_easy_afternm(message1k, nonce, sharedKey);
			},
			{ dataSize: 1024 },
		),
	);

	printResults(results);
}

async function benchmarkSealedBox(): Promise<void> {
	printHeader("crypto_box_seal - Anonymous Public-key Encryption");

	const recipient = sodium.crypto_box_keypair();
	const results: BenchmarkResult[] = [];

	for (const size of [64, 1024]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`crypto_box_seal (${size} bytes)`,
				() => {
					sodium.crypto_box_seal(message, recipient.publicKey);
				},
				{ iterations: 1000, dataSize: size },
			),
		);

		const sealed = sodium.crypto_box_seal(message, recipient.publicKey);
		results.push(
			await benchmark(
				`crypto_box_seal_open (${size} bytes)`,
				() => {
					sodium.crypto_box_seal_open(
						sealed,
						recipient.publicKey,
						recipient.privateKey,
					);
				},
				{ iterations: 1000, dataSize: size },
			),
		);
	}

	printResults(results);
}

async function benchmarkAegis128l(): Promise<void> {
	printHeader("crypto_aead_aegis128l - AEGIS-128L AEAD");

	const key = sodium.crypto_aead_aegis128l_keygen();
	const nonce = sodium.randombytes_buf(sodium.crypto_aead_aegis128l_NPUBBYTES);
	const ad = sodium.randombytes_buf(16);

	const results: BenchmarkResult[] = [];

	results.push(
		await benchmark("crypto_aead_aegis128l_keygen", () => {
			sodium.crypto_aead_aegis128l_keygen();
		}),
	);

	for (const size of [64, 1024, 16384, 65536]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`crypto_aead_aegis128l_encrypt (${size} bytes)`,
				() => {
					sodium.crypto_aead_aegis128l_encrypt(message, ad, null, nonce, key);
				},
				{ dataSize: size },
			),
		);

		const ciphertext = sodium.crypto_aead_aegis128l_encrypt(
			message,
			ad,
			null,
			nonce,
			key,
		);
		results.push(
			await benchmark(
				`crypto_aead_aegis128l_decrypt (${size} bytes)`,
				() => {
					sodium.crypto_aead_aegis128l_decrypt(null, ciphertext, ad, nonce, key);
				},
				{ dataSize: size },
			),
		);
	}

	printResults(results);
}

async function benchmarkXChaCha20Poly1305(): Promise<void> {
	printHeader("crypto_aead_xchacha20poly1305_ietf - XChaCha20-Poly1305 AEAD");

	const key = sodium.crypto_aead_xchacha20poly1305_ietf_keygen();
	const nonce = sodium.randombytes_buf(
		sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES,
	);
	const ad = sodium.randombytes_buf(16);

	const results: BenchmarkResult[] = [];

	for (const size of [64, 1024, 16384, 65536]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`xchacha20poly1305_ietf_encrypt (${size} bytes)`,
				() => {
					sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
						message,
						ad,
						null,
						nonce,
						key,
					);
				},
				{ dataSize: size },
			),
		);

		const ciphertext = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
			message,
			ad,
			null,
			nonce,
			key,
		);
		results.push(
			await benchmark(
				`xchacha20poly1305_ietf_decrypt (${size} bytes)`,
				() => {
					sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
						null,
						ciphertext,
						ad,
						nonce,
						key,
					);
				},
				{ dataSize: size },
			),
		);
	}

	printResults(results);
}

async function benchmarkSign(): Promise<void> {
	printHeader("crypto_sign (Ed25519) - Digital Signatures");

	const keypair = sodium.crypto_sign_keypair();
	const results: BenchmarkResult[] = [];

	results.push(
		await benchmark(
			"crypto_sign_keypair",
			() => {
				sodium.crypto_sign_keypair();
			},
			{ iterations: 1000 },
		),
	);

	const signSeed = sodium.randombytes_buf(sodium.crypto_sign_SEEDBYTES);
	results.push(
		await benchmark(
			"crypto_sign_seed_keypair",
			() => {
				sodium.crypto_sign_seed_keypair(signSeed);
			},
			{ iterations: 1000 },
		),
	);

	for (const size of [64, 1024, 16384]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`crypto_sign_detached (${size} bytes)`,
				() => {
					sodium.crypto_sign_detached(message, keypair.privateKey);
				},
				{ iterations: 1000, dataSize: size },
			),
		);

		const signature = sodium.crypto_sign_detached(message, keypair.privateKey);
		results.push(
			await benchmark(
				`crypto_sign_verify_detached (${size} bytes)`,
				() => {
					sodium.crypto_sign_verify_detached(
						signature,
						message,
						keypair.publicKey,
					);
				},
				{ iterations: 1000, dataSize: size },
			),
		);
	}

	printResults(results);
}

async function benchmarkGenerichash(): Promise<void> {
	printHeader("crypto_generichash (BLAKE2b) - Hashing");

	const results: BenchmarkResult[] = [];

	for (const size of [64, 1024, 16384, 65536]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`crypto_generichash (${size} bytes, 32-byte output)`,
				() => {
					sodium.crypto_generichash(32, message);
				},
				{ dataSize: size },
			),
		);
	}

	const key = sodium.randombytes_buf(sodium.crypto_generichash_KEYBYTES);
	const message16k = sodium.randombytes_buf(16384);
	results.push(
		await benchmark(
			"crypto_generichash_keyed (16384 bytes)",
			() => {
				sodium.crypto_generichash(32, message16k, key);
			},
			{ dataSize: 16384 },
		),
	);

	const largeData = sodium.randombytes_buf(65536);
	results.push(
		await benchmark(
			"crypto_generichash streaming (64KB in 4KB chunks)",
			() => {
				const state = sodium.crypto_generichash_init(null, 32);
				for (let i = 0; i < 16; i++) {
					sodium.crypto_generichash_update(
						state,
						largeData.subarray(i * 4096, (i + 1) * 4096),
					);
				}
				sodium.crypto_generichash_final(state, 32);
			},
			{ iterations: 2000, dataSize: 65536 },
		),
	);

	printResults(results);
}

async function benchmarkShorthash(): Promise<void> {
	printHeader("crypto_shorthash (SipHash-2-4) - Short-input Hashing");

	const key = sodium.crypto_shorthash_keygen();
	const results: BenchmarkResult[] = [];

	for (const size of [8, 32, 128]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`crypto_shorthash (${size} bytes)`,
				() => {
					sodium.crypto_shorthash(message, key);
				},
				{ dataSize: size },
			),
		);
	}

	printResults(results);
}

async function benchmarkAuth(): Promise<void> {
	printHeader("crypto_auth (HMAC-SHA512-256) - Message Authentication");

	const key = sodium.crypto_auth_keygen();
	const results: BenchmarkResult[] = [];

	results.push(
		await benchmark("crypto_auth_keygen", () => {
			sodium.crypto_auth_keygen();
		}),
	);

	for (const size of [64, 1024, 16384]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`crypto_auth (${size} bytes)`,
				() => {
					sodium.crypto_auth(message, key);
				},
				{ dataSize: size },
			),
		);

		const tag = sodium.crypto_auth(message, key);
		results.push(
			await benchmark(
				`crypto_auth_verify (${size} bytes)`,
				() => {
					sodium.crypto_auth_verify(tag, message, key);
				},
				{ dataSize: size },
			),
		);
	}

	printResults(results);
}

async function benchmarkKdf(): Promise<void> {
	printHeader("crypto_kdf (BLAKE2b) - Key Derivation");

	const masterKey = sodium.crypto_kdf_keygen();
	const context = "BenchCtx";
	const results: BenchmarkResult[] = [];

	results.push(
		await benchmark("crypto_kdf_keygen", () => {
			sodium.crypto_kdf_keygen();
		}),
	);

	for (const subkeyLen of [16, 32, 64]) {
		let subkeyId = 1;
		results.push(
			await benchmark(
				`crypto_kdf_derive_from_key (${subkeyLen} bytes)`,
				() => {
					sodium.crypto_kdf_derive_from_key(
						subkeyLen,
						subkeyId++,
						context,
						masterKey,
					);
				},
				{ dataSize: subkeyLen },
			),
		);
	}

	printResults(results);
}

async function benchmarkKx(): Promise<void> {
	printHeader("crypto_kx (X25519) - Key Exchange");

	const results: BenchmarkResult[] = [];

	results.push(
		await benchmark(
			"crypto_kx_keypair",
			() => {
				sodium.crypto_kx_keypair();
			},
			{ iterations: 1000 },
		),
	);

	const client = sodium.crypto_kx_keypair();
	const server = sodium.crypto_kx_keypair();

	results.push(
		await benchmark(
			"crypto_kx_client_session_keys",
			() => {
				sodium.crypto_kx_client_session_keys(
					client.publicKey,
					client.privateKey,
					server.publicKey,
				);
			},
			{ iterations: 1000 },
		),
	);

	results.push(
		await benchmark(
			"crypto_kx_server_session_keys",
			() => {
				sodium.crypto_kx_server_session_keys(
					server.publicKey,
					server.privateKey,
					client.publicKey,
				);
			},
			{ iterations: 1000 },
		),
	);

	printResults(results);
}

async function benchmarkSecretstream(): Promise<void> {
	printHeader(
		"crypto_secretstream_xchacha20poly1305 - Streaming Encryption",
	);

	const results: BenchmarkResult[] = [];
	const key = sodium.crypto_secretstream_xchacha20poly1305_keygen();

	results.push(
		await benchmark("crypto_secretstream_xchacha20poly1305_keygen", () => {
			sodium.crypto_secretstream_xchacha20poly1305_keygen();
		}),
	);

	results.push(
		await benchmark("crypto_secretstream_xchacha20poly1305_init_push", () => {
			sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
		}),
	);

	for (const size of [64, 1024, 16384]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`secretstream push+pull (${size} bytes)`,
				() => {
					const { state: pushState, header } =
						sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
					const ciphertext = sodium.crypto_secretstream_xchacha20poly1305_push(
						pushState,
						message,
						null,
						sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
					);
					const pullState =
						sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, key);
					sodium.crypto_secretstream_xchacha20poly1305_pull(
						pullState,
						ciphertext,
						null,
					);
				},
				{ dataSize: size },
			),
		);
	}

	const chunkSize = 4096;
	const numChunks = 16;
	const chunks = Array.from({ length: numChunks }, () =>
		sodium.randombytes_buf(chunkSize),
	);

	results.push(
		await benchmark(
			`secretstream (${numChunks}x${chunkSize} bytes = 64KB streaming)`,
			() => {
				const { state: pushState, header } =
					sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
				const ciphertexts = [];
				for (let i = 0; i < numChunks - 1; i++) {
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
						chunks[numChunks - 1],
						null,
						sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL,
					),
				);

				const pullState = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
					header,
					key,
				);
				for (const ct of ciphertexts) {
					sodium.crypto_secretstream_xchacha20poly1305_pull(pullState, ct, null);
				}
			},
			{ iterations: 2000, dataSize: chunkSize * numChunks },
		),
	);

	printResults(results);
}

async function benchmarkRandombytes(): Promise<void> {
	printHeader("randombytes - Random Number Generation");

	const results: BenchmarkResult[] = [];

	for (const size of [32, 256, 4096, 65536]) {
		results.push(
			await benchmark(
				`randombytes_buf (${size} bytes)`,
				() => {
					sodium.randombytes_buf(size);
				},
				{ dataSize: size },
			),
		);
	}

	results.push(
		await benchmark("randombytes_random (u32)", () => {
			sodium.randombytes_random();
		}),
	);

	results.push(
		await benchmark("randombytes_uniform (bound=1000000)", () => {
			sodium.randombytes_uniform(1000000);
		}),
	);

	printResults(results);
}

async function benchmarkScalarmult(): Promise<void> {
	printHeader("crypto_scalarmult (X25519) - Scalar Multiplication");

	const results: BenchmarkResult[] = [];

	const scalarPrivate = sodium.randombytes_buf(
		sodium.crypto_scalarmult_SCALARBYTES,
	);
	results.push(
		await benchmark(
			"crypto_scalarmult_base (public from private)",
			() => {
				sodium.crypto_scalarmult_base(scalarPrivate);
			},
			{ iterations: 1000 },
		),
	);

	const alicePrivate = sodium.randombytes_buf(
		sodium.crypto_scalarmult_SCALARBYTES,
	);
	const bobPublic = sodium.crypto_scalarmult_base(
		sodium.randombytes_buf(sodium.crypto_scalarmult_SCALARBYTES),
	);

	results.push(
		await benchmark(
			"crypto_scalarmult (shared secret)",
			() => {
				sodium.crypto_scalarmult(alicePrivate, bobPublic);
			},
			{ iterations: 1000 },
		),
	);

	printResults(results);
}

async function benchmarkUtilities(): Promise<void> {
	printHeader("Utility Functions");

	const results: BenchmarkResult[] = [];

	const data1k = sodium.randombytes_buf(1024);
	const hex1k = sodium.to_hex(data1k);
	const base64_1k = sodium.to_base64(data1k);

	results.push(
		await benchmark(
			"to_hex (1024 bytes)",
			() => {
				sodium.to_hex(data1k);
			},
			{ dataSize: 1024 },
		),
	);

	results.push(
		await benchmark(
			"from_hex (2048 chars)",
			() => {
				sodium.from_hex(hex1k);
			},
			{ dataSize: 1024 },
		),
	);

	results.push(
		await benchmark(
			"to_base64 (1024 bytes)",
			() => {
				sodium.to_base64(data1k);
			},
			{ dataSize: 1024 },
		),
	);

	results.push(
		await benchmark(
			"from_base64 (1368 chars)",
			() => {
				sodium.from_base64(base64_1k);
			},
			{ dataSize: 1024 },
		),
	);

	const str = "Hello, World! This is a test string for benchmarking.";
	results.push(
		await benchmark("from_string (54 bytes)", () => {
			sodium.from_string(str);
		}),
	);

	const strBytes = sodium.from_string(str);
	results.push(
		await benchmark("to_string (54 bytes)", () => {
			sodium.to_string(strBytes);
		}),
	);

	const arr1 = sodium.randombytes_buf(32);
	const arr2 = new Uint8Array(arr1);
	results.push(
		await benchmark("memcmp (32 bytes, equal)", () => {
			sodium.memcmp(arr1, arr2);
		}),
	);

	const memzeroBuf = new Uint8Array(1024);
	results.push(
		await benchmark("memzero (1024 bytes)", () => {
			sodium.memzero(memzeroBuf);
		}),
	);

	printResults(results);
}

async function benchmarkTurboshake128(): Promise<void> {
	if (typeof sodium.crypto_xof_turboshake128 !== "function") {
		console.log("\n[Skipping crypto_xof_turboshake128 - not available]");
		return;
	}

	printHeader("crypto_xof_turboshake128 (TurboSHAKE128) - Extendable Output");

	const results: BenchmarkResult[] = [];

	for (const size of [64, 1024, 16384]) {
		const message = sodium.randombytes_buf(size);

		results.push(
			await benchmark(
				`crypto_xof_turboshake128 (${size} bytes in, 64 bytes out)`,
				() => {
					sodium.crypto_xof_turboshake128(64, message, null);
				},
				{ dataSize: size },
			),
		);
	}

	const message1k = sodium.randombytes_buf(1024);
	for (const outLen of [32, 64, 256, 1024]) {
		results.push(
			await benchmark(
				`crypto_xof_turboshake128 (1024 bytes in, ${outLen} bytes out)`,
				() => {
					sodium.crypto_xof_turboshake128(outLen, message1k, null);
				},
				{ dataSize: 1024 },
			),
		);
	}

	if (typeof sodium.crypto_xof_turboshake128_init === "function") {
		const largeData = sodium.randombytes_buf(65536);
		results.push(
			await benchmark(
				"crypto_xof_turboshake128 streaming (64KB in 4KB chunks)",
				() => {
					const state = sodium.crypto_xof_turboshake128_init();
					for (let i = 0; i < 16; i++) {
						sodium.crypto_xof_turboshake128_update(
							state,
							largeData.subarray(i * 4096, (i + 1) * 4096),
						);
					}
					sodium.crypto_xof_turboshake128_squeeze(state, 64);
				},
				{ iterations: 2000, dataSize: 65536 },
			),
		);
	}

	printResults(results);
}

async function benchmarkIpcrypt(): Promise<void> {
	if (typeof sodium.crypto_ipcrypt_encrypt !== "function") {
		console.log("\n[Skipping crypto_ipcrypt - not available]");
		return;
	}

	printHeader("crypto_ipcrypt - IP Address Encryption");

	const results: BenchmarkResult[] = [];

	const key = sodium.crypto_ipcrypt_keygen();

	results.push(
		await benchmark("crypto_ipcrypt_keygen", () => {
			sodium.crypto_ipcrypt_keygen();
		}),
	);

	// IP addresses are stored in 16-byte buffers (IPv6 format or padded IPv4)
	const ip = new Uint8Array(16);
	ip[0] = 192;
	ip[1] = 168;
	ip[2] = 1;
	ip[3] = 1;

	results.push(
		await benchmark("crypto_ipcrypt_encrypt", () => {
			sodium.crypto_ipcrypt_encrypt(ip, key);
		}),
	);

	const encrypted = sodium.crypto_ipcrypt_encrypt(ip, key);
	results.push(
		await benchmark("crypto_ipcrypt_decrypt", () => {
			sodium.crypto_ipcrypt_decrypt(encrypted, key);
		}),
	);

	if (typeof sodium.crypto_ipcrypt_nd_encrypt === "function") {
		const tweak = sodium.randombytes_buf(sodium.crypto_ipcrypt_ND_TWEAKBYTES);

		results.push(
			await benchmark("crypto_ipcrypt_nd_encrypt (non-deterministic)", () => {
				sodium.crypto_ipcrypt_nd_encrypt(ip, tweak, key);
			}),
		);

		const encryptedNd = sodium.crypto_ipcrypt_nd_encrypt(ip, tweak, key);
		results.push(
			await benchmark("crypto_ipcrypt_nd_decrypt (non-deterministic)", () => {
				sodium.crypto_ipcrypt_nd_decrypt(encryptedNd, key);
			}),
		);
	}

	if (typeof sodium.crypto_ipcrypt_pfx_encrypt === "function") {
		const pfxKey = sodium.crypto_ipcrypt_pfx_keygen();

		results.push(
			await benchmark("crypto_ipcrypt_pfx_encrypt (prefix-preserving)", () => {
				sodium.crypto_ipcrypt_pfx_encrypt(ip, pfxKey);
			}),
		);

		const encryptedPfx = sodium.crypto_ipcrypt_pfx_encrypt(ip, pfxKey);
		results.push(
			await benchmark("crypto_ipcrypt_pfx_decrypt (prefix-preserving)", () => {
				sodium.crypto_ipcrypt_pfx_decrypt(encryptedPfx, pfxKey);
			}),
		);
	}

	printResults(results);
}

const BENCHMARKS: Record<string, () => Promise<void>> = {
	randombytes: benchmarkRandombytes,
	generichash: benchmarkGenerichash,
	shorthash: benchmarkShorthash,
	turboshake128: benchmarkTurboshake128,
	auth: benchmarkAuth,
	secretbox: benchmarkSecretbox,
	aegis128l: benchmarkAegis128l,
	xchacha20poly1305: benchmarkXChaCha20Poly1305,
	box: benchmarkBox,
	sealedbox: benchmarkSealedBox,
	sign: benchmarkSign,
	kdf: benchmarkKdf,
	kx: benchmarkKx,
	scalarmult: benchmarkScalarmult,
	ipcrypt: benchmarkIpcrypt,
	secretstream: benchmarkSecretstream,
	pwhash: benchmarkPwhash,
	utilities: benchmarkUtilities,
};

function printUsage(): void {
	console.log(
		"Usage: bun run benchmark/index.ts [--only <name>] [--list]",
	);
	console.log("       npx tsx benchmark/index.ts [--only <name>] [--list]");
	console.log("\nOptions:");
	console.log("  --only, -o <name>  Run only the specified benchmark");
	console.log("  --list, -l         List available benchmarks");
	console.log("\nAvailable benchmarks:");
	for (const name of Object.keys(BENCHMARKS)) {
		console.log(`  ${name}`);
	}
}

function getRuntimeInfo(): string {
	// biome-ignore lint/suspicious/noExplicitAny: Runtime detection
	if (typeof (globalThis as any).Bun !== "undefined") {
		// biome-ignore lint/suspicious/noExplicitAny: Runtime detection
		return `Bun: ${(globalThis as any).Bun.version}`;
	}
	return `Node.js: ${process.version}`;
}

async function main(): Promise<void> {
	const args = process.argv.slice(2);
	let onlyBenchmark: string | null = null;

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg === "--only" || arg === "-o") {
			onlyBenchmark = args[++i];
			if (!onlyBenchmark || !BENCHMARKS[onlyBenchmark]) {
				console.error(`Unknown benchmark: ${onlyBenchmark}`);
				printUsage();
				process.exit(1);
			}
		} else if (arg === "--list" || arg === "-l") {
			printUsage();
			process.exit(0);
		} else if (arg === "--help" || arg === "-h") {
			printUsage();
			process.exit(0);
		} else {
			console.error(`Unknown argument: ${arg}`);
			printUsage();
			process.exit(1);
		}
	}

	await sodium.ready;

	console.log("=".repeat(90));
	console.log("libsodium.js Benchmark Suite");
	console.log("=".repeat(90));
	console.log(`Platform: ${process.platform} ${process.arch}`);
	console.log(getRuntimeInfo());
	console.log(`libsodium: ${sodium.SODIUM_VERSION_STRING}`);
	console.log(`Minimum benchmark time: ${MIN_BENCHMARK_TIME_MS}ms per test`);

	if (onlyBenchmark) {
		console.log(`Running only: ${onlyBenchmark}`);
		await BENCHMARKS[onlyBenchmark]();
	} else {
		for (const benchFn of Object.values(BENCHMARKS)) {
			await benchFn();
		}
	}

	console.log("\n" + "=".repeat(90));
	console.log("Benchmark complete");
	console.log("=".repeat(90));
}

main().catch(console.error);
