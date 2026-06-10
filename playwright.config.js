// @ts-check
import { defineConfig, devices } from '@playwright/test';

const playwrightTestHost =
  process.env.PLAYWRIGHT_TEST_HOST || 'http://localhost:3000';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [process.env.CI ? 'github' : 'list'],
    ['html', { open: 'never', host: '0.0.0.0', port: 9323 }],
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run start',
    url: playwrightTestHost,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  // Shared settings for all the projects below.
  // See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
    baseURL: playwrightTestHost,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
