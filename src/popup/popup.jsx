import React from 'react';

export const Popup = () => {

  const handleOpenTabs = () => {
    chrome.runtime.sendMessage({ action: "OPEN_TABS" });
  };

  return (
    <div className="p-4 w-80">
      <h1 className="text-xl font-bold mb-2">Multi Tab Product Scraper</h1>
      <p className="mb-2 text-sm">Scrapes Product Name, Price & Rating from 10 sites</p>
      <button
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        onClick={handleOpenTabs}
      >
        Open & Scrape
      </button>
    </div>
  );
};
