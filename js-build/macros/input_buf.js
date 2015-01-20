// ---------- input: {var_name} (buf)

{var_name} = inputToUint8Array(toDealloc, {var_name}, "{var_name}");
var {var_name}_byte, {var_name}_size = ({var_size}) | 0;
if ({var_name}.length !== {var_name}_size) {
	throwTypeError(toDealloc, 'invalid {var_name} size');
}
{var_name}_byte = injectBytes({var_name});
toDealloc.push({var_name}_byte);
