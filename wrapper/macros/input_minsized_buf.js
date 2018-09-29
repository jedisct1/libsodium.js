// ---------- input: {var_name} (minsized_buf)

{var_name} = _any_to_Uint8Array(address_pool, {var_name}, "{var_name}");
var {var_name}_address, {var_name}_min_length = {var_min_length}, {var_name}_length = {var_name}.length;
if ({var_name}_length < {var_name}_min_length) {
        _free_and_throw_type_error(address_pool, "{var_name} is too short");
}
{var_name}_address = _to_allocated_buf_address({var_name});
address_pool.push({var_name}_address);
