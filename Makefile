
OUT_DIR=./dist
BROWSERS_TEST_DIR=./browsers-test
MODULES_DIR=$(OUT_DIR)/modules
MODULES_SUMO_DIR=$(OUT_DIR)/modules-sumo
BROWSERS_DIR=$(OUT_DIR)/browsers
BROWSERS_SUMO_DIR=$(OUT_DIR)/browsers-sumo
LIBSODIUM_DIR=./libsodium
LIBSODIUM_JS_DIR=$(LIBSODIUM_DIR)/libsodium-js
LIBSODIUM_JS_SUMO_DIR=$(LIBSODIUM_DIR)/libsodium-js-sumo

TERSIFY = npx terser --mangle --compress drop_console=true,passes=3 --
NODE := $(shell if which nodejs >/dev/null 2>&1 ; then echo nodejs; else echo node ; fi)

all: pack
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

sumo: $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js
	@echo + Building sumo distribution

tests: browsers-tests

browsers-tests: $(LIBSODIUM_DIR)/test/default/browser/sodium_core.html
	@echo + Building web browsers tests

targets: standard sumo

pack: targets
	@-npm install
	@echo + Packing
	for i in $(MODULES_DIR)/*.js $(MODULES_SUMO_DIR)/*.js $(BROWSERS_DIR)/*.js $(BROWSERS_SUMO_DIR)/*.js; do \
	  echo "Packing [$$i]" ; \
	  $(TERSIFY) $$i > $$i.tmp && mv -f $$i.tmp $$i  ; \
	done

$(MODULES_DIR)/libsodium-wrappers.js: wrapper/build-wrappers.js wrapper/build-doc.js wrapper/wrap-template.js
	@echo +++ Building standard/libsodium-wrappers.js
	mkdir -p $(MODULES_DIR)
	$(NODE) wrapper/build-wrappers.js libsodium API.md $(MODULES_DIR)/libsodium-wrappers.js

$(MODULES_SUMO_DIR)/libsodium-wrappers.js: wrapper/build-wrappers.js wrapper/build-doc.js wrapper/wrap-template.js
	@echo +++ Building sumo/libsodium-wrappers.js
	mkdir -p $(MODULES_SUMO_DIR)
	$(NODE) wrapper/build-wrappers.js libsodium-sumo API_sumo.md $(MODULES_SUMO_DIR)/libsodium-wrappers.js

$(MODULES_DIR)/libsodium.js: wrapper/libsodium-pre.js wrapper/libsodium-post.js $(MODULES_DIR)/libsodium-wrappers.js $(LIBSODIUM_JS_DIR)/lib/libsodium.js
	@echo +++ Building standard/libsodium
	mkdir -p $(MODULES_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_DIR)/lib/libsodium.js wrapper/libsodium-post.js > $(MODULES_DIR)/libsodium.js

	mkdir -p $(BROWSERS_DIR)
	cat $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js > $(BROWSERS_DIR)/sodium.js

$(MODULES_SUMO_DIR)/libsodium-sumo.js: wrapper/libsodium-pre.js wrapper/libsodium-post.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js
	@echo +++ Building sumo/libsodium
	mkdir -p $(MODULES_SUMO_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js wrapper/libsodium-post.js > $(MODULES_SUMO_DIR)/libsodium-sumo.js

	mkdir -p $(BROWSERS_SUMO_DIR)
	cat $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js > $(BROWSERS_SUMO_DIR)/sodium.js

$(LIBSODIUM_DIR)/test/default/browser/sodium_core.html: $(LIBSODIUM_DIR)/configure
	cd $(LIBSODIUM_DIR) && env CPPFLAGS="-DFAVOR_PERFORMANCE" ./dist-build/emscripten.sh --browser-tests
	rm -f $(LIBSODIUM_DIR)/test/default/browser/*.asm.html $(LIBSODIUM_DIR)/test/default/browser/*.asm.js
	rm -fr $(BROWSERS_TEST_DIR) && cp -R $(LIBSODIUM_DIR)/test/default/browser $(BROWSERS_TEST_DIR)

$(LIBSODIUM_JS_DIR)/lib/libsodium.js: $(LIBSODIUM_DIR)/configure
	cd $(LIBSODIUM_DIR) && env CPPFLAGS="-DFAVOR_PERFORMANCE" ./dist-build/emscripten.sh --standard

$(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js: $(LIBSODIUM_DIR)/configure
	cd $(LIBSODIUM_DIR) && env CPPFLAGS="-DFAVOR_PERFORMANCE" ./dist-build/emscripten.sh --sumo

$(LIBSODIUM_DIR)/configure: $(LIBSODIUM_DIR)/configure.ac
	cd $(LIBSODIUM_DIR) && ./autogen.sh

$(LIBSODIUM_DIR)/configure.ac: .gitmodules
	git submodule update --init --recursive



clean:
	rm -f $(LIBSODIUM_DIR)/js.done $(LIBSODIUM_DIR)/js-sumo.done $(LIBSODIUM_DIR)/browser-js.done
	rm -rf $(BROWSERS_TEST_DIR)
	rm -fr $(LIBSODIUM_DIR)/test/default/browser
	rm -rf $(LIBSODIUM_JS_DIR)
	rm -rf $(LIBSODIUM_JS_SUMO_DIR)
	rm -rf $(OUT_DIR)
	-cd $(LIBSODIUM_DIR) && make distclean

distclean: clean

rewrap:
	rm -fr $(OUT_DIR)
	make
