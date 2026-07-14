---
title: 'Contrato de Segurança da API'
---

# :material-shield-check: Contrato de Segurança da API

Este contrato é uma verificação externa e somente de leitura contra a API
publicada. Ele complementa o k6: enquanto o teste de carga mede estabilidade
e latência, esta suíte confirma que os controles HTTP de segurança continuam
ativos após o deploy.

O contrato consulta somente `GET /actuator/health`; não cria contas, não
autentica usuários e não altera dados. Ele não substitui testes unitários,
E2E, Lighthouse ou k6.

## Controles verificados

| Controle | Evidência no contrato |
| --- | --- |
| Transporte seguro | `Strict-Transport-Security` por um ano e subdomínios |
| Proteção contra MIME sniffing | `X-Content-Type-Options: nosniff` |
| Proteção contra clickjacking | `X-Frame-Options: DENY` e `frame-ancestors 'none'` na CSP |
| Proteção de cache | `Cache-Control` com `no-store` |
| Rastreabilidade | `X-Request-ID` devolvido pela API para correlacionar requisições e logs |

## Relatório publicado

O quadro abaixo mostra a execução mais recente contra produção. É uma fotografia
atual; os artefatos de cada release preservam a evidência histórica.

<div style="display: flex; justify-content: flex-end; margin-bottom: 15px;" markdown="1">
  [Abrir relatório em tela cheia :material-open-in-new:](https://pedrohpsantos.github.io/EdTech/api-security/index.html){ .md-button target="_blank" }
</div>

<iframe src="https://pedrohpsantos.github.io/EdTech/api-security/index.html" width="100%" height="800px" style="border:none; border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,0.1); background-color:#fff;">
  Seu navegador não suporta iframes. <a href="https://pedrohpsantos.github.io/EdTech/api-security/index.html" target="_blank">Abra o relatório de contrato de segurança</a>.
</iframe>

## Pipeline e artefatos

Na `main`, o job **Prod (API Security Contract)** depende somente do deploy do
backend e roda em paralelo ao k6. O workflow de documentação executa o mesmo
contrato para publicar o HTML no GitHub Pages em `/api-security/`.

Cada pipeline de deploy também publica o artefato
`api-security-contract-report`, contendo:

- `index.html`: relatório visual com o estado de cada controle;
- `production-security-contract.json`: resultado estruturado para auditoria e
  automação.

## Execução local

Requer Node.js 20 ou superior e uma instância acessível da API:

```bash
API_URL=https://edtech-backend-shv6qbpf4q-rj.a.run.app \
  node tests/api-contract/production-security-contract.mjs
```

Os arquivos são gerados em `tests/api-contract/reports/` e não são versionados.

## Histórico de versões

| Versão | Data | Descrição | Autor |
| --- | --- | --- | --- |
| `1.1` | 13/07/2026 | Publicação do relatório HTML no GitHub Pages | Pedro Henrique P. Santos |
| `1.0` | 13/07/2026 | Criação do contrato de segurança da API | Pedro Henrique P. Santos |
