const _sodium = require('../dist/modules/libsodium-wrappers');

module.exports = class SodiumHelper {
    static async init() {
        await _sodium.ready;
        return _sodium;
    }
};
