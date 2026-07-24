/**
 * useWorkspaceScroll.js
 * Provides normalised scroll progress values for the workspace.
 *
 * Returns:
 *  scrollYProgress  – raw MotionValue (0 → 1 over the full page)
 *  sectionProgress  – derived MotionValue mapping page scroll to MiniPortfolio
 *                     section index (0 = Hero, 1 = Projects, 2 = Skills, 3 = Contact)
 */
import { useRef, useLayoutEffect } from "react";
import { useScroll, useTransform } from "framer-motion";

export function useWorkspaceScroll() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    containerRef.current = document.getElementById("main-scroll");
  }, []);

  const { scrollYProgress } = useScroll({ container: containerRef });

  // Map global scroll progress to which mini section is active (0-3)
  // Hero   : 0.00 – 0.20
  // Projects: 0.20 – 0.45
  // Skills : 0.45 – 0.65
  // Contact: 0.65 – 1.00
  const sectionProgress = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.65, 1.0],
    [0,   0,    1,    2,   3]
  );

  return { scrollYProgress, sectionProgress };
}
