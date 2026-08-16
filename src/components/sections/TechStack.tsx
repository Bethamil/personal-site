import { TECH_STACK, sectionKicker } from "@/data/site";
import Section from "../ui/Section";

export default function TechStack() {
  return (
    <Section id="systems" kicker={sectionKicker("systems")}>
      <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
        {TECH_STACK.title}
      </h2>
      <p className="mt-4 max-w-xl text-muted">{TECH_STACK.description}</p>
      <div className="mt-12 divide-y divide-line border-y border-line">
        {TECH_STACK.categories.map((category) => (
          <div
            key={category.name}
            className="grid gap-3 py-6 sm:grid-cols-[8rem_1fr] sm:items-baseline"
          >
            <h3 className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
              {category.name}
            </h3>
            <p className="text-lg leading-relaxed text-foreground sm:text-xl">
              {category.items.join("  ·  ")}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
