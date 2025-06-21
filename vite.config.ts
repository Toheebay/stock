import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths() // Enables support for path aliases like @/components
  ],
  resolve: {
    alias: {
      // fallback in case tsconfigPaths plugin misses anything
      "@": "/src"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Add global SCSS variables/mixins if needed
        // additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: "dist",
    sourcemap: true
  }
});
