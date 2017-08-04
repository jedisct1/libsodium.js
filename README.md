# libsodium.js

## Overview

The [sodium](https://github.com/jedisct1/libsodium) crypto library
compiled to pure JavaScript and WebAssembly using
[Emscripten](https://github.com/kripken/emscripten), with
automatically generated wrappers to make it easy to use in web
applications.

The complete library weights 115 Kb (minified, gzipped) and can run in
a web browser as well as server-side.

### Compatibility

Supported browsers/JS engines:

* Chrome >= 16
* Edge >= 0.11
* Firefox >= 21
* Internet Explorer >= 11
* Mobile Safari on iOS >= 8.0 (older versions produce incorrect results)
* NodeJS
* Opera >= 15
* Safari >= 6 (older versions produce incorrect results)

## Installation

Ready-to-use files based on libsodium 1.0.13 can be directly copied to your
project.

### Usage with global definitions, for web browsers

1. Copy all the files from [this directory](https://github.com/jedisct1/libsodium.js/tree/master/dist/browsers/) to your project.

2. Define a `sodium` object in the global namespace, along with a callback function in `sodium.onload`.
This function will be called after the Sodium library is loaded and initialized.

3. Load `sodium.js`

This script will check if the web browser supports WebAssembly or not, and load the appropriate version of the library.

```html
<script>
window.sodium = { onload: function(sodium) {
  alert(sodium.to_hex(sodium.crypto_generichash(64, 'test')));
}};
</script>
...
<script src="sodium.js" async></script>
```

Loading the library requires a modification of the DOM, which cannot happen in a web worker.

It you are planning to use libsodium.js in a web worker, you need to
preload the correct version and store it into the global `libsodium`
object.

In order to use the WebAssembly code, that code also needs to be
preloaded and stored in `libsodium_mod.wasmBinary`.

See the [modinit.js](https://github.com/jedisct1/libsodium.js/blob/master/wrapper/modinit.js)
file for reference.

### Usage with NodeJS

Copy the `.js` files for [libsodium and libsodium-wrappers](https://github.com/jedisct1/libsodium.js/tree/master/dist/modules)
to your project and load the `libsodium-wrappers` module.

```javascript
var sodium = require('libsodium-wrappers');
console.log(sodium.to_hex(sodium.crypto_generichash(64, 'test')));
```

Recent versions of Node will automatically load and use the WebAssembly version.

## List of wrapped algorithms and functions:

* [`crypto_aead`](https://download.libsodium.org/doc/secret-key_cryptography/aead.html) (XChaCha20-Poly1305)
* [`crypto_auth`](https://download.libsodium.org/doc/secret-key_cryptography/secret-key_authentication.html) (HMAC-SHA-512-256)
* [`crypto_box`](https://doc.libsodium.org/public-key_cryptography/authenticated_encryption.html) (X25519, XSalsa20)
* [`crypto_box_seal`](https://download.libsodium.org/libsodium/content/public-key_cryptography/sealed_boxes.html) (X25519, XSalsa20)
* [`crypto_generichash`](https://download.libsodium.org/libsodium/content/hashing/generic_hashing.html) (BLAKE2b)
* [`crypto_hash`](https://download.libsodium.org/libsodium/content/advanced/sha-2_hash_function.html) (SHA-512-256)
* [`crypto_kdf`](https://download.libsodium.org/doc/key_derivation/) (BLAKE2b)
* [`crypto_kx`](https://download.libsodium.org/doc/key_exchange/) (X25519, BLAKE2b)
* [`crypto_onetimeauth`](https://download.libsodium.org/doc/advanced/poly1305.html) (Poly1305)
* [`crypto_pwhash`](https://download.libsodium.org/libsodium/content/password_hashing/) (Argon2, Scrypt)
* [`crypto_scalarmult`](https://download.libsodium.org/libsodium/content/advanced/scalar_multiplication.html) (X25519)
* [`crypto_secretbox`](https://download.libsodium.org/libsodium/content/secret-key_cryptography/authenticated_encryption.html) (Salsa20-Poly1305)
* [`crypto_shorthash`](https://download.libsodium.org/libsodium/content/hashing/short-input_hashing.html) (SipHash, SipHash-128)
* [`crypto_sign`](https://download.libsodium.org/libsodium/content/public-key_cryptography/public-key_signatures.html) (Ed25519, Ed25519ph)
* [`crypto_stream`](https://download.libsodium.org/doc/advanced/stream_ciphers.html) (Salsa20, XSalsa20, ChaCha20, XChaCha20)
* [Ed25519->Curve25519 conversion](https://download.libsodium.org/libsodium/content/advanced/ed25519-curve25519.html)
* [`randombytes`](https://download.libsodium.org/libsodium/content/generating_random_data/)

## Additional helpers

* `from_hex()`, `to_hex()`
* `from_string()`, `to_string()`
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
are `uint8array' (default), 'text' and 'hex'.

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

### Note on WebAssembly

Support for WebAssembly was added recently. This required quite a lot of
changes in the way the code is loaded.

Maybe these changes don't play well with applications using
libsodium.js < 0.6.0. Maybe they don't play well with Webpack.
Probably this can be fixed and improved. Your help would be more than
welcome!

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

Built by Ahmad Ben Mrad and Frank Denis.

## License

This wrapper is distributed under the
[ISC License](https://en.wikipedia.org/wiki/ISC_license).
