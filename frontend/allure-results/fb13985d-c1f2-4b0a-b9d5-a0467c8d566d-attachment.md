# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: production-smoke.spec.ts >> Production Smoke Test >> Tentativa de login com credenciais inválidas exibe alerta
- Location: e2e\production-smoke.spec.ts:65:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=/Verifique seus dados|Erro ao realizar/i').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=/Verifique seus dados|Erro ao realizar/i').first()

```

```yaml
- img
- img
- text: EdTech
- img
- text: ISO 27001 · LGPD · SOC 2
- heading "Governança de Pesquisa Acadêmica" [level=1]
- paragraph: Rastreabilidade e compliance para todo o ciclo de vida dos seus documentos de pesquisa.
- text: 12.4K Documentos 347 Pesquisadores 99.9% Uptime
- button "Alternar Tema"
- heading "Acesso à Plataforma" [level=4]
- heading "Bem-vindo de volta" [level=2]
- paragraph: Entre com suas credenciais institucionais
- text: ⚠️Credenciais inválidas. E-mail Institucional
- textbox "email":
  - /placeholder: seu.nome@universidade.br
  - text: teste_invalido@edu.br
- text: Senha
- link "Recuperar senha":
  - /url: /recover-password
- textbox "senha":
  - /placeholder: ••••••••
  - text: senha_errada
- button "Mostrar senha":
  - img
- button "Entrar →"
- paragraph:
  - text: Não tem conta?
  - link "Cadastre-se":
    - /url: /register
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Production Smoke Test', () => {
  4  |   
  5  |   const BASE_URL = 'https://edtech-storage-501117.web.app';
  6  |   const API_URL = 'https://edtech-backend-shv6qbpf4q-rj.a.run.app';
  7  |   
  8  |   test('A aplicação frontend está acessível e HTTPS (TLS) é forçado', async ({ page }) => {
  9  |     const response = await page.goto(BASE_URL);
  10 |     expect(response?.ok()).toBeTruthy();
  11 |     
  12 |     // Valida HTTPS
  13 |     const currentUrl = page.url();
  14 |     expect(currentUrl.startsWith('https://')).toBeTruthy();
  15 |     
  16 |     // Verifica título
  17 |     await expect(page).toHaveTitle(/EdTech Academic|frontend/);
  18 |   });
  19 | 
  20 |   test('CORS configurado corretamente no Backend', async ({ request }) => {
  21 |     // Faz uma requisição OPTIONS simulando o preflight CORS vindo do frontend
  22 |     const response = await request.fetch(`${API_URL}/api/auth/login`, {
  23 |       method: 'OPTIONS',
  24 |       headers: {
  25 |         'Origin': BASE_URL,
  26 |         'Access-Control-Request-Method': 'POST'
  27 |       }
  28 |     });
  29 |     
  30 |     expect(response.status()).toBe(200);
  31 |     const allowOrigin = response.headers()['access-control-allow-origin'];
  32 |     // Pode retornar '*' ou o exato origin dependendo da config, mas deve aceitar.
  33 |     expect(allowOrigin).toBeDefined();
  34 |   });
  35 | 
  36 |   test('Servidor devolve cookie XSRF-TOKEN na raiz da API', async ({ request }) => {
  37 |     const response = await request.fetch(`${API_URL}/`);
  38 |     const cookies = response.headers()['set-cookie'];
  39 |     if (cookies) {
  40 |       expect(cookies).toContain('XSRF-TOKEN');
  41 |     }
  42 |   });
  43 | 
  44 |   test('Rotas protegidas bloqueiam acesso e redirecionam para o Login', async ({ page }) => {
  45 |     await page.goto(`${BASE_URL}/dashboard`);
  46 |     // Deve redirecionar para a página de login
  47 |     await page.waitForURL('**/login*');
  48 |     expect(page.url()).toContain('/login');
  49 |   });
  50 | 
  51 |   test('Validar elementos visuais principais da página de Login', async ({ page }) => {
  52 |     await page.goto(`${BASE_URL}/login`);
  53 |     
  54 |     // Verifica título da página de login
  55 |     await expect(page.getByRole('heading', { name: /Bem-vindo|Login|Entrar/i })).toBeVisible();
  56 |     
  57 |     // Verifica inputs de e-mail e senha
  58 |     await expect(page.locator('input[type="email"]')).toBeVisible();
  59 |     await expect(page.locator('input[type="password"]')).toBeVisible();
  60 |     
  61 |     // Verifica botão de Entrar
  62 |     await expect(page.getByRole('button', { name: /Entrar/i })).toBeVisible();
  63 |   });
  64 | 
  65 |   test('Tentativa de login com credenciais inválidas exibe alerta', async ({ page }) => {
  66 |     await page.goto(`${BASE_URL}/login`);
  67 |     
  68 |     await page.locator('input[type="email"]').fill('teste_invalido@edu.br');
  69 |     await page.locator('input[type="password"]').fill('senha_errada');
  70 |     await page.getByRole('button', { name: /Entrar/i }).click();
  71 | 
  72 |     // Aguarda o Toast ou Alerta de erro
  73 |     const errorMessage = page.locator('text=/Verifique seus dados|Erro ao realizar/i');
> 74 |     await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
     |                                        ^ Error: expect(locator).toBeVisible() failed
  75 |   });
  76 | 
  77 |   test('Acesso à tela de Recuperação de Senha funciona corretamente', async ({ page }) => {
  78 |     await page.goto(`${BASE_URL}/login`);
  79 |     
  80 |     // Clica no link "Esqueci minha senha"
  81 |     const recoveryLink = page.getByRole('link', { name: /Esqueci|Recuperar/i });
  82 |     if (await recoveryLink.count() > 0) {
  83 |       await recoveryLink.click();
  84 |       
  85 |       // Verifica se a URL mudou
  86 |       await page.waitForURL('**/recovery*');
  87 |       
  88 |       // Verifica input de email na tela de recuperação
  89 |       await expect(page.locator('input[type="email"]')).toBeVisible();
  90 |     }
  91 |   });
  92 | 
  93 | });
  94 | 
```