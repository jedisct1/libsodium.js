// ---------- output VAR_NAME (buf)

var VAR_NAME_length = (VAR_SIZE) | 0,
    VAR_NAME = new AllocatedBuf(VAR_NAME_length),
    VAR_NAME_address = VAR_NAME.address;

address_pool.push(VAR_NAME_address);
