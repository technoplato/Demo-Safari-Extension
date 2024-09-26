import { PublicKey } from '@solana/web3.js';
export class RealGhost {
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
            this.publicKey = new PublicKey(message.data.publicKey);
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
                action: 'connectionConfirmed',
                data: {
                    publicKey: "9fXVcjT6eKTVLN7e3Yi3VvzznGCg9fwNXgHRKMkEZZze"
                }
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
        // Simulate signing and sending transaction logic
        const signature = 'SomeTransactionSignature';
        return { signature };
    }
    async signTransaction(transaction) {
        // Simulate signing transaction logic
        return transaction;
    }
    async signAllTransactions(transactions) {
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