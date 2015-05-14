(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        factory(root.libsodium = {});
    }
})(this, function (exports) {
    "use strict";
    var Module = exports;
    Object.defineProperty(exports, '__esModule', { value: true });
