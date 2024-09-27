import { PublicKey, Transaction } from '@solana/web3.js';
import { Buffer } from "buffer";
export class RealGhost {
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
                this.publicKey = new PublicKey(pubkeyString);
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
    async connect(options) {
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
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        console.log("Connected with publicKey:", this.publicKey?.toBase58());
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
    }
    async disconnect() {
        // Simulate disconnect logic
        this.publicKey = null;
    }
    async signAndSendTransaction(transaction, options) {
        console.log("SING AND SEND HERE");
        const base64Transaction = Buffer.from(transaction.serialize()).toString('base64');
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
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        // Simulate signing and sending transaction logic
        const signature = this.transactionId;
        return { signature };
    }
    async signTransaction(transaction) {
        // Simulate signing transaction logic
        console.log("Sign Single Transactions Requested");
        const base64Transaction = Buffer.from(transaction.serialize()).toString('base64');
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
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        console.log("SIGNED");
        console.log(this.transactionBytes);
        const transactionBuffer = Buffer.from(this.transactionBytes, 'base64');
        const signedLegacyTransaction = Transaction.from(transactionBuffer);
        // const legacyTransactionMessage = signedLegacyTransaction.compileMessage();
        // const versionedTransaction = new VersionedTransaction(legacyTransactionMessage);
        let signedTransaction = signedLegacyTransaction;
        return signedTransaction;
        // if (transaction instanceof VersionedTransaction) {
        //     signedTransaction = versionedTransaction as T
        //     return signedTransaction;
        // } else if (transaction instanceof Transaction) {
        //     signedTransaction = signedLegacyTransaction as T
        //     return signedTransaction;
        // }
        throw new Error("HELP ME GOD");
    }
    async signAllTransactions(transactions) {
        console.log("Sign All Transactions Requested");
        // Simulate signing multiple transactions
        return transactions;
    }
    async signMessage(message) {
        const signature = new Uint8Array([ /* some byte values */]);
        return { signature };
    }
    async signIn(input) {
        throw new Error("not today buddy");
    }
    on(event, listener, context) {
    }
    off(event, listener, context) {
    }
}
//# sourceMappingURL=window.js.map