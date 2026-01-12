import { expect, test } from "bun:test";

const test_helper = require("./test_helper");

const sodium = await test_helper.init();

test("crypto_scalarmult", () => {
	const aliceKeypair = sodium.crypto_box_keypair();
	const aliceSecret = aliceKeypair.privateKey;
	const alicePublic = aliceKeypair.publicKey;
	const bobKeypair = sodium.crypto_box_keypair();
	const bobSecret = bobKeypair.privateKey;
	const bobPublic = bobKeypair.publicKey;

	const shared1 = sodium.crypto_scalarmult(aliceSecret, bobPublic);
	const shared2 = sodium.crypto_scalarmult(bobSecret, alicePublic);
	expect(shared1).toEqual(shared2);

	const zero = sodium.from_hex(
		"0000000000000000000000000000000000000000000000000000000000000000",
	);
	expect(shared1).not.toEqual(zero);
});
