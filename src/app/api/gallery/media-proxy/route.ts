import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
      return new NextResponse("Missing url parameter", { status: 400 });
    }

    const parsed = new URL(url);
    // Allow only safe Meta/Facebook/Instagram CDN hostnames
    const allowedHosts = [
      "lookaside.fbsbx.com",
      "scontent.fna.fbcdn.net",
      "scontent.cdninstagram.com",
      "instagram.com",
      "facebook.com"
    ];

    const isAllowed =
      allowedHosts.some((h) => parsed.hostname === h || parsed.hostname.endsWith(".fbcdn.net") || parsed.hostname.endsWith(".fbsbx.com") || parsed.hostname.endsWith(".cdninstagram.com"));

    if (!isAllowed) {
      return new NextResponse("Forbidden hostname", { status: 403 });
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
      }
    });

    if (!res.ok) {
      return new NextResponse("Failed to fetch upstream media", { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await res.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
      }
    });
  } catch (error) {
    console.error("Media proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
