import { FiArrowUp } from "react-icons/fi";

export default function Footer() {

  const scrollToTop = () => {
    const container = document.getElementById("main-scroll");
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer
      id="footer"
      className="snap-none border-t border-white/5 py-10"
    >
      <div className="max-w-6xl mx-auto px-8 flex justify-between items-center text-sm">

        {/* Left */}
        <div className="opacity-60">
          © {new Date().getFullYear()} Shrivardhan Mohite
        </div>

        {/* Center */}
        <div className="opacity-60">
          Engineered LLM Systems & AI Infrastructure
        </div>

        {/* Right */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 opacity-60 hover:opacity-100 transition"
        >
          Back to Top
          <FiArrowUp />
        </button>

      </div>
    </footer>
  );
}
