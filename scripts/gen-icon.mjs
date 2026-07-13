// Generates a 1024x1024 PNG source icon (no external deps) for `tauri icon`.
// Design: dark navy badge with a teal knife motif representing "Devknife".
// Badge style: inset 100px on each side (matches ChatGPT / macOS badge proportions).
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const S = 1024;
const buf = Buffer.alloc(S * S * 4);

function px(x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= S || y >= S) return;
  const i = (y * S + x) * 4;
  buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = a;
}

// Palette — matches app CSS variables
const BADGE_BG = [0x17, 0x21, 0x31]; // --panel dark navy
const TEAL_TOP = [0x32, 0xd6, 0xa3]; // --accent teal
const TEAL_BOT = [0x1a, 0xa8, 0x7c]; // darker teal

function teal(y, yMin, yMax) {
  let t = Math.max(0, Math.min(1, (y - yMin) / (yMax - yMin)));
  return [
    Math.round(TEAL_TOP[0] + (TEAL_BOT[0] - TEAL_TOP[0]) * t),
    Math.round(TEAL_TOP[1] + (TEAL_BOT[1] - TEAL_TOP[1]) * t),
    Math.round(TEAL_TOP[2] + (TEAL_BOT[2] - TEAL_TOP[2]) * t),
  ];
}

// Badge geometry
const INSET  = 100;
const RADIUS = 160;

function sdRoundedBox(px, py, halfW, halfH, r) {
  const qx = Math.abs(px) - halfW + r;
  const qy = Math.abs(py) - halfH + r;
  return (
    Math.sqrt(Math.max(qx, 0) ** 2 + Math.max(qy, 0) ** 2) +
    Math.min(Math.max(qx, qy), 0) -
    r
  );
}

const CX = S / 2;
const CY = S / 2;
const HALF = S / 2 - INSET;

// Paint the dark navy badge; outside is transparent
for (let y = 0; y < S; y++) {
  for (let x = 0; x < S; x++) {
    const dist = sdRoundedBox(x - CX, y - CY, HALF, HALF, RADIUS);
    const alpha = Math.max(0, Math.min(1, -dist + 0.5));
    if (alpha <= 0) { px(x, y, 0, 0, 0, 0); continue; }
    px(x, y, BADGE_BG[0], BADGE_BG[1], BADGE_BG[2], Math.round(alpha * 255));
  }
}

// ── Knife motif ─────────────────────────────────────────────────────────────
const Y_TOP = 185;
const Y_BOT = 845;

function drawLine(x0, y0, x1, y1, w) {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const x = Math.round(x0 + (x1 - x0) * t);
    const y = Math.round(y0 + (y1 - y0) * t);
    const col = teal(y, Y_TOP, Y_BOT);
    for (let dy = -w; dy <= w; dy++)
      for (let dx = -w; dx <= w; dx++)
        if (dx * dx + dy * dy <= w * w)
          px(x + dx, y + dy, col[0], col[1], col[2], 255);
  }
}

function fillCircle(cx, cy, r) {
  for (let y = cy - r; y <= cy + r; y++)
    for (let x = cx - r; x <= cx + r; x++)
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) {
        const col = teal(y, Y_TOP, Y_BOT);
        px(x, y, col[0], col[1], col[2], 255);
      }
}

// Blade — scaled up ~20% vs original
const B_TIP_X = 715, B_TIP_Y = 185;
const B_BASE_X = 305, B_BASE_Y = 618;
const BLADE_W = 34;

drawLine(B_TIP_X, B_TIP_Y, B_BASE_X, B_BASE_Y, BLADE_W);
fillCircle(B_TIP_X, B_TIP_Y, BLADE_W);

// Guard
const GUARD_W = 64, GUARD_H = 22;
for (let y = B_BASE_Y - GUARD_H; y <= B_BASE_Y + GUARD_H; y++)
  for (let x = B_BASE_X - GUARD_W; x <= B_BASE_X + GUARD_W; x++) {
    const col = teal(y, Y_TOP, Y_BOT);
    px(x, y, col[0], col[1], col[2], 255);
  }

// Handle
const H_END_X = 234, H_END_Y = 845;
drawLine(B_BASE_X - 14, B_BASE_Y + 26, H_END_X, H_END_Y, 46);
fillCircle(H_END_X, H_END_Y, 46);

// Rivet
fillCircle(
  Math.round((B_BASE_X + H_END_X) / 2) - 12,
  Math.round((B_BASE_Y + H_END_Y) / 2) - 6,
  20
);

// ── PNG encode ───────────────────────────────────────────────────────────────
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td) >>> 0);
  return Buffer.concat([len, td, crc]);
}
function crc32(b) {
  let c = ~0;
  for (let i = 0; i < b.length; i++) {
    c ^= b[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c;
}

const raw = Buffer.alloc((S * 4 + 1) * S);
for (let y = 0; y < S; y++) {
  raw[y * (S * 4 + 1)] = 0;
  buf.copy(raw, y * (S * 4 + 1) + 1, y * S * 4, (y + 1) * S * 4);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(S, 0);
ihdr.writeUInt32BE(S, 4);
ihdr[8] = 8; ihdr[9] = 6;
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw)),
  chunk("IEND", Buffer.alloc(0)),
]);
writeFileSync(new URL("../app-icon.png", import.meta.url), png);
console.log("wrote app-icon.png", png.length, "bytes");
