# EdTech — Monorepo

Sistema web para centralização, gerenciamento e auditoria de publicações acadêmicas, relatórios de pesquisa e datasets. Desenvolvido no laboratório **AILAB Makers**.

---

## Estrutura do Monorepo

```text
docvault/
├── api/           # Backend — regras de negócio, upload, controle de versões e logs
├── auth/          # Serviço de autenticação — JWT, cookies HttpOnly e Secure
├── frontend/      # Interface React com componentes por persona
└── docs/          # Referência à documentação GitPages do projeto
```

---

## Responsabilidade de Cada Módulo

| Módulo | Responsabilidade |
| :--- | :--- |
| **api/** | Regras de negócio, upload de documentos, controle de versões, logs auditáveis |
| **auth/** | Autenticação e autorização dos perfis: Pesquisador, Orientador e Admin do Laboratório |
| **frontend/** | Interface React com componentes reutilizáveis por persona |
| **docs/** | Documentação técnica publicada via GitHub Pages |

---

## Stack Tecnológica

| Camada | Tecnologias |
| :--- | :--- |
| **Backend (API)** | Java 17, Spring Boot 3, Spring Security, JWT, Flyway, PostgreSQL |
| **Autenticação** | Spring Security, JWT, cookies HttpOnly e Secure |
| **Frontend** | React, Tailwind CSS |
| **Banco de Dados** | PostgreSQL (Google Cloud SQL) |
| **Storage** | Google Cloud Storage |
| **Infraestrutura** | Docker, Google Cloud Run |
| **Testes** | JUnit 5 |
| **Observabilidade** | Google Cloud Logging, Python |

---

## Como Rodar Localmente

> Instruções detalhadas serão adicionadas conforme os módulos forem implementados.

```bash
# 1. Clone o repositório
git clone https://github.com/AILAB-MAKERS/EdTech.git
cd EdTech/docvault

# 2. Suba o banco de dados local
docker compose -f ../infra/docker-compose.yml up -d

# 3. Inicie o serviço de autenticação
# Veja: auth/README.md

# 4. Inicie a API
# Veja: api/README.md

# 5. Inicie o frontend
# Veja: frontend/README.md
```
---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
