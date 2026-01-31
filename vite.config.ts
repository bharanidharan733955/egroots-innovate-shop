import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_BACKEND_URL || env.BACKEND_URL;

  return {
    base: "/",

    server: {
      host: "::",
      port: 8080,
      ...(apiTarget && {
        proxy: {
          "/api": {
            target: apiTarget,
            changeOrigin: true,
            secure: false,
          },
        },
      }),
    },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
