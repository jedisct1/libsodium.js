// ---------- input: {var_name} (ranged_uint)

_require_defined(address_pool, {var_name}, "{var_name}");

if (!(typeof {var_name} === "number" && ({var_name} | 0) === {var_name}) || {var_name} < 0) {
        _free_and_throw_type_error(address_pool, "{var_name} must be an unsigned integer");
}

var _{var_name}_min_value = {var_min_value}, _{var_name}_max_value = {var_max_value};
if ({var_name} < _{var_name}_min_value || {var_name} > _{var_name}_max_value) {
        _free_and_throw_type_error(address_pool, "{var_name} must be >= " + _{var_name}_min_value + " and <= " + _{var_name}_max_value);
}
