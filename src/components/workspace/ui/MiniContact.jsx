/**
 * MiniContact.jsx — Phase 3
 * Theme-aware mini contact section.
 */
import { CONTACT } from "../../../data/portfolioData";

export default function MiniContact({ width = 340, height = 220, wt }) {
  return (
    <div style={{
      width: typeof width === "number" ? `${width}px` : width, height: typeof height === "number" ? `${height}px` : height,
      padding: "24px", background: wt.mini.bg,
      boxSizing: "border-box", overflow: "hidden",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", position: "relative",
      transition: "background 500ms ease",
    }}>
      {/* Glow orb behind */}
      <div style={{
        position: "absolute", width: "120px", height: "120px",
        borderRadius: "50%", background: wt.mini.accentBg,
        filter: "blur(30px)", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)", pointerEvents: "none",
        transition: "background 500ms ease",
      }} />

      <p style={{
        fontSize: "7px", letterSpacing: "0.25em", color: wt.mini.accent,
        textTransform: "uppercase", marginBottom: "10px",
        fontFamily: "monospace", position: "relative",
        transition: "color 500ms ease",
      }}>
        Contact
      </p>

      <div style={{
        fontSize: "18px", fontWeight: 900, color: wt.mini.heading,
        marginBottom: "10px", lineHeight: 1.15,
        fontFamily: "system-ui, sans-serif", position: "relative",
        transition: "color 500ms ease",
      }}>
        Let's Build
        <br />
        <span style={{
          background: wt.isDark
            ? "linear-gradient(90deg, #60a5fa, #818cf8)"
            : "linear-gradient(90deg, #2563eb, #4f46e5)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Together
        </span>
      </div>

      <p style={{
        fontSize: "7px", color: wt.mini.body, maxWidth: "200px",
        lineHeight: 1.65, marginBottom: "18px", position: "relative",
        transition: "color 500ms ease",
      }}>
        Open to collaborations in AI infrastructure, LLM systems,
        and scalable backend engineering.
      </p>

      <div style={{
        display: "flex", gap: "8px", flexWrap: "wrap",
        justifyContent: "center", position: "relative",
      }}>
        {[
          { label: "Email",    href: `mailto:${CONTACT.email}` },
          { label: "GitHub",   href: CONTACT.github },
          { label: "LinkedIn", href: CONTACT.linkedin },
        ].map((link, i) => (
          <span key={i} style={{
            fontSize: "6.5px", padding: "3px 9px", borderRadius: "999px",
            border: `1px solid ${wt.mini.accentBorder}`,
            color: wt.mini.accent, fontWeight: 600,
            background: wt.mini.accentBg,
            transition: "background 500ms ease, border-color 500ms ease, color 500ms ease",
          }}>
            {link.label}
          </span>
        ))}
      </div>
    </div>
  );
}
