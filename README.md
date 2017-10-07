# libsodium.js

## Overview

The [sodium](https://github.com/jedisct1/libsodium) crypto library
compiled to WebAssembly and pure Javascript using
[Emscripten](https://github.com/kripken/emscripten), with
automatically generated wrappers to make it easy to use in web
applications.

The complete library weights 188 Kb (minified, gzipped, includes pure js +
webassembly versions) and can run in a web browser as well as server-side.

### Compatibility

Supported browsers/JS engines:

* Chrome >= 16
* Edge >= 0.11
* Firefox >= 21
* Mobile Safari on iOS >= 8.0 (older versions produce incorrect results)
* NodeJS
* Opera >= 15
* Safari >= 6 (older versions produce incorrect results)

## Installation

???

### Usage (as a module)

Load the `sodium-wrappers` module. The returned object contains a `.ready`
property: a promise that must be resolve before the sodium functions
can be used.

Example:

```js
const _sodium = require('libsodium-wrappers');
(async() => {
  await _sodium.ready;
  const sodium = _sodium;

  let key = sodium.crypto_secretstream_xchacha20poly1305_keygen();

  let res = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
  let [state_out, header] = [res.state, res.header];
  let c1 = sodium.crypto_secretstream_xchacha20poly1305_push(state_out,
    sodium.from_string('message 1'), null,
    sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE);
  let c2 = sodium.crypto_secretstream_xchacha20poly1305_push(state_out,
    sodium.from_string('message 2'), null,
    sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL);

  let state_in = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, key);
  let r1 = sodium.crypto_secretstream_xchacha20poly1305_pull(state_in, c1);
  let [m1, tag1] = [sodium.to_string(r1.message), r1.tag];
  let r2 = sodium.crypto_secretstream_xchacha20poly1305_pull(state_in, c2);
  let [m2, tag2] = [sodium.to_string(r2.message), r2.tag];

  console.log(m1);
  console.log(m2);
})();
```

### Usage (in a web browser, via a callback)

The `sodium.js` file includes both the core libsodium functions, as
well as the higher-level Javascript wrappers. It can be loaded
asynchronusly.

A `sodium` object should be defined in the global namespace, with the
following properties:

- `onload`: the function to call after the wrapper is initialized.
- `totalMemory` (optional): the maximum amount of memory that sodium can use.
The default value should be fine for most applications, unless you
need to use password hashing functions with a large amount of memory.

Example:

```html
<script>
    window.sodium = {
        onload: function (sodium) {
            let h = sodium.crypto_generichash(64, sodium.from_string('test'));
            console.log(sodium.to_hex(h));
        }
    };
</script>
<script src="sodium.js" async></script>
```

## List of wrapped APIs:

* [`crypto_aead`](https://download.libsodium.org/doc/secret-key_cryptography/aead.html)
* [`crypto_auth`](https://download.libsodium.org/doc/secret-key_cryptography/secret-key_authentication.html)
* [`crypto_box`](https://doc.libsodium.org/public-key_cryptography/authenticated_encryption.html)
* [`crypto_box_seal`](https://download.libsodium.org/libsodium/content/public-key_cryptography/sealed_boxes.html)
* [`crypto_generichash`](https://download.libsodium.org/libsodium/content/hashing/generic_hashing.html)
* [`crypto_hash`](https://download.libsodium.org/libsodium/content/advanced/sha-2_hash_function.html)
* [`crypto_kdf`](https://download.libsodium.org/doc/key_derivation/)
* [`crypto_kx`](https://download.libsodium.org/doc/key_exchange/)
* [`crypto_onetimeauth`](https://download.libsodium.org/doc/advanced/poly1305.html)
* [`crypto_pwhash`](https://download.libsodium.org/libsodium/content/password_hashing/)
* [`crypto_scalarmult`](https://download.libsodium.org/libsodium/content/advanced/scalar_multiplication.html)
* [`crypto_secretbox`](https://download.libsodium.org/libsodium/content/secret-key_cryptography/authenticated_encryption.html)
* [`crypto_secretstream`](https://download.libsodium.org/doc/secret-key_cryptography/secretstream.html)
* [`crypto_shorthash`](https://download.libsodium.org/libsodium/content/hashing/short-input_hashing.html)
* [`crypto_sign`](https://download.libsodium.org/libsodium/content/public-key_cryptography/public-key_signatures.html)
* [`crypto_stream`](https://download.libsodium.org/doc/advanced/stream_ciphers.html)
* [Ed25519->Curve25519 conversion](https://download.libsodium.org/libsodium/content/advanced/ed25519-curve25519.html)
* [`randombytes`](https://download.libsodium.org/libsodium/content/generating_random_data/)

## Additional helpers

* `from_base64()`, `to_base64()` with an optional second parameter
whose value is one of: `base64_variants.ORIGINAL`, `base64_variants.ORIGINAL_NO_PADDING`,
`base64_variants.URLSAFE` or `s.base64_variants.URLSAFE_NO_PADDING`. Default is `base64_variants.URLSAFE_NO_PADDING`.
* `from_hex()`, `to_hex()`
* `from_string()`, `to_string()`
* `pad(<buffer>, <block size>)`, `unpad(<buffer>, <block size>)`
* `memcmp()` (constant-time check for equality, returns `true` or `false`)
* `compare() (constant-time comparison. Values must have the same
size. Returns `-1`, `0` or `1`)
* `memzero()` (applies to `Uint8Array` objects)
* `increment()` (increments an arbitrary-long number stored as a
little-endian `Uint8Array` - typically to increment nonces)
* `add()` (adds two arbitrary-long numbers stored as little-endian
`Uint8Array` vectors)
* `is_zero()` (constant-time, checks `Uint8Array` objects for all zeros)

## API

The API exposed by the wrappers is identical to the one of the C
library, except that buffer lengths never need to be explicitly given.

Binary input buffers should be `Uint8Array` objects. However, if a string
is given instead, the wrappers will automatically convert the string
to an array containing a UTF-8 representation of the string.

Example:
```javascript
var key = sodium.randombytes_buf(sodium.crypto_shorthash_KEYBYTES),
    hash1 = sodium.crypto_shorthash(new Uint8Array([1, 2, 3, 4]), key),
    hash2 = sodium.crypto_shorthash('test', key);
```

If the output is a unique binary buffer, it is returned as a
`Uint8Array` object.

However, an extra parameter can be given to all wrapped functions, in
order to specify what format the output should be in. Valid options
are `uint8array' (default), 'text', 'base64' and 'hex'.

Example (shorthash):

```javascript
var key = sodium.randombytes_buf(sodium.crypto_shorthash_KEYBYTES),
    hash_hex = sodium.crypto_shorthash('test', key, 'hex');
```

Example (secretbox):

```javascript
// Load your secret key from a safe place and reuse it across multiple
// secretbox calls. (Obviously don't use this example key for anything
// real.)
//
var secret = Buffer.from('724b092810ec86d7e35c9d067702b31ef90bc43a7b598626749914d6a3e033ed', 'hex');

// Given a message as a string, return a Buffer containing the
// nonce (in the first 24 bytes) and the encrypted content.
var encrypt = function(message) {
    // You must use a different nonce for each message you encrypt.
    var nonce = Buffer.from(sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES));
    var buf = Buffer.from(message);
    return Buffer.concat([nonce, Buffer.from(sodium.crypto_secretbox_easy(buf, nonce, secret))]);
},

// Decrypt takes a Buffer and returns the decrypted message as plain text.
var decrypt = function(encryptedBuffer) {
    var nonce = encryptedBuffer.slice(0, sodium.crypto_box_NONCEBYTES);
    var encryptedMessage = encryptedBuffer.slice(sodium.crypto_box_NONCEBYTES);
    return sodium.crypto_secretbox_open_easy(encryptedMessage, nonce, secret, 'text');
}
```

In addition, the `from_hex`, `to_hex`, `from_string`, and `to_string`
functions are available to explicitly convert hexadecimal, and
arbitrary string representations from/to `Uint8Array` objects.

Functions returning more than one output buffer are returning them as
an object. For example, the `sodium.crypto_box_keypair()` function
returns the following object:
```javascript
{ keyType: 'curve25519', privateKey: (Uint8Array), publicKey: (Uint8Array) }
```

### Standard vs Sumo version

The standard version (in the `dist/browsers` and `dist/modules`
directories) contains the high-level functions, and is the recommended
one for most projects.

Alternatively, the "sumo" version, available in the
`dist/browsers-sumo` and `dist/modules-sumo` directories contains all
the symbols from the original library. This includes undocumented,
untested, deprecated, low-level and easy to misuse functions.

The `crypto_pwhash_*` function set is also only included in the Sumo
version. The high amount of heap memory (allocated after loading)
required by these functions may not be desirable when they are not
being used.

The sumo version is slightly larger than the standard version, and
should be used only if you really need the extra symbols it provides.

### Compilation

If you want to compile the files yourself, the following dependencies
need to be installed on your system:

* emscripten
* binaryen
* git
* nodejs
* make
* uglify-es (`yarn global add uglify-es`)

Running `make` will clone libsodium, build it, test it, build the
wrapper, and create the modules and minified distribution files.

## Authors

Built by Ahmad Ben Mrad, Frank Denis and Ryan Lester.

## License

This wrapper is distributed under the
[ISC License](https://en.wikipedia.org/wiki/ISC_license).
