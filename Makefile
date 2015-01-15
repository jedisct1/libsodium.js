
all: libsodium/libsodium-js/lib/libsodium-wrap.js
	mkdir -p out
	cp libsodium/libsodium-js/lib/*.js out/
	cp libsodium/libsodium-js/lib/*.mem out/    
	ls -l out

libsodium/libsodium-js/lib/libsodium-wrap.js: libsodium/test/js.done
	iojs js-build/build-wrapper.js || nodejs js-build/build-wrapper.js || node js-build/build-wrapper.js

libsodium/test/js.done: libsodium/configure
	cd libsodium && ./dist-build/emscripten.sh

libsodium/configure: libsodium/configure.ac
	cd libsodium && ./autogen.sh

libsodium/configure.ac: .gitmodules
	git submodule update --init --recursive
