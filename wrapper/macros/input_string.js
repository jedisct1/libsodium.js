// ---------- input: {var_name} (string)

if (typeof {var_name} !== "string") {
    _free_and_throw_type_error(address_pool, "{var_name} must be a string");
}
{var_name} = from_string({var_name} + "\0");
if ({var_name}_length != undefined && {var_name}.length - 1 !== {var_name}_length) {
    _free_and_throw_type_error(address_pool, "invalid {var_name} length");
}
var {var_name}_address = _to_allocated_buf_address({var_name}),
    {var_name}_length = {var_name}.length - 1;
address_pool.push({var_name}_address);
