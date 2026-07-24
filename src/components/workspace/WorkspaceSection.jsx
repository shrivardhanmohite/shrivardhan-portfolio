/**
 * WorkspaceSection.jsx — Phase 3
 * Includes interactionState for Scroll Handoff.
 */
import { Suspense, lazy, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWorkspaceScroll } from "./hooks/useWorkspaceScroll";
import { useWorkspaceTheme } from "./workspaceTheme";

const WorkspaceScene = lazy(() => import("./scene/WorkspaceScene"));

// Evaluated once at module load — never changes at runtime.
// When the portfolio loads inside the laptop's <iframe>,
// window.self !== window.top is true, so we skip the heavy 3D scene.
const IS_INSIDE_IFRAME =
  typeof window !== "undefined" && window.self !== window.top;



/* ── Canvas loading skeleton ── */
function CanvasSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex gap-2 items-center" style={{ color: "rgba(96,165,250,0.6)" }}>
        <div className="w-2 h-2 rounded-full bg-blue-400/60 animate-pulse" />
        <span className="text-xs font-mono tracking-widest uppercase">
          Initialising workspace…
        </span>
      </div>
    </div>
  );
}


export default function WorkspaceSection() {
  // When rendered inside the laptop iframe, return a tiny placeholder.
  // This prevents the 3D scene from spawning another iframe inside itself.
  if (IS_INSIDE_IFRAME) {
    return (
      <section
        id="runtime"
        style={{ minHeight: "1px", background: "transparent", pointerEvents: "none" }}
      />
    );
  }
  return <WorkspaceSectionInner />;
}

/* ── Real section (only rendered in the top-level window) ── */
function WorkspaceSectionInner() {
  const sectionRef  = useRef(null);
  const [isVisible, setIsVisible]  = useState(false);
  const [isMounted, setIsMounted]  = useState(false);

  // State for Scroll Handoff: "mirror" | "interactive" | "paused"
  const [interactionState, setInteractionState] = useState("mirror");

  const wt = useWorkspaceTheme();
  const { sectionProgress } = useWorkspaceScroll();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setIsMounted(true);
      },
      { threshold: 0.05, rootMargin: "200px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle global scroll lock when in "interactive" mode
  useEffect(() => {
    const el = document.getElementById("main-scroll");
    if (interactionState === "interactive") {
      if (el) el.style.overflowY = "hidden";
      const handleKeyDown = (e) => {
        const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
        if (e.key === "Escape" && !isMobileViewport) setInteractionState("paused");
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        if (el) el.style.overflowY = "auto";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [interactionState]);

  return (
    <section
      id="runtime"
      ref={sectionRef}
      className="snap-start min-h-screen flex flex-col justify-center relative"
      style={{
        background: wt.sectionBg,
        transition: "background 500ms ease",
      }}
    >
      {/* Dim overlay when interactive */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
          background: wt.isDark ? "#000" : "#111",
          opacity: interactionState === "interactive" ? 0.4 : 0,
          transition: "opacity 600ms ease",
        }}
      />

      {/* Engineering grid */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: [
            `linear-gradient(${wt.gridColor} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${wt.gridColor} 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: "40px 40px",
          transition: "background-image 500ms ease",
        }}
      />

      {/* Radial vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: wt.isDark
            ? "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(5,8,18,0.7) 100%)"
            : "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(200,190,175,0.5) 100%)",
          transition: "background 500ms ease",
        }}
      />

      {/* Click-away background */}
      {interactionState === "interactive" && (
        <div
          onClick={() => setInteractionState("paused")}
          style={{ position: "absolute", inset: 0, zIndex: 6, cursor: "default" }}
        />
      )}

      {/* ── Section header ── */}
      <div 
        className="absolute top-0 left-0 right-0 z-10 px-6 sm:px-8 md:px-12 lg:px-16 pt-20 pb-4"
        style={{
          opacity: interactionState === "interactive" ? 0 : 1,
          pointerEvents: interactionState === "interactive" ? "none" : "auto",
          transition: "opacity 600ms ease",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p
            className="text-xs tracking-[0.35em] uppercase font-medium mb-3"
            style={{ color: wt.mini.accent, transition: "color 400ms" }}
          >
            The Developer Behind the Work
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Workspace
          </h3>
          <p className="mt-2 text-sm sm:text-base opacity-60 max-w-md leading-relaxed">
            An interactive 3D workspace — the laptop screen mirrors where you are
            in this portfolio right now.
          </p>
        </motion.div>
      </div>

      {/* ── 3D Canvas (renders on all devices now) ── */}
      <div className="w-full" style={{ height: "100vh", zIndex: 10 }}>
        {isMounted ? (
          <Suspense fallback={<CanvasSkeleton />}>
            <WorkspaceScene
              sectionProgress={sectionProgress}
              isVisible={isVisible}
              interactionState={interactionState}
              setInteractionState={setInteractionState}
            />
          </Suspense>
        ) : (
          <CanvasSkeleton />
        )}
      </div>

      {/* ── Hint ── */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        style={{
          opacity: interactionState === "interactive" ? 0 : 1,
          transition: "opacity 600ms ease",
          pointerEvents: "none"
        }}
      >
        <p className="text-xs opacity-40 tracking-[0.2em] uppercase font-mono hidden md:block">
          Click laptop to interact
        </p>
        <p className="text-xs opacity-40 tracking-[0.2em] uppercase font-mono md:hidden">
          Tap phone to interact
        </p>
      </div>
    </section>
  );
}
