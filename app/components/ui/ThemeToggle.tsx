"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full bg-card border border-card-border" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-card border border-card-border hover:border-accent transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-accent" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : -180,
          scale: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-accent" />
      </motion.div>
    </motion.button>
  );
}
