  // https://www.amazon.com/
  // "https://www.daraz.com.bd/",
  // "https://www.flipkart.com/",
  // "https://www.ebay.com/",
  // "https://www.bestbuy.com/",
  // "https://www.aliexpress.com/",
  // "https://www.walmart.com/",
  // "https://www.snapdeal.com/",
  // "https://www.shopclues.com/",
  // "https://www.myntra.com/"

  const urls = [
  "https://www.aliexpress.com/",
];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.action === "OPEN_TABS") {
    openTabsAndInject();
  }
});

function openTabsAndInject() {
  urls.forEach(url => {
    chrome.tabs.create({ url, active: false }, tab => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if(tabId === tab.id && info.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);

          // Inject content.js to scrape data
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
          });
        }
      });
    });
  });
}
