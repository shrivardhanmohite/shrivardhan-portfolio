/**
 * Laptop.jsx — Phase 3
 *
 * Critical fix: LID_ANGLE changed from −108° to −30°.
 *
 * At −108°: screen normal = [0, +0.951, −0.309]  → screen faces UP + backward
 *           (nearly edge-on from camera, screen invisible)
 *
 * At −30°:  screen normal = [0, +0.500, +0.866]  → screen faces FORWARD + slightly up
 *           (natural open laptop at 120° from base plane, screen clearly visible)
 *
 * Theme integration: laptop body, keyboard, trackpad, glow colours all respond
 * to the active theme. Material refs are lerped in useFrame for smooth transitions.
 */
import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring } from "framer-motion";
import MonitorScreen from "../MonitorScreen";
import { useWorkspaceTheme } from "../../workspaceTheme";

/* ── Dimensions (same as Phase 2, 35% larger than Phase 1) ── */
const BASE_W = 3.6;
const BASE_H = 0.065;
const BASE_D = 2.4;

const LID_W  = 3.56;
const LID_H  = 2.25;
const LID_D  = 0.048;

/*
 * LID_ANGLE FIX — was -Math.PI * (108/180) = −1.885 rad
 *
 * At the old angle: Rx(−108°) maps the screen normal [0,0,1] to [0,+0.951,−0.309].
 * The +Z face of the lid (where the screen lives) was pointing mostly UPWARD and
 * BACKWARD — nearly invisible from the camera at [1.6, 1.55, 3.2].
 *
 * Correct angle for a laptop open at 120° from the base plane:
 *   angle_from_base = 90° + |LID_ANGLE_degrees|
 *   120° = 90° + 30°  →  LID_ANGLE = −30°
 *
 * At −30°: Rx(−30°) maps [0,0,1] → [0, sin(30°), cos(30°)] = [0, 0.5, 0.866].
 * Screen faces forward (+Z) with a gentle upward tilt — correct for a laptop.
 */
const LID_ANGLE = -Math.PI * (30 / 180);   // ← was −108°, now −30°

const LID_PIVOT_Y = BASE_H / 2;
const LID_PIVOT_Z = -BASE_D / 2;
const LID_LOCAL_Y = LID_H / 2;

const SCREEN_W = LID_W - 0.18;
const SCREEN_H = LID_H - 0.22;

export default function Laptop({ onHoverChange, onClickLaptop, sectionProgress, isVisible, interactionState, setInteractionState, isMobile }) {
  const wt             = useWorkspaceTheme();
  const laptopRootRef  = useRef();
  const lidGroupRef    = useRef();
  const glowBorderRef  = useRef();
  const bodyMatRef     = useRef();
  const [hovered, setHovered] = useState(false);

  // Colours for lerping
  const targetBodyColor = useRef(new THREE.Color(wt.laptop.color));
  const targetGlowColor = useRef(new THREE.Color(wt.isDark ? "#3b82f6" : "#2563eb"));

  // Premium cinematic spring animation for physical poses
  const isInteractive = interactionState === "interactive";
  
  const poseSpring = useSpring(isInteractive ? 1 : 0, {
    stiffness: 65,
    damping: 15,
    mass: 1.2,
    restDelta: 0.0001
  });

  useEffect(() => {
    poseSpring.set(isInteractive ? 1 : 0);
  }, [isInteractive, poseSpring]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 1. Animate physical poses using the framer-motion spring
    const poseT = poseSpring.get(); // 0 = idle, 1 = interactive
    
    if (laptopRootRef.current) {
      // Idle: cinematic off-axis angle. Interactive: perfectly centered.
      // Yaw: angled left slightly. Roll: tiny tilt.
      const targetYaw  = THREE.MathUtils.lerp(-0.18, 0, poseT);
      const targetRoll = THREE.MathUtils.lerp(-0.02, 0, poseT);
      laptopRootRef.current.rotation.y = targetYaw;
      laptopRootRef.current.rotation.z = targetRoll;
    }

    if (lidGroupRef.current) {
      // Idle: -30 deg. Interactive: tilts slightly backwards to -42 deg
      const hingeIdle = -Math.PI * (30 / 180);
      const hingeInteractive = -Math.PI * (42 / 180);
      lidGroupRef.current.rotation.x = THREE.MathUtils.lerp(hingeIdle, hingeInteractive, poseT);
    }

    // Lerp body material colour on theme change
    if (bodyMatRef.current) {
      targetBodyColor.current.set(wt.laptop.color);
      bodyMatRef.current.color.lerp(targetBodyColor.current, 0.05);
    }

    // Glow border animation + theme-aware colour
    if (glowBorderRef.current) {
      const isInteractive = interactionState === "interactive";
      const target  = isInteractive ? 3.5 : (hovered ? 2.5 : 0.65);
      const pulse   = Math.sin(t * (isInteractive ? 2.0 : 1.2)) * (hovered || isInteractive ? 0.3 : 0.06);
      const current = glowBorderRef.current.material.emissiveIntensity;
      glowBorderRef.current.material.emissiveIntensity =
        THREE.MathUtils.lerp(current, target + pulse, 0.1);

      targetGlowColor.current.set(wt.isDark ? "#3b82f6" : "#2563eb");
      glowBorderRef.current.material.emissive.lerp(targetGlowColor.current, 0.05);
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    onHoverChange?.(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    onHoverChange?.(false);
    document.body.style.cursor = "default";
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (interactionState !== "interactive") {
      onClickLaptop?.();
    }
  };

  const screenGroupZ = LID_D / 2 + 0.002;

  return (
    <group
      ref={laptopRootRef}
      position={[0, 0, 0.1]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* ── Base body ── */}
      <mesh position={[0, BASE_H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[BASE_W, BASE_H, BASE_D]} />
        <meshStandardMaterial
          ref={bodyMatRef}
          color={wt.laptop.color}
          roughness={wt.laptop.roughness}
          metalness={wt.laptop.metalness}
        />
      </mesh>

      {/* Keyboard deck */}
      <mesh position={[0, BASE_H + 0.0005, 0.18]}>
        <boxGeometry args={[BASE_W * 0.87, 0.003, BASE_D * 0.72]} />
        <meshStandardMaterial
          color={wt.isDark ? "#0d1020" : "#b8bfcc"}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Keyboard */}
      <KeyboardKeys wt={wt} />

      {/* Trackpad */}
      <mesh position={[0, BASE_H + 0.002, 0.72]} receiveShadow>
        <boxGeometry args={[0.9, 0.003, 0.55]} />
        <meshStandardMaterial
          color={wt.isDark ? "#0f121e" : "#c4cad8"}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* Hinge cylinders */}
      {[-1.3, 0, 1.3].map((x, i) => (
        <mesh key={i} position={[x, BASE_H, LID_PIVOT_Z + 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.032, 0.032, 0.18, 12]} />
          <meshStandardMaterial
            color={wt.isDark ? "#2a2f45" : "#8a9ab5"}
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>
      ))}

      {/* ── Lid (screen assembly) ── */}
      <group position={[0, LID_PIVOT_Y, LID_PIVOT_Z]}>
        <group ref={lidGroupRef} rotation={[LID_ANGLE, 0, 0]}>
          <group position={[0, LID_LOCAL_Y, 0]}>

            {/* Lid body */}
            <mesh castShadow>
              <boxGeometry args={[LID_W, LID_H, LID_D]} />
              <meshStandardMaterial
                color={wt.laptop.color}
                roughness={wt.laptop.roughness}
                metalness={wt.laptop.metalness}
              />
            </mesh>

            {/* Hover glow border */}
            <mesh ref={glowBorderRef}>
              <boxGeometry args={[LID_W + 0.02, LID_H + 0.02, LID_D - 0.01]} />
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

            {/* Bezel — dark frame */}
            <mesh position={[0, 0, LID_D / 2 + 0.001]}>
              <boxGeometry args={[LID_W - 0.04, LID_H - 0.04, 0.006]} />
              <meshStandardMaterial
                color={wt.isDark ? "#07090f" : "#090e1a"}
                roughness={1}
                metalness={0}
              />
            </mesh>

            {/* MonitorScreen (screen content + Html overlay) */}
            <group position={[0, 0, screenGroupZ + 0.004]}>
              <MonitorScreen
                sectionProgress={sectionProgress}
                hovered={hovered || interactionState === "interactive"}
                isVisible={isVisible}
                screenW={SCREEN_W}
                screenH={SCREEN_H}
                interactionState={interactionState}
                setInteractionState={setInteractionState}
                isMobile={isMobile}
              />
            </group>

            {/* Logo mark on lid back */}
            <mesh position={[0, 0.05, -LID_D / 2 - 0.001]}>
              <circleGeometry args={[0.22, 32]} />
              <meshStandardMaterial
                color={wt.isDark ? "#1e2844" : "#8a9fc0"}
                emissive={wt.isDark ? "#3b82f6" : "#2563eb"}
                emissiveIntensity={wt.isDark ? 0.28 : 0.12}
                roughness={0.2}
                metalness={0.9}
              />
            </mesh>
            <mesh position={[0, 0.05, -LID_D / 2 - 0.002]}>
              <torusGeometry args={[0.16, 0.012, 8, 32]} />
              <meshStandardMaterial
                color={wt.isDark ? "#3b82f6" : "#2563eb"}
                emissive={wt.isDark ? "#3b82f6" : "#2563eb"}
                emissiveIntensity={wt.isDark ? 0.7 : 0.35}
                roughness={0.1}
                metalness={1}
              />
            </mesh>

          </group>
        </group>
      </group>
    </group>
  );
}

/* ── Keyboard keys ── */
function KeyboardKeys({ wt }) {
  const keysRef  = useRef([]);
  const KEY_ROWS = 4;
  const KEY_COLS = 13;
  const KW = 0.185; const KH = 0.022; const KD = 0.175; const GAP = 0.018;

  const keys = useMemo(() => {
    const arr = [];
    for (let r = 0; r < KEY_ROWS; r++) {
      for (let c = 0; c < KEY_COLS; c++) arr.push({ r, c, id: r * KEY_COLS + c });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    keys.forEach(({ c, id }) => {
      const mesh = keysRef.current[id];
      if (!mesh) return;
      const wave = Math.sin(t * 1.8 + c * 0.5) * 0.5 + 0.5;
      const h    = 0.58 + wave * 0.12;
      mesh.material.emissive.setHSL(h, 1, 0.5);
      // In light mode, reduce RGB brightness significantly
      mesh.material.emissiveIntensity = wt.isDark
        ? 0.18 + wave * 0.28
        : 0.05 + wave * 0.08;
    });
  });

  return (
    <group position={[0, BASE_H + 0.022, 0.05]}>
      {keys.map(({ r, c, id }) => (
        <mesh
          key={id}
          ref={(el) => (keysRef.current[id] = el)}
          position={[
            (c - KEY_COLS / 2 + 0.5) * (KW + GAP),
            0,
            (r - KEY_ROWS / 2 + 0.5) * (KD + GAP) - 0.1,
          ]}
        >
          <boxGeometry args={[KW, KH, KD]} />
          <meshStandardMaterial
            color={wt.keyboard.keyColor}
            emissive="#3b82f6"
            emissiveIntensity={0.2}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
