import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/8mars/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg']
});
