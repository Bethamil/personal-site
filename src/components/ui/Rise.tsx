import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RiseProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "h1";
};

export default function Rise({ children, delay = 0, className, as = "div" }: RiseProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
