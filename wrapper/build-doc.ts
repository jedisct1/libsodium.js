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

const inputTypeNames: Record<string, string> = {
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
	secretstream_xchacha20poly1305_state_address: "Secretstream XChaCha20Poly1305 state address",
	xof_shake128_state_address: "XOF SHAKE128 state address",
	xof_shake256_state_address: "XOF SHAKE256 state address",
	xof_turboshake128_state_address: "XOF TurboSHAKE128 state address",
	xof_turboshake256_state_address: "XOF TurboSHAKE256 state address",
	randombytes_implementation: "Randombytes implementation",
	unsized_string: "A string",
	string: "A string with a fixed length",
	u64: "An unsigned int or 64-bit BigInt",
};

const outputTypeNames: Record<string, string> = {
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

const NL = "\r\n";
const PARAGRAPH = "\r\n\r\n";

let docStr = `# Libsodium.js wrapper - API usage${PARAGRAPH}`;
docStr +=
	`To learn about the role of each method, please refer to the original [documentation](https://doc.libsodium.org) of libsodium${PARAGRAPH}`;
docStr += `List of existing types:${NL}`;
docStr += `* \`Buf\`: An Uint8Array of a determined size. Used for keys, nonces, etc...${NL}`;
docStr += `* \`Unsized Buf\`: An Uint8Array of an arbitrary size. Used for messages to sign, encrypt, hash, etc...${NL}`;
docStr += `* \`Minsized Buf\`: An Uint8Array of a minimum size. Used for ciphertexts${NL}`;
docStr += `* \`Optional unsized buf\`${NL}`;
docStr += `* \`Unsigned Integer\`${NL}`;
docStr += `* \`Generichash state\`${NL}`;
docStr += `* \`OneTimeAuth state\`${NL}`;
docStr += `* \`Secretstream XChaCha20Poly1305 state\`${NL}`;
docStr += `* \`Signature state\`${NL}`;
docStr += `* \`Randombytes implementation\`${NL}`;
docStr += `* \`String\`${NL}`;
docStr += `* outputFormat: A string indicating in which output format you want the result to be returned. Supported values are "uint8array", "text", "hex", "base64". Optional parameter. Not available on all functions. Defaults to uint8array.${PARAGRAPH}`;
docStr += `Please note that a function that returns more than one variable will in fact return an object, which will contain the outputs in question and whose attributes will be named after the outputs' names${PARAGRAPH}`;
docStr += `Please also note that these are the function available "in general" in the wrapper. The actual number of available functions in given build may be inferior to that, depending on what functions you choose to build to JS.${PARAGRAPH}`;
docStr += `In addition to the main functions listed below, the library comes with a short list of helper methods. And here they are:${NL}`;
docStr += `* \`from_string(string)\`: converts a standard string into a Uint8Array${NL}`;
docStr += `* \`to_string(buf)\`: converts a Uint8Array to a standard string${NL}`;
docStr += `* \`to_hex(buf)\`: returns the hexadecimal representation of the provided buf${NL}`;
docStr += `* \`from_hex(string)\`: converts the provided hex-string into a Uint8Array and returns it${NL}`;
docStr += `* \`to_base64(buf, variant)\`: returns the base64 representation of the provided buf${NL}`;
docStr += `* \`from_base64(string, variant)\`: tries to convert the supposedly base64 string into a Uint8Array${NL}`;
docStr += `* \`symbols()\`: returns a list of the currently methods and constants${NL}`;
docStr += `* \`raw\`: attribute referencing the raw emscripten-built libsodium library that we are wrapping${PARAGRAPH}`;

export function buildDocForSymbol(s: Symbol): void {
	if (s.type !== "function" && s.type !== "uint") {
		throw new Error("Invalid symbol type");
	}

	let sDoc = `## ${s.name}${NL}`;

	if (s.type === "function") {
		const inputs = s.inputs ?? [];
		const outputs = s.outputs ?? [];

		sDoc += `Function${PARAGRAPH}`;
		sDoc += `__Parameters:__${NL}`;

		for (const input of inputs) {
			const typeName = inputTypeNames[input.type];
			if (!typeName) {
				throw new Error(`Unknown parameter type: ${input.type}`);
			}
			const sizeInfo = input.type === "buf" ? ` (size: ${input.size})` : "";
			sDoc += `* \`${input.name}\`: ${typeName}${sizeInfo}${NL}`;
		}

		sDoc += `${NL}__Outputs:__${NL}`;

		if (outputs.length > 0) {
			for (const output of outputs) {
				const typeName = outputTypeNames[output.type];
				if (!typeName) {
					throw new Error(`Unknown output type: ${output.type}`);
				}
				const sizeInfo = output.type === "buf" ? ` (size: ${output.size})` : "";
				sDoc += `* \`${output.name}\`: ${typeName}${sizeInfo}${NL}`;
			}
		} else {
			sDoc += `Boolean. True if method executed with success; false otherwise${NL}`;
		}
	} else {
		sDoc += `Constant${PARAGRAPH}`;
	}

	sDoc += PARAGRAPH;
	docStr += sDoc;
}

export function getResultDoc(): string {
	return docStr;
}
