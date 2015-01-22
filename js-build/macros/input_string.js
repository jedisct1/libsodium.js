// ---------- input: {var_name} (string)

{var_name} = from_string({var_name} + "\0");
var {var_name}_address = _to_allocated_buf_address({var_name}),
    {var_name}_length = {var_name}.length - 1;
address_pool.push({var_name}_address);
