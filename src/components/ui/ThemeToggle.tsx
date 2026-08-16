import { useTheme } from "../ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 min-w-11 items-center justify-center border border-line px-2.5 font-mono text-[10px] tracking-[0.16em] text-muted uppercase transition-colors hover:border-accent hover:text-accent"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "LT" : "DK"}
    </button>
  );
}
