import { useState } from "react";
import CopyButton from "../components/CopyButton";

let openpgpModule: any | null = null;
const loadOpenPgp = async () => {
  if (!openpgpModule) {
    openpgpModule = await import("openpgp");
  }
  return openpgpModule;
};

export default function PgpTool() {
  const [name, setName] = useState("Devknife User");
  const [email, setEmail] = useState("user@devknife.dev");
  const [passphrase, setPassphrase] = useState("change-me");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [message, setMessage] = useState("Hello PGP");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [status, setStatus] = useState("");

  const generateKeys = async () => {
    try {
      setStatus("Generating keys...");
      const openpgp = await loadOpenPgp();
      const { publicKey, privateKey } = await openpgp.generateKey({
        type: "rsa",
        rsaBits: 2048,
        userIDs: [{ name, email }],
        passphrase
      });
      setPublicKey(publicKey);
      setPrivateKey(privateKey);
      setStatus("Keys generated");
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  const encryptMessage = async () => {
    try {
      setStatus("Encrypting...");
      const openpgp = await loadOpenPgp();
      const key = await openpgp.readKey({ armoredKey: publicKey });
      const messageObj = await openpgp.createMessage({ text: message });
      const encrypted = await openpgp.encrypt({ message: messageObj, encryptionKeys: key });
      setEncrypted(encrypted);
      setStatus("Encrypted");
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  const decryptMessage = async () => {
    try {
      setStatus("Decrypting...");
      const openpgp = await loadOpenPgp();
      const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: privateKey });
      const decryptedKey = await openpgp.decryptKey({ privateKey: privateKeyObj, passphrase });
      const messageObj = await openpgp.readMessage({ armoredMessage: encrypted });
      const { data } = await openpgp.decrypt({ message: messageObj, decryptionKeys: decryptedKey });
      setDecrypted(data as string);
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
            <label>Name</label>
            <input value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Passphrase</label>
          <input value={passphrase} onChange={(event) => setPassphrase(event.target.value)} />
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button className="primary" type="button" onClick={generateKeys}>
            Generate Key Pair
          </button>
          {status ? <span className="muted">{status}</span> : null}
        </div>
      </div>

      <div className="card">
        <label>Public Key</label>
        <textarea value={publicKey} onChange={(event) => setPublicKey(event.target.value)} />
        <div style={{ marginTop: 8 }}>
          <CopyButton value={publicKey} />
        </div>
      </div>
      <div className="card">
        <label>Private Key</label>
        <textarea value={privateKey} onChange={(event) => setPrivateKey(event.target.value)} />
        <div style={{ marginTop: 8 }}>
          <CopyButton value={privateKey} />
        </div>
      </div>

      <div className="card">
        <label>Message</label>
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button className="primary" type="button" onClick={encryptMessage}>
            Encrypt
          </button>
          <CopyButton value={encrypted} label="Copy Encrypted" />
        </div>
      </div>

      <div className="card">
        <label>Encrypted Output</label>
        <textarea value={encrypted} onChange={(event) => setEncrypted(event.target.value)} />
      </div>

      <div className="card">
        <label>Decrypted Output</label>
        <textarea value={decrypted} readOnly />
        <div style={{ marginTop: 8 }}>
          <button className="ghost" type="button" onClick={decryptMessage}>
            Decrypt
          </button>
        </div>
      </div>
    </div>
  );
}
