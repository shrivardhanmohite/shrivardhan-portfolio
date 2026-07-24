import React from "react";
import { HERO } from "../../../data/portfolioData";

export default function MiniFooter({ wt }) {
  if (!wt) return null;

  return (
    <div style={{
      padding: "12px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: `1px solid ${wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
      background: wt.isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.5)"
    }}>
      <div style={{ fontSize: "8px", color: wt.isDark ? "#a1a1aa" : "#71717a" }}>
        © {new Date().getFullYear()} {HERO.name}
      </div>
      
      <div style={{ display: "flex", gap: "8px", fontSize: "8px", color: wt.isDark ? "#a1a1aa" : "#71717a" }}>
        <a href={HERO.github} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>GitHub</a>
        <a href={HERO.linkedin} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>LinkedIn</a>
      </div>
    </div>
  );
}
