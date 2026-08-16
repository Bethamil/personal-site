export type ProjectKind = "ai" | "drupal" | "product";

export type Project = {
  id: string;
  name: string;
  year: string;
  description: string;
  tags: string[];
  kind: ProjectKind;
  live?: string;
  repo?: string;
  meta?: string;
};

export const KIND_LABEL: Record<ProjectKind, string> = {
  ai: "AI system",
  drupal: "Drupal",
  product: "Product",
};

export const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "drupal", label: "Drupal" },
  { id: "product", label: "Build" },
] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number]["id"];

export const PROJECTS: Project[] = [
  {
    id: "poker",
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
    id: "forkai",
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
    id: "llm-playground",
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
    id: "ai-rag-api",
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
    id: "ai-ckeditor-cefr",
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
    id: "nonce-generator",
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
    id: "mattermost-logger",
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
    id: "next-custom-tags",
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
    id: "sketchrider",
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
    id: "tinyspark",
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
];

export function isDrupalProject(project: Project) {
  return project.kind === "drupal" || project.tags.includes("Drupal");
}

export function projectUrl(project: Project) {
  return project.live ?? project.repo;
}

export function filterProjects(filter: ProjectFilter) {
  if (filter === "all") return PROJECTS;
  if (filter === "drupal") return PROJECTS.filter(isDrupalProject);
  return PROJECTS.filter((project) => project.kind === filter);
}

export function visibleTags(project: Project) {
  const kindLabel = KIND_LABEL[project.kind];
  return project.tags.filter((tag) => tag.toLowerCase() !== kindLabel.toLowerCase());
}
