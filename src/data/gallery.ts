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
  videoUrl?: string;

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
  ansf: { ar: "ANSF 2026", en: "ANSF 2026" },
};

const facebookSharePost = (
  id: string,
  album: keyof typeof galleryAlbumNames,
  shareId: string,
  title: { ar: string; en: string }
): GalleryItem => {
  const socialUrl = `https://www.facebook.com/share/p/${shareId}/`;
  const prefix = album === "ansf" ? "ansf" : "basma";
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
    thumbnailUrl: `/images/social-cache/${prefix}-${shareId}.png`,
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
  const prefix = album === "ansf" ? "ansf" : "basma";
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
    thumbnailUrl: `/images/social-cache/${prefix}-${shareId}.png`,
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
];
