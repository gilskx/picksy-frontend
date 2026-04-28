"use client";

export default function AIBalanceLoader({ leftImg, rightImg }: any) {
  return (
    <div style={{
      textAlign: "center",
      marginTop: "100px"
    }}>

      {/* 🔵 RADAR */}
      <div className="radar-container">

        {/* circle */}
        <div className="radar-circle"></div>

        {/* rotating light */}
        <div className="radar-sweep"></div>

        {/* OPTIONAL: product hints */}
        {leftImg && (
  <div className="img-wrapper left-img">
    <img src={leftImg} />
    <div className="shimmer"></div>
  </div>
)}
        {rightImg && (
  <div className="img-wrapper right-img">
    <img src={rightImg} />
    <div className="shimmer"></div>
  </div>
)}

      </div>

      {/* TEXT */}
      <div style={{
        marginTop: "25px",
        fontSize: "14px",
        color: "#94a3b8"
      }}>
        🔍 AI scanning and comparing...
      </div>

      <style jsx>{`
        .radar-container {
          position: relative;
          width: 260px;
          height: 260px;
          margin: 0 auto;
        }

        .radar-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid rgba(59,130,246,0.3);
          box-shadow: 0 0 20px rgba(59,130,246,0.2);
          animation: pulse 2s infinite;
        }

        .radar-sweep {
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          height: 50%;
          background: linear-gradient(to bottom, #3b82f6, transparent);
          transform-origin: bottom center;
          animation: rotate 2s linear infinite;
        }

        /* small product hints */
        .left-img {
          position: absolute;
          left: -30px;
          top: 60px;
          width: 30px;
          opacity: 0.7;
        }

        .right-img {
          position: absolute;
          right: -30px;
          top: 60px;
          width: 30px;
          opacity: 0.7;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg) translateX(-50%);
          }
          to {
            transform: rotate(360deg) translateX(-50%);
          }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 10px rgba(59,130,246,0.2); }
          50% { box-shadow: 0 0 30px rgba(59,130,246,0.5); }
          100% { box-shadow: 0 0 10px rgba(59,130,246,0.2); }
        }
		@media (max-width: 768px) {
  .radar-container {
    width: 220px;
    height: 220px;
  }

  .left-img {
    left: -18px;
  }

  .right-img {
    right: -18px;
  }
}
      `}</style>
    </div>
  );
}