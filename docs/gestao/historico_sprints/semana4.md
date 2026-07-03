---
date: 2026-06-15
authors:
  - pedrohpsantos
categories:
  - Sprint
hide:
  - footer
---
# Semana 4 — Integração, Rotas e Refinamento de Escopo

<span class="status-badge"> Concluída</span>

**Período:** 06/06/2026 – 12/06/2026

---

## Objetivo da Sprint

Consolidar tecnicamente a integração entre o Frontend (React) e o Backend (Spring Boot), garantir a proteção das rotas com JWT via Cookies `HttpOnly`, e alinhar o escopo gerencial para conter o *scope creep* identificado nos protótipos de design.

---

## Entregas Realizadas

### :material-server-network: Backend — CORS e Segurança


- [x] Configuração de `CorsConfigurationSource` no `SecurityConfig`
- [x] Aceite de origens cruzadas mapeado para o ambiente de dev (`localhost:5173`)
- [x] Aceite do envio de credenciais (cookies JWT) via `allowCredentials = true`
- [x] Liberação global dos métodos `GET, POST, PUT, DELETE, OPTIONS`

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `a654efe` | 12/06 | Pedro Henrique | `Update SecurityConfig.java for CORS` |

**Branch:** `feat/cors-integration`  
**Issue:** [#16](https://github.com/pedrohpsantos/EdTech/issues/16)

---

### :material-monitor-cellphone: Frontend — Serviços HTTP e Rotas Protegidas


- [x] Camada de serviço HTTP `api.js` mapeada usando `fetch` com `credentials: 'include'`
- [x] Acoplamento de sucesso entre formulários de Login/Registro e o Spring Boot

- [x] Implementação de `PrivateRoute` validando a sessão ativa em `/dashboard`
- [x] Redirecionamentos de login resolvidos perfeitamente

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `14f52b7` | 08/06 | Alana Cristyna | `feat: implementa api.js e chamadas de login/register` |
| `c628f41` | 09/06 | Alana Cristyna | `feat: adiciona componente PrivateRoute para protecao de dashboard` |

**Branches:** `feat/api-service`, `feat/frontend-auth`  
**Issues:** [#17](https://github.com/pedrohpsantos/EdTech/issues/17), [#7](https://github.com/pedrohpsantos/EdTech/issues/7)

---

### :material-palette: Frontend — Acessibilidade Visual (Modo Escuro)

- [x] Implementação nativa de Modo Claro/Escuro usando variáveis CSS puras (`data-theme`)
- [x] Persistência do estado de preferência visual no `localStorage`
- [x] Integração de um componente genérico de `ThemeToggle` no cabeçalho

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `9d35a82` | 10/06 | Pedro Henrique | `feat: add light/dark mode css variables and toggle hook` |

**Branch:** `feat/theme-toggle`  
**Issue:** [#18](https://github.com/pedrohpsantos/EdTech/issues/18)

---

### :material-file-document-edit: Gestão e Refinamento de Escopo


- [x] Avaliação aprofundada do protótipo de UI/UX proposto pelo design

- [x] Identificação de fuga de escopo (Analytics, Dashboard de Auditor LGPD, Design System customizado demais)
- [x] Reversão completa do planejamento para o formato original (F01 a F22)
- [x] Fechamento e rejeição permanente das Issues excedentes da V2

- [x] Execução e formalização da nossa primeira rotação de papéis de trabalho

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `e301b04` | 12/06 | Pedro Henrique | `docs: sync documentation from develop branch to revert scope creep` |
| `b5b9eb0` | 12/06 | Pedro Henrique | `docs: registrar ata de reuniao, entrega da sprint 4 e rotacoes` |

**Issues Fechadas por Rejeição:** #62 a #67

---

## Resumo Técnico

| Métrica | Valor |
| :--- | :---: |
| Commits no período | ~12 |
| Issues entregues / concluídas | 4 (Issues #7, #16, #17, #18) |
| Issues de Scope Creep rejeitadas | 6 (Issues #62 a #67) |
| Reuniões e Atas documentadas | 1 (Ata 12/06/2026) |
| Páginas de documentação atualizadas | 4 |

---

## Contribuições da Equipe

### Tech Lead (Pedro Henrique)
- **Foco:** Reversão do *scope creep* para o MVP, criação de relatórios, atas e CSS do Modo Escuro.
- **Entregas:** Issue #18 e Gestão de Issues.
- **Commits:** `9d35a82`, `e301b04`, `b5b9eb0`.

### Frontend (Alana Cristyna)
- **Foco:** Implementação do `api.js` e do componente `PrivateRoute` no React.
- **Entregas:** Issues #7, #17.
- **Commits:** `14f52b7`, `c628f41`.

### QA (Luis Gustavo)
- **Foco:** Validação dos cookies e endpoints de Auth integrados ao React.
- **Entregas:** Testes de integração E2E.
- **Commits:** `(Revisões de PR)`.

### Backend (Mateus Alves)
- **Foco:** Suporte na configuração do CORS e revisão da camada de segurança.
- **Entregas:** Issue #16.
- **Commits:** `a654efe` (Co-autoria).

### Docs & Logs (Mariana Andrade)
- **Foco:** Validação das rotas integradas e revisão técnica da documentação.
- **Entregas:** Homologação E2E de login.
- **Commits:** `(Validações manuais)`.

### DevOps (Arthur)
- **Foco:** Recuperação médica.
- **Entregas:** -
- **Commits:** `(Ausente por motivos de saúde nesta Sprint)`.

---

## Aprendizados e Decisões

!!! note "Decisão: Contenção de Scope Creep"
    O desafio de garantir que a equipe não codifique além do que foi acordado no Canvas MVP foi resolvido. Fizemos um *hard reset* de documentações que protegiam a plataforma de crescer de forma irresponsável na Sprint 4.

!!! note "Decisão: Tempo de Rotações Fixado"
    Após a execução da primeira rotação no dia 12/06, o plano foi ajustado de "aproximadamente" para **exatamente duas semanas**, melhorando a previsibilidade da gestão de equipe.

!!! warning "Desafio: Ausência Técnica de Membro"
    Arthur não pôde atuar nesta Sprint por conta de problemas de saúde. Fizemos o balanceamento temporário de suas tarefas e acompanharemos a transição para a Sprint 5.

---

## Débitos Técnicos para a Próxima Sprint

| Issue | Descrição | Impacto |
| :---: | :--- | :--- |
| #72 | Implementação Definitiva do Flyway (Correção do DDL-Auto) | Crítico — Sem o Flyway, o banco perderá dados ao subir pra nuvem |
| #73 | Contratos de API (Requests/Responses) | Alto — Fundamental para trabalhar em paralelo sem quebrar contratos |
| #13 | Entidade Document e CRUD Backend | Alto — Feature Core de arquivos |
| #14 | Tela de Upload Frontend | Alto — Feature Core de interface |
| #15 | Entidade Project e Membros (Backend) | Médio — Preparação da base de dados |

---

## Próximos Passos

→ Sprint 5: Iniciar Fase 3 (Upload de Documentos, Flyway e Contratos de API).

← [Semana 3 — Implementação da Autenticação e Estrutura Base](semana3.md)

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 12/06/2026 | Documentação inicial da Entrega 4 | Pedro Henrique P. Santos |
| `1.1` | 12/06/2026 | Padronização e adição de tabelas de commits e debito técnico | Pedro Henrique P. Santos |
| `1.2` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |


