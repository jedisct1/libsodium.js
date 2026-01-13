import type { FunctionSymbol, SymbolInput, SymbolOutput } from "./types.ts";

export const INPUT_TYPES = {
	buf: { ts: "Uint8Array", doc: "Uint8Array", description: "Fixed-size buffer" },
	unsized_buf: {
		ts: "Uint8Array | string",
		doc: "Uint8Array | string",
		description: "Variable-size buffer",
	},
	unsized_buf_optional: {
		ts: "Uint8Array | string | null",
		doc: "Uint8Array | string | null",
		description: "Optional variable-size buffer",
	},
	minsized_buf: {
		ts: "Uint8Array",
		doc: "Uint8Array",
		description: "Buffer with minimum size",
	},
	buf_optional: {
		ts: "Uint8Array | null",
		doc: "Uint8Array | null",
		description: "Optional fixed-size buffer",
	},
	uint: { ts: "number", doc: "number", description: "Unsigned integer" },
	u64: {
		ts: "number | bigint",
		doc: "number | bigint",
		description: "64-bit integer",
	},
	string: { ts: "string", doc: "string", description: "Fixed-length string" },
	unsized_string: {
		ts: "string",
		doc: "string",
		description: "Variable-length string",
	},
	randombytes_implementation: {
		ts: "object",
		doc: "object",
		description: "Random bytes implementation",
	},
} as const;

export const STATE_TYPES = [
	"generichash_state",
	"hash_sha256_state",
	"hash_sha512_state",
	"auth_hmacsha256_state",
	"auth_hmacsha512_state",
	"auth_hmacsha512256_state",
	"onetimeauth_state",
	"sign_state",
	"secretstream_xchacha20poly1305_state",
	"xof_shake128_state",
	"xof_shake256_state",
	"xof_turboshake128_state",
	"xof_turboshake256_state",
] as const;

export type StateType = (typeof STATE_TYPES)[number];

export function isStateType(type: string): type is StateType {
	return STATE_TYPES.includes(type as StateType);
}

export function isStateAddressType(type: string): boolean {
	return type.endsWith("_state_address") || type.endsWith("_state");
}

export function getInputTypeInfo(
	type: string,
): (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES] | null {
	if (type in INPUT_TYPES) {
		return INPUT_TYPES[type as keyof typeof INPUT_TYPES];
	}
	if (isStateAddressType(type)) {
		return { ts: "StateAddress", doc: "StateAddress", description: "State object" };
	}
	return null;
}

export function getOutputTypeInfo(type: string): { ts: string; doc: string } {
	if (type === "buf") {
		return { ts: "Uint8Array", doc: "Uint8Array" };
	}
	if (type === "uint") {
		return { ts: "number", doc: "number" };
	}
	if (isStateType(type) || isStateAddressType(type)) {
		return { ts: "StateAddress", doc: "StateAddress" };
	}
	return { ts: "Uint8Array", doc: "Uint8Array" };
}

export function parseConstantReference(length: string): string | null {
	const match = length.match(/libsodium\._(\w+)\(\)/);
	if (match) {
		return match[1].toUpperCase().replace(/_/g, "_");
	}
	return null;
}

export function hasFormattedOutput(symbol: FunctionSymbol): boolean {
	return symbol.return?.includes("_format_output") ?? false;
}

export interface ParsedReturnType {
	ts: string;
	doc: string;
	isObject: boolean;
	fields?: { name: string; type: string }[];
}

export function parseReturnType(
	symbol: FunctionSymbol,
	outputs: SymbolOutput[],
): ParsedReturnType {
	const ret = symbol.return;

	if (ret?.match(/\{publicKey:.*privateKey:.*keyType:/)) {
		return {
			ts: "{publicKey: Uint8Array | string, privateKey: Uint8Array | string, keyType: string}",
			doc: "{publicKey, privateKey, keyType}",
			isObject: true,
			fields: [
				{ name: "publicKey", type: "Uint8Array | string" },
				{ name: "privateKey", type: "Uint8Array | string" },
				{ name: "keyType", type: "string" },
			],
		};
	}

	if (ret?.match(/_format_output\(\{ciphertext:.*mac:.*\}/)) {
		return {
			ts: "{ciphertext: Uint8Array | string, mac: Uint8Array | string}",
			doc: "{ciphertext, mac}",
			isObject: true,
			fields: [
				{ name: "ciphertext", type: "Uint8Array | string" },
				{ name: "mac", type: "Uint8Array | string" },
			],
		};
	}

	if (ret?.match(/_format_output\(\{mac:.*cipher:.*\}/)) {
		return {
			ts: "{mac: Uint8Array | string, cipher: Uint8Array | string}",
			doc: "{mac, cipher}",
			isObject: true,
			fields: [
				{ name: "mac", type: "Uint8Array | string" },
				{ name: "cipher", type: "Uint8Array | string" },
			],
		};
	}

	if (ret?.match(/_format_output\(\{sharedRx:.*sharedTx:.*\}/)) {
		return {
			ts: "{sharedRx: Uint8Array | string, sharedTx: Uint8Array | string}",
			doc: "{sharedRx, sharedTx}",
			isObject: true,
			fields: [
				{ name: "sharedRx", type: "Uint8Array | string" },
				{ name: "sharedTx", type: "Uint8Array | string" },
			],
		};
	}

	if (ret?.match(/\{\s*state:\s*state_address,\s*header:/)) {
		return {
			ts: "{state: StateAddress, header: Uint8Array | string}",
			doc: "{state, header}",
			isObject: true,
			fields: [
				{ name: "state", type: "StateAddress" },
				{ name: "header", type: "Uint8Array | string" },
			],
		};
	}

	if (ret?.match(/ret\s*&&\s*\{message:.*tag:/)) {
		return {
			ts: "{message: Uint8Array | string, tag: number} | false",
			doc: "{message, tag} | false",
			isObject: true,
			fields: [
				{ name: "message", type: "Uint8Array | string" },
				{ name: "tag", type: "number" },
			],
		};
	}

	if (outputs.length > 0) {
		const outputType = outputs[0].type;
		if (isStateType(outputType) || isStateAddressType(outputType)) {
			return { ts: "StateAddress", doc: "StateAddress", isObject: false };
		}
		if (hasFormattedOutput(symbol)) {
			return { ts: "Uint8Array | string", doc: "Uint8Array | string", isObject: false };
		}
		const typeInfo = getOutputTypeInfo(outputType);
		return { ts: typeInfo.ts, doc: typeInfo.doc, isObject: false };
	}

	if (ret) {
		if (looksLikeBoolean(ret, symbol.name)) {
			return { ts: "boolean", doc: "boolean", isObject: false };
		}
		if (hasFormattedOutput(symbol)) {
			return { ts: "Uint8Array | string", doc: "Uint8Array | string", isObject: false };
		}
		if (ret.includes("UTF8ToString") || ret.includes("_string")) {
			return { ts: "string", doc: "string", isObject: false };
		}
		if (looksLikeNumber(ret)) {
			return { ts: "number", doc: "number", isObject: false };
		}
	}

	return { ts: "void", doc: "void", isObject: false };
}

function looksLikeBoolean(returnExpr: string, functionName: string): boolean {
	return (
		returnExpr.includes("===") ||
		returnExpr.includes("!==") ||
		returnExpr.includes("==") ||
		returnExpr.includes("!=") ||
		functionName.includes("_verify")
	);
}

function looksLikeNumber(returnExpr: string): boolean {
	return (
		returnExpr.includes("random_value") ||
		returnExpr.includes(">>> 0") ||
		(/\b(value|result|ret|retval)\b/.test(returnExpr) &&
			!returnExpr.includes("_format_output"))
	);
}

export const SUMO_ONLY_PREFIXES = [
	"crypto_pwhash_scryptsalsa208sha256",
];

export function isSumoOnly(name: string): boolean {
	return SUMO_ONLY_PREFIXES.some((prefix) => name.startsWith(prefix));
}

export interface FunctionCategory {
	name: string;
	description: string;
	patterns: RegExp[];
}

export const FUNCTION_CATEGORIES: FunctionCategory[] = [
	{
		name: "AEAD Encryption",
		description: "Authenticated Encryption with Associated Data",
		patterns: [/^crypto_aead(_|$)/],
	},
	{
		name: "Secret-key Encryption",
		description: "Symmetric encryption using a shared secret key",
		patterns: [/^crypto_secretbox(_|$)/, /^crypto_stream(_|$)/],
	},
	{
		name: "Public-key Encryption",
		description: "Asymmetric encryption using key pairs",
		patterns: [/^crypto_box(_|$)/, /^crypto_sealedbox(_|$)/],
	},
	{
		name: "Signatures",
		description: "Digital signatures for message authentication",
		patterns: [/^crypto_sign(_|$)/],
	},
	{
		name: "Hashing",
		description: "Cryptographic hash functions",
		patterns: [/^crypto_hash(_|$)/, /^crypto_generichash(_|$)/, /^crypto_shorthash(_|$)/],
	},
	{
		name: "Password Hashing",
		description: "Key derivation from passwords",
		patterns: [/^crypto_pwhash(_|$)/],
	},
	{
		name: "Key Derivation",
		description: "Deriving keys from a master key",
		patterns: [/^crypto_kdf(_|$)/],
	},
	{
		name: "Key Exchange",
		description: "Shared secret computation from key pairs",
		patterns: [/^crypto_kx(_|$)/, /^crypto_scalarmult(_|$)/],
	},
	{
		name: "Message Authentication",
		description: "MAC computation and verification",
		patterns: [/^crypto_auth(_|$)/, /^crypto_onetimeauth(_|$)/],
	},
	{
		name: "Secret Streams",
		description: "Streaming encryption for sequences of messages",
		patterns: [/^crypto_secretstream(_|$)/],
	},
	{
		name: "Random",
		description: "Cryptographically secure random number generation",
		patterns: [/^randombytes(_|$)/],
	},
	{
		name: "Utilities",
		description: "Memory operations and padding",
		patterns: [/^sodium_/, /^crypto_core(_|$)/, /^crypto_verify(_|$)/],
	},
	{
		name: "XOF (Extendable Output)",
		description: "Extendable-output functions (SHAKE, TurboSHAKE)",
		patterns: [/^crypto_xof(_|$)/],
	},
	{
		name: "IP Address Encryption",
		description: "Format-preserving encryption for IP addresses",
		patterns: [/^crypto_ipcrypt(_|$)/],
	},
];

export function categorizeFunction(name: string): string {
	for (const category of FUNCTION_CATEGORIES) {
		if (category.patterns.some((pattern) => pattern.test(name))) {
			return category.name;
		}
	}
	return "Other";
}

export function groupByCategory(
	symbols: FunctionSymbol[],
): Map<string, FunctionSymbol[]> {
	const groups = new Map<string, FunctionSymbol[]>();

	for (const symbol of symbols) {
		const category = categorizeFunction(symbol.name);
		if (!groups.has(category)) {
			groups.set(category, []);
		}
		groups.get(category)!.push(symbol);
	}

	return groups;
}
