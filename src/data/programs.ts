export interface Program {
  id: string;
  slug: string;
  name: {
    ar: string;
    en: string;
  };
  summary: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  category: {
    ar: string;
    en: string;
  };
  status: "active" | "upcoming" | "completed";
  startDate: string;
  duration: {
    ar: string;
    en: string;
  };
  coverImage: string;
  details: {
    ar: string[];
    en: string[];
  };
}

export const programs: Program[] = [];
