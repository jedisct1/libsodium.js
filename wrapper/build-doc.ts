interface SymbolInput {
	name: string;
	type: string;
	size?: string;
}

interface SymbolOutput {
	name: string;
	type: string;
	size?: string;
}

interface Symbol {
	name: string;
	type: "function" | "uint" | "string";
	inputs?: SymbolInput[];
	outputs?: SymbolOutput[];
}

let docStr = `# Libsodium.js wrapper - API usage${newParagraph()}`;
docStr +=
	"To learn about the role of each method, please refer to the original [documentation](https://doc.libsodium.org) of libsodium" +
	newParagraph();
docStr += `List of existing types:${newLine()}`;
docStr +=
	"* `Buf`: An Uint8Array of a determined size. Used for keys, nonces, etc..." +
	newLine();
docStr +=
	"* `Unsized Buf`: An Uint8Array of an arbitrary size. Used for messages to sign, encrypt, hash, etc..." +
	newLine();
docStr +=
	"* `Minsized Buf`: An Uint8Array of a minimum size. Used for ciphertexts" +
	newLine();
docStr += `* \`Optional unsized buf\`${newLine()}`;
docStr += `* \`Unsigned Integer\`${newLine()}`;
docStr += `* \`Generichash state\`${newLine()}`;
docStr += `* \`OneTimeAuth state\`${newLine()}`;
docStr += `* \`Secretstream XChaCha20Poly1305 state\`${newLine()}`;
docStr += `* \`Signature state\`${newLine()}`;
docStr += `* \`Randombytes implementation\`${newLine()}`;
docStr += `* \`String\`${newLine()}`;
docStr +=
	'* outputFormat: A string indicating in which output format you want the result to be returned. Supported values are "uint8array", "text", "hex", "base64". Optional parameter. Not available on all functions. Defaults to uint8array.' +
	newParagraph();
docStr +=
	"Please note that a function that returns more than one variable will in fact return an object, which will contain the outputs in question and whose attributes will be named after the outputs' names" +
	newParagraph();
docStr +=
	'Please also note that these are the function available "in general" in the wrapper. The actual number of available functions in given build may be inferior to that, depending on what functions you choose to build to JS.' +
	newParagraph();
docStr +=
	"In addition to the main functions listed below, the library comes with a short list of helper methods. And here they are:" +
	newLine();
docStr +=
	"* `from_string(string)`: converts a standard string into a Uint8Array" +
	newLine();
docStr += `* \`to_string(buf)\`: converts a Uint8Array to a standard string${newLine()}`;
docStr +=
	"* `to_hex(buf)`: returns the hexadecimal representation of the provided buf" +
	newLine();
docStr +=
	"* `from_hex(string)`: converts the provided hex-string into a Uint8Array and returns it" +
	newLine();
docStr +=
	"* `to_base64(buf, variant)`: returns the base64 representation of the provided buf" +
	newLine();
docStr +=
	"* `from_base64(string, variant)`: tries to convert the supposedly base64 string into a Uint8Array" +
	newLine();
docStr +=
	"* `symbols()`: returns a list of the currently methods and constants" +
	newLine();
docStr +=
	"* `raw`: attribute referencing the raw emscripten-built libsodium library that we are wrapping" +
	newParagraph();

export function buildDocForSymbol(s: Symbol): void {
	if (typeof s !== "object") {
		throw new TypeError("s must be an object");
	}
	if (!(s.type && (s.type === "function" || s.type === "uint"))) {
		throw new Error("Invalid symbol type");
	}

	let sDoc = `## ${s.name}${newLine()}`;

	if (s.type === "function") {
		if (!Array.isArray(s.inputs)) {
			throw new Error(
				`Invalid type for symbol.inputs. Symbol: ${JSON.stringify(s)}`,
			);
		}
		if (!Array.isArray(s.outputs)) {
			throw new Error(
				`Invalid type for symbol.outputs. Symbol: ${JSON.stringify(s)}`,
			);
		}

		sDoc += `Function${newParagraph()}`;
		sDoc += `__Parameters:__${newLine()}`;

		for (const input of s.inputs) {
			sDoc += `* \`${input.name}\`: `;
			const paramType = input.type;

			switch (paramType) {
				case "buf":
					sDoc += `Buf (size: ${input.size})`;
					break;
				case "unsized_buf":
					sDoc += "Unsized buf";
					break;
				case "minsized_buf":
					sDoc += "Minsized buf";
					break;
				case "unsized_buf_optional":
					sDoc += "Optional unsized buf";
					break;
				case "buf_optional":
					sDoc += "Optional buf";
					break;
				case "uint":
					sDoc += "Unsigned Integer";
					break;
				case "generichash_state_address":
					sDoc += "Generichash state address";
					break;
				case "hash_sha256_state_address":
					sDoc += "Sha256 state address";
					break;
				case "hash_sha512_state_address":
					sDoc += "Sha512 state address";
					break;
				case "auth_hmacsha256_state_address":
					sDoc += "Hmac Sha256 state address";
					break;
				case "auth_hmacsha512_state_address":
					sDoc += "Hmac Sha512 state address";
					break;
				case "auth_hmacsha512256_state_address":
					sDoc += "Hmac Sha512256 state address";
					break;
				case "onetimeauth_state_address":
					sDoc += "OneTimeAuth state address";
					break;
				case "sign_state_address":
					sDoc += "Signature state address";
					break;
				case "secretstream_xchacha20poly1305_state_address":
					sDoc += "Secretstream XChaCha20Poly1305 state address";
					break;
				case "xof_shake128_state_address":
					sDoc += "XOF SHAKE128 state address";
					break;
				case "xof_shake256_state_address":
					sDoc += "XOF SHAKE256 state address";
					break;
				case "xof_turboshake128_state_address":
					sDoc += "XOF TurboSHAKE128 state address";
					break;
				case "xof_turboshake256_state_address":
					sDoc += "XOF TurboSHAKE256 state address";
					break;
				case "randombytes_implementation":
					sDoc += "Randombytes implementation";
					break;
				case "unsized_string":
					sDoc += "A string";
					break;
				case "string":
					sDoc += "A string with a fixed length";
					break;
				case "u64":
					sDoc += "An unsigned int or 64-bit BigInt";
					break;
				default:
					throw new Error(`Unknown parameter type: ${paramType}`);
			}
			sDoc += newLine();
		}

		sDoc += `${newLine()}__Outputs:__${newLine()}`;

		if (s.outputs.length > 0) {
			for (const output of s.outputs) {
				sDoc += `* \`${output.name}\`: `;
				const outputType = output.type;

				switch (outputType) {
					case "buf":
						sDoc += `Buf (size: ${output.size})`;
						break;
					case "uint":
						sDoc += "Unsigned Integer";
						break;
					case "generichash_state":
						sDoc += "Generichash state";
						break;
					case "hash_sha256_state":
						sDoc += "Sha256 state";
						break;
					case "hash_sha512_state":
						sDoc += "Sha512 state";
						break;
					case "auth_hmacsha256_state":
						sDoc += "Hmac Sha256 state";
						break;
					case "auth_hmacsha512_state":
						sDoc += "Hmac Sha512 state";
						break;
					case "auth_hmacsha512256_state":
						sDoc += "Hmac Sha512256 state";
						break;
					case "onetimeauth_state":
						sDoc += "OneTimeAuth state";
						break;
					case "sign_state":
						sDoc += "Signature state";
						break;
					case "secretstream_xchacha20poly1305_state":
						sDoc += "Secretstream XChaCha20Poly1305 state";
						break;
					case "xof_shake128_state":
						sDoc += "XOF SHAKE128 state";
						break;
					case "xof_shake256_state":
						sDoc += "XOF SHAKE256 state";
						break;
					case "xof_turboshake128_state":
						sDoc += "XOF TurboSHAKE128 state";
						break;
					case "xof_turboshake256_state":
						sDoc += "XOF TurboSHAKE256 state";
						break;
					default:
						throw new Error(`Unknown output type: ${outputType}`);
				}
				sDoc += newLine();
			}
		} else {
			sDoc +=
				"Boolean. True if method executed with success; false otherwise" +
				newLine();
		}
	} else {
		sDoc += `Constant${newParagraph()}`;
	}

	sDoc += newParagraph();
	docStr += sDoc;
}

export function getResultDoc(): string {
	return docStr;
}

function newLine(): string {
	return "\r\n";
}

function newParagraph(): string {
	return "\r\n\r\n";
}
