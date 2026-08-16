import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import TechStack from "./components/sections/TechStack";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import BootScreen from "./components/BootScreen";
import CommandPalette from "./components/CommandPalette";
import StatusBar from "./components/StatusBar";
import { SiteProvider } from "./components/SiteProvider";

export default function App() {
  return (
    <SiteProvider>
      <div className="site-shell">
        <BootScreen />
        <Navbar />
        <main className="relative z-10 md:pb-16">
          <Hero />
          <Projects />
          <About />
          <TechStack />
          <Contact />
        </main>
        <StatusBar />
        <CommandPalette />
      </div>
    </SiteProvider>
  );
}
