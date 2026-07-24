import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkspaceSection from "./components/workspace/WorkspaceSection";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Credentials from "./components/Credentials";
import EngineeringMetrics from './components/EngineeringMetrics';
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LandingHero from "./components/LandingHero";
import StardustBackground from "./components/background/StardustBackground";

export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      id="main-scroll"
      className={`relative min-h-screen overflow-y-auto md:h-screen md:overflow-y-scroll md:snap-y md:snap-proximity lg:snap-mandatory scroll-smooth transition-colors duration-500 overflow-x-hidden hide-scrollbar ${
        theme === "dark"
          ? "bg-[#03050A] text-white"
          : "bg-[#F4EFEA] text-black"
      }`}
    >
      <StardustBackground />

      <div className="relative z-10">
        <Navbar />
        
        <Hero />
        <WorkspaceSection />
        <Projects />
        <EngineeringMetrics />
        <TechStack />
        <Credentials />
        <Journey />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
