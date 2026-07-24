import React from "react";
import MiniBrowser from "./MiniBrowser";
import MiniNavbar from "./MiniNavbar";
import MiniHero from "./MiniHero";
import MiniProjects from "./MiniProjects";
import MiniSkills from "./MiniSkills";
import MiniJourney from "./MiniJourney";
import MiniContact from "./MiniContact";
import MiniFooter from "./MiniFooter";

export default function MiniPortfolio({
  width = "100%",
  height = "100%",
  wt
}) {
  if (!wt) return null;

  return (
    <MiniBrowser width={width} height={height} wt={wt}>
      <iframe
        src={typeof window !== "undefined" ? window.location.origin + "/" : "/"}
        title="Portfolio Desktop"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
          pointerEvents: "auto", // Ensure iframe handles scroll/clicks
        }}
      />
    </MiniBrowser>
  );
}
