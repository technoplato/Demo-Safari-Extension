import { Keypair } from '@solana/web3.js';
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
        off(event, listener, context) {
            // if (listeners[event]) {
            //     listeners[event] = listeners[event].filter((l) => l !== listener.bind(context));
            // }
        },
    };
};
//# sourceMappingURL=window.js.map