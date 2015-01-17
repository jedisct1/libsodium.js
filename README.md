# libsodium.js

## Overview

It's been possible ([and rather easy](https://github.com/jedisct1/libsodium/blob/d33d0f08e09ae9f5bbacfeaffd522a5b38024c65/dist-build/emscripten.sh)) to compile [libsodium](https://github.com/jedisct1/libsodium) to JavaScript. But the resulting library is difficult to use. This wrapper aims at making the usage of libsodium much easier.

## Compilation:

    make

Running `make` will clone libsodium v1.0.2, build it, and then build the wrapper file

## Usage:

* Once you've compiled libsodium, import the contents of the `out` folder to your application. Note that you can place the js files anywhere in the app, but from what I've seen, the `libsodium.js.mem` file (I hear you asking ["But what does it do?"](http://kripken.github.io/emscripten-site/docs/tools_reference/emcc.html#emcc-memory-init-file)) must be located in the root folder of your app. (And if you're able to place it elsewhere, please let me now as I'm interested)
* To find out what are the available methods and how to use them, please have a look at the `API.md`, written at the end of the compilation process

List of wrapped algorithms and functions:
* Curve25519
* Ed25519
* Ed25519->Curve25519 transition
* CryptoBox
* CryptoSecretBox
* Scrypt
* Hash (SHA256 & SHA512)
* HMAC (SHA256, SHA512, and the default crypto_auth with SHA512/256)

## Testing

The wrapped algorithms have been tested with test vectors harvested from the C test suite.

Once you've built and wrapped libsodium, you can test the library by opening [test/index.html](test/index.html) in your browser. This page lets you test the library against random values and the original test vectors (in the background)

## Authors

Built by Ahmad Ben Mrad and Frank Denis

## License

This wrapper is distributed under the [ISC License](http://en.wikipedia.org/wiki/ISC_license).
