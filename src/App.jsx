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
  className={`relative h-screen overflow-y-scroll snap-y snap-proximity scroll-smooth transition-colors duration-500 ${
    theme === "dark"
      ? "bg-[#0F1115] text-white"
      : "bg-[#F4EFEA] text-black"
  }`}
>

      {/* 🔥 Full Page Grid Background */}
      <div id="main-scroll"
        className={`fixed inset-0 pointer-events-none z-0 ${
          theme === "dark" ? "ai-grid-dark" : "ai-grid-light"
        }`}
      />

      {/* Content */}
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
