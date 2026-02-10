const urls = [
  "https://www.amazon.com/",
  "https://www.daraz.com.bd/"
];

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.action === "OPEN_TABS") {
    openTabsAndInject(message.urls);
  }
});

function openTabsAndInject(urlList) {
  urlList.forEach(url => {
    chrome.tabs.create({ url, active: false }, tab => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if(tabId === tab.id && info.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);

          // Inject content.js
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
          });
        }
      });
    });
  });
}
