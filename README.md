# EdTech — Repositório Acadêmico de Artigos e Pesquisas

Sistema web para centralização, gerenciamento e auditoria de publicações acadêmicas, relatórios de pesquisa e datasets, desenvolvido para laboratórios universitários, grupos de iniciação científica ou programas de pós-graduação armazenarem suas produções de forma segura, auditável e isolada.

Projeto desenvolvido no projeto de extensão **AILAB Makers — UnB FCTE**.

---

# Objetivo do Projeto

O sistema tem como objetivo digitalizar e proteger o armazenamento de produções científicas e rascunhos de pesquisas em andamento, permitindo:

- Cadastro e autenticação segura de usuários
- Upload de documentos admissionais e científicos (PDFs e datasets)
- Listagem filtrada e vinculada ao usuário autenticado
- Garantia de isolamento estrito entre diferentes autores e projetos
- Registro de logs de auditoria centralizados e inalteráveis
- Armazenamento de alta disponibilidade seguro em nuvem

---

# Funcionalidades

## Pesquisador (`researcher`)
- Criar conta
- Fazer login
- Enviar artigos em PDF, relatórios de pesquisa e datasets
- Visualizar e gerenciar apenas seus próprios rascunhos não publicados

## Orientador / Administrador (`advisor`)
- Fazer login
- Visualizar rascunhos e documentos de todos os pesquisadores vinculados ao seu laboratório ou projeto
- Validar submissões e acompanhar o andamento das pesquisas
- Bloqueio automático de acesso a projetos nos quais não possui vínculo direto

## Auditor / Logs do Sistema (`auditor`)
- Registrar e consultar de forma centralizada logs inalteráveis de login, logout, uploads, downloads, exclusão de arquivos e tentativas de acesso negadas

---

# Tecnologias Utilizadas

## Frontend
- HTML5
- CSS3
- JavaScript Vanilla
- Bootstrap 5
- Alpine.js (utilizado via CDN para gestão leve de estado e reatividade nas telas de login/upload)

## Backend
- Java 17
- Spring Boot
- Spring Security
- JWT (Tokens de autenticação transmitidos obrigatoriamente via cookies `HttpOnly` e `Secure` contra ataques XSS)

## Banco de Dados & Storage
- Google Cloud SQL for PostgreSQL (Persistência relacional gerenciada)
- Google Cloud Storage (Armazenamento de objetos para PDFs e datasets binários)

## Infraestrutura & DevOps
- Docker
- Google Cloud Run (Ambiente de execução containerizado e escalável)

## CI/CD, Qualidade & Auditoria
- GitHub Actions
- JUnit (Testes automatizados de rotas e segurança no ecossistema Java)
- Python 3.11 (Scripts analíticos complementares para consumo de telemetria do Cloud Logging)

---

# Fluxo de Desenvolvimento

### `main`
Branch estável e protegida do projeto. O código presente aqui reflete o ambiente de deploy público.

### `Branches de Funcionalidades`
Cada funcionalidade (ex: `auth`, `upload`, `logging`) deve ser desenvolvida em uma branch própria derivada da `main`. Cada commit será feito na branch correspondente à sua funcionalidade. Nunca commitar diretamente na main. A integração com a `main` ocorrerá exclusivamente por meio de Pull Requests (PRs) revisados pela liderança técnica.

---

# Convenção de Commits
Organização de Commits para melhor compreensão e rastreabilidade do projeto.

## Funcionalidades
`feat: implement secure jwt cookie storage`

## Correções
`fix: adjust spring security blocking path for unauthorized users`

## Documentação
`docs: update mkdocs architecture guides for phase 2`

## Refatoração
`refactor: optimize postgresql connection pooling on spring backend`

---

# Pré-requisitos

Antes de configurar o projeto localmente, é necessário instalar:

## Java JDK 17
https://www.oracle.com/java/technologies/downloads/

## Docker Desktop
https://www.docker.com/products/docker-desktop/

## Python 3.11+
https://www.python.org/downloads/

---

# Status do Projeto

🚧 Em desenvolvimento

---

# Integrantes

- Pedro Henrique Pereira Santos (Tech Lead)
- Alana Cristyna Feitosa Dias 
- Arthur Carvalho Leite 
- Luis Gustavo Ferreira Nunes 
- Mariana Souza Farias Andrade 
- Mateus Alves Araújo 

---

# Licença

Projeto acadêmico desenvolvido para fins educacionais no Laboratório de Inteligência Artificial (AILAB).
