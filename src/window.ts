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
    public transactionId: string | null;

    constructor() {
        this.publicKey = null;
        this.transactionId = null;
        this.setupMessageListener();
    }

    private setupMessageListener() {
        window.addEventListener('message', (event) => {
            if (event.source !== window) return;
            if (event.data && event.data.source === 'my-content-script') {
                console.log(event.data)
                this.handleMessage(event.data.payload);
            }
        });
    }

    private handleMessage(message: any) {
        if (message.action === 'connectionConfirmed') {
            console.log(`Received Connection: ${message.data}`)
            console.log(message.data)
            const methodResponse = message.data;
            const method = methodResponse.method;
            const methodResponseData = methodResponse.data;
            if ( method == 0 ) {
                const pubkeyString = methodResponseData.publicKey;
                this.publicKey = new PublicKey(pubkeyString);
            } else if ( method == 1 ) {
                const transactionId = methodResponseData.transactionId;
                this.transactionId = transactionId
            }
            // this.publicKey = new PublicKey(message.data.publicKey);
        }
        // Handle other message types as needed
    }

    async connect(options?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: PublicKey }> {

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

        window.postMessage(
            {
              source: 'wallet-adapter-event',
              payload: {
                action: 'connect',
                data: {}
              }
            },
            '*'
          );

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

        return { publicKey: this.publicKey! };
        
    }

    async disconnect(): Promise<void> {
        // Simulate disconnect logic
        this.publicKey = null;
    }

    async signAndSendTransaction<T extends Transaction | VersionedTransaction>(
        transaction: T,
        options?: SendOptions
    ): Promise<{ signature: TransactionSignature }> {

        const base64Transaction = Buffer.from(transaction.serialize()).toString('base64');

        window.postMessage(
            {
              source: 'wallet-adapter-event',
              payload: {
                action: 'signAndSendTransaction',
                data: {
                    transaction: base64Transaction
                }
              }
            },
            '*'
        );

        while (!this.transactionId) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

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