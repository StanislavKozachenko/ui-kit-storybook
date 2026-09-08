import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
  ],
  test: {
    globals: true,
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        { browser: "chromium" },
      ],
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
