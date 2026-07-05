import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright para testes E2E.
 * Os testes E2E ficam em: ./e2e/
 * Os testes unitários Vitest ficam em: ./src/
 *
 * IMPORTANTE: Este arquivo garante que o Playwright nunca execute
 * arquivos .test.jsx do Vitest — apenas arquivos .spec.js em ./e2e/
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      environmentInfo: {
        OS: process.platform,
        NodeJS: process.version,
        CI: process.env.CI || 'false',
        Browser: 'Chromium'
      }
    }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
