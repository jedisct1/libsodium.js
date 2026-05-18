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
	assert_retval?: AssertRetval[];
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
	return { valid: true };
}
