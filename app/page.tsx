"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import TechStack from "./components/sections/TechStack";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

// Dynamically import Three.js scene to avoid SSR issues
const Scene = dynamic(() => import("./components/three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-background" />
  ),
});

export default function Home() {
  return (
    <>
      {/* ThreeJS Background */}
      <Scene />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
