
// background.js

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.from === 'content-script') {
    console.log('Background script received message from content script:', message);

    if (message.action === 'initiateConnection') {

            // Simulate some background processing or communication with a native app
            // setTimeout(() => {
            //   // Send a message to the native app (if needed)
            //   browser.runtime.sendNativeMessage("application.id", { message: "Initiating connection"}, function(nativeResponse) {
            //     console.log("Received sendNativeMessage response: ", nativeResponse);


                
            //     // Send connection confirmation back to the content script
            //     const responsePayload = { 
            //       action: 'connectionConfirmed',
            //       data: {
            //         publicKey: "9fXVcjT6eKTVLN7e3Yi3VvzznGCg9fwNXgHRKMkEZZze" // Example public key
            //       }
            //     };
            //     sendResponse(responsePayload);

                


            //   });
            // }, 5000); // Simulate a 2-second delay

            // Send a message to the native app (if needed)
            browser.runtime.sendNativeMessage("application.id", { message: "Initiating connection"}, function(nativeResponse) {
              console.log("Received sendNativeMessage response: ", nativeResponse);

              
              // Function to poll the API
              async function pollForPublicKey() {
                while (true) {
                  try {
                    const response = await fetch('https://b097-2600-1700-75c1-130-d860-67d6-ca2a-8ecf.ngrok-free.app/api/connected', {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                      }
                    });
                    const data = await response.json();
                    
                    if (data.publicKey) {
                      const responsePayload = { 
                        action: 'connectionConfirmed',
                        data: {
                          publicKey: data.publicKey
                        }
                      };
                      sendResponse(responsePayload);
                      break;
                    }
                  } catch (error) {
                    console.error('Error fetching publicKey:', error);
                  }
                  
                  // Wait for 1 second before polling again
                  await new Promise(resolve => setTimeout(resolve, 1000));
                }
              }

              // Start polling for publicKey
              pollForPublicKey();

            });
      
            // Return true to indicate that we will send a response asynchronously
            return true;

    }

    // browser.runtime.sendNativeMessage("application.id", {message: "hello Native App"}, function(response) {
    //   console.log("Received sendNativeMessage response: ", response);
    // });
  
    // // Process the message and send a response
    // const responsePayload = { reply: 'Hello from background script!' };

    // // Send the response back to the content script
    // sendResponse(responsePayload);

    // If you need to send a message back to the content script asynchronously
    // you can use browser.tabs.sendMessage
    // Return true to indicate you will send a response asynchronously
    // return true;
  }
});
