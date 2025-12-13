export const SITE_CONFIG = {
  name: "Emiel Bloem",
  title: "AI & Full-Stack Developer",
  subtitle: "Building intelligent web experiences with cutting-edge AI and modern frameworks",
  domain: "bloem.dev",
  brand: "Bloem.dev",
  description: "Personal portfolio of Emiel Bloem - AI specialist and full-stack developer",
};

export const NAVIGATION = [
  { label: "About", href: "#about" },
  { label: "Tech", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/Bethamil",
  linkedin: "https://www.linkedin.com/in/emiel-bloem-01239261",
  drupal: "https://www.drupal.org/u/emielb",
};

export const ABOUT_CONTENT = {
  sectionLabel: "ABOUT ME",
  title: "About",
  paragraphs: [
    "I'm a full-stack software engineer building modern web applications with PHP, Drupal, Next.js, and TypeScript. I also work extensively with Python for LLM-powered applications—from RAG architectures to AI-driven user experiences—bringing intelligent features into production when needed.",
  ],
};

export const TECH_STACK = {
  sectionLabel: "MY TOOLKIT",
  title: "Tech Stack",
  description:
    "I have curated a set of technologies that form the backbone of my development approach. Each element is chosen deliberately to enhance performance, scalability, and user experience.",
  categories: [
    {
      name: "AI & Machine Learning",
      items: [
        { name: "Frontier LLMs", icon: "Brain" },
        { name: "Open Source/Weight LLMs", icon: "Sparkles" },
        { name: "AI Agents", icon: "CircuitBoard" },
        { name: "RAG Systems", icon: "Database" },
      ],
    },
    {
      name: "Frontend",
      items: [
        { name: "React", icon: "Atom" },
        { name: "Next.js", icon: "Globe" },
        { name: "TypeScript", icon: "FileCode" },
        { name: "Tailwind CSS", icon: "Palette" },
      ],
    },
    {
      name: "Backend & CMS",
      items: [
        { name: "Drupal", icon: "Droplet" },
        { name: "Node.js", icon: "Hexagon" },
        { name: "Symfony", icon: "Code2" },
        { name: "Spring Boot", icon: "Leaf" },
      ],
    },
    {
      name: "DevOps & Tools",
      items: [
        { name: "Kubernetes", icon: "Ship" },
        { name: "Docker", icon: "Container" },
        { name: "Git", icon: "GitBranch" },
        { name: "CI/CD", icon: "RefreshCw" },
      ],
    },
  ],
};

export const PROJECTS = {
  sectionLabel: "MY WORK",
  title: "Projects",
  description: "Here are some of the projects I've been working on.",
  featured: [
    {
      name: "ForKAI",
      description:
        "An AI-powered recipe generator that creates detailed recipes with beautiful food images. Transform leftover ingredients into delicious meals, keep recipes private, and build smart grocery lists.",
      tags: ["AI", "Next.js", "Recipe Generation", "Image AI"],
      link: "https://forkai.vercel.app/",
      featured: true,
    },
  ],
  other: [
    {
      name: "LLM Param Playground",
      description:
        "A Python-based web application built with Gradio that serves as an interactive playground for Large Language Models. Experiment with multiple LLM providers (OpenAI, OpenRouter, custom endpoints), fine-tune parameters, and explore advanced features like RAG and MCP tool integration.",
      tags: ["Python", "LLMs", "Gradio", "RAG", "MCP"],
      link: "https://github.com/Bethamil/LLM_param_playground",
      featured: false,
    },
  ],
  githubCta: {
    text: "View more projects on GitHub",
    link: "https://github.com/Bethamil",
  },
  drupalCta: {
    text: "View Drupal projects",
    link: "https://git.drupalcode.org/users/emielb/contributed",
  },
};

export const CONTACT = {
  sectionLabel: "GET IN TOUCH",
  title: "Contact",
  description:
    "Feel free to connect with me via LinkedIn for any inquiries or professional engagements. You can reach out to me by sending a message or connecting directly through my LinkedIn profile. I look forward to hearing from you!",
  linkedinName: "Emiel Bloem",
};
