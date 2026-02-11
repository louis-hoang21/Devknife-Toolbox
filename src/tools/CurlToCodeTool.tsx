import { useEffect, useState } from "react";
import CopyButton from "../components/CopyButton";

let curlModule: any | null = null;
const loadCurlConverter = async () => {
  if (!curlModule) {
    curlModule = await import("curlconverter");
  }
  return curlModule;
};

const converters: Record<string, (cmd: string, mod: any) => string> = {
  javascript: (cmd, mod) => mod.toNode(cmd),
  php: (cmd, mod) => mod.toPhp(cmd),
  go: (cmd, mod) => mod.toGo(cmd),
  java: (cmd, mod) => mod.toJava(cmd)
};

export default function CurlToCodeTool() {
  const [curl, setCurl] = useState("curl https://api.example.com/users -H 'Authorization: Bearer TOKEN'");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const converter = converters[language];
        if (!converter) {
          setOutput("");
          setError("Unsupported language");
          return;
        }
        const mod = await loadCurlConverter();
        const api = mod.default ?? mod;
        setOutput(converter(curl, api));
        setError("");
      } catch (err) {
        setOutput("");
        setError((err as Error).message);
      }
    };
    void run();
  }, [curl, language]);

  return (
    <div className="grid">
      <div className="card">
        <label>cURL Command</label>
        <textarea value={curl} onChange={(event) => setCurl(event.target.value)} style={{ minHeight: 160 }} />
        <div style={{ marginTop: 12 }}>
          <label>Target Language</label>
          <select className="form-control" value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="php">PHP</option>
            <option value="go">Go</option>
            <option value="java">Java</option>
          </select>
        </div>
      </div>
      <div className="card">
        <label>Generated Code</label>
        <textarea value={output} readOnly style={{ minHeight: 200 }} />
        {error ? <p className="muted">{error}</p> : null}
        <div style={{ marginTop: 8 }}>
          <CopyButton value={output} />
        </div>
      </div>
    </div>
  );
}
