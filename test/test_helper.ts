let _sodium;

try {
  _sodium = require('../dist/modules-sumo/libsodium-wrappers');
} catch (e) {
  _sodium = require('../dist/modules/libsodium-wrappers');
}

module.exports = class SodiumHelper {
  static async init() {
    await _sodium.ready;
    return _sodium;
  }
};
