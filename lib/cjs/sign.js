"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransaction = void 0;
const web3_js_1 = require("@solana/web3.js");
const signTransaction = (transactionString, keypairString) => {
    const keypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(keypairString)));
    const transactionBuffer = Buffer.from(transactionString, 'base64');
    const transaction = web3_js_1.Transaction.from(transactionBuffer);
    transaction.partialSign(keypair);
    const signedTransactionBuffer = transaction.serialize();
    const base64Transaction = Buffer.from(signedTransactionBuffer).toString('base64');
    return base64Transaction;
};
exports.signTransaction = signTransaction;
//# sourceMappingURL=sign.js.map