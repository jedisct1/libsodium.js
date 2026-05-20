export interface SymbolInput {
	name: string;
	type: string;
	length?: string;
	min_length?: string;
	min_value?: string;
	max_value?: string;
	size?: string;
}

export interface SymbolOutput {
	name: string;
	type: string;
	length?: string;
	min_length?: string;
	size?: string;
}

export interface AssertRetval {
	condition: string;
	or_else_throw: string;
}

export interface FunctionSymbol {
	name: string;
	type: "function";
	inputs?: SymbolInput[];
	outputs?: SymbolOutput[];
	target?: string;
	return?: string;
	noOutputFormat?: boolean;
	assert_retval?: [AssertRetval];
}

export interface ConstantSymbol {
	name: string;
	type: "constant";
}

export type LibsodiumSymbol = FunctionSymbol | ConstantSymbol;

export interface Constant {
	name: string;
	type: "uint" | "string";
}

export const FUNCTION_SYMBOL_KEYS = new Set<string>([
	"name",
	"type",
	"inputs",
	"outputs",
	"target",
	"return",
	"noOutputFormat",
	"assert_retval",
]);

export function checkFunctionSymbol(
	symbol: LibsodiumSymbol,
): { valid: true } | { valid: false; error: string } {
	if (symbol.type !== "function") {
		return { valid: false, error: "not a function" };
	}
	for (const key of Object.keys(symbol)) {
		if (!FUNCTION_SYMBOL_KEYS.has(key)) {
			return { valid: false, error: `invalid symbol: ${key}` };
		}
	}

	const assertRetval = symbol.assert_retval;
	if (assertRetval !== undefined) {
		if (!Array.isArray(assertRetval)) {
			return { valid: false, error: "assert_retval must be an array" };
		}
		if (assertRetval.length !== 1) {
			return {
				valid: false,
				error: "assert_retval must contain exactly one entry",
			};
		}

		const [assert] = assertRetval as unknown[];
		if (typeof assert !== "object" || assert === null) {
			return { valid: false, error: "assert_retval entry must be an object" };
		}

		const assertObj = assert as Record<string, unknown>;
		if (typeof assertObj.condition !== "string") {
			return {
				valid: false,
				error: "assert_retval entry condition must be a string",
			};
		}
		if (typeof assertObj.or_else_throw !== "string") {
			return {
				valid: false,
				error: "assert_retval entry or_else_throw must be a string",
			};
		}
	}

	return { valid: true };
}
