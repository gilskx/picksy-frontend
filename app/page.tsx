	"use client";

	import { useState, useEffect, useRef } from "react";
	import "./globals.css";
	import ChatWidget from "./ChatWidget";
	import HeroRecommendation from "./components/HeroRecommendation";
	import FiltersPanel from "./components/FiltersPanel";
	import LoadingSection from "./components/LoadingSection";
	import SearchBar from "./components/SearchBar";
	import ResultsSection from "./components/ResultsSection";
	import SuggestionChips from "./components/SuggestionChips";
	import { searchProducts, searchProductsStream } from "./services/searchService";
	import CompareBar from "./components/CompareBar";
	import CompareAIView from "./components/CompareAIView";
	import Footer from "./components/Footer";
	import { filterProducts } from "./utils/filterProducts";
	import Script from "next/script";
	
	export default function Home() {

	  const [query, setQuery] = useState("");
	  const [products, setProducts] = useState<any[]>([]);
	  
	  const [loading, setLoading] = useState(false);
	  const [aiActive, setAiActive] = useState(false);
	const [aiCompare, setAiCompare] = useState<any>(null);
	  const [recommendation, setRecommendation] = useState<any>(null);
	  const [whoShouldBuyBest, setWhoShouldBuyBest] = useState<any[]>([]);
const [whoShouldBuyCheaper, setWhoShouldBuyCheaper] = useState<any[]>([]);
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
const [eventSourceRef, setEventSourceRef] = useState<EventSource | null>(null);
const finalizingIntervalRef = useRef<any>(null);
const [showLocationPopup, setShowLocationPopup] = useState(false);
	  // Placeholder rotation
	  const placeholders = [
		"S",
		"Se",
		"Sea",
		"Sear",
		"Searc",
		"Search ",
		"Search a",
		"Search an",
		"Search any",
		"Search anyt",
		"Search anyth",
		"Search anythi",
		"Search anythin",
		"Search anything",
		"Search anything.",
		"Search anything..",
	  ];
	  const [dynamicPlaceholder, setDynamicPlaceholder] = useState(placeholders[0]);
const requestUserLocation = () => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      localStorage.setItem("user_latitude", String(position.coords.latitude));
      localStorage.setItem("user_longitude", String(position.coords.longitude));
      setShowLocationPopup(false);
    },
    () => {
      setShowLocationPopup(false);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 600000
    }
  );
};
	  useEffect(() => {
		let i = 0;
		const interval = setInterval(() => {
		  i = (i + 1) % placeholders.length;
		  setDynamicPlaceholder(placeholders[i]);
		}, 250);
		return () => clearInterval(interval);
	  }, []);
	  
	  // 🌍 FETCH USER CONTEXT (FAST - VERCEL HEADERS)
// 🌍 FETCH USER CONTEXT + BROWSER LOCATION
useEffect(() => {
  const fetchUserContext = async () => {
    try {
      const res = await fetch("/api/user-context");
      const data = await res.json();

      console.log("User Context:", data);

      localStorage.setItem("user_ip", data.ip || "");
      localStorage.setItem("user_country", data.country || "");
	  if (data.country === "US") {
		setShowLocationPopup(true);
}
      localStorage.setItem("user_city", data.city || "");

    } catch (err) {
      console.error("User context fetch failed", err);
    }
  };

  const fetchBrowserLocation = () => {
    if (!navigator.geolocation) {
      console.log("Browser geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        localStorage.setItem("user_latitude", String(position.coords.latitude));
        localStorage.setItem("user_longitude", String(position.coords.longitude));

        console.log("Browser Location:", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.log("User denied location or location unavailable", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 600000
      }
    );
  };

  fetchUserContext();
  //fetchBrowserLocation();
}, []);

	  const bestDeal = recommendation?.bestPick || null;

const handleCancelSearch = () => {

  // 🔥 STOP STREAM
  if (eventSourceRef) {
    eventSourceRef.close();
  }

  // 🔥 STOP ANIMATION
  if (finalizingIntervalRef.current) {
    clearInterval(finalizingIntervalRef.current);
  }

  // 🔥 RESET UI
  setLoading(false);
  setLoadingMessage("");
  setProducts([]);
  setRecommendation(null);
  setExplanation("");
  setConfidence(0);
  setCheaper(null);
  setWhoShouldBuyBest([]);
  setWhoShouldBuyCheaper([]);
  setAiActive(false);
    setHasSearched(false); 
};


	  // FILTER


	  // LOADING TEXT
	  
	  // SEARCH
	  const search = async () => {
  if (!query.trim()) return;

  setHasSearched(true);
  setLoading(true);
  setProducts([]);
  setRecommendation(null);
  setExplanation("");
  setAiActive(true);
  {loading && (
  <div style={{
    textAlign: "center",
    marginTop: "10px",
    fontSize: "14px",
    color: "#9ca3af"
  }}>
    {loadingMessage}
  </div>
)}
	// 🔥 SMART LOADING FLOW (10 seconds)
const steps = [
  `🔍 Searching for "${query}" across sources...`,
  "🌐 Scanning trusted marketplaces...",
  "💰 Comparing prices in real-time...",
  "⭐ Analyzing ratings & user feedback...",
  "🧠 Finding the best match for you...",
  "💡 Discovering smarter & cheaper alternatives...",
  "⚡ Finalizing your best & smarter options..."
];

let stepIndex = 0;

// 🔥 clear previous if exists
if (finalizingIntervalRef.current) {
  clearInterval(finalizingIntervalRef.current);
}

finalizingIntervalRef.current = setInterval(() => {
  setLoadingMessage(steps[stepIndex]);
  stepIndex++;

  if (stepIndex >= steps.length) {
    clearInterval(finalizingIntervalRef.current);
  }
}, 2000); // 🔥 2 seconds per message

  let fallbackUsed = false;

  const es = searchProductsStream(

  query,

  // ✅ LIVE BACKEND STAGE
  (stage) => {

    // 🔥 INTERCEPT FINAL STAGE
    if (stage.includes("Finalizing")) {

      // 🔥 CLEAR ANY OLD INTERVAL
      if (finalizingIntervalRef.current) {
        clearInterval(finalizingIntervalRef.current);
      }

      const steps = [
		"🔍 Searching across stores...",
		"🔍 Scanning marketplaces...",
		"🌐 Aggregating data...",
		"🤖 Applying AI intelligence...",
        "💰 Comparing prices...",
        "⭐ Checking ratings...",
		"🏆 Picking top deals...",
        "🧠 Finding best value...",
		"📊 Analyzing trends...",
		"📦 Checking availability...",
		"🔗 Matching trusted sources...",
		"📊 Running smart analysis...",
        "⚡ Finalizing Results...",
		"🚀 Preparing your results..."
      ];

      let i = 0;

      finalizingIntervalRef.current = setInterval(() => {
        setLoadingMessage(steps[i]);
        i++;

        if (i >= steps.length) {
          clearInterval(finalizingIntervalRef.current);
        }
      }, 390);

    } else {
      setLoadingMessage(stage);
    }
  },

  // ✅ DONE
  (data) => {

    // 🔥 STOP INTERVAL
    if (finalizingIntervalRef.current) {
      clearInterval(finalizingIntervalRef.current);
    }

    setLoading(false);
    setLoadingMessage("");

    if (Array.isArray(data)) {
      setProducts(data);
    } else {
      setProducts(data.products || []);
      setRecommendation(data.recommendation);
      setExplanation(data.reason || data.explanation);
      setConfidence(data.confidence || 0);
      setCheaper(data.cheaperAlternative || null);
      setWhoShouldBuyBest(data.who_should_buy_best || []);
      setWhoShouldBuyCheaper(data.who_should_buy_cheaper || []);
    }

    setAiActive(false);
  },

  // ❌ ERROR → fallback
  async () => {

    // 🔥 STOP INTERVAL
    if (finalizingIntervalRef.current) {
      clearInterval(finalizingIntervalRef.current);
    }

    if (fallbackUsed) return;
    fallbackUsed = true;

   const userContext = {
  ip: localStorage.getItem("user_ip"),
  country: localStorage.getItem("user_country"),
  city: localStorage.getItem("user_city"),
  latitude: localStorage.getItem("user_latitude"),
  longitude: localStorage.getItem("user_longitude")
};

    const data = await searchProducts(query, userContext);

    setProducts(data.products || []);
    setLoading(false);
    setAiActive(false);
  }
);

// 🔥 STORE EVENT SOURCE
setEventSourceRef(es);
};
	 
// SEARCH end
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
		
		
		{/* 🔥 GOOGLE ANALYTICS */}

  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-W1HC6LPE11"
    strategy="afterInteractive"
  />

  <Script id="ga-script">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-W1HC6LPE11');
    `}
  </Script>
{/* 🔥 GOOGLE ANALYTICS  End*/}
		
  <div className="nokku-page" style={{
  fontFamily: "Arial",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    background: `
linear-gradient(
  180deg,
  #dbeafe 0%,
  #eff6ff 38%,
  #f8fbff 100%
)
`,

color: "#0f172a"    //    color
  }}>

    {/* HEADER BADGE */}
    <div className="nokku-floating-logo" style={{
  position: "fixed",
  top: "15px",
      left: "20px",
      zIndex: 9999,
      background: "rgba(255,255,255,0.55)",
backdropFilter: "blur(12px)",
border: "1px solid rgba(255,255,255,0.4)",
boxShadow: "0 10px 35px rgba(59,130,246,0.08)",
      padding: "6px 14px",
      borderRadius: "20px",
      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
      fontWeight: "700",
      fontSize: "18px",
      backgroundImage: "linear-gradient(135deg, #22c1ff, #6c63ff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}>
      ✨ nokku.ai
    </div>

    {/* ✅ FIXED SEARCH BAR */}
    


{hasSearched && !loading && (
  <div style={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "8px",
    marginBottom: "0px"
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
        loading={loading}
      />
    </div>
  </div>
)}



			{/* HERO */}
			{!hasSearched && (
  <div className="nokku-hero" style={{
    padding: "40px 20px 30px",
				textAlign: "left",
				//color: "#fff"
				color: "inherit"
			  }}>
			  {/* MAIN HEADLINE */}
			   <div style={{
	  textAlign: "center",
	  marginBottom: "26px",
	  animation: "fadeInUp 0.6s ease",
	}}>

	  
	  <div style={{
		fontSize: "26px",
		fontWeight: "700",
		letterSpacing: "-0.3px",
		background: "linear-gradient(135deg, #22c1ff, #6c63ff)",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		textShadow: "0 4px 20px rgba(0,0,0,0.5)"
	  }}>
		Search anything, Decide smarter.
	  </div>

	  {/* SUB HEADLINE */}
	  <div style={{
  fontSize: "15px",
  marginTop: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  textAlign: "center",
  width: "100%",

  // 🔥 SAME GRADIENT AS TITLE
  background: "linear-gradient(135deg, #22c1ff, #6c63ff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
}}>
  <span style={{ opacity: 0.8 }}>✨</span>
  ✨nokku.ai finds the best match, cheaper alternatives, and compares real-time deals across multiple trusted sources — instantly.
</div>

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
	  {/* TRUST LINE */}
	  <div style={{
  marginTop: "8px",
  fontSize: "12px",

  // 🔥 FADED LOOK
  color: "#64748b",

  letterSpacing: "0.3px"
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

  paddingTop: hasSearched || loading ? "55px" : "12px",
  paddingBottom: "12px",
  paddingLeft: "0px",
  paddingRight: "0px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "stretch"
}}>
	  <div style={{ width: "100%" }}>   {/* ✅ ADD THIS WRAPPER */}

			  {/* FILTERS */}
			 

			 
			  <div>
			  
			  
			  
			  {/* for Back Button*/}
{loading && (
  <div style={{
    position: "fixed",
    top: "68px",
    left: "20px",
    zIndex: 1000
  }}>
    <button
      onClick={handleCancelSearch}
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        border: "1px solid rgba(59,130,246,0.4)",	
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: "0 8px 25px rgba(59,130,246,0.25)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 12px 35px rgba(59,130,246,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(59,130,246,0.25)";
      }}
    >
      <span style={{
        fontSize: "18px",
        color: "#60a5fa",
        fontWeight: "600"
      }}>
        ←
      </span>
    </button>
  </div>
)}

<HeroRecommendation
  recommendation={recommendation}
  confidence={confidence}
  cheaper={cheaper}
  recUrl={recUrl}
  aiActive={aiActive}
  mode={mode}
  setMode={setMode}
  who_should_buy_best={whoShouldBuyBest}
  who_should_buy_cheaper={whoShouldBuyCheaper}
/>
			 {/* for Back Button*/}

				
				

				
				
				
	 
	


{/* 🔥 RESULTS (only when not loading) */}
{/* 🔥 RESULTS */}
{hasSearched && (
  <div style={{
  width: "100%",
  maxWidth: "1200px",
  margin: "0",              // ✅ LEFT ALIGN
  padding: "0 16px",        // better mobile
  marginTop: "40px"
}}>
    <ResultsSection
      loading={loading && products.length === 0}
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
        background: "rgba(15,23,42,0.18)",
backdropFilter: "blur(6px)",



color: "#334155",

border: "1px solid rgba(255,255,255,0.45)",

boxShadow: "0 25px 60px rgba(148,163,184,0.18)",
        color: "#e5e7eb",
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
          <h2>About nokku.ai</h2>
          <p>About nokku.ai

nokku.ai is an AI-powered shopping and product discovery platform that helps users find the best products, smarter alternatives, and real-time deals across multiple trusted stores — all in one place.

Instead of manually searching across different websites, nokku.ai uses AI to compare prices, ratings, product quality, and overall value to recommend the best match for each user.

Users can explore products across categories like electronics, groceries, home appliances, fashion, baby products, health, and more while also discovering cheaper alternatives, comparing products side-by-side, and viewing insights powered by AI.

nokku.ai is designed to make online shopping faster, smarter, and more transparent.</p>
        </>
      )}

      {activeCard === "privacy" && (
        <>
          <h2>Privacy Policy</h2>
          <p>nokku is an AI-powered product discovery platform that helps users
        find the best products across multiple online stores.</p>
        </>
      )}

      {activeCard === "contact" && (
        <>
          <h2>Contact</h2>
          <p>
            For any questions or support, please reach out:
            <br />
            📧 Email: info@alginexa.com
            <br />
            We typically respond within 24–48 hours.
          </p>
        </>
      )}

    </div>
  </div>
)}
{showLocationPopup && (
  <>
  
    {/* 🔥 BACKDROP OVERLAY */}
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.18)",
        backdropFilter: "blur(6px)",
        zIndex: 9998
      }}
    />

    {/* 🔥 CENTER MODAL */}
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        width: "92%",
        maxWidth: "520px",

        zIndex: 9999,

        background: "rgba(255,255,255,0.78)",
backdropFilter: "blur(18px)",

        border: "1px solid rgba(34,193,255,0.25)",

        borderRadius: "28px",

        padding: "30px 26px",

        boxShadow: `
          0 25px 80px rgba(0,0,0,0.65),
          0 0 35px rgba(34,193,255,0.12)
        `
      }}
    >

      {/* 🔥 ICON */}
      <div
        style={{
          width: "68px",
          height: "68px",
          borderRadius: "50%",

          margin: "0 auto 18px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          background:
            "linear-gradient(135deg, rgba(34,193,255,0.18), rgba(108,99,255,0.18))",

          border: "1px solid rgba(34,193,255,0.25)",

          fontSize: "28px"
        }}
      >
        📍
      </div>

      {/* 🔥 TITLE */}
      <div
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "700",

          background:
            "linear-gradient(135deg, #22c1ff, #6c63ff)",

          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Use your location?
      </div>

      {/* 🔥 SUBTEXT */}
      <div
        style={{
          marginTop: "14px",

          textAlign: "center",

          fontSize: "14px",
          lineHeight: "24px",

          color: "#475569"
        }}
      >
        nokku.ai can show nearby stores,
        faster delivery options,
        and smarter local recommendations.
      </div>

      {/* 🔥 BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "14px",
          marginTop: "28px"
        }}
      >

        {/* ALLOW */}
        <button
          onClick={requestUserLocation}
          style={{
            flex: 1,

            height: "52px",

            borderRadius: "18px",

            border: "none",

            cursor: "pointer",

            fontSize: "15px",
            fontWeight: "700",

            color: "#ffffff",

            background:
              "linear-gradient(135deg, #22c1ff, #6c63ff)",

            boxShadow:
              "0 10px 30px rgba(34,193,255,0.28)",

            transition: "all 0.2s ease"
          }}
        >
          Allow
        </button>

        {/* NOT NOW */}
        <button
          onClick={() => setShowLocationPopup(false)}
          style={{
            flex: 1,

            height: "52px",

            borderRadius: "18px",

            cursor: "pointer",

            fontSize: "15px",
            fontWeight: "600",

            background: "transparent",

            color: "#cbd5e1",

            border:
              "1px solid rgba(255,255,255,0.12)",

            transition: "all 0.2s ease"
          }}
        >
          Not now
        </button>

      </div>
    </div>
  </>
)}
</div>   {/* MAIN container */}
</>
);
}
