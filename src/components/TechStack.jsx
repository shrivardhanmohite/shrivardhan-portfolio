import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiDjango,
  SiMysql,
  SiMongodb,
  SiPhp,
  SiGoogle,
  SiGit,
  SiPostman
} from "react-icons/si";

import {
  FaJava,
  FaCuttlefish,
  FaProjectDiagram,
  FaTerminal
} from "react-icons/fa";

export default function TechStack() {
  const { theme } = useContext(ThemeContext);

  const baseCard =
    "rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1";

  const darkStyle =
    "bg-white/5 border border-white/10 backdrop-blur-xl hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]";

  const lightStyle =
    "bg-white border border-[#E4DED8] shadow-sm hover:shadow-md";

  const renderGrid = (items) => (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10">
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
            <Icon className="text-xl mb-2 text-blue-400" />
            <p className="text-xs text-center">
              {tech.name}
            </p>
          </motion.div>
        );
      })}
    </div>
  );

  const development = [
    { name: "JavaScript", icon: SiJavascript },
    { name: "TypeScript", icon: SiTypescript },
    { name: "React", icon: SiReact },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express", icon: SiExpress },
    { name: "Python", icon: SiPython },
    { name: "FastAPI", icon: SiFastapi },
    { name: "Django", icon: SiDjango },
    { name: "SQL", icon: SiMysql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Java", icon: FaJava },
    { name: "C/C++", icon: FaCuttlefish },
    { name: "PHP", icon: SiPhp }
  ];

  const llm = [
    { name: "Ollama", icon: FaTerminal },
    { name: "OpenAI", icon: FaProjectDiagram },
    { name: "Gemini", icon: SiGoogle },
    { name: "RAG", icon: FaProjectDiagram }
  ];

  const tools = [
    { name: "Git", icon: SiGit },
    { name: "Postman", icon: SiPostman },
    { name: "MongoDB Atlas", icon: SiMongodb },
    { name: "DOSBox", icon: FaTerminal }
  ];

  return (
    <motion.section id="stack"
      className="snap-start min-h-screen flex flex-col justify-center px-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-3xl font-bold mb-6">
        Systems Toolkit
      </h3>

      <p className="opacity-70 text-sm max-w-xl mb-8">
        Technologies I use to architect and deploy AI-driven systems.
      </p>

      <h4 className="text-sm font-semibold mb-6 opacity-80">
        Development
      </h4>
      {renderGrid(development)}

      <h4 className="text-sm font-semibold mb-6 opacity-80">
        LLM & AI
      </h4>
      {renderGrid(llm)}

      <h4 className="text-sm font-semibold mb-6 opacity-80">
        Tools
      </h4>
      {renderGrid(tools)}
    </motion.section>
  );
}
