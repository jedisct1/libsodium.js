[![Make a donation to support this project](https://img.shields.io/badge/donate-PayPal-green.svg?style=flat)](https://www.libsodium.org/donate)

# libsodium.js

## Overview

The [sodium](https://github.com/jedisct1/libsodium) crypto library compiled
to pure JavaScript using [Emscripten](https://github.com/kripken/emscripten),
with automatically generated wrappers to make it easy to use in web
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

Use [Bower](http://bower.io/):
```bash
$ bower install libsodium.js
```
or directly include a copy of the
[sodium.min.js](https://github.com/jedisct1/libsodium.js/tree/master/dist/browsers/combined)
file.

Alternatively, for better performance and to avoid including a local copy,
[libsodium.js is available on cdnjs](https://cdnjs.com/libraries/libsodium-wrappers).

Including the `sodium.min.js` file will add a `sodium` object to the
global namespace.

If a `sodium` object is already present in the global namespace, and
the `sodium.onload` function is defined, this function will be called
right after the library has been loaded and initialized.

```html
<script>
window.sodium = { onload: function(sodium) {
  alert(sodium.to_hex(sodium.crypto_generichash(64, 'test')));
}};
</script>
...
<script src="sodium.js" async defer></script>
```

As an alternative, use a module loader or Browserify as described below.

### Usage with CommonJS/AMD/ES6 import

Copy the `.js` files for [libsodium and libsodium-wrappers](https://github.com/jedisct1/libsodium.js/tree/master/dist/modules)
to your project and load the `libsodium-wrappers` module.

Alternatively, use [yarn](https://yarnpkg.com/). The Yarn package is
called `libsodium-wrappers` and includes a dependency on the raw
`libsodium` module.

```shell
$ yarn add libsodium-wrappers
```

```javascript
var sodium = require('libsodium-wrappers');
console.log(sodium.to_hex(sodium.crypto_generichash(64, 'test')));
```

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

### Compilation

If you want to compile the files yourself, the following dependencies
need to be installed on your system:

* autoconf
* automake
* emscripten
* git
* nodejs
* libtool
* make
* zopfli (`yarn global add node-zopfli`)
* uglify-es (`yarn global add uglify-es`)

Running `make` will clone libsodium, build it, test it, build the
wrapper, and create the modules and minified distribution files.

### Custom build

The build available in this repository does not contain all the
functions available in the original libsodium library.

Providing that you have all the build dependencies installed, here is
how you can build libsodium.js to include the functions you need :

```shell
git clone https://github.com/jedisct1/libsodium.js
cd libsodium.js

# Get the original C version of libsodium and configure it
make libsodium/configure

# Modify the emscripten.sh
# Specifically, add the name of the missing functions and constants in the "EXPORTED_FUNCTIONS" array.
# Ensure that the name begins with an underscore and that it is between double quotes.
nano libsodium/dist-build/emscripten.sh

# Build libsodium, and then libsodium.js with your chosen functions
make
```

__NOTE:__ for each of the functions/constants you add, make sure that
the corresponding symbol files exist in the `wrapper/symbols` folder
and that the constants are listed in the `wrapper/constants.json`
file.

## Authors

Built by Ahmad Ben Mrad and Frank Denis.

## License

This wrapper is distributed under the
[ISC License](https://en.wikipedia.org/wiki/ISC_license).
