"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function Card({ children, className = "", hover = true, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={`bg-card border border-card-border rounded-2xl p-6 transition-all duration-300 ${
        hover ? "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GlassCard({ children, className = "", delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`glass rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

