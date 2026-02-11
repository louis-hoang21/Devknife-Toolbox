import { useMemo, useState } from "react";
import CopyButton from "../components/CopyButton";

export default function JsonTool() {
  const [decodeInput, setDecodeInput] = useState('{"message":"hello","value":42}');
  const [encodeInput, setEncodeInput] = useState('{' + "\n  \"message\": \"hello\"," + "\n  \"value\": 42\n}");

  const [decodeOutput, decodeError] = useMemo(() => {
    try {
      const obj = JSON.parse(decodeInput);
      return [JSON.stringify(obj, null, 2), ""] as const;
    } catch (err) {
      return ["", (err as Error).message] as const;
    }
  }, [decodeInput]);

  const [encodeOutput, encodeError] = useMemo(() => {
    try {
      const obj = JSON.parse(encodeInput);
      return [JSON.stringify(obj), ""] as const;
    } catch (err) {
      return ["", (err as Error).message] as const;
    }
  }, [encodeInput]);

  return (
    <div className="grid">
      <div className="card">
        <h4>DECODE (FORMAT & VALIDATE)</h4>
        <div className="grid two">
          <div>
            <label>Input</label>
            <textarea rows={20} value={decodeInput} onChange={(event) => setDecodeInput(event.target.value)} />
          </div>
          <div>
            <label>Formatted Output</label>
            <textarea rows={20} value={decodeOutput} readOnly />
            {decodeError ? <p className="muted">{decodeError}</p> : null}
            <div style={{ marginTop: 8 }}>
              <CopyButton value={decodeOutput} />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h4>ENCODE (STRINGIFY / MINIFY)</h4>
        <div className="grid two">
          <div>
            <label>Input</label>
            <textarea rows={20} value={encodeInput} onChange={(event) => setEncodeInput(event.target.value)} />
          </div>
          <div>
            <label>Encoded JSON</label>
            <textarea rows={20} value={encodeOutput} readOnly />
            {encodeError ? <p className="muted">{encodeError}</p> : null}
            <div style={{ marginTop: 8 }}>
              <CopyButton value={encodeOutput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
