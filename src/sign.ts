import { Keypair, Transaction } from '@solana/web3.js'

export const signTransaction = ( transactionString: string, keypairString: string ): string => {

    const keypair = Keypair.fromSecretKey( Uint8Array.from( JSON.parse(keypairString) ) ) 
    const transactionBuffer = Buffer.from(transactionString, 'base64');
    const transaction = Transaction.from(transactionBuffer);
    transaction.partialSign(keypair);
    const signedTransactionBuffer = transaction.serialize()
    const base64Transaction = Buffer.from(signedTransactionBuffer).toString('base64');
    return base64Transaction

}