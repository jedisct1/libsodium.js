// ---------- input: {var_name} (buf)

requireDefined(toDealloc, {var_name}, "{var_name}");

var {var_name}_byte, {var_name}_size = ({var_size}) | 0;

if (typeof {var_name} === 'string') {
	{var_name} = string_to_Uint8Array({var_name});
} else if (!({var_name} instanceof Uint8Array)) {
	throwTypeError(toDealloc, 'unsupported input type for {var_name}');
}
if ({var_name}.length !== {var_name}_size) {
	throwTypeError(toDealloc, 'invalid {var_name} size');
}
{var_name}_byte = injectBytes({var_name});
toDealloc.push({var_name}_byte);
