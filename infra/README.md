# ☁️ EdTech Infraestrutura

![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GCP-Cloud_Run-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

Este diretório (`/infra`) contém a configuração de infraestrutura do EdTech como código (IaC): orquestração de containers para desenvolvimento local e definições de deploy para o ambiente de produção no GCP.

## Conteúdo do Diretório

| Arquivo / Pasta | Descrição |
| :--- | :--- |
| `docker-compose.yml` | Orquestra os serviços de Backend, Frontend e PostgreSQL para o ambiente local |
| `.env.example` | Template das variáveis de ambiente necessárias (nunca commitar o `.env` real) |
| `cloudbuild.yaml` | Pipeline de build e deploy para o Google Cloud Build |
| `setup_backup.sh` | Script de provisionamento do backup automático diário no GCS via Cloud Scheduler |
| `database/schema.sql` | Schema SQL de referência do banco de dados |

---

## Ambiente Local (Docker Compose)

```bash
# 1. Copie e configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com as credenciais locais

# 2. Suba todos os serviços em background
docker compose up --build -d

# 3. Acompanhe os logs do backend
docker compose logs -f backend
# Aguarde a mensagem "Started EdTechApplication" para confirmar que o serviço está pronto

# 4. Para encerrar os serviços
docker compose down

# Para remover também os volumes de dados (banco de dados local)
docker compose down -v
```

---

## Produção (GCP)

Em produção, as imagens Docker são publicadas no **Artifact Registry** do GCP e operadas via **Cloud Run** (Serverless, auto-scaling). O banco de dados é gerenciado pelo **Cloud SQL** (PostgreSQL 15).

Variáveis de ambiente sensíveis (credenciais de banco, chaves JWT) são armazenadas no **Secret Manager** e injetadas diretamente nos serviços do Cloud Run, sem exposição em arquivos de configuração.

O processo de deploy é automatizado pelo `cloudbuild.yaml` e disparado via push na branch `main`.

---

## Backup do Banco de Dados

O backup automático é provisionado pelo script `setup_backup.sh`. Executar uma única vez com um usuário que tenha permissão `roles/owner` ou `roles/iam.securityAdmin`:

```bash
bash infra/setup_backup.sh
```

Detalhes da política de backup estão documentados no [ADR-0013](../docs/arquitetura/decisoes_adrs/0013-backup-automatico.md).
