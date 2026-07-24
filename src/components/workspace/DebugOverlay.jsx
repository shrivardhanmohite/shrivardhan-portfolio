import { useState, useEffect } from "react";

const debugLogs = [];
let listeners = [];

export function emitDebugLog(stage, status, data = "") {
  debugLogs.push({ time: new Date().toISOString().substring(11, 23), stage, status, data });
  listeners.forEach(l => l([...debugLogs]));
}

export function DebugOverlay() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const handler = (newLogs) => setLogs(newLogs);
    listeners.push(handler);
    setLogs([...debugLogs]);
    return () => { listeners = listeners.filter(l => l !== handler); };
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 10, right: 10, width: 350,
      background: "rgba(0,0,0,0.85)", color: "#0f0",
      fontFamily: "monospace", fontSize: "11px",
      padding: "10px", borderRadius: "8px", zIndex: 999999,
      pointerEvents: "none"
    }}>
      <h3 style={{ borderBottom: "1px solid #0f0", paddingBottom: "4px", marginBottom: "8px", marginTop: 0 }}>
        RENDERING PIPELINE LOGS
      </h3>
      {logs.map((log, i) => (
        <div key={i} style={{ marginBottom: "4px", display: "flex", gap: "6px" }}>
          <span style={{ opacity: 0.5 }}>{log.time}</span>
          <span style={{ color: log.status === "OK" ? "#0f0" : log.status === "FAIL" ? "#f00" : "#ff0" }}>
            [{log.status}]
          </span>
          <span>{log.stage} {log.data}</span>
        </div>
      ))}
    </div>
  );
}
