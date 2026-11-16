import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), viteReact()],
  test: { environment: "jsdom", setupFiles: ["./src/test/setup.ts"] },
});
