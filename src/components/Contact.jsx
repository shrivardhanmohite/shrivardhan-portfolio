import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode, SiX } from "react-icons/si";
import Footer from "./Footer";

export default function Contact() {
  return (
    <section
      id="contact"
      className="snap-start h-screen flex flex-col justify-center items-center px-8 max-w-7xl mx-auto text-center"
    >
      <h3 className="text-4xl md:text-5xl font-bold mb-6">
        Let’s Build Intelligent Systems
      </h3>

      <p className="text-lg opacity-70 max-w-xl mb-12">
        Open to collaborations in AI infrastructure, LLM systems,
        and scalable backend engineering.
      </p>

      <div className="flex items-center gap-10 text-2xl">

        <a
          href="mailto:shrivardhan18188@gmail.com"
          className="hover:text-blue-400 transition hover:scale-110"
        >
          <FiMail />
        </a>

        <a
          href="https://www.linkedin.com/in/shrivardhan-mohite-b67958289/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition hover:scale-110"
        >
          <FiLinkedin />
        </a>

        <a
          href="https://github.com/shrivardhanmohite"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition hover:scale-110"
        >
          <FiGithub />
        </a>

        <a
          href="https://leetcode.com/u/shrivardhanmohite/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition hover:scale-110"
        >
          <SiLeetcode />
        </a>

        <a
          href="https://x.com/shrivardha36507"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition hover:scale-110"
        >
          <SiX />
        </a>

      </div>
      
    </section>
  );
}
