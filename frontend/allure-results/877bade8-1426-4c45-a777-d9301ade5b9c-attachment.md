# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> Authentication >> successful login
- Location: e2e\auth.spec.js:5:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import * as allure from 'allure-js-commons';
  3  | 
  4  | test.describe('Authentication', () => {
  5  |   test('successful login', async ({ page }) => {
  6  |     await allure.epic('Authentication');
  7  |     await allure.feature('Login');
  8  |     await allure.story('Valid Credentials');
  9  |     await allure.tags('auth', 'smoke');
  10 |     
> 11 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
  12 |     await expect(page).toHaveTitle(/EdTech/);
  13 |   });
  14 | 
  15 |   test('invalid login shows error', async ({ page }) => {
  16 |     await allure.epic('Authentication');
  17 |     await allure.feature('Login');
  18 |     await allure.story('Invalid Credentials');
  19 |     await allure.tags('auth', 'negative');
  20 |     
  21 |     await page.goto('/login');
  22 |     const button = page.getByRole('button', { name: /entrar/i });
  23 |     expect(button).toBeTruthy();
  24 |   });
  25 | });
  26 | 
```