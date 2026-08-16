import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { NAVIGATION } from "@/constants";

type SiteContextType = {
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  section: string;
  bootDone: boolean;
  setBootDone: () => void;
};

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [section, setSection] = useState("intro");
  const [bootDone, setBootDoneState] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("bloem-boot") === "1";
  });

  const setBootDone = useCallback(() => {
    sessionStorage.setItem("bloem-boot", "1");
    setBootDoneState(true);
  }, []);

  useEffect(() => {
    const ids = ["intro", ...NAVIGATION.map((item) => item.id)];

    const update = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setSection(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [bootDone]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
        return;
      }

      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({ paletteOpen, setPaletteOpen, section, bootDone, setBootDone }),
    [paletteOpen, section, bootDone],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
