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
});

