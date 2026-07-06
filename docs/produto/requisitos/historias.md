---
title: 'Histórias de Usuário'
---

# :material-book-open-variant: Histórias de Usuário

Backlog de histórias de usuário do EdTech, escritas no formato padrão e rastreáveis aos requisitos funcionais e personas.

---

## Formato

!!! info "Padrão de escrita"
    **Como** [persona], **quero** [ação], **para que** [benefício].

    Cada história inclui critérios de aceitação verificáveis.

---

## Épico 1 — Autenticação

### US01 — Cadastro de pesquisador

> **Como** pesquisadora, **quero** me cadastrar com meu e-mail institucional, **para que** eu tenha acesso ao sistema de forma segura.

??? note "Critérios de Aceitação"
    - [x] O formulário exige nome, e-mail e senha

    - [x] A senha é armazenada com hash BCrypt

    - [x] E-mails duplicados são rejeitados com mensagem clara

    - [x] Apenas e-mails `@instituicao.edu.br` são aceitos

**Rastreabilidade:** RF01, RF06 · **Persona:** Ana · **Sprint:** 2

---

### US02 — Login seguro

> **Como** usuário cadastrado, **quero** fazer login com e-mail e senha, **para que** eu receba um token de sessão seguro.

??? note "Critérios de Aceitação"
    - [x] O login retorna um JWT em cookie `HttpOnly` + `Secure`
    - [x] Credenciais inválidas retornam mensagem genérica

    - [x] Login bem-sucedido gera log `LOGIN_SUCCESS`
    - [x] Login falho gera log `LOGIN_FAILED`

**Rastreabilidade:** RF02, RF18 · **Persona:** Todos · **Sprint:** 2

---

### US03 — Logout

> **Como** usuário autenticado, **quero** fazer logout, **para que** minha sessão seja encerrada e o cookie invalidado.

??? note "Critérios de Aceitação"
    - [x] O cookie é removido ou expirado

    - [x] Requisições subsequentes retornam `401`
    - [x] O logout gera log `LOGOUT`

**Rastreabilidade:** RF03, RF18 · **Persona:** Todos · **Sprint:** 2

---

## Épico 2 — Documentos

### US04 — Upload de artigo

> **Como** pesquisadora, **quero** fazer upload de um artigo em PDF, **para que** ele fique armazenado de forma segura no repositório.

??? note "Critérios de Aceitação"
    - [x] Aceita arquivos PDF de até 50 MB

    - [x] O arquivo é salvo no Google Cloud Storage

    - [x] Os metadados são salvos no PostgreSQL com `author_id`
    - [x] O status inicial é `draft`
    - [x] O upload gera log `UPLOAD_SUCCESS`

**Rastreabilidade:** RF07, RF08, RF09, RF19 · **Persona:** Ana · **Sprint:** 3

---

### US05 — Listagem de documentos

> **Como** pesquisadora, **quero** ver uma lista dos meus documentos, **para que** eu possa gerenciar meus rascunhos e submissões.

??? note "Critérios de Aceitação"
    - [x] A lista é filtrada por `author_id = user.id`
    - [x] Exibe título, tipo, status e data de upload

    - [x] Pesquisador não vê documentos de outros autores

    - [x] Resposta da API em < 500ms (p95)

**Rastreabilidade:** RF10, RNF02.1 · **Persona:** Ana · **Sprint:** 3

---

### US06 — Download de documento

> **Como** pesquisadora, **quero** baixar meus documentos, **para que** eu possa acessá-los offline.

??? note "Critérios de Aceitação"
    - [x] Apenas o autor ou orientador vinculado pode baixar

    - [x] O download gera log de auditoria

    - [x] O arquivo é servido diretamente do GCS

**Rastreabilidade:** RF11, RF19 · **Persona:** Ana · **Sprint:** 3

---

## Épico 3 — Orientador

### US07 — Painel do orientador

> **Como** orientador, **quero** visualizar todos os projetos que supervisiono, **para que** eu acompanhe o progresso dos meus orientandos.

??? note "Critérios de Aceitação"
    - [x] Lista projetos onde `project_members.user_id = orientador.id`
    - [x] Exibe contagem de documentos por projeto

    - [x] Não exibe projetos de outros orientadores

**Rastreabilidade:** RF14, RF16 · **Persona:** Carlos · **Sprint:** 4

---

### US08 — Visualização de documentos do orientando

> **Como** orientador, **quero** ver os documentos dos pesquisadores vinculados, **para que** eu possa revisá-los e dar feedback.

??? note "Critérios de Aceitação"
    - [x] Exibe documentos de todos os membros do projeto

    - [x] Permite visualização inline ou download

    - [x] Filtra por `project_members` para garantir isolamento

**Rastreabilidade:** RF15, RF16 · **Persona:** Carlos · **Sprint:** 4

---

## Épico 4 — Auditoria

### US09 — Consulta de logs

> **Como** auditora, **quero** consultar os logs de auditoria com filtros, **para que** eu possa investigar ações específicas no sistema.

??? note "Critérios de Aceitação"
    - [x] Filtros por ação, data, usuário e recurso

    - [x] Exibe IP, user-agent e timestamp

    - [x] Logs são imutáveis (sem UPDATE/DELETE)

**Rastreabilidade:** RF21, RNF03.2 · **Persona:** Márcia · **Sprint:** 5

---

## Resumo do Backlog

| Épico | Histórias | Concluídas | Em andamento | Pendentes |
| :--- | :---: | :---: | :---: | :---: |
| Autenticação | 3 | 3 | 0 | 0 |
| Documentos | 3 | 3 | 0 | 0 |
| Orientador | 2 | 2 | 0 | 0 |
| Auditoria | 1 | 1 | 0 | 0 |
| **Total** | **9** | **9** | **0** | **0** |


---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 29/05/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `2.0.0` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |

