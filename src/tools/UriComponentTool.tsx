import { useMemo, useState } from "react";
import CopyButton from "../components/CopyButton";

export default function UriComponentTool() {
  const [rawInput, setRawInput] = useState("Devknife Tools & Co.");
  const [encodedInput, setEncodedInput] = useState("Devknife%20Tools%20%26%20Co.");

  const encoded = useMemo(() => encodeURIComponent(rawInput), [rawInput]);
  const decoded = useMemo(() => {
    try {
      return decodeURIComponent(encodedInput);
    } catch {
      return "Invalid encoded string";
    }
  }, [encodedInput]);

  return (
    <div className="grid">
      <div className="card">
        <label>Raw Input</label>
        <textarea value={rawInput} onChange={(event) => setRawInput(event.target.value)} />
      </div>
      <div className="card">
        <label>Encoded Output</label>
        <div className="output">{encoded}</div>
        <div style={{ marginTop: 8 }}>
          <CopyButton value={encoded} />
        </div>
      </div>
      <div className="card">
        <label>Encoded Input</label>
        <textarea value={encodedInput} onChange={(event) => setEncodedInput(event.target.value)} />
      </div>
      <div className="card">
        <label>Decoded Output</label>
        <div className="output">{decoded}</div>
        <div style={{ marginTop: 8 }}>
          <CopyButton value={decoded} />
        </div>
      </div>
    </div>
  );
}
