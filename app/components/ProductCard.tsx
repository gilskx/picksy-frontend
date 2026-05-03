"use client";

import { useState } from "react";

export default function ProductCard({
  p,
  recommendation,
  cheaper,
  bestDeal,
  compareList,
  setCompareList,
   setShowComparePage
}: any) {

  // 🧠 AI LOGIC
  const isBest = recommendation?.bestPick?.name === p.name;
  const isCheap = cheaper?.name === p.name;
  const isTopRated = p.rating && p.rating >= 4.5;

  let aiInsight = "";

  if (isBest) aiInsight = "Best overall choice based on value & rating";
  else if (isCheap) aiInsight = "Most budget-friendly option";
  else if (isTopRated) aiInsight = "Highly rated by users";
  else aiInsight = "Balanced option across price and quality";

  // ✅ EXPANDABLE AI
  const [showWhy, setShowWhy] = useState(false);

  // ✅ CHECK IF SELECTED FOR COMPARE
  const isSelected = compareList?.find((x: any) => x.name === p.name);
const toggleCompare = (item: any) => {

  let updated = [...compareList];

  // 🔄 remove if already selected
  if (updated.find((x: any) => x.name === item.name)) {
    updated = updated.filter((x: any) => x.name !== item.name);
  } else {
    updated.push(item);
  }

  // ✅ allow only 2 items
  updated = updated.slice(0, 2);

  setCompareList(updated);

  // 🚀 AUTO NAVIGATE WHEN 2 ITEMS
  if (updated.length === 2) {
    setShowComparePage(true);
  }
};

  const fullName = p.name || "";

  // Split by comma
  const parts = fullName.split(",");

  const mainTitle = parts[0];                 // First name
  
	return (
	  <div
		className="nokku-product-card"
		style={{
         //background: "#000000", 
		 background: "rgba(255,255,255,0.03)",

boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        borderRadius: "16px",
        padding: "14px",
        transition: "all 0.25s ease",
        position: "relative",
        border: "1px solid #f0f0f0"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
      }}
    >

      {/* ⭐ BEST PICK */}
      {isBest && (
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "#28a745",
          color: "#fff",
          fontSize: "11px",
          padding: "5px 10px",
          borderRadius: "20px",
          fontWeight: "600"
        }}>
          ⭐ Best Pick
        </div>
      )}

      {/* 🔵 BEST DEAL */}
      {bestDeal && p.name === bestDeal?.name && (
        <div style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "#2c7be5",
          color: "#fff",
          fontSize: "11px",
          padding: "5px 10px",
          borderRadius: "20px",
          fontWeight: "600"
        }}>
          Best Deal
        </div>
      )}

     {/* IMAGE - CLICKABLE SAME AS SOLD ON BUTTON */}
{(p.url || p.link) ? (
  <a
    href={(p.url || p.link).startsWith("http")
      ? (p.url || p.link)
      : `https://${p.url || p.link}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      height: "170px",
      background: "#f9fafc",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      cursor: "pointer",
      overflow: "hidden"
    }}
  >
    <img
      src={p.image}
      style={{
        maxHeight: "100%",
        maxWidth: "100%",
        height: "160px",
        objectFit: "contain",
        transition: "transform 0.3s ease"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    />
  </a>
) : (
  <div style={{
    height: "170px",
    background: "#f9fafc",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  }}>
    <img
      src={p.image}
      style={{
        maxHeight: "100%",
        maxWidth: "100%",
        height: "160px",
        objectFit: "contain"
      }}
    />
  </div>
)}

      {/* TITLE */}
      <div style={{
        fontSize: "14px",
        marginTop: "10px",
        height: "42px",
        overflow: "hidden",
        color: "rgba(34, 193, 255, 0.75)",
		
        fontWeight: "500"
      }}>
        {mainTitle}
      </div>
{/* PRICE + RATING ROW */}
<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "6px"
}}>

  {/* PRICE */}
  <div style={{
    fontWeight: "700",
    color: "rgba(34, 193, 255, 0.75)",
    fontSize: "17px"
  }}>
    {p.price && p.price > 0 ? `$${p.price}` : (
      <div style={{
        fontSize: "12px",
        color: "rgba(34, 193, 255, 0.75)",
        marginTop: "4px"
      }}>
        Price unavailable
      </div>
    )}

    {(!p.price || p.price <= 0) && (
      <a
        href={(p.url || p.link)?.startsWith("http")
          ? (p.url || p.link)
          : `https://${p.url || p.link}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#2563eb",
          textDecoration: "underline",
          fontSize: "12px",
          display: "block",
          marginTop: "4px"
        }}
      >
        Check Price →
      </a>
    )}
  </div>

  {/* RATING */}
  <div style={{
    fontSize: "13px",
    color: "#f59e0b",
    whiteSpace: "nowrap"
  }}>
    ⭐ {p.rating ? p.rating.toFixed(1) : "N/A"}
  </div>

</div>
      {/* 🧠 AI INSIGHT */}
      <div style={{
        marginTop: "8px",
        fontSize: "12px",
        color: "rgba(34, 193, 255, 0.75)",
		background: "transparent",
        padding: "6px 10px",
        borderRadius: "8px",
        fontWeight: "500"
      }}>
        🧠 {aiInsight}
      </div>

      

      {/* SOURCE */}
      <div style={{
        fontSize: "12px",
         marginBottom: "10px",
        marginTop: "6px",
		fontWeight: "500",
		color: "rgba(34, 193, 255, 0.75)",
		
      }}>
	    
       Sold on  {p.source}
      </div>

      {/* VIEW DEAL */}
{(p.url || p.link) && (
  <a
    href={(p.url || p.link).startsWith("http")
      ? (p.url || p.link)
      : `https://${p.url || p.link}`}
    target="_blank"
    rel="noopener noreferrer"

    // ✅ MOVE EVENTS HERE (outside content)
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.04)";
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(34,193,255,0.4)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 8px 25px rgba(34,193,255,0.25)";
    }}

    style={{
      display: "block",
      textAlign: "center",
      borderRadius: "25px",
      padding: "10px",
      fontSize: "13px",
      textDecoration: "none",

      background: "rgba(34, 193, 255, 0.12)",
      border: "1px solid rgba(34, 193, 255, 0.35)",
      color: "#22d3ee",

      fontWeight: "600",
      marginTop: "10px",

      boxShadow: "0 8px 25px rgba(34,193,255,0.25)",
      backdropFilter: "blur(6px)",

      transition: "all 0.25s ease",
	   animation: "pulseGlow 2s infinite"
    }}
  >
    Sold on {p.source} →
  </a>
)}
	  
	  
	  



{/* ✅ COMPARE BUTTON */}
<button
  onClick={() => toggleCompare(p)}

  onMouseOver={(e) => {
    e.currentTarget.style.transform = "scale(1.04)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(34,193,255,0.4)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(34,193,255,0.25)";
  }}

  style={{
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "25px",
    fontSize: "13px",

    // ✅ SAME AS VIEW DEAL
    background: "rgba(34, 193, 255, 0.12)",
    border: "1px solid rgba(34, 193, 255, 0.35)",
    color: isSelected ? "#22c55e" : "#22d3ee",

    fontWeight: "600",
    cursor: "pointer",

    boxShadow: "0 8px 25px rgba(34,193,255,0.25)",
    backdropFilter: "blur(6px)",

    transition: "all 0.25s ease",
	 animation: "pulseGlow 2s infinite"
  }}
>
  {isSelected ? "✓ Added" : "View AI Comparison”"}
</button>

    </div>
  );
}