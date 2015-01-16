
all: libsodium/libsodium-js/lib/libsodium-wrap.js
	mkdir -p out
	cp libsodium/libsodium-js/lib/*.js out/
	cp libsodium/libsodium-js/lib/*.mem out/
	cp out/* test/
	ls -l out

libsodium/libsodium-js/lib/libsodium-wrap.js: libsodium/test/js.done
	echo "Building wrapper\n"
	iojs js-build/build-wrapper.js || nodejs js-build/build-wrapper.js || node js-build/build-wrapper.js

libsodium/test/js.done: libsodium/configure
	#cd libsodium && ./autogen.sh
	cp emscripten.sh libsodium/dist-build/ && \
	cd libsodium && ./dist-build/emscripten.sh

libsodium/configure: libsodium/configure.ac
	cd libsodium && ./autogen.sh

libsodium/configure.ac: .gitmodules
	git submodule update --init --recursive

clean:
	rm -r out
	rm -r libsodium/libsodium-js
	cd libsodium && make clean

rewrap:
	rm libsodium/libsodium-js/lib/libsodium-wrap.js
	make libsodium/libsodium-js/lib/libsodium-wrap.js
	make
