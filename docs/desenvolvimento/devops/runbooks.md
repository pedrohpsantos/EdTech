---
title: 'Runbooks e Troubleshooting'
---

# :material-lifebuoy: Runbooks e Troubleshooting

Este documento atua como guia de resposta a incidentes para a operação do **EdTech** em produção. Ele consolida o "o que fazer quando" (What-If) para garantir a continuidade de negócios e aderência aos nossos SLOs de disponibilidade (≥ 99%).

---

## 1. Cloud Run: Degradação de Performance ou "Cold Starts" Longos

### Sintomas
- Alertas de latência no GCLB (Load Balancer) acima de 2s para rotas de listagem.
- Logs do Cloud Run indicando "Container Sandbox Memory Exceeded".

### Ações Corretivas
1. **Verifique os recursos alocados**: Certifique-se de que o container do backend Java possui ao menos `1024Mi` de RAM e `1.0` CPU. A JVM do Spring Boot 3+ (mesmo com AOT compiler) precisa de banda de memória para arrancar rápido.
2. **Ajuste de Instâncias Mínimas**: Se o tráfego for espasmódico, aumente temporariamente a flag de `--min-instances` para `1`.
   ```bash
   gcloud run services update edtech-backend --min-instances 1 --region us-central1
   ```

---

## 2. PostgreSQL / Flyway: Lock de Migração

### Sintomas
- A pipeline de CD relata timeout no Job `edtech-backend-migration`.
- O log do Job exibe: `FlywayException: Found non-empty schema(s) sem metadata table` ou `Lock wait timeout exceeded`.

### Causa Comum
Um crash prematuro na execução anterior deixou a tabela `flyway_schema_history` travada (Locked) ou em um estado inconsistente.

### Ações Corretivas
1. Acesse o Cloud SQL via proxy ou Cloud Shell:
   ```bash
   gcloud sql connect edtech-db-dev --user=postgres
   ```
2. Limpe a tabela e tente um `repair`:
   ```sql
   UPDATE flyway_schema_history SET success = false WHERE success IS NULL;
   -- Ou, em caso de lock travado na linha de controle:
   DELETE FROM flyway_schema_history WHERE installed_rank = (SELECT MAX(installed_rank) FROM flyway_schema_history);
   ```
3. Re-execute o Job:
   ```bash
   gcloud run jobs execute edtech-backend-migration
   ```

---

## 3. Storage GCS: Permissão Negada em Downloads

### Sintomas
- A rota `/api/v1/documents/{id}/download` retorna a URL pre-assinada perfeitamente.
- Mas o frontend recebe um HTTP 403 AccessDenied do Google APIs ao abrir o link.

### Causa Comum
A conta de serviço do Cloud Run (Workload Identity) perdeu as grants de IAM para o `roles/storage.objectViewer` ou o *token_creator* para assinar URLs.

### Ações Corretivas
1. Revise se o Service Account principal tem o papel `Token Creator` (essencial para o SDK do GCP assinar URLs no código Java).
2. Valide via Terraform (se a Service Account principal foi deletada e recriada por engano e mudou a constraint).
   ```bash
   terraform apply -auto-approve
   ```

---

## 4. Alerta de Segurança (JWT Exposto)

### Sintomas
- Dependabot ou Scan aponta que a secret `JWT_SECRET` pode ter vazado nos logs.

### Ações Corretivas
1. Navegue no GCP Console até **Secret Manager**.
2. Adicione uma nova versão (Version 2) para a secret `JWT_SECRET` com uma string randômica forte (≥ 512 bits / HMAC SHA-512).
3. Reinicie todas as instâncias ativas do Cloud Run para forçar o fetch da versão *latest*.
   ```bash
   gcloud run services update edtech-backend --update-env-vars=TRIGGER_RESTART=$(date +%s)
   ```
4. **Impacto**: Todos os usuários conectados serão deslogados imediatamente ao bater a expiração ou se o backend validar o *signature* (já que a chave assinou com HMAC incompatível). Todos deverão reconectar.

---

## Dicas para Logs

Para ler logs estruturados em tempo real, use a CLI:
```bash
gcloud beta run services logs tail edtech-backend --project=edtech-storage-501117
```
