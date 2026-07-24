import React from "react";
import { HERO } from "../../../data/portfolioData";

export default function MiniNavbar({ wt }) {
  if (!wt) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 24px",
        borderBottom: `1px solid ${wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`
      }}
    >
      <div style={{ fontSize: "10px", fontWeight: 800, color: wt.text, letterSpacing: "-0.02em" }}>
        {HERO.name.toUpperCase()}
      </div>
      <div style={{ display: "flex", gap: "12px", fontSize: "8px", fontWeight: 500, color: wt.isDark ? "#a1a1aa" : "#71717a" }}>
        <span style={{ cursor: "pointer" }}>About</span>
        <span style={{ cursor: "pointer" }}>Projects</span>
        <span style={{ cursor: "pointer" }}>Contact</span>
      </div>
    </div>
  );
}
