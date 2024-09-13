import { Keypair, PublicKey } from '@solana/web3.js';
export class RealGhost {
    constructor() {
        this.publicKey = Keypair.generate().publicKey;
    }
    async connect(options) {
        // Simulate connection logic and return publicKey
        this.publicKey = new PublicKey('SomeValidPublicKeyString');
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
        // Simulate signing a message
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
export const makeGhost = () => {
    const publicKey = Keypair.generate().publicKey;
    let listeners = {};
    return {
        publicKey: publicKey,
        connect: async (options) => {
            return { publicKey: publicKey };
        },
        disconnect: async () => { },
        signAndSendTransaction: async (transaction, options) => {
            return { signature: new Uint8Array() };
        },
        signTransaction: async (transaction) => {
            return transaction;
        },
        signAllTransactions: async (transactions) => {
            return transactions;
        },
        signMessage: async (message) => {
            return { signature: new Uint8Array() };
        },
        signIn: async (input) => {
            throw new Error("signIn method is not implemented");
        },
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
//# sourceMappingURL=window.js.map