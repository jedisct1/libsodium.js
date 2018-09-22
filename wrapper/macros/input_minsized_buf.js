// ---------- input: VAR_NAME (minsize_buf)

VAR_NAME = _any_to_Uint8Array(address_pool, VAR_NAME, "VAR_NAME");
var VAR_NAME_address, VAR_NAME_length = (VAR_SIZE) | 0;
if (VAR_NAME.length < VAR_NAME_length) {
        _free_and_throw_type_error(address_pool, "VAR_NAME is too short");
}
VAR_NAME_address = _to_allocated_buf_address(VAR_NAME);
address_pool.push(VAR_NAME_address);
