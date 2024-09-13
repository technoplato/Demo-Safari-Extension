// This is copied from @wallet-standard/wallet
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
var _RegisterWalletEvent_detail;
export function registerWallet(wallet) {
    console.log(wallet);
    console.log("before callback");
    const callback = ({ register }) => register(wallet);
    console.log("after callback");
    console.log(callback);
    console.log("1");
    try {
        window.dispatchEvent(new RegisterWalletEvent(callback));
    }
    catch (error) {
        console.error('wallet-standard:register-wallet event could not be dispatched\n', error);
    }
    console.log("2");
    try {
        // (window as WalletEventsWindow).addEventListener('wallet-standard:app-ready', ({ detail: api }) => {
        window.addEventListener('wallet-standard:app-ready', (thing) => {
            console.log("Hello Mike");
            console.log(thing);
            // console.log(api)
            // callback(api)
        });
        console.log("3");
    }
    catch (error) {
        console.error('wallet-standard:app-ready event listener could not be added\n', error);
    }
    console.log("4");
}
class RegisterWalletEvent extends Event {
    get detail() {
        console.log("Detail was called");
        return __classPrivateFieldGet(this, _RegisterWalletEvent_detail, "f");
    }
    get type() {
        return 'wallet-standard:register-wallet';
    }
    constructor(callback) {
        console.log("in constructor");
        super('wallet-standard:register-wallet', {
            bubbles: false,
            cancelable: false,
            composed: false,
        });
        _RegisterWalletEvent_detail.set(this, void 0);
        __classPrivateFieldSet(this, _RegisterWalletEvent_detail, callback, "f");
        console.log("end constructor");
    }
    /** @deprecated */
    preventDefault() {
        throw new Error('preventDefault cannot be called');
    }
    /** @deprecated */
    stopImmediatePropagation() {
        throw new Error('stopImmediatePropagation cannot be called');
    }
    /** @deprecated */
    stopPropagation() {
        throw new Error('stopPropagation cannot be called');
    }
}
_RegisterWalletEvent_detail = new WeakMap();
/** @deprecated */
export function DEPRECATED_registerWallet(wallet) {
    var _a;
    registerWallet(wallet);
    try {
        ((_a = window.navigator).wallets || (_a.wallets = [])).push(({ register }) => register(wallet));
    }
    catch (error) {
        console.error('window.navigator.wallets could not be pushed\n', error);
    }
}
//# sourceMappingURL=register.js.map