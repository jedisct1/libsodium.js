
var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};
(function(root) {
  var cb = root.sodium && root.sodium.onload;
  var wasmXHR = new XMLHttpRequest();
    wasmXHR.open('GET', 'libsodium.wasm', true);
    wasmXHR.responseType = 'arraybuffer';
    wasmXHR.onload = function() {
        Module.wasmBinary = wasmXHR.response;
        cb(root.sodium)
    }
})(window);
