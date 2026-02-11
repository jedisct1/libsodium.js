
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
LIBSODIUM_ESM_FILE=$(LIBSODIUM_JS_DIR)/lib/libsodium.esm.mjs
LIBSODIUM_SUMO_ESM_FILE=$(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.esm.mjs

TERSIFY = bun run terser --mangle --compress drop_console=true,passes=3 --
TERSIFY_ESM = bun run terser --mangle --compress drop_console=true,passes=3 --module --
BUN := bun
BUN_INSTALL_TARGET = bun-install

PACK_JS = \
	$(MODULES_DIR)/libsodium.js \
	$(MODULES_DIR)/libsodium-wrappers.js \
	$(MODULES_SUMO_DIR)/libsodium-sumo.js \
	$(MODULES_SUMO_DIR)/libsodium-wrappers.js \
	$(BROWSERS_DIR)/sodium.js \
	$(BROWSERS_SUMO_DIR)/sodium.js

PACK_ESM = \
	$(MODULES_ESM_DIR)/libsodium.mjs \
	$(MODULES_ESM_DIR)/libsodium-wrappers.mjs \
	$(MODULES_SUMO_ESM_DIR)/libsodium-sumo.mjs \
	$(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.mjs

PACK_JS_TARGETS = $(PACK_JS:%=%.pack-js)
PACK_ESM_TARGETS = $(PACK_ESM:%=%.pack-esm)

# libsodium builds reconfigure the in-tree source and must not run concurrently.
LIBSODIUM_SERIAL_TARGETS = \
	$(LIBSODIUM_JS_DIR)/lib/libsodium.js \
	$(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js \
	$(LIBSODIUM_ESM_FILE) \
	$(LIBSODIUM_SUMO_ESM_FILE) \
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


standard: $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js $(MODULES_ESM_DIR)/libsodium.mjs $(MODULES_ESM_DIR)/libsodium-wrappers.mjs $(BROWSERS_DIR)/sodium.js
	@echo + Building standard distribution

sumo: $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js $(MODULES_SUMO_ESM_DIR)/libsodium-sumo.mjs $(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.mjs $(BROWSERS_SUMO_DIR)/sodium.js
	@echo + Building sumo distribution

tests: browsers-tests

browsers-tests: $(LIBSODIUM_DIR)/test/default/browser/sodium_core.html
	@echo + Building web browsers tests

targets: standard sumo

typescript-defs: $(MODULES_DIR)/libsodium-wrappers.d.ts $(MODULES_SUMO_DIR)/libsodium-wrappers.d.ts $(MODULES_ESM_DIR)/libsodium-wrappers.d.ts $(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.d.ts
	@echo + Generated TypeScript definitions

$(MODULES_DIR)/libsodium-wrappers.d.ts: $(MODULES_DIR)/libsodium-wrappers.js wrapper/build-typescript-defs.ts
	@echo +++ Generating TypeScript definitions for standard distribution
	$(BUN) wrapper/build-typescript-defs.ts

$(MODULES_SUMO_DIR)/libsodium-wrappers.d.ts: $(MODULES_SUMO_DIR)/libsodium-wrappers.js wrapper/build-typescript-defs.ts
	@echo +++ Generating TypeScript definitions for sumo distribution
	$(BUN) wrapper/build-typescript-defs.ts --sumo

$(MODULES_ESM_DIR)/libsodium-wrappers.d.ts: $(MODULES_DIR)/libsodium-wrappers.d.ts
	@echo +++ Copying TypeScript definitions to ESM directory
	cp $(MODULES_DIR)/libsodium-wrappers.d.ts $(MODULES_ESM_DIR)/libsodium-wrappers.d.ts

$(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.d.ts: $(MODULES_SUMO_DIR)/libsodium-wrappers.d.ts
	@echo +++ Copying TypeScript definitions to ESM sumo directory
	cp $(MODULES_SUMO_DIR)/libsodium-wrappers.d.ts $(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.d.ts

pack: targets typescript-defs $(PACK_JS_TARGETS) $(PACK_ESM_TARGETS)
	@echo + Packing

$(BUN_INSTALL_TARGET):
	@-$(BUN) install

%.pack-js: % | $(BUN_INSTALL_TARGET)
	@echo "Packing [$<]"
	$(TERSIFY) $< > $<.tmp && mv -f $<.tmp $<

%.pack-esm: % | $(BUN_INSTALL_TARGET)
	@echo "Packing ESM [$<]"
	$(TERSIFY_ESM) $< > $<.tmp && mv -f $<.tmp $<

$(MODULES_DIR)/libsodium-wrappers.js: wrapper/build-wrappers.ts wrapper/wrap-template.js
	@echo +++ Building standard/libsodium-wrappers.js
	mkdir -p $(MODULES_DIR)
	$(BUN) wrapper/build-wrappers.ts libsodium $(MODULES_DIR)/libsodium-wrappers.js
	$(BUN) wrapper/build-doc.ts

$(MODULES_ESM_DIR)/libsodium-wrappers.mjs: wrapper/build-wrappers.ts wrapper/wrap-template.js wrapper/wrap-esm-template.js
	@echo +++ Building standard/libsodium-wrappers.mjs
	mkdir -p $(MODULES_ESM_DIR)
	$(BUN) wrapper/build-wrappers.ts libsodium /dev/null $(MODULES_ESM_DIR)/libsodium-wrappers.mjs

$(MODULES_SUMO_DIR)/libsodium-wrappers.js: wrapper/build-wrappers.ts wrapper/wrap-template.js
	@echo +++ Building sumo/libsodium-wrappers.js
	mkdir -p $(MODULES_SUMO_DIR)
	$(BUN) wrapper/build-wrappers.ts libsodium-sumo $(MODULES_SUMO_DIR)/libsodium-wrappers.js
	$(BUN) wrapper/build-doc.ts --sumo

$(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.mjs: wrapper/build-wrappers.ts wrapper/wrap-template.js wrapper/wrap-esm-template.js
	@echo +++ Building sumo/libsodium-wrappers.mjs
	mkdir -p $(MODULES_SUMO_ESM_DIR)
	$(BUN) wrapper/build-wrappers.ts libsodium-sumo /dev/null $(MODULES_SUMO_ESM_DIR)/libsodium-wrappers.mjs

$(MODULES_DIR)/libsodium.js: wrapper/libsodium-pre.js wrapper/libsodium-post.js $(LIBSODIUM_JS_DIR)/lib/libsodium.js
	@echo +++ Building standard/libsodium
	mkdir -p $(MODULES_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_DIR)/lib/libsodium.js wrapper/libsodium-post.js > $(MODULES_DIR)/libsodium.js

$(BROWSERS_DIR)/sodium.js: $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js
	@echo +++ Building browsers/sodium.js
	mkdir -p $(BROWSERS_DIR)
	cat $(MODULES_DIR)/libsodium.js $(MODULES_DIR)/libsodium-wrappers.js | \
		sed 's/require("libsodium")/exports/g' > $(BROWSERS_DIR)/sodium.js

$(LIBSODIUM_ESM_FILE): $(LIBSODIUM_JS_DIR)/lib/libsodium.js
	@if [ ! -f $@ ] || [ $< -nt $@ ]; then \
		echo "+++ Rebuilding standard ESM"; \
		cd $(LIBSODIUM_DIR) && env CPPFLAGS="-DFAVOR_PERFORMANCE" ./dist-build/emscripten.sh --standard; \
	fi

$(MODULES_ESM_DIR)/libsodium.mjs: $(LIBSODIUM_ESM_FILE)
	@echo +++ Building standard/libsodium.mjs
	mkdir -p $(MODULES_ESM_DIR)
	cp $(LIBSODIUM_ESM_FILE) $(MODULES_ESM_DIR)/libsodium.mjs

$(MODULES_SUMO_DIR)/libsodium-sumo.js: wrapper/libsodium-pre.js wrapper/libsodium-post.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js
	@echo +++ Building sumo/libsodium
	mkdir -p $(MODULES_SUMO_DIR)
	cat wrapper/libsodium-pre.js $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js wrapper/libsodium-post.js > $(MODULES_SUMO_DIR)/libsodium-sumo.js

$(BROWSERS_SUMO_DIR)/sodium.js: $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js
	@echo +++ Building browsers-sumo/sodium.js
	mkdir -p $(BROWSERS_SUMO_DIR)
	cat $(MODULES_SUMO_DIR)/libsodium-sumo.js $(MODULES_SUMO_DIR)/libsodium-wrappers.js | \
		sed 's/require("libsodium-sumo")/exports/g' > $(BROWSERS_SUMO_DIR)/sodium.js

$(LIBSODIUM_SUMO_ESM_FILE): $(LIBSODIUM_JS_SUMO_DIR)/lib/libsodium.js
	@if [ ! -f $@ ] || [ $< -nt $@ ]; then \
		echo "+++ Rebuilding sumo ESM"; \
		cd $(LIBSODIUM_DIR) && env CPPFLAGS="-DFAVOR_PERFORMANCE" ./dist-build/emscripten.sh --sumo; \
	fi

$(MODULES_SUMO_ESM_DIR)/libsodium-sumo.mjs: $(LIBSODIUM_SUMO_ESM_FILE)
	@echo +++ Building sumo/libsodium-sumo.mjs
	mkdir -p $(MODULES_SUMO_ESM_DIR)
	cp $(LIBSODIUM_SUMO_ESM_FILE) $(MODULES_SUMO_ESM_DIR)/libsodium-sumo.mjs

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

.PHONY: benchmark $(BUN_INSTALL_TARGET)
benchmark:
	$(BUN) benchmark/index.ts
