// ---------- input: {var_name} (unsized_buf)

{var_name} = _input_to_Uint8Array(toDealloc, {var_name}, "{var_name}");
var {var_name}_address = _to_allocated_buf_address({var_name}),
    {var_name}_length = {var_name}.length;
toDealloc.push({var_name}_address);
