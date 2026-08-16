export const SITE_CONFIG = {
  name: "Emiel Bloem",
  firstName: "Emiel",
  lastName: "Bloem",
  title: "AI & Full-Stack Developer",
  roleLine: "AI & Full-Stack Developer",
  subtitle:
    "Building intelligent web experiences with cutting-edge AI and modern frameworks.",
  domain: "bloem.dev",
  brand: "bloem.dev",
  description:
    "Personal portfolio of Emiel Bloem — AI specialist and full-stack developer.",
};

export const NAVIGATION = [
  { id: "work", label: "Work", href: "#work", index: "01" },
  { id: "about", label: "About", href: "#about", index: "02" },
  { id: "systems", label: "Systems", href: "#systems", index: "03" },
  { id: "contact", label: "Contact", href: "#contact", index: "04" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/Bethamil",
  linkedin: "https://www.linkedin.com/in/emiel-bloem-01239261",
  drupal: "https://www.drupal.org/u/emielb",
};

export const ABOUT_CONTENT = {
  sectionLabel: "02  /  ABOUT",
  title: "About",
  paragraphs: [
    "I'm a full-stack software engineer building modern web applications with PHP, Drupal, Next.js, and TypeScript. I also work extensively with Python for LLM-powered applications—from RAG architectures to AI-driven user experiences—bringing intelligent features into production when needed.",
  ],
};

export const AI_FOCUS = [
  {
    code: "01",
    title: "AI & LLM specialist",
    detail: "Frontier and open-source models, RAG systems, and intelligent automation.",
  },
  {
    code: "02",
    title: "Full-stack developer",
    detail: "Python, TypeScript, and PHP across modern frameworks.",
  },
  {
    code: "03",
    title: "Enterprise systems",
    detail: "Drupal, Symfony, Spring Boot, and scalable architectures.",
  },
];

export const TECH_STACK = {
  sectionLabel: "03  /  SYSTEMS",
  title: "Tech stack",
  description:
    "A set of technologies I use as the backbone of my development approach — chosen for performance, scalability, and user experience.",
  categories: [
    {
      name: "AI",
      items: ["Frontier LLMs", "Open-weight models", "Agents", "RAG", "Evals"],
    },
    {
      name: "Interface",
      items: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      name: "Platform",
      items: ["Python", "Node.js", "Drupal", "Symfony", "Spring Boot"],
    },
    {
      name: "Ops",
      items: ["Kubernetes", "Docker", "Git", "CI/CD"],
    },
  ],
};

export type ProjectKind = "ai" | "drupal" | "product";

export type Project = {
  name: string;
  year: string;
  description: string;
  tags: string[];
  kind: ProjectKind;
  live?: string;
  repo?: string;
  meta?: string;
};

export const PROJECTS = {
  sectionLabel: "01  /  WORK",
  title: "Projects",
  description: "Here are some of the projects I've been working on.",
  items: [
    {
      name: "Terminal Poker",
      year: "2026",
      description:
        "Planning poker without the ceremony. Real-time rooms, optional Jira sync, zero-account joins, and a CLI so estimators can stay in the terminal.",
      tags: ["TypeScript", "Socket.IO", "CLI", "PostgreSQL"],
      kind: "product",
      live: "https://poker.bloem.dev",
      repo: "https://github.com/Bethamil/terminal_poker",
      meta: "poker.bloem.dev",
    },
    {
      name: "ForKAI",
      year: "2025",
      description:
        "An AI cook that turns leftover ingredients into full recipes — with generated food images, private collections, and shared grocery lists.",
      tags: ["AI", "Next.js", "Image gen", "RAG-adjacent"],
      kind: "ai",
      live: "https://forkai.vercel.app/",
      meta: "forkai.vercel.app",
    },
    {
      name: "LLM Param Playground",
      year: "2025",
      description:
        "A Gradio lab for swapping providers, sweeping decoding parameters, and probing RAG plus MCP tools before they hit a product.",
      tags: ["Python", "LLMs", "Gradio", "RAG", "MCP"],
      kind: "ai",
      repo: "https://github.com/Bethamil/LLM_param_playground",
      meta: "github.com/Bethamil",
    },
    {
      name: "AI RAG API",
      year: "2026",
      description:
        "Turns Drupal into an OpenAI-compatible chat completions API with RAG. Point any OpenAI SDK at the site and get streaming answers grounded in your own content, with sources.",
      tags: ["Drupal", "RAG", "API", "AI"],
      kind: "ai",
      live: "https://www.drupal.org/project/ai_rag_api",
      repo: "https://git.drupalcode.org/project/ai_rag_api",
      meta: "drupal.org/project/ai_rag_api",
    },
    {
      name: "AI CKEditor CEFR",
      year: "2026",
      description:
        "A CKEditor 5 action that rewrites selected text to a CEFR level (A1–C2). Editors pick a target, generate a rewrite, and save it back into the document.",
      tags: ["Drupal", "CKEditor", "CEFR", "AI"],
      kind: "ai",
      live: "https://www.drupal.org/project/ai_ckeditor_cefr",
      repo: "https://git.drupalcode.org/project/ai_ckeditor_cefr",
      meta: "drupal.org/project/ai_ckeditor_cefr",
    },
    {
      name: "Nonce Generator",
      year: "2025",
      description:
        "Fresh CSP nonces per request, injected into script-src headers. Plugin-based, so scripts stay nonce-aware even when the page is cached.",
      tags: ["Drupal", "CSP", "Security"],
      kind: "drupal",
      live: "https://www.drupal.org/project/nonce_generator",
      repo: "https://git.drupalcode.org/project/nonce_generator",
      meta: "drupal.org/project/nonce_generator",
    },
    {
      name: "Mattermost Logger",
      year: "2025",
      description:
        "Pipes Drupal watchdog into Mattermost via incoming webhooks. Per-channel levels, color-coded attachments, and a webhook per log channel if you want it.",
      tags: ["Drupal", "Mattermost", "Logging"],
      kind: "drupal",
      live: "https://www.drupal.org/project/mattermost_logger",
      repo: "https://git.drupalcode.org/project/mattermost_logger",
      meta: "drupal.org/project/mattermost_logger",
    },
    {
      name: "Next Custom Tags",
      year: "2025",
      description:
        "Extracts custom cache tags from Drupal entities and revalidates Next.js frontends with on-demand ISR. Plugin-based tags, plus a menu submodule.",
      tags: ["Drupal", "Next.js", "ISR"],
      kind: "drupal",
      live: "https://www.drupal.org/project/next_custom_tags",
      repo: "https://git.drupalcode.org/project/next_custom_tags",
      meta: "drupal.org/project/next_custom_tags",
    },
    {
      name: "SketchRider",
      year: "2026",
      description:
        "A hand-drawn Line Rider. Sketch a track, hit play, gravity does the rest. Vanilla TypeScript, canvas, ~10 KB gzipped, works offline.",
      tags: ["TypeScript", "Canvas", "PWA"],
      kind: "product",
      live: "https://sketchrider.netlify.app/",
      repo: "https://github.com/Bethamil/sketchrider",
      meta: "sketchrider.netlify.app",
    },
    {
      name: "TinySpark",
      year: "2026",
      description:
        "A Dutch-language learning PWA for kids under four — colors, animals, numbers, and the alphabet, built for iPad thumbs and small attention spans.",
      tags: ["React", "PWA", "Education"],
      kind: "product",
      live: "https://tinyspark-kids.netlify.app",
      repo: "https://github.com/Bethamil/TinySpark",
      meta: "tinyspark-kids.netlify.app",
    },
  ] satisfies Project[],
  githubCta: {
    text: "All repositories",
    link: "https://github.com/Bethamil",
  },
  drupalCta: {
    text: "Drupal contributions",
    link: "https://git.drupalcode.org/users/emielb/contributed",
  },
};

export const CONTACT = {
  sectionLabel: "04  /  CONTACT",
  title: "Contact",
  description:
    "Feel free to connect with me via LinkedIn for any inquiries or professional engagements. You can reach out by sending a message or connecting directly through my LinkedIn profile. I look forward to hearing from you.",
  linkedinName: "Emiel Bloem",
};

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
