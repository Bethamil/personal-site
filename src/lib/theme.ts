import type { Theme } from "@/components/ThemeProvider";

export type ThemeCommand = "toggle" | "light" | "dark";

export function readDocumentTheme(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function resolveTheme(requested: ThemeCommand, current: Theme = readDocumentTheme()): Theme {
  if (requested === "toggle") return current === "light" ? "dark" : "light";
  return requested;
}

export function isThemeCommand(value: string): value is ThemeCommand {
  return value === "toggle" || value === "light" || value === "dark";
}
