// ---------- output

var {var_name}_size = ({var_size}) | 0,
    {var_name} = new TargetBuf({var_name}_size),
    {var_name}_byte = {var_name}.address;

toDealloc.push({var_name}_byte);
