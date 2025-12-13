import { lazy, Suspense } from "react";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import TechStack from "./components/sections/TechStack";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

// Lazy load Three.js scene for better initial load
const Scene = lazy(() => import("./components/three/Scene"));

export default function App() {
  return (
    <>
      {/* ThreeJS Background */}
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-background" />}>
        <Scene />
      </Suspense>

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
