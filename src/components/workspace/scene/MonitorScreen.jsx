import BaseScreen from "./BaseScreen";
import MiniPortfolio from "../MiniPortfolio/MiniPortfolio";
import { useWorkspaceTheme } from "../workspaceTheme";

/* ── Virtual iframe resolution for Desktop ── */
const VIRTUAL_W = 1280;

export default function MonitorScreen({
  hovered,
  isVisible,
  screenW = 3.38,
  screenH = 2.03,
  interactionState,
  setInteractionState
}) {
  const wt = useWorkspaceTheme();
  
  const viewportH = VIRTUAL_W * (screenH / screenW);

  return (
    <BaseScreen
      hovered={hovered}
      isVisible={isVisible}
      screenW={screenW}
      screenH={screenH}
      virtualW={VIRTUAL_W}
      interactionState={interactionState}
      borderRadius="4px"
      paddingTop={0}
      scaleFactor={1.0}
    >
      <div style={{ width: VIRTUAL_W, height: viewportH, display: "flex", flexDirection: "column" }}>
        <MiniPortfolio wt={wt} width="100%" height="100%" />
      </div>
    </BaseScreen>
  );
}
