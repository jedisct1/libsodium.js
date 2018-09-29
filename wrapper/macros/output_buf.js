// ---------- output {var_name} (buf)

var {var_name}_length = ({var_length}) | 0,
    {var_name} = new AllocatedBuf({var_name}_length),
    {var_name}_address = {var_name}.address;

address_pool.push({var_name}_address);
