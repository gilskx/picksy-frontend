export async function GET(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const country =
    req.headers.get("x-vercel-ip-country") || "unknown";

  const city =
    req.headers.get("x-vercel-ip-city") || "unknown";

  return Response.json({
    ip,
    country,
    city
  });
}