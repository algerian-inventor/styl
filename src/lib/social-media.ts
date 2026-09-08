/**
 * STLY Constantine - Social Media Utility Library
 * Handles URL normalization, platform detection, validation,
 * HTTP redirect resolution for Facebook share links,
 * and Meta oEmbed & Open Graph metadata extraction for Instagram and Facebook.
 */

export type SocialPlatform = "instagram" | "facebook";
export type SocialMediaType = "image" | "video";

export interface ParsedSocialUrl {
  isValid: boolean;
  platform?: SocialPlatform;
  type?: SocialMediaType;
  canonicalUrl?: string;
  originalUrl?: string;
  externalId?: string;
  isShareUrl?: boolean;
  errorMessage?: {
    ar: string;
    en: string;
  };
}

export interface SocialPreviewResult {
  success: boolean;
  platform: SocialPlatform;
  type: SocialMediaType;
  canonicalUrl: string;
  originalUrl: string;
  externalId: string;
  title?: {
    ar: string;
    en: string;
  };
  authorName?: string;
  thumbnailUrl?: string;
  embedHtml?: string;
  hasOfficialMetadata: boolean;
  error?: string;
}

/**
 * Normalizes and validates Instagram or Facebook URLs synchronously.
 * Strips tracking parameters (igsh, utm_*, mibextid, etc.) and extracts canonical URL & ID.
 */
export function parseAndValidateSocialUrl(rawUrl: string): ParsedSocialUrl {
  if (!rawUrl || typeof rawUrl !== "string") {
    return {
      isValid: false,
      errorMessage: {
        ar: "يرجى إدخال رابط منشور صحيح.",
        en: "Please enter a valid post URL.",
      },
    };
  }

  const trimmed = rawUrl.trim();
  let urlObj: URL;

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    urlObj = new URL(withProtocol);
  } catch {
    return {
      isValid: false,
      errorMessage: {
        ar: "صيغة الرابط غير صحيحة.",
        en: "Invalid URL format.",
      },
    };
  }

  if (urlObj.protocol !== "https:" && urlObj.protocol !== "http:") {
    return {
      isValid: false,
      errorMessage: {
        ar: "يجب أن يبدأ الرابط بـ https://",
        en: "URL must start with https://",
      },
    };
  }

  const hostname = urlObj.hostname.toLowerCase();
  const pathname = urlObj.pathname;

  // -------------------------------------------------------------
  // 1. INSTAGRAM
  // -------------------------------------------------------------
  const isInstagramHost =
    hostname === "instagram.com" ||
    hostname === "www.instagram.com" ||
    hostname === "instagr.am" ||
    hostname.endsWith(".instagram.com");

  if (isInstagramHost) {
    const postMatch = pathname.match(/^\/p\/([a-zA-Z0-9_-]+)/i);
    const reelMatch = pathname.match(/^\/reels?\/([a-zA-Z0-9_-]+)/i);
    const tvMatch = pathname.match(/^\/tv\/([a-zA-Z0-9_-]+)/i);

    if (postMatch) {
      const shortcode = postMatch[1];
      return {
        isValid: true,
        platform: "instagram",
        type: "image",
        canonicalUrl: `https://www.instagram.com/p/${shortcode}/`,
        originalUrl: trimmed,
        externalId: shortcode,
      };
    }

    if (reelMatch) {
      const shortcode = reelMatch[1];
      return {
        isValid: true,
        platform: "instagram",
        type: "video",
        canonicalUrl: `https://www.instagram.com/reel/${shortcode}/`,
        originalUrl: trimmed,
        externalId: shortcode,
      };
    }

    if (tvMatch) {
      const shortcode = tvMatch[1];
      return {
        isValid: true,
        platform: "instagram",
        type: "video",
        canonicalUrl: `https://www.instagram.com/tv/${shortcode}/`,
        originalUrl: trimmed,
        externalId: shortcode,
      };
    }

    // Profile check
    if (pathname.length > 1 && !pathname.startsWith("/p/") && !pathname.startsWith("/reel") && !pathname.startsWith("/tv/")) {
      return {
        isValid: false,
        errorMessage: {
          ar: "هذا رابط حساب إنستغرام، وليس رابط منشور أو Reel.",
          en: "This is an Instagram profile URL, not a post or Reel URL.",
        },
      };
    }

    return {
      isValid: false,
      errorMessage: {
        ar: "الرابط ليس منشوراً أو ريلز صالحاً على إنستغرام (يجب أن يحتوي على /p/ أو /reel/).",
        en: "URL is not a valid Instagram post or reel (must contain /p/ or /reel/).",
      },
    };
  }

  // -------------------------------------------------------------
  // 2. FACEBOOK
  // -------------------------------------------------------------
  const isFacebookHost =
    hostname === "facebook.com" ||
    hostname === "www.facebook.com" ||
    hostname === "m.facebook.com" ||
    hostname === "web.facebook.com" ||
    hostname === "fb.watch" ||
    hostname.endsWith(".facebook.com");

  if (isFacebookHost) {
    // FB Watch Shortlink: https://fb.watch/abc123/
    if (hostname === "fb.watch") {
      const watchMatch = pathname.match(/^\/([a-zA-Z0-9_-]+)/i);
      if (watchMatch) {
        const id = watchMatch[1];
        return {
          isValid: true,
          platform: "facebook",
          type: "video",
          canonicalUrl: `https://fb.watch/${id}/`,
          originalUrl: trimmed,
          externalId: id,
          isShareUrl: true,
        };
      }
    }

    // Facebook Permalink: /permalink.php?story_fbid=...&id=...
    if (pathname.includes("permalink.php")) {
      const storyFbid = urlObj.searchParams.get("story_fbid");
      const id = urlObj.searchParams.get("id");
      if (storyFbid && id) {
        return {
          isValid: true,
          platform: "facebook",
          type: "image",
          canonicalUrl: `https://www.facebook.com/permalink.php?story_fbid=${storyFbid}&id=${id}`,
          originalUrl: trimmed,
          externalId: `${id}_${storyFbid}`,
        };
      }
    }

    // Facebook Story URLs: /story.php?story_fbid=...&id=...
    if (pathname.includes("story.php")) {
      const storyFbid = urlObj.searchParams.get("story_fbid");
      const id = urlObj.searchParams.get("id");
      if (storyFbid && id) {
        return {
          isValid: true,
          platform: "facebook",
          type: "image",
          canonicalUrl: `https://www.facebook.com/story.php?story_fbid=${storyFbid}&id=${id}`,
          originalUrl: trimmed,
          externalId: `${id}_${storyFbid}`,
        };
      }
    }

    // Facebook Reels: /reel/:id or /reels/:id
    const fbReelMatch = pathname.match(/^\/reels?\/([0-9a-zA-Z_-]+)/i);
    if (fbReelMatch) {
      const reelId = fbReelMatch[1];
      return {
        isValid: true,
        platform: "facebook",
        type: "video",
        canonicalUrl: `https://www.facebook.com/reel/${reelId}/`,
        originalUrl: trimmed,
        externalId: reelId,
      };
    }

    // Facebook Watch: /watch/?v=:id
    if (pathname.startsWith("/watch")) {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        return {
          isValid: true,
          platform: "facebook",
          type: "video",
          canonicalUrl: `https://www.facebook.com/watch/?v=${videoId}`,
          originalUrl: trimmed,
          externalId: videoId,
        };
      }
    }

    // Facebook Videos: /username/videos/:id or /videos/:id
    const fbVideoMatch = pathname.match(/\/(?:[a-zA-Z0-9._-]+)\/videos\/([0-9]+)/i) || pathname.match(/\/videos\/([0-9]+)/i);
    if (fbVideoMatch) {
      const videoId = fbVideoMatch[1];
      return {
        isValid: true,
        platform: "facebook",
        type: "video",
        canonicalUrl: `https://www.facebook.com/watch/?v=${videoId}`,
        originalUrl: trimmed,
        externalId: videoId,
      };
    }

    // Facebook Posts: /username/posts/:id or /posts/:id
    const fbPostMatch = pathname.match(/\/(?:[a-zA-Z0-9._-]+)\/posts\/([0-9a-zA-Z_]+)/i) || pathname.match(/\/posts\/([0-9a-zA-Z_]+)/i);
    if (fbPostMatch) {
      const postId = fbPostMatch[1];
      const cleanPath = pathname.replace(/\/+$/, "");
      return {
        isValid: true,
        platform: "facebook",
        type: "image",
        canonicalUrl: `https://www.facebook.com${cleanPath}`,
        originalUrl: trimmed,
        externalId: postId,
      };
    }

    // Facebook Photos: /photo.php?fbid=...
    if (pathname.includes("photo.php")) {
      const fbid = urlObj.searchParams.get("fbid");
      if (fbid) {
        return {
          isValid: true,
          platform: "facebook",
          type: "image",
          canonicalUrl: `https://www.facebook.com/photo.php?fbid=${fbid}`,
          originalUrl: trimmed,
          externalId: fbid,
        };
      }
    }

    // Facebook Share URLs: /share/p/:id, /share/r/:id, /share/v/:id
    const fbShareMatch = pathname.match(/^\/share\/(p|r|v)\/([a-zA-Z0-9_-]+)/i);
    if (fbShareMatch) {
      const shareType = fbShareMatch[1].toLowerCase();
      const shareId = fbShareMatch[2];
      const mediaType: SocialMediaType = shareType === "p" ? "image" : "video";
      return {
        isValid: true,
        platform: "facebook",
        type: mediaType,
        canonicalUrl: `https://www.facebook.com/share/${shareType}/${shareId}/`,
        originalUrl: trimmed,
        externalId: shareId,
        isShareUrl: true,
      };
    }

    // Generic Facebook Share URLs: /share/:id
    const genericFbShareMatch = pathname.match(/^\/share\/([a-zA-Z0-9_-]+)/i);
    if (genericFbShareMatch) {
      const shareId = genericFbShareMatch[1];
      return {
        isValid: true,
        platform: "facebook",
        type: "image",
        canonicalUrl: `https://www.facebook.com/share/${shareId}/`,
        originalUrl: trimmed,
        externalId: shareId,
        isShareUrl: true,
      };
    }

    // Profile check
    if (pathname.length > 1 && !pathname.includes("photo.php") && !pathname.includes("permalink.php") && !pathname.includes("story.php") && !pathname.includes("/posts/") && !pathname.includes("/videos/") && !pathname.includes("/watch")) {
      return {
        isValid: false,
        errorMessage: {
          ar: "هذا رابط صفحة أو حساب فيسبوك، وليس رابط منشور أو فيديو.",
          en: "This is a Facebook profile/page URL, not a post or video URL.",
        },
      };
    }

    return {
      isValid: false,
      errorMessage: {
        ar: "الرابط ليس منشورا أو فيديو أو ريلز صالحا على فيسبوك.",
        en: "URL is not a recognized public Facebook post, video, or reel.",
      },
    };
  }

  // Unsupported domain
  return {
    isValid: false,
    errorMessage: {
      ar: "النظام يدعم روابط إنستغرام وفيسبوك العامة فقط.",
      en: "Only public Instagram and Facebook links are supported.",
    },
  };
}

/**
 * Resolves Facebook Share URLs (/share/p/..., /share/r/..., fb.watch/...)
 * by following the HTTP redirect to obtain the real canonical permalink / reel URL.
 */
export async function resolveAndCleanSocialUrl(rawUrl: string): Promise<ParsedSocialUrl> {
  const initial = parseAndValidateSocialUrl(rawUrl);
  if (!initial.isValid) return initial;

  if (!initial.isShareUrl || initial.platform !== "facebook") {
    return initial;
  }

  try {
    const res = await fetch(initial.canonicalUrl || rawUrl, {
      method: "GET",
      redirect: "manual",
    });

    const location = res.headers.get("location");
    if (location) {
      const resolved = parseAndValidateSocialUrl(location);
      if (resolved.isValid) {
        return {
          ...resolved,
          originalUrl: initial.originalUrl || rawUrl,
        };
      }
    }
  } catch (err) {
    console.warn("Could not follow Facebook share redirect:", err);
  }

  return initial;
}

/**
 * Normalizes URL for duplicate checking.
 */
export function getCanonicalSocialUrl(rawUrl: string): string | null {
  const parsed = parseAndValidateSocialUrl(rawUrl);
  return parsed.isValid && parsed.canonicalUrl ? parsed.canonicalUrl : null;
}

/**
 * Generates official embed iframe URL for fallback or direct iframe rendering.
 */
export function getSocialEmbedUrl(platform: SocialPlatform, canonicalUrl: string, type: SocialMediaType = "image"): string {
  if (platform === "instagram") {
    const clean = canonicalUrl.replace(/\/+$/, "");
    return `${clean}/embed/captioned/`;
  }

  if (platform === "facebook") {
    const encoded = encodeURIComponent(canonicalUrl);
    if (type === "video") {
      return `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=500`;
    }
    return `https://www.facebook.com/plugins/post.php?href=${encoded}&show_text=true&width=500`;
  }

  return canonicalUrl;
}

/**
 * Converts a raw Meta/FB thumbnail URL into an image URL suitable for web display.
 * Routes lookaside.fbsbx.com URLs through /api/gallery/media-proxy to bypass browser restrictions.
 */
export function getDisplayThumbnailUrl(thumbnailUrl?: string | null): string | null {
  if (!thumbnailUrl) return null;
  if (thumbnailUrl.includes("lookaside.fbsbx.com")) {
    return `/api/gallery/media-proxy?url=${encodeURIComponent(thumbnailUrl)}`;
  }
  return thumbnailUrl;
}
