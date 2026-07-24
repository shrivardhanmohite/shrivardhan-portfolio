import React from "react";
import { SKILLS } from "../../../data/portfolioData";

export default function MiniSkills({ wt }) {
  if (!wt) return null;

  // Flatten the skills object for a simpler display in the mini portfolio
  // We only grab a few to save space
  const featuredSkills = [
    ...SKILLS.development.slice(0, 4),
    ...SKILLS.llm.slice(0, 3)
  ];

  return (
    <div style={{ paddingTop: "16px", paddingBottom: "16px", borderTop: `1px solid ${wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
      <h2 style={{
        fontSize: "12px",
        fontWeight: 800,
        color: wt.text,
        marginBottom: "12px",
        letterSpacing: "-0.01em"
      }}>
        Technical Arsenal
      </h2>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {featuredSkills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div key={i} style={{
              background: wt.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              border: `1px solid ${wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
              padding: "6px 8px",
              borderRadius: "4px",
              fontSize: "9px",
              fontWeight: 500,
              color: wt.text,
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <Icon style={{ color: wt.isDark ? "#60a5fa" : "#3b82f6" }} />
              {skill.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
