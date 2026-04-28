export const searchProducts = async (query: string, userContext?: any) => {
  const res = await fetch("https://nokku-backend.onrender.com/search"", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      userContext
    })
  });

  return res.json();
};