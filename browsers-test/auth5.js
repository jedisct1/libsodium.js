var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function keepRuntimeAlive(){return noExitRuntime}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABXQ9gA39/fwF/YAN/f38AYAJ/fwBgAX8Bf2AEf39/fwBgA39/fgBgAABgAX8AYAJ/fwF/YAR/f39/AX9gBX9/f39/AGACf34Bf2ACf34AYAV/f39/fwF/YAN/fn8BfgIZBAFhAWEACQFhAWIAAAFhAWMAAQFhAWQABAMcGwoBAQILBQIEBgwAAwEGBwIFBwgBAw0CDgMACAQEAXAABAUHAQGAAoCAAgYIAX8BQdCsBAsHEQQBZQIAAWYAEQFnAB4BaAEACQkBAEEBCwMcHRsKyWAbbgEBfyMAQYACayIFJAACQCACIANMDQAgBEGAwARxDQAgBSABQf8BcSACIANrIgNBgAIgA0GAAkkiARsQBiABRQRAA0AgACAFQYACEAUgA0GAAmsiA0H/AUsNAAsLIAAgBSADEAULIAVBgAJqJAALFwAgAC0AAEEgcUUEQCABIAIgABAOGgsL8AICAn8BfgJAIAJFDQAgACABOgAAIAAgAmoiA0EBayABOgAAIAJBA0kNACAAIAE6AAIgACABOgABIANBA2sgAToAACADQQJrIAE6AAAgAkEHSQ0AIAAgAToAAyADQQRrIAE6AAAgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgA2AgAgAyACIARrQXxxIgJqIgFBBGsgADYCACACQQlJDQAgAyAANgIIIAMgADYCBCABQQhrIAA2AgAgAUEMayAANgIAIAJBGUkNACADIAA2AhggAyAANgIUIAMgADYCECADIAA2AgwgAUEQayAANgIAIAFBFGsgADYCACABQRhrIAA2AgAgAUEcayAANgIAIAIgA0EEcUEYciIBayICQSBJDQAgAK1CgYCAgBB+IQUgASADaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQSBrIgJBH0sNAAsLCwoAIABBACABEAYLigMBBX8jAEGABGsiAiQAIAJBIGoiAxAVIAMgACABEBQgAyACQcADahATIAIgAikD2AM3AxggAiACKQPQAzcDECACIAIpA8gDNwMIIAIgAikDwAM3AwAjAEEQayIAQcAiNgIMIAAgAjYCCEEAIQMgAEEANgIEA0AgACAAKAIEIAAoAgwgA2otAAAgACgCCCADai0AAHNyNgIEIAAgACgCBCADQQFy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ADcCBCAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQQQAL/AMBAn8gAkGABE8EQCAAIAEgAhACDwsgACACaiEDAkAgACABc0EDcUUEQAJAIABBA3FFBEAgACECDAELIAJFBEAgACECDAELIAAhAgNAIAIgAS0AADoAACABQQFqIQEgAkEBaiICQQNxRQ0BIAIgA0kNAAsLAkAgA0F8cSIAQcAASQ0AIAIgAEFAaiIESw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBE0NAAsLIAAgAk0NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIABJDQALDAELIANBBEkEQCAAIQIMAQsgACADQQRrIgRLBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsLEwBBsCxBuCs2AgBB6CtBKjYCAAtoACAAQgA3A0AgAEIANwNIIABBgAkpAwA3AwAgAEGICSkDADcDCCAAQZAJKQMANwMQIABBmAkpAwA3AxggAEGgCSkDADcDICAAQagJKQMANwMoIABBsAkpAwA3AzAgAEG4CSkDADcDOAs2AQF/IwBBQGoiAiQAIAAgAhAaIABB0AFqIgAgAkLAABAJIAAgARAaIAJBwAAQByACQUBrJAALCgAgACABIAIQCQuIAwEGfyMAQcABayIDJAAgABASIANBQGtBNkGAARAGA0AgA0FAayIEIAFqIgIgAi0AACABQbAaai0AAHM6AAAgBCABQQFyIgJqIgUgBS0AACACQbAaai0AAHM6AAAgBCABQQJyIgJqIgUgBS0AACACQbAaai0AAHM6AAAgBCABQQNyIgJqIgQgBC0AACACQbAaai0AAHM6AAAgAUEEaiEB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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["e"];updateMemoryViews();wasmTable=Module["asm"]["h"];addOnInit(Module["asm"]["f"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={2608:()=>{return Module.getRandomValue()},2644:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmImports={"d":___assert_fail,"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=function(){return(___wasm_call_ctors=Module["asm"]["f"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["g"]).apply(null,arguments)};var ___errno_location=function(){return(___errno_location=Module["asm"]["__errno_location"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
