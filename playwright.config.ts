import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*\.e2e\.spec\.ts/,
    },
    {
      name: "api",
      use: {
        baseURL:
          process.env.API_BASE_URL || "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      // Match only test file ending with .api.spec.ts
      testMatch: /.*\.api\.spec\.ts/,
    },
  ],
});
