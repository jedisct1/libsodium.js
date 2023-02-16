var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function keepRuntimeAlive(){return noExitRuntime}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABahBgA39/fwF/YAN/f38AYAJ/fwF/YAR/f35/AX9gAABgAX8Bf2AEf39/fwF/YAN/f34Bf2AGf39+f35/AX9gAn9/AGADf39+AGAEf39/fwBgBX9/f39/AGABfwBgA39+fwF+YAR/fn9/AX8CGQQBYQFhAAsBYQFiAAYBYQFjAAABYQFkAAEDIB8MAQcJBAEBCQoABAUKBAIBBQYNAAIHAgMDDgUACA8CBAQBcAALBQcBAYACgIACBggBfwFBoKgECwcRBAFlAgABZgARAWcAIgFoAQAJEAEAQQELChwbGhkYISAeHx0K81sfbgEBfyMAQYACayIFJAACQCACIANMDQAgBEGAwARxDQAgBSABQf8BcSACIANrIgNBgAIgA0GAAkkiARsQCSABRQRAA0AgACAFQYACEAUgA0GAAmsiA0H/AUsNAAsLIAAgBSADEAULIAVBgAJqJAALFwAgAC0AAEEgcUUEQCABIAIgABANGgsLoAUBFn8gAkIgWgR/IwBBIGsiAyQAQfTKgdkGIQRBstqIywchBUHuyIGZAyEGQeXwwYsGIQdBrBUoAAAhEkGoFSgAACEIQaQVKAAAIQlB3BUoAAAhFUHYFSgAACETQRQhFEHUFSgAACERQdAVKAAAIQtBzBUoAAAhDEHIFSgAACENQcQVKAAAIQ5BoBUoAAAhCkHAFSgAACEPA0AgEyASIAYgD2pBB3dzIhAgBmpBCXdzIhYgByARakEHdyAMcyIMIAdqQQl3IAhzIhcgDGpBDXcgEXMiGCAEIAtqQQd3IA1zIg0gBGpBCXcgCXMiCSANakENdyALcyILIAlqQRJ3IARzIgQgFSAFIApqQQd3cyIIakEHd3MiESAEakEJd3MiEyARakENdyAIcyIVIBNqQRJ3IARzIQQgCyAIIAUgCGpBCXcgDnMiDmpBDXcgCnMiCiAOakESdyAFcyIFIBBqQQd3cyILIAVqQQl3IBdzIgggC2pBDXcgEHMiEiAIakESdyAFcyEFIAogFiAQIBZqQQ13IA9zIg9qQRJ3IAZzIgYgDGpBB3dzIgogBmpBCXcgCXMiCSAKakENdyAMcyIMIAlqQRJ3IAZzIQYgDyAXIBhqQRJ3IAdzIgcgDWpBB3dzIg8gB2pBCXcgDnMiDiAPakENdyANcyINIA5qQRJ3IAdzIQcgFEECSyEQIBRBAmshFCAQDQALIAMgBzYAACADIBI2ABwgAyAINgAYIAMgCTYAFCADIAo2ABAgAyAENgAMIAMgBTYACCADIAY2AAQgACABIAJBsBVCACADQfgVKAIAEQgAGiADQSAQByADQSBqJAAgAEEQaiAAQSBqIAJCIH0gAEHgFSgCABEDABogAEIANwAIIABCADcAAEEABUF/CwsKACAAQQAgARAJC8QBAQF/AkACQEHMFigCACIAQQBOBEAgAEUNAUGkHygCACAAQf////97cUcNAQsCQEHQFigCAEEKRg0AQZQWKAIAIgBBkBYoAgBGDQBBlBYgAEEBajYCACAAQQo6AAAMAgsQDgwBC0HMFkHMFigCACIAQf////8DIAAbNgIAAkACQEHQFigCAEEKRg0AQZQWKAIAIgBBkBYoAgBGDQBBlBYgAEEBajYCACAAQQo6AAAMAQsQDgtBzBYoAgAaQcwWQQA2AgALC/ACAgJ/AX4CQCACRQ0AIAAgAToAACAAIAJqIgNBAWsgAToAACACQQNJDQAgACABOgACIAAgAToAASADQQNrIAE6AAAgA0ECayABOgAAIAJBB0kNACAAIAE6AAMgA0EEayABOgAAIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIANgIAIAMgAiAEa0F8cSICaiIBQQRrIAA2AgAgAkEJSQ0AIAMgADYCCCADIAA2AgQgAUEIayAANgIAIAFBDGsgADYCACACQRlJDQAgAyAANgIYIAMgADYCFCADIAA2AhAgAyAANgIMIAFBEGsgADYCACABQRRrIAA2AgAgAUEYayAANgIAIAFBHGsgADYCACACIANBBHFBGHIiAWsiAkEgSQ0AIACtQoGAgIAQfiEFIAEgA2ohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkEgayICQR9LDQALCwu3BQEgfyACKAAUIhUhCyACKAAYIhYhDyACKAAcIhchEEH0yoHZBiEEIAIoABAiGCEDQbLaiMsHIQwgASgADCIZIREgASgACCIaIQogASgABCIbIQYgASgAACIcIQFB7siBmQMhDSACKAAMIh0hByACKAAIIh4hCCACKAAEIh8hCSACKAAAIiAhAkHl8MGLBiEFA0AgAiANakEHdyARcyIOIA1qQQl3IA9z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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["e"];updateMemoryViews();wasmTable=Module["asm"]["h"];addOnInit(Module["asm"]["f"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={2960:()=>{return Module.getRandomValue()},2996:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmImports={"a":___assert_fail,"c":_emscripten_asm_const_int,"d":_emscripten_memcpy_big,"b":_fd_write};var asm=createWasm();var ___wasm_call_ctors=function(){return(___wasm_call_ctors=Module["asm"]["f"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["g"]).apply(null,arguments)};var ___errno_location=function(){return(___errno_location=Module["asm"]["__errno_location"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
