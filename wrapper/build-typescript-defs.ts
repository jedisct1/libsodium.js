#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Constant, FunctionSymbol } from "./types.ts";
import { isFunctionSymbol } from "./types.ts";
import {
	getInputTypeInfo,
	hasFormattedOutput,
	isSumoOnly,
	parseConstantReference,
	parseReturnType,
} from "./shared-types.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateObjectType(fields: { name: string; type: string }[], useString: boolean): string {
	const typedFields = fields.map(({ name, type }) => {
		let resolvedType = type;
		if (type === "Uint8Array | string") {
			resolvedType = useString ? "string" : "Uint8Array";
		}
		return `${name}: ${resolvedType}`;
	});
	return `{ ${typedFields.join("; ")} }`;
}

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
		this.lines.push('export type Uint8ArrayOutputFormat = "uint8array";');
		this.lines.push('export type StringOutputFormat = "text" | "hex" | "base64";');
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
		return isSumoOnly(symbol.name);
	}

	private buildJsDoc(symbol: FunctionSymbol): string[] {
		const inputs = symbol.inputs ?? [];
		const outputs = symbol.outputs ?? [];
		const lines: string[] = [];

		lines.push("/**");

		// Add parameter documentation
		for (const input of inputs) {
			const sizeRef = input.length ? parseConstantReference(input.length) : null;
			const sizeNote = sizeRef ? ` (${sizeRef} bytes)` : "";
			lines.push(` * @param ${input.name}${sizeNote}`);
		}

		if (hasFormattedOutput(symbol)) {
			lines.push(" * @param outputFormat Output format (default: Uint8Array)");
		}

		// Add return documentation
		const returnInfo = parseReturnType(symbol, outputs);
		if (returnInfo.ts !== "void") {
			if (outputs.length > 0 && outputs[0].length) {
				const sizeRef = parseConstantReference(outputs[0].length);
				if (sizeRef) {
					lines.push(` * @returns ${returnInfo.doc} (${sizeRef} bytes)`);
				} else {
					lines.push(` * @returns ${returnInfo.doc}`);
				}
			} else {
				lines.push(` * @returns ${returnInfo.doc}`);
			}
		}

		lines.push(" */");
		return lines;
	}

	private buildFunctionDeclaration(symbol: FunctionSymbol): string {
		const inputs = symbol.inputs ?? [];
		const outputs = symbol.outputs ?? [];

		const baseParams: string[] = inputs.map((input) => {
			const typeInfo = getInputTypeInfo(input.type);
			const tsType = typeInfo?.ts ?? "any";
			return `${input.name}: ${tsType}`;
		});

		const returnInfo = parseReturnType(symbol, outputs);
		const jsDoc = this.buildJsDoc(symbol);

		if (!hasFormattedOutput(symbol)) {
			// No formatting - single declaration with JSDoc
			return [...jsDoc, `export function ${symbol.name}(${baseParams.join(", ")}): ${returnInfo.ts};`].join("\n");
		}

		// Derive uint8 and string types from fields
		let uint8Type: string;
		let stringType: string;
		const falseSuffix = returnInfo.canBeFalse ? " | false" : "";

		if (returnInfo.fields) {
			uint8Type = generateObjectType(returnInfo.fields, false) + falseSuffix;
			stringType = generateObjectType(returnInfo.fields, true) + falseSuffix;
		} else {
			uint8Type = "Uint8Array";
			stringType = "string";
		}

		// Generate overloads with JSDoc on first overload
		const lines: string[] = [];

		// JSDoc + Overload 1: uint8array (default)
		lines.push(...jsDoc);
		const uint8Params = [...baseParams, "outputFormat?: Uint8ArrayOutputFormat | null"];
		lines.push(
			`export function ${symbol.name}(${uint8Params.join(", ")}): ${uint8Type};`,
		);

		// Overload 2: string formats (no JSDoc to avoid duplication)
		const stringParams = [...baseParams, "outputFormat: StringOutputFormat"];
		lines.push(
			`export function ${symbol.name}(${stringParams.join(", ")}): ${stringType};`,
		);

		return lines.join("\n");
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
