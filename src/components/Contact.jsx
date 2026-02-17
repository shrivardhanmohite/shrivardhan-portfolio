import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode, SiX } from "react-icons/si";

export default function Contact() {
  return (
    <section
      id="contact"
      className="snap-start min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto text-center py-20"
    >
      {/* Heading */}
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        Let’s Build Intelligent Systems
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base md:text-lg opacity-70 max-w-xl mb-12 leading-relaxed">
        Open to collaborations in AI infrastructure, LLM systems,
        and scalable backend engineering.
      </p>

      {/* Social Icons */}
      <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 text-2xl sm:text-3xl">
        
        <a
          href="mailto:shrivardhan18188@gmail.com"
          className="hover:text-blue-400 transition hover:scale-110 duration-200"
        >
          <FiMail />
        </a>

        <a
          href="https://www.linkedin.com/in/shrivardhan-mohite-b67958289/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition hover:scale-110 duration-200"
        >
          <FiLinkedin />
        </a>

        <a
          href="https://github.com/shrivardhanmohite"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition hover:scale-110 duration-200"
        >
          <FiGithub />
        </a>

        <a
          href="https://leetcode.com/u/shrivardhanmohite/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition hover:scale-110 duration-200"
        >
          <SiLeetcode />
        </a>

        <a
          href="https://x.com/shrivardha36507"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition hover:scale-110 duration-200"
        >
          <SiX />
        </a>

      </div>
    </section>
  );
}
