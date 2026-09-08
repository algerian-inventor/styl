export interface Partner {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  logo: string;
  website: string;
  description: {
    ar: string;
    en: string;
  };
  category: {
    ar: string;
    en: string;
  };
}

export const partners: Partner[] = [];
