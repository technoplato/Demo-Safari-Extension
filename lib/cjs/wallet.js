"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _GhostWallet_instances, _GhostWallet_listeners, _GhostWallet_version, _GhostWallet_name, _GhostWallet_icon, _GhostWallet_account, _GhostWallet_ghost, _GhostWallet_on, _GhostWallet_emit, _GhostWallet_off, _GhostWallet_connected, _GhostWallet_disconnected, _GhostWallet_reconnected, _GhostWallet_connect, _GhostWallet_disconnect, _GhostWallet_signAndSendTransaction, _GhostWallet_signTransaction, _GhostWallet_signMessage, _GhostWallet_signIn;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GhostWallet = exports.GhostNamespace = void 0;
const wallet_standard_features_1 = require("@solana/wallet-standard-features");
const web3_js_1 = require("@solana/web3.js");
const features_1 = require("@wallet-standard/features");
const bs58_1 = __importDefault(require("bs58"));
const account_js_1 = require("./account.js");
const icon_js_1 = require("./icon.js");
const solana_js_1 = require("./solana.js");
const util_js_1 = require("./util.js");
exports.GhostNamespace = 'ghost:';
class GhostWallet {
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
        return solana_js_1.SOLANA_CHAINS.slice();
    }
    get features() {
        return {
            [features_1.StandardConnect]: {
                version: '1.0.0',
                connect: __classPrivateFieldGet(this, _GhostWallet_connect, "f"),
            },
            [features_1.StandardDisconnect]: {
                version: '1.0.0',
                disconnect: __classPrivateFieldGet(this, _GhostWallet_disconnect, "f"),
            },
            [features_1.StandardEvents]: {
                version: '1.0.0',
                on: __classPrivateFieldGet(this, _GhostWallet_on, "f"),
            },
            [wallet_standard_features_1.SolanaSignAndSendTransaction]: {
                version: '1.0.0',
                supportedTransactionVersions: ['legacy', 0],
                signAndSendTransaction: __classPrivateFieldGet(this, _GhostWallet_signAndSendTransaction, "f"),
            },
            [wallet_standard_features_1.SolanaSignTransaction]: {
                version: '1.0.0',
                supportedTransactionVersions: ['legacy', 0],
                signTransaction: __classPrivateFieldGet(this, _GhostWallet_signTransaction, "f"),
            },
            [wallet_standard_features_1.SolanaSignMessage]: {
                version: '1.0.0',
                signMessage: __classPrivateFieldGet(this, _GhostWallet_signMessage, "f"),
            },
            [wallet_standard_features_1.SolanaSignIn]: {
                version: '1.0.0',
                signIn: __classPrivateFieldGet(this, _GhostWallet_signIn, "f"),
            },
            [exports.GhostNamespace]: {
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
        _GhostWallet_icon.set(this, icon_js_1.icon);
        _GhostWallet_account.set(this, null);
        _GhostWallet_ghost.set(this, void 0);
        _GhostWallet_on.set(this, (event, listener) => {
            var _a;
            ((_a = __classPrivateFieldGet(this, _GhostWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.push(listener)) || (__classPrivateFieldGet(this, _GhostWallet_listeners, "f")[event] = [listener]);
            return () => __classPrivateFieldGet(this, _GhostWallet_instances, "m", _GhostWallet_off).call(this, event, listener);
        });
        _GhostWallet_connected.set(this, () => {
            var _a;
            const address = (_a = __classPrivateFieldGet(this, _GhostWallet_ghost, "f").publicKey) === null || _a === void 0 ? void 0 : _a.toBase58();
            if (address) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const publicKey = __classPrivateFieldGet(this, _GhostWallet_ghost, "f").publicKey.toBytes();
                const account = __classPrivateFieldGet(this, _GhostWallet_account, "f");
                if (!account || account.address !== address || !(0, util_js_1.bytesEqual)(account.publicKey, publicKey)) {
                    __classPrivateFieldSet(this, _GhostWallet_account, new account_js_1.GhostWalletAccount({ address, publicKey }), "f");
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
        _GhostWallet_connect.set(this, ({ silent } = {}) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _GhostWallet_account, "f")) {
                yield __classPrivateFieldGet(this, _GhostWallet_ghost, "f").connect(silent ? { onlyIfTrusted: true } : undefined);
            }
            __classPrivateFieldGet(this, _GhostWallet_connected, "f").call(this);
            return { accounts: this.accounts };
        }));
        _GhostWallet_disconnect.set(this, () => __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _GhostWallet_ghost, "f").disconnect();
        }));
        _GhostWallet_signAndSendTransaction.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _GhostWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { transaction, account, chain, options } = inputs[0];
                const { minContextSlot, preflightCommitment, skipPreflight, maxRetries } = options || {};
                if (account !== __classPrivateFieldGet(this, _GhostWallet_account, "f"))
                    throw new Error('invalid account');
                if (!(0, solana_js_1.isSolanaChain)(chain))
                    throw new Error('invalid chain');
                const { signature } = yield __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signAndSendTransaction(web3_js_1.VersionedTransaction.deserialize(transaction), {
                    preflightCommitment,
                    minContextSlot,
                    maxRetries,
                    skipPreflight,
                });
                outputs.push({ signature: bs58_1.default.decode(signature) });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(yield __classPrivateFieldGet(this, _GhostWallet_signAndSendTransaction, "f").call(this, input)));
                }
            }
            return outputs;
        }));
        _GhostWallet_signTransaction.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _GhostWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { transaction, account, chain } = inputs[0];
                if (account !== __classPrivateFieldGet(this, _GhostWallet_account, "f"))
                    throw new Error('invalid account');
                if (chain && !(0, solana_js_1.isSolanaChain)(chain))
                    throw new Error('invalid chain');
                const signedTransaction = yield __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signTransaction(web3_js_1.VersionedTransaction.deserialize(transaction));
                const serializedTransaction = (0, solana_js_1.isVersionedTransaction)(signedTransaction)
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
                        if (!(0, solana_js_1.isSolanaChain)(input.chain))
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
                const transactions = inputs.map(({ transaction }) => web3_js_1.VersionedTransaction.deserialize(transaction));
                const signedTransactions = yield __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signAllTransactions(transactions);
                outputs.push(...signedTransactions.map((signedTransaction) => {
                    const serializedTransaction = (0, solana_js_1.isVersionedTransaction)(signedTransaction)
                        ? signedTransaction.serialize()
                        : new Uint8Array(signedTransaction.serialize({
                            requireAllSignatures: false,
                            verifySignatures: false,
                        }));
                    return { signedTransaction: serializedTransaction };
                }));
            }
            return outputs;
        }));
        _GhostWallet_signMessage.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _GhostWallet_account, "f"))
                throw new Error('not connected');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { message, account } = inputs[0];
                if (account !== __classPrivateFieldGet(this, _GhostWallet_account, "f"))
                    throw new Error('invalid account');
                const { signature } = yield __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signMessage(message);
                outputs.push({ signedMessage: message, signature });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(...(yield __classPrivateFieldGet(this, _GhostWallet_signMessage, "f").call(this, input)));
                }
            }
            return outputs;
        }));
        _GhostWallet_signIn.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            const outputs = [];
            if (inputs.length > 1) {
                for (const input of inputs) {
                    outputs.push(yield __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signIn(input));
                }
            }
            else {
                return [yield __classPrivateFieldGet(this, _GhostWallet_ghost, "f").signIn(inputs[0])];
            }
            return outputs;
        }));
        console.log("TEEJ TEST TESSJ");
        if (new.target === GhostWallet) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _GhostWallet_ghost, ghost, "f");
        ghost.on('connect', __classPrivateFieldGet(this, _GhostWallet_connected, "f"), this);
        ghost.on('disconnect', __classPrivateFieldGet(this, _GhostWallet_disconnected, "f"), this);
        ghost.on('accountChanged', __classPrivateFieldGet(this, _GhostWallet_reconnected, "f"), this);
        __classPrivateFieldGet(this, _GhostWallet_connected, "f").call(this);
    }
}
exports.GhostWallet = GhostWallet;
_GhostWallet_listeners = new WeakMap(), _GhostWallet_version = new WeakMap(), _GhostWallet_name = new WeakMap(), _GhostWallet_icon = new WeakMap(), _GhostWallet_account = new WeakMap(), _GhostWallet_ghost = new WeakMap(), _GhostWallet_on = new WeakMap(), _GhostWallet_connected = new WeakMap(), _GhostWallet_disconnected = new WeakMap(), _GhostWallet_reconnected = new WeakMap(), _GhostWallet_connect = new WeakMap(), _GhostWallet_disconnect = new WeakMap(), _GhostWallet_signAndSendTransaction = new WeakMap(), _GhostWallet_signTransaction = new WeakMap(), _GhostWallet_signMessage = new WeakMap(), _GhostWallet_signIn = new WeakMap(), _GhostWallet_instances = new WeakSet(), _GhostWallet_emit = function _GhostWallet_emit(event, ...args) {
    var _a;
    // eslint-disable-next-line prefer-spread
    (_a = __classPrivateFieldGet(this, _GhostWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.forEach((listener) => listener.apply(null, args));
}, _GhostWallet_off = function _GhostWallet_off(event, listener) {
    var _a;
    __classPrivateFieldGet(this, _GhostWallet_listeners, "f")[event] = (_a = __classPrivateFieldGet(this, _GhostWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.filter((existingListener) => listener !== existingListener);
};
//# sourceMappingURL=wallet.js.map