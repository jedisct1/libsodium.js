// ---------- input: {var_name} (buf)

{var_name} = _any_to_Uint8Array(address_pool, {var_name}, "{var_name}");
var {var_name}_address, {var_name}_length = ({var_length}) | 0;
if ({var_name}.length !== {var_name}_length) {
    _free_and_throw_type_error(address_pool, "invalid {var_name} length");
}
{var_name}_address = _to_allocated_buf_address({var_name});
address_pool.push({var_name}_address);
