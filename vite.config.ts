import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [react(), cloudflare()],
	server: {
    proxy: {
      '/sabio': {
        target: 'https://sabiork.h-its.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sabio/, '/sabioRestWebServices'),
      },
    },
  },
});
