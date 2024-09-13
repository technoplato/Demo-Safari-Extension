"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGhost = exports.RealGhost = void 0;
const web3_js_1 = require("@solana/web3.js");
class RealGhost {
    constructor() {
        this.publicKey = web3_js_1.Keypair.generate().publicKey;
    }
    connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate connection logic and return publicKey
            this.publicKey = new web3_js_1.PublicKey('SomeValidPublicKeyString');
            return { publicKey: this.publicKey };
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate disconnect logic
            this.publicKey = null;
        });
    }
    signAndSendTransaction(transaction, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate signing and sending transaction logic
            const signature = 'SomeTransactionSignature';
            return { signature };
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate signing transaction logic
            return transaction;
        });
    }
    signAllTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate signing multiple transactions
            return transactions;
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate signing a message
            const signature = new Uint8Array([ /* some byte values */]);
            return { signature };
        });
    }
    signIn(input) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("not today buddy");
        });
    }
    on(event, listener, context) {
    }
    off(event, listener, context) {
    }
}
exports.RealGhost = RealGhost;
const makeGhost = () => {
    const publicKey = web3_js_1.Keypair.generate().publicKey;
    let listeners = {};
    return {
        publicKey: publicKey,
        connect: (options) => __awaiter(void 0, void 0, void 0, function* () {
            return { publicKey: publicKey };
        }),
        disconnect: () => __awaiter(void 0, void 0, void 0, function* () { }),
        signAndSendTransaction: (transaction, options) => __awaiter(void 0, void 0, void 0, function* () {
            return { signature: new Uint8Array() };
        }),
        signTransaction: (transaction) => __awaiter(void 0, void 0, void 0, function* () {
            return transaction;
        }),
        signAllTransactions: (transactions) => __awaiter(void 0, void 0, void 0, function* () {
            return transactions;
        }),
        signMessage: (message) => __awaiter(void 0, void 0, void 0, function* () {
            return { signature: new Uint8Array() };
        }),
        signIn: (input) => __awaiter(void 0, void 0, void 0, function* () {
            throw new Error("signIn method is not implemented");
        }),
        on: (event, listener, context) => {
            // if (!listeners[event]) {
            //     listeners[event] = [];
            // }
            // listeners[event].push(listener.bind(context));
        },
        off: (event, listener, context) => {
            // if (listeners[event]) {
            //     listeners[event] = listeners[event].filter((l) => l !== listener.bind(context));
            // }
        },
    };
};
exports.makeGhost = makeGhost;
//# sourceMappingURL=window.js.map