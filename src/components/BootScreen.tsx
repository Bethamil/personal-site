import { useEffect, useState } from "react";
import { useSite } from "./SiteProvider";

const LINES = [
  { text: "bloem.dev", delay: 80 },
  { text: "loading interface …… ok", delay: 420 },
  { text: "ready.", delay: 780 },
];

export default function BootScreen() {
  const { bootDone, setBootDone } = useSite();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (bootDone) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 640px)").matches;

    if (reduce) {
      setBootDone();
      return;
    }

    const timers = LINES.map((line, index) =>
      window.setTimeout(() => setVisible(index + 1), narrow ? line.delay * 0.65 : line.delay),
    );
    const done = window.setTimeout(setBootDone, narrow ? 1100 : 1400);

    const skip = () => setBootDone();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [bootDone, setBootDone]);

  if (bootDone) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center bg-background px-5 py-10 sm:px-10"
      role="dialog"
      aria-label="Starting bloem.dev"
    >
      <div className="w-full max-w-xl font-mono text-[13px] leading-7 text-accent sm:text-sm">
        {LINES.slice(0, visible).map((line) => (
          <p key={line.text}>{line.text}</p>
        ))}
        <p className="mt-6 text-[11px] tracking-[0.18em] text-muted uppercase">
          tap, click, or any key to skip
        </p>
      </div>
    </div>
  );
}
