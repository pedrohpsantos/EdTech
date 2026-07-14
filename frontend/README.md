# Frontend — EdTech

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

> Onde o rigor da plataforma encontra jornadas humanas, acessíveis e claras.

## Visão geral

SPA React 19, TypeScript e Vite. Oferece jornadas específicas para Pesquisador, Orientador e Auditor, com design responsivo, acessibilidade e comunicação autenticada com a API.

## Estrutura

| Diretório | Conteúdo |
| --- | --- |
| `src/pages` | Rotas e telas da aplicação |
| `src/components` | Componentes reutilizáveis, layout e controles de interface |
| `src/context` | Estado global, incluindo sessão/autenticação |
| `src/services` | Cliente HTTP e serviços da API |
| `src/hooks` | Hooks reutilizáveis |
| `src/assets` | Ícones, imagens e recursos estáticos |

## Comece aqui

Pré-requisito: Node.js 24.

```bash
cd frontend
cp .env.example .env
# VITE_API_URL=http://localhost:8080

npm ci
npm run dev
```

A aplicação abre em `http://localhost:5173`. O cliente Axios usa `withCredentials`; para desenvolvimento completo, inicie também o backend e mantenha a origem em `CORS_ALLOWED_ORIGINS`. Em produção, as chamadas usam `/api` pelo Firebase Hosting, preservando o cookie `SameSite=Strict` no domínio da aplicação.

## Validação

```bash
npm run build          # build de produção
npm run lint           # Oxlint + ESLint sem warnings
npm run type-check     # TypeScript
npm run security-audit # npm audit (high)
npm run test           # Vitest, cobertura e relatório HTML
npm run test:a11y      # testes WCAG/axe
npm run test:components
npx stryker run        # testes de mutação
```

Os testes E2E Playwright de produção ficam em `../tests/e2e`; veja [tests/README.md](../tests/README.md).

## A primeira tela importa

A rota de login é uma experiência pública e enxuta: rotas privadas, Bootstrap e recursos de animação não são carregados antes da autenticação ou de uma jornada que realmente os use. Os controles preservam nomes acessíveis, estado anunciável e foco visível. O Lighthouse e o smoke Playwright verificam esse contrato a cada publicação.

## Convenções de interface

- Mantenha componentes reutilizáveis e acessíveis: rótulos, foco visível, estados de carregamento e mensagens de erro.
- Preserve o mesmo padrão de navegação lateral e ações nos três perfis.
- Use os serviços em `src/services` para comunicação com a API; não duplique chamadas HTTP nas páginas.
- Não armazene tokens no navegador: a sessão é mantida por cookie `HttpOnly` emitido pela API.

## Referências

- [Backend](../backend/README.md)
- [Testes](../tests/README.md)
- [Pipelines](../.github/PIPELINES.md)
