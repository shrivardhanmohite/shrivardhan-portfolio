import React from "react";
import { JOURNEY } from "../../../data/portfolioData";

export default function MiniJourney({ wt }) {
  if (!wt) return null;

  // For the compact layout, just show the most recent 2 milestones
  const recentJourney = JOURNEY.slice(0, 2);

  return (
    <div style={{ paddingTop: "16px", paddingBottom: "16px", borderTop: `1px solid ${wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
      <h2 style={{
        fontSize: "12px",
        fontWeight: 800,
        color: wt.text,
        marginBottom: "12px",
        letterSpacing: "-0.01em"
      }}>
        Journey
      </h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}>
        <div style={{ position: "absolute", left: "6px", top: "0", bottom: "0", width: "1px", background: wt.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
        
        {recentJourney.map((item, idx) => (
          <div key={idx} style={{ position: "relative", paddingLeft: "16px" }}>
            <div style={{
              position: "absolute",
              left: "4px",
              top: "4px",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: idx === 0 ? (wt.isDark ? "#60a5fa" : "#3b82f6") : (wt.isDark ? "#52525b" : "#a1a1aa"),
            }} />
            <h3 style={{ fontSize: "10px", fontWeight: 700, color: wt.text, marginBottom: "2px", whiteSpace: "pre-line" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "8px", lineHeight: 1.4, color: wt.isDark ? "#a1a1aa" : "#71717a", whiteSpace: "pre-line" }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
