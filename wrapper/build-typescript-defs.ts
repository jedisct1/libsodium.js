#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Constant, FunctionSymbol, SymbolOutput } from "./types.ts";
import { isFunctionSymbol } from "./types.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INPUT_TYPE_MAP: Record<string, string> = {
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

const OUTPUT_FORMAT_TYPE = '"uint8array" | "text" | "hex" | "base64"';
const FORMATTED_RETURN_TYPE = "Uint8Array | string";

const SUMO_ONLY_PREFIXES = [
	"crypto_pwhash_scryptsalsa208sha256",
	"crypto_pwhash_scryptsalsa208sha256_str",
	"crypto_pwhash_scryptsalsa208sha256_str_verify",
];

class TypeScriptDefBuilder {
	private lines: string[] = [];

	constructor(private isSumo: boolean) {}

	build(symbols: FunctionSymbol[], constants: Constant[]): string {
		this.addHeader();
		this.addReadyPromise();
		this.addStateAddressType();
		this.addBase64Variants();
		this.addOutputFormats();
		this.addHelperFunctions();
		this.addConstants(constants);
		this.addFunctions(symbols);
		this.addSymbolsFunction();
		return `${this.lines.join("\n")}\n`;
	}

	private addHeader(): void {
		const variant = this.isSumo ? "-sumo" : "";
		this.lines.push(
			`// TypeScript definitions for libsodium-wrappers${variant}`,
		);
		this.lines.push("// Auto-generated - do not edit manually");
		this.lines.push("");
	}

	private addReadyPromise(): void {
		this.lines.push("/**");
		this.lines.push(
			" * Promise that resolves when the library is ready to use.",
		);
		this.lines.push(
			" * All crypto operations must wait for this promise to resolve.",
		);
		this.lines.push(" */");
		this.lines.push("export const ready: Promise<void>;");
		this.lines.push("");
	}

	private addStateAddressType(): void {
		this.lines.push("export type StateAddress = {");
		this.lines.push("  name: string;");
		this.lines.push("  address: number;");
		this.lines.push("};");
		this.lines.push("");
	}

	private addBase64Variants(): void {
		this.lines.push("export const base64_variants: {");
		this.lines.push("  ORIGINAL: number;");
		this.lines.push("  ORIGINAL_NO_PADDING: number;");
		this.lines.push("  URLSAFE: number;");
		this.lines.push("  URLSAFE_NO_PADDING: number;");
		this.lines.push("};");
		this.lines.push("");
		this.lines.push("export type base64_variants = number;");
		this.lines.push("");
	}

	private addOutputFormats(): void {
		this.lines.push("export const output_formats: string[];");
		this.lines.push("");
	}

	private addHelperFunctions(): void {
		this.lines.push(
			"export function from_base64(input: string, variant?: base64_variants): Uint8Array;",
		);
		this.lines.push(
			"export function to_base64(input: Uint8Array | string, variant?: base64_variants): string;",
		);
		this.lines.push("export function from_hex(input: string): Uint8Array;");
		this.lines.push(
			"export function to_hex(input: Uint8Array | string): string;",
		);
		this.lines.push("export function from_string(input: string): Uint8Array;");
		this.lines.push("export function to_string(input: Uint8Array): string;");
		this.lines.push(
			"export function pad(buf: Uint8Array, blocksize: number): Uint8Array;",
		);
		this.lines.push(
			"export function unpad(buf: Uint8Array, blocksize: number): Uint8Array;",
		);
		this.lines.push(
			"export function memcmp(b1: Uint8Array, b2: Uint8Array): boolean;",
		);
		this.lines.push("export function memzero(bytes: Uint8Array): void;");
		this.lines.push("export function increment(bytes: Uint8Array): void;");
		this.lines.push("export function add(a: Uint8Array, b: Uint8Array): void;");
		this.lines.push(
			"export function compare(b1: Uint8Array, b2: Uint8Array): number;",
		);
		this.lines.push("export function is_zero(bytes: Uint8Array): boolean;");
		this.lines.push("");
	}

	private addConstants(constants: Constant[]): void {
		this.lines.push("// Constants");
		for (const constant of constants) {
			const tsType = constant.type === "string" ? "string" : "number";
			this.lines.push(`export const ${constant.name}: ${tsType};`);
		}
		this.lines.push("");
	}

	private addFunctions(symbols: FunctionSymbol[]): void {
		this.lines.push("// Crypto functions");

		for (const symbol of symbols) {
			if (this.shouldSkipSymbol(symbol)) continue;

			const declaration = this.buildFunctionDeclaration(symbol);
			this.lines.push(declaration);
		}
		this.lines.push("");
	}

	private shouldSkipSymbol(symbol: FunctionSymbol): boolean {
		if (this.isSumo) return false;
		return SUMO_ONLY_PREFIXES.some((prefix) => symbol.name.startsWith(prefix));
	}

	private buildFunctionDeclaration(symbol: FunctionSymbol): string {
		const inputs = symbol.inputs ?? [];
		const outputs = symbol.outputs ?? [];

		const params: string[] = inputs.map((input) => {
			const tsType = INPUT_TYPE_MAP[input.type] ?? "any";
			return `${input.name}: ${tsType}`;
		});

		const hasFormattedOutput = symbol.return?.includes("_format_output");
		if (hasFormattedOutput) {
			params.push(`outputFormat?: ${OUTPUT_FORMAT_TYPE}`);
		}

		const returnType = this.inferReturnType(
			symbol,
			outputs,
			hasFormattedOutput,
		);
		return `export function ${symbol.name}(${params.join(", ")}): ${returnType};`;
	}

	private inferReturnType(
		symbol: FunctionSymbol,
		outputs: SymbolOutput[],
		hasFormattedOutput: boolean | undefined,
	): string {
		const objectType = this.parseObjectReturnType(symbol.return);
		if (objectType) return objectType;

		if (outputs.length > 0) {
			const outputType = outputs[0].type;
			if (
				outputType?.includes("_state") ||
				outputType?.includes("state_address")
			) {
				return "StateAddress";
			}
			if (hasFormattedOutput) return FORMATTED_RETURN_TYPE;
			if (INPUT_TYPE_MAP[outputType]) return INPUT_TYPE_MAP[outputType];
			return "Uint8Array";
		}

		if (symbol.return) {
			const ret = symbol.return;
			if (this.looksLikeBoolean(ret, symbol.name)) return "boolean";
			if (hasFormattedOutput) return FORMATTED_RETURN_TYPE;
			if (ret.includes("UTF8ToString") || ret.includes("_string"))
				return "string";
			if (this.looksLikeNumber(ret)) return "number";
		}

		return "void";
	}

	private looksLikeBoolean(returnExpr: string, functionName: string): boolean {
		return (
			returnExpr.includes("===") ||
			returnExpr.includes("!==") ||
			returnExpr.includes("==") ||
			returnExpr.includes("!=") ||
			functionName.includes("_verify")
		);
	}

	private looksLikeNumber(returnExpr: string): boolean {
		return (
			returnExpr.includes("random_value") ||
			returnExpr.includes(">>> 0") ||
			(/\b(value|result|ret|retval)\b/.test(returnExpr) &&
				!returnExpr.includes("_format_output"))
		);
	}

	// Object return types require special parsing because the return statement
	// may contain complex expressions like {publicKey: ..., privateKey: ...}
	private parseObjectReturnType(returnStatement?: string): string | null {
		if (!returnStatement || !returnStatement.includes("{")) return null;

		if (returnStatement.match(/\{publicKey:.*privateKey:.*keyType:/)) {
			return `{publicKey: ${FORMATTED_RETURN_TYPE}, privateKey: ${FORMATTED_RETURN_TYPE}, keyType: string}`;
		}

		if (returnStatement.match(/_format_output\(\{ciphertext:.*mac:.*\}/)) {
			return `{ciphertext: ${FORMATTED_RETURN_TYPE}, mac: ${FORMATTED_RETURN_TYPE}}`;
		}

		if (returnStatement.match(/_format_output\(\{mac:.*cipher:.*\}/)) {
			return `{mac: ${FORMATTED_RETURN_TYPE}, cipher: ${FORMATTED_RETURN_TYPE}}`;
		}

		if (returnStatement.match(/_format_output\(\{sharedRx:.*sharedTx:.*\}/)) {
			return `{sharedRx: ${FORMATTED_RETURN_TYPE}, sharedTx: ${FORMATTED_RETURN_TYPE}}`;
		}

		if (returnStatement.match(/\{\s*state:\s*state_address,\s*header:/)) {
			return `{state: StateAddress, header: ${FORMATTED_RETURN_TYPE}}`;
		}

		if (returnStatement.match(/ret\s*&&\s*\{message:.*tag:/)) {
			return `{message: ${FORMATTED_RETURN_TYPE}, tag: number} | void`;
		}

		return null;
	}

	private addSymbolsFunction(): void {
		this.lines.push("// Internal: list of all exported symbols");
		this.lines.push("export function symbols(): string[];");
	}
}

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

function main(): void {
	const args = process.argv.slice(2);
	const isSumo = args.includes("--sumo");
	const generateAll = args.includes("--all");

	const symbolsDir = path.join(__dirname, "symbols");
	const constantsFile = path.join(__dirname, "constants.json");

	const symbols = loadSymbols(symbolsDir);
	const constants = loadConstants(constantsFile);

	if (!isSumo || generateAll) {
		const outputFile = path.join(
			__dirname,
			"..",
			"dist",
			"modules",
			"libsodium-wrappers.d.ts",
		);
		fs.mkdirSync(path.dirname(outputFile), { recursive: true });
		const builder = new TypeScriptDefBuilder(false);
		fs.writeFileSync(outputFile, builder.build(symbols, constants));
		console.log(`Generated TypeScript definitions: ${outputFile}`);
	}

	if (isSumo || generateAll) {
		const outputFile = path.join(
			__dirname,
			"..",
			"dist",
			"modules-sumo",
			"libsodium-wrappers.d.ts",
		);
		fs.mkdirSync(path.dirname(outputFile), { recursive: true });
		const builder = new TypeScriptDefBuilder(true);
		fs.writeFileSync(outputFile, builder.build(symbols, constants));
		console.log(`Generated TypeScript definitions: ${outputFile}`);
	}
}

main();
