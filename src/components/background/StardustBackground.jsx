import { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

// --- Configuration ---
const CONFIG = {
  // Adaptive limits based on estimated hardware tier
  maxParticles: {
    mobile: 600,
    tablet: 1200,
    desktopStandard: 2000,
    desktopHighEnd: 3000,
  },
  // Interaction physics
  scrollEase: 0.05,       // How quickly velocity returns to normal
  warpThreshold: 10,      // Scroll velocity needed to trigger stretch
  mouseEase: 0.02,        // How quickly mouse parallax tracks
  maxParallax: 20,        // Max pixels of shift from mouse
};

export default function StardustBackground() {
  const canvasRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  // Use refs to avoid React renders during animation loop
  const state = useRef({
    particles: [],
    width: 0,
    height: 0,
    scrollVelocity: 0,
    lastScrollY: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    dpr: 1,
    isDark: true,
    offscreenCanvas: null,
    reduceMotion: false,
    isActive: true,
    animationFrame: null,
  });

  useEffect(() => {
    state.current.isDark = theme === "dark";
    // We recreate the offscreen canvas when theme changes so particles swap colors
    createOffscreenParticle(state.current);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Opaque background for performance
    
    // Check user preferences
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    state.current.reduceMotion = motionQuery.matches;
    
    // Setup environment
    handleResize();
    initParticles();
    createOffscreenParticle(state.current);

    // Event Listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", e => state.current.reduceMotion = e.matches);

    // Start loop
    state.current.lastScrollY = window.scrollY;
    state.current.isActive = !document.hidden;
    if (state.current.isActive) {
      loop();
    }

    function handleResize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      
      state.current.width = w;
      state.current.height = h;
      state.current.dpr = dpr;
      
      // Don't re-init all particles on every tiny resize, but we can if major layout shifts
    }

    function handleScroll() {
      const currentY = window.scrollY;
      const delta = currentY - state.current.lastScrollY;
      state.current.scrollVelocity += delta * 0.1; // Accumulate velocity
      state.current.lastScrollY = currentY;
    }

    function handleMouseMove(e) {
      // Normalize mouse to -1 to 1 from center
      state.current.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      state.current.targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }

    function handleVisibility() {
      state.current.isActive = !document.hidden;
      if (state.current.isActive) {
        state.current.lastScrollY = window.scrollY; // Reset to avoid jump
        loop();
      } else if (state.current.animationFrame) {
        cancelAnimationFrame(state.current.animationFrame);
      }
    }

    function determineParticleCount() {
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024;
      const threads = navigator.hardwareConcurrency || 4;
      
      if (isMobile) return CONFIG.maxParticles.mobile;
      if (isTablet) return CONFIG.maxParticles.tablet;
      if (threads >= 8) return CONFIG.maxParticles.desktopHighEnd;
      return CONFIG.maxParticles.desktopStandard;
    }

    function initParticles() {
      const count = determineParticleCount();
      const particles = [];
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Use a grid-based jitter approach for Poisson-like distribution
      // Expand the grid to 4x the screen size so it fills the screen at depth z=2
      const virtualW = w * 4;
      const virtualH = h * 4;
      const columns = Math.ceil(Math.sqrt(count * (virtualW / virtualH)));
      const rows = Math.ceil(count / columns);
      const cellW = virtualW / columns;
      const cellH = virtualH / rows;

      let p = 0;
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          if (p >= count) break;
          
          const z = Math.random() * 2; // Depth from 0 to 2
          const isTwinkling = Math.random() < 0.04; // ~4% twinkle
          
          particles.push({
            // Coordinate origin is center (0,0)
            x: -virtualW / 2 + i * cellW + Math.random() * cellW,
            y: -virtualH / 2 + j * cellH + Math.random() * cellH,
            z: z,
            // Layer-based sizing & opacity calculated from base
            baseSize: 0.8 + Math.random() * 2.0, // Increased size slightly
            baseOpacity: 0.3 + Math.random() * 0.7, // Increased brightness
            // Physics
            vz: 0.003 + Math.random() * 0.004, // Increased base forward speed
            // Twinkle
            isTwinkling,
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.01 + Math.random() * 0.02,
          });
          p++;
        }
      }
      state.current.particles = particles;
    }

    function loop() {
      if (!state.current.isActive) return;
      
      const st = state.current;
      const w = st.width;
      const h = st.height;
      const dpr = st.dpr;
      const isDark = st.isDark;

      // Physics integration
      if (!st.isDark) {
        // Skip canvas physics in light mode (we use CSS grid instead)
        st.animationFrame = requestAnimationFrame(loop);
        return;
      }

      if (!st.reduceMotion) {
        // Smooth scroll velocity decay
        st.scrollVelocity += (0 - st.scrollVelocity) * CONFIG.scrollEase;
        // Smooth mouse track
        st.mouseX += (st.targetMouseX - st.mouseX) * CONFIG.mouseEase;
        st.mouseY += (st.targetMouseY - st.mouseY) * CONFIG.mouseEase;
      } else {
        st.scrollVelocity = 0;
        st.mouseX = 0;
        st.mouseY = 0;
      }

      // Draw background (trailing effect logic)
      const absVel = Math.abs(st.scrollVelocity);
      const isWarping = absVel > CONFIG.warpThreshold;
      
      // If warping, use a slightly transparent clear to create trails
      if (isWarping && !st.reduceMotion) {
        ctx.fillStyle = "rgba(3, 5, 10, 0.4)";
        ctx.fillRect(0, 0, w * dpr, h * dpr);
      } else {
        ctx.fillStyle = "#03050A";
        ctx.fillRect(0, 0, w * dpr, h * dpr);
      }

      // Draw particles
      const osCanvas = st.offscreenCanvas;
      if (osCanvas) {
        for (let i = 0; i < st.particles.length; i++) {
          const p = st.particles[i];
          
          if (!st.reduceMotion) {
            // Base drift + scroll warp (subtract from Z to move towards camera)
            const scrollShift = st.scrollVelocity * 0.01; // Drastically increased scroll multiplier
            p.z -= (p.vz + scrollShift);
            
            // Screen wrap (respawn behind or in front)
            if (p.z <= 0.01) {
              p.z += 2;
              p.x = (Math.random() - 0.5) * w * 4;
              p.y = (Math.random() - 0.5) * h * 4;
            } else if (p.z > 2.01) {
              p.z -= 2;
              p.x = (Math.random() - 0.5) * w * 4;
              p.y = (Math.random() - 0.5) * h * 4;
            }
          }

          // Twinkling
          let opacity = p.baseOpacity;
          if (p.isTwinkling && !st.reduceMotion) {
            p.twinklePhase += p.twinkleSpeed;
            // Modulate opacity by +/- 40%
            opacity = p.baseOpacity * (1 + Math.sin(p.twinklePhase) * 0.4);
          }

          // Fade out far away (z > 1.5) and near camera (z < 0.1)
          const zFade = p.z > 1.5 ? Math.max(0, 2.0 - p.z) * 2 : 1.0;
          const nearFade = p.z < 0.1 ? p.z * 10 : 1.0;
          opacity = Math.min(1, opacity * zFade * nearFade);

          // Projected 3D coordinates
          const drawSize = p.baseSize / p.z;
          const cx = (w / 2) - (st.mouseX * CONFIG.maxParallax);
          const cy = (h / 2) - (st.mouseY * CONFIG.maxParallax);
          const px = cx + (p.x / p.z);
          const py = cy + (p.y / p.z);

          // Cull off-screen particles to save draw calls
          if (px < -100 || px > w + 100 || py < -100 || py > h + 100) continue;

          // Warp stretching radially from center
          let drawW = drawSize;
          let drawH = drawSize;
          let angle = 0;
          if (isWarping && !st.reduceMotion) {
            drawH = drawSize * (1 + (absVel * 0.05 / p.z));
            opacity = Math.min(1, opacity * 1.5); // Brighter during warp
            angle = Math.atan2(py - cy, px - cx) + Math.PI / 2;
          }

          // Fast blit
          ctx.globalAlpha = Math.max(0, opacity);
          
          if (isWarping && !st.reduceMotion) {
            ctx.save();
            ctx.translate(px * dpr, py * dpr);
            ctx.rotate(angle);
            ctx.drawImage(
              osCanvas, 
              (-drawW / 2) * dpr, 
              (-drawH / 2) * dpr, 
              drawW * dpr, 
              drawH * dpr
            );
            ctx.restore();
          } else {
            ctx.drawImage(
              osCanvas, 
              (px - drawW / 2) * dpr, 
              (py - drawH / 2) * dpr, 
              drawW * dpr, 
              drawH * dpr
            );
          }
        }
        ctx.globalAlpha = 1.0;
      }

      st.animationFrame = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", e => state.current.reduceMotion = e.matches);
      if (state.current.animationFrame) {
        cancelAnimationFrame(state.current.animationFrame);
      }
    };
  }, []); // Run once

  // Renders the glowing dot to an offscreen canvas for extremely fast drawImage calls
  function createOffscreenParticle(state) {
    const dpr = state.dpr || 1;
    const canvas = document.createElement("canvas");
    const size = 32 * dpr; // Draw large, scale down during drawImage for smooth interpolation
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    
    if (state.isDark) {
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(214, 236, 255, 0.95)");
      gradient.addColorStop(0.5, "rgba(165, 216, 255, 0.5)");
      gradient.addColorStop(1, "rgba(96, 165, 250, 0)");
    } else {
      // Light theme: faint blue stardust
      gradient.addColorStop(0, "rgba(96, 165, 250, 0.8)");
      gradient.addColorStop(0.4, "rgba(96, 165, 250, 0.2)");
      gradient.addColorStop(1, "rgba(96, 165, 250, 0)");
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center, center, center, 0, Math.PI * 2);
    ctx.fill();

    state.offscreenCanvas = canvas;
  }

  // --- Aurora Edge Illumination CSS ---
  // A pseudo-element approach to render the massive soft gradients without Canvas overhead
  const edgeGlowStyle = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 1, // Above canvas, below content
    opacity: theme === "dark" ? 0.7 : 0.85,
    mixBlendMode: theme === "dark" ? "screen" : "multiply",
    background: theme === "dark" ? `
      radial-gradient(ellipse 80% 50% at 20% -20%, rgba(16, 185, 129, 0.3) 0%, transparent 70%),
      radial-gradient(ellipse 60% 60% at 80% 120%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
      radial-gradient(ellipse 70% 60% at -10% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 60%),
      radial-gradient(ellipse 80% 60% at 110% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 60%)
    ` : `
      radial-gradient(ellipse at 0% 0%, rgba(96,165,250,0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 0%, rgba(125,211,252,0.1) 0%, transparent 50%)
    `,
    animation: "breathing-glow 8s ease-in-out infinite alternate",
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ background: theme === "dark" ? "#03050A" : "#F4EFEA" }}>
      <style>{`
        @keyframes breathing-glow {
          0% { opacity: 0.95; }
          100% { opacity: 1.05; }
        }
      `}</style>
      
      {theme === "dark" ? (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-100" />
          <div style={edgeGlowStyle} />
        </>
      ) : (
        <div className="absolute inset-0 ai-grid-light opacity-60" />
      )}
    </div>
  );
}
