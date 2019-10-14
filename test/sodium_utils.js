const assert = require('assert');
const expect = require('chai').expect;
const test_helper = require('./test_helper');

let sodium;

describe('libsodium compatibility', () => {
    it('crypto_aead_xchacha20poly1305_ietf_*', async() => {
        if (!sodium) sodium = await test_helper.init();
        let plaintext = Buffer.from(
            '4c616469657320616e642047656e746c656d656e206f662074686520636c6173' +
            '73206f66202739393a204966204920636f756c64206f6666657220796f75206f' +
            '6e6c79206f6e652074697020666f7220746865206675747572652c2073756e73' +
            '637265656e20776f756c642062652069742e',
            'hex'
        );
        let assocData = Buffer.from('50515253c0c1c2c3c4c5c6c7', 'hex');
        let nonce = Buffer.from('404142434445464748494a4b4c4d4e4f5051525354555657', 'hex');
        let key = Buffer.from('808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f', 'hex');

        let ciphertext = Buffer.from(
            sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(plaintext, assocData, null, nonce, key)
        );

        let expected = 'bd6d179d3e83d43b9576579493c0e939572a1700252bfaccbed2902c21396cbb' +
            '731c7f1b0b4aa6440bf3a82f4eda7e39ae64c6708c54c216cb96b72e1213b452' +
            '2f8c9ba40db5d945b11b69b982c1bb9e3f3fac2bc369488f76b2383565d3fff9' +
            '21f9664c97637da9768812f615c68b13b52e' +
            'c0875924c1c7987947deafd8780acf49';
        expect(ciphertext.toString('hex')).to.be.equals(expected);

        let decrypted = Buffer.from(
            sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
                null,
                ciphertext,
                assocData,
                nonce,
                key
            )
        );
        expect(decrypted.toString('hex')).to.be.equals(plaintext.toString('hex'));

        let randomKey = Buffer.from(sodium.crypto_aead_xchacha20poly1305_ietf_keygen());
        assert(randomKey instanceof Buffer);

        let ciphertext2 = Buffer.from(
            sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(plaintext, null, null, nonce, randomKey)
        );
        decrypted = Buffer.from(
            sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, ciphertext2, null, nonce, randomKey)
        );
        expect(decrypted.toString('hex')).to.be.equals(plaintext.toString('hex'));
        expect(ciphertext.toString('hex')).to.not.equals(ciphertext2.toString('hex'));
    });

    it('crypto_auth', async() => {
        if (!sodium) sodium = await test_helper.init();
        let key = Buffer.from(sodium.crypto_auth_keygen());
        let message = 'Science, math, technology, engineering, and compassion for others.';
        let mac = Buffer.from(sodium.crypto_auth(message, key));
        assert(sodium.crypto_auth_verify(mac, message, key) === true);
    });

    it('crypto_box', async() => {
        if (!sodium) sodium = await test_helper.init();
        let plaintext = 'Science, math, technology, engineering, and compassion for others.';

        let aliceKeypair = sodium.crypto_box_keypair();
        let aliceSecret = Buffer.from(aliceKeypair.privateKey);
        let alicePublic = Buffer.from(aliceKeypair.publicKey);
        let bobKeypair = sodium.crypto_box_keypair();
        let bobSecret = Buffer.from(bobKeypair.privateKey);
        let bobPublic = Buffer.from(bobKeypair.publicKey);

        let nonce = sodium.randombytes_buf(24);

        let ciphertext = Buffer.from(
            sodium.crypto_box_easy(
                plaintext,
                nonce,
                bobPublic,
                aliceSecret
            )
        );
        let decrypted = Buffer.from(
            sodium.crypto_box_open_easy(
                ciphertext,
                nonce,
                alicePublic,
                bobSecret
            )
        );
        expect(decrypted.toString('hex')).to.be.equals(Buffer.from(plaintext).toString('hex'));
    });

    it('crypto_box_seal', async() => {
        if (!sodium) sodium = await test_helper.init();
        let plaintext = 'Science, math, technology, engineering, and compassion for others.';

        let aliceKeypair = sodium.crypto_box_keypair();
        let aliceSecret = Buffer.from(aliceKeypair.privateKey);
        let alicePublic = Buffer.from(aliceKeypair.publicKey);

        let ciphertext = Buffer.from(
            sodium.crypto_box_seal(plaintext, alicePublic)
        );
        let decrypted = Buffer.from(
            sodium.crypto_box_seal_open(ciphertext, alicePublic, aliceSecret)
        );
        expect(decrypted.toString('hex')).to.be.equals(Buffer.from(plaintext).toString('hex'));
    });

    it('crypto_generichash', async() => {
        let message = 'Science, math, technology, engineering, and compassion for others.';
        let piece1 = message.slice(0, 16);
        let piece2 = message.slice(16);

        let hash1 = Buffer.from(sodium.crypto_generichash(32, message));
        expect(hash1.toString('hex')).to.be.equals('47c1fdbde32b30b9c54dd47cf88ba92d2d05df1265e342c9563ed56aee84ab02');

        let state = sodium.crypto_generichash_init(null, 32);
        sodium.crypto_generichash_update(state, piece1);
        sodium.crypto_generichash_update(state, piece2);
        let hash2 = Buffer.from(sodium.crypto_generichash_final(state, 32));
        expect(hash1.toString('hex')).to.be.equals(hash2.toString('hex'));

        let key = Buffer.from(sodium.crypto_generichash_keygen());
        hash1 = Buffer.from(sodium.crypto_generichash(32, message, key));
        state = sodium.crypto_generichash_init(key, 32);
        sodium.crypto_generichash_update(state, piece1);
        sodium.crypto_generichash_update(state, piece2);
        hash2 = Buffer.from(sodium.crypto_generichash_final(state, 32));
        expect(hash1.toString('hex')).to.be.equals(hash2.toString('hex'));
    });

    it('crypto_kdf', async function() {
        if (!sodium) sodium = await test_helper.init();
        let subkey, expected;
        let key = Buffer.from('808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f', 'hex');
        let context = 'NaClTest';
        subkey = Buffer.from(sodium.crypto_kdf_derive_from_key(32, 1, context, key));
        expected = 'bce6fcf118cac2691bb23975a63dfac02282c1cd5de6ab9febcbb0ec4348181b';
        expect(subkey.toString('hex')).to.be.equals(expected);

        subkey = Buffer.from(sodium.crypto_kdf_derive_from_key(32, 2, context, key));
        expected = '877cf1c1a2da9b900c79464acebc3731ed4ebe326a7951911639821d09dc6dda';
        expect(subkey.toString('hex')).to.be.equals(expected);

        let key2 = Buffer.from(sodium.crypto_kdf_keygen());
        let subkey2 = Buffer.from(sodium.crypto_kdf_derive_from_key(32, 1, context, key2));
        expect(subkey2.toString('hex')).to.not.equals(key2.toString('hex'));
        expect(subkey2.toString('hex')).to.not.equals(subkey.toString('hex'));
    });

    it('crypto_kx', async function() {
        if (!sodium) sodium = await test_helper.init();
        let clientKeys = sodium.crypto_kx_keypair();
        let clientSecret = Buffer.from(clientKeys.privateKey);
        let clientPublic = Buffer.from(clientKeys.publicKey);
        let seed = Buffer.from(
            sodium.crypto_generichash(
                32,
                'Unit test static key seed goes here. Nothing too complicated. No randomness needed, really.'
            )
        );
        let serverKeys = sodium.crypto_kx_seed_keypair(seed);
        let serverSecret = Buffer.from(serverKeys.privateKey);
        let serverPublic = Buffer.from(serverKeys.publicKey);
        let clientRx, clientTx, serverRx, serverTx;

        let clientOut = sodium.crypto_kx_client_session_keys(clientPublic, clientSecret, serverPublic);
        clientRx = Buffer.from(clientOut.sharedRx);
        clientTx = Buffer.from(clientOut.sharedTx);
        let serverOut = sodium.crypto_kx_server_session_keys(serverPublic, serverSecret, clientPublic);
        serverRx = Buffer.from(serverOut.sharedRx);
        serverTx = Buffer.from(serverOut.sharedTx);

        expect(clientRx.toString('hex')).to.be.equals(serverTx.toString('hex'));
        expect(clientTx.toString('hex')).to.be.equals(serverRx.toString('hex'));
    });

    it('crypto_pwhash', async function() {
        this.timeout(0);
        if (!sodium) sodium = await test_helper.init();
        let password = 'correct horse battery staple';
        let salt = Buffer.from('808182838485868788898a8b8c8d8e8f', 'hex');
        let hashed =  Buffer.from(
            sodium.crypto_pwhash(16, password, salt, 2, 65536 << 10, 2)
        );
        expect(hashed.toString('hex')).to.be.equals('720f95400220748a811bca9b8cff5d6e');
    });

    it('crypto_pwhash_str', async function() {
        this.timeout(0);
        if (!sodium) sodium = await test_helper.init();
        let password = 'correct horse battery staple';
        let hashed = sodium.crypto_pwhash_str(
            password,
            2,
            65536 << 10
        );
        assert(hashed);
        assert(sodium.crypto_pwhash_str_verify(hashed, password));
        assert(sodium.crypto_pwhash_str_verify(hashed, 'incorrect password') === false);
    });

    it('crypto_scalarmult', async() => {
        let aliceKeypair = sodium.crypto_box_keypair();
        let aliceSecret = Buffer.from(aliceKeypair.privateKey);
        let alicePublic = Buffer.from(aliceKeypair.publicKey);

        // crypto_scalarmult_base test:
        let testPublic = Buffer.from(sodium.crypto_scalarmult_base(aliceSecret));
        expect(testPublic.toString('hex')).to.be.equals(alicePublic.toString('hex'));

        // crypto_scalarmult test:
        let bobKeypair = sodium.crypto_box_keypair();
        let bobSecret = Buffer.from(bobKeypair.privateKey);
        let bobPublic = Buffer.from(bobKeypair.publicKey);

        expect(alicePublic.toString('hex')).to.be.equals(alicePublic.toString('hex'));

        let ab = Buffer.from(sodium.crypto_scalarmult(aliceSecret, bobPublic));
        expect(ab.toString('hex')).to.not.equals('0000000000000000000000000000000000000000000000000000000000000000');
        let ba = Buffer.from(sodium.crypto_scalarmult(bobSecret, alicePublic));
        expect(ba.toString('hex')).to.not.equals('0000000000000000000000000000000000000000000000000000000000000000');
        expect(ab.toString('hex')).to.be.equals(ba.toString('hex'));
    });

    it('crypto_secretbox', async() => {
        if (!sodium) sodium = await test_helper.init();
        let plaintext = 'Science, math, technology, engineering, and compassion for others.';

        let key = Buffer.from(sodium.crypto_secretbox_keygen());
        let nonce = Buffer.from(sodium.randombytes_buf(24));

        let ciphertext = Buffer.from(sodium.crypto_secretbox_easy(plaintext, nonce, key));
        let decrypted = Buffer.from(sodium.crypto_secretbox_open_easy(ciphertext, nonce, key));
        expect(decrypted.toString('hex')).to.be.equals(Buffer.from(plaintext).toString('hex'));
    });

    it('crypto_shorthash', async() => {
        if (!sodium) sodium = await test_helper.init();
        let key = Buffer.from('808182838485868788898a8b8c8d8e8f', 'hex');
        let message;
        let hash;

        message = 'This is short input0';
        hash = Buffer.from(sodium.crypto_shorthash(message, key));
        expect(hash.toString('hex')).to.be.equals('ef589fb9ef4196b3');

        message = 'This is short input1';
        hash = Buffer.from(sodium.crypto_shorthash(message, key));
        expect(hash.toString('hex')).to.be.equals('5e8f01039bc53eb7');
    });

    it('crypto_sign', async() => {
        if (!sodium) sodium = await test_helper.init();
        let aliceKeypair = sodium.crypto_sign_keypair();
        let aliceSecret = Buffer.from(aliceKeypair.privateKey);
        let alicePublic = Buffer.from(aliceKeypair.publicKey);

        let plaintext = 'Science, math, technology, engineering, and compassion for others.';
        let signed = Buffer.from(sodium.crypto_sign(plaintext, aliceSecret));
        let opened = Buffer.from(sodium.crypto_sign_open(signed, alicePublic));
        expect(signed.slice(64).toString('hex')).to.be.equals(opened.toString('hex'));
        expect(opened.toString()).to.be.equals(plaintext);

        let signature = Buffer.from(sodium.crypto_sign_detached(plaintext, aliceSecret));
        let valid = sodium.crypto_sign_verify_detached(signature, plaintext, alicePublic);
        expect(valid).to.be.equals(true);
        let invalid = sodium.crypto_sign_verify_detached(signature, plaintext + ' extra', alicePublic);
        expect(invalid).to.be.equals(false);
    });

    it('crypto_sign_ed25519_to_curve25519', async function () {
        this.timeout(0);
        if (!sodium) sodium = await test_helper.init();

        let aliceKeypair = Buffer.from(
            '411a2c2227d2a799ebae0ed94417d8e8ed1ca9b0a9d5f4cd743cc52d961e94e2' +
            'da49154c9e700b754199df7974e9fa4ee4b6ebbc71f89d8d8938335ea4a1409d' +
            'da49154c9e700b754199df7974e9fa4ee4b6ebbc71f89d8d8938335ea4a1409d', 'hex');
        let aliceSecret = Buffer.from(aliceKeypair.slice(0, 64));
        let alicePublic = Buffer.from(aliceKeypair.slice(64, 96));

        let ecdhSecret = Buffer.from(sodium.crypto_sign_ed25519_sk_to_curve25519(aliceSecret));
        expect(ecdhSecret.toString('hex')).to.be
            .equals('60c783b8d1674b7081b72a105b55872502825d4ec638028152e085b54705ad7e');
        let ecdhPublic = Buffer.from(sodium.crypto_sign_ed25519_pk_to_curve25519(alicePublic));
        expect(ecdhPublic.toString('hex')).to.be
            .equals('5a791d07cfb39060c8e9b641b6a915a3126cd14ddc243a9928c490c8e1f59e7c');
    });

    it('randombytes_buf', async() => {
        if (!sodium) sodium = await test_helper.init();
        let a, b;
        for (let i = 0; i < 100; i++) {
            a = sodium.randombytes_buf(64);
            b = sodium.randombytes_buf(64);
            expect(a.toString('hex')).to.not.equals(b.toString('hex'));
        }
    });

    it('randombytes_uniform', async() => {
        if (!sodium) sodium = await test_helper.init();
        let a, b;
        for (let i = 0; i < 100; i++) {
            a = sodium.randombytes_uniform(0x3fffffff);
            b = sodium.randombytes_uniform(0x3fffffff);
            expect(a).to.not.equals(b);
        }
    });

    it('sodium_compare', async() => {
        if (!sodium) sodium = await test_helper.init();
        let a = Buffer.from('80808080', 'hex');
        let b = Buffer.from('81808080', 'hex');
        let c = Buffer.from('80808081', 'hex');

        expect(sodium.compare(a, a)).to.be.equals(0);
        expect(sodium.compare(b, b)).to.be.equals(0);
        expect(sodium.compare(c, c)).to.be.equals(0);
        expect(sodium.compare(a, b)).to.be.below(0);
        expect(sodium.compare(b, a)).to.be.above(0);
        expect(sodium.compare(a, c)).to.be.below(0);
        expect(sodium.compare(c, a)).to.be.above(0);
        expect(sodium.compare(b, c)).to.be.below(0);
        expect(sodium.compare(c, b)).to.be.above(0);
    });

    it('sodium_increment', async() => {
        if (!sodium) sodium = await test_helper.init();
        let a = Buffer.from('80808080', 'hex');
        let b = Buffer.from('81808080', 'hex');
        sodium.increment(a);
        expect(sodium.compare(b, a)).to.be.equals(0);

        a = Buffer.from('ffffffff', 'hex');
        b = Buffer.from('00000000', 'hex');
        sodium.increment(a);
        expect(sodium.compare(b, a)).to.be.equals(0);
    });
    it('sodium_is_zero', async() => {
        if (!sodium) sodium = await test_helper.init();
        let buf;
        buf = Buffer.from('00', 'hex');
        expect(sodium.is_zero(buf, 1)).to.be.equals(true);
        buf = Buffer.from('01', 'hex');
        expect(sodium.is_zero(buf, 1)).to.be.equals(false);
    });

    it('sodium_memcmp', async() => {
        if (!sodium) sodium = await test_helper.init();
        let a, b, c;
        a = Buffer.from(sodium.randombytes_buf(32));
        b = Buffer.from(sodium.randombytes_buf(32));
        c = Buffer.alloc(32);
        b.copy(c, 0, 0, 32);

        expect(sodium.memcmp(a, b)).to.be.equals(false);
        expect(sodium.memcmp(a, c)).to.be.equals(false);
        expect(sodium.memcmp(b, c)).to.be.equals(true);
        expect(sodium.memcmp(c, b)).to.be.equals(true);
    });

    it('sodium_memzero', async() => {
        if (!sodium) sodium = await test_helper.init();
        let buf = Buffer.from(sodium.randombytes_buf(16));
        expect(buf.toString('hex')).to.not.equals('00000000000000000000000000000000');
        sodium.memzero(buf);
        expect(buf.toString('hex')).to.be.equals('00000000000000000000000000000000');
    });

    it('sodium_pad', async() => {
        if (!sodium) sodium = await test_helper.init();
        let buf, size, padded, unpadded;
        for (let i = 0; i < 100; i++) {
            buf = Buffer.from(sodium.randombytes_buf(
                sodium.randombytes_uniform(96) + 16
            ));
            size = sodium.randombytes_uniform(96) + 5;
            padded = Buffer.from(sodium.pad(buf, size));
            unpadded = Buffer.from(sodium.unpad(padded, size));
            expect(unpadded.toString('hex')).to.be.equals(buf.toString('hex'));
        }
    });

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
        let subkey = sodium.crypto_kdf_derive_from_key(32, 1, 'NaClTest', key);
        expect(Buffer.from(subkey).toString('hex'))
            .to.be.equals('bce6fcf118cac2691bb23975a63dfac02282c1cd5de6ab9febcbb0ec4348181b');
    });
});
