# ☁️ EdTech Infraestrutura

![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GCP-Cloud_Run-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

Este diretório (`/infra`) contém a configuração de infraestrutura do EdTech como código (IaC): orquestração de containers para desenvolvimento local e definições de deploy para o ambiente de produção no GCP.

## Conteúdo do Diretório

| Arquivo / Pasta | Descrição |
| :--- | :--- |
| `docker-compose.yml` | Orquestra os serviços de Backend, Frontend e PostgreSQL para o ambiente local |
| `.env.example` | Template das variáveis de ambiente necessárias (nunca commitar o `.env` real) |
| `cloudbuild.yaml` | Pipeline de build e deploy para o Google Cloud Build |
| `setup_backup.sh` | Script de provisionamento do backup automático diário no GCS via Cloud Scheduler |
| `database/schema.sql` | Schema SQL de referência do banco de dados |
| `terraform/` | Módulos Terraform parametrizados para Cloud Run, Cloud SQL e Cloud Storage |

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
Em produção, as imagens Docker são publicadas no **Artifact Registry** do GCP e operadas via **Cloud Run** (Serverless, auto-scaling). O banco de dados é gerenciado pelo **Cloud SQL** (PostgreSQL 16).

Variáveis de ambiente sensíveis (credenciais de banco, chaves JWT) são armazenadas no **Secret Manager** e injetadas diretamente nos serviços do Cloud Run, sem exposição em arquivos de configuração.

O processo de deploy é automatizado pelo `cloudbuild.yaml` e disparado via push na branch `main`.

---

## Infraestrutura como Código (Terraform)

A pasta `infra/terraform` contém a definição parametrizada da infraestrutura de produção. Nenhum identificador sensível ou específico de projeto deve ser versionado; use `terraform.tfvars` local a partir do template:

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
# Edite project_id, region, artifact_registry, bucket e demais variáveis

terraform init -backend-config="bucket=<bucket-tfstate>"
terraform plan
terraform apply
```

Módulos disponíveis:

| Módulo | Recursos |
| :--- | :--- |
| `modules/cloud_run` | Serviço backend escalável, variáveis, integração com storage e **Cloud Run Job** isolado para execução de migrações (Flyway). |
| `modules/cloud_sql` | Instância PostgreSQL gerenciada |
| `modules/cloud_storage` | Bucket de arquivos acadêmicos |

O estado remoto deve ficar em um bucket GCS controlado pela equipe de plataforma. O arquivo `terraform.tfvars` real e a pasta `.terraform/` permanecem fora do Git.

---

## Backup do Banco de Dados

O backup automático é provisionado pelo script `setup_backup.sh`. Executar uma única vez com um usuário que tenha permissão `roles/owner` ou `roles/iam.securityAdmin`:

```bash
bash infra/setup_backup.sh
```

Detalhes da política de backup estão documentados no [ADR-0013](../docs/arquitetura/decisoes_adrs/0013-backup-automatico.md).
