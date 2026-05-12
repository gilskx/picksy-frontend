"use client";

export default function AICircleInsights({ insights = [] }: any) {
  return (
    <div className="wrapper">

      <div className="ai-circle">

        {/* TITLE */}
        <div className="ai-title">
          AI INSIGHTS
        </div>

        {/* CONTENT */}
        <div className="ai-content">
          {insights.map((text: string, i: number) => (
            <div key={i} className="ai-line">
              {text}
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 40px;
        }

        .ai-circle {
          width: 340px;
          height: 340px;
          border-radius: 50%;
          border: 2px solid rgba(59,130,246,0.35);
          box-shadow: 0 0 40px rgba(59,130,246,0.35);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          text-align: center;
          animation: pulse 3s infinite;
        }

        /* 🔥 UPDATED TITLE */
        .ai-title {
          font-size: 14px;
          letter-spacing: 2px;
          font-weight: 700;
          margin-bottom: 18px;
          font-family: "Inter", "Segoe UI", sans-serif;

          color: transparent;
          background: linear-gradient(90deg, #38bdf8, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* 🔥 UPDATED CONTENT */
        .ai-content {
          font-size: 13px;
          color: #e0e7ff;   /* brighter + cleaner */
          line-height: 1.7;
          font-family: "Inter", "Segoe UI", sans-serif;
          text-shadow: 0 0 10px rgba(99,102,241,0.3); /* subtle glow */
        }

        .ai-line {
          margin-bottom: 10px;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 15px rgba(59,130,246,0.25); }
          50% { box-shadow: 0 0 55px rgba(59,130,246,0.6); }
          100% { box-shadow: 0 0 15px rgba(59,130,246,0.25); }
        }
		@media (max-width: 768px) {
  .wrapper {
    justify-content: center;
    margin-bottom: 20px;
  }

  .ai-circle {
    width: 260px;
    height: 260px;
    padding: 28px;
  }

  .ai-content {
    font-size: 12px;
    line-height: 1.5;
  }
}
      `}</style>

    </div>
  );
}