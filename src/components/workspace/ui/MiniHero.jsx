/**
 * MiniHero.jsx — Phase 3
 * Theme-aware miniature hero section.
 */
import { HERO } from "../../../data/portfolioData";

export default function MiniHero({ width = 340, height = 220, wt }) {
  return (
    <div
      style={{
        width: typeof width === "number" ? `${width}px` : width, height: typeof height === "number" ? `${height}px` : height,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "24px", boxSizing: "border-box",
        background: wt.isDark
          ? "linear-gradient(135deg, #070c18 0%, #0c1220 100%)"
          : "linear-gradient(135deg, #f0f4ff 0%, #e2e8f0 100%)",
        overflow: "hidden", position: "relative",
        transition: "background 500ms ease",
      }}
    >
      {/* Ambient grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${wt.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${wt.gridColor} 1px, transparent 1px)`,
        backgroundSize: "24px 24px", pointerEvents: "none",
        transition: "background-image 500ms ease",
      }} />

      {/* Subtitle */}
      <p style={{
        fontSize: "7px", letterSpacing: "0.25em", textTransform: "uppercase",
        color: wt.mini.accent, marginBottom: "10px", fontFamily: "monospace", opacity: 0.9,
        position: "relative",
        transition: "color 500ms ease",
      }}>
        {HERO.subtitle}
      </p>

      {/* Main heading */}
      <div style={{ marginBottom: "14px", position: "relative" }}>
        {HERO.heading.map((word, i) => (
          <div key={i} style={{
            fontSize: i === 1 ? "26px" : "22px",
            fontWeight: 900, lineHeight: 1.05,
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: i === 1
              ? (wt.isDark ? "linear-gradient(90deg, #60a5fa, #67e8f9, #818cf8)" : "linear-gradient(90deg, #2563eb, #0891b2, #4f46e5)")
              : "none",
            WebkitBackgroundClip: i === 1 ? "text" : "none",
            WebkitTextFillColor: i === 1 ? "transparent" : wt.mini.heading,
            color: wt.mini.heading,
            marginBottom: "1px",
            transition: "color 500ms ease",
          }}>
            {word}
          </div>
        ))}
      </div>

      {/* Description */}
      <p style={{
        fontSize: "7.5px", color: wt.mini.body, lineHeight: 1.65,
        maxWidth: "240px", marginBottom: "16px", position: "relative",
        transition: "color 500ms ease",
      }}>
        {HERO.description}
      </p>

      {/* CTA buttons */}
      <div style={{ display: "flex", gap: "8px", position: "relative" }}>
        <span style={{
          fontSize: "6.5px", padding: "4px 10px", borderRadius: "7px",
          background: wt.mini.accent, color: "#fff", fontWeight: 700,
          letterSpacing: "0.05em",
          transition: "background 500ms ease",
        }}>
          Resume ↓
        </span>
        <span style={{
          fontSize: "6.5px", padding: "4px 10px", borderRadius: "7px",
          border: `1px solid ${wt.mini.border}`, color: wt.mini.heading,
          letterSpacing: "0.05em",
          transition: "border-color 500ms ease, color 500ms ease",
        }}>
          Projects →
        </span>
      </div>
    </div>
  );
}
