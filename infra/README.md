
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
| `dev/database/schema.sql` | Schema SQL de referência do banco de dados |
| `prod/docker-compose.prod.yml`| Configuração docker para teste ou deploy do ambiente produtivo |
| `prod/cloudbuild.yaml` | Pipeline de build e deploy para o Google Cloud Build |
| `prod/setup_backup.sh` | Script de provisionamento do backup automático diário no GCS via Cloud Scheduler |
| `prod/terraform/` | Módulos Terraform parametrizados para Cloud Run, Cloud SQL e Cloud Storage |

---

## 🔒 Segurança e Arquitetura de Produção (GCP)

Em produção, as imagens Docker são publicadas no **Artifact Registry** e operadas via **Cloud Run** (Serverless, auto-scaling). Nossa infraestrutura segue os princípios de *Zero Trust*, com foco no isolamento de rede e automação segura:

* **Isolamento de Rede (Cloud Run & Cloud SQL):** O backend Cloud Run está configurado com tráfego interno (`INGRESS_TRAFFIC_INTERNAL_ONLY`) e o banco de dados Cloud SQL possui apenas IP Privado. Nenhuma dessas camadas está exposta diretamente à internet pública.
* **Secret Manager:** Variáveis sensíveis (credenciais de banco, chaves JWT) são injetadas diretamente nos serviços do Cloud Run no momento da execução, sem exposição em arquivos de configuração.
* **CI/CD com OIDC:** O processo de deploy automatizado pelo `cloudbuild.yaml` (disparado via push na branch `main`) é autenticado de forma segura utilizando **Workload Identity Federation (OIDC)**, eliminando a necessidade e os riscos de chaves de serviço JSON estáticas.

### Acesso ao Banco de Dados (Cloud SQL)

Como o IP público da instância foi desativado por questões de segurança, para conectar-se ao banco de dados em nuvem utilizando sua máquina local (para DBeaver, pgAdmin, etc.), é obrigatório o uso do **Cloud SQL Auth Proxy**:

```bash
# 1. Autentique-se no GCP localmente
gcloud auth application-default login

# 2. Inicie o túnel seguro apontando para a sua instância
./cloud-sql-proxy <PROJECT_ID>:<REGION>:<INSTANCE_NAME>

# 3. Conecte a sua ferramenta de banco de dados em localhost (ex: 127.0.0.1:5432)

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
| --- | --- |
| `modules/cloud_run` | Serviço backend escalável, integração com VPC Connector, storage e **Cloud Run Job** isolado para execução de migrações (Flyway). |
| `modules/cloud_sql` | Instância PostgreSQL gerenciada e restrita. |
| `modules/cloud_storage` | Bucket de arquivos acadêmicos. |

O estado remoto deve ficar em um bucket GCS controlado pela equipe de plataforma. O arquivo `terraform.tfvars` real e a pasta `.terraform/` permanecem fora do Git.

---

## Backup do Banco de Dados

O backup automático é provisionado pelo script `setup_backup.sh`. Executar uma única vez com um usuário que tenha permissão `roles/owner` ou `roles/iam.securityAdmin`:

```bash
bash infra/prod/setup_backup.sh

```

Detalhes da política de backup estão documentados no [ADR-0013](https://www.google.com/search?q=../docs/arquitetura/decisoes_adrs/0013-backup-automatico.md).
