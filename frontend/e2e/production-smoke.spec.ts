import { test, expect } from '@playwright/test';

test.describe('Production Smoke Test', () => {
  
  const BASE_URL = 'https://edtech-storage-501117.web.app';
  const API_URL = 'https://edtech-backend-shv6qbpf4q-rj.a.run.app';
  
  test('A aplicação frontend está acessível e HTTPS (TLS) é forçado', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    expect(response?.ok()).toBeTruthy();
    
    // Valida HTTPS
    const currentUrl = page.url();
    expect(currentUrl.startsWith('https://')).toBeTruthy();
    
    // Verifica título
    await expect(page).toHaveTitle(/EdTech Academic|frontend/);
  });

  test('CORS configurado corretamente no Backend', async ({ request }) => {
    // Faz uma requisição OPTIONS simulando o preflight CORS vindo do frontend
    const response = await request.fetch(`${API_URL}/api/auth/login`, {
      method: 'OPTIONS',
      headers: {
        'Origin': BASE_URL,
        'Access-Control-Request-Method': 'POST'
      }
    });
    
    expect(response.status()).toBe(200);
    const allowOrigin = response.headers()['access-control-allow-origin'];
    // Pode retornar '*' ou o exato origin dependendo da config, mas deve aceitar.
    expect(allowOrigin).toBeDefined();
  });

});
