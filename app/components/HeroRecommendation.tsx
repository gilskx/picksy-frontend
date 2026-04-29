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
      textAlign: "left",
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
  ✨ Nokku AI picked this based on best price, high ratings, and overall value.
</div>

          
          

        </div>

        {/* MAIN */}
        <div className="nokku-hero-rec-grid" style={{
  display: "grid",
  gridTemplateColumns: "1fr",
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
  marginTop: "12px",
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
	   marginTop: "10px",
      
		color: "#22c1ff"
    }}>
      ${p.price}
    </div>

    <div style={{
      fontSize: "15px",
       display: "flex",
      alignItems: "center",
	  color: "#22c1ff",
      gap: "14px",
	   marginTop: "14px",
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
  marginTop: "6px",
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
    View Deal on {sourceName} →
  </a>

</div>
  
   {/* LEFT → PRICE Rate and - Sold on Button End*/}
  
  {/* PRODUCT IMAGE WITH CLEAN RING */}
<div className="nokku-hero-product-image" style={{
  position: "relative",
  width: "320px",
  height: "320px",
  display: "flex",
  marginTop: "40px",
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
      marginTop: "25px",
      fontSize: "20px",
	  color: "#22c1ff"
      
    }}>
      👤 Who should buy
    </div>

	<div style={{
      marginTop: "8px",
      fontSize: "20px",
	  color: "#22c1ff"
      
    }}>
      {renderList(recommendation?.who_should_buy_best)}
    </div>
    

  </div>

</div>


 
 



{/* AI LINE Cheaper */}
<div style={{
  fontSize: "20px",
  marginBottom: "8px",
  color: "rgba(34,193,255,0.75)",
  letterSpacing: "0.3px",
  fontWeight: "500",
  textAlign: "center" ,  // ✅ ADD THIS
  marginTop: "80px"
}}>
  💡  Nokku AI found a more affordable option that saves you ${saveAmount} with comparable value.
</div>

{/* 👤 WHO SHOULD BUY */}
<div style={{
  fontSize: "12px",
  color: "rgba(34, 193, 255, 0.75)",
  marginTop: "4px",
  fontStyle: "italic",
  textAlign: "center" ,
}}>
  👤 Best for: {recommendation?.who_should_buy_best?.[0]}
</div>
{/* AI LINE Cheaper End */}
		  
		  
		  {/* PRODUCT NAME */}
          <div style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#22c1ff",
			marginTop: "30px",
            marginBottom: "6px"
          }}>
            {cheaper.name?.split(",")[0]}
          </div>
		  {/* PRODUCT End */}
		  
		    {/* 🔥 Cheap (IMAGE) */}
        <div style={{
          display: "flex",
		  marginTop: "25px",
          justifyContent: "space-between"
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
		  
		  {/* SAVE */}
          {saveAmount && (
            <div style={{
              fontSize: "24px",
              fontWeight: "700",
			  marginTop: "15px",
              color: "rgba(34,193,255,0.75)",
              marginBottom: "10px"
            }}>
              Save ${saveAmount}
            </div>
          )}
		  
		  {/* SAVE Amount End*/}
		  
		 
		 
{/* 🔥 ROW: PRICE + BUTTON */}
<div style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",   // 🔥 pushes button to right
  gap: "16px",
  marginTop: "8px"
}}>

  {/* PRICE BLOCK */}
  <div style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "6px 12px",
    borderRadius: "20px",
    background: "rgba(59,130,246,0.1)",
    border: "1px solid rgba(59,130,246,0.3)",
    fontSize: "px"
  }}>

    <div style={{ color: "#22c1ff", fontWeight: "600" }}>
      ${cheaper.price}
    </div>

    <div style={{ color: "#22c1ff" }}>•</div>

    <div style={{ color: "#22c1ff" }}>
      ⭐ {Number(cheaper.rating || 3.5).toFixed(1)}
    </div>

    <div style={{ color: "#22c1ff" }}>•</div>

    <div style={{ textTransform: "capitalize", color: "#22c1ff" }}>
      {cheaper.source}
    </div>

  </div>




  {/* 🔥 BUTTON */}
  <a
    href={cheaper.link}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: "6px 14px",
      borderRadius: "25px",
      background: "rgba(59,130,246,0.1)",
      border: "1px solid rgba(59,130,246,0.3)",
      color: "#22c1ff",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "14px",
      whiteSpace: "nowrap",   // 🔥 prevents breaking
      transition: "all 0.25s ease"
    }}
  >
    View Deal on {cheaper.source} →
  </a>

</div>
		

      

 {/* 🔥 RIGHT */}
        <div>

          {recommendation?.why_cheaper_product?.length > 0 && (
            <>
              <div style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#22c1ff",
				marginTop: "35px",
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



{/*  Below End of Main Tab*/}		
		  
		  
		  
</div>

	        
        






         
</div>   {/* RIGHT column */}
 
</div>   {/* MAIN grid */}

     
      {/* WHY SECTION */}
<div style={{
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
  marginTop: "25px"
}}>

  


  
  
   
    


</div>   {/* close MAIN CONTAINER */}
 
	</motion.div>
  );
  
}