"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMsg = { role: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);

    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("https://basket-pellet-constable.ngrok-free.dev/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });

      const data = await res.json();

      const aiMsg = {
        role: "ai",
        text: data.explanation || "Here are some options",
        products: data.products || []
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <div style={{ position: "relative", zIndex: 999 }}>

      {/* 🔥 FLOATING BUTTON */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            background: "#000",
            color: "#fff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "20px",
            zIndex: 1000,
            pointerEvents: "auto"   // ✅ clickable
          }}
        >
          💬
        </div>
      )}

      {/* 🔥 CHAT WINDOW */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "350px",
            height: "500px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            pointerEvents: "auto"   // ✅ no blocking
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: "10px",
              background: "#000",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span>Picksy AI</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            >
              ✖
            </span>
          </div>

          {/* MESSAGES */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto"
            }}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>

                {/* USER */}
                {msg.role === "user" && (
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        display: "inline-block",
                        background: "#007bff",
                        color: "#fff",
                        padding: "8px",
                        borderRadius: "10px"
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                )}

                {/* AI */}
                {msg.role === "ai" && (
                  <div>
                    <div
                      style={{
                        background: "#eee",
                        padding: "8px",
                        borderRadius: "10px",
                        marginBottom: "5px"
                      }}
                    >
                      🤖 {msg.text}
                    </div>

                    {/* PRODUCTS */}
                    <div
                      style={{
                        display: "flex",
                        overflowX: "auto",
                        gap: "10px"
                      }}
                    >
                      {(msg.products || []).map((p: any, idx: number) => (
                        <div
                          key={idx}
                          style={{
                            minWidth: "130px",
                            background: "#fff",
                            border: "1px solid #ddd",
                            padding: "8px",
                            borderRadius: "8px"
                          }}
                        >
                          <img
                            src={p.image || "https://via.placeholder.com/120"}
                            style={{
                              width: "100%",
                              height: "80px",
                              objectFit: "contain"
                            }}
                          />

                          <div style={{ fontSize: "11px" }}>{p.name}</div>

                          <div style={{
                            color: "#b12704",
                            fontWeight: "bold"
                          }}>
                            ${p.price || "N/A"}
                          </div>

                          <div style={{
                            fontSize: "10px",
                            fontWeight: "bold"
                          }}>
                            {(p.source || "").toUpperCase()}
                          </div>

                          {p.url && (
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "block",
                                marginTop: "5px",
                                background: "#ffa41c",
                                textAlign: "center",
                                borderRadius: "5px",
                                fontSize: "11px",
                                padding: "4px",
                                textDecoration: "none",
                                color: "#000",
                                fontWeight: "bold"
                              }}
                            >
                              Buy
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ))}

            {loading && <div>🤖 Thinking...</div>}
          </div>

          {/* 🔥 INPUT FIXED */}
         <div
  style={{
    padding: "10px",
    borderTop: "1px solid #ddd",
    display: "flex",
    alignItems: "center"
  }}
>
  <div style={{
    flex: 1,
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "20px",
    padding: "5px 10px",
    background: "#fff"
  }}>

    {/* 🤖 AI ICON LEFT */}
    <img
      src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
      alt="AI"
      style={{
        width: "20px",
        height: "20px",
        marginRight: "8px"
      }}
    />

    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      }}
      placeholder="Ask anything..."
      spellCheck={false}
      autoCorrect="off"
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        fontSize: "14px"
      }}
    />
  </div>

  <button
    type="button"
    onClick={sendMessage}
    style={{
      marginLeft: "8px",
      background: "#000",
      color: "#fff",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      border: "none",
      cursor: "pointer"
    }}
  >
    ↑
  </button>
</div>
        </div>
      )}
    </div>
  );
}