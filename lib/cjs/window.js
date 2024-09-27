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
const buffer_1 = require("buffer");
class RealGhost {
    constructor() {
        this.publicKey = null;
        this.transactionId = null;
        this.transactionBytes = null;
        this.setupMessageListener();
    }
    setupMessageListener() {
        window.addEventListener('message', (event) => {
            if (event.source !== window)
                return;
            if (event.data && event.data.source === 'my-content-script') {
                console.log(event.data);
                this.handleMessage(event.data.payload);
            }
        });
    }
    handleMessage(message) {
        if (message.action === 'connectionConfirmed') {
            console.log(`Received Connection: ${message.data}`);
            console.log(message.data);
            const methodResponse = message.data;
            const method = methodResponse.method;
            const methodResponseData = methodResponse.data;
            if (method == 0) {
                const pubkeyString = methodResponseData.publicKey;
                this.publicKey = new web3_js_1.PublicKey(pubkeyString);
            }
            else if (method == 1) {
                const transactionId = methodResponseData.transactionId;
                this.transactionId = transactionId;
            }
            else if (method == 2) {
                const transactionBytes = methodResponseData.transactionBytes;
                this.transactionBytes = transactionBytes;
            }
            // this.publicKey = new PublicKey(message.data.publicKey);
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
            // await fetch('https://b097-2600-1700-75c1-130-d860-67d6-ca2a-8ecf.ngrok-free.app/api/start')
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log("Connection initiated:", data);
            //     })
            //     .catch(error => {
            //         console.error("Error initiating connection:", error);
            //     });
            // Poll for this.publicKey every second
            window.postMessage({
                source: 'wallet-adapter-event',
                payload: {
                    action: 'connect',
                    data: {}
                }
            }, '*');
            while (!this.publicKey) {
                // await fetch('https://b097-2600-1700-75c1-130-d860-67d6-ca2a-8ecf.ngrok-free.app/api/connected')
                //     .then(response => response.json())
                //     .then(data => {
                //         if (data.publicKey) {
                //             this.publicKey = new PublicKey(data.publicKey);
                //         } else {
                //             console.log("Waiting for publicKey...");
                //         }
                //     })
                //     .catch(error => {
                //         console.error("Error checking connection status:", error);
                //     });
                yield new Promise(resolve => setTimeout(resolve, 1000));
            }
            console.log("Connected with publicKey:", (_a = this.publicKey) === null || _a === void 0 ? void 0 : _a.toBase58());
            // window.postMessage(
            //     {
            //       source: 'injected-code',
            //       payload: {
            //         action: 'sayHello',
            //         data: {
            //           someKey: "SOME-VALUE"
            //         }
            //       }
            //     },
            //     '*'  // '*' allows any origin to send the message
            //   );
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
            console.log("SING AND SEND HERE");
            const base64Transaction = buffer_1.Buffer.from(transaction.serialize()).toString('base64');
            window.postMessage({
                source: 'wallet-adapter-event',
                payload: {
                    action: 'signAndSendTransaction',
                    data: {
                        transaction: base64Transaction
                    }
                }
            }, '*');
            while (!this.transactionId) {
                yield new Promise(resolve => setTimeout(resolve, 1000));
            }
            // Simulate signing and sending transaction logic
            const signature = this.transactionId;
            return { signature };
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate signing transaction logic
            console.log("Sign Single Transactions Requested");
            const base64Transaction = buffer_1.Buffer.from(transaction.serialize()).toString('base64');
            console.log("UNSIGNED");
            console.log(base64Transaction);
            window.postMessage({
                source: 'wallet-adapter-event',
                payload: {
                    action: 'signTransaction',
                    data: {
                        transaction: base64Transaction
                    }
                }
            }, '*');
            while (!this.transactionBytes) {
                yield new Promise(resolve => setTimeout(resolve, 1000));
            }
            console.log("SIGNED");
            console.log(this.transactionBytes);
            const transactionBuffer = buffer_1.Buffer.from(this.transactionBytes, 'base64');
            const signedLegacyTransaction = web3_js_1.Transaction.from(transactionBuffer);
            const legacyTransactionMessage = signedLegacyTransaction.compileMessage();
            const versionedTransaction = new web3_js_1.VersionedTransaction(legacyTransactionMessage);
            let signedTransaction;
            if (transaction instanceof web3_js_1.VersionedTransaction) {
                signedTransaction = versionedTransaction;
                return signedTransaction;
            }
            else if (transaction instanceof web3_js_1.Transaction) {
                signedTransaction = signedLegacyTransaction;
                return signedTransaction;
            }
            throw new Error("HELP ME GOD");
        });
    }
    signAllTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Sign All Transactions Requested");
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