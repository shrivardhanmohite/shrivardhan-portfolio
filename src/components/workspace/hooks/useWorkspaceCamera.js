/**
 * useWorkspaceCamera.js — Phase 3
 * Manages camera state for the 3D workspace.
 * Pushes in when Interactive Mode is active, and returns when not.
 */
import { useRef, useState, useCallback, useEffect } from "react";

export function useWorkspaceCamera(interactionState) {
  const [isPushedIn, setIsPushedIn] = useState(false);
  const timeRef = useRef(0);

  useEffect(() => {
    setIsPushedIn(interactionState === "interactive");
  }, [interactionState]);

  return { isPushedIn, timeRef };
}
