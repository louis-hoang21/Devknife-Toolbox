import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function PortCheckTool() {
  const [host, setHost] = useState("127.0.0.1");
  const [port, setPort] = useState("80");
  const [timeout, setTimeoutMs] = useState("1500");
  const [status, setStatus] = useState("");

  const check = async () => {
    try {
      setStatus("Checking...");
      const parsedPort = Number.parseInt(port, 10);
      const parsedTimeout = Number.parseInt(timeout, 10);
      if (Number.isNaN(parsedPort) || Number.isNaN(parsedTimeout)) {
        setStatus("Invalid port or timeout");
        return;
      }
      const isOpen = await invoke<boolean>("check_port", {
        host,
        port: parsedPort,
        timeoutMs: parsedTimeout
      });
      setStatus(isOpen ? "Open" : "Closed");
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  return (
    <div className="card">
      <div className="grid two">
        <div>
          <label>Host</label>
          <input value={host} onChange={(event) => setHost(event.target.value)} />
        </div>
        <div>
          <label>Port</label>
          <input value={port} onChange={(event) => setPort(event.target.value)} />
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <label>Timeout (ms)</label>
        <input value={timeout} onChange={(event) => setTimeoutMs(event.target.value)} />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
        <button className="primary" type="button" onClick={check}>
          Check Port
        </button>
        {status ? <span className="badge">{status}</span> : null}
      </div>
    </div>
  );
}
