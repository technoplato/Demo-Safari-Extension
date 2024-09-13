browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received request: ", request);

  if (request.greeting === "hello") {
    return Promise.resolve({
      farewell: "goodbye teej you sweet sweet man",
    });
  }

  if (request.greeting === "goodbye") {
    return Promise.resolve({
      farewell: "bah bah black sheep have you any wool",
    });
  }
});
