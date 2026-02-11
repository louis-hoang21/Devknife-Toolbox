import { useEffect, useState } from "react";
import CopyButton from "../components/CopyButton";
import { hmacString } from "../lib/crypto";

export default function HmacTool() {
  const [input, setInput] = useState("message");
  const [secret, setSecret] = useState("secret");
  const [algorithm, setAlgorithm] = useState<"SHA-1" | "SHA-256" | "SHA-384" | "SHA-512">("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        setOutput(await hmacString(algorithm, input, secret));
        setError("");
      } catch (err) {
        setError((err as Error).message);
      }
    };
    void run();
  }, [input, secret, algorithm]);

  return (
    <div className="card">
      <div className="grid two">
        <div>
          <label>Message</label>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} />
        </div>
        <div>
          <label>Secret</label>
          <input value={secret} onChange={(event) => setSecret(event.target.value)} />
          <label style={{ marginTop: 12 }}>Algorithm</label>
          <select className="form-control" value={algorithm} onChange={(event) => setAlgorithm(event.target.value as typeof algorithm)}>
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
          <label style={{ marginTop: 12 }}>HMAC Digest</label>
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
