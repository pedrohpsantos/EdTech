---
title: 'ADR-0013: Backup Automático via Cloud SQL Export + Cloud Scheduler'
---

# ADR-0013: Estratégia de Backup Automático do Banco de Dados

|   Campo   | Valor                              |
| :-------: | :--------------------------------- |
|  **Data** | 05/07/2026                         |
| **Status** | ✅ Aceito                          |
| **Autor** | Pedro Henrique P. Santos           |

---

## Contexto

O EdTech persiste dados críticos de pesquisadores, projetos e documentos acadêmicos em um banco de dados PostgreSQL hospedado no **Cloud SQL** (GCP). A ausência de uma política formal de backup expõe o sistema a riscos de perda de dados por falha operacional, erro humano ou incidente de infraestrutura.

Precisamos de uma solução de backup **automática, auditável e de baixa manutenção**.

---

## Decisão

Adotamos a estratégia de **Cloud SQL Export + Cloud Scheduler**, inteiramente nativa do GCP:

1. Um **Cloud Scheduler** job dispara diariamente às **02:00 BRT** (horário de menor uso).
2. O Scheduler chama a **Cloud SQL Admin API** para exportar o banco no formato `.sql.gz`.
3. O dump é salvo em um **bucket GCS dedicado** (`edtech-backups-<PROJECT_ID>`), separado do bucket de arquivos de usuário.
4. Uma **lifecycle policy** no bucket deleta automaticamente backups com mais de **30 dias**.

Todo o provisionamento é realizado pelo script `infra/setup_backup.sh`, que pode ser executado uma única vez pelo time de infraestrutura.

---

## Alternativas Consideradas

### Opção B: GitHub Actions com `pg_dump`

Um workflow `.yml` com `schedule: cron` rodaria `pg_dump` e enviaria o resultado ao GCS.

**Descartada porque:**
- Exige que o Cloud SQL fique acessível externamente (IP público), aumentando a superfície de ataque.
- O banco em produção está atrás do Cloud SQL Auth Proxy, o que tornaria essa abordagem complexa de configurar com segurança.
- O estado do agendamento fica fora do GCP, tornando o monitoramento fragmentado.

### Opção C: Réplica de Leitura + Snapshot

Criar uma réplica de leitura do Cloud SQL e exportar os snapshots periodicamente.

**Descartada porque:**
- Gera custo adicional de instância para um projeto acadêmico.
- Complexidade de manutenção desproporcional à escala atual.

---

## Consequências

**Positivas:**

- ✅ **Zero code no backend:** Nenhuma mudança no código da aplicação.
- ✅ **Gerenciado pelo GCP:** Monitoramento integrado ao Cloud Console e Cloud Logging.
- ✅ **Retenção automática:** Backups antigos são deletados sem intervenção humana.
- ✅ **Auditável:** Cada export gera um log no Cloud Logging com status de sucesso/falha.
- ✅ **Verificável pelo Orientador:** Script `uv run scripts/backup_status.py` lista os backups e alerta se o mais recente for muito antigo.

**Negativas / Riscos:**

- ⚠️ **Configuração IAM manual:** Requer execução do `setup_backup.sh` por alguém com permissão de `roles/owner` ou `roles/iam.securityAdmin` no projeto.
- ⚠️ **Custo de storage:** Mínimo para dumps SQL, mas existente. Estimativa: < R$ 5,00/mês para o volume atual.

---

## Política de Backup

| Atributo | Valor |
| :--- | :--- |
| Frequência | Diária |
| Horário | 02:00 BRT (05:00 UTC) |
| Destino | `gs://edtech-backups-<PROJECT_ID>/` |
| Formato | `.sql.gz` (dump SQL comprimido) |
| Retenção | 30 dias |
| Alertas | `uv run scripts/backup_status.py` (verifica se backup < 25h) |
