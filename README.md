# Devknife Toolbox

Supercharge your development workflow with powerful offline tools designed to maximize productivity and efficiency.

🚀 v0.1.0 — Initial Release
## ✨ New Features
- Base64 encode/decode
- JWT creation + verification (HS256/384/512)
- JSON format/validate + JSON compare
- Regex tester
- URL parser + URI component encode/decode
- UUID v1/v4 + ULID
- Cron analyzer (next runs)
- RSA key generator
- AES-GCM encrypt/decrypt
- QR code generator
- HTML + Markdown preview
- SHA + MD5 + HMAC
- PGP encrypt/decrypt
- Timestamp converter
- Port checker (native TCP)
- Text diff
- X.509 decoder
- Snippet manager (local storage)
- Curl to code (PHP/Go/JS/Java)
- Dark mode & Light mode support

## Development Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run tauri dev
   ```
3. Build:

   Apple Silicon
   ```bash
   npm run tauri build -- --target aarch64-apple-darwin
   ```
   
   Intel
   ```bash
   npm run tauri build -- --target x86_64-apple-darwin
   ```

   Windows:
   ```bash
   npm run tauri build -- --target x86_64-pc-windows-msvc
   ```

   Linux (x86_64):
   ```bash
   npm run tauri build -- --target x86_64-unknown-linux-gnu
   ```


## Install Application

Download the latest release from:
- [GitHub Releases](https://github.com/louis-hoang21/Devknife-Toolbox/releases)