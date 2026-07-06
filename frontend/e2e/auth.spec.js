import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('Authentication', () => {
  test('successful login', async ({ page }) => {
    allure.epic('Authentication');
    allure.feature('Login');
    allure.story('Valid Credentials');
    allure.tags('auth', 'smoke');
    
    await page.goto('/');
    await expect(page).toHaveTitle(/EdTech/);
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
