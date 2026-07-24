import React from "react";

export default function MiniBrowser({ children, width = "100%", height = "100%", wt }) {
  if (!wt) return null;

  return (
    <div
      style={{
        width: width,
        height: height,
        background: wt.mini.bg,
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        boxShadow: wt.isDark ? "0 10px 30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)" : "0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${wt.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        pointerEvents: "auto", // Allow clicking inside
      }}
    >
      {/* Browser Chrome Header */}
      <div style={{
        height: "44px",
        background: wt.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
        borderBottom: `1px solid ${wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: "12px",
        flexShrink: 0
      }}>
        {/* Traffic Lights */}
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f" }} />
        </div>
        
        {/* Address Bar */}
        <div style={{
          flex: 1,
          height: "28px",
          background: wt.isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.5)",
          border: `1px solid ${wt.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          color: wt.isDark ? "#a1a1aa" : "#71717a",
          maxWidth: "400px",
          margin: "0 auto",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
        }}>
          shrivardhan.dev
        </div>
        
        <div style={{ width: "60px" }} /> {/* Spacer for balance */}
      </div>

      {/* Browser Content (Scrollable) */}
      <div
        className="mini-scroll custom-scrollbar"
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
