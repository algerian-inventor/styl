export interface GalleryItem {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  album: string; // "all" | "robotics" | "salon" | "camp"
  albumName: {
    ar: string;
    en: string;
  };
  type: "image" | "video";
  url: string;
  videoUrl?: string; // YouTube or placeholder video url
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: {
      ar: "مشاركة فريق الرابطة في المسابقة الوطنية للروبوتيك",
      en: "STLY Team at the National Robotics Competition",
    },
    album: "robotics",
    albumName: { ar: "الروبوتيك", en: "Robotics" },
    type: "image",
    url: "/images/gallery/robotics1.png",
  },
  {
    id: "g2",
    title: {
      ar: "الورشة التطبيقية لتصميم وبرمجة الروبوتات",
      en: "Hands-on Workshop for Designing Robots",
    },
    album: "robotics",
    albumName: { ar: "الروبوتيك", en: "Robotics" },
    type: "image",
    url: "/images/gallery/robotics2.png",
  },
  {
    id: "g3",
    title: {
      ar: "المعرض العام للنوادي المشاركة في صالون العلوم 2026",
      en: "General Exhibition of Clubs at Science Salon 2026",
    },
    album: "salon",
    albumName: { ar: "صالون العلوم", en: "Science Salon" },
    type: "image",
    url: "/images/gallery/salon1.png",
  },
  {
    id: "g4",
    title: {
      ar: "محاضرة الدكتور بوالشعور حول تكنولوجيا النانو",
      en: "Prof. Boualchour's Lecture on Nanotechnology",
    },
    album: "salon",
    albumName: { ar: "صالون العلوم", en: "Science Salon" },
    type: "image",
    url: "/images/gallery/salon2.png",
  },
  {
    id: "g5",
    title: {
      ar: "افتتاح فعاليات معسكر رواد الذكاء الاصطناعي",
      en: "Opening of the AI Pioneers Bootcamp",
    },
    album: "camp",
    albumName: { ar: "معسكر الذكاء الاصطناعي", en: "AI Bootcamp" },
    type: "image",
    url: "/images/gallery/camp1.png",
  },
  {
    id: "g6",
    title: {
      ar: "عرض بالفيديو لمشاريع التخرج المنجزة في المعسكر التكويني",
      en: "Video Showcasing Projects Completed During the Bootcamp",
    },
    album: "camp",
    albumName: { ar: "معسكر الذكاء الاصطناعي", en: "AI Bootcamp" },
    type: "video",
    url: "/images/gallery/camp-video-thumb.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo embed video
  },
  {
    id: "g7",
    title: {
      ar: "العمل الجماعي وتصميم الدارات الإلكترونية",
      en: "Teamwork & PCB Circuit Design Session",
    },
    album: "robotics",
    albumName: { ar: "الروبوتيك", en: "Robotics" },
    type: "image",
    url: "/images/gallery/robotics3.png",
  },
  {
    id: "g8",
    title: {
      ar: "لقطات فيديو تلخص صالون قسنطينة للعلوم 2026",
      en: "Video Highlights of Constantine Science Salon 2026",
    },
    album: "salon",
    albumName: { ar: "صالون العلوم", en: "Science Salon" },
    type: "video",
    url: "/images/gallery/salon-video-thumb.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo embed video
  },
];
