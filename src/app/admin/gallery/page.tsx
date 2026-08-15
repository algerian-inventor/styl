"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { GalleryItem } from "@/data/gallery";
import {
  parseAndValidateSocialUrl,
  getCanonicalSocialUrl,
  SocialPreviewResult,
} from "@/lib/social-media";
import { InstagramIcon, FacebookIcon } from "@/components/gallery/SocialGalleryCard";
import {
  Search,
  Plus,
  Trash2,
  Upload,
  Share2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ImageIcon,
} from "lucide-react";

type AdminCreationMode = "upload" | "social";

export default function AdminGalleryPage() {
  const { t, language } = useLanguage();
  const { galleryItems, addGalleryItem, deleteGalleryItem } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Creation tab: 'upload' | 'social'
  const [creationMode, setCreationMode] = useState<AdminCreationMode>("social");

  // Manual upload form states
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [album, setAlbum] = useState("robotics");
  const [imageUrl, setImageUrl] = useState("");

  // Social import form states
  const [socialUrlInput, setSocialUrlInput] = useState("");
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewResult, setPreviewResult] = useState<SocialPreviewResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const albumNames: Record<string, { ar: string; en: string }> = {
    robotics: { ar: "الروبوتيك", en: "Robotics" },
    salon: { ar: "صالون العلوم", en: "Science Salon" },
    camp: { ar: "معسكر الذكاء الاصطناعي", en: "AI Bootcamp" },
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteGalleryItem(deleteId);
      setDeleteId(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Check duplicates
  const checkIsDuplicate = (canonicalUrl: string): boolean => {
    return galleryItems.some(
      (item) =>
        (item.socialUrl && item.socialUrl.toLowerCase() === canonicalUrl.toLowerCase()) ||
        (item.url && item.url.toLowerCase() === canonicalUrl.toLowerCase())
    );
  };

  // Fetch social preview
  const handleFetchPreview = async (rawUrl: string) => {
    const trimmed = rawUrl.trim();
    if (!trimmed) {
      setPreviewResult(null);
      setValidationError(null);
      setIsDuplicate(false);
      return;
    }

    const parsed = parseAndValidateSocialUrl(trimmed);
    if (!parsed.isValid || !parsed.canonicalUrl) {
      setValidationError(
        language === "ar"
          ? parsed.errorMessage?.ar || "صيغة الرابط غير صحيحة."
          : parsed.errorMessage?.en || "Invalid post URL."
      );
      setPreviewResult(null);
      setIsDuplicate(false);
      return;
    }

    // Check duplicate
    if (checkIsDuplicate(parsed.canonicalUrl)) {
      setIsDuplicate(true);
      setValidationError(
        language === "ar"
          ? "هذا المنشور موجود بالفعل في المعرض."
          : "This post is already in the gallery."
      );
      setPreviewResult(null);
      return;
    }

    setIsDuplicate(false);
    setValidationError(null);
    setIsPreviewLoading(true);

    try {
      const res = await fetch("/api/gallery/social-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: parsed.canonicalUrl }),
      });

      const data = await res.json();
      if (data.success) {
        setPreviewResult(data);
        if (!titleAr) setTitleAr(data.title?.ar || "");
        if (!titleEn) setTitleEn(data.title?.en || "");
      } else {
        setValidationError(
          data.errorMessage?.[language] ||
            data.error ||
            (language === "ar" ? "تعذر جلب بيانات المنشور." : "Failed to load post preview.")
        );
        setPreviewResult(null);
      }
    } catch {
      // Fallback preview
      setPreviewResult({
        success: true,
        platform: parsed.platform!,
        type: parsed.type!,
        canonicalUrl: parsed.canonicalUrl,
        externalId: parsed.externalId!,
        title: {
          ar:
            parsed.platform === "instagram"
              ? parsed.type === "video"
                ? "ريلز إنستغرام: أنشطة الرابطة"
                : "منشور إنستغرام: توثيق الأنشطة"
              : parsed.type === "video"
              ? "فيديو فيسبوك: تغطية الرابطة"
              : "منشور فيسبوك: تحديثات الرابطة",
          en:
            parsed.platform === "instagram"
              ? parsed.type === "video"
                ? "Instagram Reel: STLY Activity"
                : "Instagram Post: STLY Highlight"
              : parsed.type === "video"
              ? "Facebook Video: STLY Event"
              : "Facebook Post: STLY Update",
        },
        hasOfficialMetadata: false,
      });
      if (!titleAr) {
        setTitleAr(
          parsed.platform === "instagram"
            ? parsed.type === "video"
              ? "ريلز إنستغرام: أنشطة الرابطة"
              : "منشور إنستغرام: توثيق الأنشطة"
            : "منشور فيسبوك: نشاطات الرابطة"
        );
      }
      if (!titleEn) {
        setTitleEn(
          parsed.platform === "instagram"
            ? parsed.type === "video"
              ? "Instagram Reel: STLY Activity"
              : "Instagram Post: STLY Highlight"
            : "Facebook Post: STLY Activity"
        );
      }
    } finally {
      setIsPreviewLoading(false);
    }
  };

  // Debounced auto-preview when typing/pasting
  useEffect(() => {
    if (creationMode !== "social" || !socialUrlInput) return;
    const timer = setTimeout(() => {
      handleFetchPreview(socialUrlInput);
    }, 450);
    return () => clearTimeout(timer);
  }, [socialUrlInput, creationMode]);

  const resetForm = () => {
    setTitleAr("");
    setTitleEn("");
    setAlbum("robotics");
    setImageUrl("");
    setSocialUrlInput("");
    setPreviewResult(null);
    setValidationError(null);
    setIsDuplicate(false);
    setIsCreateOpen(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr || !titleEn || !imageUrl) return;

    addGalleryItem({
      title: { ar: titleAr, en: titleEn },
      album,
      albumName: albumNames[album] || { ar: "عام", en: "General" },
      type: "image",
      url: imageUrl,
      sourceType: "upload",
    });

    resetForm();
  };

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewResult || isDuplicate || !titleAr || !titleEn) return;

    // Double check duplicate
    const canonical = getCanonicalSocialUrl(socialUrlInput) || previewResult.canonicalUrl;
    if (checkIsDuplicate(canonical)) {
      setIsDuplicate(true);
      return;
    }

    addGalleryItem({
      title: { ar: titleAr, en: titleEn },
      album,
      albumName: albumNames[album] || { ar: "عام", en: "General" },
      type: previewResult.type,
      url: previewResult.thumbnailUrl || previewResult.canonicalUrl,
      sourceType: previewResult.platform,
      socialUrl: previewResult.canonicalUrl,
      socialPlatform: previewResult.platform,
      externalId: previewResult.externalId,
      thumbnailUrl: previewResult.thumbnailUrl,
      embedHtml: previewResult.embedHtml,
      authorName: previewResult.authorName,
    });

    resetForm();
  };

  const filteredItems = galleryItems.filter(
    (item) =>
      item.title.ar.toLowerCase().includes(search.toLowerCase()) ||
      item.title.en.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<GalleryItem>[] = [
    {
      header: t("contact.subject"),
      cell: (row) => {
        const isInstagram = row.sourceType === "instagram" || row.socialPlatform === "instagram";
        const isFacebook = row.sourceType === "facebook" || row.socialPlatform === "facebook";
        const isSocial = isInstagram || isFacebook;

        return (
          <div className="flex items-center gap-3">
            {/* Miniature Image / Social Preview */}
            <div className="h-11 w-11 rounded-lg border border-brand-border bg-slate-100 flex-shrink-0 overflow-hidden flex items-center justify-center relative">
              {row.thumbnailUrl || (row.url && !row.url.startsWith("http") && !row.url.includes("instagram") && !row.url.includes("facebook")) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={row.thumbnailUrl || row.url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : isSocial ? (
                <div
                  className={`w-full h-full flex items-center justify-center text-white ${
                    isInstagram
                      ? "bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4]"
                      : "bg-[#1877F2]"
                  }`}
                >
                  {isInstagram ? (
                    <InstagramIcon className="w-5 h-5" />
                  ) : (
                    <FacebookIcon className="w-5 h-5" />
                  )}
                </div>
              ) : (
                <ImageIcon className="w-5 h-5 text-slate-400" />
              )}
            </div>

            <div className="space-y-0.5 max-w-xs sm:max-w-md">
              <p className="font-extrabold text-brand-dark text-xs sm:text-sm line-clamp-1">
                {language === "ar" ? row.title.ar : row.title.en}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-brand-muted">ID: {row.id}</span>
                {row.socialUrl && (
                  <a
                    href={row.socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-brand-green font-bold flex items-center gap-0.5 hover:underline"
                    title={row.socialUrl}
                  >
                    <span>{isInstagram ? "Instagram Link" : "Facebook Link"}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: language === "ar" ? "الألبوم" : "Album",
      cell: (row) => (
        <span className="text-xs text-brand-dark font-semibold">
          {language === "ar" ? row.albumName.ar : row.albumName.en}
        </span>
      ),
    },
    {
      header: language === "ar" ? "المصدر" : "Source",
      cell: (row) => {
        const isInstagram = row.sourceType === "instagram" || row.socialPlatform === "instagram";
        const isFacebook = row.sourceType === "facebook" || row.socialPlatform === "facebook";

        if (isInstagram) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-pink-50 text-pink-700 border border-pink-200">
              <InstagramIcon className="w-3 h-3 text-pink-600" />
              <span>Instagram</span>
            </span>
          );
        }

        if (isFacebook) {
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
              <FacebookIcon className="w-3 h-3 text-blue-600" />
              <span>Facebook</span>
            </span>
          );
        }

        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Upload className="w-3 h-3 text-slate-500" />
            <span>{language === "ar" ? "رفع يدوي" : "Upload"}</span>
          </span>
        );
      },
    },
    {
      header: t("forms.actions"),
      cell: (row) => (
        <Button
          variant="ghost"
          size="sm"
          className="p-1 text-red-500 hover:text-red-700"
          onClick={() => setDeleteId(row.id)}
          title="Delete media"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-brand-border rounded-xl p-5 shadow-xs">
        <div>
          <h3 className="text-base font-extrabold text-brand-dark">
            {language === "ar" ? "إدارة معرض الوسائط" : "Media Gallery Asset Controller"}
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            {language === "ar"
              ? "متابعة ألبومات الصور والفيديوهات، استيراد منشورات إنستغرام وفيسبوك، ورفع صور جديدة للفعاليات."
              : "Review photography, import public Instagram & Facebook posts/reels, or upload image files."}
          </p>
        </div>

        <Button
          size="sm"
          leftIcon={<Plus className="h-4.5 w-4.5" />}
          onClick={() => setIsCreateOpen(true)}
        >
          {language === "ar" ? "إضافة عنصر للمعرض" : "Add Gallery Item"}
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-brand-border rounded-xl p-4 shadow-xs flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 right-3 flex items-center text-brand-muted pointer-events-none rtl:right-3 ltr:left-3 ltr:right-auto">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder={t("admin.common.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-1.5 border border-brand-border rounded-md text-xs bg-white text-brand-dark placeholder-slate-400 focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy rtl:pl-10 rtl:pr-10 ltr:pl-10 ltr:pr-4"
          />
        </div>
      </div>

      {/* Table Data */}
      <DataTable columns={columns} data={filteredItems} emptyMessage={t("admin.common.noData")} />

      {/* Add Media Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={resetForm}
        title={language === "ar" ? "إضافة عنصر جديد للمعرض" : "Add New Media to Gallery"}
        size="lg"
      >
        <div className="space-y-5">
          {/* Source Selection Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setCreationMode("social");
                setValidationError(null);
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                creationMode === "social"
                  ? "bg-white text-brand-navy shadow-xs"
                  : "text-slate-600 hover:text-brand-dark"
              }`}
            >
              <Share2 className="w-3.5 h-3.5 text-brand-green" />
              <span>Instagram / Facebook</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCreationMode("upload");
                setValidationError(null);
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                creationMode === "upload"
                  ? "bg-white text-brand-navy shadow-xs"
                  : "text-slate-600 hover:text-brand-dark"
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-brand-navy" />
              <span>{language === "ar" ? "رفع صورة (يدوي)" : "Upload Image"}</span>
            </button>
          </div>

          {/* MODE 1: SOCIAL MEDIA IMPORT */}
          {creationMode === "social" && (
            <form onSubmit={handleSocialSubmit} className="space-y-4">
              <FormField
                label={language === "ar" ? "رابط المنشور (Post URL)" : "Post URL"}
                required
                hint={
                  language === "ar"
                    ? "يدعم منشورات وريلز إنستغرام (Instagram Posts & Reels)، وفيديوهات ومنشورات فيسبوك العامة."
                    : "Supports public Instagram posts, reels, and Facebook posts & videos."
                }
              >
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://www.instagram.com/p/... or https://www.facebook.com/..."
                      value={socialUrlInput}
                      onChange={(e) => setSocialUrlInput(e.target.value)}
                      className={`w-full px-3.5 py-2 border rounded-lg text-xs bg-white text-brand-dark focus:ring-2 focus:ring-brand-navy/20 ${
                        validationError || isDuplicate
                          ? "border-red-400 focus:border-red-500"
                          : "border-brand-border focus:border-brand-navy"
                      }`}
                      dir="ltr"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleFetchPreview(socialUrlInput)}
                      disabled={!socialUrlInput.trim() || isPreviewLoading}
                      className="flex-shrink-0"
                    >
                      {isPreviewLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <span>{language === "ar" ? "معاينة" : "Preview"}</span>
                      )}
                    </Button>
                  </div>

                  {/* Inline error or duplicate warning */}
                  {(validationError || isDuplicate) && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}
                </div>
              </FormField>

              {/* Live Preview Card */}
              {previewResult && !isDuplicate && (
                <div className="p-4 rounded-xl border border-brand-green/30 bg-emerald-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded-lg text-white ${
                          previewResult.platform === "instagram"
                            ? "bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4]"
                            : "bg-[#1877F2]"
                        }`}
                      >
                        {previewResult.platform === "instagram" ? (
                          <InstagramIcon className="w-4 h-4" />
                        ) : (
                          <FacebookIcon className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-brand-dark block">
                          {previewResult.platform === "instagram" ? "Instagram" : "Facebook"} (
                          {previewResult.type === "video" ? "Video / Reel" : "Post / Image"})
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{language === "ar" ? "تم التحقق من الرابط بنجاح" : "Valid URL detected"}</span>
                        </span>
                      </div>
                    </div>

                    <a
                      href={previewResult.canonicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-700 hover:text-brand-navy flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-200"
                    >
                      <span>{language === "ar" ? "المنشور الأصلي" : "Original"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Thumbnail snippet */}
                  {previewResult.thumbnailUrl && (
                    <div className="h-24 w-24 rounded-lg overflow-hidden border border-brand-border bg-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewResult.thumbnailUrl}
                        alt="preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Form Metadata */}
              <FormField label={language === "ar" ? "الألبوم" : "Album"} required>
                <select
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  className="w-full px-3.5 py-2 border border-brand-border rounded-lg text-xs bg-white text-brand-dark focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                >
                  <option value="robotics">{language === "ar" ? "الروبوتيك" : "Robotics"}</option>
                  <option value="salon">{language === "ar" ? "صالون العلوم" : "Science Salon"}</option>
                  <option value="camp">{language === "ar" ? "معسكر الذكاء الاصطناعي" : "AI Bootcamp"}</option>
                </select>
              </FormField>

              <FormField label={language === "ar" ? "العنوان (بالعربية)" : "Title (Arabic)"} required>
                <input
                  type="text"
                  placeholder="مثال: ريلز توثيقي لورشة الإلكترونيات"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="w-full px-3.5 py-2 border border-brand-border rounded-lg text-xs bg-white text-brand-dark focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                />
              </FormField>

              <FormField label={language === "ar" ? "العنوان (بالإنجليزية)" : "Title (English)"} required>
                <input
                  type="text"
                  placeholder="e.g. Hands-on Electronics Lab Reel"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full px-3.5 py-2 border border-brand-border rounded-lg text-xs bg-white text-brand-dark focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                />
              </FormField>

              <div className="flex gap-3 justify-end pt-3 border-t border-slate-200">
                <Button variant="outline" size="sm" type="button" onClick={resetForm}>
                  {t("admin.common.cancel")}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  type="submit"
                  disabled={!previewResult || isDuplicate || !titleAr.trim() || !titleEn.trim()}
                >
                  {language === "ar" ? "إضافة إلى المعرض" : "Add to Gallery"}
                </Button>
              </div>
            </form>
          )}

          {/* MODE 2: MANUAL PHOTO UPLOAD */}
          {creationMode === "upload" && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <FormField label={language === "ar" ? "العنوان (بالعربية)" : "Title (Arabic)"} required>
                <input
                  type="text"
                  placeholder="مثال: فريق الروبوتات الفائز"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="w-full px-3.5 py-2 border border-brand-border rounded-lg text-xs bg-white text-brand-dark focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                />
              </FormField>

              <FormField label={language === "ar" ? "العنوان (بالإنجليزية)" : "Title (English)"} required>
                <input
                  type="text"
                  placeholder="e.g. Winning Robotics Team"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full px-3.5 py-2 border border-brand-border rounded-lg text-xs bg-white text-brand-dark focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                />
              </FormField>

              <FormField label={language === "ar" ? "الألبوم" : "Album"} required>
                <select
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  className="w-full px-3.5 py-2 border border-brand-border rounded-lg text-xs bg-white text-brand-dark focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                >
                  <option value="robotics">{language === "ar" ? "الروبوتيك" : "Robotics"}</option>
                  <option value="salon">{language === "ar" ? "صالون العلوم" : "Science Salon"}</option>
                  <option value="camp">{language === "ar" ? "معسكر الذكاء الاصطناعي" : "AI Bootcamp"}</option>
                </select>
              </FormField>

              <FormField label={language === "ar" ? "اختر صورة للرفع" : "Select Image to Upload"} required>
                <div className="flex flex-col gap-2">
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-brand-border rounded-xl cursor-pointer hover:bg-brand-bg/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-4 pb-4 text-center">
                      <Upload className="h-7 w-7 text-brand-navy mb-1.5" />
                      <p className="text-xs font-semibold text-brand-dark">
                        {language === "ar" ? "انقر لاختيار ملف صورة" : "Click to select an image file"}
                      </p>
                      <p className="text-[10px] text-brand-muted">PNG, JPG, WEBP</p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>

                  {imageUrl && (
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-brand-border mt-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt="preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              </FormField>

              <div className="flex gap-3 justify-end pt-3 border-t border-slate-200">
                <Button variant="outline" size="sm" type="button" onClick={resetForm}>
                  {t("admin.common.cancel")}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  type="submit"
                  disabled={!titleAr.trim() || !titleEn.trim() || !imageUrl}
                >
                  {language === "ar" ? "حفظ ونشر" : "Save & Publish"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal isOpen={deleteId !== null} onClose={() => setDeleteId(null)} title={t("admin.common.confirmDelete")}>
        <div className="space-y-4">
          <p className="text-xs text-brand-muted leading-relaxed">
            {t("admin.common.cannotUndo")}
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" size="sm" onClick={() => setDeleteId(null)}>
              {t("admin.common.cancel")}
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteConfirm}>
              {t("admin.common.delete")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
