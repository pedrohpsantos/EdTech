# :material-calendar-refresh: Sprint 5 — Uploads, API e Integração

Registro histórico do planejamento, desenvolvimento e retrospectiva da **Sprint 5**.

---

## 🎯 Objetivo da Sprint

Consolidar a Integração Contínua, finalizar a base de Autenticação com CORS, e entregar a feature crítica de Upload de Arquivos para o Google Cloud Storage.

**Período:** 12/06/2026 a 19/06/2026

---

## 📋 Backlog e Execução

As atividades desta sprint envolveram desde correção do Flyway até uploads. 

| Issue | Descrição | Impacto | Status |
| :---: | :--- | :--- | :---: |
| #13 | Entidade Document e CRUD Backend (GCS Upload) | Alto — Feature Core de arquivos | Fechado |
| #14 | Tela de Upload Frontend | Alto — Interface GCS | Fechado |
| #16 | CORS e Integração de Segurança | Crítico — Bloqueava chamadas do React | Fechado |
| #17 | Camada de Serviço HTTP (Frontend) | Alto — Base de requisições Axio/Fetch | Fechado |
| #18 | Modo Claro/Escuro (Frontend) | Baixo — UI/UX e Acessibilidade | Fechado |
| #72 | Implementação Definitiva do Flyway (DDL-Auto) | Crítico — Mantém dados seguros | Fechado |
| #73 | Contratos de API (Requests/Responses) | Alto — Interface Backend x Frontend | Fechado |

---

## 📊 Análise das Frentes e Branches

- **Backend / Infra (develop, main):** Foram integradas as configurações completas do Flyway e GCP, juntamente com o Spring Security.
- **Frontend (eat/upload-ui, eat/dark-mode):** Interfaces finalizadas com upload de documentos (PDFs) rodando corretamente com os cookies restritos SameSite=Lax.
- **Docs & Logs (docs/api_contracts):** Contratos padronizados em *Docs-as-code*.

---

## 🏆 Feedback e Reconhecimento

Nesta sprint, tivemos um **feedback oficial excepcional da professora Marina**, ressaltando nossa capacidade de entregar rapidamente e com qualidade:

1. Resolução efetiva dos métodos do backend e alertas de build (JaCoCo, .mvn/wrapper).
2. Segurança madura com token X-XSRF-TOKEN e flags de cookie devidamente ajustadas para evitar problemas de SameSite.
3. Feature realística entregue de ponta a ponta: Upload de arquivos integrando autor e projeto!

**Resultado:** O EdTech está oficialmente liderando as entregas em relação a outras equipes do laboratório, graças à forte disciplina e comunicação entre os squads.

---

## ⏭️ Próximos Passos

→ **Sprint 6:** Fechar o MVP. Focar na Associação de Membros aos Projetos, Auditoria de Segurança, Logs em JSON para ELK e Testes E2E automáticos.
