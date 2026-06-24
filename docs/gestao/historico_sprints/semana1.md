---
date: 2026-05-29
authors:
  - pedrohpsantos
categories:
  - Sprint
---
# :material-rocket-launch: Semana 1 — Setup e Fundação

<span class="status-badge"> Concluída</span>

**Período:** 12/05/2026 – 18/05/2026

---

## Objetivo da Sprint

Estabelecer toda a fundação do projeto: repositório, pipeline de CI/CD, ambiente de desenvolvimento containerizado, documentação técnica inicial e definição da equipe.

---

## Entregas Realizadas

### :material-source-repository: Repositório e Estrutura


- [x] Criação do repositório no GitHub (organização AILAB-MAKERS)
- [x] Definição da estrutura de pastas (`backend/`, `frontend/`, `docs/`, `infra/`)
- [x] Configuração do `.gitignore` para Java, Node, Python e IDEs

- [x] Criação do `README.md` completo com sumário, stack e instruções

### :material-file-document-edit: Documentação (MkDocs)

- [x] Setup do MkDocs com Material for MkDocs

- [x] Configuração do `pyproject.toml` para gerenciamento com `uv`
- [x] CSS customizado com design premium (glassmorphism, animações, dark mode)
- [x] Deploy automático via GitHub Actions (`ci-docs.yml`)

### :material-docker: Infraestrutura


- [x] Criação do `docker-compose.yml` com serviço PostgreSQL

- [x] Arquivo `.env.example` com variáveis documentadas

- [x] Validação do ambiente local com Docker Desktop

### :material-git: Processo de Desenvolvimento


- [x] Template de Pull Request com checklist de qualidade

- [x] Definição da convenção de commits (Conventional Commits)
- [x] Proteção da branch `main` (merge somente via PR aprovado)
- [x] Documentação do fluxo de branches (`feat/*`, `fix/*`, `docs/*`)

### :material-account-switch: Equipe e Funções


- [x] Definição de papéis: 1 Tech Lead + 5 Full Stacks

- [x] Plano de rotação bimensal entre frentes de trabalho

- [x] Organização em 3 squads complementares

### :material-layers-triple: Stack Tecnológica


- [x] Seleção e justificativa da stack (Java 17, Spring Boot, PostgreSQL, GCS, Docker)
- [x] Frontend definido: HTML5, CSS3, JS Vanilla, Bootstrap 5, React

- [x] Documentação de pré-requisitos para desenvolvimento local

---

## Resumo Técnico

| Métrica | Valor |
| :--- | :---: |
| Commits na semana | ~15 |
| PRs abertos/mergeados | 3 / 3 |
| Páginas de documentação | 8 |
| Containers configurados | 1 (PostgreSQL) |

---

## Aprendizados e Decisões

!!! note "Decisão: MkDocs ao invés de Notion"
    A equipe optou por documentação **as-code** com MkDocs para manter tudo versionado no mesmo repositório do projeto, com deploy automático via GitHub Pages.

!!! note "Decisão: uv como gerenciador Python"
    Utilizamos `uv` ao invés de `pip` para gerenciar dependências Python, garantindo instalação rápida e reprodutível do ambiente de documentação.

!!! note "Decisão: Funções genéricas (Full Stack)"
    Todos os membros (exceto o Tech Lead) são designados como **Full Stack** com rotação bimensal entre frentes de trabalho, evitando especialização precoce.

---

## Próximos Passos

→ [Semana 2 — Lean Inception, Requisitos e Arquitetura](semana2.md)


---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 29/05/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
