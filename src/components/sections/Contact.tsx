import { motion } from "framer-motion";
import { Linkedin, ArrowUpRight, ArrowUp } from "lucide-react";
import { CONTACT, SOCIAL_LINKS, SITE_CONFIG } from "@/constants";
import { GlassCard } from "@/components/ui/Card";

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -z-10 animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-medium tracking-wider mb-2">
            {CONTACT.sectionLabel}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">{CONTACT.title}</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {CONTACT.description}
          </p>
        </motion.div>

        {/* Featured LinkedIn Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          className="max-w-2xl mx-auto mb-24"
        >
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <GlassCard className="relative p-8 sm:p-12 text-center border-accent/20 hover:border-accent/40 hover:shadow-[0_0_40px_-10px_rgba(13,110,110,0.3)] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-background border-2 border-accent/20 rounded-full flex items-center justify-center relative shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Linkedin className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    Let's Connect on LinkedIn
                  </h3>
                  <p className="text-muted text-lg">
                    {CONTACT.linkedinName}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium shadow-lg shadow-accent/20 group-hover:shadow-accent/40 group-hover:scale-105 transition-all duration-300">
                  <span>View Profile</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </GlassCard>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-t border-card-border pt-12 flex flex-col items-center text-center"
        >
          <div className="mb-8">
            <h4 className="text-2xl font-bold mb-2 tracking-tight">{SITE_CONFIG.brand}</h4>
            <p className="text-muted text-sm max-w-md mx-auto">{SITE_CONFIG.subtitle}</p>
          </div>
          
          <div className="flex flex-col gap-2 text-sm text-muted/60">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          </div>
        </motion.footer>
      </div>

      {/* Scroll to Top Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-card-border hover:border-accent text-muted hover:text-accent transition-all hover:shadow-lg hover:shadow-accent/10 z-50 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </motion.button>
    </section>
  );
}
