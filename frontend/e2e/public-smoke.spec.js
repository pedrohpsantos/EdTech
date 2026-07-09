import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('Public and Navigation Smoke', () => {
  test.beforeEach(() => {
    allure.epic('Production Smoke');
    allure.feature('Public Navigation');
    allure.tags('smoke', 'public');
  });

  test('login page exposes institutional credential fields', async ({ page }) => {
    allure.story('Login form');

    await page.goto('/login');

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible();
  });

  test('root route renders the login experience', async ({ page }) => {
    allure.story('Root route');

    await page.goto('/');

    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /cadastre-se/i })).toBeVisible();
  });

  test('session expiration warning is visible from login query parameter', async ({ page }) => {
    allure.story('Expired session message');

    await page.goto('/login?session_expired=true');

    await expect(page.getByText(/sess/i)).toBeVisible();
  });

  test('register page exposes required account fields', async ({ page }) => {
    allure.story('Register form');

    await page.goto('/register');

    await expect(page.locator('input[aria-label="nome"]')).toBeVisible();
    await expect(page.locator('input[aria-label="email"]')).toBeVisible();
    await expect(page.locator('input[aria-label="senha"]')).toBeVisible();
    await expect(page.locator('input[aria-label="confirmar senha"]')).toBeVisible();
  });

  test('register page validates password confirmation before submitting', async ({ page }) => {
    allure.story('Password confirmation validation');

    await page.goto('/register');
    await page.locator('input[aria-label="nome"]').fill('Pesquisador Teste');
    await page.locator('input[aria-label="email"]').fill('pesquisador@unb.br');
    await page.locator('input[aria-label="senha"]').fill('Senha@123');
    await page.locator('input[aria-label="confirmar senha"]').fill('Outra@123');
    await page.getByRole('button', { name: /criar conta/i }).click();

    await expect(page.getByText(/senhas/i)).toBeVisible();
  });

  test('password recovery page starts at email collection step', async ({ page }) => {
    allure.story('Password recovery');

    await page.goto('/recover-password');

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /continuar/i })).toBeVisible();
  });

  test('about page documents the project and team', async ({ page }) => {
    allure.story('About page');

    await page.goto('/about');

    await expect(page.getByRole('heading', { name: /sobre o projeto edtech/i })).toBeVisible();
    await expect(page.getByText(/AILAB Makers/i)).toBeVisible();
  });

  test('unknown routes render the not found page', async ({ page }) => {
    allure.story('Not found route');

    await page.goto('/rota-inexistente');

    await expect(page.getByRole('heading', { name: /404/i })).toBeVisible();
  });
});

test.describe('Protected Route Guards', () => {
  const protectedRoutes = [
    '/dashboard',
    '/documentos',
    '/projects',
    '/upload',
    '/trail',
    '/analytics',
    '/settings',
    '/audit-logs',
  ];

  for (const route of protectedRoutes) {
    test(`unauthenticated user is redirected from ${route}`, async ({ page }) => {
      allure.epic('Production Smoke');
      allure.feature('Route Protection');
      allure.story('Unauthenticated redirect');
      allure.tags('smoke', 'auth-guard');

      await page.goto(route);
      await page.waitForURL(/\/login/);

      expect(page.url()).toContain('/login');
    });
  }
});
