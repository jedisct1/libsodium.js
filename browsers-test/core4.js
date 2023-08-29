var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var wasmExports;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;wasmExports=exports;wasmMemory=wasmExports["d"];updateMemoryViews();wasmTable=wasmExports["g"];addOnInit(wasmExports["e"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={1760:()=>Module.getRandomValue(),1796:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var _emscripten_memcpy_big=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var printCharBuffers=[null,[],[]];var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var SYSCALLS={varargs:undefined,get(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr(ptr){var ret=UTF8ToString(ptr);return ret}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={b:_emscripten_asm_const_int,c:_emscripten_memcpy_big,a:_fd_write};var asm=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["e"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["f"])(a0,a1);var ___errno_location=()=>(___errno_location=wasmExports["__errno_location"])();function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
