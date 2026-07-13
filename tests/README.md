# Testes externos e qualidade

Este diretório contém verificações que exercitam a aplicação fora dos módulos de código. Testes unitários, cobertura e mutação do backend/frontend permanecem nos próprios módulos e são executados pela CI.

## Suítes

| Caminho | Ferramenta | Escopo | Relatório |
| --- | --- | --- | --- |
| `e2e/` | Playwright | Jornadas da SPA, CORS, login, rotas protegidas e fluxos críticos | HTML e Allure |
| `performance/` | k6 | Carga e latência da API publicada | `k6-summary.json` e HTML |
| `api-contract/` | Node.js | Contrato read-only de segurança HTTP da API | JSON e HTML |
| `lighthouse/` | Lighthouse CI | Performance web, acessibilidade, boas práticas e SEO | relatório Lighthouse |

## E2E local

Pré-requisitos: Node.js 24, frontend e backend acessíveis localmente.

```bash
cd tests
npm ci
npx playwright install chromium
npm run test:e2e
```

Para o modo interativo: `npm run test:e2e:ui`.

## Contrato de segurança da API

Não altera dados nem cria contas. Verifica HSTS, CSP, proteção de frame/MIME/cache e correlação `X-Request-ID`.

```bash
$env:API_URL = "http://localhost:8080" # PowerShell
node tests/api-contract/production-security-contract.mjs
```

O resultado fica em `tests/api-contract/reports/`. Em produção, a CI publica o artefato `api-security-contract-report` após o deploy do backend.

## k6 e Lighthouse

Essas verificações contra produção são executadas pela CI após o deploy; não execute carga contra produção manualmente sem autorização. Para um alvo controlado, use `API_URL`:

```bash
cd tests/performance
k6 run load-test.js
```

O Lighthouse usa `tests/lighthouse/lighthouserc.json` e é executado pela pipeline contra a URL publicada.

## Diretrizes

- Evite cenários que dependam de massa de dados real de produção.
- Cada suíte deve ter escopo próprio; não duplique uma jornada E2E como teste de carga ou contrato.
- Gere relatórios determinísticos e publique-os como artefatos quando a suíte rodar na CI.
