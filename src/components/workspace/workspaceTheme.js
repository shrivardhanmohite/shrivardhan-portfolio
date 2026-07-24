/**
 * workspaceTheme.js
 * Single source of truth for all workspace theme tokens.
 * Returns correct values based on the active portfolio theme.
 * Used by all workspace scene components via useWorkspaceTheme().
 */
import { useTheme } from "../../context/ThemeContext";

export function useWorkspaceTheme() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return {
    isDark,

    /* ── 3D Material colours ── */
    desk: {
      color:     isDark ? "#1a1f2e" : "#c5bba8",
      roughness: isDark ? 0.75     : 0.88,
      metalness: isDark ? 0.15     : 0.04,
      edgeGlow:  isDark ? "#3b82f6": "#2563eb",
    },
    laptop: {
      color:     isDark ? "#16192a" : "#bfc5cf",
      roughness: isDark ? 0.20     : 0.30,
      metalness: isDark ? 0.85     : 0.72,
    },
    keyboard: {
      keyColor:  isDark ? "#0c0f1a" : "#d4d8e0",
      emissive:  isDark ? "#3b82f6" : "#2563eb",
    },
    screen: {
      backing:   isDark ? "#080f1f" : "#0a1020",
      emissive:  isDark ? "#1d4ed8" : "#2563eb",
      intensity: isDark ? 1.4      : 1.2,
    },

    /* ── Lighting ── */
    ambient: {
      intensity: isDark ? 0.65 : 1.5,
      color:     isDark ? "#a8b8d8" : "#fff5e8",
    },
    keyLight: {
      intensity: isDark ? 1.8 : 1.0,
      color:     isDark ? "#ffe8c8" : "#fff0d8",
    },
    screenLight: {
      primary:   isDark ? 4.2 : 2.5,
      secondary: isDark ? 2.2 : 1.4,
      color:     isDark ? "#4f8ef7" : "#60a5fa",
    },
    rimLight: {
      intensity: isDark ? 0.9 : 0.3,
      color:     isDark ? "#818cf8" : "#93c5fd",
    },

    /* ── CSS background for section ── */
    sectionBg: isDark
      ? "radial-gradient(ellipse 80% 60% at 50% 60%, #0f1827 0%, #0b0e1a 55%, #07090f 100%)"
      : "radial-gradient(ellipse 80% 60% at 50% 60%, #f0e8de 0%, #e8dfd4 55%, #dfd6cc 100%)",

    /* ── CSS grid overlay ── */
    gridColor: isDark
      ? "rgba(59,130,246,0.07)"
      : "rgba(0,0,0,0.045)",

    /* ── Floating particles ── */
    particles: {
      color:   isDark ? "#60a5fa" : "#2563eb",
      opacity: isDark ? 0.15      : 0.08,
    },

    /* ── Text colour (used by Mini* components) ── */
    text: isDark ? "#f1f5f9" : "#0f172a",

    /* ── Mini portfolio (HTML screen) ── */
    mini: {
      bg:          isDark ? "#070c18" : "#f0f4ff",
      surface:     isDark ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.04)",
      border:      isDark ? "rgba(255,255,255,0.09)"  : "rgba(0,0,0,0.08)",
      heading:     isDark ? "#f1f5f9" : "#0f172a",
      body:        isDark ? "#94a3b8" : "#475569",
      accent:      isDark ? "#60a5fa" : "#2563eb",
      accentBg:    isDark ? "rgba(59,130,246,0.14)" : "rgba(37,99,235,0.10)",
      accentBorder:isDark ? "rgba(59,130,246,0.28)" : "rgba(37,99,235,0.25)",
      liveColor:   isDark ? "rgba(96,165,250,0.85)"  : "rgba(37,99,235,0.85)",
    },
  };
}
