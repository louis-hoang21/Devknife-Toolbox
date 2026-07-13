<p align="center">
  <img src="../128x128@2x.png" alt="Devknife Toolbox" width="120">
</p>

<p align="center">
  <a href="../README.md">Tiếng Việt</a> |
  <b>English</b>
</p>

<h1 align="center">Devknife Toolbox</h1>

<p align="center">
  A collection of useful tools for developers — works completely offline.<br>
  Built with Tauri + React
</p>

<p align="center">
  <img src="https://img.shields.io/badge/macOS-13.0+-blue?style=flat-square" alt="macOS 13+">
  <img src="https://img.shields.io/badge/built%20with-Tauri%20+%20React-orange?style=flat-square" alt="Tauri + React">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License">
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#development">Development</a> ·
  <a href="#tech-stack">Tech Stack</a>
</p>

---

## Features

- **Encoding / Decoding** — Base64, URI Component, AES-GCM, PGP, RSA
- **Hashing** — SHA-1/256/384/512, MD5, HMAC
- **JWT** — create and verify tokens (HS256/384/512)
- **JSON** — format, validate, diff two JSON documents
- **Regex** — test regular expressions
- **UUID / ULID** — generate UUID v1/v4 and ULID
- **Cron** — parse expressions and preview next run times
- **QR Code** — generate QR codes
- **Timestamp** — convert Unix timestamps
- **URL** — parse and inspect URLs
- **HTML / Markdown** — live preview
- **cURL** — convert cURL commands to code (PHP / Go / JS / Java)
- **Text Diff** — compare two text blocks
- **X.509** — decode certificates
- **Snippet** — save code snippets locally
- **Port Checker** — check open ports (native TCP)

---

## Installation

Download the latest release from [Releases](https://github.com/louis-hoang21/Devknife-Toolbox/releases).

| Platform | Format |
|----------|--------|
| macOS    | `.dmg` |

---

## Development

**Requirements:** [Rust](https://rustup.rs/) · [Node.js](https://nodejs.org/) 22+ · [Git](https://git-scm.com/)

```bash
npm install
npm run tauri dev     # run desktop app with hot-reload
```

**Preview UI in browser (no Rust build needed):**

```bash
npm run dev           # http://127.0.0.1:1420
```

**Production build:**

```bash
# Apple Silicon
npm run tauri build -- --target aarch64-apple-darwin

# Intel
npm run tauri build -- --target x86_64-apple-darwin
```

---

## Tech Stack

- **Frontend:** React · TypeScript · Vite
- **Backend:** Rust (Tauri)

---

## License

MIT — see [LICENSE](../LICENSE).
