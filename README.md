<div align="center">
  <img src="docs/assets/imgs/banner-github.png" alt="EdTech Banner" width="100%">
</div>

# EdTech — Repositório Acadêmico

[![Deploy MkDocs](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml)
[![CI Backend](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-backend.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-backend.yml)
[![CI Frontend](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-frontend.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-frontend.yml)
![Python](https://img.shields.io/badge/python-%3E%3D3.11-3776ab?logo=python&logoColor=white)
![MkDocs Material](https://img.shields.io/badge/docs-MkDocs%20Material-7c4dff?logo=materialformkdocs&logoColor=white)

Plataforma acadêmica para centralização, gerenciamento e auditoria de publicações científicas, relatórios de pesquisa e datasets — desenvolvida no laboratório **AILAB Makers** (UnB FCTE).

> **📖 Portal da Documentação:** [pedrohpsantos.github.io/EdTech](https://pedrohpsantos.github.io/EdTech/)

---

## 📌 Estado Atual do Repositório

O projeto encontra-se atualmente na fase final rumo à **conclusão do MVP (Sprint 6)**.
- **✅ Concluído:** Documentação (Docs-as-Code), Arquitetura Técnica, Autenticação completa, Upload de Documentos para Supabase Storage e Contratos de API consolidados.
- **🚧 Em Desenvolvimento:** Interfaces de gestão de projetos, painel do orientador, fluxos de auditoria/logs estruturados e automação E2E.

Para entender as prioridades atuais e como ajudar na documentação, leia nosso [Guia de Contribuição](CONTRIBUTING.md).

---

## 🚀 Quick Start (Documentação Local)

```bash
# Clone o repositório
git clone https://github.com/pedrohpsantos/EdTech.git
cd EdTech

# Instale as dependências com uv
uv sync

# Sirva a documentação localmente
uv run mkdocs serve
```

Acesse `http://127.0.0.1:8000` no navegador.

---

## Ambiente Local com Docker Compose

O ambiente de desenvolvimento sobe PostgreSQL 15 e o backend Spring Boot na porta `8080`.

```bash
# 1. Copie o arquivo de exemplo
cp infra/.env.example infra/.env

# 2. Preencha POSTGRES_PASSWORD, JWT_SECRET e defina seu STORAGE_PROVIDER (s3 ou gcs) com as chaves de nuvem em infra/.env

# 3. Suba banco e backend
docker compose --env-file infra/.env -f infra/docker-compose.yml up --build

# 4. Em outro terminal, acompanhe os logs do backend
docker compose --env-file infra/.env -f infra/docker-compose.yml logs -f backend
```

Teste o cadastro de pesquisador:

```bash
curl -i -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Pesquisadora",
    "email": "ana.pesquisadora@unb.br",
    "password": "<senha-local>"
  }'
```

Para parar os containers:

```bash
docker compose --env-file infra/.env -f infra/docker-compose.yml down
```

Para remover também o volume local do PostgreSQL:

```bash
docker compose --env-file infra/.env -f infra/docker-compose.yml down -v
```

Nenhum segredo real deve ser salvo em arquivos versionados. O arquivo `infra/.env` fica fora do Git e deve conter apenas valores locais de desenvolvimento.

Se a porta `5432` ja estiver em uso na sua maquina, altere `POSTGRES_PORT` em `infra/.env`.
O backend continua conectando no PostgreSQL pela rede interna do Compose em `db:5432`.

---

## Stack Tecnológica

| Camada | Tecnologias |
| :--- | :--- |
| **Backend** | Java 21 · Spring Boot 4.1 · Spring Security · JWT · Flyway |
| **Frontend** | React 19 · Vite 8 · React Router · Axios · Bootstrap 5 |
| **Cloud / Infra** | Supabase S3 Storage · Cloud SQL (PostgreSQL) · Docker Compose |
| **Docs & CI** | MkDocs Material · GitHub Actions · uv · JaCoCo |

---

## Equipe

| Nome | Papel | GitHub |
| :--- | :--- | :--- |
| Pedro Henrique P. Santos | Tech Lead | [@pedrohpsantos](https://github.com/pedrohpsantos) |
| Alana Cristyna F. Dias | Full Stack | [@alanafeitosa-ui](https://github.com/alanafeitosa-ui) |
| Arthur Carvalho Leite | Full Stack | [@arthurlleite](https://github.com/arthurlleite) |
| Luis Gustavo F. Nunes | Full Stack | [@LuisGFNunes](https://github.com/LuisGFNunes) |
| Mariana S. F. Andrade | Full Stack | [@mariana-farias12](https://github.com/mariana-farias12) |
| Mateus Alves Araújo | Full Stack | [@mateusaraujo2006](https://github.com/mateusaraujo2006) |

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `0.1.0` | 10/06/2026 | Fundação da documentação técnica e governança. | Pedro Henrique P. Santos |
| `0.2.0` | 13/06/2026 | Reestruturação arquitetural da documentação e guias de Desenvolvimento (DevEx). | Pedro Henrique P. Santos |

---

## Licença

Projeto acadêmico desenvolvido para fins educacionais no Laboratório de Inteligência Artificial (AILAB).
O código fonte é disponibilizado sob a [MIT License](LICENSE).

---
*Consulte o [Changelog](CHANGELOG.md) para o histórico de versões completo e nossa [Política de Segurança](SECURITY.md) para o fluxo de relato de vulnerabilidades.*
