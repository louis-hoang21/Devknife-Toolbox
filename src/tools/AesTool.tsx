import { useState } from "react";
import CopyButton from "../components/CopyButton";
import { base64ToBytes, bytesToBase64, textDecoder, textEncoder } from "../lib/encoding";

function randomBytes(length: number) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

export default function AesTool() {
  const [plaintext, setPlaintext] = useState("Secret message");
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState(bytesToBase64(randomBytes(32)));
  const [iv, setIv] = useState(bytesToBase64(randomBytes(12)));
  const [status, setStatus] = useState("");

  const generateKey = () => setKey(bytesToBase64(randomBytes(32)));
  const generateIv = () => setIv(bytesToBase64(randomBytes(12)));

  const encrypt = async () => {
    try {
      const keyBytes = base64ToBytes(key);
      const ivBytes = base64ToBytes(iv);
      const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["encrypt"]);
      const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: ivBytes }, cryptoKey, textEncoder.encode(plaintext));
      setCiphertext(bytesToBase64(new Uint8Array(encrypted)));
      setStatus("Encrypted");
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  const decrypt = async () => {
    try {
      const keyBytes = base64ToBytes(key);
      const ivBytes = base64ToBytes(iv);
      const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["decrypt"]);
      const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBytes }, cryptoKey, base64ToBytes(ciphertext));
      setPlaintext(textDecoder.decode(decrypted));
      setStatus("Decrypted");
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <div className="grid two">
          <div>
            <label>Plaintext</label>
            <textarea value={plaintext} onChange={(event) => setPlaintext(event.target.value)} />
          </div>
          <div>
            <label>Ciphertext (Base64)</label>
            <textarea value={ciphertext} onChange={(event) => setCiphertext(event.target.value)} />
          </div>
        </div>
        <div className="grid two" style={{ marginTop: 12 }}>
          <div>
            <label>AES Key (Base64, 32 bytes)</label>
            <input value={key} onChange={(event) => setKey(event.target.value)} />
          </div>
          <div>
            <label>IV (Base64, 12 bytes)</label>
            <input value={iv} onChange={(event) => setIv(event.target.value)} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          <button className="primary" type="button" onClick={encrypt}>
            Encrypt
          </button>
          <button className="ghost" type="button" onClick={decrypt}>
            Decrypt
          </button>
          <button className="ghost" type="button" onClick={generateKey}>
            New Key
          </button>
          <button className="ghost" type="button" onClick={generateIv}>
            New IV
          </button>
          <CopyButton value={ciphertext} label="Copy Cipher" />
        </div>
        {status ? <p className="muted">{status}</p> : null}
      </div>
    </div>
  );
}
