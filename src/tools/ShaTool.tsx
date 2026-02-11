import { useEffect, useState } from "react";
import CopyButton from "../components/CopyButton";
import { hashString } from "../lib/crypto";

export default function ShaTool() {
  const [input, setInput] = useState("Hello Devknife");
  const [algorithm, setAlgorithm] = useState<"SHA-1" | "SHA-256" | "SHA-384" | "SHA-512">("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        setOutput(await hashString(algorithm, input));
        setError("");
      } catch (err) {
        setError((err as Error).message);
      }
    };
    void run();
  }, [input, algorithm]);

  return (
    <div className="card">
      <div className="grid two">
        <div>
          <label>Input</label>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} />
        </div>
        <div>
          <label>Algorithm</label>
          <select className="form-control" value={algorithm} onChange={(event) => setAlgorithm(event.target.value as typeof algorithm)}>
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
          <label style={{ marginTop: 12 }}>Digest (hex)</label>
          <textarea value={output} readOnly />
          <div style={{ marginTop: 8 }}>
            <CopyButton value={output} />
          </div>
          {error ? <p className="muted">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
