// ---------- input: {var_name} (buf)

requireDefined(toDealloc, {var_name}, "{var_name}");

var {var_name}_byte, {var_name}_size = ({var_size}) | 0;

if ({var_name} instanceof Uint8Array) {
	if ({var_name}.length !== {var_name}_size) {
		throwTypeError(toDealloc, 'invalid {var_name} size');
    }
	{var_name}_byte = injectBytes({var_name});
	toDealloc.push({var_name}_byte);
} else if (typeof {var_name} === 'string') {
	if (encode_utf8({var_name}).length !== {var_name}_size) {
		throwTypeError(toDealloc, 'invalid {var_name} size');
    }
    {var_name}_byte = injectBytes(string_to_Uint8Array({var_name}));
	toDealloc.push({var_name}_byte);
} else {
	throwTypeError(toDealloc, 'Unsupported input type for {var_name}');
}
