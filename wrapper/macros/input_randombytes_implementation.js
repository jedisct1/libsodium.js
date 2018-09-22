// ---------- input: VAR_NAME (randombytes_implementation)

var VAR_NAME_address = libsodium._malloc(6 * 4);
for (var i = 0; i < 6; i++) {
        libsodium.setValue(VAR_NAME_address + i * 4,
            libsodium.Runtime.addFunction(VAR_NAME
            [["implementation_name", "random", "stir", "uniform", "buf", "close"][i]]),
            "i32");
}
