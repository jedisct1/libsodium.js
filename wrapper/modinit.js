var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};

(function(root) {
    var wasmXHR = new XMLHttpRequest();
    wasmXHR.open('GET', 'libsodium.wasm', true);
    wasmXHR.responseType = 'arraybuffer';
    wasmXHR.onload = function() {
        Module.wasmBinary = wasmXHR.response;
        root.libsodium = expose_libsodium(root, Module);
        root.sodium = expose_wrappers(root, {});
    }
    wasmXHR.send();
})(this);
