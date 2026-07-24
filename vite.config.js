import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/shrivardhan-portfolio/", // MUST match your repo name
  plugins: [react(), tailwindcss()],
  build: {
    // Three.js + R3F is legitimately large; suppress false-positive warning.
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate Three.js ecosystem into a dedicated vendor chunk.
          // This keeps the main bundle lean and lets browsers cache
          // the 3D library separately.
          "vendor-three": ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
});
