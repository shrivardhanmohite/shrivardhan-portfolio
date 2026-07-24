import { FiArrowRight, FiDownload } from "react-icons/fi";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";
import portImg from "../assets/port.jpg";
import darkSilhouette from "../assets/sill-dark'.png";
import lightSilhouette from "../assets/sill-light.png";

import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const heroRef = useRef(null);
  // Fix 1: point useScroll at the real scroll container, not window
  const scrollContainerRef = useRef(null);
  useLayoutEffect(() => {
    scrollContainerRef.current = document.getElementById("main-scroll");
  }, []);

  const { theme } = useTheme();
  const silhouette = theme === "dark" ? darkSilhouette : lightSilhouette;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"],
  });
// Fix 5: tighter spring — less overshoot on momentum/wheel scroll
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 60,
  damping: 25,
  mass: 0.8,
});

/* ------------------------------------------------------- */
/* Heading */
/* ------------------------------------------------------- */

const headingY = useTransform(
  smoothProgress,
  [0, 0.35, 1],
  [0, -40, -40]
);

const headingScale = useTransform(
  smoothProgress,
  [0, 0.35, 1],
  [1, 0.94, 0.94]
);

/* ------------------------------------------------------- */
/* Description */
/* ------------------------------------------------------- */

const descriptionOpacity = useTransform(
  smoothProgress,
  [0.15, 0.35, 1],
  [0, 1, 1]
);

const descriptionY = useTransform(
  smoothProgress,
  [0.15, 0.35, 1],
  [30, 0, 0]
);

/* ------------------------------------------------------- */
/* Portrait */
/* ------------------------------------------------------- */

const portraitOpacity = useTransform(
  smoothProgress,
  [0.38, 0.55, 1],
  [0, 1, 1]
);

const portraitScale = useTransform(
  smoothProgress,
  [0.38, 0.55, 1],
  [0.95, 1, 1]
);

/* ------------------------------------------------------- */
/* Silhouette */
/* ------------------------------------------------------- */

const silhouetteOpacity = useTransform(
  smoothProgress,
  [0.30, 0.48, 1],
  [1, 0, 0]
);

/* ------------------------------------------------------- */
/* Glow */
/* ------------------------------------------------------- */

const glowScale = useTransform(
  smoothProgress,
  [0, 0.65],
  [1, 1.15]
);

const glowOpacity = useTransform(
  smoothProgress,
  [0, 0.65],
  [0.15, 0.25]
);

const glowBlur = useTransform(
  smoothProgress,
  [0, 0.65],
  [80, 100]
);

const glowFilter = useMotionTemplate`blur(${glowBlur}px)`;

/* ------------------------------------------------------- */
/* Buttons */
/* ------------------------------------------------------- */

const buttonsOpacity = useTransform(
  smoothProgress,
  [0.50, 0.65, 1],
  [0, 1, 1]
);

const buttonsY = useTransform(
  smoothProgress,
  [0.50, 0.65, 1],
  [25, 0, 0]
);

// Extracted from inline JSX (Rules of Hooks compliance + zero re-alloc per render)
const scrollIndicatorOpacity = useTransform(
  smoothProgress,
  [0, 0.06],
  [1, 0]
);

/* ------------------------------------------------------- */
/* Know Me CTA */
/* ------------------------------------------------------- */

// Single source of truth: button exits permanently once scroll crosses 0.12
// Works identically whether triggered by clicking Know Me or manual scrolling
const [knowMeVisible, setKnowMeVisible] = useState(true);
useMotionValueEvent(smoothProgress, "change", (v) => {
  if (v > 0.12) setKnowMeVisible(false);
});

const handleKnowMe = () => {
  const container = scrollContainerRef.current;
  const section = heroRef.current;
  if (!container || !section) return;

  // Scroll to 50% of the Hero's scrollable range—matches animation progress ≈0.50:
  // heading moved, description visible, portrait crossfading
  const scrollableHeight = section.offsetHeight - container.clientHeight;
  const targetScroll = section.offsetTop + scrollableHeight * 0.50;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  container.scrollTo({
    top: targetScroll,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
};
  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative xl:h-[260vh] snap-end"
    >
      <div className="relative xl:sticky xl:top-0 min-h-[100dvh] xl:h-[100dvh] w-full flex flex-col xl:overflow-hidden pt-[80px] pb-6">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 md:px-12 lg:px-16 my-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 xl:gap-16 items-center">
            {/* ================= LEFT ================= */}

<div className="flex flex-col justify-center">

  {/* Fix 4: subtitle is always visible — only the description paragraph fades in */}
  <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-blue-400 font-medium mb-4 sm:mb-8 mt-4 sm:mt-8 subtitle">
    LLM Systems • AI Architecture • Backend Engineering
  </p>

  <motion.h1
    style={{
      y: headingY,
      scale: headingScale,
    }}
    className="font-black leading-[1.05] tracking-tight max-xl:!transform-none"
  >
    <span className="block text-4xl sm:text-5xl md:text-6xl xl:text-8xl ">
      Building
    </span>

    <span className="block mt-1 sm:mt-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl xl:text-8xl">
      Intelligent
    </span>

    <span className="block mt-1 sm:mt-3 text-4xl sm:text-5xl md:text-6xl xl:text-8xl">
      Systems
    </span>
  </motion.h1>

  {/* Know Me CTA — exits with height collapse when scroll crosses description threshold */}
  <AnimatePresence>
    {knowMeVisible && (
      <motion.div
        key="know-me-cta"
        initial={false}
        exit={{ opacity: 0, y: -8, height: 0, marginTop: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="mt-3 sm:mt-5 overflow-hidden max-xl:!hidden"
      >
        <button
          type="button"
          onClick={handleKnowMe}
          className="
            group
            flex items-center justify-between
            w-[240px] px-7 py-[14px]
            rounded-2xl
            bg-blue-600/90 hover:bg-blue-500
            text-white font-semibold text-base tracking-wide
            shadow-[0_0_24px_rgba(37,99,235,0.35)]
            hover:shadow-[0_0_40px_rgba(37,99,235,0.55)]
            transition-all duration-300
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-blue-400
            focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
          "
        >
          <span>Know Me</span>
          <FiArrowRight
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </motion.div>
    )}
  </AnimatePresence>

  <motion.div
    layout
    style={{
      opacity: descriptionOpacity,
      y: descriptionY,
    }}
    className=" space-y-3 max-w-2xl max-xl:!opacity-100 max-xl:!transform-none"
  >
    <p className="text-base md:text-lg leading-8 text-gray-400">
      I'm{" "}
      <span className="font-semibold text-blue-400">
        Shrivardhan Mohite
      </span>
      , a Computer Science engineer passionate about
      scalable backend systems, modern AI infrastructure,
      Retrieval-Augmented Generation (RAG), and
      production-ready LLM applications.
    </p>

    <p className="text-base md:text-lg leading-8 text-gray-500">
      I enjoy designing software that combines strong
      engineering principles with practical AI—from
      distributed backend services to intelligent
      full-stack applications that solve real-world
      problems.
    </p>
  </motion.div>

  <motion.div
    layout
    style={{
      opacity: buttonsOpacity,
      y: buttonsY,
    }}
    className="mt-2 sm:mt-4 flex flex-wrap gap-4 max-xl:!opacity-100 max-xl:!transform-none"
  >
    <a
      href="/shrivardhan-portfolio/Resume.pdf"
      download="Shrivardhan_Mohite_Resume.pdf"
      className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 flex items-center gap-2 text-white font-medium shadow-xl"
    >
      Resume
      <FiDownload />
    </a>

    <a
      href="#projects"
      className="px-7 py-3 rounded-xl border border-white/20 hover:border-blue-400 transition-all duration-300 flex items-center gap-2"
    >
      Projects
      <FiArrowRight />
    </a>
  </motion.div>

</div>

{/* ================= RIGHT ================= */}
<div
  className="
    relative
    flex
    justify-center
    items-center
    w-full
    min-h-[280px]
    sm:min-h-[320px]
    md:min-h-[360px]
    lg:min-h-[420px]
    xl:min-h-[480px]
    overflow-visible
  "
>
  {/* Animated Glow */}
  <motion.div
  style={{
    scale: glowScale,
    opacity: glowOpacity,
    filter: glowFilter,
  }}
  className="absolute w-[65%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[480px] xl:h-[480px] aspect-square rounded-full bg-blue-500/30 blur-3xl max-xl:!opacity-25 max-xl:!transform-none"
/>

  {/* Portrait Container */}
  <div
    className="
      relative
      w-56
      h-56
      sm:w-64
      sm:h-64
      md:w-72
      md:h-72
      lg:w-80
      lg:h-80
      xl:w-[380px]
      xl:h-[380px]
      flex-shrink-0
      mx-auto
    "
  >
    {/* Silhouette */}
    <motion.img
    src={silhouette}
    alt="Silhouette"
    style={{ opacity: silhouetteOpacity }}
    className="absolute inset-0 z-10 w-full h-full rounded-full object-cover select-none pointer-events-none max-xl:!hidden"
  />

    {/* Portrait */}
    <motion.img
    src={portImg}
    alt="Shrivardhan Mohite"
    style={{
      opacity: portraitOpacity,
      scale: portraitScale,
    }}
    className="absolute inset-0 z-20 w-full h-full rounded-full object-cover border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.25)] max-xl:!opacity-100 max-xl:!transform-none"
  />
  </div>
</div>

        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <motion.div
      style={{
        opacity: scrollIndicatorOpacity,
      }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 max-xl:!hidden"
    >
      <span className="text-xs uppercase tracking-[0.35em] text-white/60">
        Scroll
      </span>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: "easeInOut",
        }}
        className="w-[2px] h-10 rounded-full bg-white/40"
      />
    </motion.div>
  </section>
);
}