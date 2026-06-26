---
date: 2026-06-26
authors:
  - pedrohpsantos
categories:
  - Sprint
---
# :material-rocket-launch: Semana 6 — Infraestrutura, Plugins e Ajuste de Rotas

<span class="status-badge"> Parcialmente Concluída</span>

**Período:** 20/06/2026 – 26/06/2026

---

## Objetivo da Sprint

O objetivo desta sprint era finalizar a auditoria (backend e frontend), realizar o deploy do MVP e preparar os painéis do orientador e auditor. Devido a uma semana acadêmica muito puxada e pouco tempo para estudo da equipe, o escopo não foi concluído e as tarefas cruciais foram movidas para a Sprint 7.

---

## Entregas Realizadas

Apesar do atraso nas features principais de negócio (telas de painéis), avançamos consideravelmente na infraestrutura, código e documentação:

### :material-server-network: Arquitetura e Backend
- [x] Migração da persistência de arquivos para o Supabase Storage (S3-compatible) com fallback mantido para Google Cloud Storage (GCS).
- [x] Upgrade do Spring Boot para a versão 4.1.0 e atualizações de dependências críticas.
- [x] Configuração centralizada do Swagger (ReDoc) gerando contratos dinâmicos.

### :material-file-document-edit: Documentação (Docs-as-Code)
- [x] Refatoração do repositório MkDocs com plugins avançados (`awesome-pages`, `macros`, `roamlinks`, `git-authors`).
- [x] Configuração do Giscus para comentários e discussões na documentação, com sincronização automática do tema claro/escuro injetada via script JavaScript.
- [x] Adição e organização da seção "Planejamento" na aba de Gestão.

### :material-shield-check: CI/CD e Segurança (Issue #96)
- [x] Unificação e Paralelização da pipeline de CI no GitHub Actions.
- [x] Resolução dos erros do CodeQL migrando para o Github Advanced Security "Default Setup".
- [x] Atualização da versão do Node.js para 24, correção de avisos da JVM (Mockito) e atualização segura de dependências NPM.

---

## Resumo Técnico

| Métrica | Valor |
| :--- | :---: |
| Issues entregues / concluídas | 4 (Issues #73, #96, #101, #102) |
| Reuniões e Atas documentadas | 1 (Ata 26/06/2026) |

---
## Contribuições da Equipe

### Tech Lead (Pedro Henrique)
- **Foco:** Revisão técnica, refatoração de infraestrutura, CodeQL e CI/CD.
- **Entregas:** Issue #96.
- **Commits em Destaque:** `a2e97f9`, `ef0afec`, `5b752ae`.

### DevOps (Luis Gustavo)
- **Foco:** Melhoria contínua de esteiras, paralelismo e auxílio backend.
- **Entregas:** Issue #96.
- **Commits em Destaque:** `98be0a5`, `19eb9b4`, `612910d`.

### Backend (Alana Cristyna)
- **Foco:** Desenvolvimento das demandas atrasadas e features da Sprint.
- **Entregas:** Issue #73 (Contratos e Refatoração).
- **Commits:** `(Revisado em PR e Pair Programming)`.

### Frontend (Mariana Andrade)
- **Foco:** Desenvolvimento das demandas atrasadas e componentes de UI.
- **Entregas:** Issues #101, #102.
- **Commits:** `(Entregas em andamento/validação)`.

### QA (Mateus Alves)
- **Foco:** Garantia de qualidade integrada ao Frontend e fluxos visuais.
- **Entregas:** Validação das Issues #101 e #102.
- **Commits:** `(Validações em PR)`.

### Docs & Logs (Arthur)
- **Foco:** Modernização do portal MkDocs e ferramentas de comentários.
- **Entregas:** Revisão de layout (Giscus, Tema).
- **Commits:** `(Auxílio indireto)`.

---

## Aprendizados e Decisões

!!! warning "Decisão Estratégica: Cancelamento da Rotação de Papéis"
    Na reunião de fechamento (26/06), o grupo decidiu que **não haverá rotação de papéis** nesta virada de sprint. A semana foi muito puxada e os desenvolvedores full-stack não tiveram tempo hábil para estudar o suficiente as outras stacks.

!!! tip "Força Tarefa: Ajuda Mútua"
    Como as issues da Sprint 6 atrasaram e não atingimos o deadline, decidimos juntar forças para a Sprint 7. A definição foi de pareamento por afinidade:
    - O responsável pela área de **DevOps** vai auxiliar o **Backend**.
    - O responsável pela área de **QA** vai auxiliar o **Frontend**.
    A ideia é focar 100% nas entregas finais para não comprometer a Demonstração da Semana 14.

---

## Débitos Técnicos para a Próxima Sprint (Sprint 7)

Todas as issues críticas da Sprint 6 foram repriorizadas para a Sprint 7, juntando-se às tarefas finais:

| Issue | Descrição | Impacto |
| :---: | :--- | :--- |
| #70 / #71 | Painel do Orientador e Endpoint de Aprovação | Crítico — Demonstração |
| #68 / #69 | Painel de Auditoria e Endpoint de Consulta | Crítico — Demonstração |

---

## Próximos Passos

→ **Semana 7**: Fluxo E2E, Painéis Finais e Deploy MVP

← [Semana 5 — Uploads, Autenticação e Integrações GCS](semana5.md)

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 26/06/2026 | Documentação inicial da Entrega 6 | Pedro Henrique P. Santos |
