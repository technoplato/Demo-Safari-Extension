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

export class RealGhost implements Ghost {

    public publicKey: PublicKey | null;

    constructor() {
        this.publicKey = Keypair.generate().publicKey;
    }

    async connect(options?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: PublicKey }> {
        // Simulate connection logic and return publicKey
        this.publicKey = new PublicKey('SomeValidPublicKeyString');
        return { publicKey: this.publicKey };
    }

    async disconnect(): Promise<void> {
        // Simulate disconnect logic
        this.publicKey = null;
    }

    async signAndSendTransaction<T extends Transaction | VersionedTransaction>(
        transaction: T,
        options?: SendOptions
    ): Promise<{ signature: TransactionSignature }> {
        // Simulate signing and sending transaction logic
        const signature: TransactionSignature = 'SomeTransactionSignature';
        return { signature };
    }

    async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
        // Simulate signing transaction logic
        return transaction;
    }

    async signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
        // Simulate signing multiple transactions
        return transactions;
    }

    async signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }> {
        // Simulate signing a message
        const signature = new Uint8Array([/* some byte values */]);
        return { signature };
    }

    async signIn(input?: SolanaSignInInput): Promise<SolanaSignInOutput> {
        throw new Error("not today buddy")
    }

    on(event: any, listener: any, context: any): void {
        
    }

    off(event: any, listener: any, context: any): void {
        
    }

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
        on: (event: any, listener: any, context: any) => {
            // if (!listeners[event]) {
            //     listeners[event] = [];
            // }
            // listeners[event].push(listener.bind(context));
        },

        off: (event: any, listener: any, context: any) => {
            // if (listeners[event]) {
            //     listeners[event] = listeners[event].filter((l) => l !== listener.bind(context));
            // }
        },
    };
}