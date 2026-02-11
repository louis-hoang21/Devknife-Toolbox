import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true
  },
  build: {
    target: "es2020",
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "tool-pgp": ["openpgp"],
          "tool-x509": ["node-forge"],
          "tool-qr": ["qrcode"],
          "tool-curl": ["curlconverter"],
          "tool-markdown": ["marked"]
        }
      }
    }
  },
  esbuild: {
    drop: ["console", "debugger"] as ("console" | "debugger")[]
  }
}));
