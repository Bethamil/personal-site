"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Layers } from "lucide-react";
import { ABOUT_CONTENT } from "@/app/constants";

const highlights = [
  {
    icon: Brain,
    title: "AI Integration",
    description: "LLMs, RAG systems, and intelligent automation",
  },
  {
    icon: Code2,
    title: "Full-Stack",
    description: "React, Next.js, PHP, Python, and more",
  },
  {
    icon: Layers,
    title: "CMS Expert",
    description: "Enterprise Drupal solutions and architecture",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-accent font-medium tracking-wider mb-2">
            {ABOUT_CONTENT.sectionLabel}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">{ABOUT_CONTENT.title}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="space-y-6">
            {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-muted text-lg leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Highlight Cards */}
          <div className="space-y-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-6 bg-card border border-card-border rounded-xl hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

