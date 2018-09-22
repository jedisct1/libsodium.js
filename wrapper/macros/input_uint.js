// ---------- input: VAR_NAME (uint)

_require_defined(address_pool, VAR_NAME, "VAR_NAME");

if (!(typeof VAR_NAME === "number" && (VAR_NAME | 0) === VAR_NAME) || VAR_NAME < 0) {
        _free_and_throw_type_error(address_pool, "VAR_NAME must be an unsigned integer");
}
