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
      ar: "شراكة متميزة مع حاضنة الأعمال الجامعية لتأطير ومرافقة المشاريع الابتكارية للشباب.",
      en: "Collaboration with the university incubator to mentor and guide young people's startup projects.",
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
      ar: "الجهة الوصية والداعمة رسمياً للأنشطة الشبانية والتنظيمات العلمية والرياضية في الولاية.",
      en: "The state authority officially supporting youth initiatives and scientific clubs in the province.",
    },
    category: {
      ar: "شريك مؤسساتي",
      en: "Institutional Partner",
    },
  },
  {
    id: "algeria-venture",
    name: {
      ar: "مسرع المؤسسات الناشئة الجزائرية (A-Venture)",
      en: "Algeria Venture (A-Venture)",
    },
    logo: "/images/partners/aventures.png",
    website: "https://www.a-venture.dz",
    description: {
      ar: "شراكة لتسهيل حصول أفكار ومشاريع منخرطي الرابطة على وسم مشروع مبتكر وبراءة الاختراع.",
      en: "Partnership to facilitate STLY innovators in obtaining startup labels and patent registrations.",
    },
    category: {
      ar: "مسرع أعمال",
      en: "Business Accelerator",
    },
  },
];
