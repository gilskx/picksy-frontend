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


  return res.json();
};