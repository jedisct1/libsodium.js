#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type {
	Constant,
	FunctionSymbol,
	SymbolInput,
	SymbolOutput,
} from "./types.ts";
import { isFunctionSymbol } from "./types.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class WrapperBuilder {
	private macros: Map<string, string>;
	private templateCode: string;
	private esmTemplateCode: string | null;
	private functionsCode: string[] = [];
	private exportsCode: string[] = [];

	constructor(
		private libsodiumModuleName: string,
		private wrappersPath: string,
		private esmWrappersPath: string | null,
	) {
		this.macros = this.loadMacros();
		this.templateCode = this.loadTemplate("wrap-template.js");
		this.esmTemplateCode = esmWrappersPath
			? this.loadTemplate("wrap-esm-template.js")
			: null;
	}

	private loadMacros(): Map<string, string> {
		const macros = new Map<string, string>();
		const files = fs.readdirSync(path.join(__dirname, "macros"));

		for (const file of files) {
			const name = file.replace(".js", "");
			if (!/^[a-z0-9_]+$/.test(name)) continue;

			const code = fs.readFileSync(
				path.join(__dirname, "macros", file),
				"utf8",
			);
			macros.set(name, code);
		}

		return macros;
	}

	private loadTemplate(filename: string): string {
		return fs.readFileSync(path.join(__dirname, filename), "utf8");
	}

	build(symbols: FunctionSymbol[], constants: Constant[]): void {
		for (const symbol of symbols) {
			this.buildSymbolFunction(symbol);
		}

		this.buildFunctionExports(symbols);
		this.buildConstantExports(constants);
		this.writeOutputFiles();
	}

	private buildSymbolFunction(symbol: FunctionSymbol): void {
		const inputs = symbol.inputs ?? [];
		const outputs = symbol.outputs ?? [];
		const params = inputs.map((p) => p.name);
		if (!symbol.noOutputFormat) {
			params.push("outputFormat");
		}

		const lines: string[] = [];
		lines.push(`function ${symbol.name}(${params.join(", ")}) {`);
		lines.push("  var address_pool = [];");
		lines.push("");

		if (!symbol.noOutputFormat) {
			lines.push("  _check_output_format(outputFormat);");
		}

		const bodyLines = this.buildFunctionBody(symbol, inputs, outputs);
		lines.push(...this.indent(bodyLines, 1));

		lines.push("}");
		lines.push("");

		this.functionsCode.push(lines.join("\n"));
	}

	private buildFunctionBody(
		symbol: FunctionSymbol,
		inputs: SymbolInput[],
		outputs: SymbolOutput[],
	): string[] {
		const lines: string[] = [];

		for (const input of inputs) {
			lines.push(...this.applyInputMacro(input));
		}

		for (const output of outputs) {
			lines.push(...this.applyOutputMacro(output));
		}

		lines.push(...this.buildReturnLogic(symbol));

		return lines;
	}

	private applyInputMacro(input: SymbolInput): string[] {
		const macroCode = this.macros.get(`input_${input.type}`);
		if (!macroCode) {
			console.error(`Unsupported input type ${input.type}?`);
			process.exit(1);
		}
		return this.substituteMacro(macroCode, input).split("\n");
	}

	private applyOutputMacro(output: SymbolOutput): string[] {
		const macroCode = this.macros.get(`output_${output.type}`);
		if (!macroCode) {
			console.error(`What is the output type ${output.type}?`);
			process.exit(1);
		}
		return this.substituteMacro(macroCode, output).split("\n");
	}

	private substituteMacro(
		code: string,
		variable: SymbolInput | SymbolOutput,
	): string {
		let result = code;
		result = result.split("{var_name}").join(variable.name);
		if (variable.length !== undefined) {
			result = result.split("{var_length}").join(variable.length);
		}
		if (variable.min_length !== undefined) {
			result = result.split("{var_min_length}").join(variable.min_length);
		}
		return result;
	}

	private buildReturnLogic(symbol: FunctionSymbol): string[] {
		const lines: string[] = [];

		if (symbol.assert_retval !== undefined) {
			let target = symbol.target!;
			if (symbol.assert_retval.length > 1) {
				lines.push(`var _ret = ${target};`);
				target = "_ret";
			}

			if (symbol.return !== undefined) {
				for (const assert of symbol.assert_retval) {
					lines.push(`if ((${target}) ${assert.condition}) {`);
					lines.push(`\tvar ret = ${symbol.return};`);
					lines.push("\t_free_all(address_pool);");
					lines.push("\treturn ret;");
					lines.push("}");
					lines.push(
						`_free_and_throw_error(address_pool, "${assert.or_else_throw}");`,
					);
				}
			} else {
				for (const assert of symbol.assert_retval) {
					lines.push(`if (!((${target}) ${assert.condition})) {`);
					lines.push(
						`\t_free_and_throw_error(address_pool, "${assert.or_else_throw}");`,
					);
					lines.push("}");
					lines.push("_free_all(address_pool);");
				}
			}
		} else if (symbol.return !== undefined) {
			lines.push(this.ensureSemicolon(symbol.target!));
			lines.push(`var ret = (${symbol.return});`);
			lines.push("_free_all(address_pool);");
			lines.push("return ret;");
		} else {
			lines.push(this.ensureSemicolon(symbol.target!));
		}

		return lines;
	}

	private buildFunctionExports(symbols: FunctionSymbol[]): void {
		const sortedNames = symbols.map((s) => s.name).sort();
		const keys = sortedNames.map((name) => `"${name}"`);
		const functions = sortedNames;

		this.exportsCode.push(`var exported_functions = [${keys.join(", ")}];`);
		this.exportsCode.push(`var functions = [${functions.join(", ")}];`);
		this.exportsCode.push("for (var i = 0; i < functions.length; i++) {");
		this.exportsCode.push(
			'  if (typeof libsodium["_" + exported_functions[i]] === "function") {',
		);
		this.exportsCode.push("    exports[exported_functions[i]] = functions[i];");
		this.exportsCode.push("  }");
		this.exportsCode.push("}");
	}

	private buildConstantExports(constants: Constant[]): void {
		const uintConstants = constants
			.filter((c) => c.type === "uint")
			.map((c) => `"${c.name}"`)
			.sort();

		const stringConstants = constants
			.filter((c) => c.type === "string")
			.map((c) => `"${c.name}"`)
			.sort();

		this.exportsCode.push(`var constants = [${uintConstants.join(", ")}];`);
		this.exportsCode.push("for (var i = 0; i < constants.length; i++) {");
		this.exportsCode.push(
			'  var raw = libsodium["_" + constants[i].toLowerCase()];',
		);
		this.exportsCode.push(
			'  if (typeof raw === "function") exports[constants[i]] = raw();',
		);
		this.exportsCode.push("}");

		this.exportsCode.push(
			`var constants_str = [${stringConstants.join(", ")}];`,
		);
		this.exportsCode.push("for (var i = 0; i < constants_str.length; i++) {");
		this.exportsCode.push(
			'  var raw = libsodium["_" + constants_str[i].toLowerCase()];',
		);
		this.exportsCode.push(
			'  if (typeof raw === "function") exports[constants_str[i]] = libsodium.UTF8ToString(raw());',
		);
		this.exportsCode.push("}");
	}

	private writeOutputFiles(): void {
		const functionsText = this.functionsCode.join("\n");
		const exportsText = this.exportsCode.join("\n");

		const cjsOutput = this.applyTemplate(this.templateCode, {
			wraps: this.indent(functionsText.split("\n"), 2).join("\n"),
			exports: this.indent(exportsText.split("\n"), 3).join("\n"),
			libsodium: this.libsodiumModuleName,
		});

		fs.writeFileSync(this.wrappersPath, cjsOutput);

		if (this.esmWrappersPath && this.esmTemplateCode) {
			const esmOutput = this.applyTemplate(this.esmTemplateCode, {
				wraps: functionsText,
				exports: this.indent(exportsText.split("\n"), 1).join("\n"),
				libsodium: this.libsodiumModuleName,
			});
			fs.writeFileSync(this.esmWrappersPath, esmOutput);
		}
	}

	private applyTemplate(
		template: string,
		values: { wraps: string; exports: string; libsodium: string },
	): string {
		return template
			.split("/*{{wraps_here}}*/")
			.join(values.wraps)
			.split("/*{{exports_here}}*/")
			.join(values.exports)
			.split("/*{{libsodium}}*/")
			.join(values.libsodium);
	}

	private indent(lines: string[], count: number): string[] {
		const prefix = "  ".repeat(count);
		return lines.map((line) => (line === "" ? "" : prefix + line));
	}

	private ensureSemicolon(s: string): string {
		return s.endsWith(";") ? s : `${s};`;
	}
}

function loadSymbols(): FunctionSymbol[] {
	const symbolsDir = path.join(__dirname, "symbols");
	const files = fs.readdirSync(symbolsDir).sort();
	const symbols: FunctionSymbol[] = [];

	for (const file of files) {
		if (!file.endsWith(".json")) continue;

		const text = fs.readFileSync(path.join(symbolsDir, file), "utf8");
		let symbol: unknown;
		try {
			symbol = JSON.parse(text);
		} catch {
			console.error(`Invalid symbol file for ${file}`);
			process.exit(1);
		}

		if (isFunctionSymbol(symbol as FunctionSymbol)) {
			symbols.push(symbol as FunctionSymbol);
		} else {
			console.error(`Unknown symbol type in ${file}`);
			process.exit(1);
		}
	}

	return symbols;
}

function loadConstants(): Constant[] {
	const text = fs.readFileSync(path.join(__dirname, "constants.json"), "utf8");
	let constants: Constant[];
	try {
		constants = JSON.parse(text);
	} catch {
		console.error("Invalid constants list");
		process.exit(1);
	}

	if (!Array.isArray(constants)) {
		console.error("constants file must contain an array");
		process.exit(1);
	}

	return constants;
}

function main(): void {
	const argv = process.argv;
	if (argv.length !== 4 && argv.length !== 5) {
		console.error(
			"Usage: build-wrappers.ts <libsodium module name> <wrappers path> [esm wrappers path]",
		);
		process.exit(1);
	}

	const libsodiumModuleName = argv[2];
	const wrappersPath = argv[3];
	const esmWrappersPath = argv[4] ?? null;

	const symbols = loadSymbols();
	const constants = loadConstants();

	const builder = new WrapperBuilder(
		libsodiumModuleName,
		wrappersPath,
		esmWrappersPath,
	);
	builder.build(symbols, constants);
}

main();
