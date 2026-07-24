/**
 * useResponsiveDevice.js
 * Tracks viewport size to determine the active device architecture (desktop/mobile).
 */
import { useState, useEffect } from "react";

export function useResponsiveDevice() {
  const [device, setDevice] = useState("laptop");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    
    const handleChange = (e) => {
      setDevice(e.matches ? "phone" : "laptop");
    };

    // Initial check
    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { device, isMobile: device === "phone" };
}
