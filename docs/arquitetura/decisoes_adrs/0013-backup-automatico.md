---
title: 'ADR 0013: Backup Automático via Cloud SQL Export e Cloud Scheduler'
---

# :material-text-box-check: ADR 0013: Backup Automático via Cloud SQL Export e Cloud Scheduler

## Status

Aceito

## Contexto

O banco de dados PostgreSQL do EdTech persiste dados críticos de pesquisadores, projetos e documentos acadêmicos hospedado no Cloud SQL (GCP). A ausência de uma política formal de backup expõe o sistema a riscos de perda de dados por falha operacional, erro humano ou incidente de infraestrutura. Faz-se necessária uma solução de backup automática, auditável e de baixa manutenção que esteja alinhada com a infraestrutura GCP já adotada pelo projeto (ADR 0003).

## Decisão

Adotamos a estratégia de **Cloud SQL Export + Cloud Scheduler**, inteiramente nativa do GCP:

- Um job no **Cloud Scheduler** dispara diariamente às 02:00 BRT (05:00 UTC).
- O Scheduler invoca a **Cloud SQL Admin API**, que realiza a exportação do banco no formato `.sql.gz`.
- O dump comprimido é salvo em um **bucket GCS dedicado** (`edtech-backups-<PROJECT_ID>`), separado do bucket de arquivos de usuário.
- Uma **lifecycle policy** no bucket deleta automaticamente backups com mais de 30 dias.

Todo o provisionamento é realizado pelo script `infra/terraform/setup_backup.sh`, executado uma única vez por um usuário com as permissões IAM adequadas.

## Consequências

### Positivas

- **Sem código no backend:** Nenhuma alteração na aplicação é necessária; a solução é inteiramente de infraestrutura.
- **Gerenciado pelo GCP:** Monitoramento integrado ao Cloud Console e Cloud Logging, com registro de status de cada execução.
- **Retenção automática:** O lifecycle policy do GCS elimina backups antigos sem intervenção manual.
- **Verificável:** O script `uv run scripts/backup_status.py` permite que o Orientador consulte os backups mais recentes e receba alerta caso o backup mais recente tenha mais de 25 horas.

### Negativas / Riscos

- **Configuração IAM manual:** A execução do `setup_backup.sh` requer um usuário com `roles/owner` ou `roles/iam.securityAdmin`, o que não pode ser automatizado sem credenciais elevadas.
- **Custo de armazenamento:** O custo de storage para dumps SQL comprimidos é mínimo na escala atual, mas existente.

## Alternativas Consideradas

### GitHub Actions com `pg_dump`

Um workflow com `schedule: cron` rodaria `pg_dump` e enviaria o resultado ao GCS diretamente pelo CI.

Descartada porque exigiria expor o Cloud SQL com IP público para que o runner do GitHub Actions conseguisse se conectar, aumentando a superfície de ataque. A abordagem também fragmenta o monitoramento do agendamento fora do GCP.

### Replica de Leitura com Snapshot Periódico

Provisionar uma réplica de leitura do Cloud SQL e gerar snapshots com frequência controlada.

Descartada pelo custo adicional de instância e pela complexidade de manutenção desproporcional à escala atual do projeto.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 05/07/2026 | Criação do documento | Pedro Henrique P. Santos |
