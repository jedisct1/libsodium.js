export interface SymbolInput {
	name: string;
	type: string;
	length?: string;
	min_length?: string;
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

export function isFunctionSymbol(
	symbol: LibsodiumSymbol,
): symbol is FunctionSymbol {
	return symbol.type === "function";
}
