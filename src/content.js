import { v4 as uuidv4 } from "uuid";

console.log("Safari extension loaded");
console.log("Generated UUID:", uuidv4());

browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
  console.log("BUNDLED: Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("  UNBUNDLED: Received request: ", request);
});

document.body.style.backgroundColor = "purple";
