"use client";

export default function Footer({ setActiveCard }: any) {
  return (
    <div style={{
      marginTop: "60px",
      padding: "30px 20px",
      textAlign: "center",
      borderTop: "1px solid rgba(255,255,255,0.1)",   // ✅ better for dark theme
      color: "#94a3b8",                               // ✅ softer text
      fontSize: "14px",
      background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.03))" // ✅ subtle premium feel
    }}>
      
      {/* LINKS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        marginBottom: "12px"
      }}>
        {[
          { label: "About", key: "about" },
          { label: "Privacy", key: "privacy" },
          { label: "Contact", key: "contact" }
        ].map((item) => (
          <span
            key={item.key}
            onClick={() => setActiveCard(item.key)}
            style={{
              cursor: "pointer",
              color: "#cbd5f5",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#38bdf8";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#cbd5f5";
            }}
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* COPYRIGHT */}
      <div style={{
        marginTop: "6px",
        fontSize: "12px",
        color: "#64748b"
      }}>
        © {new Date().getFullYear()} Alginexa LLC. All rights reserved.
      </div>

      {/* WEBSITE */}
      <div style={{ marginTop: "6px" }}>
        <a
          href="https://www.alginexa.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#38bdf8",
            textDecoration: "none",
            fontWeight: "500"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          www.alginexa.com
        </a>
      </div>

      {/* TAGLINE (updated) */}
      <div style={{
        marginTop: "10px",
        fontSize: "12px",
        color: "#64748b"
      }}>
        Free to use • No signup required
      </div>

    </div>
  );
}