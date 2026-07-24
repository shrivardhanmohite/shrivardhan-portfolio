import React from "react";
import { CONTACT } from "../../../data/portfolioData";
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

export default function MiniContact({ wt }) {
  if (!wt) return null;

  return (
    <div style={{ paddingTop: "16px", paddingBottom: "24px", borderTop: `1px solid ${wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
      <h2 style={{
        fontSize: "12px",
        fontWeight: 800,
        color: wt.text,
        marginBottom: "12px",
        letterSpacing: "-0.01em"
      }}>
        Contact
      </h2>
      
      <div style={{ display: "flex", gap: "10px" }}>
        <a href={`mailto:${CONTACT.email}`} style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "24px", height: "24px", borderRadius: "50%",
          background: wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          color: wt.text
        }}>
          <FiMail size={12} />
        </a>
        <a href={CONTACT.github} target="_blank" rel="noreferrer" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "24px", height: "24px", borderRadius: "50%",
          background: wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          color: wt.text
        }}>
          <FiGithub size={12} />
        </a>
        <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "24px", height: "24px", borderRadius: "50%",
          background: wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          color: wt.text
        }}>
          <FiLinkedin size={12} />
        </a>
        <a href={CONTACT.twitter} target="_blank" rel="noreferrer" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "24px", height: "24px", borderRadius: "50%",
          background: wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          color: wt.text
        }}>
          <FiTwitter size={12} />
        </a>
      </div>
    </div>
  );
}
