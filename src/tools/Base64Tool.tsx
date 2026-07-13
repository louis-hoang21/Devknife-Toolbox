import { useMemo, useState } from "react";
import CopyButton from "../components/CopyButton";
import { decodeBase64, encodeBase64 } from "../lib/encoding";

export default function Base64Tool() {
  const [rawInput, setRawInput] = useState("Hello Devknife!");
  const [base64Input, setBase64Input] = useState("SGVsbG8gVGFpaGEh");

  const [encoded, encodeError] = useMemo(() => {
    try {
      return [encodeBase64(rawInput), ""] as const;
    } catch (error) {
      return ["", (error as Error).message] as const;
    }
  }, [rawInput]);

  const [decoded, decodeError] = useMemo(() => {
    try {
      return [decodeBase64(base64Input), ""] as const;
    } catch (error) {
      return ["", (error as Error).message] as const;
    }
  }, [base64Input]);

  return (
    <div className="grid">
      <div className="card">
        <h4>GIẢI MÃ (DECODE)</h4>
        <div className="grid two">
          <div>
            <label>Base64 Input</label>
            <textarea rows={20} value={base64Input} onChange={(event) => setBase64Input(event.target.value)} />
          </div>
          <div>
            <label>Decoded Output</label>
            <textarea rows={20} value={decoded} readOnly />
            {decodeError ? <p className="muted">{decodeError}</p> : null}
            <div style={{ marginTop: 8 }}>
              <CopyButton value={decoded} />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h4>MÃ HÓA (ENCODE)</h4>
        <div className="grid two">
          <div>
            <label>Raw Input</label>
            <textarea rows={20} value={rawInput} onChange={(event) => setRawInput(event.target.value)} />
          </div>
          <div>
            <label>Encoded Output</label>
            <textarea rows={20} value={encoded} readOnly />
            {encodeError ? <p className="muted">{encodeError}</p> : null}
            <div style={{ marginTop: 8 }}>
              <CopyButton value={encoded} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
