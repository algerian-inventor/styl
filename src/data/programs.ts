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

export const programs: Program[] = [
  {
    id: "robotics-club",
    slug: "robotics-club",
    name: {
      ar: "نادي الروبوتات والأنظمة الذكية",
      en: "Robotics and Smart Systems Club",
    },
    summary: {
      ar: "برنامج تدريبي تطبيقي يركز على تصميم وبرمجة الروبوتات باستخدام لوحات التحكم الدقيقة والمستشعرات.",
      en: "A practical training program focusing on designing and programming robots using microcontrollers and sensors.",
    },
    description: {
      ar: "يهدف نادي الروبوتات إلى تزويد الشباب بالمهارات الأساسية في الهندسة والميكانيك والبرمجة. سيتعلم المشاركون كيفية بناء وتجميع الروبوتات، وتوصيل الدارات الإلكترونية، وكتابة الأكواد البرمجية للتحكم بالروبوت وجعله يتفاعل مع البيئة المحيطة به.",
      en: "The Robotics Club aims to equip youth with core engineering, mechanics, and coding skills. Participants will learn how to assemble robots, connect electronic boards, and write algorithms for environmental interaction.",
    },
    category: {
      ar: "الروبوتيك",
      en: "Robotics",
    },
    status: "active",
    startDate: "2026-09-10",
    duration: {
      ar: "3 أشهر (60 ساعة)",
      en: "3 Months (60 Hours)",
    },
    coverImage: "/images/programs/robotics.png",
    details: {
      ar: [
        "أساسيات البرمجة بلغة C++ للوحات Arduino.",
        "مبادئ الهندسة الميكانيكية وتجميع محركات الحركة.",
        "التعامل مع المستشعرات (الموجات فوق الصوتية، الضوء، الحرارة).",
        "تطوير روبوت متكامل لتفادي العقبات أو تتبع المسارات.",
      ],
      en: [
        "C++ basics for Arduino controllers.",
        "Mechanical engineering principles and actuator assemblies.",
        "Working with sensors (ultrasound, light, temperature).",
        "Developing an obstacle-avoiding or line-following robot.",
      ],
    },
  },
  {
    id: "ai-pioneers",
    slug: "ai-pioneers",
    name: {
      ar: "مخيم رواد الذكاء الاصطناعي",
      en: "AI Pioneers Bootcamp",
    },
    summary: {
      ar: "رحلة معرفية لاستكشاف تطبيقات الذكاء الاصطناعي وتعلم الآلة من الصفر باستخدام لغة بايثون.",
      en: "A learning journey to explore AI applications and machine learning from scratch using Python.",
    },
    description: {
      ar: "في هذا المخيم، سيتعرف الطلاب على المفاهيم الأساسية للذكاء الاصطناعي وتعلم الآلة. يغطي البرنامج جوانب تحليل البيانات، ورؤية الحاسوب، ومعالجة اللغات الطبيعية، مع تطبيقات عملية تحل مشاكل واقعية.",
      en: "In this bootcamp, students will learn the fundamental concepts of AI and machine learning. The program covers data analysis, computer vision, and NLP, with hands-on labs solving real-world challenges.",
    },
    category: {
      ar: "الذكاء الاصطناعي",
      en: "AI",
    },
    status: "active",
    startDate: "2026-09-15",
    duration: {
      ar: "2 شهرين (45 ساعة)",
      en: "2 Months (45 Hours)",
    },
    coverImage: "/images/programs/ai.png",
    details: {
      ar: [
        "أساسيات لغة بايثون والمكتبات الرياضية (NumPy, Pandas).",
        "مفهوم تعلم الآلة الخاضع للإشراف وغير الخاضع للإشراف.",
        "تطوير نماذج تصنيف وتنبؤ بالبيانات.",
        "مقدمة في الشبكات العصبية العميقة ورؤية الحاسوب.",
      ],
      en: [
        "Python syntax and scientific libraries (NumPy, Pandas).",
        "Supervised and unsupervised machine learning models.",
        "Developing classification and prediction pipelines.",
        "Introduction to deep neural networks and computer vision.",
      ],
    },
  },
  {
    id: "electronics-lab",
    slug: "electronics-lab",
    name: {
      ar: "ورشة مهندس الإلكترونيات الصغير",
      en: "Young Electronics Engineer Workshop",
    },
    summary: {
      ar: "ورشة عمل تفاعلية للأطفال واليافعين لاكتشاف أسرار الكهرباء وبناء لوحات الدارات المطبوعة.",
      en: "An interactive workshop for children and teens to explore electricity and assemble basic circuits.",
    },
    description: {
      ar: "برنامج مبسط وممتع يهدف لتبسيط المفاهيم الفيزيائية والكهربائية. يقوم المشاركون بتركيب قطع إلكترونية حقيقية، واستخدام اللحام، وفهم طريقة عمل الترانزستورات والمقاومات والصمامات الثنائية الباعثة للضوء بشكل آمن.",
      en: "A simplified, engaging program to demystify electricity. Participants will wire physical hardware, solder components, and learn how transistors, resistors, and LEDs work in a safe laboratory environment.",
    },
    category: {
      ar: "الإلكترونيات",
      en: "Electronics",
    },
    status: "upcoming",
    startDate: "2026-10-01",
    duration: {
      ar: "6 أسابيع (24 ساعة)",
      en: "6 Weeks (24 Hours)",
    },
    coverImage: "/images/programs/electronics.png",
    details: {
      ar: [
        "فهم التيار والجهد الكهربائي والمقاومة.",
        "طريقة قراءة مخططات الدارات الإلكترونية.",
        "استخدام لوحة التجارب (Breadboard) وتوصيل العناصر.",
        "بناء جهاز إنذار أو مصباح تلقائي بسيط.",
      ],
      en: [
        "Understanding voltage, current, and resistance.",
        "Reading schematics and circuit diagrams.",
        "Wiring components on a breadboard.",
        "Building a simple alarm or automatic light switch.",
      ],
    },
  },
  {
    id: "innovation-leadership",
    slug: "innovation-leadership",
    name: {
      ar: "مسار الابتكار والقيادة العلمية",
      en: "Scientific Innovation and Leadership Track",
    },
    summary: {
      ar: "برنامج تدريبي يركز على صياغة الأفكار البحثية وتجريب حلول تقنية قابلة للتطوير.",
      en: "A training program focused on shaping research ideas and testing technical solutions that can evolve.",
    },
    description: {
      ar: "نعمل على مرافقة المبتكرين الشباب في مسار تصميم الحلول، تنظيم العمل الجماعي، والتدريب على مهارات القيادة وعرض الأفكار أمام لجان التأطير.",
      en: "We guide young innovators through solution design, team organization, leadership skills, and presenting ideas to mentorship panels.",
    },
    category: {
      ar: "الابتكار والقيادة",
      en: "Innovation",
    },
    status: "completed",
    startDate: "2026-03-01",
    duration: {
      ar: "4 أشهر (80 ساعة)",
      en: "4 Months (80 Hours)",
    },
    coverImage: "/images/programs/innovation.png",
    details: {
      ar: [
        "منهجية التفكير التصميمي (Design Thinking).",
        "تطوير دراسة الجدوى ونموذج العمل التجاري (Business Model Canvas).",
        "مبادئ إدارة المشاريع والعمل الجماعي.",
        "مهارات العرض والتواصل الإقناعي (Pitching).",
      ],
      en: [
        "Design Thinking methodologies.",
        "Developing feasibility studies and Business Model Canvas.",
        "Project management and collaboration frameworks.",
        "Public speaking and pitching skills.",
      ],
    },
  },
];
