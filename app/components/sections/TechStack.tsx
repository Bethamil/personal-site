"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Link,
  Code,
  Database,
  Atom,
  Globe,
  FileCode,
  Palette,
  Droplet,
  Server,
  Hexagon,
  Container,
  GitBranch,
  Terminal,
  RefreshCw,
} from "lucide-react";
import { TECH_STACK } from "@/app/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Link,
  Code,
  Database,
  Atom,
  Globe,
  FileCode,
  Palette,
  Droplet,
  Server,
  Hexagon,
  Container,
  GitBranch,
  Terminal,
  RefreshCw,
};

export default function TechStack() {
  return (
    <section id="tech" className="py-24 sm:py-32 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-medium tracking-wider mb-2">
            {TECH_STACK.sectionLabel}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{TECH_STACK.title}</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {TECH_STACK.description}
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="grid sm:grid-cols-2 gap-8">
          {TECH_STACK.categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-card border border-card-border rounded-2xl p-6 hover:border-accent/30 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-6 text-accent">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.items.map((item, itemIndex) => {
                  const IconComponent = iconMap[item.icon];
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + itemIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-transparent hover:border-accent/20 transition-all duration-200"
                    >
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-accent flex-shrink-0" />
                      )}
                      <span className="text-sm font-medium truncate">{item.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

