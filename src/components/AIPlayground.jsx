import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const simulations = [
  {
    name: "SHRIVARDHAN_MOHITE",
    lines: [
      "✓ Initializing AI Systems Engineer...",
      "✓ Attaching Full-Stack Architecture...",
      "✓ Loading LLM Orchestration Engine...",
      "✓ CGPA Module Loaded (9.34)...",
      "✓ FastAPI Microservice Online...",
      "✓ MongoDB Cluster Connected...",
      "✓ Status: Building Production-Grade AI Systems.",
      "",
      '> query("WHOAMI")',
      "",
      "AI + Full Stack Engineering student specializing in",
      "LLM-powered applications, modular backend systems,",
      "and scalable SaaS architecture.",
      "",
      "Runtime ready."
    ]
  },
  {
    name: "CURRENT_FOCUS",
    lines: [
      "✓ Activating LLM Research Modules...",
      "",
      '> query("ACTIVE_STACK")',
      "",
      "- Retrieval-Augmented Generation (RAG)",
      "- Local LLM Orchestration (Ollama)",
      "- FastAPI Microservices",
      "- React-Based AI Interfaces",
      "- Scalable SaaS System Design",
      "",
      "Focus locked."
    ]
  }
];

export default function AIPlayground() {
  const { theme } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  const simulation = simulations[index];

  // Rotation restored
  useEffect(() => {
    const rotate = setInterval(() => {
      setIndex((prev) => (prev + 1) % simulations.length);
      setVisibleLines(0);
    }, 9000);

    return () => clearInterval(rotate);
  }, []);

  useEffect(() => {
    if (visibleLines < simulation.lines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 350);

      return () => clearTimeout(timeout);
    }
  }, [visibleLines, simulation]);

  return (
    <section id="runtime" className="snap-start min-h-screen flex flex-col justify-center px-8 max-w-6xl mx-auto">
      <h3 className="text-4xl font-bold mb-6">
        Runtime Architecture
      </h3>

      <p className="mb-8 text-lg opacity-70 max-w-2xl">
        A live simulation of how I architect and deploy
        production-grade AI systems.
      </p>

      <div
        className={`rounded-2xl p-8 transition-all duration-500 ${
          theme === "dark"
            ? "bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.15)]"
            : "bg-white border border-[#E4DED8] shadow-md"
        }`}
      >
        <p className="mb-4 text-blue-400 font-mono text-base">
          boot_system("{simulation.name}")
        </p>

        {simulation.lines.slice(0, visibleLines).map((line, i) => (
          <p key={i} className="font-mono text-sm opacity-80">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
