import { useEffect, useRef, useState, type FormEvent } from "react";
import { SOCIAL_LINKS, scrollToId } from "@/constants";
import { useTheme, type Theme } from "./ThemeProvider";

type Line = { kind: "in" | "out" | "dim"; text: string };

const INTRO: Line[] = [
  { kind: "dim", text: "bloem.dev — shell  v1.0" },
  { kind: "in", text: "whoami" },
  { kind: "out", text: "emiel bloem  ·  ai & full-stack developer" },
  { kind: "dim", text: "type help  ·  try ls, theme toggle, open github" },
];

const HELP = [
  "whoami     identity",
  "ls         selected work",
  "open       poker | forkai | github | linkedin | drupal",
  "stack      tech stack",
  "theme      toggle | light | dark",
  "clear      wipe the buffer",
];

function runCommand(
  raw: string,
  helpers: { setTheme: (theme: Theme) => void },
): Line[] {
  const input = raw.trim();
  const [cmd, arg] = input.split(/\s+/, 2);
  const key = (cmd ?? "").toLowerCase();

  if (!key) return [];
  if (key === "help") return HELP.map((text) => ({ kind: "dim" as const, text }));
  if (key === "whoami") {
    return [{ kind: "out", text: "emiel bloem  ·  ai & full-stack developer" }];
  }
  if (key === "ls") {
    return [
      { kind: "out", text: "forkai/   ai-rag-api/   ai-ckeditor-cefr/" },
      { kind: "out", text: "terminal-poker/   nonce-generator/   next-custom-tags/" },
    ];
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
    const requested = (arg ?? "").toLowerCase();
    if (requested !== "toggle" && requested !== "light" && requested !== "dark") {
      return [{ kind: "dim", text: "usage: theme toggle  |  theme light  |  theme dark" }];
    }
    const current: Theme = document.documentElement.classList.contains("light") ? "light" : "dark";
    const next: Theme =
      requested === "toggle" ? (current === "light" ? "dark" : "light") : requested;
    helpers.setTheme(next);
    return [{ kind: "dim", text: `theme → ${next}` }];
  }
  if (key === "open") {
    const map: Record<string, string> = {
      poker: "https://poker.bloem.dev",
      forkai: "https://forkai.vercel.app/",
      github: SOCIAL_LINKS.github,
      linkedin: SOCIAL_LINKS.linkedin,
      drupal: SOCIAL_LINKS.drupal,
    };
    const url = arg ? map[arg.toLowerCase()] : undefined;
    if (!url) return [{ kind: "dim", text: "open poker | forkai | github | linkedin | drupal" }];
    window.open(url, "_blank", "noopener,noreferrer");
    return [{ kind: "dim", text: `opening ${arg}` }];
  }
  if (key === "poker") {
    window.open("https://poker.bloem.dev", "_blank", "noopener,noreferrer");
    return [{ kind: "dim", text: "opening poker.bloem.dev" }];
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
    let i = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLines(INTRO);
      return;
    }
    const id = window.setInterval(() => {
      i += 1;
      setLines(INTRO.slice(0, i));
      if (i >= INTRO.length) window.clearInterval(id);
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
    const output = runCommand(command, { setTheme });
    setLines((prev) => [...prev, { kind: "in", text: command }, ...output]);
    setValue("");
  };

  return (
    <div
      className="terminal-chrome flex min-h-[320px] flex-col sm:min-h-[380px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-white/45 uppercase">
        <span>zsh  ·  bloem.dev</span>
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
