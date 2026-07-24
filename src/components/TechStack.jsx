import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { SKILLS } from "../data/portfolioData";

export default function TechStack() {
  const { theme } = useContext(ThemeContext);

  const baseCard =
    "rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1";

  const darkStyle =
    "bg-white/5 border border-white/10 backdrop-blur-xl hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]";

  const lightStyle =
    "bg-white border border-[#E4DED8] shadow-sm hover:shadow-md";

  const renderGrid = (items) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
      {items.map((tech, index) => {
        const Icon = tech.icon;
        return (
          <motion.div
            key={index}
            whileHover={{ y: -3 }}
            className={`${baseCard} ${
              theme === "dark" ? darkStyle : lightStyle
            }`}
          >
            <Icon className="text-xl sm:text-2xl mb-2 text-blue-400" />
            <p className="text-xs sm:text-sm text-center">
              {tech.name}
            </p>
          </motion.div>
        );
      })}
    </div>
  );


  return (
    <motion.section
      id="stack"
      className="snap-start min-h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
        Systems Toolkit
      </h3>

      <p className="opacity-70 text-sm sm:text-base max-w-xl mb-8">
        Technologies I use to architect and deploy AI-driven systems.
      </p>

      <h4 className="text-sm font-semibold mb-6 opacity-80">
        Development
      </h4>
      {renderGrid(SKILLS.development)}

      <h4 className="text-sm font-semibold mb-6 opacity-80">
        LLM & AI
      </h4>
      {renderGrid(SKILLS.llm)}

      <h4 className="text-sm font-semibold mb-6 opacity-80">
        Tools
      </h4>
      {renderGrid(SKILLS.tools)}
    </motion.section>
  );
}
