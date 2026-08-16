import { SITE_CONFIG } from "@/data/site";
import { useSite } from "./SiteProvider";

export default function StatusBar() {
  const { section, setPaletteOpen } = useSite();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden border-t border-line/80 bg-background/80 font-mono text-[10px] tracking-[0.14em] text-muted uppercase backdrop-blur-md md:flex"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="pointer-events-auto mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-6 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-accent">{SITE_CONFIG.brand}</span>
          <span className="text-line">/</span>
          <span>full-stack</span>
          <span className="text-line">/</span>
          <span>section:{section === "intro" ? "boot" : section}</span>
        </div>
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="shrink-0 text-foreground/80 transition-colors hover:text-accent"
        >
          ⌘K  command
        </button>
      </div>
    </div>
  );
}
