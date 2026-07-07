<div align="center">
  <img src="docs/assets/imgs/banner-github.png" alt="EdTech Banner" width="100%">
</div>

# EdTech — Repositório Científico e Ecossistema Acadêmico

[![Deploy MkDocs](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml)
[![CI Pipeline](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml)
![NodeJS](https://img.shields.io/badge/Node.js-%3E%3D20-339933?logo=nodedotjs&logoColor=white)
![Java](https://img.shields.io/badge/Java-21_LTS-007396?logo=openjdk&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GCP-Cloud_Run_%26_SQL-4285F4?logo=googlecloud&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=white)

**EdTech** é uma plataforma de software para digitalizar, armazenar e auditar publicações científicas, relatórios de pesquisa e datasets de laboratórios acadêmicos. O sistema foi projetado com foco em rastreabilidade, controle de acesso baseado em perfis e integridade de dados.

> **📖 Portal Oficial da Documentação:** [pedrohpsantos.github.io/EdTech](https://pedrohpsantos.github.io/EdTech/)

---

## Visão Geral

O EdTech centraliza o ciclo de vida de documentos acadêmicos em um único repositório auditável, eliminando o uso de soluções ad hoc (e-mail, pen drives, planilhas compartilhadas) para gestão de arquivos científicos.

- **Rastreabilidade:** Cada operação relevante é registrada em trilha de auditoria imutável.
- **Governança de Acesso:** Controles de autorização por perfil — Pesquisador, Orientador e Auditor.
- **Segurança:** Autenticação via JWT (Bearer Token), armazenado no Local Storage, anulando riscos de CSRF, com comunicação exclusivamente via HTTPS em produção.

---

## Estrutura do Monorepo

| Módulo | Responsabilidade | Stack |
| :--- | :--- | :--- |
| **[🎨 Frontend (UI)](frontend/README.md)** | Interface SPA responsiva para os usuários da plataforma. | React 19, Vite 8, Vanilla CSS |
| **[⚙️ Backend (API)](backend/README.md)** | API RESTful com regras de negócio, segurança e persistência. | Java 21, Spring Boot 4.1 |
| **[☁️ Infraestrutura](infra/README.md)** | Orquestração de containers e configuração de infraestrutura em nuvem. | GCP, Docker, Docker Compose |
| **[📄 Documentação](docs/README.md)** | Portal de documentação técnica e arquitetural (Docs-as-Code). | MkDocs Material |
| **[📊 Scripts](scripts/README.md)** | Scripts de telemetria e análise para o Orientador. | Python, Pandas |
| **[🕵️ Testes](tests/README.md)** | Testes de integração, carga e qualidade da plataforma. | Playwright, K6 |

---

## Status Operacional

| Status | Item |
| :---: | :--- |
| ✅ | Autenticação JWT via cabeçalho Authorization Bearer |
| ✅ | CI/CD via GitHub Actions e deploy no Cloud Run |
| ✅ | Migrações de banco gerenciadas pelo Flyway |
| ✅ | Armazenamento de arquivos no GCS (Google Cloud Storage) |
| ✅ | Rate limiting nas rotas de autenticação (Bucket4j) |
| ✅ | Backup automático diário do banco de dados (Cloud Scheduler) |
| ✅ | Painel analítico dedicado para o Orientador |
| 🚧 | Scan de malware em uploads (ClamAV) |

---

## Quick Start Local

O ambiente de desenvolvimento completo pode ser iniciado via Docker Compose, sem necessidade de instalar dependências individualmente.

```bash
# Clone o repositório
git clone https://github.com/pedrohpsantos/EdTech.git
cd EdTech

# Configure as variáveis de ambiente locais
cp infra/.env.example infra/.env
# Edite o arquivo infra/.env com os valores adequados

# Suba os serviços
cd infra
docker compose up --build -d
```

- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:8080`

---

## Contribuição e Governança

Consulte os documentos abaixo antes de contribuir com o projeto:

- 📖 **[Como Contribuir](.github/CONTRIBUTING.md)**
- 📜 **[Código de Conduta](.github/CODE_OF_CONDUCT.md)**
- 🔒 **[Política de Segurança](.github/SECURITY.md)**
- ⚖️ **[Licença](LICENSE)** — MIT

Todos os commits devem seguir o padrão **Conventional Commits**. PRs sem testes associados serão rejeitados pelo CI.
