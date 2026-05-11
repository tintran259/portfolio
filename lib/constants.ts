export const PERSONAL = {
  name: "Tin Tran",
  title: "Software Engineer",
  subtitle:
    "Software Engineer with 3+ years specializing in large-scale e-commerce platforms and cross-platform mobile apps. 3+ years shipping production React & Next.js applications with CMS-driven architecture and pixel-perfect UIs.",
  email: "tintran2591999@gmail.com",
  phone: "(+84) 392-340-756",
  location: "Ho Chi Minh City, Vietnam",
  github: "https://github.com/tintran259",
  linkedin: "https://linkedin.com/in/tintran259",
  website: "tintran.dev",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = [
  // Frontend
  { name: "React.js", category: "Frontend", color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", color: "#555555" },
  { name: "Redux", category: "Frontend", color: "#764ABC" },
  { name: "Tailwind CSS", category: "Frontend", color: "#06B6D4" },
  { name: "Styled Components", category: "Frontend", color: "#DB7093" },
  { name: "Ant Design", category: "Frontend", color: "#1677FF" },
  { name: "MUI", category: "Frontend", color: "#007FFF" },
  { name: "Bootstrap", category: "Frontend", color: "#7952B3" },
  // Language
  { name: "TypeScript", category: "Language", color: "#3178C6" },
  { name: "JavaScript", category: "Language", color: "#D4B700" },
  { name: "HTML & CSS", category: "Language", color: "#E34F26" },
  // Mobile
  { name: "React Native", category: "Mobile", color: "#61DAFB" },
  { name: "Expo", category: "Mobile", color: "#9999EE" },
  // Backend
  { name: "Node.js", category: "Backend", color: "#68A063" },
  { name: "NestJS", category: "Backend", color: "#E0234E" },
  { name: "Express.js", category: "Backend", color: "#888888" },
  { name: "Strapi", category: "Backend", color: "#8C4DE4" },
  // Database
  { name: "MySQL", category: "Database", color: "#4479A1" },
  { name: "MongoDB", category: "Database", color: "#47A248" },
  // DevOps
  { name: "Docker", category: "DevOps", color: "#2496ED" },
  { name: "Nginx", category: "DevOps", color: "#009639" },
  { name: "PM2", category: "DevOps", color: "#5A29E4" },
  { name: "Vite", category: "DevOps", color: "#646CFF" },
  // Tools
  { name: "Git", category: "Tools", color: "#F05032" },
  { name: "Figma", category: "Tools", color: "#F24E1E" },
  { name: "Jira", category: "Tools", color: "#0052CC" },
  { name: "Bitbucket", category: "Tools", color: "#205081" },
  { name: "Claude", category: "Tools", color: "#CC785C" },
  { name: "ChatGPT", category: "Tools", color: "#10A37F" },
  { name: "Codex", category: "Tools", color: "#6B6BFF" },
];

export const SKILL_CATEGORIES = [
  "Frontend",
  "Language",
  "Mobile",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
] as const;

export const PROJECTS = [
  {
    id: 2,
    title: "BMG World",
    company: "Digicommerce",
    description:
      "Full-featured e-commerce website with CMS-based layout builder. The client defines page structure, content blocks, and promotional banners independently — zero dev involvement for routine content updates.",
    tech: ["Next.js", "TypeScript", "Redux", "Styled Components", "Strapi", "Docker"],
    github: "#",
    demo: "https://bmgworld.net",
    year: "2025 – Now",
    featured: true,
  },
  {
    id: 7,
    title: "Spend Log",
    company: "Personal",
    description:
      "Expense tracking app inspired by Locket — capture spending moments with a photo, then visualise monthly spending against your personal budget goals. AI-powered insights via Claude.",
    tech: ["React Native", "Expo", "Claude AI"],
    github: "#",
    demo: "#",
    year: "2025",
    featured: false,
  },
  {
    id: 6,
    title: "Falencer — Ergonomic Dashboard",
    company: "Personal",
    description:
      "Admin dashboard for Mason ergonomic chair brand — product management, order tracking, and analytics built with a modern full-stack architecture.",
    tech: ["React.js", "NestJS", "TypeScript"],
    github: "#",
    demo: "#",
    year: "2025",
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    company: "Personal",
    description:
      "Personal portfolio with a 3D animated Rubik's cube showcasing tech stacks, automatic scramble-solve loop, cinematic splash screen, and premium UI/UX.",
    tech: ["Next.js", "Three.js", "React Three Fiber", "Framer Motion", "Styled Components"],
    github: "#",
    demo: "#",
    year: "2025",
    featured: false,
  },
  {
    id: 1,
    title: "DMSI — CMS E-Commerce Platform",
    company: "Digicommerce",
    description:
      "B2B e-commerce platform where merchants define their full storefront layout through a CMS-driven configuration — page structure, theme, and component layout are all customizable without touching code.",
    tech: ["Next.js", "TypeScript", "Redux", "Styled Components", "Strapi", "Docker", "Nginx"],
    github: "#",
    demo: "#",
    year: "2022 – 2025",
    featured: true,
  },
  {
    id: 3,
    title: "HRSol — HR Management System",
    company: "Citynow",
    description:
      "Comprehensive human resource system covering timekeeping, leave management, daily reporting, scheduling, and progress tracking — deployed across web and mobile for enterprise teams.",
    tech: ["React.js", "Redux", "React Native", "Figma"],
    github: "#",
    demo: "#",
    year: "2021 – 2022",
    featured: false,
  },
  {
    id: 5,
    title: "Locker — Smart Locker App",
    company: "Citynow",
    description:
      "Mobile app that lets users confirm and manage their locker rentals for item storage. Currently deployed at emart Thảo Điền and Thiso Mall supermarkets.",
    tech: ["React Native", "Expo", "Firebase"],
    github: "#",
    demo: "#",
    year: "2021 – 2022",
    featured: false,
  },
];

export const TECH_LOGOS = [
  { name: "React", color: "#61DAFB", bg: "#04111a" },
  { name: "Next.js", color: "#ffffff", bg: "#000000" },
  { name: "Node.js", color: "#68A063", bg: "#061206" },
  { name: "NestJS", color: "#E0234E", bg: "#0e0105" },
  { name: "TypeScript", color: "#3178C6", bg: "#0b1828" },
  { name: "Figma", color: "#F24E1E", bg: "#0d0d12" },
  { name: "MongoDB", color: "#47A248", bg: "#061008" },
  { name: "JavaScript", color: "#F7DF1E", bg: "#1a1700" },
  { name: "GitHub", color: "#ffffff", bg: "#0d0d0d" },
  { name: "Docker", color: "#2496ED", bg: "#021523" },
  { name: "Styled", color: "#DB7093", bg: "#1a0a0e" },
  { name: "Claude AI", color: "#CC785C", bg: "#1a0e09" },
];
