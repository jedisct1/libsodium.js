
all: libsodium/libsodium-js/lib/sodium.js
	mkdir -p out
	cp libsodium/libsodium-js/lib/*.js out/
	ln -f out/libsodium.js test/
	ln -f out/sodium.js test/    
	ls -l out

libsodium/libsodium-js/lib/sodium.js: libsodium/test/js.done js-build/build-wrapper.js js-build/build-doc.js js-build/wrap-template.js
	echo "Building wrapper\n"
	iojs js-build/build-wrapper.js || nodejs js-build/build-wrapper.js || node js-build/build-wrapper.js

libsodium/test/js.done: libsodium/configure
	cd libsodium && ./dist-build/emscripten.sh

libsodium/configure: libsodium/configure.ac
	cd libsodium && ./autogen.sh

libsodium/configure.ac: .gitmodules
	git submodule update --init --recursive

clean:
	rm -rf out
	rm -rf libsodium/libsodium-js
	rm -f libsodium/test/js.done
	cd libsodium && make clean

distclean: clean
	cd libsodium && make distclean

rewrap:
	rm -f libsodium/libsodium-js/lib/sodium.js
	make libsodium/libsodium-js/lib/sodium.js
	make
