(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var _exports = {};
        factory(_exports);
        root.libsodium = _exports;
    }
})(this, function (exports) {
    "use strict";
    var Module = exports;
    Object.defineProperty(exports, '__esModule', { value: true });

