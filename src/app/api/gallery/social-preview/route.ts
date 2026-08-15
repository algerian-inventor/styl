import { NextRequest, NextResponse } from "next/server";
import { parseAndValidateSocialUrl, SocialPreviewResult } from "@/lib/social-media";

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

    const parsed = parseAndValidateSocialUrl(rawUrl);

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

    const { platform, canonicalUrl, type, externalId } = parsed;

    // Check for optional Meta App credentials
    const metaToken =
      process.env.META_OEMBED_TOKEN ||
      (process.env.META_APP_ID && process.env.META_APP_SECRET
        ? `${process.env.META_APP_ID}|${process.env.META_APP_SECRET}`
        : null);

    let officialThumbnailUrl: string | undefined;
    let officialAuthorName: string | undefined;
    let officialTitle: string | undefined;
    let officialEmbedHtml: string | undefined;
    let hasOfficialMetadata = false;

    if (metaToken) {
      try {
        let oembedEndpoint = "";
        if (platform === "instagram") {
          oembedEndpoint = `https://graph.facebook.com/v19.0/instagram_oembed?url=${encodeURIComponent(
            canonicalUrl
          )}&access_token=${metaToken}&fields=thumbnail_url,author_name,title,html`;
        } else if (platform === "facebook") {
          if (type === "video") {
            oembedEndpoint = `https://graph.facebook.com/v19.0/oembed_video?url=${encodeURIComponent(
              canonicalUrl
            )}&access_token=${metaToken}&fields=thumbnail_url,author_name,html`;
          } else {
            oembedEndpoint = `https://graph.facebook.com/v19.0/oembed_post?url=${encodeURIComponent(
              canonicalUrl
            )}&access_token=${metaToken}&fields=thumbnail_url,author_name,html`;
          }
        }

        if (oembedEndpoint) {
          const res = await fetch(oembedEndpoint, {
            headers: { Accept: "application/json" },
            // Cache preview responses for 1 hour
            next: { revalidate: 3600 },
          });

          if (res.ok) {
            const data = await res.json();
            officialThumbnailUrl = data.thumbnail_url;
            officialAuthorName = data.author_name;
            officialTitle = data.title;
            officialEmbedHtml = data.html;
            hasOfficialMetadata = true;
          } else {
            console.warn(`Meta oEmbed API returned ${res.status} for ${canonicalUrl}`);
          }
        }
      } catch (err) {
        console.warn("Error fetching Meta oEmbed data:", err);
      }
    }

    // Default localized titles if no official title returned
    const defaultTitleAr =
      officialTitle ||
      (platform === "instagram"
        ? type === "video"
          ? `ريلز إنستغرام: منشور تفاعلي للرابطة`
          : `منشور إنستغرام: توثيق أنشطة الرابطة`
        : type === "video"
        ? `فيديو فيسبوك: تغطية فعاليات الرابطة`
        : `منشور فيسبوك: تحديثات ونشاطات الرابطة`);

    const defaultTitleEn =
      officialTitle ||
      (platform === "instagram"
        ? type === "video"
          ? `Instagram Reel: Interactive STLY Activity`
          : `Instagram Post: STLY Activity Highlight`
        : type === "video"
        ? `Facebook Video: STLY Event Coverage`
        : `Facebook Post: STLY Community Update`);

    const result: SocialPreviewResult = {
      success: true,
      platform,
      type,
      canonicalUrl,
      externalId,
      title: {
        ar: defaultTitleAr,
        en: defaultTitleEn,
      },
      authorName: officialAuthorName || (platform === "instagram" ? "stly.constantine" : "STLY Constantine"),
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
