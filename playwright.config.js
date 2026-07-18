import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:4173/simulator/",
    browserName: "chromium",
    channel: "chrome",
    viewport: { width: 1600, height: 1200 },
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    reuseExistingServer: true,
    timeout: 30_000,
    url: "http://127.0.0.1:4173/simulator/",
  },
});
