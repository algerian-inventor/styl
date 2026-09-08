"use client";

import React, { useEffect, useState } from "react";
import { GalleryItem } from "@/data/gallery";
import { useLanguage } from "@/context/LanguageContext";
import { InstagramIcon, FacebookIcon } from "./SocialGalleryCard";
import { ExternalLink, RefreshCw } from "lucide-react";
import { getSocialEmbedUrl } from "@/lib/social-media";

interface SocialMediaEmbedProps {
  item: GalleryItem;
}

export const SocialMediaEmbed: React.FC<SocialMediaEmbedProps> = ({ item }) => {
  const { language } = useLanguage();
  const [embedState, setEmbedState] = useState<{
    itemId: string;
    isLoaded: boolean;
    hasError: boolean;
  } | null>(null);

  const isInstagram = item.sourceType === "instagram" || item.socialPlatform === "instagram";
  const postUrl = item.socialUrl || item.url;
  const isVideo = item.type === "video";
  const isCurrentEmbed = embedState?.itemId === item.id;
  const isLoaded = Boolean(isCurrentEmbed && embedState?.isLoaded);
  const loadError = Boolean(isCurrentEmbed && embedState?.hasError);
  const platformLabel = isInstagram
    ? isVideo
      ? "Instagram Reel"
      : "Instagram Post"
    : isVideo
    ? "Facebook Reel"
    : "Facebook Post";

  // Timeout effect to prevent infinite loading
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!isLoaded && !loadError) {
      timeoutId = setTimeout(() => {
        setEmbedState({ itemId: item.id, isLoaded: false, hasError: true });
      }, 6000); // 6 seconds reasonable timeout
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [item.id, isLoaded, loadError]);

  useEffect(() => {
    let isMounted = true;

    // Instagram script loader
    if (isInstagram && postUrl) {
      const w = typeof window !== "undefined" ? (window as unknown as { instgrm?: { Embeds: { process: () => void } } }) : null;
      if (w?.instgrm?.Embeds) {
        w.instgrm.Embeds.process();
      } else if (typeof document !== "undefined") {
        const existingScript = document.getElementById("instagram-embed-script");
        if (!existingScript) {
          const script = document.createElement("script");
          script.id = "instagram-embed-script";
          script.src = "https://www.instagram.com/embed.js";
          script.async = true;
          script.defer = true;
          script.onload = () => {
            if (isMounted) {
              w?.instgrm?.Embeds?.process();
            }
          };
          document.body.appendChild(script);
        }
      }
    }

    return () => {
      isMounted = false;
    };
  }, [item.id, isInstagram, postUrl]);

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
              {platformLabel}
            </span>
            <span className="text-[10px] text-brand-muted">
              {item.title?.[language] ? item.title[language] : platformLabel}
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
      <div className="w-full min-h-[280px] sm:min-h-[420px] bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-2 relative overflow-hidden">
        {/* Loading Spinner */}
        {!isLoaded && !loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs z-10 space-y-2">
            <RefreshCw className="w-6 h-6 text-brand-navy animate-spin" />
            <p className="text-xs font-bold text-brand-dark">
              {language === "ar" ? "جاري تحميل المنشور..." : "Loading post embed..."}
            </p>
          </div>
        )}

        {/* Official Direct Iframe Embed (Works seamlessly for Facebook Posts, Reels & Instagram) */}
        {!loadError && (
          <iframe
            src={iframeSrc}
            key={item.id}
            className={`w-full max-w-[500px] rounded-lg border-0 transition-opacity duration-300 ${
              isVideo ? "min-h-[430px] sm:min-h-[620px]" : "min-h-[420px] sm:min-h-[560px]"
            } ${isLoaded ? "opacity-100" : "opacity-0"}`}
            scrolling="yes"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            onLoad={() => setEmbedState({ itemId: item.id, isLoaded: true, hasError: false })}
            onError={() => setEmbedState({ itemId: item.id, isLoaded: false, hasError: true })}
            title={item.title[language]}
          />
        )}

        {/* Graceful Error / Blocked State */}
        {loadError && (
          <div className="p-6 sm:p-8 text-center space-y-3 max-w-sm">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto ${
                isInstagram
                  ? "bg-pink-50 text-pink-700 border border-pink-100"
                  : "bg-blue-50 text-blue-700 border border-blue-100"
              }`}
            >
              {isInstagram ? <InstagramIcon className="w-6 h-6" /> : <FacebookIcon className="w-6 h-6" />}
            </div>
            <p className="text-xs font-extrabold text-brand-green uppercase tracking-wider">
              {platformLabel}
            </p>
            <h4 className="text-sm font-extrabold text-brand-dark">
              {item.title[language]}
            </h4>
            <p className="text-xs text-brand-muted">
              {language === "ar"
                ? "يمكنك مشاهدة هذا المحتوى مباشرة على منصة التواصل الاجتماعي."
                : "You can view this content directly on the social media platform."}
            </p>
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#062B55] text-white text-xs font-bold hover:bg-[#041D38] transition-colors mt-2"
            >
              <span>{language === "ar" ? "فتح المنشور الأصلي" : "View Original Post"}</span>
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
