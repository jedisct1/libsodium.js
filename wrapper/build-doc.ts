import type { FunctionSymbol, SymbolInput, SymbolOutput } from "./types.ts";

const INPUT_TYPE_NAMES: Record<string, string> = {
	buf: "Buf",
	unsized_buf: "Unsized buf",
	minsized_buf: "Minsized buf",
	unsized_buf_optional: "Optional unsized buf",
	buf_optional: "Optional buf",
	uint: "Unsigned Integer",
	generichash_state_address: "Generichash state address",
	hash_sha256_state_address: "Sha256 state address",
	hash_sha512_state_address: "Sha512 state address",
	auth_hmacsha256_state_address: "Hmac Sha256 state address",
	auth_hmacsha512_state_address: "Hmac Sha512 state address",
	auth_hmacsha512256_state_address: "Hmac Sha512256 state address",
	onetimeauth_state_address: "OneTimeAuth state address",
	sign_state_address: "Signature state address",
	secretstream_xchacha20poly1305_state_address:
		"Secretstream XChaCha20Poly1305 state address",
	xof_shake128_state_address: "XOF SHAKE128 state address",
	xof_shake256_state_address: "XOF SHAKE256 state address",
	xof_turboshake128_state_address: "XOF TurboSHAKE128 state address",
	xof_turboshake256_state_address: "XOF TurboSHAKE256 state address",
	randombytes_implementation: "Randombytes implementation",
	unsized_string: "A string",
	string: "A string with a fixed length",
	u64: "An unsigned int or 64-bit BigInt",
};

const OUTPUT_TYPE_NAMES: Record<string, string> = {
	buf: "Buf",
	uint: "Unsigned Integer",
	generichash_state: "Generichash state",
	hash_sha256_state: "Sha256 state",
	hash_sha512_state: "Sha512 state",
	auth_hmacsha256_state: "Hmac Sha256 state",
	auth_hmacsha512_state: "Hmac Sha512 state",
	auth_hmacsha512256_state: "Hmac Sha512256 state",
	onetimeauth_state: "OneTimeAuth state",
	sign_state: "Signature state",
	secretstream_xchacha20poly1305_state: "Secretstream XChaCha20Poly1305 state",
	xof_shake128_state: "XOF SHAKE128 state",
	xof_shake256_state: "XOF SHAKE256 state",
	xof_turboshake128_state: "XOF TurboSHAKE128 state",
	xof_turboshake256_state: "XOF TurboSHAKE256 state",
};

export class DocBuilder {
	private lines: string[] = [];

	constructor() {
		this.lines = this.buildHeader();
	}

	private buildHeader(): string[] {
		return [
			"# Libsodium.js wrapper - API usage",
			"",
			"To learn about the role of each method, please refer to the original [documentation](https://doc.libsodium.org) of libsodium",
			"",
			"List of existing types:",
			"* `Buf`: An Uint8Array of a determined size. Used for keys, nonces, etc...",
			"* `Unsized Buf`: An Uint8Array of an arbitrary size. Used for messages to sign, encrypt, hash, etc...",
			"* `Minsized Buf`: An Uint8Array of a minimum size. Used for ciphertexts",
			"* `Optional unsized buf`",
			"* `Unsigned Integer`",
			"* `Generichash state`",
			"* `OneTimeAuth state`",
			"* `Secretstream XChaCha20Poly1305 state`",
			"* `Signature state`",
			"* `Randombytes implementation`",
			"* `String`",
			'* outputFormat: A string indicating in which output format you want the result to be returned. Supported values are "uint8array", "text", "hex", "base64". Optional parameter. Not available on all functions. Defaults to uint8array.',
			"",
			"Please note that a function that returns more than one variable will in fact return an object, which will contain the outputs in question and whose attributes will be named after the outputs' names",
			"",
			'Please also note that these are the function available "in general" in the wrapper. The actual number of available functions in given build may be inferior to that, depending on what functions you choose to build to JS.',
			"",
			"In addition to the main functions listed below, the library comes with a short list of helper methods. And here they are:",
			"* `from_string(string)`: converts a standard string into a Uint8Array",
			"* `to_string(buf)`: converts a Uint8Array to a standard string",
			"* `to_hex(buf)`: returns the hexadecimal representation of the provided buf",
			"* `from_hex(string)`: converts the provided hex-string into a Uint8Array and returns it",
			"* `to_base64(buf, variant)`: returns the base64 representation of the provided buf",
			"* `from_base64(string, variant)`: tries to convert the supposedly base64 string into a Uint8Array",
			"* `symbols()`: returns a list of the currently methods and constants",
			"* `raw`: attribute referencing the raw emscripten-built libsodium library that we are wrapping",
			"",
		];
	}

	addSymbol(symbol: FunctionSymbol): void {
		this.lines.push(...this.buildFunctionDoc(symbol));
	}

	private buildFunctionDoc(symbol: FunctionSymbol): string[] {
		const lines: string[] = [];
		const inputs = symbol.inputs ?? [];
		const outputs = symbol.outputs ?? [];

		lines.push(`## ${symbol.name}`);
		lines.push("Function");
		lines.push("");
		lines.push("__Parameters:__");

		for (const input of inputs) {
			lines.push(this.formatInput(input));
		}

		lines.push("");
		lines.push("__Outputs:__");

		if (outputs.length > 0) {
			for (const output of outputs) {
				lines.push(this.formatOutput(output));
			}
		} else {
			lines.push(
				"Boolean. True if method executed with success; false otherwise",
			);
		}

		lines.push("");
		return lines;
	}

	private formatInput(input: SymbolInput): string {
		const typeName = INPUT_TYPE_NAMES[input.type];
		if (!typeName) {
			throw new Error(`Unknown parameter type: ${input.type}`);
		}
		const sizeInfo = input.type === "buf" ? ` (size: ${input.size})` : "";
		return `* \`${input.name}\`: ${typeName}${sizeInfo}`;
	}

	private formatOutput(output: SymbolOutput): string {
		const typeName = OUTPUT_TYPE_NAMES[output.type];
		if (!typeName) {
			throw new Error(`Unknown output type: ${output.type}`);
		}
		const sizeInfo = output.type === "buf" ? ` (size: ${output.size})` : "";
		return `* \`${output.name}\`: ${typeName}${sizeInfo}`;
	}

	build(): string {
		return this.lines.join("\r\n");
	}
}

let globalDocBuilder: DocBuilder | null = null;

export function buildDocForSymbol(symbol: FunctionSymbol): void {
	if (!globalDocBuilder) {
		globalDocBuilder = new DocBuilder();
	}
	globalDocBuilder.addSymbol(symbol);
}

export function getResultDoc(): string {
	if (!globalDocBuilder) {
		globalDocBuilder = new DocBuilder();
	}
	return globalDocBuilder.build();
}

export function resetDocBuilder(): void {
	globalDocBuilder = null;
}
