import { type SolanaSignInInput, type SolanaSignInOutput } from '@solana/wallet-standard-features';
import { Keypair, PublicKey, SendOptions, Transaction, TransactionSignature, VersionedTransaction } from '@solana/web3.js';

export interface GhostEvent {
    connect(...args: unknown[]): unknown;
    disconnect(...args: unknown[]): unknown;
    accountChanged(...args: unknown[]): unknown;
}

export interface GhostEventEmitter {
    on<E extends keyof GhostEvent>(event: E, listener: GhostEvent[E], context?: any): void;
    off<E extends keyof GhostEvent>(event: E, listener: GhostEvent[E], context?: any): void;
}

export interface Ghost extends GhostEventEmitter {
    publicKey: PublicKey | null;
    connect(options?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: PublicKey }>;
    disconnect(): Promise<void>;
    signAndSendTransaction<T extends Transaction | VersionedTransaction>(
        transaction: T,
        options?: SendOptions
    ): Promise<{ signature: TransactionSignature }>;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
    signIn(input?: SolanaSignInInput): Promise<SolanaSignInOutput>;
}

export const makeGhost = (): Ghost => {

    const publicKey = Keypair.generate().publicKey

    let listeners: Record<string, Function[]> = {};

    return {
        publicKey: publicKey,
        connect: async (options) => {
            return { publicKey: publicKey };
        },
        disconnect: async () => {},
        signAndSendTransaction: async (transaction, options) => {
            return { signature: new Uint8Array() as unknown as TransactionSignature };
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
        on: <E extends keyof GhostEvent>(event: E, listener: GhostEvent[E], context?: any) => {
            // if (!listeners[event]) {
            //     listeners[event] = [];
            // }
            // listeners[event].push(listener.bind(context));
        },

        off<E extends keyof GhostEvent>(event: E, listener: GhostEvent[E], context?: any): void {
            // if (listeners[event]) {
            //     listeners[event] = listeners[event].filter((l) => l !== listener.bind(context));
            // }
        },
    };
}