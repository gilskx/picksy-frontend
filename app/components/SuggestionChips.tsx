"use client";

import { useState } from "react";

export default function SuggestionChips({ setQuery, query, search }: any) {

  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

 const categories = [
  {
    title: "🛒 Groceries",
    items: [
      "Grocery essentials",
      "Fresh produce",
      "Healthy snacks"
    ]
  },
  {
    title: "💊 Medicine",
    items: [
      "Cold & flu medicine",
      "Pain relief",
      "Daily wellness"
    ]
  },
  {
    title: "📱 Electronics",
    items: [
      "iPhone 16",
      "Gaming laptops",
      "Wireless headphones"
    ]
  },
  {
    title: "🏠 Home",
    items: [
      "Kitchen appliances",
      "Smart home devices",
      "Home essentials"
    ]
  },
  {
    title: "👶 Baby",
    items: [
      "Baby care",
      "Diapers",
      "Baby strollers"
    ]
  },
  {
    title: "👗 Women",
    items: [
      "Women fashion",
      "Handbags",
      "Sneakers"
    ]
  },
  {
    title: "👔 Men",
    items: [
      "Men fashion",
      "Watches",
      "Sneakers"
    ]
  },
  {
    title: "💪 Health",
    items: [
      "Protein powder",
      "Fitness trackers",
      "Health supplements"
    ]
  },
  {
    title: "⌚ Accessories",
    items: [
      "Smart watches",
      "Travel bags",
      "Sunglasses"
    ]
  },
  {
    title: "🎮 Gaming",
    items: [
      "Gaming consoles",
      "Gaming chairs",
      "Gaming accessories"
    ]
  }
];
  return (
    <div
      style={{
        marginTop: "22px",
        width: "100%",
        maxWidth: "1050px",
        marginInline: "auto",
        padding: "0 12px"
      }}
    >

      {categories.map((cat, idx) => {

        const emoji = cat.title.split(" ")[0];
        const text = cat.title.split(" ").slice(1).join(" ");

        return (
          <div
            key={idx}
            style={{
              marginBottom: "22px"
            }}
          >

            {/* 🔥 CATEGORY TITLE */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",

                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.4px",

                color: "#dbeafe",

                textTransform: "uppercase",

                opacity: 0.95
              }}
            >
              <span style={{ fontSize: "14px" }}>
                {emoji}
              </span>

              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #38bdf8, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {text}
              </span>
            </div>

            {/* 🔥 CHIP ROW */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px"
              }}
            >
              {cat.items.map((s: string, i: number) => {

                const isSelected = selectedSuggestion === s;

                return (
                  <div
                    key={i}

                    onClick={() => {

                      // ✅ FIRST CLICK → SELECT ONLY
                      if (selectedSuggestion !== s) {
                        setSelectedSuggestion(s);
                        setQuery(s);
                        return;
                      }

                      // ✅ SECOND CLICK SAME ITEM → SEARCH
                      search(s);
                    }}

                    style={{
                      padding: "10px 18px",
                      borderRadius: "999px",

                      fontSize: "13px",
                      fontWeight: 500,

                      cursor: "pointer",
                      userSelect: "none",

                      transition: "all 0.22s ease",

                      backdropFilter: "blur(10px)",

                      border: isSelected
                        ? "1px solid rgba(96,165,250,0.55)"
                        : "1px solid rgba(255,255,255,0.08)",

                      background: isSelected
                        ? "linear-gradient(135deg, rgba(34,193,255,0.18), rgba(108,99,255,0.18))"
                        : "rgba(255,255,255,0.02)",

                      color: isSelected
                        ? "#ffffff"
                        : "#38bdf8",

                      boxShadow: isSelected
                        ? "0 0 18px rgba(34,193,255,0.22)"
                        : "0 0 0 rgba(0,0,0,0)"
                    }}

                    onMouseEnter={(e) => {

                      if (isSelected) return;

                      const el = e.currentTarget;

                      el.style.transform = "translateY(-2px)";
                      el.style.border =
                        "1px solid rgba(96,165,250,0.35)";
                      el.style.background =
                        "rgba(255,255,255,0.04)";
                      el.style.color = "#ffffff";
                    }}

                    onMouseLeave={(e) => {

                      if (isSelected) return;

                      const el = e.currentTarget;

                      el.style.transform = "translateY(0px)";
                      el.style.border =
                        "1px solid rgba(255,255,255,0.08)";
                      el.style.background =
                        "rgba(255,255,255,0.02)";
                      el.style.color = "#38bdf8";
                    }}
                  >
                    {s}
                  </div>
                );
              })}
            </div>

          </div>
        );
      })}

    </div>
  );
}