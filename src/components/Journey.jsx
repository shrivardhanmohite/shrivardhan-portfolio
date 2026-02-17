import { motion } from "framer-motion";

export default function Journey() {
  const milestones = [
    {
      title: "Engineering Trajectory",
      description: "CURRENT"
    },
    {
      title: "Advanced LLM Engineering",
      description:
        "Independent Research & Applied AI Systems\n\n2025 – Present\n\nSpecializing in Retrieval-Augmented Generation (RAG), LLM orchestration, FastAPI microservices and production-grade AI architecture."
    },
    {
      title: "B.TECH (Computer Science & Technology)",
      description:
        "Shivaji University School of Engineering & Technology, Kolhapur\n2023 – Pursuing\n\nStudying DSA, Operating Systems, DBMS and system design while building full-stack and AI-integrated applications."
    },
    {
      title: "HSC (CBSE)",
      description:
        "Teens World Corporate School, Boisar\n2022 – 2023 • 88.6%\n\nComputer Science as core subject. Strengthened programming fundamentals and analytical thinking."
    },
    {
      title: "SSC (CBSE)",
      description:
        "Teens World Corporate School, Boisar\n2020 – 2021 • 94.3%\n\nBuilt strong mathematical reasoning and structured problem-solving foundation."
    }
  ];

  return (
    <section
      id="journey"
      className="snap-start min-h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto py-20"
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center md:text-left">
        Engineering Journey
      </h3>

      <div className="relative">

        {/* Vertical Line */}
        <div className="absolute left-4 sm:left-6 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-px bg-blue-500/20" />

        <div className="space-y-12">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0
                  ? "md:justify-start"
                  : "md:justify-end"
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-2 sm:left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full ${
                  index === 0
                    ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                    : "bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.5)]"
                }`}
              />

              {/* Card */}
              <div
                className={`ml-10 sm:ml-14 md:ml-0 md:w-1/2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300 ${
                  index % 2 === 0
                    ? "md:mr-auto md:pr-12"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                <h4 className="text-lg sm:text-xl font-semibold mb-3 whitespace-pre-line">
                  {item.title}
                </h4>

                <p className="text-sm sm:text-base opacity-70 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
