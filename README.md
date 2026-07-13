<p align="center">
  <img src="128x128@2x.png" alt="Devknife Toolbox" width="120">
</p>

<p align="center">
  <b>Tiếng Việt</b> |
  <a href="docs/README.en.md">English</a>
</p>

<h1 align="center">Devknife Toolbox</h1>

<p align="center">
  Bộ công cụ hữu ích cho lập trình viên — hoạt động hoàn toàn offline.<br>
  Xây dựng bằng Tauri + React
</p>

<p align="center">
  <img src="https://img.shields.io/badge/macOS-13.0+-blue?style=flat-square" alt="macOS 13+">
  <img src="https://img.shields.io/badge/xây%20dựng%20bằng-Tauri%20+%20React-orange?style=flat-square" alt="Tauri + React">
  <img src="https://img.shields.io/badge/giấy%20phép-MIT-green?style=flat-square" alt="MIT License">
</p>

<p align="center">
  <a href="#tính-năng">Tính năng</a> ·
  <a href="#cài-đặt">Cài đặt</a> ·
  <a href="#phát-triển">Phát triển</a> ·
  <a href="#công-nghệ">Công nghệ</a>
</p>

---

## Tính năng

- **Mã hóa / Giải mã** — Base64, URI Component, AES-GCM, PGP, RSA
- **Hash** — SHA-1/256/384/512, MD5, HMAC
- **JWT** — tạo và xác thực (HS256/384/512)
- **JSON** — định dạng, xác thực, so sánh 2 JSON
- **Regex** — kiểm tra biểu thức chính quy
- **UUID / ULID** — tạo UUID v1/v4 và ULID
- **Cron** — phân tích cú pháp và dự đoán lần chạy tiếp theo
- **QR Code** — tạo mã QR
- **Timestamp** — chuyển đổi Unix timestamp
- **URL** — phân tích và chỉnh sửa URL
- **HTML / Markdown** — preview trực tiếp
- **cURL** — chuyển lệnh cURL sang code (PHP / Go / JS / Java)
- **Text Diff** — so sánh 2 đoạn văn bản
- **X.509** — giải mã chứng chỉ
- **Snippet** — lưu đoạn code cục bộ
- **Port Checker** — kiểm tra cổng mạng (TCP native)

---

## Cài đặt

Tải bản mới nhất tại trang [Releases](https://github.com/louis-hoang21/Devknife-Toolbox/releases).

| Nền tảng | Định dạng |
|----------|-----------|
| macOS    | `.dmg`    |

---

## Phát triển

**Yêu cầu:** [Rust](https://rustup.rs/) · [Node.js](https://nodejs.org/) 22+ · [Git](https://git-scm.com/)

```bash
npm install
npm run tauri dev     # chạy app desktop với hot-reload
```

**Xem UI trên trình duyệt (không cần build Rust):**

```bash
npm run dev           # http://127.0.0.1:1420
```

**Build bản production:**

```bash
# Apple Silicon
npm run tauri build -- --target aarch64-apple-darwin

# Intel
npm run tauri build -- --target x86_64-apple-darwin
```

---

## Công nghệ

- **Frontend:** React · TypeScript · Vite
- **Backend:** Rust (Tauri)

---

## Giấy phép

MIT — xem [LICENSE](LICENSE).
