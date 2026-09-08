"use client";

import React from "react";
import { Globe, Building2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";

export default function PartnersPage() {
  const { t, language } = useLanguage();
  const { partners } = usePrototypeState();

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.partners") },
        ]}
        eyebrow={language === "ar" ? "الشبكة المؤسساتية" : "Institutional Network"}
        title={language === "ar" ? "شركاء الرابطة" : "Our Partners & Collaborators"}
        description={
          language === "ar"
            ? "نتعاون مع كبرى المؤسسات الجامعية، مراكز البحث العلمي، والهيئات الشبابية لتوفير بيئة تكوينية متكاملة"
            : "Proud to collaborate with leading universities, scientific research centers, and institutions"
        }
      />

      {/* Partners Grid Section */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 hover:shadow-md flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  {/* Partner Header */}
                  <div className="flex items-start justify-between gap-4 border-b border-[#DCE3EA] pb-5">
                    <div className="space-y-1.5">
                      <span className="text-xs font-extrabold text-brand-green uppercase tracking-wider bg-brand-green/10 px-2.5 py-1 rounded">
                        {partner.category[language]}
                      </span>
                      <h3 className="text-xl font-bold text-brand-dark">
                        {partner.name[language]}
                      </h3>
                    </div>

                    <div className="relative w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 p-2">
                      <Building2 className="w-6 h-6 text-brand-navy" />
                      {partner.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={partner.logo}
                          alt={partner.name[language]}
                          className="absolute inset-2 max-h-[calc(100%-1rem)] max-w-[calc(100%-1rem)] object-contain bg-slate-100"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : null}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                    {partner.description[language]}
                  </p>
                </div>

                {/* Footer website link */}
                {partner.website && partner.website !== "#" && (
                  <div className="pt-4 border-t border-[#DCE3EA]/60 flex items-center justify-between">
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-brand-navy hover:text-brand-green transition-colors"
                    >
                      <Globe className="w-4 h-4 text-brand-green" />
                      <span>{language === "ar" ? "زيارة الموقع الإلكتروني" : "Visit Official Website"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
