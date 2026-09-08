import { NextRequest, NextResponse } from "next/server";
import { resolveAndCleanSocialUrl, SocialPreviewResult } from "@/lib/social-media";

/**
 * Decodes basic HTML entities like &#x627; or &amp; into readable strings.
 */
function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Extracts Open Graph tags using Meta-compatible crawler request.
 */
async function fetchMetaOpenGraph(targetUrl: string) {
  try {
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const html = await res.text();

    const ogImageMatch =
      html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
      html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i) ||
      html.match(/"image":\s*\{"@type":\s*"ImageObject",\s*"url":\s*"([^"]+)"/i);

    const ogTitleMatch =
      html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
      html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:title["']/i);

    const ogDescMatch =
      html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
      html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:description["']/i);

    const rawImage = ogImageMatch ? ogImageMatch[1].replace(/&amp;/g, "&") : undefined;
    const rawTitle = ogTitleMatch ? decodeHtmlEntities(ogTitleMatch[1]) : undefined;
    const rawDesc = ogDescMatch ? decodeHtmlEntities(ogDescMatch[1]) : undefined;

    return {
      thumbnailUrl: rawImage,
      title: rawTitle,
      description: rawDesc,
    };
  } catch (err) {
    console.warn("Open Graph metadata fetch failed:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawUrl = body?.url;

    if (!rawUrl || typeof rawUrl !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid URL parameter." },
        { status: 400 }
      );
    }

    // 1. Resolve any share redirect (e.g. /share/p/, /share/r/) and extract canonical permalink
    const parsed = await resolveAndCleanSocialUrl(rawUrl);

    if (!parsed.isValid || !parsed.platform || !parsed.canonicalUrl || !parsed.type || !parsed.externalId) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.errorMessage?.en || "Invalid social media URL.",
          errorMessage: parsed.errorMessage,
        },
        { status: 422 }
      );
    }

    const { platform, canonicalUrl, originalUrl, type, externalId } = parsed;

    // 2. Check for optional Meta App credentials
    const metaToken =
      process.env.META_OEMBED_TOKEN ||
      (process.env.META_APP_ID && process.env.META_APP_SECRET
        ? `${process.env.META_APP_ID}|${process.env.META_APP_SECRET}`
        : null);

    const metaGraphVersion = process.env.META_GRAPH_VERSION || "v26.0";

    let officialThumbnailUrl: string | undefined;
    let officialAuthorName: string | undefined;
    let officialTitle: string | undefined;
    let officialEmbedHtml: string | undefined;
    let hasOfficialMetadata = false;

    // 3. Try official Meta Graph oEmbed API if credentials provided
    if (metaToken) {
      try {
        let oembedEndpoint = "";
        if (platform === "instagram") {
          oembedEndpoint = `https://graph.facebook.com/${metaGraphVersion}/instagram_oembed?url=${encodeURIComponent(
            canonicalUrl
          )}&access_token=${metaToken}&fields=thumbnail_url,author_name,title,html`;
        } else if (platform === "facebook") {
          if (type === "video") {
            oembedEndpoint = `https://graph.facebook.com/${metaGraphVersion}/oembed_video?url=${encodeURIComponent(
              canonicalUrl
            )}&access_token=${metaToken}&fields=thumbnail_url,author_name,html`;
          } else {
            oembedEndpoint = `https://graph.facebook.com/${metaGraphVersion}/oembed_post?url=${encodeURIComponent(
              canonicalUrl
            )}&access_token=${metaToken}&fields=thumbnail_url,author_name,html`;
          }
        }

        if (oembedEndpoint) {
          const res = await fetch(oembedEndpoint, {
            headers: { Accept: "application/json" },
            next: { revalidate: 3600 },
          });

          if (res.ok) {
            const data = await res.json();
            officialThumbnailUrl = data.thumbnail_url;
            officialAuthorName = data.author_name;
            officialTitle = data.title;
            officialEmbedHtml = data.html;
            hasOfficialMetadata = true;
          }
        }
      } catch (err) {
        console.warn("Meta oEmbed API query error:", err);
      }
    }

    // 4. If no thumbnail from oEmbed (or no credentials), extract official Open Graph metadata
    if (!officialThumbnailUrl) {
      const ogData = await fetchMetaOpenGraph(canonicalUrl);
      if (ogData?.thumbnailUrl) {
        officialThumbnailUrl = ogData.thumbnailUrl;
        hasOfficialMetadata = true;
      }
      if (ogData?.description && !officialTitle) {
        // Use clean truncated post description or title if available
        const cleanDesc = ogData.description.split("\n")[0].substring(0, 120).trim();
        if (cleanDesc) officialTitle = cleanDesc;
      } else if (ogData?.title && !officialTitle) {
        officialTitle = ogData.title;
      }
    }

    // 5. Default localized titles if no custom or official title found
    const defaultTitleAr =
      officialTitle ||
      (platform === "instagram"
        ? type === "video"
          ? `Instagram Reel`
          : `منشور Instagram`
        : type === "video"
        ? `فيديو Facebook`
        : `منشور Facebook`);

    const defaultTitleEn =
      officialTitle ||
      (platform === "instagram"
        ? type === "video"
          ? `Instagram Reel`
          : `Instagram Post`
        : type === "video"
        ? `Facebook Video`
        : `Facebook Post`);

    const result: SocialPreviewResult = {
      success: true,
      platform,
      type,
      canonicalUrl,
      originalUrl: originalUrl || rawUrl,
      externalId,
      title: {
        ar: defaultTitleAr,
        en: defaultTitleEn,
      },
      authorName: officialAuthorName || undefined,
      thumbnailUrl: officialThumbnailUrl,
      embedHtml: officialEmbedHtml,
      hasOfficialMetadata,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Social preview route error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while generating preview." },
      { status: 500 }
    );
  }
}
