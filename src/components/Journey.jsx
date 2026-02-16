import { motion } from "framer-motion";

export default function Journey() {
  const milestones = [
    {
      year: "CURRENT",
      title: "Advanced LLM Engineering",
      institute: "Independent Research & Applied AI Systems",
      period: "2025 – Present",
      desc: "Specializing in Retrieval-Augmented Generation (RAG), LLM orchestration, FastAPI microservices and production-grade AI architecture.",
      highlight: true
    },
    {
      year: "B.TECH (Computer Science & Technology)",
      title: "Shivaji University School of Engineering & Technology, Kolhapur",
      institute: "",
      period: "2023 – Pursuing",
      desc: "Studying DSA, Operating Systems, DBMS and system design while building full-stack and AI-integrated applications."
    },
    {
      year: "HSC (CBSE)",
      title: "Teens World Corporate School, Boisar",
      institute: "",
      period: "2022 – 2023 • 88.6%",
      desc: "Computer Science as core subject. Strengthened programming fundamentals and analytical thinking."
    },
    {
      year: "SSC (CBSE)",
      title: "Teens World Corporate School, Boisar",
      institute: "",
      period: "2020 – 2021 • 94.3%",
      desc: "Built strong mathematical reasoning and structured problem-solving foundation."
    }
  ];

  return (
    <section id="journey" className="snap-start h-screen flex flex-col justify-center pt-24 px-8 max-w-7xl mx-auto relative">

      <h3 className="text-4xl md:text-5xl font-bold mb-12">
        Engineering Trajectory
      </h3>

      <div className="absolute left-1/2 top-32 bottom-16 w-[2px] bg-blue-500/30 hidden md:block" />

      <div className="space-y-16 relative">
        {milestones.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative md:w-[45%] ${
              index % 2 === 0
                ? "md:pr-10 md:text-right md:ml-auto"
                : "md:pl-10"
            }`}
          >
            <div
              className={`hidden md:block absolute top-2 ${
                index % 2 === 0 ? "-left-3" : "-right-3"
              } w-4 h-4 rounded-full transition-all duration-300 ${
                item.highlight
                  ? "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.9)]"
                  : "bg-blue-400/70"
              }`}
            />

            <div className="transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">
              <p className="text-blue-400 text-sm mb-2 font-medium tracking-wide">
                {item.year}
              </p>

              <h4 className="text-xl font-semibold mb-1 leading-snug">
                {item.title}
              </h4>

              {item.institute && (
                <p className="text-sm opacity-70 mb-1">
                  {item.institute}
                </p>
              )}

              <p className="text-sm opacity-60 mb-3">
                {item.period}
              </p>

              <p className="opacity-75 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
