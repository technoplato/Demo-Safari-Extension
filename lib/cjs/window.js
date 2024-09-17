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
exports.RealGhost = void 0;
const web3_js_1 = require("@solana/web3.js");
class RealGhost {
    constructor() {
        this.publicKey = null;
        this.setupMessageListener();
    }
    setupMessageListener() {
        window.addEventListener('message', (event) => {
            if (event.source !== window)
                return;
            if (event.data && event.data.source === 'my-content-script') {
                this.handleMessage(event.data.payload);
            }
        });
    }
    handleMessage(message) {
        if (message.action === 'connectionConfirmed') {
            console.log(`Received Connection Pubkey: ${message.data.publicKey}`);
            this.publicKey = new web3_js_1.PublicKey(message.data.publicKey);
        }
        // Handle other message types as needed
    }
    connect(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Send a message to the content script
            // window.postMessage(
            //     {
            //         source: 'my-injected-script',
            //         payload: {
            //             action: 'initiateConnection',
            //             data: {
            //                 message: Array.from("fdsa") // Convert Uint8Array to Array for serialization
            //             }
            //         }
            //     },
            //     '*'
            // );
            console.log("Connecting... new");
            // First GET request to initiate connection
            yield fetch('https://b097-2600-1700-75c1-130-d860-67d6-ca2a-8ecf.ngrok-free.app/api/start')
                .then(response => response.json())
                .then(data => {
                console.log("Connection initiated:", data);
            })
                .catch(error => {
                console.error("Error initiating connection:", error);
            });
            // Poll for this.publicKey every second
            while (!this.publicKey) {
                yield fetch('https://b097-2600-1700-75c1-130-d860-67d6-ca2a-8ecf.ngrok-free.app/api/connected')
                    .then(response => response.json())
                    .then(data => {
                    if (data.publicKey) {
                        this.publicKey = new web3_js_1.PublicKey(data.publicKey);
                    }
                    else {
                        console.log("Waiting for publicKey...");
                    }
                })
                    .catch(error => {
                    console.error("Error checking connection status:", error);
                });
                yield new Promise(resolve => setTimeout(resolve, 1000));
            }
            console.log("Connected with publicKey:", (_a = this.publicKey) === null || _a === void 0 ? void 0 : _a.toBase58());
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
//# sourceMappingURL=window.js.map