// include: shell.js
// include: minimum_runtime_check.js
// end include: minimum_runtime_check.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = !!globalThis.window;
var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != 'renderer';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// include: pre.js.inc
try {
    this['Module'] = Module;
    Module.test;
} catch(e) {
    this['Module'] = Module = {};
}
if (typeof process === 'object') {
    if (typeof(FS) === 'object') {
        Module['preRun'] = Module['preRun'] || [];
        Module['preRun'].push(function() {
            FS.init();
            FS.mkdir('/test-data');
            FS.mount(NODEFS,  { root: '.' }, '/test-data');
        });
    }
} else {
    Module['print'] = function(x) {
        var event = new Event('test-output');
        event.data = x;
        window.dispatchEvent(event);
    };
}
// end include: pre.js.inc


var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// In MODULARIZE mode _scriptName needs to be captured already at the very top of the page immediately when the page is parsed, so it is generated there
// before the page load. In non-MODULARIZE modes generate it here.
var _scriptName = globalThis.document?.currentScript?.src;

if (typeof __filename != 'undefined') { // Node
  _scriptName = __filename;
} else
if (ENVIRONMENT_IS_WORKER) {
  _scriptName = self.location.href;
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');

  scriptDirectory = __dirname + '/';

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs.
  filename = isFileURI(filename) ? new URL(filename) : filename;
  var ret = fs.readFileSync(filename);
  return ret;
};

readAsync = async (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : filename;
  var ret = fs.readFileSync(filename, binary ? undefined : 'utf8');
  return ret;
};
// end include: node_shell_read.js
  if (process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here
  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  try {
    scriptDirectory = new URL('.', _scriptName).href; // includes trailing slash
  } catch {
    // Must be a `blob:` or `data:` URL (e.g. `blob:http://site.com/etc/etc`), we cannot
    // infer anything from them.
  }

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = async (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    var response = await fetch(url, { credentials: 'same-origin' });
    if (response.ok) {
      return response.arrayBuffer();
    }
    throw new Error(response.status + ' : ' + response.url);
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
}

var out = console.log.bind(console);
var err = console.error.bind(console);

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;

// Wasm globals

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    // This build was created without ASSERTIONS defined.  `assert()` should not
    // ever be called in this configuration but in case there are callers in
    // the wild leave this simple abort() implementation here for now.
    abort(text);
  }
}

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');

// include: runtime_common.js
// include: runtime_stack_check.js
// end include: runtime_stack_check.js
// include: runtime_exceptions.js
// end include: runtime_exceptions.js
// include: runtime_debug.js
// end include: runtime_debug.js
// Memory management
var
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

var runtimeInitialized = false;



function updateMemoryViews() {
  var b = wasmMemory.buffer;
  HEAP8 = new Int8Array(b);
  HEAP16 = new Int16Array(b);
  HEAPU8 = new Uint8Array(b);
  HEAPU16 = new Uint16Array(b);
  HEAP32 = new Int32Array(b);
  HEAPU32 = new Uint32Array(b);
  HEAPF32 = new Float32Array(b);
  HEAPF64 = new Float64Array(b);
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// end include: runtime_common.js
function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  // Begin ATPRERUNS hooks
  callRuntimeCallbacks(onPreRuns);
  // End ATPRERUNS hooks
}

function initRuntime() {
  runtimeInitialized = true;

  // No ATINITS hooks

  wasmExports['__wasm_call_ctors']();

  // No ATPOSTCTORS hooks
}

function preMain() {
  // No ATMAINS hooks
}

function postRun() {
   // PThreads reuse the runtime from the main thread.

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  // Begin ATPOSTRUNS hooks
  callRuntimeCallbacks(onPostRuns);
  // End ATPOSTRUNS hooks
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  what += '. Build with -sASSERTIONS for more info.';

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

var wasmBinaryFile;

function findWasmBinary() {
  return base64Decode('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DQADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAvPAQEDfwJAAkAgAigCECIDDQBBACEEIAIQDA0BIAIoAhAhAwsCQCABIAMgAigCFCIEa00NACACIAAgASACKAIkEQIADwsCQAJAIAIoAlBBAEgNACABRQ0AIAEhAwJAA0AgACADaiIFQX9qLQAAQQpGDQEgA0F/aiIDRQ0CDAALAAsgAiAAIAMgAigCJBECACIEIANJDQIgASADayEBIAIoAhQhBAwBCyAAIQVBACEDCyAEIAUgARAOGiACIAIoAhQgAWo2AhQgAyABaiEECyAECwYAIAAkAQsEACMBCwYAIAAkAAsSAQJ/IwAgAGtBcHEiASQAIAELBAAjAAtTAQF+AkACQCADQcAAcUUNACABIANBQGqthiECQgAhAQwBCyADRQ0AIAFBwAAgA2utiCACIAOtIgSGhCECIAEgBIYhAQsgACABNwMAIAAgAjcDCAtTAQF+AkACQCADQcAAcUUNACACIANBQGqtiCEBQgAhAgwBCyADRQ0AIAJBwAAgA2uthiABIAOtIgSIhCEBIAIgBIghAgsgACABNwMAIAAgAjcDCAuTBAIFfwJ+IwBBIGsiAiQAIAFC////////P4MhBwJAAkAgAUIwiEL//wGDIginIgNB/4d/akH9D0sNACAAQjyIIAdCBIaEIQcgA0GAiH9qrSEIAkACQCAAQv//////////D4MiAEKBgICAgICAgAhUDQAgB0IBfCEHDAELIABCgICAgICAgIAIUg0AIAdCAYMgB3whBwtCACAHIAdC/////////wdWIgMbIQAgA60gCHwhBwwBCwJAIAAgB4RQDQAgCEL//wFSDQAgAEI8iCAHQgSGhEKAgICAgICABIQhAEL/DyEHDAELAkAgA0H+hwFNDQBC/w8hB0IAIQAMAQsCQEGA+ABBgfgAIAhQIgQbIgUgA2siBkHwAEwNAEIAIQBCACEHDAELIAcgB0KAgICAgIDAAIQgBBshB0EAIQQCQCAFIANGDQAgAkEQaiAAIAdBgAEgBmsQFSACKQMQIAIpAxiEQgBSIQQLIAIgACAHIAYQFiACKQMAIgdCPIggAikDCEIEhoQhAAJAAkAgB0L//////////w+DIASthCIHQoGAgICAgICACFQNACAAQgF8IQAMAQsgB0KA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DwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABMgEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMwEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMAAANwMADwsgAiACKAIAIgFBBGo2AgAgACABMQAANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKwMAOQMADwsgACACIAMRBgALCzMAAkAgAFANAANAIAFBf2oiASAAp0EPcS0AoIQEIAJyOgAAIABCBIgiAEIAUg0ACwsgAQsuAAJAIABQDQADQCABQX9qIgEgAKdBB3FBMHI6AAAgAEIDiCIAQgBSDQALCyABC30CAX4DfwJAIABCgICAgBBUDQADQCABQX9qIgEgACICIAJCCoAiAEL2AX58p0EwcjoAACACQv////+fAVYNAAsLAkAgAFANACAApyEDA0AgAUF/aiIBIANBCm4iBEH2AWwgA2pBMHI6AAAgA0EJSyEFIAQhAyAFDQALCyABCxQBAX8gACABEEUiAiAAayABIAIbC2wBAX8jAEGAAmsiBSQAAkAgAiADTA0AIARBgMAEcQ0AIAUgASACIANrIgNBgAIgA0GAAkkiAhsQCBoCQCACDQADQCAAIAVBgAIQNyADQYB+aiIDQf8BSw0ACwsgACAFIAMQNwsgBUGAAmokAAsIACAAIAEQRgsOACAAIAEgAkEBQQIQNQugGAMSfwN+AXwjAEGwBGsiBiQAQQAhByAGQQA2AiwCQAJAIAEQQyIYQn9VDQBBASEIQYqABCEJIAGaIgEQQyEYDAELAkAgBEGAEHFFDQBBASEIQY2ABCEJDAELQZCABEGLgAQgBEEBcSIIGyEJIAhFIQcLAkACQCAYQoCAgICAgID4/wCDQoCAgICAgID4/wBSDQAgAEEgIAIg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AAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABgAAAFgHAQAABAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAA/////woAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQciHBAusBnsgcmV0dXJuIE1vZHVsZS5nZXRSYW5kb21WYWx1ZSgpOyB9AHsgaWYgKE1vZHVsZS5nZXRSYW5kb21WYWx1ZSA9PT0gdW5kZWZpbmVkKSB7IHRyeSB7IHZhciB3aW5kb3dfID0gJ29iamVjdCcgPT09IHR5cGVvZiB3aW5kb3cgPyB3aW5kb3cgOiBzZWxmOyB2YXIgY3J5cHRvXyA9IHR5cGVvZiB3aW5kb3dfLmNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3dfLmNyeXB0byA6IHdpbmRvd18ubXNDcnlwdG87IGNyeXB0b18gPSAoY3J5cHRvXyA9PT0gdW5kZWZpbmVkKSA/IGNyeXB0byA6IGNyeXB0b187IHZhciByYW5kb21WYWx1ZXNTdGFuZGFyZCA9IGZ1bmN0aW9uKCkgeyB2YXIgYnVmID0gbmV3IFVpbnQzMkFycmF5KDEpOyBjcnlwdG9fLmdldFJhbmRvbVZhbHVlcyhidWYpOyByZXR1cm4gYnVmWzBdID4+PiAwOyB9OyByYW5kb21WYWx1ZXNTdGFuZGFyZCgpOyBNb2R1bGUuZ2V0UmFuZG9tVmFsdWUgPSByYW5kb21WYWx1ZXNTdGFuZGFyZDsgfSBjYXRjaCAoZSkgeyB0cnkgeyB2YXIgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7IHZhciByYW5kb21WYWx1ZU5vZGVKUyA9IGZ1bmN0aW9uKCkgeyB2YXIgYnVmID0gY3J5cHRvWydyYW5kb21CeXRlcyddKDQpOyByZXR1cm4gKGJ1ZlswXSA8PCAyNCB8IGJ1ZlsxXSA8PCAxNiB8IGJ1ZlsyXSA8PCA4IHwgYnVmWzNdKSA+Pj4gMDsgfTsgcmFuZG9tVmFsdWVOb2RlSlMoKTsgTW9kdWxlLmdldFJhbmRvbVZhbHVlID0gcmFuZG9tVmFsdWVOb2RlSlM7IH0gY2F0Y2ggKGUpIHsgdGhyb3cgJ05vIHNlY3VyZSByYW5kb20gbnVtYmVyIGdlbmVyYXRvciBmb3VuZCc7IH0gfSB9IH0AAJQBD3RhcmdldF9mZWF0dXJlcwgrD211dGFibGUtZ2xvYmFscysTbm9udHJhcHBpbmctZnB0b2ludCsLYnVsay1tZW1vcnkrCHNpZ24tZXh0Kw9yZWZlcmVuY2UtdHlwZXMrCm11bHRpdmFsdWUrD2J1bGstbWVtb3J5LW9wdCsWY2FsbC1pbmRpcmVjdC1vdmVybG9uZw==');
}

function getBinarySync(file) {
  if (ArrayBuffer.isView(file)) {
    return file;
  }
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  // Throwing a plain string here, even though it not normally adviables since
  // this gets turning into an `abort` in instantiateArrayBuffer.
  throw 'both async and sync fetching of the wasm failed';
}

async function getWasmBinary(binaryFile) {

  // Otherwise, getBinarySync should be able to get it synchronously
  return getBinarySync(binaryFile);
}

async function instantiateArrayBuffer(binaryFile, imports) {
  try {
    var binary = await getWasmBinary(binaryFile);
    var instance = await WebAssembly.instantiate(binary, imports);
    return instance;
  } catch (reason) {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    abort(reason);
  }
}

async function instantiateAsync(binary, binaryFile, imports) {
  return instantiateArrayBuffer(binaryFile, imports);
}

function getWasmImports() {
  // prepare imports
  var imports = {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  };
  return imports;
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
async function createWasm() {
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    assignWasmExports(wasmExports);

    updateMemoryViews();

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    return receiveInstance(result['instance']);
  }

  var info = getWasmImports();

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    return new Promise((resolve, reject) => {
        Module['instantiateWasm'](info, (inst, mod) => {
          resolve(receiveInstance(inst, mod));
        });
    });
  }

  wasmBinaryFile ??= findWasmBinary();
  var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
  var exports = receiveInstantiationResult(result);
  return exports;
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// end include: preamble.js

// Begin JS library code


  class ExitStatus {
      name = 'ExitStatus';
      constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    }

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };
  var onPostRuns = [];
  var addOnPostRun = (cb) => onPostRuns.push(cb);

  var onPreRuns = [];
  var addOnPreRun = (cb) => onPreRuns.push(cb);

  var runDependencies = 0;
  
  
  var dependenciesFulfilled = null;
  var removeRunDependency = (id) => {
      runDependencies--;
  
      Module['monitorRunDependencies']?.(runDependencies);
  
      if (runDependencies == 0) {
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback(); // can add another dependenciesFulfilled
        }
      }
    };
  var addRunDependency = (id) => {
      runDependencies++;
  
      Module['monitorRunDependencies']?.(runDependencies);
  
    };

  /** @noinline */
  var base64Decode = (b64) => {
      if (ENVIRONMENT_IS_NODE) {
        var buf = Buffer.from(b64, 'base64');
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
      }
  
      var b1, b2, i = 0, j = 0, bLength = b64.length;
      var output = new Uint8Array((bLength*3>>2) - (b64[bLength-2] == '=') - (b64[bLength-1] == '='));
      for (; i < bLength; i += 4, j += 3) {
        b1 = base64ReverseLookup[b64.charCodeAt(i+1)];
        b2 = base64ReverseLookup[b64.charCodeAt(i+2)];
        output[j] = base64ReverseLookup[b64.charCodeAt(i)] << 2 | b1 >> 4;
        output[j+1] = b1 << 4 | b2 >> 2;
        output[j+2] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i+3)];
      }
      return output;
    };


  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = true;


  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  

  var __abort_js = () =>
      abort('');

  var runtimeKeepaliveCounter = 0;
  var __emscripten_runtime_keepalive_clear = () => {
      noExitRuntime = false;
      runtimeKeepaliveCounter = 0;
    };

  var timers = {
  };
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      quit_(1, e);
    };
  
  
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  var callUserCallback = (func) => {
      if (ABORT) {
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  
  var _emscripten_get_now = () => performance.now();
  var __setitimer_js = (which, timeout_ms) => {
      // First, clear any existing timer.
      if (timers[which]) {
        clearTimeout(timers[which].id);
        delete timers[which];
      }
  
      // A timeout of zero simply cancels the current timeout so we have nothing
      // more to do.
      if (!timeout_ms) return 0;
  
      var id = setTimeout(() => {
        delete timers[which];
        callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
      }, timeout_ms);
      timers[which] = { id, timeout_ms };
      return 0;
    };

  var readEmAsmArgsArray = [];
  var readEmAsmArgs = (sigPtr, buf) => {
      readEmAsmArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      while (ch = HEAPU8[sigPtr++]) {
        // Floats are always passed as doubles, so all types except for 'i'
        // are 8 bytes and require alignment.
        var wide = (ch != 105);
        wide &= (ch != 112);
        buf += wide && (buf % 8) ? 4 : 0;
        readEmAsmArgsArray.push(
          // Special case for pointers under wasm64 or CAN_ADDRESS_2GB mode.
          ch == 112 ? HEAPU32[((buf)>>2)] :
          ch == 105 ?
            HEAP32[((buf)>>2)] :
            HEAPF64[((buf)>>3)]
        );
        buf += wide ? 8 : 4;
      }
      return readEmAsmArgsArray;
    };
  var runEmAsmFunction = (code, sigPtr, argbuf) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      return ASM_CONSTS[code](...args);
    };
  var _emscripten_asm_const_int = (code, sigPtr, argbuf) => {
      return runEmAsmFunction(code, sigPtr, argbuf);
    };

  var printCharBuffers = [null,[],[]];
  
  var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
  
  var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
      var maxIdx = idx + maxBytesToRead;
      if (ignoreNul) return maxIdx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.
      // As a tiny code save trick, compare idx against maxIdx using a negation,
      // so that maxBytesToRead=undefined/NaN means Infinity.
      while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
      return idx;
    };
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @param {boolean=} ignoreNul - If true, the function will not stop on a NUL character.
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
  
      var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
  
      // When using conditional TextDecoder, skip it for short strings as the overhead of the native call is not worth it.
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  var printChar = (stream, curr) => {
      var buffer = printCharBuffers[stream];
      if (curr === 0 || curr === 10) {
        (stream === 1 ? out : err)(UTF8ArrayToString(buffer));
        buffer.length = 0;
      } else {
        buffer.push(curr);
      }
    };
  
  var flush_NO_FILESYSTEM = () => {
      // flush anything remaining in the buffers during shutdown
      if (printCharBuffers[1].length) printChar(1, 10);
      if (printCharBuffers[2].length) printChar(2, 10);
    };
  
  
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index.
     * @param {boolean=} ignoreNul - If true, the function will not stop on a NUL character.
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : '';
    };
  var SYSCALLS = {
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  var _fd_write = (fd, iov, iovcnt, pnum) => {
      // hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        for (var j = 0; j < len; j++) {
          printChar(fd, HEAPU8[ptr+j]);
        }
        num += len;
      }
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    };




    // Precreate a reverse lookup table from chars
    // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" back to
    // bytes to make decoding fast.
    for (var base64ReverseLookup = new Uint8Array(123/*'z'+1*/), i = 25; i >= 0; --i) {
      base64ReverseLookup[48+i] = 52+i; // '0-9'
      base64ReverseLookup[65+i] = i; // 'A-Z'
      base64ReverseLookup[97+i] = 26+i; // 'a-z'
    }
    base64ReverseLookup[43] = 62; // '+'
    base64ReverseLookup[47] = 63; // '/'
  ;
// End JS library code

// include: postlibrary.js
// This file is included after the automatically-generated JS library code
// but before the wasm module is created.

{

  // Begin ATMODULES hooks
  if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];
if (Module['print']) out = Module['print'];
if (Module['printErr']) err = Module['printErr'];
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
  // End ATMODULES hooks

  if (Module['arguments']) arguments_ = Module['arguments'];
  if (Module['thisProgram']) thisProgram = Module['thisProgram'];

  if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
    while (Module['preInit'].length > 0) {
      Module['preInit'].shift()();
    }
  }
}

// Begin runtime exports
  // End runtime exports
  // Begin JS library exports
  // End JS library exports

// end include: postlibrary.js

var ASM_CONSTS = {
  66504: () => { return Module.getRandomValue(); },  
 66540: () => { if (Module.getRandomValue === undefined) { try { var window_ = 'object' === typeof window ? window : self; var crypto_ = typeof window_.crypto !== 'undefined' ? window_.crypto : window_.msCrypto; crypto_ = (crypto_ === undefined) ? crypto : crypto_; var randomValuesStandard = function() { var buf = new Uint32Array(1); crypto_.getRandomValues(buf); return buf[0] >>> 0; }; randomValuesStandard(); Module.getRandomValue = randomValuesStandard; } catch (e) { try { var crypto = require('crypto'); var randomValueNodeJS = function() { var buf = crypto['randomBytes'](4); return (buf[0] << 24 | buf[1] << 16 | buf[2] << 8 | buf[3]) >>> 0; }; randomValueNodeJS(); Module.getRandomValue = randomValueNodeJS; } catch (e) { throw 'No secure random number generator found'; } } } }
};

// Imports from the Wasm binary.
var _main,
  __emscripten_timeout,
  __emscripten_stack_restore,
  __emscripten_stack_alloc,
  _emscripten_stack_get_current,
  ___cxa_increment_exception_refcount,
  dynCall_jiji,
  memory,
  __indirect_function_table,
  wasmMemory;


function assignWasmExports(wasmExports) {
  _main = Module['_main'] = wasmExports['main'];
  __emscripten_timeout = wasmExports['_emscripten_timeout'];
  __emscripten_stack_restore = wasmExports['_emscripten_stack_restore'];
  __emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'];
  _emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'];
  ___cxa_increment_exception_refcount = wasmExports['__cxa_increment_exception_refcount'];
  dynCall_jiji = wasmExports['dynCall_jiji'];
  memory = wasmMemory = wasmExports['memory'];
  __indirect_function_table = wasmExports['__indirect_function_table'];
}

var wasmImports = {
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear,
  /** @export */
  _setitimer_js: __setitimer_js,
  /** @export */
  emscripten_asm_const_int: _emscripten_asm_const_int,
  /** @export */
  fd_write: _fd_write,
  /** @export */
  proc_exit: _proc_exit
};


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

function callMain() {

  var entryFunction = _main;

  var argc = 0;
  var argv = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  } catch (e) {
    return handleException(e);
  }
}

function run() {

  if (runDependencies > 0) {
    dependenciesFulfilled = run;
    return;
  }

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    dependenciesFulfilled = run;
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    Module['onRuntimeInitialized']?.();

    var noInitialRun = Module['noInitialRun'] || false;
    if (!noInitialRun) callMain();

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
}

var wasmExports;

// With async instantation wasmExports is assigned asynchronously when the
// instance is received.
createWasm();

run();

// end include: postamble.js

