# STLY Constantine - Social Media Integration

This document outlines the architecture and integration rules for embedding external social media content natively into the STLY Constantine website.

## Overview

Instead of requiring manual uploads of every activity image, administrators can paste public Facebook and Instagram URLs directly into the gallery to automatically generate preview cards and embed the original posts.

The application automatically resolves URLs, fetches official metadata via the Meta Graph API (or Open Graph), handles fallback states gracefully, and explicitly blocks invalid URLs like profiles or user pages.

## Environment Variables

To ensure reliable extraction of metadata and cover images (and to avoid rate limits), the backend optionally supports official Meta App credentials:

```bash
# Found in .env.local
META_GRAPH_VERSION="v26.0" # Version of the Meta Graph API to use
META_APP_ID="your_app_id"
META_APP_SECRET="your_app_secret"
# OR an explicitly generated token:
META_OEMBED_TOKEN="your_token_here"
```

If these are not present, the system will fall back to using server-side Open Graph crawling with specialized user agents (`facebookexternalhit/1.1`) to bypass login walls.

## Supported URL Formats

The integration parses and validates URLs. It currently supports:

### Instagram
- Posts (`/p/shortcode/`)
- Reels (`/reel/shortcode/`)
- TV/Video (`/tv/shortcode/`)

### Facebook
- Standard Posts (`/posts/:id`, `/username/posts/:id`)
- Videos (`/videos/:id`, `/watch/?v=:id`, `fb.watch/`)
- Reels (`/reels/:id`)
- Photos (`/photo.php?fbid=...`)
- Share Redirects (`/share/p/`, `/share/r/`, `/share/v/`)
- Permalinks (`/permalink.php?story_fbid=...`)

### Profile Rejection

The system explicitly rejects **Profile** or **Account** URLs (e.g. `https://instagram.com/stly.constantine/` or `https://facebook.com/StlyConstantine/`). When an admin enters these URLs, the system will gracefully reject them and return a bilingual error message indicating that a specific post or reel URL is required.

## Embed Behavior

On the public-facing site (`/gallery`), social items are rendered with `SocialMediaEmbed.tsx`.

1. **Direct Iframe**: The application uses Meta's official oEmbed iframe URLs for the most accurate presentation of the social content.
2. **Timeout**: A reasonable load timeout (6 seconds) is enforced.
3. **Graceful Fallback**: If the iframe is blocked by a user's privacy extensions or ad-blocker, the system will display a clean fallback card instead of showing an infinite loading spinner. This card clearly indicates the post title, platform, and provides a direct link to view the post natively.
4. **No Fabricated Data**: If official author names or titles cannot be fetched, generic UI labels (e.g., "Instagram Reel") are used. The application does not invent or hallucinate placeholder data.

## Server-Side Image Proxying

Certain Meta images (e.g., from `lookaside.fbsbx.com`) cannot be rendered directly in `<img>` tags on the client due to strict browser CORS or Hotlinking policies. The application uses a local Next.js proxy route (`/api/gallery/media-proxy`) to serve these images efficiently on the frontend.
