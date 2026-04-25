import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  try {
    const res = await fetch(
      `https://www.walmart.com/search/api/preso?q=${query}`,
      {
        headers: {
          "Accept": "application/json, text/plain, */*",
          "User-Agent": "Mozilla/5.0",
          "Referer": "https://www.walmart.com/"
        }
      }
    );

    const data = await res.json();

    return NextResponse.json(data);

  } catch (e) {
    console.log("❌ Walmart API route failed");
    return NextResponse.json({ items: [] });
  }
}