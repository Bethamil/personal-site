import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SOCIAL_LINKS, scrollToId } from "@/constants";
import { useSite } from "./SiteProvider";
import { useTheme } from "./ThemeProvider";

type Command = {
  id: string;
  group: string;
  label: string;
  hint: string;
  run: () => void;
};

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen } = useSite();
  const { toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setPaletteOpen(false);
    setQuery("");
    setActive(0);
  };

  const commands = useMemo<Command[]>(
    () => [
      {
        id: "work",
        group: "Navigate",
        label: "Selected work",
        hint: "01",
        run: () => scrollToId("work"),
      },
      {
        id: "about",
        group: "Navigate",
        label: "About",
        hint: "02",
        run: () => scrollToId("about"),
      },
      {
        id: "systems",
        group: "Navigate",
        label: "Systems stack",
        hint: "03",
        run: () => scrollToId("systems"),
      },
      {
        id: "contact",
        group: "Navigate",
        label: "Contact",
        hint: "04",
        run: () => scrollToId("contact"),
      },
      {
        id: "poker",
        group: "Open",
        label: "Terminal Poker",
        hint: "poker.bloem.dev",
        run: () => window.open("https://poker.bloem.dev", "_blank", "noopener,noreferrer"),
      },
      {
        id: "forkai",
        group: "Open",
        label: "ForKAI",
        hint: "AI recipes",
        run: () => window.open("https://forkai.vercel.app/", "_blank", "noopener,noreferrer"),
      },
      {
        id: "github",
        group: "Open",
        label: "GitHub",
        hint: "Bethamil",
        run: () => window.open(SOCIAL_LINKS.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        group: "Open",
        label: "LinkedIn",
        hint: "connect",
        run: () => window.open(SOCIAL_LINKS.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "drupal",
        group: "Open",
        label: "Drupal",
        hint: "emielb",
        run: () => window.open(SOCIAL_LINKS.drupal, "_blank", "noopener,noreferrer"),
      },
      {
        id: "theme",
        group: "System",
        label: "Toggle theme",
        hint: "light / dark",
        run: () => toggleTheme(),
      },
    ],
    [toggleTheme],
  );

  const filtered = commands.filter((command) => {
    const hay = `${command.label} ${command.hint} ${command.group}`.toLowerCase();
    return hay.includes(query.toLowerCase().trim());
  });

  useEffect(() => {
    setActive(0);
  }, [query, paletteOpen]);

  useEffect(() => {
    if (!paletteOpen) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (event.key === "Enter" && filtered[active]) {
        event.preventDefault();
        filtered[active].run();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [paletteOpen, filtered, active]);

  const groups = filtered.reduce<Record<string, Command[]>>((acc, command) => {
    acc[command.group] ??= [];
    acc[command.group].push(command);
    return acc;
  }, {});

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {paletteOpen ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-start sm:pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            aria-label="Close command palette"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden border border-line bg-card shadow-2xl sm:mx-4"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="font-mono text-accent">❯</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Jump, open, or toggle…"
                className="h-14 w-full bg-transparent font-mono text-base text-foreground outline-none ring-0 placeholder:text-muted focus:outline-none focus-visible:outline-none"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <kbd className="hidden font-mono text-[10px] tracking-widest text-muted sm:inline">ESC</kbd>
            </div>
            <div className="max-h-[min(60vh,420px)] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 font-mono text-sm text-muted">No matches.</p>
              ) : (
                Object.entries(groups).map(([group, items]) => (
                  <div key={group} className="px-2 py-1">
                    <p className="px-3 pb-1 pt-2 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                      {group}
                    </p>
                    {items.map((command) => {
                      runningIndex += 1;
                      const index = runningIndex;
                      const selected = index === active;
                      return (
                        <button
                          key={command.id}
                          type="button"
                          onMouseEnter={() => setActive(index)}
                          onClick={() => {
                            command.run();
                            close();
                          }}
                          className={`flex min-h-12 w-full items-center justify-between gap-4 px-3 py-2 text-left ${
                            selected ? "bg-accent text-accent-ink" : "text-foreground"
                          }`}
                        >
                          <span className="text-sm">{command.label}</span>
                          <span className={`font-mono text-[11px] ${selected ? "opacity-70" : "text-muted"}`}>
                            {command.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
