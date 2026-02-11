import { useState } from "react";
import CopyButton from "../components/CopyButton";
import { bytesToPem } from "../lib/encoding";

export default function RsaTool() {
  const [size, setSize] = useState(2048);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [status, setStatus] = useState("");

  const generate = async () => {
    try {
      setStatus("Generating...");
      const keyPair = await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: size,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
      );
      const publicBuffer = await crypto.subtle.exportKey("spki", keyPair.publicKey);
      const privateBuffer = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
      setPublicKey(bytesToPem(publicBuffer, "PUBLIC KEY"));
      setPrivateKey(bytesToPem(privateBuffer, "PRIVATE KEY"));
      setStatus("Ready");
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <div className="grid two">
          <div>
            <label>Key Size</label>
            <select className="form-control" value={size} onChange={(event) => setSize(Number.parseInt(event.target.value, 10))}>
              <option value={2048}>2048</option>
              <option value={3072}>3072</option>
              <option value={4096}>4096</option>
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button className="primary" type="button" onClick={generate}>
              Generate RSA Keys
            </button>
          </div>
        </div>
        {status ? <p className="muted">{status}</p> : null}
      </div>
      <div className="card">
        <label>Public Key</label>
        <textarea value={publicKey} readOnly />
        <div style={{ marginTop: 8 }}>
          <CopyButton value={publicKey} />
        </div>
      </div>
      <div className="card">
        <label>Private Key</label>
        <textarea value={privateKey} readOnly />
        <div style={{ marginTop: 8 }}>
          <CopyButton value={privateKey} />
        </div>
      </div>
    </div>
  );
}
