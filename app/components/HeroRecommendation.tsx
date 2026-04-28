"use client";
import { useState } from "react";
import { motion } from "framer-motion";
export default function HeroRecommendation({
  recommendation,
  confidence,
  cheaper,
  recUrl,
  aiActive,
  mode,
  setMode
}: any) {
if (!recommendation) {
  return (
    <div style={{
      textAlign: "center",
      padding: "40px",
      color: "#94a3b8"
    }}>
      🤖 Finding best recommendation...
    </div>
  );
}

if (!recommendation?.bestPick) {
  return (
    <div style={{
      textAlign: "center",
      padding: "40px",
      color: "#f59e0b"
    }}>
      ⚠️ No recommendation found
    </div>
  );
}

const p = recommendation.bestPick;
console.log("🔥 FINAL DATA:", recommendation);
const saveAmount =
  cheaper?.price && p?.price && p.price > cheaper.price
    ? (p.price - cheaper.price).toFixed(2)
    : null;


  const rating = p.rating || 4.5;
  const [showAIChat, setShowAIChat] = useState(false);		
  const [aiQuestion, setAiQuestion] = useState("");
const [aiAnswer, setAiAnswer] = useState("");
const [aiLoading, setAiLoading] = useState(false);

  // 🔥 NEW: Dynamic source detection
  const getDomainName = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname
        .replace("www.", "")
        .split(".")[0]
        .replace(/^\w/, (c) => c.toUpperCase());
    } catch {
      return "Store";
    }
  };

  const sourceName = p.source
  ? p.source.replace(/^\w/, (c: string) => c.toUpperCase())
  : getDomainName(p.link);
    
	const askAI = async () => {
  if (!aiQuestion) {
  alert("Please enter a question");
  return;
}

  try {
    setAiLoading(true);
    setAiAnswer("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ask-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: aiQuestion,
        product: p.name
      })
    });

    const data = await res.json();
    setAiAnswer(data.answer);

  } catch (e) {
    console.error(e);
    setAiAnswer("⚠️ Failed to get AI response");
  } finally {
    setAiLoading(false);
  }
};
const renderList = (list: string[]) => {
  if (!list || list.length === 0) return null;

  return list.map((t, i) => (
    <div key={i} style={{
      fontSize: "13px",
      color: "#94a3b8",
      marginBottom: "6px"
    }}>
      ✔ {t}
    </div>
  ));
};
  return (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
	
    style={{
  width: "100%",
  maxWidth: "1200px",   // ✅ ADD
  margin: "0 auto",
  padding: "0 20px",
  marginTop: "80px",
  display: "block"      // ❌ remove flex
}}>

      <div style={{
        borderRadius: "24px",
        padding: "20px 30px",
        background: `
          radial-gradient(circle at 70% 50%, rgba(59,130,246,0.35), transparent 40%),
          linear-gradient(135deg, #0f172a, #020617)
        `,
        boxShadow: "0 25px 80px rgba(0,0,0,0.7)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}>

        {/* HEADER */}
        <div style={{
          textAlign: "center",
          marginBottom: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingBottom: "20px"
        }}>

          <div style={{
            color: "#38bdf8",
            fontSize: "13px",
            marginBottom: "6px"
          }}>
            ✨ Smart Buy
          </div>

          
          <div style={{
            fontSize: "13px",
            color: "#94a3b8",
            marginTop: "4px"
          }}>
            Based on price, performance, ratings & availability
          </div>

        </div>

        {/* MAIN */}
        <div style={{
  display: "grid",
  gridTemplateColumns: "2.5fr 1fr",
maxWidth: "1400px",
  gap: "40px",
  alignItems: "start",              // ✅ FIX
  width: "100%"                     // ✅ ADD
}}>

          {/* LEFT */}
          <div style={{width: "100%"}}>





            <div style={{
              background: "rgba(251,191,36,0.15)",
              color: "#facc15",
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              marginBottom: "10px"
            }}>
              
			  {recommendation?.quick_decision && (
  <div style={{
    color: "#38bdf8",
    fontSize: "13px",
    marginBottom: "6px",
    fontWeight: "600"
  }}>
    💡 {recommendation.quick_decision}
  </div>
)}
            </div>

            <div style={{
  fontSize: "18px",
  fontWeight: "700",
  color: "#fff",
  maxWidth: "520px",       // 🔥 ADD
  lineHeight: "1.5"        // 🔥 ADD
}}>
              {p.name}
            </div>

            <div style={{
              marginTop: "8px",
              color: "#94a3b8",
              fontSize: "14px",
              maxWidth: "400px"
            }}>
              Premium product selected based on value, rating and performance
            </div>
 

 {/* LEFT → PRICE start*/}
  {/* 🔥 PRICE + RATING + CTA (SAME ROW) */}
<div style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
	gap: "20px",
  marginTop: "16px",
  flexWrap: "wrap"
}}>

  {/* LEFT → PRICE + RATING */}
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "12px"
  }}>
    <div style={{
      fontSize: "32px",
      fontWeight: "800",
      letterSpacing: "-0.5px",
      color: "#fff"
    }}>
      ${p.price}
    </div>

    <div style={{
      fontSize: "16px",
      color: "#f59e0b",
      display: "flex",
      alignItems: "center",
      gap: "14px"
    }}>
      ⭐ {rating}
    </div>
  </div>

  {/* RIGHT → BUTTON */}
  <a
    href={p.link}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: "10px 22px",
      borderRadius: "25px",
      background: "linear-gradient(135deg, #6366f1, #2563eb)",
      color: "#fff",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "14px",
      whiteSpace: "nowrap",
      boxShadow: "0 10px 30px rgba(99,102,241,0.5)",
      transition: "all 0.25s ease"
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    Sold on {sourceName} →
  </a>
<button
  onClick={() => setShowAIChat(true)}
  style={{
    padding: "10px 16px",
    borderRadius: "25px",
    background: "rgba(59,130,246,0.1)",
    color: "#93c5fd",
    border: "1px solid rgba(59,130,246,0.3)",
    cursor: "pointer",
    fontSize: "14px",
    whiteSpace: "nowrap"
  }}
>
  🤖 Ask AI
</button>
</div>
  
   {/* LEFT → PRICE Rate and - Sold on Button End*/}
  
  
  
 {/* why this is  BEST Start*/}
<div style={{
  position: "relative",

  // 🔥 KEY FIXES
  maxWidth: "520px",        // ⬅️ limit width
  width: "100%",
  padding: "16px 18px",     // ⬅️ tighter padding

  borderRadius: "16px",
  overflow: "hidden",

  background: "rgba(2,6,23,0.65)",
  border: "1px solid rgba(59,130,246,0.2)",

  backdropFilter: "blur(6px)"   // ⬅️ premium look
}}>

  {/* RADAR BACKGROUND */}
  <div style={{
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none"
  }}>

    {[120, 200, 280].map((size, i) => (
      <motion.div
        key={`ring-${i}`}   // ✅ safer key
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          border: "1px solid rgba(59,130,246,0.2)"
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}

    <motion.div
      style={{
        position: "absolute",
        width: "2px",
        height: "140%",
        background: "linear-gradient(to bottom, transparent, #38bdf8, transparent)",
        transformOrigin: "center"
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }}
    />

  </div>

  {/* CONTENT */}
  <div style={{ position: "relative", zIndex: 2 }}>

    <div style={{
      fontWeight: "600",
      marginBottom: "10px",
      color: "#38bdf8"
    }}>
      🏆 Why this is best !!
    </div>

	 {recommendation?.price_value_signal && (
      <div style={{
        marginTop: "6px",
        fontSize: "13px",
        color: "#22c55e",
        fontWeight: "600"
      }}>
        💡 {recommendation.price_value_signal}
      </div>
    )}

    {recommendation?.key_difference && (
      <div style={{
        marginTop: "6px",
        fontSize: "13px",
        color: "#93c5fd"
      }}>
        ⚡ {recommendation.key_difference}
      </div>
    )}
    {renderList(recommendation?.why_best_product)}

    <div style={{
      marginTop: "10px",
      fontSize: "12px",
      color: "#94a3b8"
    }}>
      👤 Who should buy
    </div>

    {renderList(recommendation?.who_should_buy_best)}

  </div>

</div>
{/* why this is BEST */}
 
 

{/* 🔥 PRICE + IMAGE ROW */}
<div style={{
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
  gap: "40px",
  marginTop: "20px"
}}>



  
  <div>


			
   

    {recommendation?.similarity_warning && (
      <div style={{
        marginTop: "6px",
        fontSize: "13px",
        color: "#f59e0b"
      }}>
        ⚖️ {recommendation.similarity_warning}
      </div>
    )}

  </div>

  
{/* END RIGHT → IMAGE */}
</div>




			  <button
  onClick={() => {
    const saved = JSON.parse(localStorage.getItem("savedProducts") || "[]");
    saved.push(p);
    localStorage.setItem("savedProducts", JSON.stringify(saved));
    alert("Saved for tracking!");
  }}
  style={{
    marginLeft: "12px",
    padding: "6px 10px",
    borderRadius: "10px",
    background: "rgba(34,197,94,0.1)",
    color: "#22c55e",
    border: "1px solid rgba(34,197,94,0.3)",
    cursor: "pointer",
    fontSize: "12px"
  }}
>
 💾 Save
</button>
<span style={{
  marginLeft: "10px",
  fontSize: "14px",
  color: "#22c55e",
  fontWeight: "600"
}}>
  
</span>
              
			  
            </div>

            
		{/* PRODUCT IMAGE WITH CLEAN RING */}
<div style={{
  position: "relative",
  width: "320px",
  height: "320px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "140px" ,
  marginLeft: "-100px"
}}>

  {/* 🔵 OUTER RING */}
  <motion.div
    style={{
      position: "absolute",
      width: "440px",
      height: "440px",
      borderRadius: "50%",
      border: "2px solid rgba(59,130,246,0.5)"
    }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 12,
      repeat: Infinity,
      ease: "linear"
    }}
  />

  {/* 🔵 INNER RING */}
  <motion.div
    style={{
      position: "absolute",
      width: "350px",
      height: "350px",
      borderRadius: "50%",
      border: "1px dashed rgba(59,130,246,0.4)"
    }}
    animate={{ rotate: -360 }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }}
  />

  {/* 🔥 PRODUCT IMAGE (UNCHANGED STYLE) */}
  
  <motion.img
    src={p.image}
    animate={{
      y: [0, -6, 0]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      width: "220px",
      objectFit: "contain",
      zIndex: 2,
      filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.9))"
    }}
  />

</div>
{/* End Product Image */}


 




{/* 🔥 CHEAPER OPTION */}


{cheaper && (

  <div style={{ gridColumn: "1 / -1" }}>   {/* 🔥 BREAK COLUMN LIMIT */}

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        width: "100%",
        maxWidth: "1300px",   // 🔥 INCREASE WIDTH
        margin: "0 auto",     // center it
        padding: "18px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))",
        border: "1px solid rgba(34,197,94,0.25)",
        boxShadow: "0 10px 30px rgba(34,197,94,0.1)",
        backdropFilter: "blur(6px)",
        position: "relative",
        overflow: "hidden"
      }}
    >

      {/* 🔥 SHIMMER */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "2px",
        background: "linear-gradient(90deg, transparent, #38bdf8, transparent)",
        opacity: 0.6
      }} />

      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 rgba(59,130,246,0.0)",
            "0 0 20px rgba(59,130,246,0.12)",
            "0 0 0 rgba(59,130,246,0.0)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >

        {/* 🔥 MAIN GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1.1fr",   // 🔥 MORE SPACE LEFT
          gap: "24px",
          alignItems: "start"
        }}>

          {/* LEFT SIDE */}
          <div>

            <div style={{
              fontSize: "12px",
              color: "#38bdf8",
              fontWeight: "600"
            }}>
              🤖 Smart Alternative / Cheaper Option
            </div>

            {saveAmount && (
              <div style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#22c55e",
                marginTop: "6px"
              }}>
                Save ${saveAmount}
              </div>
            )}

            <div style={{
              marginTop: "10px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#f8fafc",
              lineHeight: "1.4",
			  maxWidth: "520px"
            }}>
              {cheaper.name}
            </div>

            <div style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px",
              fontSize: "14px",
              color: "#94a3b8"
            }}>
              <span style={{ color: "#22c55e", fontWeight: "600" }}>
                ${cheaper.price}
              </span>
              <span>•</span>
              <span style={{ color: "#fbbf24" }}>
                ⭐ {Number(cheaper.rating || 3.5).toFixed(1)}
              </span>
              <span>•</span>
              <span style={{ textTransform: "capitalize" }}>
                {cheaper.source}
              </span>
            </div>

            <a
              href={cheaper.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "16px",
                padding: "10px 16px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600"
              }}
            >
              Buy on {cheaper.source} →
            </a>

          </div>

          {/* RIGHT SIDE */}
<div style={{
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "18px",
  marginLeft: "-35px"
}}>

  {/* IMAGE */}
  <div style={{ flexShrink: 0 }}>
    <img
      src={cheaper.image}
      alt="product"
      style={{
        width: "150px",
        height: "150px",
        objectFit: "contain",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.05)",
        padding: "10px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
      }}
    />
  </div>

  {/* TEXT */}
  <div style={{
    maxWidth: "260px",
    marginTop: "4px"
  }}>

    {recommendation?.why_cheaper_product?.length > 0 && (
      <div>
        <div style={{
          fontSize: "13px",
          fontWeight: "600",
          color: "#4ade80",
          marginBottom: "6px"
        }}>
          💡 Why this works
        </div>

        {renderList(recommendation?.why_cheaper_product)}
      </div>
    )}

    {recommendation?.who_should_buy_cheaper?.length > 0 && (
      <div style={{ marginTop: "12px" }}>
        <div style={{
          fontSize: "13px",
          fontWeight: "600",
          color: "#a78bfa",
          marginBottom: "6px"
        }}>
          👤 Who Should Buy
        </div>

        {renderList(recommendation?.who_should_buy_cheaper)}
      </div>
    )}

  </div>

</div>









        </div>

      </motion.div>

    </motion.div>

  </div>
)}

{/* 🔥 CHEAPER End  */}



         <div style={{
  display: "flex",
  justifyContent: "flex-end",   // 🔥 KEY CHANGE
  alignItems: "flex-start"      // 🔥 align top (looks premium)
}}>


</div>   {/* inner column (right content) */}
</div>   {/* RIGHT column */}
 
</div>   {/* MAIN grid */}

     
      {/* WHY SECTION */}
<div style={{
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
  marginTop: "25px"
}}>

  {/* LEFT - WHY */}
<div style={{
  display: "inline-block",     // 🔥 KEY: stops full-width stretch
  maxWidth: "600px",           // 🔥 limits size
  background: "rgba(255,255,255,0.04)",
  borderRadius: "14px",
  padding: "14px 16px",        // 🔥 tighter padding
  border: "1px solid rgba(255,255,255,0.08)"
}}>

<div style={{
  display: "grid",
  gridTemplateColumns: "minmax(500px, 1.5fr) minmax(320px, 1.5fr)",
  gap: "20px"
}}>

 

  

</div>





  </div>


  
  
   
    

<div style={{
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginTop: "20px",
  marginBottom: "10px"
}}>

  



</div>
</div>   {/* close MAIN CONTAINER */}
 
	
	{showAIChat && (
  <div
    onClick={() => setShowAIChat(false)}   // ✅ close on outside click
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
      zIndex: 9999   // 🔥 FIXED
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}   // ✅ prevent close inside
      style={{
        width: "420px",
        background: "#020617",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <div style={{
        fontWeight: "600",
        marginBottom: "10px",
        color: "#fff"
      }}>
        🤖 Ask about this product
      </div>

      <input
  value={aiQuestion}
  onChange={(e) => setAiQuestion(e.target.value)}
  placeholder="Ask about this product..."
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    marginBottom: "10px",
    background: "#0f172a",
    color: "#fff"
  }}
/>

      <button
  onClick={() => setShowAIChat(false)}
  style={{
    marginTop: "10px",
    padding: "8px 14px",
    borderRadius: "8px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }}
>
  Close
</button>
        
    </div>
  </div>
  
)}
	</motion.div>
  );
  
}