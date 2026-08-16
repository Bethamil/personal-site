import { useEffect, useRef, useState, type FormEvent } from "react";
import { SITE_CONFIG } from "@/data/site";
import { findOpenTarget, openUsage, projectListLines } from "@/data/catalog";
import { openExternal } from "@/lib/open";
import { scrollToId } from "@/lib/scroll";
import { isThemeCommand, resolveTheme } from "@/lib/theme";
import { useTheme } from "./ThemeProvider";

type Line = { kind: "in" | "out" | "dim"; text: string };

function introLines(): Line[] {
  const who = `${SITE_CONFIG.firstName} ${SITE_CONFIG.lastName}  ·  ${SITE_CONFIG.roleLine}`.toLowerCase();
  return [
    { kind: "dim", text: `${SITE_CONFIG.brand} — shell  v1.0` },
    { kind: "in", text: "whoami" },
    { kind: "out", text: who },
    { kind: "dim", text: "type help  ·  try ls, theme toggle, open github" },
  ];
}

function helpLines(): Line[] {
  return [
    "whoami     identity",
    "ls         selected work",
    openUsage(),
    "stack      tech stack",
    "theme      toggle | light | dark",
    "clear      wipe the buffer",
  ].map((text) => ({ kind: "dim" as const, text }));
}

function runCommand(raw: string, setTheme: (theme: "light" | "dark") => void): Line[] {
  const [cmd, arg] = raw.trim().split(/\s+/, 2);
  const key = (cmd ?? "").toLowerCase();
  if (!key) return [];

  if (key === "help") return helpLines();
  if (key === "whoami") {
    return [
      {
        kind: "out",
        text: `${SITE_CONFIG.firstName} ${SITE_CONFIG.lastName}  ·  ${SITE_CONFIG.roleLine}`.toLowerCase(),
      },
    ];
  }
  if (key === "ls") {
    return projectListLines().map((text) => ({ kind: "out" as const, text }));
  }
  if (key === "stack") {
    scrollToId("systems");
    return [{ kind: "dim", text: "opening systems…" }];
  }
  if (key === "contact") {
    scrollToId("contact");
    return [{ kind: "dim", text: "opening contact…" }];
  }
  if (key === "theme") {
    if (!arg || !isThemeCommand(arg.toLowerCase())) {
      return [{ kind: "dim", text: "usage: theme toggle  |  theme light  |  theme dark" }];
    }
    const next = resolveTheme(arg.toLowerCase() as "toggle" | "light" | "dark");
    setTheme(next);
    return [{ kind: "dim", text: `theme → ${next}` }];
  }

  const target = key === "open" ? (arg ? findOpenTarget(arg) : undefined) : findOpenTarget(key);
  if (key === "open" && !target) {
    return [{ kind: "dim", text: openUsage() }];
  }
  if (target) {
    openExternal(target.url);
    return [{ kind: "dim", text: `opening ${target.id}` }];
  }

  return [{ kind: "dim", text: `command not found: ${key}  —  try help` }];
}

export default function HeroTerminal() {
  const { setTheme } = useTheme();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const intro = introLines();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines(intro);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setLines(intro.slice(0, i));
      if (i >= intro.length) window.clearInterval(id);
    }, 220);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const command = value;
    if (command.trim().toLowerCase() === "clear") {
      setLines([]);
      setValue("");
      return;
    }
    const output = runCommand(command, setTheme);
    setLines((prev) => [...prev, { kind: "in", text: command }, ...output]);
    setValue("");
  };

  return (
    <div
      className="terminal-chrome flex min-h-[320px] flex-col sm:min-h-[380px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-white/45 uppercase">
        <span>zsh  ·  {SITE_CONFIG.brand}</span>
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-[#c8f135]/80" />
        </span>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-3 font-mono text-[13px] leading-6 sm:px-4 sm:text-sm">
        {lines.map((line, index) => (
          <p
            key={`${line.text}-${index}`}
            className={
              line.kind === "in"
                ? "text-[#c8f135]"
                : line.kind === "dim"
                  ? "text-white/40"
                  : "text-[#d7e0c8]"
            }
          >
            {line.kind === "in" ? <span className="mr-2 text-white/35">❯</span> : null}
            {line.text}
          </p>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 px-3 py-3">
        <span className="font-mono text-[#c8f135]">❯</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full bg-transparent font-mono text-base text-[#d7e0c8] outline-none placeholder:text-white/30"
          placeholder="help"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Terminal command"
        />
      </form>
    </div>
  );
}
