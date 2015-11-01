# libsodium.js

## Overview

The [sodium](https://github.com/jedisct1/libsodium) crypto library compiled
to pure JavaScript using [Emscripten](https://github.com/kripken/emscripten),
with automatically generated wrappers to make it easy to use in web
applications.

The complete library weights 151 Kb (minified, gzipped) and can run in
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

Ready-to-use files based on libsodium 1.0.6 can be directly copied to your
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
* [`crypto_onetimeauth`](http://doc.libsodium.org/advanced/poly1305.html) (Poly1305)
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
* `from_string()`, `to_string()`
* `memcmp()` (constant-time check for equality, returns `true` or `false`)
* `compare() (constant-time comparison. Values must have the same
size. Returns `-1`, `0` or `1`)
* `memzero()` (applies to `Uint8Array` objects)
* `increment()` (increments an arbitrary-long number stored as a
little-endian `Uint8Array` - typically to increment nonces)

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
are `uint8array' (default), 'text', 'hex' and 'base64'.

Example:
```javascript
var key = sodium.randombytes_buf(sodium.crypto_shorthash_KEYBYTES),
    hash_hex = sodium.crypto_shorthash('test', key, 'hex');
```

In addition, the `from_base64`, `to_base64`, `from_hex`, `to_hex`,
`from_string`, and `to_string` functions are available to explicitly
convert base64, hexadecimal, and arbitrary string representations
from/to `Uint8Array` objects.

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
* nodejs
* libtool
* make
* mocha (`npm install -g mocha`)
* zopfli (`npm install -g node-zopfli`)

Running `make` will clone libsodium, build it, test it, build the
wrapper, and create the modules and minified distribution files.

### Custom build

The build available in this repository does not contain all the functions available in the original libsodium library.

Providing that you have all the build dependencies installed, here is how you can build libsodium.js to include the functions you need :

```shell
git clone https://github.com/jedisct1/libsodium.js
cd ./libsodium.js

# Get the original C version of libsodium and configure it
make libsodium/configure

# Modify the emscripten.sh
# Specifically, add the name of the missing functions and constants in the "EXPORTED_FUNCTIONS" array.
# Ensure that the name begins with an underscore and that it is between double quotes. 
nano libsodium/dist-build/emscripten.sh

# Build libsodium, and then libsodium.js with your chosen functions
make
```

__NOTE:__ for each of the functions/constants you add, make sure that the corresponding symbol files exist in the `wrapper/symbols` folder and that the constants are listed in the `wrapper/constants.json` file.

## Authors

Built by Ahmad Ben Mrad and Frank Denis.

## License

This wrapper is distributed under the
[ISC License](http://en.wikipedia.org/wiki/ISC_license).
