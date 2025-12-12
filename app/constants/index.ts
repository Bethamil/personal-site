export const SITE_CONFIG = {
  name: "Emiel Bloem",
  title: "AI & Full-Stack Developer",
  subtitle: "Building intelligent web experiences with cutting-edge AI and modern frameworks",
  domain: "bloem.dev",
  description: "Personal portfolio of Emiel Bloem - AI specialist and full-stack developer",
};

export const NAVIGATION = [
  { label: "About", href: "#about" },
  { label: "Tech", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/emiel-bloem/",
  github: "https://github.com/emielbloem",
};

export const ABOUT_CONTENT = {
  sectionLabel: "ABOUT ME",
  title: "About",
  paragraphs: [
    "I have extensive experience as a full-stack software engineer, proficient in multiple programming languages like Java, Kotlin, PHP, Python, and JavaScript. My expertise includes frameworks such as React, Next.js, and Drupal, enabling me to build robust and scalable applications.",
    "My current specialization lies at the intersection of AI and web development. I work extensively with Large Language Models (LLMs), building intelligent applications that leverage cutting-edge AI technologies. From prompt engineering to RAG architectures and AI-powered user experiences, I bring artificial intelligence seamlessly into modern web applications.",
    "I combine deep technical knowledge with a passion for creating exceptional user experiences. Whether it's architecting complex Drupal solutions, building performant Next.js applications, or integrating AI capabilities, I deliver solutions that are both powerful and elegant.",
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
        { name: "OpenAI / GPT", icon: "Brain" },
        { name: "LangChain", icon: "Link" },
        { name: "Python", icon: "Code" },
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
        { name: "PHP", icon: "Server" },
        { name: "Node.js", icon: "Hexagon" },
        { name: "PostgreSQL", icon: "Database" },
      ],
    },
    {
      name: "DevOps & Tools",
      items: [
        { name: "Docker", icon: "Container" },
        { name: "Git", icon: "GitBranch" },
        { name: "Linux", icon: "Terminal" },
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
  githubCta: {
    text: "View more projects on GitHub",
    link: "https://github.com/emielbloem",
  },
};

export const CONTACT = {
  sectionLabel: "GET IN TOUCH",
  title: "Contact",
  description:
    "Feel free to connect with me via LinkedIn for any inquiries or professional engagements. You can reach out to me by sending a message or connecting directly through my LinkedIn profile. I look forward to hearing from you!",
  linkedinName: "Emiel Bloem",
};

