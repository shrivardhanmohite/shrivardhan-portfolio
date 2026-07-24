import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { PROJECTS } from "../data/portfolioData";

export default function Projects() {

  return (
    <section
      id="projects"
      className="snap-start min-h-screen flex flex-col justify-center pt-24 px-6 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto py-20"
    >
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
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

      <p className="opacity-70 text-sm sm:text-base md:text-lg max-w-2xl mb-10">
        Real-world AI systems designed with modular architecture and production depth,
        backend architecture and scalable engineering.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
          key={project.id || index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)]"
          >
            {/* Icons */}
            <div className="absolute top-5 right-5 flex gap-3 text-lg opacity-70">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiExternalLink />
                </a>
              )}
            </div>

            {/* Title + Category */}
            <h4 className="text-lg font-semibold mb-1">
              {project.name}
            </h4>
            {project.category && (
              <p className="text-xs font-mono text-blue-400/70 mb-3 uppercase tracking-widest">
                {project.category}
              </p>
            )}

            {/* Description */}
            <p className="opacity-70 text-sm mb-5 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack */}
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

            {/* Status Badge */}
            {project.status && (
              <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {project.status}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
