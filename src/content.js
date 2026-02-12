// Initialize array to store scraped data
const products = [];

// This is site-specific, so for simplicity we'll try to scrape common patterns
// You can modify query selectors per site

document.querySelectorAll("div, li").forEach(item => {
  const titleEl = item.querySelector("h2, h3, .product-title, .title");
  const priceEl = item.querySelector(".price, .product-price, span");
  const ratingEl = item.querySelector(".rating, .stars");

  if(titleEl && priceEl) {
    products.push({
      title: titleEl.innerText.trim(),
      price: priceEl.innerText.trim(),
      rating: ratingEl ? ratingEl.innerText.trim() : "N/A"
    });
  }
});

// Save data to localStorage
chrome.storage.local.set({ scrapedProducts: products });

// Download CSV
if(products.length > 0) {
  let csv = "Title,Price,Rating\n";
  products.forEach(p => {
    csv += `"${p.title}","${p.price}","${p.rating}"\n`;
  });

  const blob = new Blob([csv], {type: "text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "products.csv";
  a.click();
}

console.log("Scraping complete", products);