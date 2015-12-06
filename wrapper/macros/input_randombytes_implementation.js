// ---------- input: {var_name} (randombytes_implementation)

var {var_name}_address = libsodium._malloc(6 * 4);
for (var i = 0; i < 6; i++) {
        libsodium.setValue({var_name}_address + i * 4,
            libsodium.Runtime.addFunction({var_name}
            [["implementation_name", "random", "stir", "uniform", "buf", "close"][i]]),
            "i32");
}
