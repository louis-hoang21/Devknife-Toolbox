const byteToHex: string[] = [];
for (let i = 0; i < 256; i += 1) {
  byteToHex.push(i.toString(16).padStart(2, "0"));
}

export function uuidv4() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return formatUuid(bytes);
}

let lastMs = 0n;
let lastNs = 0n;
const clockSeqBytes = new Uint8Array(2);
crypto.getRandomValues(clockSeqBytes);
let clockSeq = (clockSeqBytes[0] << 8) | clockSeqBytes[1];
clockSeq &= 0x3fff;
const nodeId = crypto.getRandomValues(new Uint8Array(6));
nodeId[0] |= 0x01;

export function uuidv1() {
  const now = BigInt(Date.now());
  let nsecs = lastNs + 1n;
  if (now === lastMs) {
    if (nsecs >= 10000n) {
      lastMs = now + 1n;
      nsecs = 0n;
    }
  } else {
    lastMs = now;
    nsecs = 0n;
  }
  lastNs = nsecs;

  const uuidEpoch = 12219292800000n;
  const t = (lastMs + uuidEpoch) * 10000n + nsecs;

  const timeLow = Number(t & 0xffffffffn);
  const timeMid = Number((t >> 32n) & 0xffffn);
  const timeHi = Number((t >> 48n) & 0x0fffn) | 0x1000;
  const clockSeqHi = ((clockSeq >> 8) & 0x3f) | 0x80;
  const clockSeqLow = clockSeq & 0xff;

  const bytes = new Uint8Array(16);
  bytes[0] = (timeLow >>> 24) & 0xff;
  bytes[1] = (timeLow >>> 16) & 0xff;
  bytes[2] = (timeLow >>> 8) & 0xff;
  bytes[3] = timeLow & 0xff;
  bytes[4] = (timeMid >>> 8) & 0xff;
  bytes[5] = timeMid & 0xff;
  bytes[6] = (timeHi >>> 8) & 0xff;
  bytes[7] = timeHi & 0xff;
  bytes[8] = clockSeqHi;
  bytes[9] = clockSeqLow;
  bytes.set(nodeId, 10);
  return formatUuid(bytes);
}

function formatUuid(bytes: Uint8Array) {
  return (
    byteToHex[bytes[0]] +
    byteToHex[bytes[1]] +
    byteToHex[bytes[2]] +
    byteToHex[bytes[3]] +
    "-" +
    byteToHex[bytes[4]] +
    byteToHex[bytes[5]] +
    "-" +
    byteToHex[bytes[6]] +
    byteToHex[bytes[7]] +
    "-" +
    byteToHex[bytes[8]] +
    byteToHex[bytes[9]] +
    "-" +
    byteToHex[bytes[10]] +
    byteToHex[bytes[11]] +
    byteToHex[bytes[12]] +
    byteToHex[bytes[13]] +
    byteToHex[bytes[14]] +
    byteToHex[bytes[15]]
  );
}

const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export function ulid() {
  const time = Date.now();
  const timeChars = encodeTime(time, 10);
  const randomChars = encodeRandom(16);
  return timeChars + randomChars;
}

function encodeTime(time: number, length: number) {
  let value = time;
  let output = "";
  for (let i = 0; i < length; i += 1) {
    output = CROCKFORD[value % 32] + output;
    value = Math.floor(value / 32);
  }
  return output;
}

function encodeRandom(length: number) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let output = "";
  for (let i = 0; i < length; i += 1) {
    output += CROCKFORD[bytes[i] % 32];
  }
  return output;
}
