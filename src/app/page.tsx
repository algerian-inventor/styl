"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  User,
  CheckCircle2,
  Mail,
  Phone,
  Bookmark,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { fields, iconMap } from "@/data/fields";

export default function HomePage() {
  const { t, language, dir } = useLanguage();
  const { programs, events, articles, galleryItems, partners, siteSettings } = usePrototypeState();

  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Filter sections data
  const featuredPrograms = programs.slice(0, 3);
  const upcomingEvents = events.filter((e) => !e.isClosed).slice(0, 2);
  const latestNews = articles.slice(0, 3);
  const previewGallery = galleryItems.slice(0, 4);

  // Animation constants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="w-full">
      {/* 2. HERO SECTION */}
      <section 
        className="relative min-h-[85vh] flex items-center bg-brand-dark overflow-hidden py-16 bg-sci-grid"
        style={siteSettings.heroBannerUrl ? {
          backgroundImage: `linear-gradient(to bottom, rgba(11, 31, 51, 0.75), rgba(11, 31, 51, 0.85)), url(${siteSettings.heroBannerUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        } : undefined}
      >
        {/* Decorative subtle abstract elements */}
        {!siteSettings.heroBannerUrl && (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-navy/35 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-3xl text-start space-y-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-brand-green text-xs sm:text-sm font-extrabold uppercase tracking-widest border border-brand-green/30 bg-brand-green/5 px-3 py-1 rounded-full"
            >
              {language === "ar" ? "قسم الشباب والابتكار" : "Youth & Innovation Department"}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
            >
              {language === "ar" ? siteSettings.leagueNameAr : siteSettings.leagueNameEn}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-brand-green font-bold"
            >
              {language === "ar" ? siteSettings.sloganAr : siteSettings.sloganEn}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed"
            >
              {language === "ar"
                ? "حاضنة علمية تفاعلية بمدينة قسنطينة تهدف لتمكين الشباب في شتى مجالات الابتكار التكنولوجي والعلوم والبرمجة لصناعة قادة المستقبل."
                : "A scientific incubator in Constantine empowering young minds across tech fields, robotics, AI, and science to build future leaders."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4 justify-start"
            >
              <Link href="/membership">
                <Button variant="secondary" size="lg">
                  {t("hero.joinBtn")}
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  {t("hero.aboutBtn")}
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="ghost" size="lg" className="text-brand-green hover:bg-brand-green/10" rightIcon={<ArrowIcon className="h-4 w-4" />}>
                  {t("hero.eventsBtn")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="space-y-6">
              <SectionHeader
                title={t("about.title")}
                subtitle={t("about.subtitle")}
                align="start"
              />
              <p className="text-brand-dark text-base leading-relaxed font-semibold">
                {t("about.desc1")}
              </p>
              <p className="text-brand-muted text-sm leading-relaxed">
                {t("about.desc2")}{" "}
                {language === "ar"
                  ? "منذ تأسيسنا، نسعى لبناء بيئة متكاملة تدمج التأطير الأكاديمي مع التطبيق الميداني لتوفير المهارات والحلول الفعالة."
                  : "Since our establishment, we build environments merging academic theories with field practice to produce active skills."}
              </p>
              <div>
                <Link href="/about">
                  <Button variant="primary" rightIcon={<ArrowIcon className="h-4 w-4" />}>
                    {language === "ar" ? "قراءة المزيد عن الرابطة" : "Read more about us"}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Visual representation card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-2xl bg-brand-bg border border-brand-border bg-dot-pattern flex flex-col justify-center min-h-[300px]"
            >
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <span className="h-10 w-10 bg-brand-navy text-white rounded-lg flex items-center justify-center font-bold">
                    STLY
                  </span>
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm">
                      {language === "ar" ? "الرابطة العلمية والتقنية" : "Scientific League"}
                    </h4>
                    <p className="text-xs text-brand-muted">{language === "ar" ? "تأسست لدعم شباب قسنطينة" : "Founded to empower youth"}</p>
                  </div>
                </div>
                <div className="h-[1px] bg-brand-border w-full" />
                <ul className="space-y-2">
                  <li className="flex gap-2 items-center text-xs text-brand-dark">
                    <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />
                    <span>{t("about.obj1")}</span>
                  </li>
                  <li className="flex gap-2 items-center text-xs text-brand-dark">
                    <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />
                    <span>{t("about.obj2")}</span>
                  </li>
                  <li className="flex gap-2 items-center text-xs text-brand-dark">
                    <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />
                    <span>{t("about.obj3")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. VISION AND MISSION */}
      <section className="py-20 bg-brand-bg border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border border-brand-border rounded-xl p-8 shadow-xs relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-navy/5 rounded-bl-full pointer-events-none" />
              <h3 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green" />
                {t("about.visionTitle")}
              </h3>
              <p className="text-sm text-brand-dark leading-relaxed font-medium">
                {t("about.visionDesc")}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border border-brand-border rounded-xl p-8 shadow-xs relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-bl-full pointer-events-none" />
              <h3 className="text-xl font-bold text-brand-green mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-navy" />
                {t("about.missionTitle")}
              </h3>
              <p className="text-sm text-brand-dark leading-relaxed font-medium">
                {t("about.missionDesc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. SCIENTIFIC FIELDS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t("fields.title")}
            subtitle={t("fields.subtitle")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fields.map((field) => {
              const IconComp = iconMap[field.iconName];
              return (
                <motion.div key={field.id} whileHover={{ y: -4 }}>
                  <Card className="h-full flex flex-col justify-between border-t-4 border-t-brand-navy">
                    <CardContent className="p-6 space-y-4">
                      <div className={`p-3 rounded-lg border w-fit ${field.colorClass}`}>
                        {IconComp && <IconComp className="h-6 w-6" />}
                      </div>
                      <h3 className="text-base font-bold text-brand-dark">
                        {language === "ar" ? field.title.ar : field.title.en}
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        {language === "ar" ? field.description.ar : field.description.en}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/fields">
              <Button variant="outline" rightIcon={<ArrowIcon className="h-4 w-4" />}>
                {language === "ar" ? "استكشف كل التفاصيل والمناهج" : "Explore all detailed paths"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROGRAMS */}
      <section className="py-20 bg-brand-bg border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t("programs.title")}
            subtitle={t("programs.subtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((program) => (
              <motion.div key={program.id} whileHover={{ y: -4 }}>
                <Card className="h-full flex flex-col justify-between bg-white">
                  <div className="relative h-44 bg-brand-dark/20 flex items-center justify-center overflow-hidden border-b border-brand-border">
                    {/* fallback cover illustration */}
                    <div className="absolute inset-0 bg-brand-navy bg-dot-pattern opacity-40" />
                    <span className="text-xs font-extrabold text-brand-dark bg-white border border-brand-border px-3 py-1.5 rounded-md shadow-xs z-10 uppercase tracking-widest">
                      {language === "ar" ? program.category.ar : program.category.en}
                    </span>
                  </div>

                  <CardContent className="p-5 flex-grow space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant={program.status === "active" ? "success" : program.status === "upcoming" ? "warning" : "default"}>
                        {program.status === "active"
                          ? t("programs.statusActive")
                          : program.status === "upcoming"
                          ? t("programs.statusUpcoming")
                          : t("programs.statusCompleted")}
                      </Badge>
                      <span className="text-[10px] text-brand-muted font-bold flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {program.startDate}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-brand-dark line-clamp-1">
                      {language === "ar" ? program.name.ar : program.name.en}
                    </h3>
                    <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                      {language === "ar" ? program.summary.ar : program.summary.en}
                    </p>
                  </CardContent>

                  <CardFooter className="px-5 py-3 border-t border-brand-border">
                    <Link href={`/programs/${program.slug}`} className="w-full">
                      <Button variant="ghost" size="sm" className="w-full" rightIcon={<ArrowIcon className="h-4 w-4" />}>
                        {t("programs.viewDetails")}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/programs">
              <Button variant="outline" rightIcon={<ArrowIcon className="h-4 w-4" />}>
                {language === "ar" ? "تصفح كافة النوادي والبرامج" : "Browse all clubs and programs"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. UPCOMING EVENTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t("events.title")}
            subtitle={t("events.subtitle")}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <motion.div key={event.id} whileHover={{ y: -3 }}>
                <Card className="flex flex-col sm:flex-row h-full overflow-hidden border border-brand-border">
                  <div className="relative w-full sm:w-2/5 min-h-[160px] bg-brand-navy flex items-center justify-center border-b sm:border-b-0 sm:border-l border-brand-border overflow-hidden">
                    <div className="absolute inset-0 bg-brand-green/20 bg-sci-grid" />
                    <span className="text-xs font-bold text-white bg-brand-navy border border-brand-green px-2.5 py-1 rounded-md z-10">
                      {event.category}
                    </span>
                  </div>

                  <CardContent className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-brand-dark line-clamp-1">
                        {language === "ar" ? event.title.ar : event.title.en}
                      </h3>
                      <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                        {language === "ar" ? event.summary.ar : event.summary.en}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-brand-muted">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-brand-green" />
                        <span>{event.date}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4 text-brand-green" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-brand-green" />
                        <span className="line-clamp-1">{language === "ar" ? event.location.ar : event.location.en}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-brand-border flex items-center justify-between">
                      <Link href={`/events/${event.slug}`}>
                        <Button variant="primary" size="sm">
                          {t("events.registerNow")}
                        </Button>
                      </Link>
                      <Link href={`/events/${event.slug}`}>
                        <Button variant="ghost" size="sm">
                          {t("events.details")}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/events">
              <Button variant="outline" rightIcon={<ArrowIcon className="h-4 w-4" />}>
                {language === "ar" ? "عرض الأجندة الكاملة للفعاليات" : "View complete event calendar"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. LATEST NEWS */}
      <section className="py-20 bg-brand-bg border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t("nav.news")}
            subtitle={language === "ar" ? "آخر الأخبار والمقالات العلمية الصادرة عن الرابطة" : "Latest news and articles published by the league"}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <motion.div key={article.id} whileHover={{ y: -4 }}>
                <Card className="h-full flex flex-col justify-between bg-white">
                  <div className="relative h-44 bg-brand-navy flex items-center justify-center overflow-hidden border-b border-brand-border">
                    <div className="absolute inset-0 bg-brand-dark bg-sci-grid opacity-30" />
                    {article.isFeatured && (
                      <span className="absolute top-2 right-2 bg-brand-green text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {language === "ar" ? "مميز" : "Featured"}
                      </span>
                    )}
                    <span className="text-xs font-bold text-brand-dark bg-white border border-brand-border px-2.5 py-1 rounded-md z-10">
                      {language === "ar" ? article.category.ar : article.category.en}
                    </span>
                  </div>

                  <CardContent className="p-5 flex-grow space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-brand-muted">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {language === "ar" ? article.author.ar : article.author.en}
                      </span>
                      <span>•</span>
                      <span>{article.publishedDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-brand-dark line-clamp-2 leading-snug">
                      {language === "ar" ? article.title.ar : article.title.en}
                    </h3>
                    <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                      {language === "ar" ? article.summary.ar : article.summary.en}
                    </p>
                  </CardContent>

                  <CardFooter className="px-5 py-3 border-t border-brand-border">
                    <Link href={`/news/${article.slug}`} className="w-full">
                      <Button variant="ghost" size="sm" className="w-full" rightIcon={<ArrowIcon className="h-4 w-4" />}>
                        {language === "ar" ? "اقرأ الخبر كاملاً" : "Read full article"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/news">
              <Button variant="outline" rightIcon={<ArrowIcon className="h-4 w-4" />}>
                {language === "ar" ? "تصفح الأرشيف الإعلامي" : "Browse media archive"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. GALLERY PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t("nav.gallery")}
            subtitle={language === "ar" ? "توثيق بالصور والفيديو لأبرز نشاطات ومخيمات الرابطة" : "Visual documentation of our events and training bootcamps"}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewGallery.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="relative h-48 rounded-lg overflow-hidden border border-brand-border group cursor-pointer"
              >
                {/* Visual Placeholder */}
                {item.url ? (
                  <img
                    src={item.url}
                    alt={language === "ar" ? item.title.ar : item.title.en}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-brand-navy bg-sci-grid opacity-75 group-hover:scale-105 transition-all duration-300" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                <div className="absolute bottom-0 inset-x-0 p-4 text-white z-10 flex flex-col gap-1">
                  <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider">
                    {language === "ar" ? item.albumName.ar : item.albumName.en}
                  </span>
                  <h4 className="text-xs font-bold line-clamp-1">
                    {language === "ar" ? item.title.ar : item.title.en}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/gallery">
              <Button variant="outline" rightIcon={<ArrowIcon className="h-4 w-4" />}>
                {language === "ar" ? "تصفح معرض الصور والفيديو الكامل" : "Explore full gallery"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. PARTNERS */}
      <section className="py-16 bg-brand-bg border-y border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-navy">
              {language === "ar" ? "شركاء الرابطة العلمية" : "STLY Constantine Partners"}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white border border-brand-border rounded-lg p-5 flex flex-col items-center justify-center min-h-[90px] shadow-xs text-center hover:border-brand-navy/25 transition-colors"
              >
                {/* Fallback logo visual */}
                <span className="text-xs font-bold text-brand-dark">
                  {language === "ar" ? partner.name.ar : partner.name.en}
                </span>
                <span className="text-[9px] text-brand-green font-semibold mt-1">
                  {language === "ar" ? partner.category.ar : partner.category.en}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/partners">
              <span className="text-xs font-semibold text-brand-navy hover:underline cursor-pointer flex items-center justify-center gap-1">
                {language === "ar" ? "تفاصيل الشراكات وبروتوكولات التعاون" : "Partnership details & cooperation protocols"}
                <ArrowIcon className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. MEMBERSHIP CALL TO ACTION */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden bg-dot-pattern">
        <div className="absolute inset-0 bg-brand-navy/60 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            {language === "ar" ? "جاهز للانطلاق معنا في رحلة الابتكار؟" : "Ready to join our journey of innovation?"}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {language === "ar"
              ? "افتح آفاقاً جديدة، طور مهاراتك التقنية، وساهم في صياغة الحلول لمدينة قسنطينة. باب العضوية مفتوح للشباب الشغوفين."
              : "Open new horizons, design tech solutions, and grow your skillset. Membership applications are open for motivated youth."}
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/membership">
              <Button variant="secondary" size="lg">
                {t("nav.membership")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                {t("contact.title")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 12. CONTACT PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <SectionHeader
                title={t("contact.title")}
                subtitle={t("contact.subtitle")}
                align="start"
              />
              <p className="text-brand-dark text-sm leading-relaxed">
                {language === "ar"
                  ? "سواء كنت ترغب في الاستفسار عن برامجنا التدريبية، أو ترغب في إقامة شراكة علمية، يسعدنا تواصلك معنا."
                  : "Whether you want to inquire about our modules, or discuss a scientific partnership, we'd love to hear from you."}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-3 items-center text-sm">
                  <span className="p-2 rounded bg-brand-bg text-brand-navy border border-brand-border">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <h5 className="font-bold text-brand-dark">{t("contact.email")}</h5>
                    <p className="text-xs text-brand-muted">{siteSettings.email}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center text-sm">
                  <span className="p-2 rounded bg-brand-bg text-brand-navy border border-brand-border">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <h5 className="font-bold text-brand-dark">{t("contact.phone")}</h5>
                    <p className="text-xs text-brand-muted">{siteSettings.phone}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/contact">
                  <Button variant="primary" rightIcon={<ArrowIcon className="h-4 w-4" />}>
                    {language === "ar" ? "نموذج الاتصال وخريطة المقر" : "Contact form & headquarters directions"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick FAQ card placeholder */}
            <div className="bg-brand-bg border border-brand-border rounded-xl p-8 space-y-4 flex flex-col justify-center">
              <h4 className="font-bold text-brand-dark text-sm border-b border-brand-border pb-2">
                {language === "ar" ? "هل لديك أسئلة سريعة؟" : "Have quick questions?"}
              </h4>
              <div className="space-y-3 text-xs text-brand-dark">
                <div className="space-y-1">
                  <p className="font-extrabold">{language === "ar" ? "كيف يمكنني التسجيل في الفعاليات؟" : "How do I register for events?"}</p>
                  <p className="text-brand-muted leading-relaxed">
                    {language === "ar" ? "تصفح صفحة الفعاليات، واختر الفعالية المناسبة ثم املأ استمارة الحجز لتأكيد حضورك." : "Browse the events catalog, select an event, and submit the booking form to secure your ticket."}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-extrabold">{language === "ar" ? "ما هي الفئة العمرية لعضوية الرابطة؟" : "What is the age limit for membership?"}</p>
                  <p className="text-brand-muted leading-relaxed">
                    {language === "ar" ? "العضوية موجهة للشباب الذين تتراوح أعمارهم بين 15 و 35 سنة." : "Membership is oriented for young people aged between 15 and 35."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
