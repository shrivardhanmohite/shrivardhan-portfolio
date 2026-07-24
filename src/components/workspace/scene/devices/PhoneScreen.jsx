import { useWorkspaceTheme } from "../../workspaceTheme";
import BaseScreen from "../BaseScreen";
/* ── Virtual iframe resolution for Mobile ── */
const VIRTUAL_W = 390;
const VIRTUAL_H = 760;

export default function PhoneScreen({
  hovered,
  isVisible,
  screenW,
  screenH,
  interactionState,
  setInteractionState
}) {
  const wt = useWorkspaceTheme();

  return (
    <BaseScreen
      hovered={hovered}
      isVisible={isVisible}
      screenW={screenW}
      screenH={screenH}
      virtualW={VIRTUAL_W}
      virtualH={VIRTUAL_H}
      interactionState={interactionState}
      borderRadius="1.8rem" // More rounded for mobile
      paddingTop={0}
      scaleFactor={1.0}
      distanceFactor={400}
      exactViewportMapping
      debugLabel="PhoneScreen"
    >
      {/* ── Native Mobile Header (Only visible in interactive mode) ── */}
      {interactionState === "interactive" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "76px",
            padding: "8px 16px",
            paddingTop: "36px",
            background: wt.isDark ? "rgba(15, 23, 42, 0.75)" : "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: `1px solid ${wt.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          {/* Subtle drag handle */}
          <div 
            style={{ 
              width: "36px", 
              height: "4px", 
              borderRadius: "2px", 
              background: wt.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
              marginBottom: "12px"
            }} 
          />
          
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ 
              fontSize: "12px", 
              fontWeight: 600, 
              color: wt.isDark ? "#94a3b8" : "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Interactive Mode
            </span>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setInteractionState("mirror");
              }}
              style={{
                background: wt.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                border: "none",
                borderRadius: "100px",
                padding: "6px 12px",
                color: wt.isDark ? "#fff" : "#000",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = wt.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = wt.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* ── Real Webpage Iframe ── */}
      <iframe
        src={typeof window !== "undefined" ? window.location.origin + "/" : "/"}
        title="Portfolio Mobile"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
          pointerEvents: interactionState === "interactive" ? "auto" : "none",
        }}
      />
    </BaseScreen>
  );
}
