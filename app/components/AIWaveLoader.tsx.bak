"use client";


export default function AIWaveLoader() {
  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "100px 0"
    }}>
      <div className="wave-container">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="wave-bar"
            style={{
              animationDelay: `${i * 0.08}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .wave-container {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 40px;
        }

        .wave-bar {
          width: 3px;
          height: 10px;
          background: linear-gradient(180deg, #3b82f6, #06b6d4, #a855f7);
          border-radius: 2px;
          animation: wave 1.2s infinite ease-in-out;
        }

        @keyframes wave {
          0%, 100% {
            transform: scaleY(0.5);
            opacity: 0.4;
          }
          50% {
            transform: scaleY(2.5);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}