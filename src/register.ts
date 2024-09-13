// This is copied from @wallet-standard/wallet

import type {
    DEPRECATED_WalletsWindow,
    Wallet,
    WalletEventsWindow,
    WindowRegisterWalletEvent,
    WindowRegisterWalletEventCallback,
} from '@wallet-standard/base';

export function registerWallet(wallet: Wallet): void {
    console.log(wallet)
    console.log("before callback")
    const callback: WindowRegisterWalletEventCallback = ({ register }) => register(wallet);
    console.log("after callback")
    console.log(callback)

    console.log("1")
    try {
        (window as WalletEventsWindow).dispatchEvent(new RegisterWalletEvent(callback));
    } catch (error) {
        console.error('wallet-standard:register-wallet event could not be dispatched\n', error);
    }
    console.log("2")
    try {
        // (window as WalletEventsWindow).addEventListener('wallet-standard:app-ready', ({ detail: api }) => {
        (window as WalletEventsWindow).addEventListener('wallet-standard:app-ready', (thing) => {
            console.log("Hello Mike")
            console.log
            // console.log(api)
            // callback(api)
        }
            
        );
        console.log("3")
    } catch (error) {
        console.error('wallet-standard:app-ready event listener could not be added\n', error);
    }
    console.log("4")

}

class RegisterWalletEvent extends Event implements WindowRegisterWalletEvent {
    readonly #detail: WindowRegisterWalletEventCallback;

    get detail() {
        console.log("Detail was called")
        return this.#detail;
    }

    get type() {
        return 'wallet-standard:register-wallet' as const;
    }

    constructor(callback: WindowRegisterWalletEventCallback) {
        console.log("in constructor")
        super('wallet-standard:register-wallet', {
            bubbles: false,
            cancelable: false,
            composed: false,
        });
        this.#detail = callback;
        console.log("end constructor")
    }

    /** @deprecated */
    preventDefault(): never {
        throw new Error('preventDefault cannot be called');
    }

    /** @deprecated */
    stopImmediatePropagation(): never {
        throw new Error('stopImmediatePropagation cannot be called');
    }

    /** @deprecated */
    stopPropagation(): never {
        throw new Error('stopPropagation cannot be called');
    }
}

/** @deprecated */
export function DEPRECATED_registerWallet(wallet: Wallet): void {
    registerWallet(wallet);
    try {
        ((window as DEPRECATED_WalletsWindow).navigator.wallets ||= []).push(({ register }) => register(wallet));
    } catch (error) {
        console.error('window.navigator.wallets could not be pushed\n', error);
    }
}