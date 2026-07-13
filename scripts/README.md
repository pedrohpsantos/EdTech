# Scripts operacionais

Scripts de suporte administrativo e de desenvolvimento. Eles não participam do fluxo da aplicação em tempo de execução.

## `backup_status.py`

Consulta o bucket `edtech-backups-<projeto>` e falha quando o backup mais recente tem mais de 25 horas. É um comando somente leitura.

Pré-requisitos: Python 3.11+, [uv](https://docs.astral.sh/uv/), credenciais ADC/gcloud com acesso de leitura ao bucket e projeto configurado.

```bash
$env:GCP_PROJECT_ID = "edtech-storage-501117" # PowerShell
uv run scripts/backup_status.py
```

Em shells POSIX:

```bash
GCP_PROJECT_ID=edtech-storage-501117 uv run scripts/backup_status.py
```

## `populate_demo.py`

Insere as três contas demo no PostgreSQL local, caso ainda não existam: Pesquisador, Orientador e Auditor. O script conecta diretamente ao banco e usa valores locais fixos; não execute contra staging ou produção.

```bash
python scripts/populate_demo.py
```

Antes, ajuste os parâmetros de conexão do próprio script para o banco local em uso. Para uma carga mais completa, prefira o seeder da aplicação quando disponível.

## Diretrizes

- Não grave segredos, tokens ou dados pessoais em saídas/arquivos de relatório.
- Scripts operacionais de produção devem ser idempotentes, documentados e executados com a menor permissão possível.
- Não adicione acessos de escrita a dados publicados sem aprovação explícita e trilha de auditoria.
