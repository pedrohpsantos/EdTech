# :material-rocket-launch: Semana 1 — Fundação

<span class="status-badge">✅ Concluída</span>

**Período:** 12/05/2026 – 18/05/2026

---

## Objetivo da Sprint

Estabelecer toda a fundação do projeto: repositório, pipeline de CI/CD, ambiente de desenvolvimento containerizado e documentação técnica inicial.

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
- [x] Estrutura de navegação: Início, Planejamento, Arquitetura, Entregas
- [x] CSS customizado para design diferenciado
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

---

## Próximos Passos

→ [Semana 2 — Autenticação](semana2.md): modelagem do banco, API de login e JWT.
