// ---------- input: VAR_NAME (unsized_buf)

VAR_NAME = _any_to_Uint8Array(address_pool, VAR_NAME, "VAR_NAME");
var VAR_NAME_address = _to_allocated_buf_address(VAR_NAME),
    VAR_NAME_length = VAR_NAME.length;
address_pool.push(VAR_NAME_address);
