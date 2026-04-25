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
          justify-content: flex-end;   /* 👉 move to right */
          margin-bottom: 40px;
        }

        .ai-circle {
          width: 340px;   /* 🔥 BIGGER */
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

        .ai-title {
          font-size: 14px;
          letter-spacing: 2px;
          font-weight: 600;
          color: #60a5fa;
          margin-bottom: 18px;
          font-family: "Inter", "Segoe UI", sans-serif;  /* 🔥 better font */
        }

        .ai-content {
          font-size: 13px;
          color: #cbd5f5;
          line-height: 1.7;
          font-family: "Inter", "Segoe UI", sans-serif;
        }

        .ai-line {
          margin-bottom: 10px;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 15px rgba(59,130,246,0.25); }
          50% { box-shadow: 0 0 55px rgba(59,130,246,0.6); }
          100% { box-shadow: 0 0 15px rgba(59,130,246,0.25); }
        }
      `}</style>

    </div>
  );
}