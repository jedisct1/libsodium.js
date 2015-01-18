// ---------- input: {var_name} (unsized_buf)

requireDefined(toDealloc, {var_name}, "{var_name}");

var {var_name}_byte, {var_name}_size = {var_name}.length | 0;

if ({var_name} instanceof Uint8Array) {
	{var_name}_byte = injectBytes({var_name});
} else if (typeof {var_name} === 'string') {
	{var_name}_byte = injectBytes(string_to_Uint8Array({var_name}));
} else {
	throwTypeError(toDealloc, 'Unsupported input type for {var_name}');
}
toDealloc.push({var_name}_byte);
