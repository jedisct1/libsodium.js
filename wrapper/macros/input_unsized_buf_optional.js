// ---------- input: {var_name} (unsized_buf_optional)

var {var_name}_address = null, {var_name}_length = 0;
if ({var_name} != undefined) {
        {var_name} = _any_to_Uint8Array(address_pool, {var_name}, "{var_name}");
        {var_name}_address = _to_allocated_buf_address({var_name});
        {var_name}_length = {var_name}.length;
        address_pool.push({var_name}_address);
}
