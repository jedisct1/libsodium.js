var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};

(function(root) {
    function addScript(url) {
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
        var wasmXHR = new XMLHttpRequest();
        wasmXHR.open('GET', 'libsodium.wasm', true);
        wasmXHR.responseType = 'arraybuffer';
        wasmXHR.onload = function() {
            root.libsodium_mod = { wasmBinary: wasmXHR.response, commonJsStrict: {} };
            addScript('sodium-wasm.js');
        }
        wasmXHR.send();        
    } else {
        addScript('sodium-asmjs.js');
    }
})(this);
