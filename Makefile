
OUT_DIR=./dist
BROWSERS_TEST_DIR=./browsers-test
BROWSERS_WASM_TEST_DIR=./browsers-wasm-test
MODULES_DIR=$(OUT_DIR)/modules
MODULES_SUMO_DIR=$(OUT_DIR)/modules-sumo
BROWSERS_DIR=$(OUT_DIR)/browsers
BROWSERS_SUMO_DIR=$(OUT_DIR)/browsers-sumo
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


standard: $(MODULES_DIR)/libsodium-wasm.js $(MODULES_DIR)/libsodium-wrappers.js
	@echo + Building standard distribution

sumo: $(MODULES_SUMO_DIR)/libsodium-wasm.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js
	@echo + Building sumo distribution

tests: browsers-tests browsers-tests-wasm

browsers-tests: $(LIBSODIUM_DIR)/test/default/browser/sodium_core.html
	@echo + Building web browsers tests

browsers-tests-wasm: $(LIBSODIUM_DIR)/test/default/browser-wasm/sodium_core.html
	@echo + Building web browsers tests [webassembly]

$(MODULES_DIR)/libsodium-wrappers.js: wrapper/build-wrappers.js wrapper/build-doc.js wrapper/wrap-template.js
	@echo +++ Building standard/libsodium-wrappers.js
	mkdir -p $(MODULES_DIR)
	nodejs wrapper/build-wrappers.js libsodium API.md $(MODULES_DIR)/libsodium-wrappers.js 2>/dev/null || node wrapper/build-wrappers.js libsodium API.md $(MODULES_DIR)/libsodium-wrappers.js

$(MODULES_SUMO_DIR)/libsodium-wrappers.js: wrapper/build-wrappers.js wrapper/build-doc.js wrapper/wrap-template.js
	@echo +++ Building sumo/libsodium-wrappers.js
	mkdir -p $(MODULES_SUMO_DIR)
	nodejs wrapper/build-wrappers.js libsodium-sumo API.md $(MODULES_SUMO_DIR)/libsodium-wrappers.js 2>/dev/null || node wrapper/build-wrappers.js libsodium-sumo API_sumo.md $(MODULES_SUMO_DIR)/libsodium-wrappers.js

$(MODULES_DIR)/libsodium-wasm.js: wrapper/libsodium-pre.js wrapper/libsodium-post.js $(MODULES_DIR)/libsodium-wrappers.js $(LIBSODIUM_JS_DIR)/lib/libsodium-asmjs.js $(LIBSODIUM_JS_DIR)/lib/libsodium-wasm.js
	@echo +++ Building standard/libsodium
	mkdir -p $(MODULES_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_DIR)/lib/libsodium-asmjs.js wrapper/libsodium-post.js > $(MODULES_DIR)/libsodium-asmjs.js
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_DIR)/lib/libsodium-wasm.js wrapper/libsodium-post.js > $(MODULES_DIR)/libsodium-wasm.js
	ln -f $(LIBSODIUM_JS_DIR)/lib/libsodium.wasm $(MODULES_DIR)/

	mkdir -p $(BROWSERS_DIR)
	cat wrapper/modinit.js > $(BROWSERS_DIR)/sodium.js
	cat $(MODULES_DIR)/libsodium-asmjs.js $(MODULES_DIR)/libsodium-wrappers.js > $(BROWSERS_DIR)/sodium-asmjs.js
	cat $(MODULES_DIR)/libsodium-wasm.js $(MODULES_DIR)/libsodium-wrappers.js > $(BROWSERS_DIR)/sodium-wasm.js
	ln -f $(MODULES_DIR)/libsodium.wasm $(BROWSERS_DIR)/

$(MODULES_SUMO_DIR)/libsodium-wasm.js: wrapper/libsodium-pre.js wrapper/libsodium-post.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium-asmjs.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium-wasm.js
	@echo +++ Building sumo/libsodium
	mkdir -p $(MODULES_SUMO_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium-asmjs.js wrapper/libsodium-post.js > $(MODULES_SUMO_DIR)/libsodium-asmjs.js
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium-wasm.js wrapper/libsodium-post.js > $(MODULES_SUMO_DIR)/libsodium-wasm.js
	ln -f $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.wasm $(MODULES_SUMO_DIR)/

	mkdir -p $(BROWSERS_SUMO_DIR)
	cat wrapper/modinit.js > $(BROWSERS_SUMO_DIR)/sodium.js
	cat $(MODULES_SUMO_DIR)/libsodium-asmjs.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js > $(BROWSERS_SUMO_DIR)/sodium-asmjs.js
	cat $(MODULES_SUMO_DIR)/libsodium-wasm.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js > $(BROWSERS_SUMO_DIR)/sodium-wasm.js
	ln -f $(MODULES_SUMO_DIR)/libsodium.wasm $(BROWSERS_SUMO_DIR)/

$(LIBSODIUM_DIR)/test/default/browser/sodium_core.html: $(LIBSODIUM_DIR)/configure
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten.sh --browser-tests
	rm -fr $(BROWSERS_TEST_DIR) && cp -R $(LIBSODIUM_DIR)/test/default/browser $(BROWSERS_TEST_DIR)

$(LIBSODIUM_DIR)/test/default/browser-wasm/sodium_core.html: $(LIBSODIUM_DIR)/configure
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten-wasm.sh --browser-tests
	rm -f $(BROWSERS_TEST_DIR)/*.asm.html
	rm -fr $(BROWSERS_WASM_TEST_DIR) && cp -R $(LIBSODIUM_DIR)/test/default/browser-wasm $(BROWSERS_WASM_TEST_DIR)

$(LIBSODIUM_JS_DIR)/lib/libsodium-wasm.js: $(LIBSODIUM_DIR)/configure
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten-wasm.sh --standard
	mv $(LIBSODIUM_JS_DIR)/lib/libsodium.js $(LIBSODIUM_JS_DIR)/lib/libsodium-wasm.js

$(LIBSODIUM_JS_DIR)/lib/libsodium-asmjs.js: $(LIBSODIUM_JS_DIR)/lib/libsodium-wasm.js
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten.sh --standard
	mv $(LIBSODIUM_JS_DIR)/lib/libsodium.js $(LIBSODIUM_JS_DIR)/lib/libsodium-asmjs.js

$(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium-wasm.js: $(LIBSODIUM_DIR)/configure
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten-wasm.sh --sumo
	mv $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium-wasm.js

$(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium-asmjs.js: $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium-wasm.js
	cd $(LIBSODIUM_DIR) && ./dist-build/emscripten.sh --sumo
	mv $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium-asmjs.js

$(LIBSODIUM_DIR)/configure: $(LIBSODIUM_DIR)/configure.ac
	cd $(LIBSODIUM_DIR) && ./autogen.sh

$(LIBSODIUM_DIR)/configure.ac: .gitmodules
	git submodule update --init --recursive



clean:
	rm -f $(LIBSODIUM_DIR)/js.done $(LIBSODIUM_DIR)/js-sumo.done $(LIBSODIUM_DIR)/browser-js.done
	rm -rf $(BROWSERS_TEST_DIR)
	rm -rf $(BROWSERS_WASM_TEST_DIR)
	rm -fr $(LIBSODIUM_DIR)/test/default/browser
	rm -fr $(LIBSODIUM_DIR)/test/default/browser-wasm
	rm -rf $(LIBSODIUM_JS_DIR)
	rm -rf $(LIBSODIUM_JS_SUMO_DIR)
	rm -rf $(OUT_DIR)
	-cd $(LIBSODIUM_DIR) && make distclean

distclean: clean

rewrap:
	rm -fr $(OUT_DIR)
	make
