"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const register_js_1 = require("./register.js");
const wallet_js_1 = require("./wallet.js");
function initialize(ghost) {
    (0, register_js_1.registerWallet)(new wallet_js_1.GhostWallet(ghost));
}
exports.initialize = initialize;
//# sourceMappingURL=initialize.js.map