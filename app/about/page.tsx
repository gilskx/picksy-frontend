export default function About() {
  return (
    <div style={{
      width: "100%",
      maxWidth: "100%",
      color: "#e2e8f0",          // 🔥 FIX: make text visible
      fontSize: "15px",
      lineHeight: "1.7"
    }}>

      {/* HEADER */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        paddingBottom: "12px",
        marginBottom: "20px"
      }}>
        <h1 style={{
          color: "#f8fafc",
          fontSize: "24px",
          fontWeight: "600"
        }}>
          About Picksy
        </h1>
      </div>

      {/* CONTENT */}
      <p style={{ marginBottom: "16px", color: "#cbd5f5" }}>
        Picksy is an AI-powered product discovery platform that helps users
        find the best products across multiple online stores.
      </p>

      <p style={{ marginBottom: "16px", color: "#cbd5f5" }}>
        Instead of browsing multiple websites, users can search once on Picksy
        and compare options from retailers like Amazon, Walmart, and eBay.
      </p>

      <p style={{ color: "#cbd5f5" }}>
        Our goal is to save time and help users make better buying decisions
        with transparent pricing, ratings, and recommendations.
      </p>

    </div>
  );
}