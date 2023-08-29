var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var wasmExports;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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ADYCkAMgAUGQA2oQBCABQYchLQAANgKAAyABQYADahAEIAFBiCEtAAA2AvACIAFB8AJqEAQgAUGJIS0AADYC4AIgAUHgAmoQBCABQYohLQAANgLQAiABQdACahAEIAFBiyEtAAA2AsACIAFBwAJqEAQgAUGMIS0AADYCsAIgAUGwAmoQBCABQY0hLQAANgKgAiABQaACahAEIAFBjiEtAAA2ApACIAFBkAJqEAQgAUGPIS0AADYCgAIgAUGAAmoQBCABQZAhLQAANgLwASABQfABahAEIAFBkSEtAAA2AuABIAFB4AFqEAQgAUGSIS0AADYC0AEgAUHQAWoQBCABQZMhLQAANgLAASABQcABahAEIAFBlCEtAAA2ArABIAFBsAFqEAQgAUGVIS0AADYCoAEgAUGgAWoQBCABQZYhLQAANgKQASABQZABahAEIAFBlyEtAAA2AoABIAFBgAFqEAQgAUGYIS0AADYCcCABQfAAahAEIAFBmSEtAAA2AmAgAUHgAGoQBCABQZohLQAANgJQIAFB0ABqEAQgAUGbIS0AADYCQCABQUBrEAQgAUGcIS0AADYCMCABQTBqEAQgAUGdIS0AADYCICABQSBqEAQgAUGeIS0AADYCECABQRBqEAQgAUGfIS0AADYCACABEAQQDEHVCCEAQdUIIQICQAJAA0AgAi0AACIDIAAtAABHDQEgAkEBaiECIABBAWohACADDQALIAFBoAhqJAAMAQtB3AhBlQhBJ0GPCBADAAtBvBooAgAaAkBBf0EAAn8CfwJAAkBBiwkiAUEDcUUNAEEAQYsJLQAARQ0CGgNAIAFBAWoiAUEDcUUNASABLQAADQALDAELA0AgASIAQQRqIQEgACgCACICQX9zIAJBgYKECGtxQYCBgoR4cUUNAAsDQCAAIgFBAWohACABLQAADQALCyABQYsJawsiAAJ/QbwaKAIAQQBIBEBBiwkgAEHwGRANDAELQYsJIABB8BkQDQsiASAARg0AGiABCyAARxtBAEgNAAJAQcAaKAIAQQpGDQBBhBooAgAiAEGAGigCAEYNAEGEGiAAQQFqNgIAIABBCjoAAAwBCxAOC0EACwsL2A8VAEGACAuUAyUwMngALSsgICAwWDB4AHhtYWluAGhhc2guYwBjcnlwdG9faGFzaF9ieXRlcygpID4gMFUAY3J5cHRvX2hhc2hfc2hhMjU2X2J5dGVzKCkgPiAwVQBzaGE1MTIAc3RyY21wKGNyeXB0b19oYXNoX3ByaW1pdGl2ZSgpLCAic2hhNTEyIikgPT0gMAAtLS0gU1VDQ0VTUyAtLS0AKG51bGwpAGNyeXB0b19oYXNoX3NoYTI1Nl9zdGF0ZWJ5dGVzKCkgPT0gc2l6ZW9mKGNyeXB0b19oYXNoX3NoYTI1Nl9zdGF0ZSkAY3J5cHRvX2hhc2hfc2hhNTEyX3N0YXRlYnl0ZXMoKSA9PSBzaXplb2YoY3J5cHRvX2hhc2hfc2hhNTEyX3N0YXRlKQBjcnlwdG9faGFzaF9zaGE1MTJfYnl0ZXMoKSA9PSBjcnlwdG9faGFzaF9ieXRlcygpAGNyeXB0b19oYXNoX3NoYTUxMl9ieXRlcygpID49IGNyeXB0b19oYXNoX3NoYTI1Nl9ieXRlcygpAEGgCwuhAmfmCWqFrme7cvNuPDr1T6V/Ug5RjGgFm6vZgx8ZzeBbmC+KQpFEN3HP+8C1pdu16VvCVjnxEfFZpII/ktVeHKuYqgfYAVuDEr6FMSTDfQxVdF2+cv6x3oCnBtybdPGbwcFpm+SGR77vxp3BD8yhDCRvLOktqoR0StypsFzaiPl2UlE+mG3GMajIJwOwx39Zv/ML4MZHkafVUWPKBmcpKRSFCrcnOCEbLvxtLE0TDThTVHMKZbsKanYuycKBhSxykqHov6JLZhqocItLwqNRbMcZ6JLRJAaZ1oU1DvRwoGoQFsGkGQhsNx5Md0gntbywNLMMHDlKqthOT8qcW/NvLmjugo90b2OleBR4yIQIAseM+v++kOtsUKT3o/m+8nhxxoAAQYAOC8EFCMm882fmCWo7p8qEha5nuyv4lP5y82488TYdXzr1T6XRguatf1IOUR9sPiuMaAWba71B+6vZgx95IX4TGc3gWyKuKNeYL4pCzWXvI5FEN3EvO03sz/vAtbzbiYGl27XpOLVI81vCVjkZ0AW28RHxWZtPGa+kgj+SGIFt2tVeHKtCAgOjmKoH2L5vcEUBW4MSjLLkTr6FMSTitP/Vw30MVW+Je/J0Xb5ysZYWO/6x3oA1Esclpwbcm5Qmac908ZvB0krxnsFpm+TjJU84hke+77XVjIvGncEPZZysd8yhDCR1AitZbyzpLYPkpm6qhHRK1PtBvdypsFy1UxGD2oj5dqvfZu5SUT6YEDK0LW3GMag/IfuYyCcDsOQO777Hf1m/wo+oPfML4MYlpwqTR5Gn1W+CA+BRY8oGcG4OCmcpKRT8L9JGhQq3JybJJlw4IRsu7SrEWvxtLE3fs5WdEw04U95jr4tUcwplqLJ3PLsKanbmru1HLsnCgTs1ghSFLHKSZAPxTKHov6IBMEK8S2YaqJGX+NBwi0vCML5UBqNRbMcYUu/WGeiS0RCpZVUkBpnWKiBxV4U1DvS40bsycKBqEMjQ0rgWwaQZU6tBUQhsNx6Z647fTHdIJ6hIm+G1vLA0Y1rJxbMMHDnLikHjSqrYTnPjY3dPypxbo7iy1vNvLmj8su9d7oKPdGAvF0NvY6V4cqvwoRR4yITsOWQaCALHjCgeYyP6/76Q6b2C3utsUKQVecay96P5vitTcuPyeHHGnGEm6s4+J8oHwsAhx7iG0R7r4M3WfdrqeNFu7n9PffW6bxdyqmfwBqaYyKLFfWMKrg35vgSYPxEbRxwTNQtxG4R9BCP1d9sokyTHQHuryjK8vskVCr6ePEwNEJzEZx1DtkI+y77UxUwqfmX8nCl/Wez61jqrb8tfF1hHSowZRGyAAEHAFAtBGQAKABkZGQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAAZABEKGRkZAwoHAAEACQsYAAAJBgsAAAsABhkAAAAZGRkAQZEVCyEOAAAAAAAAAAAZAAoNGRkZAA0AAAIACQ4AAAAJAA4AAA4AQcsVCwEMAEHXFQsVEwAAAAATAAAAAAkMAAAAAAAMAAAMAEGFFgsBEABBkRYLFQ8AAAAEDwAAAAAJEAAAAAAAEAAAEABBvxYLARIAQcsWCx4RAAAAABEAAAAACRIAAAAAABIAABIAABoAAAAaGhoAQYIXCw4aAAAAGhoaAAAAAAAACQBBsxcLARQAQb8XCxUXAAAAABcAAAAACRQAAAAAABQAABQAQe0XCwEWAEH5FwsnFQAAAAAVAAAAAAkWAAAAAAAWAAAWAAAwMTIzNDU2Nzg5QUJDREVGAEGgGAvRAXRlc3RpbmcKAAAAAAAAAABUaGUgQ29uc2NpZW5jZSBvZiBhIEhhY2tlciBpcyBhIHNtYWxsIGVzc2F5IHdyaXR0ZW4gSmFudWFyeSA4LCAxOTg2IGJ5IGEgY29tcHV0ZXIgc2VjdXJpdHkgaGFja2VyIHdobyB3ZW50IGJ5IHRoZSBoYW5kbGUgb2YgVGhlIE1lbnRvciwgd2hvIGJlbG9uZ2VkIHRvIHRoZSAybmQgZ2VuZXJhdGlvbiBvZiBMZWdpb24gb2YgRG9vbS4AAAAFAEH8GQsBAQBBlBoLDgIAAAADAAAAqBEAAAAEAEGsGgsBAQBBvBoLBf////8K";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;wasmExports=exports;wasmMemory=wasmExports["e"];updateMemoryViews();wasmTable=wasmExports["h"];addOnInit(wasmExports["f"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={3456:()=>Module.getRandomValue(),3492:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var _emscripten_memcpy_big=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var SYSCALLS={varargs:undefined,get(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr(ptr){var ret=UTF8ToString(ptr);return ret}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={d:___assert_fail,b:_emscripten_asm_const_int,c:_emscripten_memcpy_big,a:_fd_write};var asm=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["f"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["g"])(a0,a1);var ___errno_location=()=>(___errno_location=wasmExports["__errno_location"])();function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
