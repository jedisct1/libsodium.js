#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
	FUNCTION_CATEGORIES,
	getInputTypeInfo,
	groupByCategory,
	hasFormattedOutput,
	isSumoOnly,
	parseReturnType,
} from "./shared-types.ts";
import type {
	Constant,
	FunctionSymbol,
	SymbolInput,
	SymbolOutput,
} from "./types.ts";
import { isFunctionSymbol } from "./types.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadSymbols(symbolsDir: string): FunctionSymbol[] {
	const files = fs.readdirSync(symbolsDir).filter((f) => f.endsWith(".json"));
	const symbols: FunctionSymbol[] = [];

	for (const file of files.sort()) {
		const content = fs.readFileSync(path.join(symbolsDir, file), "utf8");
		const symbol = JSON.parse(content);
		if (isFunctionSymbol(symbol)) {
			symbols.push(symbol);
		}
	}

	return symbols;
}

function loadConstants(constantsFile: string): Constant[] {
	return JSON.parse(fs.readFileSync(constantsFile, "utf8"));
}

function formatInputType(input: SymbolInput): string {
	const typeInfo = getInputTypeInfo(input.type);
	return typeInfo?.doc ?? "unknown";
}

function formatOutputType(output: SymbolOutput): string {
	if (output.type === "buf") return "Uint8Array";
	if (output.type === "uint") return "number";
	if (output.type.includes("state")) return "StateAddress";
	return "Uint8Array";
}

function formatSize(length: string | undefined): string | null {
	if (!length) return null;
	const match = length.match(/libsodium\._(\w+)\(\)/);
	if (match) {
		return match[1].toUpperCase();
	}
	if (length.includes("_length")) {
		return length
			.replace(/_length/g, ".length")
			.replace(/libsodium\._(\w+)\(\)/g, (_, fn) => fn.toUpperCase());
	}
	return null;
}

function buildFunctionSignature(symbol: FunctionSymbol): string {
	const inputs = symbol.inputs ?? [];
	const outputs = symbol.outputs ?? [];

	const params: string[] = [];
	for (const input of inputs) {
		const type = formatInputType(input);
		params.push(`${input.name}: ${type}`);
	}

	if (hasFormattedOutput(symbol)) {
		params.push(`outputFormat?: OutputFormat`);
	}

	const returnType = parseReturnType(symbol, outputs);
	return `${symbol.name}(${params.join(", ")}): ${returnType.doc}`;
}

function buildFunctionDoc(symbol: FunctionSymbol): string[] {
	const lines: string[] = [];
	const inputs = symbol.inputs ?? [];
	const outputs = symbol.outputs ?? [];

	lines.push(`### ${symbol.name}`);
	lines.push("");
	lines.push("```typescript");
	lines.push(buildFunctionSignature(symbol));
	lines.push("```");
	lines.push("");

	if (inputs.length > 0) {
		lines.push("**Parameters:**");
		lines.push("");
		for (const input of inputs) {
			const type = formatInputType(input);
			const size = formatSize(input.length);
			const sizeNote = size ? ` — size: \`${size}\`` : "";
			lines.push(`- \`${input.name}\`: \`${type}\`${sizeNote}`);
		}
		lines.push("");
	}

	const returnType = parseReturnType(symbol, outputs);

	if (returnType.isObject && returnType.fields) {
		lines.push("**Returns:** An object with:");
		lines.push("");
		for (const field of returnType.fields) {
			lines.push(`- \`${field.name}\`: \`${field.type}\``);
		}
		lines.push("");
	} else if (outputs.length > 0) {
		const output = outputs[0];
		const type = formatOutputType(output);
		const size = formatSize(output.length);
		const sizeNote = size ? ` — size: \`${size}\`` : "";
		lines.push(`**Returns:** \`${type}\`${sizeNote}`);
		lines.push("");
	} else if (returnType.doc !== "void") {
		lines.push(`**Returns:** \`${returnType.doc}\``);
		lines.push("");
	}

	return lines;
}

function groupConstants(constants: Constant[]): Map<string, Constant[]> {
	const groups = new Map<string, Constant[]>();

	for (const constant of constants) {
		const parts = constant.name.split("_");
		let group = "SODIUM";

		if (parts[0] === "crypto" && parts.length >= 3) {
			group = `${parts[0]}_${parts[1]}_${parts[2]}`.toUpperCase();
		} else if (parts[0] === "SODIUM") {
			group = "SODIUM";
		}

		if (!groups.has(group)) {
			groups.set(group, []);
		}
		groups.get(group)!.push(constant);
	}

	return groups;
}

function buildDoc(
	symbols: FunctionSymbol[],
	constants: Constant[],
	isSumo: boolean,
): string {
	const lines: string[] = [];
	const variant = isSumo ? " (Sumo)" : "";

	lines.push(`# libsodium.js API Reference${variant}`);
	lines.push("");
	lines.push("JavaScript bindings for libsodium, compiled to WebAssembly.");
	lines.push("");
	lines.push(
		"For detailed documentation on each function, see the [libsodium documentation](https://doc.libsodium.org).",
	);
	lines.push("");

	lines.push("## Quick Start");
	lines.push("");
	lines.push("```javascript");
	lines.push("import sodium from 'libsodium-wrappers';");
	lines.push("");
	lines.push("await sodium.ready;");
	lines.push("");
	lines.push("const key = sodium.crypto_secretbox_keygen();");
	lines.push(
		"const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);",
	);
	lines.push("const message = sodium.from_string('Hello, World!');");
	lines.push(
		"const ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);",
	);
	lines.push("```");
	lines.push("");

	lines.push("## Types");
	lines.push("");
	lines.push("| Type | Description |");
	lines.push("|------|-------------|");
	lines.push("| `Uint8Array` | Binary data (keys, nonces, messages) |");
	lines.push("| `Uint8Array \\| string` | Binary data or UTF-8 string |");
	lines.push(
		"| `StateAddress` | Opaque state object for streaming operations |",
	);
	lines.push(
		'| `OutputFormat` | `"uint8array"` \\| `"hex"` \\| `"base64"` \\| `"text"` |',
	);
	lines.push("");

	lines.push("## Helper Functions");
	lines.push("");
	lines.push("| Function | Description |");
	lines.push("|----------|-------------|");
	lines.push("| `from_string(str)` | Convert UTF-8 string to `Uint8Array` |");
	lines.push("| `to_string(buf)` | Convert `Uint8Array` to UTF-8 string |");
	lines.push("| `from_hex(hex)` | Decode hex string to `Uint8Array` |");
	lines.push("| `to_hex(buf)` | Encode `Uint8Array` to hex string |");
	lines.push(
		"| `from_base64(b64, variant?)` | Decode base64 to `Uint8Array` |",
	);
	lines.push("| `to_base64(buf, variant?)` | Encode `Uint8Array` to base64 |");
	lines.push("| `memzero(buf)` | Securely zero memory |");
	lines.push("| `memcmp(a, b)` | Constant-time comparison |");
	lines.push("| `increment(buf)` | Increment as little-endian number |");
	lines.push("| `add(a, b)` | Add as little-endian numbers |");
	lines.push("| `compare(a, b)` | Compare as little-endian numbers |");
	lines.push("| `is_zero(buf)` | Check if all bytes are zero |");
	lines.push("| `pad(buf, blocksize)` | Add ISO/IEC 7816-4 padding |");
	lines.push("| `unpad(buf, blocksize)` | Remove padding |");
	lines.push("");

	lines.push("## Table of Contents");
	lines.push("");

	const grouped = groupByCategory(symbols);
	const categoryOrder = FUNCTION_CATEGORIES.map((c) => c.name);
	categoryOrder.push("Other");

	for (const categoryName of categoryOrder) {
		const categorySymbols = grouped.get(categoryName);
		if (!categorySymbols || categorySymbols.length === 0) continue;

		const filteredSymbols = isSumo
			? categorySymbols
			: categorySymbols.filter((s) => !isSumoOnly(s.name));

		if (filteredSymbols.length === 0) continue;

		const anchor = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
		lines.push(`- [${categoryName}](#${anchor}) (${filteredSymbols.length})`);
	}

	lines.push("- [Constants](#constants)");
	lines.push("");

	for (const categoryName of categoryOrder) {
		const categorySymbols = grouped.get(categoryName);
		if (!categorySymbols || categorySymbols.length === 0) continue;

		const filteredSymbols = isSumo
			? categorySymbols
			: categorySymbols.filter((s) => !isSumoOnly(s.name));

		if (filteredSymbols.length === 0) continue;

		const category = FUNCTION_CATEGORIES.find((c) => c.name === categoryName);
		const description = category?.description ?? "";

		lines.push(`## ${categoryName}`);
		lines.push("");
		if (description) {
			lines.push(description);
			lines.push("");
		}

		for (const symbol of filteredSymbols) {
			lines.push(...buildFunctionDoc(symbol));
		}
	}

	lines.push("## Constants");
	lines.push("");
	lines.push("Constants define sizes for keys, nonces, and other parameters.");
	lines.push("");

	const groupedConstants = groupConstants(constants);
	const sortedGroups = Array.from(groupedConstants.keys()).sort();

	let currentPrefix = "";
	for (const group of sortedGroups) {
		const groupConstants = groupedConstants.get(group)!;
		const prefix = group.split("_").slice(0, 2).join("_");

		if (prefix !== currentPrefix && prefix !== "SODIUM") {
			currentPrefix = prefix;
		}

		lines.push(`### ${group}`);
		lines.push("");
		lines.push("| Constant | Type |");
		lines.push("|----------|------|");

		for (const constant of groupConstants) {
			const type = constant.type === "string" ? "string" : "number";
			lines.push(`| \`${constant.name}\` | ${type} |`);
		}

		lines.push("");
	}

	return lines.join("\n");
}

function main(): void {
	const args = process.argv.slice(2);
	const isSumo = args.includes("--sumo");
	const generateAll = args.includes("--all");

	const symbolsDir = path.join(__dirname, "symbols");
	const constantsFile = path.join(__dirname, "constants.json");

	const symbols = loadSymbols(symbolsDir);
	const constants = loadConstants(constantsFile);

	if (!isSumo || generateAll) {
		const outputFile = path.join(__dirname, "..", "API.md");
		const doc = buildDoc(symbols, constants, false);
		fs.writeFileSync(outputFile, doc);
		console.log(`Generated API documentation: ${outputFile}`);
	}

	if (isSumo || generateAll) {
		const outputFile = path.join(__dirname, "..", "API_sumo.md");
		const doc = buildDoc(symbols, constants, true);
		fs.writeFileSync(outputFile, doc);
		console.log(`Generated API documentation: ${outputFile}`);
	}
}

main();
