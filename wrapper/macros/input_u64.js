// ---------- input: {var_name} (u64)

_require_defined(address_pool, {var_name}, "{var_name}");
var {var_name}_hi = 0, {var_name}_lo;
if (typeof {var_name} === "bigint" && {var_name} >= BigInt(0)) {
        const hi = {var_name} >> BigInt(32);
        if (hi > BigInt(4294967295)) {
                _free_and_throw_type_error(address_pool, "{var_name} cannot be more than 64 bits");
        }        
        {var_name}_hi = Number(hi);
        {var_name}_lo = Number({var_name} & BigInt(4294967295));
} else if (typeof {var_name} === "number" && ({var_name} | 0) === {var_name} && {var_name} >= 0) {
        {var_name}_lo = {var_name}
} else {
        _free_and_throw_type_error(address_pool, "{var_name} must be an unsigned integer or bigint");
}
