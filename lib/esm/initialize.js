import { registerWallet } from './register.js';
import { GhostWallet } from './wallet.js';
export function initialize(ghost) {
    registerWallet(new GhostWallet(ghost));
}
//# sourceMappingURL=initialize.js.map