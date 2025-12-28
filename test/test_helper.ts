// For local testing, we use the browser bundle which is self-contained
// (doesn't depend on external libsodium package)
let _sodium;

try {
  _sodium = require('../dist/browsers-sumo/sodium');
} catch (e) {
  _sodium = require('../dist/browsers/sodium');
}

module.exports = class SodiumHelper {
  static async init() {
    await _sodium.ready;
    return _sodium;
  }
};
