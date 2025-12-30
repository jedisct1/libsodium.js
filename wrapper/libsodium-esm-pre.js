// ESM polyfills for Node.js compatibility
// __dirname and __filename are not available in ESM, so we polyfill them for Node.js
// Using the standard URL API which is available globally in both Node.js and browsers - no imports needed
var __filename, __dirname;
if (typeof import.meta !== 'undefined' && import.meta.url) {
  const url = new URL(import.meta.url)
  __filename = url.pathname;
  __dirname = new URL('.', url).pathname;
}

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
