/**
 * CameraRig.jsx — Phase 2
 * Tighter composition: camera moved closer + lower for a more intimate desk view.
 * Idle motion remains extremely subtle — left/right drift + breathing zoom.
 */
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Closer camera, tighter frame — laptop fills the view
const DEFAULT_POS    = new THREE.Vector3(1.6, 1.55, 3.2);
const DEFAULT_TARGET = new THREE.Vector3(0, 0.55, 0);

// Push-in: right up to the screen so the mini-portfolio fills view
const PUSHIN_POS    = new THREE.Vector3(0.15, 1.05, 1.85);
const PUSHIN_TARGET = new THREE.Vector3(0, 0.95, 0);

// Mobile (Phone) Positions
const MOBILE_POS = new THREE.Vector3(0, 1.65, 3.5);
const MOBILE_TARGET = new THREE.Vector3(0, 1.65, 0);

export default function CameraRig({ isPushedIn, isMobile }) {
  const { camera } = useThree();
  const currentPos    = useRef(DEFAULT_POS.clone());
  const currentTarget = useRef(DEFAULT_TARGET.clone());

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Subtle idle drift — almost imperceptible, Apple-keynote style
    const idleX =  Math.sin(t * 0.12) * 0.06;
    const idleY =  Math.sin(t * 0.18) * 0.025;
    const idleZ =  Math.cos(t * 0.09) * 0.03;  // breathing zoom

    const targetPos = isMobile
      ? MOBILE_POS
      : (isPushedIn ? PUSHIN_POS : DEFAULT_POS);
      
    const targetLook = isMobile
      ? MOBILE_TARGET
      : (isPushedIn ? PUSHIN_TARGET : DEFAULT_TARGET);

    const finalPos = isMobile || isPushedIn
      ? targetPos
      : new THREE.Vector3(
          targetPos.x + idleX,
          targetPos.y + idleY,
          targetPos.z + idleZ
        );

    // Push-in lerps slower → cinematic slide
    const speed = isPushedIn ? 0.022 : 0.038;
    currentPos.current.lerp(finalPos, speed);
    currentTarget.current.lerp(targetLook, speed);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
