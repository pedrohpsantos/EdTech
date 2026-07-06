---
title: 'Semana 7 — Deploy de Produção, Secret Manager e Entrega do MVP'
---

# :material-rocket-launch: Semana 7 — Deploy de Produção, Secret Manager e Entrega do MVP

<span class="status-badge"> Concluída (Enterprise Grade)</span>

**Período:** 27/06/2026 – 03/07/2026

---

## Objetivo da Sprint

O objetivo desta sprint final do MVP era finalizar a integração do Backend e Frontend em nuvem, garantindo uma infraestrutura resiliente, segura e apta para produção. Todo o escopo de Deploy contínuo, validação de qualidade (Smoke Tests) e fechamento do ciclo MVP foi atingido com sucesso.

---

## Entregas Realizadas

Nesta semana, nossa aplicação saiu do localhost e foi definitivamente para o Google Cloud, atingindo a maturidade de "Produção Inicial":

### :material-server-network: DevOps, Infraestrutura e Segurança
- [x] Migração de variáveis de ambiente abertas no GitHub Actions para o **GCP Secret Manager**, garantindo o vazamento zero de senhas e JWTs no repositório.
- [x] Correção de configurações do **Cloud Run** (ajustes de `secrets_update_strategy`, tuning do HikariCP limitando o pool para lidar com autoscale, inserção de CPU Boost e limitação de concorrência).
- [x] Limpeza profunda no `firebase.json` do frontend, eliminando rewrites desnecessários que conflitavam com permissões IAM no Cloud Run, usando URL Absoluta via Vite.
- [x] O frontend em React+Vite foi deployado no **Firebase Hosting** com certificado SSL automático.
- [x] Limpeza completa e definitiva de todas as dependências locais ou fantasmas (S3 e AWS) focando 100% no Google Cloud Storage (GCS) puro.

### :material-file-document-edit: Qualidade e Documentação (Docs-as-Code)
- [x] Execução do **Smoke Test E2E de Produção (Issue #108)**, validando conectividade, CORS, HTTPS e fluxos felizes em Nuvem (Playwright Style).
- [x] Auditoria "Enterprise Grade" executada e validada pelo Tech Lead com a transição do status do projeto de *MVP* para *Enterprise Ready*.
- [x] Status do repositório no `README.md` atualizado para **✅ Concluído (Enterprise Grade)**.

---

## Resumo Técnico

| Métrica | Valor |
| :--- | :---: |
| Issues entregues / concluídas | 3 (Issues #102, #108, #109) |
| Reuniões e Atas documentadas | 1 (Ata 03/07/2026) |
| Veredito Final de Cloud | 🟡 Produção com Riscos Conhecidos |

---
## Contribuições da Equipe (Força-Tarefa Pair Programming)

Nesta semana adotamos uma rotação de papéis cruzada (Frontend -> Backend, Backend -> QA, QA -> DevOps, DevOps -> Frontend). No entanto, apenas **Luis** e **Pedro** tiveram contribuição ativa isolada, os demais atuaram via *Pair Programming* orientados pelo Tech Lead:

### Tech Lead (Pedro Henrique)
- **Foco:** Orquestração de Deploy, Refatoração Cloud Run, Firebase Hosting e Pair Programming.
- **Entregas:** Resolução crítica do Secret Manager, CORS, e Smoke Test Report.

### DevOps -> Frontend (Luis Gustavo)
- **Foco:** Adaptação da nova stack e desenvolvimento do Loader global na interface.
- **Entregas:** Criação do Loader visual (CSS) no interceptor do `axios` para requisições acima de 500ms.

### Frontend -> Backend (Mariana Andrade)
- **Foco:** Estudo de Spring Boot e configuração da API de leitura do banco.
- **Entregas:** *Pair programming* com o Tech Lead nas chaves de conexão.

### Backend -> QA (Alana Cristyna)
- **Foco:** Execução de testes de contrato e testes end-to-end.
- **Entregas:** *Pair programming* com o Tech Lead nos fluxos validados em nuvem.

### QA -> DevOps (Mateus Alves)
- **Foco:** Entendimento dos pipelines e IAM do Google Cloud.
- **Entregas:** *Pair programming* com o Tech Lead nas Actions.

### Docs & Logs (Arthur)
- **Foco:** -
- **Entregas:** Ausente nesta semana.

---

## Aprendizados e Decisões

!!! warning "Decisão Estratégica: Rotação de Papéis Realizada com Pair Programming"
    A rotação prometida aconteceu, mas exigiu grande sobrecarga do Tech Lead conduzindo o Pair Programming para destravar os membros que caíram em tecnologias fora de sua zona de conforto.

!!! tip "Auditoria e Foco na Sprint 8"
    O MVP está rodando liso na nuvem. Os "Riscos Conhecidos" são focados exclusivamente em IaC (Terraform) e Networking (VPC, Private IP, Budget). A Sprint 8 será o foco de **Platform Engineering** para matar esse débito técnico final.

---

## Débitos Técnicos para a Próxima Sprint (Sprint 8)

As tarefas prioritárias para a próxima Sprint foram repriorizadas, juntando-se às tarefas finais de IaC e segurança:

| Item | Descrição | Impacto |
| :---: | :--- | :--- |
| #1 | Infraestrutura como Código via Terraform. | Crítico — Escalabilidade |
| #2 | Trocar JSON Key do GitHub por Workload Identity Federation (OIDC). | Alto — Segurança |
| #3 | Configurar Private IP no Cloud SQL com VPC Direct Egress. | Crítico — Segurança |
| #68 | Finalizar endpoint pendente de Logs de Auditoria para fechar o Painel do Auditor. | Alto — Negócio |

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| `1.0` | 03/07/2026 | Criação do documento de fechamento da Sprint 7 | Pedro Henrique P. Santos |
| `1.1` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |


