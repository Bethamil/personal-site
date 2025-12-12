"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { CONTACT, SOCIAL_LINKS, SITE_CONFIG } from "@/app/constants";

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-medium tracking-wider mb-2">
            {CONTACT.sectionLabel}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">{CONTACT.title}</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {CONTACT.description}
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent-light to-accent rounded-3xl opacity-20 blur-lg" />
          <div className="relative bg-card border border-card-border rounded-2xl p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* LinkedIn Button */}
              <motion.a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-[#0077B5] text-white rounded-full hover:bg-[#006399] transition-colors duration-300 w-full sm:w-auto justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-medium">Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              {/* Email hint */}
              <div className="text-muted text-center sm:text-left">
                <p className="text-sm">or reach out via LinkedIn message</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-24 pt-8 border-t border-card-border text-center"
        >
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Built with Next.js, Three.js & Tailwind CSS.
          </p>
          <p className="text-muted/60 text-xs mt-2">
            {SITE_CONFIG.domain}
          </p>
        </motion.footer>
      </div>
    </section>
  );
}

