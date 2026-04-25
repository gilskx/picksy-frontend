"use client";

export default function FiltersPanel({
  searchInResults,
  setSearchInResults,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}: any) {
  return (
    <div
      style={{
        width: "260px",
        background: "#000000",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        height: "fit-content",
        position: "sticky",
        top: "20px"
      }}
    >
      <h3>Filters</h3>

      {/* Search in results */}
      <input
        className="dark-input"
        placeholder="Search in results"
        value={searchInResults}
        onChange={(e) => setSearchInResults(e.target.value)}
        style={{
          background: "#000000",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#f8fafc",
          fontSize: "14px",
          outline: "none",
          padding: "10px 12px",
          borderRadius: "8px",
          marginBottom: "10px",
          width: "100%"
        }}
      />

      {/* Max price */}
      <input
        placeholder="Max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={{
          background: "#000000",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#f8fafc",
          padding: "8px 12px",
          borderRadius: "8px",
          marginBottom: "10px",
          width: "100%",
          fontSize: "14px",
          outline: "none"
        }}
      />
    </div>
  );
}