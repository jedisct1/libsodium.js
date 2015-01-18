// ---------- input: {var_name} (unsized_buf)

var {var_name}_byte, {var_name}_size = {var_name}.length;

if ({var_name} == undefined) {
	free_all(toDealloc);
    throw new Error('{var_name} cannot be null or undefined');
}
if ({var_name} instanceof Uint8Array) {
	{var_name}_byte = injectBytes({var_name});
	toDealloc.push({var_name}_byte);
} else if (typeof {var_name} === 'string') {
	{var_name}_byte = injectBytes(string_to_Uint8Array({var_name}));
	toDealloc.push({var_name}_byte);
} else {
	free_all(toDealloc);
	throw new TypeError('Unsupported input type for {var_name}');
}
