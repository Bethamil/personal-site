import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, ArrowDown, Droplet } from "lucide-react";
import { PROJECTS } from "@/constants";

export default function Projects() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4">
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
            {PROJECTS.sectionLabel}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{PROJECTS.title}</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {PROJECTS.description}
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-12">
          {PROJECTS.featured.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-accent-light to-accent rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
              <div className="relative bg-card border border-card-border rounded-2xl p-8 hover:border-accent/50 transition-all duration-300">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="flex items-center gap-2 text-accent text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span>Featured Project</span>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                    <p className="text-muted text-lg mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-accent/10 text-accent rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Link Button */}
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:bg-accent-dark transition-colors duration-300 whitespace-nowrap self-start"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-medium">View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="space-y-6 mb-12">
          {PROJECTS.other.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-card border border-card-border rounded-2xl p-6 hover:border-accent/50 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{project.name}</h3>
                    <p className="text-muted mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-accent/10 text-accent rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Link Button */}
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-card border border-card-border rounded-full hover:border-accent hover:bg-accent/5 transition-all duration-300 whitespace-nowrap self-start"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-medium">View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href={PROJECTS.githubCta.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-card border border-card-border rounded-full hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-5 h-5 group-hover:text-accent transition-colors" />
            <span className="font-medium">{PROJECTS.githubCta.text}</span>
          </motion.a>
          
          <motion.a
            href={PROJECTS.drupalCta.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-card border border-card-border rounded-full hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Droplet className="w-5 h-5 group-hover:text-accent transition-colors" />
            <span className="font-medium">{PROJECTS.drupalCta.text}</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        onClick={scrollToContact}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
