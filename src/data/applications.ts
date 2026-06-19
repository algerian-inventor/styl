export interface MembershipApplication {
  id: string;
  fullName: string;
  dob: string;
  wilaya: string;
  municipality: string;
  email: string;
  phone: string;
  educationProfession: string;
  scientificInterests: string[];
  skills: string;
  motivation: string;
  portfolio?: string;
  submissionDate: string;
  status: "pending" | "underReview" | "accepted" | "rejected";
}

export const initialApplications: MembershipApplication[] = [
  {
    id: "APP-2026-001",
    fullName: "زكرياء بوطالب",
    dob: "2002-04-12",
    wilaya: "قسنطينة",
    municipality: "الخروب",
    email: "zakaria.boutaleb@gmail.com",
    phone: "0662345678",
    educationProfession: "طالب إلكترونيات بجامعة قسنطينة 1",
    scientificInterests: ["الإلكترونيات", "الروبوتيك", "الذكاء الاصطناعي"],
    skills: "أجيد برمجة الميكروكنترولر وتصميم الدارات الإلكترونية البسيطة والمحاكاة ببرنامج Proteus.",
    motivation: "أرغب في الانضمام لنادي الروبوتات بالرابطة للاستفادة من الورشات التكوينية والمشاركة في بناء نماذج روبوتات متكاملة.",
    portfolio: "https://github.com/zakaria-bt",
    submissionDate: "2026-06-18",
    status: "pending",
  },
  {
    id: "APP-2026-002",
    fullName: "لينا بوعزيز",
    dob: "2004-09-25",
    wilaya: "قسنطينة",
    municipality: "حامة بوزيان",
    email: "lina.bouaziz@gmail.com",
    phone: "0771829304",
    educationProfession: "طالبة بيولوجيا",
    scientificInterests: ["العلوم", "الكيمياء"],
    skills: "لدي مهارات ممتازة في إجراء التجارب المخبرية الكيميائية الأساسية والتلخيص العلمي.",
    motivation: "أرغب في تنشيط الورشات العلمية للأطفال والمساهمة في تبسيط العلوم التجريبية لجيل الصغار.",
    submissionDate: "2026-06-17",
    status: "underReview",
  },
  {
    id: "APP-2026-003",
    fullName: "أمين مسعودي",
    dob: "2000-01-30",
    wilaya: "سكيكدة",
    municipality: "عزابة",
    email: "amin.m@outlook.com",
    phone: "0550123456",
    educationProfession: "مهندس برمجيات متخرج",
    scientificInterests: ["التكنولوجيا", "الذكاء الاصطناعي", "الابتكار والقيادة"],
    skills: "أجيد البرمجة بلغة بايثون و JavaScript، ولدي تجربة في إعداد نماذج التعلم الآلي وتطوير الويب.",
    motivation: "توسيع شبكة علاقاتي المهنية ومساعدة الشباب بالرابطة في الجوانب البرمجية ومشاركتهم خبرتي.",
    portfolio: "https://aminmas.dev",
    submissionDate: "2026-06-15",
    status: "accepted",
  },
];
