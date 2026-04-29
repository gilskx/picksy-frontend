console.log("THIS IS THE REAL searchService.ts FILE");
// ✅ NORMAL API (fallback)
export const searchProducts = async (query: string, userContext?: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      userContext
    })
  });
console.log("searchService loaded");
  return res.json();
};


// ✅ SSE STREAM API
export const searchProductsStream = (
  query: string,
  onStage: (stage: string) => void,
  onDone: (data: any) => void,
  onError: () => void
) => {
  const eventSource = new EventSource(
    `${process.env.NEXT_PUBLIC_API_URL}/search/search-stream?query=${encodeURIComponent(query)}`
  );

  eventSource.onmessage = (event) => {

  console.log("🔥 SSE EVENT:", event.data);   // ✅ ADD THIS LINE

  const data = event.data;

  if (data.startsWith("DONE|")) {

    console.log("🔥 DONE RECEIVED");          // ✅ ADD THIS LINE

    const json = data.replace("DONE|", "");
    const parsed = JSON.parse(json);

    onDone(parsed);
    eventSource.close();

  } else {
    onStage(data);
  }
};

  eventSource.onerror = () => {
    eventSource.close();
    onError();
  };

  return eventSource;
};