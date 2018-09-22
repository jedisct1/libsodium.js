// ---------- input: VAR_NAME (unsized_buf_optional)

var VAR_NAME_address = null, VAR_NAME_length = 0;
if (VAR_NAME != undefined) {
        VAR_NAME = _any_to_Uint8Array(address_pool, VAR_NAME, "VAR_NAME");
        VAR_NAME_address = _to_allocated_buf_address(VAR_NAME);
        VAR_NAME_length = VAR_NAME.length;
        address_pool.push(VAR_NAME_address);
}
