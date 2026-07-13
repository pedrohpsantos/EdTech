# Contrato de Segurança da API

## Objetivo

O contrato de segurança é uma verificação externa, somente de leitura, executada contra a API publicada. Ele complementa o teste de carga com k6: enquanto o k6 mede estabilidade e latência sob tráfego, esta suíte confirma que controles de segurança continuam presentes após o deploy.

Não substitui testes unitários do backend, E2E do frontend, Lighthouse ou k6 e não repete seus cenários. A execução consulta apenas `GET /actuator/health`; ela não cria contas, não autentica usuários e não modifica dados.

## Controles verificados

| Controle | Evidência no contrato |
| --- | --- |
| Transporte seguro | `Strict-Transport-Security` com duração de um ano e subdomínios |
| Proteção contra MIME sniffing | `X-Content-Type-Options: nosniff` |
| Proteção contra clickjacking | `X-Frame-Options: DENY` e `frame-ancestors 'none'` na CSP |
| Proteção de cache | `Cache-Control` com `no-store` |
| Rastreabilidade | `X-Request-ID` devolvido pela API para correlacionar requisições e logs |

## Pipeline e relatório

Na `main`, o job **Prod (API Security Contract)** depende somente do deploy do backend. Portanto, inicia em paralelo ao **Prod (Performance)** (k6) e não espera pelo deploy do frontend, E2E ou Lighthouse.

Ao fim da execução, a pipeline publica o artefato `api-security-contract-report`, contendo:

- `index.html`: relatório visual com o estado de cada controle;
- `production-security-contract.json`: resultado estruturado para auditoria e automação.

## Execução local

Requer Node.js 20 ou superior e uma instância acessível da API:

```bash
API_URL=https://edtech-backend-shv6qbpf4q-rj.a.run.app \
  node tests/api-contract/production-security-contract.mjs
```

Os arquivos são gerados em `tests/api-contract/reports/` e não são versionados.
