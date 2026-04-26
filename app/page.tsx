	"use client";

	import { useState, useEffect } from "react";
	import "./globals.css";
	import ChatWidget from "./ChatWidget";
	import HeroRecommendation from "./components/HeroRecommendation";
	import FiltersPanel from "./components/FiltersPanel";
	import LoadingSection from "./components/LoadingSection";
	import SearchBar from "./components/SearchBar";
	import ResultsSection from "./components/ResultsSection";
	import SuggestionChips from "./components/SuggestionChips";
	import { searchProducts } from "./services/searchService";
	import CompareBar from "./components/CompareBar";
	import CompareAIView from "./components/CompareAIView";
	import Footer from "./components/Footer";
	import { filterProducts } from "./utils/filterProducts";
	export default function Home() {

	  const [query, setQuery] = useState("");
	  const [products, setProducts] = useState<any[]>([]);
	  
	  const [loading, setLoading] = useState(false);
	  const [aiActive, setAiActive] = useState(false);
	const [aiCompare, setAiCompare] = useState<any>(null);
	  const [recommendation, setRecommendation] = useState<any>(null);
	  const [explanation, setExplanation] = useState("");
	const [activeCard, setActiveCard] = useState<string | null>(null);
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
				const filteredProducts = filterProducts(products, {
			  minPrice,
			  maxPrice,
			  searchInResults
			});
	  const displayProducts =
  mode === "best"
    ? filteredProducts.some(p => p.name === recommendation?.bestPick?.name)
        ? filteredProducts.filter(p => p.name === recommendation?.bestPick?.name)
        : products.filter(p => p.name === recommendation?.bestPick?.name) // fallback
    : mode === "cheap"
    ? filteredProducts.some(p => p.name === cheaper?.name)
        ? filteredProducts.filter(p => p.name === cheaper?.name)
        : products.filter(p => p.name === cheaper?.name) // fallback
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


	// 👇 REPLACE ENTIRE BLOCK
	if (showComparePage) {
	  return (
		<CompareAIView 
	  compareList={compareList} 
	  onBack={() => {
	  setShowComparePage(false);
	  setCompareList([]);   // 🔥 clear selection
	}}
	/>
		
	  );
	}
	  return (
	  <>
		
  <div style={{
    fontFamily: "Arial",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    background: `
      radial-gradient(circle at 20% 30%, rgba(0, 198, 255, 0.25), transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.25), transparent 40%),
      linear-gradient(135deg, #0f172a, #1e293b)
    `,
    backgroundBlendMode: "screen",
    color: "#e2e8f0"
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
      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
      fontWeight: "700",
      fontSize: "18px",
      backgroundImage: "linear-gradient(135deg, #facc15, #f59e0b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}>
      ✨ Picksy Ai
    </div>

    {/* ✅ FIXED SEARCH BAR */}
    <div style={{
      position: "sticky",
      top: "20px",
      zIndex: 1000,
      width: "100%",
      display: "flex",
      justifyContent: "center"
    }}>
      <div style={{ width: "100%", maxWidth: "700px" }}>
        <SearchBar
           query={query}
  setQuery={setQuery}
  search={search}
  dynamicPlaceholder={dynamicPlaceholder}
  isTyping={isTyping}
  setIsTyping={setIsTyping}
  hasSearched={hasSearched}
  loading={loading}   // ✅ ADD THIS
        />
      </div>
    </div>





			{/* HERO */}
			{!hasSearched && (
			  <div style={{
			  //  background: "linear-gradient(180deg,#6fa8dc,#3c78d8)",
				padding: "80px 20px 60px",
				textAlign: "center",
				//color: "#fff"
				color: "inherit"
			  }}>
			   <div style={{
	  textAlign: "center",
	  marginBottom: "26px",
	  animation: "fadeInUp 0.6s ease",
	}}>

	  {/* MAIN HEADLINE */}
	  <div style={{
		fontSize: "26px",
		fontWeight: "700",
		letterSpacing: "-0.3px",
		background: "linear-gradient(135deg, #38bdf8, #6366f1)",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		textShadow: "0 4px 20px rgba(0,0,0,0.5)"
	  }}>
		Stop searching. Start choosing.
	  </div>

	  {/* SUB HEADLINE */}
	  <div style={{
		fontSize: "15px",
		color: "#94a3b8",
		marginTop: "8px",
		display: "flex",
		justifyContent: "flex-start",
alignItems: "stretch",
		gap: "6px"
	  }}>
		<span style={{ opacity: 0.8 }}>✨</span>
		Find your best deal, instantly.
	  </div>

	  {/* TRUST LINE */}
	  <div style={{
		marginTop: "8px",
		fontSize: "12px",
		color: "#64748b"
	  }}>
		Powered by AI • Real-time deals • Trusted sources
	  </div>

	</div>

				

				<SuggestionChips setQuery={setQuery} search={search} />
			  </div>
			)}

			{/* MAIN */}
		  {/* MAIN */}
	<div style={{
	  minHeight: "calc(100vh - 120px)",
	  display: "flex",
	  flexDirection: "column",
	  justifyContent: "flex-start",
		alignItems: "stretch",
	  padding: "20px"
	}}>
	  <div style={{ width: "100%" }}>   {/* ✅ ADD THIS WRAPPER */}

			  {/* FILTERS */}
			 

			 
			  <div>
			  
			  {/* ✅ COMPARE PANEL (SAFE INSERT) */}


				{/* SORT DROPDOWN */}
				

				<HeroRecommendation
				recommendation={recommendation}
				confidence={confidence}
				  cheaper={cheaper}
				  recUrl={recUrl}
				  aiActive={aiActive}
				  mode={mode}
				  setMode={setMode}
				/>

	 
	{/* 🔥 LOADING (always visible when active - removed this block) */}


{/* 🔥 RESULTS (only when not loading) */}
{/* 🔥 RESULTS */}
{hasSearched && (
  <div style={{
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "200px"
  }}>
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
      mode={mode}
      setMode={setMode}
      searchInResults={searchInResults}
      setSearchInResults={setSearchInResults}
      minPrice={minPrice}
      setMinPrice={setMinPrice}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  </div>
)}

	</div>   {/* ✅ closes: <div style={{ flex: 1 }}> */}
	</div>   {/* closes: width:100% */}
	
	</div>   {/*🔥 CLOSE MAIN container HERE */}
	

		<ChatWidget />
			<Footer setActiveCard={setActiveCard} />
			{activeCard && (
  <div
    onClick={() => setActiveCard(null)}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "80%",
        maxWidth: "900px",
        minHeight: "300px",
        padding: "40px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "#e2e8f0",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        position: "relative"
      }}
    >

      {/* CLOSE BUTTON */}
      <div
        onClick={() => setActiveCard(null)}
        style={{
          position: "absolute",
          top: "12px",
          right: "16px",
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "600"
        }}
      >
        ✕
      </div>

      {/* CONTENT */}
      {activeCard === "about" && (
        <>
          <h2>About Picksy AI</h2>
          <p>Picksy is an AI-powered product discovery platform...</p>
        </>
      )}

      {activeCard === "privacy" && (
        <>
          <h2>Privacy Policy</h2>
          <p>We do not store personal data...</p>
        </>
      )}

      {activeCard === "contact" && (
        <>
          <h2>Contact</h2>
          <p>
            For any questions or support, please reach out:
            <br />
            📧 Email: your-email@domain.com
            <br />
            We typically respond within 24–48 hours.
          </p>
        </>
      )}

    </div>
  </div>
)}
</div>   {/* MAIN container */}
</>
);
}
