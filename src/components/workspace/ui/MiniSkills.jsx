/**
 * MiniSkills.jsx — Phase 3
 * Theme-aware mini skills grid.
 */
import { SKILLS } from "../../../data/portfolioData";

const ALL_SKILLS = [
  ...SKILLS.development.slice(0, 8),
  ...SKILLS.llm,
];

export default function MiniSkills({ width = 340, height = 220, wt }) {
  return (
    <div style={{
      width: typeof width === "number" ? `${width}px` : width, height: typeof height === "number" ? `${height}px` : height,
      padding: "24px", background: wt.mini.bg,
      boxSizing: "border-box", overflow: "hidden",
      transition: "background 500ms ease",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "14px" }}>
        <span style={{
          fontSize: "16px", fontWeight: 900, color: wt.mini.heading,
          fontFamily: "system-ui, sans-serif",
          transition: "color 500ms ease",
        }}>
          Stack
        </span>
        <span style={{
          fontSize: "6px", color: wt.mini.accent, letterSpacing: "0.2em",
          textTransform: "uppercase", fontFamily: "monospace",
          transition: "color 500ms ease",
        }}>
          Systems Toolkit
        </span>
      </div>

      {/* Skill grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px",
      }}>
        {ALL_SKILLS.map((skill, i) => (
          <div key={i} style={{
            padding: "5px 4px", borderRadius: "5px", textAlign: "center",
            background: wt.mini.surface,
            border: `1px solid ${wt.mini.border}`,
            fontSize: "6.5px", color: wt.mini.body,
            fontWeight: i < 4 ? 600 : 400,
            transition: "background 500ms ease, border-color 500ms ease, color 500ms ease",
          }}>
            {skill}
          </div>
        ))}
      </div>

      {/* LLM badge row */}
      <div style={{ marginTop: "12px", display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {SKILLS.llm.map((s, i) => (
          <span key={i} style={{
            fontSize: "6px", padding: "2px 7px", borderRadius: "999px",
            background: wt.mini.accentBg,
            border: `1px solid ${wt.mini.accentBorder}`,
            color: wt.mini.accent, fontWeight: 600,
            transition: "background 500ms ease, border-color 500ms ease, color 500ms ease",
          }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
