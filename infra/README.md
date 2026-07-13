# Infraestrutura EdTech

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?logo=terraform&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?logo=googlecloud&logoColor=white)

Este diretório reúne o ambiente local Docker Compose e a infraestrutura GCP declarada em Terraform.

## Organização

| Caminho | Responsabilidade |
| --- | --- |
| `dev/docker-compose.yml` | Frontend, backend, PostgreSQL, Fake GCS e Adminer para desenvolvimento local |
| `dev/.env.example` | Variáveis obrigatórias do Compose local |
| `terraform/` | Cloud Run, Cloud Run Job do Flyway, Cloud SQL, GCS e secrets referenciados pelo deploy |
| `prod/cloudbuild.yaml` | Configuração legada do Cloud Build; não é o fluxo primário de deploy |
| `prod/setup_backup.sh` | Provisionamento do backup agendado |

## Ambiente local

```bash
cp infra/dev/.env.example infra/dev/.env
# Defina ao menos POSTGRES_PASSWORD e JWT_SECRET.

docker compose --env-file infra/dev/.env -f infra/dev/docker-compose.yml up --build -d
docker compose --env-file infra/dev/.env -f infra/dev/docker-compose.yml ps
```

Serviços locais:

| Serviço | Endereço |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:8080/actuator/health` |
| Adminer | `http://localhost:8081` |
| Fake GCS | `http://localhost:4443` |

Para encerrar, execute `docker compose --env-file infra/dev/.env -f infra/dev/docker-compose.yml down`. Acrescente `-v` somente se quiser apagar o volume local do PostgreSQL.

## Terraform e ambientes publicados

O deploy atual é acionado por GitHub Actions, não por Cloud Build:

- `develop` atualiza **staging**;
- `main` atualiza **produção**;
- a pipeline inicializa o backend GCS, atualiza o Cloud Run Job de migração, executa Flyway e só então atualiza o serviço Cloud Run;
- frontend é publicado no Firebase Hosting em paralelo ao deploy do backend.

O state Terraform é remoto. Nunca execute `apply` contra produção sem uma mudança revisada e uma autenticação GCP autorizada.

```bash
cd infra/terraform
terraform init -backend-config="bucket=<bucket-de-state>" -backend-config="prefix=<prefix-do-ambiente>"
terraform fmt -check
terraform validate
terraform plan \
  -var="project_id=<projeto>" \
  -var="backend_image_tag=<tag>" \
  -var="storage_bucket_name=<bucket>"
```

Os valores sensíveis ficam no Secret Manager e não devem ser colocados em `terraform.tfvars`, commits ou logs.

## Backup

`prod/setup_backup.sh` provisiona o backup agendado. Para verificar a idade dos backups já existentes, use `uv run scripts/backup_status.py` com ADC/gcloud autenticado e `GCP_PROJECT_ID` configurado.
