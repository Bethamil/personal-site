import { HERO_SOCIAL_IDS, SITE_CONFIG, socialById } from "@/data/site";
import { scrollToId } from "@/lib/scroll";
import HeroTerminal from "../HeroTerminal";
import ExternalLink from "../ui/ExternalLink";
import Rise from "../ui/Rise";

export default function Hero() {
  const linkedin = socialById("linkedin");

  return (
    <section
      id="intro"
      className="relative px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:pt-32"
    >
      <div className="mx-auto grid max-w-[1400px] items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <Rise as="p" className="kicker mb-5">
            {SITE_CONFIG.roleLine}
          </Rise>
          <Rise as="h1" delay={0.05} className="font-display text-[18vw] leading-[0.86] tracking-[-0.04em] sm:text-7xl md:text-8xl lg:text-[7.4rem]">
            {SITE_CONFIG.firstName}
            <br />
            {SITE_CONFIG.lastName}
            <span className="cursor-block" aria-hidden />
          </Rise>
          <Rise as="p" delay={0.12} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {SITE_CONFIG.subtitle}
          </Rise>
          <Rise delay={0.18} className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={() => scrollToId("work")}>
              View work
            </button>
            <div className="flex gap-3">
              {HERO_SOCIAL_IDS.map((id) => {
                const item = socialById(id);
                return item ? (
                  <ExternalLink key={item.id} href={item.href} className="btn-ghost">
                    {item.label}
                  </ExternalLink>
                ) : null;
              })}
            </div>
            {linkedin ? (
              <ExternalLink href={linkedin.href} className="btn-ghost">
                {linkedin.label}
              </ExternalLink>
            ) : null}
          </Rise>
          <p className="mt-6 hidden font-mono text-[11px] tracking-[0.14em] text-muted uppercase md:block">
            press ⌘K or type in the shell →
          </p>
        </div>
        <Rise delay={0.2}>
          <HeroTerminal />
        </Rise>
      </div>
    </section>
  );
}
