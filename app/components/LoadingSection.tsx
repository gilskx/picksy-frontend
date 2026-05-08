"use client";
import "./globals.css";
export default function LoadingSection({ loading, loadingMessage, onCancel }: any) {


  if (!loading) return null;

  return (
    <>
      {/* 🔥 AI MESSAGE PANEL */}
      <div style={{
          background: "rgba(255,255,255,0.68)",

backdropFilter: "blur(18px)",

border: "1px solid rgba(59,130,246,0.14)",

boxShadow: "0 20px 50px rgba(59,130,246,0.08)", 
        padding: "18px",
        borderRadius: "12px",
        marginBottom: "20px",
        borderLeft: "5px solid #2c7be5"
      }}>
        <div style={{
         fontWeight: "700",
fontSize: "16px",
color: "#1e293b",
letterSpacing: "0.2px",
        }}>
          🤖 nokku.ai is working...
        </div>

        <div style={{
          marginTop: "10px",
          fontSize: "14px",
          color: "#555"
        }}>
          {loadingMessage}
        </div>
		
		<div style={{
  marginTop: "10px",
  fontSize: "14px",
  color: "#555"
}}>
  <div style={{
  marginTop: "12px",

  fontSize: "15px",

  color: "#334155",

  fontWeight: "500",

  lineHeight: "24px"
}}>
  {loadingMessage}
</div>
</div>

{/* 🔥 ADD BACK BUTTON HERE */}
<button
  onClick={onCancel}
  style={{
    marginTop: "12px",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(2,6,23,0.6)",
    color: "#93c5fd",
    cursor: "pointer",
    fontSize: "13px"
  }}
>
  ← Back
</button>
		
      </div>

      {/* 🔥 SKELETON CARDS */}
      <div className="nokku-loading-grid" style={{
  display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
              background: "#000000", 
            borderRadius: "16px",
            padding: "14px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            border: "1px solid #f0f0f0"
          }}>
            {/* IMAGE */}
            <div style={{
              height: "120px",
              background: "#eee",
              borderRadius: "8px"
            }} />

            {/* TITLE */}
            <div style={{
              height: "12px",
              background: "#eee",
              marginTop: "10px",
              borderRadius: "6px",
              width: "80%"
            }} />

            {/* SUBTITLE */}
            <div style={{
              height: "12px",
              background: "#eee",
              marginTop: "6px",
              borderRadius: "6px",
              width: "60%"
            }} />
          </div>
        ))}
      </div>
    </>
  );
}