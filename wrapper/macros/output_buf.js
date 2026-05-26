// ---------- output {var_name} (buf)

var {var_name}_length = ({var_length}) | 0,
    {var_name} = _malloc_pool_buf(address_pool, {var_name}_length),
    {var_name}_address = {var_name}.address;
