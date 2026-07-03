<div align="center">
  <img src="docs/assets/imgs/banner-github.png" alt="EdTech Banner" width="100%">
</div>

# EdTech — Repositório Acadêmico

[![Deploy MkDocs](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml)
[![CI Pipeline](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml)
![NodeJS](https://img.shields.io/badge/Node.js-%3E%3D24-339933?logo=nodedotjs&logoColor=white)
![Java](https://img.shields.io/badge/Java-21_LTS-007396?logo=openjdk&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-SQL_%26_Run-4285F4?logo=googlecloud&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=white)
![MkDocs Material](https://img.shields.io/badge/docs-MkDocs_Material-7c4dff?logo=materialformkdocs&logoColor=white)

Plataforma acadêmica para centralização, gerenciamento e auditoria de publicações científicas, relatórios de pesquisa e datasets — desenvolvida no laboratório **AILAB Makers** (UnB FCTE).

> **📖 Portal da Documentação:** [pedrohpsantos.github.io/EdTech](https://pedrohpsantos.github.io/EdTech/)

---

## 📌 Estado Atual do Repositório (Semana 7/7)

O projeto encontra-se atualmente na fase final de entrega e lapidação do **MVP (Sprint 7/7)**.
- **✅ Concluído:** Arquitetura do Monorepo, Autenticação, Proteção CSRF/JWT, Infraestrutura 100% Google Cloud (Cloud Storage, Cloud SQL, Cloud Run) e Firebase Hosting para Frontend, Layout UI/UX responsivo (React/Vite).
- **✅ Concluído (Frontend UI):** Tradução nativa para Português, Design System em CSS Puro (Zero Tailwind, uso estrito de Bootstrap apenas para grid), implementação da "Trilha de Pesquisa" (Logs de Auditoria Visuais) e Skeleton Loadings premium para visualização de documentos.
- **✅ Concluído (Enterprise Grade):** Integração final das APIs REST do Backend com as chamadas assíncronas do Frontend, Deploy em Produção (GCP Secret Manager + Cloud Run + Firebase Hosting) e Pipeline Seguro (GitHub Actions).

---

## 🏗️ Estrutura do Monorepo

Nosso repositório abriga tanto a aplicação de interface gráfica quanto a lógica de serviços. Acesse os guias de cada submódulo:

- 🎨 **[Interface (Frontend)](frontend/README.md)**: Aplicação Web feita em React 19 + Vite 8 (Estilização em CSS Puro e layout Bootstrap).
- ⚙️ **[Serviços (Backend API)](docvault/api/README.md)**: Aplicação RestFul feita em Java 21 + Spring Boot 4.1.0.

*Para visualizar a arquitetura C4 estrutural de alto nível da nossa solução, consulte a aba de Arquitetura no Portal de Documentação (MkDocs).*

---

## 🚀 Quick Start (Documentação Local)

Para desenvolvedores e conteudistas que desejam editar a documentação Markdown:

```bash
# Clone o repositório
git clone https://github.com/pedrohpsantos/EdTech.git
cd EdTech

# Instale as dependências com o gerenciador UV
uv sync

# Sirva a documentação localmente e veja as mudanças em tempo real
uv run mkdocs serve
```

Acesse `http://127.0.0.1:8000` no navegador.

---

## 🐳 Ambiente Local com Docker Compose

Subir o ambiente completo de desenvolvimento local com os bancos de dados vinculados é fácil com Docker:

```bash
# 1. Na raiz do projeto, copie o arquivo de variáveis de exemplo
cp infra/.env.example infra/.env

# 2. Preencha POSTGRES_PASSWORD e JWT_SECRET em infra/.env

# 3. Suba o banco e a API de uma só vez (Build Automático)
docker compose --env-file infra/.env -f infra/docker-compose.yml up --build

# 4. Acompanhe os logs isolados da API em outra aba (Opcional)
docker compose --env-file infra/.env -f infra/docker-compose.yml logs -f backend
```

Para derrubar tudo limpo (excluindo volumes do DB local):
```bash
docker compose --env-file infra/.env -f infra/docker-compose.yml down -v
```

---

## 👨‍💻 Equipe

| Nome | Papel | GitHub |
| :--- | :--- | :--- |
| Pedro Henrique P. Santos | Tech Lead | [@pedrohpsantos](https://github.com/pedrohpsantos) |
| Alana Cristyna F. Dias | Full Stack | [@alanafeitosa-ui](https://github.com/alanafeitosa-ui) |
| Arthur Carvalho Leite | Full Stack | [@arthurlleite](https://github.com/arthurlleite) |
| Luis Gustavo F. Nunes | Full Stack | [@LuisGFNunes](https://github.com/LuisGFNunes) |
| Mariana S. F. Andrade | Full Stack | [@mariana-farias12](https://github.com/mariana-farias12) |
| Mateus Alves Araújo | Full Stack | [@mateusaraujo2006](https://github.com/mateusaraujo2006) |

---

## 📜 Histórico de Versões

| Versão | Data | Descrição |
| :---: | :---: | :--- |
| `0.1.0` | 10/06/2026 | Fundação da documentação técnica e governança. |
| `0.2.0` | 13/06/2026 | Reestruturação arquitetural e guias DevEx (MkDocs). |
| `0.3.0` | 20/06/2026 | Consolidação do Backend (Spring Boot 4.1 + Java 21) e Infra CI. |
| `0.4.0` | 26/06/2026 | Integração de UI (Vite), Google Cloud SQL/Storage e fechamento do MVP Sprint 6. |
| `0.5.0` | 01/07/2026 | Refinamento Premium de UX/UI (Animações, Design System CSS Puro, Tela de Trilha de Pesquisa). |

---

## ⚖️ Licença e Contribuição

Para saber como contribuir (Convenções de Commits, Issues), leia nosso **[Guia de Contribuição](CONTRIBUTING.md)**.
Consulte o **[Changelog](CHANGELOG.md)** para o histórico de versões completo e nossa **[Política de Segurança](SECURITY.md)** para relato de vulnerabilidades.

Projeto acadêmico desenvolvido no Laboratório de Inteligência Artificial (AILAB). Código disponibilizado sob a [MIT License](LICENSE).
