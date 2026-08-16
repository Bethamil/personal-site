import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, kicker, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 ${className}`.trim()}>
      <div className="mx-auto max-w-[1400px]">
        {kicker ? <p className="kicker mb-4">{kicker}</p> : null}
        {children}
      </div>
    </section>
  );
}
