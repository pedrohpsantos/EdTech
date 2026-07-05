#!/usr/bin/env bash
# =============================================================================
# EdTech — Script de Provisionamento de Backup Automático
# =============================================================================
# Provisiona no GCP:
#   1. Bucket GCS dedicado a backups (com lifecycle de 30 dias)
#   2. Permissão IAM para a Service Account do Cloud SQL gravar no bucket
#   3. Cloud Scheduler job para exportar o banco diariamente às 02:00 BRT
#
# Uso: bash infra/setup_backup.sh
# Pré-requisitos: gcloud CLI autenticado e com projeto configurado.
# =============================================================================

set -euo pipefail

# ---------------------------------------------------------------------------
# Cores para output
# ---------------------------------------------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC}   $1"; }
warn()    { echo -e "${YELLOW}[WARN]${NC} $1"; }
error()   { echo -e "${RED}[ERRO]${NC} $1"; exit 1; }

# ---------------------------------------------------------------------------
# Configurações (ajuste se necessário)
# ---------------------------------------------------------------------------
PROJECT_ID="$(gcloud config get-value project 2>/dev/null)"
REGION="southamerica-east1"
INSTANCE_NAME="edtech-db-dev"
DATABASE_NAME="edtech_db"
BACKUP_BUCKET="edtech-backups-${PROJECT_ID}"
SCHEDULER_JOB_NAME="edtech-daily-backup"
# Horário: 02:00 BRT = 05:00 UTC
SCHEDULE="0 5 * * *"
LIFECYCLE_DAYS=30

# ---------------------------------------------------------------------------
# Validações
# ---------------------------------------------------------------------------
[[ -z "${PROJECT_ID}" ]] && error "Nenhum projeto GCP configurado. Execute: gcloud config set project SEU_PROJETO"

info "Projeto GCP: ${PROJECT_ID}"
info "Instância Cloud SQL: ${INSTANCE_NAME}"
info "Banco: ${DATABASE_NAME}"
info "Bucket de Backups: gs://${BACKUP_BUCKET}"
info "Agendamento: ${SCHEDULE} (UTC) = 02:00 BRT"
info "Retenção: ${LIFECYCLE_DAYS} dias"

echo ""
echo -e "${YELLOW}=========================================================${NC}"
echo -e "${YELLOW} ATENÇÃO: Isso irá provisionar recursos no GCP.${NC}"
echo -e "${YELLOW} Custos podem ser gerados dependendo do volume de dados.${NC}"
echo -e "${YELLOW}=========================================================${NC}"
echo ""
read -r -p "Tem certeza que deseja continuar? [s/N] " confirm
[[ "${confirm,,}" != "s" ]] && { warn "Operação cancelada pelo usuário."; exit 0; }

echo ""

# ---------------------------------------------------------------------------
# 1. Criar bucket de backups (se não existir)
# ---------------------------------------------------------------------------
info "Verificando bucket gs://${BACKUP_BUCKET}..."
if gsutil ls -b "gs://${BACKUP_BUCKET}" &>/dev/null; then
    warn "Bucket já existe. Pulando criação."
else
    info "Criando bucket gs://${BACKUP_BUCKET} na região ${REGION}..."
    gsutil mb -p "${PROJECT_ID}" -l "${REGION}" -b on "gs://${BACKUP_BUCKET}"
    success "Bucket criado com sucesso."
fi

# ---------------------------------------------------------------------------
# 2. Aplicar lifecycle policy (deletar objetos com mais de 30 dias)
# ---------------------------------------------------------------------------
info "Aplicando política de lifecycle (${LIFECYCLE_DAYS} dias)..."
LIFECYCLE_JSON=$(cat <<EOF
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "Delete"},
        "condition": {"age": ${LIFECYCLE_DAYS}}
      }
    ]
  }
}
EOF
)
echo "${LIFECYCLE_JSON}" | gsutil lifecycle set /dev/stdin "gs://${BACKUP_BUCKET}"
success "Lifecycle policy aplicada. Backups com mais de ${LIFECYCLE_DAYS} dias serão deletados automaticamente."

# ---------------------------------------------------------------------------
# 3. Conceder permissão IAM para a Service Account do Cloud SQL
# ---------------------------------------------------------------------------
info "Obtendo Service Account do Cloud SQL..."
CLOUDSQL_SA="$(gcloud sql instances describe "${INSTANCE_NAME}" \
    --format='value(serviceAccountEmailAddress)' 2>/dev/null)"

[[ -z "${CLOUDSQL_SA}" ]] && error "Não foi possível obter a Service Account do Cloud SQL. Verifique se a instância '${INSTANCE_NAME}' existe."

info "Service Account do Cloud SQL: ${CLOUDSQL_SA}"
info "Concedendo roles/storage.objectAdmin no bucket..."

gsutil iam ch "serviceAccount:${CLOUDSQL_SA}:roles/storage.objectAdmin" "gs://${BACKUP_BUCKET}"
success "Permissão IAM concedida."

# ---------------------------------------------------------------------------
# 4. Criar Cloud Scheduler job
# ---------------------------------------------------------------------------
EXPORT_URI="gs://${BACKUP_BUCKET}/$(date +%Y)/backup-\$(date +%Y-%m-%d).sql.gz"

# Monta o body da requisição da Cloud SQL Admin API
REQUEST_BODY=$(cat <<EOF
{
  "exportContext": {
    "fileType": "SQL",
    "uri": "gs://${BACKUP_BUCKET}/PLACEHOLDER",
    "databases": ["${DATABASE_NAME}"],
    "sqlExportOptions": {
      "schemaOnly": false
    }
  }
}
EOF
)

# O Cloud Scheduler chama a API do Cloud SQL Admin
CLOUD_SQL_API_URL="https://sqladmin.googleapis.com/sql/v1beta4/projects/${PROJECT_ID}/instances/${INSTANCE_NAME}/export"

info "Configurando Cloud Scheduler job '${SCHEDULER_JOB_NAME}'..."

# Obtém Service Account padrão do Compute Engine para o Scheduler usar
COMPUTE_SA="${PROJECT_ID}@${PROJECT_ID}.iam.gserviceaccount.com"

# Verifica se o job já existe
if gcloud scheduler jobs describe "${SCHEDULER_JOB_NAME}" --location="${REGION}" &>/dev/null; then
    warn "Job '${SCHEDULER_JOB_NAME}' já existe. Atualizando..."
    gcloud scheduler jobs update http "${SCHEDULER_JOB_NAME}" \
        --location="${REGION}" \
        --schedule="${SCHEDULE}" \
        --time-zone="America/Sao_Paulo" \
        --uri="${CLOUD_SQL_API_URL}" \
        --message-body="{\"exportContext\":{\"fileType\":\"SQL\",\"uri\":\"gs://${BACKUP_BUCKET}/{{date}}/backup-{{date}}.sql.gz\",\"databases\":[\"${DATABASE_NAME}\"]}}" \
        --headers="Content-Type=application/json" \
        --oauth-service-account-email="${COMPUTE_SA}" \
        --oauth-token-scope="https://www.googleapis.com/auth/cloud-platform"
else
    # Usa um Cloud Run Job ou uma função simples via HTTP message
    # Abordagem mais simples: Cloud Scheduler → Cloud SQL Admin API diretamente
    gcloud scheduler jobs create http "${SCHEDULER_JOB_NAME}" \
        --location="${REGION}" \
        --schedule="${SCHEDULE}" \
        --time-zone="America/Sao_Paulo" \
        --uri="${CLOUD_SQL_API_URL}" \
        --message-body="{\"exportContext\":{\"fileType\":\"SQL\",\"uri\":\"gs://${BACKUP_BUCKET}/backup-\$(date +%Y-%m-%d).sql.gz\",\"databases\":[\"${DATABASE_NAME}\"]}}" \
        --headers="Content-Type=application/json" \
        --oauth-service-account-email="${COMPUTE_SA}" \
        --oauth-token-scope="https://www.googleapis.com/auth/cloud-platform"
fi

success "Cloud Scheduler job '${SCHEDULER_JOB_NAME}' configurado."

# ---------------------------------------------------------------------------
# 5. Conceder cloudsql.admin ao Compute SA para o Scheduler invocar a API
# ---------------------------------------------------------------------------
info "Concedendo roles/cloudsql.admin à Service Account do Scheduler..."
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
    --member="serviceAccount:${COMPUTE_SA}" \
    --role="roles/cloudsql.admin" \
    --quiet
success "Permissão IAM do Scheduler configurada."

# ---------------------------------------------------------------------------
# Resumo Final
# ---------------------------------------------------------------------------
echo ""
echo -e "${GREEN}=========================================================${NC}"
echo -e "${GREEN} ✅ Backup automático configurado com sucesso!${NC}"
echo -e "${GREEN}=========================================================${NC}"
echo ""
echo -e "  📦 Bucket:     gs://${BACKUP_BUCKET}"
echo -e "  🗓  Agendamento: Diariamente às 02:00 BRT"
echo -e "  🗑  Retenção:   ${LIFECYCLE_DAYS} dias"
echo -e "  🔑 IAM SA:     ${CLOUDSQL_SA}"
echo ""
echo -e "${BLUE}Para forçar um backup manual agora:${NC}"
echo -e "  gcloud scheduler jobs run ${SCHEDULER_JOB_NAME} --location=${REGION}"
echo ""
echo -e "${BLUE}Para verificar os backups via script Python:${NC}"
echo -e "  uv run scripts/backup_status.py"
echo ""
