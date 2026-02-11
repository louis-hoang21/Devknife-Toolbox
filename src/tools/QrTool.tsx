import { useEffect, useState } from "react";
import CopyButton from "../components/CopyButton";

let qrModule: any | null = null;
const loadQr = async () => {
  if (!qrModule) {
    qrModule = await import("qrcode");
  }
  return qrModule;
};

export default function QrTool() {
  const [text, setText] = useState("https://tool.devknife.dev");
  const [size, setSize] = useState(240);
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const build = async () => {
      try {
        const mod = await loadQr();
        const qrcode = mod.default ?? mod;
        const url = await qrcode.toDataURL(text, {
          errorCorrectionLevel: level,
          width: size,
          margin: 2
        });
        setDataUrl(url);
        setError("");
      } catch (err) {
        setError((err as Error).message);
      }
    };
    void build();
  }, [text, size, level]);

  return (
    <div className="grid">
      <div className="card">
        <label>Content</label>
        <textarea value={text} onChange={(event) => setText(event.target.value)} />
        <div className="grid two" style={{ marginTop: 12 }}>
          <div>
            <label>Size</label>
            <input
              type="number"
              min={120}
              max={600}
              value={size}
              onChange={(event) => setSize(Number.parseInt(event.target.value, 10))}
            />
          </div>
          <div>
            <label>Error Correction</label>
            <select className="form-control" value={level} onChange={(event) => setLevel(event.target.value as "L" | "M" | "Q" | "H")}>
              <option value="L">Low (L)</option>
              <option value="M">Medium (M)</option>
              <option value="Q">Quartile (Q)</option>
              <option value="H">High (H)</option>
            </select>
          </div>
        </div>
        {error ? <p className="muted">{error}</p> : null}
      </div>
      <div className="card">
        <label>Preview</label>
        {dataUrl ? (
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <img src={dataUrl} alt="QR" style={{ width: size, height: size, background: "white", padding: 8, borderRadius: 12 }} />
            <div>
              <CopyButton value={dataUrl} label="Copy Data URL" />
            </div>
          </div>
        ) : (
          <p className="muted">Enter text to generate a QR code.</p>
        )}
      </div>
    </div>
  );
}
