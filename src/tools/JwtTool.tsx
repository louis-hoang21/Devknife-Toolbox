import { useEffect, useMemo, useState } from "react";
import CopyButton from "../components/CopyButton";
import { bytesToBase64, decodeBase64, encodeBase64, fromBase64Url, toBase64Url } from "../lib/encoding";
import { signJwt, verifyJwt } from "../lib/crypto";

const ALG_MAP = {
  HS256: "SHA-256",
  HS384: "SHA-384",
  HS512: "SHA-512"
} as const;

type AlgKey = keyof typeof ALG_MAP;

export default function JwtTool() {
  const [header, setHeader] = useState('{"alg":"HS256","typ":"JWT"}');
  const [payload, setPayload] = useState('{"sub":"123","name":"Devknife","admin":true}');
  const [secret, setSecret] = useState("super-secret");
  const [alg, setAlg] = useState<AlgKey>("HS256");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const build = async () => {
      try {
        const headerObj = JSON.parse(header);
        const payloadObj = JSON.parse(payload);
        headerObj.alg = alg;
        const headerB64 = toBase64Url(encodeBase64(JSON.stringify(headerObj)));
        const payloadB64 = toBase64Url(encodeBase64(JSON.stringify(payloadObj)));
        const data = `${headerB64}.${payloadB64}`;
        const signatureBytes = await signJwt(ALG_MAP[alg], data, secret);
        const signature = toBase64Url(bytesToBase64(signatureBytes));
        setToken(`${data}.${signature}`);
        setError("");
      } catch (err) {
        setError((err as Error).message);
      }
    };
    void build();
  }, [header, payload, secret, alg]);

  const decoded = useMemo(() => {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    try {
      const headerJson = decodeBase64(fromBase64Url(parts[0]));
      const payloadJson = decodeBase64(fromBase64Url(parts[1]));
      return { header: headerJson, payload: payloadJson };
    } catch {
      return null;
    }
  }, [token]);

  const [verifyStatus, setVerifyStatus] = useState<"unknown" | "valid" | "invalid">("unknown");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setVerifyStatus("unknown");
        return;
      }
      const parts = token.split(".");
      if (parts.length !== 3) {
        setVerifyStatus("invalid");
        return;
      }
      try {
        const data = `${parts[0]}.${parts[1]}`;
        const sigBytes = Uint8Array.from(atob(fromBase64Url(parts[2])), (c) => c.charCodeAt(0));
        const isValid = await verifyJwt(ALG_MAP[alg], data, sigBytes, secret);
        setVerifyStatus(isValid ? "valid" : "invalid");
      } catch {
        setVerifyStatus("invalid");
      }
    };
    void verify();
  }, [token, secret, alg]);

  return (
    <div className="grid">
      <div className="card">
        <div className="grid two">
          <div>
            <label>Header (JSON)</label>
            <textarea value={header} onChange={(event) => setHeader(event.target.value)} />
          </div>
          <div>
            <label>Payload (JSON)</label>
            <textarea value={payload} onChange={(event) => setPayload(event.target.value)} />
          </div>
        </div>
        <div className="grid two" style={{ marginTop: 12 }}>
          <div>
            <label>Secret</label>
            <input value={secret} onChange={(event) => setSecret(event.target.value)} />
          </div>
          <div>
            <label>Algorithm</label>
            <select className="form-control" value={alg} onChange={(event) => setAlg(event.target.value as AlgKey)}>
              {Object.keys(ALG_MAP).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <label>JWT Token</label>
        <textarea value={token} onChange={(event) => setToken(event.target.value)} />
        {error ? <p className="muted">{error}</p> : null}
        <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
          <CopyButton value={token} />
          <span className="badge">{verifyStatus === "valid" ? "Valid" : verifyStatus === "invalid" ? "Invalid" : "Unknown"}</span>
        </div>
      </div>

      <div className="card">
        <div className="grid two">
          <div>
            <label>Decoded Header</label>
            <div className="output">{decoded?.header ?? "-"}</div>
          </div>
          <div>
            <label>Decoded Payload</label>
            <div className="output">{decoded?.payload ?? "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
