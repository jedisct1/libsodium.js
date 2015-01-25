# libsodium.js

## Overview

The [sodium](https://github.com/jedisct1/libsodium) crypto library compiled
to pure JavaScript using [Emscripten](https://github.com/kripken/emscripten),
with automatically generated wrappers to make it easy to use in web
applications.

The complete library weights 133 Kb (minified, gzipped) and can run in
a web browser as well as server-side.

## Usage

Ready-to-use files based on libsodium 1.0.2 can be directly copied to your
project.

### Usage with global definitions, for web browsers

Include a copy of the
[sodium.min.js](https://github.com/jedisct1/libsodium.js/tree/master/dist/browsers/combined)
file.

This will add a `sodium` object to the global namespace.

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

### Usage with AMD or RequireJS

Copy the `.js` files for [libsodium and sodium](https://github.com/jedisct1/libsodium.js/tree/master/dist/modules)
to your project and load the `sodium` module:

```javascript
var sodium = require('sodium');
console.log(sodium.to_hex(sodium.crypto_generichash(64, 'test')));
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
* zopfli

Running `make` will clone libsodium, build it, test it, build the
wrapper, and create the modules and minified distribution files.

## List of wrapped algorithms and functions:

* [`crypto_aead`](http://doc.libsodium.org/secret-key_cryptography/aead.html) (ChaCha20-Poly1305)
* [`crypto_auth`](http://doc.libsodium.org/advanced/hmac-sha2.html) (SHA256, SHA512, and the default crypto_auth with SHA512/256)
* [`crypto_box`](http://doc.libsodium.org/public-key_cryptography/authenticated_encryption.html)
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

* `from_base64`, `to_base64`
* `from_hex`, `to_hex`
* `memcmp` (constant-time)
* `memzero`

## Testing

The wrapped algorithms have been tested with test vectors harvested
from the C test suite.

Once you've built and wrapped libsodium, you can test the library by
opening [test/index.html](test/index.html) in your browser. This page
lets you test the library against random values and the original test
vectors (in the background).

## Authors

Built by Ahmad Ben Mrad and Frank Denis.

## License

This wrapper is distributed under the
[ISC License](http://en.wikipedia.org/wiki/ISC_license).
