(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var exports = {};
        factory(exports);
        root.libsodium = exports;
    }
})(this, function (exports) {
    "use strict";
    var Module = exports;
    Object.defineProperty(exports, '__esModule', { value: true });

