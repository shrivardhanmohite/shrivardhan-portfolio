import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Navbar() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  const links = [
    {name:"About", id:"hero"},
    { name: "Runtime", id: "runtime" },
    { name: "Projects", id: "projects" },
    { name: "Stack", id: "stack" },
    { name: "Journey", id: "journey" },
    { name: "Contact", id: "contact" }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-20 backdrop-blur-md border-b border-white/5">
      
      {/* Grid Layout */}
      <div className="grid grid-cols-3 items-center h-full px-8">

        {/* Left */}
        <div>
          <h1 className="text-lg font-semibold tracking-wide">
            SHRIVARDHAN MOHITE
          </h1>
        </div>

        {/* Center */}
        <div className="hidden md:flex justify-center items-center text-sm font-medium">
          {links.map((link, index) => (
            <div key={link.id} className="flex items-center">
              <button
                onClick={() => scrollToSection(link.id)}
                className="opacity-70 hover:opacity-100 transition duration-200"
              >
                {link.name}
              </button>

              {index !== links.length - 1 && (
                <span className="mx-6 h-4 w-px bg-white/20" />
              )}
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="flex justify-end">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            {theme === "dark" ? (
              <FiSun className="text-lg" />
            ) : (
              <FiMoon className="text-lg" />
            )}
          </motion.button>
        </div>

      </div>
    </nav>
  );
}
