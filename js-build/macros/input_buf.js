// ---------- input: {var_name} (buf)

{var_name} = _inputToUint8Array(toDealloc, {var_name}, "{var_name}");
var {var_name}_address, {var_name}_size = ({var_size}) | 0;
if ({var_name}.length !== {var_name}_size) {
	_throwTypeError(toDealloc, 'invalid {var_name} size');
}
{var_name}_address = _toAllocatedBufAddress({var_name});
toDealloc.push({var_name}_address);
