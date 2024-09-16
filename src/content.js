import { v4 as uuidv4 } from "uuid";

console.log("Safari extension loaded");
console.log("Generated UUID:", uuidv4());

// Function to inject the bundled script into the page
function injectScript(filePath) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  // Append the script to the head or document
  (document.head || document.documentElement).appendChild(script);
}

// Inject the bundled wallet script into the page
injectScript(browser.runtime.getURL('inject.bundle.js'));

// Rest of your content script code
// browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
//   console.log("BUNDLED: Received response: ", response);
// });

// browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("UNBUNDLED: Received request: ", request);
// });

// Listen for messages from the injected script
window.addEventListener('message', function(event) {
  // Only process messages from the same window (page context)
  if (event.source !== window) return;

  // Check if the message is from your injected script
  if (event.data && event.data.source === 'my-injected-script') {
    const message = event.data.payload;
    console.log('Content script received message from injected script:', message);

    // setTimeout(() => {
      
    //   window.postMessage(
    //     {
    //       source: 'my-content-script',
    //       payload: {
    //         action: 'connectionConfirmed',
    //         data: {
    //           publicKey: "9fXVcjT6eKTVLN7e3Yi3VvzznGCg9fwNXgHRKMkEZZze"
    //         }
    //       }
    //     },
    //     '*'
    //   );

    // }, 5000);

    // Handle the 'signMessage' action
    if (message.action === 'initiateConnection') {
      // Extract the message data
      const messageData = message.data;

      // Relay the message to the background script
      browser.runtime.sendMessage({
        from: 'content-script',
        action: 'initiateConnection',
        data: messageData
      })
      .then(response => {
        // For now, we are not sending a response back to the injected script
        // You can handle the response from the background script here if needed
        console.log('Received response from background script:', response);

         window.postMessage(
          {
            source: 'my-content-script',
            payload: {
              action: 'connectionConfirmed',
              data: {
                publicKey: "9fXVcjT6eKTVLN7e3Yi3VvzznGCg9fwNXgHRKMkEZZze"
              }
            }
          },
          '*'
        );
      })
      .catch(error => {
        console.error('Error sending message to background script:', error);
      });
    }

    // Handle other actions if needed
    // else if (message.action === 'otherAction') {
    //   // Process other actions
    // }
  }
});

// Listen for messages from the background script (if needed)
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.from === 'background-script') {
    // Send the message back to the injected script
    window.postMessage(
      {
        source: 'my-content-script',
        payload: message.payload
      },
      '*'
    );
    // Optionally, send a response back to the background script
    sendResponse({ status: 'Message received by content script' });
  }
});

document.body.style.backgroundColor = "purple";