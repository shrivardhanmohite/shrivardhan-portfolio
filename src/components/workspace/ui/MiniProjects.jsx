/**
 * MiniProjects.jsx — Phase 3
 * Theme-aware mini projects grid.
 */
import { PROJECTS } from "../../../data/portfolioData";

export default function MiniProjects({ width = 340, height = 220, wt }) {
  const featured = PROJECTS.slice(0, 3);

  return (
    <div style={{
      width: typeof width === "number" ? `${width}px` : width, height: typeof height === "number" ? `${height}px` : height,
      padding: "24px", background: wt.mini.bg,
      boxSizing: "border-box", overflow: "hidden", position: "relative",
      transition: "background 500ms ease",
    }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "12px" }}>
        <span style={{
          fontSize: "16px", fontWeight: 900, color: wt.mini.heading,
          fontFamily: "system-ui, sans-serif",
          transition: "color 500ms ease",
        }}>
          Projects
        </span>
        <span style={{
          fontSize: "6px", color: wt.mini.accent, letterSpacing: "0.2em",
          textTransform: "uppercase", fontFamily: "monospace",
          transition: "color 500ms ease",
        }}>
          Systems in Production
        </span>
      </div>

      {/* Project cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        {featured.map((p, i) => (
          <div key={i} style={{
            padding: "8px 10px", borderRadius: "7px",
            background: wt.mini.surface,
            border: `1px solid ${wt.mini.border}`,
            transition: "background 500ms ease, border-color 500ms ease",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3px" }}>
              <span style={{ fontSize: "9px", fontWeight: 800, color: wt.mini.heading, transition: "color 500ms ease" }}>
                {p.name}
              </span>
              <span style={{ fontSize: "5px", color: wt.mini.body, transition: "color 500ms ease" }}>→</span>
            </div>
            <p style={{ fontSize: "6px", color: wt.mini.body, lineHeight: 1.55, marginBottom: "5px", transition: "color 500ms ease" }}>
              {p.description.slice(0, 65)}…
            </p>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {p.tech.slice(0, 3).map((t, j) => (
                <span key={j} style={{
                  fontSize: "5px", padding: "1.5px 5px", borderRadius: "999px",
                  background: wt.mini.accentBg,
                  border: `1px solid ${wt.mini.accentBorder}`,
                  color: wt.mini.accent,
                  transition: "background 500ms ease, border-color 500ms ease, color 500ms ease",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
