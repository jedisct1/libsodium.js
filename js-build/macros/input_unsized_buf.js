// ---------- input: {var_name} (unsized_buf)

{var_name} = _inputToUint8Array(toDealloc, {var_name}, "{var_name}");
var {var_name}_byte = _toTargetBufAddress({var_name}),
    {var_name}_size = {var_name}.length;
toDealloc.push({var_name}_byte);
