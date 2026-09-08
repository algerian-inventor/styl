export type GallerySourceType = "upload" | "instagram" | "facebook";
export type SocialPlatformType = "instagram" | "facebook";

export interface GalleryItem {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  album: string;
  albumName: {
    ar: string;
    en: string;
  };
  type: "image" | "video";
  url: string;
  videoUrl?: string; // YouTube or placeholder video url

  // Social media extension fields
  sourceType?: GallerySourceType;
  socialUrl?: string;
  socialPlatform?: SocialPlatformType;
  externalId?: string;
  embedHtml?: string;
  thumbnailUrl?: string;
  authorName?: string;
  hasOfficialMetadata?: boolean;
}

export const galleryAlbumNames: Record<string, { ar: string; en: string }> = {
  basmaTech: { ar: "بصمة تك", en: "Basma-Tech" },
  ansf: { ar: "ANSF — المعرض العلمي الوطني الجزائري", en: "ANSF — Algerian National Science Fair" },
  robotics: { ar: "الروبوتيك", en: "Robotics" },
  salon: { ar: "صالون العلوم", en: "Science Salon" },
  camp: { ar: "معسكر الذكاء الاصطناعي", en: "AI Bootcamp" },
};

const facebookSharePost = (
  id: string,
  album: keyof typeof galleryAlbumNames,
  shareId: string,
  title: { ar: string; en: string }
): GalleryItem => {
  const socialUrl = `https://www.facebook.com/share/p/${shareId}/`;
  return {
    id,
    title,
    album,
    albumName: galleryAlbumNames[album],
    type: "image",
    url: socialUrl,
    sourceType: "facebook",
    socialUrl,
    socialPlatform: "facebook",
    externalId: shareId,
    hasOfficialMetadata: false,
  };
};

const facebookShareReel = (
  id: string,
  album: keyof typeof galleryAlbumNames,
  shareId: string,
  title: { ar: string; en: string }
): GalleryItem => {
  const socialUrl = `https://www.facebook.com/share/r/${shareId}/`;
  return {
    id,
    title,
    album,
    albumName: galleryAlbumNames[album],
    type: "video",
    url: socialUrl,
    sourceType: "facebook",
    socialUrl,
    socialPlatform: "facebook",
    externalId: shareId,
    hasOfficialMetadata: false,
  };
};

export const galleryItems: GalleryItem[] = [
  facebookSharePost("basma-tech-1978VRJMur", "basmaTech", "1978VRJMur", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1AoV9m4kny", "basmaTech", "1AoV9m4kny", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-18weicETQ6", "basmaTech", "18weicETQ6", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1HqTybecRy", "basmaTech", "1HqTybecRy", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1RTJuWy54h", "basmaTech", "1RTJuWy54h", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-19eSAnHq3b", "basmaTech", "19eSAnHq3b", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1D44QGVvf1", "basmaTech", "1D44QGVvf1", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-18JRhWkh7q", "basmaTech", "18JRhWkh7q", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1D5nfoXzd7", "basmaTech", "1D5nfoXzd7", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1Ava9Q4yoT", "basmaTech", "1Ava9Q4yoT", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1bUHovswhk", "basmaTech", "1bUHovswhk", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1EtsKpNnsY", "basmaTech", "1EtsKpNnsY", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1df71ozeTF", "basmaTech", "1df71ozeTF", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1U6HcwJ7qn", "basmaTech", "1U6HcwJ7qn", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1D7jzJMfEp", "basmaTech", "1D7jzJMfEp", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookSharePost("basma-tech-1DXoaGG4PR", "basmaTech", "1DXoaGG4PR", {
    ar: "منشور بصمة تك",
    en: "Basma-Tech Post",
  }),
  facebookShareReel("ansf-1FSFPKYNkK", "ansf", "1FSFPKYNkK", {
    ar: "فيديو ANSF",
    en: "ANSF Reel",
  }),
  facebookSharePost("ansf-19cQ9hoPub", "ansf", "19cQ9hoPub", {
    ar: "منشور ANSF",
    en: "ANSF Post",
  }),
  facebookSharePost("ansf-1JrXQz163i", "ansf", "1JrXQz163i", {
    ar: "منشور ANSF",
    en: "ANSF Post",
  }),
  facebookSharePost("ansf-1F7a91M8pi", "ansf", "1F7a91M8pi", {
    ar: "منشور ANSF",
    en: "ANSF Post",
  }),
  facebookSharePost("ansf-19XD2mG3DF", "ansf", "19XD2mG3DF", {
    ar: "منشور ANSF",
    en: "ANSF Post",
  }),
  facebookSharePost("ansf-19XEj97DJg", "ansf", "19XEj97DJg", {
    ar: "منشور ANSF",
    en: "ANSF Post",
  }),
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
