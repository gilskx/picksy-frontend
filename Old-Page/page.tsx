"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import ChatWidget from "./ChatWidget";
import RecommendationCard from "./components/RecommendationCard";
import FiltersPanel from "./components/FiltersPanel";
import LoadingSection from "./components/LoadingSection";
import SearchBar from "./components/SearchBar";
import ResultsSection from "./components/ResultsSection";
import SuggestionChips from "./components/SuggestionChips";
import { searchProducts } from "./services/searchService";
import CompareBar from "./components/CompareBar";
export default function Home() {

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiActive, setAiActive] = useState(false);

  const [recommendation, setRecommendation] = useState<any>(null);
  const [explanation, setExplanation] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchInResults, setSearchInResults] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Analyzing your request...");
  const [confidence, setConfidence] = useState(0);

  const [cheaper, setCheaper] = useState<any>(null);
  const [mode, setMode] = useState<"all" | "best" | "cheap" | "balanced">("all");
const [compareList, setCompareList] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [sortBy, setSortBy] = useState("best");
  const [showComparePage, setShowComparePage] = useState(false);

  // Placeholder rotation
  const placeholders = [
    "cheap iphone",
    "laptop under 1000",
    "best headphones",
    "fitness tracker",
    "gaming laptop"
  ];
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % placeholders.length;
      setDynamicPlaceholder(placeholders[i]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const bestDeal = recommendation?.bestPick || null;

  // FILTER
  useEffect(() => {
    let updated = [...products];

    if (minPrice) updated = updated.filter(p => p.price >= Number(minPrice));
    if (maxPrice) updated = updated.filter(p => p.price <= Number(maxPrice));

    if (searchInResults) {
      updated = updated.filter(p =>
        p.name?.toLowerCase().includes(searchInResults.toLowerCase())
      );
    }

    setFilteredProducts(updated);
  }, [products, minPrice, maxPrice, searchInResults]);

  // LOADING TEXT
  useEffect(() => {
    if (!loading) return;

    const messages = [
      "🔍 Searching across Amazon, Walmart, eBay...",
      "💰 Comparing prices...",
      "⭐ Checking ratings...",
      "🚀 Shortlisting...",
      "🤖 AI finalizing..."
    ];

    let i = 0;

    const interval = setInterval(() => {
      setLoadingMessage(messages[i % messages.length]);
      i++;
    }, 1200);

    return () => clearInterval(interval);
  }, [loading]);
		
  // SEARCH
  const search = async () => {
    if (!query.trim()) return;

    setHasSearched(true);
    setLoading(true);
    setProducts([]);
    setRecommendation(null);
    setExplanation("");
    setAiActive(true);

    try {
      const data = await searchProducts(query);

      if (data.products) {
        setProducts(data.products);
        setRecommendation(data.recommendation);
        setExplanation(data.reason || data.explanation);
        setConfidence(data.confidence || 0);
        setCheaper(data.cheaperAlternative || null);
      } else if (Array.isArray(data)) {
        setProducts(data);
      }

    } catch (e) {
      console.error(e);
    }

    setLoading(false);
    setAiActive(false);
  };

  const recUrl = bestDeal?.url || bestDeal?.link;

  const displayProducts =
    mode === "best"
      ? filteredProducts.filter(p => p.name === recommendation?.bestPick?.name)
      : mode === "cheap"
      ? filteredProducts.filter(p => p.name === cheaper?.name)
      : filteredProducts;

  // ✅ SORTING LOGIC
  const sortedProducts = [...displayProducts].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });
  
  const [p1, p2] = compareList;

const score = (p: any) =>
  (p.rating || 0) * 2 - (p.price || 0) / 100;

const winner = p2 ? (score(p1) >= score(p2) ? p1 : p2) : null;
const loser = p2 ? (winner === p1 ? p2 : p1) : null;
if (showComparePage) {

  const score = (p: any) =>
    (p.rating || 0) * 2 - ((p.price && p.price > 0 ? p.price : 10000) / 100);

  const [p1, p2] = compareList;
  const winner = p2 ? (score(p1) >= score(p2) ? p1 : p2) : null;
  const loser = p2 ? (winner === p1 ? p2 : p1) : null;

  return (
    <div style={{
      padding: "30px",
      fontFamily: "Arial",
        background: "#000000", 
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>

      {/* BACK */}
      <button
        onClick={() => {
          setShowComparePage(false);
          setCompareList([]);
        }}
        style={{
          marginBottom: "20px",
          padding: "8px 14px",
          borderRadius: "20px",
          border: "none",
           background: "#000000", 
          color: "#fff",
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      <h2 style={{
        fontSize: "24px",
        fontWeight: "700",
        textAlign: "center"
      }}>
        Compare Products
      </h2>

      <div style={{ width: "100%", maxWidth: "1100px" }}>

        <div style={{
          display: "flex",
          height: "calc(100vh - 140px)",
          gap: "20px"
        }}>

          {/* LEFT → PRODUCTS */}
          <div style={{
            flex: 3,
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap"
          }}>
            {compareList.map((p: any, i: number) => {

              const link = (p.url || p.link)
                ? (p.url || p.link).startsWith("http")
                  ? (p.url || p.link)
                  : `https://${p.url || p.link}`
                : null;

              return (
                <div
                  key={i}
                  style={{
                      background: "#000000", 
                    padding: "16px",
                    borderRadius: "16px",
                    width: "240px",
                    height: "380px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    border: p.name === winner?.name
                      ? "2px solid #22c55e"
                      : "1px solid #e5e7eb"
                  }}
                >

                  {/* WINNER */}
                  {winner && p.name === winner.name && (
                    <div style={{
                        background: "#000000", 
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      position: "absolute",
                      top: "10px",
                      right: "10px"
                    }}>
                      🏆 Best Choice
                    </div>
                  )}

                  {/* LOSER */}
                  {loser && p.name === loser.name && (
                    <div style={{
                        background: "#000000", 
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      position: "absolute",
                      top: "10px",
                      right: "10px"
                    }}>
                      💰 Budget
                    </div>
                  )}

                  {/* IMAGE */}
                  <div style={{
                    height: "110px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <img
                      src={p.image || "https://via.placeholder.com/150"}
                      style={{ maxHeight: "100%" }}
                    />
                  </div>

                  {/* NAME */}
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    minHeight: "40px"
                  }}>
                    {p.name
                      ? (p.name.length > 60
                          ? p.name.substring(0, 60) + "..."
                          : p.name)
                      : "Unknown Product"}
                  </div>

                  {/* PRICE */}
                  {p.price && p.price > 0 ? (
                    <div style={{ fontSize: "18px", fontWeight: "700" }}>
                      ${p.price}
                    </div>
                  ) : (
                    link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "12px",
                          color: "#2563eb",
                          textDecoration: "underline"
                        }}
                      >
                        Check price on site →
                      </a>
                    )
                  )}

                  {/* RATING */}
                  <div style={{ fontSize: "12px", color: "#f59e0b" }}>
                    ⭐ {p.rating || "N/A"}
                  </div>

                  {/* SOURCE */}
                  <div style={{ fontSize: "11px", color: "#6b7280" }}>
                    {p.source?.toUpperCase()}
                  </div>

                  {/* BUTTON */}
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "10px",
                          background: "#000000", 
                        color: "#fff",
                        borderRadius: "20px",
                        textAlign: "center",
                        fontSize: "13px",
                        textDecoration: "none"
                      }}
                    >
                      View Deal →
                    </a>
                  )}

                </div>
              );
            })}
          </div>

          {/* RIGHT → AI INSIGHT */}
          {winner && loser && (
            <div style={{
              flex: 2,
               background: "#000000", 
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>

              <div style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "10px"
              }}>
                🧠 AI Insight
              </div>

              <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
                ✔ <b>{winner.name}</b> offers better overall value <br />
                ✔ <b>{loser.name}</b> is more budget-friendly but slightly lower quality
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
  return (
  <>
    <div style={{
      fontFamily: "Arial",
      minHeight: "100vh",
	     
      background: `
        radial-gradient(circle at 20% 30%, rgba(0, 198, 255, 0.25), transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.25), transparent 40%),
        linear-gradient(135deg, #0f172a, #1e293b)
      `,
	  background: "#000000", 
      backgroundBlendMode: "screen",
    //  color: "#fff"
    }}>
      

        {/* HEADER BADGE */}
        <div style={{
  position: "fixed",
  top: "15px",
  left: "20px",
  zIndex: 1000,
  background: "#000000",
  padding: "6px 14px",
  borderRadius: "20px",
  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",   // 🎨 comic style
  fontWeight: "700",
  fontSize: "14px",
  backgroundImage: "linear-gradient(135deg, #facc15, #f59e0b)", // 🟡 gold
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",                      // 👈 makes text gold
}}>
  ✨ Picksy Ai
</div>

        {/* STICKY SEARCH */}
        {hasSearched && (
  <div style={{
    position: "sticky",
    top: "12px",                 // 👈 creates floating gap
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",   // 👈 center align
    pointerEvents: "none"       // 👈 important (see below)
  }}>
            <div style={{
  pointerEvents: "auto",                // 👈 re-enable clicks
  width: "100%",
  maxWidth: "600px",                   // 👈 smaller floating width
  background: "#000000",
  borderRadius: "40px",
  padding: "10px 16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",  // 👈 floating effect
  backdropFilter: "blur(12px)"
}}>
              <SearchBar
                query={query}
                setQuery={setQuery}
                search={search}
                dynamicPlaceholder={dynamicPlaceholder}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
                hasSearched={true}
              />
            </div>
          </div>
        )}

        {/* HERO */}
        {!hasSearched && (
          <div style={{
          //  background: "linear-gradient(180deg,#6fa8dc,#3c78d8)",
            padding: "80px 20px 60px",
            textAlign: "center",
            color: "#fff"
          }}>
            <h1>Your deal, instantly.</h1>

            <SearchBar
              query={query}
              setQuery={setQuery}
              search={search}
              dynamicPlaceholder={dynamicPlaceholder}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
              hasSearched={false}
            />

            <SuggestionChips setQuery={setQuery} search={search} />
          </div>
        )}

        {/* MAIN */}
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "30px 20px",
          display: "flex",
          gap: "20px"
        }}>

          {/* FILTERS */}
         

         
          <div style={{ flex: 1 }}>
		  
		  {/* ✅ COMPARE PANEL (SAFE INSERT) */}


            {/* SORT DROPDOWN */}
            

            <RecommendationCard
              recommendation={recommendation}
              explanation={explanation}
              confidence={confidence}
              cheaper={cheaper}
              recUrl={recUrl}
              aiActive={aiActive}
              mode={mode}
              setMode={setMode}
            />

 
{hasSearched && !loading && (
  <div style={{
    display: "flex",
    gap: "12px",
    marginBottom: "15px",
    flexWrap: "wrap",
	
    alignItems: "center",
    justifyContent: "space-between"
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
          padding: "8px 12px",
          borderRadius: "20px",
          border: "1px solid #ccc",
          minWidth: "180px"
        }}
      />

      {/* MIN */}
      <input
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "20px",
          border: "1px solid #ccc",
          width: "120px"
        }}
      />

      {/* MAX */}
      <input
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "20px",
          border: "1px solid #ccc",
          width: "120px"
        }}
      />

    </div>

    {/* RIGHT SIDE → SORT */}
    <div style={{ position: "relative" }}>

  <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  style={{
    padding: "8px 16px",
    borderRadius: "25px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "#000000", 
    backdropFilter: "blur(10px)",
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    minWidth: "160px"
  }}
>

  <option style={{ background: "#000000",  color: "#e2e8f0" }} value="best">
    Best Match
  </option>

  <option style={{ background: "#000000",  color: "#e2e8f0" }} value="priceLow">
    Price: Low to High
  </option>

  {/* ✅ ADD THIS */}
  <option style={{ background: "#000000",  color: "#e2e8f0" }} value="priceHigh">
    Price: High to Low
  </option>

  {/* ✅ ADD THIS */}
  <option style={{ background: "#000000",  color: "#e2e8f0" }} value="rating">
    Top Rated
  </option>

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
)}
            <ResultsSection
              loading={loading}
              query={query}
              displayProducts={sortedProducts}
              recommendation={recommendation}
              cheaper={cheaper}
              bestDeal={bestDeal}
			    compareList={compareList}
			setCompareList={setCompareList}
			setShowComparePage={setShowComparePage}
			hasSearched={hasSearched}
			loadingMessage={loadingMessage}
            />
          </div>
        </div>
      </div>
		<CompareBar
		  compareList={compareList}
		  setShowComparePage={setShowComparePage}
		/>
      <ChatWidget />
    </>
  );
}