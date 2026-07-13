<div align="center">
  <img src="docs/assets/imgs/banner-github.png" alt="EdTech Banner" width="100%">
</div>

# EdTech — Repositório Científico e Ecossistema Acadêmico

[![Deploy MkDocs](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml)
[![CI Pipeline](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml)
![NodeJS](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white)
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
| **[🎨 Frontend (UI)](frontend/README.md)** | Interface SPA responsiva para os usuários da plataforma. | ![React](https://img.shields.io/badge/React-_-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-_-646CFF?logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-_-3178C6?logo=typescript&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-_-7952B3?logo=bootstrap&logoColor=white) |
| **[⚙️ Backend (API)](backend/README.md)** | API RESTful com regras de negócio, segurança e persistência. | ![Java](https://img.shields.io/badge/Java-_-007396?logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-_-6DB33F?logo=springboot&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-_-4169E1?logo=postgresql&logoColor=white) |
| **[☁️ Infraestrutura](infra/README.md)** | Orquestração de containers e configuração de infraestrutura em nuvem. | ![Google Cloud](https://img.shields.io/badge/Google_Cloud-_-4285F4?logo=googlecloud&logoColor=white) ![Terraform](https://img.shields.io/badge/Terraform-_-7B42BC?logo=terraform&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-_-2496ED?logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-_-2088FF?logo=githubactions&logoColor=white) |
| **[📄 Documentação](docs/README.md)** | Portal de documentação técnica e arquitetural (Docs-as-Code). | ![MkDocs Material](https://img.shields.io/badge/MkDocs_Material-_-526CFE?logo=materialformkdocs&logoColor=white) |
| **[📊 Scripts](scripts/README.md)** | Scripts de telemetria e análise para o Orientador. | ![Python](https://img.shields.io/badge/Python-_-3776AB?logo=python&logoColor=white) ![Pandas](https://img.shields.io/badge/Pandas-_-150458?logo=pandas&logoColor=white) |
| **[🕵️ Testes & QA](tests/README.md)** | Cobertura, mutação, integração, carga e qualidade da plataforma. | ![JUnit](https://img.shields.io/badge/JUnit-_-25A162?logo=junit5&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-_-729B1B?logo=vitest&logoColor=white) ![Stryker](https://img.shields.io/badge/Stryker-_-E36209?logo=stryker&logoColor=white) ![PiTest](https://img.shields.io/badge/PiTest-_-F28C28) ![JaCoCo](https://img.shields.io/badge/JaCoCo-_-C40D42) ![Playwright](https://img.shields.io/badge/Playwright-_-2EAD33?logo=playwright&logoColor=white) ![k6](https://img.shields.io/badge/k6-_-7D64FF?logo=k6&logoColor=white) ![Lighthouse](https://img.shields.io/badge/Lighthouse-_-F44B21?logo=lighthouse&logoColor=white) |

---

## Status Operacional

| Status | Item |
| :---: | :--- |
| ✅ | Autenticação JWT via cabeçalho Authorization Bearer |
| ✅ | CI/CD via GitHub Actions e deploy no Cloud Run |
| ✅ | Migrações de banco gerenciadas pelo Flyway |
| ✅ | Armazenamento de arquivos no GCS (Google Cloud Storage) |
| ✅ | Upload de documentos PDF e datasets CSV/JSON |
| ✅ | Exportação CSV da trilha de auditoria por documento |
| ✅ | Rate limiting nas rotas de autenticação (Bucket4j) |
| ✅ | Backup automático diário do banco de dados (Cloud Scheduler) |
| ✅ | Painel analítico dedicado para o Orientador |
| 🚧 | Scan de malware em uploads (ClamAV) |

---

## Principais Rotas da API

| Método | Endpoint | Autenticação | Descrição |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/login` | ❌ | Autentica o usuário e retorna o token JWT |
| `GET` | `/api/documents` | ✅ | Lista os documentos paginados (conforme perfil) |
| `POST` | `/api/documents/upload` | ✅ | Realiza o upload de novo documento para o GCS |
| `POST` | `/api/documents/{id}/review` | ✅ | (Orientador) Aprova ou rejeita uma submissão |

> 📌 Para a especificação OpenAPI completa, inicie a API localmente e acesse o [Swagger UI](http://localhost:8080/swagger-ui.html), ou explore a coleção pronta na pasta `.postman/`.

---

## Quick Start Local

O ambiente de desenvolvimento completo pode ser iniciado via Docker Compose, sem necessidade de instalar dependências individualmente.

```bash
# Clone o repositório
git clone https://github.com/pedrohpsantos/EdTech.git
cd EdTech

# Configure as variáveis de ambiente locais
cp infra/dev/.env.example infra/dev/.env
# Edite o arquivo infra/dev/.env com os valores adequados

# Suba os serviços
cd infra/dev
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
