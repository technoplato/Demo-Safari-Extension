// This is copied with modification from @wallet-standard/wallet
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
var _GhostWalletAccount_address, _GhostWalletAccount_publicKey, _GhostWalletAccount_chains, _GhostWalletAccount_features, _GhostWalletAccount_label, _GhostWalletAccount_icon;
import { SolanaSignAndSendTransaction, SolanaSignMessage, SolanaSignTransaction, } from '@solana/wallet-standard-features';
import { SOLANA_CHAINS } from './solana.js';
const chains = SOLANA_CHAINS;
const features = [SolanaSignAndSendTransaction, SolanaSignTransaction, SolanaSignMessage];
export class GhostWalletAccount {
    get address() {
        return __classPrivateFieldGet(this, _GhostWalletAccount_address, "f");
    }
    get publicKey() {
        return __classPrivateFieldGet(this, _GhostWalletAccount_publicKey, "f").slice();
    }
    get chains() {
        return __classPrivateFieldGet(this, _GhostWalletAccount_chains, "f").slice();
    }
    get features() {
        return __classPrivateFieldGet(this, _GhostWalletAccount_features, "f").slice();
    }
    get label() {
        return __classPrivateFieldGet(this, _GhostWalletAccount_label, "f");
    }
    get icon() {
        return __classPrivateFieldGet(this, _GhostWalletAccount_icon, "f");
    }
    constructor({ address, publicKey, label, icon }) {
        _GhostWalletAccount_address.set(this, void 0);
        _GhostWalletAccount_publicKey.set(this, void 0);
        _GhostWalletAccount_chains.set(this, void 0);
        _GhostWalletAccount_features.set(this, void 0);
        _GhostWalletAccount_label.set(this, void 0);
        _GhostWalletAccount_icon.set(this, void 0);
        if (new.target === GhostWalletAccount) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _GhostWalletAccount_address, address, "f");
        __classPrivateFieldSet(this, _GhostWalletAccount_publicKey, publicKey, "f");
        __classPrivateFieldSet(this, _GhostWalletAccount_chains, chains, "f");
        __classPrivateFieldSet(this, _GhostWalletAccount_features, features, "f");
        __classPrivateFieldSet(this, _GhostWalletAccount_label, label, "f");
        __classPrivateFieldSet(this, _GhostWalletAccount_icon, icon, "f");
    }
}
_GhostWalletAccount_address = new WeakMap(), _GhostWalletAccount_publicKey = new WeakMap(), _GhostWalletAccount_chains = new WeakMap(), _GhostWalletAccount_features = new WeakMap(), _GhostWalletAccount_label = new WeakMap(), _GhostWalletAccount_icon = new WeakMap();
//# sourceMappingURL=account.js.map