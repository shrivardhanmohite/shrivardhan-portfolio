/**
 * MiniPortfolio.jsx — Phase 3
 * Theme-aware miniature portfolio with interactive scroll handoff.
 */
import { useMotionValueEvent } from "framer-motion";
import { useRef, useEffect } from "react";
import MiniHero from "./MiniHero";
import MiniProjects from "./MiniProjects";
import MiniSkills from "./MiniSkills";
import MiniContact from "./MiniContact";
import { useWorkspaceTheme } from "../workspaceTheme";

const SECTIONS = [MiniHero, MiniProjects, MiniSkills, MiniContact];

export default function MiniPortfolio({ 
  sectionProgress, 
  bootPhase, 
  width = 340, 
  height = 220, 
  interactionState, 
  setInteractionState,
  isMobile 
}) {
  const wt = useWorkspaceTheme();
  const containerRef = useRef(null);

  const isReady = bootPhase === "ready";
  const isInteractive = interactionState === "interactive";

  // Handle scroll synchronization State Machine
  useMotionValueEvent(sectionProgress, "change", (latest) => {
    if (!containerRef.current || !isReady) return;
    
    if (interactionState === "mirror") {
      // Mirror global scroll
      containerRef.current.scrollTop = latest * height;
    } else if (interactionState === "paused") {
      // If global scroll catches up to the paused laptop position, resume mirror mode
      const currentLaptopProgress = containerRef.current.scrollTop / height;
      if (Math.abs(latest - currentLaptopProgress) < 0.05) {
        setInteractionState("mirror");
      }
    }
  });

  // Automatically focus container when entering Interactive Mode for keyboard support
  useEffect(() => {
    if (isInteractive && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isInteractive]);

  return (
    <div
      style={{
        width:  typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        background: wt.mini.bg,
        position: "relative",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        borderRadius: "2px",
        transition: "background 500ms ease",
        // Keep focus outline hidden
        outline: "none",
      }}
    >
      {/* Hide native scrollbars for seamless look */}
      <style>{`
        .mini-scroll-container::-webkit-scrollbar { display: none; }
        .mini-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Boot Screen ── */}
      {bootPhase !== "ready" && (
        <div
          style={{
            position: "absolute", inset: 0,
            background: wt.isDark ? "#000" : "#fff",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            zIndex: 10, gap: "10px",
            transition: "background 500ms ease",
          }}
        >
          {bootPhase === "off" && (
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: wt.isDark ? "#1e3a5f" : "#dbeafe" }} />
          )}

          {bootPhase === "booting" && (
            <>
              <div
                style={{
                  width: "2px", height: "14px",
                  background: wt.mini.accent,
                  animation: "blink 0.7s step-end infinite",
                }}
              />
              <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
            </>
          )}

          {bootPhase === "loading" && (
            <>
              <svg width="32" height="32" viewBox="-11.5 -10.23 23 20.46">
                <circle cx="0" cy="0" r="2.05" fill={wt.mini.accent} />
                <g stroke={wt.mini.accent} strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
              <p style={{ fontSize: "8px", color: wt.mini.accent, letterSpacing: "0.15em", fontFamily: "monospace" }}>
                Loading Portfolio...
              </p>
              <div style={{ width: "80px", height: "2px", background: wt.mini.accentBg, borderRadius: "1px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%", background: wt.mini.accent, borderRadius: "1px",
                    animation: "progress 1.8s ease-in-out forwards",
                  }}
                />
                <style>{`@keyframes progress { from{width:0%} to{width:100%} }`}</style>
              </div>
            </>
          )}
        </div>
      )}

      {/* Live indicator / Interactive Badge */}
      {isReady && (
        <div
          style={{
            position: "absolute", top: "5px", right: "7px",
            zIndex: 20, fontSize: "6px",
            color: isInteractive ? "#10b981" : wt.mini.liveColor,
            letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: "monospace",
            transition: "color 500ms ease",
            display: "flex", gap: "6px", alignItems: "center"
          }}
        >
          {isInteractive ? (
            <>
              <span>● INTERACTIVE MODE</span>
              <span style={{ opacity: 0.6 }}>
                [{isMobile ? "TAP OUTSIDE TO EXIT" : "ESC TO EXIT"}]
              </span>
            </>
          ) : (
            "● LIVE"
          )}
        </div>
      )}

      {/* Vignette border when interactive */}
      {isInteractive && (
        <div 
          style={{
            position: "absolute", inset: 0, zIndex: 15, pointerEvents: "none",
            boxShadow: `inset 0 0 20px ${wt.isDark ? "rgba(16,185,129,0.15)" : "rgba(16,185,129,0.25)"}`,
            border: `1px solid ${wt.isDark ? "rgba(16,185,129,0.3)" : "rgba(16,185,129,0.5)"}`,
            transition: "all 300ms ease"
          }}
        />
      )}

      {/* Scrolling sections container */}
      {isReady && (
        <div 
          ref={containerRef}
          className="mini-scroll-container"
          tabIndex={-1}
          style={{ 
            height: typeof height === "number" ? `${height}px` : height, 
            overflowY: isInteractive ? "auto" : "hidden",
            outline: "none"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SECTIONS.map((Section, i) => (
              <div key={i} style={{ height: typeof height === "number" ? `${height}px` : height, minHeight: typeof height === "number" ? `${height}px` : height, overflow: "hidden", position: "relative" }}>
                <Section width={width} height={height} wt={wt} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
