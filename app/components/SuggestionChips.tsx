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
      "Healthy snacks",
      "Organic Vegetables"
    ]
  },
  
  {
    title: "📱 Electronics",
    items: [
      "iPhone 16",
	  "Laptops",
	  "Television",
	   "Smart watches",
	  "Wireless headphones"
      
    ]
  },
  
  {
    title: "🏠 Home",
    items: [
      "Kitchen appliances",
      "Smart home devices",
      "Home essentials",
      "Cleaning supplies"
    ]
  },
  {
  title: "🏀 Sports",
  items: [
    "Sports shoes",
    "Fitness equipment",
    "Outdoor games",
    "Sports accessories"
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
      "Sneakers",
      "Beauty products"
    ]
  },
  {
    title: "👔 Men",
    items: [
      "Men fashion",
      "Watches",
      "Sneakers",
      "Grooming kits"
    ]
  },
  {
    title: "💪 Health",
    items: [
      "Protein powder",
      "Fitness trackers",
      "Health supplements",
      "Workout gear"
    ]
  },
  {
    title: "⌚ Accessories",
    items: [
      "Smart watches",
      "Travel bags",
      "Sunglasses",
      "Phone cases"
    ]
  },
  {
    title: "🎮 Gaming",
    items: [
      "Gaming consoles",
      "Gaming chairs",
      "Gaming accessories",
      "Gaming monitors"
    ]
  },
  {
    title: "💊 Medicine",
    items: [
      "Vitamins",
      "Pain relief",
      "Daily wellness",
      "First aid"
    ]
  }
];
  return (
    <div
      style={{
        marginTop: "18px",
        width: "100%",
        maxWidth: "1180px",
        marginInline: "auto",
        padding: "0 18px"
      }}
    >

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "22px"
        }}
      >

        {categories.map((cat, idx) => {

          const emoji = cat.title.split(" ")[0];
          const text = cat.title.split(" ").slice(1).join(" ");

          return (
            <div
              key={idx}

              style={{
                background: "rgba(255,255,255,0.38)",

                backdropFilter: "blur(14px)",

                border: "1px solid rgba(59,130,246,0.12)",

                borderRadius: "24px",

                padding: "16px",

                boxShadow:
                  "0 12px 35px rgba(59,130,246,0.06)",

                transition: "all 0.22s ease",

                minHeight: "145px"
              }}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-4px)";

                e.currentTarget.style.boxShadow =
                  "0 20px 45px rgba(59,130,246,0.12)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";

                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(59,130,246,0.06)";
              }}
            >

              {/* CATEGORY TITLE */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",

                  marginBottom: "18px",

                  fontSize: "18px",
                  fontWeight: 700,

                  color: "#2563eb",

                  letterSpacing: "0.2px"
                }}
              >
                <span style={{ fontSize: "18px" }}>
                  {emoji}
                </span>

                <span>{text}</span>
              </div>

              {/* ITEMS */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px"
                }}
              >

                {cat.items.map((s: string, i: number) => {

                  const isSelected = selectedSuggestion === s;

                  return (
                    <div
                      key={i}

                      onClick={() => {

                        if (selectedSuggestion !== s) {
                          setSelectedSuggestion(s);
                          setQuery(s);
                          return;
                        }

                        search(s);
                      }}

                      style={{
                        padding: "10px 14px",

                        borderRadius: "999px",

                        fontSize: "13px",
                        fontWeight: 500,

                        cursor: "pointer",
                        userSelect: "none",

                        transition: "all 0.2s ease",

                        background: isSelected
                          ? "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(99,102,241,0.18))"
                          : "rgba(255,255,255,0.55)",

                        color: isSelected
                          ? "#2563eb"
                          : "#334155",

                        border: isSelected
                          ? "1px solid rgba(59,130,246,0.28)"
                          : "1px solid rgba(59,130,246,0.08)",

                        boxShadow: isSelected
                          ? "0 10px 25px rgba(59,130,246,0.10)"
                          : "none"
                      }}

                      onMouseEnter={(e) => {

                        if (isSelected) return;

                        const el = e.currentTarget;

                        el.style.transform = "translateY(-2px)";
                        el.style.background =
                          "rgba(255,255,255,0.72)";
                        el.style.border =
                          "1px solid rgba(59,130,246,0.18)";
                      }}

                      onMouseLeave={(e) => {

                        if (isSelected) return;

                        const el = e.currentTarget;

                        el.style.transform = "translateY(0px)";
                        el.style.background =
                          "rgba(255,255,255,0.55)";
                        el.style.border =
                          "1px solid rgba(59,130,246,0.08)";
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

    </div>
  );
}