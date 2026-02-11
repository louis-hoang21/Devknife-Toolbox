export const textEncoder = new TextEncoder();
export const textDecoder = new TextDecoder();

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function encodeBase64(text: string): string {
  return bytesToBase64(textEncoder.encode(text));
}

export function decodeBase64(base64: string): string {
  return textDecoder.decode(base64ToBytes(base64));
}

export function toBase64Url(base64: string): string {
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export function fromBase64Url(base64url: string): string {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad) base64 += "=".repeat(4 - pad);
  return base64;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function hexToBytes(hex: string): Uint8Array {
  const clean = hex.trim().replace(/^0x/, "");
  if (clean.length % 2 !== 0) {
    throw new Error("Hex must have an even number of characters");
  }
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = Number.parseInt(clean.slice(i, i + 2), 16);
  }
  return bytes;
}

export function bytesToPem(bytes: ArrayBuffer, label: string): string {
  const base64 = bytesToBase64(new Uint8Array(bytes));
  const lines = base64.match(/.{1,64}/g) ?? [];
  return `-----BEGIN ${label}-----\n${lines.join("\n")}\n-----END ${label}-----`;
}
