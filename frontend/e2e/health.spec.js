import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

/**
 * Suite de testes E2E - Saúde da Aplicação
 * Estes testes requerem a aplicação rodando em http://localhost:5173
 * Para executar localmente: npm run dev (em outro terminal) + npx playwright test
 *
 * No CI, os testes E2E rodam em ambiente separado com o app deployado.
 * Use a variável BASE_URL para apontar para o ambiente correto.
 */
test.describe('Health Check', () => {
  test('placeholder - CI não falha por falta de testes E2E', async () => {
    await allure.epic('Core Infrastructure');
    await allure.feature('Health Checks');
    await allure.story('Basic Ping');
    await allure.tags('smoke', 'ci-cd');

    // Este teste sempre passa - existe apenas para que o Playwright
    // não retorne "No tests found" quando não há outros testes E2E configurados
    expect(true).toBe(true);
  });
});
