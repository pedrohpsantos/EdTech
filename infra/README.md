# ☁️ EdTech Infraestrutura

![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GCP-Cloud_Run-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)

Este diretório (`/infra`) contém a configuração de infraestrutura do EdTech como código (IaC): orquestração de containers para desenvolvimento local e definições de deploy para o ambiente de produção no GCP.

## Conteúdo do Diretório

| Arquivo / Pasta | Descrição |
| :--- | :--- |
| `dev/docker-compose.yml` | Orquestra os serviços de Backend, Frontend e PostgreSQL para o ambiente local |
| `dev/.env.example` | Template das variáveis de ambiente necessárias (nunca commitar o `.env` real) |
| `database/schema.sql` | Schema SQL de referência do banco de dados |
| `prod/docker-compose.prod.yml`| Configuração docker para teste ou deploy do ambiente produtivo |
| `prod/cloudbuild.yaml` | Configuração legada do Cloud Build; o deploy atual é feito por GitHub Actions |
| `terraform/setup_backup.sh` | Script de provisionamento do backup automático diário no GCS via Cloud Scheduler |
| `terraform/` | Módulos Terraform parametrizados para Cloud Run, Cloud SQL e Cloud Storage |

---

## 🔒 Segurança e Arquitetura de Produção (GCP)

Em produção, nossa infraestrutura segue os princípios de *Zero Trust* e menor privilégio:

* **Isolamento de Rede:** O banco **Cloud SQL** (PostgreSQL 18) não possui IP público e é acessível pelo Cloud Run através de VPC e Private IP. A API mantém ingress HTTPS público para atender o frontend hospedado externamente.
* **Secret Management:** Credenciais sensíveis (banco de dados, chaves JWT, SMTP) são gerenciadas pelo **Secret Manager** e injetadas em tempo de execução. Não existem arquivos de configuração com segredos versionados.
* **CI/CD com OIDC:** Os workflows em `.github/workflows/ci.yml` usam **Workload Identity Federation (OIDC)**; o deploy não depende de chaves de serviço JSON estáticas.

### Acesso ao Banco de Dados (Cloud SQL)

Como o IP público da instância está desativado, para conectar-se ao banco de dados em nuvem utilizando ferramentas locais (DBeaver, pgAdmin, etc.), é **obrigatório** o uso do **Cloud SQL Auth Proxy**:

```bash
# 1. Autentique-se no GCP localmente
gcloud auth application-default login

# 2. Inicie o túnel seguro apontando para a sua instância
./cloud-sql-proxy <PROJECT_ID>:<REGION>:<INSTANCE_NAME>

# 3. Conecte sua ferramenta de banco de dados em localhost (ex: 127.0.0.1:5432)

```

---

## Ambiente Local (Docker Compose)

```bash
# 1. Copie e configure as variáveis de ambiente
cd dev
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

## Infraestrutura como Código (Terraform)

A pasta `infra/terraform` contém a definição parametrizada da infraestrutura de produção. Utilize `terraform.tfvars` local a partir do template:

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
| --- | --- |
| `modules/cloud_run` | Serviço backend escalável, integração com VPC Connector e Cloud Run Job para migrações (Flyway). |
| `modules/cloud_sql` | Instância PostgreSQL gerenciada e restrita. |
| `modules/cloud_storage` | Bucket de arquivos acadêmicos. |

O estado remoto deve ficar em um bucket GCS controlado pela equipe de plataforma. O arquivo `terraform.tfvars` real e a pasta `.terraform/` permanecem fora do Git.

---

## Backup do Banco de Dados

O backup automático é provisionado pelo script `setup_backup.sh`. Executar uma única vez com um usuário que tenha permissão `roles/owner` ou `roles/iam.securityAdmin`:

```bash
bash infra/terraform/setup_backup.sh

```

Detalhes da política de backup estão documentados no [ADR-0013](../docs/arquitetura/decisoes_adrs/0013-backup-automatico.md).
