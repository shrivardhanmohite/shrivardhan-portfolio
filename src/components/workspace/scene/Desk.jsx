/**
 * Desk.jsx — Phase 3
 * Theme-aware desk materials with smooth transitions.
 */
import { useRef } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWorkspaceTheme } from "../workspaceTheme";

export default function Desk() {
  const wt = useWorkspaceTheme();

  const reflectorRef = useRef();
  const bodyRef = useRef();
  const edgeRef = useRef();
  const legsRef = useRef([]);

  const tDesk = useRef(new THREE.Color());
  const tEdge = useRef(new THREE.Color());
  const tLegs = useRef(new THREE.Color());

  useFrame(() => {
    // Smoothly animate material colours
    if (reflectorRef.current) {
      tDesk.current.set(wt.desk.color);
      // MeshReflectorMaterial stores color in a material prop
      if (reflectorRef.current.color) {
        reflectorRef.current.color.lerp(tDesk.current, 0.05);
      }
    }

    if (bodyRef.current) {
      tDesk.current.set(wt.desk.color);
      bodyRef.current.color.lerp(tDesk.current, 0.05);
    }

    if (edgeRef.current) {
      tEdge.current.set(wt.desk.edgeGlow);
      edgeRef.current.color.lerp(tEdge.current, 0.05);
      edgeRef.current.emissive.lerp(tEdge.current, 0.05);
    }

    tLegs.current.set(wt.isDark ? "#111520" : "#a39988");
    legsRef.current.forEach((mat) => {
      if (mat) mat.color.lerp(tLegs.current, 0.05);
    });
  });

  return (
    <group>
      {/* Desk surface — reflective top */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <MeshReflectorMaterial
          ref={reflectorRef}
          blur={[200, 80]}
          resolution={512}
          mixBlur={0.6}
          mixStrength={1.2}
          roughness={wt.desk.roughness}
          depthScale={1.0}
          minDepthThreshold={0.2}
          maxDepthThreshold={1.2}
          color={wt.desk.color}
          metalness={wt.desk.metalness}
          mirror={wt.desk.metalness}
        />
      </mesh>

      {/* Desk body */}
      <mesh position={[0, -0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 0.18, 8]} />
        <meshStandardMaterial
          ref={bodyRef}
          color={wt.desk.color}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Subtle edge highlight */}
      <mesh position={[0, -0.0, 4.0]}>
        <boxGeometry args={[12, 0.004, 0.008]} />
        <meshStandardMaterial
          ref={edgeRef}
          color={wt.desk.edgeGlow}
          emissive={wt.desk.edgeGlow}
          emissiveIntensity={0.3}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Desk legs */}
      {[[-4.5, -3.0], [4.5, -3.0], [-4.5, 3.0], [4.5, 3.0]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.55, z]} castShadow>
          <boxGeometry args={[0.08, 0.9, 0.08]} />
          <meshStandardMaterial
            ref={(el) => (legsRef.current[i] = el)}
            color={wt.isDark ? "#111520" : "#a39988"}
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
