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
    id: "ansf-2026",
    slug: "ansf-2026",
    title: {
      ar: "المعرض العلمي الوطني الجزائري 2026",
      en: "Algerian National Science Fair 2026",
    },
    summary: {
      ar: "مسابقة علمية لفئة 12–18 سنة أقيمت من 17 إلى 19 جويلية 2026 ضمن الأنشطة العلمية لرابطة النشاطات العلمية والتقنية للشباب – قسنطينة.",
      en: "A science competition for ages 12–18 held from 17 to 19 July 2026 within STLY Constantine's scientific activities.",
    },
    description: {
      ar: "ANSF 2026 هو المعرض العلمي الوطني الجزائري، وهو مسابقة علمية لفئة 12–18 سنة في 9 مجالات: الكيمياء، الطب، الهندسة، الفيزياء، البيئة، الأحياء، العلوم الاجتماعية، الرياضيات، وعلوم الحاسوب.",
      en: "ANSF 2026 is the Algerian National Science Fair, a science competition for ages 12–18 across 9 fields: Chemistry, Medicine, Engineering, Physics, Environment, Biology, Social Sciences, Mathematics, and Computer Science.",
    },
    date: "2026-07-17",
    time: "17–19 July 2026",
    location: {
      ar: "",
      en: "",
    },
    capacity: 0,
    registrationDeadline: "",
    category: "ANSF",
    coverImage: "",
    isClosed: true,
    speakers: [],
    program: [],
  },
];
