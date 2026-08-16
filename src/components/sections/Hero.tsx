import { motion } from "framer-motion";
import { SITE_CONFIG, SOCIAL_LINKS, scrollToId } from "@/constants";
import HeroTerminal from "../HeroTerminal";

const SOCIAL = [
  { label: "GitHub", href: SOCIAL_LINKS.github },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "Drupal", href: SOCIAL_LINKS.drupal },
];

export default function Hero() {
  return (
    <section
      id="intro"
      className="relative px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:pt-32"
    >
      <div className="mx-auto grid max-w-[1400px] items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <motion.p
            className="kicker mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {SITE_CONFIG.roleLine}
          </motion.p>
          <motion.h1
            className="font-display text-[18vw] leading-[0.86] tracking-[-0.04em] sm:text-7xl md:text-8xl lg:text-[7.4rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            {SITE_CONFIG.firstName}
            <br />
            {SITE_CONFIG.lastName}
            <span className="cursor-block" aria-hidden />
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            {SITE_CONFIG.subtitle}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <button type="button" className="btn-primary" onClick={() => scrollToId("work")}>
              View work
            </button>
            {SOCIAL.map((item) => (
              <a
                key={item.label}
                className="btn-ghost"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
          <p className="mt-6 hidden font-mono text-[11px] tracking-[0.14em] text-muted uppercase md:block">
            press ⌘K or type in the shell →
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <HeroTerminal />
        </motion.div>
      </div>
    </section>
  );
}
