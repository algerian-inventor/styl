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
      ar: "رابطة قسنطينة تتوج بالمرتبة الأولى في المسابقة الوطنية للروبوتيك",
      en: "STLY Constantine Wins First Place in National Robotics Competition",
    },
    summary: {
      ar: "حقق فريق الروبوتات التابع للرابطة إنجازاً متميزاً بحصوله على المركز الأول في التحدي الوطني للابتكار التكنولوجي بالعاصمة.",
      en: "STLY Constantine's robotics team achieved a major milestone by winning first place in the National Tech Innovation Challenge in Algiers.",
    },
    content: {
      ar: `توج فريق الرابطة العلمية والتقنية للشباب بقسنطينة بالمرتبة الأولى في المسابقة الوطنية للروبوتيك التي احتضنتها الجزائر العاصمة، بمشاركة أزيد من 30 نادياً علمياً من مختلف ربوع الوطن.

شارك الفريق بنموذج روبوت ذكي موجه للمساهمة في فرز النفايات الصناعية وإعادة تدويرها تلقائياً باستخدام تقنيات الذكاء الاصطناعي ورؤية الحاسوب. وقد أثنت لجنة التحكيم على كفاءة البرمجة، دقة التصميم الميكانيكي، والجدوى الاقتصادية للمشروع.

يعتبر هذا التتويج ثمرة جهود دامت عدة أشهر من العمل المتواصل في مخابر الرابطة، وتحت إشراف وتوجيه المهندسين المؤطرين. وصرح رئيس الرابطة أن هذا الإنجاز يؤكد قدرة الشباب الجزائري على تقديم حلول واقعية وفعالة للمشاكل البيئية والصناعية إذا ما توفرت لهم البيئة المناسبة والدعم والتوجيه العلمي الممنهج.`,
      en: `STLY Constantine's robotics team has been crowned first place in the National Robotics Competition held in Algiers, competing against more than 30 scientific clubs from all over the country.

The team participated with an intelligent robot prototype designed for industrial waste sorting and automatic recycling using AI and computer vision. The evaluation committee praised the programming efficiency, mechanical precision, and feasibility of the design.

This achievement is the result of months of continuous work in the STLY laboratories, guided by our engineering mentors. The League President stated that this victory highlights the capability of Algerian youth to deliver viable solutions for environmental and industrial issues.`,
    },
    publishedDate: "2026-06-15",
    category: {
      ar: "إنجازات",
      en: "Achievements",
    },
    author: {
      ar: "اللجنة الإعلامية",
      en: "Media Committee",
    },
    coverImage: "/images/news/robotics-win.png",
    isFeatured: true,
    tags: {
      ar: ["روبوتيك", "مسابقة وطنية", "ابتكار", "قسنطينة"],
      en: ["Robotics", "National Competition", "Innovation", "Constantine"],
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
      ar: `انطلقت رسمياً فعاليات المعسكر التدريبي المكثف لرواد الذكاء الاصطناعي بمقر الرابطة العلمية والتقنية للشباب بقسنطينة. يستهدف المعسكر 40 طالباً وباحثاً شاباً تم اختيارهم من بين أزيد من 200 مترشح بناءً على معايير الكفاءة البرمجية والشغف العلمي.

يمتد البرنامج على مدار شهرين كاملين، ويغطي أساسيات البرمجة بلغة بايثون، تحليل البيانات، خوارزميات تعلم الآلة والتعلم العميق، بالإضافة إلى إنجاز مشاريع تطبيقية حقيقية بالتعاون مع مؤسسات ناشئة محلية.

يهدف هذا المعسكر إلى تزويد الشباب بالمهارات الحديثة التي يتطلبها سوق العمل المعاصر، وتكوين نواة من المطورين القادرين على تصميم وتطبيق نماذج ذكية تساهم في التحول الرقمي وتطوير الخدمات التقنية بالمنطقة.`,
      en: `The AI Pioneers Training Bootcamp has officially launched at the STLY headquarters. The intensive boot camp targets 40 students and young researchers chosen from over 200 applicants based on coding skills and scientific passion.

The program runs for two full months, covering Python programming, data analytics, machine learning, deep learning algorithms, and practical application modules in cooperation with local startups.

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
      ar: "توقيع اتفاقية تعاون وشراكة علمية مع جامعة الإخوة منتوري قسنطينة 1",
      en: "Signing a Scientific Cooperation Agreement with Mentouri Constantine 1 University",
    },
    summary: {
      ar: "اتفاقية شراكة جديدة تهدف لتأطير مشاريع التخرج للطلبة وتنظيم تظاهرات علمية مشتركة وتبادل الخبرات الميدانية.",
      en: "A new partnership agreement aiming to mentor students' graduation projects, organize joint scientific events, and exchange expertise.",
    },
    content: {
      ar: `في إطار تعزيز التعاون بين الفضاءات الجمعوية والوسط الأكاديمي، وقعت الرابطة العلمية والتقنية للشباب بقسنطينة اتفاقية شراكة علمية وثقافية مع رئاسة جامعة الإخوة منتوري قسنطينة 1.

تهدف هذه الاتفاقية إلى فتح أبواب مخابر الجامعة أمام المبتكرين المنخرطين بالرابطة، ومرافقة الطلبة الجامعيين في إنجاز مشاريع تخرجهم التطبيقية وابتكاراتهم داخل حاضنات الرابطة، فضلاً عن تنظيم ندوات علمية، مسابقات تكنولوجية، وصالونات تخصصية مشتركة خلال المواسم الجامعية القادمة.

أكد رئيس الرابطة أن هذه الاتفاقية تمثل خطوة هامة لبناء جسر حقيقي يربط المعارف النظرية بالجامعة مع التطبيقات والمهارات الميدانية التي تقدمها نوادي الرابطة، مما يعزز روح المقاولاتية العلمية لدى الخريجين ويحفزهم على تأسيس مؤسساتهم الناشئة الخاصة.`,
      en: `To strengthen collaboration between youth associations and academic institutions, STLY Constantine signed a scientific partnership agreement with the presidency of Mentouri Constantine 1 University.

This agreement aims to open university laboratory resources to STLY innovators, mentor students on graduation projects, support prototypes inside STLY incubators, and co-organize research seminars, tech competitions, and professional salons.

The STLY President remarked that this protocol represents a key step towards bridging theoretical academic knowledge with hands-on applications, promoting scientific entrepreneurship, and driving startups.`,
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
