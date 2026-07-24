/**
 * WorkspaceScene.jsx — Phase 3
 * The main R3F Canvas host for the entire 3D workspace.
 */
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { AdaptiveDpr } from "@react-three/drei";

import CameraRig from "./CameraRig";
import Lighting from "./Lighting";
import Desk from "./Desk";
import Laptop from "./devices/Laptop";
import Phone from "./devices/Phone";
import Peripherals from "./Peripherals";
import FloatingCode from "./FloatingCode";
import { useWorkspaceCamera } from "../hooks/useWorkspaceCamera";
import { useResponsiveDevice } from "../hooks/useResponsiveDevice";

// Simple fallback while scene loads
function SceneFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial color="#3b82f6" />
    </mesh>
  );
}

export default function WorkspaceScene({ sectionProgress, isVisible, interactionState, setInteractionState }) {
  const [hovered, setHovered] = useState(false);
  const { isPushedIn } = useWorkspaceCamera(interactionState);
  const { isMobile } = useResponsiveDevice();
  const shouldPushInCamera = !isMobile && isPushedIn;

  const handleLaptopClick = () => {
    if (interactionState !== "interactive") {
      setInteractionState("interactive");
    }
  };

  return (
    <Canvas
      frameloop={isVisible ? "always" : "demand"}
      shadows
      dpr={[1, 1.5]}
      camera={{ fov: 38, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false, toneMappingExposure: 1.4 }}
      style={{ background: "transparent" }}
    >
      <AdaptiveDpr pixelated />

      <Suspense fallback={<SceneFallback />}>
        {/* Camera */}
        <CameraRig isPushedIn={shouldPushInCamera} isMobile={isMobile} />

        {/* Lighting (reduce shadows on mobile) */}
        <Lighting hovered={hovered || shouldPushInCamera} isPushedIn={shouldPushInCamera} isMobile={isMobile} />

        {/* Environment (desk not needed on mobile since phone takes full focus) */}
        {!isMobile && <Desk />}

        {/* Dynamic Device */}
        {isMobile ? (
          <Phone
            onHoverChange={setHovered}
            sectionProgress={sectionProgress}
            isVisible={isVisible}
            interactionState={interactionState}
            setInteractionState={setInteractionState}
            isMobile={isMobile}
          />
        ) : (
          <Laptop
            onHoverChange={setHovered}
            onClickLaptop={handleLaptopClick}
            sectionProgress={sectionProgress}
            isVisible={isVisible}
            interactionState={interactionState}
            setInteractionState={setInteractionState}
            isMobile={isMobile}
          />
        )}

        {/* Desk peripherals */}
        {!isMobile && <Peripherals hovered={hovered || isPushedIn} />}

        {/* Floating engineering tokens */}
        <FloatingCode />
      </Suspense>
    </Canvas>
  );
}
