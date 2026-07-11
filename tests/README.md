# Testes e Qualidade de Software

![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![k6](https://img.shields.io/badge/k6-Performance-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![Lighthouse](https://img.shields.io/badge/Lighthouse-UX%2FSEO-F44336?style=for-the-badge&logo=lighthouse&logoColor=white)

Este diretório (`/tests`) consolida as suítes de testes externos da plataforma EdTech. Ele atua como barreira secundária de qualidade, validando o comportamento da aplicação em nível de integração sistêmica, *End-to-End* (E2E), performance de carga e métricas de UX/SEO.

A garantia de qualidade em nível unitário (Backend com JUnit/Mockito e Frontend com Vitest) é mantida em seus respectivos diretórios de origem.

## Cobertura e Estratégia

O repositório adota pastas específicas para isolar escopos de teste:

- **`/tests/e2e` (Playwright):** Foca em cenários Ponta a Ponta. Navegadores automatizados (*Headless*) simulam as jornadas críticas dos usuários de forma realista: login (protegido por JWT e CSRF), upload de arquivos e validação de interfaces visuais. Interagem concomitantemente com Frontend e Backend.
- **`/tests/performance` (k6):** Scripts voltados para a simulação de tráfego denso contra a API (Backend). Usados para aferir o comportamento do Rate Limiting, resposta sob carga e latência no limite operacional. Podem receber a variável ambiente `API_URL` externa para dinamizar a execução entre local e CI/CD.
- **`/tests/lighthouserc.json` (Lighthouse CI):** Arquivo de configuração base para assertivas de performance web, acessibilidade, melhores práticas e otimização para motores de busca (SEO) no frontend do sistema. O LHCI atua como gatekeeper (bloqueador) em CI/CD caso as métricas degradem.

---

## Execução Local (E2E)

Para garantir que novos fluxos não afetem a integridade do sistema, a execução local de testes deve ser efetuada com o ambiente em funcionamento simultâneo (API + SPA).

### Pré-requisitos
- Node.js (>= 20).
- Os serviços da aplicação (Frontend em `http://localhost:5173` e Backend em `http://localhost:8080`) devem estar em execução.

### Comandos

```bash
# Navegue até o diretório de testes
cd tests

# Instale dependências e navegadores (Playwright)
npm install
npx playwright install

# Execute a bateria no modo headless (terminal)
npm run test:e2e

# Execute os testes com interface de inspeção (UI Mode)
npx playwright test --ui
```

---

## Diretrizes de Qualidade Contínua

1. **Tolerância a Flaky Tests:** Testes que falham de forma intermitente devem ser sanados antes do envio ao pipeline de CI. Utilize mecanismos formais de espera explícita (e.g., aguardar componentes renderizarem) ao invés de *timeouts* arbitrários.
2. **Cobertura Baseada em Risco:** Toda nova jornada crítica deve possuir cobertura E2E refletida no Playwright.
3. **Isolamento de Estado:** Os testes devem operar sobre o ambiente de forma idêntica e independente. Scripts de configuração devem garantir o isolamento da massa de dados, expurgando registros de teste nas fases de *teardown*. Nenhuma bateria de teste deve ser executada sobre bases produtivas reais.
