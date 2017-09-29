    ENVIRONMENT_IS_NODE && !process.removeAllListeners("uncaughtException");
    return ModulePromise;
}

if (typeof define === 'function' && define.amd) {
  define(['exports'], expose_libsodium);
} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
  expose_libsodium(exports);
} else {
  root.libsodium = expose_libsodium(root.libsodium_mod || (root.commonJsStrict = {}));
}

})(this);
