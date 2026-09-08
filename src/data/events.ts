export interface Speaker {
  name: {
    ar: string;
    en: string;
  };
  role: {
    ar: string;
    en: string;
  };
  avatar: string;
}

export interface ProgramStep {
  time: string;
  activity: {
    ar: string;
    en: string;
  };
}

export interface Event {
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
  description: {
    ar: string;
    en: string;
  };
  date: string;
  time: string;
  location: {
    ar: string;
    en: string;
  };
  capacity: number;
  registrationDeadline: string;
  category: string;
  coverImage: string;
  isClosed: boolean;
  speakers: Speaker[];
  program: ProgramStep[];
}

export const events: Event[] = [
  {
    id: "science-salon-2026",
    slug: "science-salon-2026",
    title: {
      ar: "صالون قسنطينة للعلوم والتقنيات 2026",
      en: "Constantine Science & Technology Salon 2026",
    },
    summary: {
      ar: "تظاهرة علمية كبرى تجمع الشباب الشغوفين بالاختراعات وتتضمن معارض ونشاطات علمية ممتعة.",
      en: "A major scientific event gathering science enthusiasts, featuring exhibitions and engaging scientific activities.",
    },
    description: {
      ar: "يعد صالون قسنطينة للعلوم مناسبة لالتقاء النوادي العلمية والمهتمين بالعلوم لعرض التجارب وتبادل الأفكار. يتخلل الصالون محاضرات تفاعلية وورشات حية وتحديات موجهة للزوار.",
      en: "The Constantine Science Salon brings together science clubs and science enthusiasts to share experiments and exchange ideas. The salon includes interactive talks, live workshops, and visitor challenges.",
    },
    date: "2026-07-15",
    time: "09:00 - 17:00",
    location: {
      ar: "قصر الثقافة محمد العيد آل خليفة، قسنطينة",
      en: "Palace of Culture Mohamed Laid Al Khalifa, Constantine",
    },
    capacity: 250,
    registrationDeadline: "2026-07-10",
    category: "Science",
    coverImage: "/images/events/salon.png",
    isClosed: false,
    speakers: [
      {
        name: { ar: "أ.د. عمار بوالشعور", en: "Prof. Ammar Boualchour" },
        role: { ar: "باحث في الفيزياء النانوية، جامعة قسنطينة 1", en: "Nanophysics Researcher, Constantine 1 University" },
        avatar: "/images/speakers/speaker1.png",
      },
      {
        name: { ar: "د. سهام بوشارب", en: "Dr. Siham Bouchareb" },
        role: { ar: "خبيرة في النظم المدمجة وإنترنت الأشياء", en: "Embedded Systems & IoT Expert" },
        avatar: "/images/speakers/speaker2.png",
      },
    ],
    program: [
      { time: "09:00", activity: { ar: "الاستقبال والافتتاح الرسمي للمعرض", en: "Registration & Exhibition Opening" } },
      { time: "10:30", activity: { ar: "محاضرة: مستقبل تكنولوجيا النانو في الجزائر", en: "Lecture: The Future of Nanotechnology in Algeria" } },
      { time: "13:00", activity: { ar: "ورشات تفاعلية وجولة في معارض النوادي العلمية", en: "Interactive Workshops & Science Club Showcase" } },
      { time: "16:00", activity: { ar: "تكريم الفائزين بمسابقة أفضل نموذج ابتكاري والختام", en: "Awards Ceremony for Best Innovative Model & Closing" } },
    ],
  },
  {
    id: "ai-robotics-workshop",
    slug: "ai-robotics-workshop",
    title: {
      ar: "ورشة عمل: الذكاء الاصطناعي في خدمة الروبوتات",
      en: "Workshop: AI in Robotics Applications",
    },
    summary: {
      ar: "ورشة عمل تطبيقية مكثفة لدمج خوارزميات الذكاء الاصطناعي مع الروبوتات باستخدام لوحات معالجة الصور.",
      en: "An intensive practical workshop to integrate AI algorithms with robots using vision processing boards.",
    },
    description: {
      ar: "تهدف هذه الورشة إلى سد الفجوة بين البرمجيات والعتاد. سيتعلم المشاركون كيفية تشغيل خوارزميات التعرف على الأشخاص وتتبع الألوان على معالجات مصغرة وربطها بمحركات روبوت متحرك، وتعد هذه الورشة فرصة رائعة للمهندسين الشباب ومطوري البرمجيات.",
      en: "This workshop aims to bridge the gap between software and hardware. Participants will learn how to run object recognition and color tracking algorithms on single board computers and wire them to mobile robot actuators.",
    },
    date: "2026-08-05",
    time: "10:00 - 15:00",
    location: {
      ar: "مقر الرابطة، سيدي مبروك، قسنطينة",
      en: "STLY Headquarters, Sidi Mabrouk, Constantine",
    },
    capacity: 40,
    registrationDeadline: "2026-08-02",
    category: "Robotics",
    coverImage: "/images/events/robotics-ws.png",
    isClosed: false,
    speakers: [
      {
        name: { ar: "المهندس رياض حداد", en: "Eng. Riad Haddad" },
        role: { ar: "مطور روبوتات ومهندس أنظمة تحكم", en: "Robotics Developer & Control Systems Engineer" },
        avatar: "/images/speakers/speaker3.png",
      },
    ],
    program: [
      { time: "10:00", activity: { ar: "مقدمة في معالجة الصور باستخدام OpenCV", en: "Introduction to Image Processing with OpenCV" } },
      { time: "11:30", activity: { ar: "تثبيت النماذج على معالجات Raspberry Pi", en: "Deploying Models on Raspberry Pi Boards" } },
      { time: "13:30", activity: { ar: "تطبيق عملي: التحكم بحركة المحركات بناءً على إحداثيات الكاميرا", en: "Hands-on: Controlling Motors based on Camera Coordinates" } },
    ],
  },
  {
    id: "innovation-hackathon-2026",
    slug: "innovation-hackathon-2026",
    title: {
      ar: "هاكاثون الجزائر للابتكار التقني",
      en: "Algeria Tech Innovation Hackathon",
    },
    summary: {
      ar: "تحدي دام 48 ساعة متواصلة لتطوير حلول ذكية لمشاكل بيئية وصناعية في مدينة قسنطينة.",
      en: "A 48-hour continuous hackathon to develop smart solutions for environmental and industrial challenges in Constantine.",
    },
    description: {
      ar: "جمع هذا الهاكاثون مشاركين من مجالات البرمجة والتصميم والابتكار ضمن فرق تنافسية، واشتغلوا على أفكار في تسيير النفايات الذكي، ترشيد استهلاك الطاقة، وتسهيل النقل الحضري، بدعم من المؤطرين والشركاء.",
      en: "This hackathon brought together participants from programming, design, and innovation backgrounds in competitive teams. They worked on ideas in smart waste management, energy saving, and urban transit with support from mentors and partners.",
    },
    date: "2026-05-10",
    time: "48 ساعة مستمرة",
    location: {
      ar: "حاضنة الأعمال بجامعة قسنطينة 3",
      en: "Business Incubator, Constantine 3 University",
    },
    capacity: 80,
    registrationDeadline: "2026-05-01",
    category: "Innovation",
    coverImage: "/images/events/hackathon.png",
    isClosed: true,
    speakers: [
      {
        name: { ar: "أ. أمين بلحوت", en: "Amin Belhout" },
        role: { ar: "مستشار استثماري ومدرب ريادة الأعمال", en: "Investment Consultant & Entrepreneurship Coach" },
        avatar: "/images/speakers/speaker4.png",
      },
    ],
    program: [
      { time: "اليوم 1 - 09:00", activity: { ar: "انطلاق الهاكاثون وتشكيل الفرق وعرض المشاكل", en: "Hackathon Start, Team Formation & Briefing" } },
      { time: "اليوم 2 - 14:00", activity: { ar: "ورشات توجيهية ومتابعة تقنية مع المرشدين", en: "Mentorship Sessions & Technical Code Reviews" } },
      { time: "اليوم 3 - 15:00", activity: { ar: "عرض المشاريع وتبادل الملاحظات الختامية", en: "Project Pitching & Closing Feedback" } },
    ],
  },
];
