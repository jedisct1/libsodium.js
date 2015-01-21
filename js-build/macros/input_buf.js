// ---------- input: {var_name} (buf)

{var_name} = _input_to_Uint8Array(toDealloc, {var_name}, "{var_name}");
var {var_name}_address, {var_name}_length = ({var_size}) | 0;
if ({var_name}.length !== {var_name}_length) {
	_throw_type_error(toDealloc, 'invalid {var_name} length');
}
{var_name}_address = _to_allocated_buf_address({var_name});
toDealloc.push({var_name}_address);
