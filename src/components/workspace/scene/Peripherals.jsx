/**
 * Peripherals.jsx — Phase 3
 * Desk props with full theme integration via useWorkspaceTheme.
 */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWorkspaceTheme } from "../workspaceTheme";

/* ── Keyboard Base ── */
function Keyboard({ hovered, wt }) {
  const keysRef = useRef([]);
  const baseRef = useRef();
  
  const KEY_ROWS = 4;
  const KEY_COLS = 14;
  const KEY_W = 0.13;
  const KEY_H = 0.028;
  const KEY_D = 0.13;
  const GAP = 0.015;
  const TOTAL_W = KEY_COLS * (KEY_W + GAP);
  const TOTAL_D = KEY_ROWS * (KEY_D + GAP);

  const keys = useMemo(() => {
    const arr = [];
    for (let r = 0; r < KEY_ROWS; r++) {
      for (let c = 0; c < KEY_COLS; c++) arr.push({ r, c, id: r * KEY_COLS + c });
    }
    return arr;
  }, []);

  const tBase = useRef(new THREE.Color());
  const tKey  = useRef(new THREE.Color());

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (baseRef.current) {
      tBase.current.set(wt.isDark ? "#111122" : "#d8dfeb");
      baseRef.current.color.lerp(tBase.current, 0.05);
    }

    tKey.current.set(wt.keyboard.keyColor);
    
    keys.forEach(({ r, c, id }) => {
      const mesh = keysRef.current[id];
      if (!mesh) return;
      mesh.material.color.lerp(tKey.current, 0.05);
      
      const wave = Math.sin(t * 2 + c * 0.4) * 0.5 + 0.5;
      const intensity = hovered ? wave * 0.8 : wave * 0.3;
      
      if (wt.isDark) {
        const h = 0.6 + wave * 0.1;
        mesh.material.emissive.setHSL(h, 0.9, 0.5);
        mesh.material.emissiveIntensity = intensity;
      } else {
        mesh.material.emissive.set(wt.keyboard.emissive);
        mesh.material.emissiveIntensity = intensity * 0.3; // dimmer in light mode
      }
    });
  });

  return (
    <group position={[-0.1, 0.065, 0.9]}>
      <mesh>
        <boxGeometry args={[TOTAL_W + 0.08, 0.025, TOTAL_D + 0.06]} />
        <meshStandardMaterial ref={baseRef} color={wt.isDark ? "#111122" : "#d8dfeb"} roughness={0.7} metalness={0.4} />
      </mesh>
      {keys.map(({ r, c, id }) => (
        <mesh
          key={id}
          ref={(el) => (keysRef.current[id] = el)}
          position={[
            (c - KEY_COLS / 2 + 0.5) * (KEY_W + GAP),
            0.028,
            (r - KEY_ROWS / 2 + 0.5) * (KEY_D + GAP),
          ]}
          castShadow
        >
          <boxGeometry args={[KEY_W, KEY_H, KEY_D]} />
          <meshStandardMaterial
            color={wt.keyboard.keyColor}
            emissive={wt.keyboard.emissive}
            emissiveIntensity={0.3}
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Mouse ── */
function Mouse({ wt }) {
  const ledRef = useRef();
  const bodyRef = useRef();
  const tBody = useRef(new THREE.Color());
  const tLed = useRef(new THREE.Color());

  useFrame(({ clock }) => {
    if (ledRef.current) {
      const t = clock.getElapsedTime();
      tLed.current.set(wt.isDark ? "#3b82f6" : "#2563eb");
      ledRef.current.emissive.lerp(tLed.current, 0.05);
      ledRef.current.emissiveIntensity = (0.4 + Math.sin(t * 2.5) * 0.3) * (wt.isDark ? 1 : 0.4);
    }
    if (bodyRef.current) {
      tBody.current.set(wt.isDark ? "#111122" : "#d4d8e0");
      bodyRef.current.color.lerp(tBody.current, 0.05);
    }
  });

  return (
    <group position={[2.2, 0, 0.7]}>
      <mesh castShadow>
        <boxGeometry args={[0.28, 0.06, 0.44]} />
        <meshStandardMaterial ref={bodyRef} color={wt.isDark ? "#111122" : "#d4d8e0"} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.04, -0.05]}>
        <torusGeometry args={[0.035, 0.012, 8, 16]} />
        <meshStandardMaterial ref={ledRef} color={wt.isDark ? "#1e3a5f" : "#93c5fd"} emissive="#3b82f6" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

/* ── Coffee Mug ── */
function CoffeeMug({ wt }) {
  const cupRef = useRef();
  const handleRef = useRef();
  const glowRef = useRef();
  
  const tCup = useRef(new THREE.Color());
  const tGlow = useRef(new THREE.Color());

  useFrame(() => {
    if (cupRef.current && handleRef.current) {
      tCup.current.set(wt.isDark ? "#1a1a2e" : "#e2e8f0");
      cupRef.current.color.lerp(tCup.current, 0.05);
      handleRef.current.color.lerp(tCup.current, 0.05);
    }
    if (glowRef.current) {
      tGlow.current.set(wt.isDark ? "#3b82f6" : "#2563eb");
      glowRef.current.emissive.lerp(tGlow.current, 0.05);
      glowRef.current.emissiveIntensity = wt.isDark ? 0.5 : 0.15;
    }
  });

  return (
    <group position={[2.9, 0, -0.5]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.15, 0.38, 20]} />
        <meshStandardMaterial ref={cupRef} color={wt.isDark ? "#1a1a2e" : "#e2e8f0"} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0.24, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.1, 0.025, 8, 20, Math.PI]} />
        <meshStandardMaterial ref={handleRef} color={wt.isDark ? "#1a1a2e" : "#e2e8f0"} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.165, 0.165, 0.02, 20]} />
        <meshStandardMaterial color="#1a0a00" roughness={1} metalness={0} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.18, 0.006, 8, 20]} />
        <meshStandardMaterial
          ref={glowRef}
          color={wt.isDark ? "#60a5fa" : "#3b82f6"}
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

/* ── Headphones ── */
function Headphones({ wt }) {
  const bandRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();
  const ledLRef = useRef();
  const ledRRef = useRef();

  const tBand = useRef(new THREE.Color());
  const tCup = useRef(new THREE.Color());
  const tLed = useRef(new THREE.Color());

  useFrame(() => {
    if (bandRef.current) {
      tBand.current.set(wt.isDark ? "#111122" : "#94a3b8");
      bandRef.current.color.lerp(tBand.current, 0.05);
    }
    if (leftRef.current && rightRef.current) {
      tCup.current.set(wt.isDark ? "#0a0a1a" : "#f1f5f9");
      leftRef.current.color.lerp(tCup.current, 0.05);
      rightRef.current.color.lerp(tCup.current, 0.05);
    }
    if (ledLRef.current && ledRRef.current) {
      tLed.current.set(wt.isDark ? "#3b82f6" : "#2563eb");
      ledLRef.current.emissive.lerp(tLed.current, 0.05);
      ledRRef.current.emissive.lerp(tLed.current, 0.05);
      const intensity = wt.isDark ? 0.6 : 0.2;
      ledLRef.current.emissiveIntensity = THREE.MathUtils.lerp(ledLRef.current.emissiveIntensity, intensity, 0.05);
      ledRRef.current.emissiveIntensity = THREE.MathUtils.lerp(ledRRef.current.emissiveIntensity, intensity, 0.05);
    }
  });

  return (
    <group position={[-3.0, 0.02, -0.4]} rotation={[0, 0.3, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.32, 0.025, 10, 30, Math.PI]} />
        <meshStandardMaterial ref={bandRef} color={wt.isDark ? "#111122" : "#94a3b8"} roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[-0.32, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.07, 20]} />
        <meshStandardMaterial ref={leftRef} color={wt.isDark ? "#0a0a1a" : "#f1f5f9"} roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0.32, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.07, 20]} />
        <meshStandardMaterial ref={rightRef} color={wt.isDark ? "#0a0a1a" : "#f1f5f9"} roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[-0.32, 0, 0.037]}>
        <torusGeometry args={[0.1, 0.006, 8, 20]} />
        <meshStandardMaterial ref={ledLRef} color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.32, 0, 0.037]}>
        <torusGeometry args={[0.1, 0.006, 8, 20]} />
        <meshStandardMaterial ref={ledRRef} color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

/* ── Combined export ── */
export default function Peripherals({ hovered }) {
  const wt = useWorkspaceTheme();
  return (
    <>
      <Keyboard hovered={hovered} wt={wt} />
      <Mouse wt={wt} />
      <CoffeeMug wt={wt} />
      <Headphones wt={wt} />
    </>
  );
}
