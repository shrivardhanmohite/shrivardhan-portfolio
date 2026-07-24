/**
 * Lighting.jsx — Phase 3
 * Theme-aware lighting with smooth lerp transitions for color and intensity.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWorkspaceTheme } from "../workspaceTheme";

export default function Lighting({ hovered, isMobile }) {
  const wt = useWorkspaceTheme();

  const ambientRef  = useRef();
  const keyRef      = useRef();
  const screen1Ref  = useRef();
  const screen2Ref  = useRef();
  const rimRef      = useRef();
  const bounceRef   = useRef();
  const fillRef     = useRef();

  // Color targets for lerping
  const cAmbient = useRef(new THREE.Color());
  const cKey     = useRef(new THREE.Color());
  const cScreen  = useRef(new THREE.Color());
  const cRim     = useRef(new THREE.Color());

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // ── Ambient Light ──
    if (ambientRef.current) {
      cAmbient.current.set(wt.ambient.color);
      ambientRef.current.color.lerp(cAmbient.current, 0.05);
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, wt.ambient.intensity, 0.05);
    }

    // ── Key Light ──
    if (keyRef.current) {
      cKey.current.set(wt.keyLight.color);
      keyRef.current.color.lerp(cKey.current, 0.05);
      keyRef.current.intensity = THREE.MathUtils.lerp(keyRef.current.intensity, wt.keyLight.intensity, 0.05);
    }

    // ── Screen Primary ──
    if (screen1Ref.current) {
      const base   = hovered ? wt.screenLight.primary * 1.4 : wt.screenLight.primary;
      const breath = Math.sin(t * 0.7) * (wt.isDark ? 0.25 : 0.1);
      cScreen.current.set(wt.screenLight.color);
      screen1Ref.current.color.lerp(cScreen.current, 0.05);
      screen1Ref.current.intensity = THREE.MathUtils.lerp(screen1Ref.current.intensity, base + breath, 0.1);
    }

    // ── Screen Secondary ──
    if (screen2Ref.current) {
      const base   = hovered ? wt.screenLight.secondary * 1.5 : wt.screenLight.secondary;
      const breath = Math.sin(t * 0.9 + 1) * (wt.isDark ? 0.15 : 0.05);
      screen2Ref.current.color.lerp(cScreen.current, 0.05); // shares color with primary
      screen2Ref.current.intensity = THREE.MathUtils.lerp(screen2Ref.current.intensity, base + breath, 0.1);
    }

    // ── Rim Light ──
    if (rimRef.current) {
      cRim.current.set(wt.rimLight.color);
      rimRef.current.color.lerp(cRim.current, 0.05);
      const targetIntensity = wt.rimLight.intensity + Math.sin(t * 0.4) * 0.15;
      rimRef.current.intensity = THREE.MathUtils.lerp(rimRef.current.intensity, targetIntensity, 0.05);
    }

    // ── Static Lights (simple intensity lerps for theme changes) ──
    if (bounceRef.current) {
      bounceRef.current.intensity = THREE.MathUtils.lerp(bounceRef.current.intensity, wt.isDark ? 0.7 : 0.4, 0.05);
    }
    if (fillRef.current) {
      fillRef.current.intensity = THREE.MathUtils.lerp(fillRef.current.intensity, wt.isDark ? 0.5 : 0.8, 0.05);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.65} color="#a8b8d8" />

      <directionalLight
        ref={keyRef}
        position={[4, 7, 5]}
        intensity={1.8}
        color="#ffe8c8"
        castShadow={!isMobile}
        shadow-mapSize={[isMobile ? 512 : 2048, isMobile ? 512 : 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.001}
      />

      <pointLight
        ref={screen1Ref}
        position={[0, 1.3, 1.8]}
        intensity={4.2}
        color="#4f8ef7"
        distance={7}
        decay={2}
      />

      {!isMobile && (
        <pointLight
          ref={screen2Ref}
          position={[0, 0.6, 2.2]}
          intensity={2.2}
          color="#3b82f6"
          distance={6}
          decay={2}
        />
      )}

      <pointLight
        ref={rimRef}
        position={[-4, 3.5, -2.5]}
        intensity={0.9}
        color="#818cf8"
        distance={10}
        decay={2}
      />

      {/* Warm desk bounce */}
      {!isMobile && (
        <pointLight
          ref={bounceRef}
          position={[0, 0.1, 1.5]}
          intensity={0.7}
          color="#fde8c8"
          distance={4}
          decay={2}
        />
      )}

      {/* Right-side fill */}
      {!isMobile && (
        <pointLight
          ref={fillRef}
          position={[4, 2, 1]}
          intensity={0.5}
          color="#c8d8f0"
          distance={8}
          decay={2}
        />
      )}
    </>
  );
}
