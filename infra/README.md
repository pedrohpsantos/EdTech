
# ☁️ EdTech Infraestrutura

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

```
---

## Ambiente Local (Docker Compose)

```bash
cp infra/dev/.env.example infra/dev/.env
# Defina ao menos POSTGRES_PASSWORD e JWT_SECRET.

# 4. Para encerrar os serviços
docker compose down

# Para remover também os volumes de dados (banco de dados local)
docker compose down -v

```

O deploy atual é acionado por GitHub Actions, não por Cloud Build:

- `develop` atualiza **staging**;
- `main` atualiza **produção**;
- a pipeline inicializa o backend GCS, atualiza o Cloud Run Job de migração, executa Flyway e só então atualiza o serviço Cloud Run;
- frontend é publicado no Firebase Hosting em paralelo ao deploy do backend.

O state Terraform é remoto. Nunca execute `apply` contra produção sem uma mudança revisada e uma autenticação GCP autorizada.

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
