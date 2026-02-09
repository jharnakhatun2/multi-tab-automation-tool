import React, { useState } from 'react'

export const Popup = () => {
  const [url, setUrl] = useState("https://example.com");
  const [count, setCount] = useState(5);


  const openTabs = () => {
    for (let i = 0; i < count; i++) {
      chrome.tabs.create({ url }, (tab) => {
        setTimeout(() => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: automationScript
          });
        }, 3000);
      });
    }
  };
  return (
    <div className="w-[300px] p-4 bg-gray-100">
      <h2 className="text-lg font-bold mb-3 text-center">
        Multi‑Tab Automation
      </h2>

      <input
        className="w-full p-2 mb-2 border rounded"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <input
        type="number"
        className="w-full p-2 mb-3 border rounded"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        placeholder="Tab Count"
      />

      <button
        onClick={openTabs}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Open Tabs + Run Script
      </button>
    </div>
  )
}
