---
date: 2026-06-05
authors:
  - pedrohpsantos
categories:
  - Sprint
hide:
  - footer
---
# Semana 2 — Lean Inception, Requisitos e Arquitetura

<span class="status-badge"> Concluída</span>

**Período:** 19/05/2026 – 25/05/2026

---

## Objetivo da Sprint

Executar o Lean Inception completo, levantar e especificar todos os requisitos do sistema e definir a arquitetura técnica do EdTech.

---

## Entregas Realizadas

### :material-lightbulb-on: Lean Inception


- [x] Visão do Produto definida e documentada

- [x] Matriz É / Não É / Faz / Não Faz

- [x] 3 Personas criadas (Pesquisadora, Orientador, Auditora)
- [x] 3 Jornadas de Usuário mapeadas com diagramas

- [x] Brainstorming de 22 funcionalidades catalogadas por módulo

- [x] Revisão Técnica, de Negócio e de UX

- [x] Sequenciador com 4 ondas de entrega

- [x] Canvas MVP definido com métricas de validação e DoD

### :material-format-list-checks: Requisitos Funcionais


- [x] RF01 — Autenticação e Sessão (6 requisitos)
- [x] RF02 — Upload e Gerenciamento de Documentos (7 requisitos)
- [x] RF03 — Orientador e Isolamento (4 requisitos)
- [x] RF04 — Auditoria (5 requisitos)
- [x] Matriz de rastreabilidade (Requisitos  Funcionalidades  Personas)

### :material-shield-check: Requisitos Não Funcionais


- [x] RNF01 — Segurança (6 requisitos)
- [x] RNF02 — Desempenho (4 requisitos)
- [x] RNF03 — Confiabilidade e Disponibilidade (4 requisitos)
- [x] RNF04 — Usabilidade (4 requisitos)
- [x] RNF05 — Manutenibilidade (4 requisitos)
- [x] RNF06 — Conformidade (3 requisitos)

### :material-book-open-variant: Histórias de Usuário


- [x] Épico 1 — Autenticação (US01–US03)
- [x] Épico 2 — Documentos (US04–US06)
- [x] Épico 3 — Orientador (US07–US08)
- [x] Épico 4 — Auditoria (US09)
- [x] Critérios de aceitação para todas as 9 histórias

### :material-layers-triple: Arquitetura


- [x] Diagrama Entidade-Relacionamento completo (5 entidades)
- [x] Estratégia de isolamento de dados por role (researcher, advisor, auditor)
- [x] Documentação de segurança JWT (cookies HttpOnly, fluxo de autorização)
- [x] Diagramas de fluxo de autenticação e autorização

- [x] Especificação de logs de auditoria (7 tipos de ação)
- [x] Cronograma detalhado com roadmap em Gantt (5 sprints)

---

## Resumo Técnico

| Métrica | Valor |
| :--- | :---: |
| Artefatos de Lean Inception | 7 |
| Requisitos Funcionais | 22 |
| Requisitos Não Funcionais | 25 |
| Histórias de Usuário | 9 |
| Funcionalidades catalogadas | 22 |
| Diagramas Mermaid criados | 15+ |
| Páginas de documentação novas | 10 |

---

## Aprendizados e Decisões

!!! note "Decisão: Lean Inception como metodologia"
    Adotamos o Lean Inception para alinhar a equipe sobre o produto antes de iniciar a implementação, garantindo que todos compartilhem a mesma visão e prioridades.

!!! note "Decisão: Requisitos rastreáveis"
    Cada requisito funcional é vinculado a uma funcionalidade do Lean Inception e a uma persona, permitindo rastreabilidade de ponta a ponta.

!!! note "Decisão: JWT em cookies ao invés de localStorage"
    Por segurança, os tokens são transmitidos exclusivamente via cookies `HttpOnly` + `Secure` + `SameSite=Strict`, protegendo contra XSS e CSRF.

---

## Próximos Passos

→ [Semana 3](semana3.md): início da implementação do MVP.

← [Semana 1 — Setup e Fundação](semana1.md)


---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 29/05/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |


