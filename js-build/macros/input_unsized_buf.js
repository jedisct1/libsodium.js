// ---------- input: {var_name} (unsized_buf)

{var_name} = inputToUint8Array(toDealloc, {var_name}, "{var_name}");
var {var_name}_byte = injectBytes({var_name}),
    {var_name}_size = {var_name}.length;
toDealloc.push({var_name}_byte);
