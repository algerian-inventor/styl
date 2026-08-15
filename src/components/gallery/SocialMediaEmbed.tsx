"use client";

import React, { useEffect, useState, useRef } from "react";
import { GalleryItem } from "@/data/gallery";
import { useLanguage } from "@/context/LanguageContext";
import { InstagramIcon, FacebookIcon } from "./SocialGalleryCard";
import { ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { getSocialEmbedUrl } from "@/lib/social-media";

interface SocialMediaEmbedProps {
  item: GalleryItem;
}

export const SocialMediaEmbed: React.FC<SocialMediaEmbedProps> = ({ item }) => {
  const { language } = useLanguage();
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isInstagram = item.sourceType === "instagram" || item.socialPlatform === "instagram";
  const isFacebook = item.sourceType === "facebook" || item.socialPlatform === "facebook";
  const postUrl = item.socialUrl || item.url;
  const isVideo = item.type === "video";
  const isLoaded = loadedId === item.id;

  useEffect(() => {
    let isMounted = true;

    // Timeout to detect if third-party script is blocked by adblock
    const timer = setTimeout(() => {
      if (isMounted) {
        setUseIframeFallback(true);
      }
    }, 3500);

    // 1. INSTAGRAM EMBED LOGIC
    if (isInstagram && postUrl) {
      const loadInstagram = () => {
        if (typeof window !== "undefined") {
          const w = window as unknown as { instgrm?: { Embeds: { process: () => void } } };
          if (w.instgrm?.Embeds) {
            w.instgrm.Embeds.process();
            if (isMounted) setLoadedId(item.id);
          } else {
            const existingScript = document.getElementById("instagram-embed-script");
            if (!existingScript) {
              const script = document.createElement("script");
              script.id = "instagram-embed-script";
              script.src = "https://www.instagram.com/embed.js";
              script.async = true;
              script.defer = true;
              script.onload = () => {
                if (isMounted) {
                  w.instgrm?.Embeds?.process();
                  setLoadedId(item.id);
                }
              };
              script.onerror = () => {
                if (isMounted) {
                  setUseIframeFallback(true);
                }
              };
              document.body.appendChild(script);
            } else {
              // Script exists, re-process
              setTimeout(() => {
                w.instgrm?.Embeds?.process();
                if (isMounted) setLoadedId(item.id);
              }, 300);
            }
          }
        }
      };

      loadInstagram();
    }

    // 2. FACEBOOK EMBED LOGIC
    if (isFacebook && postUrl) {
      const loadFacebook = () => {
        if (typeof window !== "undefined") {
          const w = window as unknown as { FB?: { XFBML: { parse: (el?: HTMLElement) => void } } };
          if (w.FB?.XFBML) {
            w.FB.XFBML.parse(containerRef.current || undefined);
            if (isMounted) setLoadedId(item.id);
          } else {
            const existingScript = document.getElementById("facebook-jssdk");
            if (!existingScript) {
              const script = document.createElement("script");
              script.id = "facebook-jssdk";
              script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
              script.async = true;
              script.defer = true;
              script.crossOrigin = "anonymous";
              script.onload = () => {
                if (isMounted) {
                  w.FB?.XFBML?.parse(containerRef.current || undefined);
                  setLoadedId(item.id);
                }
              };
              script.onerror = () => {
                if (isMounted) {
                  setUseIframeFallback(true);
                }
              };
              document.body.appendChild(script);
            } else {
              setTimeout(() => {
                w.FB?.XFBML?.parse(containerRef.current || undefined);
                if (isMounted) setLoadedId(item.id);
              }, 300);
            }
          }
        }
      };

      loadFacebook();
    }

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [item.id, isInstagram, isFacebook, postUrl]);

  const iframeSrc = isInstagram
    ? getSocialEmbedUrl("instagram", postUrl, isVideo ? "video" : "image")
    : getSocialEmbedUrl("facebook", postUrl, isVideo ? "video" : "image");

  return (
    <div className="w-full flex flex-col items-center max-w-xl mx-auto space-y-4">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg text-white ${
              isInstagram
                ? "bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4]"
                : "bg-[#1877F2]"
            }`}
          >
            {isInstagram ? (
              <InstagramIcon className="w-4 h-4" />
            ) : (
              <FacebookIcon className="w-4 h-4" />
            )}
          </div>
          <div>
            <span className="text-xs font-extrabold text-brand-dark block">
              {isInstagram ? "Instagram" : "Facebook"}
            </span>
            <span className="text-[10px] text-brand-muted">
              {isInstagram ? "@stly.constantine" : "STLY Constantine"}
            </span>
          </div>
        </div>

        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-brand-navy bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <span>{language === "ar" ? "فتح المنشور الأصلي" : "View Original Post"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Embed Container Box */}
      <div
        ref={containerRef}
        className="w-full min-h-[480px] bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-2 relative overflow-hidden"
      >
        {/* Loading Spinner */}
        {!isLoaded && !useIframeFallback && !loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs z-10 space-y-2">
            <RefreshCw className="w-6 h-6 text-brand-navy animate-spin" />
            <p className="text-xs font-bold text-brand-dark">
              {language === "ar" ? "جاري تحميل المنشور..." : "Loading post embed..."}
            </p>
          </div>
        )}

        {/* 1. Official Instagram Blockquote Embed */}
        {isInstagram && !useIframeFallback && (
          <div className="w-full flex justify-center">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={postUrl}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: "0",
                borderRadius: "12px",
                margin: "1px",
                maxWidth: "540px",
                minWidth: "326px",
                padding: "0",
                width: "99.375%",
              }}
            >
              <div style={{ padding: "16px" }}>
                <a
                  href={postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#FFFFFF",
                    lineHeight: "0",
                    padding: "0 0",
                    textAlign: "center",
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  <span className="text-xs text-slate-400">Loading Instagram Post...</span>
                </a>
              </div>
            </blockquote>
          </div>
        )}

        {/* 2. Official Facebook XFBML Embed */}
        {isFacebook && !useIframeFallback && (
          <div className="w-full flex justify-center">
            {isVideo ? (
              <div
                className="fb-video"
                data-href={postUrl}
                data-width="500"
                data-allowfullscreen="true"
                data-show-text="false"
              />
            ) : (
              <div
                className="fb-post"
                data-href={postUrl}
                data-width="500"
                data-show-text="true"
              />
            )}
          </div>
        )}

        {/* 3. Direct Iframe Embed Fallback (Works if script is blocked or delayed) */}
        {useIframeFallback && !loadError && (
          <iframe
            src={iframeSrc}
            className="w-full min-h-[520px] rounded-lg border-0"
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            onLoad={() => setLoadedId(item.id)}
            onError={() => setLoadError(true)}
            title={item.title[language]}
          />
        )}

        {/* 4. Graceful Error / Blocked State */}
        {loadError && (
          <div className="p-8 text-center space-y-3 max-w-sm">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-extrabold text-brand-dark">
              {language === "ar" ? "تعذر عرض المنشور المضمن مباشرة" : "Could not load embedded post"}
            </h4>
            <p className="text-xs text-brand-muted">
              {language === "ar"
                ? "قد يكون المنشور مقيداً أو تم حجبه بواسطة مانع الإعلانات. يمكنك مشاهدته مباشرة عبر الرابط الأصلي."
                : "The post may be restricted or blocked by privacy extensions. You can view it directly on the platform."}
            </p>
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#062B55] text-white text-xs font-bold hover:bg-[#041D38] transition-colors"
            >
              <span>{language === "ar" ? "مشاهدة على المنصة الأصلية" : "View on Platform"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Post title & details */}
      <div className="w-full text-center space-y-1">
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider">
          {item.albumName[language]}
        </span>
        <h3 className="text-sm sm:text-base font-extrabold text-brand-dark leading-snug">
          {item.title[language]}
        </h3>
      </div>
    </div>
  );
};
