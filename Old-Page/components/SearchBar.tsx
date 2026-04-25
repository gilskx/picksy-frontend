"use client";

import { useEffect, useState } from "react";

export default function SearchBar({
  query,
  setQuery,
  search,
  dynamicPlaceholder,
  isTyping,
  setIsTyping,
  hasSearched
}: any) {

  const defaultPlaceholders = [
    "cheap iphone",
    "laptop under 1000",
    "best headphones",
    "fitness tracker",
    "gaming laptop"
  ];

  const [placeholder, setPlaceholder] = useState(dynamicPlaceholder || defaultPlaceholders[0]);
  const [index, setIndex] = useState(0);

  // ✅ AUTOCOMPLETE STATE
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // ✅ GENERATE SUGGESTIONS
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

   //  const mockSuggestions = [
   //    `${query} under 500`,
  //    `best ${query}`,
   //    `${query} deals`,
  //     `${query} latest`,
   //    `cheap ${query}`,
  //   ];

 //    setSuggestions(mockSuggestions.filter(s => s && s.trim().length > 0));
  }, [query]);

  return (
    <div style={{
      marginTop: hasSearched ? "0px" : "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",

      position: hasSearched ? "sticky" : "relative",
      top: hasSearched ? "0px" : "auto",
      zIndex: hasSearched ? 1000 : "auto",

      background: "transparent",
      padding: hasSearched ? "10px 0" : "0px",
      boxShadow: hasSearched ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
      transition: "all 0.3s ease"
    }}>

      <div style={{
        background: "#fff",
        borderRadius: "40px",
        maxWidth: hasSearched ? "600px" : "700px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: hasSearched ? "8px" : "10px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease"
      }}>

       {/* ✨ ICON */}
<span
  style={{
    marginLeft: "8px",
    marginRight: "8px",
    fontSize: "18px",
    display: "inline-block",
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
  value={query}
  onFocus={() => {
    setIsTyping(true);
    setShowSuggestions(true);
  }}
  onBlur={() => {
    setTimeout(() => setShowSuggestions(false), 200);
    setIsTyping(false);
  }}
  onChange={(e) => {
    setQuery(e.target.value);
  }}
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
    padding: "10px 0",
    fontSize: hasSearched ? "14px" : "16px",
    background: "transparent",
    color: "#000"
  }}
/>

        {/* BUTTON */}
        <button
          onClick={() => {
            setShowSuggestions(false);
            search();
          }}
          style={{
            background: "#000",
            color: "#fff",
            borderRadius: "50%",
            width: "38px",
            height: "38px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "8px",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          🔍
        </button>

      </div>

      {/* ✅ AUTOCOMPLETE DROPDOWN */}
      {showSuggestions && query.length >= 2 && suggestions.length > 0 && (
        <div style={{
          width: "100%",
          maxWidth: hasSearched ? "600px" : "700px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
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

      {/* ✨ ANIMATION */}
      <style jsx>{`
        @keyframes twinkle {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.7; }
        }
      `}</style>

    </div>
  );
}