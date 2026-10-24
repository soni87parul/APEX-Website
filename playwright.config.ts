import { defineConfig, devices } from '@playwright/test';

// Runs against the production build via `vite preview`. Set CHROMIUM_PATH to use a preinstalled Chromium.
const executablePath = process.env.CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:4178',
    launchOptions: { executablePath },
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        launchOptions: { executablePath },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 7'],
        viewport: { width: 390, height: 844 },
        launchOptions: { executablePath },
      },
    },
  ],
  webServer: {
    command: 'npx vite preview --port 4178 --strictPort',
    url: 'http://localhost:4178',
    reuseExistingServer: !process.env.CI,
  },
});
