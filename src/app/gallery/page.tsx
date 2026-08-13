"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Video as VideoIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Modal } from "@/components/ui/Modal";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { CTASection } from "@/components/ui/CTASection";

export default function GalleryPage() {
  const { language, dir, t } = useLanguage();
  const { galleryItems } = usePrototypeState();

  const [activeAlbum, setActiveAlbum] = useState("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const albums = [
    { id: "all", ar: "كل الألبومات", en: "All Albums" },
    { id: "robotics", ar: "الروبوتيك", en: "Robotics" },
    { id: "salon", ar: "صالون العلوم", en: "Science Salon" },
    { id: "camp", ar: "معسكر الذكاء الاصطناعي", en: "AI Bootcamp" },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeAlbum === "all" || item.album === activeAlbum
  );

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prevIdx) =>
      prevIdx! === 0 ? filteredItems.length - 1 : prevIdx! - 1
    );
  };

  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prevIdx) =>
      prevIdx! === filteredItems.length - 1 ? 0 : prevIdx! + 1
    );
  };

  const selectedItem = selectedIdx !== null ? filteredItems[selectedIdx] : null;

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
                  activeAlbum === alb.id
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
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedIdx(idx)}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-[#DCE3EA] hover:border-brand-navy/30 bg-slate-100 cursor-pointer shadow-xs transition-all duration-300 hover:shadow-md"
                >
                  {item.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={item.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <MediaFallback
                      title={item.title[language]}
                      category={item.albumName[language]}
                      aspectRatio="1/1"
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
              ))}
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
      <Modal isOpen={selectedIdx !== null} onClose={() => setSelectedIdx(null)} size="lg">
        {selectedItem && (
          <div className="relative flex flex-col items-center gap-4 select-none">
            {/* Visual Preview Box */}
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

              {/* Prev / Next controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (dir === "rtl") handleNext();
                  else handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white cursor-pointer transition-all"
                aria-label="Previous item"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (dir === "rtl") handlePrev();
                  else handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white cursor-pointer transition-all"
                aria-label="Next item"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Captions */}
            <div className="text-center w-full px-4 space-y-1.5">
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest">
                {selectedItem.albumName[language]}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-brand-dark leading-snug">
                {selectedItem.title[language]}
              </h3>
            </div>
          </div>
        )}
      </Modal>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
