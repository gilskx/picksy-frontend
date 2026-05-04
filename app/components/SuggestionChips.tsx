"use client";

export default function SuggestionChips({ setQuery, query, search }: any) {

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

      {categories.map((cat, idx) => (
        <div key={idx} style={{ marginBottom: "14px" }}>

          {/* 🔥 CATEGORY TITLE */}
          <div style={{
            fontSize: "13px",
            color: "#aaa",
            marginBottom: "6px",
            textAlign: "center",
            letterSpacing: "0.5px"
          }}>
            {cat.title}
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

              return (
                <div
                  key={i}
                  onClick={() => {
                    setQuery(s);
                    search(s);
                  }}

                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    background: "transparent",

                    backgroundImage: "linear-gradient(135deg, #22c1ff, #6c63ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",

                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",

                    border: "1px solid rgba(255,255,255,0.12)"
                  }}

                  onMouseEnter={(e) => {
                    const el = e.currentTarget;

                    el.style.backgroundImage = "none";
                    (el.style as any).webkitBackgroundClip = "initial";
                    (el.style as any).webkitTextFillColor = "#ffffff";
                    el.style.color = "#ffffff";

                    el.style.border = "1px solid #ffffff";
                  }}

                  onMouseLeave={(e) => {
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
      ))}

    </div>
  );
}