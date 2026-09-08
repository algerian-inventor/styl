"use client";

import React, { Suspense, useState, useEffect, useCallback, useMemo, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { Image as ImageIcon, Video as VideoIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Modal } from "@/components/ui/Modal";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { CTASection } from "@/components/ui/CTASection";
import { SocialGalleryCard } from "@/components/gallery/SocialGalleryCard";
import { SocialMediaEmbed } from "@/components/gallery/SocialMediaEmbed";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function GalleryContent() {
  const { language, dir, t } = useLanguage();
  const { galleryItems } = usePrototypeState();
  const searchParams = useSearchParams();
  const isClient = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const albums = useMemo(() => {
    const albumMap = new Map<string, { id: string; ar: string; en: string }>();
    galleryItems.forEach((item) => {
      if (!albumMap.has(item.album)) {
        albumMap.set(item.album, {
          id: item.album,
          ar: item.albumName.ar,
          en: item.albumName.en,
        });
      }
    });

    return [
      { id: "all", ar: "كل الألبومات", en: "All Albums" },
      ...Array.from(albumMap.values()),
    ];
  }, [galleryItems]);

  const requestedAlbum = searchParams.get("album");
  const visibleActiveAlbum =
    activeAlbum && (activeAlbum === "all" || albums.some((album) => album.id === activeAlbum))
      ? activeAlbum
      : requestedAlbum && albums.some((album) => album.id === requestedAlbum)
      ? requestedAlbum
      : "all";

  const filteredItems = galleryItems.filter(
    (item) => visibleActiveAlbum === "all" || item.album === visibleActiveAlbum
  );

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prevIdx) =>
      prevIdx! === 0 ? filteredItems.length - 1 : prevIdx! - 1
    );
  }, [filteredItems.length, selectedIdx]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prevIdx) =>
      prevIdx! === filteredItems.length - 1 ? 0 : prevIdx! + 1
    );
  }, [filteredItems.length, selectedIdx]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowLeft") {
        if (dir === "rtl") handleNext();
        else handlePrev();
      } else if (e.key === "ArrowRight") {
        if (dir === "rtl") handlePrev();
        else handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, dir, filteredItems.length, handleNext, handlePrev]);

  const selectedItem = selectedIdx !== null ? filteredItems[selectedIdx] : null;
  const isSocial =
    selectedItem?.sourceType === "instagram" ||
    selectedItem?.sourceType === "facebook" ||
    Boolean(selectedItem?.socialUrl);

  if (!isClient) {
    return <div className="min-h-screen bg-[#F4F7FA]" />;
  }

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.gallery") },
        ]}
        eyebrow={language === "ar" ? "التوثيق والإعلام" : "Media & Archive"}
        title={language === "ar" ? "معرض الصور والأنشطة" : "Media & Activities Gallery"}
        description={
          language === "ar"
            ? "شاهد لقطات حية وتوثيقاً فوتوغرافياً لورشاتنا العلمية، تدريبات الشباب، والمنافسات التكنولوجية"
            : "Explore visual highlights from our hands-on robotics labs, science salons, and tech bootcamps"
        }
      />

      {/* Gallery Content Section */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          {/* Album Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {albums.map((alb) => (
              <button
                key={alb.id}
                onClick={() => setActiveAlbum(alb.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                  visibleActiveAlbum === alb.id
                    ? "bg-[#062B55] border-[#062B55] text-white shadow-xs"
                    : "bg-white border-[#DCE3EA] text-slate-700 hover:bg-slate-50"
                }`}
              >
                {language === "ar" ? alb.ar : alb.en}
              </button>
            ))}
          </div>

          {/* Mosaic Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, idx) => {
                const itemIsSocial =
                  item.sourceType === "instagram" ||
                  item.sourceType === "facebook" ||
                  Boolean(item.socialUrl);

                if (itemIsSocial) {
                  return (
                    <SocialGalleryCard
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedIdx(idx)}
                    />
                  );
                }

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedIdx(idx)}
                    className="group relative aspect-square rounded-2xl overflow-hidden border border-[#DCE3EA] hover:border-brand-navy/30 bg-slate-100 cursor-pointer shadow-xs transition-all duration-300 hover:shadow-md"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedIdx(idx);
                      }
                    }}
                    aria-label={item.title[language]}
                  >
                    <MediaFallback
                      title={item.title[language]}
                      category={item.albumName[language]}
                      aspectRatio="1/1"
                      className="absolute inset-0"
                    />
                    {item.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.url}
                        alt={item.title[language]}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <MediaFallback
                        title={item.title[language]}
                        category={item.albumName[language]}
                        aspectRatio="1/1"
                        className="absolute inset-0"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                      <div className="flex justify-end">
                        <span className="p-1.5 rounded-lg bg-black/40 text-white backdrop-blur-md">
                          {item.type === "video" ? (
                            <VideoIcon className="w-4 h-4" />
                          ) : (
                            <ImageIcon className="w-4 h-4" />
                          )}
                        </span>
                      </div>

                      <div className="space-y-1 text-white">
                        <span className="text-[10px] font-bold text-brand-green-accent uppercase tracking-wider block">
                          {item.albumName[language]}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold line-clamp-2 leading-snug">
                          {item.title[language]}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-[#DCE3EA] p-8 max-w-lg mx-auto space-y-3">
              <h3 className="text-xl font-bold text-brand-dark">
                {language === "ar" ? "لا توجد عناصر في هذا الألبوم" : "No items in this album"}
              </h3>
              <p className="text-sm text-brand-muted">
                {language === "ar"
                  ? "اختر ألبوماً آخر لتصفح الصور والأنشطة."
                  : "Please select another album to browse media."}
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Lightbox Modal */}
      <Modal
        isOpen={selectedIdx !== null}
        onClose={() => setSelectedIdx(null)}
        size={isSocial ? "md" : "lg"}
      >
        {selectedItem && (
          <div className="relative flex flex-col items-center gap-4 select-none">
            {/* 1. SOCIAL MEDIA POST EMBED */}
            {isSocial ? (
              <SocialMediaEmbed item={selectedItem} />
            ) : (
              /* 2. UPLOADED IMAGE / VIDEO EMBED */
              <div className="relative w-full aspect-video bg-[#041D38] flex items-center justify-center rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                {selectedItem.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title[language]}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <MediaFallback
                    title={selectedItem.title[language]}
                    category={selectedItem.albumName[language]}
                    aspectRatio="16/9"
                  />
                )}

                {/* Captions for regular image */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                  <span className="text-xs font-bold text-brand-green-accent uppercase tracking-widest block">
                    {selectedItem.albumName[language]}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                    {selectedItem.title[language]}
                  </h3>
                </div>
              </div>
            )}

            {/* Prev / Next controls */}
            <div className="w-full flex justify-between items-center px-2 pt-2 border-t border-slate-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (dir === "rtl") handleNext();
                  else handlePrev();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                aria-label="Previous item"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{language === "ar" ? "السابق" : "Previous"}</span>
              </button>

              <span className="text-xs text-brand-muted font-bold">
                {selectedIdx! + 1} / {filteredItems.length}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (dir === "rtl") handlePrev();
                  else handleNext();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                aria-label="Next item"
              >
                <span>{language === "ar" ? "التالي" : "Next"}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F7FA]" />}>
      <GalleryContent />
    </Suspense>
  );
}
