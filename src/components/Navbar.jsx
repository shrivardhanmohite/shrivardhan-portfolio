import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Navbar() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState("hero");

  const links = [
    { name: "About",       id: "hero"        },
    { name: "Runtime",     id: "runtime"     },
    { name: "Projects",    id: "projects"    },
    { name: "Metrics",     id: "metrics"     },
    { name: "Stack",       id: "stack"       },
    { name: "Credentials", id: "credentials" },
    { name: "Journey",     id: "journey"     },
    { name: "Contact",     id: "contact"     },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-20 backdrop-blur-md border-b border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-3 items-center h-full px-6 sm:px-8">

        <div>
          <h1 className="text-sm sm:text-lg font-semibold tracking-wide">
            SHRIVARDHAN MOHITE
          </h1>
        </div>

        <div className="hidden md:flex justify-center items-center text-xs font-medium gap-0">
          {links.map((link, index) => (
            <div key={link.id} className="flex items-center">
              <button
                onClick={() => scrollToSection(link.id)}
                className={`transition-all duration-300 px-1 ${
                  activeSection === link.id
                    ? "opacity-100 text-blue-400 font-semibold"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {link.name}
              </button>
              {index !== links.length - 1 && (
                <span className="mx-3 h-3.5 w-px bg-white/20" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full backdrop-blur-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
