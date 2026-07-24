import React from "react";
import { HERO } from "../../../data/portfolioData";
import { FiArrowRight } from "react-icons/fi";

export default function MiniHero({ wt }) {
  if (!wt) return null;

  return (
    <div style={{ paddingTop: "24px", paddingBottom: "24px" }}>
      <div style={{ marginBottom: "16px" }}>
        <p style={{
          color: wt.isDark ? "#60a5fa" : "#3b82f6",
          fontSize: "8px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: "8px"
        }}>
          {HERO.subtitle}
        </p>
        <h1 style={{
          fontSize: "18px",
          fontWeight: 900,
          lineHeight: 1.1,
          color: wt.text,
          marginBottom: "8px",
          letterSpacing: "-0.02em"
        }}>
          <span style={{ display: "block" }}>{HERO.heading[0]}</span>
          <span style={{ display: "block", color: wt.isDark ? "#60a5fa" : "#3b82f6" }}>{HERO.heading[1]}</span>
          <span style={{ display: "block" }}>{HERO.heading[2]}</span>
        </h1>
        <p style={{
          fontSize: "10px",
          lineHeight: 1.5,
          color: wt.isDark ? "#a1a1aa" : "#71717a",
          maxWidth: "280px"
        }}>
          {HERO.description}
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <a 
          href={HERO.linkedin}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "6px 12px",
            background: wt.isDark ? "#3b82f6" : "#2563eb",
            color: "#ffffff",
            borderRadius: "6px",
            fontSize: "9px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
            boxShadow: wt.isDark ? "0 0 10px rgba(59,130,246,0.2)" : "0 4px 10px rgba(37,99,235,0.2)"
          }}
        >
          LinkedIn <FiArrowRight size={10} />
        </a>
        <a 
          href={HERO.github}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "6px 12px",
            background: "transparent",
            color: wt.text,
            border: `1px solid ${wt.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
            borderRadius: "6px",
            fontSize: "9px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none"
          }}
        >
          GitHub <FiArrowRight size={10} />
        </a>
      </div>
    </div>
  );
}
