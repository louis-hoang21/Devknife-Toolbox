import { bytesToHex, textEncoder } from "./encoding";

export async function hashString(algorithm: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512", input: string) {
  const data = textEncoder.encode(input);
  const digest = await crypto.subtle.digest(algorithm, data);
  return bytesToHex(new Uint8Array(digest));
}

export async function hmacString(
  algorithm: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512",
  input: string,
  secret: string
) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: { name: algorithm } },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(input));
  return bytesToHex(new Uint8Array(signature));
}

export async function signJwt(
  algorithm: "SHA-256" | "SHA-384" | "SHA-512",
  data: string,
  secret: string
) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: { name: algorithm } },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(data));
  return new Uint8Array(signature);
}

export async function verifyJwt(
  algorithm: "SHA-256" | "SHA-384" | "SHA-512",
  data: string,
  signature: Uint8Array,
  secret: string
) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: { name: algorithm } },
    false,
    ["verify"]
  );
  return crypto.subtle.verify("HMAC", key, signature, textEncoder.encode(data));
}
