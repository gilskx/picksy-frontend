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
  return null;   // 🔥 NOTHING on home screen
}


if (!recommendation?.bestPick) {
  return (
    <div style={{
      textAlign: "center",
      padding: "40px"
      
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ask-product`, {
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
      color: "#22c1ff",
      marginBottom: "6px"
    }}>
      ✔ {t}
    </div>
  ));
};
  return (
  <motion.div
  className="nokku-hero-recommendation"
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
        background: "#000000",
        
      }}>

        {/* HEADER */}
        <div style={{
          textAlign: "center",
          marginBottom: "20px",
           paddingBottom: "20px"
        }}>

          {/* 🔥 NOKKU AI LINE */}
<div style={{
  fontSize: "13px",
  marginBottom: "6px",
  color: "rgba(34, 193, 255, 0.75)",
  letterSpacing: "0.3px",
  fontWeight: "500"
}}>
  ✨ Nokku AI found the best match for you.
</div>

          
          

        </div>

        {/* MAIN */}
        <div className="nokku-hero-rec-grid" style={{
  display: "grid",
  gridTemplateColumns: "3fr 1.2fr",
maxWidth: "1400px",
  gap: "40px",
  alignItems: "start",              // ✅ FIX
  width: "100%"                     // ✅ ADD
}}>

          {/* LEFT */}
          <div style={{width: "100%"}}>





          
           
		    
			
			
			{/* Main Product Name */}   

            {/* 🔥 PRODUCT TITLE CLEAN SPLIT */}
{(() => {
  const fullName = p.name || "";

  // Split by comma
  const parts = fullName.split(",");

  const mainTitle = parts[0];                 // First name
  const subItems = parts.slice(1, 4);         // Next 3 items

  return (
    <>
	


	
      {/* MAIN TITLE */}
      <div style={{
  fontSize: "30px",
  fontWeight: "700",
  lineHeight: "1.4",

  background: "linear-gradient(135deg, #22c1ff, #6c63ff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
}}>
  {mainTitle}
</div>








      {/* SUB ITEMS */}
      <div style={{
        marginTop: "6px",
        fontSize: "12px",
        color: "#22c1ff",
        maxWidth: "100%",
        lineHeight: "1.4"
      }}>
        {subItems.join(" • ")}
      </div>
    </>
  );
})()}


 


		






 {/* LEFT → PRICE start*/}
  {/* 🔥 PRICE + RATING + CTA (SAME ROW) */}
<div style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
	gap: "25px",
  marginTop: "5px",
  flexWrap: "wrap"
}}>

  {/* LEFT → PRICE + RATING */}
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "12px"
  }}>
    <div style={{
      fontSize: "20px",
      fontWeight: "800",
      letterSpacing: "-0.5px",
      
		color: "#22c1ff"
    }}>
      ${p.price}
    </div>

    <div style={{
      fontSize: "15px",
       display: "flex",
      alignItems: "center",
	  color: "#22c1ff",
      gap: "14px"
    }}>
      ⭐ {rating}
    </div>
  </div>

  {/* RIGHT → BUTTON  */}
  <a
    href={p.link}
    target="_blank"
    rel="noopener noreferrer"
    style={{
  padding: "6px 12px",
  borderRadius: "25px",
  background: "rgba(59,130,246,0.1)",   // same as Ask AI
  
  border: "1px solid rgba(59,130,246,0.3)",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "14px",
  color: "#22c1ff",
  whiteSpace: "nowrap",
  transition: "all 0.25s ease",
  cursor: "pointer"
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

</div>
  
   {/* LEFT → PRICE Rate and - Sold on Button End*/}
  
  {/* PRODUCT IMAGE WITH CLEAN RING */}
<div className="nokku-hero-product-image" style={{
  position: "relative",
  width: "320px",
  height: "320px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "100px" ,
marginLeft: "0px"
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
  
 {/* why this is  BEST Start*/}
<div style={{
  position: "relative",

  maxWidth: "100%",
  width: "100%",

  padding: "0",        // 🔥 KEY FIX (remove horizontal padding)

  marginTop: "150px",
  borderRadius: "16px",
  overflow: "hidden"
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
      fontWeight: "510",
      marginBottom: "10px",
	  color: "#22c1ff",
	  fontSize: "20px",
     
    }}>
      🏆 Why this is best !!
	  
    </div>


 

  
    {renderList(recommendation?.why_best_product)}

    <div style={{
      marginTop: "18px",
      fontSize: "20px",
	  color: "#22c1ff"
      
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
        fontSize: "13px"
      }}>
        ⚖✔ {recommendation.similarity_warning}
      </div>
    )}

  </div>

  
{/* END RIGHT → IMAGE */}
</div>




			  
<span style={{
  marginLeft: "10px",
  fontSize: "14px",
  fontWeight: "600"
}}>
  
</span>
              
			  
            </div>

            


{/* 🔥 CHEAPER OPTION */}

{/* 🔥 CHEAPER OPTION */}

{cheaper && (

  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

    <div
      style={{
        width: "100%",
        maxWidth: "1100px",     // 🔥 more breathing space
        padding: "20px 10px",
        marginTop: "20px"
      }}
    >

      {/* 🔥 MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3.5fr 1fr 2fr"	,   // 🔥 balanced layout
          gap: "40px",
          alignItems: "center"
        }}
      >

        {/* 🔥 LEFT */}
        <div>

          {/* AI LINE */}
          <div style={{
            fontSize: "13px",
            marginBottom: "8px",
            color: "rgba(34,193,255,0.75)",
            letterSpacing: "0.3px",
            fontWeight: "500"
          }}>
            💡 Nokku AI found a smarter, more affordable choice for you.
          </div>

          {/* PRODUCT NAME */}
          <div style={{
            fontSize: "15px",
            fontWeight: "600",
            color: "#22c1ff",
            marginBottom: "6px"
          }}>
            {cheaper.name?.split(",")[0]}
          </div>

          {/* SAVE */}
          {saveAmount && (
            <div style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#22c1ff",
              marginBottom: "10px"
            }}>
              Save ${saveAmount}
            </div>
          )}

          {/* PRICE STRIP */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "6px 12px",
            borderRadius: "20px",
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.3)",
            fontSize: "14px",
            color: "#22c1ff"
          }}>
            <span style={{ fontWeight: "600" }}>${cheaper.price}</span>
            <span>•</span>
            <span>⭐ {Number(cheaper.rating || 3.5).toFixed(1)}</span>
            <span>•</span>
            <span>{cheaper.source}</span>
          </div>

          {/* BUTTON */}
          <div>
            <a
              href={cheaper.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "14px",
                padding: "6px 12px",
                borderRadius: "25px",
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.3)",
                color: "#22c1ff",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "14px",
                transition: "all 0.25s ease"
              }}
            >
              Buy on {cheaper.source} →
            </a>
          </div>

        </div>

        {/* 🔥 MIDDLE (IMAGE) */}
        <div style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <img
            src={cheaper.image}
            alt="product"
            style={{
              width: "140px",
              objectFit: "contain"
            }}
          />
        </div>

        {/* 🔥 RIGHT */}
        <div>

          {recommendation?.why_cheaper_product?.length > 0 && (
            <>
              <div style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#22c1ff",
                marginBottom: "8px"
              }}>
                👤 Why Should Buy
              </div>

              <div style={{ fontSize: "14px", color: "#22c1ff" }}>
                {recommendation.why_cheaper_product.map((item: string, i: number) => (
                  <div key={i} style={{ marginBottom: "6px" }}>
                    ✓ {item}
                  </div>
                ))}
              </div>
            </>
          )}

        </div>

      </div>

    </div>

  </div>
)}
{/* 🔥 CHEAPER End */}

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
  border: "1px solid rgba(255,255,255,0.06)"
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

    // 🔥 TEXT = BLUE
    color: "#22c1ff",

    // 🔥 CURSOR
    caretColor: "#22c1ff",

    outline: "none"
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
<style jsx>{`
  input::placeholder {
    color: rgba(34, 193, 255, 0.35);
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    letter-spacing: 0.3px;
  }
`}</style>
	</motion.div>
  );
  
}