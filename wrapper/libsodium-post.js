    if (typeof(process) === 'object' && typeof(process.removeAllListeners) === 'function') {
      process.removeAllListeners('uncaughtException');
      process.removeAllListeners('unhandledRejection');
    }
    return Module;
}

if (typeof define === 'function' && define.amd) {
    define(['exports'], expose_libsodium);
} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    expose_libsodium(exports);
} else {
    root.libsodium = expose_libsodium(root.libsodium_mod || (root.commonJsStrict = {}));
}

})(this);
