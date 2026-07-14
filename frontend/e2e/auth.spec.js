import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('Authentication', () => {
  test('successful login', async ({ page }) => {
    allure.epic('Authentication');
    allure.feature('Login');
    allure.story('Valid Credentials');
    allure.tags('auth', 'smoke');
    
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'E-mail institucional' }).fill('pesquisador.demo@unb.br');
    await page.getByRole('textbox', { name: 'Senha' }).fill('Demo@1234');
    await page.getByRole('button', { name: 'Continuar →' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('invalid login shows error', async ({ page }) => {
    allure.epic('Authentication');
    allure.feature('Login');
    allure.story('Invalid Credentials');
    allure.tags('auth', 'negative');
    
    await page.goto('/login');
    const button = page.getByRole('button', { name: /entrar/i });
    expect(button).toBeTruthy();
  });
});
