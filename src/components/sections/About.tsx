import { ABOUT_CONTENT, HIGHLIGHTS, sectionKicker } from "@/data/site";
import Section from "../ui/Section";

export default function About() {
  return (
    <Section id="about" kicker={sectionKicker("about")}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            {ABOUT_CONTENT.title}
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {ABOUT_CONTENT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {HIGHLIGHTS.map((item, index) => (
            <div key={item.title} className="grid grid-cols-[auto_1fr] gap-4 py-5 sm:gap-6">
              <span className="font-mono text-[11px] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
