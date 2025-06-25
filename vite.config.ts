import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // using the SWC version for faster builds
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // enable IPv6
    port: 8080,
    open: true
  },
  plugins: [
    react(),
    tsconfigPaths(), // supports tsconfig path aliases
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // ensures '@' points to 'src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Example: add global styles if needed
        // additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true
  }
}));
