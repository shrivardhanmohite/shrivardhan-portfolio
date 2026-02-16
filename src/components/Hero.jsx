import { FiArrowRight, FiDownload } from "react-icons/fi";
import portImg from "../assets/port.png";

export default function Hero() {
  return (
    <section
      id="hero"
      className="snap-start h-screen flex items-center pt-28 px-8 max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center w-full">

        {/* LEFT CONTENT */}
        <div>

          {/* Label */}
          <p className="text-sm tracking-widest uppercase opacity-50 mb-6">
            LLM Systems & AI Architecture
          </p>

          {/* Heading */}
          <h2 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
            Building
            <br />
            <span className="text-blue-400">
              Intelligent, Production-Grade Systems
            </span>
          </h2>

          {/* Description */}
          <p className="mt-10 text-xl max-w-2xl font-sans leading-relaxed opacity-80">
            I’m <span className="text-blue-400 font-medium">Shrivardhan Mohite</span> —
            a Computer Science engineer focused on designing scalable
            <span className="text-blue-400 font-medium"> AI-powered applications</span> and
            <span className="text-blue-400 font-medium"> Retrieval-Augmented LLM systems</span>.
          </p>

          <p className="mt-6 text-lg max-w-2xl font-sans leading-relaxed opacity-70">
            With strong foundations in
            <span className="text-blue-400 font-medium"> distributed systems</span>,
            <span className="text-blue-400 font-medium"> backend architecture</span>, and
            modern full-stack development, I build
            <span className="text-blue-400 font-medium"> secure, high-performance infrastructure</span>
            engineered for real-world impact.
            Currently advancing into
            <span className="text-blue-400 font-medium"> LLM orchestration</span>,
            <span className="text-blue-400 font-medium"> RAG pipelines</span>, and
            <span className="text-blue-400 font-medium"> AI microservices</span>.
          </p>

          {/* 🔥 BUTTONS ADDED HERE */}
          <div className="mt-10 flex gap-6">

            {/* Resume Button */}
            <a
              href="/Rseume_f.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-medium"
            >
              Resume
              <FiDownload />
            </a>

            {/* Projects Button */}
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-white transition duration-300 font-medium"
            >
              Projects
              <FiArrowRight />
            </a>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-end pr-6">

          {/* Glow Behind */}
          <div className="absolute w-[420px] h-[420px] bg-blue-500/20 rounded-full blur-3xl" />

          {/* Circular Image */}
          <img
            src={portImg}
            alt="Shrivardhan Mohite"
            className="relative z-10 w-80 md:w-96 rounded-full object-cover border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
          />

        </div>

      </div>
    </section>
  );
}
