import { useState } from "react";
import { MORE_LINKS, sectionKicker } from "@/data/site";
import {
  KIND_LABEL,
  PROJECT_FILTERS,
  filterProjects,
  isDrupalProject,
  visibleTags,
  type Project,
  type ProjectFilter,
} from "@/data/projects";
import ExternalLink from "../ui/ExternalLink";
import Section from "../ui/Section";

function ProjectLinks({ project }: { project: Project }) {
  const primaryLabel = isDrupalProject(project) ? "Project" : "Open live";
  return (
    <div className="flex flex-wrap gap-2">
      {project.live ? (
        <ExternalLink href={project.live} className="btn-primary">
          {primaryLabel}
        </ExternalLink>
      ) : null}
      {project.repo ? (
        <ExternalLink href={project.repo} className="btn-ghost">
          Source
        </ExternalLink>
      ) : null}
    </div>
  );
}

function Tags({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className={`chip ${project.kind === "ai" ? "chip-ai" : ""}`}>
        {KIND_LABEL[project.kind]}
      </span>
      {visibleTags(project).map((tag) => (
        <span key={tag} className="chip">
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const items = filterProjects(filter);

  return (
    <Section id="work" kicker={sectionKicker("work")}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">Projects</h2>
          <p className="mt-4 max-w-xl text-muted">Here are some of the projects I've been working on.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`min-h-11 px-3 font-mono text-[11px] tracking-[0.14em] uppercase ${
                filter === item.id ? "bg-accent text-accent-ink" : "border border-line text-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 divide-y divide-line border-y border-line">
        {items.map((project) => (
          <article
            key={project.id}
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
        {MORE_LINKS.map((link) => (
          <ExternalLink key={link.id} href={link.href} className="btn-ghost">
            {link.label}
          </ExternalLink>
        ))}
      </div>
    </Section>
  );
}
