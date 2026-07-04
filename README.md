<div align="center">
  <img src="docs/assets/imgs/banner-github.png" alt="EdTech Banner" width="100%">
</div>

# EdTech — Plataforma Acadêmica e Repositório Científico

[![Deploy MkDocs](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml)
[![CI Pipeline](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml)
![NodeJS](https://img.shields.io/badge/Node.js-%3E%3D20-339933?logo=nodedotjs&logoColor=white)
![Java](https://img.shields.io/badge/Java-21_LTS-007396?logo=openjdk&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GCP-Cloud_Run_%26_SQL-4285F4?logo=googlecloud&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=white)

**EdTech** é uma solução de software completa (Monorepo) desenvolvida para digitalizar, armazenar e auditar publicações, relatórios científicos e datasets de laboratórios acadêmicos. Construído sob rígidos padrões de segurança (Enterprise Grade), oferece rastreabilidade e governança de dados ponta a ponta.

> **📖 Portal Oficial da Documentação (Docs-as-Code):** [pedrohpsantos.github.io/EdTech](https://pedrohpsantos.github.io/EdTech/)

---

## 🎯 Objetivo e Visão

O principal objetivo do EdTech é modernizar laboratórios acadêmicos substituindo processos baseados em planilhas e drives compartilhados inseguros por um **Repositório Centralizado e Auditável**. 

- **Transparência:** Todas as operações críticas geram logs de auditoria imutáveis.
- **Eficiência:** Orientadores aprovam publicações diretamente pelo painel.
- **Segurança:** Acesso controlado via JWT, proteção Anti-CSRF e tráfego HTTPS 100% isolado na nuvem.

---

## 🏗️ Estrutura do Monorepo

O repositório adota a arquitetura de monorepo para facilitar a integração, rastreamento de issues e implantação via CI/CD. 

Navegue pela documentação específica de cada módulo:

| Módulo | Descrição | Stack Principal |
| :--- | :--- | :--- |
| **[🎨 Frontend (UI)](frontend/README.md)** | Single Page Application (SPA) responsiva para a interação dos usuários. | React 19, Vite 8, React Query |
| **[⚙️ Backend (API)](docvault/api/README.md)** | Serviços RESTful para regras de negócio, persistência e auditoria. | Java 21, Spring Boot 4.1 |
| **[☁️ Infraestrutura (IaC)](infra/README.md)** | Configurações de Nuvem, Banco de Dados, CI/CD e Secrets. | Google Cloud, Docker, GitHub Actions |
| **[📄 Documentação (Docs)](docs/README.md)** | Diretório central da documentação (C4 Model, Manuais, FinOps). | MkDocs Material, Markdown |

---

## 🛡️ Status Atual do Projeto

O projeto encontra-se em **produção**, operando na nuvem do Google Cloud Platform, mas continua recebendo novas integrações de segurança.

| Status | Funcionalidade |
| :---: | :--- |
| ✅ | Infraestrutura de Autenticação JWT e CORS configurada |
| ✅ | CI/CD (GitHub Actions) com validação de testes e build no Cloud Run |
| ✅ | Modelagem do Banco (PostgreSQL) automatizada via Flyway |
| ✅ | Dashboard do Pesquisador (Upload de Artigos via GCS) |
| ✅ | Rastreabilidade e Auditoria de eventos |
| 🚧 | Integração completa com ferramentas de SAST (Dependency Check) |
| 🚧 | Painel Analítico do Orientador (Métricas do Laboratório) |

---

## 🔐 Variáveis de Ambiente

Para o ambiente local, copie o arquivo `.env.example` para `.env` e configure os valores básicos. Em produção, esses valores são protegidos pelo Google Secret Manager.

| Variável | Padrão (Local) | Descrição |
| :--- | :--- | :--- |
| `POSTGRES_USER` | `postgres` | Usuário do banco de dados (Container Docker) |
| `POSTGRES_PASSWORD` | `postgres` | Senha do banco de dados |
| `POSTGRES_DB` | `edtech_db` | Nome do banco |
| `JWT_SECRET` | `secret_super_seguro_para_jwt...` | Chave HMAC de 256-bits para assinatura de tokens (trocar em prod) |
| `GCP_PROJECT_ID` | `(vazio)` | ID do projeto no Google Cloud (Necessário para GCS) |
| `FRONTEND_URL` | `http://localhost:5173` | URL do frontend autorizada no CORS da API |

---

## 🚀 Quick Start (Desenvolvimento Local - 1 Click)

### 1. Requisitos
- **Docker e Docker Compose**

### 2. Levantando o Ambiente (Mágico)

Com a arquitetura unificada, você pode subir o Banco de Dados, Backend (Spring Boot) e Frontend (React/Vite) com apenas um comando:

```bash
# Clone o repositório
git clone https://github.com/pedrohpsantos/EdTech.git
cd EdTech

# Configure as variáveis locais
cp .env.example .env

# Suba todo o ecossistema
docker compose up --build
```

A aplicação web estará disponível em `http://localhost:5173`.
A API do Backend estará disponível em `http://localhost:8080`.

---

## 📝 Regras de Contribuição (Conventional Commits)

Nós adotamos o padrão **Conventional Commits** para manter o histórico do Git limpo e automatizar as releases.
Seus commits devem seguir estritamente o formato: `<tipo>[escopo opcional]: <descrição>`

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças apenas na documentação
- `chore:` Tarefas de manutenção ou dependências (ex: `chore(deps): update packages`)
- `refactor:` Refatoração de código que não adiciona feature nem corrige bug

Exemplo: `feat(auth): adiciona fluxo de login com JWT`
