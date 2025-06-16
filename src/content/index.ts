// Script gets the title of the mix from the html

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("request", request.greeting);
  if (request.greeting === "soundcloud") {
    // The page is soundcloud
    const mixName = document.querySelector("h1 span")?.textContent;
    console.log("mixName", mixName);
    sendResponse(mixName ? mixName : "no mix name");
  } else if (request.greeting === "youtube") {
    // The page is youtube
    const mixName = document.querySelector(
      "h1.style-scope.ytd-watch-metadata"
    )?.textContent;
    console.log("mixName", mixName);
    sendResponse(mixName ? mixName : "no mix name");
  }
  return true;
});
