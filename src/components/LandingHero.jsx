import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

import darkSilhouette from "../assets/sill-dark'.png";
import lightSilhouette from "../assets/sill-light.png";

export default function LandingHero() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const silhouette = isDark
    ? darkSilhouette
    : lightSilhouette;

  return (
    <section
      id="landing"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        <div
          className={`
            absolute
            w-[520px]
            h-[520px]
            rounded-full
            blur-[120px]
            transition-all
            duration-700
            ${
              isDark
                ? "bg-blue-500/15"
                : "bg-sky-300/25"
            }
          `}
        />

      </div>

      {/* Main Content */}

      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Small Label */}

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="uppercase tracking-[0.35em] text-xs sm:text-sm font-medium text-blue-400"
        >
          AI Systems Engineer
        </motion.p>

        {/* Name */}

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.8,
          }}
          className="
            mt-6
            font-black
            tracking-tight
            leading-none
            text-5xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            xl:text-[7rem]
          "
        >
          <span className="block">
            SHRIVARDHAN
          </span>

          <span className="block text-blue-400 mt-2">
            MOHITE
          </span>
        </motion.h1>

        {/* Silhouette */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.35,
            duration: 0.9,
          }}
          className="relative mt-14"
        >

          <img
            src={silhouette}
            alt="Shrivardhan Mohite"
            className="
              w-64
              sm:w-72
              md:w-80
              lg:w-[420px]
              xl:w-[480px]
              select-none
              pointer-events-none
            "
          />

        </motion.div>

        {/* Explore */}

        <motion.a
          href="#hero"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="
            mt-12
            group
            text-blue-400
            hover:text-blue-300
            transition-all
            duration-300
            tracking-wide
            text-base
            font-medium
          "
        >
          Explore

          <div
            className="
              mt-2
              transition-transform
              duration-300
              group-hover:translate-y-1
            "
          >
            ↓
          </div>

        </motion.a>

      </div>
    </section>
  );
}