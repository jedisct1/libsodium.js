
OUT_DIR=./dist
BROWSERS_TEST_DIR=./browsers-test
MODULES_DIR=$(OUT_DIR)/modules
MODULES_SUMO_DIR=$(OUT_DIR)/modules-sumo
BROWSERS_DIR=$(OUT_DIR)/browsers
BROWSERS_DIR=$(OUT_DIR)/browsers-sumo
LIBSODIUM_DIR=./libsodium
LIBSODIUM_JS_DIR=$(LIBSODIUM_DIR)/libsodium-js
LIBSODIUM_JS_SUMO_DIR=$(LIBSODIUM_DIR)/libsodium-js-sumo



all: standard sumo
	@echo
	@echo Standard distribution
	@echo =====================
	@ls -l $(MODULES_DIR)/
	@echo
	@echo Sumo distribution
	@echo =================
	@ls -l $(MODULES_SUMO_DIR)/


standard: $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js
	@echo + Building standard distribution

sumo: $(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js $(MODULES_SUMO_DIR)/libsodium-sumo.js
	@echo + Building sumo distribution

$(MODULES_DIR)/libsodium.js: $(LIBSODIUM_DIR)/js.done $(LIBSODIUM_DIR)/js-sumo.done wrapper/libsodium-pre.js wrapper/libsodium-post.js
	@echo +++ Building standard/libsodium-sumo.js
	mkdir -p $(MODULES_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_DIR)/lib/libsodium.js wrapper/libsodium-post.js > $(MODULES_DIR)/libsodium.js.tmp
	uglifyjs --stats --mangle --compress sequences=true,dead_code=true,conditionals=true,booleans=true,unused=true,if_return=true,join_vars=true,drop_console=true -- $(MODULES_DIR)/libsodium.js.tmp > $(MODULES_DIR)/libsodium.js
	rm -f $(MODULES_DIR)/libsodium.js.tmp
	uglifyjs --stats --mangle --compress sequences=true,dead_code=true,conditionals=true,booleans=true,unused=true,if_return=true,join_vars=true,drop_console=true -- $(LIBSODIUM_JS_DIR)/lib/libsodium.asm.js > $(MODULES_DIR)/libsodium.asm.js
	ln $(LIBSODIUM_JS_DIR)/lib/libsodium.wasm $(MODULES_DIR)/

	mkdir -p $(BROWSERS_DIR)
	cat wrapper/modinit.js $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js > $(BROWSERS_DIR)/sodium.js
	ln $(MODULES_DIR)/libsodium.wasm $(BROWSERS_DIR)/
	ln $(MODULES_DIR)/libsodium.asm.js $(BROWSERS_DIR)/

$(MODULES_DIR)/libsodium-wrappers.js: $(LIBSODIUM_DIR)/js.done wrapper/build-wrappers.js wrapper/build-doc.js wrapper/wrap-template.js
	@echo +++ Building standard/libsodium-wrappers.js
	mkdir -p $(MODULES_DIR)
	nodejs wrapper/build-wrappers.js libsodium API.md $(MODULES_DIR)/libsodium-wrappers.js 2>/dev/null || node wrapper/build-wrappers.js libsodium API.md $(MODULES_DIR)/libsodium-wrappers.js

$(MODULES_SUMO_DIR)/libsodium-sumo.js: $(LIBSODIUM_DIR)/js.done $(LIBSODIUM_DIR)/js-sumo.done wrapper/libsodium-pre.js wrapper/libsodium-post.js
	@echo +++ Building sumo/libsodium-sumo.js
	mkdir -p $(MODULES_SUMO_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js wrapper/libsodium-post.js > $(MODULES_SUMO_DIR)/libsodium-sumo.js.tmp
	uglifyjs --stats --mangle --compress sequences=true,dead_code=true,conditionals=true,booleans=true,unused=true,if_return=true,join_vars=true,drop_console=true -- $(MODULES_SUMO_DIR)/libsodium-sumo.js.tmp > $(MODULES_SUMO_DIR)/libsodium-sumo.js
	rm -f $(MODULES_SUMO_DIR)/libsodium-sumo.js.tmp
	uglifyjs --stats --mangle --compress sequences=true,dead_code=true,conditionals=true,booleans=true,unused=true,if_return=true,join_vars=true,drop_console=true -- $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.asm.js > $(MODULES_SUMO_DIR)/libsodium.asm.js
	ln $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.wasm $(MODULES_SUMO_DIR)/

	mkdir -p $(BROWSERS_SUMO_DIR)
	cat wrapper/modinit.js $(MODULES_SUMO_DIR)/libsodium.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js > $(BROWSERS_SUMO_DIR)/sodium-sumo.js
	ln $(MODULES_SUMO_DIR)/libsodium.wasm $(BROWSERS_SUMO_DIR)/
	ln $(MODULES_SUMO_DIR)/libsodium.asm.js $(BROWSERS_SUMO_DIR)/

$(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js: $(LIBSODIUM_DIR)/js-sumo.done wrapper/build-wrappers.js wrapper/build-doc.js wrapper/wrap-template.js
	@echo +++ Building sumo/libsodium-wrappers.js
	mkdir -p $(MODULES_SUMO_DIR)
	nodejs wrapper/build-wrappers.js libsodium-sumo API.md $(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js 2>/dev/null || node wrapper/build-wrappers.js libsodium-sumo API_sumo.md $(MODULES_SUMO_DIR)/libsodium-wrappers-sumo.js

$(LIBSODIUM_DIR)/browser-js.done: $(LIBSODIUM_DIR)/configure
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten-wasm.sh --browser-tests
	rm -fr $(BROWSERS_TEST_DIR) && cp -R $(LIBSODIUM_DIR)/test/default/browser $(BROWSERS_TEST_DIR)

$(LIBSODIUM_DIR)/js.done: $(LIBSODIUM_DIR)/configure $(LIBSODIUM_DIR)/browser-js.done
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten-wasm.sh --standard

$(LIBSODIUM_DIR)/js-sumo.done: $(LIBSODIUM_DIR)/configure $(LIBSODIUM_DIR)/js.done
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten-wasm.sh --sumo

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
