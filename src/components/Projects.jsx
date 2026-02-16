import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";

export default function Projects() {
  const projects = [
    {
      name: "Revizo",
      description:
        "AI-powered study management platform integrating FastAPI microservices, PDF processing, and local LLM orchestration via Ollama.",
      tech: ["FastAPI", "Node.js", "MongoDB", "Ollama", "RAG"],
      github: "https://github.com/shrivardhanmohite/Revizo",
      live: null
    },
    {
      name: "CarbonCalc",
      description:
        "Carbon footprint calculator integrated with Gemini API to generate personalized sustainability insights.",
      tech: ["React", "Node.js", "Gemini API"],
      github: "https://github.com/shrivardhanmohite/CarbonCalc",
      live: "https://carboncalc-qjui.onrender.com/home"
    },
    {
      name: "Public Complaint Platform",
      description:
        "Role-based civic issue management system with admin dashboard and real-time complaint tracking.",
      tech: ["Node.js", "Express", "MongoDB", "EJS"],
      github: "https://github.com/shrivardhanmohite/public-complaining-platform",
      live: null
    },
    {
      name: "MapMyCampus",
      description:
        "Smart campus navigation system using Google Maps API and graph-based shortest path algorithms.",
      tech: ["JavaScript", "Maps API", "Algorithms"],
      github: "https://github.com/shrivardhanmohite/mapmycampus",
      live: null
    },
    {
      name: "FarmConnect",
      description:
        "AI-powered farmer-buyer marketplace integrating crop advisory and government scheme alerts.",
      tech: ["MERN Stack", "AI Integration"],
      github: "https://github.com/shrivardhanmohite/farmConnect",
      live: "https://farmconnect-b3dv.onrender.com"
    }
  ];

  return (
    <section
  id="projects"
  className="snap-start h-screen flex flex-col justify-center pt-24 px-8 max-w-7xl mx-auto"
>

  {/* Header Row */}
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-4xl font-bold">
      Systems in Production
    </h3>

    <a
      href="https://github.com/shrivardhanmohite"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm flex items-center gap-1 opacity-70 hover:opacity-100 transition"
    >
      github.com
      <FiArrowUpRight size={14} />
    </a>
  </div>

  <p className="opacity-70 text-lg max-w-2xl mb-10">
    Real-world AI systems designed with modular architecture and production depth,
    backend architecture and scalable engineering.
  </p>


      <p className="opacity-70 text-lg max-w-2xl mb-10">
        Real-world AI systems designed with modular architecture and production depth,
        backend architecture and scalable engineering.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)]"
          >
            <div className="absolute top-5 right-5 flex gap-3 text-lg opacity-70">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <FiGithub />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <FiExternalLink />
                </a>
              )}
            </div>

            <h4 className="text-lg font-semibold mb-3">
              {project.name}
            </h4>

            <p className="opacity-70 text-sm mb-5">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((techItem, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400"
                >
                  {techItem}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
