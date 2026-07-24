import React from "react";
import { PROJECTS } from "../../../data/portfolioData";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function MiniProjects({ wt }) {
  if (!wt) return null;

  // For the compact layout, maybe only show the first 2 projects to save space
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <div style={{ paddingTop: "16px", paddingBottom: "16px", borderTop: `1px solid ${wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
      <h2 style={{
        fontSize: "12px",
        fontWeight: 800,
        color: wt.text,
        marginBottom: "12px",
        letterSpacing: "-0.01em"
      }}>
        Featured Projects
      </h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {featuredProjects.map((project, idx) => (
          <div key={idx} style={{
            background: wt.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
            border: `1px solid ${wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            borderRadius: "6px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h3 style={{ fontSize: "11px", fontWeight: 700, color: wt.text }}>
                {project.name}
              </h3>
              <div style={{ display: "flex", gap: "6px" }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" style={{ color: wt.isDark ? "#a1a1aa" : "#71717a" }}>
                    <FiGithub size={10} />
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" style={{ color: wt.isDark ? "#a1a1aa" : "#71717a" }}>
                    <FiExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
            
            <p style={{ fontSize: "9px", lineHeight: 1.4, color: wt.isDark ? "#a1a1aa" : "#71717a" }}>
              {project.description}
            </p>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "2px" }}>
              {project.tech.map((tech, i) => (
                <span key={i} style={{
                  fontSize: "8px",
                  fontWeight: 600,
                  color: wt.isDark ? "#60a5fa" : "#3b82f6",
                  background: wt.isDark ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.1)",
                  padding: "3px 6px",
                  borderRadius: "3px"
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
