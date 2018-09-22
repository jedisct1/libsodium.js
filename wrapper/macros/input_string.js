// ---------- input: VAR_NAME (string)

VAR_NAME = from_string(VAR_NAME + "\0");
var VAR_NAME_address = _to_allocated_buf_address(VAR_NAME),
    VAR_NAME_length = VAR_NAME.length - 1;
address_pool.push(VAR_NAME_address);
