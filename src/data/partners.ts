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

export const partners: Partner[] = [
  {
    id: "univ-constantine1",
    name: {
      ar: "جامعة الإخوة منتوري قسنطينة 1",
      en: "Mentouri Constantine 1 University",
    },
    logo: "/images/partners/univ-constantine1.png",
    website: "https://www.umc.edu.dz",
    description: {
      ar: "الشريك الأكاديمي الرئيسي، يساهم في توفير التأطير العلمي والبحوث التخصصية والمخابر.",
      en: "Primary academic partner, providing scientific guidance, research support, and laboratory access.",
    },
    category: {
      ar: "شريك أكاديمي",
      en: "Academic Partner",
    },
  },
  {
    id: "univ-constantine3",
    name: {
      ar: "جامعة صالح بوبنيدر قسنطينة 3",
      en: "Salah Boubnider Constantine 3 University",
    },
    logo: "/images/partners/univ-constantine3.png",
    website: "https://www.univ-constantine3.dz",
    description: {
      ar: "تعاون أكاديمي لتأطير الأنشطة العلمية وتبادل الخبرات مع الشباب.",
      en: "Academic cooperation to support science activities and exchange experience with young participants.",
    },
    category: {
      ar: "شريك أكاديمي",
      en: "Academic Partner",
    },
  },
  {
    id: "djs-constantine",
    name: {
      ar: "مديرية الشباب والرياضة لولاية قسنطينة",
      en: "Directorate of Youth and Sports - Constantine",
    },
    logo: "/images/partners/djs.png",
    website: "#",
    description: {
      ar: "جهة مؤسساتية محلية مرتبطة بالأنشطة الشبانية والتنظيمات العلمية والرياضية في الولاية.",
      en: "A local institutional body connected with youth, science, and sports activities in the province.",
    },
    category: {
      ar: "شريك مؤسساتي",
      en: "Institutional Partner",
    },
  },
  {
    id: "algeria-venture",
    name: {
      ar: "منظومة دعم الابتكار الجزائرية (A-Venture)",
      en: "Algeria Innovation Support (A-Venture)",
    },
    logo: "/images/partners/aventures.png",
    website: "https://www.a-venture.dz",
    description: {
      ar: "تعاون للتعريف بمسارات دعم الابتكار ومرافقة الأفكار التقنية الواعدة.",
      en: "Cooperation to introduce innovation support paths and guide promising technical ideas.",
    },
    category: {
      ar: "دعم الابتكار",
      en: "Innovation Support",
    },
  },
];
