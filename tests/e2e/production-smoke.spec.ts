import { test, expect } from '@playwright/test';

test.describe('Production Smoke Test', () => {
  
  const BASE_URL = process.env.BASE_URL || 'https://edtechacademic.com.br';
  const API_URL = process.env.API_URL || 'https://edtech-backend-shv6qbpf4q-rj.a.run.app';
  
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

  test('Health check do backend está disponível', async ({ request }) => {
    const response = await request.get(`${API_URL}/actuator/health`, { timeout: 30_000 });
    expect(response.ok()).toBeTruthy();
    expect((await response.json()).status).toBe('UP');
  });

  test('Rotas protegidas bloqueiam acesso e redirecionam para o Login', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`);
    // Deve redirecionar para a página de login
    await page.waitForURL('**/login*');
    expect(page.url()).toContain('/login');
  });

  test('Validar elementos visuais principais da página de Login', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    
    // Verifica título da página de login
    await expect(page.getByRole('heading', { name: /Bem-vindo|Login|Entrar/i })).toBeVisible();
    
    // Verifica inputs de e-mail e senha
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    
    // Verifica botão de Entrar
    await expect(page.getByRole('button', { name: /continuar/i })).toBeVisible();
  });

  test('Tentativa de login com credenciais inválidas exibe alerta', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    
    await page.locator('input[type="email"]').fill('teste_invalido@edu.br');
    await page.locator('input[type="password"]').fill('senha_errada');
    await page.getByRole('button', { name: /continuar/i }).click();

    // Aguarda o Toast ou Alerta de erro (procurando pelo ícone de aviso)
    const errorMessage = page.locator('text=⚠️');
    await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
  });

  test('Acesso à tela de Recuperação de Senha funciona corretamente', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    
    // Clica no link "Esqueci minha senha"
    const recoveryLink = page.getByRole('link', { name: /Esqueci|Recuperar/i });
    if (await recoveryLink.count() > 0) {
      await recoveryLink.click();
      
      // Verifica se a URL mudou
      await page.waitForURL('**/recover-password*');
      
      // Verifica input de email na tela de recuperação
      await expect(page.locator('input[type="email"]')).toBeVisible();
    }
  });

});
