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

export const articles: Article[] = [
  {
    id: "national-robotics-win",
    slug: "national-robotics-win",
    title: {
      ar: "مشاركة فريق الرابطة في نشاط وطني للروبوتيك",
      en: "STLY Constantine Team Participates in a National Robotics Activity",
    },
    summary: {
      ar: "شارك فريق الروبوتات التابع للرابطة في نشاط وطني مخصص للابتكار التكنولوجي وتبادل التجارب بين النوادي العلمية.",
      en: "STLY Constantine's robotics team joined a national technology activity focused on innovation and knowledge exchange between science clubs.",
    },
    content: {
      ar: `شارك فريق الرابطة العلمية والتقنية للشباب بقسنطينة في نشاط وطني للروبوتيك احتضنته الجزائر العاصمة، إلى جانب عدد من النوادي العلمية من مختلف الولايات.

قدّم الفريق نموذجاً تطبيقياً يوظف مبادئ البرمجة والتحكم والرؤية الحاسوبية لمعالجة إشكالية تقنية ذات صلة بالبيئة. وقد شكلت المشاركة فرصة لتبادل الخبرات وتحسين العمل الجماعي داخل النادي.

تعمل الرابطة على استثمار مثل هذه المشاركات في تطوير ورشاتها وبرامجها التطبيقية، وفتح المجال أمام الشباب لاختبار أفكارهم ضمن بيئة مؤطرة.`,
      en: `STLY Constantine's robotics team participated in a national robotics activity held in Algiers alongside science clubs from several provinces.

The team presented a practical model using programming, control systems, and computer vision concepts to explore a technical problem related to the environment. The participation was an opportunity to exchange experience and strengthen teamwork inside the club.

STLY uses this kind of participation to improve its workshops and give young people a guided setting to test their ideas.`,
    },
    publishedDate: "2026-06-15",
    category: {
      ar: "أنشطة",
      en: "Activities",
    },
    author: {
      ar: "اللجنة الإعلامية",
      en: "Media Committee",
    },
    coverImage: "/images/news/robotics-win.png",
    isFeatured: true,
    tags: {
      ar: ["روبوتيك", "نشاط وطني", "ابتكار", "قسنطينة"],
      en: ["Robotics", "National Activity", "Innovation", "Constantine"],
    },
  },
  {
    id: "ai-bootcamp-launch",
    slug: "ai-bootcamp-launch",
    title: {
      ar: "انطلاق فعاليات المعسكر التدريبي المكثف لرواد الذكاء الاصطناعي",
      en: "Launch of the Intensive AI Pioneers Training Bootcamp",
    },
    summary: {
      ar: "انطلقت بمقر الرابطة الدورة التدريبية المتخصصة في خوارزميات الذكاء الاصطناعي لفائدة الطلبة الجامعيين والمهندسين الشباب.",
      en: "The specialized training bootcamp in artificial intelligence algorithms kicked off at the STLY headquarters for university students and young engineers.",
    },
    content: {
      ar: `انطلقت رسمياً فعاليات المعسكر التدريبي المكثف لرواد الذكاء الاصطناعي بمقر الرابطة العلمية والتقنية للشباب بقسنطينة. يستهدف المعسكر الطلبة والباحثين الشباب المهتمين بالبرمجة والعلوم التطبيقية.

يمتد البرنامج على مدار شهرين كاملين، ويغطي أساسيات البرمجة بلغة بايثون، تحليل البيانات، خوارزميات تعلم الآلة والتعلم العميق، بالإضافة إلى تطبيقات تدريبية تساعد المشاركين على فهم مراحل بناء النماذج الذكية.

يهدف هذا المعسكر إلى تزويد الشباب بالمهارات الحديثة التي يتطلبها سوق العمل المعاصر، وتكوين نواة من المطورين القادرين على تصميم وتطبيق نماذج ذكية تساهم في التحول الرقمي وتطوير الخدمات التقنية بالمنطقة.`,
      en: `The AI Pioneers Training Bootcamp has officially launched at the STLY headquarters. The intensive boot camp is designed for students and young researchers interested in coding and applied science.

The program runs for two full months, covering Python programming, data analytics, machine learning, deep learning algorithms, and practical training modules that help participants understand how intelligent models are built.

This bootcamp aims to equip youth with modern skills demanded by today's job market, forming a nucleus of developers capable of designing intelligent models to drive digital transformation.`,
    },
    publishedDate: "2026-06-10",
    category: {
      ar: "تدريب",
      en: "Training",
    },
    author: {
      ar: "قسم التكوين",
      en: "Training Department",
    },
    coverImage: "/images/news/ai-bootcamp.png",
    isFeatured: false,
    tags: {
      ar: ["ذكاء اصطناعي", "بايثون", "تكوين", "ورشة عمل"],
      en: ["AI", "Python", "Training", "Workshop"],
    },
  },
  {
    id: "univ-partnership-signing",
    slug: "univ-partnership-signing",
    title: {
      ar: "تعزيز التعاون العلمي مع جامعة الإخوة منتوري قسنطينة 1",
      en: "Strengthening Scientific Cooperation with Mentouri Constantine 1 University",
    },
    summary: {
      ar: "مبادرة تعاون تهدف إلى دعم التأطير العلمي وتنظيم أنشطة مشتركة وتبادل الخبرات الميدانية.",
      en: "A cooperation initiative focused on scientific mentorship, joint activities, and practical knowledge exchange.",
    },
    content: {
      ar: `في إطار تعزيز التعاون بين الفضاءات الجمعوية والوسط الأكاديمي، تعمل الرابطة العلمية والتقنية للشباب بقسنطينة على تطوير قنوات تعاون علمي وثقافي مع جامعة الإخوة منتوري قسنطينة 1.

تهدف هذه المبادرة إلى دعم التأطير العلمي، وتسهيل تبادل الخبرات بين الطلبة والنوادي العلمية، وتنظيم ندوات وورشات وصالونات تخصصية مشتركة خلال المواسم القادمة.

تعتبر الرابطة هذا التعاون خطوة مهمة لربط المعارف النظرية بالتطبيقات الميدانية التي تقدمها النوادي والورشات العلمية.`,
      en: `To strengthen collaboration between youth associations and academic institutions, STLY Constantine is developing scientific and cultural cooperation channels with Mentouri Constantine 1 University.

This initiative aims to support scientific mentorship, encourage knowledge exchange between students and science clubs, and organize shared seminars, workshops, and specialized salons.

STLY sees this cooperation as a useful step toward connecting academic knowledge with the field practice offered through clubs and workshops.`,
    },
    publishedDate: "2026-05-28",
    category: {
      ar: "شراكة",
      en: "Partnership",
    },
    author: {
      ar: "العلاقات الخارجية",
      en: "External Relations",
    },
    coverImage: "/images/news/partnership.png",
    isFeatured: false,
    tags: {
      ar: ["جامعة قسنطينة", "شراكة", "اتفاقية", "البحث العلمي"],
      en: ["Constantine University", "Partnership", "Agreement", "Research"],
    },
  },
];
