import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

export const Popup = () => {
  const [loading, setLoading] = useState(false);

  const handleOpenTabs = () => {
    setLoading(true);

    chrome.runtime.sendMessage({ action: "SCRAPE_PRODUCTS" });

    // Optional fake loading animation time
    setTimeout(() => setLoading(false), 2500);
  };

  return (
    <div className="w-80 p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-500/20 rounded-xl">
          <MdOutlineShoppingCart className="text-green-400" size={22} />
        </div>

        <h1 className="text-lg font-bold tracking-wide">
          Multi Tab Scraper
        </h1>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-300 leading-relaxed mb-5">
        Scrape{" "}
        <span className="text-green-400 font-semibold">
          Product Name
        </span>
        ,{" "}
        <span className="text-green-400 font-semibold">
          Price
        </span>{" "}
        &{" "}
        <span className="text-green-400 font-semibold">
          Rating
        </span>{" "}
        from eCommerce sites automatically.
      </p>

      {/* Button */}
      <button
        onClick={handleOpenTabs}
        disabled={loading}
        className={`
          w-full py-2.5 rounded-xl font-semibold
          flex items-center justify-center gap-2
          transition-all duration-300
          ${
            loading
              ? "bg-slate-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30 active:scale-95"
          }
        `}
      >
        {loading ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            Scraping...
          </>
        ) : (
          <>
            <HiSparkles size={16} />
            Open & Scrape
          </>
        )}
      </button>

      {/* Footer */}
      <p className="text-xs text-slate-400 text-center mt-4">
        Supports multiple eCommerce platforms
      </p>
    </div>
  );
};
