import { lazy } from "react";

const tools = [
  {
    id: "base64",
    name: "Mã hóa/Giải mã Base64",
    description: "Encode or decode Base64 with Unicode-safe handling.",
    component: lazy(() => import("./Base64Tool"))
  },
  {
    id: "jwt",
    name: "Tạo và Xác thực JWT",
    description: "Create and verify JWT tokens (HS256/384/512).",
    component: lazy(() => import("./JwtTool"))
  },
  {
    id: "json",
    name: "Định dạng và Xác thực JSON",
    description: "Validate, format, and pretty-print JSON payloads.",
    component: lazy(() => import("./JsonTool"))
  },
  {
    id: "regex",
    name: "Kiểm tra Regex",
    description: "Test regex patterns and inspect matches and groups.",
    component: lazy(() => import("./RegexTool"))
  },
  {
    id: "url",
    name: "Phân tích URL",
    description: "Parse URL parts, query params, and credentials.",
    component: lazy(() => import("./UrlTool"))
  },
  {
    id: "uri-component",
    name: "Mã hóa/Giải mã URI Component",
    description: "Encode/decode URI components safely.",
    component: lazy(() => import("./UriComponentTool"))
  },
  {
    id: "uuid",
    name: "UUID",
    description: "Generate RFC 4122 UUID v1 and v4.",
    component: lazy(() => import("./UuidTool"))
  },
  {
    id: "ulid",
    name: "ULID",
    description: "Generate ULIDs with time-ordered entropy.",
    component: lazy(() => import("./UlidTool"))
  },
  {
    id: "cron",
    name: "Cron",
    description: "Validate cron expressions and preview upcoming runs.",
    component: lazy(() => import("./CronTool"))
  },
  {
    id: "json-compare",
    name: "So sánh JSON",
    description: "Compare JSON documents and highlight differences.",
    component: lazy(() => import("./JsonCompareTool"))
  },
  {
    id: "rsa",
    name: "Tạo Khóa RSA",
    description: "Generate RSA key pairs and export as PEM.",
    component: lazy(() => import("./RsaTool"))
  },
  {
    id: "aes",
    name: "Công cụ Mã hóa/Giải mã AES",
    description: "Encrypt/decrypt with AES-GCM and random IVs.",
    component: lazy(() => import("./AesTool"))
  },
  {
    id: "qr",
    name: "Tạo Mã QR",
    description: "Generate QR codes with configurable size and error correction.",
    component: lazy(() => import("./QrTool"))
  },
  {
    id: "html-preview",
    name: "Xem trước HTML",
    description: "Live preview custom HTML snippets.",
    component: lazy(() => import("./HtmlPreviewTool"))
  },
  {
    id: "sha",
    name: "Tạo mã SHA",
    description: "Compute SHA-1/256/384/512 hashes.",
    component: lazy(() => import("./ShaTool"))
  },
  {
    id: "md5",
    name: "Tạo mã MD5",
    description: "Compute MD5 hashes for strings.",
    component: lazy(() => import("./Md5Tool"))
  },
  {
    id: "hmac",
    name: "Tạo mã HMAC SHA",
    description: "Compute HMAC with SHA algorithms.",
    component: lazy(() => import("./HmacTool"))
  },
  {
    id: "pgp",
    name: "PGP",
    description: "Encrypt/decrypt messages and manage PGP keys.",
    component: lazy(() => import("./PgpTool"))
  },
  {
    id: "timestamp",
    name: "Timestamp",
    description: "Convert timestamps to dates and back.",
    component: lazy(() => import("./TimestampTool"))
  },
  {
    id: "port-check",
    name: "Kiểm tra cổng",
    description: "Check if a host port is reachable using native TCP.",
    component: lazy(() => import("./PortCheckTool"))
  },
  {
    id: "text-diff",
    name: "Kiểm tra sự khác biệt văn bản",
    description: "Compare two texts with line-by-line diff.",
    component: lazy(() => import("./TextDiffTool"))
  },
  {
    id: "markdown",
    name: "Markdown",
    description: "Render markdown live with syntax highlighting support.",
    component: lazy(() => import("./MarkdownTool"))
  },
  {
    id: "x509",
    name: "Bộ giải mã chứng chỉ (X.509)",
    description: "Parse PEM certificates and inspect metadata.",
    component: lazy(() => import("./X509Tool"))
  },
  {
    id: "snippets",
    name: "Quản lý Snippet",
    description: "Store reusable snippets locally with tags.",
    component: lazy(() => import("./SnippetTool"))
  },
  {
    id: "curl",
    name: "Curl to Code (PHP, Go, JS, Java)",
    description: "Convert curl commands into SDK-ready code.",
    component: lazy(() => import("./CurlToCodeTool"))
  }
];

export default tools;
