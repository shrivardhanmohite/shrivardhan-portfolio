import { FiArrowRight, FiDownload } from "react-icons/fi";
import portImg from "../assets/port.png";

export default function Hero() {
  return (
    <section
  id="hero"
  className="snap-start min-h-screen flex items-center px-6 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-28 max-w-7xl mx-auto"
>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">

          {/* Label */}
          <p className="text-xs sm:text-sm tracking-widest uppercase opacity-50 mb-4">
            LLM Systems & AI Architecture
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Building
            <br />
            <span className="text-blue-400">
              Intelligent, Production-Grade Systems
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl md:max-w-2xl mx-auto md:mx-0 leading-relaxed opacity-80">
            I’m <span className="text-blue-400 font-medium">Shrivardhan Mohite</span> —
            a Computer Science engineer focused on designing scalable
            <span className="text-blue-400 font-medium"> AI-powered applications</span> and
            <span className="text-blue-400 font-medium"> Retrieval-Augmented LLM systems</span>.
          </p>

          <p className="mt-4 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto md:mx-0 leading-relaxed opacity-70">
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

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">

            <a
              href="Resume.pdf"
              download="Shrivardhan_Mohite_Resume.pdf"
              className="flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-medium"
            >
              Resume
              <FiDownload />
            </a>

            <a
              href="#projects"
              className="flex justify-center items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-white transition duration-300 font-medium"
            >
              Projects
              <FiArrowRight />
            </a>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center mt-10 md:mt-0">

          {/* Glow */}
          <div className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl" />

          {/* Image */}
          <img
            src={portImg}
            alt="Shrivardhan Mohite"
            className="relative z-10 w-48 sm:w-60 md:w-80 lg:w-96 rounded-full object-cover border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
          />
        </div>

      </div>
    </section>
  );
}
