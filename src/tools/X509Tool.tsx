import { useEffect, useState } from "react";

const sampleCert = `-----BEGIN CERTIFICATE-----
MIIBzjCCAXWgAwIBAgIUBb3FWwy2Fx7YTUHKeGhPQad7DTkwCgYIKoZIzj0EAwIw
KDEmMCQGA1UEAwwdVGFpaGEgVGVzdCBDZXJ0aWZpY2F0ZTAeFw0yNDAxMDEwMDAw
MDBaFw0yNTAxMDEwMDAwMDBaMCgxJjAkBgNVBAMMHVRhaWhhIFRlc3QgQ2VydGlm
aWNhdGUwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARoVtH1Prn1nV53bIOm6Yq3
GO3xGlLY8+V1X3gGZPudg3u2JkB1+4q7HUpHg2mV+uEoJs1rL6O5ukzKx1sYo1Mw
UTAdBgNVHQ4EFgQU6pe4cl7bHjJ0f06EE9+Q3rHHEw8wHwYDVR0jBBgwFoAU6pe4
cl7bHjJ0f06EE9+Q3rHHEw8wDwYDVR0TAQH/BAUwAwEB/zAKBggqhkjOPQQDAgNI
ADBFAiEAiof9gKOdRZ2s9QNKUdwx37v0SBILn4CToPxZ+6V1MncCIHyJglhHHQQp
5x0+S8eF1j7DypcA5B8d8weqiZc2t8Kr
-----END CERTIFICATE-----`;

let forgeModule: any | null = null;
const loadForge = async () => {
  if (!forgeModule) {
    forgeModule = await import("node-forge");
  }
  return forgeModule;
};

export default function X509Tool() {
  const [pem, setPem] = useState(sampleCert);
  const [info, setInfo] = useState<null | {
    subject: string;
    issuer: string;
    serialNumber: string;
    validFrom: string;
    validTo: string;
    signature: string;
  }>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const parse = async () => {
      try {
        const mod = await loadForge();
        const forge = mod.default ?? mod;
        const cert = forge.pki.certificateFromPem(pem);
        const subject = cert.subject.attributes.map((attr: any) => `${attr.shortName || attr.name}=${attr.value}`).join(", ");
        const issuer = cert.issuer.attributes.map((attr: any) => `${attr.shortName || attr.name}=${attr.value}`).join(", ");
        setInfo({
          subject,
          issuer,
          serialNumber: cert.serialNumber,
          validFrom: cert.validity.notBefore.toISOString(),
          validTo: cert.validity.notAfter.toISOString(),
          signature: cert.signatureOid
        });
        setError("");
      } catch (err) {
        setInfo(null);
        setError((err as Error).message);
      }
    };
    void parse();
  }, [pem]);

  return (
    <div className="grid">
      <div className="card">
        <label>Certificate PEM</label>
        <textarea value={pem} onChange={(event) => setPem(event.target.value)} style={{ minHeight: 200 }} />
        {error ? <p className="muted">{error}</p> : null}
      </div>
      <div className="card">
        <label>Decoded Info</label>
        {info ? (
          <div className="output">
            Subject: {info.subject}
            {"\n"}
            Issuer: {info.issuer}
            {"\n"}
            Serial: {info.serialNumber}
            {"\n"}
            Valid From: {info.validFrom}
            {"\n"}
            Valid To: {info.validTo}
            {"\n"}
            Signature OID: {info.signature}
          </div>
        ) : (
          <p className="muted">Paste a PEM certificate to decode it.</p>
        )}
      </div>
    </div>
  );
}
