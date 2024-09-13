import { v4 as uuidv4 } from "uuid";
import { initialize } from 'unique-new-york-standard-wallet';
import { GhostWallet } from "../lib/esm/wallet.js";
import { makeGhost } from "../lib/esm/window.js";

console.log("Safari extension loaded");
console.log("Generated UUID:", uuidv4());

const ghost = makeGhost()

const uniqueNewYork = new GhostWallet(ghost);

initialize(uniqueNewYork);

browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
  console.log("BUNDLED: Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("  UNBUNDLED: Received request: ", request);
});

document.body.style.backgroundColor = "blue";
