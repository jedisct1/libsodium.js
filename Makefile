
OUT_DIR=./dist
BROWSERS_TEST_DIR=./browsers-test
MODULES_DIR=$(OUT_DIR)/modules
MODULES_SUMO_DIR=$(OUT_DIR)/modules-sumo
BROWSERS_DIR=$(OUT_DIR)/browsers
BROWSERS_SUMO_DIR=$(OUT_DIR)/browsers-sumo
LIBSODIUM_DIR=./libsodium
LIBSODIUM_JS_DIR=$(LIBSODIUM_DIR)/libsodium-js
LIBSODIUM_JS_SUMO_DIR=$(LIBSODIUM_DIR)/libsodium-js-sumo



all: $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js $(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js $(MODULES_SUMO_DIR)/libsodium-sumo.js $(BROWSERS_DIR)/combined/sodium.js $(BROWSERS_DIR)/combined/sodium.min.js $(BROWSERS_DIR)/combined/sodium.min.js.gz $(BROWSERS_SUMO_DIR)/combined/sodium.js $(BROWSERS_SUMO_DIR)/combined/sodium.min.js $(BROWSERS_SUMO_DIR)/combined/sodium.min.js.gz
	@echo
	@echo Standard distribution
	@echo =====================
	@ls -l $(MODULES_DIR)/ $(BROWSERS_DIR)/combined/
	@echo
	@echo Sumo distribution
	@echo =================
	@ls -l $(MODULES_SUMO_DIR)/ $(BROWSERS_SUMO_DIR)/combined/



$(BROWSERS_DIR)/combined/sodium.min.js.gz: $(BROWSERS_DIR)/combined/sodium.min.js
	ln -f $(BROWSERS_DIR)/combined/sodium.min.js $(BROWSERS_DIR)/combined/sodium.min.js.tmp
	zopfli --i1000 $(BROWSERS_DIR)/combined/sodium.min.js.tmp || gzip -9 $(BROWSERS_DIR)/combined/sodium.min.js.tmp
	rm -f $(BROWSERS_DIR)/combined/sodium.min.js.tmp
	mv $(BROWSERS_DIR)/combined/sodium.min.js.tmp.gz $(BROWSERS_DIR)/combined/sodium.min.js.gz

$(BROWSERS_DIR)/combined/sodium.min.js: $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js wrapper/modinit.js
	mkdir -p $(BROWSERS_DIR)/combined
	uglifyjs --stats --mangle --compress sequences=true,dead_code=true,conditionals=true,booleans=true,unused=true,if_return=true,join_vars=true,drop_console=true -- $(MODULES_DIR)/libsodium-wrappers.js > $(MODULES_DIR)/libsodium-wrappers.min.js.tmp
	cat wrapper/modinit.js $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.min.js.tmp > $(BROWSERS_DIR)/combined/sodium.min.js
	rm -f $(MODULES_DIR)/libsodium-wrappers.min.js.tmp

$(BROWSERS_DIR)/combined/sodium.js: $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js wrapper/modinit.js
	mkdir -p $(BROWSERS_DIR)/combined
	cat wrapper/modinit.js $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js > $(BROWSERS_DIR)/combined/sodium.js

$(MODULES_DIR)/libsodium.js: $(LIBSODIUM_DIR)/js.done $(LIBSODIUM_DIR)/js-sumo.done wrapper/libsodium-pre.js wrapper/libsodium-post.js
	mkdir -p $(MODULES_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_DIR)/lib/libsodium.js wrapper/libsodium-post.js > $(MODULES_DIR)/libsodium.js

$(MODULES_DIR)/libsodium-wrappers.js: $(LIBSODIUM_DIR)/js.done wrapper/build-wrappers.js wrapper/build-doc.js wrapper/wrap-template.js
	mkdir -p $(MODULES_DIR)
	nodejs wrapper/build-wrappers.js libsodium API.md $(MODULES_DIR)/libsodium-wrappers.js 2>/dev/null || node wrapper/build-wrappers.js libsodium API.md $(MODULES_DIR)/libsodium-wrappers.js



$(BROWSERS_SUMO_DIR)/combined/sodium.min.js.gz: $(BROWSERS_SUMO_DIR)/combined/sodium.min.js
	@echo +++ Building sumo/combined/sodium.min.js.gz
	ln -f $(BROWSERS_SUMO_DIR)/combined/sodium.min.js $(BROWSERS_SUMO_DIR)/combined/sodium.min.js.tmp
	zopfli --i1000 $(BROWSERS_SUMO_DIR)/combined/sodium.min.js.tmp || gzip -9 $(BROWSERS_SUMO_DIR)/combined/sodium.min.js.tmp
	rm -f $(BROWSERS_SUMO_DIR)/combined/sodium.min.js.tmp
	mv $(BROWSERS_SUMO_DIR)/combined/sodium.min.js.tmp.gz $(BROWSERS_SUMO_DIR)/combined/sodium.min.js.gz

$(BROWSERS_SUMO_DIR)/combined/sodium.min.js: $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js wrapper/modinit.js
	@echo +++ Building sumo/combined/sodium.min.js
	mkdir -p $(BROWSERS_SUMO_DIR)/combined
	uglifyjs --stats --mangle --compress sequences=true,dead_code=true,conditionals=true,booleans=true,unused=true,if_return=true,join_vars=true,drop_console=true -- $(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js > $(MODULES_SUMO_DIR)/libsodium-wrappers.min.js.tmp
	cat wrapper/modinit.js $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers.min.js.tmp > $(BROWSERS_SUMO_DIR)/combined/sodium.min.js
	rm -f $(MODULES_SUMO_DIR)/libsodium-wrappers.min.js.tmp

$(BROWSERS_SUMO_DIR)/combined/sodium.js: $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js wrapper/modinit.js
	@echo +++ Building sumo/combined/sodium.js
	mkdir -p $(BROWSERS_SUMO_DIR)/combined
	cat wrapper/modinit.js $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js > $(BROWSERS_SUMO_DIR)/combined/sodium.js

$(MODULES_SUMO_DIR)/libsodium-sumo.js: $(LIBSODIUM_DIR)/js.done $(LIBSODIUM_DIR)/js-sumo.done wrapper/libsodium-pre.js wrapper/libsodium-post.js
	@echo +++ Building sumo/libsodium-sumo.js
	mkdir -p $(MODULES_SUMO_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js wrapper/libsodium-post.js > $(MODULES_SUMO_DIR)/libsodium-sumo.js
	ln -s libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium.js

$(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js: $(LIBSODIUM_DIR)/js-sumo.done wrapper/build-wrappers.js wrapper/build-doc.js wrapper/wrap-template.js
	@echo +++ Building sumo/libsodium-wrappers.js
	mkdir -p $(MODULES_SUMO_DIR)
	nodejs wrapper/build-wrappers.js libsodium-sumo API.md $(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js 2>/dev/null || node wrapper/build-wrappers.js libsodium-sumo API_sumo.md $(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js
	ln -s libsodium-wrappers-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js


$(LIBSODIUM_DIR)/browser-js.done: $(LIBSODIUM_DIR)/configure
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten.sh --browser-tests
	rm -fr $(BROWSERS_TEST_DIR) && cp -R $(LIBSODIUM_DIR)/test/default/browser $(BROWSERS_TEST_DIR)

$(LIBSODIUM_DIR)/js.done: $(LIBSODIUM_DIR)/configure $(LIBSODIUM_DIR)/browser-js.done
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten.sh --standard

$(LIBSODIUM_DIR)/js-sumo.done: $(LIBSODIUM_DIR)/configure $(LIBSODIUM_DIR)/js.done
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten.sh --sumo



$(LIBSODIUM_DIR)/configure: $(LIBSODIUM_DIR)/configure.ac
	cd $(LIBSODIUM_DIR) && ./autogen.sh

$(LIBSODIUM_DIR)/configure.ac: .gitmodules
	git submodule update --init --recursive



clean:
	rm -f $(LIBSODIUM_DIR)/js.done $(LIBSODIUM_DIR)/js-sumo.done $(LIBSODIUM_DIR)/browser-js.done
	rm -rf $(BROWSERS_TEST_DIR)
	rm -rf $(LIBSODIUM_JS_DIR)
	rm -rf $(LIBSODIUM_JS_SUMO_DIR)
	rm -rf $(OUT_DIR)
	-cd $(LIBSODIUM_DIR) && make distclean

distclean: clean

rewrap:
	rm -fr $(OUT_DIR)
	make
