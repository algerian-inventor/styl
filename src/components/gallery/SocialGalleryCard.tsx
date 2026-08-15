"use client";

import React, { useState } from "react";
import { GalleryItem } from "@/data/gallery";
import { useLanguage } from "@/context/LanguageContext";
import { Play, ExternalLink } from "lucide-react";

// Official brand SVG icons for Instagram and Facebook
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface SocialGalleryCardProps {
  item: GalleryItem;
  onClick?: () => void;
  className?: string;
}

export const SocialGalleryCard: React.FC<SocialGalleryCardProps> = ({
  item,
  onClick,
  className = "",
}) => {
  const { language } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const isInstagram = item.sourceType === "instagram" || item.socialPlatform === "instagram";
  const isFacebook = item.sourceType === "facebook" || item.socialPlatform === "facebook";
  const isSocial = isInstagram || isFacebook;
  const isVideo = item.type === "video";

  const hasValidThumbnail = Boolean(item.thumbnailUrl || (item.url && !imageError && !item.url.startsWith("/images/gallery/")));

  return (
    <div
      onClick={onClick}
      className={`group relative aspect-square rounded-2xl overflow-hidden border border-[#DCE3EA] hover:border-brand-navy/30 bg-slate-900 cursor-pointer shadow-xs transition-all duration-300 hover:shadow-md ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`${item.title[language]} (${isInstagram ? "Instagram" : isFacebook ? "Facebook" : "Media"})`}
    >
      {/* 1. If real thumbnail exists, show image */}
      {hasValidThumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.thumbnailUrl || item.url}
          alt={item.title[language]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      )}

      {/* 2. Branded Social Media Card Fallback (When no image thumbnail is available) */}
      {(!hasValidThumbnail || imageError) && isSocial && (
        <div
          className={`w-full h-full p-5 flex flex-col justify-between select-none ${
            isInstagram
              ? "bg-gradient-to-br from-[#405DE6] via-[#E1306C] to-[#FCAF45] text-white"
              : "bg-gradient-to-br from-[#1877F2] via-[#0D47A1] to-[#041D38] text-white"
          }`}
        >
          {/* Header row with handle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md">
                {isInstagram ? (
                  <InstagramIcon className="w-4 h-4 text-white" />
                ) : (
                  <FacebookIcon className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="text-[11px] font-extrabold tracking-tight opacity-95">
                {isInstagram ? "@stly.constantine" : "STLY Constantine"}
              </span>
            </div>

            {isVideo && (
              <span className="p-1.5 rounded-full bg-black/30 backdrop-blur-md">
                <Play className="w-3.5 h-3.5 fill-white text-white" />
              </span>
            )}
          </div>

          {/* Central Title / Preview */}
          <div className="space-y-1 my-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 block">
              {item.albumName[language]}
            </span>
            <p className="text-xs sm:text-sm font-extrabold line-clamp-3 leading-snug text-white drop-shadow-xs">
              {item.title[language]}
            </p>
          </div>

          {/* Bottom badge */}
          <div className="flex items-center justify-between text-[10px] font-semibold text-white/90 pt-2 border-t border-white/20">
            <span>{isInstagram ? (isVideo ? "Instagram Reel" : "Instagram Post") : isVideo ? "Facebook Video" : "Facebook Post"}</span>
            <span className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <span>{language === "ar" ? "معاينة" : "Preview"}</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      )}

      {/* Platform Badge Overlay (Always visible in corner for immediate recognition) */}
      {isSocial && (
        <div className="absolute top-3 end-3 z-10">
          <div
            className={`p-1.5 rounded-lg shadow-md backdrop-blur-md flex items-center justify-center ${
              isInstagram
                ? "bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4] text-white"
                : "bg-[#1877F2] text-white"
            }`}
            title={isInstagram ? "Instagram" : "Facebook"}
          >
            {isInstagram ? (
              <InstagramIcon className="w-3.5 h-3.5" />
            ) : (
              <FacebookIcon className="w-3.5 h-3.5" />
            )}
          </div>
        </div>
      )}

      {/* Dark Hover Overlay (when thumbnail exists) */}
      {hasValidThumbnail && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
          <div className="space-y-1 text-white">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-brand-green-accent uppercase tracking-wider">
                {item.albumName[language]}
              </span>
              {isSocial && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/20 font-bold uppercase">
                  {isInstagram ? "Instagram" : "Facebook"}
                </span>
              )}
            </div>
            <h4 className="text-xs sm:text-sm font-bold line-clamp-2 leading-snug">
              {item.title[language]}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
