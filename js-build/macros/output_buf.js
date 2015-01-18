// ---------- output

var {var_name} = new TargetBuffer({var_size}),
    {var_name}_byte = {var_name}.address,
    {var_name}_size = {var_size};

toDealloc.push({var_name}_byte);
