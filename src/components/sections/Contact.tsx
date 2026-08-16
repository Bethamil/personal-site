import { CONTACT, CONTACT_SOCIAL_IDS, SITE_CONFIG, sectionKicker, socialById } from "@/data/site";
import ExternalLink from "../ui/ExternalLink";
import Section from "../ui/Section";

export default function Contact() {
  const links = CONTACT_SOCIAL_IDS.map((id) => socialById(id)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );

  return (
    <Section id="contact" kicker={sectionKicker("contact")} className="pb-28 sm:pb-36">
      <h2 className="max-w-3xl font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
        {CONTACT.title}
      </h2>
      <p className="mt-5 max-w-xl text-lg text-muted">{CONTACT.description}</p>
      <div className="mt-12 divide-y divide-line border-y border-line">
        {links.map((link) => (
          <ExternalLink
            key={link.id}
            href={link.href}
            className="group flex min-h-20 items-center justify-between gap-4 py-5"
          >
            <span className="font-display text-3xl transition-colors group-hover:text-accent sm:text-4xl">
              {link.label}
            </span>
            <span className="font-mono text-[11px] text-muted">{link.hint} ↗</span>
          </ExternalLink>
        ))}
      </div>
      <footer className="mt-16 flex flex-col gap-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE_CONFIG.name}
        </p>
        <p>{SITE_CONFIG.brand}</p>
      </footer>
    </Section>
  );
}
