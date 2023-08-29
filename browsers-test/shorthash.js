var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var wasmExports;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;wasmExports=exports;wasmMemory=wasmExports["e"];updateMemoryViews();wasmTable=wasmExports["h"];addOnInit(wasmExports["f"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={1968:()=>Module.getRandomValue(),2004:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var _emscripten_memcpy_big=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var SYSCALLS={varargs:undefined,get(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr(ptr){var ret=UTF8ToString(ptr);return ret}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={d:___assert_fail,b:_emscripten_asm_const_int,c:_emscripten_memcpy_big,a:_fd_write};var asm=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["f"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["g"])(a0,a1);var ___errno_location=()=>(___errno_location=wasmExports["__errno_location"])();function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
