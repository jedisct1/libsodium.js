// ESM polyfills: __dirname and __filename are not available in ESM
// Since WASM is inlined (SINGLE_FILE=1), scriptDirectory isn't used for loading
// We just need to prevent errors when emscripten sets scriptDirectory=__dirname+"/"
var __filename = "", __dirname = "";

var Module = {};

// Set up getRandomValue for ESM environments (browsers and Node.js 19+)
// This must be done before the WASM module initializes
(function() {
  try {
    // Try globalThis.crypto first (works in browsers and Node.js 19+)
    var crypto_ = globalThis.crypto;
    if (crypto_ && typeof crypto_.getRandomValues === 'function') {
      Module.getRandomValue = function() {
        var buf = new Uint32Array(1);
        crypto_.getRandomValues(buf);
        return buf[0] >>> 0;
      };
      return;
    }
  } catch (e) {}

  try {
    // Fallback for older browsers: window.crypto or self.crypto
    var window_ = typeof window !== 'undefined' ? window : self;
    var crypto_ = window_.crypto || window_.msCrypto;
    if (crypto_ && typeof crypto_.getRandomValues === 'function') {
      Module.getRandomValue = function() {
        var buf = new Uint32Array(1);
        crypto_.getRandomValues(buf);
        return buf[0] >>> 0;
      };
      return;
    }
  } catch (e) {}

  // No crypto available - will fail at runtime if random bytes are needed
})();
