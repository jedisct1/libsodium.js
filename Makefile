
OUT_DIR=./dist
BROWSERS_TEST_DIR=./browsers-test
MODULES_DIR=$(OUT_DIR)/modules
MODULES_SUMO_DIR=$(OUT_DIR)/modules-sumo
MODULES_ESM_DIR=$(OUT_DIR)/modules-esm
MODULES_SUMO_ESM_DIR=$(OUT_DIR)/modules-sumo-esm
BROWSERS_DIR=$(OUT_DIR)/browsers
BROWSERS_SUMO_DIR=$(OUT_DIR)/browsers-sumo
LIBSODIUM_DIR=./libsodium
LIBSODIUM_JS_DIR=$(LIBSODIUM_DIR)/libsodium-js
LIBSODIUM_JS_SUMO_DIR=$(LIBSODIUM_DIR)/libsodium-js-sumo

TERSIFY = bun run terser --mangle --compress drop_console=true,passes=3 --
TERSIFY_ESM = bun run terser --mangle --compress drop_console=true,passes=3 --module --
BUN := bun

# libsodium builds reconfigure the in-tree source and must not run concurrently.
LIBSODIUM_SERIAL_TARGETS = \
	$(LIBSODIUM_JS_DIR)/lib/libsodium.js \
	$(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js \
	$(LIBSODIUM_DIR)/test/default/browser/sodium_core.html

.NOTPARALLEL: $(LIBSODIUM_SERIAL_TARGETS)

all: pack browsers-tests
	@echo
	@echo Standard distribution
	@echo =====================
	@ls -l $(MODULES_DIR)/
	@echo
	@echo Sumo distribution
	@echo =================
	@ls -l $(MODULES_SUMO_DIR)/


standard: $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js $(MODULES_ESM_DIR)/libsodium.mjs $(MODULES_ESM_DIR)/libsodium-wrappers.mjs
	@echo + Building standard distribution

sumo: $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js $(MODULES_SUMO_ESM_DIR)/libsodium-sumo.mjs $(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.mjs
	@echo + Building sumo distribution

tests: browsers-tests

browsers-tests: $(LIBSODIUM_DIR)/test/default/browser/sodium_core.html
	@echo + Building web browsers tests

targets: standard sumo

typescript-defs: $(MODULES_DIR)/libsodium-wrappers.d.ts $(MODULES_SUMO_DIR)/libsodium-wrappers.d.ts
	@echo + Generated TypeScript definitions

$(MODULES_DIR)/libsodium-wrappers.d.ts: $(MODULES_DIR)/libsodium-wrappers.js wrapper/build-typescript-defs.ts
	@echo +++ Generating TypeScript definitions for standard distribution
	$(BUN) wrapper/build-typescript-defs.ts

$(MODULES_SUMO_DIR)/libsodium-wrappers.d.ts: $(MODULES_SUMO_DIR)/libsodium-wrappers.js wrapper/build-typescript-defs.ts
	@echo +++ Generating TypeScript definitions for sumo distribution
	$(BUN) wrapper/build-typescript-defs.ts --sumo

pack: targets typescript-defs
	@-bun install
	@echo + Packing
	for i in $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js; do \
	  echo "Packing [$$i]" ; \
	  $(TERSIFY) $$i > $$i.tmp && mv -f $$i.tmp $$i  ; \
	done
	for i in $(MODULES_ESM_DIR)/libsodium.mjs $(MODULES_ESM_DIR)/libsodium-wrappers.mjs $(MODULES_SUMO_ESM_DIR)/libsodium-sumo.mjs $(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.mjs; do \
	  echo "Packing ESM [$$i]" ; \
	  $(TERSIFY_ESM) $$i > $$i.tmp && mv -f $$i.tmp $$i  ; \
	done
	for i in $(BROWSERS_DIR)/sodium.js $(BROWSERS_SUMO_DIR)/sodium.js; do \
	  echo "Packing browser [$$i]" ; \
	  $(TERSIFY) $$i > $$i.tmp && mv -f $$i.tmp $$i  ; \
	done

$(MODULES_DIR)/libsodium-wrappers.js: wrapper/build-wrappers.ts wrapper/wrap-template.js
	@echo +++ Building standard/libsodium-wrappers.js
	mkdir -p $(MODULES_DIR)
	$(BUN) wrapper/build-wrappers.ts libsodium $(MODULES_DIR)/libsodium-wrappers.js
	$(BUN) wrapper/build-doc.ts

$(MODULES_ESM_DIR)/libsodium-wrappers.mjs: wrapper/build-wrappers.ts wrapper/wrap-template.js wrapper/wrap-esm-template.js $(MODULES_ESM_DIR)/libsodium.mjs
	@echo +++ Building standard/libsodium-wrappers.mjs
	mkdir -p $(MODULES_ESM_DIR)
	$(BUN) wrapper/build-wrappers.ts libsodium /dev/null $(MODULES_ESM_DIR)/libsodium-wrappers.mjs

$(MODULES_SUMO_DIR)/libsodium-wrappers.js: wrapper/build-wrappers.ts wrapper/wrap-template.js
	@echo +++ Building sumo/libsodium-wrappers.js
	mkdir -p $(MODULES_SUMO_DIR)
	$(BUN) wrapper/build-wrappers.ts libsodium-sumo $(MODULES_SUMO_DIR)/libsodium-wrappers.js
	$(BUN) wrapper/build-doc.ts --sumo

$(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.mjs: wrapper/build-wrappers.ts wrapper/wrap-template.js wrapper/wrap-esm-template.js $(MODULES_SUMO_ESM_DIR)/libsodium-sumo.mjs
	@echo +++ Building sumo/libsodium-wrappers.mjs
	mkdir -p $(MODULES_SUMO_ESM_DIR)
	$(BUN) wrapper/build-wrappers.ts libsodium-sumo /dev/null $(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.mjs

$(MODULES_DIR)/libsodium.js: wrapper/libsodium-pre.js wrapper/libsodium-post.js $(MODULES_DIR)/libsodium-wrappers.js $(LIBSODIUM_JS_DIR)/lib/libsodium.js
	@echo +++ Building standard/libsodium
	mkdir -p $(MODULES_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_DIR)/lib/libsodium.js wrapper/libsodium-post.js > $(MODULES_DIR)/libsodium.js

	mkdir -p $(BROWSERS_DIR)
	cat $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js | \
		sed 's/require("libsodium")/exports/g' > $(BROWSERS_DIR)/sodium.js

$(MODULES_ESM_DIR)/libsodium.mjs: wrapper/libsodium-esm-pre.js wrapper/libsodium-esm-post.js $(LIBSODIUM_JS_DIR)/lib/libsodium.js
	@echo +++ Building standard/libsodium.mjs
	mkdir -p $(MODULES_ESM_DIR)
	cat wrapper/libsodium-esm-pre.js $(LIBSODIUM_JS_DIR)/lib/libsodium.js wrapper/libsodium-esm-post.js | \
		sed "s/require(['\"]fs['\"])/null/g" | \
		sed "s/require(['\"]path['\"])/null/g" | \
		sed "s/require(['\"]crypto['\"])/null/g" > $(MODULES_ESM_DIR)/libsodium.mjs

$(MODULES_SUMO_DIR)/libsodium-sumo.js: wrapper/libsodium-pre.js wrapper/libsodium-post.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js
	@echo +++ Building sumo/libsodium
	mkdir -p $(MODULES_SUMO_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js wrapper/libsodium-post.js > $(MODULES_SUMO_DIR)/libsodium-sumo.js

	mkdir -p $(BROWSERS_SUMO_DIR)
	cat $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js | \
		sed 's/require("libsodium-sumo")/exports/g' > $(BROWSERS_SUMO_DIR)/sodium.js

$(MODULES_SUMO_ESM_DIR)/libsodium-sumo.mjs: wrapper/libsodium-esm-pre.js wrapper/libsodium-esm-post.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js
	@echo +++ Building sumo/libsodium-sumo.mjs
	mkdir -p $(MODULES_SUMO_ESM_DIR)
	cat wrapper/libsodium-esm-pre.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js wrapper/libsodium-esm-post.js | \
		sed "s/require(['\"]fs['\"])/null/g" | \
		sed "s/require(['\"]path['\"])/null/g" | \
		sed "s/require(['\"]crypto['\"])/null/g" > $(MODULES_SUMO_ESM_DIR)/libsodium-sumo.mjs

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
	rm -rf $(MODULES_ESM_DIR) $(MODULES_SUMO_ESM_DIR)
	-cd $(LIBSODIUM_DIR) && test -f Makefile && make distclean || true

distclean: clean

rewrap:
	rm -fr $(OUT_DIR)
	$(MAKE)

.PHONY: benchmark
benchmark:
	$(BUN) benchmark/index.ts
