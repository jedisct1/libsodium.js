// ESM polyfills for Node.js compatibility
// __dirname and __filename are not available in ESM, so we polyfill them for Node.js
var __filename, __dirname;
try {
  // Only works in Node.js ESM - browsers will skip this
  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    var url = await import('url');
    var path = await import('path');
    __filename = url.fileURLToPath(import.meta.url);
    __dirname = path.dirname(__filename);
  }
} catch (e) {
  // In browser environments, these are not needed
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
