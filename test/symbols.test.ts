import { expect, test } from "bun:test";

import sealOpenSymbol from "../wrapper/symbols/crypto_box_seal_open.json";

import {
	type ConstantSymbol,
	checkFunctionSymbol,
	type FunctionSymbol,
} from "../wrapper/types.ts";

test("checkFunctionSymbol accepts a valid symbol", () => {
	const symbol: FunctionSymbol = sealOpenSymbol;
	const result = checkFunctionSymbol(symbol);
	expect(result.valid).toBe(true);
});

test("checkFunctionSymbol rejects a symbol with 'expect' key", () => {
	const symbol: FunctionSymbol = { ...sealOpenSymbol, expect: "=== 0" };
	const result = checkFunctionSymbol(symbol);
	expect(result.valid).toBe(false);
	if (!result.valid) {
		expect(result.error).toBe("invalid symbol: expect");
	}
});

test("checkFunctionSymbol rejects a non-function symbol", () => {
	const symbol: ConstantSymbol = {
		name: "SODIUM_VERSION_STRING",
		type: "constant",
	};
	const result = checkFunctionSymbol(symbol);
	expect(result.valid).toBe(false);
	if (!result.valid) {
		expect(result.error).toBe("not a function");
	}
});
