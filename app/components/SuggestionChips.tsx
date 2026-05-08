"use client";

import { useState } from "react";

export default function SuggestionChips({ setQuery, query, search }: any) {

  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const categories = [
    {
      title: "🛒 Groceries",
      items: [
        "Milk delivery near me",
        "Rice deals",
        "Fresh vegetables nearby"
      ]
    },
    {
      title: "💊 Medicine",
      items: [
        "Fever relief tablets",
        "Cold & flu relief",
        "Pain relief options"
      ]
    },
    {
      title: "📱 Electronics",
      items: [
        "iPhone deals",
        "Laptops under $1000",
        "Headphone deals"
      ]
    },
    {
      title: "🏠 Home appliances",
      items: [
        "Washing machine deals",
        "Refrigerator deals",
        "Kitchen appliances"
      ]
    },
    {
      title: "👶 Baby",
      items: [
        "Baby diaper deals",
        "Baby care essentials"
      ]
    },
    {
      title: "💪 Health",
      items: [
        "Protein powder deals",
        "Fitness tracker deals",
        "Health supplements"
      ]
    }
  ];

  return (
    <div style={{ marginTop: "16px" }}>

      {categories.map((cat, idx) => {

        const emoji = cat.title.split(" ")[0];
        const text = cat.title.split(" ").slice(1).join(" ");

        return (
          <div key={idx} style={{ marginBottom: "14px" }}>

            {/* 🔥 CATEGORY TITLE */}
            <div
              style={{
                fontSize: "12px",
                marginBottom: "6px",
                textAlign: "center",
                letterSpacing: "0.6px",
                fontWeight: "600",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s ease",
                textShadow: "0 0 8px rgba(34,193,255,0.25)"
              }}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >

              <span>{emoji}</span>

              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #38bdf8, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {text}
              </span>

            </div>

            {/* 🔥 CHIPS */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px"
              }}
            >
              {cat.items.map((s: string, i: number) => {

                const isSelected = selectedSuggestion === s;

                return (
                  <div
                    key={i}

                    onClick={() => {

                      // ✅ FIRST CLICK → ONLY SELECT
                      if (selectedSuggestion !== s) {
                        setSelectedSuggestion(s);
                        setQuery(s);
                        return;
                      }

                      // ✅ SECOND CLICK SAME ITEM → SEARCH
                      search(s);
                    }}

                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",

                      background: isSelected
                        ? "linear-gradient(135deg, #22c1ff, #6c63ff)"
                        : "transparent",

                      backgroundImage: isSelected
                        ? "none"
                        : "linear-gradient(135deg, #22c1ff, #6c63ff)",

                      WebkitBackgroundClip: isSelected ? "initial" : "text",
                      WebkitTextFillColor: isSelected ? "#ffffff" : "transparent",

                      color: isSelected
                        ? "#ffffff"
                        : "transparent",

                      border: isSelected
                        ? "1px solid rgba(255,255,255,0.35)"
                        : "1px solid rgba(255,255,255,0.12)",

                      boxShadow: isSelected
                        ? "0 0 18px rgba(34,193,255,0.35)"
                        : "none"
                    }}

                    onMouseEnter={(e) => {

                      // 🔥 KEEP SELECTED STYLE
                      if (isSelected) return;

                      const el = e.currentTarget;

                      el.style.backgroundImage = "none";
                      (el.style as any).webkitBackgroundClip = "initial";
                      (el.style as any).webkitTextFillColor = "#ffffff";

                      el.style.color = "#ffffff";
                      el.style.border = "1px solid #ffffff";
                    }}

                    onMouseLeave={(e) => {

                      // 🔥 KEEP SELECTED STYLE
                      if (isSelected) return;

                      const el = e.currentTarget;

                      el.style.backgroundImage = "linear-gradient(135deg, #22c1ff, #6c63ff)";
                      (el.style as any).webkitBackgroundClip = "text";
                      (el.style as any).webkitTextFillColor = "transparent";

                      el.style.color = "transparent";
                      el.style.border = "1px solid rgba(255,255,255,0.12)";
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