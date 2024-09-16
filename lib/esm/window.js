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
        window.postMessage({
            source: 'my-injected-script',
            payload: {
                action: 'initiateConnection',
                data: {
                    message: Array.from("fdsa") // Convert Uint8Array to Array for serialization
                }
            }
        }, '*');
        console.log("Connecting...");
        // Poll for this.publicKey every second
        while (!this.publicKey) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Waiting for publicKey...");
        }
        console.log("Connected with publicKey:", this.publicKey?.toBase58());
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