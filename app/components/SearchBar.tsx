"use client";

import { useEffect, useState, useRef } from "react";

export default function SearchBar({
  query,
  setQuery,
  search,
  dynamicPlaceholder,
  isTyping,
  setIsTyping,
  hasSearched,
  loading 
}: any) {

  const defaultPlaceholders = [
		"Search anything",

  ];

  const [focused, setFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState(dynamicPlaceholder || defaultPlaceholders[0]);
  const [index, setIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 🔥 AUTO FOCUS (ADDED)
 useEffect(() => {
  if (!loading && hasSearched) {
    inputRef.current?.focus();
    inputRef.current?.select();   // 🔥 bonus: highlight text
  }
}, [loading, hasSearched]);

  useEffect(() => {
    if (dynamicPlaceholder) {
      setPlaceholder(dynamicPlaceholder);
      return;
    }

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % defaultPlaceholders.length;
        setPlaceholder(defaultPlaceholders[next]);
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [dynamicPlaceholder]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }
  }, [query]);
  
  


  return (
  <div className="nokku-search-wrapper" style={{
  marginTop: hasSearched ? "0px" : "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",

  // 🔥 FIXED STICKY LOGIC
  
 position: hasSearched && query ? "sticky" : "relative",
top: hasSearched && query ? "82px" : "auto",
zIndex: hasSearched ? 900 : "auto",

  background: "transparent",

  // 🔥 REMOVE EMPTY SPACE WHEN NO QUERY
  padding: "0px",

 boxShadow: "none",

  transition: "all 0.3s ease"
}}>

  <div className="nokku-search-box" style={{
    background: "rgba(255,255,255,0.46)",
	border: "1px solid rgba(59,130,246,0.08)",
    backdropFilter: "blur(12px)",
    borderRadius: "40px",
    maxWidth: hasSearched ? "600px" : "700px",
    width: "100%",
    display: "flex",
    alignItems: "center",
	padding: hasSearched ? "1px 4px" : "1px 5px",
    boxShadow: focused
      ? "0 0 0 2px rgba(59,130,246,0.5), 0 10px 40px rgba(59,130,246,0.35)"
      : "0 10px 40px rgba(59,130,246,0.25)",
    transition: "all 0.3s ease"
  }}>

    {/* ICON */}
    <span
      style={{
        marginLeft: "8px",
        marginRight: "6px",
        fontSize: "12px",
        fontWeight: "600",
        animation: isTyping ? "twinkle 1.2s ease-in-out infinite" : "none",
        textShadow: isTyping
          ? "0 0 12px rgba(255,215,0,1)"
          : "0 0 6px rgba(255,215,0,0.6)"
      }}
    >
      ✨
    </span>

    {/* INPUT */}
    <input
      ref={inputRef}
      value={query}
      onFocus={() => {
        setIsTyping(true);
        setShowSuggestions(true);
        setFocused(true);
      }}
      onBlur={() => {
        setTimeout(() => setShowSuggestions(false), 200);
        setIsTyping(false);
        setFocused(false);
      }}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.repeat) {
          setShowSuggestions(false);
          search();
        }
      }}
      placeholder={placeholder}
      spellCheck={false}
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        padding: "6px 0",
        fontSize: hasSearched ? "16px" : "18px",
        background: "transparent",
        color: "#22c1ff",
        caretColor: "#22c1ff"
      }}
    />

    {/* BUTTON */}
{/* BUTTON */}
<button
  disabled={!query.trim()}
  onClick={() => {
    if (!query.trim()) return;

    setShowSuggestions(false);
    search();
  }}
  style={{
    background: query.trim()
      ? "rgba(255,255,255,0.78)"
      : "rgba(148,163,184,0.25)",

    borderRadius: "50%",
    width: "42px",
    height: "42px",

    border: query.trim()
      ? "1px solid rgba(59,130,246,0.25)"
      : "1px solid rgba(148,163,184,0.20)",

    cursor: query.trim() ? "pointer" : "not-allowed",

    opacity: query.trim() ? 1 : 0.55,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    marginLeft: "6px",

    boxShadow: query.trim()
      ? "0 8px 24px rgba(59,130,246,0.28)"
      : "none",

    transition: "all 0.2s ease",
    position: "relative",
    zIndex: 5,
    overflow: "hidden",
    WebkitTapHighlightColor: "transparent"
  }}
  onMouseOver={(e) => {
    if (!query.trim()) return;
    e.currentTarget.style.transform = "scale(1.08)";
    e.currentTarget.style.boxShadow =
      "0 10px 28px rgba(59,130,246,0.35)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = query.trim()
      ? "0 8px 24px rgba(59,130,246,0.28)"
      : "none";
  }}
  onTouchStart={(e) => {
    if (!query.trim()) return;
    e.currentTarget.style.transform = "scale(0.95)";
  }}
  onTouchEnd={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
  <img
    src="/nokku-icon.png"
    alt="Search"
    style={{
      width: "34px",
      height: "34px",
      objectFit: "cover",
      borderRadius: "50%",
      display: "block",

      WebkitMaskImage:
        "radial-gradient(circle, black 68%, rgba(0,0,0,0.85) 82%, transparent 100%)",
      maskImage:
        "radial-gradient(circle, black 68%, rgba(0,0,0,0.85) 82%, transparent 100%)"
    }}
  />
</button>

  </div>

  {/* AUTOCOMPLETE */}
  {showSuggestions && query.length >= 2 && suggestions.length > 0 && (
    <div style={{
      width: "100%",
      maxWidth: hasSearched ? "600px" : "700px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: `
  0 15px 45px rgba(59,130,246,0.12),
  0 0 0 1px rgba(255,255,255,0.4)`,
      marginTop: "6px",
      overflow: "hidden"
    }}>
      {suggestions.filter(s => s && s.trim()).map((s, i) => (
        <div
          key={i}
          onClick={() => {
            setQuery(s);
            setShowSuggestions(false);
            search();
          }}
          style={{
            padding: "10px",
            cursor: "pointer",
            borderBottom: "1px solid #eee",
            color: "#111827"
          }}
        >
          {s}
        </div>
      ))}
    </div>
  )}

  <style jsx>{`
    @keyframes twinkle {
      0% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 0.7; }
    }

    input::placeholder {
      color: rgba(34, 193, 255, 0.4);
      font-family: 'Outfit', sans-serif;
      font-weight: 300;
      letter-spacing: 0.3px;
    }
  `}</style>

</div>
  );
}