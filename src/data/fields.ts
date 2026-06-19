import { Atom, Cpu, Binary, Brain, Wrench, FlaskConical, Lightbulb, Zap } from "lucide-react";

export interface ScientificField {
  id: string;
  slug: string;
  iconName: "Atom" | "Cpu" | "Binary" | "Brain" | "Wrench" | "FlaskConical" | "Lightbulb" | "Zap";
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  colorClass: string;
}

export const fields: ScientificField[] = [
  {
    id: "science",
    slug: "science",
    iconName: "Atom",
    title: {
      ar: "العلوم",
      en: "Science",
    },
    description: {
      ar: "استكشاف الطبيعة والظواهر الفيزيائية والفلكية من خلال الملاحظة والتجريب والبحث العلمي الممنهج.",
      en: "Exploring nature, physics, and astronomy through systemic observation, experimentation, and scientific research.",
    },
    colorClass: "border-blue-500 text-blue-500 bg-blue-500/5",
  },
  {
    id: "tech",
    slug: "tech",
    iconName: "Cpu",
    title: {
      ar: "التكنولوجيا",
      en: "Technology",
    },
    description: {
      ar: "تعلم البرمجة، وتصميم شبكات الحواسيب، والتعامل مع نظم التشغيل المختلفة والبرمجيات المتقدمة.",
      en: "Learning programming, computer network design, operating systems, and advanced software development.",
    },
    colorClass: "border-green-500 text-green-500 bg-green-500/5",
  },
  {
    id: "engineering",
    slug: "engineering",
    iconName: "Wrench",
    title: {
      ar: "الهندسة",
      en: "Engineering",
    },
    description: {
      ar: "تطبيق المبادئ الرياضية والعلمية لتصميم وتطوير الهياكل، والآلات، والحلول الميكانيكية المبتكرة.",
      en: "Applying mathematical and scientific principles to design and build structures, machines, and mechanical solutions.",
    },
    colorClass: "border-orange-500 text-orange-500 bg-orange-500/5",
  },
  {
    id: "electronics",
    slug: "electronics",
    iconName: "Zap",
    title: {
      ar: "الإلكترونيات",
      en: "Electronics",
    },
    description: {
      ar: "دراسة الدارات الكهربائية، وتصميم لوحات المطبوعات الإلكترونية، والتحكم بالتيارات وتجميع المكونات.",
      en: "Studying electric circuits, designing PCBs, controlling currents, and assembling electronic systems.",
    },
    colorClass: "border-yellow-500 text-yellow-500 bg-yellow-500/5",
  },
  {
    id: "ai",
    slug: "ai",
    iconName: "Brain",
    title: {
      ar: "الذكاء الاصطناعي",
      en: "Artificial Intelligence",
    },
    description: {
      ar: "فهم خوارزميات تعلم الآلة، ومعالجة اللغات الطبيعية، وتطوير نماذج ذكية تحاكي التفكير البشري.",
      en: "Understanding machine learning algorithms, natural language processing, and building intelligent models.",
    },
    colorClass: "border-indigo-500 text-indigo-500 bg-indigo-500/5",
  },
  {
    id: "robotics",
    slug: "robotics",
    iconName: "Binary",
    title: {
      ar: "الروبوتيك",
      en: "Robotics",
    },
    description: {
      ar: "برمجة وبناء الروبوتات والأنظمة ذاتية التحكم وتصميم المستشعرات ومحركات الحركة المتقدمة.",
      en: "Programming and constructing robots, autonomous systems, sensor feedback networks, and actuators.",
    },
    colorClass: "border-purple-500 text-purple-500 bg-purple-500/5",
  },
  {
    id: "chemistry",
    slug: "chemistry",
    iconName: "FlaskConical",
    title: {
      ar: "الكيمياء",
      en: "Chemistry",
    },
    description: {
      ar: "إجراء التجارب المعملية التفاعلية، وفهم تركيب المواد، واستكشاف التفاعلات الكيميائية الآمنة.",
      en: "Conducting lab experiments, understanding molecular compositions, and exploring chemical reactions.",
    },
    colorClass: "border-red-500 text-red-500 bg-red-500/5",
  },
  {
    id: "innovation",
    slug: "innovation",
    iconName: "Lightbulb",
    title: {
      ar: "الابتكار والقيادة",
      en: "Innovation & Leadership",
    },
    description: {
      ar: "تطوير ريادة الأعمال العلمية، وإدارة المشاريع التقنية، وبناء مهارات التفكير التصميمي والعرض الجذاب.",
      en: "Developing scientific entrepreneurship, managing tech projects, and learning design thinking skills.",
    },
    colorClass: "border-teal-500 text-teal-500 bg-teal-500/5",
  },
];

export const iconMap = {
  Atom,
  Cpu,
  Binary,
  Brain,
  Wrench,
  FlaskConical,
  Lightbulb,
  Zap,
};
