# EdTech — Repositório Acadêmico

[![Deploy MkDocs](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml)
![Python](https://img.shields.io/badge/python-%3E%3D3.11-3776ab?logo=python&logoColor=white)
![MkDocs Material](https://img.shields.io/badge/docs-MkDocs%20Material-7c4dff?logo=materialformkdocs&logoColor=white)

Plataforma acadêmica para centralização, gerenciamento e auditoria de publicações científicas, relatórios de pesquisa e datasets — desenvolvida no laboratório **AILAB Makers** (UnB FCTE).

> **📖 Documentação completa:** <https://pedrohpsantos.github.io/EdTech/>

---

## Quick Start (Documentação Local)

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

# 2. Preencha POSTGRES_PASSWORD e JWT_SECRET em infra/.env

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
    "password": "senha-segura-123"
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
| **Backend** | Java 17 · Spring Boot · Spring Security · JWT |
| **Frontend** | React · HTML5 · CSS3 · Bootstrap 5 |
| **Cloud** | Google Cloud Run · Cloud SQL (PostgreSQL) · Cloud Storage |
| **Docs & CI** | MkDocs Material · GitHub Actions · uv |

---

## Equipa

| Nome | Papel | GitHub |
| :--- | :--- | :--- |
| Pedro Henrique P. Santos | Tech Lead | [@pedrohpsantos](https://github.com/pedrohpsantos) |
| Alana Cristyna F. Dias | Full Stack | [@alanafeitosa-ui](https://github.com/alanafeitosa-ui) |
| Arthur Carvalho Leite | Full Stack | [@arthurlleite](https://github.com/arthurlleite) |
| Luis Gustavo F. Nunes | Full Stack | [@LuisGFNunes](https://github.com/LuisGFNunes) |
| Mariana S. F. Andrade | Full Stack | [@mariana-farias12](https://github.com/mariana-farias12) |
| Mateus Alves Araújo | Full Stack | [@mateusaraujo2006](https://github.com/mateusaraujo2006) |

---

## Licença

Projeto acadêmico desenvolvido para fins educacionais no Laboratório de Inteligência Artificial (AILAB).
