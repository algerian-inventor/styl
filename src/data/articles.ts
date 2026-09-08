export interface Article {
  id: string;
  slug: string;
  title: {
    ar: string;
    en: string;
  };
  summary: {
    ar: string;
    en: string;
  };
  content: {
    ar: string;
    en: string;
  };
  publishedDate: string;
  category: {
    ar: string;
    en: string;
  };
  author: {
    ar: string;
    en: string;
  };
  coverImage: string;
  isFeatured: boolean;
  tags: {
    ar: string[];
    en: string[];
  };
}

export const articles: Article[] = [];
