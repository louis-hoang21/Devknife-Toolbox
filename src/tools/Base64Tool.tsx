import { useMemo, useState } from "react";
import CopyButton from "../components/CopyButton";
import { decodeBase64, encodeBase64 } from "../lib/encoding";

export default function Base64Tool() {
  const [rawInput, setRawInput] = useState("Hello Devknife!");
  const [base64Input, setBase64Input] = useState("SGVsbG8gVGFpaGEh");

  const [encoded, encodeError] = useMemo(() => {
    try {
      const value = encodeBase64(rawInput);
      return [value, ""] as const;
    } catch (error) {
      return ["", (error as Error).message] as const;
    }
  }, [rawInput]);

  const [decoded, decodeError] = useMemo(() => {
    try {
      const value = decodeBase64(base64Input);
      return [value, ""] as const;
    } catch (error) {
      return ["", (error as Error).message] as const;
    }
  }, [base64Input]);

  return (
    <div className="card">
      <div className="grid two">
        <div>
          <label>Raw Input</label>
          <textarea value={rawInput} onChange={(event) => setRawInput(event.target.value)} />
          <label style={{ marginTop: 12 }}>Encoded Output</label>
          <textarea value={encoded} readOnly />
          {encodeError ? <p className="muted">{encodeError}</p> : null}
          <div style={{ marginTop: 8 }}>
            <CopyButton value={encoded} />
          </div>
        </div>
        <div>
          <label>Base64 Input</label>
          <textarea value={base64Input} onChange={(event) => setBase64Input(event.target.value)} />
          <label style={{ marginTop: 12 }}>Decoded Output</label>
          <textarea value={decoded} readOnly />
          {decodeError ? <p className="muted">{decodeError}</p> : null}
          <div style={{ marginTop: 8 }}>
            <CopyButton value={decoded} />
          </div>
        </div>
      </div>
    </div>
  );
}
