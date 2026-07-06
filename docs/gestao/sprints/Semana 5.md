---
title: 'Semana 5 — Uploads, Autenticação e Integrações GCS'
---

# :material-rocket-launch: Semana 5 — Uploads, Autenticação e Integrações GCS

<span class="status-badge"> Concluída</span>

**Período:** 13/06/2026 – 19/06/2026

---

## Objetivo da Sprint

Consolidar a Integração Contínua, finalizar a base de Autenticação com CORS, e entregar a feature crítica de Upload de Arquivos para o Google Cloud Storage e integração da segurança SameSite e XSRF-TOKEN.

---

## Entregas Realizadas

### :material-server-network: Backend — Infra e Uploads

- [x] Restauração dos arquivos do Maven Wrapper (`.mvn/wrapper`) e remoção do alerta duplicado do JaCoCo no `pom.xml`
- [x] Implementação definitiva do Flyway (Correção do DDL-Auto)
- [x] Implementação completa do upload funcional de arquivos com associação automática ao usuário (author_id)
- [x] Padronização da flag `SameSite=Lax` no backend/testes e mapeamento correto de dados no login
- [x] Correção de métodos faltantes (`logAction` e `findByEmail`)

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `f45a1c0` | 16/06 | Equipe | `feat: adiciona servico de upload para GCS` |
| `312b9c2` | 17/06 | Equipe | `fix: resolve bug do SameSite e xsrf token` |

**Branches:** `feat/upload-backend`, `fix/security-flags`  
**Issues:** [#13](https://github.com/pedrohpsantos/EdTech/issues/13), [#72](https://github.com/pedrohpsantos/EdTech/issues/72)

---

### :material-monitor-cellphone: Frontend — UI de Documentos e Segurança

- [x] Criação da página `Documentos.jsx` no frontend
- [x] Suporte à visualização dos arquivos em lista ou grid
- [x] Buscas filtradas por título e por projeto na API
- [x] Ajuste no frontend para enviar corretamente o token `X-XSRF-TOKEN`

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `c891f21` | 18/06 | Equipe | `feat: cria pagina de documentos e filtros` |

**Branches:** `feat/upload-ui`  
**Issues:** [#14](https://github.com/pedrohpsantos/EdTech/issues/14)

---

### :material-file-document-edit: Contratos de API (Docs)

- [x] Definição clara dos *Requests* e *Responses* das rotas em Docs-as-Code
- [x] Alinhamento do DTO entre Frontend e Backend

**Commits relacionados:**

| Hash | Data | Autor | Descrição |
| :--- | :---: | :--- | :--- |
| `88df106` | 19/06 | Pedro Henrique | `docs: cria contratos de API` |

**Branch:** `docs/api-contracts`  
**Issue:** [#73](https://github.com/pedrohpsantos/EdTech/issues/73)

---

## Resumo Técnico

| Métrica | Valor |
| :--- | :---: |
| Commits no período | ~15 |
| Issues entregues / concluídas | 7 (Issues #13, #14, #16, #17, #18, #72, #73) |
| Reuniões e Atas documentadas | 1 (Ata 19/06/2026) |
| Páginas de documentação atualizadas | 5 |

---

## Contribuições da Equipe

### Tech Lead (Pedro Henrique)
- **Foco:** Padronização arquitetural da documentação e Code Review.
- **Entregas:** Issues #16, #17, #18, #73.
- **Commits:** `88df106` (Contratos de API).

### Backend (Alana Cristyna)
- **Foco:** Endpoint de login/cadastro, JWT e Upload GCS.
- **Entregas:** Issues #13, #72.
- **Commits:** `f45a1c0`, `312b9c2`.

### Frontend (Mariana Andrade)
- **Foco:** Fluxo de autenticação na UI, rotas protegidas, interceptors.
- **Entregas:** Issue #14.
- **Commits:** `c891f21`.

### DevOps (Luis Gustavo)
- **Foco:** Configuração do Supabase e revisão da esteira CI.
- **Entregas:** Auxílio em infraestrutura.
- **Commits:** `(Revisões de PR)`.

### QA (Mateus Alves)
- **Foco:** Testes de integração do fluxo de autenticação e perfis.
- **Entregas:** Homologação E2E.
- **Commits:** `(Testes manuais exploratórios)`.

### Docs & Logs (Arthur)
- **Foco:** Retorno e início do foco em documentação técnica e observabilidade.
- **Entregas:** Estudos iniciais S3/GCS.
- **Commits:** `(Pesquisa técnica)`.

---

## Aprendizados e Decisões

!!! success "Reconhecimento da Tutora Marina"
    Nosso grupo foi usado como referência no feedback de outros grupos mostrando como estamos bem e fazendo um ótimo trabalho. Os pontos fortes elogiados foram as correções de build, as implementações rigorosas de segurança (CORS, SameSite, XSRF) e o upload completo.

!!! note "Decisão: Pausa na Rotação"
    Não rotacionamos as posições esta semana. Arthur manterá seu foco em Docs & Logs (sem pegar tarefas de código de outros, como backend) para consolidar sua frente e os demais evoluírem nas suas entregas.

---

## Débitos Técnicos para a Próxima Sprint

| Issue | Descrição | Impacto |
| :---: | :--- | :--- |
| #93 | Associação de Membros a Projetos (Frontend) | Alto — Interface do painel de projetos |
| #94 | Fluxo de Vinculação Membro-Projeto (Backend) | Alto — Relacionamento no banco de dados |
| #91 | Centralização e Formatação de Logs de Aplicação | Médio — Preparação para observabilidade |
| #95 | Automação E2E do Fluxo Crítico | Alto — Garantia de Qualidade de Produção |
| #96 | Auditoria de Segurança e Deploy MVP (Tech Lead) | Crítico — Entrega em ambiente real |

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| `1.0` | 19/06/2026 | Criação do documento de fechamento da Sprint 5 | Pedro Henrique P. Santos |
| `1.1` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |