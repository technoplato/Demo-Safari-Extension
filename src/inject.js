import { initialize, RealGhost } from 'unique-new-york-standard-wallet';
// import { RealGhost } from '../lib/esm/window.js';

// Initialize your wallet
(function() {
  const ghost = new RealGhost();
  initialize(ghost);
})(); 