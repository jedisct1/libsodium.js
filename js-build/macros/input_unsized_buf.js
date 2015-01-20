// ---------- input: {var_name} (unsized_buf)

requireDefined(toDealloc, {var_name}, "{var_name}");

if (typeof {var_name} === 'string') {
    {var_name} = string_to_Uint8Array({var_name});
} else if (!({var_name} instanceof Uint8Array)) {
	throwTypeError(toDealloc, 'Unsupported input type for {var_name}');
}
var {var_name}_byte = injectBytes({var_name}),
    {var_name}_size = {var_name}.length;
toDealloc.push({var_name}_byte);
