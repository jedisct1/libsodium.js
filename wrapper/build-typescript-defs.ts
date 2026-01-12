#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SymbolInput {
	name: string;
	type: string;
}

interface SymbolOutput {
	name: string;
	type: string;
}

interface Symbol {
	name: string;
	type: string;
	inputs?: SymbolInput[];
	outputs?: SymbolOutput[];
	return?: string;
}

interface Constant {
	name: string;
	type: "uint" | "string";
}

const typeMap: Record<string, string> = {
	buf: "Uint8Array",
	unsized_buf: "Uint8Array | string",
	unsized_buf_optional: "Uint8Array | string | null",
	minsized_buf: "Uint8Array",
	buf_optional: "Uint8Array | null",
	uint: "number",
	u64: "number",
	string: "string",
	unsized_string: "string",
	randombytes_implementation: "any",
	generichash_state: "StateAddress",
	generichash_state_address: "StateAddress",
	onetimeauth_state: "StateAddress",
	onetimeauth_state_address: "StateAddress",
	secretstream_xchacha20poly1305_state: "StateAddress",
	secretstream_xchacha20poly1305_state_address: "StateAddress",
	sign_state: "StateAddress",
	sign_state_address: "StateAddress",
	hash_sha256_state: "StateAddress",
	hash_sha256_state_address: "StateAddress",
	hash_sha512_state: "StateAddress",
	hash_sha512_state_address: "StateAddress",
	auth_hmacsha256_state: "StateAddress",
	auth_hmacsha256_state_address: "StateAddress",
	auth_hmacsha512256_state: "StateAddress",
	auth_hmacsha512256_state_address: "StateAddress",
	auth_hmacsha512_state: "StateAddress",
	auth_hmacsha512_state_address: "StateAddress",
	xof_shake128_state: "StateAddress",
	xof_shake128_state_address: "StateAddress",
	xof_shake256_state: "StateAddress",
	xof_shake256_state_address: "StateAddress",
	xof_turboshake128_state: "StateAddress",
	xof_turboshake128_state_address: "StateAddress",
	xof_turboshake256_state: "StateAddress",
	xof_turboshake256_state_address: "StateAddress",
};

const outputFormatType = '"uint8array" | "text" | "hex" | "base64"';
const returnTypeWithFormat = "Uint8Array | string";

const helperFunctions = `
// Helper functions
export function from_base64(input: string, variant?: base64_variants): Uint8Array;
export function to_base64(input: Uint8Array | string, variant?: base64_variants): string;
export function from_hex(input: string): Uint8Array;
export function to_hex(input: Uint8Array | string): string;
export function from_string(input: string): Uint8Array;
export function to_string(input: Uint8Array): string;
export function pad(buf: Uint8Array, blocksize: number): Uint8Array;
export function unpad(buf: Uint8Array, blocksize: number): Uint8Array;
export function memcmp(b1: Uint8Array, b2: Uint8Array): boolean;
export function memzero(bytes: Uint8Array): void;
export function increment(bytes: Uint8Array): void;
export function add(a: Uint8Array, b: Uint8Array): void;
export function compare(b1: Uint8Array, b2: Uint8Array): number;
export function is_zero(bytes: Uint8Array): boolean;
`;

const base64Variants = `
export const base64_variants: {
  ORIGINAL: number;
  ORIGINAL_NO_PADDING: number;
  URLSAFE: number;
  URLSAFE_NO_PADDING: number;
};

export type base64_variants = number;
`;

const outputFormats = `
export const output_formats: string[];
`;

const stateAddressType = `
export type StateAddress = {
  name: string;
  address: number;
};
`;

function generateTypeScriptDefs(
	symbolsDir: string,
	constantsFile: string,
	outputFile: string,
	isSumo: boolean = false,
): void {
	let dts = `// TypeScript definitions for libsodium-wrappers${isSumo ? "-sumo" : ""}
// Auto-generated - do not edit manually

`;

	dts += `/**
 * Promise that resolves when the library is ready to use.
 * All crypto operations must wait for this promise to resolve.
 */
export const ready: Promise<void>;

`;

	dts += `${stateAddressType}\n`;
	dts += `${base64Variants}\n`;
	dts += `${outputFormats}\n`;
	dts += `${helperFunctions}\n`;

	const constants: Constant[] = JSON.parse(
		fs.readFileSync(constantsFile, "utf8"),
	);
	dts += "// Constants\n";
	for (const constant of constants) {
		const tsType = constant.type === "string" ? "string" : "number";
		dts += `export const ${constant.name}: ${tsType};\n`;
	}
	dts += "\n";

	const symbolFiles = fs
		.readdirSync(symbolsDir)
		.filter((f) => f.endsWith(".json"));

	const sumoOnlySymbols = [
		"crypto_pwhash_scryptsalsa208sha256",
		"crypto_pwhash_scryptsalsa208sha256_str",
		"crypto_pwhash_scryptsalsa208sha256_str_verify",
	];

	dts += "// Crypto functions\n";

	for (const file of symbolFiles.sort()) {
		const symbolPath = path.join(symbolsDir, file);
		const symbol: Symbol = JSON.parse(fs.readFileSync(symbolPath, "utf8"));

		if (symbol.type !== "function") continue;

		if (!isSumo && sumoOnlySymbols.some((s) => symbol.name.startsWith(s))) {
			continue;
		}

		const funcName = symbol.name;
		const inputs = symbol.inputs || [];
		const outputs = symbol.outputs || [];

		const params: string[] = [];

		for (const input of inputs) {
			const tsType = typeMap[input.type] || "any";
			params.push(`${input.name}: ${tsType}`);
		}

		const hasFormattedOutput = symbol.return?.includes("_format_output");
		if (hasFormattedOutput) {
			params.push(`outputFormat?: ${outputFormatType}`);
		}

		let returnType = "void";

		const objectReturnType = parseObjectReturnType(symbol.return);
		if (objectReturnType) {
			returnType = objectReturnType;
		} else if (outputs.length > 0) {
			const outputType = outputs[0].type;

			if (
				outputType &&
				(outputType.includes("_state") || outputType.includes("state_address"))
			) {
				returnType = "StateAddress";
			} else if (hasFormattedOutput) {
				returnType = returnTypeWithFormat;
			} else if (typeMap[outputType]) {
				returnType = typeMap[outputType];
			} else {
				returnType = "Uint8Array";
			}
		} else if (symbol.return) {
			if (
				symbol.return.includes("===") ||
				symbol.return.includes("!==") ||
				symbol.return.includes("==") ||
				symbol.return.includes("!=") ||
				funcName.includes("_verify")
			) {
				returnType = "boolean";
			} else if (hasFormattedOutput) {
				returnType = returnTypeWithFormat;
			} else if (
				symbol.return.includes("UTF8ToString") ||
				symbol.return.includes("_string")
			) {
				returnType = "string";
			} else if (
				symbol.return.includes("random_value") ||
				symbol.return.includes(">>> 0") ||
				(symbol.return.match(/\b(value|result|ret|retval)\b/) &&
					!symbol.return.includes("_format_output"))
			) {
				returnType = "number";
			}
		}

		const jsdoc = generateJSDoc(symbol);
		if (jsdoc) {
			dts += jsdoc;
		}

		dts += `export function ${funcName}(${params.join(", ")}): ${returnType};\n`;
	}

	dts += "\n// Internal: list of all exported symbols\n";
	dts += "export function symbols(): string[];\n";

	fs.writeFileSync(outputFile, dts);
	console.log(`Generated TypeScript definitions: ${outputFile}`);
}

function generateJSDoc(_symbol: Symbol): string {
	return "";
}

function parseObjectReturnType(returnStatement?: string): string | null {
	if (!returnStatement || !returnStatement.includes("{")) {
		return null;
	}

	const keypairMatch = returnStatement.match(
		/\{publicKey:.*privateKey:.*keyType:/,
	);
	if (keypairMatch) {
		return `{publicKey: ${returnTypeWithFormat}, privateKey: ${returnTypeWithFormat}, keyType: string}`;
	}

	const detachedCipherMatch = returnStatement.match(
		/_format_output\(\{ciphertext:.*mac:.*\}/,
	);
	if (detachedCipherMatch) {
		return `{ciphertext: ${returnTypeWithFormat}, mac: ${returnTypeWithFormat}}`;
	}

	const detachedMacCipherMatch = returnStatement.match(
		/_format_output\(\{mac:.*cipher:.*\}/,
	);
	if (detachedMacCipherMatch) {
		return `{mac: ${returnTypeWithFormat}, cipher: ${returnTypeWithFormat}}`;
	}

	const sessionKeysMatch = returnStatement.match(
		/_format_output\(\{sharedRx:.*sharedTx:.*\}/,
	);
	if (sessionKeysMatch) {
		return `{sharedRx: ${returnTypeWithFormat}, sharedTx: ${returnTypeWithFormat}}`;
	}

	const stateHeaderMatch = returnStatement.match(
		/\{\s*state:\s*state_address,\s*header:/,
	);
	if (stateHeaderMatch) {
		return `{state: StateAddress, header: ${returnTypeWithFormat}}`;
	}

	const pullMatch = returnStatement.match(/ret\s*&&\s*\{message:.*tag:/);
	if (pullMatch) {
		return `{message: ${returnTypeWithFormat}, tag: number} | void`;
	}

	return null;
}

const args = process.argv.slice(2);
const isSumo = args.includes("--sumo");

const symbolsDir = path.join(__dirname, "symbols");
const constantsFile = path.join(__dirname, "constants.json");

if (!isSumo || args.includes("--all")) {
	const outputFile = path.join(
		__dirname,
		"..",
		"dist",
		"modules",
		"libsodium-wrappers.d.ts",
	);
	fs.mkdirSync(path.dirname(outputFile), { recursive: true });
	generateTypeScriptDefs(symbolsDir, constantsFile, outputFile, false);
}

if (isSumo || args.includes("--all")) {
	const outputFile = path.join(
		__dirname,
		"..",
		"dist",
		"modules-sumo",
		"libsodium-wrappers.d.ts",
	);
	fs.mkdirSync(path.dirname(outputFile), { recursive: true });
	generateTypeScriptDefs(symbolsDir, constantsFile, outputFile, true);
}
