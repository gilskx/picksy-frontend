"use client";

import ProductCard from "./ProductCard";
import "./globals.css";
export default function ResultsSection({
  loading,
  query,
   loadingMessage,
  displayProducts,
  recommendation,
  cheaper,
  bestDeal,
  compareList,
  setCompareList,
  setShowComparePage,
  hasSearched
}: any)

{

  if (!hasSearched) return null;

  return (
    <div style={{
     background: "#000000",   // ✅ UPDATED (dark glass)
      padding: "20px",
      borderRadius: "12px",
      backdropFilter: "blur(10px)"            // ✅ premium feel
    }}>

      {/* HEADER */}
      <div style={{
        marginBottom: "24px",
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
  fontSize: "14px",          // slightly smaller
  fontWeight: "500",         // lighter
  color: "#6b7280"           // grey
}}>
  Results for "{query}"
</div>	

            <div style={{
              fontSize: "13px",
              color: "#94a3b8"   // ✅ UPDATED (muted text)
            }}>
              {displayProducts.length} products found
            </div>
          </div>
        </div>
      </div>

      {/* EMPTY STATE OR GRID */}
      {/* LOADING / EMPTY / GRID */}
{loading ? (

  <>
    {/* 🧠 AI PROGRESS */}
   <div style={{
  marginBottom: "20px",
  color: "#93c5fd",
  fontSize: "14px",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  gap: "10px"
}}>
  <span style={{
    animation: "pulse 1.2s infinite"
  }}>
    ⭐ {loadingMessage}
  </span>
</div>

    {/* 🔥 SHIMMER LOADING */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px"
    }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            padding: "12px",
            borderRadius: "16px",
            background: "#020202"
          }}
        >
          <div
            className="shimmer"
            style={{
              height: "140px",
              borderRadius: "12px",
              marginBottom: "12px"
            }}
          />

          <div
            className="shimmer"
            style={{
              height: "12px",
              width: "80%",
              borderRadius: "6px",
              marginBottom: "8px"
            }}
          />

          <div
            className="shimmer"
            style={{
              height: "10px",
              width: "60%",
              borderRadius: "6px"
            }}
          />
        </div>
      ))}
    </div>
  </>

) : !loading && displayProducts.length === 0 ? (

  // 🔍 EMPTY STATE (unchanged)
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

  // ✅ PRODUCT GRID (unchanged)
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px"
  }}>
    {displayProducts.slice(0, 12).map((p, i) => (
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