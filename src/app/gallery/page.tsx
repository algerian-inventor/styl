"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Video as VideoIcon, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

export default function GalleryPage() {
  const { language, dir } = useLanguage();
  const { galleryItems } = usePrototypeState();

  const [activeAlbum, setActiveAlbum] = useState("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const albums = [
    { id: "all", ar: "الكل", en: "All Albums" },
    { id: "robotics", ar: "الروبوتيك", en: "Robotics Club" },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeader
          title={language === "ar" ? "معرض الصور والفيديو" : "Photo & Video Gallery"}
          subtitle={language === "ar" ? "شاهد لقطات حية وجلسات تكوينية بمختلف النوادي العلمية" : "Take a look at sessions and workshops inside our science clubs"}
        />
      </motion.div>

      {/* Album Filters */}
      <div className="flex flex-wrap border-b border-brand-border justify-center gap-4 pb-4">
        {albums.map((alb) => (
          <button
            key={alb.id}
            onClick={() => setActiveAlbum(alb.id)}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeAlbum === alb.id
                ? "border-brand-navy text-brand-navy"
                : "border-transparent text-brand-muted hover:text-brand-dark"
            }`}
          >
            {language === "ar" ? alb.ar : alb.en}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.03 }}
            onClick={() => setSelectedIdx(idx)}
            className="group relative h-48 rounded-lg overflow-hidden border border-brand-border cursor-pointer shadow-xs"
          >
            {/* Visual Grid Accents / Mock Image Card */}
            {item.url ? (
              <img
                src={item.url}
                alt={language === "ar" ? item.title.ar : item.title.en}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
            ) : (
              <div className="absolute inset-0 bg-brand-navy bg-sci-grid opacity-75 group-hover:scale-105 transition-all duration-300" />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />

            {/* Icons indicators */}
            <span className="absolute top-3 right-3 p-1.5 rounded-md bg-black/40 text-white z-10">
              {item.type === "video" ? (
                <VideoIcon className="h-4 w-4" />
              ) : (
                <ImageIcon className="h-4 w-4" />
              )}
            </span>

            {item.type === "video" && (
              <span className="absolute inset-0 m-auto h-10 w-10 bg-brand-green hover:bg-brand-green-light text-white rounded-full flex items-center justify-center shadow-md z-10 transition-transform group-hover:scale-110">
                <Play className="h-5 w-5 fill-white ltr:translate-x-0.5" />
              </span>
            )}

            <div className="absolute bottom-0 inset-x-0 p-4 text-white z-10 flex flex-col gap-0.5">
              <span className="text-[9px] text-brand-green font-extrabold uppercase tracking-widest">
                {language === "ar" ? item.albumName.ar : item.albumName.en}
              </span>
              <h4 className="text-xs font-bold line-clamp-1 leading-snug">
                {language === "ar" ? item.title.ar : item.title.en}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-12 text-center text-brand-muted">
          {language === "ar" ? "لا توجد عناصر في هذا المعرض حالياً." : "No gallery items in this album."}
        </div>
      )}

      {/* Lightbox Light Modal */}
      <Modal isOpen={selectedIdx !== null} onClose={() => setSelectedIdx(null)} size="lg">
        {selectedItem && (
          <div className="relative flex flex-col items-center gap-4 select-none">
            {/* Lightbox Visual Area */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center rounded-lg overflow-hidden border border-brand-border">
              {selectedItem.type === "video" ? (
                <iframe
                  src={selectedItem.videoUrl}
                  title={selectedItem.title.en}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 bg-brand-dark bg-sci-grid flex items-center justify-center">
                  {/* Mock image preview */}
                  <ImageIcon className="h-16 w-16 text-brand-green opacity-40 animate-pulse" />
                  <span className="absolute text-xs text-slate-400 bottom-4">
                    {language === "ar" ? "لقطة للمعاينة عالية الجودة" : "High-fidelity mock preview"}
                  </span>
                </div>
              )}

              {/* Navigation overlay controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (dir === "rtl") {
                    handleNext();
                  } else {
                    handlePrev();
                  }
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white cursor-pointer"
                aria-label={dir === "rtl" ? "العنصر التالي" : "Previous item"}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (dir === "rtl") {
                    handlePrev();
                  } else {
                    handleNext();
                  }
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white cursor-pointer"
                aria-label={dir === "rtl" ? "العنصر السابق" : "Next item"}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Captions */}
            <div className="text-center w-full px-4 space-y-1">
              <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest">
                {language === "ar" ? selectedItem.albumName.ar : selectedItem.albumName.en}
              </span>
              <h3 className="text-sm font-extrabold text-brand-dark leading-snug">
                {language === "ar" ? selectedItem.title.ar : selectedItem.title.en}
              </h3>
              <p className="text-[10px] text-brand-muted">
                {selectedItem.type === "video" ? (
                  language === "ar" ? "تغطية مرئية" : "Video Coverage"
                ) : (
                  language === "ar" ? "توثيق فوتوغرافي" : "Photographic Documentation"
                )}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
