import { TECH_STACK } from "@/constants";

export default function TechStack() {
  return (
    <section id="systems" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="kicker mb-4">{TECH_STACK.sectionLabel}</p>
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
      </div>
    </section>
  );
}
