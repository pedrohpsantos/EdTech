import { test, expect } from '@playwright/test';

test.describe('Fluxo de Recuperação de Senha (E2E)', () => {
  
  test('Deve realizar o fluxo completo de esqueci minha senha', async ({ page }) => {
    // 1. Acessa a página de login
    await page.goto('http://localhost:5173/login');
    
    // 2. Clica no link de esqueci a senha
    await page.click('text=Recuperar senha');
    
    // Verifica se a URL mudou para recover-password
    await expect(page).toHaveURL(/.*recover-password/);
    
    // 3. Passo 1: Digitar E-mail
    await expect(page.locator('h2')).toContainText('Esqueceu a senha?');
    await page.fill('input[type="email"]', 'teste@unb.br');
    
    // Usaremos mock route para o Playwright não bater no backend real caso ele esteja fora
    await page.route('**/api/auth/recovery/request', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ sucesso: true, mensagem: 'Código enviado para o seu e-mail (se cadastrado).' })
      });
    });
    
    await page.click('button:has-text("Continuar")');
    
    // 4. Passo 2: Digitar Código OTP
    await expect(page.locator('h2')).toContainText('Verificação de Código');
    await page.fill('input[placeholder="123456"]', '123456');

    await page.route('**/api/auth/recovery/verify', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ sucesso: true, mensagem: 'Código verificado com sucesso.' })
      });
    });
    
    await page.click('button:has-text("Continuar")');
    
    // 5. Passo 3: Digitar Nova Senha
    await expect(page.locator('h2')).toContainText('Nova Senha');
    const passwordInputs = page.locator('input[type="password"]');
    
    // Digita a senha nova
    await passwordInputs.nth(0).fill('senhaForte123');
    // Digita a confirmacao
    await passwordInputs.nth(1).fill('senhaForte123');
    
    await page.route('**/api/auth/recovery/reset', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ sucesso: true, mensagem: 'Senha alterada com sucesso.' })
      });
    });
    
    await page.click('button:has-text("Redefinir Senha")');
    
    // 6. Sucesso e Redirecionamento
    await expect(page.locator('text=Senha redefinida com sucesso! Redirecionando...')).toBeVisible();
  });
});
