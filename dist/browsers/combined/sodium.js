var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports === 'object' &&
               typeof exports.nodeName !== 'string') {
        factory(exports);
    } else {
        factory(root.libsodium = {});
    }
})(this, function (exports) {
    "use strict";
    var Module = exports;
    Object.defineProperty(exports, '__esModule', { value: true });
var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){if(Module["ENVIRONMENT"]==="WEB"){ENVIRONMENT_IS_WEB=true}else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true}else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true}else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true}else{throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.")}}else{ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER}if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=console.log;if(!Module["printErr"])Module["printErr"]=console.warn;var nodeFS;var nodePath;Module["read"]=function read(filename,binary){if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};Module["load"]=function load(f){globalEval(read(f))};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}}Module["arguments"]=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function read(){throw"no read() available (jsc?)"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response)}else{onerror()}};xhr.onerror=onerror;xhr.send(null)};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function printErr(x){console.warn(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=(function(title){document.title=title})}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){abort("NO_DYNAMIC_EXECUTION=1 was set, cannot eval")}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var Runtime={setTempRet0:(function(value){tempRet0=value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4}}else{assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[null,null,null,null,null,null,null,null],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 1*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-1)/1]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func)}}else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return Runtime.dynCall(sig,func,[arg])}}else{sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments))}}}return sigCache[func]}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=DYNAMICTOP;DYNAMICTOP=DYNAMICTOP+size|0;DYNAMICTOP=DYNAMICTOP+15&-16;if(DYNAMICTOP>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){DYNAMICTOP=ret;return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var ABORT=false;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];if(!func){abort("NO_DYNAMIC_EXECUTION=1 was set, cannot eval")}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){ret=Runtime.stackAlloc((str.length<<2)+1);writeStringToMemory(str,ret)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push((function(){Runtime.stackRestore(stack)}));return}Runtime.stackRestore(stack)}return ret};cwrap=function cwrap(ident,returnType,argTypes){return(function(){return ccall(ident,returnType,argTypes,arguments)})}}))();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[typeof _malloc==="function"?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(typeof _sbrk!=="undefined"&&!_sbrk.called||!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size)}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return Module["UTF8ToString"](ptr)}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}Module["stringToAscii"]=stringToAscii;function UTF8ArrayToString(u8Array,idx){var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}Module["lengthBytesUTF8"]=lengthBytesUTF8;function demangle(func){var hasLibcxxabi=!!Module["___cxa_demangle"];if(hasLibcxxabi){try{var buf=_malloc(func.length);writeStringToMemory(func.substr(1),buf);var status=_malloc(4);var ret=Module["___cxa_demangle"](buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}return func}Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");return func}function demangleAll(text){return text.replace(/__Z[\w\d_]+/g,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js)}Module["stackTrace"]=stackTrace;var PAGE_SIZE=4096;function alignMemoryPage(x){if(x%4096>0){x+=4096-x%4096}return x}var HEAP;var buffer;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE=0,STATICTOP=0,staticSealed=false;var STACK_BASE=0,STACKTOP=0,STACK_MAX=0;var DYNAMIC_BASE=0,DYNAMICTOP=0;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||131072;var totalMemory=64*1024;while(totalMemory<TOTAL_MEMORY||totalMemory<2*TOTAL_STACK){if(totalMemory<16*1024*1024){totalMemory*=2}else{totalMemory+=16*1024*1024}}if(totalMemory!==TOTAL_MEMORY){TOTAL_MEMORY=totalMemory}if(Module["buffer"]){buffer=Module["buffer"]}else{buffer=new ArrayBuffer(TOTAL_MEMORY)}updateGlobalBufferViews();HEAP32[0]=255;if(HEAPU8[0]!==255||HEAPU8[3]!==0)throw"Typed arrays 2 must be run on a little-endian system";Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Runtime.dynCall("v",func)}else{Runtime.dynCall("vi",func,[callback.arg])}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){var array=intArrayFromString(string,dontAddNull);var i=0;while(i<array.length){var chr=array[i];HEAP8[buffer+i>>0]=chr;i=i+1}}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){for(var i=0;i<array.length;i++){HEAP8[buffer++>>0]=array[i]}}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];if(!Math["clz32"])Math["clz32"]=(function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i}return 32});Math.clz32=Math["clz32"];if(!Math["trunc"])Math["trunc"]=(function(x){return x<0?Math.ceil(x):Math.floor(x)});Math.trunc=Math["trunc"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_min=Math.min;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var ASM_CONSTS=[(function(){{return Module.getRandomValue()}}),(function(){{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self,crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto,randomValuesStandard=(function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0});randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto"),randomValueNodeJS=(function(){var buf=crypto.randomBytes(4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0});randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}})];function _emscripten_asm_const_i(code){return ASM_CONSTS[code]()}function _emscripten_asm_const_v(code){return ASM_CONSTS[code]()}STATIC_BASE=8;STATICTOP=STATIC_BASE+34176;__ATINIT__.push();allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38,232,149,143,194,178,39,176,69,195,244,137,242,239,152,240,213,223,172,5,211,198,51,57,177,56,2,136,109,83,252,5,199,23,106,112,61,77,216,79,186,60,11,118,13,16,103,15,42,32,83,250,44,57,204,198,78,199,253,119,146,172,3,122,19,232,149,143,194,178,39,176,69,195,244,137,242,239,152,240,213,223,172,5,211,198,51,57,177,56,2,136,109,83,252,133,180,23,106,112,61,77,216,79,186,60,11,118,13,16,103,15,42,32,83,250,44,57,204,198,78,199,253,119,146,172,3,250,236,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,237,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,238,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,217,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,218,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,219,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,8,201,188,243,103,230,9,106,59,167,202,132,133,174,103,187,43,248,148,254,114,243,110,60,241,54,29,95,58,245,79,165,209,130,230,173,127,82,14,81,31,108,62,43,140,104,5,155,107,189,65,251,171,217,131,31,121,33,126,19,25,205,224,91,182,120,89,255,133,114,211,0,189,110,21,255,15,10,106,0,41,192,1,0,152,232,121,255,188,60,160,255,153,113,206,255,0,183,226,254,180,13,72,255,176,160,14,254,211,201,134,255,158,24,143,0,127,105,53,0,96,12,189,0,167,215,251,255,159,76,128,254,106,101,225,255,30,252,4,0,146,12,174,0,89,241,178,254,10,229,166,255,123,221,42,254,30,20,212,0,82,128,3,0,48,209,243,0,119,121,64,255,50,227,156,255,0,110,197,1,103,27,144,0,133,59,140,1,189,241,36,255,248,37,195,1,96,220,55,0,183,76,62,255,195,66,61,0,50,76,164,1,225,164,76,255,76,61,163,255,117,62,31,0,81,145,64,255,118,65,14,0,162,115,214,255,6,138,46,0,124,230,244,255,10,138,143,0,52,26,194,0,184,244,76,0,129,143,41,1,190,244,19,255,123,170,122,255,98,129,68,0,121,213,147,0,86,101,30,255,161,103,155,0,140,89,67,255,239,229,190,1,67,11,181,0,198,240,137,254,238,69,188,255,67,151,238,0,19,42,108,255,229,85,113,1,50,68,135,255,17,106,9,0,50,103,1,255,80,1,168,1,35,152,30,255,16,168,185,1,56,89,232,255,101,210,252,0,41,250,71,0,204,170,79,255,14,46,239,255,80,77,239,0,189,214,75,255,17,141,249,0,38,80,76,255,190,85,117,0,86,228,170,0,156,216,208,1,195,207,164,255,150,66,76,255,175,225,16,255,141,80,98,1,76,219,242,0,198,162,114,0,46,218,152,0,155,43,241,254,155,160,104,255,51,187,165,0,2,17,175,0,66,84,160,1,247,58,30,0,35,65,53,254,69,236,191,0,45,134,245,1,163,123,221,0,32,110,20,255,52,23,165,0,186,214,71,0,233,176,96,0,242,239,54,1,57,89,138,0,83,0,84,255,136,160,100,0,92,142,120,254,104,124,190,0,181,177,62,255,250,41,85,0,152,130,42,1,96,252,246,0,151,151,63,254,239,133,62,0,32,56,156,0,45,167,189,255,142,133,179,1,131,86,211,0,187,179,150,254,250,170,14,255,210,163,78,0,37,52,151,0,99,77,26,0,238,156,213,255,213,192,209,1,73,46,84,0,20,65,41,1,54,206,79,0,201,131,146,254,170,111,24,255,177,33,50,254,171,38,203,255,78,247,116,0,209,221,153,0,133,128,178,1,58,44,25,0,201,39,59,1,189,19,252,0,49,229,210,1,117,187,117,0,181,179,184,1,0,114,219,0,48,94,147,0,245,41,56,0,125,13,204,254,244,173,119,0,44,221,32,254,84,234,20,0,249,160,198,1,236,126,234,255,47,99,168,254,170,226,153,255,102,179,216,0,226,141,122,255,122,66,153,254,182,245,134,0,227,228,25,1,214,57,235,255,216,173,56,255,181,231,210,0,119,128,157,255,129,95,136,255,110,126,51,0,2,169,183,255,7,130,98,254,69,176,94,255,116,4,227,1,217,242,145,255,202,173,31,1,105,1,39,255,46,175,69,0,228,47,58,255,215,224,69,254,207,56,69,255,16,254,139,255,23,207,212,255,202,20,126,255,95,213,96,255,9,176,33,0,200,5,207,255,241,42,128,254,35,33,192,255,248,229,196,1,129,17,120,0,251,103,151,255,7,52,112,255,140,56,66,255,40,226,245,255,217,70,37,254,172,214,9,255,72,67,134,1,146,192,214,255,44,38,112,0,68,184,75,255,206,90,251,0,149,235,141,0,181,170,58,0,116,244,239,0,92,157,2,0,102,173,98,0,233,137,96,1,127,49,203,0,5,155,148,0,23,148,9,255,211,122,12,0,34,134,26,255,219,204,136,0,134,8,41,255,224,83,43,254,85,25,247,0,109,127,0,254,169,136,48,0,238,119,219,255,231,173,213,0,206,18,254,254,8,186,7,255,126,9,7,1,111,42,72,0,111,52,236,254,96,63,141,0,147,191,127,254,205,78,192,255,14,106,237,1,187,219,76,0,175,243,187,254,105,89,173,0,85,25,89,1,162,243,148,0,2,118,209,254,33,158,9,0,139,163,46,255,93,70,40,0,108,42,142,254,111,252,142,255,155,223,144,0,51,229,167,255,73,252,155,255,94,116,12,255,152,160,218,255,156,238,37,255,179,234,207,255,197,0,179,255,154,164,141,0,225,196,104,0,10,35,25,254,209,212,242,255,97,253,222,254,184,101,229,0,222,18,127,1,164,136,135,255,30,207,140,254,146,97,243,0,129,192,26,254,201,84,33,255,111,10,78,255,147,81,178,255,4,4,24,0,161,238,215,255,6,141,33,0,53,215,14,255,41,181,208,255,231,139,157,0,179,203,221,255,255,185,113,0,189,226,172,255,113,66,214,255,202,62,45,255,102,64,8,255,78,174,16,254,133,117,68,255,133,59,140,1,189,241,36,255,248,37,195,1,96,220,55,0,183,76,62,255,195,66,61,0,50,76,164,1,225,164,76,255,76,61,163,255,117,62,31,0,81,145,64,255,118,65,14,0,162,115,214,255,6,138,46,0,124,230,244,255,10,138,143,0,52,26,194,0,184,244,76,0,129,143,41,1,190,244,19,255,123,170,122,255,98,129,68,0,121,213,147,0,86,101,30,255,161,103,155,0,140,89,67,255,239,229,190,1,67,11,181,0,198,240,137,254,238,69,188,255,234,113,60,255,37,255,57,255,69,178,182,254,128,208,179,0,118,26,125,254,3,7,214,255,241,50,77,255,85,203,197,255,211,135,250,255,25,48,100,255,187,213,180,254,17,88,105,0,83,209,158,1,5,115,98,0,4,174,60,254,171,55,110,255,217,181,17,255,20,188,170,0,146,156,102,254,87,214,174,255,114,122,155,1,233,44,170,0,127,8,239,1,214,236,234,0,175,5,219,0,49,106,61,255,6,66,208,255,2,106,110,255,81,234,19,255,215,107,192,255,67,151,238,0,19,42,108,255,229,85,113,1,50,68,135,255,17,106,9,0,50,103,1,255,80,1,168,1,35,152,30,255,16,168,185,1,56,89,232,255,101,210,252,0,41,250,71,0,204,170,79,255,14,46,239,255,80,77,239,0,189,214,75,255,17,141,249,0,38,80,76,255,190,85,117,0,86,228,170,0,156,216,208,1,195,207,164,255,150,66,76,255,175,225,16,255,141,80,98,1,76,219,242,0,198,162,114,0,46,218,152,0,155,43,241,254,155,160,104,255,178,9,252,254,100,110,212,0,14,5,167,0,233,239,163,255,28,151,157,1,101,146,10,255,254,158,70,254,71,249,228,0,88,30,50,0,68,58,160,255,191,24,104,1,129,66,129,255,192,50,85,255,8,179,138,255,38,250,201,0,115,80,160,0,131,230,113,0,125,88,147,0,90,68,199,0,253,76,158,0,28,255,118,0,113,250,254,0,66,75,46,0,230,218,43,0,229,120,186,1,148,68,43,0,136,124,238,1,187,107,197,255,84,53,246,255,51,116,254,255,51,187,165,0,2,17,175,0,66,84,160,1,247,58,30,0,35,65,53,254,69,236,191,0,45,134,245,1,163,123,221,0,32,110,20,255,52,23,165,0,186,214,71,0,233,176,96,0,242,239,54,1,57,89,138,0,83,0,84,255,136,160,100,0,92,142,120,254,104,124,190,0,181,177,62,255,250,41,85,0,152,130,42,1,96,252,246,0,151,151,63,254,239,133,62,0,32,56,156,0,45,167,189,255,142,133,179,1,131,86,211,0,187,179,150,254,250,170,14,255,68,113,21,255,222,186,59,255,66,7,241,1,69,6,72,0,86,156,108,254,55,167,89,0,109,52,219,254,13,176,23,255,196,44,106,255,239,149,71,255,164,140,125,255,159,173,1,0,51,41,231,0,145,62,33,0,138,111,93,1,185,83,69,0,144,115,46,0,97,151,16,255,24,228,26,0,49,217,226,0,113,75,234,254,193,153,12,255,182,48,96,255,14,13,26,0,128,195,249,254,69,193,59,0,132,37,81,254,125,106,60,0,214,240,169,1,164,227,66,0,210,163,78,0,37,52,151,0,99,77,26,0,238,156,213,255,213,192,209,1,73,46,84,0,20,65,41,1,54,206,79,0,201,131,146,254,170,111,24,255,177,33,50,254,171,38,203,255,78,247,116,0,209,221,153,0,133,128,178,1,58,44,25,0,201,39,59,1,189,19,252,0,49,229,210,1,117,187,117,0,181,179,184,1,0,114,219,0,48,94,147,0,245,41,56,0,125,13,204,254,244,173,119,0,44,221,32,254,84,234,20,0,249,160,198,1,236,126,234,255,143,62,221,0,129,89,214,255,55,139,5,254,68,20,191,255,14,204,178,1,35,195,217,0,47,51,206,1,38,246,165,0,206,27,6,254,158,87,36,0,217,52,146,255,125,123,215,255,85,60,31,255,171,13,7,0,218,245,88,254,252,35,60,0,55,214,160,255,133,101,56,0,224,32,19,254,147,64,234,0,26,145,162,1,114,118,125,0,248,252,250,0,101,94,196,255,198,141,226,254,51,42,182,0,135,12,9,254,109,172,210,255,197,236,194,1,241,65,154,0,48,156,47,255,153,67,55,255,218,165,34,254,74,180,179,0,218,66,71,1,88,122,99,0,212,181,219,255,92,42,231,255,239,0,154,0,245,77,183,255,94,81,170,1,18,213,216,0,171,93,71,0,52,94,248,0,18,151,161,254,197,209,66,255,174,244,15,254,162,48,183,0,49,61,240,254,182,93,195,0,199,228,6,1,200,5,17,255,137,45,237,255,108,148,4,0,90,79,237,255,39,63,77,255,53,82,207,1,142,22,118,255,101,232,18,1,92,26,67,0,5,200,88,255,33,168,138,255,149,225,72,0,2,209,27,255,44,245,168,1,220,237,17,255,30,211,105,254,141,238,221,0,128,80,245,254,111,254,14,0,222,95,190,1,223,9,241,0,146,76,212,255,108,205,104,255,63,117,153,0,144,69,48,0,35,228,111,0,192,33,193,255,112,214,190,254,115,152,151,0,23,102,88,0,51,74,248,0,226,199,143,254,204,162,101,255,208,97,189,1,245,104,18,0,230,246,30,255,23,148,69,0,110,88,52,254,226,181,89,255,208,47,90,254,114,161,80,255,33,116,248,0,179,152,87,255,69,144,177,1,88,238,26,255,58,32,113,1,1,77,69,0,59,121,52,255,152,238,83,0,52,8,193,0,231,39,233,255,199,34,138,0,222,68,173,0,91,57,242,254,220,210,127,255,192,7,246,254,151,35,187,0,195,236,165,0,111,93,206,0,212,247,133,1,154,133,209,255,155,231,10,0,64,78,38,0,122,249,100,1,30,19,97,255,62,91,249,1,248,133,77,0,197,63,168,254,116,10,82,0,184,236,113,254,212,203,194,255,61,100,252,254,36,5,202,255,119,91,153,255,129,79,29,0,103,103,171,254,237,215,111,255,216,53,69,0,239,240,23,0,194,149,221,255,38,225,222,0,232,255,180,254,118,82,133,255,57,209,177,1,139,232,133,0,158,176,46,254,194,115,46,0,88,247,229,1,28,103,191,0,221,222,175,254,149,235,44,0,151,228,25,254,218,105,103,0,142,85,210,0,149,129,190,255,213,65,94,254,117,134,224,255,82,198,117,0,157,221,220,0,163,101,36,0,197,114,37,0,104,172,166,254,11,182,0,0,81,72,188,255,97,188,16,255,69,6,10,0,199,147,145,255,8,9,115,1,65,214,175,255,217,173,209,0,80,127,166,0,247,229,4,254,167,183,124,255,90,28,204,254,175,59,240,255,11,41,248,1,108,40,51,255,144,177,195,254,150,250,126,0,138,91,65,1,120,60,222,255,245,193,239,0,29,214,189,255,128,2,25,0,80,154,162,0,77,220,107,1,234,205,74,255,54,166,103,255,116,72,9,0,228,94,47,255,30,200,25,255,35,214,89,255,61,176,140,255,83,226,163,255,75,130,172,0,128,38,17,0,95,137,152,255,215,124,159,1,79,93,0,0,148,82,157,254,195,130,251,255,40,202,76,255,251,126,224,0,157,99,62,254,207,7,225,255,96,68,195,0,140,186,157,255,131,19,231,255,42,128,254,0,52,219,61,254,102,203,72,0,141,7,11,255,186,164,213,0,31,122,119,0,133,242,145,0,208,252,232,255,91,213,182,255,143,4,250,254,249,215,74,0,165,30,111,1,171,9,223,0,229,123,34,1,92,130,26,255,77,155,45,1,195,139,28,255,59,224,78,0,136,17,247,0,108,121,32,0,79,250,189,255,96,227,252,254,38,241,62,0,62,174,125,255,155,111,93,255,10,230,206,1,97,197,40,255,0,49,57,254,65,250,13,0,18,251,150,255,220,109,210,255,5,174,166,254,44,129,189,0,235,35,147,255,37,247,141,255,72,141,4,255,103,107,255,0,247,90,4,0,53,44,42,0,2,30,240,0,4,59,63,0,88,78,36,0,113,167,180,0,190,71,193,255,199,158,164,255,58,8,172,0,77,33,12,0,65,63,3,0,153,77,33,255,172,254,102,1,228,221,4,255,87,30,254,1,146,41,86,255,138,204,239,254,108,141,17,255,187,242,135,0,210,208,127,0,68,45,14,254,73,96,62,0,81,60,24,255,170,6,36,255,3,249,26,0,35,213,109,0,22,129,54,255,21,35,225,255,234,61,56,255,58,217,6,0,143,124,88,0,236,126,66,0,209,38,183,255,34,238,6,255,174,145,102,0,95,22,211,0,196,15,153,254,46,84,232,255,117,34,146,1,231,250,74,255,27,134,100,1,92,187,195,255,170,198,112,0,120,28,42,0,209,70,67,0,29,81,31,0,29,168,100,1,169,173,160,0,107,35,117,0,62,96,59,255,81,12,69,1,135,239,190,255,220,252,18,0,163,220,58,255,137,137,188,255,83,102,109,0,96,6,76,0,234,222,210,255,185,174,205,1,60,158,213,255,13,241,214,0,172,129,140,0,93,104,242,0,192,156,251,0,43,117,30,0,225,81,158,0,127,232,218,0,226,28,203,0,233,27,151,255,117,43,5,255,242,14,47,255,33,20,6,0,137,251,44,254,27,31,245,255,183,214,125,254,40,121,149,0,186,158,213,255,89,8,227,0,69,88,0,254,203,135,225,0,201,174,203,0,147,71,184,0,18,121,41,254,94,5,78,0,224,214,240,254,36,5,180,0,251,135,231,1,163,138,212,0,210,249,116,254,88,129,187,0,19,8,49,254,62,14,144,255,159,76,211,0,214,51,82,0,109,117,228,254,103,223,203,255,75,252,15,1,154,71,220,255,23,13,91,1,141,168,96,255,181,182,133,0,250,51,55,0,234,234,212,254,175,63,158,0,39,240,52,1,158,189,36,255,213,40,85,1,32,180,247,255,19,102,26,1,84,24,97,255,69,21,222,0,148,139,122,255,220,213,235,1,232,203,255,0,121,57,147,0,227,7,154,0,53,22,147,1,72,1,225,0,82,134,48,254,83,60,157,255,145,72,169,0,34,103,239,0,198,233,47,0,116,19,4,255,184,106,9,255,183,129,83,0,36,176,230,1,34,103,72,0,219,162,134,0,245,42,158,0,32,149,96,254,165,44,144,0,202,239,72,254,215,150,5,0,42,66,36,1,132,215,175,0,86,174,86,255,26,197,156,255,49,232,135,254,103,182,82,0,253,128,176,1,153,178,122,0,245,250,10,0,236,24,178,0,137,106,132,0,40,29,41,0,50,30,152,255,124,105,38,0,230,191,75,0,143,43,170,0,44,131,20,255,44,13,23,255,237,255,155,1,159,109,100,255,112,181,24,255,104,220,108,0,55,211,131,0,99,12,213,255,152,151,145,255,238,5,159,0,97,155,8,0,33,108,81,0,1,3,103,0,62,109,34,255,250,155,180,0,32,71,195,255,38,70,145,1,159,95,245,0,69,229,101,1,136,28,240,0,79,224,25,0,78,110,121,255,248,168,124,0,187,128,247,0,2,147,235,254,79,11,132,0,70,58,12,1,181,8,163,255,79,137,133,255,37,170,11,255,141,243,85,255,176,231,215,255,204,150,164,255,239,215,39,255,46,87,156,254,8,163,88,255,172,34,232,0,66,44,102,255,27,54,41,254,236,99,87,255,41,123,169,1,52,114,43,0,117,134,40,0,155,134,26,0,231,207,91,254,35,132,38,255,19,102,125,254,36,227,133,255,118,3,113,255,29,13,124,0,152,96,74,1,88,146,206,255,167,191,220,254,162,18,88,255,182,100,23,0,31,117,52,0,81,46,106,1,12,2,7,0,69,80,201,1,209,246,172,0,12,48,141,1,224,211,88,0,116,226,159,0,122,98,130,0,65,236,234,1,225,226,9,255,207,226,123,1,89,214,59,0,112,135,88,1,90,244,203,255,49,11,38,1,129,108,186,0,89,112,15,1,101,46,204,255,127,204,45,254,79,255,221,255,51,73,18,255,127,42,101,255,241,21,202,0,160,227,7,0,105,50,236,0,79,52,197,255,104,202,208,1,180,15,16,0,101,197,78,255,98,77,203,0,41,185,241,1,35,193,124,0,35,155,23,255,207,53,192,0,11,125,163,1,249,158,185,255,4,131,48,0,21,93,111,255,61,121,231,1,69,200,36,255,185,48,185,255,111,238,21,255,39,50,25,255,99,215,163,255,87,212,30,255,164,147,5,255,128,6,35,1,108,223,110,255,194,76,178,0,74,101,180,0,243,47,48,0,174,25,43,255,82,173,253,1,54,114,192,255,40,55,91,0,215,108,176,255,11,56,7,0,224,233,76,0,209,98,202,254,242,25,125,0,44,193,93,254,203,8,177,0,135,176,19,0,112,71,213,255,206,59,176,1,4,67,26,0,14,143,213,254,42,55,208,255,60,67,120,0,193,21,163,0,99,164,115,0,10,20,118,0,156,212,222,254,160,7,217,255,114,245,76,1,117,59,123,0,176,194,86,254,213,15,176,0,78,206,207,254,213,129,59,0,233,251,22,1,96,55,152,255,236,255,15,255,197,89,84,255,93,149,133,0,174,160,113,0,234,99,169,255,152,116,88,0,144,164,83,255,95,29,198,255,34,47,15,255,99,120,134,255,5,236,193,0,249,247,126,255,147,187,30,0,50,230,117,255,108,217,219,255,163,81,166,255,72,25,169,254,155,121,79,255,28,155,89,254,7,126,17,0,147,65,33,1,47,234,253,0,26,51,18,0,105,83,199,255,163,196,230,0,113,248,164,0,226,254,218,0,189,209,203,255,164,247,222,254,255,35,165,0,4,188,243,1,127,179,71,0,37,237,254,255,100,186,240,0,5,57,71,254,103,72,73,255,244,18,81,254,229,210,132,255,238,6,180,255,11,229,174,255,227,221,192,1,17,49,28,0,163,215,196,254,9,118,4,255,51,240,71,0,113,129,109,255,76,240,231,0,188,177,127,0,125,71,44,1,26,175,243,0,94,169,25,254,27,230,29,0,15,139,119,1,168,170,186,255,172,197,76,255,252,75,188,0,137,124,196,0,72,22,96,255,45,151,249,1,220,145,100,0,64,192,159,255,120,239,226,0,129,178,146,0,0,192,125,0,235,138,234,0,183,157,146,0,83,199,192,255,184,172,72,255,73,225,128,0,77,6,250,255,186,65,67,0,104,246,207,0,188,32,138,255,218,24,242,0,67,138,81,254,237,129,121,255,20,207,150,1,41,199,16,255,6,20,128,0,159,118,5,0,181,16,143,255,220,38,15,0,23,64,147,254,73,26,13,0,87,228,57,1,204,124,128,0,43,24,223,0,219,99,199,0,22,75,20,255,19,27,126,0,157,62,215,0,110,29,230,0,179,167,255,1,54,252,190,0,221,204,182,254,179,158,65,255,81,157,3,0,194,218,159,0,170,223,0,0,224,11,32,255,38,197,98,0,168,164,37,0,23,88,7,1,164,186,110,0,96,36,134,0,234,242,229,0,250,121,19,0,242,254,112,255,3,47,94,1,9,239,6,255,81,134,153,254,214,253,168,255,67,124,224,0,245,95,74,0,28,30,44,254,1,109,220,255,178,89,89,0,252,36,76,0,24,198,46,255,76,77,111,0,134,234,136,255,39,94,29,0,185,72,234,255,70,68,135,255,231,102,7,254,77,231,140,0,167,47,58,1,148,97,118,255,16,27,225,1,166,206,143,255,110,178,214,255,180,131,162,0,143,141,225,1,13,218,78,255,114,153,33,1,98,104,204,0,175,114,117,1,167,206,75,0,202,196,83,1,58,64,67,0,138,47,111,1,196,247,128,255,137,224,224,254,158,112,207,0,154,100,255,1,134,37,107,0,198,128,79,255,127,209,155,255,163,254,185,254,60,14,243,0,31,219,112,254,29,217,65,0,200,13,116,254,123,60,196,255,224,59,184,254,242,89,196,0,123,16,75,254,149,16,206,0,69,254,48,1,231,116,223,255,209,160,65,1,200,80,98,0,37,194,184,254,148,63,34,0,139,240,65,255,217,144,132,255,56,38,45,254,199,120,210,0,108,177,166,255,160,222,4,0,220,126,119,254,165,107,160,255,82,220,248,1,241,175,136,0,144,141,23,255,169,138,84,0,160,137,78,255,226,118,80,255,52,27,132,255,63,96,139,255,152,250,39,0,188,155,15,0,232,51,150,254,40,15,232,255,240,229,9,255,137,175,27,255,75,73,97,1,218,212,11,0,135,5,162,1,107,185,213,0,2,249,107,255,40,242,70,0,219,200,25,0,25,157,13,0,67,82,80,255,196,249,23,255,145,20,149,0,50,72,146,0,94,76,148,1,24,251,65,0,31,192,23,0,184,212,201,255,123,233,162,1,247,173,72,0,162,87,219,254,126,134,89,0,159,11,12,254,166,105,29,0,73,27,228,1,113,120,183,255,66,163,109,1,212,143,11,255,159,231,168,1,255,128,90,0,57,14,58,254,89,52,10,255,253,8,163,1,0,145,210,255,10,129,85,1,46,181,27,0,103,136,160,254,126,188,209,255,34,35,111,0,215,219,24,255,212,11,214,254,101,5,118,0,232,197,133,255,223,167,109,255,237,80,86,255,70,139,94,0,158,193,191,1,155,15,51,255,15,190,115,0,78,135,207,255,249,10,27,1,181,125,233,0,95,172,13,254,170,213,161,255,39,236,138,255,95,93,87,255,190,128,95,0,125,15,206,0,166,150,159,0,227,15,158,255,206,158,120,255,42,141,128,0,101,178,120,1,156,109,131,0,218,14,44,254,247,168,206,255,212,112,28,0,112,17,228,255,90,16,37,1,197,222,108,0,254,207,83,255,9,90,243,255,243,244,172,0,26,88,115,255,205,116,122,0,191,230,193,0,180,100,11,1,217,37,96,255,154,78,156,0,235,234,31,255,206,178,178,255,149,192,251,0,182,250,135,0,246,22,105,0,124,193,109,255,2,210,149,255,169,17,170,0,0,96,110,255,117,9,8,1,50,123,40,255,193,189,99,0,34,227,160,0,48,80,70,254,211,51,236,0,45,122,245,254,44,174,8,0,173,37,233,255,158,65,171,0,122,69,215,255,90,80,2,255,131,106,96,254,227,114,135,0,205,49,119,254,176,62,64,255,82,51,17,255,241,20,243,255,130,13,8,254,128,217,243,255,162,27,1,254,90,118,241,0,246,198,246,255,55,16,118,255,200,159,157,0,163,17,1,0,140,107,121,0,85,161,118,255,38,0,149,0,156,47,238,0,9,166,166,1,75,98,181,255,50,74,25,0,66,15,47,0,139,225,159,0,76,3,142,255,14,238,184,0,11,207,53,255,183,192,186,1,171,32,174,255,191,76,221,1,247,170,219,0,25,172,50,254,217,9,233,0,203,126,68,255,183,92,48,0,127,167,183,1,65,49,254,0,16,63,127,1,254,21,170,255,59,224,127,254,22,48,63,255,27,78,130,254,40,195,29,0,250,132,112,254,35,203,144,0,104,169,168,0,207,253,30,255,104,40,38,254,94,228,88,0,206,16,128,255,212,55,122,255,223,22,234,0,223,197,127,0,253,181,181,1,145,102,118,0,236,153,36,255,212,217,72,255,20,38,24,254,138,62,62,0,152,140,4,0,230,220,99,255,1,21,212,255,148,201,231,0,244,123,9,254,0,171,210,0,51,58,37,255,1,255,14,255,244,183,145,254,0,242,166,0,22,74,132,0,121,216,41,0,95,195,114,254,133,24,151,255,156,226,231,255,247,5,77,255,246,148,115,254,225,92,81,255,222,80,246,254,170,123,89,255,74,199,141,0,29,20,8,255,138,136,70,255,93,75,92,0,221,147,49,254,52,126,226,0,229,124,23,0,46,9,181,0,205,64,52,1,131,254,28,0,151,158,212,0,131,64,78,0,206,25,171,0,0,230,139,0,191,253,110,254,103,247,167,0,64,40,40,1,42,165,241,255,59,75,228,254,124,243,189,255,196,92,178,255,130,140,86,255,141,89,56,1,147,198,5,255,203,248,158,254,144,162,141,0,11,172,226,0,130,42,21,255,1,167,143,255,144,36,36,255,48,88,164,254,168,170,220,0,98,71,214,0,91,208,79,0,159,76,201,1,166,42,214,255,69,255,0,255,6,128,125,255,190,1,140,0,146,83,218,255,215,238,72,1,122,127,53,0,189,116,165,255,84,8,66,255,214,3,208,255,213,110,133,0,195,168,44,1,158,231,69,0,162,64,200,254,91,58,104,0,182,58,187,254,249,228,136,0,203,134,76,254,99,221,233,0,75,254,214,254,80,69,154,0,64,152,248,254,236,136,202,255,157,105,153,254,149,175,20,0,22,35,19,255,124,121,233,0,186,250,198,254,132,229,139,0,137,80,174,255,165,125,68,0,144,202,148,254,235,239,248,0,135,184,118,0,101,94,17,255,122,72,70,254,69,130,146,0,127,222,248,1,69,127,118,255,30,82,215,254,188,74,19,255,229,167,194,254,117,25,66,255,65,234,56,254,213,22,156,0,151,59,93,254,45,28,27,255,186,126,164,255,32,6,239,0,127,114,99,1,219,52,2,255,99,96,166,254,62,190,126,255,108,222,168,1,75,226,174,0,230,226,199,0,60,117,218,255,252,248,20,1,214,188,204,0,31,194,134,254,123,69,192,255,169,173,36,254,55,98,91,0,223,42,102,254,137,1,102,0,157,90,25,0,239,122,64,255,252,6,233,0,7,54,20,255,82,116,174,0,135,37,54,255,15,186,125,0,227,112,175,255,100,180,225,255,42,237,244,255,244,173,226,254,248,18,33,0,171,99,150,255,74,235,50,255,117,82,32,254,106,168,237,0,207,109,208,1,228,9,186,0,135,60,169,254,179,92,143,0,244,170,104,255,235,45,124,255,70,99,186,0,117,137,183,0,224,31,215,0,40,9,100,0,26,16,95,1,68,217,87,0,8,151,20,255,26,100,58,255,176,165,203,1,52,118,70,0,7,32,254,254,244,254,245,255,167,144,194,255,125,113,23,255,176,121,181,0,136,84,209,0,138,6,30,255,89,48,28,0,33,155,14,255,25,240,154,0,141,205,109,1,70,115,62,255,20,40,107,254,138,154,199,255,94,223,226,255,157,171,38,0,163,177,25,254,45,118,3,255,14,222,23,1,209,190,81,255,118,123,232,1,13,213,101,255,123,55,123,254,27,246,165,0,50,99,76,255,140,214,32,255,97,65,67,255,24,12,28,0,174,86,78,1,64,247,96,0,160,135,67,0,66,55,243,255,147,204,96,255,26,6,33,255,98,51,83,1,153,213,208,255,2,184,54,255,25,218,11,0,49,67,246,254,18,149,72,255,13,25,72,0,42,79,214,0,42,4,38,1,27,139,144,255,149,187,23,0,18,164,132,0,245,84,184,254,120,198,104,255,126,218,96,0,56,117,234,255,13,29,214,254,68,47,10,255,167,154,132,254,152,38,198,0,66,178,89,255,200,46,171,255,13,99,83,255,210,187,253,255,170,45,42,1,138,209,124,0,214,162,141,0,12,230,156,0,102,36,112,254,3,147,67,0,52,215,123,255,233,171,54,255,98,137,62,0,247,218,39,255,231,218,236,0,247,191,127,0,195,146,84,0,165,176,92,255,19,212,94,255,17,74,227,0,88,40,153,1,198,147,1,255,206,67,245,254,240,3,218,255,61,141,213,255,97,183,106,0,195,232,235,254,95,86,154,0,209,48,205,254,118,209,241,255,240,120,223,1,213,29,159,0,163,127,147,255,13,218,93,0,85,24,68,254,70,20,80,255,189,5,140,1,82,97,254,255,99,99,191,255,132,84,133,255,107,218,116,255,112,122,46,0,105,17,32,0,194,160,63,255,68,222,39,1,216,253,92,0,177,105,205,255,149,201,195,0,42,225,11,255,40,162,115,0,9,7,81,0,165,218,219,0,180,22,0,254,29,146,252,255,146,207,225,1,180,135,96,0,31,163,112,0,177,11,219,255,133,12,193,254,43,78,50,0,65,113,121,1,59,217,6,255,110,94,24,1,112,172,111,0,7,15,96,0,36,85,123,0,71,150,21,255,208,73,188,0,192,11,167,1,213,245,34,0,9,230,92,0,162,142,39,255,215,90,27,0,98,97,89,0,94,79,211,0,90,157,240,0,95,220,126,1,102,176,226,0,36,30,224,254,35,31,127,0,231,232,115,1,85,83,130,0,210,73,245,255,47,143,114,255,68,65,197,0,59,72,62,255,183,133,173,254,93,121,118,255,59,177,81,255,234,69,173,255,205,128,177,0,220,244,51,0,26,244,209,1,73,222,77,255,163,8,96,254,150,149,211,0,158,254,203,1,54,127,139,0,161,224,59,0,4,109,22,255,222,42,45,255,208,146,102,255,236,142,187,0,50,205,245,255,10,74,89,254,48,79,142,0,222,76,130,255,30,166,63,0,236,12,13,255,49,184,244,0,187,113,102,0,218,101,253,0,153,57,182,254,32,150,42,0,25,198,146,1,237,241,56,0,140,68,5,0,91,164,172,255,78,145,186,254,67,52,205,0,219,207,129,1,109,115,17,0,54,143,58,1,21,248,120,255,179,255,30,0,193,236,66,255,1,255,7,255,253,192,48,255,19,69,217,1,3,214,0,255,64,101,146,1,223,125,35,255,235,73,179,255,249,167,226,0,225,175,10,1,97,162,58,0,106,112,171,1,84,172,5,255,133,140,178,255,134,245,142,0,97,90,125,255,186,203,185,255,223,77,23,255,192,92,106,0,15,198,115,255,217,152,248,0,171,178,120,255,228,134,53,0,176,54,193,1,250,251,53,0,213,10,100,1,34,199,106,0,151,31,244,254,172,224,87,255,14,237,23,255,253,85,26,255,127,39,116,255,172,104,100,0,251,14,70,255,212,208,138,255,253,211,250,0,176,49,165,0,15,76,123,255,37,218,160,255,92,135,16,1,10,126,114,255,70,5,224,255,247,249,141,0,68,20,60,1,241,210,189,255,195,217,187,1,151,3,113,0,151,92,174,0,231,62,178,255,219,183,225,0,23,23,33,255,205,181,80,0,57,184,248,255,67,180,1,255,90,123,93,255,39,0,162,255,96,248,52,255,84,66,140,0,34,127,228,255,194,138,7,1,166,110,188,0,21,17,155,1,154,190,198,255,214,80,59,255,18,7,143,0,72,29,226,1,199,217,249,0,232,161,71,1,149,190,201,0,217,175,95,254,113,147,67,255,138,143,199,255,127,204,1,0,29,182,83,1,206,230,155,255,186,204,60,0,10,125,85,255,232,96,25,255,255,89,247,255,213,254,175,1,232,193,81,0,28,43,156,254,12,69,8,0,147,24,248,0,18,198,49,0,134,60,35,0,118,246,18,255,49,88,254,254,228,21,186,255,182,65,112,1,219,22,1,255,22,126,52,255,189,53,49,255,112,25,143,0,38,127,55,255,226,101,163,254,208,133,61,255,137,69,174,1,190,118,145,255,60,98,219,255,217,13,245,255,250,136,10,0,84,254,226,0,201,31,125,1,240,51,251,255,31,131,130,255,2,138,50,255,215,215,177,1,223,12,238,255,252,149,56,255,124,91,68,255,72,126,170,254,119,255,100,0,130,135,232,255,14,79,178,0,250,131,197,0,138,198,208,0,121,216,139,254,119,18,36,255,29,193,122,0,16,42,45,255,213,240,235,1,230,190,169,255,198,35,228,254,110,173,72,0,214,221,241,255,56,148,135,0,192,117,78,254,141,93,207,255,143,65,149,0,21,18,98,255,95,44,244,1,106,191,77,0,254,85,8,254,214,110,176,255,73,173,19,254,160,196,199,255,237,90,144,0,193,172,113,255,200,155,136,254,228,90,221,0,137,49,74,1,164,221,215,255,209,189,5,255,105,236,55,255,42,31,129,1,193,255,236,0,46,217,60,0,138,88,187,255,226,82,236,255,81,69,151,255,142,190,16,1,13,134,8,0,127,122,48,255,81,64,156,0,171,243,139,0,237,35,246,0,122,143,193,254,212,122,146,0,95,41,255,1,87,132,77,0,4,212,31,0,17,31,78,0,39,45,173,254,24,142,217,255,95,9,6,255,227,83,6,0,98,59,130,254,62,30,33,0,8,115,211,1,162,97,128,255,7,184,23,254,116,28,168,255,248,138,151,255,98,244,240,0,186,118,130,0,114,248,235,255,105,173,200,1,160,124,71,255,94,36,164,1,175,65,146,255,238,241,170,254,202,198,197,0,228,71,138,254,45,246,109,255,194,52,158,0,133,187,176,0,83,252,154,254,89,189,221,255,170,73,252,0,148,58,125,0,36,68,51,254,42,69,177,255,168,76,86,255,38,100,204,255,38,53,35,0,175,19,97,0,225,238,253,255,81,81,135,0,210,27,255,254,235,73,107,0,8,207,115,0,82,127,136,0,84,99,21,254,207,19,136,0,100,164,101,0,80,208,77,255,132,207,237,255,15,3,15,255,33,166,110,0,156,95,85,255,37,185,111,1,150,106,35,255,166,151,76,0,114,87,135,255,159,194,64,0,12,122,31,255,232,7,101,254,173,119,98,0,154,71,220,254,191,57,53,255,168,232,160,255,224,32,99,255,218,156,165,0,151,153,163,0,217,13,148,1,197,113,89,0,149,28,161,254,207,23,30,0,105,132,227,255,54,230,94,255,133,173,204,255,92,183,157,255,88,144,252,254,102,33,90,0,159,97,3,0,181,218,155,255,240,114,119,0,106,214,53,255,165,190,115,1,152,91,225,255,88,106,44,255,208,61,113,0,151,52,124,0,191,27,156,255,110,54,236,1,14,30,166,255,39,127,207,1,229,199,28,0,188,228,188,254,100,157,235,0,246,218,183,1,107,22,193,255,206,160,95,0,76,239,147,0,207,161,117,0,51,166,2,255,52,117,10,254,73,56,227,255,152,193,225,0,132,94,136,255,101,191,209,0,32,107,229,255,198,43,180,1,100,210,118,0,114,67,153,255,23,88,26,255,89,154,92,1,220,120,140,255,144,114,207,255,252,115,250,255,34,206,72,0,138,133,127,255,8,178,124,1,87,75,97,0,15,229,92,254,240,67,131,255,118,123,227,254,146,120,104,255,145,213,255,1,129,187,70,255,219,119,54,0,1,19,173,0,45,150,148,1,248,83,72,0,203,233,169,1,142,107,56,0,247,249,38,1,45,242,80,255,30,233,103,0,96,82,70,0,23,201,111,0,81,39,30,255,161,183,78,255,194,234,33,255,68,227,140,254,216,206,116,0,70,27,235,255,104,144,79,0,164,230,93,254,214,135,156,0,154,187,242,254,188,20,131,255,36,109,174,0,159,112,241,0,5,110,149,1,36,165,218,0,166,29,19,1,178,46,73,0,93,43,32,254,248,189,237,0,102,155,141,0,201,93,195,255,241,139,253,255,15,111,98,255,108,65,163,254,155,79,190,255,73,174,193,254,246,40,48,255,107,88,11,254,202,97,85,255,253,204,18,255,113,242,66,0,110,160,194,254,208,18,186,0,81,21,60,0,188,104,167,255,124,166,97,254,210,133,142,0,56,242,137,254,41,111,130,0,111,151,58,1,111,213,141,255,183,172,241,255,38,6,196,255,185,7,123,255,46,11,246,0,245,105,119,1,15,2,161,255,8,206,45,255,18,202,74,255,83,124,115,1,212,141,157,0,83,8,209,254,139,15,232,255,172,54,173,254,50,247,132,0,214,189,213,0,144,184,105,0,223,254,248,0,255,147,240,255,23,188,72,0,7,51,54,0,188,25,180,254,220,180,0,255,83,160,20,0,163,189,243,255,58,209,194,255,87,73,60,0,106,24,49,0,245,249,220,0,22,173,167,0,118,11,195,255,19,126,237,0,110,159,37,255,59,82,47,0,180,187,86,0,188,148,208,1,100,37,133,255,7,112,193,0,129,188,156,255,84,106,129,255,133,225,202,0,14,236,111,255,40,20,101,0,172,172,49,254,51,54,74,255,251,185,184,255,93,155,224,255,180,249,224,1,230,178,146,0,72,57,54,254,178,62,184,0,119,205,72,0,185,239,253,255,61,15,218,0,196,67,56,255,234,32,171,1,46,219,228,0,208,108,234,255,20,63,232,255,165,53,199,1,133,228,5,255,52,205,107,0,74,238,140,255,150,156,219,254,239,172,178,255,251,189,223,254,32,142,211,255,218,15,138,1,241,196,80,0,28,36,98,254,22,234,199,0,61,237,220,255,246,57,37,0,142,17,142,255,157,62,26,0,43,238,95,254,3,217,6,255,213,25,240,1,39,220,174,255,154,205,48,254,19,13,192,255,244,34,54,254,140,16,155,0,240,181,5,254,155,193,60,0,166,128,4,255,36,145,56,255,150,240,219,0,120,51,145,0,82,153,42,1,140,236,146,0,107,92,248,1,189,10,3,0,63,136,242,0,211,39,24,0,19,202,161,1,173,27,186,255,210,204,239,254,41,209,162,255,182,254,159,255,172,116,52,0,195,103,222,254,205,69,59,0,53,22,41,1,218,48,194,0,80,210,242,0,210,188,207,0,187,161,161,254,216,17,1,0,136,225,113,0,250,184,63,0,223,30,98,254,77,168,162,0,59,53,175,0,19,201,10,255,139,224,194,0,147,193,154,255,212,189,12,254,1,200,174,255,50,133,113,1,94,179,90,0,173,182,135,0,94,177,113,0,43,89,215,255,136,252,106,255,123,134,83,254,5,245,66,255,82,49,39,1,220,2,224,0,97,129,177,0,77,59,89,0,61,29,155,1,203,171,220,255,92,78,139,0,145,33,181,255,169,24,141,1,55,150,179,0,139,60,80,255,218,39,97,0,2,147,107,255,60,248,72,0,173,230,47,1,6,83,182,255,16,105,162,254,137,212,81,255,180,184,134,1,39,222,164,255,221,105,251,1,239,112,125,0,63,7,97,0,63,104,227,255,148,58,12,0,90,60,224,255,84,212,252,0,79,215,168,0,248,221,199,1,115,121,1,0,36,172,120,0,32,162,187,255,57,107,49,255,147,42,21,0,106,198,43,1,57,74,87,0,126,203,81,255,129,135,195,0,140,31,177,0,221,139,194,0,3,222,215,0,131,68,231,0,177,86,178,254,124,151,180,0,184,124,38,1,70,163,17,0,249,251,181,1,42,55,227,0,226,161,44,0,23,236,110,0,51,149,142,1,93,5,236,0,218,183,106,254,67,24,77,0,40,245,209,255,222,121,153,0,165,57,30,0,83,125,60,0,70,38,82,1,229,6,188,0,109,222,157,255,55,118,63,255,205,151,186,0,227,33,149,255,254,176,246,1,227,177,227,0,34,106,163,254,176,43,79,0,106,95,78,1,185,241,122,255,185,14,61,0,36,1,202,0,13,178,162,255,247,11,132,0,161,230,92,1,65,1,185,255,212,50,165,1,141,146,64,255,158,242,218,0,21,164,125,0,213,139,122,1,67,71,87,0,203,158,178,1,151,92,43,0,152,111,5,255,39,3,239,255,217,255,250,255,176,63,71,255,74,245,77,1,250,174,18,255,34,49,227,255,246,46,251,255,154,35,48,1,125,157,61,255,106,36,78,255,97,236,153,0,136,187,120,255,113,134,171,255,19,213,217,254,216,94,209,255,252,5,61,0,94,3,202,0,3,26,183,255,64,191,43,255,30,23,21,0,129,141,77,255,102,120,7,1,194,76,140,0,188,175,52,255,17,81,148,0,232,86,55,1,225,48,172,0,134,42,42,255,238,50,47,0,169,18,254,0,20,147,87,255,14,195,239,255,69,247,23,0,238,229,128,255,177,49,112,0,168,98,251,255,121,71,248,0,243,8,145,254,246,227,153,255,219,169,177,254,251,139,165,255,12,163,185,255,164,40,171,255,153,159,27,254,243,109,91,255,222,24,112,1,18,214,231,0,107,157,181,254,195,147,0,255,194,99,104,255,89,140,190,255,177,66,126,254,106,185,66,0,49,218,31,0,252,174,158,0,188,79,230,1,238,41,224,0,212,234,8,1,136,11,181,0,166,117,83,255,68,195,94,0,46,132,201,0,240,152,88,0,164,57,69,254,160,224,42,255,59,215,67,255,119,195,141,255,36,180,121,254,207,47,8,255,174,210,223,0,101,197,68,255,255,82,141,1,250,137,233,0,97,86,133,1,16,80,69,0,132,131,159,0,116,93,100,0,45,141,139,0,152,172,157,255,90,43,91,0,71,153,46,0,39,16,112,255,217,136,97,255,220,198,25,254,177,53,49,0,222,88,134,255,128,15,60,0,207,192,169,255,192,116,209,255,106,78,211,1,200,213,183,255,7,12,122,254,222,203,60,255,33,110,199,254,251,106,117,0,228,225,4,1,120,58,7,255,221,193,84,254,112,133,27,0,189,200,201,255,139,135,150,0,234,55,176,255,61,50,65,0,152,108,169,255,220,85,1,255,112,135,227,0,162,26,186,0,207,96,185,254,244,136,107,0,93,153,50,1,198,97,151,0,110,11,86,255,143,117,174,255,115,212,200,0,5,202,183,0,237,164,10,254,185,239,62,0,236,120,18,254,98,123,99,255,168,201,194,254,46,234,214,0,191,133,49,255,99,169,119,0,190,187,35,1,115,21,45,255,249,131,72,0,112,6,123,255,214,49,181,254,166,233,34,0,92,197,102,254,253,228,205,255,3,59,201,1,42,98,46,0,219,37,35,255,169,195,38,0,94,124,193,1,156,43,223,0,95,72,133,254,120,206,191,0,122,197,239,255,177,187,79,255,254,46,2,1,250,167,190,0,84,129,19,0,203,113,166,255,249,31,189,254,72,157,202,255,208,71,73,255,207,24,72,0,10,16,18,1,210,81,76,255,88,208,192,255,126,243,107,255,238,141,120,255,199,121,234,255,137,12,59,255,36,220,123,255,148,179,60,254,240,12,29,0,66,0,97,1,36,30,38,255,115,1,93,255,96,103,231,255,197,158,59,1,192,164,240,0,202,202,57,255,24,174,48,0,89,77,155,1,42,76,215,0,244,151,233,0,23,48,81,0,239,127,52,254,227,130,37,255,248,116,93,1,124,132,118,0,173,254,192,1,6,235,83,255,110,175,231,1,251,28,182,0,129,249,93,254,84,184,128,0,76,181,62,0,175,128,186,0,100,53,136,254,109,29,226,0,221,233,58,1,20,99,74,0,0,22,160,0,134,13,21,0,9,52,55,255,17,89,140,0,175,34,59,0,84,165,119,255,224,226,234,255,7,72,166,255,123,115,255,1,18,214,246,0,250,7,71,1,217,220,185,0,212,35,76,255,38,125,175,0,189,97,210,0,114,238,44,255,41,188,169,254,45,186,154,0,81,92,22,0,132,160,193,0,121,208,98,255,13,81,44,255,203,156,82,0,71,58,21,255,208,114,191,254,50,38,147,0,154,216,195,0,101,25,18,0,60,250,215,255,233,132,235,255,103,175,142,1,16,14,92,0,141,31,110,254,238,241,45,255,153,217,239,1,97,168,47,255,249,85,16,1,28,175,62,255],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);allocate([57,254,54,0,222,231,126,0,166,45,117,254,18,189,96,255,228,76,50,0,200,244,94,0,198,152,120,1,68,34,69,255,12,65,160,254,101,19,90,0,167,197,120,255,68,54,185,255,41,218,188,0,113,168,48,0,88,105,189,1,26,82,32,255,185,93,164,1,228,240,237,255,66,182,53,0,171,197,92,255,107,9,233,1,199,120,144,255,78,49,10,255,109,170,105,255,90,4,31,255,28,244,113,255,74,58,11,0,62,220,246,255,121,154,200,254,144,210,178,255,126,57,129,1,43,250,14,255,101,111,28,1,47,86,241,255,61,70,150,255,53,73,5,255,30,26,158,0,209,26,86,0,138,237,74,0,164,95,188,0,142,60,29,254,162,116,248,255,187,175,160,0,151,18,16,0,209,111,65,254,203,134,39,255,88,108,49,255,131,26,71,255,221,27,215,254,104,105,93,255,31,236,31,254,135,0,211,255,143,127,110,1,212,73,229,0,233,67,167,254,195,1,208,255,132,17,221,255,51,217,90,0,67,235,50,255,223,210,143,0,179,53,130,1,233,106,198,0,217,173,220,255,112,229,24,255,175,154,93,254,71,203,246,255,48,66,133,255,3,136,230,255,23,221,113,254,235,111,213,0,170,120,95,254,251,221,2,0,45,130,158,254,105,94,217,255,242,52,180,254,213,68,45,255,104,38,28,0,244,158,76,0,161,200,96,255,207,53,13,255,187,67,148,0,170,54,248,0,119,162,178,255,83,20,11,0,42,42,192,1,146,159,163,255,183,232,111,0,77,229,21,255,71,53,143,0,27,76,34,0,246,136,47,255,219,39,182,255,92,224,201,1,19,142,14,255,69,182,241,255,163,118,245,0,9,109,106,1,170,181,247,255,78,47,238,255,84,210,176,255,213,107,139,0,39,38,11,0,72,21,150,0,72,130,69,0,205,77,155,254,142,133,21,0,71,111,172,254,226,42,59,255,179,0,215,1,33,128,241,0,234,252,13,1,184,79,8,0,110,30,73,255,246,141,189,0,170,207,218,1,74,154,69,255,138,246,49,255,155,32,100,0,125,74,105,255,90,85,61,255,35,229,177,255,62,125,193,255,153,86,188,1,73,120,212,0,209,123,246,254,135,209,38,255,151,58,44,1,92,69,214,255,14,12,88,255,252,153,166,255,253,207,112,255,60,78,83,255,227,124,110,0,180,96,252,255,53,117,33,254,164,220,82,255,41,1,27,255,38,164,166,255,164,99,169,254,61,144,70,255,192,166,18,0,107,250,66,0,197,65,50,0,1,179,18,255,255,104,1,255,43,153,35,255,80,111,168,0,110,175,168,0,41,105,45,255,219,14,205,255,164,233,140,254,43,1,118,0,233,67,195,0,178,82,159,255,138,87,122,255,212,238,90,255,144,35,124,254,25,140,164,0,251,215,44,254,133,70,107,255,101,227,80,254,92,169,55,0,215,42,49,0,114,180,85,255,33,232,27,1,172,213,25,0,62,176,123,254,32,133,24,255,225,191,62,0,93,70,153,0,181,42,104,1,22,191,224,255,200,200,140,255,249,234,37,0,149,57,141,0,195,56,208,255,254,130,70,255,32,173,240,255,29,220,199,0,110,100,115,255,132,229,249,0,228,233,223,255,37,216,209,254,178,177,209,255,183,45,165,254,224,97,114,0,137,97,168,255,225,222,172,0,165,13,49,1,210,235,204,255,252,4,28,254,70,160,151,0,232,190,52,254,83,248,93,255,62,215,77,1,175,175,179,255,160,50,66,0,121,48,208,0,63,169,209,255,0,210,200,0,224,187,44,1,73,162,82,0,9,176,143,255,19,76,193,255,29,59,167,1,24,43,154,0,28,190,190,0,141,188,129,0,232,235,203,255,234,0,109,255,54,65,159,0,60,88,232,255,121,253,150,254,252,233,131,255,198,110,41,1,83,77,71,255,200,22,59,254,106,253,242,255,21,12,207,255,237,66,189,0,90,198,202,1,225,172,127,0,53,22,202,0,56,230,132,0,1,86,183,0,109,190,42,0,243,68,174,1,109,228,154,0,200,177,122,1,35,160,183,255,177,48,85,255,90,218,169,255,248,152,78,0,202,254,110,0,6,52,43,0,142,98,65,255,63,145,22,0,70,106,93,0,232,138,107,1,110,179,61,255,211,129,218,1,242,209,92,0,35,90,217,1,182,143,106,255,116,101,217,255,114,250,221,255,173,204,6,0,60,150,163,0,73,172,44,255,239,110,80,255,237,76,153,254,161,140,249,0,149,232,229,0,133,31,40,255,174,164,119,0,113,51,214,0,129,228,2,254,64,34,243,0,107,227,244,255,174,106,200,255,84,153,70,1,50,35,16,0,250,74,216,254,236,189,66,255,153,249,13,0,230,178,4,255,221,41,238,0,118,227,121,255,94,87,140,254,254,119,92,0,73,239,246,254,117,87,128,0,19,211,145,255,177,46,252,0,229,91,246,1,69,128,247,255,202,77,54,1,8,11,9,255,153,96,166,0,217,214,173,255,134,192,2,1,0,207,0,0,189,174,107,1,140,134,100,0,158,193,243,1,182,102,171,0,235,154,51,0,142,5,123,255,60,168,89,1,217,14,92,255,19,214,5,1,211,167,254,0,44,6,202,254,120,18,236,255,15,113,184,255,184,223,139,0,40,177,119,254,182,123,90,255,176,165,176,0,247,77,194,0,27,234,120,0,231,0,214,255,59,39,30,0,125,99,145,255,150,68,68,1,141,222,248,0,153,123,210,255,110,127,152,255,229,33,214,1,135,221,197,0,137,97,2,0,12,143,204,255,81,41,188,0,115,79,130,255,94,3,132,0,152,175,187,255,124,141,10,255,126,192,179,255,11,103,198,0,149,6,45,0,219,85,187,1,230,18,178,255,72,182,152,0,3,198,184,255,128,112,224,1,97,161,230,0,254,99,38,255,58,159,197,0,151,66,219,0,59,69,143,255,185,112,249,0,119,136,47,255,123,130,132,0,168,71,95,255,113,176,40,1,232,185,173,0,207,93,117,1,68,157,108,255,102,5,147,254,49,97,33,0,89,65,111,254,247,30,163,255,124,217,221,1,102,250,216,0,198,174,75,254,57,55,18,0,227,5,236,1,229,213,173,0,201,109,218,1,49,233,239,0,30,55,158,1,25,178,106,0,155,111,188,1,94,126,140,0,215,31,238,1,77,240,16,0,213,242,25,1,38,71,168,0,205,186,93,254,49,211,140,255,219,0,180,255,134,118,165,0,160,147,134,255,110,186,35,255,198,243,42,0,243,146,119,0,134,235,163,1,4,241,135,255,193,46,193,254,103,180,79,255,225,4,184,254,242,118,130,0,146,135,176,1,234,111,30,0,69,66,213,254,41,96,123,0,121,94,42,255,178,191,195,255,46,130,42,0,117,84,8,255,233,49,214,254,238,122,109,0,6,71,89,1,236,211,123,0,244,13,48,254,119,148,14,0,114,28,86,255,75,237,25,255,145,229,16,254,129,100,53,255,134,150,120,254,168,157,50,0,23,72,104,255,224,49,14,0,255,123,22,255,151,185,151,255,170,80,184,1,134,182,20,0,41,100,101,1,153,33,16,0,76,154,111,1,86,206,234,255,192,160,164,254,165,123,93,255,1,216,164,254,67,17,175,255,169,11,59,255,158,41,61,255,73,188,14,255,195,6,137,255,22,147,29,255,20,103,3,255,246,130,227,255,122,40,128,0,226,47,24,254,35,36,32,0,152,186,183,255,69,202,20,0,195,133,195,0,222,51,247,0,169,171,94,1,183,0,160,255,64,205,18,1,156,83,15,255,197,58,249,254,251,89,110,255,50,10,88,254,51,43,216,0,98,242,198,1,245,151,113,0,171,236,194,1,197,31,199,255,229,81,38,1,41,59,20,0,253,104,230,0,152,93,14,255,246,242,146,254,214,169,240,255,240,102,108,254,160,167,236,0,154,218,188,0,150,233,202,255,27,19,250,1,2,71,133,255,175,12,63,1,145,183,198,0,104,120,115,255,130,251,247,0,17,212,167,255,62,123,132,255,247,100,189,0,155,223,152,0,143,197,33,0,155,59,44,255,150,93,240,1,127,3,87,255,95,71,207,1,167,85,1,255,188,152,116,255,10,23,23,0,137,195,93,1,54,98,97,0,240,0,168,255,148,188,127,0,134,107,151,0,76,253,171,0,90,132,192,0,146,22,54,0,224,66,54,254,230,186,229,255,39,182,196,0,148,251,130,255,65,131,108,254,128,1,160,0,169,49,167,254,199,254,148,255,251,6,131,0,187,254,129,255,85,82,62,0,178,23,58,255,254,132,5,0,164,213,39,0,134,252,146,254,37,53,81,255,155,134,82,0,205,167,238,255,94,45,180,255,132,40,161,0,254,111,112,1,54,75,217,0,179,230,221,1,235,94,191,255,23,243,48,1,202,145,203,255,39,118,42,255,117,141,253,0,254,0,222,0,43,251,50,0,54,169,234,1,80,68,208,0,148,203,243,254,145,7,135,0,6,254,0,0,252,185,127,0,98,8,129,255,38,35,72,255,211,36,220,1,40,26,89,0,168,64,197,254,3,222,239,255,2,83,215,254,180,159,105,0,58,115,194,0,186,116,106,255,229,247,219,255,129,118,193,0,202,174,183,1,166,161,72,0,201,107,147,254,237,136,74,0,233,230,106,1,105,111,168,0,64,224,30,1,1,229,3,0,102,151,175,255,194,238,228,255,254,250,212,0,187,237,121,0,67,251,96,1,197,30,11,0,183,95,204,0,205,89,138,0,64,221,37,1,255,223,30,255,178,48,211,255,241,200,90,255,167,209,96,255,57,130,221,0,46,114,200,255,61,184,66,0,55,182,24,254,110,182,33,0,171,190,232,255,114,94,31,0,18,221,8,0,47,231,254,0,255,112,83,0,118,15,215,255,173,25,40,254,192,193,31,255,238,21,146,255,171,193,118,255,101,234,53,254,131,212,112,0,89,192,107,1,8,208,27,0,181,217,15,255,231,149,232,0,140,236,126,0,144,9,199,255,12,79,181,254,147,182,202,255,19,109,182,255,49,212,225,0,74,163,203,0,175,233,148,0,26,112,51,0,193,193,9,255,15,135,249,0,150,227,130,0,204,0,219,1,24,242,205,0,238,208,117,255,22,244,112,0,26,229,34,0,37,80,188,255,38,45,206,254,240,90,225,255,29,3,47,255,42,224,76,0,186,243,167,0,32,132,15,255,5,51,125,0,139,135,24,0,6,241,219,0,172,229,133,255,246,214,50,0,231,11,207,255,191,126,83,1,180,163,170,255,245,56,24,1,178,164,211,255,3,16,202,1,98,57,118,255,141,131,89,254,33,51,24,0,243,149,91,255,253,52,14,0,35,169,67,254,49,30,88,255,179,27,36,255,165,140,183,0,58,189,151,0,88,31,0,0,75,169,66,0,66,101,199,255,24,216,199,1,121,196,26,255,14,79,203,254,240,226,81,255,94,28,10,255,83,193,240,255,204,193,131,255,94,15,86,0,218,40,157,0,51,193,209,0,0,242,177,0,102,185,247,0,158,109,116,0,38,135,91,0,223,175,149,0,220,66,1,255,86,60,232,0,25,96,37,255,225,122,162,1,215,187,168,255,158,157,46,0,56,171,162,0,232,240,101,1,122,22,9,0,51,9,21,255,53,25,238,255,217,30,232,254,125,169,148,0,13,232,102,0,148,9,37,0,165,97,141,1,228,131,41,0,222,15,243,255,254,18,17,0,6,60,237,1,106,3,113,0,59,132,189,0,92,112,30,0,105,208,213,0,48,84,179,255,187,121,231,254,27,216,109,255,162,221,107,254,73,239,195,255,250,31,57,255,149,135,89,255,185,23,115,1,3,163,157,255,18,112,250,0,25,57,187,255,161,96,164,0,47,16,243,0,12,141,251,254,67,234,184,255,41,18,161,0,175,6,96,255,160,172,52,254,24,176,183,255,198,193,85,1,124,121,137,255,151,50,114,255,220,203,60,255,207,239,5,1,0,38,107,255,55,238,94,254,70,152,94,0,213,220,77,1,120,17,69,255,85,164,190,255,203,234,81,0,38,49,37,254,61,144,124,0,137,78,49,254,168,247,48,0,95,164,252,0,105,169,135,0,253,228,134,0,64,166,75,0,81,73,20,255,207,210,10,0,234,106,150,255,94,34,90,255,254,159,57,254,220,133,99,0,139,147,180,254,24,23,185,0,41,57,30,255,189,97,76,0,65,187,223,255,224,172,37,255,34,62,95,1,231,144,240,0,77,106,126,254,64,152,91,0,29,98,155,0,226,251,53,255,234,211,5,255,144,203,222,255,164,176,221,254,5,231,24,0,179,122,205,0,36,1,134,255,125,70,151,254,97,228,252,0,172,129,23,254,48,90,209,255,150,224,82,1,84,134,30,0,241,196,46,0,103,113,234,255,46,101,121,254,40,124,250,255,135,45,242,254,9,249,168,255,140,108,131,255,143,163,171,0,50,173,199,255,88,222,142,255,200,95,158,0,142,192,163,255,7,117,135,0,111,124,22,0,236,12,65,254,68,38,65,255,227,174,254,0,244,245,38,0,240,50,208,255,161,63,250,0,60,209,239,0,122,35,19,0,14,33,230,254,2,159,113,0,106,20,127,255,228,205,96,0,137,210,174,254,180,212,144,255,89,98,154,1,34,88,139,0,167,162,112,1,65,110,197,0,241,37,169,0,66,56,131,255,10,201,83,254,133,253,187,255,177,112,45,254,196,251,0,0,196,250,151,255,238,232,214,255,150,209,205,0,28,240,118,0,71,76,83,1,236,99,91,0,42,250,131,1,96,18,64,255,118,222,35,0,113,214,203,255,122,119,184,255,66,19,36,0,204,64,249,0,146,89,139,0,134,62,135,1,104,233,101,0,188,84,26,0,49,249,129,0,208,214,75,255,207,130,77,255,115,175,235,0,171,2,137,255,175,145,186,1,55,245,135,255,154,86,181,1,100,58,246,255,109,199,60,255,82,204,134,255,215,49,230,1,140,229,192,255,222,193,251,255,81,136,15,255,179,149,162,255,23,39,29,255,7,95,75,254,191,81,222,0,241,81,90,255,107,49,201,255,244,211,157,0,222,140,149,255,65,219,56,254,189,246,90,255,178,59,157,1,48,219,52,0,98,34,215,0,28,17,187,255,175,169,24,0,92,79,161,255,236,200,194,1,147,143,234,0,229,225,7,1,197,168,14,0,235,51,53,1,253,120,174,0,197,6,168,255,202,117,171,0,163,21,206,0,114,85,90,255,15,41,10,255,194,19,99,0,65,55,216,254,162,146,116,0,50,206,212,255,64,146,29,255,158,158,131,1,100,165,130,255,172,23,129,255,125,53,9,255,15,193,18,1,26,49,11,255,181,174,201,1,135,201,14,255,100,19,149,0,219,98,79,0,42,99,143,254,96,0,48,255,197,249,83,254,104,149,79,255,235,110,136,254,82,128,44,255,65,41,36,254,88,211,10,0,187,121,187,0,98,134,199,0,171,188,179,254,210,11,238,255,66,123,130,254,52,234,61,0,48,113,23,254,6,86,120,255,119,178,245,0,87,129,201,0,242,141,209,0,202,114,85,0,148,22,161,0,103,195,48,0,25,49,171,255,138,67,130,0,182,73,122,254,148,24,130,0,211,229,154,0,32,155,158,0,84,105,61,0,177,194,9,255,166,89,86,1,54,83,187,0,249,40,117,255,109,3,215,255,53,146,44,1,63,47,179,0,194,216,3,254,14,84,136,0,136,177,13,255,72,243,186,255,117,17,125,255,211,58,211,255,93,79,223,0,90,88,245,255,139,209,111,255,70,222,47,0,10,246,79,255,198,217,178,0,227,225,11,1,78,126,179,255,62,43,126,0,103,148,35,0,129,8,165,254,245,240,148,0,61,51,142,0,81,208,134,0,15,137,115,255,211,119,236,255,159,245,248,255,2,134,136,255,230,139,58,1,160,164,254,0,114,85,141,255,49,166,182,255,144,70,84,1,85,182,7,0,46,53,93,0,9,166,161,255,55,162,178,255,45,184,188,0,146,28,44,254,169,90,49,0,120,178,241,1,14,123,127,255,7,241,199,1,189,66,50,255,198,143,101,254,189,243,135,255,141,24,24,254,75,97,87,0,118,251,154,1,237,54,156,0,171,146,207,255,131,196,246,255,136,64,113,1,151,232,57,0,240,218,115,0,49,61,27,255,64,129,73,1,252,169,27,255,40,132,10,1,90,201,193,255,252,121,240,1,186,206,41,0,43,198,97,0,145,100,183,0,204,216,80,254,172,150,65,0,249,229,196,254,104,123,73,255,77,104,96,254,130,180,8,0,104,123,57,0,220,202,229,255,102,249,211,0,86,14,232,255,182,78,209,0,239,225,164,0,106,13,32,255,120,73,17,255,134,67,233,0,83,254,181,0,183,236,112,1,48,64,131,255,241,216,243,255,65,193,226,0,206,241,100,254,100,134,166,255,237,202,197,0,55,13,81,0,32,124,102,255,40,228,177,0,118,181,31,1,231,160,134,255,119,187,202,0,0,142,60,255,128,38,189,255,166,201,150,0,207,120,26,1,54,184,172,0,12,242,204,254,133,66,230,0,34,38,31,1,184,112,80,0,32,51,165,254,191,243,55,0,58,73,146,254,155,167,205,255,100,104,152,255,197,254,207,255,173,19,247,0,238,10,202,0,239,151,242,0,94,59,39,255,240,29,102,255,10,92,154,255,229,84,219,255,161,129,80,0,208,90,204,1,240,219,174,255,158,102,145,1,53,178,76,255,52,108,168,1,83,222,107,0,211,36,109,0,118,58,56,0,8,29,22,0,237,160,199,0,170,209,157,0,137,71,47,0,143,86,32,0,198,242,2,0,212,48,136,1,92,172,186,0,230,151,105,1,96,191,229,0,138,80,191,254,240,216,130,255,98,43,6,254,168,196,49,0,253,18,91,1,144,73,121,0,61,146,39,1,63,104,24,255,184,165,112,254,126,235,98,0,80,213,98,255,123,60,87,255,82,140,245,1,223,120,173,255,15,198,134,1,206,60,239,0,231,234,92,255,33,238,19,255,165,113,142,1,176,119,38,0,160,43,166,254,239,91,105,0,107,61,194,1,25,4,68,0,15,139,51,0,164,132,106,255,34,116,46,254,168,95,197,0,137,212,23,0,72,156,58,0,137,112,69,254,150,105,154,255,236,201,157,0,23,212,154,255,136,82,227,254,226,59,221,255,95,149,192,0,81,118,52,255,33,43,215,1,14,147,75,255,89,156,121,254,14,18,79,0,147,208,139,1,151,218,62,255,156,88,8,1,210,184,98,255,20,175,123,255,102,83,229,0,220,65,116,1,150,250,4,255,92,142,220,255,34,247,66,255,204,225,179,254,151,81,151,0,71,40,236,255,138,63,62,0,6,79,240,255,183,185,181,0,118,50,27,0,63,227,192,0,123,99,58,1,50,224,155,255,17,225,223,254,220,224,77,255,14,44,123,1,141,128,175,0,248,212,200,0,150,59,183,255,147,97,29,0,150,204,181,0,253,37,71,0,145,85,119,0,154,200,186,0,2,128,249,255,83,24,124,0,14,87,143,0,168,51,245,1,124,151,231,255,208,240,197,1,124,190,185,0,48,58,246,0,20,233,232,0,125,18,98,255,13,254,31,255,245,177,130,255,108,142,35,0,171,125,242,254,140,12,34,255,165,161,162,0,206,205,101,0,247,25,34,1,100,145,57,0,39,70,57,0,118,204,203,255,242,0,162,0,165,244,30,0,198,116,226,0,128,111,153,255,140,54,182,1,60,122,15,255,155,58,57,1,54,50,198,0,171,211,29,255,107,138,167,255,173,107,199,255,109,161,193,0,89,72,242,255,206,115,89,255,250,254,142,254,177,202,94,255,81,89,50,0,7,105,66,255,25,254,255,254,203,64,23,255,79,222,108,255,39,249,75,0,241,124,50,0,239,152,133,0,221,241,105,0,147,151,98,0,213,161,121,254,242,49,137,0,233,37,249,254,42,183,27,0,184,119,230,255,217,32,163,255,208,251,228,1,137,62,131,255,79,64,9,254,94,48,113,0,17,138,50,254,193,255,22,0,247,18,197,1,67,55,104,0,16,205,95,255,48,37,66,0,55,156,63,1,64,82,74,255,200,53,71,254,239,67,125,0,26,224,222,0,223,137,93,255,30,224,202,255,9,220,132,0,198,38,235,1,102,141,86,0,60,43,81,1,136,28,26,0,233,36,8,254,207,242,148,0,164,162,63,0,51,46,224,255,114,48,79,255,9,175,226,0,222,3,193,255,47,160,232,255,255,93,105,254,14,42,230,0,26,138,82,1,208,43,244,0,27,39,38,255,98,208,127,255,64,149,182,255,5,250,209,0,187,60,28,254,49,25,218,255,169,116,205,255,119,18,120,0,156,116,147,255,132,53,109,255,13,10,202,0,110,83,167,0,157,219,137,255,6,3,130,255,50,167,30,255,60,159,47,255,129,128,157,254,94,3,189,0,3,166,68,0,83,223,215,0,150,90,194,1,15,168,65,0,227,83,51,255,205,171,66,255,54,187,60,1,152,102,45,255,119,154,225,0,240,247,136,0,100,197,178,255,139,71,223,255,204,82,16,1,41,206,42,255,156,192,221,255,216,123,244,255,218,218,185,255,187,186,239,255,252,172,160,255,195,52,22,0,144,174,181,254,187,100,115,255,211,78,176,255,27,7,193,0,147,213,104,255,90,201,10,255,80,123,66,1,22,33,186,0,1,7,99,254,30,206,10,0,229,234,5,0,53,30,210,0,138,8,220,254,71,55,167,0,72,225,86,1,118,190,188,0,254,193,101,1,171,249,172,255,94,158,183,254,93,2,108,255,176,93,76,255,73,99,79,255,74,64,129,254,246,46,65,0,99,241,127,254,246,151,102,255,44,53,208,254,59,102,234,0,154,175,164,255,88,242,32,0,111,38,1,0,255,182,190,255,115,176,15,254,169,60,129,0,122,237,241,0,90,76,63,0,62,74,120,255,122,195,110,0,119,4,178,0,222,242,210,0,130,33,46,254,156,40,41,0,167,146,112,1,49,163,111,255,121,176,235,0,76,207,14,255,3,25,198,1,41,235,213,0,85,36,214,1,49,92,109,255,200,24,30,254,168,236,195,0,145,39,124,1,236,195,149,0,90,36,184,255,67,85,170,255,38,35,26,254,131,124,68,255,239,155,35,255,54,201,164,0,196,22,117,255,49,15,205,0,24,224,29,1,126,113,144,0,117,21,182,0,203,159,141,0,223,135,77,0,176,230,176,255,190,229,215,255,99,37,181,255,51,21,138,255,25,189,89,255,49,48,165,254,152,45,247,0,170,108,222,0,80,202,5,0,27,69,103,254,204,22,129,255,180,252,62,254,210,1,91,255,146,110,254,255,219,162,28,0,223,252,213,1,59,8,33,0,206,16,244,0,129,211,48,0,107,160,208,0,112,59,209,0,109,77,216,254,34,21,185,255,246,99,56,255,179,139,19,255,185,29,50,255,84,89,19,0,74,250,98,255,225,42,200,255,192,217,205,255,210,16,167,0,99,132,95,1,43,230,57,0,254,11,203,255,99,188,63,255,119,193,251,254,80,105,54,0,232,181,189,1,183,69,112,255,208,171,165,255,47,109,180,255,123,83,165,0,146,162,52,255,154,11,4,255,151,227,90,255,146,137,97,254,61,233,41,255,94,42,55,255,108,164,236,0,152,68,254,0,10,140,131,255,10,106,79,254,243,158,137,0,67,178,66,254,177,123,198,255,15,62,34,0,197,88,42,255,149,95,177,255,152,0,198,255,149,254,113,255,225,90,163,255,125,217,247,0,18,17,224,0,128,66,120,254,192,25,9,255,50,221,205,0,49,212,70,0,233,255,164,0,2,209,9,0,221,52,219,254,172,224,244,255,94,56,206,1,242,179,2,255,31,91,164,1,230,46,138,255,189,230,220,0,57,47,61,255,111,11,157,0,177,91,152,0,28,230,98,0,97,87,126,0,198,89,145,255,167,79,107,0,249,77,160,1,29,233,230,255,150,21,86,254,60,11,193,0,151,37,36,254,185,150,243,255,228,212,83,1,172,151,180,0,201,169,155,0,244,60,234,0,142,235,4,1,67,218,60,0,192,113,75,1,116,243,207,255,65,172,155,0,81,30,156,255,80,72,33,254,18,231,109,255,142,107,21,254,125,26,132,255,176,16,59,255,150,201,58,0,206,169,201,0,208,121,226,0,40,172,14,255,150,61,94,255,56,57,156,255,141,60,145,255,45,108,149,255,238,145,155,255,209,85,31,254,192,12,210,0,99,98,93,254,152,16,151,0,225,185,220,0,141,235,44,255,160,172,21,254,71,26,31,255,13,64,93,254,28,56,198,0,177,62,248,1,182,8,241,0,166,101,148,255,78,81,133,255,129,222,215,1,188,169,129,255,232,7,97,0,49,112,60,255,217,229,251,0,119,108,138,0,39,19,123,254,131,49,235,0,132,84,145,0,130,230,148,255,25,74,187,0,5,245,54,255,185,219,241,1,18,194,228,255,241,202,102,0,105,113,202,0,155,235,79,0,21,9,178,255,156,1,239,0,200,148,61,0,115,247,210,255,49,221,135,0,58,189,8,1,35,46,9,0,81,65,5,255,52,158,185,255,125,116,46,255,74,140,13,255,210,92,172,254,147,23,71,0,217,224,253,254,115,108,180,255,145,58,48,254,219,177,24,255,156,255,60,1,154,147,242,0,253,134,87,0,53,75,229,0,48,195,222,255,31,175,50,255,156,210,120,255,208,35,222,255,18,248,179,1,2,10,101,255,157,194,248,255,158,204,101,255,104,254,197,255,79,62,4,0,178,172,101,1,96,146,251,255,65,10,156,0,2,137,165,255,116,4,231,0,242,215,1,0,19,35,29,255,43,161,79,0,59,149,246,1,251,66,176,0,200,33,3,255,80,110,142,255,195,161,17,1,228,56,66,255,123,47,145,254,132,4,164,0,67,174,172,0,25,253,114,0,87,97,87,1,250,220,84,0,96,91,200,255,37,125,59,0,19,65,118,0,161,52,241,255,237,172,6,255,176,191,255,255,1,65,130,254,223,190,230,0,101,253,231,255,146,35,109,0,250,29,77,1,49,0,19,0,123,90,155,1,22,86,32,255,218,213,65,0,111,93,127,0,60,93,169,255,8,127,182,0,17,186,14,254,253,137,246,255,213,25,48,254,76,238,0,255,248,92,70,255,99,224,139,0,184,9,255,1,7,164,208,0,205,131,198,1,87,214,199,0,130,214,95,0,221,149,222,0,23,38,171,254,197,110,213,0,43,115,140,254,215,177,118,0,96,52,66,1,117,158,237,0,14,64,182,255,46,63,174,255,158,95,190,255,225,205,177,255,43,5,142,255,172,99,212,255,244,187,147,0,29,51,153,255,228,116,24,254,30,101,207,0,19,246,150,255,134,231,5,0,125,134,226,1,77,65,98,0,236,130,33,255,5,110,62,0,69,108,127,255,7,113,22,0,145,20,83,254,194,161,231,255,131,181,60,0,217,209,177,255,229,148,212,254,3,131,184,0,117,177,187,1,28,14,31,255,176,102,80,0,50,84,151,255,125,31,54,255,21,157,133,255,19,179,139,1,224,232,26,0,34,117,170,255,167,252,171,255,73,141,206,254,129,250,35,0,72,79,236,1,220,229,20,255,41,202,173,255,99,76,238,255,198,22,224,255,108,198,195,255,36,141,96,1,236,158,59,255,106,100,87,0,110,226,2,0,227,234,222,0,154,93,119,255,74,112,164,255,67,91,2,255,21,145,33,255,102,214,137,255,175,230,103,254,163,246,166,0,93,247,116,254,167,224,28,255,220,2,57,1,171,206,84,0,123,228,17,255,27,120,119,0,119,11,147,1,180,47,225,255,104,200,185,254,165,2,114,0,77,78,212,0,45,154,177,255,24,196,121,254,82,157,182,0,90,16,190,1,12,147,197,0,95,239,152,255,11,235,71,0,86,146,119,255,172,134,214,0,60,131,196,0,161,225,129,0,31,130,120,254,95,200,51,0,105,231,210,255,58,9,148,255,43,168,221,255,124,237,142,0,198,211,50,254,46,245,103,0,164,248,84,0,152,70,208,255,180,117,177,0,70,79,185,0,243,74,32,0,149,156,207,0,197,196,161,1,245,53,239,0,15,93,246,254,139,240,49,255,196,88,36,255,162,38,123,0,128,200,157,1,174,76,103,255,173,169,34,254,216,1,171,255,114,51,17,0,136,228,194,0,110,150,56,254,106,246,159,0,19,184,79,255,150,77,240,255,155,80,162,0,0,53,169,255,29,151,86,0,68,94,16,0,92,7,110,254,98,117,149,255,249,77,230,255,253,10,140,0,214,124,92,254,35,118,235,0,89,48,57,1,22,53,166,0,184,144,61,255,179,255,194,0,214,248,61,254,59,110,246,0,121,21,81,254,166,3,228,0,106,64,26,255,69,232,134,255,242,220,53,254,46,220,85,0,113,149,247,255,97,179,103,255,190,127,11,0,135,209,182,0,95,52,129,1,170,144,206,255,122,200,204,255,168,100,146,0,60,144,149,254,70,60,40,0,122,52,177,255,246,211,101,255,174,237,8,0,7,51,120,0,19,31,173,0,126,239,156,255,143,189,203,0,196,128,88,255,233,133,226,255,30,125,173,255,201,108,50,0,123,100,59,255,254,163,3,1,221,148,181,255,214,136,57,254,222,180,137,255,207,88,54,255,28,33,251,255,67,214,52,1,210,208,100,0,81,170,94,0,145,40,53,0,224,111,231,254,35,28,244,255,226,199,195,254,238,17,230,0,217,217,164,254,169,157,221,0,218,46,162,1,199,207,163,255,108,115,162,1,14,96,187,255,118,60,76,0,184,159,152,0,209,231,71,254,42,164,186,255,186,153,51,254,221,171,182,255,162,142,173,0,235,47,193,0,7,139,16,1,95,164,64,255,16,221,166,0,219,197,16,0,132,29,44,255,100,69,117,255,60,235,88,254,40,81,173,0,71,190,61,255,187,88,157,0,231,11,23,0,237,117,164,0,225,168,223,255,154,114,116,255,163,152,242,1,24,32,170,0,125,98,113,254,168,19,76,0,17,157,220,254,155,52,5,0,19,111,161,255,71,90,252,255,173,110,240,0,10,198,121,255,253,255,240,255,66,123,210,0,221,194,215,254,121,163,17,255,225,7,99,0,190,49,182,0,115,9,133,1,232,26,138,255,213,68,132,0,44,119,122,255,179,98,51,0,149,90,106,0,71,50,230,255,10,153,118,255,177,70,25,0,165,87,205,0,55,138,234,0,238,30,97,0,113,155,207,0,98,153,127,0,34,107,219,254,117,114,172,255,76,180,255,254,242,57,179,255,221,34,172,254,56,162,49,255,83,3,255,255,113,221,189,255,188,25,228,254,16,88,89,255,71,28,198,254,22,17,149,255,243,121,254,255,107,202,99,255,9,206,14,1,220,47,153,0,107,137,39,1,97,49,194,255,149,51,197,254,186,58,11,255,107,43,232,1,200,6,14,255,181,133,65,254,221,228,171,255,123,62,231,1,227,234,179,255,34,189,212,254,244,187,249,0,190,13,80,1,130,89,1,0,223,133,173,0,9,222,198,255,66,127,74,0,167,216,93,255,155,168,198,1,66,145,0,0,68,102,46,1,172,90,154,0,216,128,75,255,160,40,51,0,158,17,27,1,124,240,49,0,236,202,176,255,151,124,192,255,38,193,190,0,95,182,61,0,163,147,124,255,255,165,51,255,28,40,17,254,215,96,78,0,86,145,218,254,31,36,202,255,86,9,5,0,111,41,200,255,237,108,97,0,57,62,44,0,117,184,15,1,45,241,116,0,152,1,220,255,157,165,188,0,250,15,131,1,60,44,125,255,65,220,251,255,75,50,184,0,53,90,128,255,231,80,194,255,136,129,127,1,21,18,187,255,45,58,161,255,71,147,34,0,174,249,11,254,35,141,29,0,239,68,177,255,115,110,58,0,238,190,177,1,87,245,166,255,190,49,247,255,146,83,184,255,173,14,39,255,146,215,104,0,142,223,120,0,149,200,155,255,212,207,145,1,16,181,217,0,173,32,87,255,255,35,181,0,119,223,161,1,200,223,94,255,70,6,186,255,192,67,85,255,50,169,152,0,144,26,123,255,56,243,179,254,20,68,136,0,39,140,188,254,253,208,5,255,200,115,135,1,43,172,229,255,156,104,187,0,151,251,167,0,52,135,23,0,151,153,72,0,147,197,107,254,148,158,5,255,238,143,206,0,126,153,137,255,88,152,197,254,7,68,167,0,252,159,165,255,239,78,54,255,24,63,55,255,38,222,94,0,237,183,12,255,206,204,210,0,19,39,246,254,30,74,231,0,135,108,29,1,179,115,0,0,117,118,116,1,132,6,252,255,145,129,161,1,105,67,141,0,82,37,226,255,238,226,228,255,204,214,129,254,162,123,100,255,185,121,234,0,45,108,231,0,66,8,56,255,132,136,128,0,172,224,66,254,175,157,188,0,230,223,226,254,242,219,69,0,184,14,119,1,82,162,56,0,114,123,20,0,162,103,85,255,49,239,99,254,156,135,215,0,111,255,167,254,39,196,214,0,144,38,79,1,249,168,125,0,155,97,156,255,23,52,219,255,150,22,144,0,44,149,165,255,40,127,183,0,196,77,233,255,118,129,210,255,170,135,230,255,214,119,198,0,233,240,35,0,253,52,7,255,117,102,48,255,21,204,154,255,179,136,177,255,23,2,3,1,149,130,89,255,252,17,159,1,70,60,26,0,144,107,17,0,180,190,60,255,56,182,59,255,110,71,54,255,198,18,129,255,149,224,87,255,223,21,152,255,138,22,182,255,250,156,205,0,236,45,208,255,79,148,242,1,101,70,209,0,103,78,174,0,101,144,172,255,152,136,237,1,191,194,136,0,113,80,125,1,152,4,141,0,155,150,53,255,196,116,245,0,239,114,73,254,19,82,17,255,124,125,234,255,40,52,191,0,42,210,158,255,155,132,165,0,178,5,42,1,64,92,40,255,36,85,77,255,178,228,118,0,137,66,96,254,115,226,66,0,110,240,69,254,151,111,80,0,167,174,236,255,227,108,107,255,188,242,65,255,183,81,255,0,57,206,181,255,47,34,181,255,213,240,158,1,71,75,95,0,156,40,24,255,102,210,81,0,171,199,228,255,154,34,41,0,227,175,75,0,21,239,195,0,138,229,95,1,76,192,49,0,117,123,87,1,227,225,130,0,125,62,63,255,2,198,171,0,254,36,13,254,145,186,206,0,148,255,244,255,35,0,166,0,30,150,219,1,92,228,212,0,92,198,60,254,62,133,200,255,201,41,59,0,125,238,109,255,180,163,238,1,140,122,82,0,9,22,88,255,197,157,47,255,153,94,57,0,88,30,182,0,84,161,85,0,178,146,124,0,166,166,7,255,21,208,223,0,156,182,242,0,155,121,185,0,83,156,174,254,154,16,118,255,186,83,232,1,223,58,121,255,29,23,88,0,35,125,127,255,170,5,149,254,164,12,130,255,155,196,29,0,161,96,136,0,7,35,29,1,162,37,251,0,3,46,242,255,0,217,188,0,57,174,226,1,206,233,2,0,57,187,136,254,123,189,9,255,201,117,127,255,186,36,204,0,231,25,216,0,80,78,105,0,19,134,129,255,148,203,68,0,141,81,125,254,248,165,200,255,214,144,135,0,151,55,166,255,38,235,91,0,21,46,154,0,223,254,150,255,35,153,180,255,125,176,29,1,43,98,30,255,216,122,230,255,233,160,12,0,57,185,12,254,240,113,7,255,5,9,16,254,26,91,108,0,109,198,203,0,8,147,40,0,129,134,228,255,124,186,40,255,114,98,132,254,166,132,23,0,99,69,44,0,9,242,238,255,184,53,59,0,132,129,102,255,52,32,243,254,147,223,200,255,123,83,179,254,135,144,201,255,141,37,56,1,151,60,227,255,90,73,156,1,203,172,187,0,80,151,47,255,94,137,231,255,36,191,59,255,225,209,181,255,74,215,213,254,6,118,179,255,153,54,193,1,50,0,231,0,104,157,72,1,140,227,154,255,182,226,16,254,96,225,92,255,115,20,170,254,6,250,78,0,248,75,173,255,53,89,6,255,0,180,118,0,72,173,1,0,64,8,206,1,174,133,223,0,185,62,133,255,214,11,98,0,197,31,208,0,171,167,244,255,22,231,181,1,150,218,185,0,247,169,97,1,165,139,247,255,47,120,149,1,103,248,51,0,60,69,28,254,25,179,196,0,124,7,218,254,58,107,81,0,184,233,156,255,252,74,36,0,118,188,67,0,141,95,53,255,222,94,165,254,46,61,53,0,206,59,115,255,47,236,250,255,74,5,32,1,129,154,238,255,106,32,226,0,121,187,61,255,3,166,241,254,67,170,172,255,29,216,178,255,23,201,252,0,253,110,243,0,200,125,57,0,109,192,96,255,52,115,238,0,38,121,243,255,201,56,33,0,194,118,130,0,75,96,25,255,170,30,230,254,39,63,253,0,36,45,250,255,251,1,239,0,160,212,92,1,45,209,237,0,243,33,87,254,237,84,201,255,212,18,157,254,212,99,127,255,217,98,16,254,139,172,239,0,168,201,130,255,143,193,169,255,238,151,193,1,215,104,41,0,239,61,165,254,2,3,242,0,22,203,177,254,177,204,22,0,149,129,213,254,31,11,41,255,0,159,121,254,160,25,114,255,162,80,200,0,157,151,11,0,154,134,78,1,216,54,252,0,48,103,133,0,105,220,197,0,253,168,77,254,53,179,23,0,24,121,240,1,255,46,96,255,107,60,135,254,98,205,249,255,63,249,119,255,120,59,211,255,114,180,55,254,91,85,237,0,149,212,77,1,56,73,49,0,86,198,150,0,93,209,160,0,69,205,182,255,244,90,43,0,20,36,176,0,122,116,221,0,51,167,39,1,231,1,63,255,13,197,134,0,3,209,34,255,135,59,202,0,167,100,78,0,47,223,76,0,185,60,62,0,178,166,123,1,132,12,161,255,61,174,43,0,195,69,144,0,127,47,191,1,34,44,78,0,57,234,52,1,255,22,40,255,246,94,146,0,83,228,128,0,60,78,224,255,0,96,210,255,153,175,236,0,159,21,73,0,180,115,196,254,131,225,106,0,255,167,134,0,159,8,112,255,120,68,194,255,176,196,198,255,118,48,168,255,93,169,1,0,112,200,102,1,74,24,254,0,19,141,4,254,142,62,63,0,131,179,187,255,77,156,155,255,119,86,164,0,170,208,146,255,208,133,154,255,148,155,58,255,162,120,232,254,252,213,155,0,241,13,42,0,94,50,131,0,179,170,112,0,140,83,151,255,55,119,84,1,140,35,239,255,153,45,67,1,236,175,39,0,54,151,103,255,158,42,65,255,196,239,135,254,86,53,203,0,149,97,47,254,216,35,17,255,70,3,70,1,103,36,90,255,40,26,173,0,184,48,13,0,163,219,217,255,81,6,1,255,221,170,108,254,233,208,93,0,100,201,249,254,86,36,35,255,209,154,30,1,227,201,251,255,2,189,167,254,100,57,3,0,13,128,41,0,197,100,75,0,150,204,235,255,145,174,59,0,120,248,149,255,85,55,225,0,114,210,53,254,199,204,119,0,14,247,74,1,63,251,129,0,67,104,151,1,135,130,80,0,79,89,55,255,117,230,157,255,25,96,143,0,213,145,5,0,69,241,120,1,149,243,95,255,114,42,20,0,131,72,2,0,154,53,20,255,73,62,109,0,196,102,152,0,41,12,204,255,122,38,11,1,250,10,145,0,207,125,148,0,246,244,222,255,41,32,85,1,112,213,126,0,162,249,86,1,71,198,127,255,81,9,21,1,98,39,4,255,204,71,45,1,75,111,137,0,234,59,231,0,32,48,95,255,204,31,114,1,29,196,181,255,51,241,167,254,93,109,142,0,104,144,45,0,235,12,181,255,52,112,164,0,76,254,202,255,174,14,162,0,61,235,147,255,43,64,185,254,233,125,217,0,243,88,167,254,74,49,8,0,156,204,66,0,124,214,123,0,38,221,118,1,146,112,236,0,114,98,177,0,151,89,199,0,87,197,112,0,185,149,161,0,44,96,165,0,248,179,20,255,188,219,216,254,40,62,13,0,243,142,141,0,229,227,206,255,172,202,35,255,117,176,225,255,82,110,38,1,42,245,14,255,20,83,97,0,49,171,10,0,242,119,120,0,25,232,61,0,212,240,147,255,4,115,56,255,145,17,239,254,202,17,251,255,249,18,245,255,99,117,239,0,184,4,179,255,246,237,51,255,37,239,137,255,166,112,166,255,81,188,33,255,185,250,142,255,54,187,173,0,208,112,201,0,246,43,228,1,104,184,88,255,212,52,196,255,51,117,108,255,254,117,155,0,46,91,15,255,87,14,144,255,87,227,204,0,83,26,83,1,159,76,227,0,159,27,213,1,24,151,108,0,117,144,179,254,137,209,82,0,38,159,10,0,115,133,201,0,223,182,156,1,110,196,93,255,57,60,233,0,5,167,105,255,154,197,164,0,96,34,186,255,147,133,37,1,220,99,190,0,1,167,84,255,20,145,171,0,194,197,251,254,95,78,133,255,252,248,243,255,225,93,131,255,187,134,196,255,216,153,170,0,20,118,158,254,140,1,118,0,86,158,15,1,45,211,41,255,147,1,100,254,113,116,76,255,211,127,108,1,103,15,48,0,193,16,102,1,69,51,95,255,107,128,157,0,137,171,233,0,90,124,144,1,106,161,182,0,175,76,236,1,200,141,172,255,163,58,104,0,233,180,52,255,240,253,14,255,162,113,254,255,38,239,138,254,52,46,166,0,241,101,33,254,131,186,156,0,111,208,62,255,124,94,160,255,31,172,254,0,112,174,56,255,188,99,27,255,67,138,251,0,125,58,128,1,156,152,174,255,178,12,247,255,252,84,158,0,82,197,14,254,172,200,83,255,37,39,46,1,106,207,167,0,24,189,34,0,131,178,144,0,206,213,4,0,161,226,210,0,72,51,105,255,97,45,187,255,78,184,223,255,176,29,251,0,79,160,86,255,116,37,178,0,82,77,213,1,82,84,141,255,226,101,212,1,175,88,199,255,245,94,247,1,172,118,109,255,166,185,190,0,131,181,120,0,87,254,93,255,134,240,73,255,32,245,143,255,139,162,103,255,179,98,18,254,217,204,112,0,147,223,120,255,53,10,243,0,166,140,150,0,125,80,200,255,14,109,219,255,91,218,1,255,252,252,47,254,109,156,116,255,115,49,127,1,204,87,211,255,148,202,217,255,26,85,249,255,14,245,134,1,76,89,169,255,242,45,230,0,59,98,172,255,114,73,132,254,78,155,49,255,158,126,84,0,49,175,43,255,16,182,84,255,157,103,35,0,104,193,109,255,67,221,154,0,201,172,1,254,8,162,88,0,165,1,29,255,125,155,229,255,30,154,220,1,103,239,92,0,220,1,109,255,202,198,1,0,94,2,142,1,36,54,44,0,235,226,158,255,170,251,214,255,185,77,9,0,97,74,242,0,219,163,149,255,240,35,118,255,223,114,88,254,192,199,3,0,106,37,24,255,201,161,118,255,97,89,99,1,224,58,103,255,101,199,147,254,222,60,99,0,234,25,59,1,52,135,27,0,102,3,91,254,168,216,235,0,229,232,136,0,104,60,129,0,46,168,238,0,39,191,67,0,75,163,47,0,143,97,98,255,56,216,168,1,168,233,252,255,35,111,22,255,92,84,43,0,26,200,87,1,91,253,152,0,202,56,70,0,142,8,77,0,80,10,175,1,252,199,76,0,22,110,82,255,129,1,194,0,11,128,61,1,87,14,145,255,253,222,190,1,15,72,174,0,85,163,86,254,58,99,44,255,45,24,188,254,26,205,15,0,19,229,210,254,248,67,195,0,99,71,184,0,154,199,37,255,151,243,121,255,38,51,75,255,201,85,130,254,44,65,250,0,57,147,243,254,146,43,59,255,89,28,53,0,33,84,24,255,179,51,18,254,189,70,83,0,11,156,179,1,98,134,119,0,158,111,111,0,119,154,73,255,200,63,140,254,45,13,13,255,154,192,2,254,81,72,42,0,46,160,185,254,44,112,6,0,146,215,149,1,26,176,104,0,68,28,87,1,236,50,153,255,179,128,250,254,206,193,191,255,166,92,137,254,53,40,239,0,210,1,204,254,168,173,35,0,141,243,45,1,36,50,109,255,15,242,194,255,227,159,122,255,176,175,202,254,70,57,72,0,40,223,56,0,208,162,58,255,183,98,93,0,15,111,12,0,30,8,76,255,132,127,246,255,45,242,103,0,69,181,15,255,10,209,30,0,3,179,121,0,241,232,218,1,123,199,88,255,2,210,202,1,188,130,81,255,94,101,208,1,103,36,45,0,76,193,24,1,95,26,241,255,165,162,187,0,36,114,140,0,202,66,5,255,37,56,147,0,152,11,243,1,127,85,232,255,250,135,212,1,185,177,113,0,90,220,75,255,69,248,146,0,50,111,50,0,92,22,80,0,244,36,115,254,163,100,82,255,25,193,6,1,127,61,36,0,253,67,30,254,65,236,170,255,161,17,215,254,63,175,140,0,55,127,4,0,79,112,233,0,109,160,40,0,143,83,7,255,65,26,238,255,217,169,140,255,78,94,189,255,0,147,190,255,147,71,186,254,106,77,127,255,233,157,233,1,135,87,237,255,208,13,236,1,155,109,36,255,180,100,218,0,180,163,18,0,190,110,9,1,17,63,123,255,179,136,180,255,165,123,123,255,144,188,81,254,71,240,108,255,25,112,11,255,227,218,51,255,167,50,234,255,114,79,108,255,31,19,115,255,183,240,99,0,227,87,143,255,72,217,248,255,102,169,95,1,129,149,149,0,238,133,12,1,227,204,35,0,208,115,26,1,102,8,234,0,112,88,143,1,144,249,14,0,240,158,172,254,100,112,119],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+10240);allocate([194,141,153,254,40,56,83,255,121,176,46,0,42,53,76,255,158,191,154,0,91,209,92,0,173,13,16,1,5,72,226,255,204,254,149,0,80,184,207,0,100,9,122,254,118,101,171,255,252,203,0,254,160,207,54,0,56,72,249,1,56,140,13,255,10,64,107,254,91,101,52,255,225,181,248,1,139,255,132,0,230,145,17,0,233,56,23,0,119,1,241,255,213,169,151,255,99,99,9,254,185,15,191,255,173,103,109,1,174,13,251,255,178,88,7,254,27,59,68,255,10,33,2,255,248,97,59,0,26,30,146,1,176,147,10,0,95,121,207,1,188,88,24,0,185,94,254,254,115,55,201,0,24,50,70,0,120,53,6,0,142,66,146,0,228,226,249,255,104,192,222,1,173,68,219,0,162,184,36,255,143,102,137,255,157,11,23,0,125,45,98,0,235,93,225,254,56,112,160,255,70,116,243,1,153,249,55,255,129,39,17,1,241,80,244,0,87,69,21,1,94,228,73,255,78,66,65,255,194,227,231,0,61,146,87,255,173,155,23,255,112,116,219,254,216,38,11,255,131,186,133,0,94,212,187,0,100,47,91,0,204,254,175,255,222,18,215,254,173,68,108,255,227,228,79,255,38,221,213,0,163,227,150,254,31,190,18,0,160,179,11,1,10,90,94,255,220,174,88,0,163,211,229,255,199,136,52,0,130,95,221,255,140,188,231,254,139,113,128,255,117,171,236,254,49,220,20,255,59,20,171,255,228,109,188,0,20,225,32,254,195,16,174,0,227,254,136,1,135,39,105,0,150,77,206,255,210,238,226,0,55,212,132,254,239,57,124,0,170,194,93,255,249,16,247,255,24,151,62,255,10,151,10,0,79,139,178,255,120,242,202,0,26,219,213,0,62,125,35,255,144,2,108,255,230,33,83,255,81,45,216,1,224,62,17,0,214,217,125,0,98,153,153,255,179,176,106,254,131,93,138,255,109,62,36,255,178,121,32,255,120,252,70,0,220,248,37,0,204,88,103,1,128,220,251,255,236,227,7,1,106,49,198,255,60,56,107,0,99,114,238,0,220,204,94,1,73,187,1,0,89,154,34,0,78,217,165,255,14,195,249,255,9,230,253,255,205,135,245,0,26,252,7,255,84,205,27,1,134,2,112,0,37,158,32,0,231,91,237,255,191,170,204,255,152,7,222,0,109,192,49,0,193,166,146,255,232,19,181,255,105,142,52,255,103,16,27,1,253,200,165,0,195,217,4,255,52,189,144,255,123,155,160,254,87,130,54,255,78,120,61,255,14,56,41,0,25,41,125,255,87,168,245,0,214,165,70,0,212,169,6,255,219,211,194,254,72,93,164,255,197,33,103,255,43,142,141,0,131,225,172,0,244,105,28,0,68,68,225,0,136,84,13,255,130,57,40,254,139,77,56,0,84,150,53,0,54,95,157,0,144,13,177,254,95,115,186,0,117,23,118,255,244,166,241,255,11,186,135,0,178,106,203,255,97,218,93,0,43,253,45,0,164,152,4,0,139,118,239,0,96,1,24,254,235,153,211,255,168,110,20,255,50,239,176,0,114,41,232,0,193,250,53,0,254,160,111,254,136,122,41,255,97,108,67,0,215,152,23,255,140,209,212,0,42,189,163,0,202,42,50,255,106,106,189,255,190,68,217,255,233,58,117,0,229,220,243,1,197,3,4,0,37,120,54,254,4,156,134,255,36,61,171,254,165,136,100,255,212,232,14,0,90,174,10,0,216,198,65,255,12,3,64,0,116,113,115,255,248,103,8,0,231,125,18,255,160,28,197,0,30,184,35,1,223,73,249,255,123,20,46,254,135,56,37,255,173,13,229,1,119,161,34,255,245,61,73,0,205,125,112,0,137,104,134,0,217,246,30,255,237,142,143,0,65,159,102,255,108,164,190,0,219,117,173,255,34,37,120,254,200,69,80,0,31,124,218,254,74,27,160,255,186,154,199,255,71,199,252,0,104,81,159,1,17,200,39,0,211,61,192,1,26,238,91,0,148,217,12,0,59,91,213,255,11,81,183,255,129,230,122,255,114,203,145,1,119,180,66,255,72,138,180,0,224,149,106,0,119,82,104,255,208,140,43,0,98,9,182,255,205,101,134,255,18,101,38,0,95,197,166,255,203,241,147,0,62,208,145,255,133,246,251,0,2,169,14,0,13,247,184,0,142,7,254,0,36,200,23,255,88,205,223,0,91,129,52,255,21,186,30,0,143,228,210,1,247,234,248,255,230,69,31,254,176,186,135,255,238,205,52,1,139,79,43,0,17,176,217,254,32,243,67,0,242,111,233,0,44,35,9,255,227,114,81,1,4,71,12,255,38,105,191,0,7,117,50,255,81,79,16,0,63,68,65,255,157,36,110,255,77,241,3,255,226,45,251,1,142,25,206,0,120,123,209,1,28,254,238,255,5,128,126,255,91,222,215,255,162,15,191,0,86,240,73,0,135,185,81,254,44,241,163,0,212,219,210,255,112,162,155,0,207,101,118,0,168,72,56,255,196,5,52,0,72,172,242,255,126,22,157,255,146,96,59,255,162,121,152,254,140,16,95,0,195,254,200,254,82,150,162,0,119,43,145,254,204,172,78,255,166,224,159,0,104,19,237,255,245,126,208,255,226,59,213,0,117,217,197,0,152,72,237,0,220,31,23,254,14,90,231,255,188,212,64,1,60,101,246,255,85,24,86,0,1,177,109,0,146,83,32,1,75,182,192,0,119,241,224,0,185,237,27,255,184,101,82,1,235,37,77,255,253,134,19,0,232,246,122,0,60,106,179,0,195,11,12,0,109,66,235,1,125,113,59,0,61,40,164,0,175,104,240,0,2,47,187,255,50,12,141,0,194,139,181,255,135,250,104,0,97,92,222,255,217,149,201,255,203,241,118,255,79,151,67,0,122,142,218,255,149,245,239,0,138,42,200,254,80,37,97,255,124,112,167,255,36,138,87,255,130,29,147,255,241,87,78,255,204,97,19,1,177,209,22,255,247,227,127,254,99,119,83,255,212,25,198,1,16,179,179,0,145,77,172,254,89,153,14,255,218,189,167,0,107,233,59,255,35,33,243,254,44,112,112,255,161,127,79,1,204,175,10,0,40,21,138,254,104,116,228,0,199,95,137,255,133,190,168,255,146,165,234,1,183,99,39,0,183,220,54,254,255,222,133,0,162,219,121,254,63,239,6,0,225,102,54,255,251,18,246,0,4,34,129,1,135,36,131,0,206,50,59,1,15,97,183,0,171,216,135,255,101,152,43,255,150,251,91,0,38,145,95,0,34,204,38,254,178,140,83,255,25,129,243,255,76,144,37,0,106,36,26,254,118,144,172,255,68,186,229,255,107,161,213,255,46,163,68,255,149,170,253,0,187,17,15,0,218,160,165,255,171,35,246,1,96,13,19,0,165,203,117,0,214,107,192,255,244,123,177,1,100,3,104,0,178,242,97,255,251,76,130,255,211,77,42,1,250,79,70,255,63,244,80,1,105,101,246,0,61,136,58,1,238,91,213,0,14,59,98,255,167,84,77,0,17,132,46,254,57,175,197,255,185,62,184,0,76,64,207,0,172,175,208,254,175,74,37,0,138,27,211,254,148,125,194,0,10,89,81,0,168,203,101,255,43,213,209,1,235,245,54,0,30,35,226,255,9,126,70,0,226,125,94,254,156,117,20,255,57,248,112,1,230,48,64,255,164,92,166,1,224,214,230,255,36,120,143,0,55,8,43,255,251,1,245,1,106,98,165,0,74,107,106,254,53,4,54,255,90,178,150,1,3,120,123,255,244,5,89,1,114,250,61,255,254,153,82,1,77,15,17,0,57,238,90,1,95,223,230,0,236,52,47,254,103,148,164,255,121,207,36,1,18,16,185,255,75,20,74,0,187,11,101,0,46,48,129,255,22,239,210,255,77,236,129,255,111,77,204,255,61,72,97,255,199,217,251,255,42,215,204,0,133,145,201,255,57,230,146,1,235,100,198,0,146,73,35,254,108,198,20,255,182,79,210,255,82,103,136,0,246,108,176,0,34,17,60,255,19,74,114,254,168,170,78,255,157,239,20,255,149,41,168,0,58,121,28,0,79,179,134,255,231,121,135,255,174,209,98,255,243,122,190,0,171,166,205,0,212,116,48,0,29,108,66,255,162,222,182,1,14,119,21,0,213,39,249,255,254,223,228,255,183,165,198,0,133,190,48,0,124,208,109,255,119,175,85,255,9,209,121,1,48,171,189,255,195,71,134,1,136,219,51,255,182,91,141,254,49,159,72,0,35,118,245,255,112,186,227,255,59,137,31,0,137,44,163,0,114,103,60,254,8,213,150,0,162,10,113,255,194,104,72,0,220,131,116,255,178,79,92,0,203,250,213,254,93,193,189,255,130,255,34,254,212,188,151,0,136,17,20,255,20,101,83,255,212,206,166,0,229,238,73,255,151,74,3,255,168,87,215,0,155,188,133,255,166,129,73,0,240,79,133,255,178,211,81,255,203,72,163,254,193,168,165,0,14,164,199,254,30,255,204,0,65,72,91,1,166,74,102,255,200,42,0,255,194,113,227,255,66,23,208,0,229,216,100,255,24,239,26,0,10,233,62,255,123,10,178,1,26,36,174,255,119,219,199,1,45,163,190,0,16,168,42,0,166,57,198,255,28,26,26,0,126,165,231,0,251,108,100,255,61,229,121,255,58,118,138,0,76,207,17,0,13,34,112,254,89,16,168,0,37,208,105,255,35,201,215,255,40,106,101,254,6,239,114,0,40,103,226,254,246,127,110,255,63,167,58,0,132,240,142,0,5,158,88,255,129,73,158,255,94,89,146,0,230,54,146,0,8,45,173,0,79,169,1,0,115,186,247,0,84,64,131,0,67,224,253,255,207,189,64,0,154,28,81,1,45,184,54,255,87,212,224,255,0,96,73,255,129,33,235,1,52,66,80,255,251,174,155,255,4,179,37,0,234,164,93,254,93,175,253,0,198,69,87,255,224,106,46,0,99,29,210,0,62,188,114,255,44,234,8,0,169,175,247,255,23,109,137,255,229,182,39,0,192,165,94,254,245,101,217,0,191,88,96,0,196,94,99,255,106,238,11,254,53,126,243,0,94,1,101,255,46,147,2,0,201,124,124,255,141,12,218,0,13,166,157,1,48,251,237,255,155,250,124,255,106,148,146,255,182,13,202,0,28,61,167,0,217,152,8,254,220,130,45,255,200,230,255,1,55,65,87,255,93,191,97,254,114,251,14,0,32,105,92,1,26,207,141,0,24,207,13,254,21,50,48,255,186,148,116,255,211,43,225,0,37,34,162,254,164,210,42,255,68,23,96,255,182,214,8,255,245,117,137,255,66,195,50,0,75,12,83,254,80,140,164,0,9,165,36,1,228,110,227,0,241,17,90,1,25,52,212,0,6,223,12,255,139,243,57,0,12,113,75,1,246,183,191,255,213,191,69,255,230,15,142,0,1,195,196,255,138,171,47,255,64,63,106,1,16,169,214,255,207,174,56,1,88,73,133,255,182,133,140,0,177,14,25,255,147,184,53,255,10,227,161,255,120,216,244,255,73,77,233,0,157,238,139,1,59,65,233,0,70,251,216,1,41,184,153,255,32,203,112,0,146,147,253,0,87,101,109,1,44,82,133,255,244,150,53,255,94,152,232,255,59,93,39,255,88,147,220,255,78,81,13,1,32,47,252,255,160,19,114,255,93,107,39,255,118,16,211,1,185,119,209,255,227,219,127,254,88,105,236,255,162,110,23,255,36,166,110,255,91,236,221,255,66,234,116,0,111,19,244,254,10,233,26,0,32,183,6,254,2,191,242,0,218,156,53,254,41,60,70,255,168,236,111,0,121,185,126,255,238,142,207,255,55,126,52,0,220,129,208,254,80,204,164,255,67,23,144,254,218,40,108,255,127,202,164,0,203,33,3,255,2,158,0,0,37,96,188,255,192,49,74,0,109,4,0,0,111,167,10,254,91,218,135,255,203,66,173,255,150,194,226,0,201,253,6,255,174,102,121,0,205,191,110,0,53,194,4,0,81,40,45,254,35,102,143,255,12,108,198,255,16,27,232,255,252,71,186,1,176,110,114,0,142,3,117,1,113,77,142,0,19,156,197,1,92,47,252,0,53,232,22,1,54,18,235,0,46,35,189,255,236,212,129,0,2,96,208,254,200,238,199,255,59,175,164,255,146,43,231,0,194,217,52,255,3,223,12,0,138,54,178,254,85,235,207,0,232,207,34,0,49,52,50,255,166,113,89,255,10,45,216,255,62,173,28,0,111,165,246,0,118,115,91,255,128,84,60,0,167,144,203,0,87,13,243,0,22,30,228,1,177,113,146,255,129,170,230,254,252,153,129,255,145,225,43,0,70,231,5,255,122,105,126,254,86,246,148,255,110,37,154,254,209,3,91,0,68,145,62,0,228,16,165,255,55,221,249,254,178,210,91,0,83,146,226,254,69,146,186,0,93,210,104,254,16,25,173,0,231,186,38,0,189,122,140,255,251,13,112,255,105,110,93,0,251,72,170,0,192,23,223,255,24,3,202,1,225,93,228,0,153,147,199,254,109,170,22,0,248,101,246,255,178,124,12,255,178,254,102,254,55,4,65,0,125,214,180,0,183,96,147,0,45,117,23,254,132,191,249,0,143,176,203,254,136,183,54,255,146,234,177,0,146,101,86,255,44,123,143,1,33,209,152,0,192,90,41,254,83,15,125,255,213,172,82,0,215,169,144,0,16,13,34,0,32,209,100,255,84,18,249,1,197,17,236,255,217,186,230,0,49,160,176,255,111,118,97,255,237,104,235,0,79,59,92,254,69,249,11,255,35,172,74,1,19,118,68,0,222,124,165,255,180,66,35,255,86,174,246,0,43,74,111,255,126,144,86,255,228,234,91,0,242,213,24,254,69,44,235,255,220,180,35,0,8,248,7,255,102,47,92,255,240,205,102,255,113,230,171,1,31,185,201,255,194,246,70,255,122,17,187,0,134,70,199,255,149,3,150,255,117,63,103,0,65,104,123,255,212,54,19,1,6,141,88,0,83,134,243,255,136,53,103,0,169,27,180,0,177,49,24,0,111,54,167,0,195,61,215,255,31,1,108,1,60,42,70,0,185,3,162,255,194,149,40,255,246,127,38,254,190,119,38,255,61,119,8,1,96,161,219,255,42,203,221,1,177,242,164,255,245,159,10,0,116,196,0,0,5,93,205,254,128,127,179,0,125,237,246,255,149,162,217,255,87,37,20,254,140,238,192,0,9,9,193,0,97,1,226,0,29,38,10,0,0,136,63,255,229,72,210,254,38,134,92,255,78,218,208,1,104,36,84,255,12,5,193,255,242,175,61,255,191,169,46,1,179,147,147,255,113,190,139,254,125,172,31,0,3,75,252,254,215,36,15,0,193,27,24,1,255,69,149,255,110,129,118,0,203,93,249,0,138,137,64,254,38,70,6,0,153,116,222,0,161,74,123,0,193,99,79,255,118,59,94,255,61,12,43,1,146,177,157,0,46,147,191,0,16,255,38,0,11,51,31,1,60,58,98,255,111,194,77,1,154,91,244,0,140,40,144,1,173,10,251,0,203,209,50,254,108,130,78,0,228,180,90,0,174,7,250,0,31,174,60,0,41,171,30,0,116,99,82,255,118,193,139,255,187,173,198,254,218,111,56,0,185,123,216,0,249,158,52,0,52,180,93,255,201,9,91,255,56,45,166,254,132,155,203,255,58,232,110,0,52,211,89,255,253,0,162,1,9,87,183,0,145,136,44,1,94,122,245,0,85,188,171,1,147,92,198,0,0,8,104,0,30,95,174,0,221,230,52,1,247,247,235,255,137,174,53,255,35,21,204,255,71,227,214,1,232,82,194,0,11,48,227,255,170,73,184,255,198,251,252,254,44,112,34,0,131,101,131,255,72,168,187,0,132,135,125,255,138,104,97,255,238,184,168,255,243,104,84,255,135,216,226,255,139,144,237,0,188,137,150,1,80,56,140,255,86,169,167,255,194,78,25,255,220,17,180,255,17,13,193,0,117,137,212,255,141,224,151,0,49,244,175,0,193,99,175,255,19,99,154,1,255,65,62,255,156,210,55,255,242,244,3,255,250,14,149,0,158,88,217,255,157,207,134,254,251,232,28,0,46,156,251,255,171,56,184,255,239,51,234,0,142,138,131,255,25,254,243,1,10,201,194,0,63,97,75,0,210,239,162,0,192,200,31,1,117,214,243,0,24,71,222,254,54,40,232,255,76,183,111,254,144,14,87,255,214,79,136,255,216,196,212,0,132,27,140,254,131,5,253,0,124,108,19,255,28,215,75,0,76,222,55,254,233,182,63,0,68,171,191,254,52,111,222,255,10,105,77,255,80,170,235,0,143,24,88,255,45,231,121,0,148,129,224,1,61,246,84,0,253,46,219,255,239,76,33,0,49,148,18,254,230,37,69,0,67,134,22,254,142,155,94,0,31,157,211,254,213,42,30,255,4,228,247,254,252,176,13,255,39,0,31,254,241,244,255,255,170,45,10,254,253,222,249,0,222,114,132,0,255,47,6,255,180,163,179,1,84,94,151,255,89,209,82,254,229,52,169,255,213,236,0,1,214,56,228,255,135,119,151,255,112,201,193,0,83,160,53,254,6,151,66,0,18,162,17,0,233,97,91,0,131,5,78,1,181,120,53,255,117,95,63,255,237,117,185,0,191,126,136,255,144,119,233,0,183,57,97,1,47,201,187,255,167,165,119,1,45,100,126,0,21,98,6,254,145,150,95,255,120,54,152,0,209,98,104,0,143,111,30,254,184,148,249,0,235,216,46,0,248,202,148,255,57,95,22,0,242,225,163,0,233,247,232,255,71,171,19,255,103,244,49,255,84,103,93,255,68,121,244,1,82,224,13,0,41,79,43,255,249,206,167,255,215,52,21,254,192,32,22,255,247,111,60,0,101,74,38,255,22,91,84,254,29,28,13,255,198,231,215,254,244,154,200,0,223,137,237,0,211,132,14,0,95,64,206,255,17,62,247,255,233,131,121,1,93,23,77,0,205,204,52,254,81,189,136,0,180,219,138,1,143,18,94,0,204,43,140,254,188,175,219,0,111,98,143,255,151,63,162,255,211,50,71,254,19,146,53,0,146,45,83,254,178,82,238,255,16,133,84,255,226,198,93,255,201,97,20,255,120,118,35,255,114,50,231,255,162,229,156,255,211,26,12,0,114,39,115,255,206,212,134,0,197,217,160,255,116,129,94,254,199,215,219,255,75,223,249,1,253,116,181,255,232,215,104,255,228,130,246,255,185,117,86,0,14,5,8,0,239,29,61,1,237,87,133,255,125,146,137,254,204,168,223,0,46,168,245,0,154,105,22,0,220,212,161,255,107,69,24,255,137,218,181,255,241,84,198,255,130,122,211,255,141,8,153,255,190,177,118,0,96,89,178,0,255,16,48,254,122,96,105,255,117,54,232,255,34,126,105,255,204,67,166,0,232,52,138,255,211,147,12,0,25,54,7,0,44,15,215,254,51,236,45,0,190,68,129,1,106,147,225,0,28,93,45,254,236,141,15,255,17,61,161,0,220,115,192,0,236,145,24,254,111,168,169,0,224,58,63,255,127,164,188,0,82,234,75,1,224,158,134,0,209,68,110,1,217,166,217,0,70,225,166,1,187,193,143,255,16,7,88,255,10,205,140,0,117,192,156,1,17,56,38,0,27,124,108,1,171,215,55,255,95,253,212,0,155,135,168,255,246,178,153,254,154,68,74,0,232,61,96,254,105,132,59,0,33,76,199,1,189,176,130,255,9,104,25,254,75,198,102,255,233,1,112,0,108,220,20,255,114,230,70,0,140,194,133,255,57,158,164,254,146,6,80,255,169,196,97,1,85,183,130,0,70,158,222,1,59,237,234,255,96,25,26,255,232,175,97,255,11,121,248,254,88,35,194,0,219,180,252,254,74,8,227,0,195,227,73,1,184,110,161,255,49,233,164,1,128,53,47,0,82,14,121,255,193,190,58,0,48,174,117,255,132,23,32,0,40,10,134,1,22,51,25,255,240,11,176,255,110,57,146,0,117,143,239,1,157,101,118,255,54,84,76,0,205,184,18,255,47,4,72,255,78,112,85,255,193,50,66,1,93,16,52,255,8,105,134,0,12,109,72,255,58,156,251,0,144,35,204,0,44,160,117,254,50,107,194,0,1,68,165,255,111,110,162,0,158,83,40,254,76,214,234,0,58,216,205,255,171,96,147,255,40,227,114,1,176,227,241,0,70,249,183,1,136,84,139,255,60,122,247,254,143,9,117,255,177,174,137,254,73,247,143,0,236,185,126,255,62,25,247,255,45,64,56,255,161,244,6,0,34,57,56,1,105,202,83,0,128,147,208,0,6,103,10,255,74,138,65,255,97,80,100,255,214,174,33,255,50,134,74,255,110,151,130,254,111,84,172,0,84,199,75,254,248,59,112,255,8,216,178,1,9,183,95,0,238,27,8,254,170,205,220,0,195,229,135,0,98,76,237,255,226,91,26,1,82,219,39,255,225,190,199,1,217,200,121,255,81,179,8,255,140,65,206,0,178,207,87,254,250,252,46,255,104,89,110,1,253,189,158,255,144,214,158,255,160,245,54,255,53,183,92,1,21,200,194,255,146,33,113,1,209,1,255,0,235,106,43,255,167,52,232,0,157,229,221,0,51,30,25,0,250,221,27,1,65,147,87,255,79,123,196,0,65,196,223,255,76,44,17,1,85,241,68,0,202,183,249,255,65,212,212,255,9,33,154,1,71,59,80,0,175,194,59,255,141,72,9,0,100,160,244,0,230,208,56,0,59,25,75,254,80,194,194,0,18,3,200,254,160,159,115,0,132,143,247,1,111,93,57,255,58,237,11,1,134,222,135,255,122,163,108,1,123,43,190,255,251,189,206,254,80,182,72,255,208,246,224,1,17,60,9,0,161,207,38,0,141,109,91,0,216,15,211,255,136,78,110,0,98,163,104,255,21,80,121,255,173,178,183,1,127,143,4,0,104,60,82,254,214,16,13,255,96,238,33,1,158,148,230,255,127,129,62,255,51,255,210,255,62,141,236,254,157,55,224,255,114,39,244,0,192,188,250,255,228,76,53,0,98,84,81,255,173,203,61,254,147,50,55,255,204,235,191,0,52,197,244,0,88,43,211,254,27,191,119,0,188,231,154,0,66,81,161,0,92,193,160,1,250,227,120,0,123,55,226,0,184,17,72,0,133,168,10,254,22,135,156,255,41,25,103,255,48,202,58,0,186,149,81,255,188,134,239,0,235,181,189,254,217,139,188,255,74,48,82,0,46,218,229,0,189,253,251,0,50,229,12,255,211,141,191,1,128,244,25,255,169,231,122,254,86,47,189,255,132,183,23,255,37,178,150,255,51,137,253,0,200,78,31,0,22,105,50,0,130,60,0,0,132,163,91,254,23,231,187,0,192,79,239,0,157,102,164,255,192,82,20,1,24,181,103,255,240,9,234,0,1,123,164,255,133,233,0,255,202,242,242,0,60,186,245,0,241,16,199,255,224,116,158,254,191,125,91,255,224,86,207,0,121,37,231,255,227,9,198,255,15,153,239,255,121,232,217,254,75,112,82,0,95,12,57,254,51,214,105,255,148,220,97,1,199,98,36,0,156,209,12,254,10,212,52,0,217,180,55,254,212,170,232,255,216,20,84,255,157,250,135,0,157,99,127,254,1,206,41,0,149,36,70,1,54,196,201,255,87,116,0,254,235,171,150,0,27,163,234,0,202,135,180,0,208,95,0,254,123,156,93,0,183,62,75,0,137,235,182,0,204,225,255,255,214,139,210,255,2,115,8,255,29,12,111,0,52,156,1,0,253,21,251,255,37,165,31,254,12,130,211,0,106,18,53,254,42,99,154,0,14,217,61,254,216,11,92,255,200,197,112,254,147,38,199,0,36,252,120,254,107,169,77,0,1,123,159,255,207,75,102,0,163,175,196,0,44,1,240,0,120,186,176,254,13,98,76,255,237,124,241,255,232,146,188,255,200,96,224,0,204,31,41,0,208,200,13,0,21,225,96,255,175,156,196,0,247,208,126,0,62,184,244,254,2,171,81,0,85,115,158,0,54,64,45,255,19,138,114,0,135,71,205,0,227,47,147,1,218,231,66,0,253,209,28,0,244,15,173,255,6,15,118,254,16,150,208,255,185,22,50,255,86,112,207,255,75,113,215,1,63,146,43,255,4,225,19,254,227,23,62,255,14,255,214,254,45,8,205,255,87,197,151,254,210,82,215,255,245,248,247,255,128,248,70,0,225,247,87,0,90,120,70,0,213,245,92,0,13,133,226,0,47,181,5,1,92,163,105,255,6,30,133,254,232,178,61,255,230,149,24,255,18,49,158,0,228,100,61,254,116,243,251,255,77,75,92,1,81,219,147,255,76,163,254,254,141,213,246,0,232,37,152,254,97,44,100,0,201,37,50,1,212,244,57,0,174,171,183,255,249,74,112,0,166,156,30,0,222,221,97,255,243,93,73,254,251,101,100,255,216,217,93,255,254,138,187,255,142,190,52,255,59,203,177,255,200,94,52,0,115,114,158,255,165,152,104,1,126,99,226,255,118,157,244,1,107,200,16,0,193,90,229,0,121,6,88,0,156,32,93,254,125,241,211,255,14,237,157,255,165,154,21,255,184,224,22,255,250,24,152,255,113,77,31,0,247,171,23,255,237,177,204,255,52,137,145,255,194,182,114,0,224,234,149,0,10,111,103,1,201,129,4,0,238,142,78,0,52,6,40,255,110,213,165,254,60,207,253,0,62,215,69,0,96,97,0,255,49,45,202,0,120,121,22,255,235,139,48,1,198,45,34,255,182,50,27,1,131,210,91,255,46,54,128,0,175,123,105,255,198,141,78,254,67,244,239,255,245,54,103,254,78,38,242,255,2,92,249,254,251,174,87,255,139,63,144,0,24,108,27,255,34,102,18,1,34,22,152,0,66,229,118,254,50,143,99,0,144,169,149,1,118,30,152,0,178,8,121,1,8,159,18,0,90,101,230,255,129,29,119,0,68,36,11,1,232,183,55,0,23,255,96,255,161,41,193,255,63,139,222,0,15,179,243,0,255,100,15,255,82,53,135,0,137,57,149,1,99,240,170,255,22,230,228,254,49,180,82,255,61,82,43,0,110,245,217,0,199,125,61,0,46,253,52,0,141,197,219,0,211,159,193,0,55,121,105,254,183,20,129,0,169,119,170,255,203,178,139,255,135,40,182,255,172,13,202,255,65,178,148,0,8,207,43,0,122,53,127,1,74,161,48,0,227,214,128,254,86,11,243,255,100,86,7,1,245,68,134,255,61,43,21,1,152,84,94,255,190,60,250,254,239,118,232,255,214,136,37,1,113,76,107,255,93,104,100,1,144,206,23,255,110,150,154,1,228,103,185,0,218,49,50,254,135,77,139,255,185,1,78,0,0,161,148,255,97,29,233,255,207,148,149,255,160,168,0,0,91,128,171,255,6,28,19,254,11,111,247,0,39,187,150,255,138,232,149,0,117,62,68,255,63,216,188,255,235,234,32,254,29,57,160,255,25,12,241,1,169,60,191,0,32,131,141,255,237,159,123,255,94,197,94,254,116,254,3,255,92,179,97,254,121,97,92,255,170,112,14,0,21,149,248,0,248,227,3,0,80,96,109,0,75,192,74,1,12,90,226,255,161,106,68,1,208,114,127,255,114,42,255,254,74,26,74,255,247,179,150,254,121,140,60,0,147,70,200,255,214,40,161,255,161,188,201,255,141,65,135,255,242,115,252,0,62,47,202,0,180,149,255,254,130,55,237,0,165,17,186,255,10,169,194,0,156,109,218,255,112,140,123,255,104,128,223,254,177,142,108,255,121,37,219,255,128,77,18,255,111,108,23,1,91,192,75,0,174,245,22,255,4,236,62,255,43,64,153,1,227,173,254,0,237,122,132,1,127,89,186,255,142,82,128,254,252,84,174,0,90,179,177,1,243,214,87,255,103,60,162,255,208,130,14,255,11,130,139,0,206,129,219,255,94,217,157,255,239,230,230,255,116,115,159,254,164,107,95,0,51,218,2,1,216,125,198,255,140,202,128,254,11,95,68,255,55,9,93,254,174,153,6,255,204,172,96,0,69,160,110,0,213,38,49,254,27,80,213,0,118,125,114,0,70,70,67,255,15,142,73,255,131,122,185,255,243,20,50,254,130,237,40,0,210,159,140,1,197,151,65,255,84,153,66,0,195,126,90,0,16,238,236,1,118,187,102,255,3,24,133,255,187,69,230,0,56,197,92,1,213,69,94,255,80,138,229,1,206,7,230,0,222,111,230,1,91,233,119,255,9,89,7,1,2,98,1,0,148,74,133,255,51,246,180,255,228,177,112,1,58,189,108,255,194,203,237,254,21,209,195,0,147,10,35,1,86,157,226,0,31,163,139,254,56,7,75,255,62,90,116,0,181,60,169,0,138,162,212,254,81,167,31,0,205,90,112,255,33,112,227,0,83,151,117,1,177,224,73,255,174,144,217,255,230,204,79,255,22,77,232,255,114,78,234,0,224,57,126,254,9,49,141,0,242,147,165,1,104,182,140,255,167,132,12,1,123,68,127,0,225,87,39,1,251,108,8,0,198,193,143,1,121,135,207,255,172,22,70,0,50,68,116,255,101,175,40,255,248,105,233,0,166,203,7,0,110,197,218,0,215,254,26,254,168,226,253,0,31,143,96,0,11,103,41,0,183,129,203,254,100,247,74,255,213,126,132,0,210,147,44,0,199,234,27,1,148,47,181,0,155,91,158,1,54,105,175,255,2,78,145,254,102,154,95,0,128,207,127,254,52,124,236,255,130,84,71,0,221,243,211,0,152,170,207,0,222,106,199,0,183,84,94,254,92,200,56,255,138,182,115,1,142,96,146,0,133,136,228,0,97,18,150,0,55,251,66,0,140,102,4,0,202,103,151,0,30,19,248,255,51,184,207,0,202,198,89,0,55,197,225,254,169,95,249,255,66,65,68,255,188,234,126,0,166,223,100,1,112,239,244,0,144,23,194,0,58,39,182,0,244,44,24,254,175,68,179,255,152,118,154,1,176,162,130,0,217,114,204,254,173,126,78,255,33,222,30,255,36,2,91,255,2,143,243,0,9,235,215,0,3,171,151,1,24,215,245,255,168,47,164,254,241,146,207,0,69,129,180,0,68,243,113,0,144,53,72,254,251,45,14,0,23,110,168,0,68,68,79,255,110,70,95,254,174,91,144,255,33,206,95,255,137,41,7,255,19,187,153,254,35,255,112,255,9,145,185,254,50,157,37,0,11,112,49,1,102,8,190,255,234,243,169,1,60,85,23,0,74,39,189,0,116,49,239,0,173,213,210,0,46,161,108,255,159,150,37,0,196,120,185,255,34,98,6,255,153,195,62,255,97,230,71,255,102,61,76,0,26,212,236,255,164,97,16,0,198,59,146,0,163,23,196,0,56,24,61,0,181,98,193,0,251,147,229,255,98,189,24,255,46,54,206,255,234,82,246,0,183,103,38,1,109,62,204,0,10,240,224,0,146,22,117,255,142,154,120,0,69,212,35,0,208,99,118,1,121,255,3,255,72,6,194,0,117,17,197,255,125,15,23,0,154,79,153,0,214,94,197,255,185,55,147,255,62,254,78,254,127,82,153,0,110,102,63,255,108,82,161,255,105,187,212,1,80,138,39,0,60,255,93,255,72,12,186,0,210,251,31,1,190,167,144,255,228,44,19,254,128,67,232,0,214,249,107,254,136,145,86,255,132,46,176,0,189,187,227,255,208,22,140,0,217,211,116,0,50,81,186,254,139,250,31,0,30,64,198,1,135,155,100,0,160,206,23,254,187,162,211,255,16,188,63,0,254,208,49,0,85,84,191,0,241,192,242,255,153,126,145,1,234,162,162,255,230,97,216,1,64,135,126,0,190,148,223,1,52,0,43,255,28,39,189,1,64,136,238,0,175,196,185,0,98,226,213,255,127,159,244,1,226,175,60,0,160,233,142,1,180,243,207,255,69,152,89,1,31,101,21,0,144,25,164,254,139,191,209,0,91,25,121,0,32,147,5,0,39,186,123,255,63,115,230,255,93,167,198,255,143,213,220,255,179,156,19,255,25,66,122,0,214,160,217,255,2,45,62,255,106,79,146,254,51,137,99,255,87,100,231,255,175,145,232,255,101,184,1,255,174,9,125,0,82,37,161,1,36,114,141,255,48,222,142,255,245,186,154,0,5,174,221,254,63,114,155,255,135,55,160,1,80,31,135,0,126,250,179,1,236,218,45,0,20,28,145,1,16,147,73,0,249,189,132,1,17,189,192,255,223,142,198,255,72,20,15,255,250,53,237,254,15,11,18,0,27,211,113,254,213,107,56,255,174,147,146,255,96,126,48,0,23,193,109,1,37,162,94,0,199,157,249,254,24,128,187,255,205,49,178,254,93,164,42,255,43,119,235,1,88,183,237,255,218,210,1,255,107,254,42,0,230,10,99,255,162,0,226,0,219,237,91,0,129,178,203,0,208,50,95,254,206,208,95,255,247,191,89,254,110,234,79,255,165,61,243,0,20,122,112,255,246,246,185,254,103,4,123,0,233,99,230,1,219,91,252,255,199,222,22,255,179,245,233,255,211,241,234,0,111,250,192,255,85,84,136,0,101,58,50,255,131,173,156,254,119,45,51,255,118,233,16,254,242,90,214,0,94,159,219,1,3,3,234,255,98,76,92,254,80,54,230,0,5,228,231,254,53,24,223,255,113,56,118,1,20,132,1,255,171,210,236,0,56,241,158,255,186,115,19,255,8,229,174,0,48,44,0,1,114,114,166,255,6,73,226,255,205,89,244,0,137,227,75,1,248,173,56,0,74,120,246,254,119,3,11,255,81,120,198,255,136,122,98,255,146,241,221,1,109,194,78,255,223,241,70,1,214,200,169,255,97,190,47,255,47,103,174,255,99,92,72,254,118,233,180,255,193,35,233,254,26,229,32,255,222,252,198,0,204,43,71,255,199,84,172,0,134,102,190,0,111,238,97,254,230,40,230,0,227,205,64,254,200,12,225,0,166,25,222,0,113,69,51,255,143,159,24,0,167,184,74,0,29,224,116,254,158,208,233,0,193,116,126,255,212,11,133,255,22,58,140,1,204,36,51,255,232,30,43,0,235,70,181,255,64,56,146,254,169,18,84,255,226,1,13,255,200,50,176,255,52,213,245,254,168,209,97,0,191,71,55,0,34,78,156,0,232,144,58,1,185,74,189,0,186,142,149,254,64,69,127,255,161,203,147,255,176,151,191,0,136,231,203,254,163,182,137,0,161,126,251,254,233,32,66,0,68,207,66,0,30,28,37,0,93,114,96,1,254,92,247,255,44,171,69,0,202,119,11,255,188,118,50,1,255,83,136,255,71,82,26,0,70,227,2,0,32,235,121,1,181,41,154,0,71,134,229,254,202,255,36,0,41,152,5,0,154,63,73,255,34,182,124,0,121,221,150,255,26,204,213,1,41,172,87,0,90,157,146,255,109,130,20,0,71,107,200,255,243,102,189,0,1,195,145,254,46,88,117,0,8,206,227,0,191,110,253,255,109,128,20,254,134,85,51,255,137,177,112,1,216,34,22,255,131,16,208,255,121,149,170,0,114,19,23,1,166,80,31,255,113,240,122,0,232,179,250,0,68,110,180,254,210,170,119,0,223,108,164,255,207,79,233,255,27,229,226,254,209,98,81,255,79,68,7,0,131,185,100,0,170,29,162,255,17,162,107,255,57,21,11,1,100,200,181,255,127,65,166,1,165,134,204,0,104,167,168,0,1,164,79,0,146,135,59,1,70,50,128,255,102,119,13,254,227,6,135,0,162,142,179,255,160,100,222,0,27,224,219,1,158,93,195,255,234,141,137,0,16,24,125,255,238,206,47,255,97,17,98,255,116,110,12,255,96,115,77,0,91,227,232,255,248,254,79,255,92,229,6,254,88,198,139,0,206,75,129,0,250,77,206,255,141,244,123,1,138,69,220,0,32,151,6,1,131,167,22,255,237,68,167,254,199,189,150,0,163,171,138,255,51,188,6,255,95,29,137,254,148,226,179,0,181,107,208,255,134,31,82,255,151,101,45,255,129,202,225,0,224,72,147,0,48,138,151,255,195,64,206,254,237,218,158,0,106,29,137,254,253,189,233,255,103,15,17,255,194,97,255,0,178,45,169,254,198,225,155,0,39,48,117,255,135,106,115,0,97,38,181,0,150,47,65,255,83,130,229,254,246,38,129,0,92,239,154,254,91,99,127,0,161,111,33,255,238,217,242,255,131,185,195,255,213,191,158,255,41,150,218,0,132,169,131,0,89,84,252,1,171,70,128,255,163,248,203,254,1,50,180,255,124,76,85,1,251,111,80,0,99,66,239,255,154,237,182,255,221,126,133,254,74,204,99,255,65,147,119,255,99,56,167,255,79,248,149,255,116,155,228,255,237,43,14,254,69,137,11,255,22,250,241,1,91,122,143,255,205,249,243,0,212,26,60,255,48,182,176,1,48,23,191,255,203,121,152,254,45,74,213,255,62,90,18,254,245,163,230,255,185,106,116,255,83,35,159,0,12,33,2,255,80,34,62,0,16,87,174,255,173,101,85,0,202,36,81,254,160,69,204,255,64,225,187,0,58,206,94,0,86,144,47,0,229,86,245,0,63,145,190,1,37,5,39,0,109,251,26,0,137,147,234,0,162,121,145,255,144,116,206,255,197,232,185,255,183,190,140,255,73,12,254,255,139,20,242,255,170,90,239,255,97,66,187,255,245,181,135,254,222,136,52,0,245,5,51,254,203,47,78,0,152,101,216,0,73,23,125,0,254,96,33,1,235,210,73,255,43,209,88,1,7,129,109,0,122,104,228,254,170,242,203,0,242,204,135,255,202,28,233,255,65,6,127,0,159,144,71,0,100,140,95,0,78,150,13,0,251,107,118,1,182,58,125,255,1,38,108,255,141,189,209,255,8,155,125,1,113,163,91,255,121,79,190,255,134,239,108,255,76,47,248,0,163,228,239,0,17,111,10,0,88,149,75,255,215,235,239,0,167,159,24,255,47,151,108,255,107,209,188,0,233,231,99,254,28,202,148,255,174,35,138,255,110,24,68,255,2,69,181,0,107,102,82,0,102,237,7,0,92,36,237,255,221,162,83,1,55,202,6,255,135,234,135,255,24,250,222,0,65,94,168,254,245,248,210,255,167,108,201,254,255,161,111,0,205,8,254,0,136,13,116,0,100,176,132,255,43,215,126,255,177,133,130,255,158,79,148,0,67,224,37,1,12,206,21,255,62,34,110,1,237,104,175,255,80,132,111,255,142,174,72,0,84,229,180,254,105,179,140,0,64,248,15,255,233,138,16,0,245,67,123,254,218,121,212,255,63,95,218,1,213,133,137,255,143,182,82,255,48,28,11,0,244,114,141,1,209,175,76,255,157,181,150,255,186,229,3,255,164,157,111,1,231,189,139,0,119,202,190,255,218,106,64,255,68,235,63,254,96,26,172,255,187,47,11,1,215,18,251,255,81,84,89,0,68,58,128,0,94,113,5,1,92,129,208,255,97,15,83,254,9,28,188,0,239,9,164,0,60,205,152,0,192,163,98,255,184,18,60,0,217,182,139,0,109,59,120,255,4,192,251,0,169,210,240,255,37,172,92,254,148,211,245,255,179,65,52,0,253,13,115,0,185,174,206,1,114,188,149,255,237,90,173,0,43,199,192,255,88,108,113,0,52,35,76,0,66,25,148,255,221,4,7,255,151,241,114,255,190,209,232,0,98,50,199,0,151,150,213,255,18,74,36,1,53,40,7,0,19,135,65,255,26,172,69,0,174,237,85,0,99,95,41,0,3,56,16,0,39,160,177,255,200,106,218,254,185,68,84,255,91,186,61,254,67,143,141,255,13,244,166,255,99,114,198,0,199,110,163,255,193,18,186,0,124,239,246,1,110,68,22,0,2,235,46,1,212,60,107,0,105,42,105,1,14,230,152,0,7,5,131,0,141,104,154,255,213,3,6,0,131,228,162,255,179,100,28,1,231,123,85,255,206,14,223,1,253,96,230,0,38,152,149,1,98,137,122,0,214,205,3,255,226,152,179,255,6,133,137,0,158,69,140,255,113,162,154,255,180,243,172,255,27,189,115,255,143,46,220,255,213,134,225,255,126,29,69,0,188,43,137,1,242,70,9,0,90,204,255,255,231,170,147,0,23,56,19,254,56,125,157,255,48,179,218,255,79,182,253,255,38,212,191,1,41,235,124,0,96,151,28,0,135,148,190,0,205,249,39,254,52,96,136,255,212,44,136,255,67,209,131,255,252,130,23,255,219,128,20,255,198,129,118,0,108,101,11,0,178,5,146,1,62,7,100,255,181,236,94,254,28,26,164,0,76,22,112,255,120,102,79,0,202,192,229,1,200,176,215,0,41,64,244,255,206,184,78,0,167,45,63,1,160,35,0,255,59,12,142,255,204,9,144,255,219,94,229,1,122,27,112,0,189,105,109,255,64,208,74,255,251,127,55,1,2,226,198,0,44,76,209,0,151,152,77,255,210,23,46,1,201,171,69,255,44,211,231,0,190,37,224,255,245,196,62,255,169,181,222,255,34,211,17,0,119,241,197,255,229,35,152,1,21,69,40,255,178,226,161,0,148,179,193,0,219,194,254,1,40,206,51,255,231,92,250,1,67,153,170,0,21,148,241,0,170,69,82,255,121,18,231,255,92,114,3,0,184,62,230,0,225,201,87,255,146,96,162,255,181,242,220,0,173,187,221,1,226,62,170,255,56,126,217,1,117,13,227,255,179,44,239,0,157,141,155,255,144,221,83,0,235,209,208,0,42,17,165,1,251,81,133,0,124,245,201,254,97,211,24,255,83,214,166,0,154,36,9,255,248,47,127,0,90,219,140,255,161,217,38,254,212,147,63,255,66,84,148,1,207,3,1,0,230,134,89,1,127,78,122,255,224,155,1,255,82,136,74,0,178,156,208,255,186,25,49,255,222,3,210,1,229,150,190,255,85,162,52,255,41,84,141,255,73,123,84,254,93,17,150,0,119,19,28,1,32,22,215,255,28,23,204,255,142,241,52,255,228,52,125,0,29,76,207,0,215,167,250,254,175,164,230,0,55,207,105,1,109,187,245,255,161,44,220,1,41,101,128,255,167,16,94,0,93,214,107,255,118,72,0,254,80,61,234,255,121,175,125,0,139,169,251,0,97,39,147,254,250,196,49,255,165,179,110,254,223,70,187,255,22,142,125,1,154,179,138,255,118,176,42,1,10,174,153,0,156,92,102,0,168,13,161,255,143,16,32,0,250,197,180,255,203,163,44,1,87,32,36,0,161,153,20,255,123,252,15,0,25,227,80,0,60,88,142,0,17,22,201,1,154,205,77,255,39,63,47,0,8,122,141,0,128,23,182,254,204,39,19,255,4,112,29,255,23,36,140,255,210,234,116,254,53,50,63,255,121,171,104,255,160,219,94,0,87,82,14,254,231,42,5,0,165,139,127,254,86,78,38,0,130,60,66,254,203,30,45,255,46,196,122,1,249,53,162,255,136,143,103,254,215,210,114,0,231,7,160,254,169,152,42,255,111,45,246,0,142,131,135,255,131,71,204,255,36,226,11,0,0,28,242,255,225,138,213,255,247,46,216,254,245,3,183,0,108,252,74,1,206,26,48,255,205,54,246,255,211,198,36,255,121,35,50,0,52,216,202,255,38,139,129,254,242,73,148,0,67,231,141,255,42,47,204,0,78,116,25,1,4,225,191,255,6,147,228,0,58,88,177,0,122,165,229,255,252,83,201,255,224,167,96,1,177,184,158,255,242,105,179,1,248,198,240,0,133,66,203,1,254,36,47,0,45,24,115,255,119,62,254,0,196,225,186,254,123,141,172,0,26,85,41,255,226,111,183,0,213,231,151,0,4,59,7,255,238,138,148,0,66,147,33,255,31,246,141,255,209,141,116,255,104,112,31,0,88,161,172,0,83,215,230,254,47,111,151,0,45,38,52,1,132,45,204,0,138,128,109,254,233,117,134,255,243,190,173,254,241,236,240,0,82,127,236,254,40,223,161,255,110,182,225,255,123,174,239,0,135,242,145,1,51,209,154,0,150,3,115,254,217,164,252,255,55,156,69,1,84,94,255,255,232,73,45,1,20,19,212,255,96,197,59,254,96,251,33,0,38,199,73,1,64,172,247,255,117,116,56,255,228,17,18,0,62,138,103,1,246,229,164,255,244,118,201,254,86,32,159,255,109,34,137,1,85,211,186,0,10,193,193,254,122,194,177,0,122,238,102,255,162,218,171,0,108,217,161,1,158,170,34,0,176,47,155,1,181,228,11,255,8,156,0,0,16,75,93,0,206,98,255,1,58,154,35,0,12,243,184,254,67,117,66,255,230,229,123,0,201,42,110,0,134,228,178,254,186,108,118,255,58,19,154,255,82,169,62,255,114,143,115,1,239,196,50,255,173,48,193,255,147,2,84,255,150,134,147,254,95,232,73,0,109,227,52,254,191,137,10,0,40,204,30,254,76,52,97,255,164,235,126,0,254,124,188,0,74,182,21,1,121,29,35,255,241,30,7,254,85,218,214,255,7,84,150,254,81,27,117,255,160,159,152,254,66,24,221,255,227,10,60,1,141,135,102,0,208,189,150,1,117,179,92,0,132,22,136,255,120,199,28,0,21,129,79,254,182,9,65,0,218,163,169,0,246,147,198,255,107,38,144,1,78,175,205,255,214,5,250,254,47,88,29,255,164,47,204,255,43,55,6,255,131,134,207,254,116,100,214,0,96,140,75,1,106,220,144,0,195,32,28,1,172,81,5,255,199,179,52,255,37,84,203,0,170,112,174,0,11,4,91,0,69,244,27,1,117,131,92,0,33,152,175,255,140,153,107,255,251,135,43,254,87,138,4,255,198,234,147,254,121,152,84,255,205,101,155,1,157,9,25,0,72,106,17,254,108,153,0,255],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+20480);allocate([189,229,186,0,193,8,176,255,174,149,209,0,238,130,29,0,233,214,126,1,61,226,102,0,57,163,4,1,198,111,51,255,45,79,78,1,115,210,10,255,218,9,25,255,158,139,198,255,211,82,187,254,80,133,83,0,157,129,230,1,243,133,134,255,40,136,16,0,77,107,79,255,183,85,92,1,177,204,202,0,163,71,147,255,152,69,190,0,172,51,188,1,250,210,172,255,211,242,113,1,89,89,26,255,64,66,111,254,116,152,42,0,161,39,27,255,54,80,254,0,106,209,115,1,103,124,97,0,221,230,98,255,31,231,6,0,178,192,120,254,15,217,203,255,124,158,79,0,112,145,247,0,92,250,48,1,163,181,193,255,37,47,142,254,144,189,165,255,46,146,240,0,6,75,128,0,41,157,200,254,87,121,213,0,1,113,236,0,5,45,250,0,144,12,82,0,31,108,231,0,225,239,119,255,167,7,189,255,187,228,132,255,110,189,34,0,94,44,204,1,162,52,197,0,78,188,241,254,57,20,141,0,244,146,47,1,206,100,51,0,125,107,148,254,27,195,77,0,152,253,90,1,7,143,144,255,51,37,31,0,34,119,38,255,7,197,118,0,153,188,211,0,151,20,116,254,245,65,52,255,180,253,110,1,47,177,209,0,161,99,17,255,118,222,202,0,125,179,252,1,123,54,126,255,145,57,191,0,55,186,121,0,10,243,138,0,205,211,229,255,125,156,241,254,148,156,185,255,227,19,188,255,124,41,32,255,31,34,206,254,17,57,83,0,204,22,37,255,42,96,98,0,119,102,184,1,3,190,28,0,110,82,218,255,200,204,192,255,201,145,118,0,117,204,146,0,132,32,98,1,192,194,121,0,106,161,248,1,237,88,124,0,23,212,26,0,205,171,90,255,248,48,216,1,141,37,230,255,124,203,0,254,158,168,30,255,214,248,21,0,112,187,7,255,75,133,239,255,74,227,243,255,250,147,70,0,214,120,162,0,167,9,179,255,22,158,18,0,218,77,209,1,97,109,81,255,244,33,179,255,57,52,57,255,65,172,210,255,249,71,209,255,142,169,238,0,158,189,153,255,174,254,103,254,98,33,14,0,141,76,230,255,113,139,52,255,15,58,212,0,168,215,201,255,248,204,215,1,223,68,160,255,57,154,183,254,47,231,121,0,106,166,137,0,81,136,138,0,165,43,51,0,231,139,61,0,57,95,59,254,118,98,25,255,151,63,236,1,94,190,250,255,169,185,114,1,5,250,58,255,75,105,97,1,215,223,134,0,113,99,163,1,128,62,112,0,99,106,147,0,163,195,10,0,33,205,182,0,214,14,174,255,129,38,231,255,53,182,223,0,98,42,159,255,247,13,40,0,188,210,177,1,6,21,0,255,255,61,148,254,137,45,129,255,89,26,116,254,126,38,114,0,251,50,242,254,121,134,128,255,204,249,167,254,165,235,215,0,202,177,243,0,133,141,62,0,240,130,190,1,110,175,255,0,0,20,146,1,37,210,121,255,7,39,130,0,142,250,84,255,141,200,207,0,9,95,104,255,11,244,174,0,134,232,126,0,167,1,123,254,16,193,149,255,232,233,239,1,213,70,112,255,252,116,160,254,242,222,220,255,205,85,227,0,7,185,58,0,118,247,63,1,116,77,177,255,62,245,200,254,63,18,37,255,107,53,232,254,50,221,211,0,162,219,7,254,2,94,43,0,182,62,182,254,160,78,200,255,135,140,170,0,235,184,228,0,175,53,138,254,80,58,77,255,152,201,2,1,63,196,34,0,5,30,184,0,171,176,154,0,121,59,206,0,38,99,39,0,172,80,77,254,0,134,151,0,186,33,241,254,94,253,223,255,44,114,252,0,108,126,57,255,201,40,13,255,39,229,27,255,39,239,23,1,151,121,51,255,153,150,248,0,10,234,174,255,118,246,4,254,200,245,38,0,69,161,242,1,16,178,150,0,113,56,130,0,171,31,105,0,26,88,108,255,49,42,106,0,251,169,66,0,69,93,149,0,20,57,254,0,164,25,111,0,90,188,90,255,204,4,197,0,40,213,50,1,212,96,132,255,88,138,180,254,228,146,124,255,184,246,247,0,65,117,86,255,253,102,210,254,254,121,36,0,137,115,3,255,60,24,216,0,134,18,29,0,59,226,97,0,176,142,71,0,7,209,161,0,189,84,51,254,155,250,72,0,213,84,235,255,45,222,224,0,238,148,143,255,170,42,53,255,78,167,117,0,186,0,40,255,125,177,103,255,69,225,66,0,227,7,88,1,75,172,6,0,169,45,227,1,16,36,70,255,50,2,9,255,139,193,22,0,143,183,231,254,218,69,50,0,236,56,161,1,213,131,42,0,138,145,44,254,136,229,40,255,49,63,35,255,61,145,245,255,101,192,2,254,232,167,113,0,152,104,38,1,121,185,218,0,121,139,211,254,119,240,35,0,65,189,217,254,187,179,162,255,160,187,230,0,62,248,14,255,60,78,97,0,255,247,163,255,225,59,91,255,107,71,58,255,241,47,33,1,50,117,236,0,219,177,63,254,244,90,179,0,35,194,215,255,189,67,50,255,23,135,129,0,104,189,37,255,185,57,194,0,35,62,231,255,220,248,108,0,12,231,178,0,143,80,91,1,131,93,101,255,144,39,2,1,255,250,178,0,5,17,236,254,139,32,46,0,204,188,38,254,245,115,52,255,191,113,73,254,191,108,69,255,22,69,245,1,23,203,178,0,170,99,170,0,65,248,111,0,37,108,153,255,64,37,69,0,0,88,62,254,89,148,144,255,191,68,224,1,241,39,53,0,41,203,237,255,145,126,194,255,221,42,253,255,25,99,151,0,97,253,223,1,74,115,49,255,6,175,72,255,59,176,203,0,124,183,249,1,228,228,99,0,129,12,207,254,168,192,195,255,204,176,16,254,152,234,171,0,77,37,85,255,33,120,135,255,142,194,227,1,31,214,58,0,213,187,125,255,232,46,60,255,190,116,42,254,151,178,19,255,51,62,237,254,204,236,193,0,194,232,60,0,172,34,157,255,189,16,184,254,103,3,95,255,141,233,36,254,41,25,11,255,21,195,166,0,118,245,45,0,67,213,149,255,159,12,18,255,187,164,227,1,160,25,5,0,12,78,195,1,43,197,225,0,48,142,41,254,196,155,60,255,223,199,18,1,145,136,156,0,252,117,169,254,145,226,238,0,239,23,107,0,109,181,188,255,230,112,49,254,73,170,237,255,231,183,227,255,80,220,20,0,194,107,127,1,127,205,101,0,46,52,197,1,210,171,36,255,88,3,90,255,56,151,141,0,96,187,255,255,42,78,200,0,254,70,70,1,244,125,168,0,204,68,138,1,124,215,70,0,102,66,200,254,17,52,228,0,117,220,143,254,203,248,123,0,56,18,174,255,186,151,164,255,51,232,208,1,160,228,43,255,249,29,25,1,68,190,63,0,98,108,97,107,101,50,98,0,83,45,62,98,117,102,108,101,110,32,60,61,32,66,76,65,75,69,50,66,95,66,76,79,67,75,66,89,84,69,83,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,47,98,108,97,107,101,50,47,114,101,102,47,98,108,97,107,101,50,98,45,114,101,102,46,99,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,95,102,105,110,97,108,0,111,117,116,108,101,110,32,60,61,32,85,73,78,84,56,95,77,65,88,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,47,98,108,97,107,101,50,47,114,101,102,47,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,46,99,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,0,107,101,121,108,101,110,32,60,61,32,85,73,78,84,56,95,77,65,88,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,105,110,105,116,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,102,105,110,97,108,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,40,41,59,32,125,0,123,32,105,102,32,40,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,61,61,32,117,110,100,101,102,105,110,101,100,41,32,123,32,116,114,121,32,123,32,118,97,114,32,119,105,110,100,111,119,95,32,61,32,34,111,98,106,101,99,116,34,32,61,61,61,32,116,121,112,101,111,102,32,119,105,110,100,111,119,32,63,32,119,105,110,100,111,119,32,58,32,115,101,108,102,44,32,99,114,121,112,116,111,95,32,61,32,116,121,112,101,111,102,32,119,105,110,100,111,119,95,46,99,114,121,112,116,111,32,33,61,61,32,34,117,110,100,101,102,105,110,101,100,34,32,63,32,119,105,110,100,111,119,95,46,99,114,121,112,116,111,32,58,32,119,105,110,100,111,119,95,46,109,115,67,114,121,112,116,111,44,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,32,61,32,102,117,110,99,116,105,111,110,40,41,32,123,32,118,97,114,32,98,117,102,32,61,32,110,101,119,32,85,105,110,116,51,50,65,114,114,97,121,40,49,41,59,32,99,114,121,112,116,111,95,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,115,40,98,117,102,41,59,32,114,101,116,117,114,110,32,98,117,102,91,48,93,32,62,62,62,32,48,59,32,125,59,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,40,41,59,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,59,32,125,32,99,97,116,99,104,32,40,101,41,32,123,32,116,114,121,32,123,32,118,97,114,32,99,114,121,112,116,111,32,61,32,114,101,113,117,105,114,101,40,39,99,114,121,112,116,111,39,41,44,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,32,61,32,102,117,110,99,116,105,111,110,40,41,32,123,32,118,97,114,32,98,117,102,32,61,32,99,114,121,112,116,111,46,114,97,110,100,111,109,66,121,116,101,115,40,52,41,59,32,114,101,116,117,114,110,32,40,98,117,102,91,48,93,32,60,60,32,50,52,32,124,32,98,117,102,91,49,93,32,60,60,32,49,54,32,124,32,98,117,102,91,50,93,32,60,60,32,56,32,124,32,98,117,102,91,51,93,41,32,62,62,62,32,48,59,32,125,59,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,40,41,59,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,59,32,125,32,99,97,116,99,104,32,40,101,41,32,123,32,116,104,114,111,119,32,39,78,111,32,115,101,99,117,114,101,32,114,97,110,100,111,109,32,110,117,109,98,101,114,32,103,101,110,101,114,97,116,111,114,32,102,111,117,110,100,39,59,32,125,32,125,32,125,32,125,0,98,117,102,95,108,101,110,32,60,61,32,83,73,90,69,95,77,65,88,0,114,97,110,100,111,109,98,121,116,101,115,47,114,97,110,100,111,109,98,121,116,101,115,46,99,0,114,97,110,100,111,109,98,121,116,101,115,0,49,46,48,46,49,48,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+30720);var tempDoublePtr=STATICTOP;STATICTOP+=16;Module["_bitshift64Ashr"]=_bitshift64Ashr;Module["_i64Subtract"]=_i64Subtract;Module["_i64Add"]=_i64Add;Module["_memset"]=_memset;Module["_bitshift64Lshr"]=_bitshift64Lshr;Module["_bitshift64Shl"]=_bitshift64Shl;function _abort(){Module["abort"]()}function ___assert_fail(condition,filename,line,func){ABORT=true;throw"Assertion failed: "+Pointer_stringify(condition)+", at: "+[filename?Pointer_stringify(filename):"unknown filename",line,func?Pointer_stringify(func):"unknown function"]+" at "+stackTrace()}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}Module["_memcpy"]=_memcpy;Module["___muldsi3"]=___muldsi3;Module["___muldi3"]=___muldi3;function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name){switch(name){case 30:return PAGE_SIZE;case 85:return totalMemory/PAGE_SIZE;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 79:return 0;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:{if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;return 1}}___setErrNo(ERRNO_CODES.EINVAL);return-1}function _sbrk(bytes){var self=_sbrk;if(!self.called){DYNAMICTOP=alignMemoryPage(DYNAMICTOP);self.called=true;assert(Runtime.dynamicAlloc);self.alloc=Runtime.dynamicAlloc;Runtime.dynamicAlloc=(function(){abort("cannot dynamically allocate, sbrk now has control")})}var ret=DYNAMICTOP;if(bytes!=0){var success=self.alloc(bytes);if(!success)return-1>>>0}return ret}Module["_memmove"]=_memmove;Module["_pthread_self"]=_pthread_self;STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);staticSealed=true;STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=DYNAMICTOP=Runtime.alignMemory(STACK_MAX);Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};Module.asmLibraryArg={"abort":abort,"assert":assert,"_emscripten_asm_const_i":_emscripten_asm_const_i,"___assert_fail":___assert_fail,"_abort":_abort,"___setErrNo":___setErrNo,"_sbrk":_sbrk,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_emscripten_asm_const_v":_emscripten_asm_const_v,"_sysconf":_sysconf,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=0;var n=0;var o=0;var p=0;var q=global.NaN,r=global.Infinity;var s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;var B=0;var C=global.Math.floor;var D=global.Math.abs;var E=global.Math.sqrt;var F=global.Math.pow;var G=global.Math.cos;var H=global.Math.sin;var I=global.Math.tan;var J=global.Math.acos;var K=global.Math.asin;var L=global.Math.atan;var M=global.Math.atan2;var N=global.Math.exp;var O=global.Math.log;var P=global.Math.ceil;var Q=global.Math.imul;var R=global.Math.min;var S=global.Math.clz32;var T=env.abort;var U=env.assert;var V=env._emscripten_asm_const_i;var W=env.___assert_fail;var X=env._abort;var Y=env.___setErrNo;var Z=env._sbrk;var _=env._emscripten_memcpy_big;var $=env._emscripten_asm_const_v;var aa=env._sysconf;var ba=0;
// EMSCRIPTEN_START_FUNCS
function ca(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;g=i;h=i=i+63&-64;i=i+720|0;e=0;do{k=b+(e<<3)|0;p=d[k+7>>0]|0;q=pc(d[k+6>>0]|0|0,0,8)|0;j=B;o=pc(d[k+5>>0]|0|0,0,16)|0;j=j|B;n=pc(d[k+4>>0]|0|0,0,24)|0;j=j|B|(d[k+3>>0]|0);m=pc(d[k+2>>0]|0|0,0,40)|0;j=j|B;l=pc(d[k+1>>0]|0|0,0,48)|0;j=j|B;k=pc(d[k>>0]|0|0,0,56)|0;f=h+80+(e<<3)|0;c[f>>2]=q|p|o|n|m|l|k;c[f+4>>2]=j|B;e=e+1|0}while((e|0)!=16);b=c[h+80>>2]|0;e=c[h+80+4>>2]|0;f=16;do{s=h+80+(f+-2<<3)|0;w=c[s>>2]|0;s=c[s+4>>2]|0;r=qc(w|0,s|0,19)|0;k=B;j=pc(w|0,s|0,45)|0;k=k|B;u=qc(w|0,s|0,61)|0;v=B;t=pc(w|0,s|0,3)|0;v=v|B;s=qc(w|0,s|0,6)|0;k=v^B^k;v=h+80+(f+-7<<3)|0;w=c[v>>2]|0;v=c[v+4>>2]|0;o=h+80+(f+-15<<3)|0;y=b;b=c[o>>2]|0;x=e;e=c[o+4>>2]|0;o=qc(b|0,e|0,1)|0;p=B;q=pc(b|0,e|0,63)|0;p=p|B;l=qc(b|0,e|0,8)|0;z=B;m=pc(b|0,e|0,56)|0;z=z|B;n=qc(b|0,e|0,7)|0;p=z^B^p;v=Cc(y|0,x|0,w|0,v|0)|0;k=Cc(v|0,B|0,(u|t)^s^(r|j)|0,k|0)|0;p=Cc(k|0,B|0,(l|m)^n^(o|q)|0,p|0)|0;q=h+80+(f<<3)|0;c[q>>2]=p;c[q+4>>2]=B;f=f+1|0}while((f|0)!=80);b=h+16|0;e=a;f=b+64|0;do{c[b>>2]=c[e>>2];b=b+4|0;e=e+4|0}while((b|0)<(f|0));G=h+16+56|0;x=c[G>>2]|0;E=c[G+4>>2]|0;w=h+16+32|0;I=c[w>>2]|0;H=c[w+4>>2]|0;b=qc(I|0,H|0,14)|0;z=B;F=pc(I|0,H|0,50)|0;z=z|B;l=qc(I|0,H|0,18)|0;A=B;L=pc(I|0,H|0,46)|0;A=z^(A|B);z=qc(I|0,H|0,41)|0;J=B;K=pc(I|0,H|0,23)|0;J=A^(J|B);A=h+16+40|0;M=c[A>>2]|0;f=c[A+4>>2]|0;k=h+16+48|0;p=c[k>>2]|0;j=c[k+4>>2]|0;r=c[h+80>>2]|0;y=c[h+80+4>>2]|0;E=Cc(x|0,E|0,-685199838,1116352408)|0;y=Cc(E|0,B|0,r|0,y|0)|0;J=Cc(y|0,B|0,(b|F)^(l|L)^(z|K)|0,J|0)|0;J=Cc(J|0,B|0,(p^M)&I^p|0,(j^f)&H^j|0)|0;K=B;z=c[h+16>>2]|0;L=c[h+16+4>>2]|0;l=qc(z|0,L|0,28)|0;F=B;b=pc(z|0,L|0,36)|0;F=F|B;y=qc(z|0,L|0,34)|0;r=B;E=pc(z|0,L|0,30)|0;r=F^(r|B);F=qc(z|0,L|0,39)|0;x=B;m=pc(z|0,L|0,25)|0;D=h+16+8|0;o=c[D>>2]|0;q=c[D+4>>2]|0;C=h+16+16|0;e=c[C>>2]|0;s=c[C+4>>2]|0;x=Cc((e|o)&z|e&o|0,(s|q)&L|s&q|0,(l|b)^(y|E)^(F|m)|0,r^(x|B)|0)|0;r=B;m=h+16+24|0;F=Cc(c[m>>2]|0,c[m+4>>2]|0,J|0,K|0)|0;E=B;c[m>>2]=F;c[m+4>>2]=E;K=Cc(x|0,r|0,J|0,K|0)|0;J=B;c[G>>2]=K;c[G+4>>2]=J;r=qc(F|0,E|0,14)|0;x=B;y=pc(F|0,E|0,50)|0;x=x|B;b=qc(F|0,E|0,18)|0;l=B;u=pc(F|0,E|0,46)|0;l=x^(l|B);x=qc(F|0,E|0,41)|0;t=B;v=pc(F|0,E|0,23)|0;t=l^(t|B);l=c[h+80+8>>2]|0;n=c[h+80+8+4>>2]|0;j=Cc(p|0,j|0,602891725,1899447441)|0;t=Cc(j|0,B|0,(r|y)^(b|u)^(x|v)|0,t|0)|0;n=Cc(t|0,B|0,l|0,n|0)|0;H=Cc(n|0,B|0,(M^I)&F^M|0,(f^H)&E^f|0)|0;I=B;n=qc(K|0,J|0,28)|0;l=B;t=pc(K|0,J|0,36)|0;l=l|B;v=qc(K|0,J|0,34)|0;x=B;u=pc(K|0,J|0,30)|0;x=l^(x|B);l=qc(K|0,J|0,39)|0;b=B;y=pc(K|0,J|0,25)|0;b=Cc((o|z)&K|o&z|0,(q|L)&J|q&L|0,(n|t)^(v|u)^(l|y)|0,x^(b|B)|0)|0;x=B;s=Cc(e|0,s|0,H|0,I|0)|0;e=B;c[C>>2]=s;c[C+4>>2]=e;I=Cc(b|0,x|0,H|0,I|0)|0;H=B;c[k>>2]=I;c[k+4>>2]=H;x=qc(s|0,e|0,14)|0;b=B;y=pc(s|0,e|0,50)|0;b=b|B;l=qc(s|0,e|0,18)|0;u=B;v=pc(s|0,e|0,46)|0;u=b^(u|B);b=qc(s|0,e|0,41)|0;t=B;n=pc(s|0,e|0,23)|0;t=u^(t|B);u=c[w>>2]|0;r=c[w+4>>2]|0;j=c[h+80+16>>2]|0;p=c[h+80+16+4>>2]|0;f=Cc(M|0,f|0,-330482897,-1245643825)|0;t=Cc(f|0,B|0,(x|y)^(l|v)^(b|n)|0,t|0)|0;p=Cc(t|0,B|0,j|0,p|0)|0;p=Cc(p|0,B|0,(u^F)&s^u|0,(r^E)&e^r|0)|0;j=B;t=qc(I|0,H|0,28)|0;n=B;b=pc(I|0,H|0,36)|0;n=n|B;v=qc(I|0,H|0,34)|0;l=B;y=pc(I|0,H|0,30)|0;l=n^(l|B);n=qc(I|0,H|0,39)|0;x=B;f=pc(I|0,H|0,25)|0;x=Cc((z|K)&I|z&K|0,(L|J)&H|L&J|0,(t|b)^(v|y)^(n|f)|0,l^(x|B)|0)|0;l=B;q=Cc(o|0,q|0,p|0,j|0)|0;o=B;c[D>>2]=q;c[D+4>>2]=o;j=Cc(x|0,l|0,p|0,j|0)|0;p=B;c[A>>2]=j;c[A+4>>2]=p;l=qc(q|0,o|0,14)|0;x=B;f=pc(q|0,o|0,50)|0;x=x|B;n=qc(q|0,o|0,18)|0;y=B;v=pc(q|0,o|0,46)|0;y=x^(y|B);x=qc(q|0,o|0,41)|0;b=B;t=pc(q|0,o|0,23)|0;b=y^(b|B);y=c[h+80+24>>2]|0;J=c[h+80+24+4>>2]|0;r=Cc(u|0,r|0,-2121671748,-373957723)|0;b=Cc(r|0,B|0,(l|f)^(n|v)^(x|t)|0,b|0)|0;J=Cc(b|0,B|0,y|0,J|0)|0;J=Cc(J|0,B|0,(F^s)&q^F|0,(E^e)&o^E|0)|0;y=B;b=qc(j|0,p|0,28)|0;t=B;x=pc(j|0,p|0,36)|0;t=t|B;v=qc(j|0,p|0,34)|0;n=B;f=pc(j|0,p|0,30)|0;n=t^(n|B);t=qc(j|0,p|0,39)|0;l=B;r=pc(j|0,p|0,25)|0;u=c[G>>2]|0;K=c[G+4>>2]|0;l=Cc((u|I)&j|u&I|0,(K|H)&p|K&H|0,(b|x)^(v|f)^(t|r)|0,n^(l|B)|0)|0;n=B;L=Cc(z|0,L|0,J|0,y|0)|0;z=B;c[h+16>>2]=L;c[h+16+4>>2]=z;y=Cc(l|0,n|0,J|0,y|0)|0;J=B;c[w>>2]=y;c[w+4>>2]=J;n=qc(L|0,z|0,14)|0;l=B;r=pc(L|0,z|0,50)|0;l=l|B;t=qc(L|0,z|0,18)|0;f=B;v=pc(L|0,z|0,46)|0;f=l^(f|B);l=qc(L|0,z|0,41)|0;x=B;b=pc(L|0,z|0,23)|0;x=f^(x|B);f=c[h+80+32>>2]|0;H=c[h+80+32+4>>2]|0;E=Cc(F|0,E|0,-213338824,961987163)|0;x=Cc(E|0,B|0,(n|r)^(t|v)^(l|b)|0,x|0)|0;H=Cc(x|0,B|0,f|0,H|0)|0;H=Cc(H|0,B|0,(s^q)&L^s|0,(e^o)&z^e|0)|0;f=B;x=qc(y|0,J|0,28)|0;b=B;l=pc(y|0,J|0,36)|0;b=b|B;v=qc(y|0,J|0,34)|0;t=B;r=pc(y|0,J|0,30)|0;t=b^(t|B);b=qc(y|0,J|0,39)|0;n=B;E=pc(y|0,J|0,25)|0;F=c[k>>2]|0;I=c[k+4>>2]|0;n=Cc((F|j)&y|F&j|0,(I|p)&J|I&p|0,(x|l)^(v|r)^(b|E)|0,t^(n|B)|0)|0;t=B;K=Cc(u|0,K|0,H|0,f|0)|0;u=B;c[G>>2]=K;c[G+4>>2]=u;f=Cc(n|0,t|0,H|0,f|0)|0;H=B;c[m>>2]=f;c[m+4>>2]=H;t=qc(K|0,u|0,14)|0;n=B;E=pc(K|0,u|0,50)|0;n=n|B;b=qc(K|0,u|0,18)|0;r=B;v=pc(K|0,u|0,46)|0;r=n^(r|B);n=qc(K|0,u|0,41)|0;l=B;x=pc(K|0,u|0,23)|0;l=r^(l|B);r=c[h+80+40>>2]|0;p=c[h+80+40+4>>2]|0;e=Cc(s|0,e|0,-1241133031,1508970993)|0;l=Cc(e|0,B|0,(t|E)^(b|v)^(n|x)|0,l|0)|0;p=Cc(l|0,B|0,r|0,p|0)|0;p=Cc(p|0,B|0,(q^L)&K^q|0,(o^z)&u^o|0)|0;r=B;l=qc(f|0,H|0,28)|0;x=B;n=pc(f|0,H|0,36)|0;x=x|B;v=qc(f|0,H|0,34)|0;b=B;E=pc(f|0,H|0,30)|0;b=x^(b|B);x=qc(f|0,H|0,39)|0;t=B;e=pc(f|0,H|0,25)|0;s=c[A>>2]|0;j=c[A+4>>2]|0;t=Cc((s|y)&f|s&y|0,(j|J)&H|j&J|0,(l|n)^(v|E)^(x|e)|0,b^(t|B)|0)|0;b=B;I=Cc(F|0,I|0,p|0,r|0)|0;F=B;c[k>>2]=I;c[k+4>>2]=F;r=Cc(t|0,b|0,p|0,r|0)|0;p=B;c[C>>2]=r;c[C+4>>2]=p;b=qc(I|0,F|0,14)|0;t=B;e=pc(I|0,F|0,50)|0;t=t|B;x=qc(I|0,F|0,18)|0;E=B;v=pc(I|0,F|0,46)|0;E=t^(E|B);t=qc(I|0,F|0,41)|0;n=B;l=pc(I|0,F|0,23)|0;n=E^(n|B);E=c[h+80+48>>2]|0;J=c[h+80+48+4>>2]|0;o=Cc(q|0,o|0,-1357295717,-1841331548)|0;n=Cc(o|0,B|0,(b|e)^(x|v)^(t|l)|0,n|0)|0;J=Cc(n|0,B|0,E|0,J|0)|0;J=Cc(J|0,B|0,(L^K)&I^L|0,(z^u)&F^z|0)|0;E=B;n=qc(r|0,p|0,28)|0;l=B;t=pc(r|0,p|0,36)|0;l=l|B;v=qc(r|0,p|0,34)|0;x=B;e=pc(r|0,p|0,30)|0;x=l^(x|B);l=qc(r|0,p|0,39)|0;b=B;o=pc(r|0,p|0,25)|0;q=c[w>>2]|0;y=c[w+4>>2]|0;b=Cc((q|f)&r|q&f|0,(y|H)&p|y&H|0,(n|t)^(v|e)^(l|o)|0,x^(b|B)|0)|0;x=B;j=Cc(s|0,j|0,J|0,E|0)|0;s=B;c[A>>2]=j;c[A+4>>2]=s;E=Cc(b|0,x|0,J|0,E|0)|0;J=B;c[D>>2]=E;c[D+4>>2]=J;x=qc(j|0,s|0,14)|0;b=B;o=pc(j|0,s|0,50)|0;b=b|B;l=qc(j|0,s|0,18)|0;e=B;v=pc(j|0,s|0,46)|0;e=b^(e|B);b=qc(j|0,s|0,41)|0;t=B;n=pc(j|0,s|0,23)|0;t=e^(t|B);e=c[h+80+56>>2]|0;H=c[h+80+56+4>>2]|0;z=Cc(L|0,z|0,-630357736,-1424204075)|0;t=Cc(z|0,B|0,(x|o)^(l|v)^(b|n)|0,t|0)|0;H=Cc(t|0,B|0,e|0,H|0)|0;H=Cc(H|0,B|0,(K^I)&j^K|0,(u^F)&s^u|0)|0;e=B;t=qc(E|0,J|0,28)|0;n=B;b=pc(E|0,J|0,36)|0;n=n|B;v=qc(E|0,J|0,34)|0;l=B;o=pc(E|0,J|0,30)|0;l=n^(l|B);n=qc(E|0,J|0,39)|0;x=B;z=pc(E|0,J|0,25)|0;L=c[m>>2]|0;f=c[m+4>>2]|0;x=Cc((L|r)&E|L&r|0,(f|p)&J|f&p|0,(t|b)^(v|o)^(n|z)|0,l^(x|B)|0)|0;l=B;y=Cc(q|0,y|0,H|0,e|0)|0;q=B;c[w>>2]=y;c[w+4>>2]=q;e=Cc(x|0,l|0,H|0,e|0)|0;H=B;c[h+16>>2]=e;c[h+16+4>>2]=H;l=qc(y|0,q|0,14)|0;x=B;z=pc(y|0,q|0,50)|0;x=x|B;n=qc(y|0,q|0,18)|0;o=B;v=pc(y|0,q|0,46)|0;o=x^(o|B);x=qc(y|0,q|0,41)|0;b=B;t=pc(y|0,q|0,23)|0;b=o^(b|B);o=c[h+80+64>>2]|0;p=c[h+80+64+4>>2]|0;u=Cc(K|0,u|0,-1560083902,-670586216)|0;b=Cc(u|0,B|0,(l|z)^(n|v)^(x|t)|0,b|0)|0;p=Cc(b|0,B|0,o|0,p|0)|0;p=Cc(p|0,B|0,(I^j)&y^I|0,(F^s)&q^F|0)|0;o=B;b=qc(e|0,H|0,28)|0;t=B;x=pc(e|0,H|0,36)|0;t=t|B;v=qc(e|0,H|0,34)|0;n=B;z=pc(e|0,H|0,30)|0;n=t^(n|B);t=qc(e|0,H|0,39)|0;l=B;u=pc(e|0,H|0,25)|0;K=c[C>>2]|0;r=c[C+4>>2]|0;l=Cc((K|E)&e|K&E|0,(r|J)&H|r&J|0,(b|x)^(v|z)^(t|u)|0,n^(l|B)|0)|0;n=B;f=Cc(L|0,f|0,p|0,o|0)|0;L=B;c[m>>2]=f;c[m+4>>2]=L;o=Cc(l|0,n|0,p|0,o|0)|0;p=B;c[G>>2]=o;c[G+4>>2]=p;n=qc(f|0,L|0,14)|0;l=B;u=pc(f|0,L|0,50)|0;l=l|B;t=qc(f|0,L|0,18)|0;z=B;v=pc(f|0,L|0,46)|0;z=l^(z|B);l=qc(f|0,L|0,41)|0;x=B;b=pc(f|0,L|0,23)|0;x=z^(x|B);z=c[h+80+72>>2]|0;J=c[h+80+72+4>>2]|0;F=Cc(I|0,F|0,1164996542,310598401)|0;x=Cc(F|0,B|0,(n|u)^(t|v)^(l|b)|0,x|0)|0;J=Cc(x|0,B|0,z|0,J|0)|0;J=Cc(J|0,B|0,(j^y)&f^j|0,(s^q)&L^s|0)|0;z=B;x=qc(o|0,p|0,28)|0;b=B;l=pc(o|0,p|0,36)|0;b=b|B;v=qc(o|0,p|0,34)|0;t=B;u=pc(o|0,p|0,30)|0;t=b^(t|B);b=qc(o|0,p|0,39)|0;n=B;F=pc(o|0,p|0,25)|0;I=c[D>>2]|0;E=c[D+4>>2]|0;n=Cc((I|e)&o|I&e|0,(E|H)&p|E&H|0,(x|l)^(v|u)^(b|F)|0,t^(n|B)|0)|0;t=B;r=Cc(K|0,r|0,J|0,z|0)|0;K=B;c[C>>2]=r;c[C+4>>2]=K;z=Cc(n|0,t|0,J|0,z|0)|0;J=B;c[k>>2]=z;c[k+4>>2]=J;t=qc(r|0,K|0,14)|0;n=B;F=pc(r|0,K|0,50)|0;n=n|B;b=qc(r|0,K|0,18)|0;u=B;v=pc(r|0,K|0,46)|0;u=n^(u|B);n=qc(r|0,K|0,41)|0;l=B;x=pc(r|0,K|0,23)|0;l=u^(l|B);u=c[h+80+80>>2]|0;H=c[h+80+80+4>>2]|0;s=Cc(j|0,s|0,1323610764,607225278)|0;l=Cc(s|0,B|0,(t|F)^(b|v)^(n|x)|0,l|0)|0;H=Cc(l|0,B|0,u|0,H|0)|0;H=Cc(H|0,B|0,(y^f)&r^y|0,(q^L)&K^q|0)|0;u=B;l=qc(z|0,J|0,28)|0;x=B;n=pc(z|0,J|0,36)|0;x=x|B;v=qc(z|0,J|0,34)|0;b=B;F=pc(z|0,J|0,30)|0;b=x^(b|B);x=qc(z|0,J|0,39)|0;t=B;s=pc(z|0,J|0,25)|0;j=c[h+16>>2]|0;e=c[h+16+4>>2]|0;t=Cc((j|o)&z|j&o|0,(e|p)&J|e&p|0,(l|n)^(v|F)^(x|s)|0,b^(t|B)|0)|0;b=B;E=Cc(I|0,E|0,H|0,u|0)|0;I=B;c[D>>2]=E;c[D+4>>2]=I;u=Cc(t|0,b|0,H|0,u|0)|0;H=B;c[A>>2]=u;c[A+4>>2]=H;b=qc(E|0,I|0,14)|0;t=B;s=pc(E|0,I|0,50)|0;t=t|B;x=qc(E|0,I|0,18)|0;F=B;v=pc(E|0,I|0,46)|0;F=t^(F|B);t=qc(E|0,I|0,41)|0;n=B;l=pc(E|0,I|0,23)|0;n=F^(n|B);F=c[h+80+88>>2]|0;p=c[h+80+88+4>>2]|0;q=Cc(y|0,q|0,-704662302,1426881987)|0;n=Cc(q|0,B|0,(b|s)^(x|v)^(t|l)|0,n|0)|0;p=Cc(n|0,B|0,F|0,p|0)|0;p=Cc(p|0,B|0,(f^r)&E^f|0,(L^K)&I^L|0)|0;F=B;n=qc(u|0,H|0,28)|0;l=B;t=pc(u|0,H|0,36)|0;l=l|B;v=qc(u|0,H|0,34)|0;x=B;s=pc(u|0,H|0,30)|0;x=l^(x|B);l=qc(u|0,H|0,39)|0;b=B;q=pc(u|0,H|0,25)|0;y=c[G>>2]|0;o=c[G+4>>2]|0;b=Cc((y|z)&u|y&z|0,(o|J)&H|o&J|0,(n|t)^(v|s)^(l|q)|0,x^(b|B)|0)|0;x=B;e=Cc(j|0,e|0,p|0,F|0)|0;j=B;c[h+16>>2]=e;c[h+16+4>>2]=j;F=Cc(b|0,x|0,p|0,F|0)|0;p=B;c[w>>2]=F;c[w+4>>2]=p;x=qc(e|0,j|0,14)|0;b=B;q=pc(e|0,j|0,50)|0;b=b|B;l=qc(e|0,j|0,18)|0;s=B;v=pc(e|0,j|0,46)|0;s=b^(s|B);b=qc(e|0,j|0,41)|0;t=B;n=pc(e|0,j|0,23)|0;t=s^(t|B);s=c[h+80+96>>2]|0;J=c[h+80+96+4>>2]|0;L=Cc(f|0,L|0,-226784913,1925078388)|0;t=Cc(L|0,B|0,(x|q)^(l|v)^(b|n)|0,t|0)|0;J=Cc(t|0,B|0,s|0,J|0)|0;J=Cc(J|0,B|0,(r^E)&e^r|0,(K^I)&j^K|0)|0;s=B;t=qc(F|0,p|0,28)|0;n=B;b=pc(F|0,p|0,36)|0;n=n|B;v=qc(F|0,p|0,34)|0;l=B;q=pc(F|0,p|0,30)|0;l=n^(l|B);n=qc(F|0,p|0,39)|0;x=B;L=pc(F|0,p|0,25)|0;f=c[k>>2]|0;z=c[k+4>>2]|0;x=Cc((f|u)&F|f&u|0,(z|H)&p|z&H|0,(t|b)^(v|q)^(n|L)|0,l^(x|B)|0)|0;l=B;o=Cc(y|0,o|0,J|0,s|0)|0;y=B;c[G>>2]=o;c[G+4>>2]=y;s=Cc(x|0,l|0,J|0,s|0)|0;J=B;c[m>>2]=s;c[m+4>>2]=J;l=qc(o|0,y|0,14)|0;x=B;L=pc(o|0,y|0,50)|0;x=x|B;n=qc(o|0,y|0,18)|0;q=B;v=pc(o|0,y|0,46)|0;q=x^(q|B);x=qc(o|0,y|0,41)|0;b=B;t=pc(o|0,y|0,23)|0;b=q^(b|B);q=c[h+80+104>>2]|0;H=c[h+80+104+4>>2]|0;K=Cc(r|0,K|0,991336113,-2132889090)|0;b=Cc(K|0,B|0,(l|L)^(n|v)^(x|t)|0,b|0)|0;H=Cc(b|0,B|0,q|0,H|0)|0;H=Cc(H|0,B|0,(E^e)&o^E|0,(I^j)&y^I|0)|0;q=B;b=qc(s|0,J|0,28)|0;t=B;x=pc(s|0,J|0,36)|0;t=t|B;v=qc(s|0,J|0,34)|0;n=B;L=pc(s|0,J|0,30)|0;n=t^(n|B);t=qc(s|0,J|0,39)|0;l=B;K=pc(s|0,J|0,25)|0;r=c[A>>2]|0;u=c[A+4>>2]|0;l=Cc((r|F)&s|r&F|0,(u|p)&J|u&p|0,(b|x)^(v|L)^(t|K)|0,n^(l|B)|0)|0;n=B;z=Cc(f|0,z|0,H|0,q|0)|0;f=B;c[k>>2]=z;c[k+4>>2]=f;q=Cc(l|0,n|0,H|0,q|0)|0;H=B;c[C>>2]=q;c[C+4>>2]=H;n=qc(z|0,f|0,14)|0;l=B;K=pc(z|0,f|0,50)|0;l=l|B;t=qc(z|0,f|0,18)|0;L=B;v=pc(z|0,f|0,46)|0;L=l^(L|B);l=qc(z|0,f|0,41)|0;x=B;b=pc(z|0,f|0,23)|0;x=L^(x|B);L=c[h+80+112>>2]|0;p=c[h+80+112+4>>2]|0;I=Cc(E|0,I|0,633803317,-1680079193)|0;x=Cc(I|0,B|0,(n|K)^(t|v)^(l|b)|0,x|0)|0;p=Cc(x|0,B|0,L|0,p|0)|0;p=Cc(p|0,B|0,(e^o)&z^e|0,(j^y)&f^j|0)|0;L=B;x=qc(q|0,H|0,28)|0;b=B;l=pc(q|0,H|0,36)|0;b=b|B;v=qc(q|0,H|0,34)|0;t=B;K=pc(q|0,H|0,30)|0;t=b^(t|B);b=qc(q|0,H|0,39)|0;n=B;I=pc(q|0,H|0,25)|0;E=c[w>>2]|0;F=c[w+4>>2]|0;n=Cc((E|s)&q|E&s|0,(F|J)&H|F&J|0,(x|l)^(v|K)^(b|I)|0,t^(n|B)|0)|0;t=B;u=Cc(r|0,u|0,p|0,L|0)|0;r=B;c[A>>2]=u;c[A+4>>2]=r;L=Cc(n|0,t|0,p|0,L|0)|0;p=B;c[D>>2]=L;c[D+4>>2]=p;t=qc(u|0,r|0,14)|0;n=B;I=pc(u|0,r|0,50)|0;n=n|B;b=qc(u|0,r|0,18)|0;K=B;v=pc(u|0,r|0,46)|0;K=n^(K|B);n=qc(u|0,r|0,41)|0;l=B;x=pc(u|0,r|0,23)|0;l=K^(l|B);K=c[h+80+120>>2]|0;J=c[h+80+120+4>>2]|0;j=Cc(e|0,j|0,-815192428,-1046744716)|0;l=Cc(j|0,B|0,(t|I)^(b|v)^(n|x)|0,l|0)|0;J=Cc(l|0,B|0,K|0,J|0)|0;J=Cc(J|0,B|0,(o^z)&u^o|0,(y^f)&r^y|0)|0;K=B;l=qc(L|0,p|0,28)|0;x=B;n=pc(L|0,p|0,36)|0;x=x|B;v=qc(L|0,p|0,34)|0;b=B;I=pc(L|0,p|0,30)|0;b=x^(b|B);x=qc(L|0,p|0,39)|0;t=B;j=pc(L|0,p|0,25)|0;e=c[m>>2]|0;s=c[m+4>>2]|0;t=Cc((e|q)&L|e&q|0,(s|H)&p|s&H|0,(l|n)^(v|I)^(x|j)|0,b^(t|B)|0)|0;b=B;F=Cc(E|0,F|0,J|0,K|0)|0;E=B;c[w>>2]=F;c[w+4>>2]=E;K=Cc(t|0,b|0,J|0,K|0)|0;J=B;c[h+16>>2]=K;c[h+16+4>>2]=J;b=qc(F|0,E|0,14)|0;t=B;j=pc(F|0,E|0,50)|0;t=t|B;x=qc(F|0,E|0,18)|0;I=B;v=pc(F|0,E|0,46)|0;I=t^(I|B);t=qc(F|0,E|0,41)|0;n=B;l=pc(F|0,E|0,23)|0;n=I^(n|B);I=c[h+80+128>>2]|0;H=c[h+80+128+4>>2]|0;y=Cc(o|0,y|0,-1628353838,-459576895)|0;n=Cc(y|0,B|0,(b|j)^(x|v)^(t|l)|0,n|0)|0;H=Cc(n|0,B|0,I|0,H|0)|0;H=Cc(H|0,B|0,(z^u)&F^z|0,(f^r)&E^f|0)|0;I=B;n=qc(K|0,J|0,28)|0;l=B;t=pc(K|0,J|0,36)|0;l=l|B;v=qc(K|0,J|0,34)|0;x=B;j=pc(K|0,J|0,30)|0;x=l^(x|B);l=qc(K|0,J|0,39)|0;b=B;y=pc(K|0,J|0,25)|0;o=c[C>>2]|0;q=c[C+4>>2]|0;b=Cc((o|L)&K|o&L|0,(q|p)&J|q&p|0,(n|t)^(v|j)^(l|y)|0,x^(b|B)|0)|0;x=B;s=Cc(e|0,s|0,H|0,I|0)|0;e=B;c[m>>2]=s;c[m+4>>2]=e;I=Cc(b|0,x|0,H|0,I|0)|0;H=B;c[G>>2]=I;c[G+4>>2]=H;x=qc(s|0,e|0,14)|0;b=B;y=pc(s|0,e|0,50)|0;b=b|B;l=qc(s|0,e|0,18)|0;j=B;v=pc(s|0,e|0,46)|0;j=b^(j|B);b=qc(s|0,e|0,41)|0;t=B;n=pc(s|0,e|0,23)|0;t=j^(t|B);j=c[h+80+136>>2]|0;p=c[h+80+136+4>>2]|0;f=Cc(z|0,f|0,944711139,-272742522)|0;t=Cc(f|0,B|0,(x|y)^(l|v)^(b|n)|0,t|0)|0;p=Cc(t|0,B|0,j|0,p|0)|0;p=Cc(p|0,B|0,(u^F)&s^u|0,(r^E)&e^r|0)|0;j=B;t=qc(I|0,H|0,28)|0;n=B;b=pc(I|0,H|0,36)|0;n=n|B;v=qc(I|0,H|0,34)|0;l=B;y=pc(I|0,H|0,30)|0;l=n^(l|B);n=qc(I|0,H|0,39)|0;x=B;f=pc(I|0,H|0,25)|0;z=c[D>>2]|0;L=c[D+4>>2]|0;x=Cc((z|K)&I|z&K|0,(L|J)&H|L&J|0,(t|b)^(v|y)^(n|f)|0,l^(x|B)|0)|0;l=B;q=Cc(o|0,q|0,p|0,j|0)|0;o=B;c[C>>2]=q;c[C+4>>2]=o;j=Cc(x|0,l|0,p|0,j|0)|0;p=B;c[k>>2]=j;c[k+4>>2]=p;l=qc(q|0,o|0,14)|0;x=B;f=pc(q|0,o|0,50)|0;x=x|B;n=qc(q|0,o|0,18)|0;y=B;v=pc(q|0,o|0,46)|0;y=x^(y|B);x=qc(q|0,o|0,41)|0;b=B;t=pc(q|0,o|0,23)|0;b=y^(b|B);y=c[h+80+144>>2]|0;J=c[h+80+144+4>>2]|0;r=Cc(u|0,r|0,-1953704523,264347078)|0;b=Cc(r|0,B|0,(l|f)^(n|v)^(x|t)|0,b|0)|0;J=Cc(b|0,B|0,y|0,J|0)|0;J=Cc(J|0,B|0,(F^s)&q^F|0,(E^e)&o^E|0)|0;y=B;b=qc(j|0,p|0,28)|0;t=B;x=pc(j|0,p|0,36)|0;t=t|B;v=qc(j|0,p|0,34)|0;n=B;f=pc(j|0,p|0,30)|0;n=t^(n|B);t=qc(j|0,p|0,39)|0;l=B;r=pc(j|0,p|0,25)|0;u=c[h+16>>2]|0;K=c[h+16+4>>2]|0;l=Cc((u|I)&j|u&I|0,(K|H)&p|K&H|0,(b|x)^(v|f)^(t|r)|0,n^(l|B)|0)|0;n=B;L=Cc(z|0,L|0,J|0,y|0)|0;z=B;c[D>>2]=L;c[D+4>>2]=z;y=Cc(l|0,n|0,J|0,y|0)|0;J=B;c[A>>2]=y;c[A+4>>2]=J;n=qc(L|0,z|0,14)|0;l=B;r=pc(L|0,z|0,50)|0;l=l|B;t=qc(L|0,z|0,18)|0;f=B;v=pc(L|0,z|0,46)|0;f=l^(f|B);l=qc(L|0,z|0,41)|0;x=B;b=pc(L|0,z|0,23)|0;x=f^(x|B);f=c[h+80+152>>2]|0;H=c[h+80+152+4>>2]|0;E=Cc(F|0,E|0,2007800933,604807628)|0;x=Cc(E|0,B|0,(n|r)^(t|v)^(l|b)|0,x|0)|0;H=Cc(x|0,B|0,f|0,H|0)|0;H=Cc(H|0,B|0,(s^q)&L^s|0,(e^o)&z^e|0)|0;f=B;x=qc(y|0,J|0,28)|0;b=B;l=pc(y|0,J|0,36)|0;b=b|B;v=qc(y|0,J|0,34)|0;t=B;r=pc(y|0,J|0,30)|0;t=b^(t|B);b=qc(y|0,J|0,39)|0;n=B;E=pc(y|0,J|0,25)|0;F=c[G>>2]|0;I=c[G+4>>2]|0;n=Cc((F|j)&y|F&j|0,(I|p)&J|I&p|0,(x|l)^(v|r)^(b|E)|0,t^(n|B)|0)|0;t=B;K=Cc(u|0,K|0,H|0,f|0)|0;u=B;c[h+16>>2]=K;c[h+16+4>>2]=u;f=Cc(n|0,t|0,H|0,f|0)|0;H=B;c[w>>2]=f;c[w+4>>2]=H;t=qc(K|0,u|0,14)|0;n=B;E=pc(K|0,u|0,50)|0;n=n|B;b=qc(K|0,u|0,18)|0;r=B;v=pc(K|0,u|0,46)|0;r=n^(r|B);n=qc(K|0,u|0,41)|0;l=B;x=pc(K|0,u|0,23)|0;l=r^(l|B);r=c[h+80+160>>2]|0;p=c[h+80+160+4>>2]|0;e=Cc(s|0,e|0,1495990901,770255983)|0;l=Cc(e|0,B|0,(t|E)^(b|v)^(n|x)|0,l|0)|0;p=Cc(l|0,B|0,r|0,p|0)|0;p=Cc(p|0,B|0,(q^L)&K^q|0,(o^z)&u^o|0)|0;r=B;l=qc(f|0,H|0,28)|0;x=B;n=pc(f|0,H|0,36)|0;x=x|B;v=qc(f|0,H|0,34)|0;b=B;E=pc(f|0,H|0,30)|0;b=x^(b|B);x=qc(f|0,H|0,39)|0;t=B;e=pc(f|0,H|0,25)|0;s=c[k>>2]|0;j=c[k+4>>2]|0;t=Cc((s|y)&f|s&y|0,(j|J)&H|j&J|0,(l|n)^(v|E)^(x|e)|0,b^(t|B)|0)|0;b=B;I=Cc(F|0,I|0,p|0,r|0)|0;F=B;c[G>>2]=I;c[G+4>>2]=F;r=Cc(t|0,b|0,p|0,r|0)|0;p=B;c[m>>2]=r;c[m+4>>2]=p;b=qc(I|0,F|0,14)|0;t=B;e=pc(I|0,F|0,50)|0;t=t|B;x=qc(I|0,F|0,18)|0;E=B;v=pc(I|0,F|0,46)|0;E=t^(E|B);t=qc(I|0,F|0,41)|0;n=B;l=pc(I|0,F|0,23)|0;n=E^(n|B);E=c[h+80+168>>2]|0;J=c[h+80+168+4>>2]|0;o=Cc(q|0,o|0,1856431235,1249150122)|0;n=Cc(o|0,B|0,(b|e)^(x|v)^(t|l)|0,n|0)|0;J=Cc(n|0,B|0,E|0,J|0)|0;J=Cc(J|0,B|0,(L^K)&I^L|0,(z^u)&F^z|0)|0;E=B;n=qc(r|0,p|0,28)|0;l=B;t=pc(r|0,p|0,36)|0;l=l|B;v=qc(r|0,p|0,34)|0;x=B;e=pc(r|0,p|0,30)|0;x=l^(x|B);l=qc(r|0,p|0,39)|0;b=B;o=pc(r|0,p|0,25)|0;q=c[A>>2]|0;y=c[A+4>>2]|0;b=Cc((q|f)&r|q&f|0,(y|H)&p|y&H|0,(n|t)^(v|e)^(l|o)|0,x^(b|B)|0)|0;x=B;j=Cc(s|0,j|0,J|0,E|0)|0;s=B;c[k>>2]=j;c[k+4>>2]=s;E=Cc(b|0,x|0,J|0,E|0)|0;J=B;c[C>>2]=E;c[C+4>>2]=J;x=qc(j|0,s|0,14)|0;b=B;o=pc(j|0,s|0,50)|0;b=b|B;l=qc(j|0,s|0,18)|0;e=B;v=pc(j|0,s|0,46)|0;e=b^(e|B);b=qc(j|0,s|0,41)|0;t=B;n=pc(j|0,s|0,23)|0;t=e^(t|B);e=c[h+80+176>>2]|0;H=c[h+80+176+4>>2]|0;z=Cc(L|0,z|0,-1119749164,1555081692)|0;t=Cc(z|0,B|0,(x|o)^(l|v)^(b|n)|0,t|0)|0;H=Cc(t|0,B|0,e|0,H|0)|0;H=Cc(H|0,B|0,(K^I)&j^K|0,(u^F)&s^u|0)|0;e=B;t=qc(E|0,J|0,28)|0;n=B;b=pc(E|0,J|0,36)|0;n=n|B;v=qc(E|0,J|0,34)|0;l=B;o=pc(E|0,J|0,30)|0;l=n^(l|B);n=qc(E|0,J|0,39)|0;x=B;z=pc(E|0,J|0,25)|0;L=c[w>>2]|0;f=c[w+4>>2]|0;x=Cc((L|r)&E|L&r|0,(f|p)&J|f&p|0,(t|b)^(v|o)^(n|z)|0,l^(x|B)|0)|0;l=B;y=Cc(q|0,y|0,H|0,e|0)|0;q=B;c[A>>2]=y;c[A+4>>2]=q;e=Cc(x|0,l|0,H|0,e|0)|0;H=B;c[D>>2]=e;c[D+4>>2]=H;l=qc(y|0,q|0,14)|0;x=B;z=pc(y|0,q|0,50)|0;x=x|B;n=qc(y|0,q|0,18)|0;o=B;v=pc(y|0,q|0,46)|0;o=x^(o|B);x=qc(y|0,q|0,41)|0;b=B;t=pc(y|0,q|0,23)|0;b=o^(b|B);o=c[h+80+184>>2]|0;p=c[h+80+184+4>>2]|0;u=Cc(K|0,u|0,-2096016459,1996064986)|0;b=Cc(u|0,B|0,(l|z)^(n|v)^(x|t)|0,b|0)|0;p=Cc(b|0,B|0,o|0,p|0)|0;p=Cc(p|0,B|0,(I^j)&y^I|0,(F^s)&q^F|0)|0;o=B;b=qc(e|0,H|0,28)|0;t=B;x=pc(e|0,H|0,36)|0;t=t|B;v=qc(e|0,H|0,34)|0;n=B;z=pc(e|0,H|0,30)|0;n=t^(n|B);t=qc(e|0,H|0,39)|0;l=B;u=pc(e|0,H|0,25)|0;K=c[m>>2]|0;r=c[m+4>>2]|0;l=Cc((K|E)&e|K&E|0,(r|J)&H|r&J|0,(b|x)^(v|z)^(t|u)|0,n^(l|B)|0)|0;n=B;f=Cc(L|0,f|0,p|0,o|0)|0;L=B;c[w>>2]=f;c[w+4>>2]=L;o=Cc(l|0,n|0,p|0,o|0)|0;p=B;c[h+16>>2]=o;c[h+16+4>>2]=p;n=qc(f|0,L|0,14)|0;l=B;u=pc(f|0,L|0,50)|0;l=l|B;t=qc(f|0,L|0,18)|0;z=B;v=pc(f|0,L|0,46)|0;z=l^(z|B);l=qc(f|0,L|0,41)|0;x=B;b=pc(f|0,L|0,23)|0;x=z^(x|B);z=c[h+80+192>>2]|0;J=c[h+80+192+4>>2]|0;F=Cc(I|0,F|0,-295247957,-1740746414)|0;x=Cc(F|0,B|0,(n|u)^(t|v)^(l|b)|0,x|0)|0;J=Cc(x|0,B|0,z|0,J|0)|0;J=Cc(J|0,B|0,(j^y)&f^j|0,(s^q)&L^s|0)|0;z=B;x=qc(o|0,p|0,28)|0;b=B;l=pc(o|0,p|0,36)|0;b=b|B;v=qc(o|0,p|0,34)|0;t=B;u=pc(o|0,p|0,30)|0;t=b^(t|B);b=qc(o|0,p|0,39)|0;n=B;F=pc(o|0,p|0,25)|0;I=c[C>>2]|0;E=c[C+4>>2]|0;n=Cc((I|e)&o|I&e|0,(E|H)&p|E&H|0,(x|l)^(v|u)^(b|F)|0,t^(n|B)|0)|0;t=B;r=Cc(K|0,r|0,J|0,z|0)|0;K=B;c[m>>2]=r;c[m+4>>2]=K;z=Cc(n|0,t|0,J|0,z|0)|0;J=B;c[G>>2]=z;c[G+4>>2]=J;t=qc(r|0,K|0,14)|0;n=B;F=pc(r|0,K|0,50)|0;n=n|B;b=qc(r|0,K|0,18)|0;u=B;v=pc(r|0,K|0,46)|0;u=n^(u|B);n=qc(r|0,K|0,41)|0;l=B;x=pc(r|0,K|0,23)|0;l=u^(l|B);u=c[h+80+200>>2]|0;H=c[h+80+200+4>>2]|0;s=Cc(j|0,s|0,766784016,-1473132947)|0;l=Cc(s|0,B|0,(t|F)^(b|v)^(n|x)|0,l|0)|0;H=Cc(l|0,B|0,u|0,H|0)|0;H=Cc(H|0,B|0,(y^f)&r^y|0,(q^L)&K^q|0)|0;u=B;l=qc(z|0,J|0,28)|0;x=B;n=pc(z|0,J|0,36)|0;x=x|B;v=qc(z|0,J|0,34)|0;b=B;F=pc(z|0,J|0,30)|0;b=x^(b|B);x=qc(z|0,J|0,39)|0;t=B;s=pc(z|0,J|0,25)|0;j=c[D>>2]|0;e=c[D+4>>2]|0;t=Cc((j|o)&z|j&o|0,(e|p)&J|e&p|0,(l|n)^(v|F)^(x|s)|0,b^(t|B)|0)|0;b=B;E=Cc(I|0,E|0,H|0,u|0)|0;I=B;c[C>>2]=E;c[C+4>>2]=I;u=Cc(t|0,b|0,H|0,u|0)|0;H=B;c[k>>2]=u;c[k+4>>2]=H;b=qc(E|0,I|0,14)|0;t=B;s=pc(E|0,I|0,50)|0;t=t|B;x=qc(E|0,I|0,18)|0;F=B;v=pc(E|0,I|0,46)|0;F=t^(F|B);t=qc(E|0,I|0,41)|0;n=B;l=pc(E|0,I|0,23)|0;n=F^(n|B);F=c[h+80+208>>2]|0;p=c[h+80+208+4>>2]|0;q=Cc(y|0,q|0,-1728372417,-1341970488)|0;n=Cc(q|0,B|0,(b|s)^(x|v)^(t|l)|0,n|0)|0;p=Cc(n|0,B|0,F|0,p|0)|0;p=Cc(p|0,B|0,(f^r)&E^f|0,(L^K)&I^L|0)|0;F=B;n=qc(u|0,H|0,28)|0;l=B;t=pc(u|0,H|0,36)|0;l=l|B;v=qc(u|0,H|0,34)|0;x=B;s=pc(u|0,H|0,30)|0;x=l^(x|B);l=qc(u|0,H|0,39)|0;b=B;q=pc(u|0,H|0,25)|0;y=c[h+16>>2]|0;o=c[h+16+4>>2]|0;b=Cc((y|z)&u|y&z|0,(o|J)&H|o&J|0,(n|t)^(v|s)^(l|q)|0,x^(b|B)|0)|0;x=B;e=Cc(j|0,e|0,p|0,F|0)|0;j=B;c[D>>2]=e;c[D+4>>2]=j;F=Cc(b|0,x|0,p|0,F|0)|0;p=B;c[A>>2]=F;c[A+4>>2]=p;x=qc(e|0,j|0,14)|0;b=B;q=pc(e|0,j|0,50)|0;b=b|B;l=qc(e|0,j|0,18)|0;s=B;v=pc(e|0,j|0,46)|0;s=b^(s|B);b=qc(e|0,j|0,41)|0;t=B;n=pc(e|0,j|0,23)|0;t=s^(t|B);s=c[h+80+216>>2]|0;J=c[h+80+216+4>>2]|0;L=Cc(f|0,L|0,-1091629340,-1084653625)|0;t=Cc(L|0,B|0,(x|q)^(l|v)^(b|n)|0,t|0)|0;J=Cc(t|0,B|0,s|0,J|0)|0;J=Cc(J|0,B|0,(r^E)&e^r|0,(K^I)&j^K|0)|0;s=B;t=qc(F|0,p|0,28)|0;n=B;b=pc(F|0,p|0,36)|0;n=n|B;v=qc(F|0,p|0,34)|0;l=B;q=pc(F|0,p|0,30)|0;l=n^(l|B);n=qc(F|0,p|0,39)|0;x=B;L=pc(F|0,p|0,25)|0;f=c[G>>2]|0;z=c[G+4>>2]|0;x=Cc((f|u)&F|f&u|0,(z|H)&p|z&H|0,(t|b)^(v|q)^(n|L)|0,l^(x|B)|0)|0;l=B;o=Cc(y|0,o|0,J|0,s|0)|0;y=B;c[h+16>>2]=o;c[h+16+4>>2]=y;s=Cc(x|0,l|0,J|0,s|0)|0;J=B;c[w>>2]=s;c[w+4>>2]=J;l=qc(o|0,y|0,14)|0;x=B;L=pc(o|0,y|0,50)|0;x=x|B;n=qc(o|0,y|0,18)|0;q=B;v=pc(o|0,y|0,46)|0;q=x^(q|B);x=qc(o|0,y|0,41)|0;b=B;t=pc(o|0,y|0,23)|0;b=q^(b|B);q=c[h+80+224>>2]|0;H=c[h+80+224+4>>2]|0;K=Cc(r|0,K|0,1034457026,-958395405)|0;b=Cc(K|0,B|0,(l|L)^(n|v)^(x|t)|0,b|0)|0;H=Cc(b|0,B|0,q|0,H|0)|0;H=Cc(H|0,B|0,(E^e)&o^E|0,(I^j)&y^I|0)|0;q=B;b=qc(s|0,J|0,28)|0;t=B;x=pc(s|0,J|0,36)|0;t=t|B;v=qc(s|0,J|0,34)|0;n=B;L=pc(s|0,J|0,30)|0;n=t^(n|B);t=qc(s|0,J|0,39)|0;l=B;K=pc(s|0,J|0,25)|0;r=c[k>>2]|0;u=c[k+4>>2]|0;l=Cc((r|F)&s|r&F|0,(u|p)&J|u&p|0,(b|x)^(v|L)^(t|K)|0,n^(l|B)|0)|0;n=B;z=Cc(f|0,z|0,H|0,q|0)|0;f=B;c[G>>2]=z;c[G+4>>2]=f;q=Cc(l|0,n|0,H|0,q|0)|0;H=B;c[m>>2]=q;c[m+4>>2]=H;n=qc(z|0,f|0,14)|0;l=B;K=pc(z|0,f|0,50)|0;l=l|B;t=qc(z|0,f|0,18)|0;L=B;v=pc(z|0,f|0,46)|0;L=l^(L|B);l=qc(z|0,f|0,41)|0;x=B;b=pc(z|0,f|0,23)|0;x=L^(x|B);L=c[h+80+232>>2]|0;p=c[h+80+232+4>>2]|0;I=Cc(E|0,I|0,-1828018395,-710438585)|0;x=Cc(I|0,B|0,(n|K)^(t|v)^(l|b)|0,x|0)|0;p=Cc(x|0,B|0,L|0,p|0)|0;p=Cc(p|0,B|0,(e^o)&z^e|0,(j^y)&f^j|0)|0;L=B;x=qc(q|0,H|0,28)|0;b=B;l=pc(q|0,H|0,36)|0;b=b|B;v=qc(q|0,H|0,34)|0;t=B;K=pc(q|0,H|0,30)|0;t=b^(t|B);b=qc(q|0,H|0,39)|0;n=B;I=pc(q|0,H|0,25)|0;E=c[A>>2]|0;F=c[A+4>>2]|0;n=Cc((E|s)&q|E&s|0,(F|J)&H|F&J|0,(x|l)^(v|K)^(b|I)|0,t^(n|B)|0)|0;t=B;u=Cc(r|0,u|0,p|0,L|0)|0;r=B;c[k>>2]=u;c[k+4>>2]=r;L=Cc(n|0,t|0,p|0,L|0)|0;p=B;c[C>>2]=L;c[C+4>>2]=p;t=qc(u|0,r|0,14)|0;n=B;I=pc(u|0,r|0,50)|0;n=n|B;b=qc(u|0,r|0,18)|0;K=B;v=pc(u|0,r|0,46)|0;K=n^(K|B);n=qc(u|0,r|0,41)|0;l=B;x=pc(u|0,r|0,23)|0;l=K^(l|B);K=c[h+80+240>>2]|0;J=c[h+80+240+4>>2]|0;j=Cc(e|0,j|0,-536640913,113926993)|0;l=Cc(j|0,B|0,(t|I)^(b|v)^(n|x)|0,l|0)|0;J=Cc(l|0,B|0,K|0,J|0)|0;J=Cc(J|0,B|0,(o^z)&u^o|0,(y^f)&r^y|0)|0;K=B;l=qc(L|0,p|0,28)|0;x=B;n=pc(L|0,p|0,36)|0;x=x|B;v=qc(L|0,p|0,34)|0;b=B;I=pc(L|0,p|0,30)|0;b=x^(b|B);x=qc(L|0,p|0,39)|0;t=B;j=pc(L|0,p|0,25)|0;e=c[w>>2]|0;s=c[w+4>>2]|0;t=Cc((e|q)&L|e&q|0,(s|H)&p|s&H|0,(l|n)^(v|I)^(x|j)|0,b^(t|B)|0)|0;b=B;F=Cc(E|0,F|0,J|0,K|0)|0;E=B;c[A>>2]=F;c[A+4>>2]=E;K=Cc(t|0,b|0,J|0,K|0)|0;J=B;c[D>>2]=K;c[D+4>>2]=J;b=qc(F|0,E|0,14)|0;t=B;j=pc(F|0,E|0,50)|0;t=t|B;x=qc(F|0,E|0,18)|0;I=B;v=pc(F|0,E|0,46)|0;I=t^(I|B);t=qc(F|0,E|0,41)|0;n=B;l=pc(F|0,E|0,23)|0;n=I^(n|B);I=c[h+80+248>>2]|0;H=c[h+80+248+4>>2]|0;y=Cc(o|0,y|0,168717936,338241895)|0;n=Cc(y|0,B|0,(b|j)^(x|v)^(t|l)|0,n|0)|0;H=Cc(n|0,B|0,I|0,H|0)|0;H=Cc(H|0,B|0,(z^u)&F^z|0,(f^r)&E^f|0)|0;I=B;n=qc(K|0,J|0,28)|0;l=B;t=pc(K|0,J|0,36)|0;l=l|B;v=qc(K|0,J|0,34)|0;x=B;j=pc(K|0,J|0,30)|0;x=l^(x|B);l=qc(K|0,J|0,39)|0;b=B;y=pc(K|0,J|0,25)|0;o=c[m>>2]|0;q=c[m+4>>2]|0;b=Cc((o|L)&K|o&L|0,(q|p)&J|q&p|0,(n|t)^(v|j)^(l|y)|0,x^(b|B)|0)|0;x=B;s=Cc(e|0,s|0,H|0,I|0)|0;e=B;c[w>>2]=s;c[w+4>>2]=e;I=Cc(b|0,x|0,H|0,I|0)|0;H=B;c[h+16>>2]=I;c[h+16+4>>2]=H;x=qc(s|0,e|0,14)|0;b=B;y=pc(s|0,e|0,50)|0;b=b|B;l=qc(s|0,e|0,18)|0;j=B;v=pc(s|0,e|0,46)|0;j=b^(j|B);b=qc(s|0,e|0,41)|0;t=B;n=pc(s|0,e|0,23)|0;t=j^(t|B);j=c[h+80+256>>2]|0;p=c[h+80+256+4>>2]|0;f=Cc(z|0,f|0,1188179964,666307205)|0;t=Cc(f|0,B|0,(x|y)^(l|v)^(b|n)|0,t|0)|0;p=Cc(t|0,B|0,j|0,p|0)|0;p=Cc(p|0,B|0,(u^F)&s^u|0,(r^E)&e^r|0)|0;j=B;t=qc(I|0,H|0,28)|0;n=B;b=pc(I|0,H|0,36)|0;n=n|B;v=qc(I|0,H|0,34)|0;l=B;y=pc(I|0,H|0,30)|0;l=n^(l|B);n=qc(I|0,H|0,39)|0;x=B;f=pc(I|0,H|0,25)|0;z=c[C>>2]|0;L=c[C+4>>2]|0;x=Cc((z|K)&I|z&K|0,(L|J)&H|L&J|0,(t|b)^(v|y)^(n|f)|0,l^(x|B)|0)|0;l=B;q=Cc(o|0,q|0,p|0,j|0)|0;o=B;c[m>>2]=q;c[m+4>>2]=o;j=Cc(x|0,l|0,p|0,j|0)|0;p=B;c[G>>2]=j;c[G+4>>2]=p;l=qc(q|0,o|0,14)|0;x=B;f=pc(q|0,o|0,50)|0;x=x|B;n=qc(q|0,o|0,18)|0;y=B;v=pc(q|0,o|0,46)|0;y=x^(y|B);x=qc(q|0,o|0,41)|0;b=B;t=pc(q|0,o|0,23)|0;b=y^(b|B);y=c[h+80+264>>2]|0;J=c[h+80+264+4>>2]|0;r=Cc(u|0,r|0,1546045734,773529912)|0;b=Cc(r|0,B|0,(l|f)^(n|v)^(x|t)|0,b|0)|0;J=Cc(b|0,B|0,y|0,J|0)|0;J=Cc(J|0,B|0,(F^s)&q^F|0,(E^e)&o^E|0)|0;y=B;b=qc(j|0,p|0,28)|0;t=B;x=pc(j|0,p|0,36)|0;t=t|B;v=qc(j|0,p|0,34)|0;n=B;f=pc(j|0,p|0,30)|0;n=t^(n|B);t=qc(j|0,p|0,39)|0;l=B;r=pc(j|0,p|0,25)|0;u=c[D>>2]|0;K=c[D+4>>2]|0;l=Cc((u|I)&j|u&I|0,(K|H)&p|K&H|0,(b|x)^(v|f)^(t|r)|0,n^(l|B)|0)|0;n=B;L=Cc(z|0,L|0,J|0,y|0)|0;z=B;c[C>>2]=L;c[C+4>>2]=z;y=Cc(l|0,n|0,J|0,y|0)|0;J=B;c[k>>2]=y;c[k+4>>2]=J;n=qc(L|0,z|0,14)|0;l=B;r=pc(L|0,z|0,50)|0;l=l|B;t=qc(L|0,z|0,18)|0;f=B;v=pc(L|0,z|0,46)|0;f=l^(f|B);l=qc(L|0,z|0,41)|0;x=B;b=pc(L|0,z|0,23)|0;x=f^(x|B);f=c[h+80+272>>2]|0;H=c[h+80+272+4>>2]|0;E=Cc(F|0,E|0,1522805485,1294757372)|0;x=Cc(E|0,B|0,(n|r)^(t|v)^(l|b)|0,x|0)|0;H=Cc(x|0,B|0,f|0,H|0)|0;H=Cc(H|0,B|0,(s^q)&L^s|0,(e^o)&z^e|0)|0;f=B;x=qc(y|0,J|0,28)|0;b=B;l=pc(y|0,J|0,36)|0;b=b|B;v=qc(y|0,J|0,34)|0;t=B;r=pc(y|0,J|0,30)|0;t=b^(t|B);b=qc(y|0,J|0,39)|0;n=B;E=pc(y|0,J|0,25)|0;F=c[h+16>>2]|0;I=c[h+16+4>>2]|0;n=Cc((F|j)&y|F&j|0,(I|p)&J|I&p|0,(x|l)^(v|r)^(b|E)|0,t^(n|B)|0)|0;t=B;K=Cc(u|0,K|0,H|0,f|0)|0;u=B;c[D>>2]=K;c[D+4>>2]=u;f=Cc(n|0,t|0,H|0,f|0)|0;H=B;c[A>>2]=f;c[A+4>>2]=H;t=qc(K|0,u|0,14)|0;n=B;E=pc(K|0,u|0,50)|0;n=n|B;b=qc(K|0,u|0,18)|0;r=B;v=pc(K|0,u|0,46)|0;r=n^(r|B);n=qc(K|0,u|0,41)|0;l=B;x=pc(K|0,u|0,23)|0;l=r^(l|B);r=c[h+80+280>>2]|0;p=c[h+80+280+4>>2]|0;e=Cc(s|0,e|0,-1651133473,1396182291)|0;l=Cc(e|0,B|0,(t|E)^(b|v)^(n|x)|0,l|0)|0;p=Cc(l|0,B|0,r|0,p|0)|0;p=Cc(p|0,B|0,(q^L)&K^q|0,(o^z)&u^o|0)|0;r=B;l=qc(f|0,H|0,28)|0;x=B;n=pc(f|0,H|0,36)|0;x=x|B;v=qc(f|0,H|0,34)|0;b=B;E=pc(f|0,H|0,30)|0;b=x^(b|B);x=qc(f|0,H|0,39)|0;t=B;e=pc(f|0,H|0,25)|0;s=c[G>>2]|0;j=c[G+4>>2]|0;t=Cc((s|y)&f|s&y|0,(j|J)&H|j&J|0,(l|n)^(v|E)^(x|e)|0,b^(t|B)|0)|0;b=B;I=Cc(F|0,I|0,p|0,r|0)|0;F=B;c[h+16>>2]=I;c[h+16+4>>2]=F;r=Cc(t|0,b|0,p|0,r|0)|0;p=B;c[w>>2]=r;c[w+4>>2]=p;b=qc(I|0,F|0,14)|0;t=B;e=pc(I|0,F|0,50)|0;t=t|B;x=qc(I|0,F|0,18)|0;E=B;v=pc(I|0,F|0,46)|0;E=t^(E|B);t=qc(I|0,F|0,41)|0;n=B;l=pc(I|0,F|0,23)|0;n=E^(n|B);E=c[h+80+288>>2]|0;J=c[h+80+288+4>>2]|0;o=Cc(q|0,o|0,-1951439906,1695183700)|0;n=Cc(o|0,B|0,(b|e)^(x|v)^(t|l)|0,n|0)|0;J=Cc(n|0,B|0,E|0,J|0)|0;J=Cc(J|0,B|0,(L^K)&I^L|0,(z^u)&F^z|0)|0;E=B;n=qc(r|0,p|0,28)|0;l=B;t=pc(r|0,p|0,36)|0;l=l|B;v=qc(r|0,p|0,34)|0;x=B;e=pc(r|0,p|0,30)|0;x=l^(x|B);l=qc(r|0,p|0,39)|0;b=B;o=pc(r|0,p|0,25)|0;q=c[k>>2]|0;y=c[k+4>>2]|0;b=Cc((q|f)&r|q&f|0,(y|H)&p|y&H|0,(n|t)^(v|e)^(l|o)|0,x^(b|B)|0)|0;x=B;j=Cc(s|0,j|0,J|0,E|0)|0;s=B;c[G>>2]=j;c[G+4>>2]=s;E=Cc(b|0,x|0,J|0,E|0)|0;J=B;c[m>>2]=E;c[m+4>>2]=J;x=qc(j|0,s|0,14)|0;b=B;o=pc(j|0,s|0,50)|0;b=b|B;l=qc(j|0,s|0,18)|0;e=B;v=pc(j|0,s|0,46)|0;e=b^(e|B);b=qc(j|0,s|0,41)|0;t=B;n=pc(j|0,s|0,23)|0;t=e^(t|B);e=c[h+80+296>>2]|0;H=c[h+80+296+4>>2]|0;z=Cc(L|0,z|0,1014477480,1986661051)|0;t=Cc(z|0,B|0,(x|o)^(l|v)^(b|n)|0,t|0)|0;H=Cc(t|0,B|0,e|0,H|0)|0;H=Cc(H|0,B|0,(K^I)&j^K|0,(u^F)&s^u|0)|0;e=B;t=qc(E|0,J|0,28)|0;n=B;b=pc(E|0,J|0,36)|0;n=n|B;v=qc(E|0,J|0,34)|0;l=B;o=pc(E|0,J|0,30)|0;l=n^(l|B);n=qc(E|0,J|0,39)|0;x=B;z=pc(E|0,J|0,25)|0;L=c[A>>2]|0;f=c[A+4>>2]|0;x=Cc((L|r)&E|L&r|0,(f|p)&J|f&p|0,(t|b)^(v|o)^(n|z)|0,l^(x|B)|0)|0;l=B;y=Cc(q|0,y|0,H|0,e|0)|0;q=B;c[k>>2]=y;c[k+4>>2]=q;e=Cc(x|0,l|0,H|0,e|0)|0;H=B;c[C>>2]=e;c[C+4>>2]=H;l=qc(y|0,q|0,14)|0;x=B;z=pc(y|0,q|0,50)|0;x=x|B;n=qc(y|0,q|0,18)|0;o=B;v=pc(y|0,q|0,46)|0;o=x^(o|B);x=qc(y|0,q|0,41)|0;b=B;t=pc(y|0,q|0,23)|0;b=o^(b|B);o=c[h+80+304>>2]|0;p=c[h+80+304+4>>2]|0;u=Cc(K|0,u|0,1206759142,-2117940946)|0;b=Cc(u|0,B|0,(l|z)^(n|v)^(x|t)|0,b|0)|0;p=Cc(b|0,B|0,o|0,p|0)|0;p=Cc(p|0,B|0,(I^j)&y^I|0,(F^s)&q^F|0)|0;o=B;b=qc(e|0,H|0,28)|0;t=B;x=pc(e|0,H|0,36)|0;t=t|B;v=qc(e|0,H|0,34)|0;n=B;z=pc(e|0,H|0,30)|0;n=t^(n|B);t=qc(e|0,H|0,39)|0;l=B;u=pc(e|0,H|0,25)|0;K=c[w>>2]|0;r=c[w+4>>2]|0;l=Cc((K|E)&e|K&E|0,(r|J)&H|r&J|0,(b|x)^(v|z)^(t|u)|0,n^(l|B)|0)|0;n=B;f=Cc(L|0,f|0,p|0,o|0)|0;L=B;c[A>>2]=f;c[A+4>>2]=L;o=Cc(l|0,n|0,p|0,o|0)|0;p=B;c[D>>2]=o;c[D+4>>2]=p;n=qc(f|0,L|0,14)|0;l=B;u=pc(f|0,L|0,50)|0;l=l|B;t=qc(f|0,L|0,18)|0;z=B;v=pc(f|0,L|0,46)|0;z=l^(z|B);l=qc(f|0,L|0,41)|0;x=B;b=pc(f|0,L|0,23)|0;x=z^(x|B);z=c[h+80+312>>2]|0;J=c[h+80+312+4>>2]|0;F=Cc(I|0,F|0,344077627,-1838011259)|0;x=Cc(F|0,B|0,(n|u)^(t|v)^(l|b)|0,x|0)|0;J=Cc(x|0,B|0,z|0,J|0)|0;J=Cc(J|0,B|0,(j^y)&f^j|0,(s^q)&L^s|0)|0;z=B;x=qc(o|0,p|0,28)|0;b=B;l=pc(o|0,p|0,36)|0;b=b|B;v=qc(o|0,p|0,34)|0;t=B;u=pc(o|0,p|0,30)|0;t=b^(t|B);b=qc(o|0,p|0,39)|0;n=B;F=pc(o|0,p|0,25)|0;I=c[m>>2]|0;E=c[m+4>>2]|0;n=Cc((I|e)&o|I&e|0,(E|H)&p|E&H|0,(x|l)^(v|u)^(b|F)|0,t^(n|B)|0)|0;t=B;r=Cc(K|0,r|0,J|0,z|0)|0;K=B;c[w>>2]=r;c[w+4>>2]=K;z=Cc(n|0,t|0,J|0,z|0)|0;J=B;c[h+16>>2]=z;c[h+16+4>>2]=J;t=qc(r|0,K|0,14)|0;n=B;F=pc(r|0,K|0,50)|0;n=n|B;b=qc(r|0,K|0,18)|0;u=B;v=pc(r|0,K|0,46)|0;u=n^(u|B);n=qc(r|0,K|0,41)|0;l=B;x=pc(r|0,K|0,23)|0;l=u^(l|B);u=c[h+80+320>>2]|0;H=c[h+80+320+4>>2]|0;s=Cc(j|0,s|0,1290863460,-1564481375)|0;l=Cc(s|0,B|0,(t|F)^(b|v)^(n|x)|0,l|0)|0;H=Cc(l|0,B|0,u|0,H|0)|0;H=Cc(H|0,B|0,(y^f)&r^y|0,(q^L)&K^q|0)|0;u=B;l=qc(z|0,J|0,28)|0;x=B;n=pc(z|0,J|0,36)|0;x=x|B;v=qc(z|0,J|0,34)|0;b=B;F=pc(z|0,J|0,30)|0;b=x^(b|B);x=qc(z|0,J|0,39)|0;t=B;s=pc(z|0,J|0,25)|0;j=c[C>>2]|0;e=c[C+4>>2]|0;t=Cc((j|o)&z|j&o|0,(e|p)&J|e&p|0,(l|n)^(v|F)^(x|s)|0,b^(t|B)|0)|0;b=B;E=Cc(I|0,E|0,H|0,u|0)|0;I=B;c[m>>2]=E;c[m+4>>2]=I;u=Cc(t|0,b|0,H|0,u|0)|0;H=B;c[G>>2]=u;c[G+4>>2]=H;b=qc(E|0,I|0,14)|0;t=B;s=pc(E|0,I|0,50)|0;t=t|B;x=qc(E|0,I|0,18)|0;F=B;v=pc(E|0,I|0,46)|0;F=t^(F|B);t=qc(E|0,I|0,41)|0;n=B;l=pc(E|0,I|0,23)|0;n=F^(n|B);F=c[h+80+328>>2]|0;p=c[h+80+328+4>>2]|0;q=Cc(y|0,q|0,-1136513023,-1474664885)|0;n=Cc(q|0,B|0,(b|s)^(x|v)^(t|l)|0,n|0)|0;p=Cc(n|0,B|0,F|0,p|0)|0;p=Cc(p|0,B|0,(f^r)&E^f|0,(L^K)&I^L|0)|0;F=B;n=qc(u|0,H|0,28)|0;l=B;t=pc(u|0,H|0,36)|0;l=l|B;v=qc(u|0,H|0,34)|0;x=B;s=pc(u|0,H|0,30)|0;x=l^(x|B);l=qc(u|0,H|0,39)|0;b=B;q=pc(u|0,H|0,25)|0;y=c[D>>2]|0;o=c[D+4>>2]|0;b=Cc((y|z)&u|y&z|0,(o|J)&H|o&J|0,(n|t)^(v|s)^(l|q)|0,x^(b|B)|0)|0;x=B;e=Cc(j|0,e|0,p|0,F|0)|0;j=B;c[C>>2]=e;c[C+4>>2]=j;F=Cc(b|0,x|0,p|0,F|0)|0;p=B;c[k>>2]=F;c[k+4>>2]=p;x=qc(e|0,j|0,14)|0;b=B;q=pc(e|0,j|0,50)|0;b=b|B;l=qc(e|0,j|0,18)|0;s=B;v=pc(e|0,j|0,46)|0;s=b^(s|B);b=qc(e|0,j|0,41)|0;t=B;n=pc(e|0,j|0,23)|0;t=s^(t|B);s=c[h+80+336>>2]|0;J=c[h+80+336+4>>2]|0;L=Cc(f|0,L|0,-789014639,-1035236496)|0;t=Cc(L|0,B|0,(x|q)^(l|v)^(b|n)|0,t|0)|0;J=Cc(t|0,B|0,s|0,J|0)|0;J=Cc(J|0,B|0,(r^E)&e^r|0,(K^I)&j^K|0)|0;s=B;t=qc(F|0,p|0,28)|0;n=B;b=pc(F|0,p|0,36)|0;n=n|B;v=qc(F|0,p|0,34)|0;l=B;q=pc(F|0,p|0,30)|0;l=n^(l|B);n=qc(F|0,p|0,39)|0;x=B;L=pc(F|0,p|0,25)|0;f=c[h+16>>2]|0;z=c[h+16+4>>2]|0;x=Cc((f|u)&F|f&u|0,(z|H)&p|z&H|0,(t|b)^(v|q)^(n|L)|0,l^(x|B)|0)|0;l=B;o=Cc(y|0,o|0,J|0,s|0)|0;y=B;c[D>>2]=o;c[D+4>>2]=y;s=Cc(x|0,l|0,J|0,s|0)|0;J=B;c[A>>2]=s;c[A+4>>2]=J;l=qc(o|0,y|0,14)|0;x=B;L=pc(o|0,y|0,50)|0;x=x|B;n=qc(o|0,y|0,18)|0;q=B;v=pc(o|0,y|0,46)|0;q=x^(q|B);x=qc(o|0,y|0,41)|0;b=B;t=pc(o|0,y|0,23)|0;b=q^(b|B);q=c[h+80+344>>2]|0;H=c[h+80+344+4>>2]|0;K=Cc(r|0,K|0,106217008,-949202525)|0;b=Cc(K|0,B|0,(l|L)^(n|v)^(x|t)|0,b|0)|0;H=Cc(b|0,B|0,q|0,H|0)|0;H=Cc(H|0,B|0,(E^e)&o^E|0,(I^j)&y^I|0)|0;q=B;b=qc(s|0,J|0,28)|0;t=B;x=pc(s|0,J|0,36)|0;t=t|B;v=qc(s|0,J|0,34)|0;n=B;L=pc(s|0,J|0,30)|0;n=t^(n|B);t=qc(s|0,J|0,39)|0;l=B;K=pc(s|0,J|0,25)|0;r=c[G>>2]|0;u=c[G+4>>2]|0;l=Cc((r|F)&s|r&F|0,(u|p)&J|u&p|0,(b|x)^(v|L)^(t|K)|0,n^(l|B)|0)|0;n=B;z=Cc(f|0,z|0,H|0,q|0)|0;f=B;c[h+16>>2]=z;c[h+16+4>>2]=f;q=Cc(l|0,n|0,H|0,q|0)|0;H=B;c[w>>2]=q;c[w+4>>2]=H;n=qc(z|0,f|0,14)|0;l=B;K=pc(z|0,f|0,50)|0;l=l|B;t=qc(z|0,f|0,18)|0;L=B;v=pc(z|0,f|0,46)|0;L=l^(L|B);l=qc(z|0,f|0,41)|0;x=B;b=pc(z|0,f|0,23)|0;x=L^(x|B);L=c[h+80+352>>2]|0;p=c[h+80+352+4>>2]|0;I=Cc(E|0,I|0,-688958952,-778901479)|0;x=Cc(I|0,B|0,(n|K)^(t|v)^(l|b)|0,x|0)|0;p=Cc(x|0,B|0,L|0,p|0)|0;p=Cc(p|0,B|0,(e^o)&z^e|0,(j^y)&f^j|0)|0;L=B;x=qc(q|0,H|0,28)|0;b=B;l=pc(q|0,H|0,36)|0;b=b|B;v=qc(q|0,H|0,34)|0;t=B;K=pc(q|0,H|0,30)|0;t=b^(t|B);b=qc(q|0,H|0,39)|0;n=B;I=pc(q|0,H|0,25)|0;E=c[k>>2]|0;F=c[k+4>>2]|0;n=Cc((E|s)&q|E&s|0,(F|J)&H|F&J|0,(x|l)^(v|K)^(b|I)|0,t^(n|B)|0)|0;t=B;u=Cc(r|0,u|0,p|0,L|0)|0;r=B;c[G>>2]=u;c[G+4>>2]=r;L=Cc(n|0,t|0,p|0,L|0)|0;p=B;c[m>>2]=L;c[m+4>>2]=p;t=qc(u|0,r|0,14)|0;n=B;I=pc(u|0,r|0,50)|0;n=n|B;b=qc(u|0,r|0,18)|0;K=B;v=pc(u|0,r|0,46)|0;K=n^(K|B);n=qc(u|0,r|0,41)|0;l=B;x=pc(u|0,r|0,23)|0;l=K^(l|B);K=c[h+80+360>>2]|0;J=c[h+80+360+4>>2]|0;j=Cc(e|0,j|0,1432725776,-694614492)|0;l=Cc(j|0,B|0,(t|I)^(b|v)^(n|x)|0,l|0)|0;J=Cc(l|0,B|0,K|0,J|0)|0;J=Cc(J|0,B|0,(o^z)&u^o|0,(y^f)&r^y|0)|0;K=B;l=qc(L|0,p|0,28)|0;x=B;n=pc(L|0,p|0,36)|0;x=x|B;v=qc(L|0,p|0,34)|0;b=B;I=pc(L|0,p|0,30)|0;b=x^(b|B);x=qc(L|0,p|0,39)|0;t=B;j=pc(L|0,p|0,25)|0;e=c[A>>2]|0;s=c[A+4>>2]|0;t=Cc((e|q)&L|e&q|0,(s|H)&p|s&H|0,(l|n)^(v|I)^(x|j)|0,b^(t|B)|0)|0;b=B;F=Cc(E|0,F|0,J|0,K|0)|0;E=B;c[k>>2]=F;c[k+4>>2]=E;K=Cc(t|0,b|0,J|0,K|0)|0;J=B;c[C>>2]=K;c[C+4>>2]=J;b=qc(F|0,E|0,14)|0;t=B;j=pc(F|0,E|0,50)|0;t=t|B;x=qc(F|0,E|0,18)|0;I=B;v=pc(F|0,E|0,46)|0;I=t^(I|B);t=qc(F|0,E|0,41)|0;n=B;l=pc(F|0,E|0,23)|0;n=I^(n|B);I=c[h+80+368>>2]|0;H=c[h+80+368+4>>2]|0;y=Cc(o|0,y|0,1467031594,-200395387)|0;n=Cc(y|0,B|0,(b|j)^(x|v)^(t|l)|0,n|0)|0;H=Cc(n|0,B|0,I|0,H|0)|0;H=Cc(H|0,B|0,(z^u)&F^z|0,(f^r)&E^f|0)|0;I=B;n=qc(K|0,J|0,28)|0;l=B;t=pc(K|0,J|0,36)|0;l=l|B;v=qc(K|0,J|0,34)|0;x=B;j=pc(K|0,J|0,30)|0;x=l^(x|B);l=qc(K|0,J|0,39)|0;b=B;y=pc(K|0,J|0,25)|0;o=c[w>>2]|0;q=c[w+4>>2]|0;b=Cc((o|L)&K|o&L|0,(q|p)&J|q&p|0,(n|t)^(v|j)^(l|y)|0,x^(b|B)|0)|0;x=B;s=Cc(e|0,s|0,H|0,I|0)|0;e=B;c[A>>2]=s;c[A+4>>2]=e;I=Cc(b|0,x|0,H|0,I|0)|0;H=B;c[D>>2]=I;c[D+4>>2]=H;x=qc(s|0,e|0,14)|0;b=B;y=pc(s|0,e|0,50)|0;b=b|B;l=qc(s|0,e|0,18)|0;j=B;v=pc(s|0,e|0,46)|0;j=b^(j|B);b=qc(s|0,e|0,41)|0;t=B;n=pc(s|0,e|0,23)|0;t=j^(t|B);j=c[h+80+376>>2]|0;p=c[h+80+376+4>>2]|0;f=Cc(z|0,f|0,851169720,275423344)|0;t=Cc(f|0,B|0,(x|y)^(l|v)^(b|n)|0,t|0)|0;p=Cc(t|0,B|0,j|0,p|0)|0;p=Cc(p|0,B|0,(u^F)&s^u|0,(r^E)&e^r|0)|0;j=B;t=qc(I|0,H|0,28)|0;n=B;b=pc(I|0,H|0,36)|0;n=n|B;v=qc(I|0,H|0,34)|0;l=B;y=pc(I|0,H|0,30)|0;l=n^(l|B);n=qc(I|0,H|0,39)|0;x=B;f=pc(I|0,H|0,25)|0;z=c[m>>2]|0;L=c[m+4>>2]|0;x=Cc((z|K)&I|z&K|0,(L|J)&H|L&J|0,(t|b)^(v|y)^(n|f)|0,l^(x|B)|0)|0;l=B;q=Cc(o|0,q|0,p|0,j|0)|0;o=B;c[w>>2]=q;c[w+4>>2]=o;j=Cc(x|0,l|0,p|0,j|0)|0;p=B;c[h+16>>2]=j;c[h+16+4>>2]=p;l=qc(q|0,o|0,14)|0;x=B;f=pc(q|0,o|0,50)|0;x=x|B;n=qc(q|0,o|0,18)|0;y=B;v=pc(q|0,o|0,46)|0;y=x^(y|B);x=qc(q|0,o|0,41)|0;b=B;t=pc(q|0,o|0,23)|0;b=y^(b|B);y=c[h+80+384>>2]|0;J=c[h+80+384+4>>2]|0;r=Cc(u|0,r|0,-1194143544,430227734)|0;b=Cc(r|0,B|0,(l|f)^(n|v)^(x|t)|0,b|0)|0;J=Cc(b|0,B|0,y|0,J|0)|0;J=Cc(J|0,B|0,(F^s)&q^F|0,(E^e)&o^E|0)|0;y=B;b=qc(j|0,p|0,28)|0;t=B;x=pc(j|0,p|0,36)|0;t=t|B;v=qc(j|0,p|0,34)|0;n=B;f=pc(j|0,p|0,30)|0;n=t^(n|B);t=qc(j|0,p|0,39)|0;l=B;r=pc(j|0,p|0,25)|0;u=c[C>>2]|0;K=c[C+4>>2]|0;l=Cc((u|I)&j|u&I|0,(K|H)&p|K&H|0,(b|x)^(v|f)^(t|r)|0,n^(l|B)|0)|0;n=B;L=Cc(z|0,L|0,J|0,y|0)|0;z=B;c[m>>2]=L;c[m+4>>2]=z;y=Cc(l|0,n|0,J|0,y|0)|0;J=B;c[G>>2]=y;c[G+4>>2]=J;n=qc(L|0,z|0,14)|0;l=B;r=pc(L|0,z|0,50)|0;l=l|B;t=qc(L|0,z|0,18)|0;f=B;v=pc(L|0,z|0,46)|0;f=l^(f|B);l=qc(L|0,z|0,41)|0;x=B;b=pc(L|0,z|0,23)|0;x=f^(x|B);f=c[h+80+392>>2]|0;H=c[h+80+392+4>>2]|0;E=Cc(F|0,E|0,1363258195,506948616)|0;x=Cc(E|0,B|0,(n|r)^(t|v)^(l|b)|0,x|0)|0;H=Cc(x|0,B|0,f|0,H|0)|0;H=Cc(H|0,B|0,(s^q)&L^s|0,(e^o)&z^e|0)|0;f=B;x=qc(y|0,J|0,28)|0;b=B;l=pc(y|0,J|0,36)|0;b=b|B;v=qc(y|0,J|0,34)|0;t=B;r=pc(y|0,J|0,30)|0;t=b^(t|B);b=qc(y|0,J|0,39)|0;n=B;E=pc(y|0,J|0,25)|0;F=c[D>>2]|0;I=c[D+4>>2]|0;n=Cc((F|j)&y|F&j|0,(I|p)&J|I&p|0,(x|l)^(v|r)^(b|E)|0,t^(n|B)|0)|0;t=B;K=Cc(u|0,K|0,H|0,f|0)|0;u=B;c[C>>2]=K;c[C+4>>2]=u;f=Cc(n|0,t|0,H|0,f|0)|0;H=B;c[k>>2]=f;c[k+4>>2]=H;t=qc(K|0,u|0,14)|0;n=B;E=pc(K|0,u|0,50)|0;n=n|B;b=qc(K|0,u|0,18)|0;r=B;v=pc(K|0,u|0,46)|0;r=n^(r|B);n=qc(K|0,u|0,41)|0;l=B;x=pc(K|0,u|0,23)|0;l=r^(l|B);r=c[h+80+400>>2]|0;p=c[h+80+400+4>>2]|0;e=Cc(s|0,e|0,-544281703,659060556)|0;l=Cc(e|0,B|0,(t|E)^(b|v)^(n|x)|0,l|0)|0;p=Cc(l|0,B|0,r|0,p|0)|0;p=Cc(p|0,B|0,(q^L)&K^q|0,(o^z)&u^o|0)|0;r=B;l=qc(f|0,H|0,28)|0;x=B;n=pc(f|0,H|0,36)|0;x=x|B;v=qc(f|0,H|0,34)|0;b=B;E=pc(f|0,H|0,30)|0;b=x^(b|B);x=qc(f|0,H|0,39)|0;t=B;e=pc(f|0,H|0,25)|0;s=c[h+16>>2]|0;j=c[h+16+4>>2]|0;t=Cc((s|y)&f|s&y|0,(j|J)&H|j&J|0,(l|n)^(v|E)^(x|e)|0,b^(t|B)|0)|0;b=B;I=Cc(F|0,I|0,p|0,r|0)|0;F=B;c[D>>2]=I;c[D+4>>2]=F;r=Cc(t|0,b|0,p|0,r|0)|0;p=B;c[A>>2]=r;c[A+4>>2]=p;b=qc(I|0,F|0,14)|0;t=B;e=pc(I|0,F|0,50)|0;t=t|B;x=qc(I|0,F|0,18)|0;E=B;v=pc(I|0,F|0,46)|0;E=t^(E|B);t=qc(I|0,F|0,41)|0;n=B;l=pc(I|0,F|0,23)|0;n=E^(n|B);E=c[h+80+408>>2]|0;J=c[h+80+408+4>>2]|0;o=Cc(q|0,o|0,-509917016,883997877)|0;n=Cc(o|0,B|0,(b|e)^(x|v)^(t|l)|0,n|0)|0;J=Cc(n|0,B|0,E|0,J|0)|0;J=Cc(J|0,B|0,(L^K)&I^L|0,(z^u)&F^z|0)|0;E=B;n=qc(r|0,p|0,28)|0;l=B;t=pc(r|0,p|0,36)|0;l=l|B;v=qc(r|0,p|0,34)|0;x=B;e=pc(r|0,p|0,30)|0;x=l^(x|B);l=qc(r|0,p|0,39)|0;b=B;o=pc(r|0,p|0,25)|0;q=c[G>>2]|0;y=c[G+4>>2]|0;b=Cc((q|f)&r|q&f|0,(y|H)&p|y&H|0,(n|t)^(v|e)^(l|o)|0,x^(b|B)|0)|0;x=B;j=Cc(s|0,j|0,J|0,E|0)|0;s=B;c[h+16>>2]=j;c[h+16+4>>2]=s;E=Cc(b|0,x|0,J|0,E|0)|0;J=B;c[w>>2]=E;c[w+4>>2]=J;x=qc(j|0,s|0,14)|0;b=B;o=pc(j|0,s|0,50)|0;b=b|B;l=qc(j|0,s|0,18)|0;e=B;v=pc(j|0,s|0,46)|0;e=b^(e|B);b=qc(j|0,s|0,41)|0;t=B;n=pc(j|0,s|0,23)|0;t=e^(t|B);e=c[h+80+416>>2]|0;H=c[h+80+416+4>>2]|0;z=Cc(L|0,z|0,-976659869,958139571)|0;t=Cc(z|0,B|0,(x|o)^(l|v)^(b|n)|0,t|0)|0;H=Cc(t|0,B|0,e|0,H|0)|0;H=Cc(H|0,B|0,(K^I)&j^K|0,(u^F)&s^u|0)|0;e=B;t=qc(E|0,J|0,28)|0;n=B;b=pc(E|0,J|0,36)|0;n=n|B;v=qc(E|0,J|0,34)|0;l=B;o=pc(E|0,J|0,30)|0;l=n^(l|B);n=qc(E|0,J|0,39)|0;x=B;z=pc(E|0,J|0,25)|0;L=c[k>>2]|0;f=c[k+4>>2]|0;x=Cc((L|r)&E|L&r|0,(f|p)&J|f&p|0,(t|b)^(v|o)^(n|z)|0,l^(x|B)|0)|0;l=B;y=Cc(q|0,y|0,H|0,e|0)|0;q=B;c[G>>2]=y;c[G+4>>2]=q;e=Cc(x|0,l|0,H|0,e|0)|0;H=B;c[m>>2]=e;c[m+4>>2]=H;l=qc(y|0,q|0,14)|0;x=B;z=pc(y|0,q|0,50)|0;x=x|B;n=qc(y|0,q|0,18)|0;o=B;v=pc(y|0,q|0,46)|0;o=x^(o|B);x=qc(y|0,q|0,41)|0;b=B;t=pc(y|0,q|0,23)|0;b=o^(b|B);o=c[h+80+424>>2]|0;p=c[h+80+424+4>>2]|0;u=Cc(K|0,u|0,-482243893,1322822218)|0;b=Cc(u|0,B|0,(l|z)^(n|v)^(x|t)|0,b|0)|0;p=Cc(b|0,B|0,o|0,p|0)|0;p=Cc(p|0,B|0,(I^j)&y^I|0,(F^s)&q^F|0)|0;o=B;b=qc(e|0,H|0,28)|0;t=B;x=pc(e|0,H|0,36)|0;t=t|B;v=qc(e|0,H|0,34)|0;n=B;z=pc(e|0,H|0,30)|0;n=t^(n|B);t=qc(e|0,H|0,39)|0;l=B;u=pc(e|0,H|0,25)|0;K=c[A>>2]|0;r=c[A+4>>2]|0;l=Cc((K|E)&e|K&E|0,(r|J)&H|r&J|0,(b|x)^(v|z)^(t|u)|0,n^(l|B)|0)|0;n=B;f=Cc(L|0,f|0,p|0,o|0)|0;L=B;c[k>>2]=f;c[k+4>>2]=L;o=Cc(l|0,n|0,p|0,o|0)|0;p=B;c[C>>2]=o;c[C+4>>2]=p;n=qc(f|0,L|0,14)|0;l=B;u=pc(f|0,L|0,50)|0;l=l|B;t=qc(f|0,L|0,18)|0;z=B;v=pc(f|0,L|0,46)|0;z=l^(z|B);l=qc(f|0,L|0,41)|0;x=B;b=pc(f|0,L|0,23)|0;x=z^(x|B);z=c[h+80+432>>2]|0;J=c[h+80+432+4>>2]|0;F=Cc(I|0,F|0,2003034995,1537002063)|0;x=Cc(F|0,B|0,(n|u)^(t|v)^(l|b)|0,x|0)|0;J=Cc(x|0,B|0,z|0,J|0)|0;J=Cc(J|0,B|0,(j^y)&f^j|0,(s^q)&L^s|0)|0;z=B;x=qc(o|0,p|0,28)|0;b=B;l=pc(o|0,p|0,36)|0;b=b|B;v=qc(o|0,p|0,34)|0;t=B;u=pc(o|0,p|0,30)|0;t=b^(t|B);b=qc(o|0,p|0,39)|0;n=B;F=pc(o|0,p|0,25)|0;I=c[w>>2]|0;E=c[w+4>>2]|0;n=Cc((I|e)&o|I&e|0,(E|H)&p|E&H|0,(x|l)^(v|u)^(b|F)|0,t^(n|B)|0)|0;t=B;r=Cc(K|0,r|0,J|0,z|0)|0;K=B;c[A>>2]=r;c[A+4>>2]=K;z=Cc(n|0,t|0,J|0,z|0)|0;J=B;c[D>>2]=z;c[D+4>>2]=J;t=qc(r|0,K|0,14)|0;n=B;F=pc(r|0,K|0,50)|0;n=n|B;b=qc(r|0,K|0,18)|0;u=B;v=pc(r|0,K|0,46)|0;u=n^(u|B);n=qc(r|0,K|0,41)|0;l=B;x=pc(r|0,K|0,23)|0;l=u^(l|B);u=c[h+80+440>>2]|0;H=c[h+80+440+4>>2]|0;s=Cc(j|0,s|0,-692930397,1747873779)|0;l=Cc(s|0,B|0,(t|F)^(b|v)^(n|x)|0,l|0)|0;H=Cc(l|0,B|0,u|0,H|0)|0;H=Cc(H|0,B|0,(y^f)&r^y|0,(q^L)&K^q|0)|0;u=B;l=qc(z|0,J|0,28)|0;x=B;n=pc(z|0,J|0,36)|0;x=x|B;v=qc(z|0,J|0,34)|0;b=B;F=pc(z|0,J|0,30)|0;b=x^(b|B);x=qc(z|0,J|0,39)|0;t=B;s=pc(z|0,J|0,25)|0;j=c[m>>2]|0;e=c[m+4>>2]|0;t=Cc((j|o)&z|j&o|0,(e|p)&J|e&p|0,(l|n)^(v|F)^(x|s)|0,b^(t|B)|0)|0;b=B;E=Cc(I|0,E|0,H|0,u|0)|0;I=B;c[w>>2]=E;c[w+4>>2]=I;u=Cc(t|0,b|0,H|0,u|0)|0;H=B;c[h+16>>2]=u;c[h+16+4>>2]=H;b=qc(E|0,I|0,14)|0;t=B;s=pc(E|0,I|0,50)|0;t=t|B;x=qc(E|0,I|0,18)|0;F=B;v=pc(E|0,I|0,46)|0;F=t^(F|B);t=qc(E|0,I|0,41)|0;n=B;l=pc(E|0,I|0,23)|0;n=F^(n|B);F=c[h+80+448>>2]|0;p=c[h+80+448+4>>2]|0;q=Cc(y|0,q|0,1575990012,1955562222)|0;n=Cc(q|0,B|0,(b|s)^(x|v)^(t|l)|0,n|0)|0;p=Cc(n|0,B|0,F|0,p|0)|0;p=Cc(p|0,B|0,(f^r)&E^f|0,(L^K)&I^L|0)|0;F=B;n=qc(u|0,H|0,28)|0;l=B;t=pc(u|0,H|0,36)|0;l=l|B;v=qc(u|0,H|0,34)|0;x=B;s=pc(u|0,H|0,30)|0;x=l^(x|B);l=qc(u|0,H|0,39)|0;b=B;q=pc(u|0,H|0,25)|0;y=c[C>>2]|0;o=c[C+4>>2]|0;b=Cc((y|z)&u|y&z|0,(o|J)&H|o&J|0,(n|t)^(v|s)^(l|q)|0,x^(b|B)|0)|0;x=B;e=Cc(j|0,e|0,p|0,F|0)|0;j=B;c[m>>2]=e;c[m+4>>2]=j;F=Cc(b|0,x|0,p|0,F|0)|0;p=B;c[G>>2]=F;c[G+4>>2]=p;x=qc(e|0,j|0,14)|0;b=B;q=pc(e|0,j|0,50)|0;b=b|B;l=qc(e|0,j|0,18)|0;s=B;v=pc(e|0,j|0,46)|0;s=b^(s|B);b=qc(e|0,j|0,41)|0;t=B;n=pc(e|0,j|0,23)|0;t=s^(t|B);s=c[h+80+456>>2]|0;J=c[h+80+456+4>>2]|0;L=Cc(f|0,L|0,1125592928,2024104815)|0;t=Cc(L|0,B|0,(x|q)^(l|v)^(b|n)|0,t|0)|0;J=Cc(t|0,B|0,s|0,J|0)|0;J=Cc(J|0,B|0,(r^E)&e^r|0,(K^I)&j^K|0)|0;s=B;t=qc(F|0,p|0,28)|0;n=B;b=pc(F|0,p|0,36)|0;n=n|B;v=qc(F|0,p|0,34)|0;l=B;q=pc(F|0,p|0,30)|0;l=n^(l|B);n=qc(F|0,p|0,39)|0;x=B;L=pc(F|0,p|0,25)|0;f=c[D>>2]|0;z=c[D+4>>2]|0;x=Cc((f|u)&F|f&u|0,(z|H)&p|z&H|0,(t|b)^(v|q)^(n|L)|0,l^(x|B)|0)|0;l=B;o=Cc(y|0,o|0,J|0,s|0)|0;y=B;c[C>>2]=o;c[C+4>>2]=y;s=Cc(x|0,l|0,J|0,s|0)|0;J=B;c[k>>2]=s;c[k+4>>2]=J;l=qc(o|0,y|0,14)|0;x=B;L=pc(o|0,y|0,50)|0;x=x|B;n=qc(o|0,y|0,18)|0;q=B;v=pc(o|0,y|0,46)|0;q=x^(q|B);x=qc(o|0,y|0,41)|0;b=B;t=pc(o|0,y|0,23)|0;b=q^(b|B);q=c[h+80+464>>2]|0;H=c[h+80+464+4>>2]|0;K=Cc(r|0,K|0,-1578062990,-2067236844)|0;b=Cc(K|0,B|0,(l|L)^(n|v)^(x|t)|0,b|0)|0;H=Cc(b|0,B|0,q|0,H|0)|0;H=Cc(H|0,B|0,(E^e)&o^E|0,(I^j)&y^I|0)|0;q=B;b=qc(s|0,J|0,28)|0;t=B;x=pc(s|0,J|0,36)|0;t=t|B;v=qc(s|0,J|0,34)|0;n=B;L=pc(s|0,J|0,30)|0;n=t^(n|B);t=qc(s|0,J|0,39)|0;l=B;K=pc(s|0,J|0,25)|0;r=c[h+16>>2]|0;u=c[h+16+4>>2]|0;l=Cc((r|F)&s|r&F|0,(u|p)&J|u&p|0,(b|x)^(v|L)^(t|K)|0,n^(l|B)|0)|0;n=B;z=Cc(f|0,z|0,H|0,q|0)|0;f=B;c[D>>2]=z;c[D+4>>2]=f;q=Cc(l|0,n|0,H|0,q|0)|0;H=B;c[A>>2]=q;c[A+4>>2]=H;n=qc(z|0,f|0,14)|0;l=B;K=pc(z|0,f|0,50)|0;l=l|B;t=qc(z|0,f|0,18)|0;L=B;v=pc(z|0,f|0,46)|0;L=l^(L|B);l=qc(z|0,f|0,41)|0;x=B;b=pc(z|0,f|0,23)|0;x=L^(x|B);L=c[h+80+472>>2]|0;p=c[h+80+472+4>>2]|0;I=Cc(E|0,I|0,442776044,-1933114872)|0;x=Cc(I|0,B|0,(n|K)^(t|v)^(l|b)|0,x|0)|0;p=Cc(x|0,B|0,L|0,p|0)|0;p=Cc(p|0,B|0,(e^o)&z^e|0,(j^y)&f^j|0)|0;L=B;x=qc(q|0,H|0,28)|0;b=B;l=pc(q|0,H|0,36)|0;b=b|B;v=qc(q|0,H|0,34)|0;t=B;K=pc(q|0,H|0,30)|0;t=b^(t|B);b=qc(q|0,H|0,39)|0;n=B;I=pc(q|0,H|0,25)|0;E=c[G>>2]|0;F=c[G+4>>2]|0;n=Cc((E|s)&q|E&s|0,(F|J)&H|F&J|0,(x|l)^(v|K)^(b|I)|0,t^(n|B)|0)|0;t=B;u=Cc(r|0,u|0,p|0,L|0)|0;r=B;c[h+16>>2]=u;c[h+16+4>>2]=r;L=Cc(n|0,t|0,p|0,L|0)|0;p=B;c[w>>2]=L;c[w+4>>2]=p;t=qc(u|0,r|0,14)|0;n=B;I=pc(u|0,r|0,50)|0;n=n|B;b=qc(u|0,r|0,18)|0;K=B;v=pc(u|0,r|0,46)|0;K=n^(K|B);n=qc(u|0,r|0,41)|0;l=B;x=pc(u|0,r|0,23)|0;l=K^(l|B);K=c[h+80+480>>2]|0;J=c[h+80+480+4>>2]|0;j=Cc(e|0,j|0,593698344,-1866530822)|0;l=Cc(j|0,B|0,(t|I)^(b|v)^(n|x)|0,l|0)|0;J=Cc(l|0,B|0,K|0,J|0)|0;J=Cc(J|0,B|0,(o^z)&u^o|0,(y^f)&r^y|0)|0;K=B;l=qc(L|0,p|0,28)|0;x=B;n=pc(L|0,p|0,36)|0;x=x|B;v=qc(L|0,p|0,34)|0;b=B;I=pc(L|0,p|0,30)|0;b=x^(b|B);x=qc(L|0,p|0,39)|0;t=B;j=pc(L|0,p|0,25)|0;e=c[k>>2]|0;s=c[k+4>>2]|0;t=Cc((e|q)&L|e&q|0,(s|H)&p|s&H|0,(l|n)^(v|I)^(x|j)|0,b^(t|B)|0)|0;b=B;F=Cc(E|0,F|0,J|0,K|0)|0;E=B;c[G>>2]=F;c[G+4>>2]=E;K=Cc(t|0,b|0,J|0,K|0)|0;J=B;c[m>>2]=K;c[m+4>>2]=J;b=qc(F|0,E|0,14)|0;t=B;j=pc(F|0,E|0,50)|0;t=t|B;x=qc(F|0,E|0,18)|0;I=B;v=pc(F|0,E|0,46)|0;I=t^(I|B);t=qc(F|0,E|0,41)|0;n=B;l=pc(F|0,E|0,23)|0;n=I^(n|B);I=c[h+80+488>>2]|0;H=c[h+80+488+4>>2]|0;y=Cc(o|0,y|0,-561857047,-1538233109)|0;n=Cc(y|0,B|0,(b|j)^(x|v)^(t|l)|0,n|0)|0;H=Cc(n|0,B|0,I|0,H|0)|0;H=Cc(H|0,B|0,(z^u)&F^z|0,(f^r)&E^f|0)|0;I=B;n=qc(K|0,J|0,28)|0;l=B;t=pc(K|0,J|0,36)|0;l=l|B;v=qc(K|0,J|0,34)|0;x=B;j=pc(K|0,J|0,30)|0;x=l^(x|B);l=qc(K|0,J|0,39)|0;b=B;y=pc(K|0,J|0,25)|0;o=c[A>>2]|0;q=c[A+4>>2]|0;b=Cc((o|L)&K|o&L|0,(q|p)&J|q&p|0,(n|t)^(v|j)^(l|y)|0,x^(b|B)|0)|0;x=B;s=Cc(e|0,s|0,H|0,I|0)|0;e=B;c[k>>2]=s;c[k+4>>2]=e;I=Cc(b|0,x|0,H|0,I|0)|0;H=B;c[C>>2]=I;c[C+4>>2]=H;x=qc(s|0,e|0,14)|0;b=B;y=pc(s|0,e|0,50)|0;b=b|B;l=qc(s|0,e|0,18)|0;j=B;v=pc(s|0,e|0,46)|0;j=b^(j|B);b=qc(s|0,e|0,41)|0;t=B;n=pc(s|0,e|0,23)|0;t=j^(t|B);j=c[h+80+496>>2]|0;p=c[h+80+496+4>>2]|0;f=Cc(z|0,f|0,-1295615723,-1090935817)|0;t=Cc(f|0,B|0,(x|y)^(l|v)^(b|n)|0,t|0)|0;p=Cc(t|0,B|0,j|0,p|0)|0;p=Cc(p|0,B|0,(u^F)&s^u|0,(r^E)&e^r|0)|0;j=B;t=qc(I|0,H|0,28)|0;n=B;b=pc(I|0,H|0,36)|0;n=n|B;v=qc(I|0,H|0,34)|0;l=B;y=pc(I|0,H|0,30)|0;l=n^(l|B);n=qc(I|0,H|0,39)|0;x=B;f=pc(I|0,H|0,25)|0;z=c[w>>2]|0;L=c[w+4>>2]|0;x=Cc((z|K)&I|z&K|0,(L|J)&H|L&J|0,(t|b)^(v|y)^(n|f)|0,l^(x|B)|0)|0;l=B;q=Cc(o|0,q|0,p|0,j|0)|0;o=B;c[A>>2]=q;c[A+4>>2]=o;j=Cc(x|0,l|0,p|0,j|0)|0;p=B;c[D>>2]=j;c[D+4>>2]=p;l=qc(q|0,o|0,14)|0;x=B;f=pc(q|0,o|0,50)|0;x=x|B;n=qc(q|0,o|0,18)|0;y=B;v=pc(q|0,o|0,46)|0;y=x^(y|B);x=qc(q|0,o|0,41)|0;b=B;t=pc(q|0,o|0,23)|0;b=y^(b|B);y=c[h+80+504>>2]|0;J=c[h+80+504+4>>2]|0;r=Cc(u|0,r|0,-479046869,-965641998)|0;b=Cc(r|0,B|0,(l|f)^(n|v)^(x|t)|0,b|0)|0;J=Cc(b|0,B|0,y|0,J|0)|0;J=Cc(J|0,B|0,(F^s)&q^F|0,(E^e)&o^E|0)|0;y=B;b=qc(j|0,p|0,28)|0;t=B;x=pc(j|0,p|0,36)|0;t=t|B;v=qc(j|0,p|0,34)|0;n=B;f=pc(j|0,p|0,30)|0;n=t^(n|B);t=qc(j|0,p|0,39)|0;l=B;r=pc(j|0,p|0,25)|0;u=c[m>>2]|0;K=c[m+4>>2]|0;l=Cc((u|I)&j|u&I|0,(K|H)&p|K&H|0,(b|x)^(v|f)^(t|r)|0,n^(l|B)|0)|0;n=B;L=Cc(z|0,L|0,J|0,y|0)|0;z=B;c[w>>2]=L;c[w+4>>2]=z;y=Cc(l|0,n|0,J|0,y|0)|0;J=B;c[h+16>>2]=y;c[h+16+4>>2]=J;n=qc(L|0,z|0,14)|0;l=B;r=pc(L|0,z|0,50)|0;l=l|B;t=qc(L|0,z|0,18)|0;f=B;v=pc(L|0,z|0,46)|0;f=l^(f|B);l=qc(L|0,z|0,41)|0;x=B;b=pc(L|0,z|0,23)|0;x=f^(x|B);f=c[h+80+512>>2]|0;H=c[h+80+512+4>>2]|0;E=Cc(F|0,E|0,-366583396,-903397682)|0;x=Cc(E|0,B|0,(n|r)^(t|v)^(l|b)|0,x|0)|0;H=Cc(x|0,B|0,f|0,H|0)|0;H=Cc(H|0,B|0,(s^q)&L^s|0,(e^o)&z^e|0)|0;f=B;x=qc(y|0,J|0,28)|0;b=B;l=pc(y|0,J|0,36)|0;b=b|B;v=qc(y|0,J|0,34)|0;t=B;r=pc(y|0,J|0,30)|0;t=b^(t|B);b=qc(y|0,J|0,39)|0;n=B;E=pc(y|0,J|0,25)|0;F=c[C>>2]|0;I=c[C+4>>2]|0;n=Cc((F|j)&y|F&j|0,(I|p)&J|I&p|0,(x|l)^(v|r)^(b|E)|0,t^(n|B)|0)|0;t=B;K=Cc(u|0,K|0,H|0,f|0)|0;u=B;c[m>>2]=K;c[m+4>>2]=u;f=Cc(n|0,t|0,H|0,f|0)|0;H=B;c[G>>2]=f;c[G+4>>2]=H;t=qc(K|0,u|0,14)|0;n=B;E=pc(K|0,u|0,50)|0;n=n|B;b=qc(K|0,u|0,18)|0;r=B;v=pc(K|0,u|0,46)|0;r=n^(r|B);n=qc(K|0,u|0,41)|0;l=B;x=pc(K|0,u|0,23)|0;l=r^(l|B);r=c[h+80+520>>2]|0;p=c[h+80+520+4>>2]|0;e=Cc(s|0,e|0,566280711,-779700025)|0;l=Cc(e|0,B|0,(t|E)^(b|v)^(n|x)|0,l|0)|0;p=Cc(l|0,B|0,r|0,p|0)|0;p=Cc(p|0,B|0,(q^L)&K^q|0,(o^z)&u^o|0)|0;r=B;l=qc(f|0,H|0,28)|0;x=B;n=pc(f|0,H|0,36)|0;x=x|B;v=qc(f|0,H|0,34)|0;b=B;E=pc(f|0,H|0,30)|0;b=x^(b|B);x=qc(f|0,H|0,39)|0;t=B;e=pc(f|0,H|0,25)|0;s=c[D>>2]|0;j=c[D+4>>2]|0;t=Cc((s|y)&f|s&y|0,(j|J)&H|j&J|0,(l|n)^(v|E)^(x|e)|0,b^(t|B)|0)|0;b=B;I=Cc(F|0,I|0,p|0,r|0)|0;F=B;c[C>>2]=I;c[C+4>>2]=F;r=Cc(t|0,b|0,p|0,r|0)|0;p=B;c[k>>2]=r;c[k+4>>2]=p;b=qc(I|0,F|0,14)|0;t=B;e=pc(I|0,F|0,50)|0;t=t|B;x=qc(I|0,F|0,18)|0;E=B;v=pc(I|0,F|0,46)|0;E=t^(E|B);t=qc(I|0,F|0,41)|0;n=B;l=pc(I|0,F|0,23)|0;n=E^(n|B);E=c[h+80+528>>2]|0;J=c[h+80+528+4>>2]|0;o=Cc(q|0,o|0,-840897762,-354779690)|0;n=Cc(o|0,B|0,(b|e)^(x|v)^(t|l)|0,n|0)|0;J=Cc(n|0,B|0,E|0,J|0)|0;J=Cc(J|0,B|0,(L^K)&I^L|0,(z^u)&F^z|0)|0;E=B;n=qc(r|0,p|0,28)|0;l=B;t=pc(r|0,p|0,36)|0;l=l|B;v=qc(r|0,p|0,34)|0;x=B;e=pc(r|0,p|0,30)|0;x=l^(x|B);l=qc(r|0,p|0,39)|0;b=B;o=pc(r|0,p|0,25)|0;q=c[h+16>>2]|0;y=c[h+16+4>>2]|0;b=Cc((q|f)&r|q&f|0,(y|H)&p|y&H|0,(n|t)^(v|e)^(l|o)|0,x^(b|B)|0)|0;x=B;j=Cc(s|0,j|0,J|0,E|0)|0;s=B;c[D>>2]=j;c[D+4>>2]=s;E=Cc(b|0,x|0,J|0,E|0)|0;J=B;c[A>>2]=E;c[A+4>>2]=J;x=qc(j|0,s|0,14)|0;b=B;o=pc(j|0,s|0,50)|0;b=b|B;l=qc(j|0,s|0,18)|0;e=B;v=pc(j|0,s|0,46)|0;e=b^(e|B);b=qc(j|0,s|0,41)|0;t=B;n=pc(j|0,s|0,23)|0;t=e^(t|B);e=c[h+80+536>>2]|0;H=c[h+80+536+4>>2]|0;z=Cc(L|0,z|0,-294727304,-176337025)|0;t=Cc(z|0,B|0,(x|o)^(l|v)^(b|n)|0,t|0)|0;H=Cc(t|0,B|0,e|0,H|0)|0;H=Cc(H|0,B|0,(K^I)&j^K|0,(u^F)&s^u|0)|0;e=B;t=qc(E|0,J|0,28)|0;n=B;b=pc(E|0,J|0,36)|0;n=n|B;v=qc(E|0,J|0,34)|0;l=B;o=pc(E|0,J|0,30)|0;l=n^(l|B);n=qc(E|0,J|0,39)|0;x=B;z=pc(E|0,J|0,25)|0;L=c[G>>2]|0;f=c[G+4>>2]|0;x=Cc((L|r)&E|L&r|0,(f|p)&J|f&p|0,(t|b)^(v|o)^(n|z)|0,l^(x|B)|0)|0;l=B;y=Cc(q|0,y|0,H|0,e|0)|0;q=B;c[h+16>>2]=y;c[h+16+4>>2]=q;e=Cc(x|0,l|0,H|0,e|0)|0;H=B;c[w>>2]=e;c[w+4>>2]=H;l=qc(y|0,q|0,14)|0;x=B;z=pc(y|0,q|0,50)|0;x=x|B;n=qc(y|0,q|0,18)|0;o=B;v=pc(y|0,q|0,46)|0;o=x^(o|B);x=qc(y|0,q|0,41)|0;b=B;t=pc(y|0,q|0,23)|0;b=o^(b|B);o=c[h+80+544>>2]|0;p=c[h+80+544+4>>2]|0;u=Cc(K|0,u|0,1914138554,116418474)|0;b=Cc(u|0,B|0,(l|z)^(n|v)^(x|t)|0,b|0)|0;p=Cc(b|0,B|0,o|0,p|0)|0;p=Cc(p|0,B|0,(I^j)&y^I|0,(F^s)&q^F|0)|0;o=B;b=qc(e|0,H|0,28)|0;t=B;x=pc(e|0,H|0,36)|0;t=t|B;v=qc(e|0,H|0,34)|0;n=B;z=pc(e|0,H|0,30)|0;n=t^(n|B);t=qc(e|0,H|0,39)|0;l=B;u=pc(e|0,H|0,25)|0;K=c[k>>2]|0;r=c[k+4>>2]|0;l=Cc((K|E)&e|K&E|0,(r|J)&H|r&J|0,(b|x)^(v|z)^(t|u)|0,n^(l|B)|0)|0;n=B;f=Cc(L|0,f|0,p|0,o|0)|0;L=B;c[G>>2]=f;c[G+4>>2]=L;o=Cc(l|0,n|0,p|0,o|0)|0;p=B;c[m>>2]=o;c[m+4>>2]=p;n=qc(f|0,L|0,14)|0;l=B;u=pc(f|0,L|0,50)|0;l=l|B;t=qc(f|0,L|0,18)|0;z=B;v=pc(f|0,L|0,46)|0;z=l^(z|B);l=qc(f|0,L|0,41)|0;x=B;b=pc(f|0,L|0,23)|0;x=z^(x|B);z=c[h+80+552>>2]|0;J=c[h+80+552+4>>2]|0;F=Cc(I|0,F|0,-1563912026,174292421)|0;x=Cc(F|0,B|0,(n|u)^(t|v)^(l|b)|0,x|0)|0;J=Cc(x|0,B|0,z|0,J|0)|0;J=Cc(J|0,B|0,(j^y)&f^j|0,(s^q)&L^s|0)|0;z=B;x=qc(o|0,p|0,28)|0;b=B;l=pc(o|0,p|0,36)|0;b=b|B;v=qc(o|0,p|0,34)|0;t=B;u=pc(o|0,p|0,30)|0;t=b^(t|B);b=qc(o|0,p|0,39)|0;n=B;F=pc(o|0,p|0,25)|0;I=c[A>>2]|0;E=c[A+4>>2]|0;n=Cc((I|e)&o|I&e|0,(E|H)&p|E&H|0,(x|l)^(v|u)^(b|F)|0,t^(n|B)|0)|0;t=B;r=Cc(K|0,r|0,J|0,z|0)|0;K=B;c[k>>2]=r;c[k+4>>2]=K;z=Cc(n|0,t|0,J|0,z|0)|0;J=B;c[C>>2]=z;c[C+4>>2]=J;t=qc(r|0,K|0,14)|0;n=B;F=pc(r|0,K|0,50)|0;n=n|B;b=qc(r|0,K|0,18)|0;u=B;v=pc(r|0,K|0,46)|0;u=n^(u|B);n=qc(r|0,K|0,41)|0;l=B;x=pc(r|0,K|0,23)|0;l=u^(l|B);u=c[h+80+560>>2]|0;H=c[h+80+560+4>>2]|0;s=Cc(j|0,s|0,-1090974290,289380356)|0;l=Cc(s|0,B|0,(t|F)^(b|v)^(n|x)|0,l|0)|0;H=Cc(l|0,B|0,u|0,H|0)|0;H=Cc(H|0,B|0,(y^f)&r^y|0,(q^L)&K^q|0)|0;u=B;l=qc(z|0,J|0,28)|0;x=B;n=pc(z|0,J|0,36)|0;x=x|B;v=qc(z|0,J|0,34)|0;b=B;F=pc(z|0,J|0,30)|0;b=x^(b|B);x=qc(z|0,J|0,39)|0;t=B;s=pc(z|0,J|0,25)|0;j=c[w>>2]|0;e=c[w+4>>2]|0;t=Cc((j|o)&z|j&o|0,(e|p)&J|e&p|0,(l|n)^(v|F)^(x|s)|0,b^(t|B)|0)|0;b=B;E=Cc(I|0,E|0,H|0,u|0)|0;I=B;c[A>>2]=E;c[A+4>>2]=I;u=Cc(t|0,b|0,H|0,u|0)|0;H=B;c[D>>2]=u;c[D+4>>2]=H;b=qc(E|0,I|0,14)|0;t=B;s=pc(E|0,I|0,50)|0;t=t|B;x=qc(E|0,I|0,18)|0;F=B;v=pc(E|0,I|0,46)|0;F=t^(F|B);t=qc(E|0,I|0,41)|0;n=B;l=pc(E|0,I|0,23)|0;n=F^(n|B);F=c[h+80+568>>2]|0;p=c[h+80+568+4>>2]|0;q=Cc(y|0,q|0,320620315,460393269)|0;n=Cc(q|0,B|0,(b|s)^(x|v)^(t|l)|0,n|0)|0;p=Cc(n|0,B|0,F|0,p|0)|0;p=Cc(p|0,B|0,(f^r)&E^f|0,(L^K)&I^L|0)|0;F=B;n=qc(u|0,H|0,28)|0;l=B;t=pc(u|0,H|0,36)|0;l=l|B;v=qc(u|0,H|0,34)|0;x=B;s=pc(u|0,H|0,30)|0;x=l^(x|B);l=qc(u|0,H|0,39)|0;b=B;q=pc(u|0,H|0,25)|0;y=c[m>>2]|0;o=c[m+4>>2]|0;b=Cc((y|z)&u|y&z|0,(o|J)&H|o&J|0,(n|t)^(v|s)^(l|q)|0,x^(b|B)|0)|0;x=B;e=Cc(j|0,e|0,p|0,F|0)|0;j=B;c[w>>2]=e;c[w+4>>2]=j;F=Cc(b|0,x|0,p|0,F|0)|0;p=B;c[h+16>>2]=F;c[h+16+4>>2]=p;x=qc(e|0,j|0,14)|0;b=B;q=pc(e|0,j|0,50)|0;b=b|B;l=qc(e|0,j|0,18)|0;s=B;v=pc(e|0,j|0,46)|0;s=b^(s|B);b=qc(e|0,j|0,41)|0;t=B;n=pc(e|0,j|0,23)|0;t=s^(t|B);s=c[h+80+576>>2]|0;J=c[h+80+576+4>>2]|0;L=Cc(f|0,L|0,587496836,685471733)|0;t=Cc(L|0,B|0,(x|q)^(l|v)^(b|n)|0,t|0)|0;J=Cc(t|0,B|0,s|0,J|0)|0;J=Cc(J|0,B|0,(r^E)&e^r|0,(K^I)&j^K|0)|0;s=B;t=qc(F|0,p|0,28)|0;n=B;b=pc(F|0,p|0,36)|0;n=n|B;v=qc(F|0,p|0,34)|0;l=B;q=pc(F|0,p|0,30)|0;l=n^(l|B);n=qc(F|0,p|0,39)|0;x=B;L=pc(F|0,p|0,25)|0;f=c[C>>2]|0;z=c[C+4>>2]|0;x=Cc((f|u)&F|f&u|0,(z|H)&p|z&H|0,(t|b)^(v|q)^(n|L)|0,l^(x|B)|0)|0;l=B;o=Cc(y|0,o|0,J|0,s|0)|0;y=B;c[m>>2]=o;c[m+4>>2]=y;s=Cc(x|0,l|0,J|0,s|0)|0;J=B;c[G>>2]=s;c[G+4>>2]=J;l=qc(o|0,y|0,14)|0;x=B;L=pc(o|0,y|0,50)|0;x=x|B;n=qc(o|0,y|0,18)|0;q=B;v=pc(o|0,y|0,46)|0;q=x^(q|B);x=qc(o|0,y|0,41)|0;b=B;t=pc(o|0,y|0,23)|0;b=q^(b|B);q=c[h+80+584>>2]|0;H=c[h+80+584+4>>2]|0;K=Cc(r|0,K|0,1086792851,852142971)|0;b=Cc(K|0,B|0,(l|L)^(n|v)^(x|t)|0,b|0)|0;H=Cc(b|0,B|0,q|0,H|0)|0;H=Cc(H|0,B|0,(E^e)&o^E|0,(I^j)&y^I|0)|0;q=B;b=qc(s|0,J|0,28)|0;t=B;x=pc(s|0,J|0,36)|0;t=t|B;v=qc(s|0,J|0,34)|0;n=B;L=pc(s|0,J|0,30)|0;n=t^(n|B);t=qc(s|0,J|0,39)|0;l=B;K=pc(s|0,J|0,25)|0;r=c[D>>2]|0;u=c[D+4>>2]|0;l=Cc((r|F)&s|r&F|0,(u|p)&J|u&p|0,(b|x)^(v|L)^(t|K)|0,n^(l|B)|0)|0;n=B;z=Cc(f|0,z|0,H|0,q|0)|0;f=B;c[C>>2]=z;c[C+4>>2]=f;q=Cc(l|0,n|0,H|0,q|0)|0;H=B;c[k>>2]=q;c[k+4>>2]=H;n=qc(z|0,f|0,14)|0;l=B;K=pc(z|0,f|0,50)|0;l=l|B;t=qc(z|0,f|0,18)|0;L=B;v=pc(z|0,f|0,46)|0;L=l^(L|B);l=qc(z|0,f|0,41)|0;x=B;b=pc(z|0,f|0,23)|0;x=L^(x|B);L=c[h+80+592>>2]|0;p=c[h+80+592+4>>2]|0;I=Cc(E|0,I|0,365543100,1017036298)|0;x=Cc(I|0,B|0,(n|K)^(t|v)^(l|b)|0,x|0)|0;p=Cc(x|0,B|0,L|0,p|0)|0;p=Cc(p|0,B|0,(e^o)&z^e|0,(j^y)&f^j|0)|0;L=B;x=qc(q|0,H|0,28)|0;b=B;l=pc(q|0,H|0,36)|0;b=b|B;v=qc(q|0,H|0,34)|0;t=B;K=pc(q|0,H|0,30)|0;t=b^(t|B);b=qc(q|0,H|0,39)|0;n=B;I=pc(q|0,H|0,25)|0;E=c[h+16>>2]|0;F=c[h+16+4>>2]|0;n=Cc((E|s)&q|E&s|0,(F|J)&H|F&J|0,(x|l)^(v|K)^(b|I)|0,t^(n|B)|0)|0;t=B;u=Cc(r|0,u|0,p|0,L|0)|0;r=B;c[D>>2]=u;c[D+4>>2]=r;L=Cc(n|0,t|0,p|0,L|0)|0;p=B;c[A>>2]=L;c[A+4>>2]=p;t=qc(u|0,r|0,14)|0;n=B;I=pc(u|0,r|0,50)|0;n=n|B;b=qc(u|0,r|0,18)|0;K=B;v=pc(u|0,r|0,46)|0;K=n^(K|B);n=qc(u|0,r|0,41)|0;l=B;x=pc(u|0,r|0,23)|0;l=K^(l|B);K=c[h+80+600>>2]|0;J=c[h+80+600+4>>2]|0;j=Cc(e|0,j|0,-1676669620,1126000580)|0;l=Cc(j|0,B|0,(t|I)^(b|v)^(n|x)|0,l|0)|0;J=Cc(l|0,B|0,K|0,J|0)|0;J=Cc(J|0,B|0,(o^z)&u^o|0,(y^f)&r^y|0)|0;K=B;l=qc(L|0,p|0,28)|0;x=B;n=pc(L|0,p|0,36)|0;x=x|B;v=qc(L|0,p|0,34)|0;b=B;I=pc(L|0,p|0,30)|0;b=x^(b|B);x=qc(L|0,p|0,39)|0;t=B;j=pc(L|0,p|0,25)|0;e=c[G>>2]|0;s=c[G+4>>2]|0;t=Cc((e|q)&L|e&q|0,(s|H)&p|s&H|0,(l|n)^(v|I)^(x|j)|0,b^(t|B)|0)|0;b=B;F=Cc(E|0,F|0,J|0,K|0)|0;E=B;c[h+16>>2]=F;c[h+16+4>>2]=E;K=Cc(t|0,b|0,J|0,K|0)|0;J=B;c[w>>2]=K;c[w+4>>2]=J;b=qc(F|0,E|0,14)|0;t=B;j=pc(F|0,E|0,50)|0;t=t|B;x=qc(F|0,E|0,18)|0;I=B;v=pc(F|0,E|0,46)|0;I=t^(I|B);t=qc(F|0,E|0,41)|0;n=B;l=pc(F|0,E|0,23)|0;n=I^(n|B);I=c[h+80+608>>2]|0;H=c[h+80+608+4>>2]|0;y=Cc(o|0,y|0,-885112138,1288033470)|0;n=Cc(y|0,B|0,(b|j)^(x|v)^(t|l)|0,n|0)|0;H=Cc(n|0,B|0,I|0,H|0)|0;H=Cc(H|0,B|0,(z^u)&F^z|0,(f^r)&E^f|0)|0;I=B;n=qc(K|0,J|0,28)|0;l=B;t=pc(K|0,J|0,36)|0;l=l|B;v=qc(K|0,J|0,34)|0;x=B;j=pc(K|0,J|0,30)|0;x=l^(x|B);l=qc(K|0,J|0,39)|0;b=B;y=pc(K|0,J|0,25)|0;o=c[k>>2]|0;q=c[k+4>>2]|0;b=Cc((o|L)&K|o&L|0,(q|p)&J|q&p|0,(n|t)^(v|j)^(l|y)|0,x^(b|B)|0)|0;x=B;s=Cc(e|0,s|0,H|0,I|0)|0;e=B;c[G>>2]=s;c[G+4>>2]=e;I=Cc(b|0,x|0,H|0,I|0)|0;H=B;c[m>>2]=I;c[m+4>>2]=H;x=qc(s|0,e|0,14)|0;b=B;G=pc(s|0,e|0,50)|0;b=b|B;y=qc(s|0,e|0,18)|0;l=B;j=pc(s|0,e|0,46)|0;l=b^(l|B);b=qc(s|0,e|0,41)|0;v=B;t=pc(s|0,e|0,23)|0;v=l^(v|B);l=c[h+80+616>>2]|0;n=c[h+80+616+4>>2]|0;f=Cc(z|0,f|0,-60457430,1501505948)|0;v=Cc(f|0,B|0,(x|G)^(y|j)^(b|t)|0,v|0)|0;n=Cc(v|0,B|0,l|0,n|0)|0;n=Cc(n|0,B|0,(u^F)&s^u|0,(r^E)&e^r|0)|0;l=B;v=qc(I|0,H|0,28)|0;t=B;b=pc(I|0,H|0,36)|0;t=t|B;j=qc(I|0,H|0,34)|0;y=B;G=pc(I|0,H|0,30)|0;y=t^(y|B);t=qc(I|0,H|0,39)|0;x=B;f=pc(I|0,H|0,25)|0;z=c[A>>2]|0;p=c[A+4>>2]|0;x=Cc((z|K)&I|z&K|0,(p|J)&H|p&J|0,(v|b)^(j|G)^(t|f)|0,y^(x|B)|0)|0;y=B;q=Cc(o|0,q|0,n|0,l|0)|0;o=B;c[k>>2]=q;c[k+4>>2]=o;l=Cc(x|0,y|0,n|0,l|0)|0;n=B;c[C>>2]=l;c[C+4>>2]=n;C=qc(q|0,o|0,14)|0;y=B;x=pc(q|0,o|0,50)|0;y=y|B;k=qc(q|0,o|0,18)|0;f=B;t=pc(q|0,o|0,46)|0;f=y^(f|B);y=qc(q|0,o|0,41)|0;G=B;j=pc(q|0,o|0,23)|0;G=f^(G|B);f=c[h+80+624>>2]|0;b=c[h+80+624+4>>2]|0;r=Cc(u|0,r|0,987167468,1607167915)|0;G=Cc(r|0,B|0,(C|x)^(k|t)^(y|j)|0,G|0)|0;b=Cc(G|0,B|0,f|0,b|0)|0;b=Cc(b|0,B|0,(F^s)&q^F|0,(E^e)&o^E|0)|0;f=B;G=qc(l|0,n|0,28)|0;j=B;y=pc(l|0,n|0,36)|0;j=j|B;t=qc(l|0,n|0,34)|0;k=B;x=pc(l|0,n|0,30)|0;k=j^(k|B);j=qc(l|0,n|0,39)|0;C=B;r=pc(l|0,n|0,25)|0;u=c[w>>2]|0;v=c[w+4>>2]|0;C=Cc((u|I)&l|u&I|0,(v|H)&n|v&H|0,(G|y)^(t|x)^(j|r)|0,k^(C|B)|0)|0;k=B;p=Cc(z|0,p|0,b|0,f|0)|0;z=B;c[A>>2]=p;c[A+4>>2]=z;f=Cc(C|0,k|0,b|0,f|0)|0;b=B;c[D>>2]=f;c[D+4>>2]=b;D=qc(p|0,z|0,14)|0;k=B;C=pc(p|0,z|0,50)|0;k=k|B;A=qc(p|0,z|0,18)|0;r=B;j=pc(p|0,z|0,46)|0;r=k^(r|B);k=qc(p|0,z|0,41)|0;x=B;t=pc(p|0,z|0,23)|0;x=r^(x|B);r=c[h+80+632>>2]|0;y=c[h+80+632+4>>2]|0;E=Cc(F|0,E|0,1246189591,1816402316)|0;x=Cc(E|0,B|0,(D|C)^(A|j)^(k|t)|0,x|0)|0;y=Cc(x|0,B|0,r|0,y|0)|0;e=Cc(y|0,B|0,(s^q)&p^s|0,(e^o)&z^e|0)|0;z=B;c[h+8>>2]=e;c[h+8+4>>2]=z;o=qc(f|0,b|0,28)|0;s=B;p=pc(f|0,b|0,36)|0;s=s|B;q=qc(f|0,b|0,34)|0;y=B;r=pc(f|0,b|0,30)|0;y=s^(y|B);s=qc(f|0,b|0,39)|0;x=B;t=pc(f|0,b|0,25)|0;k=c[m>>2]|0;m=c[m+4>>2]|0;x=Cc((k|l)&f|k&l|0,(m|n)&b|m&n|0,(o|p)^(q|r)^(s|t)|0,y^(x|B)|0)|0;y=B;c[h>>2]=x;c[h+4>>2]=y;v=Cc(u|0,v|0,e|0,z|0)|0;c[w>>2]=v;c[w+4>>2]=B;z=Cc(x|0,y|0,e|0,z|0)|0;e=B;c[h+16>>2]=z;c[h+16+4>>2]=e;e=Cc(c[a>>2]|0,c[a+4>>2]|0,z|0,e|0)|0;c[a>>2]=e;c[a+4>>2]=B;e=1;while(1){M=a+(e<<3)|0;b=Cc(c[M>>2]|0,c[M+4>>2]|0,f|0,b|0)|0;c[M>>2]=b;c[M+4>>2]=B;b=e+1|0;if((b|0)==8)break;e=b;f=c[h+16+(b<<3)>>2]|0;b=c[h+16+(b<<3)+4>>2]|0}Vb(h+80|0,640);Vb(h+16|0,64);Vb(h+8|0,8);Vb(h,8);i=g;return}function da(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0;O=i;P=i=i+63&-64;i=i+128|0;o=d[b>>0]|d[b+1>>0]<<8|d[b+2>>0]<<16|d[b+3>>0]<<24;x=d[b+4>>0]|d[b+4+1>>0]<<8|d[b+4+2>>0]<<16|d[b+4+3>>0]<<24;L=d[b+8>>0]|d[b+8+1>>0]<<8|d[b+8+2>>0]<<16|d[b+8+3>>0]<<24;l=d[b+8+4>>0]|d[b+8+4+1>>0]<<8|d[b+8+4+2>>0]<<16|d[b+8+4+3>>0]<<24;m=d[b+16>>0]|d[b+16+1>>0]<<8|d[b+16+2>>0]<<16|d[b+16+3>>0]<<24;n=d[b+16+4>>0]|d[b+16+4+1>>0]<<8|d[b+16+4+2>>0]<<16|d[b+16+4+3>>0]<<24;p=d[b+24>>0]|d[b+24+1>>0]<<8|d[b+24+2>>0]<<16|d[b+24+3>>0]<<24;q=d[b+24+4>>0]|d[b+24+4+1>>0]<<8|d[b+24+4+2>>0]<<16|d[b+24+4+3>>0]<<24;r=d[b+32>>0]|d[b+32+1>>0]<<8|d[b+32+2>>0]<<16|d[b+32+3>>0]<<24;s=d[b+32+4>>0]|d[b+32+4+1>>0]<<8|d[b+32+4+2>>0]<<16|d[b+32+4+3>>0]<<24;t=d[b+40>>0]|d[b+40+1>>0]<<8|d[b+40+2>>0]<<16|d[b+40+3>>0]<<24;u=d[b+40+4>>0]|d[b+40+4+1>>0]<<8|d[b+40+4+2>>0]<<16|d[b+40+4+3>>0]<<24;v=d[b+48>>0]|d[b+48+1>>0]<<8|d[b+48+2>>0]<<16|d[b+48+3>>0]<<24;w=d[b+48+4>>0]|d[b+48+4+1>>0]<<8|d[b+48+4+2>>0]<<16|d[b+48+4+3>>0]<<24;y=d[b+56>>0]|d[b+56+1>>0]<<8|d[b+56+2>>0]<<16|d[b+56+3>>0]<<24;z=d[b+56+4>>0]|d[b+56+4+1>>0]<<8|d[b+56+4+2>>0]<<16|d[b+56+4+3>>0]<<24;A=d[b+64>>0]|d[b+64+1>>0]<<8|d[b+64+2>>0]<<16|d[b+64+3>>0]<<24;C=d[b+64+4>>0]|d[b+64+4+1>>0]<<8|d[b+64+4+2>>0]<<16|d[b+64+4+3>>0]<<24;D=d[b+72>>0]|d[b+72+1>>0]<<8|d[b+72+2>>0]<<16|d[b+72+3>>0]<<24;E=d[b+72+4>>0]|d[b+72+4+1>>0]<<8|d[b+72+4+2>>0]<<16|d[b+72+4+3>>0]<<24;F=d[b+80>>0]|d[b+80+1>>0]<<8|d[b+80+2>>0]<<16|d[b+80+3>>0]<<24;G=d[b+80+4>>0]|d[b+80+4+1>>0]<<8|d[b+80+4+2>>0]<<16|d[b+80+4+3>>0]<<24;H=d[b+88>>0]|d[b+88+1>>0]<<8|d[b+88+2>>0]<<16|d[b+88+3>>0]<<24;I=d[b+88+4>>0]|d[b+88+4+1>>0]<<8|d[b+88+4+2>>0]<<16|d[b+88+4+3>>0]<<24;J=d[b+96>>0]|d[b+96+1>>0]<<8|d[b+96+2>>0]<<16|d[b+96+3>>0]<<24;K=d[b+96+4>>0]|d[b+96+4+1>>0]<<8|d[b+96+4+2>>0]<<16|d[b+96+4+3>>0]<<24;M=d[b+104>>0]|d[b+104+1>>0]<<8|d[b+104+2>>0]<<16|d[b+104+3>>0]<<24;N=d[b+104+4>>0]|d[b+104+4+1>>0]<<8|d[b+104+4+2>>0]<<16|d[b+104+4+3>>0]<<24;h=d[b+112>>0]|d[b+112+1>>0]<<8|d[b+112+2>>0]<<16|d[b+112+3>>0]<<24;j=d[b+112+4>>0]|d[b+112+4+1>>0]<<8|d[b+112+4+2>>0]<<16|d[b+112+4+3>>0]<<24;k=d[b+120>>0]|d[b+120+1>>0]<<8|d[b+120+2>>0]<<16|d[b+120+3>>0]<<24;b=d[b+120+4>>0]|d[b+120+4+1>>0]<<8|d[b+120+4+2>>0]<<16|d[b+120+4+3>>0]<<24;e=P;f=a;g=e+64|0;do{c[e>>2]=c[f>>2];e=e+4|0;f=f+4|0}while((e|0)<(g|0));c[P+80>>2]=-23791573;c[P+80+4>>2]=1013904242;c[P+88>>2]=1595750129;c[P+88+4>>2]=-1521486534;f=c[a+64>>2]^-1377402159;ha=c[a+64+4>>2]^1359893119;aa=c[a+72>>2]^725511199;W=c[a+72+4>>2]^-1694144372;e=c[a+80>>2]^-79577749;Y=c[a+80+4>>2]^528734635;ka=c[a+88>>2]^327033209;ga=c[a+88+4>>2]^1541459225;c[P+120>>2]=ka;c[P+120+4>>2]=ga;U=c[P+32>>2]|0;da=c[P+32+4>>2]|0;la=Cc(U|0,da|0,c[P>>2]|0,c[P+4>>2]|0)|0;la=Cc(la|0,B|0,o|0,x|0)|0;ja=B;Z=Cc(ha^ja|0,f^la|0,-205731576,1779033703)|0;ea=B;_=qc(U^Z|0,da^ea|0,24)|0;X=B;da=pc(U^Z|0,da^ea|0,40)|0;X=B|X;U=Cc(da|_|0,X|0,la|0,ja|0)|0;U=Cc(U|0,B|0,L|0,l|0)|0;Q=B;c[P>>2]=U;c[P+4>>2]=Q;$=qc(ha^ja^U|0,f^la^Q|0,16)|0;g=B;la=pc(ha^ja^U|0,f^la^Q|0,48)|0;g=B|g;c[P+96>>2]=la|$;c[P+96+4>>2]=g;ea=Cc(la|$|0,g|0,Z|0,ea|0)|0;Z=B;c[P+64>>2]=ea;c[P+64+4>>2]=Z;g=qc((da|_)^ea|0,X^Z|0,63)|0;$=B;Z=pc((da|_)^ea|0,X^Z|0,1)|0;c[P+32>>2]=Z|g;c[P+32+4>>2]=B|$;$=c[P+40>>2]|0;g=c[P+40+4>>2]|0;Z=Cc($|0,g|0,c[P+8>>2]|0,c[P+8+4>>2]|0)|0;Z=Cc(Z|0,B|0,m|0,n|0)|0;X=B;ea=Cc(W^X|0,aa^Z|0,-2067093701,-1150833019)|0;_=B;da=qc($^ea|0,g^_|0,24)|0;la=B;g=pc($^ea|0,g^_|0,40)|0;la=B|la;$=Cc(g|da|0,la|0,Z|0,X|0)|0;$=Cc($|0,B|0,p|0,q|0)|0;f=B;c[P+8>>2]=$;c[P+8+4>>2]=f;ja=qc(W^X^$|0,aa^Z^f|0,16)|0;ha=B;Z=pc(W^X^$|0,aa^Z^f|0,48)|0;ha=B|ha;c[P+104>>2]=Z|ja;c[P+104+4>>2]=ha;_=Cc(Z|ja|0,ha|0,ea|0,_|0)|0;ea=B;c[P+72>>2]=_;c[P+72+4>>2]=ea;ha=qc((g|da)^_|0,la^ea|0,63)|0;ja=B;ea=pc((g|da)^_|0,la^ea|0,1)|0;ja=B|ja;la=c[P+48>>2]|0;_=c[P+48+4>>2]|0;da=Cc(la|0,_|0,c[P+16>>2]|0,c[P+16+4>>2]|0)|0;da=Cc(da|0,B|0,r|0,s|0)|0;g=B;Z=Cc(Y^g|0,e^da|0,-23791573,1013904242)|0;aa=B;X=qc(la^Z|0,_^aa|0,24)|0;W=B;_=pc(la^Z|0,_^aa|0,40)|0;W=B|W;la=Cc(_|X|0,W|0,da|0,g|0)|0;la=Cc(la|0,B|0,t|0,u|0)|0;V=B;c[P+16>>2]=la;c[P+16+4>>2]=V;ia=qc(Y^g^la|0,e^da^V|0,16)|0;fa=B;da=pc(Y^g^la|0,e^da^V|0,48)|0;fa=B|fa;c[P+112>>2]=da|ia;c[P+112+4>>2]=fa;aa=Cc(da|ia|0,fa|0,Z|0,aa|0)|0;Z=B;fa=qc((_|X)^aa|0,W^Z|0,63)|0;ia=B;W=pc((_|X)^aa|0,W^Z|0,1)|0;ia=B|ia;X=c[P+56>>2]|0;_=c[P+56+4>>2]|0;da=Cc(X|0,_|0,c[P+24>>2]|0,c[P+24+4>>2]|0)|0;da=Cc(da|0,B|0,v|0,w|0)|0;e=B;g=Cc(ga^e|0,ka^da|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;Y=B;R=qc(X^g|0,_^Y|0,24)|0;ba=B;_=pc(X^g|0,_^Y|0,40)|0;ba=B|ba;X=Cc(_|R|0,ba|0,da|0,e|0)|0;X=Cc(X|0,B|0,y|0,z|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;ca=qc(ga^e^X|0,ka^da^S|0,16)|0;ma=B;da=pc(ga^e^X|0,ka^da^S|0,48)|0;ma=B|ma;Y=Cc(da|ca|0,ma|0,g|0,Y|0)|0;g=B;ka=qc((_|R)^Y|0,ba^g|0,63)|0;e=B;ba=pc((_|R)^Y|0,ba^g|0,1)|0;e=B|e;Q=Cc(ea|ha|0,ja|0,U|0,Q|0)|0;Q=Cc(Q|0,B|0,A|0,C|0)|0;U=B;Z=Cc(ma^U|0,(da|ca)^Q|0,aa|0,Z|0)|0;aa=B;R=qc((ea|ha)^Z|0,ja^aa|0,24)|0;_=B;ja=pc((ea|ha)^Z|0,ja^aa|0,40)|0;_=B|_;ha=Cc(ja|R|0,_|0,Q|0,U|0)|0;ha=Cc(ha|0,B|0,D|0,E|0)|0;ea=B;c[P>>2]=ha;c[P+4>>2]=ea;ga=qc(ma^U^ha|0,(da|ca)^Q^ea|0,16)|0;T=B;Q=pc(ma^U^ha|0,(da|ca)^Q^ea|0,48)|0;T=B|T;c[P+120>>2]=Q|ga;c[P+120+4>>2]=T;aa=Cc(Q|ga|0,T|0,Z|0,aa|0)|0;Z=B;c[P+80>>2]=aa;c[P+80+4>>2]=Z;T=qc((ja|R)^aa|0,_^Z|0,63)|0;ga=B;Z=pc((ja|R)^aa|0,_^Z|0,1)|0;c[P+40>>2]=Z|T;c[P+40+4>>2]=B|ga;f=Cc(W|fa|0,ia|0,$|0,f|0)|0;f=Cc(f|0,B|0,F|0,G|0)|0;$=B;ga=c[P+96>>2]^f;T=c[P+96+4>>2]^$;g=Cc(T|0,ga|0,Y|0,g|0)|0;Y=B;Z=qc((W|fa)^g|0,ia^Y|0,24)|0;_=B;ia=pc((W|fa)^g|0,ia^Y|0,40)|0;_=B|_;$=Cc(ia|Z|0,_|0,f|0,$|0)|0;$=Cc($|0,B|0,H|0,I|0)|0;f=B;c[P+8>>2]=$;c[P+8+4>>2]=f;fa=qc(T^$|0,ga^f|0,16)|0;W=B;ga=pc(T^$|0,ga^f|0,48)|0;W=B|W;Y=Cc(ga|fa|0,W|0,g|0,Y|0)|0;g=B;c[P+88>>2]=Y;c[P+88+4>>2]=g;T=qc((ia|Z)^Y|0,_^g|0,63)|0;aa=B;g=pc((ia|Z)^Y|0,_^g|0,1)|0;c[P+48>>2]=g|T;c[P+48+4>>2]=B|aa;V=Cc(ba|ka|0,e|0,la|0,V|0)|0;V=Cc(V|0,B|0,J|0,K|0)|0;la=B;aa=c[P+104>>2]^V;T=c[P+104+4>>2]^la;g=Cc(T|0,aa|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;_=B;Y=qc((ba|ka)^g|0,e^_|0,24)|0;Z=B;e=pc((ba|ka)^g|0,e^_|0,40)|0;Z=B|Z;la=Cc(e|Y|0,Z|0,V|0,la|0)|0;la=Cc(la|0,B|0,M|0,N|0)|0;V=B;c[P+16>>2]=la;c[P+16+4>>2]=V;ka=qc(T^la|0,aa^V|0,16)|0;ba=B;aa=pc(T^la|0,aa^V|0,48)|0;ba=B|ba;_=Cc(aa|ka|0,ba|0,g|0,_|0)|0;g=B;T=qc((e|Y)^_|0,Z^g|0,63)|0;ia=B;Z=pc((e|Y)^_|0,Z^g|0,1)|0;c[P+56>>2]=Z|T;c[P+56+4>>2]=B|ia;ia=c[P+32>>2]|0;T=c[P+32+4>>2]|0;S=Cc(ia|0,T|0,X|0,S|0)|0;S=Cc(S|0,B|0,h|0,j|0)|0;X=B;Z=c[P+112>>2]^S;Y=c[P+112+4>>2]^X;e=Cc(Y|0,Z|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;R=B;ja=qc(ia^e|0,T^R|0,24)|0;Q=B;T=pc(ia^e|0,T^R|0,40)|0;Q=B|Q;X=Cc(T|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,k|0,b|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;ia=qc(Y^X|0,Z^S|0,16)|0;ca=B;Z=pc(Y^X|0,Z^S|0,48)|0;ca=B|ca;R=Cc(Z|ia|0,ca|0,e|0,R|0)|0;e=B;Y=qc((T|ja)^R|0,Q^e|0,63)|0;da=B;Q=pc((T|ja)^R|0,Q^e|0,1)|0;da=B|da;ea=Cc(Q|Y|0,da|0,ha|0,ea|0)|0;ea=Cc(ea|0,B|0,h|0,j|0)|0;ha=B;g=Cc(W^ha|0,(ga|fa)^ea|0,_|0,g|0)|0;_=B;ja=qc((Q|Y)^g|0,da^_|0,24)|0;T=B;da=pc((Q|Y)^g|0,da^_|0,40)|0;T=B|T;Y=Cc(da|ja|0,T|0,ea|0,ha|0)|0;Y=Cc(Y|0,B|0,F|0,G|0)|0;Q=B;c[P>>2]=Y;c[P+4>>2]=Q;U=qc(W^ha^Y|0,(ga|fa)^ea^Q|0,16)|0;ma=B;ea=pc(W^ha^Y|0,(ga|fa)^ea^Q|0,48)|0;ma=B|ma;c[P+96>>2]=ea|U;c[P+96+4>>2]=ma;_=Cc(ea|U|0,ma|0,g|0,_|0)|0;g=B;c[P+64>>2]=_;c[P+64+4>>2]=g;ma=qc((da|ja)^_|0,T^g|0,63)|0;U=B;g=pc((da|ja)^_|0,T^g|0,1)|0;c[P+32>>2]=g|ma;c[P+32+4>>2]=B|U;U=c[P+40>>2]|0;ma=c[P+40+4>>2]|0;f=Cc(U|0,ma|0,$|0,f|0)|0;f=Cc(f|0,B|0,r|0,s|0)|0;$=B;e=Cc(ba^$|0,(aa|ka)^f|0,R|0,e|0)|0;R=B;g=qc(U^e|0,ma^R|0,24)|0;T=B;ma=pc(U^e|0,ma^R|0,40)|0;T=B|T;U=Cc(ma|g|0,T|0,f|0,$|0)|0;U=Cc(U|0,B|0,A|0,C|0)|0;_=B;c[P+8>>2]=U;c[P+8+4>>2]=_;ja=qc(ba^$^U|0,(aa|ka)^f^_|0,16)|0;da=B;f=pc(ba^$^U|0,(aa|ka)^f^_|0,48)|0;da=B|da;c[P+104>>2]=f|ja;c[P+104+4>>2]=da;R=Cc(f|ja|0,da|0,e|0,R|0)|0;e=B;c[P+72>>2]=R;c[P+72+4>>2]=e;da=qc((ma|g)^R|0,T^e|0,63)|0;ja=B;e=pc((ma|g)^R|0,T^e|0,1)|0;ja=B|ja;T=c[P+48>>2]|0;R=c[P+48+4>>2]|0;V=Cc(T|0,R|0,la|0,V|0)|0;V=Cc(V|0,B|0,D|0,E|0)|0;la=B;g=Cc(ca^la|0,(Z|ia)^V|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;ma=B;f=qc(T^g|0,R^ma|0,24)|0;ka=B;R=pc(T^g|0,R^ma|0,40)|0;ka=B|ka;T=Cc(R|f|0,ka|0,V|0,la|0)|0;T=Cc(T|0,B|0,k|0,b|0)|0;aa=B;c[P+16>>2]=T;c[P+16+4>>2]=aa;$=qc(ca^la^T|0,(Z|ia)^V^aa|0,16)|0;ba=B;V=pc(ca^la^T|0,(Z|ia)^V^aa|0,48)|0;ba=B|ba;c[P+112>>2]=V|$;c[P+112+4>>2]=ba;ma=Cc(V|$|0,ba|0,g|0,ma|0)|0;g=B;ba=qc((R|f)^ma|0,ka^g|0,63)|0;$=B;ka=pc((R|f)^ma|0,ka^g|0,1)|0;$=B|$;f=c[P+56>>2]|0;R=c[P+56+4>>2]|0;S=Cc(f|0,R|0,X|0,S|0)|0;S=Cc(S|0,B|0,M|0,N|0)|0;X=B;V=c[P+120>>2]^S;ia=c[P+120+4>>2]^X;Z=Cc(ia|0,V|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;la=B;ca=qc(f^Z|0,R^la|0,24)|0;ea=B;R=pc(f^Z|0,R^la|0,40)|0;ea=B|ea;X=Cc(R|ca|0,ea|0,S|0,X|0)|0;X=Cc(X|0,B|0,v|0,w|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;f=qc(ia^X|0,V^S|0,16)|0;fa=B;V=pc(ia^X|0,V^S|0,48)|0;fa=B|fa;la=Cc(V|f|0,fa|0,Z|0,la|0)|0;Z=B;ia=qc((R|ca)^la|0,ea^Z|0,63)|0;ga=B;ea=pc((R|ca)^la|0,ea^Z|0,1)|0;ga=B|ga;Q=Cc(e|da|0,ja|0,Y|0,Q|0)|0;Q=Cc(Q|0,B|0,L|0,l|0)|0;Y=B;g=Cc(fa^Y|0,(V|f)^Q|0,ma|0,g|0)|0;ma=B;ca=qc((e|da)^g|0,ja^ma|0,24)|0;R=B;ja=pc((e|da)^g|0,ja^ma|0,40)|0;R=B|R;da=Cc(ja|ca|0,R|0,Q|0,Y|0)|0;da=Cc(da|0,B|0,J|0,K|0)|0;e=B;c[P>>2]=da;c[P+4>>2]=e;ha=qc(fa^Y^da|0,(V|f)^Q^e|0,16)|0;W=B;Q=pc(fa^Y^da|0,(V|f)^Q^e|0,48)|0;W=B|W;c[P+120>>2]=Q|ha;c[P+120+4>>2]=W;ma=Cc(Q|ha|0,W|0,g|0,ma|0)|0;g=B;c[P+80>>2]=ma;c[P+80+4>>2]=g;W=qc((ja|ca)^ma|0,R^g|0,63)|0;ha=B;g=pc((ja|ca)^ma|0,R^g|0,1)|0;c[P+40>>2]=g|W;c[P+40+4>>2]=B|ha;_=Cc(ka|ba|0,$|0,U|0,_|0)|0;_=Cc(_|0,B|0,o|0,x|0)|0;U=B;ha=c[P+96>>2]^_;W=c[P+96+4>>2]^U;Z=Cc(W|0,ha|0,la|0,Z|0)|0;la=B;g=qc((ka|ba)^Z|0,$^la|0,24)|0;R=B;$=pc((ka|ba)^Z|0,$^la|0,40)|0;R=B|R;U=Cc($|g|0,R|0,_|0,U|0)|0;U=Cc(U|0,B|0,m|0,n|0)|0;_=B;c[P+8>>2]=U;c[P+8+4>>2]=_;ba=qc(W^U|0,ha^_|0,16)|0;ka=B;ha=pc(W^U|0,ha^_|0,48)|0;ka=B|ka;la=Cc(ha|ba|0,ka|0,Z|0,la|0)|0;Z=B;c[P+88>>2]=la;c[P+88+4>>2]=Z;W=qc(($|g)^la|0,R^Z|0,63)|0;ma=B;Z=pc(($|g)^la|0,R^Z|0,1)|0;c[P+48>>2]=Z|W;c[P+48+4>>2]=B|ma;aa=Cc(ea|ia|0,ga|0,T|0,aa|0)|0;aa=Cc(aa|0,B|0,H|0,I|0)|0;T=B;ma=c[P+104>>2]^aa;W=c[P+104+4>>2]^T;Z=Cc(W|0,ma|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;R=B;la=qc((ea|ia)^Z|0,ga^R|0,24)|0;g=B;ga=pc((ea|ia)^Z|0,ga^R|0,40)|0;g=B|g;T=Cc(ga|la|0,g|0,aa|0,T|0)|0;T=Cc(T|0,B|0,y|0,z|0)|0;aa=B;c[P+16>>2]=T;c[P+16+4>>2]=aa;ia=qc(W^T|0,ma^aa|0,16)|0;ea=B;ma=pc(W^T|0,ma^aa|0,48)|0;ea=B|ea;R=Cc(ma|ia|0,ea|0,Z|0,R|0)|0;Z=B;W=qc((ga|la)^R|0,g^Z|0,63)|0;$=B;g=pc((ga|la)^R|0,g^Z|0,1)|0;c[P+56>>2]=g|W;c[P+56+4>>2]=B|$;$=c[P+32>>2]|0;W=c[P+32+4>>2]|0;S=Cc($|0,W|0,X|0,S|0)|0;S=Cc(S|0,B|0,t|0,u|0)|0;X=B;g=c[P+112>>2]^S;la=c[P+112+4>>2]^X;ga=Cc(la|0,g|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;ca=B;ja=qc($^ga|0,W^ca|0,24)|0;Q=B;W=pc($^ga|0,W^ca|0,40)|0;Q=B|Q;X=Cc(W|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,p|0,q|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;$=qc(la^X|0,g^S|0,16)|0;f=B;g=pc(la^X|0,g^S|0,48)|0;f=B|f;ca=Cc(g|$|0,f|0,ga|0,ca|0)|0;ga=B;la=qc((W|ja)^ca|0,Q^ga|0,63)|0;V=B;Q=pc((W|ja)^ca|0,Q^ga|0,1)|0;V=B|V;e=Cc(Q|la|0,V|0,da|0,e|0)|0;e=Cc(e|0,B|0,H|0,I|0)|0;da=B;Z=Cc(ka^da|0,(ha|ba)^e|0,R|0,Z|0)|0;R=B;ja=qc((Q|la)^Z|0,V^R|0,24)|0;W=B;V=pc((Q|la)^Z|0,V^R|0,40)|0;W=B|W;la=Cc(V|ja|0,W|0,e|0,da|0)|0;la=Cc(la|0,B|0,A|0,C|0)|0;Q=B;c[P>>2]=la;c[P+4>>2]=Q;Y=qc(ka^da^la|0,(ha|ba)^e^Q|0,16)|0;fa=B;e=pc(ka^da^la|0,(ha|ba)^e^Q|0,48)|0;fa=B|fa;c[P+96>>2]=e|Y;c[P+96+4>>2]=fa;R=Cc(e|Y|0,fa|0,Z|0,R|0)|0;Z=B;c[P+64>>2]=R;c[P+64+4>>2]=Z;fa=qc((V|ja)^R|0,W^Z|0,63)|0;Y=B;Z=pc((V|ja)^R|0,W^Z|0,1)|0;c[P+32>>2]=Z|fa;c[P+32+4>>2]=B|Y;Y=c[P+40>>2]|0;fa=c[P+40+4>>2]|0;_=Cc(Y|0,fa|0,U|0,_|0)|0;_=Cc(_|0,B|0,J|0,K|0)|0;U=B;ga=Cc(ea^U|0,(ma|ia)^_|0,ca|0,ga|0)|0;ca=B;Z=qc(Y^ga|0,fa^ca|0,24)|0;W=B;fa=pc(Y^ga|0,fa^ca|0,40)|0;W=B|W;Y=Cc(fa|Z|0,W|0,_|0,U|0)|0;Y=Cc(Y|0,B|0,o|0,x|0)|0;R=B;c[P+8>>2]=Y;c[P+8+4>>2]=R;ja=qc(ea^U^Y|0,(ma|ia)^_^R|0,16)|0;V=B;_=pc(ea^U^Y|0,(ma|ia)^_^R|0,48)|0;V=B|V;c[P+104>>2]=_|ja;c[P+104+4>>2]=V;ca=Cc(_|ja|0,V|0,ga|0,ca|0)|0;ga=B;c[P+72>>2]=ca;c[P+72+4>>2]=ga;V=qc((fa|Z)^ca|0,W^ga|0,63)|0;ja=B;ga=pc((fa|Z)^ca|0,W^ga|0,1)|0;ja=B|ja;W=c[P+48>>2]|0;ca=c[P+48+4>>2]|0;aa=Cc(W|0,ca|0,T|0,aa|0)|0;aa=Cc(aa|0,B|0,t|0,u|0)|0;T=B;Z=Cc(f^T|0,(g|$)^aa|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;fa=B;_=qc(W^Z|0,ca^fa|0,24)|0;ia=B;ca=pc(W^Z|0,ca^fa|0,40)|0;ia=B|ia;W=Cc(ca|_|0,ia|0,aa|0,T|0)|0;W=Cc(W|0,B|0,m|0,n|0)|0;ma=B;c[P+16>>2]=W;c[P+16+4>>2]=ma;U=qc(f^T^W|0,(g|$)^aa^ma|0,16)|0;ea=B;aa=pc(f^T^W|0,(g|$)^aa^ma|0,48)|0;ea=B|ea;c[P+112>>2]=aa|U;c[P+112+4>>2]=ea;fa=Cc(aa|U|0,ea|0,Z|0,fa|0)|0;Z=B;ea=qc((ca|_)^fa|0,ia^Z|0,63)|0;U=B;ia=pc((ca|_)^fa|0,ia^Z|0,1)|0;U=B|U;_=c[P+56>>2]|0;ca=c[P+56+4>>2]|0;S=Cc(_|0,ca|0,X|0,S|0)|0;S=Cc(S|0,B|0,k|0,b|0)|0;X=B;aa=c[P+120>>2]^S;$=c[P+120+4>>2]^X;g=Cc($|0,aa|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;T=B;f=qc(_^g|0,ca^T|0,24)|0;e=B;ca=pc(_^g|0,ca^T|0,40)|0;e=B|e;X=Cc(ca|f|0,e|0,S|0,X|0)|0;X=Cc(X|0,B|0,M|0,N|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;_=qc($^X|0,aa^S|0,16)|0;ba=B;aa=pc($^X|0,aa^S|0,48)|0;ba=B|ba;T=Cc(aa|_|0,ba|0,g|0,T|0)|0;g=B;$=qc((ca|f)^T|0,e^g|0,63)|0;ha=B;e=pc((ca|f)^T|0,e^g|0,1)|0;ha=B|ha;Q=Cc(ga|V|0,ja|0,la|0,Q|0)|0;Q=Cc(Q|0,B|0,F|0,G|0)|0;la=B;Z=Cc(ba^la|0,(aa|_)^Q|0,fa|0,Z|0)|0;fa=B;f=qc((ga|V)^Z|0,ja^fa|0,24)|0;ca=B;ja=pc((ga|V)^Z|0,ja^fa|0,40)|0;ca=B|ca;V=Cc(ja|f|0,ca|0,Q|0,la|0)|0;V=Cc(V|0,B|0,h|0,j|0)|0;ga=B;c[P>>2]=V;c[P+4>>2]=ga;da=qc(ba^la^V|0,(aa|_)^Q^ga|0,16)|0;ka=B;Q=pc(ba^la^V|0,(aa|_)^Q^ga|0,48)|0;ka=B|ka;c[P+120>>2]=Q|da;c[P+120+4>>2]=ka;fa=Cc(Q|da|0,ka|0,Z|0,fa|0)|0;Z=B;c[P+80>>2]=fa;c[P+80+4>>2]=Z;ka=qc((ja|f)^fa|0,ca^Z|0,63)|0;da=B;Z=pc((ja|f)^fa|0,ca^Z|0,1)|0;c[P+40>>2]=Z|ka;c[P+40+4>>2]=B|da;R=Cc(ia|ea|0,U|0,Y|0,R|0)|0;R=Cc(R|0,B|0,p|0,q|0)|0;Y=B;da=c[P+96>>2]^R;ka=c[P+96+4>>2]^Y;g=Cc(ka|0,da|0,T|0,g|0)|0;T=B;Z=qc((ia|ea)^g|0,U^T|0,24)|0;ca=B;U=pc((ia|ea)^g|0,U^T|0,40)|0;ca=B|ca;Y=Cc(U|Z|0,ca|0,R|0,Y|0)|0;Y=Cc(Y|0,B|0,v|0,w|0)|0;R=B;c[P+8>>2]=Y;c[P+8+4>>2]=R;ea=qc(ka^Y|0,da^R|0,16)|0;ia=B;da=pc(ka^Y|0,da^R|0,48)|0;ia=B|ia;T=Cc(da|ea|0,ia|0,g|0,T|0)|0;g=B;c[P+88>>2]=T;c[P+88+4>>2]=g;ka=qc((U|Z)^T|0,ca^g|0,63)|0;fa=B;g=pc((U|Z)^T|0,ca^g|0,1)|0;c[P+48>>2]=g|ka;c[P+48+4>>2]=B|fa;ma=Cc(e|$|0,ha|0,W|0,ma|0)|0;ma=Cc(ma|0,B|0,y|0,z|0)|0;W=B;fa=c[P+104>>2]^ma;ka=c[P+104+4>>2]^W;g=Cc(ka|0,fa|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;ca=B;T=qc((e|$)^g|0,ha^ca|0,24)|0;Z=B;ha=pc((e|$)^g|0,ha^ca|0,40)|0;Z=B|Z;W=Cc(ha|T|0,Z|0,ma|0,W|0)|0;W=Cc(W|0,B|0,L|0,l|0)|0;ma=B;c[P+16>>2]=W;c[P+16+4>>2]=ma;$=qc(ka^W|0,fa^ma|0,16)|0;e=B;fa=pc(ka^W|0,fa^ma|0,48)|0;e=B|e;ca=Cc(fa|$|0,e|0,g|0,ca|0)|0;g=B;ka=qc((ha|T)^ca|0,Z^g|0,63)|0;U=B;Z=pc((ha|T)^ca|0,Z^g|0,1)|0;c[P+56>>2]=Z|ka;c[P+56+4>>2]=B|U;U=c[P+32>>2]|0;ka=c[P+32+4>>2]|0;S=Cc(U|0,ka|0,X|0,S|0)|0;S=Cc(S|0,B|0,D|0,E|0)|0;X=B;Z=c[P+112>>2]^S;T=c[P+112+4>>2]^X;ha=Cc(T|0,Z|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;f=B;ja=qc(U^ha|0,ka^f|0,24)|0;Q=B;ka=pc(U^ha|0,ka^f|0,40)|0;Q=B|Q;X=Cc(ka|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,r|0,s|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;U=qc(T^X|0,Z^S|0,16)|0;_=B;Z=pc(T^X|0,Z^S|0,48)|0;_=B|_;f=Cc(Z|U|0,_|0,ha|0,f|0)|0;ha=B;T=qc((ka|ja)^f|0,Q^ha|0,63)|0;aa=B;Q=pc((ka|ja)^f|0,Q^ha|0,1)|0;aa=B|aa;ga=Cc(Q|T|0,aa|0,V|0,ga|0)|0;ga=Cc(ga|0,B|0,y|0,z|0)|0;V=B;g=Cc(ia^V|0,(da|ea)^ga|0,ca|0,g|0)|0;ca=B;ja=qc((Q|T)^g|0,aa^ca|0,24)|0;ka=B;aa=pc((Q|T)^g|0,aa^ca|0,40)|0;ka=B|ka;T=Cc(aa|ja|0,ka|0,ga|0,V|0)|0;T=Cc(T|0,B|0,D|0,E|0)|0;Q=B;c[P>>2]=T;c[P+4>>2]=Q;la=qc(ia^V^T|0,(da|ea)^ga^Q|0,16)|0;ba=B;ga=pc(ia^V^T|0,(da|ea)^ga^Q|0,48)|0;ba=B|ba;c[P+96>>2]=ga|la;c[P+96+4>>2]=ba;ca=Cc(ga|la|0,ba|0,g|0,ca|0)|0;g=B;c[P+64>>2]=ca;c[P+64+4>>2]=g;ba=qc((aa|ja)^ca|0,ka^g|0,63)|0;la=B;g=pc((aa|ja)^ca|0,ka^g|0,1)|0;c[P+32>>2]=g|ba;c[P+32+4>>2]=B|la;la=c[P+40>>2]|0;ba=c[P+40+4>>2]|0;R=Cc(la|0,ba|0,Y|0,R|0)|0;R=Cc(R|0,B|0,p|0,q|0)|0;Y=B;ha=Cc(e^Y|0,(fa|$)^R|0,f|0,ha|0)|0;f=B;g=qc(la^ha|0,ba^f|0,24)|0;ka=B;ba=pc(la^ha|0,ba^f|0,40)|0;ka=B|ka;la=Cc(ba|g|0,ka|0,R|0,Y|0)|0;la=Cc(la|0,B|0,L|0,l|0)|0;ca=B;c[P+8>>2]=la;c[P+8+4>>2]=ca;ja=qc(e^Y^la|0,(fa|$)^R^ca|0,16)|0;aa=B;R=pc(e^Y^la|0,(fa|$)^R^ca|0,48)|0;aa=B|aa;c[P+104>>2]=R|ja;c[P+104+4>>2]=aa;f=Cc(R|ja|0,aa|0,ha|0,f|0)|0;ha=B;c[P+72>>2]=f;c[P+72+4>>2]=ha;aa=qc((ba|g)^f|0,ka^ha|0,63)|0;ja=B;ha=pc((ba|g)^f|0,ka^ha|0,1)|0;ja=B|ja;ka=c[P+48>>2]|0;f=c[P+48+4>>2]|0;ma=Cc(ka|0,f|0,W|0,ma|0)|0;ma=Cc(ma|0,B|0,M|0,N|0)|0;W=B;g=Cc(_^W|0,(Z|U)^ma|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;ba=B;R=qc(ka^g|0,f^ba|0,24)|0;$=B;f=pc(ka^g|0,f^ba|0,40)|0;$=B|$;ka=Cc(f|R|0,$|0,ma|0,W|0)|0;ka=Cc(ka|0,B|0,J|0,K|0)|0;fa=B;c[P+16>>2]=ka;c[P+16+4>>2]=fa;Y=qc(_^W^ka|0,(Z|U)^ma^fa|0,16)|0;e=B;ma=pc(_^W^ka|0,(Z|U)^ma^fa|0,48)|0;e=B|e;c[P+112>>2]=ma|Y;c[P+112+4>>2]=e;ba=Cc(ma|Y|0,e|0,g|0,ba|0)|0;g=B;e=qc((f|R)^ba|0,$^g|0,63)|0;Y=B;$=pc((f|R)^ba|0,$^g|0,1)|0;Y=B|Y;R=c[P+56>>2]|0;f=c[P+56+4>>2]|0;S=Cc(R|0,f|0,X|0,S|0)|0;S=Cc(S|0,B|0,H|0,I|0)|0;X=B;ma=c[P+120>>2]^S;U=c[P+120+4>>2]^X;Z=Cc(U|0,ma|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;W=B;_=qc(R^Z|0,f^W|0,24)|0;ga=B;f=pc(R^Z|0,f^W|0,40)|0;ga=B|ga;X=Cc(f|_|0,ga|0,S|0,X|0)|0;X=Cc(X|0,B|0,h|0,j|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;R=qc(U^X|0,ma^S|0,16)|0;ea=B;ma=pc(U^X|0,ma^S|0,48)|0;ea=B|ea;W=Cc(ma|R|0,ea|0,Z|0,W|0)|0;Z=B;U=qc((f|_)^W|0,ga^Z|0,63)|0;da=B;ga=pc((f|_)^W|0,ga^Z|0,1)|0;da=B|da;Q=Cc(ha|aa|0,ja|0,T|0,Q|0)|0;Q=Cc(Q|0,B|0,m|0,n|0)|0;T=B;g=Cc(ea^T|0,(ma|R)^Q|0,ba|0,g|0)|0;ba=B;_=qc((ha|aa)^g|0,ja^ba|0,24)|0;f=B;ja=pc((ha|aa)^g|0,ja^ba|0,40)|0;f=B|f;aa=Cc(ja|_|0,f|0,Q|0,T|0)|0;aa=Cc(aa|0,B|0,v|0,w|0)|0;ha=B;c[P>>2]=aa;c[P+4>>2]=ha;V=qc(ea^T^aa|0,(ma|R)^Q^ha|0,16)|0;ia=B;Q=pc(ea^T^aa|0,(ma|R)^Q^ha|0,48)|0;ia=B|ia;c[P+120>>2]=Q|V;c[P+120+4>>2]=ia;ba=Cc(Q|V|0,ia|0,g|0,ba|0)|0;g=B;c[P+80>>2]=ba;c[P+80+4>>2]=g;ia=qc((ja|_)^ba|0,f^g|0,63)|0;V=B;g=pc((ja|_)^ba|0,f^g|0,1)|0;c[P+40>>2]=g|ia;c[P+40+4>>2]=B|V;ca=Cc($|e|0,Y|0,la|0,ca|0)|0;ca=Cc(ca|0,B|0,t|0,u|0)|0;la=B;V=c[P+96>>2]^ca;ia=c[P+96+4>>2]^la;Z=Cc(ia|0,V|0,W|0,Z|0)|0;W=B;g=qc(($|e)^Z|0,Y^W|0,24)|0;f=B;Y=pc(($|e)^Z|0,Y^W|0,40)|0;f=B|f;la=Cc(Y|g|0,f|0,ca|0,la|0)|0;la=Cc(la|0,B|0,F|0,G|0)|0;ca=B;c[P+8>>2]=la;c[P+8+4>>2]=ca;e=qc(ia^la|0,V^ca|0,16)|0;$=B;V=pc(ia^la|0,V^ca|0,48)|0;$=B|$;W=Cc(V|e|0,$|0,Z|0,W|0)|0;Z=B;c[P+88>>2]=W;c[P+88+4>>2]=Z;ia=qc((Y|g)^W|0,f^Z|0,63)|0;ba=B;Z=pc((Y|g)^W|0,f^Z|0,1)|0;c[P+48>>2]=Z|ia;c[P+48+4>>2]=B|ba;fa=Cc(ga|U|0,da|0,ka|0,fa|0)|0;fa=Cc(fa|0,B|0,r|0,s|0)|0;ka=B;ba=c[P+104>>2]^fa;ia=c[P+104+4>>2]^ka;Z=Cc(ia|0,ba|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;f=B;W=qc((ga|U)^Z|0,da^f|0,24)|0;g=B;da=pc((ga|U)^Z|0,da^f|0,40)|0;g=B|g;ka=Cc(da|W|0,g|0,fa|0,ka|0)|0;ka=Cc(ka|0,B|0,o|0,x|0)|0;fa=B;c[P+16>>2]=ka;c[P+16+4>>2]=fa;U=qc(ia^ka|0,ba^fa|0,16)|0;ga=B;ba=pc(ia^ka|0,ba^fa|0,48)|0;ga=B|ga;f=Cc(ba|U|0,ga|0,Z|0,f|0)|0;Z=B;ia=qc((da|W)^f|0,g^Z|0,63)|0;Y=B;g=pc((da|W)^f|0,g^Z|0,1)|0;c[P+56>>2]=g|ia;c[P+56+4>>2]=B|Y;Y=c[P+32>>2]|0;ia=c[P+32+4>>2]|0;S=Cc(Y|0,ia|0,X|0,S|0)|0;S=Cc(S|0,B|0,k|0,b|0)|0;X=B;g=c[P+112>>2]^S;W=c[P+112+4>>2]^X;da=Cc(W|0,g|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;_=B;ja=qc(Y^da|0,ia^_|0,24)|0;Q=B;ia=pc(Y^da|0,ia^_|0,40)|0;Q=B|Q;X=Cc(ia|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,A|0,C|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;Y=qc(W^X|0,g^S|0,16)|0;R=B;g=pc(W^X|0,g^S|0,48)|0;R=B|R;_=Cc(g|Y|0,R|0,da|0,_|0)|0;da=B;W=qc((ia|ja)^_|0,Q^da|0,63)|0;ma=B;Q=pc((ia|ja)^_|0,Q^da|0,1)|0;ma=B|ma;ha=Cc(Q|W|0,ma|0,aa|0,ha|0)|0;ha=Cc(ha|0,B|0,D|0,E|0)|0;aa=B;Z=Cc($^aa|0,(V|e)^ha|0,f|0,Z|0)|0;f=B;ja=qc((Q|W)^Z|0,ma^f|0,24)|0;ia=B;ma=pc((Q|W)^Z|0,ma^f|0,40)|0;ia=B|ia;W=Cc(ma|ja|0,ia|0,ha|0,aa|0)|0;W=Cc(W|0,B|0,o|0,x|0)|0;Q=B;c[P>>2]=W;c[P+4>>2]=Q;T=qc($^aa^W|0,(V|e)^ha^Q|0,16)|0;ea=B;ha=pc($^aa^W|0,(V|e)^ha^Q|0,48)|0;ea=B|ea;c[P+96>>2]=ha|T;c[P+96+4>>2]=ea;f=Cc(ha|T|0,ea|0,Z|0,f|0)|0;Z=B;c[P+64>>2]=f;c[P+64+4>>2]=Z;ea=qc((ma|ja)^f|0,ia^Z|0,63)|0;T=B;Z=pc((ma|ja)^f|0,ia^Z|0,1)|0;c[P+32>>2]=Z|ea;c[P+32+4>>2]=B|T;T=c[P+40>>2]|0;ea=c[P+40+4>>2]|0;ca=Cc(T|0,ea|0,la|0,ca|0)|0;ca=Cc(ca|0,B|0,t|0,u|0)|0;la=B;da=Cc(ga^la|0,(ba|U)^ca|0,_|0,da|0)|0;_=B;Z=qc(T^da|0,ea^_|0,24)|0;ia=B;ea=pc(T^da|0,ea^_|0,40)|0;ia=B|ia;T=Cc(ea|Z|0,ia|0,ca|0,la|0)|0;T=Cc(T|0,B|0,y|0,z|0)|0;f=B;c[P+8>>2]=T;c[P+8+4>>2]=f;ja=qc(ga^la^T|0,(ba|U)^ca^f|0,16)|0;ma=B;ca=pc(ga^la^T|0,(ba|U)^ca^f|0,48)|0;ma=B|ma;c[P+104>>2]=ca|ja;c[P+104+4>>2]=ma;_=Cc(ca|ja|0,ma|0,da|0,_|0)|0;da=B;c[P+72>>2]=_;c[P+72+4>>2]=da;ma=qc((ea|Z)^_|0,ia^da|0,63)|0;ja=B;da=pc((ea|Z)^_|0,ia^da|0,1)|0;ja=B|ja;ia=c[P+48>>2]|0;_=c[P+48+4>>2]|0;fa=Cc(ia|0,_|0,ka|0,fa|0)|0;fa=Cc(fa|0,B|0,m|0,n|0)|0;ka=B;Z=Cc(R^ka|0,(g|Y)^fa|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;ea=B;ca=qc(ia^Z|0,_^ea|0,24)|0;U=B;_=pc(ia^Z|0,_^ea|0,40)|0;U=B|U;ia=Cc(_|ca|0,U|0,fa|0,ka|0)|0;ia=Cc(ia|0,B|0,r|0,s|0)|0;ba=B;c[P+16>>2]=ia;c[P+16+4>>2]=ba;la=qc(R^ka^ia|0,(g|Y)^fa^ba|0,16)|0;ga=B;fa=pc(R^ka^ia|0,(g|Y)^fa^ba|0,48)|0;ga=B|ga;c[P+112>>2]=fa|la;c[P+112+4>>2]=ga;ea=Cc(fa|la|0,ga|0,Z|0,ea|0)|0;Z=B;ga=qc((_|ca)^ea|0,U^Z|0,63)|0;la=B;U=pc((_|ca)^ea|0,U^Z|0,1)|0;la=B|la;ca=c[P+56>>2]|0;_=c[P+56+4>>2]|0;S=Cc(ca|0,_|0,X|0,S|0)|0;S=Cc(S|0,B|0,F|0,G|0)|0;X=B;fa=c[P+120>>2]^S;Y=c[P+120+4>>2]^X;g=Cc(Y|0,fa|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;ka=B;R=qc(ca^g|0,_^ka|0,24)|0;ha=B;_=pc(ca^g|0,_^ka|0,40)|0;ha=B|ha;X=Cc(_|R|0,ha|0,S|0,X|0)|0;X=Cc(X|0,B|0,k|0,b|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;ca=qc(Y^X|0,fa^S|0,16)|0;e=B;fa=pc(Y^X|0,fa^S|0,48)|0;e=B|e;ka=Cc(fa|ca|0,e|0,g|0,ka|0)|0;g=B;Y=qc((_|R)^ka|0,ha^g|0,63)|0;V=B;ha=pc((_|R)^ka|0,ha^g|0,1)|0;V=B|V;Q=Cc(da|ma|0,ja|0,W|0,Q|0)|0;Q=Cc(Q|0,B|0,h|0,j|0)|0;W=B;Z=Cc(e^W|0,(fa|ca)^Q|0,ea|0,Z|0)|0;ea=B;R=qc((da|ma)^Z|0,ja^ea|0,24)|0;_=B;ja=pc((da|ma)^Z|0,ja^ea|0,40)|0;_=B|_;ma=Cc(ja|R|0,_|0,Q|0,W|0)|0;ma=Cc(ma|0,B|0,L|0,l|0)|0;da=B;c[P>>2]=ma;c[P+4>>2]=da;aa=qc(e^W^ma|0,(fa|ca)^Q^da|0,16)|0;$=B;Q=pc(e^W^ma|0,(fa|ca)^Q^da|0,48)|0;$=B|$;c[P+120>>2]=Q|aa;c[P+120+4>>2]=$;ea=Cc(Q|aa|0,$|0,Z|0,ea|0)|0;Z=B;c[P+80>>2]=ea;c[P+80+4>>2]=Z;$=qc((ja|R)^ea|0,_^Z|0,63)|0;aa=B;Z=pc((ja|R)^ea|0,_^Z|0,1)|0;c[P+40>>2]=Z|$;c[P+40+4>>2]=B|aa;f=Cc(U|ga|0,la|0,T|0,f|0)|0;f=Cc(f|0,B|0,H|0,I|0)|0;T=B;aa=c[P+96>>2]^f;$=c[P+96+4>>2]^T;g=Cc($|0,aa|0,ka|0,g|0)|0;ka=B;Z=qc((U|ga)^g|0,la^ka|0,24)|0;_=B;la=pc((U|ga)^g|0,la^ka|0,40)|0;_=B|_;T=Cc(la|Z|0,_|0,f|0,T|0)|0;T=Cc(T|0,B|0,J|0,K|0)|0;f=B;c[P+8>>2]=T;c[P+8+4>>2]=f;ga=qc($^T|0,aa^f|0,16)|0;U=B;aa=pc($^T|0,aa^f|0,48)|0;U=B|U;ka=Cc(aa|ga|0,U|0,g|0,ka|0)|0;g=B;c[P+88>>2]=ka;c[P+88+4>>2]=g;$=qc((la|Z)^ka|0,_^g|0,63)|0;ea=B;g=pc((la|Z)^ka|0,_^g|0,1)|0;c[P+48>>2]=g|$;c[P+48+4>>2]=B|ea;ba=Cc(ha|Y|0,V|0,ia|0,ba|0)|0;ba=Cc(ba|0,B|0,v|0,w|0)|0;ia=B;ea=c[P+104>>2]^ba;$=c[P+104+4>>2]^ia;g=Cc($|0,ea|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;_=B;ka=qc((ha|Y)^g|0,V^_|0,24)|0;Z=B;V=pc((ha|Y)^g|0,V^_|0,40)|0;Z=B|Z;ia=Cc(V|ka|0,Z|0,ba|0,ia|0)|0;ia=Cc(ia|0,B|0,A|0,C|0)|0;ba=B;c[P+16>>2]=ia;c[P+16+4>>2]=ba;Y=qc($^ia|0,ea^ba|0,16)|0;ha=B;ea=pc($^ia|0,ea^ba|0,48)|0;ha=B|ha;_=Cc(ea|Y|0,ha|0,g|0,_|0)|0;g=B;$=qc((V|ka)^_|0,Z^g|0,63)|0;la=B;Z=pc((V|ka)^_|0,Z^g|0,1)|0;c[P+56>>2]=Z|$;c[P+56+4>>2]=B|la;la=c[P+32>>2]|0;$=c[P+32+4>>2]|0;S=Cc(la|0,$|0,X|0,S|0)|0;S=Cc(S|0,B|0,p|0,q|0)|0;X=B;Z=c[P+112>>2]^S;ka=c[P+112+4>>2]^X;V=Cc(ka|0,Z|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;R=B;ja=qc(la^V|0,$^R|0,24)|0;Q=B;$=pc(la^V|0,$^R|0,40)|0;Q=B|Q;X=Cc($|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,M|0,N|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;la=qc(ka^X|0,Z^S|0,16)|0;ca=B;Z=pc(ka^X|0,Z^S|0,48)|0;ca=B|ca;R=Cc(Z|la|0,ca|0,V|0,R|0)|0;V=B;ka=qc(($|ja)^R|0,Q^V|0,63)|0;fa=B;Q=pc(($|ja)^R|0,Q^V|0,1)|0;fa=B|fa;da=Cc(Q|ka|0,fa|0,ma|0,da|0)|0;da=Cc(da|0,B|0,m|0,n|0)|0;ma=B;g=Cc(U^ma|0,(aa|ga)^da|0,_|0,g|0)|0;_=B;ja=qc((Q|ka)^g|0,fa^_|0,24)|0;$=B;fa=pc((Q|ka)^g|0,fa^_|0,40)|0;$=B|$;ka=Cc(fa|ja|0,$|0,da|0,ma|0)|0;ka=Cc(ka|0,B|0,J|0,K|0)|0;Q=B;c[P>>2]=ka;c[P+4>>2]=Q;W=qc(U^ma^ka|0,(aa|ga)^da^Q|0,16)|0;e=B;da=pc(U^ma^ka|0,(aa|ga)^da^Q|0,48)|0;e=B|e;c[P+96>>2]=da|W;c[P+96+4>>2]=e;_=Cc(da|W|0,e|0,g|0,_|0)|0;g=B;c[P+64>>2]=_;c[P+64+4>>2]=g;e=qc((fa|ja)^_|0,$^g|0,63)|0;W=B;g=pc((fa|ja)^_|0,$^g|0,1)|0;c[P+32>>2]=g|e;c[P+32+4>>2]=B|W;W=c[P+40>>2]|0;e=c[P+40+4>>2]|0;f=Cc(W|0,e|0,T|0,f|0)|0;f=Cc(f|0,B|0,v|0,w|0)|0;T=B;V=Cc(ha^T|0,(ea|Y)^f|0,R|0,V|0)|0;R=B;g=qc(W^V|0,e^R|0,24)|0;$=B;e=pc(W^V|0,e^R|0,40)|0;$=B|$;W=Cc(e|g|0,$|0,f|0,T|0)|0;W=Cc(W|0,B|0,F|0,G|0)|0;_=B;c[P+8>>2]=W;c[P+8+4>>2]=_;ja=qc(ha^T^W|0,(ea|Y)^f^_|0,16)|0;fa=B;f=pc(ha^T^W|0,(ea|Y)^f^_|0,48)|0;fa=B|fa;c[P+104>>2]=f|ja;c[P+104+4>>2]=fa;R=Cc(f|ja|0,fa|0,V|0,R|0)|0;V=B;c[P+72>>2]=R;c[P+72+4>>2]=V;fa=qc((e|g)^R|0,$^V|0,63)|0;ja=B;V=pc((e|g)^R|0,$^V|0,1)|0;ja=B|ja;$=c[P+48>>2]|0;R=c[P+48+4>>2]|0;ba=Cc($|0,R|0,ia|0,ba|0)|0;ba=Cc(ba|0,B|0,o|0,x|0)|0;ia=B;g=Cc(ca^ia|0,(Z|la)^ba|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;e=B;f=qc($^g|0,R^e|0,24)|0;Y=B;R=pc($^g|0,R^e|0,40)|0;Y=B|Y;$=Cc(R|f|0,Y|0,ba|0,ia|0)|0;$=Cc($|0,B|0,H|0,I|0)|0;ea=B;c[P+16>>2]=$;c[P+16+4>>2]=ea;T=qc(ca^ia^$|0,(Z|la)^ba^ea|0,16)|0;ha=B;ba=pc(ca^ia^$|0,(Z|la)^ba^ea|0,48)|0;ha=B|ha;c[P+112>>2]=ba|T;c[P+112+4>>2]=ha;e=Cc(ba|T|0,ha|0,g|0,e|0)|0;g=B;ha=qc((R|f)^e|0,Y^g|0,63)|0;T=B;Y=pc((R|f)^e|0,Y^g|0,1)|0;T=B|T;f=c[P+56>>2]|0;R=c[P+56+4>>2]|0;S=Cc(f|0,R|0,X|0,S|0)|0;S=Cc(S|0,B|0,A|0,C|0)|0;X=B;ba=c[P+120>>2]^S;la=c[P+120+4>>2]^X;Z=Cc(la|0,ba|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;ia=B;ca=qc(f^Z|0,R^ia|0,24)|0;da=B;R=pc(f^Z|0,R^ia|0,40)|0;da=B|da;X=Cc(R|ca|0,da|0,S|0,X|0)|0;X=Cc(X|0,B|0,p|0,q|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;f=qc(la^X|0,ba^S|0,16)|0;ga=B;ba=pc(la^X|0,ba^S|0,48)|0;ga=B|ga;ia=Cc(ba|f|0,ga|0,Z|0,ia|0)|0;Z=B;la=qc((R|ca)^ia|0,da^Z|0,63)|0;aa=B;da=pc((R|ca)^ia|0,da^Z|0,1)|0;aa=B|aa;Q=Cc(V|fa|0,ja|0,ka|0,Q|0)|0;Q=Cc(Q|0,B|0,r|0,s|0)|0;ka=B;g=Cc(ga^ka|0,(ba|f)^Q|0,e|0,g|0)|0;e=B;ca=qc((V|fa)^g|0,ja^e|0,24)|0;R=B;ja=pc((V|fa)^g|0,ja^e|0,40)|0;R=B|R;fa=Cc(ja|ca|0,R|0,Q|0,ka|0)|0;fa=Cc(fa|0,B|0,M|0,N|0)|0;V=B;c[P>>2]=fa;c[P+4>>2]=V;ma=qc(ga^ka^fa|0,(ba|f)^Q^V|0,16)|0;U=B;Q=pc(ga^ka^fa|0,(ba|f)^Q^V|0,48)|0;U=B|U;c[P+120>>2]=Q|ma;c[P+120+4>>2]=U;e=Cc(Q|ma|0,U|0,g|0,e|0)|0;g=B;c[P+80>>2]=e;c[P+80+4>>2]=g;U=qc((ja|ca)^e|0,R^g|0,63)|0;ma=B;g=pc((ja|ca)^e|0,R^g|0,1)|0;c[P+40>>2]=g|U;c[P+40+4>>2]=B|ma;_=Cc(Y|ha|0,T|0,W|0,_|0)|0;_=Cc(_|0,B|0,y|0,z|0)|0;W=B;ma=c[P+96>>2]^_;U=c[P+96+4>>2]^W;Z=Cc(U|0,ma|0,ia|0,Z|0)|0;ia=B;g=qc((Y|ha)^Z|0,T^ia|0,24)|0;R=B;T=pc((Y|ha)^Z|0,T^ia|0,40)|0;R=B|R;W=Cc(T|g|0,R|0,_|0,W|0)|0;W=Cc(W|0,B|0,t|0,u|0)|0;_=B;c[P+8>>2]=W;c[P+8+4>>2]=_;ha=qc(U^W|0,ma^_|0,16)|0;Y=B;ma=pc(U^W|0,ma^_|0,48)|0;Y=B|Y;ia=Cc(ma|ha|0,Y|0,Z|0,ia|0)|0;Z=B;c[P+88>>2]=ia;c[P+88+4>>2]=Z;U=qc((T|g)^ia|0,R^Z|0,63)|0;e=B;Z=pc((T|g)^ia|0,R^Z|0,1)|0;c[P+48>>2]=Z|U;c[P+48+4>>2]=B|e;ea=Cc(da|la|0,aa|0,$|0,ea|0)|0;ea=Cc(ea|0,B|0,k|0,b|0)|0;$=B;e=c[P+104>>2]^ea;U=c[P+104+4>>2]^$;Z=Cc(U|0,e|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;R=B;ia=qc((da|la)^Z|0,aa^R|0,24)|0;g=B;aa=pc((da|la)^Z|0,aa^R|0,40)|0;g=B|g;$=Cc(aa|ia|0,g|0,ea|0,$|0)|0;$=Cc($|0,B|0,h|0,j|0)|0;ea=B;c[P+16>>2]=$;c[P+16+4>>2]=ea;la=qc(U^$|0,e^ea|0,16)|0;da=B;e=pc(U^$|0,e^ea|0,48)|0;da=B|da;R=Cc(e|la|0,da|0,Z|0,R|0)|0;Z=B;U=qc((aa|ia)^R|0,g^Z|0,63)|0;T=B;g=pc((aa|ia)^R|0,g^Z|0,1)|0;c[P+56>>2]=g|U;c[P+56+4>>2]=B|T;T=c[P+32>>2]|0;U=c[P+32+4>>2]|0;S=Cc(T|0,U|0,X|0,S|0)|0;S=Cc(S|0,B|0,L|0,l|0)|0;X=B;g=c[P+112>>2]^S;ia=c[P+112+4>>2]^X;aa=Cc(ia|0,g|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;ca=B;ja=qc(T^aa|0,U^ca|0,24)|0;Q=B;U=pc(T^aa|0,U^ca|0,40)|0;Q=B|Q;X=Cc(U|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,D|0,E|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;T=qc(ia^X|0,g^S|0,16)|0;f=B;g=pc(ia^X|0,g^S|0,48)|0;f=B|f;ca=Cc(g|T|0,f|0,aa|0,ca|0)|0;aa=B;ia=qc((U|ja)^ca|0,Q^aa|0,63)|0;ba=B;Q=pc((U|ja)^ca|0,Q^aa|0,1)|0;ba=B|ba;V=Cc(Q|ia|0,ba|0,fa|0,V|0)|0;V=Cc(V|0,B|0,J|0,K|0)|0;fa=B;Z=Cc(Y^fa|0,(ma|ha)^V|0,R|0,Z|0)|0;R=B;ja=qc((Q|ia)^Z|0,ba^R|0,24)|0;U=B;ba=pc((Q|ia)^Z|0,ba^R|0,40)|0;U=B|U;ia=Cc(ba|ja|0,U|0,V|0,fa|0)|0;ia=Cc(ia|0,B|0,t|0,u|0)|0;Q=B;c[P>>2]=ia;c[P+4>>2]=Q;ka=qc(Y^fa^ia|0,(ma|ha)^V^Q|0,16)|0;ga=B;V=pc(Y^fa^ia|0,(ma|ha)^V^Q|0,48)|0;ga=B|ga;c[P+96>>2]=V|ka;c[P+96+4>>2]=ga;R=Cc(V|ka|0,ga|0,Z|0,R|0)|0;Z=B;c[P+64>>2]=R;c[P+64+4>>2]=Z;ga=qc((ba|ja)^R|0,U^Z|0,63)|0;ka=B;Z=pc((ba|ja)^R|0,U^Z|0,1)|0;c[P+32>>2]=Z|ga;c[P+32+4>>2]=B|ka;ka=c[P+40>>2]|0;ga=c[P+40+4>>2]|0;_=Cc(ka|0,ga|0,W|0,_|0)|0;_=Cc(_|0,B|0,L|0,l|0)|0;W=B;aa=Cc(da^W|0,(e|la)^_|0,ca|0,aa|0)|0;ca=B;Z=qc(ka^aa|0,ga^ca|0,24)|0;U=B;ga=pc(ka^aa|0,ga^ca|0,40)|0;U=B|U;ka=Cc(ga|Z|0,U|0,_|0,W|0)|0;ka=Cc(ka|0,B|0,k|0,b|0)|0;R=B;c[P+8>>2]=ka;c[P+8+4>>2]=R;ja=qc(da^W^ka|0,(e|la)^_^R|0,16)|0;ba=B;_=pc(da^W^ka|0,(e|la)^_^R|0,48)|0;ba=B|ba;c[P+104>>2]=_|ja;c[P+104+4>>2]=ba;ca=Cc(_|ja|0,ba|0,aa|0,ca|0)|0;aa=B;c[P+72>>2]=ca;c[P+72+4>>2]=aa;ba=qc((ga|Z)^ca|0,U^aa|0,63)|0;ja=B;aa=pc((ga|Z)^ca|0,U^aa|0,1)|0;ja=B|ja;U=c[P+48>>2]|0;ca=c[P+48+4>>2]|0;ea=Cc(U|0,ca|0,$|0,ea|0)|0;ea=Cc(ea|0,B|0,h|0,j|0)|0;$=B;Z=Cc(f^$|0,(g|T)^ea|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;ga=B;_=qc(U^Z|0,ca^ga|0,24)|0;la=B;ca=pc(U^Z|0,ca^ga|0,40)|0;la=B|la;U=Cc(ca|_|0,la|0,ea|0,$|0)|0;U=Cc(U|0,B|0,M|0,N|0)|0;e=B;c[P+16>>2]=U;c[P+16+4>>2]=e;W=qc(f^$^U|0,(g|T)^ea^e|0,16)|0;da=B;ea=pc(f^$^U|0,(g|T)^ea^e|0,48)|0;da=B|da;c[P+112>>2]=ea|W;c[P+112+4>>2]=da;ga=Cc(ea|W|0,da|0,Z|0,ga|0)|0;Z=B;da=qc((ca|_)^ga|0,la^Z|0,63)|0;W=B;la=pc((ca|_)^ga|0,la^Z|0,1)|0;W=B|W;_=c[P+56>>2]|0;ca=c[P+56+4>>2]|0;S=Cc(_|0,ca|0,X|0,S|0)|0;S=Cc(S|0,B|0,r|0,s|0)|0;X=B;ea=c[P+120>>2]^S;T=c[P+120+4>>2]^X;g=Cc(T|0,ea|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;$=B;f=qc(_^g|0,ca^$|0,24)|0;V=B;ca=pc(_^g|0,ca^$|0,40)|0;V=B|V;X=Cc(ca|f|0,V|0,S|0,X|0)|0;X=Cc(X|0,B|0,F|0,G|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;_=qc(T^X|0,ea^S|0,16)|0;ha=B;ea=pc(T^X|0,ea^S|0,48)|0;ha=B|ha;$=Cc(ea|_|0,ha|0,g|0,$|0)|0;g=B;T=qc((ca|f)^$|0,V^g|0,63)|0;ma=B;V=pc((ca|f)^$|0,V^g|0,1)|0;ma=B|ma;Q=Cc(aa|ba|0,ja|0,ia|0,Q|0)|0;Q=Cc(Q|0,B|0,o|0,x|0)|0;ia=B;Z=Cc(ha^ia|0,(ea|_)^Q|0,ga|0,Z|0)|0;ga=B;f=qc((aa|ba)^Z|0,ja^ga|0,24)|0;ca=B;ja=pc((aa|ba)^Z|0,ja^ga|0,40)|0;ca=B|ca;ba=Cc(ja|f|0,ca|0,Q|0,ia|0)|0;ba=Cc(ba|0,B|0,y|0,z|0)|0;aa=B;c[P>>2]=ba;c[P+4>>2]=aa;fa=qc(ha^ia^ba|0,(ea|_)^Q^aa|0,16)|0;Y=B;Q=pc(ha^ia^ba|0,(ea|_)^Q^aa|0,48)|0;Y=B|Y;c[P+120>>2]=Q|fa;c[P+120+4>>2]=Y;ga=Cc(Q|fa|0,Y|0,Z|0,ga|0)|0;Z=B;c[P+80>>2]=ga;c[P+80+4>>2]=Z;Y=qc((ja|f)^ga|0,ca^Z|0,63)|0;fa=B;Z=pc((ja|f)^ga|0,ca^Z|0,1)|0;c[P+40>>2]=Z|Y;c[P+40+4>>2]=B|fa;R=Cc(la|da|0,W|0,ka|0,R|0)|0;R=Cc(R|0,B|0,v|0,w|0)|0;ka=B;fa=c[P+96>>2]^R;Y=c[P+96+4>>2]^ka;g=Cc(Y|0,fa|0,$|0,g|0)|0;$=B;Z=qc((la|da)^g|0,W^$|0,24)|0;ca=B;W=pc((la|da)^g|0,W^$|0,40)|0;ca=B|ca;ka=Cc(W|Z|0,ca|0,R|0,ka|0)|0;ka=Cc(ka|0,B|0,p|0,q|0)|0;R=B;c[P+8>>2]=ka;c[P+8+4>>2]=R;da=qc(Y^ka|0,fa^R|0,16)|0;la=B;fa=pc(Y^ka|0,fa^R|0,48)|0;la=B|la;$=Cc(fa|da|0,la|0,g|0,$|0)|0;g=B;c[P+88>>2]=$;c[P+88+4>>2]=g;Y=qc((W|Z)^$|0,ca^g|0,63)|0;ga=B;g=pc((W|Z)^$|0,ca^g|0,1)|0;c[P+48>>2]=g|Y;c[P+48+4>>2]=B|ga;e=Cc(V|T|0,ma|0,U|0,e|0)|0;e=Cc(e|0,B|0,D|0,E|0)|0;U=B;ga=c[P+104>>2]^e;Y=c[P+104+4>>2]^U;g=Cc(Y|0,ga|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;ca=B;$=qc((V|T)^g|0,ma^ca|0,24)|0;Z=B;ma=pc((V|T)^g|0,ma^ca|0,40)|0;Z=B|Z;U=Cc(ma|$|0,Z|0,e|0,U|0)|0;U=Cc(U|0,B|0,m|0,n|0)|0;e=B;c[P+16>>2]=U;c[P+16+4>>2]=e;T=qc(Y^U|0,ga^e|0,16)|0;V=B;ga=pc(Y^U|0,ga^e|0,48)|0;V=B|V;ca=Cc(ga|T|0,V|0,g|0,ca|0)|0;g=B;Y=qc((ma|$)^ca|0,Z^g|0,63)|0;W=B;Z=pc((ma|$)^ca|0,Z^g|0,1)|0;c[P+56>>2]=Z|Y;c[P+56+4>>2]=B|W;W=c[P+32>>2]|0;Y=c[P+32+4>>2]|0;S=Cc(W|0,Y|0,X|0,S|0)|0;S=Cc(S|0,B|0,A|0,C|0)|0;X=B;Z=c[P+112>>2]^S;$=c[P+112+4>>2]^X;ma=Cc($|0,Z|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;f=B;ja=qc(W^ma|0,Y^f|0,24)|0;Q=B;Y=pc(W^ma|0,Y^f|0,40)|0;Q=B|Q;X=Cc(Y|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,H|0,I|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;W=qc($^X|0,Z^S|0,16)|0;_=B;Z=pc($^X|0,Z^S|0,48)|0;_=B|_;f=Cc(Z|W|0,_|0,ma|0,f|0)|0;ma=B;$=qc((Y|ja)^f|0,Q^ma|0,63)|0;ea=B;Q=pc((Y|ja)^f|0,Q^ma|0,1)|0;ea=B|ea;aa=Cc(Q|$|0,ea|0,ba|0,aa|0)|0;aa=Cc(aa|0,B|0,M|0,N|0)|0;ba=B;g=Cc(la^ba|0,(fa|da)^aa|0,ca|0,g|0)|0;ca=B;ja=qc((Q|$)^g|0,ea^ca|0,24)|0;Y=B;ea=pc((Q|$)^g|0,ea^ca|0,40)|0;Y=B|Y;$=Cc(ea|ja|0,Y|0,aa|0,ba|0)|0;$=Cc($|0,B|0,H|0,I|0)|0;Q=B;c[P>>2]=$;c[P+4>>2]=Q;ia=qc(la^ba^$|0,(fa|da)^aa^Q|0,16)|0;ha=B;aa=pc(la^ba^$|0,(fa|da)^aa^Q|0,48)|0;ha=B|ha;c[P+96>>2]=aa|ia;c[P+96+4>>2]=ha;ca=Cc(aa|ia|0,ha|0,g|0,ca|0)|0;g=B;c[P+64>>2]=ca;c[P+64+4>>2]=g;ha=qc((ea|ja)^ca|0,Y^g|0,63)|0;ia=B;g=pc((ea|ja)^ca|0,Y^g|0,1)|0;c[P+32>>2]=g|ha;c[P+32+4>>2]=B|ia;ia=c[P+40>>2]|0;ha=c[P+40+4>>2]|0;R=Cc(ia|0,ha|0,ka|0,R|0)|0;R=Cc(R|0,B|0,y|0,z|0)|0;ka=B;ma=Cc(V^ka|0,(ga|T)^R|0,f|0,ma|0)|0;f=B;g=qc(ia^ma|0,ha^f|0,24)|0;Y=B;ha=pc(ia^ma|0,ha^f|0,40)|0;Y=B|Y;ia=Cc(ha|g|0,Y|0,R|0,ka|0)|0;ia=Cc(ia|0,B|0,h|0,j|0)|0;ca=B;c[P+8>>2]=ia;c[P+8+4>>2]=ca;ja=qc(V^ka^ia|0,(ga|T)^R^ca|0,16)|0;ea=B;R=pc(V^ka^ia|0,(ga|T)^R^ca|0,48)|0;ea=B|ea;c[P+104>>2]=R|ja;c[P+104+4>>2]=ea;f=Cc(R|ja|0,ea|0,ma|0,f|0)|0;ma=B;c[P+72>>2]=f;c[P+72+4>>2]=ma;ea=qc((ha|g)^f|0,Y^ma|0,63)|0;ja=B;ma=pc((ha|g)^f|0,Y^ma|0,1)|0;ja=B|ja;Y=c[P+48>>2]|0;f=c[P+48+4>>2]|0;e=Cc(Y|0,f|0,U|0,e|0)|0;e=Cc(e|0,B|0,J|0,K|0)|0;U=B;g=Cc(_^U|0,(Z|W)^e|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;ha=B;R=qc(Y^g|0,f^ha|0,24)|0;T=B;f=pc(Y^g|0,f^ha|0,40)|0;T=B|T;Y=Cc(f|R|0,T|0,e|0,U|0)|0;Y=Cc(Y|0,B|0,L|0,l|0)|0;ga=B;c[P+16>>2]=Y;c[P+16+4>>2]=ga;ka=qc(_^U^Y|0,(Z|W)^e^ga|0,16)|0;V=B;e=pc(_^U^Y|0,(Z|W)^e^ga|0,48)|0;V=B|V;c[P+112>>2]=e|ka;c[P+112+4>>2]=V;ha=Cc(e|ka|0,V|0,g|0,ha|0)|0;g=B;V=qc((f|R)^ha|0,T^g|0,63)|0;ka=B;T=pc((f|R)^ha|0,T^g|0,1)|0;ka=B|ka;R=c[P+56>>2]|0;f=c[P+56+4>>2]|0;S=Cc(R|0,f|0,X|0,S|0)|0;S=Cc(S|0,B|0,p|0,q|0)|0;X=B;e=c[P+120>>2]^S;W=c[P+120+4>>2]^X;Z=Cc(W|0,e|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;U=B;_=qc(R^Z|0,f^U|0,24)|0;aa=B;f=pc(R^Z|0,f^U|0,40)|0;aa=B|aa;X=Cc(f|_|0,aa|0,S|0,X|0)|0;X=Cc(X|0,B|0,D|0,E|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;R=qc(W^X|0,e^S|0,16)|0;da=B;e=pc(W^X|0,e^S|0,48)|0;da=B|da;U=Cc(e|R|0,da|0,Z|0,U|0)|0;Z=B;W=qc((f|_)^U|0,aa^Z|0,63)|0;fa=B;aa=pc((f|_)^U|0,aa^Z|0,1)|0;fa=B|fa;Q=Cc(ma|ea|0,ja|0,$|0,Q|0)|0;Q=Cc(Q|0,B|0,t|0,u|0)|0;$=B;g=Cc(da^$|0,(e|R)^Q|0,ha|0,g|0)|0;ha=B;_=qc((ma|ea)^g|0,ja^ha|0,24)|0;f=B;ja=pc((ma|ea)^g|0,ja^ha|0,40)|0;f=B|f;ea=Cc(ja|_|0,f|0,Q|0,$|0)|0;ea=Cc(ea|0,B|0,o|0,x|0)|0;ma=B;c[P>>2]=ea;c[P+4>>2]=ma;ba=qc(da^$^ea|0,(e|R)^Q^ma|0,16)|0;la=B;Q=pc(da^$^ea|0,(e|R)^Q^ma|0,48)|0;la=B|la;c[P+120>>2]=Q|ba;c[P+120+4>>2]=la;ha=Cc(Q|ba|0,la|0,g|0,ha|0)|0;g=B;c[P+80>>2]=ha;c[P+80+4>>2]=g;la=qc((ja|_)^ha|0,f^g|0,63)|0;ba=B;g=pc((ja|_)^ha|0,f^g|0,1)|0;c[P+40>>2]=g|la;c[P+40+4>>2]=B|ba;ca=Cc(T|V|0,ka|0,ia|0,ca|0)|0;ca=Cc(ca|0,B|0,k|0,b|0)|0;ia=B;ba=c[P+96>>2]^ca;la=c[P+96+4>>2]^ia;Z=Cc(la|0,ba|0,U|0,Z|0)|0;U=B;g=qc((T|V)^Z|0,ka^U|0,24)|0;f=B;ka=pc((T|V)^Z|0,ka^U|0,40)|0;f=B|f;ia=Cc(ka|g|0,f|0,ca|0,ia|0)|0;ia=Cc(ia|0,B|0,r|0,s|0)|0;ca=B;c[P+8>>2]=ia;c[P+8+4>>2]=ca;V=qc(la^ia|0,ba^ca|0,16)|0;T=B;ba=pc(la^ia|0,ba^ca|0,48)|0;T=B|T;U=Cc(ba|V|0,T|0,Z|0,U|0)|0;Z=B;c[P+88>>2]=U;c[P+88+4>>2]=Z;la=qc((ka|g)^U|0,f^Z|0,63)|0;ha=B;Z=pc((ka|g)^U|0,f^Z|0,1)|0;c[P+48>>2]=Z|la;c[P+48+4>>2]=B|ha;ga=Cc(aa|W|0,fa|0,Y|0,ga|0)|0;ga=Cc(ga|0,B|0,A|0,C|0)|0;Y=B;ha=c[P+104>>2]^ga;la=c[P+104+4>>2]^Y;Z=Cc(la|0,ha|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;f=B;U=qc((aa|W)^Z|0,fa^f|0,24)|0;g=B;fa=pc((aa|W)^Z|0,fa^f|0,40)|0;g=B|g;Y=Cc(fa|U|0,g|0,ga|0,Y|0)|0;Y=Cc(Y|0,B|0,v|0,w|0)|0;ga=B;c[P+16>>2]=Y;c[P+16+4>>2]=ga;W=qc(la^Y|0,ha^ga|0,16)|0;aa=B;ha=pc(la^Y|0,ha^ga|0,48)|0;aa=B|aa;f=Cc(ha|W|0,aa|0,Z|0,f|0)|0;Z=B;la=qc((fa|U)^f|0,g^Z|0,63)|0;ka=B;g=pc((fa|U)^f|0,g^Z|0,1)|0;c[P+56>>2]=g|la;c[P+56+4>>2]=B|ka;ka=c[P+32>>2]|0;la=c[P+32+4>>2]|0;S=Cc(ka|0,la|0,X|0,S|0)|0;S=Cc(S|0,B|0,m|0,n|0)|0;X=B;g=c[P+112>>2]^S;U=c[P+112+4>>2]^X;fa=Cc(U|0,g|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;_=B;ja=qc(ka^fa|0,la^_|0,24)|0;Q=B;la=pc(ka^fa|0,la^_|0,40)|0;Q=B|Q;X=Cc(la|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,F|0,G|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;ka=qc(U^X|0,g^S|0,16)|0;R=B;g=pc(U^X|0,g^S|0,48)|0;R=B|R;_=Cc(g|ka|0,R|0,fa|0,_|0)|0;fa=B;U=qc((la|ja)^_|0,Q^fa|0,63)|0;e=B;Q=pc((la|ja)^_|0,Q^fa|0,1)|0;e=B|e;ma=Cc(Q|U|0,e|0,ea|0,ma|0)|0;ma=Cc(ma|0,B|0,v|0,w|0)|0;ea=B;Z=Cc(T^ea|0,(ba|V)^ma|0,f|0,Z|0)|0;f=B;ja=qc((Q|U)^Z|0,e^f|0,24)|0;la=B;e=pc((Q|U)^Z|0,e^f|0,40)|0;la=B|la;U=Cc(e|ja|0,la|0,ma|0,ea|0)|0;U=Cc(U|0,B|0,k|0,b|0)|0;Q=B;c[P>>2]=U;c[P+4>>2]=Q;$=qc(T^ea^U|0,(ba|V)^ma^Q|0,16)|0;da=B;ma=pc(T^ea^U|0,(ba|V)^ma^Q|0,48)|0;da=B|da;c[P+96>>2]=ma|$;c[P+96+4>>2]=da;f=Cc(ma|$|0,da|0,Z|0,f|0)|0;Z=B;c[P+64>>2]=f;c[P+64+4>>2]=Z;da=qc((e|ja)^f|0,la^Z|0,63)|0;$=B;Z=pc((e|ja)^f|0,la^Z|0,1)|0;c[P+32>>2]=Z|da;c[P+32+4>>2]=B|$;$=c[P+40>>2]|0;da=c[P+40+4>>2]|0;ca=Cc($|0,da|0,ia|0,ca|0)|0;ca=Cc(ca|0,B|0,h|0,j|0)|0;ia=B;fa=Cc(aa^ia|0,(ha|W)^ca|0,_|0,fa|0)|0;_=B;Z=qc($^fa|0,da^_|0,24)|0;la=B;da=pc($^fa|0,da^_|0,40)|0;la=B|la;$=Cc(da|Z|0,la|0,ca|0,ia|0)|0;$=Cc($|0,B|0,D|0,E|0)|0;f=B;c[P+8>>2]=$;c[P+8+4>>2]=f;ja=qc(aa^ia^$|0,(ha|W)^ca^f|0,16)|0;e=B;ca=pc(aa^ia^$|0,(ha|W)^ca^f|0,48)|0;e=B|e;c[P+104>>2]=ca|ja;c[P+104+4>>2]=e;_=Cc(ca|ja|0,e|0,fa|0,_|0)|0;fa=B;c[P+72>>2]=_;c[P+72+4>>2]=fa;e=qc((da|Z)^_|0,la^fa|0,63)|0;ja=B;fa=pc((da|Z)^_|0,la^fa|0,1)|0;ja=B|ja;la=c[P+48>>2]|0;_=c[P+48+4>>2]|0;ga=Cc(la|0,_|0,Y|0,ga|0)|0;ga=Cc(ga|0,B|0,H|0,I|0)|0;Y=B;Z=Cc(R^Y|0,(g|ka)^ga|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;da=B;ca=qc(la^Z|0,_^da|0,24)|0;W=B;_=pc(la^Z|0,_^da|0,40)|0;W=B|W;la=Cc(_|ca|0,W|0,ga|0,Y|0)|0;la=Cc(la|0,B|0,p|0,q|0)|0;ha=B;c[P+16>>2]=la;c[P+16+4>>2]=ha;ia=qc(R^Y^la|0,(g|ka)^ga^ha|0,16)|0;aa=B;ga=pc(R^Y^la|0,(g|ka)^ga^ha|0,48)|0;aa=B|aa;c[P+112>>2]=ga|ia;c[P+112+4>>2]=aa;da=Cc(ga|ia|0,aa|0,Z|0,da|0)|0;Z=B;aa=qc((_|ca)^da|0,W^Z|0,63)|0;ia=B;W=pc((_|ca)^da|0,W^Z|0,1)|0;ia=B|ia;ca=c[P+56>>2]|0;_=c[P+56+4>>2]|0;S=Cc(ca|0,_|0,X|0,S|0)|0;S=Cc(S|0,B|0,o|0,x|0)|0;X=B;ga=c[P+120>>2]^S;ka=c[P+120+4>>2]^X;g=Cc(ka|0,ga|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;Y=B;R=qc(ca^g|0,_^Y|0,24)|0;ma=B;_=pc(ca^g|0,_^Y|0,40)|0;ma=B|ma;X=Cc(_|R|0,ma|0,S|0,X|0)|0;X=Cc(X|0,B|0,A|0,C|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;ca=qc(ka^X|0,ga^S|0,16)|0;V=B;ga=pc(ka^X|0,ga^S|0,48)|0;V=B|V;Y=Cc(ga|ca|0,V|0,g|0,Y|0)|0;g=B;ka=qc((_|R)^Y|0,ma^g|0,63)|0;ba=B;ma=pc((_|R)^Y|0,ma^g|0,1)|0;ba=B|ba;Q=Cc(fa|e|0,ja|0,U|0,Q|0)|0;Q=Cc(Q|0,B|0,J|0,K|0)|0;U=B;Z=Cc(V^U|0,(ga|ca)^Q|0,da|0,Z|0)|0;da=B;R=qc((fa|e)^Z|0,ja^da|0,24)|0;_=B;ja=pc((fa|e)^Z|0,ja^da|0,40)|0;_=B|_;e=Cc(ja|R|0,_|0,Q|0,U|0)|0;e=Cc(e|0,B|0,m|0,n|0)|0;fa=B;c[P>>2]=e;c[P+4>>2]=fa;ea=qc(V^U^e|0,(ga|ca)^Q^fa|0,16)|0;T=B;Q=pc(V^U^e|0,(ga|ca)^Q^fa|0,48)|0;T=B|T;c[P+120>>2]=Q|ea;c[P+120+4>>2]=T;da=Cc(Q|ea|0,T|0,Z|0,da|0)|0;Z=B;c[P+80>>2]=da;c[P+80+4>>2]=Z;T=qc((ja|R)^da|0,_^Z|0,63)|0;ea=B;Z=pc((ja|R)^da|0,_^Z|0,1)|0;c[P+40>>2]=Z|T;c[P+40+4>>2]=B|ea;f=Cc(W|aa|0,ia|0,$|0,f|0)|0;f=Cc(f|0,B|0,M|0,N|0)|0;$=B;ea=c[P+96>>2]^f;T=c[P+96+4>>2]^$;g=Cc(T|0,ea|0,Y|0,g|0)|0;Y=B;Z=qc((W|aa)^g|0,ia^Y|0,24)|0;_=B;ia=pc((W|aa)^g|0,ia^Y|0,40)|0;_=B|_;$=Cc(ia|Z|0,_|0,f|0,$|0)|0;$=Cc($|0,B|0,y|0,z|0)|0;f=B;c[P+8>>2]=$;c[P+8+4>>2]=f;aa=qc(T^$|0,ea^f|0,16)|0;W=B;ea=pc(T^$|0,ea^f|0,48)|0;W=B|W;Y=Cc(ea|aa|0,W|0,g|0,Y|0)|0;g=B;c[P+88>>2]=Y;c[P+88+4>>2]=g;T=qc((ia|Z)^Y|0,_^g|0,63)|0;da=B;g=pc((ia|Z)^Y|0,_^g|0,1)|0;c[P+48>>2]=g|T;c[P+48+4>>2]=B|da;ha=Cc(ma|ka|0,ba|0,la|0,ha|0)|0;ha=Cc(ha|0,B|0,L|0,l|0)|0;la=B;da=c[P+104>>2]^ha;T=c[P+104+4>>2]^la;g=Cc(T|0,da|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;_=B;Y=qc((ma|ka)^g|0,ba^_|0,24)|0;Z=B;ba=pc((ma|ka)^g|0,ba^_|0,40)|0;Z=B|Z;la=Cc(ba|Y|0,Z|0,ha|0,la|0)|0;la=Cc(la|0,B|0,r|0,s|0)|0;ha=B;c[P+16>>2]=la;c[P+16+4>>2]=ha;ka=qc(T^la|0,da^ha|0,16)|0;ma=B;da=pc(T^la|0,da^ha|0,48)|0;ma=B|ma;_=Cc(da|ka|0,ma|0,g|0,_|0)|0;g=B;T=qc((ba|Y)^_|0,Z^g|0,63)|0;ia=B;Z=pc((ba|Y)^_|0,Z^g|0,1)|0;c[P+56>>2]=Z|T;c[P+56+4>>2]=B|ia;ia=c[P+32>>2]|0;T=c[P+32+4>>2]|0;S=Cc(ia|0,T|0,X|0,S|0)|0;S=Cc(S|0,B|0,F|0,G|0)|0;X=B;Z=c[P+112>>2]^S;Y=c[P+112+4>>2]^X;ba=Cc(Y|0,Z|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;R=B;ja=qc(ia^ba|0,T^R|0,24)|0;Q=B;T=pc(ia^ba|0,T^R|0,40)|0;Q=B|Q;X=Cc(T|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,t|0,u|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;ia=qc(Y^X|0,Z^S|0,16)|0;ca=B;Z=pc(Y^X|0,Z^S|0,48)|0;ca=B|ca;R=Cc(Z|ia|0,ca|0,ba|0,R|0)|0;ba=B;Y=qc((T|ja)^R|0,Q^ba|0,63)|0;ga=B;Q=pc((T|ja)^R|0,Q^ba|0,1)|0;ga=B|ga;fa=Cc(Q|Y|0,ga|0,e|0,fa|0)|0;fa=Cc(fa|0,B|0,F|0,G|0)|0;e=B;g=Cc(W^e|0,(ea|aa)^fa|0,_|0,g|0)|0;_=B;ja=qc((Q|Y)^g|0,ga^_|0,24)|0;T=B;ga=pc((Q|Y)^g|0,ga^_|0,40)|0;T=B|T;Y=Cc(ga|ja|0,T|0,fa|0,e|0)|0;Y=Cc(Y|0,B|0,m|0,n|0)|0;Q=B;c[P>>2]=Y;c[P+4>>2]=Q;U=qc(W^e^Y|0,(ea|aa)^fa^Q|0,16)|0;V=B;fa=pc(W^e^Y|0,(ea|aa)^fa^Q|0,48)|0;V=B|V;c[P+96>>2]=fa|U;c[P+96+4>>2]=V;_=Cc(fa|U|0,V|0,g|0,_|0)|0;g=B;c[P+64>>2]=_;c[P+64+4>>2]=g;V=qc((ga|ja)^_|0,T^g|0,63)|0;U=B;g=pc((ga|ja)^_|0,T^g|0,1)|0;c[P+32>>2]=g|V;c[P+32+4>>2]=B|U;U=c[P+40>>2]|0;V=c[P+40+4>>2]|0;f=Cc(U|0,V|0,$|0,f|0)|0;f=Cc(f|0,B|0,A|0,C|0)|0;$=B;ba=Cc(ma^$|0,(da|ka)^f|0,R|0,ba|0)|0;R=B;g=qc(U^ba|0,V^R|0,24)|0;T=B;V=pc(U^ba|0,V^R|0,40)|0;T=B|T;U=Cc(V|g|0,T|0,f|0,$|0)|0;U=Cc(U|0,B|0,r|0,s|0)|0;_=B;c[P+8>>2]=U;c[P+8+4>>2]=_;ja=qc(ma^$^U|0,(da|ka)^f^_|0,16)|0;ga=B;f=pc(ma^$^U|0,(da|ka)^f^_|0,48)|0;ga=B|ga;c[P+104>>2]=f|ja;c[P+104+4>>2]=ga;R=Cc(f|ja|0,ga|0,ba|0,R|0)|0;ba=B;c[P+72>>2]=R;c[P+72+4>>2]=ba;ga=qc((V|g)^R|0,T^ba|0,63)|0;ja=B;ba=pc((V|g)^R|0,T^ba|0,1)|0;ja=B|ja;T=c[P+48>>2]|0;R=c[P+48+4>>2]|0;ha=Cc(T|0,R|0,la|0,ha|0)|0;ha=Cc(ha|0,B|0,y|0,z|0)|0;la=B;g=Cc(ca^la|0,(Z|ia)^ha|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;V=B;f=qc(T^g|0,R^V|0,24)|0;ka=B;R=pc(T^g|0,R^V|0,40)|0;ka=B|ka;T=Cc(R|f|0,ka|0,ha|0,la|0)|0;T=Cc(T|0,B|0,v|0,w|0)|0;da=B;c[P+16>>2]=T;c[P+16+4>>2]=da;$=qc(ca^la^T|0,(Z|ia)^ha^da|0,16)|0;ma=B;ha=pc(ca^la^T|0,(Z|ia)^ha^da|0,48)|0;ma=B|ma;c[P+112>>2]=ha|$;c[P+112+4>>2]=ma;V=Cc(ha|$|0,ma|0,g|0,V|0)|0;g=B;ma=qc((R|f)^V|0,ka^g|0,63)|0;$=B;ka=pc((R|f)^V|0,ka^g|0,1)|0;$=B|$;f=c[P+56>>2]|0;R=c[P+56+4>>2]|0;S=Cc(f|0,R|0,X|0,S|0)|0;S=Cc(S|0,B|0,L|0,l|0)|0;X=B;ha=c[P+120>>2]^S;ia=c[P+120+4>>2]^X;Z=Cc(ia|0,ha|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;la=B;ca=qc(f^Z|0,R^la|0,24)|0;fa=B;R=pc(f^Z|0,R^la|0,40)|0;fa=B|fa;X=Cc(R|ca|0,fa|0,S|0,X|0)|0;X=Cc(X|0,B|0,t|0,u|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;f=qc(ia^X|0,ha^S|0,16)|0;aa=B;ha=pc(ia^X|0,ha^S|0,48)|0;aa=B|aa;la=Cc(ha|f|0,aa|0,Z|0,la|0)|0;Z=B;ia=qc((R|ca)^la|0,fa^Z|0,63)|0;ea=B;fa=pc((R|ca)^la|0,fa^Z|0,1)|0;ea=B|ea;Q=Cc(ba|ga|0,ja|0,Y|0,Q|0)|0;Q=Cc(Q|0,B|0,k|0,b|0)|0;Y=B;g=Cc(aa^Y|0,(ha|f)^Q|0,V|0,g|0)|0;V=B;ca=qc((ba|ga)^g|0,ja^V|0,24)|0;R=B;ja=pc((ba|ga)^g|0,ja^V|0,40)|0;R=B|R;ga=Cc(ja|ca|0,R|0,Q|0,Y|0)|0;ga=Cc(ga|0,B|0,H|0,I|0)|0;ba=B;c[P>>2]=ga;c[P+4>>2]=ba;e=qc(aa^Y^ga|0,(ha|f)^Q^ba|0,16)|0;W=B;Q=pc(aa^Y^ga|0,(ha|f)^Q^ba|0,48)|0;W=B|W;c[P+120>>2]=Q|e;c[P+120+4>>2]=W;V=Cc(Q|e|0,W|0,g|0,V|0)|0;g=B;c[P+80>>2]=V;c[P+80+4>>2]=g;W=qc((ja|ca)^V|0,R^g|0,63)|0;e=B;g=pc((ja|ca)^V|0,R^g|0,1)|0;c[P+40>>2]=g|W;c[P+40+4>>2]=B|e;_=Cc(ka|ma|0,$|0,U|0,_|0)|0;_=Cc(_|0,B|0,D|0,E|0)|0;U=B;e=c[P+96>>2]^_;W=c[P+96+4>>2]^U;Z=Cc(W|0,e|0,la|0,Z|0)|0;la=B;g=qc((ka|ma)^Z|0,$^la|0,24)|0;R=B;$=pc((ka|ma)^Z|0,$^la|0,40)|0;R=B|R;U=Cc($|g|0,R|0,_|0,U|0)|0;U=Cc(U|0,B|0,h|0,j|0)|0;_=B;c[P+8>>2]=U;c[P+8+4>>2]=_;ma=qc(W^U|0,e^_|0,16)|0;ka=B;e=pc(W^U|0,e^_|0,48)|0;ka=B|ka;la=Cc(e|ma|0,ka|0,Z|0,la|0)|0;Z=B;c[P+88>>2]=la;c[P+88+4>>2]=Z;W=qc(($|g)^la|0,R^Z|0,63)|0;V=B;Z=pc(($|g)^la|0,R^Z|0,1)|0;c[P+48>>2]=Z|W;c[P+48+4>>2]=B|V;da=Cc(fa|ia|0,ea|0,T|0,da|0)|0;da=Cc(da|0,B|0,p|0,q|0)|0;T=B;V=c[P+104>>2]^da;W=c[P+104+4>>2]^T;Z=Cc(W|0,V|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;R=B;la=qc((fa|ia)^Z|0,ea^R|0,24)|0;g=B;ea=pc((fa|ia)^Z|0,ea^R|0,40)|0;g=B|g;T=Cc(ea|la|0,g|0,da|0,T|0)|0;T=Cc(T|0,B|0,J|0,K|0)|0;da=B;c[P+16>>2]=T;c[P+16+4>>2]=da;ia=qc(W^T|0,V^da|0,16)|0;fa=B;V=pc(W^T|0,V^da|0,48)|0;fa=B|fa;R=Cc(V|ia|0,fa|0,Z|0,R|0)|0;Z=B;W=qc((ea|la)^R|0,g^Z|0,63)|0;$=B;g=pc((ea|la)^R|0,g^Z|0,1)|0;c[P+56>>2]=g|W;c[P+56+4>>2]=B|$;$=c[P+32>>2]|0;W=c[P+32+4>>2]|0;S=Cc($|0,W|0,X|0,S|0)|0;S=Cc(S|0,B|0,M|0,N|0)|0;X=B;g=c[P+112>>2]^S;la=c[P+112+4>>2]^X;ea=Cc(la|0,g|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;ca=B;ja=qc($^ea|0,W^ca|0,24)|0;Q=B;W=pc($^ea|0,W^ca|0,40)|0;Q=B|Q;X=Cc(W|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,o|0,x|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;$=qc(la^X|0,g^S|0,16)|0;f=B;g=pc(la^X|0,g^S|0,48)|0;f=B|f;ca=Cc(g|$|0,f|0,ea|0,ca|0)|0;ea=B;la=qc((W|ja)^ca|0,Q^ea|0,63)|0;ha=B;Q=pc((W|ja)^ca|0,Q^ea|0,1)|0;ha=B|ha;ba=Cc(Q|la|0,ha|0,ga|0,ba|0)|0;ba=Cc(ba|0,B|0,o|0,x|0)|0;ga=B;Z=Cc(ka^ga|0,(e|ma)^ba|0,R|0,Z|0)|0;R=B;ja=qc((Q|la)^Z|0,ha^R|0,24)|0;W=B;ha=pc((Q|la)^Z|0,ha^R|0,40)|0;W=B|W;la=Cc(ha|ja|0,W|0,ba|0,ga|0)|0;la=Cc(la|0,B|0,L|0,l|0)|0;Q=B;c[P>>2]=la;c[P+4>>2]=Q;Y=qc(ka^ga^la|0,(e|ma)^ba^Q|0,16)|0;aa=B;ba=pc(ka^ga^la|0,(e|ma)^ba^Q|0,48)|0;aa=B|aa;c[P+96>>2]=ba|Y;c[P+96+4>>2]=aa;R=Cc(ba|Y|0,aa|0,Z|0,R|0)|0;Z=B;c[P+64>>2]=R;c[P+64+4>>2]=Z;aa=qc((ha|ja)^R|0,W^Z|0,63)|0;Y=B;Z=pc((ha|ja)^R|0,W^Z|0,1)|0;c[P+32>>2]=Z|aa;c[P+32+4>>2]=B|Y;Y=c[P+40>>2]|0;aa=c[P+40+4>>2]|0;_=Cc(Y|0,aa|0,U|0,_|0)|0;_=Cc(_|0,B|0,m|0,n|0)|0;U=B;ea=Cc(fa^U|0,(V|ia)^_|0,ca|0,ea|0)|0;ca=B;Z=qc(Y^ea|0,aa^ca|0,24)|0;W=B;aa=pc(Y^ea|0,aa^ca|0,40)|0;W=B|W;Y=Cc(aa|Z|0,W|0,_|0,U|0)|0;Y=Cc(Y|0,B|0,p|0,q|0)|0;R=B;c[P+8>>2]=Y;c[P+8+4>>2]=R;ja=qc(fa^U^Y|0,(V|ia)^_^R|0,16)|0;ha=B;_=pc(fa^U^Y|0,(V|ia)^_^R|0,48)|0;ha=B|ha;c[P+104>>2]=_|ja;c[P+104+4>>2]=ha;ca=Cc(_|ja|0,ha|0,ea|0,ca|0)|0;ea=B;c[P+72>>2]=ca;c[P+72+4>>2]=ea;ha=qc((aa|Z)^ca|0,W^ea|0,63)|0;ja=B;ea=pc((aa|Z)^ca|0,W^ea|0,1)|0;ja=B|ja;W=c[P+48>>2]|0;ca=c[P+48+4>>2]|0;da=Cc(W|0,ca|0,T|0,da|0)|0;da=Cc(da|0,B|0,r|0,s|0)|0;T=B;Z=Cc(f^T|0,(g|$)^da|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;aa=B;_=qc(W^Z|0,ca^aa|0,24)|0;ia=B;ca=pc(W^Z|0,ca^aa|0,40)|0;ia=B|ia;W=Cc(ca|_|0,ia|0,da|0,T|0)|0;W=Cc(W|0,B|0,t|0,u|0)|0;V=B;c[P+16>>2]=W;c[P+16+4>>2]=V;U=qc(f^T^W|0,(g|$)^da^V|0,16)|0;fa=B;da=pc(f^T^W|0,(g|$)^da^V|0,48)|0;fa=B|fa;c[P+112>>2]=da|U;c[P+112+4>>2]=fa;aa=Cc(da|U|0,fa|0,Z|0,aa|0)|0;Z=B;fa=qc((ca|_)^aa|0,ia^Z|0,63)|0;U=B;ia=pc((ca|_)^aa|0,ia^Z|0,1)|0;U=B|U;_=c[P+56>>2]|0;ca=c[P+56+4>>2]|0;S=Cc(_|0,ca|0,X|0,S|0)|0;S=Cc(S|0,B|0,v|0,w|0)|0;X=B;da=c[P+120>>2]^S;$=c[P+120+4>>2]^X;g=Cc($|0,da|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;T=B;f=qc(_^g|0,ca^T|0,24)|0;ba=B;ca=pc(_^g|0,ca^T|0,40)|0;ba=B|ba;X=Cc(ca|f|0,ba|0,S|0,X|0)|0;X=Cc(X|0,B|0,y|0,z|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;_=qc($^X|0,da^S|0,16)|0;ma=B;da=pc($^X|0,da^S|0,48)|0;ma=B|ma;T=Cc(da|_|0,ma|0,g|0,T|0)|0;g=B;$=qc((ca|f)^T|0,ba^g|0,63)|0;e=B;ba=pc((ca|f)^T|0,ba^g|0,1)|0;e=B|e;Q=Cc(ea|ha|0,ja|0,la|0,Q|0)|0;Q=Cc(Q|0,B|0,A|0,C|0)|0;la=B;Z=Cc(ma^la|0,(da|_)^Q|0,aa|0,Z|0)|0;aa=B;f=qc((ea|ha)^Z|0,ja^aa|0,24)|0;ca=B;ja=pc((ea|ha)^Z|0,ja^aa|0,40)|0;ca=B|ca;ha=Cc(ja|f|0,ca|0,Q|0,la|0)|0;ha=Cc(ha|0,B|0,D|0,E|0)|0;ea=B;c[P>>2]=ha;c[P+4>>2]=ea;ga=qc(ma^la^ha|0,(da|_)^Q^ea|0,16)|0;ka=B;Q=pc(ma^la^ha|0,(da|_)^Q^ea|0,48)|0;ka=B|ka;c[P+120>>2]=Q|ga;c[P+120+4>>2]=ka;aa=Cc(Q|ga|0,ka|0,Z|0,aa|0)|0;Z=B;c[P+80>>2]=aa;c[P+80+4>>2]=Z;ka=qc((ja|f)^aa|0,ca^Z|0,63)|0;ga=B;Z=pc((ja|f)^aa|0,ca^Z|0,1)|0;c[P+40>>2]=Z|ka;c[P+40+4>>2]=B|ga;R=Cc(ia|fa|0,U|0,Y|0,R|0)|0;R=Cc(R|0,B|0,F|0,G|0)|0;Y=B;ga=c[P+96>>2]^R;ka=c[P+96+4>>2]^Y;g=Cc(ka|0,ga|0,T|0,g|0)|0;T=B;Z=qc((ia|fa)^g|0,U^T|0,24)|0;ca=B;U=pc((ia|fa)^g|0,U^T|0,40)|0;ca=B|ca;Y=Cc(U|Z|0,ca|0,R|0,Y|0)|0;Y=Cc(Y|0,B|0,H|0,I|0)|0;R=B;c[P+8>>2]=Y;c[P+8+4>>2]=R;fa=qc(ka^Y|0,ga^R|0,16)|0;ia=B;ga=pc(ka^Y|0,ga^R|0,48)|0;ia=B|ia;T=Cc(ga|fa|0,ia|0,g|0,T|0)|0;g=B;c[P+88>>2]=T;c[P+88+4>>2]=g;ka=qc((U|Z)^T|0,ca^g|0,63)|0;aa=B;g=pc((U|Z)^T|0,ca^g|0,1)|0;c[P+48>>2]=g|ka;c[P+48+4>>2]=B|aa;V=Cc(ba|$|0,e|0,W|0,V|0)|0;V=Cc(V|0,B|0,J|0,K|0)|0;W=B;aa=c[P+104>>2]^V;ka=c[P+104+4>>2]^W;g=Cc(ka|0,aa|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;ca=B;T=qc((ba|$)^g|0,e^ca|0,24)|0;Z=B;e=pc((ba|$)^g|0,e^ca|0,40)|0;Z=B|Z;W=Cc(e|T|0,Z|0,V|0,W|0)|0;W=Cc(W|0,B|0,M|0,N|0)|0;V=B;c[P+16>>2]=W;c[P+16+4>>2]=V;$=qc(ka^W|0,aa^V|0,16)|0;ba=B;aa=pc(ka^W|0,aa^V|0,48)|0;ba=B|ba;ca=Cc(aa|$|0,ba|0,g|0,ca|0)|0;g=B;ka=qc((e|T)^ca|0,Z^g|0,63)|0;U=B;Z=pc((e|T)^ca|0,Z^g|0,1)|0;c[P+56>>2]=Z|ka;c[P+56+4>>2]=B|U;U=c[P+32>>2]|0;ka=c[P+32+4>>2]|0;S=Cc(U|0,ka|0,X|0,S|0)|0;S=Cc(S|0,B|0,h|0,j|0)|0;X=B;Z=c[P+112>>2]^S;T=c[P+112+4>>2]^X;e=Cc(T|0,Z|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;f=B;ja=qc(U^e|0,ka^f|0,24)|0;Q=B;ka=pc(U^e|0,ka^f|0,40)|0;Q=B|Q;X=Cc(ka|ja|0,Q|0,S|0,X|0)|0;X=Cc(X|0,B|0,k|0,b|0)|0;S=B;c[P+24>>2]=X;c[P+24+4>>2]=S;U=qc(T^X|0,Z^S|0,16)|0;_=B;Z=pc(T^X|0,Z^S|0,48)|0;_=B|_;f=Cc(Z|U|0,_|0,e|0,f|0)|0;e=B;T=qc((ka|ja)^f|0,Q^e|0,63)|0;da=B;Q=pc((ka|ja)^f|0,Q^e|0,1)|0;da=B|da;ea=Cc(Q|T|0,da|0,ha|0,ea|0)|0;ea=Cc(ea|0,B|0,h|0,j|0)|0;ha=B;g=Cc(ia^ha|0,(ga|fa)^ea|0,ca|0,g|0)|0;h=B;ca=qc((Q|T)^g|0,da^h|0,24)|0;j=B;da=pc((Q|T)^g|0,da^h|0,40)|0;j=B|j;T=Cc(da|ca|0,j|0,ea|0,ha|0)|0;T=Cc(T|0,B|0,F|0,G|0)|0;Q=B;c[P>>2]=T;c[P+4>>2]=Q;G=qc(ia^ha^T|0,(ga|fa)^ea^Q|0,16)|0;F=B;ea=pc(ia^ha^T|0,(ga|fa)^ea^Q|0,48)|0;F=B|F;c[P+96>>2]=ea|G;c[P+96+4>>2]=F;F=Cc(ea|G|0,F|0,g|0,h|0)|0;h=B;c[P+64>>2]=F;c[P+64+4>>2]=h;G=qc((da|ca)^F|0,j^h|0,63)|0;g=B;h=pc((da|ca)^F|0,j^h|0,1)|0;c[P+32>>2]=h|G;c[P+32+4>>2]=B|g;g=c[P+40>>2]|0;G=c[P+40+4>>2]|0;R=Cc(g|0,G|0,Y|0,R|0)|0;R=Cc(R|0,B|0,r|0,s|0)|0;h=B;e=Cc(ba^h|0,(aa|$)^R|0,f|0,e|0)|0;f=B;F=qc(g^e|0,G^f|0,24)|0;Y=B;G=pc(g^e|0,G^f|0,40)|0;Y=B|Y;s=Cc(G|F|0,Y|0,R|0,h|0)|0;s=Cc(s|0,B|0,A|0,C|0)|0;r=B;c[P+8>>2]=s;c[P+8+4>>2]=r;g=qc(ba^h^s|0,(aa|$)^R^r|0,16)|0;C=B;R=pc(ba^h^s|0,(aa|$)^R^r|0,48)|0;C=B|C;c[P+104>>2]=R|g;c[P+104+4>>2]=C;C=Cc(R|g|0,C|0,e|0,f|0)|0;f=B;c[P+72>>2]=C;c[P+72+4>>2]=f;e=qc((G|F)^C|0,Y^f|0,63)|0;g=B;f=pc((G|F)^C|0,Y^f|0,1)|0;g=B|g;C=c[P+48>>2]|0;Y=c[P+48+4>>2]|0;F=Cc(C|0,Y|0,W|0,V|0)|0;F=Cc(F|0,B|0,D|0,E|0)|0;G=B;V=Cc(_^G|0,(Z|U)^F|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;W=B;R=qc(C^V|0,Y^W|0,24)|0;h=B;Y=pc(C^V|0,Y^W|0,40)|0;h=B|h;C=Cc(Y|R|0,h|0,F|0,G|0)|0;C=Cc(C|0,B|0,k|0,b|0)|0;D=B;c[P+16>>2]=C;c[P+16+4>>2]=D;k=qc(_^G^C|0,(Z|U)^F^D|0,16)|0;j=B;F=pc(_^G^C|0,(Z|U)^F^D|0,48)|0;j=B|j;c[P+112>>2]=F|k;c[P+112+4>>2]=j;W=Cc(F|k|0,j|0,V|0,W|0)|0;V=B;j=qc((Y|R)^W|0,h^V|0,63)|0;k=B;h=pc((Y|R)^W|0,h^V|0,1)|0;k=B|k;R=c[P+56>>2]|0;Y=c[P+56+4>>2]|0;F=Cc(R|0,Y|0,X|0,S|0)|0;F=Cc(F|0,B|0,M|0,N|0)|0;G=B;S=c[P+120>>2]^F;A=c[P+120+4>>2]^G;M=Cc(A|0,S|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;E=B;X=qc(R^M|0,Y^E|0,24)|0;N=B;Y=pc(R^M|0,Y^E|0,40)|0;N=B|N;G=Cc(Y|X|0,N|0,F|0,G|0)|0;G=Cc(G|0,B|0,v|0,w|0)|0;F=B;c[P+24>>2]=G;c[P+24+4>>2]=F;R=qc(A^G|0,S^F|0,16)|0;U=B;S=pc(A^G|0,S^F|0,48)|0;U=B|U;E=Cc(S|R|0,U|0,M|0,E|0)|0;M=B;A=qc((Y|X)^E|0,N^M|0,63)|0;b=B;w=pc((Y|X)^E|0,N^M|0,1)|0;b=B|b;Q=Cc(f|e|0,g|0,T|0,Q|0)|0;Q=Cc(Q|0,B|0,L|0,l|0)|0;T=B;v=Cc(U^T|0,(S|R)^Q|0,W|0,V|0)|0;N=B;l=qc((f|e)^v|0,g^N|0,24)|0;L=B;g=pc((f|e)^v|0,g^N|0,40)|0;L=B|L;e=Cc(g|l|0,L|0,Q|0,T|0)|0;e=Cc(e|0,B|0,J|0,K|0)|0;f=B;c[P>>2]=e;c[P+4>>2]=f;J=qc(U^T^e|0,(S|R)^Q^f|0,16)|0;K=B;Q=pc(U^T^e|0,(S|R)^Q^f|0,48)|0;K=B|K;c[P+120>>2]=Q|J;c[P+120+4>>2]=K;N=Cc(Q|J|0,K|0,v|0,N|0)|0;K=B;c[P+80>>2]=N;c[P+80+4>>2]=K;J=qc((g|l)^N|0,L^K|0,63)|0;v=B;K=pc((g|l)^N|0,L^K|0,1)|0;c[P+40>>2]=K|J;c[P+40+4>>2]=B|v;v=Cc(h|j|0,k|0,s|0,r|0)|0;v=Cc(v|0,B|0,o|0,x|0)|0;r=B;s=c[P+96>>2]^v;o=c[P+96+4>>2]^r;M=Cc(o|0,s|0,E|0,M|0)|0;E=B;J=qc((h|j)^M|0,k^E|0,24)|0;K=B;x=pc((h|j)^M|0,k^E|0,40)|0;K=B|K;r=Cc(x|J|0,K|0,v|0,r|0)|0;r=Cc(r|0,B|0,m|0,n|0)|0;v=B;c[P+8>>2]=r;c[P+8+4>>2]=v;L=qc(o^r|0,s^v|0,16)|0;N=B;v=pc(o^r|0,s^v|0,48)|0;N=B|N;c[P+96>>2]=v|L;c[P+96+4>>2]=N;E=Cc(v|L|0,N|0,M|0,E|0)|0;M=B;c[P+88>>2]=E;c[P+88+4>>2]=M;N=qc((x|J)^E|0,K^M|0,63)|0;L=B;M=pc((x|J)^E|0,K^M|0,1)|0;c[P+48>>2]=M|N;c[P+48+4>>2]=B|L;L=Cc(w|A|0,b|0,C|0,D|0)|0;L=Cc(L|0,B|0,H|0,I|0)|0;D=B;N=c[P+104>>2]^L;C=c[P+104+4>>2]^D;H=Cc(C|0,N|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;M=B;K=qc((w|A)^H|0,b^M|0,24)|0;E=B;J=pc((w|A)^H|0,b^M|0,40)|0;E=B|E;D=Cc(J|K|0,E|0,L|0,D|0)|0;D=Cc(D|0,B|0,y|0,z|0)|0;L=B;c[P+16>>2]=D;c[P+16+4>>2]=L;b=qc(C^D|0,N^L|0,16)|0;I=B;L=pc(C^D|0,N^L|0,48)|0;I=B|I;c[P+104>>2]=L|b;c[P+104+4>>2]=I;M=Cc(L|b|0,I|0,H|0,M|0)|0;H=B;c[P+64>>2]=M;c[P+64+4>>2]=H;I=qc((J|K)^M|0,E^H|0,63)|0;b=B;H=pc((J|K)^M|0,E^H|0,1)|0;c[P+56>>2]=H|I;c[P+56+4>>2]=B|b;b=c[P+32>>2]|0;I=c[P+32+4>>2]|0;H=Cc(b|0,I|0,G|0,F|0)|0;H=Cc(H|0,B|0,t|0,u|0)|0;F=B;G=c[P+112>>2]^H;E=c[P+112+4>>2]^F;M=Cc(E|0,G|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;K=B;J=qc(b^M|0,I^K|0,24)|0;L=B;I=pc(b^M|0,I^K|0,40)|0;L=B|L;F=Cc(I|J|0,L|0,H|0,F|0)|0;F=Cc(F|0,B|0,p|0,q|0)|0;H=B;c[P+24>>2]=F;c[P+24+4>>2]=H;b=qc(E^F|0,G^H|0,16)|0;N=B;H=pc(E^F|0,G^H|0,48)|0;N=B|N;c[P+112>>2]=H|b;c[P+112+4>>2]=N;K=Cc(H|b|0,N|0,M|0,K|0)|0;M=B;c[P+72>>2]=K;c[P+72+4>>2]=M;N=qc((I|J)^K|0,L^M|0,63)|0;b=B;M=pc((I|J)^K|0,L^M|0,1)|0;c[P+32>>2]=M|N;c[P+32+4>>2]=B|b;b=0;while(1){ma=a+(b<<3)|0;ka=P+(b+8<<3)|0;la=f^c[ma+4>>2]^c[ka+4>>2];c[ma>>2]=e^c[ma>>2]^c[ka>>2];c[ma+4>>2]=la;b=b+1|0;if((b|0)==8)break;e=c[P+(b<<3)>>2]|0;f=c[P+(b<<3)+4>>2]|0}i=O;return}function ea(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,kc=0,lc=0,mc=0,nc=0,oc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Bc=0,Dc=0,Ec=0,Fc=0;O=d[c>>0]|0;P=pc(d[c+1>>0]|0|0,0,8)|0;jb=B;j=d[c+2>>0]|0;db=pc(j|0,0,16)|0;Ma=pc(d[c+3>>0]|0|0,0,8)|0;qb=B;A=pc(d[c+4>>0]|0|0,0,16)|0;qb=qb|B;nb=d[c+5>>0]|0;z=pc(nb|0,0,24)|0;qb=qc(Ma|j|A|z|0,qb|B|0,5)|0;z=pc(d[c+6>>0]|0|0,0,8)|0;A=B;j=d[c+7>>0]|0;Ma=pc(j|0,0,16)|0;A=qc(z|nb|Ma|0,A|B|0,2)|0;Ma=pc(d[c+8>>0]|0|0,0,8)|0;nb=B;z=pc(d[c+9>>0]|0|0,0,16)|0;nb=nb|B;ca=d[c+10>>0]|0;lb=pc(ca|0,0,24)|0;nb=qc(Ma|j|z|lb|0,nb|B|0,7)|0;lb=pc(d[c+11>>0]|0|0,0,8)|0;z=B;j=pc(d[c+12>>0]|0|0,0,16)|0;z=z|B;Ma=d[c+13>>0]|0;ra=pc(Ma|0,0,24)|0;z=qc(lb|ca|j|ra|0,z|B|0,4)|0;ra=pc(d[c+14>>0]|0|0,0,8)|0;j=B;ca=d[c+15>>0]|0;lb=pc(ca|0,0,16)|0;j=qc(ra|Ma|lb|0,j|B|0,1)|0;lb=pc(d[c+16>>0]|0|0,0,8)|0;Ma=B;ra=pc(d[c+17>>0]|0|0,0,16)|0;Ma=Ma|B;Ca=d[c+18>>0]|0;I=pc(Ca|0,0,24)|0;Ma=qc(lb|ca|ra|I|0,Ma|B|0,6)|0;I=pc(d[c+19>>0]|0|0,0,8)|0;ra=B;ca=pc(d[c+20>>0]|0|0,0,16)|0;ra=qc(I|Ca|ca|0,ra|B|0,3)|0;ca=B;Ca=d[c+21>>0]|0;I=pc(d[c+22>>0]|0|0,0,8)|0;lb=B;eb=d[c+23>>0]|0;Ja=pc(eb|0,0,16)|0;ba=pc(d[c+24>>0]|0|0,0,8)|0;La=B;wc=pc(d[c+25>>0]|0|0,0,16)|0;La=La|B;o=d[c+26>>0]|0;rb=pc(o|0,0,24)|0;La=qc(ba|eb|wc|rb|0,La|B|0,5)|0;rb=pc(d[c+27>>0]|0|0,0,8)|0;wc=B;eb=d[c+28>>0]|0;ba=pc(eb|0,0,16)|0;wc=qc(rb|o|ba|0,wc|B|0,2)|0;ba=pc(d[c+29>>0]|0|0,0,8)|0;o=B;rb=pc(d[c+30>>0]|0|0,0,16)|0;o=o|B;Da=pc(d[c+31>>0]|0|0,0,24)|0;o=qc(ba|eb|rb|Da|0,o|B|0,7)|0;Da=B;rb=d[e>>0]|0;eb=pc(d[e+1>>0]|0|0,0,8)|0;ba=B;Ta=d[e+2>>0]|0;aa=pc(Ta|0,0,16)|0;m=pc(d[e+3>>0]|0|0,0,8)|0;Ya=B;q=pc(d[e+4>>0]|0|0,0,16)|0;Ya=Ya|B;p=d[e+5>>0]|0;ea=pc(p|0,0,24)|0;Ya=qc(m|Ta|q|ea|0,Ya|B|0,5)|0;ea=pc(d[e+6>>0]|0|0,0,8)|0;q=B;Ta=d[e+7>>0]|0;m=pc(Ta|0,0,16)|0;q=qc(ea|p|m|0,q|B|0,2)|0;m=pc(d[e+8>>0]|0|0,0,8)|0;p=B;ea=pc(d[e+9>>0]|0|0,0,16)|0;p=p|B;Bc=d[e+10>>0]|0;wa=pc(Bc|0,0,24)|0;p=qc(m|Ta|ea|wa|0,p|B|0,7)|0;wa=pc(d[e+11>>0]|0|0,0,8)|0;ea=B;Ta=pc(d[e+12>>0]|0|0,0,16)|0;ea=ea|B;m=d[e+13>>0]|0;Fc=pc(m|0,0,24)|0;ea=qc(wa|Bc|Ta|Fc|0,ea|B|0,4)|0;Fc=pc(d[e+14>>0]|0|0,0,8)|0;Ta=B;Bc=d[e+15>>0]|0;wa=pc(Bc|0,0,16)|0;Ta=qc(Fc|m|wa|0,Ta|B|0,1)|0;wa=pc(d[e+16>>0]|0|0,0,8)|0;m=B;Fc=pc(d[e+17>>0]|0|0,0,16)|0;m=m|B;ub=d[e+18>>0]|0;yc=pc(ub|0,0,24)|0;m=qc(wa|Bc|Fc|yc|0,m|B|0,6)|0;yc=pc(d[e+19>>0]|0|0,0,8)|0;Fc=B;Bc=pc(d[e+20>>0]|0|0,0,16)|0;Fc=qc(yc|ub|Bc|0,Fc|B|0,3)|0;Bc=B;ub=d[e+21>>0]|0;yc=pc(d[e+22>>0]|0|0,0,8)|0;wa=B;tc=d[e+23>>0]|0;na=pc(tc|0,0,16)|0;W=pc(d[e+24>>0]|0|0,0,8)|0;Ia=B;K=pc(d[e+25>>0]|0|0,0,16)|0;Ia=Ia|B;x=d[e+26>>0]|0;uc=pc(x|0,0,24)|0;Ia=qc(W|tc|K|uc|0,Ia|B|0,5)|0;uc=pc(d[e+27>>0]|0|0,0,8)|0;K=B;tc=d[e+28>>0]|0;W=pc(tc|0,0,16)|0;K=qc(uc|x|W|0,K|B|0,2)|0;W=pc(d[e+29>>0]|0|0,0,8)|0;x=B;uc=pc(d[e+30>>0]|0|0,0,16)|0;x=x|B;Ba=pc(d[e+31>>0]|0|0,0,24)|0;x=qc(W|tc|uc|Ba|0,x|B|0,7)|0;Ba=B;uc=d[f>>0]|0;tc=pc(d[f+1>>0]|0|0,0,8)|0;W=B;y=d[f+2>>0]|0;vc=pc(y|0,0,16)|0;Qa=pc(d[f+3>>0]|0|0,0,8)|0;xa=B;Fa=pc(d[f+4>>0]|0|0,0,16)|0;xa=xa|B;ib=d[f+5>>0]|0;za=pc(ib|0,0,24)|0;xa=qc(Qa|y|Fa|za|0,xa|B|0,5)|0;za=pc(d[f+6>>0]|0|0,0,8)|0;Fa=B;y=d[f+7>>0]|0;Qa=pc(y|0,0,16)|0;Fa=qc(za|ib|Qa|0,Fa|B|0,2)|0;Qa=pc(d[f+8>>0]|0|0,0,8)|0;ib=B;za=pc(d[f+9>>0]|0|0,0,16)|0;ib=ib|B;h=d[f+10>>0]|0;Y=pc(h|0,0,24)|0;ib=qc(Qa|y|za|Y|0,ib|B|0,7)|0;Y=pc(d[f+11>>0]|0|0,0,8)|0;za=B;y=pc(d[f+12>>0]|0|0,0,16)|0;za=za|B;Qa=d[f+13>>0]|0;C=pc(Qa|0,0,24)|0;za=qc(Y|h|y|C|0,za|B|0,4)|0;C=pc(d[f+14>>0]|0|0,0,8)|0;y=B;h=d[f+15>>0]|0;Y=pc(h|0,0,16)|0;y=qc(C|Qa|Y|0,y|B|0,1)|0;Y=pc(d[f+16>>0]|0|0,0,8)|0;Qa=B;C=pc(d[f+17>>0]|0|0,0,16)|0;Qa=Qa|B;sa=d[f+18>>0]|0;H=pc(sa|0,0,24)|0;Qa=qc(Y|h|C|H|0,Qa|B|0,6)|0;H=pc(d[f+19>>0]|0|0,0,8)|0;C=B;h=pc(d[f+20>>0]|0|0,0,16)|0;C=qc(H|sa|h|0,C|B|0,3)|0;h=B;sa=d[f+21>>0]|0;H=pc(d[f+22>>0]|0|0,0,8)|0;Y=B;ma=d[f+23>>0]|0;Z=pc(ma|0,0,16)|0;ua=pc(d[f+24>>0]|0|0,0,8)|0;G=B;N=pc(d[f+25>>0]|0|0,0,16)|0;G=G|B;c=d[f+26>>0]|0;Aa=pc(c|0,0,24)|0;G=qc(ua|ma|N|Aa|0,G|B|0,5)|0;Aa=pc(d[f+27>>0]|0|0,0,8)|0;N=B;ma=d[f+28>>0]|0;ua=pc(ma|0,0,16)|0;N=qc(Aa|c|ua|0,N|B|0,2)|0;ua=pc(d[f+29>>0]|0|0,0,8)|0;c=B;Aa=pc(d[f+30>>0]|0|0,0,16)|0;c=c|B;i=pc(d[f+31>>0]|0|0,0,24)|0;c=qc(ua|ma|Aa|i|0,c|B|0,7)|0;i=B;Aa=jc(eb|rb|aa&2031616|0,ba|0,P|O|db&2031616|0,jb|0)|0;Aa=Cc(tc|uc|vc&2031616|0,W|0,Aa|0,B|0)|0;W=B;vc=jc(Ya&2097151|0,0,P|O|db&2031616|0,jb|0)|0;uc=B;tc=jc(eb|rb|aa&2031616|0,ba|0,qb&2097151|0,0)|0;ma=B;ua=jc(q&2097151|0,0,P|O|db&2031616|0,jb|0)|0;Ea=B;va=jc(Ya&2097151|0,0,qb&2097151|0,0)|0;mc=B;ia=jc(eb|rb|aa&2031616|0,ba|0,A&2097151|0,0)|0;ia=Cc(va|0,mc|0,ia|0,B|0)|0;Ea=Cc(ia|0,B|0,ua|0,Ea|0)|0;Fa=Cc(Ea|0,B|0,Fa&2097151|0,0)|0;Ea=B;ua=jc(p&2097151|0,0,P|O|db&2031616|0,jb|0)|0;ia=B;mc=jc(q&2097151|0,0,qb&2097151|0,0)|0;va=B;sc=jc(Ya&2097151|0,0,A&2097151|0,0)|0;rc=B;oc=jc(eb|rb|aa&2031616|0,ba|0,nb&2097151|0,0)|0;nc=B;Ha=jc(ea&2097151|0,0,P|O|db&2031616|0,jb|0)|0;ya=B;bc=jc(p&2097151|0,0,qb&2097151|0,0)|0;u=B;dc=jc(q&2097151|0,0,A&2097151|0,0)|0;Ga=B;ec=jc(Ya&2097151|0,0,nb&2097151|0,0)|0;fc=B;cc=jc(eb|rb|aa&2031616|0,ba|0,z&2097151|0,0)|0;cc=Cc(ec|0,fc|0,cc|0,B|0)|0;Ga=Cc(cc|0,B|0,dc|0,Ga|0)|0;u=Cc(Ga|0,B|0,bc|0,u|0)|0;ya=Cc(u|0,B|0,Ha|0,ya|0)|0;za=Cc(ya|0,B|0,za&2097151|0,0)|0;ya=B;Ha=jc(Ta&2097151|0,0,P|O|db&2031616|0,jb|0)|0;u=B;bc=jc(ea&2097151|0,0,qb&2097151|0,0)|0;Ga=B;dc=jc(p&2097151|0,0,A&2097151|0,0)|0;cc=B;fc=jc(q&2097151|0,0,nb&2097151|0,0)|0;ec=B;lc=jc(Ya&2097151|0,0,z&2097151|0,0)|0;kc=B;hc=jc(eb|rb|aa&2031616|0,ba|0,j&2097151|0,0)|0;gc=B;X=jc(m&2097151|0,0,P|O|db&2031616|0,jb|0)|0;Ra=B;Qb=jc(Ta&2097151|0,0,qb&2097151|0,0)|0;da=B;Sb=jc(ea&2097151|0,0,A&2097151|0,0)|0;Pb=B;Ub=jc(p&2097151|0,0,nb&2097151|0,0)|0;Rb=B;Wb=jc(q&2097151|0,0,z&2097151|0,0)|0;Tb=B;Xb=jc(Ya&2097151|0,0,j&2097151|0,0)|0;Yb=B;Vb=jc(eb|rb|aa&2031616|0,ba|0,Ma&2097151|0,0)|0;Vb=Cc(Xb|0,Yb|0,Vb|0,B|0)|0;Tb=Cc(Vb|0,B|0,Wb|0,Tb|0)|0;Rb=Cc(Tb|0,B|0,Ub|0,Rb|0)|0;Pb=Cc(Rb|0,B|0,Sb|0,Pb|0)|0;da=Cc(Pb|0,B|0,Qb|0,da|0)|0;Ra=Cc(da|0,B|0,X|0,Ra|0)|0;Qa=Cc(Ra|0,B|0,Qa&2097151|0,0)|0;Ra=B;X=jc(Fc|0,Bc|0,P|O|db&2031616|0,jb|0)|0;da=B;Qb=jc(m&2097151|0,0,qb&2097151|0,0)|0;Pb=B;Sb=jc(Ta&2097151|0,0,A&2097151|0,0)|0;Rb=B;Ub=jc(ea&2097151|0,0,nb&2097151|0,0)|0;Tb=B;Wb=jc(p&2097151|0,0,z&2097151|0,0)|0;Vb=B;Yb=jc(q&2097151|0,0,j&2097151|0,0)|0;Xb=B;ac=jc(Ya&2097151|0,0,Ma&2097151|0,0)|0;$b=B;_b=jc(eb|rb|aa&2031616|0,ba|0,ra|0,ca|0)|0;Zb=B;ta=jc(yc|ub|na&2031616|0,wa|0,P|O|db&2031616|0,jb|0)|0;yb=B;zb=jc(Fc|0,Bc|0,qb&2097151|0,0)|0;Ab=B;Bb=jc(m&2097151|0,0,A&2097151|0,0)|0;Cb=B;Db=jc(Ta&2097151|0,0,nb&2097151|0,0)|0;Eb=B;Fb=jc(ea&2097151|0,0,z&2097151|0,0)|0;Gb=B;Hb=jc(p&2097151|0,0,j&2097151|0,0)|0;Ib=B;Jb=jc(q&2097151|0,0,Ma&2097151|0,0)|0;Kb=B;Mb=jc(Ya&2097151|0,0,ra|0,ca|0)|0;Nb=B;Ob=jc(eb|rb|aa&2031616|0,ba|0,I|Ca|Ja&2031616|0,lb|0)|0;Ob=Cc(Mb|0,Nb|0,Ob|0,B|0)|0;Kb=Cc(Ob|0,B|0,Jb|0,Kb|0)|0;Ib=Cc(Kb|0,B|0,Hb|0,Ib|0)|0;Gb=Cc(Ib|0,B|0,Fb|0,Gb|0)|0;Eb=Cc(Gb|0,B|0,Db|0,Eb|0)|0;Cb=Cc(Eb|0,B|0,Bb|0,Cb|0)|0;Ab=Cc(Cb|0,B|0,zb|0,Ab|0)|0;yb=Cc(Ab|0,B|0,ta|0,yb|0)|0;Y=Cc(yb|0,B|0,H|sa|Z&2031616|0,Y|0)|0;Z=B;sa=jc(Ia&2097151|0,0,P|O|db&2031616|0,jb|0)|0;H=B;yb=jc(yc|ub|na&2031616|0,wa|0,qb&2097151|0,0)|0;ta=B;Ab=jc(Fc|0,Bc|0,A&2097151|0,0)|0;zb=B;Cb=jc(m&2097151|0,0,nb&2097151|0,0)|0;Bb=B;Eb=jc(Ta&2097151|0,0,z&2097151|0,0)|0;Db=B;Gb=jc(ea&2097151|0,0,j&2097151|0,0)|0;Fb=B;Ib=jc(p&2097151|0,0,Ma&2097151|0,0)|0;Hb=B;Kb=jc(q&2097151|0,0,ra|0,ca|0)|0;Jb=B;Ob=jc(Ya&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;Nb=B;Mb=jc(eb|rb|aa&2031616|0,ba|0,La&2097151|0,0)|0;Lb=B;ab=jc(K&2097151|0,0,P|O|db&2031616|0,jb|0)|0;M=B;Q=jc(Ia&2097151|0,0,qb&2097151|0,0)|0;bb=B;ob=jc(yc|ub|na&2031616|0,wa|0,A&2097151|0,0)|0;R=B;J=jc(Fc|0,Bc|0,nb&2097151|0,0)|0;pb=B;Oa=jc(m&2097151|0,0,z&2097151|0,0)|0;D=B;gb=jc(Ta&2097151|0,0,j&2097151|0,0)|0;Pa=B;U=jc(ea&2097151|0,0,Ma&2097151|0,0)|0;hb=B;Wa=jc(p&2097151|0,0,ra|0,ca|0)|0;V=B;xb=jc(q&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;Xa=B;fa=jc(Ya&2097151|0,0,La&2097151|0,0)|0;w=B;wb=jc(eb|rb|aa&2031616|0,ba|0,wc&2097151|0,0)|0;wb=Cc(fa|0,w|0,wb|0,B|0)|0;Xa=Cc(wb|0,B|0,xb|0,Xa|0)|0;V=Cc(Xa|0,B|0,Wa|0,V|0)|0;hb=Cc(V|0,B|0,U|0,hb|0)|0;Pa=Cc(hb|0,B|0,gb|0,Pa|0)|0;D=Cc(Pa|0,B|0,Oa|0,D|0)|0;pb=Cc(D|0,B|0,J|0,pb|0)|0;R=Cc(pb|0,B|0,ob|0,R|0)|0;bb=Cc(R|0,B|0,Q|0,bb|0)|0;M=Cc(bb|0,B|0,ab|0,M|0)|0;N=Cc(M|0,B|0,N&2097151|0,0)|0;M=B;jb=jc(x|0,Ba|0,P|O|db&2031616|0,jb|0)|0;db=B;O=jc(K&2097151|0,0,qb&2097151|0,0)|0;P=B;ab=jc(Ia&2097151|0,0,A&2097151|0,0)|0;bb=B;Q=jc(yc|ub|na&2031616|0,wa|0,nb&2097151|0,0)|0;R=B;ob=jc(Fc|0,Bc|0,z&2097151|0,0)|0;pb=B;J=jc(m&2097151|0,0,j&2097151|0,0)|0;D=B;Oa=jc(Ta&2097151|0,0,Ma&2097151|0,0)|0;Pa=B;gb=jc(ea&2097151|0,0,ra|0,ca|0)|0;hb=B;U=jc(p&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;V=B;Wa=jc(q&2097151|0,0,La&2097151|0,0)|0;Xa=B;xb=jc(Ya&2097151|0,0,wc&2097151|0,0)|0;wb=B;ba=jc(eb|rb|aa&2031616|0,ba|0,o|0,Da|0)|0;aa=B;qb=jc(x|0,Ba|0,qb&2097151|0,0)|0;rb=B;eb=jc(K&2097151|0,0,A&2097151|0,0)|0;w=B;fa=jc(Ia&2097151|0,0,nb&2097151|0,0)|0;fb=B;ha=jc(yc|ub|na&2031616|0,wa|0,z&2097151|0,0)|0;$=B;sb=jc(Fc|0,Bc|0,j&2097151|0,0)|0;kb=B;la=jc(m&2097151|0,0,Ma&2097151|0,0)|0;tb=B;qa=jc(Ta&2097151|0,0,ra|0,ca|0)|0;ka=B;Na=jc(ea&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;pa=B;Za=jc(p&2097151|0,0,La&2097151|0,0)|0;ga=B;mb=jc(q&2097151|0,0,wc&2097151|0,0)|0;v=B;Ya=jc(Ya&2097151|0,0,o|0,Da|0)|0;Ya=Cc(mb|0,v|0,Ya|0,B|0)|0;ga=Cc(Ya|0,B|0,Za|0,ga|0)|0;pa=Cc(ga|0,B|0,Na|0,pa|0)|0;ka=Cc(pa|0,B|0,qa|0,ka|0)|0;tb=Cc(ka|0,B|0,la|0,tb|0)|0;kb=Cc(tb|0,B|0,sb|0,kb|0)|0;$=Cc(kb|0,B|0,ha|0,$|0)|0;fb=Cc($|0,B|0,fa|0,fb|0)|0;w=Cc(fb|0,B|0,eb|0,w|0)|0;rb=Cc(w|0,B|0,qb|0,rb|0)|0;qb=B;A=jc(x|0,Ba|0,A&2097151|0,0)|0;w=B;eb=jc(K&2097151|0,0,nb&2097151|0,0)|0;fb=B;fa=jc(Ia&2097151|0,0,z&2097151|0,0)|0;$=B;ha=jc(yc|ub|na&2031616|0,wa|0,j&2097151|0,0)|0;kb=B;sb=jc(Fc|0,Bc|0,Ma&2097151|0,0)|0;tb=B;la=jc(m&2097151|0,0,ra|0,ca|0)|0;ka=B;qa=jc(Ta&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;pa=B;Na=jc(ea&2097151|0,0,La&2097151|0,0)|0;ga=B;Za=jc(p&2097151|0,0,wc&2097151|0,0)|0;Ya=B;q=jc(q&2097151|0,0,o|0,Da|0)|0;v=B;nb=jc(x|0,Ba|0,nb&2097151|0,0)|0;mb=B;_a=jc(K&2097151|0,0,z&2097151|0,0)|0;r=B;E=jc(Ia&2097151|0,0,j&2097151|0,0)|0;$a=B;n=jc(yc|ub|na&2031616|0,wa|0,Ma&2097151|0,0)|0;t=B;_=jc(Fc|0,Bc|0,ra|0,ca|0)|0;g=B;ja=jc(m&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;s=B;oa=jc(Ta&2097151|0,0,La&2097151|0,0)|0;F=B;vb=jc(ea&2097151|0,0,wc&2097151|0,0)|0;l=B;p=jc(p&2097151|0,0,o|0,Da|0)|0;p=Cc(vb|0,l|0,p|0,B|0)|0;F=Cc(p|0,B|0,oa|0,F|0)|0;s=Cc(F|0,B|0,ja|0,s|0)|0;g=Cc(s|0,B|0,_|0,g|0)|0;t=Cc(g|0,B|0,n|0,t|0)|0;$a=Cc(t|0,B|0,E|0,$a|0)|0;r=Cc($a|0,B|0,_a|0,r|0)|0;mb=Cc(r|0,B|0,nb|0,mb|0)|0;nb=B;z=jc(x|0,Ba|0,z&2097151|0,0)|0;r=B;_a=jc(K&2097151|0,0,j&2097151|0,0)|0;$a=B;E=jc(Ia&2097151|0,0,Ma&2097151|0,0)|0;t=B;n=jc(yc|ub|na&2031616|0,wa|0,ra|0,ca|0)|0;g=B;_=jc(Fc|0,Bc|0,I|Ca|Ja&2031616|0,lb|0)|0;s=B;ja=jc(m&2097151|0,0,La&2097151|0,0)|0;F=B;oa=jc(Ta&2097151|0,0,wc&2097151|0,0)|0;p=B;ea=jc(ea&2097151|0,0,o|0,Da|0)|0;l=B;j=jc(x|0,Ba|0,j&2097151|0,0)|0;vb=B;e=jc(K&2097151|0,0,Ma&2097151|0,0)|0;L=B;T=jc(Ia&2097151|0,0,ra|0,ca|0)|0;Ka=B;Va=jc(yc|ub|na&2031616|0,wa|0,I|Ca|Ja&2031616|0,lb|0)|0;S=B;Sa=jc(Fc|0,Bc|0,La&2097151|0,0)|0;Ua=B;f=jc(m&2097151|0,0,wc&2097151|0,0)|0;k=B;Ta=jc(Ta&2097151|0,0,o|0,Da|0)|0;Ta=Cc(f|0,k|0,Ta|0,B|0)|0;Ua=Cc(Ta|0,B|0,Sa|0,Ua|0)|0;S=Cc(Ua|0,B|0,Va|0,S|0)|0;Ka=Cc(S|0,B|0,T|0,Ka|0)|0;L=Cc(Ka|0,B|0,e|0,L|0)|0;vb=Cc(L|0,B|0,j|0,vb|0)|0;j=B;Ma=jc(x|0,Ba|0,Ma&2097151|0,0)|0;L=B;e=jc(K&2097151|0,0,ra|0,ca|0)|0;Ka=B;T=jc(Ia&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;S=B;Va=jc(yc|ub|na&2031616|0,wa|0,La&2097151|0,0)|0;Ua=B;Sa=jc(Fc|0,Bc|0,wc&2097151|0,0)|0;Ta=B;m=jc(m&2097151|0,0,o|0,Da|0)|0;k=B;ca=jc(x|0,Ba|0,ra|0,ca|0)|0;f=B;ra=jc(K&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;cb=B;zc=jc(Ia&2097151|0,0,La&2097151|0,0)|0;xc=B;Ec=jc(yc|ub|na&2031616|0,wa|0,wc&2097151|0,0)|0;Dc=B;Bc=jc(Fc|0,Bc|0,o|0,Da|0)|0;Bc=Cc(Ec|0,Dc|0,Bc|0,B|0)|0;xc=Cc(Bc|0,B|0,zc|0,xc|0)|0;cb=Cc(xc|0,B|0,ra|0,cb|0)|0;f=Cc(cb|0,B|0,ca|0,f|0)|0;ca=B;lb=jc(x|0,Ba|0,I|Ca|Ja&2031616|0,lb|0)|0;Ja=B;Ca=jc(K&2097151|0,0,La&2097151|0,0)|0;I=B;cb=jc(Ia&2097151|0,0,wc&2097151|0,0)|0;ra=B;wa=jc(yc|ub|na&2031616|0,wa|0,o|0,Da|0)|0;na=B;La=jc(x|0,Ba|0,La&2097151|0,0)|0;ub=B;yc=jc(K&2097151|0,0,wc&2097151|0,0)|0;xc=B;Ia=jc(Ia&2097151|0,0,o|0,Da|0)|0;Ia=Cc(yc|0,xc|0,Ia|0,B|0)|0;ub=Cc(Ia|0,B|0,La|0,ub|0)|0;La=B;wc=jc(x|0,Ba|0,wc&2097151|0,0)|0;Ia=B;K=jc(K&2097151|0,0,o|0,Da|0)|0;K=Cc(wc|0,Ia|0,K|0,B|0)|0;Ia=B;Da=jc(x|0,Ba|0,o|0,Da|0)|0;o=B;Ba=Cc(Aa|0,W|0,1048576,0)|0;Ba=qc(Ba|0,B|0,21)|0;x=B;ma=Cc(vc|0,uc|0,tc|0,ma|0)|0;ma=Cc(ma|0,B|0,Ba|0,x|0)|0;xa=Cc(ma|0,B|0,xa&2097151|0,0)|0;ma=B;x=pc(Ba|0,x|0,21)|0;x=Ac(Aa|0,W|0,x|0,B|0)|0;W=B;Aa=Cc(Fa|0,Ea|0,1048576,0)|0;Aa=qc(Aa|0,B|0,21)|0;Ba=B;nc=Cc(sc|0,rc|0,oc|0,nc|0)|0;va=Cc(nc|0,B|0,mc|0,va|0)|0;ia=Cc(va|0,B|0,ua|0,ia|0)|0;ib=Cc(ia|0,B|0,ib&2097151|0,0)|0;ib=Cc(ib|0,B|0,Aa|0,Ba|0)|0;ia=B;Ba=pc(Aa|0,Ba|0,21)|0;Aa=B;ua=Cc(za|0,ya|0,1048576,0)|0;ua=ic(ua|0,B|0,21)|0;va=B;gc=Cc(lc|0,kc|0,hc|0,gc|0)|0;ec=Cc(gc|0,B|0,fc|0,ec|0)|0;cc=Cc(ec|0,B|0,dc|0,cc|0)|0;Ga=Cc(cc|0,B|0,bc|0,Ga|0)|0;u=Cc(Ga|0,B|0,Ha|0,u|0)|0;y=Cc(u|0,B|0,y&2097151|0,0)|0;y=Cc(y|0,B|0,ua|0,va|0)|0;u=B;va=pc(ua|0,va|0,21)|0;ua=B;Ha=Cc(Qa|0,Ra|0,1048576,0)|0;Ha=ic(Ha|0,B|0,21)|0;Ga=B;Zb=Cc(ac|0,$b|0,_b|0,Zb|0)|0;Xb=Cc(Zb|0,B|0,Yb|0,Xb|0)|0;Vb=Cc(Xb|0,B|0,Wb|0,Vb|0)|0;Tb=Cc(Vb|0,B|0,Ub|0,Tb|0)|0;Rb=Cc(Tb|0,B|0,Sb|0,Rb|0)|0;Pb=Cc(Rb|0,B|0,Qb|0,Pb|0)|0;da=Cc(Pb|0,B|0,X|0,da|0)|0;h=Cc(da|0,B|0,C|0,h|0)|0;h=Cc(h|0,B|0,Ha|0,Ga|0)|0;C=B;Ga=pc(Ha|0,Ga|0,21)|0;Ha=B;da=Cc(Y|0,Z|0,1048576,0)|0;da=ic(da|0,B|0,21)|0;X=B;Lb=Cc(Ob|0,Nb|0,Mb|0,Lb|0)|0;Jb=Cc(Lb|0,B|0,Kb|0,Jb|0)|0;Hb=Cc(Jb|0,B|0,Ib|0,Hb|0)|0;Fb=Cc(Hb|0,B|0,Gb|0,Fb|0)|0;Db=Cc(Fb|0,B|0,Eb|0,Db|0)|0;Bb=Cc(Db|0,B|0,Cb|0,Bb|0)|0;zb=Cc(Bb|0,B|0,Ab|0,zb|0)|0;ta=Cc(zb|0,B|0,yb|0,ta|0)|0;H=Cc(ta|0,B|0,sa|0,H|0)|0;G=Cc(H|0,B|0,G&2097151|0,0)|0;G=Cc(G|0,B|0,da|0,X|0)|0;H=B;X=pc(da|0,X|0,21)|0;da=B;sa=Cc(N|0,M|0,1048576,0)|0;sa=ic(sa|0,B|0,21)|0;ta=B;aa=Cc(xb|0,wb|0,ba|0,aa|0)|0;Xa=Cc(aa|0,B|0,Wa|0,Xa|0)|0;V=Cc(Xa|0,B|0,U|0,V|0)|0;hb=Cc(V|0,B|0,gb|0,hb|0)|0;Pa=Cc(hb|0,B|0,Oa|0,Pa|0)|0;D=Cc(Pa|0,B|0,J|0,D|0)|0;pb=Cc(D|0,B|0,ob|0,pb|0)|0;R=Cc(pb|0,B|0,Q|0,R|0)|0;bb=Cc(R|0,B|0,ab|0,bb|0)|0;P=Cc(bb|0,B|0,O|0,P|0)|0;db=Cc(P|0,B|0,jb|0,db|0)|0;i=Cc(db|0,B|0,c|0,i|0)|0;i=Cc(i|0,B|0,sa|0,ta|0)|0;c=B;ta=pc(sa|0,ta|0,21)|0;sa=B;db=Cc(rb|0,qb|0,1048576,0)|0;db=ic(db|0,B|0,21)|0;jb=B;v=Cc(Za|0,Ya|0,q|0,v|0)|0;ga=Cc(v|0,B|0,Na|0,ga|0)|0;pa=Cc(ga|0,B|0,qa|0,pa|0)|0;ka=Cc(pa|0,B|0,la|0,ka|0)|0;tb=Cc(ka|0,B|0,sb|0,tb|0)|0;kb=Cc(tb|0,B|0,ha|0,kb|0)|0;$=Cc(kb|0,B|0,fa|0,$|0)|0;fb=Cc($|0,B|0,eb|0,fb|0)|0;w=Cc(fb|0,B|0,A|0,w|0)|0;w=Cc(w|0,B|0,db|0,jb|0)|0;A=B;jb=pc(db|0,jb|0,21)|0;db=B;fb=Cc(mb|0,nb|0,1048576,0)|0;fb=ic(fb|0,B|0,21)|0;eb=B;l=Cc(oa|0,p|0,ea|0,l|0)|0;F=Cc(l|0,B|0,ja|0,F|0)|0;s=Cc(F|0,B|0,_|0,s|0)|0;g=Cc(s|0,B|0,n|0,g|0)|0;t=Cc(g|0,B|0,E|0,t|0)|0;$a=Cc(t|0,B|0,_a|0,$a|0)|0;r=Cc($a|0,B|0,z|0,r|0)|0;r=Cc(r|0,B|0,fb|0,eb|0)|0;z=B;eb=pc(fb|0,eb|0,21)|0;fb=B;$a=Cc(vb|0,j|0,1048576,0)|0;$a=ic($a|0,B|0,21)|0;_a=B;k=Cc(Sa|0,Ta|0,m|0,k|0)|0;Ua=Cc(k|0,B|0,Va|0,Ua|0)|0;S=Cc(Ua|0,B|0,T|0,S|0)|0;Ka=Cc(S|0,B|0,e|0,Ka|0)|0;L=Cc(Ka|0,B|0,Ma|0,L|0)|0;L=Cc(L|0,B|0,$a|0,_a|0)|0;Ma=B;_a=pc($a|0,_a|0,21)|0;$a=B;Ka=Cc(f|0,ca|0,1048576,0)|0;Ka=ic(Ka|0,B|0,21)|0;e=B;na=Cc(cb|0,ra|0,wa|0,na|0)|0;I=Cc(na|0,B|0,Ca|0,I|0)|0;Ja=Cc(I|0,B|0,lb|0,Ja|0)|0;Ja=Cc(Ja|0,B|0,Ka|0,e|0)|0;lb=B;e=pc(Ka|0,e|0,21)|0;e=Ac(f|0,ca|0,e|0,B|0)|0;ca=B;f=Cc(ub|0,La|0,1048576,0)|0;f=ic(f|0,B|0,21)|0;Ka=B;Ia=Cc(K|0,Ia|0,f|0,Ka|0)|0;K=B;Ka=pc(f|0,Ka|0,21)|0;Ka=Ac(ub|0,La|0,Ka|0,B|0)|0;La=B;ub=Cc(Da|0,o|0,1048576,0)|0;ub=ic(ub|0,B|0,21)|0;f=B;I=pc(ub|0,f|0,21)|0;I=Ac(Da|0,o|0,I|0,B|0)|0;o=B;Da=Cc(xa|0,ma|0,1048576,0)|0;Da=qc(Da|0,B|0,21)|0;Ca=B;na=pc(Da|0,Ca|0,21)|0;na=Ac(xa|0,ma|0,na|0,B|0)|0;ma=B;xa=Cc(ib|0,ia|0,1048576,0)|0;xa=ic(xa|0,B|0,21)|0;wa=B;ra=pc(xa|0,wa|0,21)|0;ra=Ac(ib|0,ia|0,ra|0,B|0)|0;ia=B;ib=Cc(y|0,u|0,1048576,0)|0;ib=ic(ib|0,B|0,21)|0;cb=B;S=pc(ib|0,cb|0,21)|0;T=B;Ua=Cc(h|0,C|0,1048576,0)|0;Ua=ic(Ua|0,B|0,21)|0;Va=B;k=pc(Ua|0,Va|0,21)|0;m=B;Ta=Cc(G|0,H|0,1048576,0)|0;Ta=ic(Ta|0,B|0,21)|0;Sa=B;t=pc(Ta|0,Sa|0,21)|0;E=B;g=Cc(i|0,c|0,1048576,0)|0;g=ic(g|0,B|0,21)|0;n=B;s=pc(g|0,n|0,21)|0;_=B;F=Cc(w|0,A|0,1048576,0)|0;F=ic(F|0,B|0,21)|0;ja=B;l=pc(F|0,ja|0,21)|0;ea=B;p=Cc(r|0,z|0,1048576,0)|0;p=ic(p|0,B|0,21)|0;oa=B;$=pc(p|0,oa|0,21)|0;fa=B;kb=Cc(L|0,Ma|0,1048576,0)|0;kb=ic(kb|0,B|0,21)|0;ha=B;ca=Cc(kb|0,ha|0,e|0,ca|0)|0;e=B;ha=pc(kb|0,ha|0,21)|0;ha=Ac(L|0,Ma|0,ha|0,B|0)|0;Ma=B;L=Cc(Ja|0,lb|0,1048576,0)|0;L=ic(L|0,B|0,21)|0;kb=B;La=Cc(L|0,kb|0,Ka|0,La|0)|0;Ka=B;kb=pc(L|0,kb|0,21)|0;kb=Ac(Ja|0,lb|0,kb|0,B|0)|0;lb=B;Ja=Cc(Ia|0,K|0,1048576,0)|0;Ja=ic(Ja|0,B|0,21)|0;L=B;o=Cc(Ja|0,L|0,I|0,o|0)|0;I=B;L=pc(Ja|0,L|0,21)|0;L=Ac(Ia|0,K|0,L|0,B|0)|0;K=B;Ia=jc(ub|0,f|0,666643,0)|0;Ja=B;tb=jc(ub|0,f|0,470296,0)|0;sb=B;ka=jc(ub|0,f|0,654183,0)|0;la=B;pa=jc(ub|0,f|0,-997805,-1)|0;qa=B;ga=jc(ub|0,f|0,136657,0)|0;Na=B;f=jc(ub|0,f|0,-683901,-1)|0;f=Cc(vb|0,j|0,f|0,B|0)|0;$a=Ac(f|0,B|0,_a|0,$a|0)|0;oa=Cc($a|0,B|0,p|0,oa|0)|0;p=B;$a=jc(o|0,I|0,666643,0)|0;_a=B;f=jc(o|0,I|0,470296,0)|0;j=B;vb=jc(o|0,I|0,654183,0)|0;ub=B;v=jc(o|0,I|0,-997805,-1)|0;q=B;Ya=jc(o|0,I|0,136657,0)|0;Za=B;I=jc(o|0,I|0,-683901,-1)|0;o=B;P=jc(L|0,K|0,666643,0)|0;O=B;bb=jc(L|0,K|0,470296,0)|0;ab=B;R=jc(L|0,K|0,654183,0)|0;Q=B;pb=jc(L|0,K|0,-997805,-1)|0;ob=B;D=jc(L|0,K|0,136657,0)|0;J=B;K=jc(L|0,K|0,-683901,-1)|0;L=B;qa=Cc(mb|0,nb|0,pa|0,qa|0)|0;Za=Cc(qa|0,B|0,Ya|0,Za|0)|0;L=Cc(Za|0,B|0,K|0,L|0)|0;fb=Ac(L|0,B|0,eb|0,fb|0)|0;ja=Cc(fb|0,B|0,F|0,ja|0)|0;F=B;fb=jc(La|0,Ka|0,666643,0)|0;eb=B;L=jc(La|0,Ka|0,470296,0)|0;K=B;Za=jc(La|0,Ka|0,654183,0)|0;Ya=B;qa=jc(La|0,Ka|0,-997805,-1)|0;pa=B;nb=jc(La|0,Ka|0,136657,0)|0;mb=B;Ka=jc(La|0,Ka|0,-683901,-1)|0;La=B;Pa=jc(kb|0,lb|0,666643,0)|0;Oa=B;hb=jc(kb|0,lb|0,470296,0)|0;gb=B;V=jc(kb|0,lb|0,654183,0)|0;U=B;Xa=jc(kb|0,lb|0,-997805,-1)|0;Wa=B;aa=jc(kb|0,lb|0,136657,0)|0;ba=B;lb=jc(kb|0,lb|0,-683901,-1)|0;kb=B;sb=Cc(vb|0,ub|0,tb|0,sb|0)|0;qb=Cc(sb|0,B|0,rb|0,qb|0)|0;ob=Cc(qb|0,B|0,pb|0,ob|0)|0;mb=Cc(ob|0,B|0,nb|0,mb|0)|0;kb=Cc(mb|0,B|0,lb|0,kb|0)|0;db=Ac(kb|0,B|0,jb|0,db|0)|0;n=Cc(db|0,B|0,g|0,n|0)|0;g=B;db=jc(ca|0,e|0,666643,0)|0;db=Cc(ib|0,cb|0,db|0,B|0)|0;Ra=Cc(db|0,B|0,Qa|0,Ra|0)|0;Ha=Ac(Ra|0,B|0,Ga|0,Ha|0)|0;Ga=B;Ra=jc(ca|0,e|0,470296,0)|0;Qa=B;db=jc(ca|0,e|0,654183,0)|0;cb=B;eb=Cc(hb|0,gb|0,fb|0,eb|0)|0;cb=Cc(eb|0,B|0,db|0,cb|0)|0;Va=Cc(cb|0,B|0,Ua|0,Va|0)|0;Z=Cc(Va|0,B|0,Y|0,Z|0)|0;da=Ac(Z|0,B|0,X|0,da|0)|0;X=B;Z=jc(ca|0,e|0,-997805,-1)|0;Y=B;Va=jc(ca|0,e|0,136657,0)|0;Ua=B;_a=Cc(bb|0,ab|0,$a|0,_a|0)|0;Ya=Cc(_a|0,B|0,Za|0,Ya|0)|0;Wa=Cc(Ya|0,B|0,Xa|0,Wa|0)|0;Ua=Cc(Wa|0,B|0,Va|0,Ua|0)|0;Sa=Cc(Ua|0,B|0,Ta|0,Sa|0)|0;M=Cc(Sa|0,B|0,N|0,M|0)|0;sa=Ac(M|0,B|0,ta|0,sa|0)|0;ta=B;e=jc(ca|0,e|0,-683901,-1)|0;ca=B;M=Cc(Ha|0,Ga|0,1048576,0)|0;M=ic(M|0,B|0,21)|0;N=B;Oa=Cc(Ra|0,Qa|0,Pa|0,Oa|0)|0;C=Cc(Oa|0,B|0,h|0,C|0)|0;m=Ac(C|0,B|0,k|0,m|0)|0;m=Cc(m|0,B|0,M|0,N|0)|0;k=B;N=pc(M|0,N|0,21)|0;M=B;C=Cc(da|0,X|0,1048576,0)|0;C=ic(C|0,B|0,21)|0;h=B;O=Cc(L|0,K|0,P|0,O|0)|0;U=Cc(O|0,B|0,V|0,U|0)|0;Y=Cc(U|0,B|0,Z|0,Y|0)|0;H=Cc(Y|0,B|0,G|0,H|0)|0;E=Ac(H|0,B|0,t|0,E|0)|0;E=Cc(E|0,B|0,C|0,h|0)|0;t=B;h=pc(C|0,h|0,21)|0;C=B;H=Cc(sa|0,ta|0,1048576,0)|0;H=ic(H|0,B|0,21)|0;G=B;Ja=Cc(f|0,j|0,Ia|0,Ja|0)|0;Q=Cc(Ja|0,B|0,R|0,Q|0)|0;pa=Cc(Q|0,B|0,qa|0,pa|0)|0;ba=Cc(pa|0,B|0,aa|0,ba|0)|0;ca=Cc(ba|0,B|0,e|0,ca|0)|0;c=Cc(ca|0,B|0,i|0,c|0)|0;_=Ac(c|0,B|0,s|0,_|0)|0;_=Cc(_|0,B|0,H|0,G|0)|0;s=B;G=pc(H|0,G|0,21)|0;H=B;c=Cc(n|0,g|0,1048576,0)|0;c=ic(c|0,B|0,21)|0;i=B;la=Cc(v|0,q|0,ka|0,la|0)|0;J=Cc(la|0,B|0,D|0,J|0)|0;La=Cc(J|0,B|0,Ka|0,La|0)|0;A=Cc(La|0,B|0,w|0,A|0)|0;ea=Ac(A|0,B|0,l|0,ea|0)|0;ea=Cc(ea|0,B|0,c|0,i|0)|0;l=B;i=pc(c|0,i|0,21)|0;i=Ac(n|0,g|0,i|0,B|0)|0;g=B;n=Cc(ja|0,F|0,1048576,0)|0;n=ic(n|0,B|0,21)|0;c=B;Na=Cc(I|0,o|0,ga|0,Na|0)|0;z=Cc(Na|0,B|0,r|0,z|0)|0;fa=Ac(z|0,B|0,$|0,fa|0)|0;fa=Cc(fa|0,B|0,n|0,c|0)|0;$=B;c=pc(n|0,c|0,21)|0;c=Ac(ja|0,F|0,c|0,B|0)|0;F=B;ja=Cc(oa|0,p|0,1048576,0)|0;ja=ic(ja|0,B|0,21)|0;n=B;Ma=Cc(ja|0,n|0,ha|0,Ma|0)|0;ha=B;n=pc(ja|0,n|0,21)|0;n=Ac(oa|0,p|0,n|0,B|0)|0;p=B;oa=Cc(m|0,k|0,1048576,0)|0;oa=ic(oa|0,B|0,21)|0;ja=B;z=pc(oa|0,ja|0,21)|0;r=B;Na=Cc(E|0,t|0,1048576,0)|0;Na=ic(Na|0,B|0,21)|0;ga=B;o=pc(Na|0,ga|0,21)|0;I=B;A=Cc(_|0,s|0,1048576,0)|0;A=ic(A|0,B|0,21)|0;w=B;g=Cc(A|0,w|0,i|0,g|0)|0;i=B;w=pc(A|0,w|0,21)|0;w=Ac(_|0,s|0,w|0,B|0)|0;s=B;_=Cc(ea|0,l|0,1048576,0)|0;_=ic(_|0,B|0,21)|0;A=B;F=Cc(_|0,A|0,c|0,F|0)|0;c=B;A=pc(_|0,A|0,21)|0;A=Ac(ea|0,l|0,A|0,B|0)|0;l=B;ea=Cc(fa|0,$|0,1048576,0)|0;ea=ic(ea|0,B|0,21)|0;_=B;p=Cc(ea|0,_|0,n|0,p|0)|0;n=B;_=pc(ea|0,_|0,21)|0;_=Ac(fa|0,$|0,_|0,B|0)|0;$=B;fa=jc(Ma|0,ha|0,666643,0)|0;ea=B;La=jc(Ma|0,ha|0,470296,0)|0;Ka=B;J=jc(Ma|0,ha|0,654183,0)|0;D=B;la=jc(Ma|0,ha|0,-997805,-1)|0;ka=B;q=jc(Ma|0,ha|0,136657,0)|0;v=B;ha=jc(Ma|0,ha|0,-683901,-1)|0;ha=Cc(Na|0,ga|0,ha|0,B|0)|0;ta=Cc(ha|0,B|0,sa|0,ta|0)|0;H=Ac(ta|0,B|0,G|0,H|0)|0;G=B;ta=jc(p|0,n|0,666643,0)|0;sa=B;ha=jc(p|0,n|0,470296,0)|0;ga=B;Na=jc(p|0,n|0,654183,0)|0;Ma=B;ca=jc(p|0,n|0,-997805,-1)|0;e=B;ba=jc(p|0,n|0,136657,0)|0;aa=B;n=jc(p|0,n|0,-683901,-1)|0;p=B;pa=jc(_|0,$|0,666643,0)|0;pa=Cc(ra|0,ia|0,pa|0,B|0)|0;ia=B;ra=jc(_|0,$|0,470296,0)|0;qa=B;Q=jc(_|0,$|0,654183,0)|0;R=B;Ja=jc(_|0,$|0,-997805,-1)|0;Ia=B;j=jc(_|0,$|0,136657,0)|0;f=B;$=jc(_|0,$|0,-683901,-1)|0;_=B;ka=Cc(ba|0,aa|0,la|0,ka|0)|0;_=Cc(ka|0,B|0,$|0,_|0)|0;ja=Cc(_|0,B|0,oa|0,ja|0)|0;X=Cc(ja|0,B|0,da|0,X|0)|0;C=Ac(X|0,B|0,h|0,C|0)|0;h=B;X=jc(F|0,c|0,666643,0)|0;da=B;ja=jc(F|0,c|0,470296,0)|0;ja=Cc(pa|0,ia|0,ja|0,B|0)|0;ia=B;pa=jc(F|0,c|0,654183,0)|0;oa=B;_=jc(F|0,c|0,-997805,-1)|0;$=B;ka=jc(F|0,c|0,136657,0)|0;la=B;c=jc(F|0,c|0,-683901,-1)|0;F=B;aa=jc(A|0,l|0,666643,0)|0;ba=B;Y=jc(A|0,l|0,470296,0)|0;Z=B;U=jc(A|0,l|0,654183,0)|0;V=B;O=jc(A|0,l|0,-997805,-1)|0;P=B;K=jc(A|0,l|0,136657,0)|0;L=B;l=jc(A|0,l|0,-683901,-1)|0;A=B;Ka=Cc(Na|0,Ma|0,La|0,Ka|0)|0;Ia=Cc(Ka|0,B|0,Ja|0,Ia|0)|0;Ga=Cc(Ia|0,B|0,Ha|0,Ga|0)|0;M=Ac(Ga|0,B|0,N|0,M|0)|0;la=Cc(M|0,B|0,ka|0,la|0)|0;A=Cc(la|0,B|0,l|0,A|0)|0;l=B;la=jc(g|0,i|0,666643,0)|0;W=Cc(la|0,B|0,x|0,W|0)|0;x=B;la=jc(g|0,i|0,470296,0)|0;ka=B;M=jc(g|0,i|0,654183,0)|0;N=B;Ca=Cc(Fa|0,Ea|0,Da|0,Ca|0)|0;Aa=Ac(Ca|0,B|0,Ba|0,Aa|0)|0;da=Cc(Aa|0,B|0,X|0,da|0)|0;N=Cc(da|0,B|0,M|0,N|0)|0;Z=Cc(N|0,B|0,Y|0,Z|0)|0;Y=B;N=jc(g|0,i|0,-997805,-1)|0;M=B;da=jc(g|0,i|0,136657,0)|0;X=B;wa=Cc(za|0,ya|0,xa|0,wa|0)|0;ua=Ac(wa|0,B|0,va|0,ua|0)|0;sa=Cc(ua|0,B|0,ta|0,sa|0)|0;qa=Cc(sa|0,B|0,ra|0,qa|0)|0;oa=Cc(qa|0,B|0,pa|0,oa|0)|0;X=Cc(oa|0,B|0,da|0,X|0)|0;P=Cc(X|0,B|0,O|0,P|0)|0;O=B;i=jc(g|0,i|0,-683901,-1)|0;g=B;X=Cc(W|0,x|0,1048576,0)|0;X=ic(X|0,B|0,21)|0;da=B;ka=Cc(na|0,ma|0,la|0,ka|0)|0;ba=Cc(ka|0,B|0,aa|0,ba|0)|0;ba=Cc(ba|0,B|0,X|0,da|0)|0;aa=B;da=pc(X|0,da|0,21)|0;da=Ac(W|0,x|0,da|0,B|0)|0;x=B;W=Cc(Z|0,Y|0,1048576,0)|0;W=ic(W|0,B|0,21)|0;X=B;M=Cc(ja|0,ia|0,N|0,M|0)|0;V=Cc(M|0,B|0,U|0,V|0)|0;V=Cc(V|0,B|0,W|0,X|0)|0;U=B;X=pc(W|0,X|0,21)|0;W=B;M=Cc(P|0,O|0,1048576,0)|0;M=ic(M|0,B|0,21)|0;N=B;ea=Cc(ha|0,ga|0,fa|0,ea|0)|0;u=Cc(ea|0,B|0,y|0,u|0)|0;R=Cc(u|0,B|0,Q|0,R|0)|0;T=Ac(R|0,B|0,S|0,T|0)|0;$=Cc(T|0,B|0,_|0,$|0)|0;g=Cc($|0,B|0,i|0,g|0)|0;L=Cc(g|0,B|0,K|0,L|0)|0;L=Cc(L|0,B|0,M|0,N|0)|0;K=B;N=pc(M|0,N|0,21)|0;M=B;g=Cc(A|0,l|0,1048576,0)|0;g=ic(g|0,B|0,21)|0;i=B;D=Cc(ca|0,e|0,J|0,D|0)|0;f=Cc(D|0,B|0,j|0,f|0)|0;k=Cc(f|0,B|0,m|0,k|0)|0;r=Ac(k|0,B|0,z|0,r|0)|0;F=Cc(r|0,B|0,c|0,F|0)|0;F=Cc(F|0,B|0,g|0,i|0)|0;c=B;i=pc(g|0,i|0,21)|0;i=Ac(A|0,l|0,i|0,B|0)|0;l=B;A=Cc(C|0,h|0,1048576,0)|0;A=ic(A|0,B|0,21)|0;g=B;v=Cc(n|0,p|0,q|0,v|0)|0;t=Cc(v|0,B|0,E|0,t|0)|0;I=Ac(t|0,B|0,o|0,I|0)|0;I=Cc(I|0,B|0,A|0,g|0)|0;o=B;g=pc(A|0,g|0,21)|0;g=Ac(C|0,h|0,g|0,B|0)|0;h=B;C=Cc(H|0,G|0,1048576,0)|0;C=ic(C|0,B|0,21)|0;A=B;s=Cc(w|0,s|0,C|0,A|0)|0;w=B;A=pc(C|0,A|0,21)|0;C=B;t=Cc(ba|0,aa|0,1048576,0)|0;t=ic(t|0,B|0,21)|0;E=B;v=pc(t|0,E|0,21)|0;q=B;p=Cc(V|0,U|0,1048576,0)|0;p=ic(p|0,B|0,21)|0;n=B;r=pc(p|0,n|0,21)|0;z=B;k=Cc(L|0,K|0,1048576,0)|0;k=ic(k|0,B|0,21)|0;m=B;l=Cc(i|0,l|0,k|0,m|0)|0;i=B;m=pc(k|0,m|0,21)|0;k=B;f=Cc(F|0,c|0,1048576,0)|0;f=ic(f|0,B|0,21)|0;j=B;h=Cc(g|0,h|0,f|0,j|0)|0;g=B;j=pc(f|0,j|0,21)|0;j=Ac(F|0,c|0,j|0,B|0)|0;c=B;F=Cc(I|0,o|0,1048576,0)|0;F=ic(F|0,B|0,21)|0;f=B;D=pc(F|0,f|0,21)|0;D=Ac(I|0,o|0,D|0,B|0)|0;o=B;I=Cc(s|0,w|0,1048576,0)|0;I=ic(I|0,B|0,21)|0;J=B;e=pc(I|0,J|0,21)|0;e=Ac(s|0,w|0,e|0,B|0)|0;w=B;s=jc(I|0,J|0,666643,0)|0;s=Cc(da|0,x|0,s|0,B|0)|0;x=B;da=jc(I|0,J|0,470296,0)|0;ca=B;$=jc(I|0,J|0,654183,0)|0;_=B;T=jc(I|0,J|0,-997805,-1)|0;S=B;R=jc(I|0,J|0,136657,0)|0;Q=B;J=jc(I|0,J|0,-683901,-1)|0;I=B;u=ic(s|0,x|0,21)|0;y=B;aa=Cc(da|0,ca|0,ba|0,aa|0)|0;q=Ac(aa|0,B|0,v|0,q|0)|0;q=Cc(q|0,B|0,u|0,y|0)|0;v=B;y=pc(u|0,y|0,21)|0;y=Ac(s|0,x|0,y|0,B|0)|0;x=B;s=ic(q|0,v|0,21)|0;u=B;Y=Cc($|0,_|0,Z|0,Y|0)|0;W=Ac(Y|0,B|0,X|0,W|0)|0;E=Cc(W|0,B|0,t|0,E|0)|0;E=Cc(E|0,B|0,s|0,u|0)|0;t=B;u=pc(s|0,u|0,21)|0;u=Ac(q|0,v|0,u|0,B|0)|0;v=B;q=ic(E|0,t|0,21)|0;s=B;S=Cc(V|0,U|0,T|0,S|0)|0;z=Ac(S|0,B|0,r|0,z|0)|0;z=Cc(z|0,B|0,q|0,s|0)|0;r=B;s=pc(q|0,s|0,21)|0;s=Ac(E|0,t|0,s|0,B|0)|0;t=B;E=ic(z|0,r|0,21)|0;q=B;O=Cc(R|0,Q|0,P|0,O|0)|0;M=Ac(O|0,B|0,N|0,M|0)|0;n=Cc(M|0,B|0,p|0,n|0)|0;n=Cc(n|0,B|0,E|0,q|0)|0;p=B;q=pc(E|0,q|0,21)|0;q=Ac(z|0,r|0,q|0,B|0)|0;r=B;z=ic(n|0,p|0,21)|0;E=B;I=Cc(L|0,K|0,J|0,I|0)|0;k=Ac(I|0,B|0,m|0,k|0)|0;k=Cc(k|0,B|0,z|0,E|0)|0;m=B;E=pc(z|0,E|0,21)|0;E=Ac(n|0,p|0,E|0,B|0)|0;p=B;n=ic(k|0,m|0,21)|0;z=B;i=Cc(l|0,i|0,n|0,z|0)|0;l=B;z=pc(n|0,z|0,21)|0;z=Ac(k|0,m|0,z|0,B|0)|0;m=B;k=ic(i|0,l|0,21)|0;n=B;c=Cc(k|0,n|0,j|0,c|0)|0;j=B;n=pc(k|0,n|0,21)|0;n=Ac(i|0,l|0,n|0,B|0)|0;l=B;i=ic(c|0,j|0,21)|0;k=B;g=Cc(h|0,g|0,i|0,k|0)|0;h=B;k=pc(i|0,k|0,21)|0;k=Ac(c|0,j|0,k|0,B|0)|0;j=B;c=ic(g|0,h|0,21)|0;i=B;o=Cc(c|0,i|0,D|0,o|0)|0;D=B;i=pc(c|0,i|0,21)|0;i=Ac(g|0,h|0,i|0,B|0)|0;h=B;g=ic(o|0,D|0,21)|0;c=B;f=Cc(H|0,G|0,F|0,f|0)|0;C=Ac(f|0,B|0,A|0,C|0)|0;C=Cc(C|0,B|0,g|0,c|0)|0;A=B;c=pc(g|0,c|0,21)|0;c=Ac(o|0,D|0,c|0,B|0)|0;D=B;o=ic(C|0,A|0,21)|0;g=B;w=Cc(o|0,g|0,e|0,w|0)|0;e=B;g=pc(o|0,g|0,21)|0;g=Ac(C|0,A|0,g|0,B|0)|0;A=B;C=ic(w|0,e|0,21)|0;o=B;f=pc(C|0,o|0,21)|0;f=Ac(w|0,e|0,f|0,B|0)|0;e=B;w=jc(C|0,o|0,666643,0)|0;x=Cc(w|0,B|0,y|0,x|0)|0;y=B;w=jc(C|0,o|0,470296,0)|0;w=Cc(u|0,v|0,w|0,B|0)|0;v=B;u=jc(C|0,o|0,654183,0)|0;u=Cc(s|0,t|0,u|0,B|0)|0;t=B;s=jc(C|0,o|0,-997805,-1)|0;s=Cc(q|0,r|0,s|0,B|0)|0;r=B;q=jc(C|0,o|0,136657,0)|0;q=Cc(E|0,p|0,q|0,B|0)|0;p=B;o=jc(C|0,o|0,-683901,-1)|0;o=Cc(z|0,m|0,o|0,B|0)|0;m=B;z=ic(x|0,y|0,21)|0;C=B;v=Cc(w|0,v|0,z|0,C|0)|0;w=B;C=pc(z|0,C|0,21)|0;C=Ac(x|0,y|0,C|0,B|0)|0;y=B;x=ic(v|0,w|0,21)|0;z=B;t=Cc(u|0,t|0,x|0,z|0)|0;u=B;z=pc(x|0,z|0,21)|0;z=Ac(v|0,w|0,z|0,B|0)|0;w=B;v=ic(t|0,u|0,21)|0;x=B;r=Cc(s|0,r|0,v|0,x|0)|0;s=B;x=pc(v|0,x|0,21)|0;x=Ac(t|0,u|0,x|0,B|0)|0;u=B;t=ic(r|0,s|0,21)|0;v=B;p=Cc(q|0,p|0,t|0,v|0)|0;q=B;v=pc(t|0,v|0,21)|0;v=Ac(r|0,s|0,v|0,B|0)|0;s=B;r=ic(p|0,q|0,21)|0;t=B;m=Cc(o|0,m|0,r|0,t|0)|0;o=B;t=pc(r|0,t|0,21)|0;t=Ac(p|0,q|0,t|0,B|0)|0;q=B;p=ic(m|0,o|0,21)|0;r=B;l=Cc(p|0,r|0,n|0,l|0)|0;n=B;r=pc(p|0,r|0,21)|0;r=Ac(m|0,o|0,r|0,B|0)|0;o=B;m=ic(l|0,n|0,21)|0;p=B;j=Cc(m|0,p|0,k|0,j|0)|0;k=B;p=pc(m|0,p|0,21)|0;p=Ac(l|0,n|0,p|0,B|0)|0;n=B;l=ic(j|0,k|0,21)|0;m=B;h=Cc(l|0,m|0,i|0,h|0)|0;i=B;m=pc(l|0,m|0,21)|0;m=Ac(j|0,k|0,m|0,B|0)|0;k=B;j=ic(h|0,i|0,21)|0;l=B;D=Cc(j|0,l|0,c|0,D|0)|0;c=B;l=pc(j|0,l|0,21)|0;l=Ac(h|0,i|0,l|0,B|0)|0;i=B;h=ic(D|0,c|0,21)|0;j=B;A=Cc(h|0,j|0,g|0,A|0)|0;g=B;j=pc(h|0,j|0,21)|0;j=Ac(D|0,c|0,j|0,B|0)|0;c=B;D=ic(A|0,g|0,21)|0;h=B;e=Cc(D|0,h|0,f|0,e|0)|0;f=B;h=pc(D|0,h|0,21)|0;h=Ac(A|0,g|0,h|0,B|0)|0;g=B;a[b>>0]=C;A=qc(C|0,y|0,8)|0;a[b+1>>0]=A;y=qc(C|0,y|0,16)|0;C=B;A=pc(z|0,w|0,5)|0;a[b+2>>0]=A|y;y=qc(z|0,w|0,3)|0;a[b+3>>0]=y;y=qc(z|0,w|0,11)|0;a[b+4>>0]=y;w=qc(z|0,w|0,19)|0;z=B;y=pc(x|0,u|0,2)|0;a[b+5>>0]=y|w;w=qc(x|0,u|0,6)|0;a[b+6>>0]=w;u=qc(x|0,u|0,14)|0;x=B;w=pc(v|0,s|0,7)|0;a[b+7>>0]=w|u;u=qc(v|0,s|0,1)|0;a[b+8>>0]=u;u=qc(v|0,s|0,9)|0;a[b+9>>0]=u;s=qc(v|0,s|0,17)|0;v=B;u=pc(t|0,q|0,4)|0;a[b+10>>0]=u|s;s=qc(t|0,q|0,4)|0;a[b+11>>0]=s;s=qc(t|0,q|0,12)|0;a[b+12>>0]=s;q=qc(t|0,q|0,20)|0;t=B;s=pc(r|0,o|0,1)|0;a[b+13>>0]=s|q;q=qc(r|0,o|0,7)|0;a[b+14>>0]=q;o=qc(r|0,o|0,15)|0;r=B;q=pc(p|0,n|0,6)|0;a[b+15>>0]=q|o;o=qc(p|0,n|0,2)|0;a[b+16>>0]=o;o=qc(p|0,n|0,10)|0;a[b+17>>0]=o;n=qc(p|0,n|0,18)|0;p=B;o=pc(m|0,k|0,3)|0;a[b+18>>0]=o|n;n=qc(m|0,k|0,5)|0;a[b+19>>0]=n;k=qc(m|0,k|0,13)|0;a[b+20>>0]=k;a[b+21>>0]=l;k=qc(l|0,i|0,8)|0;a[b+22>>0]=k;i=qc(l|0,i|0,16)|0;l=B;k=pc(j|0,c|0,5)|0;a[b+23>>0]=k|i;i=qc(j|0,c|0,3)|0;a[b+24>>0]=i;i=qc(j|0,c|0,11)|0;a[b+25>>0]=i;c=qc(j|0,c|0,19)|0;j=B;i=pc(h|0,g|0,2)|0;a[b+26>>0]=i|c;c=qc(h|0,g|0,6)|0;a[b+27>>0]=c;g=qc(h|0,g|0,14)|0;h=B;c=pc(e|0,f|0,7)|0;a[b+28>>0]=g|c;c=qc(e|0,f|0,1)|0;a[b+29>>0]=c;c=qc(e|0,f|0,9)|0;a[b+30>>0]=c;f=qc(e|0,f|0,17)|0;a[b+31>>0]=f;return}function fa(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;G=i;o=i=i+63&-64;i=i+16|0;do if(a>>>0<245){p=a>>>0<11?16:a+11&-8;g=c[8398]|0;if(g>>>(p>>>3)&3|0){a=33632+((g>>>(p>>>3)&1^1)+(p>>>3)<<1<<2)|0;b=c[a+8>>2]|0;d=c[b+8>>2]|0;do if((a|0)!=(d|0)){if(d>>>0<(c[8402]|0)>>>0)X();if((c[d+12>>2]|0)==(b|0)){c[d+12>>2]=a;c[a+8>>2]=d;break}else X()}else c[8398]=g&~(1<<(g>>>(p>>>3)&1^1)+(p>>>3));while(0);F=(g>>>(p>>>3)&1^1)+(p>>>3)<<3;c[b+4>>2]=F|3;c[b+F+4>>2]=c[b+F+4>>2]|1;F=b+8|0;i=G;return F|0}b=c[8400]|0;if(p>>>0>b>>>0){if(g>>>(p>>>3)|0){a=g>>>(p>>>3)<<(p>>>3)&(2<<(p>>>3)|0-(2<<(p>>>3)));f=((a&0-a)+-1|0)>>>(((a&0-a)+-1|0)>>>12&16);e=f>>>(f>>>5&8)>>>(f>>>(f>>>5&8)>>>2&4);e=(f>>>5&8|((a&0-a)+-1|0)>>>12&16|f>>>(f>>>5&8)>>>2&4|e>>>1&2|e>>>(e>>>1&2)>>>1&1)+(e>>>(e>>>1&2)>>>(e>>>(e>>>1&2)>>>1&1))|0;f=c[33632+(e<<1<<2)+8>>2]|0;a=c[f+8>>2]|0;do if((33632+(e<<1<<2)|0)!=(a|0)){if(a>>>0<(c[8402]|0)>>>0)X();if((c[a+12>>2]|0)==(f|0)){c[a+12>>2]=33632+(e<<1<<2);c[33632+(e<<1<<2)+8>>2]=a;h=c[8400]|0;break}else X()}else{c[8398]=g&~(1<<e);h=b}while(0);c[f+4>>2]=p|3;c[f+p+4>>2]=(e<<3)-p|1;c[f+p+((e<<3)-p)>>2]=(e<<3)-p;if(h|0){d=c[8403]|0;b=h>>>3;a=c[8398]|0;if(a&1<<b){a=c[33632+(b<<1<<2)+8>>2]|0;if(a>>>0<(c[8402]|0)>>>0)X();else{j=33632+(b<<1<<2)+8|0;k=a}}else{c[8398]=a|1<<b;j=33632+(b<<1<<2)+8|0;k=33632+(b<<1<<2)|0}c[j>>2]=d;c[k+12>>2]=d;c[d+8>>2]=k;c[d+12>>2]=33632+(b<<1<<2)}c[8400]=(e<<3)-p;c[8403]=f+p;F=f+8|0;i=G;return F|0}a=c[8399]|0;if(a){j=((a&0-a)+-1|0)>>>(((a&0-a)+-1|0)>>>12&16);k=j>>>(j>>>5&8)>>>(j>>>(j>>>5&8)>>>2&4);k=c[33896+((j>>>5&8|((a&0-a)+-1|0)>>>12&16|j>>>(j>>>5&8)>>>2&4|k>>>1&2|k>>>(k>>>1&2)>>>1&1)+(k>>>(k>>>1&2)>>>(k>>>(k>>>1&2)>>>1&1))<<2)>>2]|0;j=(c[k+4>>2]&-8)-p|0;b=k;while(1){a=c[b+16>>2]|0;if(!a){a=c[b+20>>2]|0;if(!a)break}b=(c[a+4>>2]&-8)-p|0;F=b>>>0<j>>>0;j=F?b:j;b=a;k=F?a:k}f=c[8402]|0;if(k>>>0<f>>>0)X();h=k+p|0;if(k>>>0>=h>>>0)X();g=c[k+24>>2]|0;a=c[k+12>>2]|0;do if((a|0)==(k|0)){b=k+20|0;a=c[b>>2]|0;if(!a){b=k+16|0;a=c[b>>2]|0;if(!a){l=0;break}}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}if(b>>>0<f>>>0)X();else{c[b>>2]=0;l=a;break}}else{b=c[k+8>>2]|0;if(b>>>0<f>>>0)X();if((c[b+12>>2]|0)!=(k|0))X();if((c[a+8>>2]|0)==(k|0)){c[b+12>>2]=a;c[a+8>>2]=b;l=a;break}else X()}while(0);do if(g|0){a=c[k+28>>2]|0;if((k|0)==(c[33896+(a<<2)>>2]|0)){c[33896+(a<<2)>>2]=l;if(!l){c[8399]=c[8399]&~(1<<a);break}}else{if(g>>>0<(c[8402]|0)>>>0)X();if((c[g+16>>2]|0)==(k|0))c[g+16>>2]=l;else c[g+20>>2]=l;if(!l)break}b=c[8402]|0;if(l>>>0<b>>>0)X();c[l+24>>2]=g;a=c[k+16>>2]|0;do if(a|0)if(a>>>0<b>>>0)X();else{c[l+16>>2]=a;c[a+24>>2]=l;break}while(0);a=c[k+20>>2]|0;if(a|0)if(a>>>0<(c[8402]|0)>>>0)X();else{c[l+20>>2]=a;c[a+24>>2]=l;break}}while(0);if(j>>>0<16){F=j+p|0;c[k+4>>2]=F|3;F=k+F+4|0;c[F>>2]=c[F>>2]|1}else{c[k+4>>2]=p|3;c[h+4>>2]=j|1;c[h+j>>2]=j;b=c[8400]|0;if(b|0){d=c[8403]|0;a=c[8398]|0;if(a&1<<(b>>>3)){a=c[33632+(b>>>3<<1<<2)+8>>2]|0;if(a>>>0<(c[8402]|0)>>>0)X();else{m=33632+(b>>>3<<1<<2)+8|0;n=a}}else{c[8398]=a|1<<(b>>>3);m=33632+(b>>>3<<1<<2)+8|0;n=33632+(b>>>3<<1<<2)|0}c[m>>2]=d;c[n+12>>2]=d;c[d+8>>2]=n;c[d+12>>2]=33632+(b>>>3<<1<<2)}c[8400]=j;c[8403]=h}F=k+8|0;i=G;return F|0}}}else if(a>>>0<=4294967231){p=a+11&-8;j=c[8399]|0;if(j){if((a+11|0)>>>8)if(p>>>0>16777215)h=31;else{h=(a+11|0)>>>8<<((((a+11|0)>>>8)+1048320|0)>>>16&8);h=14-((h+520192|0)>>>16&4|(((a+11|0)>>>8)+1048320|0)>>>16&8|((h<<((h+520192|0)>>>16&4))+245760|0)>>>16&2)+(h<<((h+520192|0)>>>16&4)<<(((h<<((h+520192|0)>>>16&4))+245760|0)>>>16&2)>>>15)|0;h=p>>>(h+7|0)&1|h<<1}else h=0;b=c[33896+(h<<2)>>2]|0;a:do if(!b){d=0-p|0;a=0;b=0;y=86}else{d=0-p|0;a=0;f=p<<((h|0)==31?0:25-(h>>>1)|0);g=b;b=0;while(1){e=c[g+4>>2]&-8;if((e-p|0)>>>0<d>>>0)if((e|0)==(p|0)){d=e-p|0;a=g;b=g;y=90;break a}else{d=e-p|0;b=g}e=c[g+20>>2]|0;g=c[g+16+(f>>>31<<2)>>2]|0;a=(e|0)==0|(e|0)==(g|0)?a:e;e=(g|0)==0;if(e){y=86;break}else f=f<<(e&1^1)}}while(0);if((y|0)==86){if((a|0)==0&(b|0)==0){a=2<<h;if(!(j&(a|0-a)))break;m=(j&(a|0-a)&0-(j&(a|0-a)))+-1|0;n=m>>>(m>>>12&16)>>>(m>>>(m>>>12&16)>>>5&8);a=n>>>(n>>>2&4)>>>(n>>>(n>>>2&4)>>>1&2);a=c[33896+((m>>>(m>>>12&16)>>>5&8|m>>>12&16|n>>>2&4|n>>>(n>>>2&4)>>>1&2|a>>>1&1)+(a>>>(a>>>1&1))<<2)>>2]|0}if(!a){j=d;k=b}else y=90}if((y|0)==90)while(1){y=0;n=(c[a+4>>2]&-8)-p|0;e=n>>>0<d>>>0;d=e?n:d;b=e?a:b;e=c[a+16>>2]|0;if(e|0){a=e;y=90;continue}a=c[a+20>>2]|0;if(!a){j=d;k=b;break}else y=90}if((k|0)!=0?j>>>0<((c[8400]|0)-p|0)>>>0:0){f=c[8402]|0;if(k>>>0<f>>>0)X();h=k+p|0;if(k>>>0>=h>>>0)X();g=c[k+24>>2]|0;a=c[k+12>>2]|0;do if((a|0)==(k|0)){b=k+20|0;a=c[b>>2]|0;if(!a){b=k+16|0;a=c[b>>2]|0;if(!a){r=0;break}}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}if(b>>>0<f>>>0)X();else{c[b>>2]=0;r=a;break}}else{b=c[k+8>>2]|0;if(b>>>0<f>>>0)X();if((c[b+12>>2]|0)!=(k|0))X();if((c[a+8>>2]|0)==(k|0)){c[b+12>>2]=a;c[a+8>>2]=b;r=a;break}else X()}while(0);do if(g|0){a=c[k+28>>2]|0;if((k|0)==(c[33896+(a<<2)>>2]|0)){c[33896+(a<<2)>>2]=r;if(!r){c[8399]=c[8399]&~(1<<a);break}}else{if(g>>>0<(c[8402]|0)>>>0)X();if((c[g+16>>2]|0)==(k|0))c[g+16>>2]=r;else c[g+20>>2]=r;if(!r)break}b=c[8402]|0;if(r>>>0<b>>>0)X();c[r+24>>2]=g;a=c[k+16>>2]|0;do if(a|0)if(a>>>0<b>>>0)X();else{c[r+16>>2]=a;c[a+24>>2]=r;break}while(0);a=c[k+20>>2]|0;if(a|0)if(a>>>0<(c[8402]|0)>>>0)X();else{c[r+20>>2]=a;c[a+24>>2]=r;break}}while(0);do if(j>>>0>=16){c[k+4>>2]=p|3;c[h+4>>2]=j|1;c[h+j>>2]=j;b=j>>>3;if(j>>>0<256){a=c[8398]|0;if(a&1<<b){a=c[33632+(b<<1<<2)+8>>2]|0;if(a>>>0<(c[8402]|0)>>>0)X();else{s=33632+(b<<1<<2)+8|0;t=a}}else{c[8398]=a|1<<b;s=33632+(b<<1<<2)+8|0;t=33632+(b<<1<<2)|0}c[s>>2]=h;c[t+12>>2]=h;c[h+8>>2]=t;c[h+12>>2]=33632+(b<<1<<2);break}a=j>>>8;if(a)if(j>>>0>16777215)d=31;else{d=a<<((a+1048320|0)>>>16&8)<<(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4);d=14-(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4|(a+1048320|0)>>>16&8|(d+245760|0)>>>16&2)+(d<<((d+245760|0)>>>16&2)>>>15)|0;d=j>>>(d+7|0)&1|d<<1}else d=0;e=33896+(d<<2)|0;c[h+28>>2]=d;c[h+16+4>>2]=0;c[h+16>>2]=0;a=c[8399]|0;b=1<<d;if(!(a&b)){c[8399]=a|b;c[e>>2]=h;c[h+24>>2]=e;c[h+12>>2]=h;c[h+8>>2]=h;break}d=j<<((d|0)==31?0:25-(d>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(j|0)){y=148;break}b=e+16+(d>>>31<<2)|0;a=c[b>>2]|0;if(!a){y=145;break}else{d=d<<1;e=a}}if((y|0)==145)if(b>>>0<(c[8402]|0)>>>0)X();else{c[b>>2]=h;c[h+24>>2]=e;c[h+12>>2]=h;c[h+8>>2]=h;break}else if((y|0)==148){a=e+8|0;b=c[a>>2]|0;F=c[8402]|0;if(b>>>0>=F>>>0&e>>>0>=F>>>0){c[b+12>>2]=h;c[a>>2]=h;c[h+8>>2]=b;c[h+12>>2]=e;c[h+24>>2]=0;break}else X()}}else{F=j+p|0;c[k+4>>2]=F|3;F=k+F+4|0;c[F>>2]=c[F>>2]|1}while(0);F=k+8|0;i=G;return F|0}}}else p=-1;while(0);d=c[8400]|0;if(d>>>0>=p>>>0){a=d-p|0;b=c[8403]|0;if(a>>>0>15){F=b+p|0;c[8403]=F;c[8400]=a;c[F+4>>2]=a|1;c[F+a>>2]=a;c[b+4>>2]=p|3}else{c[8400]=0;c[8403]=0;c[b+4>>2]=d|3;c[b+d+4>>2]=c[b+d+4>>2]|1}F=b+8|0;i=G;return F|0}a=c[8401]|0;if(a>>>0>p>>>0){D=a-p|0;c[8401]=D;F=c[8404]|0;E=F+p|0;c[8404]=E;c[E+4>>2]=D|1;c[F+4>>2]=p|3;F=F+8|0;i=G;return F|0}if(!(c[8516]|0)){c[8518]=4096;c[8517]=4096;c[8519]=-1;c[8520]=-1;c[8521]=0;c[8509]=0;c[o>>2]=o&-16^1431655768;c[8516]=o&-16^1431655768}f=p+48|0;d=c[8518]|0;g=p+47|0;h=d+g&0-d;if(h>>>0<=p>>>0){F=0;i=G;return F|0}a=c[8508]|0;if(a|0?(t=c[8506]|0,(t+h|0)>>>0<=t>>>0|(t+h|0)>>>0>a>>>0):0){F=0;i=G;return F|0}b:do if(!(c[8509]&4)){b=c[8404]|0;c:do if(b){e=34040;while(1){a=c[e>>2]|0;if(a>>>0<=b>>>0?(q=e+4|0,(a+(c[q>>2]|0)|0)>>>0>b>>>0):0)break;a=c[e+8>>2]|0;if(!a){y=171;break c}else e=a}a=d+g-(c[8401]|0)&0-d;if(a>>>0<2147483647){b=Z(a|0)|0;if((b|0)==((c[e>>2]|0)+(c[q>>2]|0)|0)){if((b|0)!=(-1|0)){h=b;g=a;y=191;break b}}else y=181}}else y=171;while(0);do if((y|0)==171?(u=Z(0)|0,(u|0)!=(-1|0)):0){a=c[8517]|0;if(!(a+-1&u))a=h;else a=h-u+(a+-1+u&0-a)|0;b=c[8506]|0;d=b+a|0;if(a>>>0>p>>>0&a>>>0<2147483647){t=c[8508]|0;if(t|0?d>>>0<=b>>>0|d>>>0>t>>>0:0)break;b=Z(a|0)|0;if((b|0)==(u|0)){h=u;g=a;y=191;break b}else y=181}}while(0);d:do if((y|0)==181){d=0-a|0;do if(f>>>0>a>>>0&(a>>>0<2147483647&(b|0)!=(-1|0))?(v=c[8518]|0,v=g-a+v&0-v,v>>>0<2147483647):0)if((Z(v|0)|0)==(-1|0)){Z(d|0)|0;break d}else{a=v+a|0;break}while(0);if((b|0)!=(-1|0)){h=b;g=a;y=191;break b}}while(0);c[8509]=c[8509]|4;y=188}else y=188;while(0);if((((y|0)==188?h>>>0<2147483647:0)?(w=Z(h|0)|0,x=Z(0)|0,w>>>0<x>>>0&((w|0)!=(-1|0)&(x|0)!=(-1|0))):0)?(x-w|0)>>>0>(p+40|0)>>>0:0){h=w;g=x-w|0;y=191}if((y|0)==191){a=(c[8506]|0)+g|0;c[8506]=a;if(a>>>0>(c[8507]|0)>>>0)c[8507]=a;l=c[8404]|0;do if(l){f=34040;while(1){a=c[f>>2]|0;b=f+4|0;d=c[b>>2]|0;if((h|0)==(a+d|0)){y=201;break}e=c[f+8>>2]|0;if(!e)break;else f=e}if(((y|0)==201?(c[f+12>>2]&8|0)==0:0)?l>>>0<h>>>0&l>>>0>=a>>>0:0){c[b>>2]=d+g;E=(l+8&7|0)==0?0:0-(l+8)&7;F=g-E+(c[8401]|0)|0;c[8404]=l+E;c[8401]=F;c[l+E+4>>2]=F|1;c[l+E+F+4>>2]=40;c[8405]=c[8520];break}a=c[8402]|0;if(h>>>0<a>>>0){c[8402]=h;k=h}else k=a;b=h+g|0;a=34040;while(1){if((c[a>>2]|0)==(b|0)){y=209;break}a=c[a+8>>2]|0;if(!a){b=34040;break}}if((y|0)==209)if(!(c[a+12>>2]&8)){c[a>>2]=h;n=a+4|0;c[n>>2]=(c[n>>2]|0)+g;n=h+8|0;n=h+((n&7|0)==0?0:0-n&7)|0;a=b+((b+8&7|0)==0?0:0-(b+8)&7)|0;m=n+p|0;j=a-n-p|0;c[n+4>>2]=p|3;do if((a|0)!=(l|0)){if((a|0)==(c[8403]|0)){F=(c[8400]|0)+j|0;c[8400]=F;c[8403]=m;c[m+4>>2]=F|1;c[m+F>>2]=F;break}h=c[a+4>>2]|0;if((h&3|0)==1){e:do if(h>>>0>=256){g=c[a+24>>2]|0;b=c[a+12>>2]|0;do if((b|0)==(a|0)){b=c[a+16+4>>2]|0;if(!b){b=c[a+16>>2]|0;if(!b){D=0;break}else f=a+16|0}else f=a+16+4|0;while(1){d=b+20|0;e=c[d>>2]|0;if(e|0){b=e;f=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;f=d}}if(f>>>0<k>>>0)X();else{c[f>>2]=0;D=b;break}}else{d=c[a+8>>2]|0;if(d>>>0<k>>>0)X();if((c[d+12>>2]|0)!=(a|0))X();if((c[b+8>>2]|0)==(a|0)){c[d+12>>2]=b;c[b+8>>2]=d;D=b;break}else X()}while(0);if(!g)break;b=c[a+28>>2]|0;do if((a|0)!=(c[33896+(b<<2)>>2]|0)){if(g>>>0<(c[8402]|0)>>>0)X();if((c[g+16>>2]|0)==(a|0))c[g+16>>2]=D;else c[g+20>>2]=D;if(!D)break e}else{c[33896+(b<<2)>>2]=D;if(D|0)break;c[8399]=c[8399]&~(1<<b);break e}while(0);d=c[8402]|0;if(D>>>0<d>>>0)X();c[D+24>>2]=g;b=c[a+16>>2]|0;do if(b|0)if(b>>>0<d>>>0)X();else{c[D+16>>2]=b;c[b+24>>2]=D;break}while(0);b=c[a+16+4>>2]|0;if(!b)break;if(b>>>0<(c[8402]|0)>>>0)X();else{c[D+20>>2]=b;c[b+24>>2]=D;break}}else{b=c[a+8>>2]|0;d=c[a+12>>2]|0;do if((b|0)!=(33632+(h>>>3<<1<<2)|0)){if(b>>>0<k>>>0)X();if((c[b+12>>2]|0)==(a|0))break;X()}while(0);if((d|0)==(b|0)){c[8398]=c[8398]&~(1<<(h>>>3));break}do if((d|0)==(33632+(h>>>3<<1<<2)|0))B=d+8|0;else{if(d>>>0<k>>>0)X();if((c[d+8>>2]|0)==(a|0)){B=d+8|0;break}X()}while(0);c[b+12>>2]=d;c[B>>2]=b}while(0);a=a+(h&-8)|0;f=(h&-8)+j|0}else f=j;b=a+4|0;c[b>>2]=c[b>>2]&-2;c[m+4>>2]=f|1;c[m+f>>2]=f;b=f>>>3;if(f>>>0<256){a=c[8398]|0;do if(!(a&1<<b)){c[8398]=a|1<<b;E=33632+(b<<1<<2)+8|0;F=33632+(b<<1<<2)|0}else{a=c[33632+(b<<1<<2)+8>>2]|0;if(a>>>0>=(c[8402]|0)>>>0){E=33632+(b<<1<<2)+8|0;F=a;break}X()}while(0);c[E>>2]=m;c[F+12>>2]=m;c[m+8>>2]=F;c[m+12>>2]=33632+(b<<1<<2);break}a=f>>>8;do if(!a)d=0;else{if(f>>>0>16777215){d=31;break}d=a<<((a+1048320|0)>>>16&8)<<(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4);d=14-(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4|(a+1048320|0)>>>16&8|(d+245760|0)>>>16&2)+(d<<((d+245760|0)>>>16&2)>>>15)|0;d=f>>>(d+7|0)&1|d<<1}while(0);e=33896+(d<<2)|0;c[m+28>>2]=d;c[m+16+4>>2]=0;c[m+16>>2]=0;a=c[8399]|0;b=1<<d;if(!(a&b)){c[8399]=a|b;c[e>>2]=m;c[m+24>>2]=e;c[m+12>>2]=m;c[m+8>>2]=m;break}d=f<<((d|0)==31?0:25-(d>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f|0)){y=279;break}b=e+16+(d>>>31<<2)|0;a=c[b>>2]|0;if(!a){y=276;break}else{d=d<<1;e=a}}if((y|0)==276)if(b>>>0<(c[8402]|0)>>>0)X();else{c[b>>2]=m;c[m+24>>2]=e;c[m+12>>2]=m;c[m+8>>2]=m;break}else if((y|0)==279){a=e+8|0;b=c[a>>2]|0;F=c[8402]|0;if(b>>>0>=F>>>0&e>>>0>=F>>>0){c[b+12>>2]=m;c[a>>2]=m;c[m+8>>2]=b;c[m+12>>2]=e;c[m+24>>2]=0;break}else X()}}else{F=(c[8401]|0)+j|0;c[8401]=F;c[8404]=m;c[m+4>>2]=F|1}while(0);F=n+8|0;i=G;return F|0}else b=34040;while(1){a=c[b>>2]|0;if(a>>>0<=l>>>0?(z=a+(c[b+4>>2]|0)|0,z>>>0>l>>>0):0)break;b=c[b+8>>2]|0}f=z+-47+((z+-47+8&7|0)==0?0:0-(z+-47+8)&7)|0;f=f>>>0<(l+16|0)>>>0?l:f;a=h+8|0;a=(a&7|0)==0?0:0-a&7;F=h+a|0;a=g+-40-a|0;c[8404]=F;c[8401]=a;c[F+4>>2]=a|1;c[F+a+4>>2]=40;c[8405]=c[8520];c[f+4>>2]=27;c[f+8>>2]=c[8510];c[f+8+4>>2]=c[8511];c[f+8+8>>2]=c[8512];c[f+8+12>>2]=c[8513];c[8510]=h;c[8511]=g;c[8513]=0;c[8512]=f+8;a=f+24|0;do{a=a+4|0;c[a>>2]=7}while((a+4|0)>>>0<z>>>0);if((f|0)!=(l|0)){c[f+4>>2]=c[f+4>>2]&-2;c[l+4>>2]=f-l|1;c[f>>2]=f-l;if((f-l|0)>>>0<256){b=33632+((f-l|0)>>>3<<1<<2)|0;a=c[8398]|0;if(a&1<<((f-l|0)>>>3)){a=c[b+8>>2]|0;if(a>>>0<(c[8402]|0)>>>0)X();else{A=b+8|0;C=a}}else{c[8398]=a|1<<((f-l|0)>>>3);A=b+8|0;C=b}c[A>>2]=l;c[C+12>>2]=l;c[l+8>>2]=C;c[l+12>>2]=b;break}if((f-l|0)>>>8)if((f-l|0)>>>0>16777215)d=31;else{d=(f-l|0)>>>8<<((((f-l|0)>>>8)+1048320|0)>>>16&8);d=14-((d+520192|0)>>>16&4|(((f-l|0)>>>8)+1048320|0)>>>16&8|((d<<((d+520192|0)>>>16&4))+245760|0)>>>16&2)+(d<<((d+520192|0)>>>16&4)<<(((d<<((d+520192|0)>>>16&4))+245760|0)>>>16&2)>>>15)|0;d=(f-l|0)>>>(d+7|0)&1|d<<1}else d=0;e=33896+(d<<2)|0;c[l+28>>2]=d;c[l+20>>2]=0;c[l+16>>2]=0;a=c[8399]|0;b=1<<d;if(!(a&b)){c[8399]=a|b;c[e>>2]=l;c[l+24>>2]=e;c[l+12>>2]=l;c[l+8>>2]=l;break}d=f-l<<((d|0)==31?0:25-(d>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f-l|0)){y=305;break}b=e+16+(d>>>31<<2)|0;a=c[b>>2]|0;if(!a){y=302;break}else{d=d<<1;e=a}}if((y|0)==302)if(b>>>0<(c[8402]|0)>>>0)X();else{c[b>>2]=l;c[l+24>>2]=e;c[l+12>>2]=l;c[l+8>>2]=l;break}else if((y|0)==305){a=e+8|0;b=c[a>>2]|0;F=c[8402]|0;if(b>>>0>=F>>>0&e>>>0>=F>>>0){c[b+12>>2]=l;c[a>>2]=l;c[l+8>>2]=b;c[l+12>>2]=e;c[l+24>>2]=0;break}else X()}}}else{F=c[8402]|0;if((F|0)==0|h>>>0<F>>>0)c[8402]=h;c[8510]=h;c[8511]=g;c[8513]=0;c[8407]=c[8516];c[8406]=-1;a=0;do{F=33632+(a<<1<<2)|0;c[F+12>>2]=F;c[F+8>>2]=F;a=a+1|0}while((a|0)!=32);F=h+8|0;F=(F&7|0)==0?0:0-F&7;E=h+F|0;F=g+-40-F|0;c[8404]=E;c[8401]=F;c[E+4>>2]=F|1;c[E+F+4>>2]=40;c[8405]=c[8520]}while(0);a=c[8401]|0;if(a>>>0>p>>>0){D=a-p|0;c[8401]=D;F=c[8404]|0;E=F+p|0;c[8404]=E;c[E+4>>2]=D|1;c[F+4>>2]=p|3;F=F+8|0;i=G;return F|0}}c[(Mc()|0)>>2]=12;F=0;i=G;return F|0}function ga(b){b=b|0;var c=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0;e=d[b>>0]|0;j=pc(d[b+1>>0]|0|0,0,8)|0;S=B;_=d[b+2>>0]|0;x=pc(_|0,0,16)|0;Z=pc(d[b+3>>0]|0|0,0,8)|0;D=B;Y=pc(d[b+4>>0]|0|0,0,16)|0;D=D|B;m=d[b+5>>0]|0;n=pc(m|0,0,24)|0;D=qc(Z|_|Y|n|0,D|B|0,5)|0;n=pc(d[b+6>>0]|0|0,0,8)|0;Y=B;_=d[b+7>>0]|0;Z=pc(_|0,0,16)|0;Y=qc(n|m|Z|0,Y|B|0,2)|0;Z=pc(d[b+8>>0]|0|0,0,8)|0;m=B;n=pc(d[b+9>>0]|0|0,0,16)|0;m=m|B;na=d[b+10>>0]|0;va=pc(na|0,0,24)|0;m=qc(Z|_|n|va|0,m|B|0,7)|0;va=pc(d[b+11>>0]|0|0,0,8)|0;n=B;_=pc(d[b+12>>0]|0|0,0,16)|0;n=n|B;Z=d[b+13>>0]|0;oa=pc(Z|0,0,24)|0;n=qc(va|na|_|oa|0,n|B|0,4)|0;oa=pc(d[b+14>>0]|0|0,0,8)|0;_=B;na=d[b+15>>0]|0;va=pc(na|0,0,16)|0;_=qc(oa|Z|va|0,_|B|0,1)|0;va=pc(d[b+16>>0]|0|0,0,8)|0;Z=B;oa=pc(d[b+17>>0]|0|0,0,16)|0;Z=Z|B;xa=d[b+18>>0]|0;ya=pc(xa|0,0,24)|0;Z=qc(va|na|oa|ya|0,Z|B|0,6)|0;ya=pc(d[b+19>>0]|0|0,0,8)|0;oa=B;na=pc(d[b+20>>0]|0|0,0,16)|0;oa=qc(ya|xa|na|0,oa|B|0,3)|0;na=B;xa=d[b+21>>0]|0;ya=pc(d[b+22>>0]|0|0,0,8)|0;va=B;N=d[b+23>>0]|0;wa=pc(N|0,0,16)|0;U=pc(d[b+24>>0]|0|0,0,8)|0;ka=B;ua=pc(d[b+25>>0]|0|0,0,16)|0;ka=ka|B;fa=d[b+26>>0]|0;Ca=pc(fa|0,0,24)|0;ka=qc(U|N|ua|Ca|0,ka|B|0,5)|0;Ca=pc(d[b+27>>0]|0|0,0,8)|0;ua=B;N=d[b+28>>0]|0;U=pc(N|0,0,16)|0;ua=qc(Ca|fa|U|0,ua|B|0,2)|0;U=pc(d[b+29>>0]|0|0,0,8)|0;fa=B;Ca=pc(d[b+30>>0]|0|0,0,16)|0;fa=fa|B;A=d[b+31>>0]|0;g=pc(A|0,0,24)|0;fa=qc(U|N|Ca|g|0,fa|B|0,7)|0;g=pc(d[b+32>>0]|0|0,0,8)|0;Ca=B;N=pc(d[b+33>>0]|0|0,0,16)|0;Ca=Ca|B;U=d[b+34>>0]|0;I=pc(U|0,0,24)|0;Ca=qc(g|A|N|I|0,Ca|B|0,4)|0;I=pc(d[b+35>>0]|0|0,0,8)|0;N=B;A=d[b+36>>0]|0;g=pc(A|0,0,16)|0;N=qc(I|U|g|0,N|B|0,1)|0;g=pc(d[b+37>>0]|0|0,0,8)|0;U=B;I=pc(d[b+38>>0]|0|0,0,16)|0;U=U|B;K=d[b+39>>0]|0;L=pc(K|0,0,24)|0;U=qc(g|A|I|L|0,U|B|0,6)|0;L=pc(d[b+40>>0]|0|0,0,8)|0;I=B;A=pc(d[b+41>>0]|0|0,0,16)|0;I=qc(L|K|A|0,I|B|0,3)|0;A=B;K=d[b+42>>0]|0;L=pc(d[b+43>>0]|0|0,0,8)|0;g=B;X=d[b+44>>0]|0;W=pc(X|0,0,16)|0;G=pc(d[b+45>>0]|0|0,0,8)|0;t=B;ha=pc(d[b+46>>0]|0|0,0,16)|0;t=t|B;Da=d[b+47>>0]|0;u=pc(Da|0,0,24)|0;t=qc(G|X|ha|u|0,t|B|0,5)|0;u=pc(d[b+48>>0]|0|0,0,8)|0;ha=B;X=d[b+49>>0]|0;G=pc(X|0,0,16)|0;ha=qc(u|Da|G|0,ha|B|0,2)|0;G=pc(d[b+50>>0]|0|0,0,8)|0;Da=B;u=pc(d[b+51>>0]|0|0,0,16)|0;Da=Da|B;s=d[b+52>>0]|0;q=pc(s|0,0,24)|0;Da=qc(G|X|u|q|0,Da|B|0,7)|0;q=pc(d[b+53>>0]|0|0,0,8)|0;u=B;X=pc(d[b+54>>0]|0|0,0,16)|0;u=u|B;G=d[b+55>>0]|0;f=pc(G|0,0,24)|0;u=qc(q|s|X|f|0,u|B|0,4)|0;f=pc(d[b+56>>0]|0|0,0,8)|0;X=B;s=d[b+57>>0]|0;q=pc(s|0,0,16)|0;X=qc(f|G|q|0,X|B|0,1)|0;q=pc(d[b+58>>0]|0|0,0,8)|0;G=B;f=pc(d[b+59>>0]|0|0,0,16)|0;G=G|B;E=d[b+60>>0]|0;v=pc(E|0,0,24)|0;G=qc(q|s|f|v|0,G|B|0,6)|0;v=pc(d[b+61>>0]|0|0,0,8)|0;f=B;s=pc(d[b+62>>0]|0|0,0,16)|0;f=f|B;q=pc(d[b+63>>0]|0|0,0,24)|0;f=qc(v|E|s|q|0,f|B|0,3)|0;q=B;s=jc(f|0,q|0,666643,0)|0;E=B;v=jc(f|0,q|0,470296,0)|0;o=B;C=jc(f|0,q|0,654183,0)|0;Q=B;$=jc(f|0,q|0,-997805,-1)|0;i=B;h=jc(f|0,q|0,136657,0)|0;p=B;q=jc(f|0,q|0,-683901,-1)|0;g=Cc(q|0,B|0,L|K|W&2031616|0,g|0)|0;W=B;K=jc(G&2097151|0,0,666643,0)|0;L=B;q=jc(G&2097151|0,0,470296,0)|0;f=B;qa=jc(G&2097151|0,0,654183,0)|0;l=B;J=jc(G&2097151|0,0,-997805,-1)|0;w=B;V=jc(G&2097151|0,0,136657,0)|0;P=B;G=jc(G&2097151|0,0,-683901,-1)|0;r=B;c=jc(X&2097151|0,0,666643,0)|0;O=B;T=jc(X&2097151|0,0,470296,0)|0;ga=B;aa=jc(X&2097151|0,0,654183,0)|0;y=B;za=jc(X&2097151|0,0,-997805,-1)|0;pa=B;H=jc(X&2097151|0,0,136657,0)|0;k=B;X=jc(X&2097151|0,0,-683901,-1)|0;U=Cc(X|0,B|0,U&2097151|0,0)|0;P=Cc(U|0,B|0,V|0,P|0)|0;i=Cc(P|0,B|0,$|0,i|0)|0;$=B;P=jc(u&2097151|0,0,666643,0)|0;V=B;U=jc(u&2097151|0,0,470296,0)|0;X=B;ra=jc(u&2097151|0,0,654183,0)|0;z=B;ca=jc(u&2097151|0,0,-997805,-1)|0;ba=B;Ba=jc(u&2097151|0,0,136657,0)|0;Aa=B;u=jc(u&2097151|0,0,-683901,-1)|0;M=B;F=jc(Da&2097151|0,0,666643,0)|0;R=B;la=jc(Da&2097151|0,0,470296,0)|0;ma=B;ja=jc(Da&2097151|0,0,654183,0)|0;ia=B;ta=jc(Da&2097151|0,0,-997805,-1)|0;sa=B;ea=jc(Da&2097151|0,0,136657,0)|0;da=B;Da=jc(Da&2097151|0,0,-683901,-1)|0;Ca=Cc(Da|0,B|0,Ca&2097151|0,0)|0;Aa=Cc(Ca|0,B|0,Ba|0,Aa|0)|0;pa=Cc(Aa|0,B|0,za|0,pa|0)|0;l=Cc(pa|0,B|0,qa|0,l|0)|0;o=Cc(l|0,B|0,v|0,o|0)|0;v=B;l=jc(ha&2097151|0,0,666643,0)|0;Z=Cc(l|0,B|0,Z&2097151|0,0)|0;l=B;qa=jc(ha&2097151|0,0,470296,0)|0;pa=B;za=jc(ha&2097151|0,0,654183,0)|0;va=Cc(za|0,B|0,ya|xa|wa&2031616|0,va|0)|0;ma=Cc(va|0,B|0,la|0,ma|0)|0;V=Cc(ma|0,B|0,P|0,V|0)|0;P=B;ma=jc(ha&2097151|0,0,-997805,-1)|0;la=B;va=jc(ha&2097151|0,0,136657,0)|0;ua=Cc(va|0,B|0,ua&2097151|0,0)|0;sa=Cc(ua|0,B|0,ta|0,sa|0)|0;z=Cc(sa|0,B|0,ra|0,z|0)|0;ga=Cc(z|0,B|0,T|0,ga|0)|0;L=Cc(ga|0,B|0,K|0,L|0)|0;K=B;ha=jc(ha&2097151|0,0,-683901,-1)|0;ga=B;T=Cc(Z|0,l|0,1048576,0)|0;T=qc(T|0,B|0,21)|0;z=B;na=Cc(qa|0,pa|0,oa|0,na|0)|0;na=Cc(na|0,B|0,T|0,z|0)|0;R=Cc(na|0,B|0,F|0,R|0)|0;F=B;z=pc(T|0,z|0,21)|0;z=Ac(Z|0,l|0,z|0,B|0)|0;l=B;Z=Cc(V|0,P|0,1048576,0)|0;Z=qc(Z|0,B|0,21)|0;T=B;ka=Cc(ma|0,la|0,ka&2097151|0,0)|0;ia=Cc(ka|0,B|0,ja|0,ia|0)|0;X=Cc(ia|0,B|0,U|0,X|0)|0;O=Cc(X|0,B|0,c|0,O|0)|0;O=Cc(O|0,B|0,Z|0,T|0)|0;c=B;T=pc(Z|0,T|0,21)|0;Z=B;X=Cc(L|0,K|0,1048576,0)|0;X=ic(X|0,B|0,21)|0;U=B;fa=Cc(ha|0,ga|0,fa&2097151|0,0)|0;da=Cc(fa|0,B|0,ea|0,da|0)|0;ba=Cc(da|0,B|0,ca|0,ba|0)|0;y=Cc(ba|0,B|0,aa|0,y|0)|0;f=Cc(y|0,B|0,q|0,f|0)|0;E=Cc(f|0,B|0,s|0,E|0)|0;E=Cc(E|0,B|0,X|0,U|0)|0;s=B;U=pc(X|0,U|0,21)|0;X=B;f=Cc(o|0,v|0,1048576,0)|0;f=ic(f|0,B|0,21)|0;q=B;N=Cc(u|0,M|0,N&2097151|0,0)|0;k=Cc(N|0,B|0,H|0,k|0)|0;w=Cc(k|0,B|0,J|0,w|0)|0;Q=Cc(w|0,B|0,C|0,Q|0)|0;Q=Cc(Q|0,B|0,f|0,q|0)|0;C=B;q=pc(f|0,q|0,21)|0;q=Ac(o|0,v|0,q|0,B|0)|0;v=B;o=Cc(i|0,$|0,1048576,0)|0;o=ic(o|0,B|0,21)|0;f=B;A=Cc(G|0,r|0,I|0,A|0)|0;p=Cc(A|0,B|0,h|0,p|0)|0;p=Cc(p|0,B|0,o|0,f|0)|0;h=B;f=pc(o|0,f|0,21)|0;f=Ac(i|0,$|0,f|0,B|0)|0;$=B;i=Cc(g|0,W|0,1048576,0)|0;i=ic(i|0,B|0,21)|0;o=B;t=Cc(i|0,o|0,t&2097151|0,0)|0;A=B;o=pc(i|0,o|0,21)|0;o=Ac(g|0,W|0,o|0,B|0)|0;W=B;g=Cc(R|0,F|0,1048576,0)|0;g=qc(g|0,B|0,21)|0;i=B;I=pc(g|0,i|0,21)|0;I=Ac(R|0,F|0,I|0,B|0)|0;F=B;R=Cc(O|0,c|0,1048576,0)|0;R=ic(R|0,B|0,21)|0;r=B;G=pc(R|0,r|0,21)|0;G=Ac(O|0,c|0,G|0,B|0)|0;c=B;O=Cc(E|0,s|0,1048576,0)|0;O=ic(O|0,B|0,21)|0;w=B;v=Cc(q|0,v|0,O|0,w|0)|0;q=B;w=pc(O|0,w|0,21)|0;w=Ac(E|0,s|0,w|0,B|0)|0;s=B;E=Cc(Q|0,C|0,1048576,0)|0;E=ic(E|0,B|0,21)|0;O=B;$=Cc(E|0,O|0,f|0,$|0)|0;f=B;O=pc(E|0,O|0,21)|0;O=Ac(Q|0,C|0,O|0,B|0)|0;C=B;Q=Cc(p|0,h|0,1048576,0)|0;Q=ic(Q|0,B|0,21)|0;E=B;W=Cc(Q|0,E|0,o|0,W|0)|0;o=B;E=pc(Q|0,E|0,21)|0;E=Ac(p|0,h|0,E|0,B|0)|0;h=B;p=jc(t|0,A|0,666643,0)|0;_=Cc(p|0,B|0,_&2097151|0,0)|0;p=B;Q=jc(t|0,A|0,470296,0)|0;Q=Cc(z|0,l|0,Q|0,B|0)|0;l=B;z=jc(t|0,A|0,654183,0)|0;z=Cc(I|0,F|0,z|0,B|0)|0;F=B;I=jc(t|0,A|0,-997805,-1)|0;J=B;k=jc(t|0,A|0,136657,0)|0;k=Cc(G|0,c|0,k|0,B|0)|0;c=B;A=jc(t|0,A|0,-683901,-1)|0;t=B;r=Cc(L|0,K|0,R|0,r|0)|0;X=Ac(r|0,B|0,U|0,X|0)|0;t=Cc(X|0,B|0,A|0,t|0)|0;A=B;X=jc(W|0,o|0,666643,0)|0;n=Cc(X|0,B|0,n&2097151|0,0)|0;X=B;U=jc(W|0,o|0,470296,0)|0;U=Cc(_|0,p|0,U|0,B|0)|0;p=B;_=jc(W|0,o|0,654183,0)|0;_=Cc(Q|0,l|0,_|0,B|0)|0;l=B;Q=jc(W|0,o|0,-997805,-1)|0;Q=Cc(z|0,F|0,Q|0,B|0)|0;F=B;z=jc(W|0,o|0,136657,0)|0;r=B;o=jc(W|0,o|0,-683901,-1)|0;o=Cc(k|0,c|0,o|0,B|0)|0;c=B;k=jc(E|0,h|0,666643,0)|0;m=Cc(k|0,B|0,m&2097151|0,0)|0;k=B;W=jc(E|0,h|0,470296,0)|0;W=Cc(n|0,X|0,W|0,B|0)|0;X=B;n=jc(E|0,h|0,654183,0)|0;n=Cc(U|0,p|0,n|0,B|0)|0;p=B;U=jc(E|0,h|0,-997805,-1)|0;U=Cc(_|0,l|0,U|0,B|0)|0;l=B;_=jc(E|0,h|0,136657,0)|0;_=Cc(Q|0,F|0,_|0,B|0)|0;F=B;h=jc(E|0,h|0,-683901,-1)|0;E=B;i=Cc(V|0,P|0,g|0,i|0)|0;Z=Ac(i|0,B|0,T|0,Z|0)|0;J=Cc(Z|0,B|0,I|0,J|0)|0;r=Cc(J|0,B|0,z|0,r|0)|0;E=Cc(r|0,B|0,h|0,E|0)|0;h=B;r=jc($|0,f|0,666643,0)|0;z=B;J=jc($|0,f|0,470296,0)|0;I=B;Z=jc($|0,f|0,654183,0)|0;T=B;i=jc($|0,f|0,-997805,-1)|0;g=B;P=jc($|0,f|0,136657,0)|0;P=Cc(U|0,l|0,P|0,B|0)|0;l=B;f=jc($|0,f|0,-683901,-1)|0;f=Cc(_|0,F|0,f|0,B|0)|0;F=B;_=jc(O|0,C|0,666643,0)|0;$=B;U=jc(O|0,C|0,470296,0)|0;V=B;Q=jc(O|0,C|0,654183,0)|0;R=B;K=jc(O|0,C|0,-997805,-1)|0;L=B;G=jc(O|0,C|0,136657,0)|0;H=B;C=jc(O|0,C|0,-683901,-1)|0;C=Cc(P|0,l|0,C|0,B|0)|0;l=B;P=jc(v|0,q|0,666643,0)|0;S=Cc(P|0,B|0,j|e|x&2031616|0,S|0)|0;x=B;e=jc(v|0,q|0,470296,0)|0;j=B;P=jc(v|0,q|0,654183,0)|0;Y=Cc(P|0,B|0,Y&2097151|0,0)|0;z=Cc(Y|0,B|0,r|0,z|0)|0;V=Cc(z|0,B|0,U|0,V|0)|0;U=B;z=jc(v|0,q|0,-997805,-1)|0;r=B;Y=jc(v|0,q|0,136657,0)|0;Y=Cc(W|0,X|0,Y|0,B|0)|0;T=Cc(Y|0,B|0,Z|0,T|0)|0;L=Cc(T|0,B|0,K|0,L|0)|0;K=B;q=jc(v|0,q|0,-683901,-1)|0;v=B;T=Cc(S|0,x|0,1048576,0)|0;T=ic(T|0,B|0,21)|0;Z=B;D=Cc(e|0,j|0,D&2097151|0,0)|0;$=Cc(D|0,B|0,_|0,$|0)|0;$=Cc($|0,B|0,T|0,Z|0)|0;_=B;Z=pc(T|0,Z|0,21)|0;Z=Ac(S|0,x|0,Z|0,B|0)|0;x=B;S=Cc(V|0,U|0,1048576,0)|0;S=ic(S|0,B|0,21)|0;T=B;r=Cc(m|0,k|0,z|0,r|0)|0;I=Cc(r|0,B|0,J|0,I|0)|0;R=Cc(I|0,B|0,Q|0,R|0)|0;R=Cc(R|0,B|0,S|0,T|0)|0;Q=B;T=pc(S|0,T|0,21)|0;S=B;I=Cc(L|0,K|0,1048576,0)|0;I=ic(I|0,B|0,21)|0;J=B;v=Cc(n|0,p|0,q|0,v|0)|0;g=Cc(v|0,B|0,i|0,g|0)|0;H=Cc(g|0,B|0,G|0,H|0)|0;H=Cc(H|0,B|0,I|0,J|0)|0;G=B;J=pc(I|0,J|0,21)|0;I=B;g=Cc(C|0,l|0,1048576,0)|0;g=ic(g|0,B|0,21)|0;i=B;F=Cc(f|0,F|0,g|0,i|0)|0;f=B;i=pc(g|0,i|0,21)|0;i=Ac(C|0,l|0,i|0,B|0)|0;l=B;C=Cc(E|0,h|0,1048576,0)|0;C=ic(C|0,B|0,21)|0;g=B;c=Cc(o|0,c|0,C|0,g|0)|0;o=B;g=pc(C|0,g|0,21)|0;g=Ac(E|0,h|0,g|0,B|0)|0;h=B;E=Cc(t|0,A|0,1048576,0)|0;E=ic(E|0,B|0,21)|0;C=B;s=Cc(w|0,s|0,E|0,C|0)|0;w=B;C=pc(E|0,C|0,21)|0;C=Ac(t|0,A|0,C|0,B|0)|0;A=B;t=Cc($|0,_|0,1048576,0)|0;t=ic(t|0,B|0,21)|0;E=B;v=pc(t|0,E|0,21)|0;q=B;p=Cc(R|0,Q|0,1048576,0)|0;p=ic(p|0,B|0,21)|0;n=B;r=pc(p|0,n|0,21)|0;z=B;k=Cc(H|0,G|0,1048576,0)|0;k=ic(k|0,B|0,21)|0;m=B;l=Cc(i|0,l|0,k|0,m|0)|0;i=B;m=pc(k|0,m|0,21)|0;k=B;D=Cc(F|0,f|0,1048576,0)|0;D=ic(D|0,B|0,21)|0;j=B;h=Cc(g|0,h|0,D|0,j|0)|0;g=B;j=pc(D|0,j|0,21)|0;j=Ac(F|0,f|0,j|0,B|0)|0;f=B;F=Cc(c|0,o|0,1048576,0)|0;F=ic(F|0,B|0,21)|0;D=B;A=Cc(C|0,A|0,F|0,D|0)|0;C=B;D=pc(F|0,D|0,21)|0;D=Ac(c|0,o|0,D|0,B|0)|0;o=B;c=Cc(s|0,w|0,1048576,0)|0;c=ic(c|0,B|0,21)|0;F=B;e=pc(c|0,F|0,21)|0;e=Ac(s|0,w|0,e|0,B|0)|0;w=B;s=jc(c|0,F|0,666643,0)|0;s=Cc(Z|0,x|0,s|0,B|0)|0;x=B;Z=jc(c|0,F|0,470296,0)|0;Y=B;X=jc(c|0,F|0,654183,0)|0;W=B;P=jc(c|0,F|0,-997805,-1)|0;O=B;N=jc(c|0,F|0,136657,0)|0;M=B;F=jc(c|0,F|0,-683901,-1)|0;c=B;u=ic(s|0,x|0,21)|0;y=B;Y=Cc($|0,_|0,Z|0,Y|0)|0;Y=Cc(Y|0,B|0,u|0,y|0)|0;q=Ac(Y|0,B|0,v|0,q|0)|0;v=B;y=pc(u|0,y|0,21)|0;y=Ac(s|0,x|0,y|0,B|0)|0;x=B;s=ic(q|0,v|0,21)|0;u=B;U=Cc(X|0,W|0,V|0,U|0)|0;S=Ac(U|0,B|0,T|0,S|0)|0;E=Cc(S|0,B|0,t|0,E|0)|0;E=Cc(E|0,B|0,s|0,u|0)|0;t=B;u=pc(s|0,u|0,21)|0;u=Ac(q|0,v|0,u|0,B|0)|0;v=B;q=ic(E|0,t|0,21)|0;s=B;O=Cc(R|0,Q|0,P|0,O|0)|0;z=Ac(O|0,B|0,r|0,z|0)|0;z=Cc(z|0,B|0,q|0,s|0)|0;r=B;s=pc(q|0,s|0,21)|0;s=Ac(E|0,t|0,s|0,B|0)|0;t=B;E=ic(z|0,r|0,21)|0;q=B;K=Cc(N|0,M|0,L|0,K|0)|0;I=Ac(K|0,B|0,J|0,I|0)|0;n=Cc(I|0,B|0,p|0,n|0)|0;n=Cc(n|0,B|0,E|0,q|0)|0;p=B;q=pc(E|0,q|0,21)|0;q=Ac(z|0,r|0,q|0,B|0)|0;r=B;z=ic(n|0,p|0,21)|0;E=B;c=Cc(H|0,G|0,F|0,c|0)|0;k=Ac(c|0,B|0,m|0,k|0)|0;k=Cc(k|0,B|0,z|0,E|0)|0;m=B;E=pc(z|0,E|0,21)|0;E=Ac(n|0,p|0,E|0,B|0)|0;p=B;n=ic(k|0,m|0,21)|0;z=B;i=Cc(l|0,i|0,n|0,z|0)|0;l=B;z=pc(n|0,z|0,21)|0;z=Ac(k|0,m|0,z|0,B|0)|0;m=B;k=ic(i|0,l|0,21)|0;n=B;f=Cc(k|0,n|0,j|0,f|0)|0;j=B;n=pc(k|0,n|0,21)|0;n=Ac(i|0,l|0,n|0,B|0)|0;l=B;i=ic(f|0,j|0,21)|0;k=B;g=Cc(h|0,g|0,i|0,k|0)|0;h=B;k=pc(i|0,k|0,21)|0;k=Ac(f|0,j|0,k|0,B|0)|0;j=B;f=ic(g|0,h|0,21)|0;i=B;o=Cc(f|0,i|0,D|0,o|0)|0;D=B;i=pc(f|0,i|0,21)|0;i=Ac(g|0,h|0,i|0,B|0)|0;h=B;g=ic(o|0,D|0,21)|0;f=B;C=Cc(A|0,C|0,g|0,f|0)|0;A=B;f=pc(g|0,f|0,21)|0;f=Ac(o|0,D|0,f|0,B|0)|0;D=B;o=ic(C|0,A|0,21)|0;g=B;w=Cc(o|0,g|0,e|0,w|0)|0;e=B;g=pc(o|0,g|0,21)|0;g=Ac(C|0,A|0,g|0,B|0)|0;A=B;C=ic(w|0,e|0,21)|0;o=B;c=pc(C|0,o|0,21)|0;c=Ac(w|0,e|0,c|0,B|0)|0;e=B;w=jc(C|0,o|0,666643,0)|0;x=Cc(w|0,B|0,y|0,x|0)|0;y=B;w=jc(C|0,o|0,470296,0)|0;w=Cc(u|0,v|0,w|0,B|0)|0;v=B;u=jc(C|0,o|0,654183,0)|0;u=Cc(s|0,t|0,u|0,B|0)|0;t=B;s=jc(C|0,o|0,-997805,-1)|0;s=Cc(q|0,r|0,s|0,B|0)|0;r=B;q=jc(C|0,o|0,136657,0)|0;q=Cc(E|0,p|0,q|0,B|0)|0;p=B;o=jc(C|0,o|0,-683901,-1)|0;o=Cc(z|0,m|0,o|0,B|0)|0;m=B;z=ic(x|0,y|0,21)|0;C=B;v=Cc(w|0,v|0,z|0,C|0)|0;w=B;C=pc(z|0,C|0,21)|0;C=Ac(x|0,y|0,C|0,B|0)|0;y=B;x=ic(v|0,w|0,21)|0;z=B;t=Cc(u|0,t|0,x|0,z|0)|0;u=B;z=pc(x|0,z|0,21)|0;z=Ac(v|0,w|0,z|0,B|0)|0;w=B;v=ic(t|0,u|0,21)|0;x=B;r=Cc(s|0,r|0,v|0,x|0)|0;s=B;x=pc(v|0,x|0,21)|0;x=Ac(t|0,u|0,x|0,B|0)|0;u=B;t=ic(r|0,s|0,21)|0;v=B;p=Cc(q|0,p|0,t|0,v|0)|0;q=B;v=pc(t|0,v|0,21)|0;v=Ac(r|0,s|0,v|0,B|0)|0;s=B;r=ic(p|0,q|0,21)|0;t=B;m=Cc(o|0,m|0,r|0,t|0)|0;o=B;t=pc(r|0,t|0,21)|0;t=Ac(p|0,q|0,t|0,B|0)|0;q=B;p=ic(m|0,o|0,21)|0;r=B;l=Cc(p|0,r|0,n|0,l|0)|0;n=B;r=pc(p|0,r|0,21)|0;r=Ac(m|0,o|0,r|0,B|0)|0;o=B;m=ic(l|0,n|0,21)|0;p=B;j=Cc(m|0,p|0,k|0,j|0)|0;k=B;p=pc(m|0,p|0,21)|0;p=Ac(l|0,n|0,p|0,B|0)|0;n=B;l=ic(j|0,k|0,21)|0;m=B;h=Cc(l|0,m|0,i|0,h|0)|0;i=B;m=pc(l|0,m|0,21)|0;m=Ac(j|0,k|0,m|0,B|0)|0;k=B;j=ic(h|0,i|0,21)|0;l=B;D=Cc(j|0,l|0,f|0,D|0)|0;f=B;l=pc(j|0,l|0,21)|0;l=Ac(h|0,i|0,l|0,B|0)|0;i=B;h=ic(D|0,f|0,21)|0;j=B;A=Cc(h|0,j|0,g|0,A|0)|0;g=B;j=pc(h|0,j|0,21)|0;j=Ac(D|0,f|0,j|0,B|0)|0;f=B;D=ic(A|0,g|0,21)|0;h=B;e=Cc(D|0,h|0,c|0,e|0)|0;c=B;h=pc(D|0,h|0,21)|0;h=Ac(A|0,g|0,h|0,B|0)|0;g=B;a[b>>0]=C;A=qc(C|0,y|0,8)|0;a[b+1>>0]=A;y=qc(C|0,y|0,16)|0;C=B;A=pc(z|0,w|0,5)|0;a[b+2>>0]=A|y;y=qc(z|0,w|0,3)|0;a[b+3>>0]=y;y=qc(z|0,w|0,11)|0;a[b+4>>0]=y;w=qc(z|0,w|0,19)|0;z=B;y=pc(x|0,u|0,2)|0;a[b+5>>0]=y|w;w=qc(x|0,u|0,6)|0;a[b+6>>0]=w;u=qc(x|0,u|0,14)|0;x=B;w=pc(v|0,s|0,7)|0;a[b+7>>0]=w|u;u=qc(v|0,s|0,1)|0;a[b+8>>0]=u;u=qc(v|0,s|0,9)|0;a[b+9>>0]=u;s=qc(v|0,s|0,17)|0;v=B;u=pc(t|0,q|0,4)|0;a[b+10>>0]=u|s;s=qc(t|0,q|0,4)|0;a[b+11>>0]=s;s=qc(t|0,q|0,12)|0;a[b+12>>0]=s;q=qc(t|0,q|0,20)|0;t=B;s=pc(r|0,o|0,1)|0;a[b+13>>0]=s|q;q=qc(r|0,o|0,7)|0;a[b+14>>0]=q;o=qc(r|0,o|0,15)|0;r=B;q=pc(p|0,n|0,6)|0;a[b+15>>0]=q|o;o=qc(p|0,n|0,2)|0;a[b+16>>0]=o;o=qc(p|0,n|0,10)|0;a[b+17>>0]=o;n=qc(p|0,n|0,18)|0;p=B;o=pc(m|0,k|0,3)|0;a[b+18>>0]=o|n;n=qc(m|0,k|0,5)|0;a[b+19>>0]=n;k=qc(m|0,k|0,13)|0;a[b+20>>0]=k;a[b+21>>0]=l;k=qc(l|0,i|0,8)|0;a[b+22>>0]=k;i=qc(l|0,i|0,16)|0;l=B;k=pc(j|0,f|0,5)|0;a[b+23>>0]=k|i;i=qc(j|0,f|0,3)|0;a[b+24>>0]=i;i=qc(j|0,f|0,11)|0;a[b+25>>0]=i;f=qc(j|0,f|0,19)|0;j=B;i=pc(h|0,g|0,2)|0;a[b+26>>0]=i|f;f=qc(h|0,g|0,6)|0;a[b+27>>0]=f;g=qc(h|0,g|0,14)|0;h=B;f=pc(e|0,c|0,7)|0;a[b+28>>0]=g|f;f=qc(e|0,c|0,1)|0;a[b+29>>0]=f;f=qc(e|0,c|0,9)|0;a[b+30>>0]=f;c=qc(e|0,c|0,17)|0;a[b+31>>0]=c;return}function ha(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,kc=0,lc=0,mc=0,nc=0,oc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Bc=0,Dc=0,Ec=0,Fc=0,Gc=0,Hc=0,Ic=0,Jc=0,Kc=0,Lc=0,Mc=0,Nc=0,Oc=0,Pc=0,Qc=0,Rc=0,Sc=0,Tc=0,Uc=0;o=c[b>>2]|0;n=c[b+4>>2]|0;k=c[b+8>>2]|0;fa=c[b+12>>2]|0;N=c[b+16>>2]|0;M=c[b+20>>2]|0;g=c[b+24>>2]|0;ea=c[b+28>>2]|0;L=c[b+32>>2]|0;q=c[b+36>>2]|0;I=c[d>>2]|0;Tc=c[d+4>>2]|0;cc=c[d+8>>2]|0;sb=c[d+12>>2]|0;Ia=c[d+16>>2]|0;lc=c[d+20>>2]|0;Db=c[d+24>>2]|0;Ta=c[d+28>>2]|0;ga=c[d+32>>2]|0;Uc=c[d+36>>2]|0;Rc=jc(I|0,((I|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Qc=B;zc=jc(Tc|0,((Tc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;yc=B;ub=jc(cc|0,((cc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;tb=B;Ka=jc(sb|0,((sb|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Ja=B;oc=jc(Ia|0,((Ia|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;nc=B;Gb=jc(lc|0,((lc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Fb=B;Wa=jc(Db|0,((Db|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Va=B;ja=jc(Ta|0,((Ta|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;ia=B;P=jc(ga|0,((ga|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;O=B;o=jc(Uc|0,((Uc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;l=B;dc=jc(I|0,((I|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;ec=B;yb=jc(Tc|0,((Tc|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;xb=B;Ma=jc(cc|0,((cc|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;La=B;rc=jc(sb|0,((sb|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;qc=B;Ib=jc(Ia|0,((Ia|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;Hb=B;Ya=jc(lc|0,((lc|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;Xa=B;la=jc(Db|0,((Db|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;ka=B;R=jc(Ta|0,((Ta|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;Q=B;t=jc(ga|0,((ga|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;s=B;d=((Uc*19|0)<0)<<31>>31;n=jc(Uc*19|0,d|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;p=B;wb=jc(I|0,((I|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;vb=B;Qa=jc(Tc|0,((Tc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Pa=B;tc=jc(cc|0,((cc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;sc=B;Kb=jc(sb|0,((sb|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Jb=B;_a=jc(Ia|0,((Ia|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Za=B;na=jc(lc|0,((lc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;ma=B;T=jc(Db|0,((Db|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;S=B;v=jc(Ta|0,((Ta|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;u=B;ha=((ga*19|0)<0)<<31>>31;Dc=jc(ga*19|0,ha|0,k|0,((k|0)<0)<<31>>31|0)|0;Bc=B;k=jc(Uc*19|0,d|0,k|0,((k|0)<0)<<31>>31|0)|0;j=B;Oa=jc(I|0,((I|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Na=B;xc=jc(Tc|0,((Tc|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;wc=B;Mb=jc(cc|0,((cc|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Lb=B;ab=jc(sb|0,((sb|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;$a=B;pa=jc(Ia|0,((Ia|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;oa=B;V=jc(lc|0,((lc|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;U=B;x=jc(Db|0,((Db|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;w=B;Ua=((Ta*19|0)<0)<<31>>31;Fc=jc(Ta*19|0,Ua|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;Ec=B;Sb=jc(ga*19|0,ha|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Rb=B;fa=jc(Uc*19|0,d|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;f=B;vc=jc(I|0,((I|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;uc=B;Qb=jc(Tc|0,((Tc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;Pb=B;cb=jc(cc|0,((cc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;bb=B;ra=jc(sb|0,((sb|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;qa=B;X=jc(Ia|0,((Ia|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;W=B;z=jc(lc|0,((lc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;y=B;Eb=((Db*19|0)<0)<<31>>31;Hc=jc(Db*19|0,Eb|0,N|0,((N|0)<0)<<31>>31|0)|0;Gc=B;Ub=jc(Ta*19|0,Ua|0,N|0,((N|0)<0)<<31>>31|0)|0;Tb=B;ib=jc(ga*19|0,ha|0,N|0,((N|0)<0)<<31>>31|0)|0;hb=B;N=jc(Uc*19|0,d|0,N|0,((N|0)<0)<<31>>31|0)|0;e=B;Ob=jc(I|0,((I|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;Nb=B;gb=jc(Tc|0,((Tc|0)<0)<<31>>31|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;fb=B;ta=jc(cc|0,((cc|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;sa=B;Z=jc(sb|0,((sb|0)<0)<<31>>31|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;Y=B;C=jc(Ia|0,((Ia|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;A=B;mc=((lc*19|0)<0)<<31>>31;Jc=jc(lc*19|0,mc|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;Ic=B;Wb=jc(Db*19|0,Eb|0,M|0,((M|0)<0)<<31>>31|0)|0;Vb=B;kb=jc(Ta*19|0,Ua|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;jb=B;Aa=jc(ga*19|0,ha|0,M|0,((M|0)<0)<<31>>31|0)|0;za=B;b=jc(Uc*19|0,d|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;M=B;eb=jc(I|0,((I|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;db=B;xa=jc(Tc|0,((Tc|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;wa=B;$=jc(cc|0,((cc|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;_=B;E=jc(sb|0,((sb|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;D=B;Lc=jc(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;Kc=B;Yb=jc(lc*19|0,mc|0,g|0,((g|0)<0)<<31>>31|0)|0;Xb=B;mb=jc(Db*19|0,Eb|0,g|0,((g|0)<0)<<31>>31|0)|0;lb=B;Ca=jc(Ta*19|0,Ua|0,g|0,((g|0)<0)<<31>>31|0)|0;Ba=B;m=jc(ga*19|0,ha|0,g|0,((g|0)<0)<<31>>31|0)|0;r=B;g=jc(Uc*19|0,d|0,g|0,((g|0)<0)<<31>>31|0)|0;ya=B;va=jc(I|0,((I|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;ua=B;da=jc(Tc|0,((Tc|0)<0)<<31>>31|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;ca=B;G=jc(cc|0,((cc|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;F=B;Nc=jc(sb*19|0,((sb*19|0)<0)<<31>>31|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;Mc=B;_b=jc(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;Zb=B;ob=jc(lc*19|0,mc|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;nb=B;Ea=jc(Db*19|0,Eb|0,ea|0,((ea|0)<0)<<31>>31|0)|0;Da=B;gc=jc(Ta*19|0,Ua|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;fc=B;Ab=jc(ga*19|0,ha|0,ea|0,((ea|0)<0)<<31>>31|0)|0;zb=B;ea=jc(Uc*19|0,d|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;i=B;ba=jc(I|0,((I|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;aa=B;K=jc(Tc|0,((Tc|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;J=B;Pc=jc(cc*19|0,((cc*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;Oc=B;ac=jc(sb*19|0,((sb*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;$b=B;qb=jc(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;pb=B;Ga=jc(lc*19|0,mc|0,L|0,((L|0)<0)<<31>>31|0)|0;Fa=B;kc=jc(Db*19|0,Eb|0,L|0,((L|0)<0)<<31>>31|0)|0;hc=B;Cb=jc(Ta*19|0,Ua|0,L|0,((L|0)<0)<<31>>31|0)|0;Bb=B;Sa=jc(ga*19|0,ha|0,L|0,((L|0)<0)<<31>>31|0)|0;Ra=B;L=jc(Uc*19|0,d|0,L|0,((L|0)<0)<<31>>31|0)|0;h=B;I=jc(I|0,((I|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;H=B;Tc=jc(Tc*19|0,((Tc*19|0)<0)<<31>>31|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;Sc=B;cc=jc(cc*19|0,((cc*19|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;bc=B;sb=jc(sb*19|0,((sb*19|0)<0)<<31>>31|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;rb=B;Ia=jc(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;Ha=B;mc=jc(lc*19|0,mc|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;lc=B;Eb=jc(Db*19|0,Eb|0,q|0,((q|0)<0)<<31>>31|0)|0;Db=B;Ua=jc(Ta*19|0,Ua|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;Ta=B;ha=jc(ga*19|0,ha|0,q|0,((q|0)<0)<<31>>31|0)|0;ga=B;q=jc(Uc*19|0,d|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;d=B;Qc=Cc(Tc|0,Sc|0,Rc|0,Qc|0)|0;Oc=Cc(Qc|0,B|0,Pc|0,Oc|0)|0;Mc=Cc(Oc|0,B|0,Nc|0,Mc|0)|0;Kc=Cc(Mc|0,B|0,Lc|0,Kc|0)|0;Ic=Cc(Kc|0,B|0,Jc|0,Ic|0)|0;Gc=Cc(Ic|0,B|0,Hc|0,Gc|0)|0;Ec=Cc(Gc|0,B|0,Fc|0,Ec|0)|0;Bc=Cc(Ec|0,B|0,Dc|0,Bc|0)|0;p=Cc(Bc|0,B|0,n|0,p|0)|0;n=B;ec=Cc(zc|0,yc|0,dc|0,ec|0)|0;dc=B;uc=Cc(xc|0,wc|0,vc|0,uc|0)|0;sc=Cc(uc|0,B|0,tc|0,sc|0)|0;qc=Cc(sc|0,B|0,rc|0,qc|0)|0;nc=Cc(qc|0,B|0,oc|0,nc|0)|0;lc=Cc(nc|0,B|0,mc|0,lc|0)|0;hc=Cc(lc|0,B|0,kc|0,hc|0)|0;fc=Cc(hc|0,B|0,gc|0,fc|0)|0;r=Cc(fc|0,B|0,m|0,r|0)|0;M=Cc(r|0,B|0,b|0,M|0)|0;b=B;r=Cc(p|0,n|0,33554432,0)|0;r=ic(r|0,B|0,26)|0;m=B;bc=Cc(ec|0,dc|0,cc|0,bc|0)|0;$b=Cc(bc|0,B|0,ac|0,$b|0)|0;Zb=Cc($b|0,B|0,_b|0,Zb|0)|0;Xb=Cc(Zb|0,B|0,Yb|0,Xb|0)|0;Vb=Cc(Xb|0,B|0,Wb|0,Vb|0)|0;Tb=Cc(Vb|0,B|0,Ub|0,Tb|0)|0;Rb=Cc(Tb|0,B|0,Sb|0,Rb|0)|0;j=Cc(Rb|0,B|0,k|0,j|0)|0;j=Cc(j|0,B|0,r|0,m|0)|0;k=B;m=pc(r|0,m|0,26)|0;m=Ac(p|0,n|0,m|0,B|0)|0;n=B;p=Cc(M|0,b|0,33554432,0)|0;p=ic(p|0,B|0,26)|0;r=B;Nb=Cc(Qb|0,Pb|0,Ob|0,Nb|0)|0;Lb=Cc(Nb|0,B|0,Mb|0,Lb|0)|0;Jb=Cc(Lb|0,B|0,Kb|0,Jb|0)|0;Hb=Cc(Jb|0,B|0,Ib|0,Hb|0)|0;Fb=Cc(Hb|0,B|0,Gb|0,Fb|0)|0;Db=Cc(Fb|0,B|0,Eb|0,Db|0)|0;Bb=Cc(Db|0,B|0,Cb|0,Bb|0)|0;zb=Cc(Bb|0,B|0,Ab|0,zb|0)|0;ya=Cc(zb|0,B|0,g|0,ya|0)|0;ya=Cc(ya|0,B|0,p|0,r|0)|0;g=B;r=pc(p|0,r|0,26)|0;r=Ac(M|0,b|0,r|0,B|0)|0;b=B;M=Cc(j|0,k|0,16777216,0)|0;M=ic(M|0,B|0,25)|0;p=B;vb=Cc(yb|0,xb|0,wb|0,vb|0)|0;tb=Cc(vb|0,B|0,ub|0,tb|0)|0;rb=Cc(tb|0,B|0,sb|0,rb|0)|0;pb=Cc(rb|0,B|0,qb|0,pb|0)|0;nb=Cc(pb|0,B|0,ob|0,nb|0)|0;lb=Cc(nb|0,B|0,mb|0,lb|0)|0;jb=Cc(lb|0,B|0,kb|0,jb|0)|0;hb=Cc(jb|0,B|0,ib|0,hb|0)|0;f=Cc(hb|0,B|0,fa|0,f|0)|0;f=Cc(f|0,B|0,M|0,p|0)|0;fa=B;p=pc(M|0,p|0,25)|0;p=Ac(j|0,k|0,p|0,B|0)|0;k=B;j=Cc(ya|0,g|0,16777216,0)|0;j=ic(j|0,B|0,25)|0;M=B;db=Cc(gb|0,fb|0,eb|0,db|0)|0;bb=Cc(db|0,B|0,cb|0,bb|0)|0;$a=Cc(bb|0,B|0,ab|0,$a|0)|0;Za=Cc($a|0,B|0,_a|0,Za|0)|0;Xa=Cc(Za|0,B|0,Ya|0,Xa|0)|0;Va=Cc(Xa|0,B|0,Wa|0,Va|0)|0;Ta=Cc(Va|0,B|0,Ua|0,Ta|0)|0;Ra=Cc(Ta|0,B|0,Sa|0,Ra|0)|0;i=Cc(Ra|0,B|0,ea|0,i|0)|0;i=Cc(i|0,B|0,j|0,M|0)|0;ea=B;M=pc(j|0,M|0,25)|0;M=Ac(ya|0,g|0,M|0,B|0)|0;g=B;ya=Cc(f|0,fa|0,33554432,0)|0;ya=ic(ya|0,B|0,26)|0;j=B;Na=Cc(Qa|0,Pa|0,Oa|0,Na|0)|0;La=Cc(Na|0,B|0,Ma|0,La|0)|0;Ja=Cc(La|0,B|0,Ka|0,Ja|0)|0;Ha=Cc(Ja|0,B|0,Ia|0,Ha|0)|0;Fa=Cc(Ha|0,B|0,Ga|0,Fa|0)|0;Da=Cc(Fa|0,B|0,Ea|0,Da|0)|0;Ba=Cc(Da|0,B|0,Ca|0,Ba|0)|0;za=Cc(Ba|0,B|0,Aa|0,za|0)|0;e=Cc(za|0,B|0,N|0,e|0)|0;e=Cc(e|0,B|0,ya|0,j|0)|0;N=B;j=pc(ya|0,j|0,26)|0;j=Ac(f|0,fa|0,j|0,B|0)|0;fa=Cc(i|0,ea|0,33554432,0)|0;fa=ic(fa|0,B|0,26)|0;f=B;ua=Cc(xa|0,wa|0,va|0,ua|0)|0;sa=Cc(ua|0,B|0,ta|0,sa|0)|0;qa=Cc(sa|0,B|0,ra|0,qa|0)|0;oa=Cc(qa|0,B|0,pa|0,oa|0)|0;ma=Cc(oa|0,B|0,na|0,ma|0)|0;ka=Cc(ma|0,B|0,la|0,ka|0)|0;ia=Cc(ka|0,B|0,ja|0,ia|0)|0;ga=Cc(ia|0,B|0,ha|0,ga|0)|0;h=Cc(ga|0,B|0,L|0,h|0)|0;h=Cc(h|0,B|0,fa|0,f|0)|0;L=B;f=pc(fa|0,f|0,26)|0;f=Ac(i|0,ea|0,f|0,B|0)|0;ea=Cc(e|0,N|0,16777216,0)|0;ea=ic(ea|0,B|0,25)|0;i=B;b=Cc(ea|0,i|0,r|0,b|0)|0;r=B;i=pc(ea|0,i|0,25)|0;i=Ac(e|0,N|0,i|0,B|0)|0;N=Cc(h|0,L|0,16777216,0)|0;N=ic(N|0,B|0,25)|0;e=B;aa=Cc(da|0,ca|0,ba|0,aa|0)|0;_=Cc(aa|0,B|0,$|0,_|0)|0;Y=Cc(_|0,B|0,Z|0,Y|0)|0;W=Cc(Y|0,B|0,X|0,W|0)|0;U=Cc(W|0,B|0,V|0,U|0)|0;S=Cc(U|0,B|0,T|0,S|0)|0;Q=Cc(S|0,B|0,R|0,Q|0)|0;O=Cc(Q|0,B|0,P|0,O|0)|0;d=Cc(O|0,B|0,q|0,d|0)|0;d=Cc(d|0,B|0,N|0,e|0)|0;q=B;e=pc(N|0,e|0,25)|0;e=Ac(h|0,L|0,e|0,B|0)|0;L=Cc(b|0,r|0,33554432,0)|0;L=ic(L|0,B|0,26)|0;h=B;g=Cc(M|0,g|0,L|0,h|0)|0;h=pc(L|0,h|0,26)|0;h=Ac(b|0,r|0,h|0,B|0)|0;r=Cc(d|0,q|0,33554432,0)|0;r=ic(r|0,B|0,26)|0;b=B;H=Cc(K|0,J|0,I|0,H|0)|0;F=Cc(H|0,B|0,G|0,F|0)|0;D=Cc(F|0,B|0,E|0,D|0)|0;A=Cc(D|0,B|0,C|0,A|0)|0;y=Cc(A|0,B|0,z|0,y|0)|0;w=Cc(y|0,B|0,x|0,w|0)|0;u=Cc(w|0,B|0,v|0,u|0)|0;s=Cc(u|0,B|0,t|0,s|0)|0;l=Cc(s|0,B|0,o|0,l|0)|0;l=Cc(l|0,B|0,r|0,b|0)|0;o=B;b=pc(r|0,b|0,26)|0;b=Ac(d|0,q|0,b|0,B|0)|0;q=Cc(l|0,o|0,16777216,0)|0;q=ic(q|0,B|0,25)|0;d=B;r=jc(q|0,d|0,19,0)|0;n=Cc(r|0,B|0,m|0,n|0)|0;m=B;d=pc(q|0,d|0,25)|0;d=Ac(l|0,o|0,d|0,B|0)|0;o=Cc(n|0,m|0,33554432,0)|0;o=ic(o|0,B|0,26)|0;l=B;k=Cc(p|0,k|0,o|0,l|0)|0;l=pc(o|0,l|0,26)|0;l=Ac(n|0,m|0,l|0,B|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=b;c[a+36>>2]=d;return}function ia(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0;l=c[b>>2]|0;n=c[b+4>>2]|0;k=c[b+8>>2]|0;f=c[b+12>>2]|0;u=c[b+16>>2]|0;t=c[b+20>>2]|0;g=c[b+24>>2]|0;v=c[b+28>>2]|0;s=c[b+32>>2]|0;q=c[b+36>>2]|0;cb=jc(l|0,((l|0)<0)<<31>>31|0,l|0,((l|0)<0)<<31>>31|0)|0;bb=B;o=((l<<1|0)<0)<<31>>31;Ua=jc(l<<1|0,o|0,n|0,((n|0)<0)<<31>>31|0)|0;Ta=B;Oa=jc(k|0,((k|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Na=B;Ea=jc(f|0,((f|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Da=B;sa=jc(u|0,((u|0)<0)<<31>>31|0,l<<1|0,o|0)|0;ra=B;ia=jc(t|0,((t|0)<0)<<31>>31|0,l<<1|0,o|0)|0;ha=B;_=jc(g|0,((g|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Z=B;Q=jc(v|0,((v|0)<0)<<31>>31|0,l<<1|0,o|0)|0;P=B;G=jc(s|0,((s|0)<0)<<31>>31|0,l<<1|0,o|0)|0;F=B;o=jc(q|0,((q|0)<0)<<31>>31|0,l<<1|0,o|0)|0;l=B;p=((n<<1|0)<0)<<31>>31;Ma=jc(n<<1|0,p|0,n|0,((n|0)<0)<<31>>31|0)|0;La=B;Ca=jc(n<<1|0,p|0,k|0,((k|0)<0)<<31>>31|0)|0;Ba=B;w=((f<<1|0)<0)<<31>>31;wa=jc(f<<1|0,w|0,n<<1|0,p|0)|0;va=B;ma=jc(u|0,((u|0)<0)<<31>>31|0,n<<1|0,p|0)|0;la=B;aa=jc(t<<1|0,((t<<1|0)<0)<<31>>31|0,n<<1|0,p|0)|0;$=B;S=jc(g|0,((g|0)<0)<<31>>31|0,n<<1|0,p|0)|0;R=B;I=jc(v<<1|0,((v<<1|0)<0)<<31>>31|0,n<<1|0,p|0)|0;H=B;m=jc(s|0,((s|0)<0)<<31>>31|0,n<<1|0,p|0)|0;r=B;b=((q*38|0)<0)<<31>>31;p=jc(q*38|0,b|0,n<<1|0,p|0)|0;n=B;ua=jc(k|0,((k|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;ta=B;ka=jc(k<<1|0,((k<<1|0)<0)<<31>>31|0,f|0,((f|0)<0)<<31>>31|0)|0;ja=B;ca=jc(u|0,((u|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;ba=B;W=jc(t|0,((t|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;V=B;O=jc(g|0,((g|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;N=B;z=jc(v|0,((v|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;y=B;Y=((s*19|0)<0)<<31>>31;Ya=jc(s*19|0,Y|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;Xa=B;k=jc(q*38|0,b|0,k|0,((k|0)<0)<<31>>31|0)|0;j=B;ea=jc(f<<1|0,w|0,f|0,((f|0)<0)<<31>>31|0)|0;da=B;U=jc(f<<1|0,w|0,u|0,((u|0)<0)<<31>>31|0)|0;T=B;K=jc(t<<1|0,((t<<1|0)<0)<<31>>31|0,f<<1|0,w|0)|0;J=B;E=jc(g|0,((g|0)<0)<<31>>31|0,f<<1|0,w|0)|0;D=B;qa=((v*38|0)<0)<<31>>31;_a=jc(v*38|0,qa|0,f<<1|0,w|0)|0;Za=B;Qa=jc(s*19|0,Y|0,f<<1|0,w|0)|0;Pa=B;w=jc(q*38|0,b|0,f<<1|0,w|0)|0;f=B;M=jc(u|0,((u|0)<0)<<31>>31|0,u|0,((u|0)<0)<<31>>31|0)|0;L=B;C=jc(u<<1|0,((u<<1|0)<0)<<31>>31|0,t|0,((t|0)<0)<<31>>31|0)|0;A=B;ab=jc(g*19|0,((g*19|0)<0)<<31>>31|0,u<<1|0,((u<<1|0)<0)<<31>>31|0)|0;$a=B;Sa=jc(v*38|0,qa|0,u|0,((u|0)<0)<<31>>31|0)|0;Ra=B;Ga=jc(s*19|0,Y|0,u<<1|0,((u<<1|0)<0)<<31>>31|0)|0;Fa=B;u=jc(q*38|0,b|0,u|0,((u|0)<0)<<31>>31|0)|0;e=B;eb=jc(t*38|0,((t*38|0)<0)<<31>>31|0,t|0,((t|0)<0)<<31>>31|0)|0;db=B;Wa=jc(g*19|0,((g*19|0)<0)<<31>>31|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;Va=B;Ia=jc(v*38|0,qa|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;Ha=B;ya=jc(s*19|0,Y|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;xa=B;t=jc(q*38|0,b|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;d=B;Ka=jc(g*19|0,((g*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;Ja=B;Aa=jc(v*38|0,qa|0,g|0,((g|0)<0)<<31>>31|0)|0;za=B;oa=jc(s*19|0,Y|0,g<<1|0,((g<<1|0)<0)<<31>>31|0)|0;na=B;g=jc(q*38|0,b|0,g|0,((g|0)<0)<<31>>31|0)|0;x=B;qa=jc(v*38|0,qa|0,v|0,((v|0)<0)<<31>>31|0)|0;pa=B;ga=jc(s*19|0,Y|0,v<<1|0,((v<<1|0)<0)<<31>>31|0)|0;fa=B;v=jc(q*38|0,b|0,v<<1|0,((v<<1|0)<0)<<31>>31|0)|0;i=B;Y=jc(s*19|0,Y|0,s|0,((s|0)<0)<<31>>31|0)|0;X=B;s=jc(q*38|0,b|0,s|0,((s|0)<0)<<31>>31|0)|0;h=B;q=jc(q*38|0,b|0,q|0,((q|0)<0)<<31>>31|0)|0;b=B;bb=Cc(eb|0,db|0,cb|0,bb|0)|0;$a=Cc(bb|0,B|0,ab|0,$a|0)|0;Za=Cc($a|0,B|0,_a|0,Za|0)|0;Xa=Cc(Za|0,B|0,Ya|0,Xa|0)|0;n=Cc(Xa|0,B|0,p|0,n|0)|0;p=B;Ta=Cc(Wa|0,Va|0,Ua|0,Ta|0)|0;Ra=Cc(Ta|0,B|0,Sa|0,Ra|0)|0;Pa=Cc(Ra|0,B|0,Qa|0,Pa|0)|0;j=Cc(Pa|0,B|0,k|0,j|0)|0;k=B;La=Cc(Oa|0,Na|0,Ma|0,La|0)|0;Ja=Cc(La|0,B|0,Ka|0,Ja|0)|0;Ha=Cc(Ja|0,B|0,Ia|0,Ha|0)|0;Fa=Cc(Ha|0,B|0,Ga|0,Fa|0)|0;f=Cc(Fa|0,B|0,w|0,f|0)|0;w=B;Ba=Cc(Ea|0,Da|0,Ca|0,Ba|0)|0;za=Cc(Ba|0,B|0,Aa|0,za|0)|0;xa=Cc(za|0,B|0,ya|0,xa|0)|0;e=Cc(xa|0,B|0,u|0,e|0)|0;u=B;ta=Cc(wa|0,va|0,ua|0,ta|0)|0;ra=Cc(ta|0,B|0,sa|0,ra|0)|0;pa=Cc(ra|0,B|0,qa|0,pa|0)|0;na=Cc(pa|0,B|0,oa|0,na|0)|0;d=Cc(na|0,B|0,t|0,d|0)|0;t=B;ja=Cc(ma|0,la|0,ka|0,ja|0)|0;ha=Cc(ja|0,B|0,ia|0,ha|0)|0;fa=Cc(ha|0,B|0,ga|0,fa|0)|0;x=Cc(fa|0,B|0,g|0,x|0)|0;g=B;ba=Cc(ea|0,da|0,ca|0,ba|0)|0;$=Cc(ba|0,B|0,aa|0,$|0)|0;Z=Cc($|0,B|0,_|0,Z|0)|0;X=Cc(Z|0,B|0,Y|0,X|0)|0;i=Cc(X|0,B|0,v|0,i|0)|0;v=B;T=Cc(W|0,V|0,U|0,T|0)|0;R=Cc(T|0,B|0,S|0,R|0)|0;P=Cc(R|0,B|0,Q|0,P|0)|0;h=Cc(P|0,B|0,s|0,h|0)|0;s=B;L=Cc(O|0,N|0,M|0,L|0)|0;J=Cc(L|0,B|0,K|0,J|0)|0;H=Cc(J|0,B|0,I|0,H|0)|0;F=Cc(H|0,B|0,G|0,F|0)|0;b=Cc(F|0,B|0,q|0,b|0)|0;q=B;A=Cc(E|0,D|0,C|0,A|0)|0;y=Cc(A|0,B|0,z|0,y|0)|0;r=Cc(y|0,B|0,m|0,r|0)|0;l=Cc(r|0,B|0,o|0,l|0)|0;o=B;p=pc(n|0,p|0,1)|0;n=B;k=pc(j|0,k|0,1)|0;j=B;w=pc(f|0,w|0,1)|0;f=B;u=pc(e|0,u|0,1)|0;e=B;t=pc(d|0,t|0,1)|0;d=B;g=pc(x|0,g|0,1)|0;x=B;v=pc(i|0,v|0,1)|0;i=B;s=pc(h|0,s|0,1)|0;h=B;q=pc(b|0,q|0,1)|0;b=B;o=pc(l|0,o|0,1)|0;l=B;r=Cc(p|0,n|0,33554432,0)|0;r=ic(r|0,B|0,26)|0;m=B;j=Cc(r|0,m|0,k|0,j|0)|0;k=B;m=pc(r|0,m|0,26)|0;m=Ac(p|0,n|0,m|0,B|0)|0;n=B;p=Cc(t|0,d|0,33554432,0)|0;p=ic(p|0,B|0,26)|0;r=B;x=Cc(p|0,r|0,g|0,x|0)|0;g=B;r=pc(p|0,r|0,26)|0;r=Ac(t|0,d|0,r|0,B|0)|0;d=B;t=Cc(j|0,k|0,16777216,0)|0;t=ic(t|0,B|0,25)|0;p=B;f=Cc(t|0,p|0,w|0,f|0)|0;w=B;p=pc(t|0,p|0,25)|0;p=Ac(j|0,k|0,p|0,B|0)|0;k=B;j=Cc(x|0,g|0,16777216,0)|0;j=ic(j|0,B|0,25)|0;t=B;i=Cc(j|0,t|0,v|0,i|0)|0;v=B;t=pc(j|0,t|0,25)|0;t=Ac(x|0,g|0,t|0,B|0)|0;g=B;x=Cc(f|0,w|0,33554432,0)|0;x=ic(x|0,B|0,26)|0;j=B;e=Cc(x|0,j|0,u|0,e|0)|0;u=B;j=pc(x|0,j|0,26)|0;j=Ac(f|0,w|0,j|0,B|0)|0;w=Cc(i|0,v|0,33554432,0)|0;w=ic(w|0,B|0,26)|0;f=B;h=Cc(w|0,f|0,s|0,h|0)|0;s=B;f=pc(w|0,f|0,26)|0;f=Ac(i|0,v|0,f|0,B|0)|0;v=Cc(e|0,u|0,16777216,0)|0;v=ic(v|0,B|0,25)|0;i=B;d=Cc(v|0,i|0,r|0,d|0)|0;r=B;i=pc(v|0,i|0,25)|0;i=Ac(e|0,u|0,i|0,B|0)|0;u=Cc(h|0,s|0,16777216,0)|0;u=ic(u|0,B|0,25)|0;e=B;b=Cc(u|0,e|0,q|0,b|0)|0;q=B;e=pc(u|0,e|0,25)|0;e=Ac(h|0,s|0,e|0,B|0)|0;s=Cc(d|0,r|0,33554432,0)|0;s=ic(s|0,B|0,26)|0;h=B;g=Cc(t|0,g|0,s|0,h|0)|0;h=pc(s|0,h|0,26)|0;h=Ac(d|0,r|0,h|0,B|0)|0;r=Cc(b|0,q|0,33554432,0)|0;r=ic(r|0,B|0,26)|0;d=B;l=Cc(r|0,d|0,o|0,l|0)|0;o=B;d=pc(r|0,d|0,26)|0;d=Ac(b|0,q|0,d|0,B|0)|0;q=Cc(l|0,o|0,16777216,0)|0;q=ic(q|0,B|0,25)|0;b=B;r=jc(q|0,b|0,19,0)|0;n=Cc(r|0,B|0,m|0,n|0)|0;m=B;b=pc(q|0,b|0,25)|0;b=Ac(l|0,o|0,b|0,B|0)|0;o=Cc(n|0,m|0,33554432,0)|0;o=ic(o|0,B|0,26)|0;l=B;k=Cc(p|0,k|0,o|0,l|0)|0;l=pc(o|0,l|0,26)|0;l=Ac(n|0,m|0,l|0,B|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=d;c[a+36>>2]=b;return}function ja(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0;l=c[b>>2]|0;p=c[b+4>>2]|0;k=c[b+8>>2]|0;f=c[b+12>>2]|0;D=c[b+16>>2]|0;d=c[b+20>>2]|0;g=c[b+24>>2]|0;O=c[b+28>>2]|0;A=c[b+32>>2]|0;q=c[b+36>>2]|0;cb=jc(l|0,((l|0)<0)<<31>>31|0,l|0,((l|0)<0)<<31>>31|0)|0;bb=B;o=((l<<1|0)<0)<<31>>31;Ia=jc(l<<1|0,o|0,p|0,((p|0)<0)<<31>>31|0)|0;Ha=B;Wa=jc(k|0,((k|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Va=B;Ua=jc(f|0,((f|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Ta=B;Oa=jc(D|0,((D|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Na=B;ya=jc(d|0,((d|0)<0)<<31>>31|0,l<<1|0,o|0)|0;xa=B;ga=jc(g|0,((g|0)<0)<<31>>31|0,l<<1|0,o|0)|0;fa=B;R=jc(O|0,((O|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Q=B;F=jc(A|0,((A|0)<0)<<31>>31|0,l<<1|0,o|0)|0;E=B;o=jc(q|0,((q|0)<0)<<31>>31|0,l<<1|0,o|0)|0;l=B;n=((p<<1|0)<0)<<31>>31;ta=jc(p<<1|0,n|0,p|0,((p|0)<0)<<31>>31|0)|0;ua=B;ba=jc(p<<1|0,n|0,k|0,((k|0)<0)<<31>>31|0)|0;ca=B;P=((f<<1|0)<0)<<31>>31;Sa=jc(f<<1|0,P|0,p<<1|0,n|0)|0;Ra=B;Ca=jc(D|0,((D|0)<0)<<31>>31|0,p<<1|0,n|0)|0;Ba=B;ia=jc(d<<1|0,((d<<1|0)<0)<<31>>31|0,p<<1|0,n|0)|0;ha=B;T=jc(g|0,((g|0)<0)<<31>>31|0,p<<1|0,n|0)|0;S=B;H=jc(O<<1|0,((O<<1|0)<0)<<31>>31|0,p<<1|0,n|0)|0;G=B;t=jc(A|0,((A|0)<0)<<31>>31|0,p<<1|0,n|0)|0;s=B;b=((q*38|0)<0)<<31>>31;n=jc(q*38|0,b|0,p<<1|0,n|0)|0;p=B;Qa=jc(k|0,((k|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Pa=B;Aa=jc(k<<1|0,((k<<1|0)<0)<<31>>31|0,f|0,((f|0)<0)<<31>>31|0)|0;za=B;ka=jc(D|0,((D|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;ja=B;X=jc(d|0,((d|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;W=B;N=jc(g|0,((g|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;M=B;v=jc(O|0,((O|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;u=B;ea=((A*19|0)<0)<<31>>31;Ya=jc(A*19|0,ea|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;Xa=B;k=jc(q*38|0,b|0,k|0,((k|0)<0)<<31>>31|0)|0;j=B;ma=jc(f<<1|0,P|0,f|0,((f|0)<0)<<31>>31|0)|0;la=B;V=jc(f<<1|0,P|0,D|0,((D|0)<0)<<31>>31|0)|0;U=B;J=jc(d<<1|0,((d<<1|0)<0)<<31>>31|0,f<<1|0,P|0)|0;I=B;z=jc(g|0,((g|0)<0)<<31>>31|0,f<<1|0,P|0)|0;y=B;Ma=((O*38|0)<0)<<31>>31;_a=jc(O*38|0,Ma|0,f<<1|0,P|0)|0;Za=B;Ea=jc(A*19|0,ea|0,f<<1|0,P|0)|0;Da=B;P=jc(q*38|0,b|0,f<<1|0,P|0)|0;f=B;L=jc(D|0,((D|0)<0)<<31>>31|0,D|0,((D|0)<0)<<31>>31|0)|0;K=B;x=jc(D<<1|0,((D<<1|0)<0)<<31>>31|0,d|0,((d|0)<0)<<31>>31|0)|0;w=B;ab=jc(g*19|0,((g*19|0)<0)<<31>>31|0,D<<1|0,((D<<1|0)<0)<<31>>31|0)|0;$a=B;Ga=jc(O*38|0,Ma|0,D|0,((D|0)<0)<<31>>31|0)|0;Fa=B;oa=jc(A*19|0,ea|0,D<<1|0,((D<<1|0)<0)<<31>>31|0)|0;na=B;D=jc(q*38|0,b|0,D|0,((D|0)<0)<<31>>31|0)|0;e=B;eb=jc(d*38|0,((d*38|0)<0)<<31>>31|0,d|0,((d|0)<0)<<31>>31|0)|0;db=B;Ka=jc(g*19|0,((g*19|0)<0)<<31>>31|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;Ja=B;qa=jc(O*38|0,Ma|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;pa=B;_=jc(A*19|0,ea|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;Z=B;d=jc(q*38|0,b|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;C=B;sa=jc(g*19|0,((g*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;ra=B;aa=jc(O*38|0,Ma|0,g|0,((g|0)<0)<<31>>31|0)|0;$=B;m=jc(A*19|0,ea|0,g<<1|0,((g<<1|0)<0)<<31>>31|0)|0;r=B;g=jc(q*38|0,b|0,g|0,((g|0)<0)<<31>>31|0)|0;Y=B;Ma=jc(O*38|0,Ma|0,O|0,((O|0)<0)<<31>>31|0)|0;La=B;wa=jc(A*19|0,ea|0,O<<1|0,((O<<1|0)<0)<<31>>31|0)|0;va=B;O=jc(q*38|0,b|0,O<<1|0,((O<<1|0)<0)<<31>>31|0)|0;i=B;ea=jc(A*19|0,ea|0,A|0,((A|0)<0)<<31>>31|0)|0;da=B;A=jc(q*38|0,b|0,A|0,((A|0)<0)<<31>>31|0)|0;h=B;q=jc(q*38|0,b|0,q|0,((q|0)<0)<<31>>31|0)|0;b=B;bb=Cc(eb|0,db|0,cb|0,bb|0)|0;$a=Cc(bb|0,B|0,ab|0,$a|0)|0;Za=Cc($a|0,B|0,_a|0,Za|0)|0;Xa=Cc(Za|0,B|0,Ya|0,Xa|0)|0;p=Cc(Xa|0,B|0,n|0,p|0)|0;n=B;ua=Cc(Wa|0,Va|0,ta|0,ua|0)|0;ta=B;ca=Cc(Ua|0,Ta|0,ba|0,ca|0)|0;ba=B;Pa=Cc(Sa|0,Ra|0,Qa|0,Pa|0)|0;Na=Cc(Pa|0,B|0,Oa|0,Na|0)|0;La=Cc(Na|0,B|0,Ma|0,La|0)|0;r=Cc(La|0,B|0,m|0,r|0)|0;C=Cc(r|0,B|0,d|0,C|0)|0;d=B;r=Cc(p|0,n|0,33554432,0)|0;r=ic(r|0,B|0,26)|0;m=B;Ha=Cc(Ka|0,Ja|0,Ia|0,Ha|0)|0;Fa=Cc(Ha|0,B|0,Ga|0,Fa|0)|0;Da=Cc(Fa|0,B|0,Ea|0,Da|0)|0;j=Cc(Da|0,B|0,k|0,j|0)|0;j=Cc(j|0,B|0,r|0,m|0)|0;k=B;m=pc(r|0,m|0,26)|0;m=Ac(p|0,n|0,m|0,B|0)|0;n=B;p=Cc(C|0,d|0,33554432,0)|0;p=ic(p|0,B|0,26)|0;r=B;za=Cc(Ca|0,Ba|0,Aa|0,za|0)|0;xa=Cc(za|0,B|0,ya|0,xa|0)|0;va=Cc(xa|0,B|0,wa|0,va|0)|0;Y=Cc(va|0,B|0,g|0,Y|0)|0;Y=Cc(Y|0,B|0,p|0,r|0)|0;g=B;r=pc(p|0,r|0,26)|0;r=Ac(C|0,d|0,r|0,B|0)|0;d=B;C=Cc(j|0,k|0,16777216,0)|0;C=ic(C|0,B|0,25)|0;p=B;ra=Cc(ua|0,ta|0,sa|0,ra|0)|0;pa=Cc(ra|0,B|0,qa|0,pa|0)|0;na=Cc(pa|0,B|0,oa|0,na|0)|0;f=Cc(na|0,B|0,P|0,f|0)|0;f=Cc(f|0,B|0,C|0,p|0)|0;P=B;p=pc(C|0,p|0,25)|0;p=Ac(j|0,k|0,p|0,B|0)|0;k=B;j=Cc(Y|0,g|0,16777216,0)|0;j=ic(j|0,B|0,25)|0;C=B;ja=Cc(ma|0,la|0,ka|0,ja|0)|0;ha=Cc(ja|0,B|0,ia|0,ha|0)|0;fa=Cc(ha|0,B|0,ga|0,fa|0)|0;da=Cc(fa|0,B|0,ea|0,da|0)|0;i=Cc(da|0,B|0,O|0,i|0)|0;i=Cc(i|0,B|0,j|0,C|0)|0;O=B;C=pc(j|0,C|0,25)|0;C=Ac(Y|0,g|0,C|0,B|0)|0;g=B;Y=Cc(f|0,P|0,33554432,0)|0;Y=ic(Y|0,B|0,26)|0;j=B;$=Cc(ca|0,ba|0,aa|0,$|0)|0;Z=Cc($|0,B|0,_|0,Z|0)|0;e=Cc(Z|0,B|0,D|0,e|0)|0;e=Cc(e|0,B|0,Y|0,j|0)|0;D=B;j=pc(Y|0,j|0,26)|0;j=Ac(f|0,P|0,j|0,B|0)|0;P=Cc(i|0,O|0,33554432,0)|0;P=ic(P|0,B|0,26)|0;f=B;U=Cc(X|0,W|0,V|0,U|0)|0;S=Cc(U|0,B|0,T|0,S|0)|0;Q=Cc(S|0,B|0,R|0,Q|0)|0;h=Cc(Q|0,B|0,A|0,h|0)|0;h=Cc(h|0,B|0,P|0,f|0)|0;A=B;f=pc(P|0,f|0,26)|0;f=Ac(i|0,O|0,f|0,B|0)|0;O=Cc(e|0,D|0,16777216,0)|0;O=ic(O|0,B|0,25)|0;i=B;d=Cc(O|0,i|0,r|0,d|0)|0;r=B;i=pc(O|0,i|0,25)|0;i=Ac(e|0,D|0,i|0,B|0)|0;D=Cc(h|0,A|0,16777216,0)|0;D=ic(D|0,B|0,25)|0;e=B;K=Cc(N|0,M|0,L|0,K|0)|0;I=Cc(K|0,B|0,J|0,I|0)|0;G=Cc(I|0,B|0,H|0,G|0)|0;E=Cc(G|0,B|0,F|0,E|0)|0;b=Cc(E|0,B|0,q|0,b|0)|0;b=Cc(b|0,B|0,D|0,e|0)|0;q=B;e=pc(D|0,e|0,25)|0;e=Ac(h|0,A|0,e|0,B|0)|0;A=Cc(d|0,r|0,33554432,0)|0;A=ic(A|0,B|0,26)|0;h=B;g=Cc(C|0,g|0,A|0,h|0)|0;h=pc(A|0,h|0,26)|0;h=Ac(d|0,r|0,h|0,B|0)|0;r=Cc(b|0,q|0,33554432,0)|0;r=ic(r|0,B|0,26)|0;d=B;w=Cc(z|0,y|0,x|0,w|0)|0;u=Cc(w|0,B|0,v|0,u|0)|0;s=Cc(u|0,B|0,t|0,s|0)|0;l=Cc(s|0,B|0,o|0,l|0)|0;l=Cc(l|0,B|0,r|0,d|0)|0;o=B;d=pc(r|0,d|0,26)|0;d=Ac(b|0,q|0,d|0,B|0)|0;q=Cc(l|0,o|0,16777216,0)|0;q=ic(q|0,B|0,25)|0;b=B;r=jc(q|0,b|0,19,0)|0;n=Cc(r|0,B|0,m|0,n|0)|0;m=B;b=pc(q|0,b|0,25)|0;b=Ac(l|0,o|0,b|0,B|0)|0;o=Cc(n|0,m|0,33554432,0)|0;o=ic(o|0,B|0,26)|0;l=B;k=Cc(p|0,k|0,o|0,l|0)|0;l=pc(o|0,l|0,26)|0;l=Ac(n|0,m|0,l|0,B|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=d;c[a+36>>2]=b;return}function ka(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;m=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;p=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;h=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;i=d[g+8+4>>0]|d[g+8+4+1>>0]<<8|d[g+8+4+2>>0]<<16|d[g+8+4+3>>0]<<24;f=pc(e|0,f|0,56)|0;g=B;if((c+e+(0-(e&7))|0)==(c|0)){r=h^2037671283;l=i^1952801890;o=m^1886610805;k=p^1936682341;j=h^1852075885;s=i^1685025377;i=m^1852142177;h=p^1819895653}else{u=c;r=h^2037671283;l=i^1952801890;o=m^1886610805;n=p^1936682341;k=h^1852075885;j=i^1685025377;i=m^1852142177;h=p^1819895653;while(1){v=u;t=d[v>>0]|d[v+1>>0]<<8|d[v+2>>0]<<16|d[v+3>>0]<<24;v=d[v+4>>0]|d[v+4+1>>0]<<8|d[v+4+2>>0]<<16|d[v+4+3>>0]<<24;p=t^r;r=v^l;m=Cc(o|0,n|0,k|0,j|0)|0;n=B;q=pc(k|0,j|0,13)|0;s=B;x=qc(k|0,j|0,51)|0;s=(s|B)^n;h=Cc(p|0,r|0,i|0,h|0)|0;i=B;o=pc(p|0,r|0,16)|0;j=B;k=qc(p|0,r|0,48)|0;j=(j|B)^i;n=Cc((o|k)^h|0,j|0,n|0,m|0)|0;r=B;l=pc((o|k)^h|0,j|0,21)|0;p=B;j=qc((o|k)^h|0,j|0,43)|0;p=(p|B)^r;i=Cc(h|0,i|0,(q|x)^m|0,s|0)|0;h=B;k=pc((q|x)^m|0,s|0,17)|0;o=B;s=qc((q|x)^m|0,s|0,47)|0;o=h^(o|B);r=Cc(n|0,r|0,i^(k|s)|0,o|0)|0;m=B;x=pc(i^(k|s)|0,o|0,13)|0;q=B;o=qc(i^(k|s)|0,o|0,51)|0;q=(q|B)^m;i=Cc((l|j)^n|0,p|0,h|0,i|0)|0;h=B;s=pc((l|j)^n|0,p|0,16)|0;k=B;p=qc((l|j)^n|0,p|0,48)|0;k=(k|B)^h;m=Cc((s|p)^i|0,k|0,m|0,r|0)|0;n=B;j=pc((s|p)^i|0,k|0,21)|0;l=B;k=qc((s|p)^i|0,k|0,43)|0;l=(l|B)^n;h=Cc(i|0,h|0,(x|o)^r|0,q|0)|0;i=B;p=pc((x|o)^r|0,q|0,17)|0;s=B;q=qc((x|o)^r|0,q|0,47)|0;s=(s|B)^i;u=u+8|0;if((u|0)==(c+e+(0-(e&7))|0)){c=c+e+(0-(e&7))|0;r=(j|k)^m;o=m^t;k=n^v;j=(p|q)^h;break}else{r=(j|k)^m;o=m^t;n=n^v;k=(p|q)^h;j=s}}}switch(e&7|0){case 7:{f=pc(d[c+6>>0]|0|0,0,48)|0|f;g=B|g;w=5;break}case 6:{w=5;break}case 5:{w=6;break}case 4:{w=7;break}case 3:{w=8;break}case 2:{w=9;break}case 1:{w=10;break}default:{}}if((w|0)==5){x=pc(d[c+5>>0]|0|0,0,40)|0;g=B|g;f=x|f;w=6}if((w|0)==6){g=d[c+4>>0]|0|g;w=7}if((w|0)==7){x=pc(d[c+3>>0]|0|0,0,24)|0;f=x|f;g=B|g;w=8}if((w|0)==8){x=pc(d[c+2>>0]|0|0,0,16)|0;f=x|f;g=B|g;w=9}if((w|0)==9){x=pc(d[c+1>>0]|0|0,0,8)|0;f=x|f;g=B|g;w=10}if((w|0)==10)f=d[c>>0]|0|f;u=f^r;n=g^l;e=Cc(o|0,k|0,j|0,s|0)|0;q=B;m=pc(j|0,s|0,13)|0;r=B;p=qc(j|0,s|0,51)|0;r=(r|B)^q;v=Cc(u|0,n|0,i|0,h|0)|0;c=B;w=pc(u|0,n|0,16)|0;x=B;n=qc(u|0,n|0,48)|0;x=(x|B)^c;q=Cc((w|n)^v|0,x|0,q|0,e|0)|0;u=B;o=pc((w|n)^v|0,x|0,21)|0;t=B;x=qc((w|n)^v|0,x|0,43)|0;t=(t|B)^u;c=Cc(v|0,c|0,(m|p)^e|0,r|0)|0;v=B;n=pc((m|p)^e|0,r|0,17)|0;w=B;r=qc((m|p)^e|0,r|0,47)|0;w=v^(w|B);u=Cc(q|0,u|0,c^(n|r)|0,w|0)|0;e=B;p=pc(c^(n|r)|0,w|0,13)|0;s=B;w=qc(c^(n|r)|0,w|0,51)|0;s=(s|B)^e;c=Cc((o|x)^q|0,t|0,v|0,c|0)|0;v=B;r=pc((o|x)^q|0,t|0,16)|0;n=B;t=qc((o|x)^q|0,t|0,48)|0;n=(n|B)^v;e=Cc((r|t)^c|0,n|0,e|0,u|0)|0;q=B;x=pc((r|t)^c|0,n|0,21)|0;o=B;n=qc((r|t)^c|0,n|0,43)|0;o=(o|B)^q;v=Cc(c|0,v|0,(p|w)^u|0,s|0)|0;c=B;t=pc((p|w)^u|0,s|0,17)|0;r=B;s=qc((p|w)^u|0,s|0,47)|0;r=(r|B)^c;q=Cc(e^f|0,q^g|0,(t|s)^v|0,r|0)|0;u=B;w=pc((t|s)^v|0,r|0,13)|0;p=B;r=qc((t|s)^v|0,r|0,51)|0;p=u^(p|B);v=Cc((x|n)^e|0,o|0,c^255|0,v|0)|0;c=B;s=pc((x|n)^e|0,o|0,16)|0;t=B;o=qc((x|n)^e|0,o|0,48)|0;t=(t|B)^c;u=Cc((s|o)^v|0,t|0,u|0,q|0)|0;e=B;n=pc((s|o)^v|0,t|0,21)|0;x=B;t=qc((s|o)^v|0,t|0,43)|0;x=(x|B)^e;c=Cc(v|0,c|0,q^(w|r)|0,p|0)|0;v=B;o=pc(q^(w|r)|0,p|0,17)|0;s=B;p=qc(q^(w|r)|0,p|0,47)|0;s=(s|B)^v;e=Cc(u|0,e|0,(o|p)^c|0,s|0)|0;r=B;w=pc((o|p)^c|0,s|0,13)|0;q=B;s=qc((o|p)^c|0,s|0,51)|0;q=(q|B)^r;c=Cc((n|t)^u|0,x|0,v|0,c|0)|0;v=B;p=pc((n|t)^u|0,x|0,16)|0;o=B;x=qc((n|t)^u|0,x|0,48)|0;o=(o|B)^v;r=Cc((p|x)^c|0,o|0,r|0,e|0)|0;u=B;t=pc((p|x)^c|0,o|0,21)|0;n=B;o=qc((p|x)^c|0,o|0,43)|0;n=(n|B)^u;v=Cc(c|0,v|0,(w|s)^e|0,q|0)|0;c=B;x=pc((w|s)^e|0,q|0,17)|0;p=B;q=qc((w|s)^e|0,q|0,47)|0;p=(p|B)^c;u=Cc(r|0,u|0,(x|q)^v|0,p|0)|0;e=B;s=pc((x|q)^v|0,p|0,13)|0;w=B;p=qc((x|q)^v|0,p|0,51)|0;w=(w|B)^e;v=Cc((t|o)^r|0,n|0,c|0,v|0)|0;c=B;q=pc((t|o)^r|0,n|0,16)|0;x=B;n=qc((t|o)^r|0,n|0,48)|0;x=(x|B)^c;e=Cc((q|n)^v|0,x|0,e|0,u|0)|0;r=B;o=pc((q|n)^v|0,x|0,21)|0;t=B;x=qc((q|n)^v|0,x|0,43)|0;t=(t|B)^r;c=Cc(v|0,c|0,(s|p)^u|0,w|0)|0;v=B;n=pc((s|p)^u|0,w|0,17)|0;q=B;w=qc((s|p)^u|0,w|0,47)|0;q=(q|B)^v;r=Cc(e|0,r|0,(n|w)^c|0,q|0)|0;u=B;p=pc((n|w)^c|0,q|0,13)|0;s=B;q=qc((n|w)^c|0,q|0,51)|0;u=(s|B)^u;c=Cc((o|x)^e|0,t|0,v|0,c|0)|0;v=B;s=pc((o|x)^e|0,t|0,16)|0;w=B;t=qc((o|x)^e|0,t|0,48)|0;w=(w|B)^v;e=pc((s|t)^c|0,w|0,21)|0;x=B;w=qc((s|t)^c|0,w|0,43)|0;x=x|B;v=Cc(c|0,v|0,(p|q)^r|0,u|0)|0;c=B;t=pc((p|q)^r|0,u|0,17)|0;s=B;u=qc((p|q)^r|0,u|0,47)|0;x=(s|B)^c^v^x;a[b>>0]=(t|u)^v^c^(e|w);a[b+1>>0]=((t|u)^v^c^(e|w))>>8;a[b+2>>0]=((t|u)^v^c^(e|w))>>16;a[b+3>>0]=((t|u)^v^c^(e|w))>>24;a[b+4>>0]=x;a[b+4+1>>0]=x>>8;a[b+4+2>>0]=x>>16;a[b+4+3>>0]=x>>24;return}function la(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if(!a)return;h=c[8402]|0;if((a+-8|0)>>>0<h>>>0)X();b=c[a+-4>>2]|0;if((b&3|0)==1)X();n=a+-8+(b&-8)|0;do if(!(b&1)){e=c[a+-8>>2]|0;if(!(b&3))return;k=a+-8+(0-e)|0;j=e+(b&-8)|0;if(k>>>0<h>>>0)X();if((k|0)==(c[8403]|0)){a=c[n+4>>2]|0;if((a&3|0)!=3){q=k;f=j;break}c[8400]=j;c[n+4>>2]=a&-2;c[k+4>>2]=j|1;c[k+j>>2]=j;return}if(e>>>0<256){a=c[k+8>>2]|0;b=c[k+12>>2]|0;if((a|0)!=(33632+(e>>>3<<1<<2)|0)){if(a>>>0<h>>>0)X();if((c[a+12>>2]|0)!=(k|0))X()}if((b|0)==(a|0)){c[8398]=c[8398]&~(1<<(e>>>3));q=k;f=j;break}if((b|0)!=(33632+(e>>>3<<1<<2)|0)){if(b>>>0<h>>>0)X();if((c[b+8>>2]|0)!=(k|0))X();else d=b+8|0}else d=b+8|0;c[a+12>>2]=b;c[d>>2]=a;q=k;f=j;break}g=c[k+24>>2]|0;a=c[k+12>>2]|0;do if((a|0)==(k|0)){a=c[k+16+4>>2]|0;if(!a){a=c[k+16>>2]|0;if(!a){i=0;break}else e=k+16|0}else e=k+16+4|0;while(1){b=a+20|0;d=c[b>>2]|0;if(d|0){a=d;e=b;continue}b=a+16|0;d=c[b>>2]|0;if(!d)break;else{a=d;e=b}}if(e>>>0<h>>>0)X();else{c[e>>2]=0;i=a;break}}else{b=c[k+8>>2]|0;if(b>>>0<h>>>0)X();if((c[b+12>>2]|0)!=(k|0))X();if((c[a+8>>2]|0)==(k|0)){c[b+12>>2]=a;c[a+8>>2]=b;i=a;break}else X()}while(0);if(g){a=c[k+28>>2]|0;if((k|0)==(c[33896+(a<<2)>>2]|0)){c[33896+(a<<2)>>2]=i;if(!i){c[8399]=c[8399]&~(1<<a);q=k;f=j;break}}else{if(g>>>0<(c[8402]|0)>>>0)X();if((c[g+16>>2]|0)==(k|0))c[g+16>>2]=i;else c[g+20>>2]=i;if(!i){q=k;f=j;break}}b=c[8402]|0;if(i>>>0<b>>>0)X();c[i+24>>2]=g;a=c[k+16>>2]|0;do if(a|0)if(a>>>0<b>>>0)X();else{c[i+16>>2]=a;c[a+24>>2]=i;break}while(0);a=c[k+16+4>>2]|0;if(a)if(a>>>0<(c[8402]|0)>>>0)X();else{c[i+20>>2]=a;c[a+24>>2]=i;q=k;f=j;break}else{q=k;f=j}}else{q=k;f=j}}else{q=a+-8|0;f=b&-8}while(0);if(q>>>0>=n>>>0)X();d=c[n+4>>2]|0;if(!(d&1))X();if(!(d&2)){if((n|0)==(c[8404]|0)){p=(c[8401]|0)+f|0;c[8401]=p;c[8404]=q;c[q+4>>2]=p|1;if((q|0)!=(c[8403]|0))return;c[8403]=0;c[8400]=0;return}if((n|0)==(c[8403]|0)){p=(c[8400]|0)+f|0;c[8400]=p;c[8403]=q;c[q+4>>2]=p|1;c[q+p>>2]=p;return}f=(d&-8)+f|0;do if(d>>>0>=256){g=c[n+24>>2]|0;a=c[n+12>>2]|0;do if((a|0)==(n|0)){a=c[n+16+4>>2]|0;if(!a){a=c[n+16>>2]|0;if(!a){m=0;break}else e=n+16|0}else e=n+16+4|0;while(1){b=a+20|0;d=c[b>>2]|0;if(d|0){a=d;e=b;continue}b=a+16|0;d=c[b>>2]|0;if(!d)break;else{a=d;e=b}}if(e>>>0<(c[8402]|0)>>>0)X();else{c[e>>2]=0;m=a;break}}else{b=c[n+8>>2]|0;if(b>>>0<(c[8402]|0)>>>0)X();if((c[b+12>>2]|0)!=(n|0))X();if((c[a+8>>2]|0)==(n|0)){c[b+12>>2]=a;c[a+8>>2]=b;m=a;break}else X()}while(0);if(g|0){a=c[n+28>>2]|0;if((n|0)==(c[33896+(a<<2)>>2]|0)){c[33896+(a<<2)>>2]=m;if(!m){c[8399]=c[8399]&~(1<<a);break}}else{if(g>>>0<(c[8402]|0)>>>0)X();if((c[g+16>>2]|0)==(n|0))c[g+16>>2]=m;else c[g+20>>2]=m;if(!m)break}b=c[8402]|0;if(m>>>0<b>>>0)X();c[m+24>>2]=g;a=c[n+16>>2]|0;do if(a|0)if(a>>>0<b>>>0)X();else{c[m+16>>2]=a;c[a+24>>2]=m;break}while(0);a=c[n+16+4>>2]|0;if(a|0)if(a>>>0<(c[8402]|0)>>>0)X();else{c[m+20>>2]=a;c[a+24>>2]=m;break}}}else{a=c[n+8>>2]|0;b=c[n+12>>2]|0;if((a|0)!=(33632+(d>>>3<<1<<2)|0)){if(a>>>0<(c[8402]|0)>>>0)X();if((c[a+12>>2]|0)!=(n|0))X()}if((b|0)==(a|0)){c[8398]=c[8398]&~(1<<(d>>>3));break}if((b|0)!=(33632+(d>>>3<<1<<2)|0)){if(b>>>0<(c[8402]|0)>>>0)X();if((c[b+8>>2]|0)!=(n|0))X();else l=b+8|0}else l=b+8|0;c[a+12>>2]=b;c[l>>2]=a}while(0);c[q+4>>2]=f|1;c[q+f>>2]=f;if((q|0)==(c[8403]|0)){c[8400]=f;return}}else{c[n+4>>2]=d&-2;c[q+4>>2]=f|1;c[q+f>>2]=f}b=f>>>3;if(f>>>0<256){a=c[8398]|0;if(a&1<<b){a=c[33632+(b<<1<<2)+8>>2]|0;if(a>>>0<(c[8402]|0)>>>0)X();else{o=33632+(b<<1<<2)+8|0;p=a}}else{c[8398]=a|1<<b;o=33632+(b<<1<<2)+8|0;p=33632+(b<<1<<2)|0}c[o>>2]=q;c[p+12>>2]=q;c[q+8>>2]=p;c[q+12>>2]=33632+(b<<1<<2);return}a=f>>>8;if(a)if(f>>>0>16777215)d=31;else{d=a<<((a+1048320|0)>>>16&8)<<(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4);d=14-(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4|(a+1048320|0)>>>16&8|(d+245760|0)>>>16&2)+(d<<((d+245760|0)>>>16&2)>>>15)|0;d=f>>>(d+7|0)&1|d<<1}else d=0;e=33896+(d<<2)|0;c[q+28>>2]=d;c[q+20>>2]=0;c[q+16>>2]=0;a=c[8399]|0;b=1<<d;do if(a&b){d=f<<((d|0)==31?0:25-(d>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f|0)){a=130;break}b=e+16+(d>>>31<<2)|0;a=c[b>>2]|0;if(!a){a=127;break}else{d=d<<1;e=a}}if((a|0)==127)if(b>>>0<(c[8402]|0)>>>0)X();else{c[b>>2]=q;c[q+24>>2]=e;c[q+12>>2]=q;c[q+8>>2]=q;break}else if((a|0)==130){a=e+8|0;b=c[a>>2]|0;p=c[8402]|0;if(b>>>0>=p>>>0&e>>>0>=p>>>0){c[b+12>>2]=q;c[a>>2]=q;c[q+8>>2]=b;c[q+12>>2]=e;c[q+24>>2]=0;break}else X()}}else{c[8399]=a|b;c[e>>2]=q;c[q+24>>2]=e;c[q+12>>2]=q;c[q+8>>2]=q}while(0);q=(c[8406]|0)+-1|0;c[8406]=q;if(!q)a=34048;else return;while(1){a=c[a>>2]|0;if(!a)break;else a=a+8|0}c[8406]=-1;return}function ma(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0;U=i;T=i=i+63&-64;i=i+64|0;if(!((g|0)==0&(h|0)==0)){if(h>>>0>63|(h|0)==63&g>>>0>4294967232)X();F=c[b>>2]|0;G=c[b+4>>2]|0;H=c[b+8>>2]|0;I=c[b+12>>2]|0;J=c[b+16>>2]|0;K=c[b+20>>2]|0;L=c[b+24>>2]|0;M=c[b+28>>2]|0;N=c[b+32>>2]|0;O=c[b+36>>2]|0;P=c[b+40>>2]|0;Q=c[b+44>>2]|0;R=c[b+56>>2]|0;S=c[b+60>>2]|0;j=0;l=c[b+48>>2]|0;D=c[b+52>>2]|0;while(1){E=h>>>0<0|(h|0)==0&g>>>0<64;if(E){j=T;k=j+64|0;do{a[j>>0]=0;j=j+1|0}while((j|0)<(k|0));j=0;do{a[T+j>>0]=a[e+j>>0]|0;j=j+1|0}while(0<h>>>0|0==(h|0)&j>>>0<g>>>0);e=T;C=T;j=f}else C=f;f=20;k=F;m=G;n=P;o=Q;p=l;q=D;r=R;s=S;t=H;u=I;v=J;w=K;x=L;y=M;z=N;A=O;do{na=k+v|0;ca=na^p;ba=(ca<<16|ca>>>16)+z|0;ma=ba^v;ca=(ma<<12|ma>>>20)+na^(ca<<16|ca>>>16);V=(ca<<8|ca>>>24)+ba^(ma<<12|ma>>>20);ja=m+w|0;Y=ja^q;W=(Y<<16|Y>>>16)+A|0;ia=W^w;Y=(ia<<12|ia>>>20)+ja^(Y<<16|Y>>>16);ka=(Y<<8|Y>>>24)+W^(ia<<12|ia>>>20);ea=t+x|0;Z=ea^r;la=(Z<<16|Z>>>16)+n|0;da=la^x;Z=(da<<12|da>>>20)+ea^(Z<<16|Z>>>16);fa=(Z<<8|Z>>>24)+la^(da<<12|da>>>20);_=u+y|0;ha=_^s;ga=(ha<<16|ha>>>16)+o|0;$=ga^y;ha=($<<12|$>>>20)+_^(ha<<16|ha>>>16);aa=(ha<<8|ha>>>24)+ga^($<<12|$>>>20);na=(ka<<7|ka>>>25)+((ma<<12|ma>>>20)+na)|0;ma=(na^(ha<<8|ha>>>24))<<16|(na^(ha<<8|ha>>>24))>>>16;ka=ma+((Z<<8|Z>>>24)+la)^(ka<<7|ka>>>25);k=(ka<<12|ka>>>20)+na|0;na=k^ma;s=na<<8|na>>>24;n=s+(ma+((Z<<8|Z>>>24)+la))|0;ka=n^(ka<<12|ka>>>20);w=ka<<7|ka>>>25;ja=(fa<<7|fa>>>25)+((ia<<12|ia>>>20)+ja)|0;ia=(ja^(ca<<8|ca>>>24))<<16|(ja^(ca<<8|ca>>>24))>>>16;fa=ia+((ha<<8|ha>>>24)+ga)^(fa<<7|fa>>>25);m=(fa<<12|fa>>>20)+ja|0;ja=m^ia;p=ja<<8|ja>>>24;o=p+(ia+((ha<<8|ha>>>24)+ga))|0;fa=o^(fa<<12|fa>>>20);x=fa<<7|fa>>>25;ea=(aa<<7|aa>>>25)+((da<<12|da>>>20)+ea)|0;da=(ea^(Y<<8|Y>>>24))<<16|(ea^(Y<<8|Y>>>24))>>>16;aa=da+((ca<<8|ca>>>24)+ba)^(aa<<7|aa>>>25);t=(aa<<12|aa>>>20)+ea|0;ea=t^da;q=ea<<8|ea>>>24;z=q+(da+((ca<<8|ca>>>24)+ba))|0;aa=z^(aa<<12|aa>>>20);y=aa<<7|aa>>>25;_=(V<<7|V>>>25)+(($<<12|$>>>20)+_)|0;Z=(_^(Z<<8|Z>>>24))<<16|(_^(Z<<8|Z>>>24))>>>16;V=Z+((Y<<8|Y>>>24)+W)^(V<<7|V>>>25);u=(V<<12|V>>>20)+_|0;_=u^Z;r=_<<8|_>>>24;A=r+(Z+((Y<<8|Y>>>24)+W))|0;V=A^(V<<12|V>>>20);v=V<<7|V>>>25;f=f+-2|0}while((f|0)!=0);f=(d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24)^k+F;_=e+4|0;_=(d[_>>0]|d[_+1>>0]<<8|d[_+2>>0]<<16|d[_+3>>0]<<24)^m+G;$=e+8|0;$=(d[$>>0]|d[$+1>>0]<<8|d[$+2>>0]<<16|d[$+3>>0]<<24)^t+H;aa=e+12|0;aa=(d[aa>>0]|d[aa+1>>0]<<8|d[aa+2>>0]<<16|d[aa+3>>0]<<24)^u+I;ba=e+16|0;ba=(d[ba>>0]|d[ba+1>>0]<<8|d[ba+2>>0]<<16|d[ba+3>>0]<<24)^v+J;ca=e+20|0;ca=(d[ca>>0]|d[ca+1>>0]<<8|d[ca+2>>0]<<16|d[ca+3>>0]<<24)^w+K;da=e+24|0;da=(d[da>>0]|d[da+1>>0]<<8|d[da+2>>0]<<16|d[da+3>>0]<<24)^x+L;ea=e+28|0;ea=(d[ea>>0]|d[ea+1>>0]<<8|d[ea+2>>0]<<16|d[ea+3>>0]<<24)^y+M;fa=e+32|0;fa=(d[fa>>0]|d[fa+1>>0]<<8|d[fa+2>>0]<<16|d[fa+3>>0]<<24)^z+N;ga=e+36|0;ga=(d[ga>>0]|d[ga+1>>0]<<8|d[ga+2>>0]<<16|d[ga+3>>0]<<24)^A+O;ha=e+40|0;ha=(d[ha>>0]|d[ha+1>>0]<<8|d[ha+2>>0]<<16|d[ha+3>>0]<<24)^n+P;ia=e+44|0;ia=(d[ia>>0]|d[ia+1>>0]<<8|d[ia+2>>0]<<16|d[ia+3>>0]<<24)^o+Q;ja=e+48|0;ja=(d[ja>>0]|d[ja+1>>0]<<8|d[ja+2>>0]<<16|d[ja+3>>0]<<24)^p+l;ka=e+52|0;ka=(d[ka>>0]|d[ka+1>>0]<<8|d[ka+2>>0]<<16|d[ka+3>>0]<<24)^q+D;la=e+56|0;la=(d[la>>0]|d[la+1>>0]<<8|d[la+2>>0]<<16|d[la+3>>0]<<24)^r+R;ma=e+60|0;ma=(d[ma>>0]|d[ma+1>>0]<<8|d[ma+2>>0]<<16|d[ma+3>>0]<<24)^s+S;l=l+1|0;k=((l|0)==0&1)+D|0;a[C>>0]=f;a[C+1>>0]=f>>8;a[C+2>>0]=f>>16;a[C+3>>0]=f>>24;na=C+4|0;a[na>>0]=_;a[na+1>>0]=_>>8;a[na+2>>0]=_>>16;a[na+3>>0]=_>>24;na=C+8|0;a[na>>0]=$;a[na+1>>0]=$>>8;a[na+2>>0]=$>>16;a[na+3>>0]=$>>24;na=C+12|0;a[na>>0]=aa;a[na+1>>0]=aa>>8;a[na+2>>0]=aa>>16;a[na+3>>0]=aa>>24;na=C+16|0;a[na>>0]=ba;a[na+1>>0]=ba>>8;a[na+2>>0]=ba>>16;a[na+3>>0]=ba>>24;na=C+20|0;a[na>>0]=ca;a[na+1>>0]=ca>>8;a[na+2>>0]=ca>>16;a[na+3>>0]=ca>>24;na=C+24|0;a[na>>0]=da;a[na+1>>0]=da>>8;a[na+2>>0]=da>>16;a[na+3>>0]=da>>24;na=C+28|0;a[na>>0]=ea;a[na+1>>0]=ea>>8;a[na+2>>0]=ea>>16;a[na+3>>0]=ea>>24;na=C+32|0;a[na>>0]=fa;a[na+1>>0]=fa>>8;a[na+2>>0]=fa>>16;a[na+3>>0]=fa>>24;na=C+36|0;a[na>>0]=ga;a[na+1>>0]=ga>>8;a[na+2>>0]=ga>>16;a[na+3>>0]=ga>>24;na=C+40|0;a[na>>0]=ha;a[na+1>>0]=ha>>8;a[na+2>>0]=ha>>16;a[na+3>>0]=ha>>24;na=C+44|0;a[na>>0]=ia;a[na+1>>0]=ia>>8;a[na+2>>0]=ia>>16;a[na+3>>0]=ia>>24;na=C+48|0;a[na>>0]=ja;a[na+1>>0]=ja>>8;a[na+2>>0]=ja>>16;a[na+3>>0]=ja>>24;na=C+52|0;a[na>>0]=ka;a[na+1>>0]=ka>>8;a[na+2>>0]=ka>>16;a[na+3>>0]=ka>>24;na=C+56|0;a[na>>0]=la;a[na+1>>0]=la>>8;a[na+2>>0]=la>>16;a[na+3>>0]=la>>24;na=C+60|0;a[na>>0]=ma;a[na+1>>0]=ma>>8;a[na+2>>0]=ma>>16;a[na+3>>0]=ma>>24;if(h>>>0<0|(h|0)==0&g>>>0<65)break;D=Cc(g|0,h|0,-64,-1)|0;e=e+64|0;f=C+64|0;h=B;g=D;D=k}if((E?g|0:0)?(a[j>>0]=f,(g|0)!=1):0){e=1;do{a[j+e>>0]=a[C+e>>0]|0;e=e+1|0}while((e|0)!=(g|0))}c[b+48>>2]=l;c[b+52>>2]=k}i=U;return}function na(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0;j=i;k=i=i+63&-64;i=i+320|0;h=k+280|0;g=h+32|0;do{a[h>>0]=a[e>>0]|0;h=h+1|0;e=e+1|0}while((h|0)<(g|0));a[k+280>>0]=(d[k+280>>0]|0)&248;a[k+280+31>>0]=(d[k+280+31>>0]|0)&63|64;pa(k+240|0,f);sc(k+200|0);Gc(k+160|0);qb(k+120|0,k+240|0);sc(k+80|0);e=254;g=0;while(1){C=g;g=(d[k+280+((e|0)/8|0)>>0]|0)>>>(e&7)&1;C=g^C;La(k+200|0,k+120|0,C);La(k+160|0,k+80|0,C);Za(k+40|0,k+120|0,k+80|0);Za(k,k+200|0,k+160|0);_a(k+200|0,k+200|0,k+160|0);_a(k+160|0,k+120|0,k+80|0);ha(k+80|0,k+40|0,k+200|0);ha(k+160|0,k+160|0,k);ja(k+40|0,k);ja(k,k+200|0);_a(k+120|0,k+80|0,k+160|0);Za(k+160|0,k+80|0,k+160|0);ha(k+200|0,k,k+40|0);Za(k,k,k+40|0);ja(k+160|0,k+160|0);C=c[k>>2]|0;A=c[k+4>>2]|0;z=c[k+8>>2]|0;y=c[k+12>>2]|0;x=c[k+16>>2]|0;s=c[k+20>>2]|0;v=c[k+24>>2]|0;E=c[k+28>>2]|0;t=c[k+32>>2]|0;D=c[k+36>>2]|0;C=jc(C|0,((C|0)<0)<<31>>31|0,121666,0)|0;q=B;A=jc(A|0,((A|0)<0)<<31>>31|0,121666,0)|0;r=B;z=jc(z|0,((z|0)<0)<<31>>31|0,121666,0)|0;o=B;y=jc(y|0,((y|0)<0)<<31>>31|0,121666,0)|0;p=B;x=jc(x|0,((x|0)<0)<<31>>31|0,121666,0)|0;m=B;s=jc(s|0,((s|0)<0)<<31>>31|0,121666,0)|0;n=B;v=jc(v|0,((v|0)<0)<<31>>31|0,121666,0)|0;f=B;E=jc(E|0,((E|0)<0)<<31>>31|0,121666,0)|0;l=B;t=jc(t|0,((t|0)<0)<<31>>31|0,121666,0)|0;u=B;D=jc(D|0,((D|0)<0)<<31>>31|0,121666,0)|0;h=B;F=Cc(D|0,h|0,16777216,0)|0;F=ic(F|0,B|0,25)|0;w=B;G=jc(F|0,w|0,19,0)|0;q=Cc(G|0,B|0,C|0,q|0)|0;C=B;w=pc(F|0,w|0,25)|0;w=Ac(D|0,h|0,w|0,B|0)|0;h=B;D=Cc(A|0,r|0,16777216,0)|0;D=ic(D|0,B|0,25)|0;F=B;o=Cc(D|0,F|0,z|0,o|0)|0;z=B;F=pc(D|0,F|0,25)|0;F=Ac(A|0,r|0,F|0,B|0)|0;r=B;A=Cc(y|0,p|0,16777216,0)|0;A=ic(A|0,B|0,25)|0;D=B;m=Cc(A|0,D|0,x|0,m|0)|0;x=B;D=pc(A|0,D|0,25)|0;D=Ac(y|0,p|0,D|0,B|0)|0;p=B;y=Cc(s|0,n|0,16777216,0)|0;y=ic(y|0,B|0,25)|0;A=B;f=Cc(y|0,A|0,v|0,f|0)|0;v=B;A=pc(y|0,A|0,25)|0;A=Ac(s|0,n|0,A|0,B|0)|0;n=B;s=Cc(E|0,l|0,16777216,0)|0;s=ic(s|0,B|0,25)|0;y=B;u=Cc(s|0,y|0,t|0,u|0)|0;t=B;y=pc(s|0,y|0,25)|0;y=Ac(E|0,l|0,y|0,B|0)|0;l=B;E=Cc(q|0,C|0,33554432,0)|0;E=ic(E|0,B|0,26)|0;s=B;r=Cc(F|0,r|0,E|0,s|0)|0;s=pc(E|0,s|0,26)|0;s=Ac(q|0,C|0,s|0,B|0)|0;C=Cc(o|0,z|0,33554432,0)|0;C=ic(C|0,B|0,26)|0;q=B;p=Cc(D|0,p|0,C|0,q|0)|0;q=pc(C|0,q|0,26)|0;q=Ac(o|0,z|0,q|0,B|0)|0;z=Cc(m|0,x|0,33554432,0)|0;z=ic(z|0,B|0,26)|0;o=B;n=Cc(A|0,n|0,z|0,o|0)|0;o=pc(z|0,o|0,26)|0;o=Ac(m|0,x|0,o|0,B|0)|0;x=Cc(f|0,v|0,33554432,0)|0;x=ic(x|0,B|0,26)|0;m=B;l=Cc(y|0,l|0,x|0,m|0)|0;m=pc(x|0,m|0,26)|0;m=Ac(f|0,v|0,m|0,B|0)|0;v=Cc(u|0,t|0,33554432,0)|0;v=ic(v|0,B|0,26)|0;f=B;h=Cc(w|0,h|0,v|0,f|0)|0;f=pc(v|0,f|0,26)|0;f=Ac(u|0,t|0,f|0,B|0)|0;c[k+80>>2]=s;c[k+80+4>>2]=r;c[k+80+8>>2]=q;c[k+80+12>>2]=p;c[k+80+16>>2]=o;c[k+80+20>>2]=n;c[k+80+24>>2]=m;c[k+80+28>>2]=l;c[k+80+32>>2]=f;c[k+80+36>>2]=h;ja(k+120|0,k+120|0);_a(k+40|0,k+40|0,k+80|0);ha(k+80|0,k+240|0,k+160|0);ha(k+160|0,k,k+40|0);if((e|0)<=0)break;else e=e+-1|0}La(k+200|0,k+120|0,g);La(k+160|0,k+80|0,g);ua(k+160|0,k+160|0);ha(k+200|0,k+200|0,k+160|0);xa(b,k+200|0);i=j;return 0}function oa(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;z=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;B=d[e+4>>0]|d[e+4+1>>0]<<8|d[e+4+2>>0]<<16|d[e+4+3>>0]<<24;C=d[e+8>>0]|d[e+8+1>>0]<<8|d[e+8+2>>0]<<16|d[e+8+3>>0]<<24;D=d[e+12>>0]|d[e+12+1>>0]<<8|d[e+12+2>>0]<<16|d[e+12+3>>0]<<24;E=d[c>>0]|d[c+1>>0]<<8|d[c+2>>0]<<16|d[c+3>>0]<<24;F=d[c+4>>0]|d[c+4+1>>0]<<8|d[c+4+2>>0]<<16|d[c+4+3>>0]<<24;A=d[c+8>>0]|d[c+8+1>>0]<<8|d[c+8+2>>0]<<16|d[c+8+3>>0]<<24;v=d[c+12>>0]|d[c+12+1>>0]<<8|d[c+12+2>>0]<<16|d[c+12+3>>0]<<24;w=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;x=d[e+20>>0]|d[e+20+1>>0]<<8|d[e+20+2>>0]<<16|d[e+20+3>>0]<<24;y=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;c=d[e+28>>0]|d[e+28+1>>0]<<8|d[e+28+2>>0]<<16|d[e+28+3>>0]<<24;e=20;f=1634760805;g=z;h=2036477234;i=w;j=x;k=y;l=c;m=1797285236;n=B;o=C;p=D;q=857760878;r=E;s=F;t=A;u=v;while(1){P=f+j|0;P=(P>>>25|P<<7)^p;M=P+f|0;M=(M>>>23|M<<9)^t;J=((M+P|0)>>>19|M+P<<13)^j;S=((J+M|0)>>>14|J+M<<18)^f;L=g+q|0;L=(L>>>25|L<<7)^u;I=L+q|0;I=(I>>>23|I<<9)^k;V=((I+L|0)>>>19|I+L<<13)^g;O=((V+I|0)>>>14|V+I<<18)^q;H=r+h|0;H=(H>>>25|H<<7)^l;U=H+h|0;U=(U>>>23|U<<9)^n;R=((U+H|0)>>>19|U+H<<13)^r;K=((R+U|0)>>>14|R+U<<18)^h;T=i+m|0;T=o^(T>>>25|T<<7);Q=T+m|0;Q=(Q>>>23|Q<<9)^s;N=((Q+T|0)>>>19|Q+T<<13)^i;G=((N+Q|0)>>>14|N+Q<<18)^m;g=((S+T|0)>>>25|S+T<<7)^V;V=g+S|0;n=(V>>>23|V<<9)^U;U=n+g|0;o=(U>>>19|U<<13)^T;T=o+n|0;f=(T>>>14|T<<18)^S;r=((O+P|0)>>>25|O+P<<7)^R;R=r+O|0;s=(R>>>23|R<<9)^Q;Q=s+r|0;p=(Q>>>19|Q<<13)^P;P=p+s|0;q=(P>>>14|P<<18)^O;i=((K+L|0)>>>25|K+L<<7)^N;N=i+K|0;t=(N>>>23|N<<9)^M;M=t+i|0;u=(M>>>19|M<<13)^L;L=u+t|0;h=(L>>>14|L<<18)^K;j=((G+H|0)>>>25|G+H<<7)^J;J=j+G|0;k=(J>>>23|J<<9)^I;I=k+j|0;l=(I>>>19|I<<13)^H;H=l+k|0;m=(H>>>14|H<<18)^G;if((e|0)<=2)break;else e=e+-2|0}G=f+1634760805|0;H=g+z|0;I=n+B|0;J=o+C|0;K=p+D|0;L=q+857760878|0;M=r+E|0;N=s+F|0;O=t+A|0;P=u+v|0;Q=h+2036477234|0;R=i+w|0;S=j+x|0;T=k+y|0;U=l+c|0;V=m+1797285236|0;a[b>>0]=G;a[b+1>>0]=G>>8;a[b+2>>0]=G>>16;a[b+3>>0]=G>>24;a[b+4>>0]=H;a[b+4+1>>0]=H>>8;a[b+4+2>>0]=H>>16;a[b+4+3>>0]=H>>24;a[b+8>>0]=I;a[b+8+1>>0]=I>>8;a[b+8+2>>0]=I>>16;a[b+8+3>>0]=I>>24;a[b+12>>0]=J;a[b+12+1>>0]=J>>8;a[b+12+2>>0]=J>>16;a[b+12+3>>0]=J>>24;a[b+16>>0]=K;a[b+16+1>>0]=K>>8;a[b+16+2>>0]=K>>16;a[b+16+3>>0]=K>>24;a[b+20>>0]=L;a[b+20+1>>0]=L>>8;a[b+20+2>>0]=L>>16;a[b+20+3>>0]=L>>24;a[b+24>>0]=M;a[b+24+1>>0]=M>>8;a[b+24+2>>0]=M>>16;a[b+24+3>>0]=M>>24;a[b+28>>0]=N;a[b+28+1>>0]=N>>8;a[b+28+2>>0]=N>>16;a[b+28+3>>0]=N>>24;a[b+32>>0]=O;a[b+32+1>>0]=O>>8;a[b+32+2>>0]=O>>16;a[b+32+3>>0]=O>>24;a[b+36>>0]=P;a[b+36+1>>0]=P>>8;a[b+36+2>>0]=P>>16;a[b+36+3>>0]=P>>24;a[b+40>>0]=Q;a[b+40+1>>0]=Q>>8;a[b+40+2>>0]=Q>>16;a[b+40+3>>0]=Q>>24;a[b+44>>0]=R;a[b+44+1>>0]=R>>8;a[b+44+2>>0]=R>>16;a[b+44+3>>0]=R>>24;a[b+48>>0]=S;a[b+48+1>>0]=S>>8;a[b+48+2>>0]=S>>16;a[b+48+3>>0]=S>>24;a[b+52>>0]=T;a[b+52+1>>0]=T>>8;a[b+52+2>>0]=T>>16;a[b+52+3>>0]=T>>24;a[b+56>>0]=U;a[b+56+1>>0]=U>>8;a[b+56+2>>0]=U>>16;a[b+56+3>>0]=U>>24;a[b+60>>0]=V;a[b+60+1>>0]=V>>8;a[b+60+2>>0]=V>>16;a[b+60+3>>0]=V>>24;return}function pa(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;J=d[b>>0]|0;h=pc(d[b+1>>0]|0|0,0,8)|0;k=B;F=pc(d[b+2>>0]|0|0,0,16)|0;k=k|B;E=pc(d[b+3>>0]|0|0,0,24)|0;k=k|B;C=d[b+4>>0]|0;D=pc(d[b+5>>0]|0|0,0,8)|0;j=B;l=pc(d[b+6>>0]|0|0,0,16)|0;j=pc(D|C|l|0,j|B|0,6)|0;l=B;C=d[b+7>>0]|0;D=pc(d[b+8>>0]|0|0,0,8)|0;w=B;i=pc(d[b+9>>0]|0|0,0,16)|0;w=pc(D|C|i|0,w|B|0,5)|0;i=B;C=d[b+10>>0]|0;D=pc(d[b+11>>0]|0|0,0,8)|0;H=B;G=pc(d[b+12>>0]|0|0,0,16)|0;H=pc(D|C|G|0,H|B|0,3)|0;G=B;C=d[b+13>>0]|0;D=pc(d[b+14>>0]|0|0,0,8)|0;s=B;g=pc(d[b+15>>0]|0|0,0,16)|0;s=pc(D|C|g|0,s|B|0,2)|0;g=B;C=d[b+16>>0]|0;D=pc(d[b+17>>0]|0|0,0,8)|0;y=B;A=pc(d[b+18>>0]|0|0,0,16)|0;y=y|B;z=pc(d[b+19>>0]|0|0,0,24)|0;y=y|B;q=d[b+20>>0]|0;x=pc(d[b+21>>0]|0|0,0,8)|0;p=B;e=pc(d[b+22>>0]|0|0,0,16)|0;p=pc(x|q|e|0,p|B|0,7)|0;e=B;q=d[b+23>>0]|0;x=pc(d[b+24>>0]|0|0,0,8)|0;v=B;u=pc(d[b+25>>0]|0|0,0,16)|0;v=pc(x|q|u|0,v|B|0,5)|0;u=B;q=d[b+26>>0]|0;x=pc(d[b+27>>0]|0|0,0,8)|0;n=B;o=pc(d[b+28>>0]|0|0,0,16)|0;n=pc(x|q|o|0,n|B|0,4)|0;o=B;q=d[b+29>>0]|0;x=pc(d[b+30>>0]|0|0,0,8)|0;r=B;b=pc(d[b+31>>0]|0|0,0,16)|0;r=pc(x|q|b|0,r|B|0,2)|0;b=Cc(r&33554428|0,0,16777216,0)|0;b=qc(b|0,B|0,25)|0;q=B;x=Ac(0,0,b|0,q|0)|0;k=Cc(x&19|0,0,h|J|F|E|0,k|0)|0;E=B;q=pc(b|0,q|0,25)|0;b=B;F=Cc(j|0,l|0,16777216,0)|0;F=qc(F|0,B|0,25)|0;J=B;i=Cc(w|0,i|0,F|0,J|0)|0;w=B;J=pc(F|0,J|0,25)|0;J=Ac(j|0,l|0,J|0,B|0)|0;l=B;j=Cc(H|0,G|0,16777216,0)|0;j=qc(j|0,B|0,25)|0;F=B;g=Cc(s|0,g|0,j|0,F|0)|0;s=B;F=pc(j|0,F|0,25)|0;j=B;h=Cc(D|C|A|z|0,y|0,16777216,0)|0;h=qc(h|0,B|0,25)|0;x=B;e=Cc(p|0,e|0,h|0,x|0)|0;p=B;x=pc(h|0,x|0,25)|0;h=B;f=Cc(v|0,u|0,16777216,0)|0;f=qc(f|0,B|0,25)|0;t=B;o=Cc(n|0,o|0,f|0,t|0)|0;n=B;t=pc(f|0,t|0,25)|0;f=B;I=Cc(k|0,E|0,33554432,0)|0;I=ic(I|0,B|0,26)|0;m=B;l=Cc(J|0,l|0,I|0,m|0)|0;m=pc(I|0,m|0,26)|0;m=Ac(k|0,E|0,m|0,B|0)|0;E=Cc(i|0,w|0,33554432,0)|0;E=ic(E|0,B|0,26)|0;k=B;G=Cc(E|0,k|0,H|0,G|0)|0;j=Ac(G|0,B|0,F|0,j|0)|0;k=pc(E|0,k|0,26)|0;k=Ac(i|0,w|0,k|0,B|0)|0;w=Cc(g|0,s|0,33554432,0)|0;w=ic(w|0,B|0,26)|0;i=B;y=Cc(w|0,i|0,D|C|A|z|0,y|0)|0;h=Ac(y|0,B|0,x|0,h|0)|0;i=pc(w|0,i|0,26)|0;i=Ac(g|0,s|0,i|0,B|0)|0;s=Cc(e|0,p|0,33554432,0)|0;s=ic(s|0,B|0,26)|0;g=B;u=Cc(s|0,g|0,v|0,u|0)|0;f=Ac(u|0,B|0,t|0,f|0)|0;g=pc(s|0,g|0,26)|0;g=Ac(e|0,p|0,g|0,B|0)|0;p=Cc(o|0,n|0,33554432,0)|0;p=ic(p|0,B|0,26)|0;e=B;r=Cc(r&33554428|0,0,p|0,e|0)|0;b=Ac(r|0,B|0,q|0,b|0)|0;e=pc(p|0,e|0,26)|0;e=Ac(o|0,n|0,e|0,B|0)|0;c[a>>2]=m;c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=b;return}function qa(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;r=i;p=i=i+63&-64;i=i+240|0;pa(a+40|0,b);c[a+80>>2]=1;e=a+84|0;f=e+36|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));ja(p+160|0,a+40|0);ha(p+120|0,p+160|0,464);o=c[a+80>>2]|0;n=c[a+84>>2]|0;m=c[a+88>>2]|0;l=c[a+92>>2]|0;k=c[a+96>>2]|0;j=c[a+100>>2]|0;h=c[a+104>>2]|0;g=c[a+108>>2]|0;f=c[a+112>>2]|0;e=c[a+116>>2]|0;B=(c[p+160>>2]|0)-o|0;A=(c[p+160+4>>2]|0)-n|0;z=(c[p+160+8>>2]|0)-m|0;y=(c[p+160+12>>2]|0)-l|0;x=(c[p+160+16>>2]|0)-k|0;w=(c[p+160+20>>2]|0)-j|0;v=(c[p+160+24>>2]|0)-h|0;u=(c[p+160+28>>2]|0)-g|0;t=(c[p+160+32>>2]|0)-f|0;s=(c[p+160+36>>2]|0)-e|0;c[p+160>>2]=B;c[p+160+4>>2]=A;c[p+160+8>>2]=z;c[p+160+12>>2]=y;c[p+160+16>>2]=x;c[p+160+20>>2]=w;c[p+160+24>>2]=v;c[p+160+28>>2]=u;c[p+160+32>>2]=t;c[p+160+36>>2]=s;n=n+(c[p+120+4>>2]|0)|0;m=m+(c[p+120+8>>2]|0)|0;l=l+(c[p+120+12>>2]|0)|0;k=k+(c[p+120+16>>2]|0)|0;j=j+(c[p+120+20>>2]|0)|0;h=h+(c[p+120+24>>2]|0)|0;g=g+(c[p+120+28>>2]|0)|0;f=f+(c[p+120+32>>2]|0)|0;e=e+(c[p+120+36>>2]|0)|0;c[p+120>>2]=o+(c[p+120>>2]|0);c[p+120+4>>2]=n;c[p+120+8>>2]=m;c[p+120+12>>2]=l;c[p+120+16>>2]=k;c[p+120+20>>2]=j;c[p+120+24>>2]=h;c[p+120+28>>2]=g;c[p+120+32>>2]=f;c[p+120+36>>2]=e;ja(p+80|0,p+120|0);ha(p+80|0,p+80|0,p+120|0);ja(a,p+80|0);ha(a,a,p+120|0);ha(a,a,p+160|0);va(a,a);ha(a,a,p+80|0);ha(a,a,p+160|0);ja(p+40|0,a);ha(p+40|0,p+40|0,p+120|0);e=c[p+40>>2]|0;f=c[p+40+4>>2]|0;g=c[p+40+8>>2]|0;h=c[p+40+12>>2]|0;j=c[p+40+16>>2]|0;k=c[p+40+20>>2]|0;l=c[p+40+24>>2]|0;m=c[p+40+28>>2]|0;n=c[p+40+32>>2]|0;o=c[p+40+36>>2]|0;c[p>>2]=e-B;c[p+4>>2]=f-A;c[p+8>>2]=g-z;c[p+12>>2]=h-y;c[p+16>>2]=j-x;c[p+20>>2]=k-w;c[p+24>>2]=l-v;c[p+28>>2]=m-u;c[p+32>>2]=n-t;c[p+36>>2]=o-s;xa(p+200|0,p);if(fc(p+200|0,34120)|0){t=(c[p+160+4>>2]|0)+f|0;u=(c[p+160+8>>2]|0)+g|0;v=(c[p+160+12>>2]|0)+h|0;w=(c[p+160+16>>2]|0)+j|0;x=(c[p+160+20>>2]|0)+k|0;y=(c[p+160+24>>2]|0)+l|0;z=(c[p+160+28>>2]|0)+m|0;A=(c[p+160+32>>2]|0)+n|0;B=(c[p+160+36>>2]|0)+o|0;c[p>>2]=(c[p+160>>2]|0)+e;c[p+4>>2]=t;c[p+8>>2]=u;c[p+12>>2]=v;c[p+16>>2]=w;c[p+20>>2]=x;c[p+24>>2]=y;c[p+28>>2]=z;c[p+32>>2]=A;c[p+36>>2]=B;xa(p+200|0,p);if(!(fc(p+200|0,34120)|0)){ha(a,a,504);q=4}else e=-1}else q=4;if((q|0)==4){xa(p+200|0,a);if(((d[p+200>>0]|0)&1|0)==((d[b+31>>0]|0)>>>7|0))kb(a,a);ha(a+120|0,a,a+40|0);e=0}i=r;return e|0}function ra(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;s=a[b+80>>0]|0?0:16777216;t=c[b+4>>2]|0;u=c[b+8>>2]|0;p=c[b+12>>2]|0;q=c[b+16>>2]|0;l=c[b+20>>2]|0;k=c[b+24>>2]|0;j=c[b+28>>2]|0;i=c[b+32>>2]|0;h=c[b+36>>2]|0;if(g>>>0>0|(g|0)==0&f>>>0>15){r=c[b>>2]|0;while(1){z=((d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24)&67108863)+l|0;A=e+3|0;A=((d[A>>0]|d[A+1>>0]<<8|d[A+2>>0]<<16|d[A+3>>0]<<24)>>>2&67108863)+k|0;y=e+6|0;y=((d[y>>0]|d[y+1>>0]<<8|d[y+2>>0]<<16|d[y+3>>0]<<24)>>>4&67108863)+j|0;x=e+9|0;x=((d[x>>0]|d[x+1>>0]<<8|d[x+2>>0]<<16|d[x+3>>0]<<24)>>>6)+i|0;l=e+12|0;l=((d[l>>0]|d[l+1>>0]<<8|d[l+2>>0]<<16|d[l+3>>0]<<24)>>>8|s)+h|0;h=jc(z|0,0,r|0,0)|0;m=B;j=jc(A|0,0,q*5|0,0)|0;m=Cc(j|0,B|0,h|0,m|0)|0;h=B;j=jc(y|0,0,p*5|0,0)|0;j=Cc(m|0,h|0,j|0,B|0)|0;h=B;m=jc(x|0,0,u*5|0,0)|0;m=Cc(j|0,h|0,m|0,B|0)|0;h=B;j=jc(l|0,0,t*5|0,0)|0;j=Cc(m|0,h|0,j|0,B|0)|0;h=B;m=jc(z|0,0,t|0,0)|0;n=B;w=jc(A|0,0,r|0,0)|0;n=Cc(w|0,B|0,m|0,n|0)|0;m=B;w=jc(y|0,0,q*5|0,0)|0;w=Cc(n|0,m|0,w|0,B|0)|0;m=B;n=jc(x|0,0,p*5|0,0)|0;n=Cc(w|0,m|0,n|0,B|0)|0;m=B;w=jc(l|0,0,u*5|0,0)|0;w=Cc(n|0,m|0,w|0,B|0)|0;m=B;n=jc(z|0,0,u|0,0)|0;o=B;v=jc(A|0,0,t|0,0)|0;o=Cc(v|0,B|0,n|0,o|0)|0;n=B;v=jc(y|0,0,r|0,0)|0;v=Cc(o|0,n|0,v|0,B|0)|0;n=B;o=jc(x|0,0,q*5|0,0)|0;o=Cc(v|0,n|0,o|0,B|0)|0;n=B;v=jc(l|0,0,p*5|0,0)|0;v=Cc(o|0,n|0,v|0,B|0)|0;n=B;o=jc(z|0,0,p|0,0)|0;i=B;k=jc(A|0,0,u|0,0)|0;i=Cc(k|0,B|0,o|0,i|0)|0;o=B;k=jc(y|0,0,t|0,0)|0;k=Cc(i|0,o|0,k|0,B|0)|0;o=B;i=jc(x|0,0,r|0,0)|0;i=Cc(k|0,o|0,i|0,B|0)|0;o=B;k=jc(l|0,0,q*5|0,0)|0;k=Cc(i|0,o|0,k|0,B|0)|0;o=B;i=jc(z|0,0,q|0,0)|0;z=B;A=jc(A|0,0,p|0,0)|0;z=Cc(A|0,B|0,i|0,z|0)|0;i=B;y=jc(y|0,0,u|0,0)|0;y=Cc(z|0,i|0,y|0,B|0)|0;i=B;x=jc(x|0,0,t|0,0)|0;x=Cc(y|0,i|0,x|0,B|0)|0;i=B;l=jc(l|0,0,r|0,0)|0;l=Cc(x|0,i|0,l|0,B|0)|0;i=B;h=qc(j|0,h|0,26)|0;h=Cc(w|0,m|0,h|0,0)|0;m=qc(h|0,B|0,26)|0;m=Cc(v|0,n|0,m|0,0)|0;n=qc(m|0,B|0,26)|0;n=Cc(k|0,o|0,n|0,0)|0;o=qc(n|0,B|0,26)|0;o=Cc(l|0,i|0,o|0,0)|0;i=qc(o|0,B|0,26)|0;f=Cc(f|0,g|0,-16,-1)|0;g=B;if(!(g>>>0>0|(g|0)==0&f>>>0>15)){e=(i*5|0)+j&67108863;k=(((i*5|0)+(j&67108863)|0)>>>26)+(h&67108863)|0;j=m&67108863;i=n&67108863;h=o&67108863;break}else{e=e+16|0;l=(i*5|0)+j&67108863;k=(((i*5|0)+(j&67108863)|0)>>>26)+(h&67108863)|0;j=m&67108863;i=n&67108863;h=o&67108863}}}else e=l;c[b+20>>2]=e;c[b+24>>2]=k;c[b+28>>2]=j;c[b+32>>2]=i;c[b+36>>2]=h;return}
function sa(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;k=20;l=1634760805;m=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;n=2036477234;o=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;p=d[e+20>>0]|d[e+20+1>>0]<<8|d[e+20+2>>0]<<16|d[e+20+3>>0]<<24;q=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;r=d[e+28>>0]|d[e+28+1>>0]<<8|d[e+28+2>>0]<<16|d[e+28+3>>0]<<24;s=1797285236;t=d[e+4>>0]|d[e+4+1>>0]<<8|d[e+4+2>>0]<<16|d[e+4+3>>0]<<24;u=d[e+8>>0]|d[e+8+1>>0]<<8|d[e+8+2>>0]<<16|d[e+8+3>>0]<<24;f=d[e+12>>0]|d[e+12+1>>0]<<8|d[e+12+2>>0]<<16|d[e+12+3>>0]<<24;g=857760878;h=d[c>>0]|d[c+1>>0]<<8|d[c+2>>0]<<16|d[c+3>>0]<<24;i=d[c+4>>0]|d[c+4+1>>0]<<8|d[c+4+2>>0]<<16|d[c+4+3>>0]<<24;j=d[c+8>>0]|d[c+8+1>>0]<<8|d[c+8+2>>0]<<16|d[c+8+3>>0]<<24;e=d[c+12>>0]|d[c+12+1>>0]<<8|d[c+12+2>>0]<<16|d[c+12+3>>0]<<24;while(1){D=p+l|0;D=(D>>>25|D<<7)^f;A=D+l|0;A=(A>>>23|A<<9)^j;x=((A+D|0)>>>19|A+D<<13)^p;G=((x+A|0)>>>14|x+A<<18)^l;z=g+m|0;z=e^(z>>>25|z<<7);w=z+g|0;w=q^(w>>>23|w<<9);J=((w+z|0)>>>19|w+z<<13)^m;C=((J+w|0)>>>14|J+w<<18)^g;v=n+h|0;v=r^(v>>>25|v<<7);I=v+n|0;I=(I>>>23|I<<9)^t;F=((I+v|0)>>>19|I+v<<13)^h;y=((F+I|0)>>>14|F+I<<18)^n;H=s+o|0;H=(H>>>25|H<<7)^u;E=H+s|0;E=(E>>>23|E<<9)^i;B=((E+H|0)>>>19|E+H<<13)^o;c=((B+E|0)>>>14|B+E<<18)^s;m=((G+H|0)>>>25|G+H<<7)^J;J=m+G|0;t=(J>>>23|J<<9)^I;I=t+m|0;u=(I>>>19|I<<13)^H;H=u+t|0;l=(H>>>14|H<<18)^G;h=((C+D|0)>>>25|C+D<<7)^F;F=h+C|0;i=(F>>>23|F<<9)^E;E=i+h|0;f=(E>>>19|E<<13)^D;D=f+i|0;g=(D>>>14|D<<18)^C;o=((y+z|0)>>>25|y+z<<7)^B;B=o+y|0;j=(B>>>23|B<<9)^A;A=j+o|0;e=(A>>>19|A<<13)^z;z=e+j|0;n=(z>>>14|z<<18)^y;p=((c+v|0)>>>25|c+v<<7)^x;x=p+c|0;q=(x>>>23|x<<9)^w;w=q+p|0;r=(w>>>19|w<<13)^v;v=r+q|0;s=(v>>>14|v<<18)^c;if((k|0)<=2)break;else k=k+-2|0}a[b>>0]=l;a[b+1>>0]=l>>8;a[b+2>>0]=l>>16;a[b+3>>0]=l>>24;a[b+4>>0]=g;a[b+4+1>>0]=g>>8;a[b+4+2>>0]=g>>16;a[b+4+3>>0]=g>>24;a[b+8>>0]=n;a[b+8+1>>0]=n>>8;a[b+8+2>>0]=n>>16;a[b+8+3>>0]=n>>24;a[b+12>>0]=s;a[b+12+1>>0]=s>>8;a[b+12+2>>0]=s>>16;a[b+12+3>>0]=s>>24;a[b+16>>0]=h;a[b+16+1>>0]=h>>8;a[b+16+2>>0]=h>>16;a[b+16+3>>0]=h>>24;a[b+20>>0]=i;a[b+20+1>>0]=i>>8;a[b+20+2>>0]=i>>16;a[b+20+3>>0]=i>>24;a[b+24>>0]=j;a[b+24+1>>0]=j>>8;a[b+24+2>>0]=j>>16;a[b+24+3>>0]=j>>24;a[b+28>>0]=e;a[b+28+1>>0]=e>>8;a[b+28+2>>0]=e>>16;a[b+28+3>>0]=e>>24;return}function ta(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;h=i=i+63&-64;i=i+2400|0;Xa(h+2136|0,d);Xa(h+1880|0,f);eb(h+480|0,e);Ka(h+1760|0,e);mb(h+320|0,h+1760|0);Qb(h,h+320|0);db(h+320|0,h,h+480|0);Qb(h+160|0,h+320|0);eb(h+480+160|0,h+160|0);db(h+320|0,h,h+480+160|0);Qb(h+160|0,h+320|0);eb(h+480+320|0,h+160|0);db(h+320|0,h,h+480+320|0);Qb(h+160|0,h+320|0);eb(h+480+480|0,h+160|0);db(h+320|0,h,h+480+480|0);Qb(h+160|0,h+320|0);eb(h+480+640|0,h+160|0);db(h+320|0,h,h+480+640|0);Qb(h+160|0,h+320|0);eb(h+480+800|0,h+160|0);db(h+320|0,h,h+480+800|0);Qb(h+160|0,h+320|0);eb(h+480+960|0,h+160|0);db(h+320|0,h,h+480+960|0);Qb(h+160|0,h+320|0);eb(h+480+1120|0,h+160|0);e=b;d=e+40|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(d|0));c[b+40>>2]=1;e=b+44|0;d=e+36|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(d|0));c[b+80>>2]=1;e=b+84|0;d=e+36|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(d|0));d=255;while(1){if(a[h+2136+d>>0]|0){e=d;break}if(a[h+1880+d>>0]|0){e=d;break}e=d+-1|0;if((d|0)>0)d=e;else break}if((e|0)>-1)while(1){mb(h+320|0,b);d=a[h+2136+e>>0]|0;if(d<<24>>24<=0){if(d<<24>>24<0){Qb(h+160|0,h+320|0);cb(h+320|0,h+160|0,h+480+(((d<<24>>24|0)/-2|0)*160|0)|0)}}else{Qb(h+160|0,h+320|0);db(h+320|0,h+160|0,h+480+(((d<<24>>24|0)/2|0)*160|0)|0)}d=a[h+1880+e>>0]|0;if(d<<24>>24<=0){if(d<<24>>24<0){Qb(h+160|0,h+320|0);hb(h+320|0,h+160|0,584+(((d<<24>>24|0)/-2|0)*120|0)|0)}}else{Qb(h+160|0,h+320|0);ib(h+320|0,h+160|0,584+(((d<<24>>24|0)/2|0)*120|0)|0)}bc(b,h+320|0);if((e|0)>0)e=e+-1|0;else break}i=g;return}function ua(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=i=i+63&-64;i=i+160|0;ja(d+120|0,b);ja(d+80|0,d+120|0);ja(d+80|0,d+80|0);ha(d+80|0,b,d+80|0);ha(d+120|0,d+120|0,d+80|0);ja(d+40|0,d+120|0);ha(d+80|0,d+80|0,d+40|0);ja(d+40|0,d+80|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ha(d+80|0,d+40|0,d+80|0);ja(d+40|0,d+80|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ha(d+40|0,d+40|0,d+80|0);ja(d,d+40|0);b=1;do{ja(d,d);b=b+1|0}while((b|0)!=20);ha(d+40|0,d,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ja(d+40|0,d+40|0);ha(d+80|0,d+40|0,d+80|0);ja(d+40|0,d+80|0);b=1;do{ja(d+40|0,d+40|0);b=b+1|0}while((b|0)!=50);ha(d+40|0,d+40|0,d+80|0);ja(d,d+40|0);b=1;do{ja(d,d);b=b+1|0}while((b|0)!=100);ha(d+40|0,d,d+40|0);ja(d+40|0,d+40|0);b=1;do{ja(d+40|0,d+40|0);b=b+1|0}while((b|0)!=50);ha(d+80|0,d+40|0,d+80|0);ja(d+80|0,d+80|0);ja(d+80|0,d+80|0);ja(d+80|0,d+80|0);ja(d+80|0,d+80|0);ja(d+80|0,d+80|0);ha(a,d+80|0,d+120|0);i=c;return}function va(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;d=i;e=i=i+63&-64;i=i+128|0;ja(e+80|0,b);ja(e+40|0,e+80|0);ja(e+40|0,e+40|0);ha(e+40|0,b,e+40|0);ha(e+80|0,e+80|0,e+40|0);ja(e+80|0,e+80|0);ha(e+80|0,e+40|0,e+80|0);ja(e+40|0,e+80|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ha(e+80|0,e+40|0,e+80|0);ja(e+40|0,e+80|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ha(e+40|0,e+40|0,e+80|0);ja(e,e+40|0);c=1;do{ja(e,e);c=c+1|0}while((c|0)!=20);ha(e+40|0,e,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ja(e+40|0,e+40|0);ha(e+80|0,e+40|0,e+80|0);ja(e+40|0,e+80|0);c=1;do{ja(e+40|0,e+40|0);c=c+1|0}while((c|0)!=50);ha(e+40|0,e+40|0,e+80|0);ja(e,e+40|0);c=1;do{ja(e,e);c=c+1|0}while((c|0)!=100);ha(e+40|0,e,e+40|0);ja(e+40|0,e+40|0);c=1;do{ja(e+40|0,e+40|0);c=c+1|0}while((c|0)!=50);ha(e+80|0,e+40|0,e+80|0);ja(e+80|0,e+80|0);ja(e+80|0,e+80|0);ha(a,e+80|0,b);i=d;return}function wa(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;h=i=i+63&-64;i=i+128|0;e=qc(d<<24>>24|0,((d<<24>>24|0)<0)<<31>>31|0,63)|0;c[a>>2]=1;f=a+4|0;j=f+36|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(j|0));c[a+40>>2]=1;f=a+44|0;j=f+76|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(j|0));o=(d<<24>>24)-((d<<24>>24&0-e)<<1)&255;ec(a,1544+(b*960|0)|0,((o^1)+-1|0)>>>31&255);ec(a,1544+(b*960|0)+120|0,((o^2)+-1|0)>>>31&255);ec(a,1544+(b*960|0)+240|0,((o^3)+-1|0)>>>31&255);ec(a,1544+(b*960|0)+360|0,((o^4)+-1|0)>>>31&255);ec(a,1544+(b*960|0)+480|0,((o^5)+-1|0)>>>31&255);ec(a,1544+(b*960|0)+600|0,((o^6)+-1|0)>>>31&255);ec(a,1544+(b*960|0)+720|0,((o^7)+-1|0)>>>31&255);ec(a,1544+(b*960|0)+840|0,((o^8)+-1|0)>>>31&255);o=c[a+44>>2]|0;n=c[a+48>>2]|0;m=c[a+52>>2]|0;l=c[a+56>>2]|0;k=c[a+60>>2]|0;d=c[a+64>>2]|0;b=c[a+68>>2]|0;f=c[a+72>>2]|0;j=c[a+76>>2]|0;c[h>>2]=c[a+40>>2];c[h+4>>2]=o;c[h+8>>2]=n;c[h+12>>2]=m;c[h+16>>2]=l;c[h+20>>2]=k;c[h+24>>2]=d;c[h+28>>2]=b;c[h+32>>2]=f;c[h+36>>2]=j;j=c[a+4>>2]|0;f=c[a+8>>2]|0;b=c[a+12>>2]|0;d=c[a+16>>2]|0;k=c[a+20>>2]|0;l=c[a+24>>2]|0;m=c[a+28>>2]|0;n=c[a+32>>2]|0;o=c[a+36>>2]|0;c[h+40>>2]=c[a>>2];c[h+44>>2]=j;c[h+48>>2]=f;c[h+52>>2]=b;c[h+56>>2]=d;c[h+60>>2]=k;c[h+64>>2]=l;c[h+68>>2]=m;c[h+72>>2]=n;c[h+76>>2]=o;o=0-(c[a+84>>2]|0)|0;n=0-(c[a+88>>2]|0)|0;m=0-(c[a+92>>2]|0)|0;l=0-(c[a+96>>2]|0)|0;k=0-(c[a+100>>2]|0)|0;d=0-(c[a+104>>2]|0)|0;b=0-(c[a+108>>2]|0)|0;f=0-(c[a+112>>2]|0)|0;j=0-(c[a+116>>2]|0)|0;c[h+80>>2]=0-(c[a+80>>2]|0);c[h+84>>2]=o;c[h+88>>2]=n;c[h+92>>2]=m;c[h+96>>2]=l;c[h+100>>2]=k;c[h+104>>2]=d;c[h+108>>2]=b;c[h+112>>2]=f;c[h+116>>2]=j;ec(a,h,e&255);i=g;return}function xa(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;m=c[d>>2]|0;h=c[d+4>>2]|0;i=c[d+8>>2]|0;j=c[d+12>>2]|0;p=c[d+16>>2]|0;f=c[d+20>>2]|0;g=c[d+24>>2]|0;n=c[d+28>>2]|0;e=c[d+32>>2]|0;d=c[d+36>>2]|0;o=((((((((((((((d*19|0)+16777216|0)>>>25)+m>>26)+h>>25)+i>>26)+j>>25)+p>>26)+f>>25)+g>>26)+n>>25)+e>>26)+d>>25)*19|0)+m>>26;m=((((((((((((((d*19|0)+16777216|0)>>>25)+m>>26)+h>>25)+i>>26)+j>>25)+p>>26)+f>>25)+g>>26)+n>>25)+e>>26)+d>>25)*19|0)+m-(o<<26)|0;l=o+h-(o+h>>25<<25)|0;k=(o+h>>25)+i-((o+h>>25)+i>>26<<26)|0;q=((o+h>>25)+i>>26)+j>>25;j=((o+h>>25)+i>>26)+j-(q<<25)|0;i=q+p-(q+p>>26<<26)|0;h=(q+p>>26)+f-((q+p>>26)+f>>25<<25)|0;o=((q+p>>26)+f>>25)+g>>26;g=((q+p>>26)+f>>25)+g-(o<<26)|0;f=o+n-(o+n>>25<<25)|0;d=((o+n>>25)+e>>26)+d|0;e=(o+n>>25)+e-((o+n>>25)+e>>26<<26)|0;a[b>>0]=m;a[b+1>>0]=m>>>8;a[b+2>>0]=m>>>16;a[b+3>>0]=l<<2|m>>>24;a[b+4>>0]=l>>>6;a[b+5>>0]=l>>>14;a[b+6>>0]=k<<3|l>>>22;a[b+7>>0]=k>>>5;a[b+8>>0]=k>>>13;a[b+9>>0]=j<<5|k>>>21;a[b+10>>0]=j>>>3;a[b+11>>0]=j>>>11;a[b+12>>0]=i<<6|j>>>19;a[b+13>>0]=i>>>2;a[b+14>>0]=i>>>10;a[b+15>>0]=i>>>18;a[b+16>>0]=h;a[b+17>>0]=h>>>8;a[b+18>>0]=h>>>16;a[b+19>>0]=g<<1|h>>>24;a[b+20>>0]=g>>>7;a[b+21>>0]=g>>>15;a[b+22>>0]=f<<3|g>>>23;a[b+23>>0]=f>>>5;a[b+24>>0]=f>>>13;a[b+25>>0]=e<<4|f>>>21;a[b+26>>0]=e>>>4;a[b+27>>0]=e>>>12;a[b+28>>0]=e>>>20|(d&33554431)<<6;a[b+29>>0]=d>>>2;a[b+30>>0]=d>>>10;a[b+31>>0]=(d&33554431)>>>18;return}function ya(b,e,f,g,h,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;s=i;t=i=i+63&-64;i=i+112|0;if(!((f|0)==0&(g|0)==0)){n=t+16|0;m=n+32|0;do{a[n>>0]=a[l>>0]|0;n=n+1|0;l=l+1|0}while((n|0)<(m|0));n=d[h+4>>0]|d[h+4+1>>0]<<8|d[h+4+2>>0]<<16|d[h+4+3>>0]<<24;c[t>>2]=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24;c[t+4>>2]=n;a[t+8>>0]=j;n=qc(j|0,k|0,8)|0;a[t+9>>0]=n;n=qc(j|0,k|0,16)|0;a[t+10>>0]=n;n=qc(j|0,k|0,24)|0;a[t+11>>0]=n;a[t+12>>0]=k;n=qc(j|0,k|0,40)|0;a[t+13>>0]=n;n=qc(j|0,k|0,48)|0;a[t+14>>0]=n;n=qc(j|0,k|0,56)|0;a[t+15>>0]=n;if(g>>>0>0|(g|0)==0&f>>>0>63){do{oa(t+48|0,t,t+16|0);l=0;do{a[b+l>>0]=a[t+48+l>>0]^a[e+l>>0];l=l+1|0}while((l|0)!=64);m=8;l=1;while(1){n=t+m|0;l=(d[n>>0]|0)+l|0;a[n>>0]=l;m=m+1|0;if((m|0)==16)break;else l=l>>>8}f=Cc(f|0,g|0,-64,-1)|0;g=B;b=b+64|0;e=e+64|0}while(g>>>0>0|(g|0)==0&f>>>0>63);if(!((f|0)==0&(g|0)==0)){p=b;q=f;r=e;o=8}}else{p=b;q=f;r=e;o=8}if((o|0)==8?(oa(t+48|0,t,t+16|0),q|0):0){l=0;do{a[p+l>>0]=a[t+48+l>>0]^a[r+l>>0];l=l+1|0}while((l|0)!=(q|0))}Vb(t+48|0,64);Vb(t+16|0,32)}i=s;return}function za(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=c[b+72>>2]|0;m=c[b+72+4>>2]|0;k=qc(o|0,m|0,3)|0;l=pc(e|0,f|0,3)|0;n=B;i=qc(e|0,f|0,61)|0;j=B;m=Cc(o|0,m|0,l|0,n|0)|0;o=B;c[b+72>>2]=m;c[b+72+4>>2]=o;g=c[b+64>>2]|0;h=c[b+64+4>>2]|0;if(o>>>0<n>>>0|(o|0)==(n|0)&m>>>0<l>>>0){g=Cc(g|0,h|0,1,0)|0;h=B;c[b+64>>2]=g;c[b+64+4>>2]=h}j=Cc(g|0,h|0,i|0,j|0)|0;c[b+64>>2]=j;c[b+64+4>>2]=B;j=Ac(128,0,k&127|0,0)|0;g=B;if(g>>>0>f>>>0|(g|0)==(f|0)&j>>>0>e>>>0){if(!((e|0)==0&(f|0)==0)){g=0;h=0;do{n=a[d+g>>0]|0;o=Cc(g|0,h|0,k&127|0,0)|0;a[b+80+o>>0]=n;g=Cc(g|0,h|0,1,0)|0;h=B}while(h>>>0<f>>>0|(h|0)==(f|0)&g>>>0<e>>>0)}}else{if(!((j|0)==0&(g|0)==0)){h=0;i=0;do{n=a[d+h>>0]|0;o=Cc(h|0,i|0,k&127|0,0)|0;a[b+80+o>>0]=n;h=Cc(h|0,i|0,1,0)|0;i=B}while(i>>>0<g>>>0|(i|0)==(g|0)&h>>>0<j>>>0)}ca(b,b+80|0);g=Ac(e|0,f|0,j|0,g|0)|0;h=B;if(h>>>0>0|(h|0)==0&g>>>0>127){i=d+j|0;do{ca(b,i);i=i+128|0;g=Cc(g|0,h|0,-128,-1)|0;h=B}while(h>>>0>0|(h|0)==0&g>>>0>127);j=i}else j=d+j|0;g=g&127;if(!((g|0)==0&0==0)){h=0;i=0;do{a[b+80+h>>0]=a[j+h>>0]|0;h=Cc(h|0,i|0,1,0)|0;i=B}while(i>>>0<0|(i|0)==0&h>>>0<g>>>0)}}return}function Aa(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;f=c[b+56>>2]|0;g=c[b+56+4>>2]|0;if(!((f|0)==0&(g|0)==0)){a[b+64+f>>0]=1;e=Cc(f|0,g|0,1,0)|0;h=B;if(h>>>0<0|(h|0)==0&e>>>0<16){h=Ac(14,0,f|0,g|0)|0;Hb(b+64+e|0,0,h+1|0)|0}a[b+80>>0]=1;ra(b,b+64|0,16,0)}g=c[b+24>>2]|0;h=(c[b+28>>2]|0)+(g>>>26)|0;k=(h>>>26)+(c[b+32>>2]|0)|0;i=(k>>>26)+(c[b+36>>2]|0)|0;e=((i>>>26)*5|0)+(c[b+20>>2]|0)|0;l=((((e&67108863)+5|0)>>>26)+((e>>>26)+(g&67108863))|0)>>>26;j=(i|-67108864)+((((l+(h&67108863)|0)>>>26)+(k&67108863)|0)>>>26)|0;g=(((e&67108863)+5|0)>>>26)+((e>>>26)+(g&67108863))&67108863&(j>>>31)+-1|j>>31&(e>>>26)+(g&67108863);k=((l+(h&67108863)|0)>>>26)+k&67108863&(j>>>31)+-1|j>>31&(k&67108863);e=Cc(e+5&67108863&(j>>>31)+-1|j>>31&(e&67108863)|g<<26|0,0,c[b+40>>2]|0,0)|0;f=B;g=Cc(g>>>6|(l+h&67108863&(j>>>31)+-1|j>>31&(h&67108863))<<20|0,0,c[b+44>>2]|0,0)|0;f=Cc(g|0,B|0,f|0,0)|0;g=B;h=Cc((l+h&67108863&(j>>>31)+-1|j>>31&(h&67108863))>>>12|k<<14|0,0,c[b+48>>2]|0,0)|0;g=Cc(h|0,B|0,g|0,0)|0;h=B;i=Cc(k>>>18|((j>>>31)+-1&j|j>>31&i)<<8|0,0,c[b+52>>2]|0,0)|0;h=Cc(i|0,B|0,h|0,0)|0;a[d>>0]=e;a[d+1>>0]=e>>8;a[d+2>>0]=e>>16;a[d+3>>0]=e>>24;a[d+4>>0]=f;a[d+4+1>>0]=f>>8;a[d+4+2>>0]=f>>16;a[d+4+3>>0]=f>>24;a[d+8>>0]=g;a[d+8+1>>0]=g>>8;a[d+8+2>>0]=g>>16;a[d+8+3>>0]=g>>24;a[d+12>>0]=h;a[d+12+1>>0]=h>>8;a[d+12+2>>0]=h>>16;a[d+12+3>>0]=h>>24;Vb(b,88);return}function Ba(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;g=i;h=i=i+63&-64;i=i+592|0;f=0;do{k=a[e+f>>0]|0;j=f<<1;a[h+520+j>>0]=k&15;a[h+520+(j|1)>>0]=(k&255)>>>4;f=f+1|0}while((f|0)!=32);e=0;f=0;do{k=h+520+f|0;j=(d[k>>0]|0)+e|0;e=(j<<24)+134217728>>28;a[k>>0]=j-(e<<4);f=f+1|0}while((f|0)!=63);a[h+520+63>>0]=(d[h+520+63>>0]|0)+e;e=b;f=e+40|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));c[b+40>>2]=1;e=b+44|0;f=e+36|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));c[b+80>>2]=1;e=b+84|0;f=e+76|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));e=1;do{wa(h,(e|0)/2|0,a[h+520+e>>0]|0);ib(h+240|0,b,h);Qb(b,h+240|0);e=e+2|0}while((e|0)<64);Ka(h+400|0,b);mb(h+240|0,h+400|0);bc(h+120|0,h+240|0);mb(h+240|0,h+120|0);bc(h+120|0,h+240|0);mb(h+240|0,h+120|0);bc(h+120|0,h+240|0);mb(h+240|0,h+120|0);Qb(b,h+240|0);e=0;do{wa(h,(e|0)/2|0,a[h+520+e>>0]|0);ib(h+240|0,b,h);Qb(b,h+240|0);e=e+2|0}while((e|0)<64);i=g;return}function Ca(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;h=c[b+56>>2]|0;g=c[b+56+4>>2]|0;if(!((h|0)==0&(g|0)==0)){j=Ac(16,0,h|0,g|0)|0;l=B;k=l>>>0>f>>>0|(l|0)==(f|0)&j>>>0>e>>>0?e:j;l=l>>>0>f>>>0|(l|0)==(f|0)&j>>>0>e>>>0?f:l;if(!((k|0)==0&(l|0)==0)){j=0;i=0;do{n=a[d+j>>0]|0;h=Cc(h|0,g|0,j|0,i|0)|0;a[b+64+h>>0]=n;j=Cc(j|0,i|0,1,0)|0;i=B;h=c[b+56>>2]|0;g=c[b+56+4>>2]|0}while(i>>>0<l>>>0|(i|0)==(l|0)&j>>>0<k>>>0)}n=Cc(h|0,g|0,k|0,l|0)|0;j=B;c[b+56>>2]=n;c[b+56+4>>2]=j;if(!(j>>>0<0|(j|0)==0&n>>>0<16)){e=Ac(e|0,f|0,k|0,l|0)|0;f=B;ra(b,b+64|0,16,0);c[b+56>>2]=0;c[b+56+4>>2]=0;d=d+k|0;m=6}}else m=6;if((m|0)==6){if(f>>>0>0|(f|0)==0&e>>>0>15){h=e&-16;ra(b,d,h,f);e=Ac(e|0,f|0,h|0,f|0)|0;h=d+h|0;f=B}else h=d;if(!((e|0)==0&(f|0)==0)){d=0;g=0;do{m=a[h+d>>0]|0;n=Cc(c[b+56>>2]|0,c[b+56+4>>2]|0,d|0,g|0)|0;a[b+64+n>>0]=m;d=Cc(d|0,g|0,1,0)|0;g=B}while(g>>>0<f>>>0|(g|0)==(f|0)&d>>>0<e>>>0);n=Cc(c[b+56>>2]|0,c[b+56+4>>2]|0,e|0,f|0)|0;c[b+56>>2]=n;c[b+56+4>>2]=B}}return}function Da(a,b,e,f,g,h,j){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;k=i;l=i=i+63&-64;i=i+64|0;if(!((e|0)==0&(f|0)==0)){c[l>>2]=1634760805;c[l+4>>2]=857760878;c[l+8>>2]=2036477234;c[l+12>>2]=1797285236;c[l+16>>2]=d[j>>0]|d[j+1>>0]<<8|d[j+2>>0]<<16|d[j+3>>0]<<24;c[l+20>>2]=d[j+4>>0]|d[j+4+1>>0]<<8|d[j+4+2>>0]<<16|d[j+4+3>>0]<<24;c[l+24>>2]=d[j+8>>0]|d[j+8+1>>0]<<8|d[j+8+2>>0]<<16|d[j+8+3>>0]<<24;c[l+28>>2]=d[j+12>>0]|d[j+12+1>>0]<<8|d[j+12+2>>0]<<16|d[j+12+3>>0]<<24;c[l+32>>2]=d[j+16>>0]|d[j+16+1>>0]<<8|d[j+16+2>>0]<<16|d[j+16+3>>0]<<24;c[l+36>>2]=d[j+20>>0]|d[j+20+1>>0]<<8|d[j+20+2>>0]<<16|d[j+20+3>>0]<<24;c[l+40>>2]=d[j+24>>0]|d[j+24+1>>0]<<8|d[j+24+2>>0]<<16|d[j+24+3>>0]<<24;c[l+44>>2]=d[j+28>>0]|d[j+28+1>>0]<<8|d[j+28+2>>0]<<16|d[j+28+3>>0]<<24;c[l+48>>2]=h;c[l+52>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[l+56>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[l+60>>2]=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;ma(l,b,a,e,f);Vb(l,64)}i=k;return}function Ea(a,b,e,f,g){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+64|0;if(!((b|0)==0&(e|0)==0)){c[j>>2]=1634760805;c[j+4>>2]=857760878;c[j+8>>2]=2036477234;c[j+12>>2]=1797285236;c[j+16>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[j+20>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[j+24>>2]=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;c[j+28>>2]=d[g+12>>0]|d[g+12+1>>0]<<8|d[g+12+2>>0]<<16|d[g+12+3>>0]<<24;c[j+32>>2]=d[g+16>>0]|d[g+16+1>>0]<<8|d[g+16+2>>0]<<16|d[g+16+3>>0]<<24;c[j+36>>2]=d[g+20>>0]|d[g+20+1>>0]<<8|d[g+20+2>>0]<<16|d[g+20+3>>0]<<24;c[j+40>>2]=d[g+24>>0]|d[g+24+1>>0]<<8|d[g+24+2>>0]<<16|d[g+24+3>>0]<<24;c[j+44>>2]=d[g+28>>0]|d[g+28+1>>0]<<8|d[g+28+2>>0]<<16|d[g+28+3>>0]<<24;c[j+48>>2]=0;c[j+52>>2]=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24;c[j+56>>2]=d[f+4>>0]|d[f+4+1>>0]<<8|d[f+4+2>>0]<<16|d[f+4+3>>0]<<24;c[j+60>>2]=d[f+8>>0]|d[f+8+1>>0]<<8|d[f+8+2>>0]<<16|d[f+8+3>>0]<<24;Hb(a|0,0,b|0)|0;ma(j,a,a,b,e);Vb(j,64)}i=h;return}function Fa(b,c,d,e,f,g,h){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;l=i;m=i=i+63&-64;i=i+352|0;sa(m+256|0,g,h);if(b>>>0>=d>>>0?0<f>>>0|0==(f|0)&(b-d|0)>>>0<e>>>0:0)j=5;else if(d>>>0>=b>>>0?0<f>>>0|0==(f|0)&(d-b|0)>>>0<e>>>0:0)j=5;else k=d;if((j|0)==5){Ob(b|0,d|0,e|0)|0;k=b}h=m+288|0;d=h+32|0;do{a[h>>0]=0;h=h+1|0}while((h|0)<(d|0));h=f>>>0>0|(f|0)==0&e>>>0>32?32:e;d=f>>>0>0|(f|0)==0&e>>>0>32?0:f;if(!((h|0)==0&(d|0)==0)){j=Cc((f>>>0<0|(f|0)==0&e>>>0<32?e:32)|0,(f>>>0<0|(f|0)==0&e>>>0<32?f:0)|0,-1,0)|0;wb(m+288+32|0,k|0,j+1|0)|0}j=Cc(h|0,d|0,32,0)|0;tc(m+288|0,m+288|0,j,B,g+16|0,m+256|0);_c(m,m+288|0);if(!((h|0)==0&(d|0)==0)){j=Cc((f>>>0<0|(f|0)==0&e>>>0<32?e:32)|0,(f>>>0<0|(f|0)==0&e>>>0<32?f:0)|0,-1,0)|0;wb(b|0,m+288+32|0,j+1|0)|0}Vb(m+288|0,64);if(f>>>0>0|(f|0)==0&e>>>0>32){j=Ac(e|0,f|0,h|0,d|0)|0;ya(b+h|0,k+h|0,j,B,g+16|0,1,0,m+256|0)}Vb(m+256|0,32);Ec(m,b,e,f);Yc(m,c);Vb(m,256);i=l;return 0}function Ga(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;n=i;m=i=i+63&-64;i=i+592|0;k=0;l=32;g=1;while(1){l=l+-1|0;h=a[b+32+l>>0]|0;j=a[32694+l>>0]|0;g=g&255;k=((h&255)-(j&255)|0)>>>8&g|k&255;if(!l)break;else g=(((j^h)&255)+65535|0)>>>8&g}a:do if(k){h=0;do{g=0;j=0;do{g=a[16+(h<<5)+j>>0]^a[b+j>>0]|g;j=j+1|0}while((j|0)!=32);h=h+1|0;if(!(g<<24>>24)){g=-1;break a}}while(h>>>0<12);if(!(qa(m+328|0,f)|0)){g=0;h=0;do{g=a[f+h>>0]|g;h=h+1|0}while((h|0)!=32);if(g<<24>>24){Zb(m);za(m,b,32,0);za(m,f,32,0);za(m,c,d,e);vb(m,m+520|0);ga(m+520|0);ta(m+208|0,m+520|0,m+328|0,b+32|0);xb(m+488|0,m+208|0);g=fc(m+488|0,b)|0;g=((m+488|0)==(b|0)?-1:g)|(Kb(b,m+488|0)|0)}else g=-1}else g=-1}else g=-1;while(0);i=n;return g|0}function Ha(a,b,e,f,g,h,j,k){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0;l=i;m=i=i+63&-64;i=i+64|0;if(!((e|0)==0&(f|0)==0)){c[m>>2]=1634760805;c[m+4>>2]=857760878;c[m+8>>2]=2036477234;c[m+12>>2]=1797285236;c[m+16>>2]=d[k>>0]|d[k+1>>0]<<8|d[k+2>>0]<<16|d[k+3>>0]<<24;c[m+20>>2]=d[k+4>>0]|d[k+4+1>>0]<<8|d[k+4+2>>0]<<16|d[k+4+3>>0]<<24;c[m+24>>2]=d[k+8>>0]|d[k+8+1>>0]<<8|d[k+8+2>>0]<<16|d[k+8+3>>0]<<24;c[m+28>>2]=d[k+12>>0]|d[k+12+1>>0]<<8|d[k+12+2>>0]<<16|d[k+12+3>>0]<<24;c[m+32>>2]=d[k+16>>0]|d[k+16+1>>0]<<8|d[k+16+2>>0]<<16|d[k+16+3>>0]<<24;c[m+36>>2]=d[k+20>>0]|d[k+20+1>>0]<<8|d[k+20+2>>0]<<16|d[k+20+3>>0]<<24;c[m+40>>2]=d[k+24>>0]|d[k+24+1>>0]<<8|d[k+24+2>>0]<<16|d[k+24+3>>0]<<24;c[m+44>>2]=d[k+28>>0]|d[k+28+1>>0]<<8|d[k+28+2>>0]<<16|d[k+28+3>>0]<<24;c[m+48>>2]=h;c[m+52>>2]=j;c[m+56>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[m+60>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;ma(m,b,a,e,f);Vb(m,64)}i=l;return}function Ia(a,b,e,f,g){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+64|0;if(!((b|0)==0&(e|0)==0)){c[j>>2]=1634760805;c[j+4>>2]=857760878;c[j+8>>2]=2036477234;c[j+12>>2]=1797285236;c[j+16>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[j+20>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[j+24>>2]=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;c[j+28>>2]=d[g+12>>0]|d[g+12+1>>0]<<8|d[g+12+2>>0]<<16|d[g+12+3>>0]<<24;c[j+32>>2]=d[g+16>>0]|d[g+16+1>>0]<<8|d[g+16+2>>0]<<16|d[g+16+3>>0]<<24;c[j+36>>2]=d[g+20>>0]|d[g+20+1>>0]<<8|d[g+20+2>>0]<<16|d[g+20+3>>0]<<24;c[j+40>>2]=d[g+24>>0]|d[g+24+1>>0]<<8|d[g+24+2>>0]<<16|d[g+24+3>>0]<<24;c[j+44>>2]=d[g+28>>0]|d[g+28+1>>0]<<8|d[g+28+2>>0]<<16|d[g+28+3>>0]<<24;c[j+48>>2]=0;c[j+52>>2]=0;c[j+56>>2]=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24;c[j+60>>2]=d[f+4>>0]|d[f+4+1>>0]<<8|d[f+4+2>>0]<<16|d[f+4+3>>0]<<24;Hb(a|0,0,b|0)|0;ma(j,a,a,b,e);Vb(j,64)}i=h;return}function Ja(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;if(e<<24>>24?(e&255)<=64:0){if((c[b+80>>2]|0)==0?(c[b+80+4>>2]|0)==0:0){f=c[b+352>>2]|0;do if(f>>>0>128){f=c[b+64>>2]|0;i=c[b+64+4>>2]|0;j=Cc(f|0,i|0,128,0)|0;c[b+64>>2]=j;c[b+64+4>>2]=B;f=Cc((i>>>0>4294967295|(i|0)==-1&f>>>0>4294967167)&1|0,0,c[b+72>>2]|0,c[b+72+4>>2]|0)|0;c[b+72>>2]=f;c[b+72+4>>2]=B;da(b,b+96|0);f=(c[b+352>>2]|0)+-128|0;c[b+352>>2]=f;if(f>>>0<129){wb(b+96|0,b+224|0,f|0)|0;g=b+72|0;h=c[b+352>>2]|0;break}else W(32272,32304,343,32348)}else{g=b+72|0;h=f}while(0);j=Cc(c[b+64>>2]|0,c[b+64+4>>2]|0,h|0,0)|0;f=B;c[b+64>>2]=j;c[b+64+4>>2]=f;i=g;i=Cc((f>>>0<0|(f|0)==0&j>>>0<h>>>0)&1|0,0,c[i>>2]|0,c[i+4>>2]|0)|0;j=g;c[j>>2]=i;c[j+4>>2]=B;if(a[b+356>>0]|0){c[b+88>>2]=-1;c[b+88+4>>2]=-1}c[b+80>>2]=-1;c[b+80+4>>2]=-1;Hb(b+96+h|0,0,256-h|0)|0;da(b,b+96|0);wb(d|0,b|0,e&255|0)|0;f=0}else f=-1;return f|0}X();return 0}function Ka(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=c[b+4>>2]|0;k=c[b+8>>2]|0;j=c[b+12>>2]|0;i=c[b+16>>2]|0;h=c[b+20>>2]|0;g=c[b+24>>2]|0;f=c[b+28>>2]|0;e=c[b+32>>2]|0;d=c[b+36>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;d=c[b+44>>2]|0;e=c[b+48>>2]|0;f=c[b+52>>2]|0;g=c[b+56>>2]|0;h=c[b+60>>2]|0;i=c[b+64>>2]|0;j=c[b+68>>2]|0;k=c[b+72>>2]|0;l=c[b+76>>2]|0;c[a+40>>2]=c[b+40>>2];c[a+44>>2]=d;c[a+48>>2]=e;c[a+52>>2]=f;c[a+56>>2]=g;c[a+60>>2]=h;c[a+64>>2]=i;c[a+68>>2]=j;c[a+72>>2]=k;c[a+76>>2]=l;l=c[b+84>>2]|0;k=c[b+88>>2]|0;j=c[b+92>>2]|0;i=c[b+96>>2]|0;h=c[b+100>>2]|0;g=c[b+104>>2]|0;f=c[b+108>>2]|0;e=c[b+112>>2]|0;d=c[b+116>>2]|0;c[a+80>>2]=c[b+80>>2];c[a+84>>2]=l;c[a+88>>2]=k;c[a+92>>2]=j;c[a+96>>2]=i;c[a+100>>2]=h;c[a+104>>2]=g;c[a+108>>2]=f;c[a+112>>2]=e;c[a+116>>2]=d;return}function La(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;x=c[a>>2]|0;v=c[a+4>>2]|0;t=c[a+8>>2]|0;r=c[a+12>>2]|0;p=c[a+16>>2]|0;n=c[a+20>>2]|0;l=c[a+24>>2]|0;j=c[a+28>>2]|0;h=c[a+32>>2]|0;f=c[a+36>>2]|0;w=c[b>>2]|0;u=c[b+4>>2]|0;s=c[b+8>>2]|0;q=c[b+12>>2]|0;o=c[b+16>>2]|0;m=c[b+20>>2]|0;k=c[b+24>>2]|0;i=c[b+28>>2]|0;g=c[b+32>>2]|0;e=c[b+36>>2]|0;c[a>>2]=(w^x)&0-d^x;c[a+4>>2]=(u^v)&0-d^v;c[a+8>>2]=(s^t)&0-d^t;c[a+12>>2]=(q^r)&0-d^r;c[a+16>>2]=(o^p)&0-d^p;c[a+20>>2]=(m^n)&0-d^n;c[a+24>>2]=(k^l)&0-d^l;c[a+28>>2]=(i^j)&0-d^j;c[a+32>>2]=(g^h)&0-d^h;c[a+36>>2]=(e^f)&0-d^f;c[b>>2]=(w^x)&0-d^w;c[b+4>>2]=(u^v)&0-d^u;c[b+8>>2]=(s^t)&0-d^s;c[b+12>>2]=(q^r)&0-d^q;c[b+16>>2]=(o^p)&0-d^o;c[b+20>>2]=(m^n)&0-d^m;c[b+24>>2]=(k^l)&0-d^k;c[b+28>>2]=(i^j)&0-d^i;c[b+32>>2]=(g^h)&0-d^g;c[b+36>>2]=(e^f)&0-d^e;return}function Ma(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;j=i;k=i=i+63&-64;i=i+96|0;c[k>>2]=(d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24)&67108863;c[k+4>>2]=(d[h+3>>0]|d[h+3+1>>0]<<8|d[h+3+2>>0]<<16|d[h+3+3>>0]<<24)>>>2&67108611;c[k+8>>2]=(d[h+6>>0]|d[h+6+1>>0]<<8|d[h+6+2>>0]<<16|d[h+6+3>>0]<<24)>>>4&67092735;c[k+12>>2]=(d[h+9>>0]|d[h+9+1>>0]<<8|d[h+9+2>>0]<<16|d[h+9+3>>0]<<24)>>>6&66076671;c[k+16>>2]=(d[h+12>>0]|d[h+12+1>>0]<<8|d[h+12+2>>0]<<16|d[h+12+3>>0]<<24)>>>8&1048575;c[k+20>>2]=0;c[k+20+4>>2]=0;c[k+20+8>>2]=0;c[k+20+12>>2]=0;c[k+20+16>>2]=0;c[k+40>>2]=d[h+16>>0]|d[h+16+1>>0]<<8|d[h+16+2>>0]<<16|d[h+16+3>>0]<<24;c[k+44>>2]=d[h+20>>0]|d[h+20+1>>0]<<8|d[h+20+2>>0]<<16|d[h+20+3>>0]<<24;c[k+48>>2]=d[h+24>>0]|d[h+24+1>>0]<<8|d[h+24+2>>0]<<16|d[h+24+3>>0]<<24;c[k+52>>2]=d[h+28>>0]|d[h+28+1>>0]<<8|d[h+28+2>>0]<<16|d[h+28+3>>0]<<24;c[k+56>>2]=0;c[k+56+4>>2]=0;a[k+80>>0]=0;Ca(k,e,f,g);Aa(k,b);i=j;return}function Na(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0;k=i;j=i=i+63&-64;i=i+96|0;sa(j,f,g);fb(j+32|0,f+16|0,j);if(!(vc(c,b,d,e,j+32|0)|0))if(!a)g=0;else{if(b>>>0>=a>>>0?0<e>>>0|0==(e|0)&(b-a|0)>>>0<d>>>0:0)h=8;else if(a>>>0>=b>>>0?0<e>>>0|0==(e|0)&(a-b|0)>>>0<d>>>0:0)h=8;if((h|0)==8){Ob(a|0,b|0,d|0)|0;b=a}g=e>>>0>0|(e|0)==0&d>>>0>32?32:d;c=e>>>0>0|(e|0)==0&d>>>0>32?0:e;if((g|0)==0&(c|0)==0)tc(j+32|0,j+32|0,32,0,f+16|0,j);else{h=Cc((e>>>0<0|(e|0)==0&d>>>0<32?d:32)|0,(e>>>0<0|(e|0)==0&d>>>0<32?e:0)|0,-1,0)|0;wb(j+32+32|0,b|0,h+1|0)|0;l=Cc(g|0,c|0,32,0)|0;tc(j+32|0,j+32|0,l,B,f+16|0,j);wb(a|0,j+32+32|0,h+1|0)|0}if(e>>>0>0|(e|0)==0&d>>>0>32){l=Ac(d|0,e|0,g|0,c|0)|0;ya(a+g|0,b+g|0,l,B,f+16|0,1,0,j)}Vb(j,32);g=0}else{Vb(j,32);g=-1}i=k;return g|0}function Oa(b,e){b=b|0;e=e|0;c[b>>2]=(d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24)&67108863;c[b+4>>2]=(d[e+3>>0]|d[e+3+1>>0]<<8|d[e+3+2>>0]<<16|d[e+3+3>>0]<<24)>>>2&67108611;c[b+8>>2]=(d[e+6>>0]|d[e+6+1>>0]<<8|d[e+6+2>>0]<<16|d[e+6+3>>0]<<24)>>>4&67092735;c[b+12>>2]=(d[e+9>>0]|d[e+9+1>>0]<<8|d[e+9+2>>0]<<16|d[e+9+3>>0]<<24)>>>6&66076671;c[b+16>>2]=(d[e+12>>0]|d[e+12+1>>0]<<8|d[e+12+2>>0]<<16|d[e+12+3>>0]<<24)>>>8&1048575;c[b+20>>2]=0;c[b+20+4>>2]=0;c[b+20+8>>2]=0;c[b+20+12>>2]=0;c[b+20+16>>2]=0;c[b+40>>2]=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;c[b+44>>2]=d[e+20>>0]|d[e+20+1>>0]<<8|d[e+20+2>>0]<<16|d[e+20+3>>0]<<24;c[b+48>>2]=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;c[b+52>>2]=d[e+28>>0]|d[e+28+1>>0]<<8|d[e+28+2>>0]<<16|d[e+28+3>>0]<<24;c[b+56>>2]=0;c[b+56+4>>2]=0;a[b+80>>0]=0;return}function Pa(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;a:do if(!((e|0)==0&(f|0)==0)){g=c[b+352>>2]|0;j=e;while(1){i=256-g|0;e=b+96+g|0;if(!(f>>>0>0|(f|0)==0&j>>>0>i>>>0))break;wb(e|0,d|0,i|0)|0;c[b+352>>2]=(c[b+352>>2]|0)+i;e=c[b+64>>2]|0;g=c[b+64+4>>2]|0;h=Cc(e|0,g|0,128,0)|0;c[b+64>>2]=h;c[b+64+4>>2]=B;e=Cc((g>>>0>4294967295|(g|0)==-1&e>>>0>4294967167)&1|0,0,c[b+72>>2]|0,c[b+72+4>>2]|0)|0;c[b+72>>2]=e;c[b+72+4>>2]=B;da(b,b+96|0);e=b+96|0;g=b+224|0;h=e+128|0;do{a[e>>0]=a[g>>0]|0;e=e+1|0;g=g+1|0}while((e|0)<(h|0));g=(c[b+352>>2]|0)+-128|0;c[b+352>>2]=g;e=Ac(j|0,f|0,i|0,0)|0;if((j|0)==(i|0)&(f|0)==0)break a;else{d=d+i|0;f=B;j=e}}wb(e|0,d|0,j|0)|0;j=Cc(c[b+352>>2]|0,0,j|0,f|0)|0;c[b+352>>2]=j}while(0);return}function Qa(b,e,f,g,h,i,j){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0;a:do if(!g){n=0;l=0;m=0;k=0}else{n=0;q=0;l=0;k=0;while(1){p=k<<24>>24==0;while(1){o=d[f+l>>0]|0;m=(((o&223)+201&255)+65526^((o&223)+201&255)+65520)>>>8;if((m|((o^48)+65526|0)>>>8)&255|0)break;if(!((h|0)!=0&p)){m=0;break a}if(!(Sc(h,o)|0)){m=0;k=0;break a}l=l+1|0;if(l>>>0>=g>>>0){m=0;k=0;break a}}m=m&(o&223)+201|((o^48)+65526|0)>>>8&(o^48);if(n>>>0>=e>>>0)break;if(p)m=m<<4&255;else{a[b+n>>0]=m|q&255;n=n+1|0;m=q}k=(k&255^255)&255;l=l+1|0;if(l>>>0<g>>>0)q=m;else{m=0;break a}}c[(Mc()|0)>>2]=34;m=-1}while(0);if(j|0)c[j>>2]=f+(((k<<24>>24!=0)<<31>>31)+l);if(i|0)c[i>>2]=n;return m|0}function Ra(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0;k=i;l=i=i+63&-64;i=i+192|0;if((e+-1&255)>63)X();if((f|0)!=0&g<<24>>24!=0?(g&255)<=64:0){a[l+128>>0]=e;a[l+128+1>>0]=g;a[l+128+2>>0]=1;a[l+128+3>>0]=1;e=l+128+4|0;j=e+60|0;do{a[e>>0]=0;e=e+1|0}while((e|0)<(j|0));Hb(b+64|0,0,293)|0;e=b;h=400;j=e+64|0;do{c[e>>2]=c[h>>2];e=e+4|0;h=h+4|0}while((e|0)<(j|0));e=0;do{m=l+128+(e<<3)|0;j=b+(e<<3)|0;h=c[j+4>>2]^(d[m+4>>0]|d[m+4+1>>0]<<8|d[m+4+2>>0]<<16|d[m+4+3>>0]<<24);c[j>>2]=c[j>>2]^(d[m>>0]|d[m+1>>0]<<8|d[m+2>>0]<<16|d[m+3>>0]<<24);c[j+4>>2]=h;e=e+1|0}while((e|0)!=8);Hb(l+(g&255)|0,0,(g<<24>>24<0?0:128-(g&255)|0)|0)|0;wb(l|0,f|0,g&255|0)|0;Pa(b,l,128,0);Vb(l,128);i=k;return}X()}function Sa(a,b,d,e,f,g,h,j,k,l,m){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0;n=i;i=i+352|0;Zc(n+280|0,l,m);_c(n,n+280|0);Vb(n+280|0,64);Ec(n,h,j,k);b=Ac(0,0,j|0,k|0)|0;Ec(n,34088,b&15,0);Ec(n,d,e,f);b=Ac(0,0,e|0,f|0)|0;Ec(n,34088,b&15,0);c[n+256>>2]=j;c[n+256+4>>2]=k;Ec(n,n+256|0,8,0);c[n+256>>2]=e;c[n+256+4>>2]=f;Ec(n,n+256|0,8,0);Yc(n,n+264|0);Vb(n,256);b=gc(n+264|0,g)|0;Vb(n+264|0,16);do if(a)if(!b){uc(a,d,e,f,l,m);b=0;break}else{Hb(a|0,0,e|0)|0;b=-1;break}while(0);i=n;return b|0}function Ta(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;w=c[a>>2]|0;u=c[a+4>>2]|0;s=c[a+8>>2]|0;q=c[a+12>>2]|0;o=c[a+16>>2]|0;m=c[a+20>>2]|0;k=c[a+24>>2]|0;i=c[a+28>>2]|0;g=c[a+32>>2]|0;e=c[a+36>>2]|0;v=(c[b+4>>2]^u)&0-d;t=(c[b+8>>2]^s)&0-d;r=(c[b+12>>2]^q)&0-d;p=(c[b+16>>2]^o)&0-d;n=(c[b+20>>2]^m)&0-d;l=(c[b+24>>2]^k)&0-d;j=(c[b+28>>2]^i)&0-d;h=(c[b+32>>2]^g)&0-d;f=(c[b+36>>2]^e)&0-d;c[a>>2]=(c[b>>2]^w)&0-d^w;c[a+4>>2]=v^u;c[a+8>>2]=t^s;c[a+12>>2]=r^q;c[a+16>>2]=p^o;c[a+20>>2]=n^m;c[a+24>>2]=l^k;c[a+28>>2]=j^i;c[a+32>>2]=h^g;c[a+36>>2]=f^e;return}function Ua(b,e,f,g,h,j){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;k=i;l=i=i+63&-64;i=i+560|0;zb(l+496|0,j,32,0);a[l+496>>0]=(d[l+496>>0]|0)&248;a[l+496+31>>0]=(d[l+496+31>>0]|0)&63|64;Zb(l);za(l,l+496+32|0,32,0);za(l,f,g,h);vb(l,l+432|0);Ob(b+32|0,j+32|0,32)|0;ga(l+432|0);Ba(l+208|0,l+432|0);xb(b,l+208|0);Zb(l);za(l,b,64,0);za(l,f,g,h);vb(l,l+368|0);ga(l+368|0);ea(b+32|0,l+368|0,l+496|0,l+432|0);Vb(l+496|0,64);if(e|0){c[e>>2]=64;c[e+4>>2]=0}i=k;return}function Va(a,b,d,e,f,g,h,j,k,l,m,n){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;l=i;i=i+336|0;Zc(l+264|0,m,n);_c(l,l+264|0);Vb(l+264|0,64);Ec(l,h,j,k);h=Ac(0,0,j|0,k|0)|0;Ec(l,34088,h&15,0);uc(a,e,f,g,m,n);Ec(l,a,f,g);m=Ac(0,0,f|0,g|0)|0;Ec(l,34088,m&15,0);c[l+256>>2]=j;c[l+256+4>>2]=k;Ec(l,l+256|0,8,0);c[l+256>>2]=f;c[l+256+4>>2]=g;Ec(l,l+256|0,8,0);Yc(l,b);Vb(l,256);if(d|0){c[d>>2]=16;c[d+4>>2]=0}i=l;return 0}function Wa(a,b,d,e,f,g,h,j,k,l,m){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0;n=i;i=i+352|0;bd(n+280|0,l,m);_c(n,n+280|0);Vb(n+280|0,64);Ec(n,h,j,k);c[n+256>>2]=j;c[n+256+4>>2]=k;Ec(n,n+256|0,8,0);Ec(n,d,e,f);c[n+256>>2]=e;c[n+256+4>>2]=f;Ec(n,n+256|0,8,0);Yc(n,n+264|0);Vb(n,256);b=gc(n+264|0,g)|0;Vb(n+264|0,16);do if(a)if(!b){wc(a,d,e,f,l,m);b=0;break}else{Hb(a|0,0,e|0)|0;b=-1;break}while(0);i=n;return b|0}function Xa(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0;e=0;do{a[b+e>>0]=(d[c+(e>>3)>>0]|0)>>>(e&7)&1;e=e+1|0}while((e|0)!=256);i=0;do{g=b+i|0;a:do if(a[g>>0]|0){h=1;do{e=h+i|0;if((e|0)>=256)break a;c=a[b+e>>0]|0;b:do if(c<<24>>24){f=a[g>>0]|0;c=c<<24>>24<<h;if((f+c|0)<16){a[g>>0]=f+c;a[b+e>>0]=0;break}if((f-c|0)<=-16)break a;a[g>>0]=f-c;while(1){c=b+e|0;if(!(a[c>>0]|0))break;a[c>>0]=0;e=e+1|0;if((e|0)>=256)break b}a[c>>0]=1}while(0);h=h+1|0}while((h|0)<7)}while(0);i=i+1|0}while((i|0)!=256);return}function Ya(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;h=i;j=i=i+63&-64;i=i+64|0;if((e+-1&255)>63)X();a[j>>0]=e;a[j+1>>0]=0;a[j+2>>0]=1;a[j+3>>0]=1;e=j+4|0;g=e+60|0;do{a[e>>0]=0;e=e+1|0}while((e|0)<(g|0));Hb(b+64|0,0,293)|0;e=b;f=400;g=e+64|0;do{c[e>>2]=c[f>>2];e=e+4|0;f=f+4|0}while((e|0)<(g|0));e=0;do{k=j+(e<<3)|0;g=b+(e<<3)|0;f=c[g+4>>2]^(d[k+4>>0]|d[k+4+1>>0]<<8|d[k+4+2>>0]<<16|d[k+4+3>>0]<<24);c[g>>2]=c[g>>2]^(d[k>>0]|d[k+1>>0]<<8|d[k+2>>0]<<16|d[k+3>>0]<<24);c[g+4>>2]=f;e=e+1|0}while((e|0)!=8);i=h;return}function Za(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=(c[b+4>>2]|0)-(c[d+4>>2]|0)|0;l=(c[b+8>>2]|0)-(c[d+8>>2]|0)|0;k=(c[b+12>>2]|0)-(c[d+12>>2]|0)|0;j=(c[b+16>>2]|0)-(c[d+16>>2]|0)|0;i=(c[b+20>>2]|0)-(c[d+20>>2]|0)|0;h=(c[b+24>>2]|0)-(c[d+24>>2]|0)|0;g=(c[b+28>>2]|0)-(c[d+28>>2]|0)|0;f=(c[b+32>>2]|0)-(c[d+32>>2]|0)|0;e=(c[b+36>>2]|0)-(c[d+36>>2]|0)|0;c[a>>2]=(c[b>>2]|0)-(c[d>>2]|0);c[a+4>>2]=m;c[a+8>>2]=l;c[a+12>>2]=k;c[a+16>>2]=j;c[a+20>>2]=i;c[a+24>>2]=h;c[a+28>>2]=g;c[a+32>>2]=f;c[a+36>>2]=e;return}function _a(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=(c[d+4>>2]|0)+(c[b+4>>2]|0)|0;l=(c[d+8>>2]|0)+(c[b+8>>2]|0)|0;k=(c[d+12>>2]|0)+(c[b+12>>2]|0)|0;j=(c[d+16>>2]|0)+(c[b+16>>2]|0)|0;i=(c[d+20>>2]|0)+(c[b+20>>2]|0)|0;h=(c[d+24>>2]|0)+(c[b+24>>2]|0)|0;g=(c[d+28>>2]|0)+(c[b+28>>2]|0)|0;f=(c[d+32>>2]|0)+(c[b+32>>2]|0)|0;e=(c[d+36>>2]|0)+(c[b+36>>2]|0)|0;c[a>>2]=(c[d>>2]|0)+(c[b>>2]|0);c[a+4>>2]=m;c[a+8>>2]=l;c[a+12>>2]=k;c[a+16>>2]=j;c[a+20>>2]=i;c[a+24>>2]=h;c[a+28>>2]=g;c[a+32>>2]=f;c[a+36>>2]=e;return}function $a(b,d){b=b|0;d=d|0;var e=0,f=0;a:do if(!(d&255))b=b+(rb(b)|0)|0;else{if(b&3)do{f=a[b>>0]|0;if(f<<24>>24==0?1:f<<24>>24==(d&255)<<24>>24)break a;b=b+1|0}while((b&3|0)!=0);f=Q(d&255,16843009)|0;e=c[b>>2]|0;b:do if(!((e&-2139062144^-2139062144)&e+-16843009))do{e=e^f;if((e&-2139062144^-2139062144)&e+-16843009|0)break b;b=b+4|0;e=c[b>>2]|0}while(!((e&-2139062144^-2139062144)&e+-16843009|0));while(0);while(1){f=a[b>>0]|0;if(f<<24>>24==0?1:f<<24>>24==(d&255)<<24>>24)break;else b=b+1|0}}while(0);return b|0}function ab(b,c){b=b|0;c=c|0;var d=0,e=0,f=0;f=i;i=i+192|0;Zb(b);d=f+64|0;e=d+128|0;do{a[d>>0]=54;d=d+1|0}while((d|0)<(e|0));a[f+64>>0]=a[c>>0]^54;d=1;do{e=f+64+d|0;a[e>>0]=a[e>>0]^a[c+d>>0];d=d+1|0}while((d|0)!=32);za(b,f+64|0,128,0);Zb(b+208|0);d=f+64|0;e=d+128|0;do{a[d>>0]=92;d=d+1|0}while((d|0)<(e|0));a[f+64>>0]=a[c>>0]^92;d=1;do{e=f+64+d|0;a[e>>0]=a[e>>0]^a[c+d>>0];d=d+1|0}while((d|0)!=32);za(b+208|0,f+64|0,128,0);Vb(f+64|0,128);Vb(f,64);i=f;return}function bb(a,b,d,e,f,g,h,j,k,l,m,n){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;l=i;i=i+336|0;bd(l+264|0,m,n);_c(l,l+264|0);Vb(l+264|0,64);Ec(l,h,j,k);c[l+256>>2]=j;c[l+256+4>>2]=k;Ec(l,l+256|0,8,0);wc(a,e,f,g,m,n);Ec(l,a,f,g);c[l+256>>2]=f;c[l+256+4>>2]=g;Ec(l,l+256|0,8,0);Yc(l,b);Vb(l,256);if(d|0){c[d>>2]=16;c[d+4>>2]=0}i=l;return 0}function cb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;_a(a,b+40|0,b);Za(a+40|0,b+40|0,b);ha(a+80|0,a,c+40|0);ha(a+40|0,a+40|0,c);ha(a+120|0,c+120|0,b+120|0);ha(a,b+80|0,c+80|0);_a(e,a,a);Za(a,a+80|0,a+40|0);_a(a+40|0,a+80|0,a+40|0);Za(a+80|0,e,a+120|0);_a(a+120|0,e,a+120|0);i=d;return}function db(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;_a(a,b+40|0,b);Za(a+40|0,b+40|0,b);ha(a+80|0,a,c);ha(a+40|0,a+40|0,c+40|0);ha(a+120|0,c+120|0,b+120|0);ha(a,b+80|0,c+80|0);_a(e,a,a);Za(a,a+80|0,a+40|0);_a(a+40|0,a+80|0,a+40|0);_a(a+80|0,e,a+120|0);Za(a+120|0,e,a+120|0);i=d;return}function eb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;_a(a,b+40|0,b);Za(a+40|0,b+40|0,b);l=c[b+84>>2]|0;k=c[b+88>>2]|0;j=c[b+92>>2]|0;i=c[b+96>>2]|0;h=c[b+100>>2]|0;g=c[b+104>>2]|0;f=c[b+108>>2]|0;e=c[b+112>>2]|0;d=c[b+116>>2]|0;c[a+80>>2]=c[b+80>>2];c[a+84>>2]=l;c[a+88>>2]=k;c[a+92>>2]=j;c[a+96>>2]=i;c[a+100>>2]=h;c[a+104>>2]=g;c[a+108>>2]=f;c[a+112>>2]=e;c[a+116>>2]=d;ha(a+120|0,b+120|0,544);return}function fb(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;j=i;k=i=i+63&-64;i=i+112|0;h=k+16|0;g=h+32|0;do{a[h>>0]=a[f>>0]|0;h=h+1|0;f=f+1|0}while((h|0)<(g|0));f=d[e+4>>0]|d[e+4+1>>0]<<8|d[e+4+2>>0]<<16|d[e+4+3>>0]<<24;c[k>>2]=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;c[k+4>>2]=f;c[k+8>>2]=0;c[k+8+4>>2]=0;oa(k+48|0,k,k+16|0);f=0;do{a[b+f>>0]=a[k+48+f>>0]|0;f=f+1|0}while((f|0)!=32);Vb(k+48|0,64);Vb(k+16|0,32);i=j;return}function gb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0;g=i;h=i=i+63&-64;i=i+320|0;f=h+280|0;e=f+32|0;do{a[f>>0]=a[c>>0]|0;f=f+1|0;c=c+1|0}while((f|0)<(e|0));a[h+280>>0]=(d[h+280>>0]|0)&248;a[h+280+31>>0]=(d[h+280+31>>0]|0)&63|64;Ba(h+40|0,h+280|0);_a(h+240|0,h+40+80|0,h+40+40|0);Za(h+200|0,h+40+80|0,h+40+40|0);ua(h+200|0,h+200|0);ha(h,h+240|0,h+200|0);xa(b,h);i=g;return 0}function hb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;_a(a,b+40|0,b);Za(a+40|0,b+40|0,b);ha(a+80|0,a,c+40|0);ha(a+40|0,a+40|0,c);ha(a+120|0,c+80|0,b+120|0);_a(e,b+80|0,b+80|0);Za(a,a+80|0,a+40|0);_a(a+40|0,a+80|0,a+40|0);Za(a+80|0,e,a+120|0);_a(a+120|0,e,a+120|0);i=d;return}function ib(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;_a(a,b+40|0,b);Za(a+40|0,b+40|0,b);ha(a+80|0,a,c);ha(a+40|0,a+40|0,c+40|0);ha(a+120|0,c+80|0,b+120|0);_a(e,b+80|0,b+80|0);Za(a,a+80|0,a+40|0);_a(a+40|0,a+80|0,a+40|0);_a(a+80|0,e,a+120|0);Za(a+120|0,e,a+120|0);i=d;return}function jb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;if(e>>>3|0){f=0;do{g=b+(f<<3)|0;h=d+(f<<3)|0;i=c[h>>2]|0;h=c[h+4>>2]|0;a[g+7>>0]=i;j=qc(i|0,h|0,8)|0;a[g+6>>0]=j;j=qc(i|0,h|0,16)|0;a[g+5>>0]=j;j=qc(i|0,h|0,24)|0;a[g+4>>0]=j;a[g+3>>0]=h;j=qc(i|0,h|0,40)|0;a[g+2>>0]=j;j=qc(i|0,h|0,48)|0;a[g+1>>0]=j;h=qc(i|0,h|0,56)|0;a[g>>0]=h;f=f+1|0}while((f|0)!=(e>>>3|0))}return}function kb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=0-(c[b+4>>2]|0)|0;k=0-(c[b+8>>2]|0)|0;j=0-(c[b+12>>2]|0)|0;i=0-(c[b+16>>2]|0)|0;h=0-(c[b+20>>2]|0)|0;g=0-(c[b+24>>2]|0)|0;f=0-(c[b+28>>2]|0)|0;e=0-(c[b+32>>2]|0)|0;d=0-(c[b+36>>2]|0)|0;c[a>>2]=0-(c[b>>2]|0);c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;return}function lb(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+368|0;if((b|0)==0&((e|0)!=0|(f|0)!=0))X();if(!a)X();if((d+-1&255)>63)X();if(!((c|0)!=0|g<<24>>24==0))X();if((g&255)>64)X();if(!(g<<24>>24))Ya(j,d);else Ra(j,d,c,g);Pa(j,b,e,f);Ja(j,a,d)|0;i=h;return}function mb(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=i=i+63&-64;i=i+48|0;ja(a,b);ja(a+80|0,b+40|0);ia(a+120|0,b+80|0);_a(a+40|0,b,b+40|0);ja(d,a+40|0);_a(a+40|0,a+80|0,a);Za(a+80|0,a+80|0,a);Za(a,d,a+40|0);Za(a+120|0,a+120|0,a+80|0);i=c;return}function nb(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+16|0;Ob(a+64|0,d|0,e|0)|0;Ua(a,j,a+64|0,e,f,g);if((c[j>>2]|0)==64&(c[j+4>>2]|0)==0)if(b|0){e=Cc(e|0,f|0,64,0)|0;c[b>>2]=e;c[b+4>>2]=B;e=0}else e=0;else{if(b|0){c[b>>2]=0;c[b+4>>2]=0}e=Cc(e|0,f|0,64,0)|0;Hb(a|0,0,e|0)|0;e=-1}i=h;return e|0}function ob(a,b){a=a|0;b=b|0;var c=0,d=0;d=i;c=i=i+63&-64;i=i+240|0;if(!(qa(c+80|0,b)|0)){sc(c);Za(c,c,c+80+40|0);ua(c,c);sc(c+40|0);_a(c+40|0,c+40|0,c+80+40|0);ha(c+40|0,c+40|0,c);xa(a,c+40|0);a=0}else a=-1;i=d;return a|0}function pb(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;e=Cc(e|0,f|0,-64,-1)|0;f=B;do if(f>>>0>0|(f|0)==0&e>>>0>4294967231)h=7;else{if(Ga(d,d+64|0,e,f,g)|0){Hb(a|0,0,e|0)|0;h=7;break}if(b|0){c[b>>2]=e;c[b+4>>2]=f}Ob(a|0,d+64|0,e|0)|0;e=0}while(0);if((h|0)==7)if(!b)e=-1;else{c[b>>2]=0;c[b+4>>2]=0;e=-1}return e|0}function qb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=c[b+4>>2]|0;k=c[b+8>>2]|0;j=c[b+12>>2]|0;i=c[b+16>>2]|0;h=c[b+20>>2]|0;g=c[b+24>>2]|0;f=c[b+28>>2]|0;e=c[b+32>>2]|0;d=c[b+36>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;return}function rb(b){b=b|0;var d=0,e=0,f=0;a:do if(!(b&3)){d=b;f=4}else{e=b;d=b;while(1){if(!(a[e>>0]|0))break a;e=e+1|0;d=e;if(!(d&3)){d=e;f=4;break}}}while(0);if((f|0)==4){while(1){e=c[d>>2]|0;if(!((e&-2139062144^-2139062144)&e+-16843009))d=d+4|0;else break}if((e&255)<<24>>24)do d=d+1|0;while((a[d>>0]|0)!=0)}return d-b|0}function sb(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;k=i;i=i+96|0;if(!(ad(k+32|0,k)|0)){g=b;h=k+32|0;j=g+32|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(j|0));Nb(k+64|0,k+32|0,f);d=_b(b+32|0,c,d,e,k+64|0,f,k)|0;Vb(k,32);Vb(k+32|0,32);Vb(k+64|0,24)}else d=-1;i=k;return d|0}function tb(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(g>>>0>0|(g|0)==0&f>>>0>15){d=Cc(f|0,g|0,-16,-1)|0;i=Sa(a,0,e,d,B,e+f+-16|0,h,i,j,k,l)|0}else i=-1;if(b|0){d=(i|0)==0;g=Cc(f|0,g|0,-16,-1)|0;c[b>>2]=d?g:0;c[b+4>>2]=d?B:0}return i|0}function ub(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(g>>>0>0|(g|0)==0&f>>>0>15){d=Cc(f|0,g|0,-16,-1)|0;i=Wa(a,0,e,d,B,e+f+-16|0,h,i,j,k,l)|0}else i=-1;if(b|0){d=(i|0)==0;g=Cc(f|0,g|0,-16,-1)|0;c[b>>2]=d?g:0;c[b+4>>2]=d?B:0}return i|0}function vb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;e=i=i+63&-64;i=i+16|0;jb(e,a+64|0,16);f=qc(c[a+72>>2]|0,c[a+72+4>>2]|0,3)|0;f=Ac((0<0|0==0&(f&127)>>>0<112?112:240)|0,(0<0|0==0&(f&127)>>>0<112?0:0)|0,f&127|0,0)|0;za(a,32566,f,B);za(a,e,16,0);jb(b,a,64);Vb(a,208);i=d;return}function wb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return _(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if(!e)return f|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function xb(b,c){b=b|0;c=c|0;var e=0,f=0;e=i;f=i=i+63&-64;i=i+160|0;ua(f+80|0,c+80|0);ha(f+40|0,c,f+80|0);ha(f,c+40|0,f+80|0);xa(b,f);xa(f+120|0,f+40|0);a[b+31>>0]=(d[b+31>>0]|0)^(d[f+120>>0]|0)<<7;i=e;return}function yb(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0;if(!(f>>>0<2147483647&f<<1>>>0<c>>>0))X();if(!f)c=0;else{c=0;do{h=d[e+c>>0]|0;g=c<<1;a[b+g>>0]=(h>>>4)+87+(((h>>>4)+65526|0)>>>8&217);a[b+(g|1)>>0]=(((h&15)<<8)+22272+((h&15)+65526&55552)|0)>>>8;c=c+1|0}while((c|0)!=(f|0));c=f<<1}a[b+c>>0]=0;return b|0}function zb(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;g=i;h=i=i+63&-64;i=i+208|0;c[h+64>>2]=0;c[h+64+4>>2]=0;c[h+64+8>>2]=0;c[h+64+12>>2]=0;f=h;j=400;k=f+64|0;do{c[f>>2]=c[j>>2];f=f+4|0;j=j+4|0}while((f|0)<(k|0));za(h,b,d,e);vb(h,a);i=g;return}function Ab(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;do if(!(c>>>0>64|(d+-1|0)>>>0>63)){if(d>>>0>=256)W(32382,32402,53,32501);if(c>>>0>=256)W(32481,32402,54,32501);if((b|0)==0|(c|0)==0){Ya(a,d&255);b=0;break}else{Ra(a,d&255,b,c&255);b=0;break}}else b=-1;while(0);return b|0}function Bb(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(f>>>0>4294967295|(f|0)==-1&e>>>0>4294967279)X();Va(a,a+e|0,0,d,e,f,g,h,i,0,k,l)|0;if(b|0){j=Cc(e|0,f|0,16,0)|0;c[b>>2]=j;c[b+4>>2]=B}return 0}function Cb(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(f>>>0>4294967295|(f|0)==-1&e>>>0>4294967279)X();bb(a,a+e|0,0,d,e,f,g,h,i,0,k,l)|0;if(b|0){j=Cc(e|0,f|0,16,0)|0;c[b>>2]=j;c[b+4>>2]=B}return 0}function Db(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;do if(!((b+-1|0)>>>0>63|g>>>0>64)){if(b>>>0>=256)W(32382,32402,18,32454);if(g>>>0<256){lb(a,c,f,b&255,d,e,g&255);h=0;break}else W(32481,32402,19,32454)}else h=-1;while(0);return h|0}function Eb(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0;f=i;g=i=i+63&-64;i=i+160|0;zb(c,e,32,0);a[c>>0]=(d[c>>0]|0)&248;a[c+31>>0]=(d[c+31>>0]|0)&63|64;Ba(g,c);xb(b,g);Ob(c|0,e|0,32)|0;Ob(c+32|0,b|0,32)|0;i=f;return}function Fb(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;g=i;h=i=i+63&-64;i=i+64|0;zb(h,d,32,0);d=c;e=h;f=d+32|0;do{a[d>>0]=a[e>>0]|0;d=d+1|0;e=e+1|0}while((d|0)<(f|0));Vb(h,64);h=Xc(b,c)|0;i=g;return h|0}function Gb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0;f=i;g=i=i+63&-64;i=i+64|0;zb(g,c,32,0);a[g>>0]=(d[g>>0]|0)&248;a[g+31>>0]=(d[g+31>>0]|0)&63|64;c=g;e=b+32|0;do{a[b>>0]=a[c>>0]|0;b=b+1|0;c=c+1|0}while((b|0)<(e|0));Vb(g,64);i=f;return 0}function Hb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=b+e|0;if((e|0)>=20){d=d&255;g=b&3;h=d|d<<8|d<<16|d<<24;if(g){g=b+4-g|0;while((b|0)<(g|0)){a[b>>0]=d;b=b+1|0}}while((b|0)<(f&~3|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0}return b-e|0}function Ib(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;h=i;g=i=i+63&-64;i=i+32|0;if(d>>>0<0|(d|0)==0&c>>>0<48)c=-1;else{Nb(g,b,e);c=Cc(c|0,d|0,-32,-1)|0;c=Ub(a,b+32|0,c,B,g,b,f)|0}i=h;return c|0}function Jb(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0;g=i;i=i+480|0;ab(g,f);Pc(g,c,d,e);ac(g,g+416|0);d=g+416|0;e=b+32|0;do{a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0}while((b|0)<(e|0));i=g;return}function Kb(b,d){b=b|0;d=d|0;var e=0,f=0;e=i;f=i=i+63&-64;i=i+16|0;c[f+4>>2]=b;c[f>>2]=d;b=0;d=0;do{b=a[(c[f>>2]|0)+d>>0]^a[(c[f+4>>2]|0)+d>>0]|b;d=d+1|0}while((d|0)!=32);i=e;return (((b&255)+511|0)>>>8&1)+-1|0}function Lb(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0;j=i;i=i+32|0;if(!(Rc(j,g,h)|0)){d=Na(a,b,c,d,e,f,j)|0;Vb(j,32)}else d=-1;i=j;return d|0}function Mb(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0;j=i;i=i+32|0;if(!(Rc(j,g,h)|0)){Fa(a,b,c,d,e,f,j)|0;Vb(j,32);d=0}else d=-1;i=j;return d|0}function Nb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+368|0;Nc(e,0,0,24)|0;Kc(e,b,32,0)|0;Kc(e,c,32,0)|0;Uc(e,a,24)|0;i=d;return}function Ob(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((c|0)<(b|0)&(b|0)<(c+d|0)){e=b;c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b>>0]=a[c>>0]|0}b=e}else wb(b,c,d)|0;return b|0}function Pb(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=Q(b&65535,a&65535)|0;e=(c>>>16)+(Q(b&65535,a>>>16)|0)|0;d=Q(b>>>16,a&65535)|0;return (B=(e>>>16)+(Q(b>>>16,a>>>16)|0)+(((e&65535)+d|0)>>>16)|0,e+d<<16|c&65535|0)|0}function Qb(a,b){a=a|0;b=b|0;ha(a,b,b+120|0);ha(a+40|0,b+40|0,b+80|0);ha(a+80|0,b+80|0,b+120|0);ha(a+120|0,b,b+40|0);return}function Rb(b,c,d){b=b|0;c=c|0;d=d|0;if(!(na(b,c,d)|0)){c=0;d=0;do{c=a[b+d>>0]|c;d=d+1|0}while((d|0)!=32);c=0-(((c&255)+511|0)>>>8&1)|0}else c=-1;return c|0}function Sb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=i;d=i=i+63&-64;i=i+32|0;if(!(Rb(d,c,b)|0)){sa(a,34104,d);a=0}else a=-1;i=e;return a|0}function Tb(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=i;i=i+32|0;Jb(f,b,c,d,e);e=fc(a,f)|0;e=((f|0)==(a|0)?-1:e)|(Kb(f,a)|0);i=f;return e|0}function Ub(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(d>>>0<0|(d|0)==0&c>>>0<16)c=-1;else{c=Cc(c|0,d|0,-16,-1)|0;c=Lb(a,b+16|0,b,c,B,e,f,g)|0}return c|0}function Vb(b,d){b=b|0;d=d|0;var e=0,f=0;e=i;f=i=i+63&-64;i=i+16|0;c[f>>2]=b;if(d|0){b=0;do{a[(c[f>>2]|0)+b>>0]=0;b=b+1|0}while((b|0)!=(d|0))}i=e;return}function Wb(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=i;g=i=i+63&-64;i=i+16|0;Ma(g,b,c,d,e);e=gc(a,g)|0;i=f;return e|0}function Xb(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0<0|(d|0)==0&c>>>0<16)c=-1;else{c=Cc(c|0,d|0,-16,-1)|0;c=Na(a,b+16|0,b,c,B,e,f)|0}return c|0}function Yb(b,c,d){b=b|0;c=c|0;d=d|0;if(!(d>>>0<1|(d|0)==1&c>>>0<0))W(33469,33489,172,33515);if(c|0){d=0;do{a[b+d>>0]=V(0)|0;d=d+1|0}while((d|0)!=(c|0))}return}function Zb(a){a=a|0;var b=0,d=0;c[a+64>>2]=0;c[a+64+4>>2]=0;c[a+64+8>>2]=0;c[a+64+12>>2]=0;b=400;d=a+64|0;do{c[a>>2]=c[b>>2];a=a+4|0;b=b+4|0}while((a|0)<(d|0));return}function _b(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)c=-1;else c=Mb(a+16|0,a,b,c,d,e,f,g)|0;return c|0}function $b(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)c=-1;else{Fa(a+16|0,a,b,c,d,e,f)|0;c=0}return c|0}function ac(a,b){a=a|0;b=b|0;var c=0;c=i;i=i+64|0;vb(a,c);za(a+208|0,c,64,0);vb(a+208|0,b);Vb(c,64);i=c;return}function bc(a,b){a=a|0;b=b|0;ha(a,b,b+120|0);ha(a+40|0,b+40|0,b+80|0);ha(a+80|0,b+80|0,b+120|0);return}function cc(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=i=i+63&-64;i=i+32|0;lc(d,32);Eb(a,b,d);Vb(d,32);i=c;return}function dc(a){a=a|0;var b=0;if(a>>>0<2)b=0;else{do b=V(0)|0;while(b>>>0<(((0-a|0)>>>0)%(a>>>0)|0)>>>0);b=(b>>>0)%(a>>>0)|0}return b|0}function ec(a,b,c){a=a|0;b=b|0;c=c|0;Ta(a,b,c&255);Ta(a+40|0,b+40|0,c&255);Ta(a+80|0,b+80|0,c&255);return}function fc(b,c){b=b|0;c=c|0;var d=0,e=0;d=0;e=0;do{d=(a[c+e>>0]^a[b+e>>0])&255|d;e=e+1|0}while((e|0)!=32);return ((d+511|0)>>>8&1)+-1|0}function gc(b,c){b=b|0;c=c|0;var d=0,e=0;d=0;e=0;do{d=(a[c+e>>0]^a[b+e>>0])&255|d;e=e+1|0}while((e|0)!=16);return ((d+511|0)>>>8&1)+-1|0}function hc(){}function ic(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){B=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}B=(b|0)<0?-1:0;return b>>c-32|0}function jc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=Pb(a,c)|0;f=B;return (B=(Q(b,c)|0)+(Q(d,a)|0)+f|f&0,e|0|0)|0}function kc(a,b,c){a=a|0;b=b|0;c=c|0;if(c>>>0<256)return Ja(a,b,c&255)|0;else W(32382,32402,106,32533);return 0}function lc(b,c){b=b|0;c=c|0;var d=0;if(c|0){d=0;do{a[b+d>>0]=V(0)|0;d=d+1|0}while((d|0)!=(c|0))}return}function mc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Na(a,b,c,d,e,f,g)|0}function nc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;Fa(a,b,c,d,e,f,g)|0;return 0}function oc(){var a=0;a=aa(30)|0;if((a|0)>0)c[8385]=a;else a=c[8385]|0;if(a>>>0<16)X();else{lc(34152,16);return}}function pc(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){B=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}B=a<<c-32;return 0}function qc(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){B=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}B=0;return b>>>c-32|0}function rc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Db(a,b,c,d,e,f,g)|0}function sc(a){a=a|0;var b=0;c[a>>2]=1;a=a+4|0;b=a+36|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function tc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;ya(a,b,c,d,e,0,0,f);return}function uc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Da(a,b,c,d,e,1,f);return}function vc(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Wb(a,b,c,d,e)|0}function wc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Ha(a,b,c,d,e,1,0,f);return}function xc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Ua(a,b,c,d,e,f);return 0}function yc(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Ga(a,b,c,d,e)|0}function zc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return pb(a,b,c,d,e,f)|0}function Ac(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (B=d,a-c>>>0|0)|0}function Bc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return nb(a,b,c,d,e,f)|0}function Cc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return (B=b+d+(a+c>>>0>>>0<a>>>0|0)>>>0,a+c>>>0|0)|0}function Dc(){var a=0;if(!(c[8384]|0)){jd();oc();c[8384]=1;a=0}else a=1;return a|0}function Ec(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Oc(a,b,c,d);return}function Fc(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Tb(a,b,c,d,e)|0}function Gc(a){a=a|0;var b=0;b=a+40|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function Hc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Pa(a,b,c,d);return}function Ic(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ka(a,b,c,d,e);return 0}function Jc(a,b){a=a|0;b=b|0;lc(b,32);return Xc(a,b)|0}function Kc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Hc(a,b,c,d);return 0}function Lc(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Jb(a,b,c,d,e);return 0}function Mc(){var a=0;if(!(c[8386]|0))a=33588;else a=c[(zd()|0)+64>>2]|0;return a|0}function Nc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Ab(a,b,c,d)|0}function Oc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ca(a,b,c,d);return}function Pc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;za(a,b,c,d);return}function Qc(a,b,c){a=a|0;b=b|0;c=c|0;return Fb(a,b,c)|0}function Rc(a,b,c){a=a|0;b=b|0;c=c|0;return Sb(a,b,c)|0}function Sc(b,c){b=b|0;c=c|0;b=$a(b,c)|0;return ((a[b>>0]|0)==(c&255)<<24>>24?b:0)|0}function Tc(a,b,c){a=a|0;b=b|0;c=c|0;Eb(a,b,c);return 0}function Uc(a,b,c){a=a|0;b=b|0;c=c|0;return kc(a,b,c)|0}function Vc(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+15&-16;return b|0}function Wc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;zb(a,b,c,d);return 0}function Xc(a,b){a=a|0;b=b|0;return gb(a,b)|0}function Yc(a,b){a=a|0;b=b|0;ed(a,b);return}function Zc(a,b,c){a=a|0;b=b|0;c=c|0;Ea(a,64,0,b,c);return}function _c(a,b){a=a|0;b=b|0;Oa(a,b);return}function $c(a,b,c){a=a|0;b=b|0;c=c|0;return Rb(a,b,c)|0}function ad(a,b){a=a|0;b=b|0;return Jc(a,b)|0}function bd(a,b,c){a=a|0;b=b|0;c=c|0;Ia(a,64,0,b,c);return}function cd(a,b){a=a|0;b=b|0;return Xc(a,b)|0}function dd(a,b){a=a|0;b=b|0;if(!m){m=a;n=b}}function ed(a,b){a=a|0;b=b|0;Aa(a,b);return}function fd(a,b){a=a|0;b=b|0;cc(a,b);return 0}function gd(a,b){a=a|0;b=b|0;i=a;j=b}function hd(){return V(0)|0}function id(){return 12}function jd(){$(1);return}function kd(a){a=a|0;i=a}function ld(){return 32264}function md(a){a=a|0;B=a}function nd(){return 384}function od(){return 2}function pd(){return 9}function qd(){return 33527}function rd(){return 8}function sd(){return 24}function td(){return B|0}function ud(){return 48}function vd(){return 16}function wd(){return i|0}function xd(){return 64}function yd(){return 32}function zd(){return 0}

// EMSCRIPTEN_END_FUNCS
return{_sodium_library_version_minor:od,_sodium_hex2bin:Qa,_bitshift64Lshr:qc,_crypto_box_noncebytes:sd,_crypto_aead_chacha20poly1305_ietf_keybytes:yd,_crypto_aead_chacha20poly1305_ietf_encrypt_detached:Va,_crypto_scalarmult_base:cd,_crypto_aead_chacha20poly1305_abytes:vd,_crypto_auth_bytes:yd,_crypto_sign_open:zc,_crypto_aead_chacha20poly1305_decrypt_detached:Wa,_memcpy:wb,_crypto_box_seed_keypair:Qc,_crypto_box_open_easy_afternm:Xb,_crypto_sign_ed25519_sk_to_curve25519:Gb,_crypto_aead_chacha20poly1305_keybytes:yd,_crypto_box_seal:sb,_free:la,_crypto_shorthash:Ic,_crypto_auth_keybytes:yd,_crypto_aead_chacha20poly1305_npubbytes:rd,_crypto_sign_seedbytes:yd,_crypto_box_detached_afternm:nc,_crypto_auth:Lc,_randombytes_random:hd,_crypto_sign_keypair:fd,_crypto_shorthash_keybytes:vd,_crypto_generichash_statebytes:nd,_crypto_aead_chacha20poly1305_encrypt_detached:bb,_sodium_library_version_major:pd,_i64Add:Cc,_sodium_version_string:qd,_crypto_generichash_keybytes_max:xd,_crypto_sign_ed25519_pk_to_curve25519:ob,_crypto_sign_publickeybytes:yd,_crypto_box_beforenmbytes:yd,_crypto_generichash:rc,_crypto_aead_chacha20poly1305_ietf_nsecbytes:zd,_randombytes_stir:jd,_crypto_aead_chacha20poly1305_ietf_encrypt:Bb,_crypto_box_beforenm:Rc,_crypto_aead_chacha20poly1305_ietf_decrypt:tb,_randombytes_close:zd,_crypto_shorthash_bytes:rd,_crypto_box_secretkeybytes:yd,_crypto_aead_chacha20poly1305_encrypt:Cb,_crypto_box_detached:Mb,_randombytes_buf:lc,_sodium_bin2hex:yb,_bitshift64Ashr:ic,_crypto_box_open_detached:Lb,_crypto_scalarmult_bytes:yd,_crypto_auth_verify:Fc,_crypto_box_seal_open:Ib,_crypto_secretbox_detached:Fa,_crypto_secretbox_easy:$b,_memset:Hb,_crypto_box_open_detached_afternm:mc,_crypto_box_sealbytes:ud,_i64Subtract:Ac,_crypto_box_seedbytes:yd,_crypto_hash:Wc,_crypto_box_easy_afternm:$b,_crypto_box_macbytes:vd,_crypto_box_publickeybytes:yd,_crypto_generichash_primitive:ld,_crypto_sign_secretkeybytes:xd,___muldsi3:Pb,_crypto_scalarmult_scalarbytes:yd,_crypto_generichash_keybytes_min:vd,_malloc:fa,_crypto_aead_chacha20poly1305_decrypt:ub,_memmove:Ob,_crypto_aead_chacha20poly1305_ietf_decrypt_detached:Sa,_crypto_sign:Bc,_crypto_secretbox_noncebytes:sd,_crypto_box_keypair:ad,_crypto_generichash_keybytes:yd,_crypto_generichash_bytes_min:vd,_sodium_init:Dc,_crypto_secretbox_macbytes:vd,_crypto_secretbox_keybytes:yd,_randombytes:Yb,_crypto_hash_bytes:xd,_crypto_generichash_bytes:yd,_crypto_generichash_bytes_max:xd,_crypto_secretbox_open_detached:Na,___muldi3:jc,_bitshift64Shl:pc,_crypto_sign_verify_detached:yc,_crypto_box_open_easy:Ub,_crypto_generichash_init:Nc,_crypto_aead_chacha20poly1305_nsecbytes:zd,_crypto_sign_bytes:xd,_pthread_self:zd,_crypto_generichash_update:Kc,_crypto_scalarmult:$c,_crypto_aead_chacha20poly1305_ietf_abytes:vd,_crypto_sign_detached:xc,_crypto_box_easy:_b,_crypto_secretbox_open_easy:Xb,_crypto_generichash_final:Uc,_randombytes_uniform:dc,_crypto_sign_seed_keypair:Tc,_crypto_aead_chacha20poly1305_ietf_npubbytes:id,runPostSets:hc,stackAlloc:Vc,stackSave:wd,stackRestore:kd,establishStackSpace:gd,setThrew:dd,setTempRet0:md,getTempRet0:td}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var _sodium_library_version_minor=Module["_sodium_library_version_minor"]=asm["_sodium_library_version_minor"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _crypto_box_noncebytes=Module["_crypto_box_noncebytes"]=asm["_crypto_box_noncebytes"];var _crypto_aead_chacha20poly1305_ietf_keybytes=Module["_crypto_aead_chacha20poly1305_ietf_keybytes"]=asm["_crypto_aead_chacha20poly1305_ietf_keybytes"];var _crypto_aead_chacha20poly1305_ietf_encrypt_detached=Module["_crypto_aead_chacha20poly1305_ietf_encrypt_detached"]=asm["_crypto_aead_chacha20poly1305_ietf_encrypt_detached"];var _crypto_scalarmult_base=Module["_crypto_scalarmult_base"]=asm["_crypto_scalarmult_base"];var _crypto_aead_chacha20poly1305_abytes=Module["_crypto_aead_chacha20poly1305_abytes"]=asm["_crypto_aead_chacha20poly1305_abytes"];var _crypto_auth_bytes=Module["_crypto_auth_bytes"]=asm["_crypto_auth_bytes"];var _crypto_sign_open=Module["_crypto_sign_open"]=asm["_crypto_sign_open"];var _crypto_aead_chacha20poly1305_decrypt_detached=Module["_crypto_aead_chacha20poly1305_decrypt_detached"]=asm["_crypto_aead_chacha20poly1305_decrypt_detached"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var _crypto_box_seed_keypair=Module["_crypto_box_seed_keypair"]=asm["_crypto_box_seed_keypair"];var _crypto_box_open_easy_afternm=Module["_crypto_box_open_easy_afternm"]=asm["_crypto_box_open_easy_afternm"];var _crypto_sign_ed25519_sk_to_curve25519=Module["_crypto_sign_ed25519_sk_to_curve25519"]=asm["_crypto_sign_ed25519_sk_to_curve25519"];var _crypto_aead_chacha20poly1305_keybytes=Module["_crypto_aead_chacha20poly1305_keybytes"]=asm["_crypto_aead_chacha20poly1305_keybytes"];var _crypto_box_seal=Module["_crypto_box_seal"]=asm["_crypto_box_seal"];var _free=Module["_free"]=asm["_free"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var _crypto_shorthash=Module["_crypto_shorthash"]=asm["_crypto_shorthash"];var _crypto_auth_keybytes=Module["_crypto_auth_keybytes"]=asm["_crypto_auth_keybytes"];var _crypto_aead_chacha20poly1305_npubbytes=Module["_crypto_aead_chacha20poly1305_npubbytes"]=asm["_crypto_aead_chacha20poly1305_npubbytes"];var _crypto_sign_seedbytes=Module["_crypto_sign_seedbytes"]=asm["_crypto_sign_seedbytes"];var _crypto_box_detached_afternm=Module["_crypto_box_detached_afternm"]=asm["_crypto_box_detached_afternm"];var _crypto_auth=Module["_crypto_auth"]=asm["_crypto_auth"];var _randombytes_random=Module["_randombytes_random"]=asm["_randombytes_random"];var _crypto_sign_keypair=Module["_crypto_sign_keypair"]=asm["_crypto_sign_keypair"];var _crypto_generichash_keybytes_min=Module["_crypto_generichash_keybytes_min"]=asm["_crypto_generichash_keybytes_min"];var _crypto_generichash_statebytes=Module["_crypto_generichash_statebytes"]=asm["_crypto_generichash_statebytes"];var _crypto_aead_chacha20poly1305_encrypt_detached=Module["_crypto_aead_chacha20poly1305_encrypt_detached"]=asm["_crypto_aead_chacha20poly1305_encrypt_detached"];var _sodium_library_version_major=Module["_sodium_library_version_major"]=asm["_sodium_library_version_major"];var _sodium_version_string=Module["_sodium_version_string"]=asm["_sodium_version_string"];var _crypto_generichash_keybytes_max=Module["_crypto_generichash_keybytes_max"]=asm["_crypto_generichash_keybytes_max"];var _crypto_sign_ed25519_pk_to_curve25519=Module["_crypto_sign_ed25519_pk_to_curve25519"]=asm["_crypto_sign_ed25519_pk_to_curve25519"];var _crypto_aead_chacha20poly1305_nsecbytes=Module["_crypto_aead_chacha20poly1305_nsecbytes"]=asm["_crypto_aead_chacha20poly1305_nsecbytes"];var _crypto_box_beforenmbytes=Module["_crypto_box_beforenmbytes"]=asm["_crypto_box_beforenmbytes"];var _crypto_generichash=Module["_crypto_generichash"]=asm["_crypto_generichash"];var _crypto_aead_chacha20poly1305_ietf_nsecbytes=Module["_crypto_aead_chacha20poly1305_ietf_nsecbytes"]=asm["_crypto_aead_chacha20poly1305_ietf_nsecbytes"];var _randombytes_stir=Module["_randombytes_stir"]=asm["_randombytes_stir"];var _crypto_aead_chacha20poly1305_ietf_encrypt=Module["_crypto_aead_chacha20poly1305_ietf_encrypt"]=asm["_crypto_aead_chacha20poly1305_ietf_encrypt"];var _crypto_box_beforenm=Module["_crypto_box_beforenm"]=asm["_crypto_box_beforenm"];var _crypto_shorthash_keybytes=Module["_crypto_shorthash_keybytes"]=asm["_crypto_shorthash_keybytes"];var _crypto_aead_chacha20poly1305_ietf_decrypt=Module["_crypto_aead_chacha20poly1305_ietf_decrypt"]=asm["_crypto_aead_chacha20poly1305_ietf_decrypt"];var _randombytes_close=Module["_randombytes_close"]=asm["_randombytes_close"];var _crypto_shorthash_bytes=Module["_crypto_shorthash_bytes"]=asm["_crypto_shorthash_bytes"];var _crypto_box_secretkeybytes=Module["_crypto_box_secretkeybytes"]=asm["_crypto_box_secretkeybytes"];var _crypto_aead_chacha20poly1305_encrypt=Module["_crypto_aead_chacha20poly1305_encrypt"]=asm["_crypto_aead_chacha20poly1305_encrypt"];var _crypto_box_detached=Module["_crypto_box_detached"]=asm["_crypto_box_detached"];var _randombytes_buf=Module["_randombytes_buf"]=asm["_randombytes_buf"];var _sodium_bin2hex=Module["_sodium_bin2hex"]=asm["_sodium_bin2hex"];var _bitshift64Ashr=Module["_bitshift64Ashr"]=asm["_bitshift64Ashr"];var _crypto_generichash_init=Module["_crypto_generichash_init"]=asm["_crypto_generichash_init"];var _crypto_box_open_detached=Module["_crypto_box_open_detached"]=asm["_crypto_box_open_detached"];var _crypto_scalarmult_bytes=Module["_crypto_scalarmult_bytes"]=asm["_crypto_scalarmult_bytes"];var _crypto_auth_verify=Module["_crypto_auth_verify"]=asm["_crypto_auth_verify"];var _crypto_sign_detached=Module["_crypto_sign_detached"]=asm["_crypto_sign_detached"];var _crypto_secretbox_detached=Module["_crypto_secretbox_detached"]=asm["_crypto_secretbox_detached"];var _crypto_secretbox_easy=Module["_crypto_secretbox_easy"]=asm["_crypto_secretbox_easy"];var _memset=Module["_memset"]=asm["_memset"];var _crypto_box_open_detached_afternm=Module["_crypto_box_open_detached_afternm"]=asm["_crypto_box_open_detached_afternm"];var _crypto_box_sealbytes=Module["_crypto_box_sealbytes"]=asm["_crypto_box_sealbytes"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var _crypto_box_seedbytes=Module["_crypto_box_seedbytes"]=asm["_crypto_box_seedbytes"];var _crypto_hash=Module["_crypto_hash"]=asm["_crypto_hash"];var _crypto_box_easy_afternm=Module["_crypto_box_easy_afternm"]=asm["_crypto_box_easy_afternm"];var _crypto_box_macbytes=Module["_crypto_box_macbytes"]=asm["_crypto_box_macbytes"];var _crypto_box_publickeybytes=Module["_crypto_box_publickeybytes"]=asm["_crypto_box_publickeybytes"];var _crypto_generichash_primitive=Module["_crypto_generichash_primitive"]=asm["_crypto_generichash_primitive"];var _crypto_sign_secretkeybytes=Module["_crypto_sign_secretkeybytes"]=asm["_crypto_sign_secretkeybytes"];var ___muldsi3=Module["___muldsi3"]=asm["___muldsi3"];var _crypto_scalarmult_scalarbytes=Module["_crypto_scalarmult_scalarbytes"]=asm["_crypto_scalarmult_scalarbytes"];var _crypto_generichash_bytes_min=Module["_crypto_generichash_bytes_min"]=asm["_crypto_generichash_bytes_min"];var _malloc=Module["_malloc"]=asm["_malloc"];var _crypto_aead_chacha20poly1305_decrypt=Module["_crypto_aead_chacha20poly1305_decrypt"]=asm["_crypto_aead_chacha20poly1305_decrypt"];var _crypto_secretbox_open_easy=Module["_crypto_secretbox_open_easy"]=asm["_crypto_secretbox_open_easy"];var _crypto_aead_chacha20poly1305_ietf_decrypt_detached=Module["_crypto_aead_chacha20poly1305_ietf_decrypt_detached"]=asm["_crypto_aead_chacha20poly1305_ietf_decrypt_detached"];var _crypto_sign=Module["_crypto_sign"]=asm["_crypto_sign"];var _crypto_secretbox_noncebytes=Module["_crypto_secretbox_noncebytes"]=asm["_crypto_secretbox_noncebytes"];var _crypto_box_keypair=Module["_crypto_box_keypair"]=asm["_crypto_box_keypair"];var _crypto_generichash_keybytes=Module["_crypto_generichash_keybytes"]=asm["_crypto_generichash_keybytes"];var _sodium_hex2bin=Module["_sodium_hex2bin"]=asm["_sodium_hex2bin"];var _sodium_init=Module["_sodium_init"]=asm["_sodium_init"];var _crypto_secretbox_macbytes=Module["_crypto_secretbox_macbytes"]=asm["_crypto_secretbox_macbytes"];var _crypto_secretbox_keybytes=Module["_crypto_secretbox_keybytes"]=asm["_crypto_secretbox_keybytes"];var _randombytes=Module["_randombytes"]=asm["_randombytes"];var _crypto_hash_bytes=Module["_crypto_hash_bytes"]=asm["_crypto_hash_bytes"];var _crypto_generichash_bytes=Module["_crypto_generichash_bytes"]=asm["_crypto_generichash_bytes"];var _crypto_generichash_bytes_max=Module["_crypto_generichash_bytes_max"]=asm["_crypto_generichash_bytes_max"];var _crypto_secretbox_open_detached=Module["_crypto_secretbox_open_detached"]=asm["_crypto_secretbox_open_detached"];var ___muldi3=Module["___muldi3"]=asm["___muldi3"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var _crypto_sign_verify_detached=Module["_crypto_sign_verify_detached"]=asm["_crypto_sign_verify_detached"];var _crypto_box_open_easy=Module["_crypto_box_open_easy"]=asm["_crypto_box_open_easy"];var _crypto_sign_publickeybytes=Module["_crypto_sign_publickeybytes"]=asm["_crypto_sign_publickeybytes"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var _crypto_sign_bytes=Module["_crypto_sign_bytes"]=asm["_crypto_sign_bytes"];var _pthread_self=Module["_pthread_self"]=asm["_pthread_self"];var _crypto_generichash_update=Module["_crypto_generichash_update"]=asm["_crypto_generichash_update"];var _crypto_scalarmult=Module["_crypto_scalarmult"]=asm["_crypto_scalarmult"];var _crypto_aead_chacha20poly1305_ietf_abytes=Module["_crypto_aead_chacha20poly1305_ietf_abytes"]=asm["_crypto_aead_chacha20poly1305_ietf_abytes"];var _crypto_box_seal_open=Module["_crypto_box_seal_open"]=asm["_crypto_box_seal_open"];var _crypto_box_easy=Module["_crypto_box_easy"]=asm["_crypto_box_easy"];var _memmove=Module["_memmove"]=asm["_memmove"];var _crypto_generichash_final=Module["_crypto_generichash_final"]=asm["_crypto_generichash_final"];var _randombytes_uniform=Module["_randombytes_uniform"]=asm["_randombytes_uniform"];var _crypto_sign_seed_keypair=Module["_crypto_sign_seed_keypair"]=asm["_crypto_sign_seed_keypair"];var _crypto_aead_chacha20poly1305_ietf_npubbytes=Module["_crypto_aead_chacha20poly1305_ietf_npubbytes"]=asm["_crypto_aead_chacha20poly1305_ietf_npubbytes"];Runtime.stackAlloc=asm["stackAlloc"];Runtime.stackSave=asm["stackSave"];Runtime.stackRestore=asm["stackRestore"];Runtime.establishStackSpace=asm["establishStackSpace"];Runtime.setTempRet0=asm["setTempRet0"];Runtime.getTempRet0=asm["getTempRet0"];function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};Module["callMain"]=Module.callMain=function callMain(args){args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0)}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad()}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}finally{calledMain=true}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["exit"](status)}else if(ENVIRONMENT_IS_SHELL&&typeof quit==="function"){quit(status)}throw new ExitStatus(status)}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false}run()




    return Module;
});
(function (root, factory) {
        if (typeof process === "object" && typeof process.stdout === "undefined") {
                process.stderr = process.stdout = { write: function() { } };
        }
        if (typeof define === "function" && define.amd) {
                define(["exports", "libsodium"], factory);
        } else if (typeof exports !== "undefined") {
                factory(exports, require("libsodium"));
        } else {
                var cb = root.sodium && root.sodium.onload;
                factory((root.sodium = {}), root.libsodium);
                if (typeof cb === "function") {
                        cb(root.sodium);
                }
        }
}(this, function (exports, libsodium) {
        "use strict";
        Object.defineProperty(exports, '__esModule', { value: true });

        var output_format = "uint8array";

        libsodium._sodium_init();

        // List of functions and constants defined in the wrapped libsodium
        function symbols() {
                return Object.keys(exports).sort();
        }

        function increment(bytes) {
                if (! bytes instanceof Uint8Array) {
                        throw new TypeError("Only Uint8Array instances can be incremented");
                }
        var c = 1 << 8;
                for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            c >>= 8;
            c += bytes[i];
                        bytes[i] = c & 0xff;
                }
        }

        function add(a, b) {
                if (! a instanceof Uint8Array || ! b instanceof Uint8Array) {
                        throw new TypeError("Only Uint8Array instances can added");
                }
        var j = a.length, c = 0 | 0, i = 0 | 0;
        if (b.length != a.length) {
                        throw new TypeError("Arguments must have the same length");
        }
                for (i = 0; i < j; i++) {
            c >>= 8;
            c += (a[i] + b[j]);
                        a[i] = c & 0xff;
                }
        }

        function is_zero(bytes) {
                if (! bytes instanceof Uint8Array) {
                        throw new TypeError("Only Uint8Array instances can be checked");
                }
        var d = 0 | 0;
                for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            d |= bytes[i];
                }
        return d === 0;
        }

        function memzero(bytes) {
                if (! bytes instanceof Uint8Array) {
                        throw new TypeError("Only Uint8Array instances can be wiped");
                }
                for (var i = 0 | 0, j = bytes.length; i < j; i++) {
                        bytes[i] = 0;
                }
        }

        function memcmp(b1, b2) {
                if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
                        throw new TypeError("Only Uint8Array instances can be compared");
                }
                if (b1.length !== b2.length) {
                        throw new TypeError("Only instances of identical length can be compared");
                }
                for (var d = 0 | 0, i = 0 | 0, j = b1.length; i < j; i++) {
                        d |= b1[i] ^ b2[i];
                }
                return d === 0;
        }

        function compare(b1, b2) {
                if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
                        throw new TypeError("Only Uint8Array instances can be compared");
                }
                if (b1.length !== b2.length) {
                        throw new TypeError("Only instances of identical length can be compared");
                }
                for (var gt = 0 | 0, eq = 1 | 1, i = b1.length; i-- > 0;) {
                        gt |= ((b2[i] - b1[i]) >> 8) & eq;
                        eq &= ((b2[i] ^ b1[i]) - 1) >> 8;
                }
                return (gt + gt + eq) - 1;
        }

        //---------------------------------------------------------------------------
        // Codecs

        function from_string(str) {
                if (typeof TextEncoder === "function") {
                        return new TextEncoder("utf-8").encode(str);
                }
                str = unescape(encodeURIComponent(str));
                var bytes = new Uint8Array(str.length);
                for (var i = 0; i < str.length; i++) {
                        bytes[i] = str.charCodeAt(i);
                }
                return bytes;
        }

        function to_string(bytes) {
                if (typeof TextDecoder === "function") {
                        return new TextDecoder("utf-8", {fatal: true}).decode(bytes);
                }

                try {
                        return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
                }
                catch (_) {
                        throw new TypeError("The encoded data was not valid.");
                }
        }

        function from_hex(str) {
                if (!is_hex(str)) throw new TypeError("The provided string doesn't look like hex data");
                var result = new Uint8Array(str.length / 2);
                for (var i = 0; i < str.length; i += 2) {
                        result[i >>> 1] = parseInt(str.substr(i, 2), 16);
                }
                return result;
        }

        function to_hex(bytes) {
                var str = "", b, c, x;
                for (var i = 0; i < bytes.length; i++) {
                        c = bytes[i] & 0xf;
                        b = bytes[i] >>> 4;
                        x = (87 + c + (((c - 10) >> 8) & ~38)) << 8 |
                            (87 + b + (((b - 10) >> 8) & ~38));
                        str += String.fromCharCode(x & 0xff) + String.fromCharCode(x >>> 8);
                }
                return str;
        }

        function is_hex(str) {
                return (typeof str === "string" && /^[0-9a-f]+$/i.test(str) && str.length % 2 === 0);
        }

        function from_base64(sBase64, nBlocksSize) {
                function _b64ToUint6(nChr) {
                        return nChr > 64 && nChr < 91 ?
                                nChr - 65 : nChr > 96 && nChr < 123 ?
                                nChr - 71 : nChr > 47 && nChr < 58 ?
                                nChr + 4 : nChr === 43 ?
                                62 : nChr === 47 ?
                                63 :
                                0;
                }
                var
                        sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
                        nInLen = sB64Enc.length,
                        nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
                        taBytes = new Uint8Array(nOutLen);
                for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
                        nMod4 = nInIdx & 3;
                        nUint24 |= _b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
                        if (nMod4 === 3 || nInLen - nInIdx === 1) {
                                for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                                        taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
                                }
                                nUint24 = 0;
                        }
                }
                return taBytes;
        }

        function to_base64(aBytes, noNewLine) {
                function _uint6ToB64(nUint6) {
                        return nUint6 < 26 ?
                                nUint6 + 65 : nUint6 < 52 ?
                                nUint6 + 71 : nUint6 < 62 ?
                                nUint6 - 4 : nUint6 === 62 ?
                                43 : nUint6 === 63 ?
                                47 :
                                65;
                }
                if (typeof aBytes === "string") {
                        throw new Exception("input has to be an array");
                }
                var nMod3 = 2,
                        sB64Enc = "";
                for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
                        nMod3 = nIdx % 3;
                        if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0 && !noNewLine) {
                                sB64Enc += "\r\n";
                        }
                        nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
                        if (nMod3 === 2 || aBytes.length - nIdx === 1) {
                                sB64Enc += String.fromCharCode(_uint6ToB64(nUint24 >>> 18 & 63), _uint6ToB64(nUint24 >>> 12 & 63), _uint6ToB64(nUint24 >>> 6 & 63), _uint6ToB64(nUint24 & 63));
                                nUint24 = 0;
                        }
                }
                return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==");
        }

        function output_formats() {
                return ["uint8array", "text", "hex", "base64"];
        }

        function _format_output(output, optionalOutputFormat) {
                var selectedOutputFormat = optionalOutputFormat || output_format;
                if (!_is_output_format(selectedOutputFormat)) throw new Error(selectedOutputFormat + " output format is not available");
                if (output instanceof AllocatedBuf) {
                        if (selectedOutputFormat === "uint8array") return output.to_Uint8Array();
                        else if (selectedOutputFormat === "text") return libsodium.Pointer_stringify(output.address, output.length);
                        else if (selectedOutputFormat === "hex") return to_hex(output.to_Uint8Array());
                        else if (selectedOutputFormat === "base64") return to_base64(output.to_Uint8Array());
                        else throw new Error("What is output format \"" + selectedOutputFormat + "\"?");
                } else if (typeof output === "object") { //Composed output. Example : key pairs
                        var props = Object.keys(output);
                        var formattedOutput = {};
                        for (var i = 0; i < props.length; i++) {
                                formattedOutput[props[i]] = _format_output(output[props[i]], selectedOutputFormat);
                        }
                        return formattedOutput;
                } else if (typeof output === "string") {
                        return output;
                } else {
                        throw new TypeError("Cannot format output");
                }
        }

        function _is_output_format(format) {
                var formats = output_formats();
                for (var i = 0; i < formats.length; i++) {
                        if (formats[i] === format) return true;
                }
                return false;
        }

        function _check_output_format(format) {
                if (!format) {
                        return;
                } else if (typeof format !== "string") {
                        throw new TypeError("When defined, the output format must be a string");
                } else if (!_is_output_format(format)) {
                        throw new Error(format + " is not a supported output format");
                }
        }

        //---------------------------------------------------------------------------
        // Memory management

        // AllocatedBuf: address allocated using _malloc() + length
        function AllocatedBuf(length) {
                this.length = length;
                this.address = _malloc(length);
        }

        // Copy the content of a AllocatedBuf (_malloc()'d memory) into a Uint8Array
        AllocatedBuf.prototype.to_Uint8Array = function () {
                var result = new Uint8Array(this.length);
                result.set(libsodium.HEAPU8.subarray(this.address, this.address + this.length));
                return result;
        };

        // _malloc() a region and initialize it with the content of a Uint8Array
        function _to_allocated_buf_address(bytes) {
                var address = _malloc(bytes.length);
                libsodium.HEAPU8.set(bytes, address);
                return address;
        }

        function _malloc(length) {
                var result = libsodium._malloc(length);
                if (result === 0) {
                        throw {
                                message: "_malloc() failed",
                                length: length
                        };
                }
                return result;
        }

        function _free(address) {
                libsodium._free(address);
        }

        function _free_all(addresses) {
                for (var i = 0; i < addresses.length; i++) {
                        _free(addresses[i]);
                }
        }

        function _free_and_throw_error(address_pool, err) {
                _free_all(address_pool);
                throw new Error(err);
        }

        function _free_and_throw_type_error(address_pool, err) {
                _free_all(address_pool);
                throw new TypeError(err);
        }

        function _require_defined(address_pool, varValue, varName) {
                if (varValue == undefined) {
                        _free_and_throw_type_error(address_pool, varName + " cannot be null or undefined");
                }
        }

        function _any_to_Uint8Array(address_pool, varValue, varName) {
                _require_defined(address_pool, varValue, varName);
                if (varValue instanceof Uint8Array) {
                        return varValue;
                } else if (typeof varValue === "string") {
                        return from_string(varValue);
                }
                _free_and_throw_type_error(address_pool, "unsupported input type for " + varName);
        }

        
	function crypto_aead_chacha20poly1305_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output tag (buf)
		
		var tag_length = (libsodium._crypto_auth_bytes()) | 0,
		    tag = new AllocatedBuf(tag_length),
		    tag_address = tag.address;
		
		address_pool.push(tag_address);
		
		if ((libsodium._crypto_auth(tag_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(tag, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha256(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_auth_hmacsha256(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha256_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_hmacsha256_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_hmacsha512(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_auth_hmacsha512(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha512_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_hmacsha512_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_box_beforenm(publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output sharedKey (buf)
		
		var sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0,
		    sharedKey = new AllocatedBuf(sharedKey_length),
		    sharedKey_address = sharedKey.address;
		
		address_pool.push(sharedKey_address);
		
		if ((libsodium._crypto_box_beforenm(sharedKey_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(sharedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_detached(message, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_box_macbytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_box_detached(ciphertext_address, mac_address, message_address, message_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_easy(message, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_macbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_easy(ciphertext_address, message_address, message_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_easy_afternm(message, nonce, sharedKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: sharedKey (buf)
		
		sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
		var sharedKey_address, sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0;
		if (sharedKey.length !== sharedKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid sharedKey length");
		}
		sharedKey_address = _to_allocated_buf_address(sharedKey);
		address_pool.push(sharedKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_macbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_easy_afternm(ciphertext_address, message_address, message_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_keypair(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output secretKey (buf)
		
		var secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0,
		    secretKey = new AllocatedBuf(secretKey_length),
		    secretKey_address = secretKey.address;
		
		address_pool.push(secretKey_address);
		
		if ((libsodium._crypto_box_keypair(publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: secretKey, keyType: "curve25519"}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_detached(ciphertext, mac, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_detached(plaintext_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_easy(ciphertext, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_macbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_easy(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_easy_afternm(ciphertext, nonce, sharedKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: sharedKey (buf)
		
		sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
		var sharedKey_address, sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0;
		if (sharedKey.length !== sharedKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid sharedKey length");
		}
		sharedKey_address = _to_allocated_buf_address(sharedKey);
		address_pool.push(sharedKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_macbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_easy_afternm(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seal(message, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_sealbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_seal(ciphertext_address, message_address, message_length, 0, publicKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seal_open(ciphertext, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_sealbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_seal_open(plaintext_address, ciphertext_address, ciphertext_length, 0, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seed_keypair(seed, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: seed (buf)
		
		seed = _any_to_Uint8Array(address_pool, seed, "seed");
		var seed_address, seed_length = (libsodium._crypto_box_seedbytes()) | 0;
		if (seed.length !== seed_length) {
		        _free_and_throw_type_error(address_pool, "invalid seed length");
		}
		seed_address = _to_allocated_buf_address(seed);
		address_pool.push(seed_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_box_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash(hash_length, message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- output hash (buf)
		
		var hash_length = (hash_length) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_generichash(hash_address, hash_length, message_address, message_length, 0, key_address, key_length) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_final(state_address, hash_length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (generichash_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- output hash (buf)
		
		var hash_length = (hash_length) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_generichash_final(state_address, hash_address, hash_length) | 0) === 0) {
			var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_init(key, hash_length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- output state (generichash_state)
		
		var state_address = new AllocatedBuf(357).address;
		
		if ((libsodium._crypto_generichash_init(state_address, key_address, key_length, hash_length) | 0) === 0) {
			var ret = state_address;
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_update(state_address, message_chunk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (generichash_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: message_chunk (unsized_buf)
		
		message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
		var message_chunk_address = _to_allocated_buf_address(message_chunk),
		    message_chunk_length = message_chunk.length;
		address_pool.push(message_chunk_address);
		
		if ((libsodium._crypto_generichash_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash_sha256(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_sha256_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash_sha256(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash_sha512(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_sha512_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash_sha512(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_onetimeauth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_onetimeauth(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_final(state_address, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (onetimeauth_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_onetimeauth_final(state_address, hash_address) | 0) === 0) {
			var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_init(key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- output state (onetimeauth_state)
		
		var state_address = new AllocatedBuf(144).address;
		
		if ((libsodium._crypto_onetimeauth_init(state_address, key_address) | 0) === 0) {
			var ret = state_address;
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_update(state_address, message_chunk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (onetimeauth_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: message_chunk (unsized_buf)
		
		message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
		var message_chunk_address = _to_allocated_buf_address(message_chunk),
		    message_chunk_length = message_chunk.length;
		address_pool.push(message_chunk_address);
		
		if ((libsodium._crypto_onetimeauth_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_verify(hash, message, key) {
		var address_pool = [];

		// ---------- input: hash (buf)
		
		hash = _any_to_Uint8Array(address_pool, hash, "hash");
		var hash_address, hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0;
		if (hash.length !== hash_length) {
		        _free_and_throw_type_error(address_pool, "invalid hash length");
		}
		hash_address = _to_allocated_buf_address(hash);
		address_pool.push(hash_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_onetimeauth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_onetimeauth_verify(hash_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_pwhash(keyLength, password, salt, opsLimit, memLimit, algorithm, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address, salt_length = (libsodium._crypto_pwhash_saltbytes()) | 0;
		if (salt.length !== salt_length) {
		        _free_and_throw_type_error(address_pool, "invalid salt length");
		}
		salt_address = _to_allocated_buf_address(salt);
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- input: algorithm (uint)
		
		_require_defined(address_pool, algorithm, "algorithm");
		
		if (!(typeof algorithm === "number" && (algorithm | 0) === algorithm) && (algorithm | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "algorithm must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash(derivedKey_address, keyLength, 0, password_address, password_length, 0, salt_address, opsLimit, 0, memLimit, algorithm) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256(keyLength, password, salt, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address, salt_length = (libsodium._crypto_pwhash_scryptsalsa208sha256_saltbytes()) | 0;
		if (salt.length !== salt_length) {
		        _free_and_throw_type_error(address_pool, "invalid salt length");
		}
		salt_address = _to_allocated_buf_address(salt);
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256(derivedKey_address, keyLength, 0, password_address, password_length, 0, salt_address, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_ll(password, salt, opsLimit, r, p, keyLength, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (unsized_buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address = _to_allocated_buf_address(salt),
		    salt_length = salt.length;
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: r (uint)
		
		_require_defined(address_pool, r, "r");
		
		if (!(typeof r === "number" && (r | 0) === r) && (r | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "r must be an unsigned integer");
		}
		
		// ---------- input: p (uint)
		
		_require_defined(address_pool, p, "p");
		
		if (!(typeof p === "number" && (p | 0) === p) && (p | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "p must be an unsigned integer");
		}
		
		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256_ll(password_address, password_length, salt_address, salt_length, opsLimit, 0, r, p, derivedKey_address, keyLength) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_str(password, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output hashed_password (buf)
		
		var hashed_password_length = (libsodium._crypto_pwhash_scryptsalsa208sha256_strbytes()) | 0,
		    hashed_password = new AllocatedBuf(hashed_password_length),
		    hashed_password_address = hashed_password.address;
		
		address_pool.push(hashed_password_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256_str(hashed_password_address, password_address, password_length, 0, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = libsodium.Pointer_stringify(hashed_password_address);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password, password, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hashed_password (string)
		
		hashed_password = from_string(hashed_password + "\0");
		var hashed_password_address = _to_allocated_buf_address(hashed_password),
		    hashed_password_length = hashed_password.length - 1;
		address_pool.push(hashed_password_address);
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		var result = libsodium._crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password_address, password_address, password_length, 0) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_pwhash_str(password, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output hashed_password (buf)
		
		var hashed_password_length = (libsodium._crypto_pwhash_strbytes()) | 0,
		    hashed_password = new AllocatedBuf(hashed_password_length),
		    hashed_password_address = hashed_password.address;
		
		address_pool.push(hashed_password_address);
		
		if ((libsodium._crypto_pwhash_str(hashed_password_address, password_address, password_length, 0, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = libsodium.Pointer_stringify(hashed_password_address);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_str_verify(hashed_password, password, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hashed_password (string)
		
		hashed_password = from_string(hashed_password + "\0");
		var hashed_password_address = _to_allocated_buf_address(hashed_password),
		    hashed_password_length = hashed_password.length - 1;
		address_pool.push(hashed_password_address);
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		var result = libsodium._crypto_pwhash_str_verify(hashed_password_address, password_address, password_length, 0) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_scalarmult(privateKey, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output sharedSecret (buf)
		
		var sharedSecret_length = (libsodium._crypto_scalarmult_bytes()) | 0,
		    sharedSecret = new AllocatedBuf(sharedSecret_length),
		    sharedSecret_address = sharedSecret.address;
		
		address_pool.push(sharedSecret_address);
		
		if ((libsodium._crypto_scalarmult(sharedSecret_address, privateKey_address, publicKey_address) | 0) === 0) {
			var ret = _format_output(sharedSecret, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_scalarmult_base(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		if ((libsodium._crypto_scalarmult_base(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(publicKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_detached(message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output cipher (buf)
		
		var cipher_length = (message_length) | 0,
		    cipher = new AllocatedBuf(cipher_length),
		    cipher_address = cipher.address;
		
		address_pool.push(cipher_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_secretbox_macbytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_secretbox_detached(cipher_address, mac_address, message_address, message_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output({mac: mac, cipher: cipher}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_easy(message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output cipher (buf)
		
		var cipher_length = (message_length + libsodium._crypto_secretbox_macbytes()) | 0,
		    cipher = new AllocatedBuf(cipher_length),
		    cipher_address = cipher.address;
		
		address_pool.push(cipher_address);
		
		if ((libsodium._crypto_secretbox_easy(cipher_address, message_address, message_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(cipher, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_open_detached(ciphertext, mac, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_secretbox_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_secretbox_open_detached(message_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_open_easy(ciphertext, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_secretbox_macbytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_secretbox_open_easy(message_address, ciphertext_address, ciphertext_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_shorthash(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_shorthash_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_shorthash_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_shorthash(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign(message, privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output signature (buf)
		
		var signature_length = (message.length + libsodium._crypto_sign_bytes()) | 0,
		    signature = new AllocatedBuf(signature_length),
		    signature_address = signature.address;
		
		address_pool.push(signature_address);
		
		if ((libsodium._crypto_sign(signature_address, null, message_address, message_length, 0, privateKey_address) | 0) === 0) {
			var ret = _format_output(signature, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_detached(message, privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output signature (buf)
		
		var signature_length = (libsodium._crypto_sign_bytes()) | 0,
		    signature = new AllocatedBuf(signature_length),
		    signature_address = signature.address;
		
		address_pool.push(signature_address);
		
		if ((libsodium._crypto_sign_detached(signature_address, null, message_address, message_length, 0, privateKey_address) | 0) === 0) {
			var ret = _format_output(signature, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_pk_to_curve25519(edPk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: edPk (buf)
		
		edPk = _any_to_Uint8Array(address_pool, edPk, "edPk");
		var edPk_address, edPk_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (edPk.length !== edPk_length) {
		        _free_and_throw_type_error(address_pool, "invalid edPk length");
		}
		edPk_address = _to_allocated_buf_address(edPk);
		address_pool.push(edPk_address);
		
		// ---------- output cPk (buf)
		
		var cPk_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    cPk = new AllocatedBuf(cPk_length),
		    cPk_address = cPk.address;
		
		address_pool.push(cPk_address);
		
		if ((libsodium._crypto_sign_ed25519_pk_to_curve25519(cPk_address, edPk_address) | 0) === 0) {
			var ret = _format_output(cPk, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_curve25519(edSk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: edSk (buf)
		
		edSk = _any_to_Uint8Array(address_pool, edSk, "edSk");
		var edSk_address, edSk_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (edSk.length !== edSk_length) {
		        _free_and_throw_type_error(address_pool, "invalid edSk length");
		}
		edSk_address = _to_allocated_buf_address(edSk);
		address_pool.push(edSk_address);
		
		// ---------- output cSk (buf)
		
		var cSk_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    cSk = new AllocatedBuf(cSk_length),
		    cSk_address = cSk.address;
		
		address_pool.push(cSk_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_curve25519(cSk_address, edSk_address) | 0) === 0) {
			var ret = _format_output(cSk, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_pk(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_pk(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(publicKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_seed(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output seed (buf)
		
		var seed_length = (libsodium._crypto_sign_seedbytes()) | 0,
		    seed = new AllocatedBuf(seed_length),
		    seed_address = seed.address;
		
		address_pool.push(seed_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_seed(seed_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(seed, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_keypair(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_sign_keypair(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey, keyType: 'ed25519'}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_open(signedMessage, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: signedMessage (unsized_buf)
		
		signedMessage = _any_to_Uint8Array(address_pool, signedMessage, "signedMessage");
		var signedMessage_address = _to_allocated_buf_address(signedMessage),
		    signedMessage_length = signedMessage.length;
		address_pool.push(signedMessage_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output message (buf)
		
		var message_length = (signedMessage_length - libsodium._crypto_sign_bytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_sign_open(message_address, null, signedMessage_address, signedMessage_length, 0, publicKey_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_seed_keypair(seed, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: seed (buf)
		
		seed = _any_to_Uint8Array(address_pool, seed, "seed");
		var seed_address, seed_length = (libsodium._crypto_sign_seedbytes()) | 0;
		if (seed.length !== seed_length) {
		        _free_and_throw_type_error(address_pool, "invalid seed length");
		}
		seed_address = _to_allocated_buf_address(seed);
		address_pool.push(seed_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_sign_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey, keyType: "ed25519"}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_verify_detached(signature, message, publicKey) {
		var address_pool = [];

		// ---------- input: signature (buf)
		
		signature = _any_to_Uint8Array(address_pool, signature, "signature");
		var signature_address, signature_length = (libsodium._crypto_sign_bytes()) | 0;
		if (signature.length !== signature_length) {
		        _free_and_throw_type_error(address_pool, "invalid signature length");
		}
		signature_address = _to_allocated_buf_address(signature);
		address_pool.push(signature_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		var verificationResult = libsodium._crypto_sign_verify_detached(signature_address, message_address, message_length, 0, publicKey_address) | 0;
		var ret = (verificationResult === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function randombytes_buf(length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: length (uint)
		
		_require_defined(address_pool, length, "length");
		
		if (!(typeof length === "number" && (length | 0) === length) && (length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "length must be an unsigned integer");
		}
		
		// ---------- output output (buf)
		
		var output_length = (length) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._randombytes_buf(output_address, length);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function randombytes_close(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		libsodium._randombytes_close();
		
	}

	function randombytes_random(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		var random_value = libsodium._randombytes_random() >>> 0;
		var ret = (random_value);
		_free_all(address_pool);
		return ret;
		
	}

	function randombytes_set_implementation(implementation, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: implementation (randombytes_implementation)
		
		var implementation_address = libsodium._malloc(6 * 4);
		for (var i = 0; i < 6; i++) {
		        libsodium.setValue(implementation_address + i * 4,
		            libsodium.Runtime.addFunction(implementation
		            [["implementation_name", "random", "stir", "uniform", "buf", "close"][i]]),
		            "i32");
		}
		
		if ((libsodium._randombytes_set_implementation(implementation_address) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function randombytes_stir(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		libsodium._randombytes_stir();
		
	}

	function randombytes_uniform(upper_bound, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: upper_bound (uint)
		
		_require_defined(address_pool, upper_bound, "upper_bound");
		
		if (!(typeof upper_bound === "number" && (upper_bound | 0) === upper_bound) && (upper_bound | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "upper_bound must be an unsigned integer");
		}
		
		var random_value = libsodium._randombytes_uniform(upper_bound) >>> 0;
		var ret = (random_value);
		_free_all(address_pool);
		return ret;
		
	}

	function sodium_version_string() {
		var address_pool = [];

		var version = libsodium._sodium_version_string();
		var ret = (libsodium.Pointer_stringify(version));
		_free_all(address_pool);
		return ret;
		
	}


        exports.add = add;
        exports.compare = compare;
        exports.from_base64 = from_base64;
        exports.from_hex = from_hex;
        exports.from_string = from_string;
        exports.increment = increment;
        exports.is_zero = is_zero;
        exports.libsodium = libsodium;
        exports.memcmp = memcmp;
        exports.memzero = memzero;
        exports.output_formats = output_formats;
        exports.symbols = symbols;
        exports.to_base64 = to_base64;
        exports.to_hex = to_hex;
        exports.to_string = to_string;

        
	var exported_functions = ["crypto_aead_chacha20poly1305_decrypt", "crypto_aead_chacha20poly1305_decrypt_detached", "crypto_aead_chacha20poly1305_encrypt", "crypto_aead_chacha20poly1305_encrypt_detached", "crypto_aead_chacha20poly1305_ietf_decrypt", "crypto_aead_chacha20poly1305_ietf_decrypt_detached", "crypto_aead_chacha20poly1305_ietf_encrypt", "crypto_aead_chacha20poly1305_ietf_encrypt_detached", "crypto_auth", "crypto_auth_hmacsha256", "crypto_auth_hmacsha256_verify", "crypto_auth_hmacsha512", "crypto_auth_hmacsha512_verify", "crypto_auth_verify", "crypto_box_beforenm", "crypto_box_detached", "crypto_box_easy", "crypto_box_easy_afternm", "crypto_box_keypair", "crypto_box_open_detached", "crypto_box_open_easy", "crypto_box_open_easy_afternm", "crypto_box_seal", "crypto_box_seal_open", "crypto_box_seed_keypair", "crypto_generichash", "crypto_generichash_final", "crypto_generichash_init", "crypto_generichash_update", "crypto_hash", "crypto_hash_sha256", "crypto_hash_sha512", "crypto_onetimeauth", "crypto_onetimeauth_final", "crypto_onetimeauth_init", "crypto_onetimeauth_update", "crypto_onetimeauth_verify", "crypto_pwhash", "crypto_pwhash_scryptsalsa208sha256", "crypto_pwhash_scryptsalsa208sha256_ll", "crypto_pwhash_scryptsalsa208sha256_str", "crypto_pwhash_scryptsalsa208sha256_str_verify", "crypto_pwhash_str", "crypto_pwhash_str_verify", "crypto_scalarmult", "crypto_scalarmult_base", "crypto_secretbox_detached", "crypto_secretbox_easy", "crypto_secretbox_open_detached", "crypto_secretbox_open_easy", "crypto_shorthash", "crypto_sign", "crypto_sign_detached", "crypto_sign_ed25519_pk_to_curve25519", "crypto_sign_ed25519_sk_to_curve25519", "crypto_sign_ed25519_sk_to_pk", "crypto_sign_ed25519_sk_to_seed", "crypto_sign_keypair", "crypto_sign_open", "crypto_sign_seed_keypair", "crypto_sign_verify_detached", "randombytes_buf", "randombytes_close", "randombytes_random", "randombytes_set_implementation", "randombytes_stir", "randombytes_uniform", "sodium_version_string"],
	      functions = [crypto_aead_chacha20poly1305_decrypt, crypto_aead_chacha20poly1305_decrypt_detached, crypto_aead_chacha20poly1305_encrypt, crypto_aead_chacha20poly1305_encrypt_detached, crypto_aead_chacha20poly1305_ietf_decrypt, crypto_aead_chacha20poly1305_ietf_decrypt_detached, crypto_aead_chacha20poly1305_ietf_encrypt, crypto_aead_chacha20poly1305_ietf_encrypt_detached, crypto_auth, crypto_auth_hmacsha256, crypto_auth_hmacsha256_verify, crypto_auth_hmacsha512, crypto_auth_hmacsha512_verify, crypto_auth_verify, crypto_box_beforenm, crypto_box_detached, crypto_box_easy, crypto_box_easy_afternm, crypto_box_keypair, crypto_box_open_detached, crypto_box_open_easy, crypto_box_open_easy_afternm, crypto_box_seal, crypto_box_seal_open, crypto_box_seed_keypair, crypto_generichash, crypto_generichash_final, crypto_generichash_init, crypto_generichash_update, crypto_hash, crypto_hash_sha256, crypto_hash_sha512, crypto_onetimeauth, crypto_onetimeauth_final, crypto_onetimeauth_init, crypto_onetimeauth_update, crypto_onetimeauth_verify, crypto_pwhash, crypto_pwhash_scryptsalsa208sha256, crypto_pwhash_scryptsalsa208sha256_ll, crypto_pwhash_scryptsalsa208sha256_str, crypto_pwhash_scryptsalsa208sha256_str_verify, crypto_pwhash_str, crypto_pwhash_str_verify, crypto_scalarmult, crypto_scalarmult_base, crypto_secretbox_detached, crypto_secretbox_easy, crypto_secretbox_open_detached, crypto_secretbox_open_easy, crypto_shorthash, crypto_sign, crypto_sign_detached, crypto_sign_ed25519_pk_to_curve25519, crypto_sign_ed25519_sk_to_curve25519, crypto_sign_ed25519_sk_to_pk, crypto_sign_ed25519_sk_to_seed, crypto_sign_keypair, crypto_sign_open, crypto_sign_seed_keypair, crypto_sign_verify_detached, randombytes_buf, randombytes_close, randombytes_random, randombytes_set_implementation, randombytes_stir, randombytes_uniform, sodium_version_string];
	for (var i = 0; i < functions.length; i++) {
		if (typeof libsodium["_" + exported_functions[i]] === "function") {
			exports[exported_functions[i]] = functions[i];
		}
	}
	var constants = ["SODIUM_LIBRARY_VERSION_MAJOR", "SODIUM_LIBRARY_VERSION_MINOR", "crypto_aead_chacha20poly1305_ABYTES", "crypto_aead_chacha20poly1305_KEYBYTES", "crypto_aead_chacha20poly1305_NPUBBYTES", "crypto_aead_chacha20poly1305_NSECBYTES", "crypto_aead_chacha20poly1305_ietf_ABYTES", "crypto_aead_chacha20poly1305_ietf_KEYBYTES", "crypto_aead_chacha20poly1305_ietf_NPUBBYTES", "crypto_aead_chacha20poly1305_ietf_NSECBYTES", "crypto_auth_BYTES", "crypto_auth_KEYBYTES", "crypto_auth_hmacsha256_BYTES", "crypto_auth_hmacsha256_KEYBYTES", "crypto_auth_hmacsha512_BYTES", "crypto_auth_hmacsha512_KEYBYTES", "crypto_box_BEFORENMBYTES", "crypto_box_MACBYTES", "crypto_box_NONCEBYTES", "crypto_box_PUBLICKEYBYTES", "crypto_box_SEALBYTES", "crypto_box_SECRETKEYBYTES", "crypto_box_SEEDBYTES", "crypto_generichash_BYTES", "crypto_generichash_BYTES_MAX", "crypto_generichash_BYTES_MIN", "crypto_generichash_KEYBYTES", "crypto_generichash_KEYBYTES_MAX", "crypto_generichash_KEYBYTES_MIN", "crypto_hash_BYTES", "crypto_onetimeauth_BYTES", "crypto_onetimeauth_KEYBYTES", "crypto_pwhash_ALG_ARGON2I13", "crypto_pwhash_ALG_DEFAULT", "crypto_pwhash_MEMLIMIT_INTERACTIVE", "crypto_pwhash_MEMLIMIT_MODERATE", "crypto_pwhash_MEMLIMIT_SENSITIVE", "crypto_pwhash_OPSLIMIT_INTERACTIVE", "crypto_pwhash_OPSLIMIT_MODERATE", "crypto_pwhash_OPSLIMIT_SENSITIVE", "crypto_pwhash_SALTBYTES", "crypto_pwhash_STRBYTES", "crypto_pwhash_STR_VERIFY", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE", "crypto_pwhash_scryptsalsa208sha256_SALTBYTES", "crypto_pwhash_scryptsalsa208sha256_STRBYTES", "crypto_pwhash_scryptsalsa208sha256_STR_VERIFY", "crypto_scalarmult_BYTES", "crypto_scalarmult_SCALARBYTES", "crypto_secretbox_KEYBYTES", "crypto_secretbox_MACBYTES", "crypto_secretbox_NONCEBYTES", "crypto_shorthash_BYTES", "crypto_shorthash_KEYBYTES", "crypto_sign_BYTES", "crypto_sign_PUBLICKEYBYTES", "crypto_sign_SECRETKEYBYTES", "crypto_sign_SEEDBYTES"];
	for (var i = 0; i < constants.length; i++) {
		var raw = libsodium["_" + constants[i].toLowerCase()];
		if (typeof raw === "function") exports[constants[i]] = raw()|0;
	}
	var constants_str = ["SODIUM_VERSION_STRING", "crypto_pwhash_STRPREFIX", "crypto_pwhash_scryptsalsa208sha256_STRPREFIX"];
	for (var i = 0; i < constants_str.length; i++) {
		var raw = libsodium["_" + constants_str[i].toLowerCase()];
		if (typeof raw === "function") exports[constants_str[i]] = libsodium.Pointer_stringify(raw());
	}

        return exports;
}));
