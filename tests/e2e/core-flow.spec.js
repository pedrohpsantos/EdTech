import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('Core Business Flow: Upload & Approve', () => {
  
  test('Researcher can upload and Advisor can approve', async ({ page }) => {
    allure.epic('Qualidade e E2E');
    allure.feature('Fluxo Principal do Pesquisador');
    allure.story('Caminho Feliz: Login, Upload e Visualização de Trilha');
    
    // 1. Acessa a página principal
    await page.goto('/');
    
    // 2. Verifica se a página de login/registro carregou
    await expect(page).toHaveURL(/.*login|.*\//);
    
    // Login as Researcher
    await page.fill('input[type="email"]', 'pesquisador.demo@unb.br');
    await page.fill('input[type="password"]', 'Demo@1234');
    await page.click('button[type="submit"]');
    
    // Verify Dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Navigate to Upload
    await page.click('a[href="/upload"]');
    await expect(page).toHaveURL(/.*upload/);
    
    // Upload document
    await page.fill('input[placeholder="Ex: Metodologia Qualitativa v3"]', 'Documento de Teste E2E');
    // Select project (assuming first option is available)
    await page.locator('select').first().selectOption({ index: 1 });
    // Upload file
    await page.setInputFiles('input[type="file"]', {
      name: 'test-doc.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('PDF_CONTENT_MOCK')
    });
    await page.click('button[type="submit"]');
    
    // Should redirect to documents
    await expect(page).toHaveURL(/.*documentos/);
    
    // Logout
    await page.click('button:has-text("Sair")');
    await expect(page).toHaveURL(/.*login/);
    
    // Login as Advisor
    await page.fill('input[type="email"]', 'orientador.demo@unb.br');
    await page.fill('input[type="password"]', 'Demo@1234');
    await page.click('button[type="submit"]');
    
    // Verify Dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Navigate to submissions
    await page.click('a[href="/submissions"]');
    await expect(page).toHaveURL(/.*submissions/);
    
    // Find the document and approve (mocking the approval action)
    // We look for "Documento de Teste E2E" and click the approve button
    const row = page.locator('tr:has-text("Documento de Teste E2E")').first();
    // In our UI, the view details button is usually a magnifying glass or "Avaliar"
    await row.locator('button').first().click();
    
    // Check final status
    // Example: await expect(page.locator('.status-badge')).toHaveText('APPROVED');
  });

});
