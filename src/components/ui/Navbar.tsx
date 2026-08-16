import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAVIGATION, SITE_CONFIG, navIndex } from "@/data/site";
import { scrollToId } from "@/lib/scroll";
import ThemeToggle from "./ThemeToggle";
import { useSite } from "../SiteProvider";

export default function Navbar() {
  const { section, setPaletteOpen } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors ${
          scrolled || open ? "border-b border-line bg-background/85 backdrop-blur-md" : ""
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <a
            href="#intro"
            className="font-mono text-[13px] tracking-[0.08em] text-foreground"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="text-accent">❯</span> {SITE_CONFIG.brand}
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAVIGATION.map((item) => {
              const current = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  className={`font-mono text-[11px] tracking-[0.16em] uppercase transition-colors ${
                    current ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  <span className="mr-2 text-[10px] opacity-60">{navIndex(item.id)}</span>
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="inline-flex h-11 items-center gap-2 border border-line px-3 font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors hover:border-accent hover:text-accent"
              aria-label="Open command palette"
            >
              <span className="hidden sm:inline">Command</span>
              <span className="sm:hidden">Cmd</span>
              <kbd className="hidden text-[10px] text-foreground/70 md:inline">⌘K</kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-line lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Menu</span>
              <span className="flex w-4 flex-col gap-1.5">
                <span className={`h-px w-full bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
                <span className={`h-px w-full bg-foreground transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
            style={{ paddingTop: "calc(env(safe-area-inset-top) + 3.5rem)" }}
          >
            <div className="flex h-full flex-col justify-between px-5 pb-10">
              <div className="flex flex-col gap-1 pt-6">
                {NAVIGATION.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => go(item.id)}
                    className="flex min-h-16 items-baseline justify-between border-b border-line py-4 text-left"
                  >
                    <span className="font-display text-4xl">{item.label}</span>
                    <span className="font-mono text-xs text-muted">{navIndex(item.id)}</span>
                  </motion.button>
                ))}
              </div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                {SITE_CONFIG.roleLine}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
