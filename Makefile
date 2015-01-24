
OUT_DIR=./out
MODULES_DIR=$(OUT_DIR)/modules
BROWSERS_DIR=$(OUT_DIR)/browsers
LIBSODIUM_DIR=./libsodium
LIBSODIUM_JS_DIR=$(LIBSODIUM_DIR)/libsodium-js
WEBTEST_DIR=./webtest

all: $(MODULES_DIR)/libsodium/libsodium.js $(MODULES_DIR)/sodium/sodium.js $(BROWSERS_DIR)/combined/sodium.min.js $(BROWSERS_DIR)/combined/sodium.min.js.gz webtest
	ln -f LICENSE $(MODULES_DIR)/libsodium/LICENSE
	ln -f LICENSE $(MODULES_DIR)/sodium/LICENSE
	ln -f LICENSE $(BROWSERS_DIR)/combined/LICENSE
	@echo
	ls -l $(MODULES_DIR)/libsodium/ $(MODULES_DIR)/sodium/ $(BROWSERS_DIR)/combined/

webtest: $(WEBTEST_DIR)/combined/sodium.js $(WEBTEST_DIR)/combined/sodium.min.js

$(WEBTEST_DIR)/combined/sodium.js: $(BROWSERS_DIR)/combined/sodium.js
	ln -f $(BROWSERS_DIR)/combined/sodium.js $(WEBTEST_DIR)/sodium.js

$(WEBTEST_DIR)/combined/sodium.min.js: $(BROWSERS_DIR)/combined/sodium.min.js
	ln -f $(BROWSERS_DIR)/combined/sodium.min.js $(WEBTEST_DIR)/sodium.min.js

$(BROWSERS_DIR)/combined/sodium.min.js.gz: $(BROWSERS_DIR)/combined/sodium.min.js
	ln -f $(BROWSERS_DIR)/combined/sodium.min.js $(BROWSERS_DIR)/combined/sodium.min.js.tmp
	zopfli $(BROWSERS_DIR)/combined/sodium.min.js.tmp || gzip -9 $(BROWSERS_DIR)/combined/sodium.min.js.tmp
	rm -f $(BROWSERS_DIR)/combined/sodium.min.js.tmp
	mv $(BROWSERS_DIR)/combined/sodium.min.js.tmp.gz $(BROWSERS_DIR)/combined/sodium.min.js.gz

$(BROWSERS_DIR)/combined/sodium.min.js: $(BROWSERS_DIR)/combined/sodium.js
	uglifyjs --stats --mangle --compress sequences=true,dead_code=true,conditionals=true,booleans=true,unused=true,if_return=true,join_vars=true,drop_console=true -- $(BROWSERS_DIR)/combined/sodium.js > $(BROWSERS_DIR)/combined/sodium.min.js

$(BROWSERS_DIR)/combined/sodium.js: $(MODULES_DIR)/libsodium/libsodium.js $(MODULES_DIR)/sodium/sodium.js
	mkdir -p $(BROWSERS_DIR)/combined
	cat $(MODULES_DIR)/libsodium/libsodium.js $(MODULES_DIR)/sodium/sodium.js > $(BROWSERS_DIR)/combined/sodium.js

$(MODULES_DIR)/libsodium/libsodium.js: $(LIBSODIUM_DIR)/test/js.done
	mkdir -p $(MODULES_DIR)/libsodium
	cp $(LIBSODIUM_JS_DIR)/lib/libsodium.js $(MODULES_DIR)/libsodium

$(MODULES_DIR)/sodium/sodium.js: $(LIBSODIUM_DIR)/test/js.done js-build/build-wrapper.js js-build/build-doc.js js-build/wrap-template.js
	mkdir -p $(MODULES_DIR)/sodium
	iojs js-build/build-wrapper.js || nodejs js-build/build-wrapper.js || node js-build/build-wrapper.js

$(LIBSODIUM_DIR)/test/js.done: $(LIBSODIUM_DIR)/configure
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten.sh

$(LIBSODIUM_DIR)/configure: $(LIBSODIUM_DIR)/configure.ac
	cd $(LIBSODIUM_DIR) && ./autogen.sh

$(LIBSODIUM_DIR)/configure.ac: .gitmodules
	git submodule update --init --recursive

clean:
	rm -f $(LIBSODIUM_DIR)/test/js.done
	rm -f $(WEBTEST_DIR)/sodium.js
	rm -f $(WEBTEST_DIR)/sodium.min.js
	rm -rf $(LIBSODIUM_JS_DIR)
	rm -rf $(OUT_DIR)
	-cd $(LIBSODIUM_DIR) && make distclean

distclean: clean

rewrap:
	rm -fr $(OUT_DIR)
	make
