import { expect, test } from "bun:test";

import { init } from "./test_helper.ts";

const sodium = await init();

test("crypto_kx", () => {
	const clientKeyypair = sodium.crypto_kx_keypair();
	const clientSecret = clientKeyypair.privateKey;
	const clientPublic = clientKeyypair.publicKey;

	const seed = sodium.crypto_generichash(
		sodium.crypto_kx_SEEDBYTES,
		sodium.from_string(
			"Unit test static key seed goes here. Nothing too complicated. No randomness needed, really.",
		),
	);
	const serverKeyypair = sodium.crypto_kx_seed_keypair(seed);
	const serverSecret = serverKeyypair.privateKey;
	const serverPublic = serverKeyypair.publicKey;

	const clientKeys = sodium.crypto_kx_client_session_keys(
		clientPublic,
		clientSecret,
		serverPublic,
	);
	const serverKeys = sodium.crypto_kx_server_session_keys(
		serverPublic,
		serverSecret,
		clientPublic,
	);

	expect(clientKeys.sharedRx).toEqual(serverKeys.sharedTx);
	expect(clientKeys.sharedTx).toEqual(serverKeys.sharedRx);
});
