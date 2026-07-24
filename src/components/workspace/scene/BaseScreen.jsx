import { useRef, useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWorkspaceTheme } from "../workspaceTheme";
import { emitDebugLog } from "../DebugOverlay";

const BOOT_SCHEDULE = [
  { phase: "off",     delay: 0    },
  { phase: "booting", delay: 700  },
  { phase: "loading", delay: 1500 },
  { phase: "ready",   delay: 3500 },
];

export default function BaseScreen({
  hovered,
  isVisible,
  position,
  rotation,
  screenW,
  screenH,
  virtualW,
  virtualH,
  interactionState,
  borderRadius = "4px",
  paddingTop = 0,
  scaleFactor = 1.0,
  distanceFactor,
  exactViewportMapping = true,
  debugLabel,
  children
}) {
  const meshRef      = useRef();
  const htmlRef      = useRef();
  const viewportRef  = useRef();
  const wt           = useWorkspaceTheme();

  const [bootPhase, setBootPhase]     = useState("off");
  const bootedRef = useRef(false);


  const viewportW = virtualW;
  const viewportH = virtualH ?? virtualW * (screenH / screenW);
  const htmlScale = (screenW * scaleFactor) / viewportW;

  useEffect(() => {
    if (!isVisible || bootedRef.current) return;
    bootedRef.current = true;
    BOOT_SCHEDULE.forEach(({ phase, delay }) => {
      setTimeout(() => setBootPhase(phase), delay);
    });
  }, [isVisible]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t       = clock.getElapsedTime();
    const isReady = bootPhase === "ready";
    const base    = isReady
      ? (hovered ? wt.screen.intensity * 1.55 : wt.screen.intensity)
      : 0.08;
    const pulse = Math.sin(t * 1.0) * 0.08;

    meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
      meshRef.current.material.emissiveIntensity,
      base + pulse,
      0.06
    );
    meshRef.current.material.emissive.lerp(
      new THREE.Color(wt.screen.emissive),
      0.05
    );
  });

  const showContent = bootPhase === "ready";

  const { camera } = useThree();

  useEffect(() => {
    if (!debugLabel || typeof window === "undefined") return undefined;

    const frame = window.requestAnimationFrame(() => {
      const htmlEl = htmlRef.current;
      const viewportEl = viewportRef.current;
      const htmlStyles = htmlEl ? window.getComputedStyle(htmlEl) : null;
      const viewportStyles = viewportEl ? window.getComputedStyle(viewportEl) : null;
      const transformInner = htmlEl?.parentElement ?? null;
      const transformOuter = transformInner?.parentElement ?? null;

      // World-space 3D auditing
      const screenMesh = meshRef.current;
      let meshWorldBBox = new THREE.Box3();
      let meshWorldScale = new THREE.Vector3();
      let parentWorldScale = new THREE.Vector3();
      let htmlWorldScale = new THREE.Vector3();
      let cameraDistance = 0;

      if (screenMesh) {
        screenMesh.updateMatrixWorld(true);
        meshWorldBBox.setFromObject(screenMesh);
        screenMesh.getWorldScale(meshWorldScale);
        if (screenMesh.parent) {
          screenMesh.parent.getWorldScale(parentWorldScale);
        }
        if (camera) {
          cameraDistance = camera.position.distanceTo(screenMesh.getWorldPosition(new THREE.Vector3()));
        }
      }
      
      // Html group world scale (the three.js group wrapping the CSS3DObject)
      // htmlRef.current is the HTML div. The Drei <Html> ref might be the div or the group.
      // Actually, Drei <Html> ref points to the HTML div. We need its parent to get the 3D group.
      let htmlGroup = screenMesh?.parent?.children.find(c => c.isGroup || (c.element && c.element === htmlEl));
      // If we can't find the exact group easily, we know it's a child of the main group.
      if (!htmlGroup && screenMesh?.parent) {
         htmlGroup = screenMesh.parent.children[screenMesh.parent.children.length - 1]; // Usually Html is last
      }
      if (htmlGroup && htmlGroup.getWorldScale) {
          htmlGroup.getWorldScale(htmlWorldScale);
      }

      const metrics = {
        "Phone screen width": screenW,
        "Phone screen height": screenH,
        "Virtual viewport width": viewportW,
        "Virtual viewport height": viewportH,
        "Html width": htmlEl?.offsetWidth ?? null,
        "Html height": htmlEl?.offsetHeight ?? null,
        scale: htmlScale,
        "Expected world width": viewportW * htmlScale,
        "Expected world height": viewportH * htmlScale,
        "Mesh BBox Width": meshWorldBBox.max.x - meshWorldBBox.min.x,
        "Mesh BBox Height": meshWorldBBox.max.y - meshWorldBBox.min.y,
        "Mesh World Scale X": meshWorldScale.x,
        "Parent World Scale X": parentWorldScale.x,
        "Html Group World Scale X": htmlWorldScale.x,
        "Camera FOV": camera?.fov,
        "Camera Distance": cameraDistance,
        "Html CSS transform": htmlStyles?.transform ?? null,
        "Viewport CSS transform": viewportStyles?.transform ?? null,
        "Transform inner": transformInner ? window.getComputedStyle(transformInner).transform : null,
        "Transform outer": transformOuter ? window.getComputedStyle(transformOuter).transform : null,
      };

      console.groupCollapsed(`[${debugLabel}] viewport mapping`);
      console.table(metrics);
      console.groupEnd();

      emitDebugLog(
        debugLabel,
        "OK",
        `screen=${screenW.toFixed(3)}x${screenH.toFixed(3)} viewport=${viewportW}x${viewportH.toFixed(1)} scale=${htmlScale.toFixed(6)}`
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, [
    debugLabel,
    screenW,
    screenH,
    viewportW,
    viewportH,
    htmlScale,
    interactionState,
    showContent,
    camera
  ]);

  const resolvedDistanceFactor = exactViewportMapping 
    ? (screenW / viewportW) * 400 
    : (distanceFactor ?? 400);

  return (
    <group position={position} rotation={rotation}>
      {/* ── Emissive screen backing (Three.js mesh) ── */}
      <mesh ref={meshRef} position={[0, 0, 0.006]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshStandardMaterial
          color={wt.screen.backing}
          emissive={wt.screen.emissive}
          emissiveIntensity={wt.screen.intensity}
          roughness={1}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* ── Subtle glass sheen ── */}
      <mesh position={[0, 0, 0.009]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.016}
          roughness={0}
          metalness={0}
          depthWrite={false}
        />
      </mesh>

      {/* ── HTML overlay with transform ── */}
      <Html
        ref={htmlRef}
        transform
        center
        position={[0, 0, 0.012]}
        occlude={[meshRef]}
        distanceFactor={resolvedDistanceFactor}
        style={{
          pointerEvents: interactionState === "interactive" ? "auto" : "none",
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
        zIndexRange={[100, 100]}
      >
        <div
          ref={viewportRef}
          style={{
            width:        viewportW,
            height:       viewportH,
            overflow:     "hidden",
            overflowX:    "hidden",
            overflowY:    "hidden",
            display:      "flex",
            flexDirection:"column",
            background:   wt.isDark ? "#070c18" : "#f0f4ff",
            borderRadius: borderRadius,
            clipPath:     `inset(0 round ${borderRadius})`,
            paddingTop:   paddingTop,
            position:     "relative",
            boxSizing:    "border-box",
            contain:      "strict",
            isolation:    "isolate",
          }}
        >
          {children}
        </div>
      </Html>
    </group>
  );
}
