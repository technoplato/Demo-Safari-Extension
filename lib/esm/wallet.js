var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _GhostWallet_instances, _GhostWallet_listeners, _GhostWallet_version, _GhostWallet_name, _GhostWallet_icon, _GhostWallet_account, _GhostWallet_ghost, _GhostWallet_on, _GhostWallet_emit, _GhostWallet_off, _GhostWallet_connected, _GhostWallet_disconnected, _GhostWallet_reconnected, _GhostWallet_connect, _GhostWallet_disconnect, _GhostWallet_signAndSendTransaction, _GhostWallet_signTransaction, _GhostWallet_signMessage, _GhostWallet_signIn;
import { SolanaSignAndSendTransaction, SolanaSignIn, SolanaSignMessage, SolanaSignTransaction, } from '@solana/wallet-standard-features';
import { VersionedTransaction } from '@solana/web3.js';
import { StandardConnect, StandardDisconnect, StandardEvents, } from '@wallet-standard/features';
import bs58 from 'bs58';
import { GhostWalletAccount } from './account.js';
import { icon } from './icon.js';
import { isSolanaChain, isVersionedTransaction, SOLANA_CHAINS } from './solana.js';
import { bytesEqual } from './util.js';
export const GhostNamespace = 'ghost:';
export class GhostWallet {
    get version() {
        return __classPrivateFieldGet(this, _GhostWallet_version, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _GhostWallet_name, "f");
    }
    get icon() {
        return __classPrivateFieldGet(this, _GhostWallet_icon, "f");
    }
    get chains() {
        return SOLANA_CHAINS.slice();
    }
    get features() {
        return {
            [StandardConnect]: {
                version: '1.0.0',
                connect: __classPrivateFieldGet(this, _GhostWallet_connect, "f"),
            },
            [StandardDisconnect]: {
                version: '1.0.0',
                disconnect: __classPrivateFieldGet(this, _GhostWallet_disconnect, "f"),
            },
            [StandardEvents]: {
                version: '1.0.0',
                on: __classPrivateFieldGet(this, _GhostWallet_on, "f"),
            },
            [SolanaSignAndSendTransaction]: {
                version: '1.0.0',
                supportedTransactionVersions: ['legacy', 0],
                signAndSendTransaction: __classPrivateFieldGet(this, _GhostWallet_signAndSendTransaction, "f"),
            },
            [SolanaSignTransaction]: {
                version: '1.0.0',
                supportedTransactionVersions: ['legacy', 0],
                signTransaction: __classPrivateFieldGet(this, _GhostWallet_signTransaction, "f"),
            },
            [SolanaSignMessage]: {
                version: '1.0.0',
                signMessage: __classPrivateFieldGet(this, _GhostWallet_signMessage, "f"),
            },
            [SolanaSignIn]: {
                version: '1.0.0',
                signIn: __classPrivateFieldGet(this, _GhostWallet_signIn, "f"),
            },
            [GhostNamespace]: {
                ghost: __classPrivateFieldGet(this, _GhostWallet_ghost, "f"),
            },
        };
    }
    get accounts() {
        return __classPrivateFieldGet(this, _GhostWallet_account, "f") ? [__classPrivateFieldGet(this, _GhostWallet_account, "f")] : [];
    }
    constructor(ghost) {
        _GhostWallet_instances.add(this);
        _GhostWallet_listeners.set(this, {});
        _GhostWallet_version.set(this, '1.0.0');
        _GhostWallet_name.set(this, 'Ghost');
        _GhostWallet_icon.set(this, icon);
        _GhostWallet_account.set(this, null);
        _GhostWallet_ghost.set(this, void 0);
        _GhostWallet_on.set(this, (event, listener) => {
            __classPrivateFieldGet(this, _GhostWallet_listeners, "f")[event]?.push(listener) || (__classPrivateFieldGet(this, _GhostWallet_listeners, "f")[event] = [listener]);
            return () => __classPrivateFieldGet(this, _GhostWallet_instances, "m", _GhostWallet_off).call(this, event, listener);
        });
        _GhostWallet_connected.set(this, () => {
            const address = __classPrivateFieldGet(this, _GhostWallet_ghost, "f").publicKey?.toBase58();
            if (address) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const publicKey = __classPrivateFieldGet(this, _GhostWallet_ghost, "f").publicKey.toBytes();
                const account = __classPrivateFieldGet(this, _GhostWallet_account, "f");
                if (!account || account.address !== address || !bytesEqual(account.publicKey, publicKey)) {
                    __classPrivateFieldSet(this, _GhostWallet_account, new GhostWalletAccount({ address, publicKey }), "f");
                    __classPrivateFieldGet(this, _GhostWallet_instances, "m", _GhostWallet_emit).call(this, 'change', { accounts: this.accounts });
                }
            }
        });
        _GhostWallet_disconnected.set(this, () => {
            if (__classPrivateFieldGet(this, _GhostWallet_account, "f")) {
                __classPrivateFieldSet(this, _GhostWallet_account, null, "f");
                __classPrivateFieldGet(this, _GhostWallet_instances, "m", _GhostWallet_emit).call(this, 'change', { accounts: this.accounts });
            }
        });
        _GhostWallet_reconnected.set(this, () => {
            if (__classPrivateFieldGet(this, _GhostWallet_ghost, "f").publicKey) {
                __classPrivateFieldGet(this, _GhostWallet_connected, "f").call(this);
            }
            else {
                __classPrivateFieldGet(this, _GhostWallet_disconnected, "f").call(this);
            }
        });
        _GhostWallet_connect.set(this, async ({ silent } = {}) => {
            if (!__classPrivateFieldGet(this, _GhostWallet_account, "f")) {
                await __classPrivateFieldGet(this, _GhostWallet_ghost, "f").connect(silent ? { onlyIfTrusted: true } : undefined);
            }
            __classPrivateFieldGet(this, _GhostWallet_connected, "f").call(this);
            return { accounts: this.accounts };
        });
        _GhostWallet_disconnect.set(this, async () => {
            await __classPrivateFieldGet(this, _GhostWallet_ghost, "f").disconnect();
        });
        _GhostWallet_signAndSendTransaction.set(this, async (...inputs) => {
            if (!__classPrivateFieldGet(this, _GhostWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { transaction, account, chain, options } = inputs[0];
                const { minContextSlot, preflightCommitment, skipPreflight, maxRetries } = options || {};
                if (account !== __classPrivateFieldGet(this, _GhostWallet_account, "f"))
                    throw new Error('invalid account');
                if (!isSolanaChain(chain))
                    throw new Error('invalid chain');
                const { signature } = await __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signAndSendTransaction(VersionedTransaction.deserialize(transaction), {
                    preflightCommitment,
                    minContextSlot,
                    maxRetries,
                    skipPreflight,
                });
                outputs.push({ signature: bs58.decode(signature) });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(await __classPrivateFieldGet(this, _GhostWallet_signAndSendTransaction, "f").call(this, input)));
                }
            }
            return outputs;
        });
        _GhostWallet_signTransaction.set(this, async (...inputs) => {
            if (!__classPrivateFieldGet(this, _GhostWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { transaction, account, chain } = inputs[0];
                if (account !== __classPrivateFieldGet(this, _GhostWallet_account, "f"))
                    throw new Error('invalid account');
                if (chain && !isSolanaChain(chain))
                    throw new Error('invalid chain');
                const signedTransaction = await __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signTransaction(VersionedTransaction.deserialize(transaction));
                const serializedTransaction = isVersionedTransaction(signedTransaction)
                    ? signedTransaction.serialize()
                    : new Uint8Array(signedTransaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: false,
                    }));
                outputs.push({ signedTransaction: serializedTransaction });
            }
            else if (inputs.length > 1) {
                let chain = undefined;
                for (const input of inputs) {
                    if (input.account !== __classPrivateFieldGet(this, _GhostWallet_account, "f"))
                        throw new Error('invalid account');
                    if (input.chain) {
                        if (!isSolanaChain(input.chain))
                            throw new Error('invalid chain');
                        if (chain) {
                            if (input.chain !== chain)
                                throw new Error('conflicting chain');
                        }
                        else {
                            chain = input.chain;
                        }
                    }
                }
                const transactions = inputs.map(({ transaction }) => VersionedTransaction.deserialize(transaction));
                const signedTransactions = await __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signAllTransactions(transactions);
                outputs.push(...signedTransactions.map((signedTransaction) => {
                    const serializedTransaction = isVersionedTransaction(signedTransaction)
                        ? signedTransaction.serialize()
                        : new Uint8Array(signedTransaction.serialize({
                            requireAllSignatures: false,
                            verifySignatures: false,
                        }));
                    return { signedTransaction: serializedTransaction };
                }));
            }
            return outputs;
        });
        _GhostWallet_signMessage.set(this, async (...inputs) => {
            if (!__classPrivateFieldGet(this, _GhostWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { message, account } = inputs[0];
                if (account !== __classPrivateFieldGet(this, _GhostWallet_account, "f"))
                    throw new Error('invalid account');
                const { signature } = await __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signMessage(message);
                outputs.push({ signedMessage: message, signature });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(await __classPrivateFieldGet(this, _GhostWallet_signMessage, "f").call(this, input)));
                }
            }
            return outputs;
        });
        _GhostWallet_signIn.set(this, async (...inputs) => {
            const outputs = [];
            if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(await __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signIn(input));
                }
            }
            else {
                return [await __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signIn(inputs[0])];
            }
            return outputs;
        });
        if (new.target === GhostWallet) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _GhostWallet_ghost, ghost, "f");
        // ghost.on('connect', this.#connected, this);
        // ghost.on('disconnect', this.#disconnected, this);
        // ghost.on('accountChanged', this.#reconnected, this);
        __classPrivateFieldGet(this, _GhostWallet_connected, "f").call(this);
    }
}
_GhostWallet_listeners = new WeakMap(), _GhostWallet_version = new WeakMap(), _GhostWallet_name = new WeakMap(), _GhostWallet_icon = new WeakMap(), _GhostWallet_account = new WeakMap(), _GhostWallet_ghost = new WeakMap(), _GhostWallet_on = new WeakMap(), _GhostWallet_connected = new WeakMap(), _GhostWallet_disconnected = new WeakMap(), _GhostWallet_reconnected = new WeakMap(), _GhostWallet_connect = new WeakMap(), _GhostWallet_disconnect = new WeakMap(), _GhostWallet_signAndSendTransaction = new WeakMap(), _GhostWallet_signTransaction = new WeakMap(), _GhostWallet_signMessage = new WeakMap(), _GhostWallet_signIn = new WeakMap(), _GhostWallet_instances = new WeakSet(), _GhostWallet_emit = function _GhostWallet_emit(event, ...args) {
    // eslint-disable-next-line prefer-spread
    __classPrivateFieldGet(this, _GhostWallet_listeners, "f")[event]?.forEach((listener) => listener.apply(null, args));
}, _GhostWallet_off = function _GhostWallet_off(event, listener) {
    __classPrivateFieldGet(this, _GhostWallet_listeners, "f")[event] = __classPrivateFieldGet(this, _GhostWallet_listeners, "f")[event]?.filter((existingListener) => listener !== existingListener);
};
//# sourceMappingURL=wallet.js.map