import { NAVIGATION, SOCIAL, navIndex } from "@/data/site";
import { PROJECTS, projectUrl } from "@/data/projects";
import { openExternal } from "@/lib/open";
import { scrollToId } from "@/lib/scroll";

export type CommandGroup = "Navigate" | "Open" | "System";

export type SiteCommand = {
  id: string;
  group: CommandGroup;
  label: string;
  hint: string;
  keywords: string[];
  run: () => void;
};

export type OpenTarget = {
  id: string;
  label: string;
  url: string;
  hint: string;
};

export function openTargets(): OpenTarget[] {
  const projects = PROJECTS.flatMap((project) => {
    const url = projectUrl(project);
    if (!url) return [];
    return [
      {
        id: project.id,
        label: project.name,
        url,
        hint: project.meta ?? project.id,
      },
    ];
  });

  const social = SOCIAL.map((item) => ({
    id: item.id,
    label: item.label,
    url: item.href,
    hint: item.hint,
  }));

  return [...projects, ...social];
}

export function findOpenTarget(id: string) {
  const key = id.toLowerCase();
  return openTargets().find((target) => target.id === key);
}

export function siteCommands(toggleTheme: () => void): SiteCommand[] {
  const navigate = NAVIGATION.map((item) => ({
    id: item.id,
    group: "Navigate" as const,
    label: item.label,
    hint: navIndex(item.id),
    keywords: [item.id, item.label, "go", "jump"],
    run: () => scrollToId(item.id),
  }));

  const open = openTargets().map((target) => ({
    id: `open-${target.id}`,
    group: "Open" as const,
    label: target.label,
    hint: target.hint,
    keywords: [target.id, target.label, "open", target.hint],
    run: () => openExternal(target.url),
  }));

  return [
    ...navigate,
    ...open,
    {
      id: "theme",
      group: "System",
      label: "Toggle theme",
      hint: "light / dark",
      keywords: ["theme", "dark", "light", "toggle"],
      run: toggleTheme,
    },
  ];
}

export function filterCommands(commands: SiteCommand[], query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return commands;
  return commands.filter((command) => {
    const hay = [command.label, command.hint, command.group, ...command.keywords]
      .join(" ")
      .toLowerCase();
    return hay.includes(needle);
  });
}

export function projectListLines(perRow = 3) {
  const ids = PROJECTS.map((project) => `${project.id}/`);
  const lines: string[] = [];
  for (let i = 0; i < ids.length; i += perRow) {
    lines.push(ids.slice(i, i + perRow).join("   "));
  }
  return lines;
}

export function openUsage() {
  return `open ${openTargets().map((target) => target.id).join(" | ")}`;
}
