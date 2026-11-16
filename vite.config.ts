import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// সম্পূর্ণ static সাইট (কোনো সার্ভার নেই): `npm run build` → `dist/client/` ফোল্ডার যেকোনো হোস্টিংয়ে আপলোড করুন
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({ spa: { enabled: true, prerender: { outputPath: "/index.html" } } }),
    viteReact(),
  ],
});
