# libsodium.js

## Overview

The [sodium](https://github.com/jedisct1/libsodium) crypto library compiled
to pure JavaScript using [Emscripten](https://github.com/kripken/emscripten),
with automatically generated wrappers to make it easy to use in web
applications.

The complete library weights 135 Kb (minified, gzipped) and can run in
a web browser as well as server-side.

## Installation

Ready-to-use files based on libsodium 1.0.3 can be directly copied to your
project.

### Usage with global definitions, for web browsers

Use [Bower](http://bower.io/):
```bash
$ bower install libsodium.js
```
or directly include a copy of the
[sodium.min.js](https://github.com/jedisct1/libsodium.js/tree/master/dist/browsers/combined)
file.

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

Alternatively, use [npm](https://www.npmjs.com/). The npm package is
called `libsodium-wrappers` and includes a dependency on the raw
`libsodium` module.

```javascript
var sodium = require('libsodium-wrappers');
console.log(sodium.to_hex(sodium.crypto_generichash(64, 'test')));
```

## List of wrapped algorithms and functions:

* [`crypto_aead`](http://doc.libsodium.org/secret-key_cryptography/aead.html) (ChaCha20-Poly1305)
* [`crypto_auth`](http://doc.libsodium.org/advanced/hmac-sha2.html) (SHA256, SHA512, and the default crypto_auth with SHA512/256)
* [`crypto_box`](http://doc.libsodium.org/public-key_cryptography/authenticated_encryption.html)
* [`crypto_box_seal`](http://doc.libsodium.org/public-key_cryptography/sealed_boxes.html)
* [`crypto_generichash`](http://doc.libsodium.org/hashing/generic_hashing.html) (Blake2b)
* [`crypto_hash`](http://doc.libsodium.org/advanced/sha-2_hash_function.html) (SHA512/256)
* [`crypto_pwhash`](http://doc.libsodium.org/password_hashing/README.html) (scrypt)
* [`crypto_scalarmult`](http://doc.libsodium.org/advanced/scalar_multiplication.html) (Curve25519)
* [`crypto_secretbox`](http://doc.libsodium.org/secret-key_cryptography/authenticated_encryption.html)
* [`crypto_shorthash`](http://doc.libsodium.org/hashing/short-input_hashing.html) (SipHash)
* [`crypto_sign`](http://doc.libsodium.org/public-key_cryptography/public-key_signatures.html) (Ed25519)
* [Ed25519->Curve25519 conversion](http://doc.libsodium.org/advanced/ed25519-curve25519.html)
* [`randombytes`](http://doc.libsodium.org/generating_random_data/README.html)

## Additional helpers

* `from_base64()`, `to_base64()`
* `from_hex()`, `to_hex()`
* `memcmp()` (constant-time comparison, returns `true` or `false`)
* `memzero()` (applies to `Uint8Array` objects)

## API

The API exposed by the wrappers is identical to the one of the C
library, except that buffer lengths never need to be explicitely given.

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
are `uint8array' (default), 'text', 'hex' and 'base64'.

Example:
```javascript
var key = sodium.randombytes_buf(sodium.crypto_shorthash_KEYBYTES),
    hash_hex = sodium.crypto_shorthash('test', key, 'hex');
```

In addition, the `from_base64`, `to_base64`, `from_hex` and `to_hex`
functions are available to explicitly convert base64 and hexadecimal
representations from/to `Uint8Array` objects.

Functions returning more than one output buffer are returning them as
an object. For example, the `sodium.crypto_box_keypair()` function
returns the following object:
```javascript
{ keyType: 'curve25519', privateKey: (Uint8Array), publicKey: (Uint8Array) }
```

### Compilation

If you want to compile the files yourself, the following dependencies
need to be installed on your system:

* autoconf
* automake
* emscripten
* git
* io.js or nodejs
* libtool
* make
* mocha (`npm install -g mocha`)
* zopfli

Running `make` will clone libsodium, build it, test it, build the
wrapper, and create the modules and minified distribution files.

## Authors

Built by Ahmad Ben Mrad and Frank Denis.

## License

This wrapper is distributed under the
[ISC License](http://en.wikipedia.org/wiki/ISC_license).
