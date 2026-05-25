# EdTech — Repositório Acadêmico de Artigos e Pesquisas

Sistema web para centralização, gerenciamento e auditoria de publicações acadêmicas, relatórios de pesquisa e datasets, desenvolvido para laboratórios universitários, grupos de iniciação científica ou programas de pós-graduação armazenarem suas produções de forma segura, auditável e isolada.

Projeto desenvolvido no projeto de extensão **AILAB Makers — UnB FCTE**.

---

## Sumário

- [Objetivo do Projeto](#objetivo-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Arquitetura de Pastas](#arquitetura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
- [Convenção de Commits](#convenção-de-commits)
- [Status do Projeto](#status-do-projeto)
- [Integrantes](#integrantes)
- [Licença](#licença)

---

## Objetivo do Projeto

O sistema tem como objetivo digitalizar e proteger o armazenamento de produções científicas e rascunhos de pesquisas em andamento, permitindo:

- Cadastro e autenticação segura de usuários
- Upload de documentos admissionais e científicos (PDFs e datasets)
- Listagem filtrada e vinculada ao usuário autenticado
- Garantia de isolamento estrito entre diferentes autores e projetos
- Registro de logs de auditoria centralizados e inalteráveis
- Armazenamento de alta disponibilidade seguro em nuvem

---

## Funcionalidades

### Pesquisador (`researcher`)

- Criar conta
- Fazer login
- Enviar artigos em PDF, relatórios de pesquisa e datasets
- Visualizar e gerenciar apenas seus próprios rascunhos não publicados

### Orientador / Administrador (`advisor`)

- Fazer login
- Visualizar rascunhos e documentos de todos os pesquisadores vinculados ao seu laboratório ou projeto
- Validar submissões e acompanhar o andamento das pesquisas
- Bloqueio automático de acesso a projetos nos quais não possui vínculo direto

### Auditor / Logs do Sistema (`auditor`)

- Registrar e consultar de forma centralizada logs inalteráveis de login, logout, uploads, downloads, exclusão de arquivos e tentativas de acesso negadas

---

## Arquitetura de Pastas

```text
edtech-repositorio/
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md   # Template padrão para PRs
│   └── workflows/
│       └── ci-docs.yml            # Deploy automático do MkDocs via GitHub Pages
├── backend/                       # API Java + Spring Boot
├── docs/                          # Documentação técnica (MkDocs)
│   ├── arquitetura/               # Diagramas e guias de arquitetura
│   ├── entregas/                  # Relatórios semanais de progresso
│   ├── planejamento/              # Rotações e planejamento do time
│   └── index.md                   # Página inicial da documentação
├── frontend/                      # Interface web (HTML/CSS/JS)
├── infra/                         # Docker Compose e variáveis de ambiente
│   ├── .env.example               # Exemplo de variáveis de ambiente
│   └── docker-compose.yml         # Orquestração dos containers
├── .gitignore
├── mkdocs.yml                     # Configuração do MkDocs
├── pyproject.toml                 # Dependências Python (uv)
└── README.md
```

---

## Tecnologias Utilizadas

| Camada | Tecnologias |
| --- | --- |
| **Frontend** | HTML5, CSS3, JavaScript Vanilla, Bootstrap 5, Alpine.js (CDN) |
| **Backend** | Java 17, Spring Boot, Spring Security, JWT (`HttpOnly` + `Secure` cookies) |
| **Banco de Dados & Storage** | Google Cloud SQL for PostgreSQL, Google Cloud Storage |
| **Infraestrutura & DevOps** | Docker, Google Cloud Run |
| **CI/CD & Qualidade** | GitHub Actions, JUnit, Python 3.11 (scripts de telemetria) |
| **Documentação** | MkDocs + Material for MkDocs |

---

## Pré-requisitos

Antes de configurar o projeto localmente, é necessário instalar:

| Ferramenta | Versão | Link |
| --- | --- | --- |
| Java JDK | 17 | [Download](https://www.oracle.com/java/technologies/downloads/) |
| Docker Desktop | latest | [Download](https://www.docker.com/products/docker-desktop/) |
| Python | 3.11+ | [Download](https://www.python.org/downloads/) |

---

## Fluxo de Desenvolvimento

### `main`

Branch estável e protegida do projeto. O código presente aqui reflete o ambiente de deploy público.

### Branches de Funcionalidades

Cada funcionalidade (ex: `auth`, `upload`, `logging`) deve ser desenvolvida em uma branch própria derivada da `main`. Cada commit será feito na branch correspondente à sua funcionalidade. Nunca commitar diretamente na main. A integração com a `main` ocorrerá exclusivamente por meio de Pull Requests (PRs) revisados pela liderança técnica.

---

## Convenção de Commits

Organização de commits para melhor compreensão e rastreabilidade do projeto.

| Tipo | Prefixo | Exemplo |
| --- | --- | --- |
| Funcionalidade | `feat` | `feat: implement secure jwt cookie storage` |
| Correção | `fix` | `fix: adjust spring security blocking path for unauthorized users` |
| Documentação | `docs` | `docs: update mkdocs architecture guides for phase 2` |
| Refatoração | `refactor` | `refactor: optimize postgresql connection pooling on spring backend` |

---

## Status do Projeto

🚧 Em desenvolvimento

---

## Integrantes

- Pedro Henrique Pereira Santos (Tech Lead)
- Alana Cristyna Feitosa Dias
- Arthur Carvalho Leite
- Luis Gustavo Ferreira Nunes
- Mariana Souza Farias Andrade
- Mateus Alves Araújo

---

## Licença

Projeto acadêmico desenvolvido para fins educacionais no Laboratório de Inteligência Artificial (AILAB).
