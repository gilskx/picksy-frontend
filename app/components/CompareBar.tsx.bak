"use client";
import AIBalanceLoader from "./AIBalanceLoader";
export default function CompareBar({
  compareList,
  setShowComparePage
}: any) {

  if (!compareList || compareList.length < 2) return null;

  return (
    <div style={{	
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",

      // 🔥 UPDATED STYLE (clean + professional)
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      padding: "10px 16px",
      borderRadius: "40px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",

      display: "flex",              // ✅ FIXED (not grid)
      alignItems: "center",
      gap: "14px",

      zIndex: 999,
      border: "1px solid rgba(255,255,255,0.1)"
    }}>

      {/* TEXT */}
      <span style={{ 
        fontSize: "13px", 
        fontWeight: "500",
        color: "#e5e7eb"
      }}>
        {compareList.length} items selected
      </span>

      {/* BUTTON */}
      <button
        onClick={() => setShowComparePage(true)}
        style={{
          padding: "8px 16px",
          borderRadius: "20px",

          // 🔥 upgraded CTA
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          color: "#fff",
          border: "none",
          fontWeight: "600",
          fontSize: "13px",
          cursor: "pointer",

          transition: "all 0.2s ease"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Compare Now →
      </button>

    </div>
  );
}