"use client";
import "./globals.css";
export default function LoadingSection({ loading, loadingMessage }: any) {

  if (!loading) return null;

  return (
    <>
      {/* 🔥 AI MESSAGE PANEL */}
      <div style={{
          background: "#000000", 
        padding: "18px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        borderLeft: "5px solid #2c7be5"
      }}>
        <div style={{
          fontWeight: "600",
          fontSize: "15px"
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
      </div>

      {/* 🔥 SKELETON CARDS */}
      <div style={{
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