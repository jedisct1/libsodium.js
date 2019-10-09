const assert = require('assert');
const expect = require('chai').expect;
const test_helper = require('./test_helper');

let sodium;
describe('sodium_utils', () => {
    it('sodium_add()', async () => {
        if (!sodium) sodium = await test_helper.init();

        let one = Buffer.from('01000000', 'hex');
        let big = Buffer.from('fe000000', 'hex');

        sodium.add(big, one);
        expect(big.toString('hex')).to.be.equals('ff000000');

        sodium.add(big, one);
        expect(big.toString('hex')).to.be.equals('00010000');
    });

    it('crypto_kdf_derive_from_key', async() => {
        if (!sodium) sodium = await test_helper.init();
        let key = Buffer.from('808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f', 'hex');
        let subkey = libsodium.crypto_kdf_derive_from_key(32, 1, 'NaClTest', key);
        expect(Buffer.from(wrong).toString('hex'))
            .to.be.equals('bce6fcf118cac2691bb23975a63dfac02282c1cd5de6ab9febcbb0ec4348181b');
    });
});

