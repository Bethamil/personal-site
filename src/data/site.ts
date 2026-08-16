export const SITE_CONFIG = {
  name: "Emiel Bloem",
  firstName: "Emiel",
  lastName: "Bloem",
  roleLine: "AI & Full-Stack Developer",
  subtitle:
    "Building intelligent web experiences with cutting-edge AI and modern frameworks.",
  brand: "bloem.dev",
  description:
    "Personal portfolio of Emiel Bloem — AI specialist and full-stack developer.",
};

export const NAVIGATION = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "systems", label: "Systems" },
  { id: "contact", label: "Contact" },
] as const;

export type NavId = (typeof NAVIGATION)[number]["id"];

export function navIndex(id: string) {
  const index = NAVIGATION.findIndex((item) => item.id === id);
  return String(index + 1).padStart(2, "0");
}

export function sectionKicker(id: NavId) {
  const item = NAVIGATION.find((entry) => entry.id === id);
  return `${navIndex(id)}  /  ${item?.label.toUpperCase()}`;
}

export const SOCIAL = [
  { id: "github", label: "GitHub", href: "https://github.com/Bethamil", hint: "Bethamil" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/emiel-bloem-01239261",
    hint: "Emiel Bloem",
  },
  { id: "drupal", label: "Drupal", href: "https://www.drupal.org/u/emielb", hint: "emielb" },
] as const;

export const HERO_SOCIAL_IDS = ["github", "drupal"] as const;
export const CONTACT_SOCIAL_IDS = ["linkedin", "github", "drupal"] as const;

export function socialById(id: string) {
  return SOCIAL.find((item) => item.id === id);
}

export const MORE_LINKS = [
  { id: "repos", label: "All repositories", href: "https://github.com/Bethamil" },
  {
    id: "drupal-contrib",
    label: "Drupal contributions",
    href: "https://git.drupalcode.org/users/emielb/contributed",
  },
] as const;

export const ABOUT_CONTENT = {
  title: "About",
  paragraphs: [
    "I'm a full-stack software engineer building modern web applications with PHP, Drupal, Next.js, and TypeScript. I also work extensively with Python for LLM-powered applications—from RAG architectures to AI-driven user experiences—bringing intelligent features into production when needed.",
  ],
};

export const HIGHLIGHTS = [
  {
    title: "AI & LLM specialist",
    detail: "Frontier and open-source models, RAG systems, and intelligent automation.",
  },
  {
    title: "Full-stack developer",
    detail: "Python, TypeScript, and PHP across modern frameworks.",
  },
  {
    title: "Enterprise systems",
    detail: "Drupal, Symfony, Spring Boot, and scalable architectures.",
  },
];

export const TECH_STACK = {
  title: "Tech stack",
  description:
    "A set of technologies I use as the backbone of my development approach — chosen for performance, scalability, and user experience.",
  categories: [
    { name: "AI", items: ["Frontier LLMs", "Open-weight models", "Agents", "RAG", "Evals"] },
    { name: "Interface", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
    { name: "Platform", items: ["Python", "Node.js", "Drupal", "Symfony", "Spring Boot"] },
    { name: "Ops", items: ["Kubernetes", "Docker", "Git", "CI/CD"] },
  ],
};

export const CONTACT = {
  title: "Contact",
  description:
    "Feel free to connect with me via LinkedIn for any inquiries or professional engagements. You can reach out by sending a message or connecting directly through my LinkedIn profile. I look forward to hearing from you.",
};
