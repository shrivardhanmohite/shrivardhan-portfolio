/**
 * Phone.jsx — Phase 3
 * Premium flagship smartphone device geometry for mobile users.
 */
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import PhoneScreen from "./PhoneScreen";
import { useWorkspaceTheme } from "../../workspaceTheme";

const PHONE_W = 1.4;
const PHONE_H = 2.55;
const PHONE_D = 0.08;
const PHONE_SCENE_SCALE = 0.82;
const PHONE_VIEWPORT_W = 390;
const PHONE_VIEWPORT_H = 760;

const SCREEN_W = PHONE_W - 0.12;
const SCREEN_H = PHONE_H - 0.12;

export default function Phone({ sectionProgress, isVisible, interactionState, setInteractionState }) {
  const wt = useWorkspaceTheme();
  const groupRef = useRef();
  const glowBorderRef = useRef();
  
  const [hovered, setHovered] = useState(false);

  // Colours for lerping
  const targetBodyColor = useRef(new THREE.Color(wt.isDark ? "#11141c" : "#e2e6eb"));
  const targetGlowColor = useRef(new THREE.Color(wt.isDark ? "#3b82f6" : "#2563eb"));

  const isInteractive = interactionState === "interactive";

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Glow border animation
    if (glowBorderRef.current) {
      const target = isInteractive ? 3.5 : (hovered ? 2.5 : 0.65);
      const pulse = Math.sin(t * (isInteractive ? 2.0 : 1.2)) * (hovered || isInteractive ? 0.3 : 0.06);
      const current = glowBorderRef.current.material.emissiveIntensity;
      glowBorderRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(current, target + pulse, 0.1);

      targetGlowColor.current.set(wt.isDark ? "#3b82f6" : "#2563eb");
      glowBorderRef.current.material.emissive.lerp(targetGlowColor.current, 0.05);
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "default";
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (interactionState !== "interactive") {
      setInteractionState("interactive");
    }
  };

  return (
    <group 
      ref={groupRef}
      position={[0, (PHONE_H * PHONE_SCENE_SCALE) / 2 + 0.2, 0]}
      rotation={[-0.25, 0, 0]}
      scale={PHONE_SCENE_SCALE}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* ── Phone Body (Aluminum Frame) ── */}
      <RoundedBox 
        args={[PHONE_W, PHONE_H, PHONE_D]} 
        radius={0.15} 
        smoothness={6}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={wt.isDark ? "#1f2533" : "#d1d5db"} 
          roughness={0.4} 
          metalness={0.8}
        />
      </RoundedBox>

      {/* ── Glass Back ── */}
      <RoundedBox 
        args={[PHONE_W - 0.02, PHONE_H - 0.02, PHONE_D + 0.01]} 
        radius={0.14} 
        smoothness={6}
        position={[0, 0, -0.001]}
      >
        <meshStandardMaterial 
          color={wt.isDark ? "#0f1219" : "#e5e7eb"} 
          roughness={0.1} 
          metalness={0.9}
        />
      </RoundedBox>

      {/* ── Camera Island ── */}
      <group position={[-0.3, PHONE_H / 2 - 0.35, -PHONE_D / 2 - 0.02]}>
        <RoundedBox args={[0.45, 0.5, 0.04]} radius={0.1} smoothness={4} castShadow>
          <meshStandardMaterial color={wt.isDark ? "#171a23" : "#cbd5e1"} roughness={0.3} metalness={0.7} />
        </RoundedBox>
        {/* Lenses */}
        <mesh position={[0, 0.12, -0.02]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
          <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
        </mesh>
        <mesh position={[0, -0.12, -0.02]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
          <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
        </mesh>
      </group>

      {/* ── Front Bezel (Glass) ── */}
      <mesh position={[0, 0, PHONE_D / 2 + 0.001]}>
        <planeGeometry args={[PHONE_W - 0.02, PHONE_H - 0.02]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* ── Dynamic Island (Front Camera Notch) ── */}
      <mesh position={[0, PHONE_H / 2 - 0.18, PHONE_D / 2 + 0.008]}>
        <capsuleGeometry args={[0.025, 0.15, 4, 16]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
      </mesh>

      {/* Hover glow border underneath screen */}
      <mesh ref={glowBorderRef} position={[0, 0, PHONE_D / 2 + 0.002]}>
        <planeGeometry args={[PHONE_W + 0.02, PHONE_H + 0.02]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#3b82f6"
          emissiveIntensity={0.65}
          transparent
          opacity={0.24}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* PhoneScreen (screen content + Html overlay + mobile UI) */}
      <group position={[0, 0, PHONE_D / 2 + 0.006]}>
        <PhoneScreen
          hovered={hovered || interactionState === "interactive"}
          isVisible={isVisible}
          screenW={SCREEN_W}
          screenH={SCREEN_H}
          interactionState={interactionState}
          setInteractionState={setInteractionState}
        />
      </group>
    </group>
  );
}
