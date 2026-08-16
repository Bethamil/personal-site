import { useState } from "react";
import { PROJECTS, type Project, type ProjectKind } from "@/constants";

type Filter = "all" | ProjectKind;

const KIND_LABEL: Record<ProjectKind, string> = {
  ai: "AI system",
  drupal: "Drupal",
  product: "Product",
};

function isDrupalProject(project: Project) {
  return project.kind === "drupal" || project.tags.includes("Drupal");
}

function ProjectLinks({ project }: { project: Project }) {
  const primaryLabel = isDrupalProject(project) ? "Project" : "Open live";
  return (
    <div className="flex flex-wrap gap-2">
      {project.live ? (
        <a className="btn-primary" href={project.live} target="_blank" rel="noopener noreferrer">
          {primaryLabel}
        </a>
      ) : null}
      {project.repo ? (
        <a className="btn-ghost" href={project.repo} target="_blank" rel="noopener noreferrer">
          Source
        </a>
      ) : null}
    </div>
  );
}

function Tags({ project }: { project: Project }) {
  const kindLabel = KIND_LABEL[project.kind];
  const tags = project.tags.filter(
    (tag) => tag.toLowerCase() !== kindLabel.toLowerCase(),
  );

  return (
    <div className="flex flex-wrap gap-2">
      <span className={`chip ${project.kind === "ai" ? "chip-ai" : ""}`}>
        {kindLabel}
      </span>
      {tags.map((tag) => (
        <span key={tag} className="chip">
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const items = PROJECTS.items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "drupal") return isDrupalProject(item);
    return item.kind === filter;
  });

  return (
    <section id="work" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="kicker mb-4">{PROJECTS.sectionLabel}</p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              {PROJECTS.title}
            </h2>
            <p className="mt-4 max-w-xl text-muted">{PROJECTS.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", "ai", "drupal", "product"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`min-h-11 px-3 font-mono text-[11px] tracking-[0.14em] uppercase ${
                  filter === key ? "bg-accent text-accent-ink" : "border border-line text-muted"
                }`}
              >
                {key === "all" ? "All" : key === "ai" ? "AI" : key === "drupal" ? "Drupal" : "Build"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {items.map((project) => (
            <article
              key={project.name}
              className="grid gap-4 py-8 md:grid-cols-[7rem_1fr_auto] md:items-start"
            >
              <p className="font-mono text-[11px] text-muted">{project.year}</p>
              <div>
                <h3 className="text-2xl">{project.name}</h3>
                <p className="mt-2 max-w-2xl text-muted">{project.description}</p>
                <div className="mt-4">
                  <Tags project={project} />
                </div>
              </div>
              <ProjectLinks project={project} />
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a className="btn-ghost" href={PROJECTS.githubCta.link} target="_blank" rel="noopener noreferrer">
            {PROJECTS.githubCta.text}
          </a>
          <a className="btn-ghost" href={PROJECTS.drupalCta.link} target="_blank" rel="noopener noreferrer">
            {PROJECTS.drupalCta.text}
          </a>
        </div>
      </div>
    </section>
  );
}
