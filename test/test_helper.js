const path = `../${process.env.NODE_PATH}libsodium-wrappers`;
const _sodium = require(path);

module.exports = class SodiumHelper {
    static async init() {
        await _sodium.ready;
        return _sodium;
    }
};
