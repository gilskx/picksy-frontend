"use client";
import AIWaveLoader from "./AIWaveLoader";
import ProductCard from "./ProductCard";
import "./globals.css";
import SearchProgress from "./SearchProgress"; // not using this instead using AIWaveLoader - need to be deleted later
import { useState, useEffect, useRef } from "react";

export default function ResultsSection({
  loading,
  query,
  displayProducts,
  recommendation,
  cheaper,
  bestDeal,
  compareList,
  setCompareList,
  setShowComparePage,
  hasSearched,
  mode,
  setMode,
  searchInResults,
  setSearchInResults,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy
}: any) {
 
// ✅ ALL HOOKS FIRST
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("🔍 Searching products...");
  const [activeSources, setActiveSources] = useState<string[]>([]);
  const intervalRef = useRef<any>(null);
  
  useEffect(() => {

    if (!loading) {
      setProgress(100);
      clearInterval(intervalRef.current);
      return;
    }
  setProgress(0);
  setActiveSources([]);
  setStage("🔍 Searching products...");
console.log("loading:", loading);
  let p = 0;


intervalRef.current = setInterval(() => {
      p += Math.random() * 10;

      if (p < 30) {
        setStage("🔍 Searching products...");
        setActiveSources(["Amazon", "Walmart", "eBay"]);
      } else if (p < 60) {
        setStage("💰 Comparing prices...");
        setActiveSources(["Amazon", "Walmart", "eBay"]);
      } else if (p < 85) {
        setStage("⭐ Checking ratings...");
      } else {
        setStage("🤖 Finalizing best option...");
      }

      if (p >= 95) p = 95; // stop at 95 until backend finishes

      setProgress(p);

    }, 400);

    return () => clearInterval(intervalRef.current);

  }, [loading]);

// ✅ ONLY AFTER ALL HOOKS
//if (!hasSearched && !loading) return null;

  // 🔥 FILTER LOGIC (non-breaking)
  let filteredProducts = displayProducts;

  if (mode === "best" && recommendation?.bestPick) {
    filteredProducts = displayProducts.filter(
      (p: any) => p.name === recommendation.bestPick.name
    );
  }

  if (mode === "cheap" && cheaper) {
    filteredProducts = displayProducts.filter(
      (p: any) => p.name === cheaper.name
    );
  }
const getStageDisplay = (stage: string) => {
  if (!stage) return "🔍 Searching products...";

  if (stage.toLowerCase().includes("search"))
    return "🔍 Searching products...";

  if (stage.toLowerCase().includes("compar"))
    return "💰 Comparing prices...";

  if (stage.toLowerCase().includes("rating"))
    return "⭐ Checking ratings...";

  if (stage.toLowerCase().includes("final"))
    return "🤖 Finalizing best option...";

  return `🔍 ${stage}`;
};
  return (
    <div style={{
     // background: "#000000",
      padding: "20px",
      borderRadius: "12px",
      backdropFilter: "blur(10px)"
    }}>

      {/* HEADER */}
     {!loading && (
  <div style={{
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }}>
        <div style={{
  display: "flex",
  alignItems: "center",
  gap: "10px"
}}>
          <span style={{ fontSize: "18px" }}>🔍</span>

          <div>
            <div style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#6b7280"
            }}>
              Results for "{query}" - {displayProducts.length} products picked
            </div>

          </div>
        </div>
      </div>
)}
      {/* 🔥 FILTER TABS (NEW) */}
      {!loading && (
  <div style={{
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    marginBottom: "20px"
  }}>

    {["all", "best", "cheap"].map((m) => (
      <div
        key={m}
        onClick={() => setMode(m)}
        style={{
          padding: "8px 16px",
          borderRadius: "20px",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "600",
          transition: "all 0.25s ease",
          background:
            mode === m
              ? (m === "cheap"
                  ? "linear-gradient(135deg, #22c55e, #16a34a)"
                  : "linear-gradient(135deg, #6366f1, #3b82f6)")
              : "rgba(255,255,255,0.05)",
          color:
            mode === m
              ? "#fff"
              : m === "cheap"
                ? "#22c55e"
                : "#94a3b8",
          border:
            m === "cheap"
              ? "1px solid rgba(34,197,94,0.4)"
              : "1px solid rgba(255,255,255,0.1)"
        }}
      >
        {m === "all" ? "All" : m === "best" ? "Best" : "Save 💰"}
      </div>
    ))}

  </div>
)}

      {/* 🔥 FILTER BAR */}
<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  marginBottom: "20px",
  flexWrap: "wrap"
}}>

  {/* LEFT SIDE FILTERS */}
  <div style={{
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    alignItems: "center"
  }}>

    {/* SEARCH */}
    <input
      placeholder="Search in results"
      value={searchInResults}
      onChange={(e) => setSearchInResults(e.target.value)}
      style={{
        padding: "8px 14px",
        borderRadius: "25px",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(255,255,255,0.05)",
        color: "#fff",
        minWidth: "180px"
      }}
    />

    {/* MIN */}
    <input
      placeholder="Min Price"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
      style={{
        padding: "8px 14px",
        borderRadius: "25px",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(255,255,255,0.05)",
        color: "#fff",
        width: "120px"
      }}
    />

    {/* MAX */}
    <input
      placeholder="Max Price"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
      style={{
        padding: "8px 14px",
        borderRadius: "25px",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(255,255,255,0.05)",
        color: "#fff",
        width: "120px"
      }}
    />
  </div>

  {/* RIGHT SIDE SORT */}
  <div style={{ position: "relative" }}>
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      style={{
        padding: "8px 16px",
        borderRadius: "25px",
        border: "1px solid rgba(255,255,255,0.3)",
        background: "#000000",
        color: "#e2e8f0",
        cursor: "pointer",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        minWidth: "160px"
      }}
    >

      <option value="best">Best Match</option>
      <option value="priceLow">Price: Low to High</option>
      <option value="priceHigh">Price: High to Low</option>
      <option value="rating">Top Rated</option>

    </select>

    {/* CUSTOM ARROW */}
    <span style={{
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "#e2e8f0",
      fontSize: "12px"
    }}>
      ▼
    </span>
  </div>

</div>
      {/* LOADING / EMPTY / GRID */}
{loading ? (
  <div style={{ textAlign: "center", padding: "40px 0" }}>

    {/* 🌊 AI WAVE */}
    <div style={{
  position: "relative",
  width: "200px",
  height: "120px",
  margin: "0 auto"
}}>

  {/* 🌊 WAVE CENTER */}
  <div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }}>
    <AIWaveLoader />
  </div>

  {/* 🔄 ORBITING ICONS */}
  <div className="orbit amazon">a</div>
  <div className="orbit walmart">w</div>
  <div className="orbit ebay">e</div>

</div>

    {/* 🔤 STAGE TEXT */}
    <div style={{
      marginTop: "20px",
      fontSize: "15px",
      color: "#e2e8f0",
      fontWeight: "500"
    }}>
      {stage}
    </div>

    {/* 🔎 ACTIVE SOURCES */}
    {activeSources && activeSources.length > 0 && (
      <div style={{
        marginTop: "8px",
        fontSize: "12px",
        color: "#64748b"
      }}>
        Searching: {activeSources.join(" • ")}
      </div>
    )}

    {/* OPTIONAL: QUERY */}
    <div style={{
      marginTop: "6px",
      fontSize: "12px",
      color: "#475569"
    }}>
      "{query}"
    </div>

  </div>
) : !loading && filteredProducts.length === 0 ? (

  <div style={{
    padding: "60px 20px",
    textAlign: "center"
  }}>
    <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔍</div>

    <div style={{
      fontSize: "18px",
      fontWeight: "600",
      color: "#f8fafc",
      marginBottom: "6px"
    }}>
      No results found
    </div>

    <div style={{
      fontSize: "14px",
      color: "#94a3b8"
    }}>
      Try a different search or adjust your filters
    </div>
  </div>

) : (

  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px"
  }}>
    {filteredProducts.slice(0, 12).map((p: any, i: number) => (
      <ProductCard
        key={i}
        p={p}
        recommendation={recommendation}
        cheaper={cheaper}
        bestDeal={bestDeal}
        compareList={compareList}
        setCompareList={setCompareList}
        setShowComparePage={setShowComparePage}
      />
    ))}
  </div>

)}

    </div>
  );
}	