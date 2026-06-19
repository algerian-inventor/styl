"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PartnersPage() {
  const { language, dir } = useLanguage();
  const { partners } = usePrototypeState();

  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeader
          title={language === "ar" ? "شركاء الرابطة" : "Partners & Collaborators"}
          subtitle={language === "ar" ? "فخورون بالتعاون مع كبرى المؤسسات الجامعية والبحثية لبناء قدرات الشباب" : "Proud to collaborate with leading universities & public entities to build youth capacity"}
        />
      </motion.div>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partners.map((partner, idx) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Card className="h-full flex flex-col justify-between border border-brand-border hover:border-brand-navy/35 bg-white">
              <CardContent className="p-6 space-y-6">
                {/* Header */}
                <div className="flex gap-4 items-center justify-between border-b border-brand-border pb-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-brand-dark leading-snug">
                      {language === "ar" ? partner.name.ar : partner.name.en}
                    </h3>
                    <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider bg-brand-green/5 border border-brand-green/20 px-2 py-0.5 rounded">
                      {language === "ar" ? partner.category.ar : partner.category.en}
                    </span>
                  </div>
                  
                  {/* Mock logo shape */}
                  <div className="h-12 w-12 rounded bg-brand-bg text-brand-navy border border-brand-border flex items-center justify-center font-bold text-xs">
                    {partner.name.en.split(" ").slice(0,2).map(n=>n[0]).join("")}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                  {language === "ar" ? partner.description.ar : partner.description.en}
                </p>
              </CardContent>

              {/* Action link */}
              {partner.website && partner.website !== "#" && (
                <div className="px-6 py-4 bg-brand-bg/50 border-t border-brand-border flex items-center justify-between">
                  <a href={partner.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" leftIcon={<Globe className="h-4 w-4" />}>
                      {language === "ar" ? "زيارة الموقع الإلكتروني" : "Visit Website"}
                    </Button>
                  </a>
                  <span className="text-[10px] font-bold text-brand-muted">
                    {language === "ar" ? "رابط خارجي" : "External Link"}
                  </span>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
