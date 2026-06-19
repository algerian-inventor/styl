export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: {
    ar: string;
    en: string;
  };
  fullName: string;
  email: string;
  phone: string;
  wilaya: string;
  age: number;
  educationProfession: string;
  motivation: string;
  registrationDate: string;
  status: "pending" | "confirmed" | "rejected" | "attended";
}

export const initialRegistrations: EventRegistration[] = [
  {
    id: "REG-2026-001",
    eventId: "science-salon-2026",
    eventTitle: {
      ar: "صالون قسنطينة للعلوم والتقنيات 2026",
      en: "Constantine Science & Technology Salon 2026",
    },
    fullName: "أنس بومعزة",
    email: "anas.boumaza@gmail.com",
    phone: "0661234567",
    wilaya: "قسنطينة",
    age: 22,
    educationProfession: "طالب هندسة إعلام آلي",
    motivation: "أرغب في حضور المحاضرات التفاعلية والاطلاع على مشاريع النوادي العلمية والمشاركة في التحدي.",
    registrationDate: "2026-06-18",
    status: "confirmed",
  },
  {
    id: "REG-2026-002",
    eventId: "science-salon-2026",
    eventTitle: {
      ar: "صالون قسنطينة للعلوم والتقنيات 2026",
      en: "Constantine Science & Technology Salon 2026",
    },
    fullName: "أميرة بن ساعد",
    email: "amira.bens@gmail.com",
    phone: "0770987654",
    wilaya: "ميلة",
    age: 24,
    educationProfession: "مهندسة ميكاترونيكس",
    motivation: "متابعة التطورات الجديدة وعرض بعض الأفكار على الأساتذة والباحثين.",
    registrationDate: "2026-06-19",
    status: "pending",
  },
  {
    id: "REG-2026-003",
    eventId: "ai-robotics-workshop",
    eventTitle: {
      ar: "ورشة عمل: الذكاء الاصطناعي في خدمة الروبوتات",
      en: "Workshop: AI in Robotics Applications",
    },
    fullName: "ياسين لعرابة",
    email: "y.laraba@outlook.com",
    phone: "0552468135",
    wilaya: "قسنطينة",
    age: 26,
    educationProfession: "مطور برمجيات مستقل",
    motivation: "أرغب في دمج خوارزميات الذكاء الاصطناعي مع العتاد الحقيقي وتعميق معارفي بالـ Raspberry Pi.",
    registrationDate: "2026-06-17",
    status: "confirmed",
  },
  {
    id: "REG-2026-004",
    eventId: "innovation-hackathon-2026",
    eventTitle: {
      ar: "هاكاثون الجزائر للابتكار التقني",
      en: "Algeria Tech Innovation Hackathon",
    },
    fullName: "خالد بن دحمان",
    email: "khalid.bd@gmail.com",
    phone: "0664987123",
    wilaya: "سطيف",
    age: 25,
    educationProfession: "طالب ماستر كيمياء صناعية",
    motivation: "تطوير نموذج أولي لفرز النفايات الذكي وحل المشكلات البيئية الحضرية.",
    registrationDate: "2026-05-02",
    status: "attended",
  },
];
