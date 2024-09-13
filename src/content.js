import { v4 as uuidv4 } from "uuid";
import { initialize } from 'unique-new-york-standard-wallet';
import { GhostWallet } from "../lib/esm/wallet.js";
import { makeGhost, RealGhost } from "../lib/esm/window.js";

console.log("Safari extension loaded");
console.log("Generated UUID:", uuidv4());

// const ghost = makeGhost()

const ghost = new RealGhost()

console.log("Ghost object:", ghost);
console.log("Ghost methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(ghost)));
console.log("Ghost properties:", Object.keys(ghost));

// If you want to see more details, including non-enumerable properties:
console.log("All ghost properties and methods:", Object.getOwnPropertyNames(ghost));

// To see the full structure, including nested objects:
console.log("Full ghost structure:", JSON.stringify(ghost, null, 2));

// const uniqueNewYork = new GhostWallet(ghost);

initialize(ghost);

browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
  console.log("BUNDLED: Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("  UNBUNDLED: Received request: ", request);
});

document.body.style.backgroundColor = "blue";
