export async function searchProducts(query: string) {
  const res = await fetch("http://localhost:8081/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  return res.json();
}