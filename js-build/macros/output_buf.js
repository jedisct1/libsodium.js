// ---------- output (buf)

var {var_name}_length = ({var_size}) | 0,
    {var_name} = new AllocatedBuf({var_name}_length),
    {var_name}_address = {var_name}.address;

toDealloc.push({var_name}_address);
