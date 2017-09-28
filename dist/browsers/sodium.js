var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};

(function(root) {
    function addScript(url) {
        if (typeof root.libsodium === 'object') {
            return;
        }
        var node = document.createElement('script');
        node.async = 'async';
        node.type = 'text/javascript';
        node.src = url;
        document.head.appendChild(node);
    }
    
    var useWasm = false;
    try { new WebAssembly.Module(new Uint8Array(262144)) } catch (err) {
        if (err.name === 'CompileError') { useWasm = true }
    }
    if (useWasm) {
        fetch('libsodium.wasm').then(function(bytes) { return bytes.arrayBuffer() }).
            then(function(bytes) {
                root.libsodium_mod = { wasmBinary: bytes, commonJsStrict: {} };
                addScript('sodium-wasm.js');                
            });
    } else {
        addScript('sodium-asmjs.js');
    }
})(this);
