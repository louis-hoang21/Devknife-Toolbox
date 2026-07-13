import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 1420,
    strictPort: true
  },
  build: {
    target: "es2020",
    sourcemap: false,
    minify: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/openpgp/")) return "vendor-openpgp";
          if (id.includes("/node-forge/")) return "vendor-forge";
          if (id.includes("/curlconverter/")) return "vendor-curl";
          if (id.includes("/qrcode/")) return "vendor-qr";
          if (id.includes("/marked/")) return "vendor-marked";
          if (id.includes("/react-dom/") || id.includes("/react/") || id.includes("/scheduler/")) return "vendor-react";
          return "vendor";
        }
      }
    }
  },
  esbuild: {
    drop: ["console", "debugger"] as ("console" | "debugger")[]
  }
}));
