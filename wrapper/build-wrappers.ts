#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as docBuilder from "./build-doc.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SymbolInput {
	name: string;
	type: string;
	length?: string;
	min_length?: string;
}

interface SymbolOutput {
	name: string;
	type: string;
	length?: string;
	min_length?: string;
}

interface AssertRetval {
	condition: string;
	or_else_throw: string;
}

interface Symbol {
	name: string;
	type: "function" | "constant";
	inputs?: SymbolInput[];
	outputs?: SymbolOutput[];
	target?: string;
	return?: string;
	noOutputFormat?: boolean;
	assert_retval?: AssertRetval[];
}

interface Substitution {
	from: string;
	to: string;
}

interface Constant {
	name: string;
	type: "uint" | "string";
}

const argv = process.argv;
if (argv.length !== 5 && argv.length !== 6) {
	console.error(
		"Usage: build-wrappers.ts <libsodium module name> <API.md path> <wrappers path> [esm wrappers path]",
	);
	process.exit(1);
}

const libsodiumModuleName = argv[2];
const apiPath = argv[3];
const wrappersPath = argv[4];
const esmWrappersPath = argv[5] || null;

const macros: Record<string, string> = {};
const macrosFiles = fs.readdirSync(path.join(__dirname, "macros"));

for (const macroFile of macrosFiles) {
	const macroName = macroFile.replace(".js", "");
	if (!macroName.match(/^[a-z0-9_]+$/)) {
		continue;
	}
	const macroCode = fs.readFileSync(path.join(__dirname, "macros", macroFile), {
		encoding: "utf8",
	});
	macros[macroName] = macroCode;
}

const templateCode = fs.readFileSync(path.join(__dirname, "wrap-template.js"), {
	encoding: "utf8",
});

let esmTemplateCode: string | null = null;
if (esmWrappersPath) {
	esmTemplateCode = fs.readFileSync(
		path.join(__dirname, "wrap-esm-template.js"),
		{
			encoding: "utf8",
		},
	);
}

let scriptBuf = templateCode;
let esmScriptBuf = esmTemplateCode;
let functionsCode = "";
let exportsCode = "";

const symbols: Symbol[] = [];
const symbolsFiles = fs.readdirSync(path.join(__dirname, "symbols")).sort();

for (const symbolFile of symbolsFiles) {
	if (!symbolFile.endsWith(".json")) {
		continue;
	}
	const currentSymbolText = fs.readFileSync(
		path.join(__dirname, "symbols", symbolFile),
		{ encoding: "utf8" },
	);
	let currentSymbol: Symbol;
	try {
		currentSymbol = JSON.parse(currentSymbolText);
	} catch (_e) {
		console.error(`Invalid symbol file for ${symbolFile}`);
		process.exit(1);
	}
	symbols.push(currentSymbol);
}

for (const symbol of symbols) {
	buildSymbol(symbol);
}

exportFunctions(symbols);
exportConstants(loadConstants());
finalizeWrapper();

function exportFunctions(symbols: Symbol[]): void {
	const keys: string[] = [];
	const functions: string[] = [];

	for (const symbol of symbols) {
		keys.push(`"${symbol.name}"`);
		functions.push(symbol.name);
	}

	exportsCode += `var exported_functions = [${keys.sort().join(", ")}];\n`;
	exportsCode += `var functions = [${functions.sort().join(", ")}];\n`;
	exportsCode += "for (var i = 0; i < functions.length; i++) {\n";
	exportsCode +=
		'  if (typeof libsodium["_" + exported_functions[i]] === "function") {\n';
	exportsCode += "    exports[exported_functions[i]] = functions[i];\n";
	exportsCode += "  }\n";
	exportsCode += "}\n";
}

function exportConstants(constSymbols: Constant[]): void {
	const keys: string[] = [];

	for (const constSymbol of constSymbols) {
		if (constSymbol.type === "uint") {
			keys.push(`"${constSymbol.name}"`);
		}
	}

	exportsCode += `var constants = [${keys.sort().join(", ")}];\n`;
	exportsCode += "for (var i = 0; i < constants.length; i++) {\n";
	exportsCode += '  var raw = libsodium["_" + constants[i].toLowerCase()];\n';
	exportsCode +=
		'  if (typeof raw === "function") exports[constants[i]] = raw();\n';
	exportsCode += "}\n";

	const strKeys: string[] = [];
	for (const constSymbol of constSymbols) {
		if (constSymbol.type === "string") {
			strKeys.push(`"${constSymbol.name}"`);
		}
	}

	exportsCode += `var constants_str = [${strKeys.sort().join(", ")}];\n`;
	exportsCode += "for (var i = 0; i < constants_str.length; i++) {\n";
	exportsCode +=
		'  var raw = libsodium["_" + constants_str[i].toLowerCase()];\n';
	exportsCode +=
		'  if (typeof raw === "function") exports[constants_str[i]] = libsodium.UTF8ToString(raw());\n';
	exportsCode += "}\n";
}

function buildSymbol(symbolDescription: Symbol): void {
	if (typeof symbolDescription !== "object") {
		throw new TypeError("symbolDescription must be an object");
	}

	if (symbolDescription.type === "function") {
		const _targetName = `libsodium._${symbolDescription.name}`;
		let funcCode = `function ${symbolDescription.name}(`;
		let funcBody = "";

		const paramsArray: string[] = [];
		const inputs = symbolDescription.inputs || [];

		for (const currentParameter of inputs) {
			paramsArray.push(currentParameter.name);

			const currentParameterCode = macros[`input_${currentParameter.type}`];
			if (!currentParameterCode) {
				console.error(`Unsupported input type ${currentParameter.type}?`);
				process.exit(1);
			}

			const substitutions: Substitution[] = [
				{ from: "{var_name}", to: currentParameter.name },
			];
			if (currentParameter.length !== undefined) {
				substitutions.push({
					from: "{var_length}",
					to: currentParameter.length,
				});
			}
			if (currentParameter.min_length !== undefined) {
				substitutions.push({
					from: "{var_min_length}",
					to: currentParameter.min_length,
				});
			}

			const processedCode = applyMacro(
				currentParameterCode,
				substitutions.map((s) => s.from),
				substitutions.map((s) => s.to),
			);
			funcBody += `${processedCode}\n`;
		}

		if (!symbolDescription.noOutputFormat) {
			paramsArray.push("outputFormat");
		}

		funcCode += `${paramsArray.join(", ")}) {\n`;
		funcCode += "  var address_pool = [];\n";
		funcCode += "\n";

		if (!symbolDescription.noOutputFormat) {
			funcCode += "  _check_output_format(outputFormat);\n";
		}

		const outputs = symbolDescription.outputs || [];
		for (const currentOutput of outputs) {
			const currentOutputCode = macros[`output_${currentOutput.type}`];
			if (!currentOutputCode) {
				console.error(`What is the output type ${currentOutput.type}?`);
				process.exit(1);
			}

			const substitutions: Substitution[] = [
				{ from: "{var_name}", to: currentOutput.name },
			];
			if (currentOutput.length !== undefined) {
				substitutions.push({ from: "{var_length}", to: currentOutput.length });
			}
			if (currentOutput.min_length !== undefined) {
				substitutions.push({
					from: "{var_min_length}",
					to: currentOutput.min_length,
				});
			}

			const processedCode = applyMacro(
				currentOutputCode,
				substitutions.map((s) => s.from),
				substitutions.map((s) => s.to),
			);
			funcBody += `${processedCode}\n`;
		}

		if (symbolDescription.assert_retval !== undefined) {
			let target = symbolDescription.target!;
			if (symbolDescription.assert_retval.length > 1) {
				funcBody += `var _ret = ${target};\n`;
				target = "_ret";
			}

			if (symbolDescription.return !== undefined) {
				for (const assert of symbolDescription.assert_retval) {
					funcBody += `if ((${target}) ${assert.condition}) {\n`;
					funcBody += `\tvar ret = ${symbolDescription.return};\n`;
					funcBody += "\t_free_all(address_pool);\n";
					funcBody += "\treturn ret;\n";
					funcBody += "}\n";
					funcBody +=
						"_free_and_throw_error(address_pool, " +
						'"' +
						assert.or_else_throw +
						'"' +
						");\n";
				}
			} else {
				for (const assert of symbolDescription.assert_retval) {
					funcBody += `if (!((${target}) ${assert.condition})) {\n`;
					funcBody +=
						"\t_free_and_throw_error(address_pool, " +
						'"' +
						assert.or_else_throw +
						'"' +
						");\n";
					funcBody += "}\n";
					funcBody += "_free_all(address_pool);\n";
				}
			}
		} else if (symbolDescription.return !== undefined) {
			funcBody += `${sc(symbolDescription.target!)}\n`;
			funcBody += `var ret = (${symbolDescription.return});\n`;
			funcBody += "_free_all(address_pool);\n";
			funcBody += "return ret;\n";
		} else {
			funcBody += `${sc(symbolDescription.target!)}\n`;
		}

		funcCode += injectTabs(funcBody);
		funcCode += "}\n";

		functionsCode += funcCode;
		functionsCode += "\n";
	} else {
		console.error(`Unknown symbol type ${symbolDescription.type}`);
		process.exit(1);
	}

	docBuilder.buildDocForSymbol(symbolDescription);
}

function applyMacro(
	macroCode: string,
	symbols: string[],
	substitutes: string[],
): string {
	if (typeof macroCode !== "string") {
		throw new TypeError(`macroCode must be a string, not ${typeof macroCode}`);
	}
	if (!Array.isArray(symbols) || !checkStrArray(symbols)) {
		throw new TypeError(
			`symbols must be an array of strings (found: ${typeof symbols})`,
		);
	}
	if (!Array.isArray(substitutes) || !checkStrArray(substitutes)) {
		throw new TypeError(
			"substitutes must be an array of strings for [" +
				macroCode +
				"] [" +
				substitutes +
				"] (found: " +
				typeof substitutes +
				")",
		);
	}
	if (symbols.length > substitutes.length) {
		throw new TypeError("invalid array length for substitutes");
	}

	let result = macroCode;
	for (let i = 0; i < symbols.length; i++) {
		result = result.split(symbols[i]).join(substitutes[i]);
	}
	return result;
}

function finalizeWrapper(): void {
	scriptBuf = applyMacro(
		scriptBuf,
		["/*{{wraps_here}}*/", "/*{{exports_here}}*/", "/*{{libsodium}}*/"],
		[
			injectTabs(functionsCode, 2),
			injectTabs(exportsCode, 3),
			libsodiumModuleName,
		],
	);
	fs.writeFileSync(wrappersPath, scriptBuf);
	fs.writeFileSync(apiPath, docBuilder.getResultDoc());

	if (esmWrappersPath && esmScriptBuf) {
		const esmModuleName = libsodiumModuleName;
		esmScriptBuf = applyMacro(
			esmScriptBuf,
			["/*{{wraps_here}}*/", "/*{{exports_here}}*/", "/*{{libsodium}}*/"],
			[functionsCode, injectTabs(exportsCode, 1), esmModuleName],
		);
		fs.writeFileSync(esmWrappersPath, esmScriptBuf);
	}
}

function injectTabs(code: string, count: number = 1): string {
	let out = "";
	const cleanedCode = code.replace(/\r?\n$/, "");
	const lines = cleanedCode.split(/\r?\n/g);

	for (const line of lines) {
		if (line !== "") {
			out += "  ".repeat(count) + line;
		}
		out += "\n";
	}
	return out;
}

function loadConstants(): Constant[] {
	const constListText = fs.readFileSync(
		path.join(__dirname, "constants.json"),
		{ encoding: "utf8" },
	);

	let constList: Constant[];
	try {
		constList = JSON.parse(constListText);
	} catch (_e) {
		console.error("Invalid constants list");
		process.exit(1);
	}

	if (!Array.isArray(constList) || !checkObjectArray(constList)) {
		console.error("constants file must contain an array of objects");
		process.exit(1);
	}

	const constSymbols: Constant[] = [];
	for (const currentConstant of constList) {
		constSymbols.push({
			name: currentConstant.name,
			type: currentConstant.type,
		});
	}
	return constSymbols;
}

function checkStrArray(a: unknown[]): boolean {
	return a.every((item) => typeof item === "string");
}

function checkObjectArray(a: unknown[]): boolean {
	return a.every((item) => typeof item === "object" && item !== null);
}

function sc(s: string): string {
	if (!s.endsWith(";")) {
		return `${s};`;
	}
	return s;
}
