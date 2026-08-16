import { CONTACT, SITE_CONFIG, SOCIAL_LINKS } from "@/constants";

const LINKS = [
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, hint: CONTACT.linkedinName },
  { label: "GitHub", href: SOCIAL_LINKS.github, hint: "Bethamil" },
  { label: "Drupal", href: SOCIAL_LINKS.drupal, hint: "emielb" },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-4 pb-28 pt-20 sm:px-6 sm:pb-36 sm:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="kicker mb-4">{CONTACT.sectionLabel}</p>
        <h2 className="max-w-3xl font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
          {CONTACT.title}
        </h2>
        <p className="mt-5 max-w-xl text-lg text-muted">{CONTACT.description}</p>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-20 items-center justify-between gap-4 py-5"
            >
              <span className="font-display text-3xl transition-colors group-hover:text-accent sm:text-4xl">
                {link.label}
              </span>
              <span className="font-mono text-[11px] text-muted">{link.hint} ↗</span>
            </a>
          ))}
        </div>
        <footer className="mt-16 flex flex-col gap-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}
          </p>
          <p>{SITE_CONFIG.brand}</p>
        </footer>
      </div>
    </section>
  );
}
