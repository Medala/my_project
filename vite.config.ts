import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import viteTsconfigPaths from "vite-tsconfig-paths"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { port: 3002 },

  build: {
    // Enable minification using Terser (this is the default in production)
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove console.log and other console methods
        drop_console: true,
      },
    },
    // Optional: You can set additional options like the output directory
    outDir: path.resolve(__dirname, "dist"), // Customize output directory if needed
  },
})
