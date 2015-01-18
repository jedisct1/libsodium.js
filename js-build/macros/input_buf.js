// ---------- input: {var_name} (buf)

var {var_name}_byte, {var_name}_size = {var_size};

if (typeof {var_name} == undefined) {
	free_all(toDealloc);
	throw new Error('{var_name} cannot be null or undefined');
}
if ({var_name} instanceof Uint8Array) {
	if ({var_name}.length != {var_size}) {
		free_all(toDealloc);
		throw new TypeError('invalid {var_name} size');
    }
	{var_name}_byte = injectBytes({var_name});
	toDealloc.push({var_name}_byte);
} else if (typeof {var_name} === 'string') {
	if (encode_utf8({var_name}).length !== {var_size}) {
		free_all(toDealloc);
		throw new TypeError('invalid {var_name} size');
    }
    {var_name}_byte = injectBytes(string_to_Uint8Array({var_name}));
	toDealloc.push({var_name}_byte);
} else {
	free_all(toDealloc);
	throw new TypeError('Unsupported input type for {var_name}');
}
