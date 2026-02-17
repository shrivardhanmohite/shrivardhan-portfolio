import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AIPlayground from "./components/AIPlayground";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      id="main-scroll"
      className={`relative min-h-screen overflow-y-auto md:h-screen md:overflow-y-scroll md:snap-y md:snap-proximity scroll-smooth transition-colors duration-500 overflow-x-hidden ${
        theme === "dark"
          ? "bg-[#0F1115] text-white"
          : "bg-[#F4EFEA] text-black"
      }`}
    >
      <div
        className={`fixed inset-0 pointer-events-none z-0 ${
          theme === "dark" ? "ai-grid-dark" : "ai-grid-light"
        }`}
      />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AIPlayground />
        <Projects />
        <TechStack />
        <Journey />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
