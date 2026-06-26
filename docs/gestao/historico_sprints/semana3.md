---
date: 2026-06-12
authors:
  - pedrohpsantos
categories:
  - Sprint
---
# :material-rocket-launch: Semana 3 — Implementação da Autenticação e Estrutura Base

<span class="status-badge"> Concluída</span>

**Período:** 26/05/2026 – 08/06/2026

---

## Objetivo das Sprints

Iniciar a implementação do MVP do EdTech com foco em três frentes paralelas: **(1)** estruturar o backend Spring Boot com a entidade `User` e o endpoint de registro, **(2)** configurar o frontend React com as telas de autenticação, e **(3)** garantir qualidade com testes automatizados e documentação técnica completa.

---

## Entregas Realizadas

### :material-server-network: Backend — Setup e Entidade User


- [x] Projeto Spring Boot criado via Spring Initializr (Java 17, Maven)
- [x] Dependências configuradas: Spring Web, Spring Security, Spring Data JPA, PostgreSQL Driver, Lombok, Validation

- [x] Entidade `User` com campos: `id (UUID)`, `name`, `email`, `passwordHash`, `role`, `active`, `createdAt`, `updatedAt`
- [x] `UserRepository` (interface JPA)
- [x] `UserService` com métodos `register()` e `findByEmail()`
- [x] `AuthController` com endpoint `POST /api/auth/register`
- [x] Validação de domínio `@unb.br` no e-mail

- [x] Senha hasheada via BCrypt (custo ≥ 12)
- [x] Reestruturação dos pacotes para `com.docvault`

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `891bf54` | 05/06 | Mateus | `setup Springboot + User entity` |
| `8381796` | 05/06 | Luis Gustavo | `refactor: restructure project and migrate packages to com.docvault` |

**Branch:** `feat/backend-setup`  
**Issue:** [#2](https://github.com/pedrohpsantos/EdTech/issues/2)

---

### :material-monitor-cellphone: Frontend — Setup e Telas de Autenticação


- [x] Projeto React criado com Vite (`npm create vite@latest frontend -- --template react`)
- [x] Dependências instaladas: `react-router-dom`, `bootstrap`, `axios`
- [x] Estrutura de pastas: `components/`, `pages/`, `services/`, `App.jsx`
- [x] Página `/login` com formulário: e-mail + senha + botão "Entrar"
- [x] Página `/register` com formulário: nome + e-mail + senha + confirmação

- [x] Página `/dashboard` com mensagem de boas-vindas e botão "Sair"
- [x] Configuração do React Router com rotas básicas

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `abb1466` | 04/06 | Alana Cristyna | `setup inicial do frontend com paginas de login, cadastro e dashboard` |

**Branch:** `feat/frontend-setup`  
**Issue:** [#6](https://github.com/pedrohpsantos/EdTech/issues/6)

---

### :material-test-tube: Testes Automatizados e Cobertura


- [x] Testes unitários para `UserService`: registro com dados válidos, e-mail duplicado, domínio inválido

- [x] Testes unitários para `JwtService`: geração de token, validação com token expirado, extração de ID

- [x] Testes de integração para `AuthController`: register (201), register com e-mail inválido (400), login (200 + cookie), login com senha errada (401), `/me` sem cookie (401)
- [x] Relatório de cobertura configurado com JaCoCo

- [x] **Cobertura atingida: 92%** nos pacotes `service` e `controller` (meta: ≥ 80%)

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `1ed4334` | 04/06 | Luis Gustavo | `test(auth): implement unit and integration tests with 92% jacoco coverage` |

**Branch:** `feat/tests-auth`  
**Issue:** [#8](https://github.com/pedrohpsantos/EdTech/issues/8)

---

### :material-clipboard-text-clock: Módulo de Auditoria


- [x] Entidade `AuditLog` com campos: `id`, `userId`, `action`, `resourceType`, `resourceId`, `ipAddress`, `details`, `createdAt`
- [x] `AuditLogRepository`
- [x] `AuditLogService` com método `log(action, userId, resourceType, resourceId, ip, details)`
- [x] Enum `AcaoAuditoria` com ações: `LOGIN_SUCCESS`, `LOGIN_FAILED`, `LOGOUT`, `REGISTER`, `UPLOAD_SUCCESS`, etc.

- [ ] Integração dos audit logs nos endpoints de auth (em andamento)

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `c3eb41b` | 04/06 | Mariana | `feat: adicionei AuditLog entity, AuditLogService, AuditLogRepository` |
| `83af273` | 04/06 | Mariana | `feat: adiciona o enum AcaoAuditoria` |
| `390569d` | 04/06 | Pedro Henrique | `fix: path folders` |

**Branch:** `feat/audit-logs`  
**Issue:** [#9](https://github.com/pedrohpsantos/EdTech/issues/9)

---

### :material-file-document-edit: Documentação e Arquitetura


- [x] 9 ADRs (Architecture Decision Records) publicados:

    - ADR 0001: Armazenamento GCS

    - ADR 0002: Autenticação JWT

    - ADR 0003: Cloud Run Serverless

    - ADR 0004: PostgreSQL

    - ADR 0005: Spring Boot

    - ADR 0006: SPA + API

    - ADR 0007: Flyway Migrations

    - ADR 0008: GitHub Actions CI/CD

    - ADR 0009: Docs-as-Code via MkDocs

- [x] DoR & DoD atualizados com garantias de arquitetura, Flyway, CI/CD e Docs-as-Code

- [x] Roadmap atualizado com framework Now / Next / Later

- [x] Product Vision e Team Agreements documentados

- [x] Landing page do GitHub Pages redesenhada com hero section customizada

- [x] Diagramas Mermaid padronizados em toda a documentação

- [x] Deploy automático no GitHub Pages operacional

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `d08174b` | 04/06 | Pedro Henrique | `docs: scaffold project documentation, architecture design, and CI/CD infrastructure` |
| `23c3a8c` | 04/06 | Pedro Henrique | `docs: initialize project documentation including ADRs, architecture models, and agile planning artifacts` |
| `246a70c` | 04/06 | Pedro Henrique | `docs: add team agreements and product vision documentation` |
| `a6f289c` | 04/06 | Pedro Henrique | `feat: initialize documentation landing page with project overview and stack details` |
| `1fef65c` | 04/06 | Pedro Henrique | `feat: add landing page documentation and custom hero styling for EdTech portal` |
| `370ed13` | 03/06 | Pedro Henrique | `Revise README to include development flow details` |

---

### :material-source-branch: Gestão de Branches e Processo


- [x] 8 branches de feature criadas seguindo o padrão `feat/*`
- [x] Labels e milestone configurados no GitHub

- [x] Convenção de Conventional Commits sendo seguida

- [x] Issues #2 a #10 criadas com tarefas detalhadas e critérios de aceitação

- [x] Branch `develop` configurada como branch de integração

**Branches criadas:**

| Branch | Responsabilidade | Status |
| :--- | :--- | :---: |
| `feat/backend-setup` | Setup Spring Boot + User entity |  Implementado |
| `feat/auth-jwt` | JwtService + Login + Logout |  Pendente |
| `feat/security-filter` | JwtAuthenticationFilter + SecurityConfig |  Pendente |
| `feat/docker-backend` | Dockerfile + docker-compose backend |  Pendente |
| `feat/frontend-setup` | React + Vite + Telas auth |  Implementado |
| `feat/frontend-auth` | PrivateRoute + Context API + Dark mode |  Pendente |
| `feat/tests-auth` | JUnit + Mockito + JaCoCo |  Implementado |
| `feat/audit-logs` | AuditLog entity + Service + Repository |  Parcial |

---

## Resumo Técnico

| Métrica | Valor |
| :--- | :---: |
| Commits no período | ~35 |
| Branches de feature criadas | 8 |
| Issues criadas | 9 (Issues #2 a #10) |
| ADRs publicados | 9 |
| Páginas de documentação novas/atualizadas | 20+ |
| Cobertura de testes (JaCoCo) | 92% |
| Endpoints implementados | `POST /api/auth/register` |
| Telas do frontend | 3 (Login, Register, Dashboard) |
| Membros contribuindo com código | 4 de 5 |

---

## Contribuições da Equipe

### 👨‍💻 Tech Lead (Pedro Henrique)
- **Foco:** ADRs, documentação, landing page, gestão de branches, planning.
- **Entregas:** Documentação base e arquitetura.
- **Commits:** `d08174b`, `23c3a8c`, `390569d`.

### ⚙️ Backend (Mateus Alves)
- **Foco:** Setup Spring Boot, entidade User, AuthController.
- **Entregas:** Issue #2.
- **Commits:** `891bf54`.

### 🎨 Frontend (Alana Cristyna)
- **Foco:** Setup React/Vite, telas de login, register, dashboard.
- **Entregas:** Issue #6.
- **Commits:** `abb1466`.

### 🚀 DevOps / QA (Luis Gustavo)
- **Foco:** Testes JUnit/Mockito com 92% cobertura, reestruturação de pacotes.
- **Entregas:** Issue #8.
- **Commits:** `1ed4334`, `8381796`.

### 📝 Docs & Logs (Mariana Andrade)
- **Foco:** Entidade AuditLog, AuditLogService, enum AcaoAuditoria.
- **Entregas:** Issue #9.
- **Commits:** `c3eb41b`, `83af273`.

### 🛡️ Apoio e Testes (Arthur)
- **Foco:** Participação nas definições iniciais de arquitetura.
- **Entregas:** Cerimônias e alinhamento.
- **Commits:** `(Revisões de PR)`.

---

## Aprendizados e Decisões

!!! note "Decisão: Monorepo com módulos separados"
    O código foi organizado no diretório `docvault/` com módulos `api/`, `auth/` e `frontend/`, permitindo desenvolvimento paralelo por diferentes membros da equipe.

!!! note "Decisão: Cobertura acima da meta"
    A cobertura de testes atingiu 92% (meta: 80%), validando o fluxo completo de register → login → me com testes de integração MockMvc.

!!! note "Decisão: ADRs como documentação de arquitetura"
    As 9 ADRs registram todas as decisões técnicas tomadas até o momento, garantindo rastreabilidade e justificativa para cada escolha da stack.

!!! warning "Débito técnico identificado"
    As issues #3 (JWT Service), #4 (Security Filter) e #5 (Docker Backend) ficaram sem implementação e serão priorizadas na Sprint 4.

---

## Débitos Técnicos para a Próxima Sprint

| Issue | Descrição | Impacto |
| :---: | :--- | :--- |
| #3 | JWT Service (login/logout com cookies) |  Crítico — bloqueia o fluxo de autenticação |
| #4 | Security Filter (proteção de rotas) |  Crítico — bloqueia rotas protegidas |
| #5 | Docker Backend (containerização) |  Médio — necessário para CI/CD |
| #6 | api.js + redirecionamento + erros |  Médio — integração frontend  backend |
| #7 | PrivateRoute + Context API + Dark mode |  Médio — rotas protegidas no frontend |
| #9 | Integração audit logs nos endpoints |  Baixo — funcionalidade auxiliar |

---

## Próximos Passos

→ [Semana 4 — Integração, Rotas e Refinamento de Escopo](semana4.md)

← [Semana 2 — Lean Inception, Requisitos e Arquitetura](semana2.md)

---

## Histórico de Versões

| Versão |    Data    | Descrição                           | Autor                    |
| :---: | :---: | :--- | :--- |
| `1.0`  | 05/06/2026 | Criação do documento                | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
