/**
 * FloatingCode.jsx — Phase 3
 * Theme-aware engineering tokens.
 */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useWorkspaceTheme } from "../workspaceTheme";

/* ── React Atom shape ── */
function ReactAtom({ position, opacity, speed, phase, wt }) {
  const groupRef = useRef();
  const matRef = useRef();
  const tColor = useRef(new THREE.Color());

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * speed;
      groupRef.current.position.set(
        position[0] + Math.sin(t + phase) * 0.15,
        position[1] + Math.sin(t * 0.6 + phase) * 0.1,
        position[2] + Math.cos(t * 0.4 + phase) * 0.08
      );
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.08;
    }
    if (matRef.current) {
      tColor.current.set(wt.particles.color);
      matRef.current.color.lerp(tColor.current, 0.05);
      matRef.current.emissive.lerp(tColor.current, 0.05);
      matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, wt.particles.opacity, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial ref={matRef} color="#61dafb" emissive="#61dafb" emissiveIntensity={0.6} transparent opacity={opacity} />
      </mesh>
      {[0, 60, 120].map((angle, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (angle * Math.PI) / 180]}>
          <torusGeometry args={[0.22, 0.012, 6, 32]} />
          <meshStandardMaterial ref={(el) => { if(i===0) matRef.current = el; }} color="#61dafb" emissive="#61dafb" emissiveIntensity={0.6} transparent opacity={opacity} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Hexagon (Node.js) ── */
function Hexagon({ position, opacity, speed, phase, wt }) {
  const groupRef = useRef();
  const matRef = useRef();
  const tColor = useRef(new THREE.Color());

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * speed;
      groupRef.current.position.set(
        position[0] + Math.sin(t + phase) * 0.12,
        position[1] + Math.cos(t * 0.5 + phase) * 0.09,
        position[2]
      );
      groupRef.current.rotation.z += 0.002 * speed;
    }
    if (matRef.current) {
      tColor.current.set(wt.isDark ? "#68a063" : "#4caf50");
      matRef.current.color.lerp(tColor.current, 0.05);
      matRef.current.emissive.lerp(tColor.current, 0.05);
      matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, wt.particles.opacity, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 6]} />
        <meshStandardMaterial
          ref={matRef}
          color="#68a063"
          emissive="#68a063"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
          wireframe
        />
      </mesh>
    </group>
  );
}

/* ── Text tokens ── */
function CodeText({ token, position, opacity, speed, phase, color, wt }) {
  const ref = useRef();
  const tColor = useRef(new THREE.Color());

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed;
      ref.current.position.set(
        position[0] + Math.sin(t + phase) * 0.18,
        position[1] + Math.sin(t * 0.65 + phase) * 0.12,
        position[2] + Math.cos(t * 0.45 + phase) * 0.09
      );
      tColor.current.set(wt.particles.color);
      ref.current.color = tColor.current.getStyle(); // Text component uses standard color string/hex
      ref.current.fillOpacity = THREE.MathUtils.lerp(ref.current.fillOpacity, wt.particles.opacity * 1.5, 0.05);
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.14}
      color={color}
      fillOpacity={opacity}
      anchorX="center"
      anchorY="middle"
    >
      {token}
    </Text>
  );
}

/* ── Neural node cluster ── */
function NeuralDot({ position, opacity, speed, phase, wt }) {
  const ref = useRef();
  const tColor = useRef(new THREE.Color());

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed;
      const pulse = Math.sin(t * 2 + phase) * 0.5 + 0.5;
      ref.current.position.y = position[1] + Math.sin(t * 0.5 + phase) * 0.1;
      
      tColor.current.set(wt.isDark ? "#818cf8" : "#4f46e5");
      ref.current.material.color.lerp(tColor.current, 0.05);
      ref.current.material.emissive.lerp(tColor.current, 0.05);
      
      const targetIntensity = (wt.isDark ? 0.4 : 0.2) + pulse * 0.5;
      ref.current.material.emissiveIntensity = THREE.MathUtils.lerp(ref.current.material.emissiveIntensity, targetIntensity, 0.05);
      ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, wt.particles.opacity, 0.05);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshStandardMaterial
        color="#818cf8"
        emissive="#818cf8"
        emissiveIntensity={0.5}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

/* ── Main component ── */
export default function FloatingCode() {
  const wt = useWorkspaceTheme();

  const elements = useMemo(() => {
    return [
      { type: "atom",    pos: [-3.5, 1.8, -1.5], op: 0.15, sp: 0.18, ph: 0.0 },
      { type: "atom",    pos: [-4.2, 0.8, 0.5],  op: 0.10, sp: 0.14, ph: 2.1 },

      { type: "hex",     pos: [4.0,  1.5, -1.0], op: 0.13, sp: 0.2, ph: 1.0 },
      { type: "hex",     pos: [3.5,  0.6, 1.2],  op: 0.10, sp: 0.15, ph: 3.2 },

      { type: "text",    token: "{}",      pos: [-2.8, 2.2, 0.5],  op: 0.18, sp: 0.16, ph: 0.5, color: "#60a5fa" },
      { type: "text",    token: "async",   pos: [2.5,  2.0, -0.8], op: 0.15, sp: 0.13, ph: 1.8, color: "#60a5fa" },
      { type: "text",    token: "API",     pos: [3.2,  1.2, 0.8],  op: 0.16, sp: 0.19, ph: 2.5, color: "#818cf8" },
      { type: "text",    token: "RAG",     pos: [-3.0, 1.0, -1.0], op: 0.14, sp: 0.17, ph: 3.0, color: "#818cf8" },
      { type: "text",    token: "const",   pos: [1.8,  2.5, -1.5], op: 0.12, sp: 0.12, ph: 0.9, color: "#60a5fa" },
      { type: "text",    token: "</>",     pos: [-1.5, 2.3, 1.5],  op: 0.13, sp: 0.15, ph: 4.2, color: "#67e8f9" },
      { type: "text",    token: "=>",      pos: [-4.0, 1.6, -0.5], op: 0.12, sp: 0.11, ph: 1.3, color: "#60a5fa" },
      { type: "text",    token: "LLM",     pos: [4.2,  0.9, -1.2], op: 0.16, sp: 0.14, ph: 2.8, color: "#818cf8" },

      { type: "neural",  pos: [-1.0, 2.6, -0.8], op: 0.18, sp: 0.22, ph: 0.2 },
      { type: "neural",  pos: [-0.5, 2.8, -1.2], op: 0.14, sp: 0.25, ph: 1.4 },
      { type: "neural",  pos: [0.5,  2.7, -0.6], op: 0.16, sp: 0.20, ph: 2.6 },
      { type: "neural",  pos: [1.0,  2.9, -1.0], op: 0.13, sp: 0.18, ph: 3.8 },
    ];
  }, []);

  return (
    <>
      {elements.map((el, i) => {
        if (el.type === "atom")   return <ReactAtom  key={i} position={el.pos} opacity={el.op} speed={el.sp} phase={el.ph} wt={wt} />;
        if (el.type === "hex")    return <Hexagon    key={i} position={el.pos} opacity={el.op} speed={el.sp} phase={el.ph} wt={wt} />;
        if (el.type === "text")   return <CodeText   key={i} position={el.pos} opacity={el.op} speed={el.sp} phase={el.ph} token={el.token} color={el.color} wt={wt} />;
        if (el.type === "neural") return <NeuralDot  key={i} position={el.pos} opacity={el.op} speed={el.sp} phase={el.ph} wt={wt} />;
        return null;
      })}
    </>
  );
}
