# EdTech — Repositório Acadêmico de Artigos e Pesquisas

Sistema web para centralização, gerenciamento e auditoria de publicações acadêmicas, relatórios de pesquisa e datasets, desenvolvido para laboratórios universitários, grupos de iniciação científica ou programas de pós-graduação armazenarem suas produções de forma segura, auditável e isolada.

Projeto desenvolvido no laboratório **AILAB Makers**.

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
├── docvault/                      # Monorepo do código fonte (API, Auth, Frontend)
├── docs/                          # Documentação técnica (MkDocs)
│   ├── arquitetura/               # Diagramas, nuvem, segurança e ADRs
│   ├── gestao/                    # Execução, entregas, acordos e reuniões
│   ├── planejamento/              # Visão de futuro, cronograma, rotas e regras
│   ├── produto/                   # Discovery, estratégia e requisitos
│   └── index.md                   # Página inicial da documentação
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
| **Frontend** | HTML5, CSS3, JavaScript Vanilla, Bootstrap 5, React |
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

Branch estavel e protegida do projeto. O codigo presente aqui reflete o ambiente de deploy publico.

### `develop`

Branch de integracao e validacao. Tudo que sai de `feat/*`, `fix/*`, `docs/*` e `refactor/*` deve passar por `develop`
antes de chegar na `main`.

### Branches de Funcionalidades

Cada funcionalidade (ex: `auth`, `upload`, `logging`) deve ser desenvolvida em uma branch propria derivada da `develop`.
Cada commit sera feito na branch correspondente a sua funcionalidade. Nunca commitar diretamente na `main`. A integracao
com a `main` ocorre por meio de PRs revisados, via `develop`.

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
- Alana Cristyna Feitosa Dias (Full Stack)
- Arthur Carvalho Leite (Full Stack)
- Luis Gustavo Ferreira Nunes (Full Stack)
- Mariana Souza Farias Andrade (Full Stack)
- Mateus Alves Araújo (Full Stack)

---

## Licença

Projeto acadêmico desenvolvido para fins educacionais no Laboratório de Inteligência Artificial (AILAB).
