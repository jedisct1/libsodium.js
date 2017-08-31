// ---------- input: {var_name} (uint)

_require_defined(address_pool, {var_name}, "{var_name}");

if (!(typeof {var_name} === "number" && ({var_name} | 0) === {var_name}) || {var_name} < 0) {
        _free_and_throw_type_error(address_pool, "{var_name} must be an unsigned integer");
}
