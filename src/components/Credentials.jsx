import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { ScrollText, GraduationCap, BriefcaseBusiness } from "lucide-react";
import { CREDENTIALS } from "../data/portfolioData";
import { useEffect, useState } from "react";

export default function Credentials() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "internship": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "certification": return "text-green-400 bg-green-500/10 border-green-500/20";
      case "academic": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      default: return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "certification": return <ScrollText size={11} />;
      case "academic": return <GraduationCap size={11} />;
      case "internship": return <BriefcaseBusiness size={11} />;
      default: return null;
    }
  };

  return (
    <section
      id="credentials"
      className="snap-start min-h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto py-24"
    >
      {/* --- TITLE & SUBTITLE --- */}
      <div className="mb-16">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center md:text-left"
        >
          Credentials
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="opacity-70 text-sm sm:text-base md:text-lg max-w-2xl text-center md:text-left"
        >
          Verified learning, internships, certifications, and academic achievements.
        </motion.p>
      </div>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
        {CREDENTIALS.map((cred, index) => {
          // Alternating entrance: Even from left, Odd from right
          const directionMultiplier = index % 2 === 0 ? -1 : 1;
          const distance = isMobile ? 100 : 300;
          
          return (
            <motion.a
              href={cred.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              key={cred.id}
              initial={{ 
                opacity: 0, 
                x: distance * directionMultiplier,
                scale: 0.95,
                rotate: 3 * directionMultiplier,
                filter: "blur(5px)"
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                rotate: 0,
                filter: "blur(0px)"
              }}
              // Delay accounts for title (0s) + subtitle (0.2s) + pause (0.2s) = 0.4s base delay
              transition={{ 
                duration: 1.2, 
                delay: 0.4 + (index * 0.15), 
                type: "spring", 
                bounce: 0.2 
              }}
              viewport={{ once: true, amount: 0.2 }}
              
              // Hover and Tap interactions
              whileHover={{ y: -10, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              
              className="group relative flex flex-col rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] hover:border-blue-500/40 transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent cursor-pointer"
              aria-label={`${cred.title} by ${cred.issuer}. Opens Google Drive in new tab.`}
            >
              {/* Shine Sweep Animation */}
              <div className="absolute inset-0 z-20 pointer-events-none -translate-x-[150%] group-hover:animate-[shine_1.5s_ease-in-out] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

              {/* Image / Logo Cover */}
              {cred.logoStyle ? (
                /* ── Logo-style cover: clean matte bg, crisp logo ── */
                <div
                  className="relative h-48 sm:h-52 w-full overflow-hidden border-b border-white/5 flex items-center justify-center"
                  style={{ background: "#f0ede8" }}
                >
                  {/* Subtle outer-edge glow only — not at centre */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 60px 10px rgba(59,130,246,0.08)" }}
                  />
                  <img
                    src={cred.image}
                    alt={cred.title}
                    loading="lazy"
                    className="relative z-10 w-32 h-32 object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  {/* Soft bottom fade into dark card body */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0d0d14] to-transparent" />
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md flex items-center gap-1 ${getCategoryColor(cred.category)}`}>
                    {getCategoryIcon(cred.category)}
                    {cred.category}
                  </div>
                </div>
              ) : (
                /* ── Standard full-bleed photo cover ── */
                <div className="relative h-48 sm:h-52 w-full overflow-hidden border-b border-white/5">
                  <img
                    src={cred.image}
                    alt={cred.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03050A] via-transparent to-transparent opacity-80" />
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md flex items-center gap-1 ${getCategoryColor(cred.category)}`}>
                    {getCategoryIcon(cred.category)}
                    {cred.category}
                  </div>
                </div>
              )}

              {/* Content Body */}
              <div className="p-5 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h4 className="text-base font-semibold leading-snug">
                    {cred.title}
                  </h4>
                  {cred.verified && (
                    <div className="flex items-center gap-1 text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20 whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">
                      <FiCheckCircle /> Verified
                    </div>
                  )}
                </div>

                <div className="text-sm font-medium text-blue-300 opacity-80 mb-1 group-hover:opacity-100 transition-opacity">
                  {cred.issuer}
                </div>
                
                <div className="text-xs opacity-50 font-mono mb-4">
                  {cred.issueDate} {cred.duration && `• ${cred.duration}`}
                </div>

                <p className="text-sm opacity-70 mb-6 line-clamp-2 leading-relaxed flex-grow">
                  {cred.description}
                </p>

                {/* Footer Action */}
                <div className="mt-auto flex items-center justify-between text-sm font-medium text-blue-400 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>Explore Collection</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Shine Keyframes */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-150%) skewX(12deg); }
          100% { transform: translateX(150%) skewX(12deg); }
        }
      `}</style>
    </section>
  );
}
