---
title: 'Guias Operacionais e Resolução de Problemas'
---


# :material-lifebuoy: Guias Operacionais e Resolução de Problemas (Runbooks)

Este documento atua como guia de resposta a incidentes para a operação do **EdTech** em produção. Ele consolida o "o que fazer quando" para garantir a continuidade dos negócios e a aderência aos nossos níveis de serviço acordados de disponibilidade (≥ 99%).

---

## 1. Cloud Run: Degradação de Performance ou Inícios a Frio (*Cold Starts*) Longos

### Sintomas
- Alertas de latência no Balanceador de Carga (Load Balancer) acima de 2 segundos para rotas de listagem.
- Logs do Cloud Run indicando erro de memória: `Container Sandbox Memory Exceeded`.

### Ações Corretivas
1. **Verifique os recursos alocados**: Certifique-se de que o contêiner do backend possui ao menos `1024Mi` de RAM e `1.0` de CPU. A máquina virtual Java do Spring Boot precisa de banda de memória para iniciar rapidamente.
2. **Ajuste de Instâncias Mínimas**: Se o tráfego for intermitente, aumente temporariamente a configuração de instâncias mínimas para evitar inícios a frio.
   ```bash
   gcloud run services update edtech-backend --min-instances 1 --region us-central1
   ```

---

## 2. PostgreSQL / Flyway: Bloqueio (*Lock*) de Migração

### Sintomas
- A pipeline de entrega contínua relata esgotamento de tempo (*timeout*) no processo `edtech-backend-migration`.
- O log exibe: `FlywayException: Found non-empty schema(s)` ou `Lock wait timeout exceeded`.

### Causa Comum
Uma falha abrupta (*crash*) prematura na execução anterior deixou a tabela `flyway_schema_history` travada em um estado inconsistente.

### Ações Corretivas
1. Acesse o Cloud SQL via proxy ou terminal da nuvem:
   ```bash
   gcloud sql connect edtech-db-dev --user=postgres
   ```
2. Limpe a tabela e tente uma reparação:
   ```sql
   UPDATE flyway_schema_history SET success = false WHERE success IS NULL;
   -- Ou, em caso de bloqueio travado na linha de controle:
   DELETE FROM flyway_schema_history WHERE installed_rank = (SELECT MAX(installed_rank) FROM flyway_schema_history);
   ```
3. Reexecute a rotina de migração:
   ```bash
   gcloud run jobs execute edtech-backend-migration
   ```

---

## 3. Storage GCS: Permissão Negada em Downloads

### Sintomas
- A rota `/api/v1/documents/{id}/download` retorna a URL pré-assinada sem erros.
- Porém, a interface do usuário recebe um erro HTTP `403 AccessDenied` do Google APIs ao abrir o link do arquivo.

### Causa Comum
A conta de serviço do Cloud Run perdeu as permissões (*grants*) de IAM para o `roles/storage.objectViewer` ou perdeu o papel de criador de token para assinar as URLs.

### Ações Corretivas
1. Revise se a Conta de Serviço (*Service Account*) principal tem o papel `Token Creator` (essencial para o SDK do GCP assinar URLs no código Java).
2. Valide e reaplique a infraestrutura via Terraform para corrigir qualquer discrepância de estado (caso a conta tenha sido recriada por engano).
   ```bash
   terraform apply -auto-approve
   ```

---

## 4. Alerta de Segurança (Chave JWT Exposta)

### Sintomas
- Ferramentas de varredura (*Scan*) apontam que o segredo `JWT_SECRET` pode ter vazado nos logs.

### Ações Corretivas
1. Navegue no painel do Google Cloud até o **Secret Manager**.
2. Adicione uma nova versão (Versão 2) para o segredo `JWT_SECRET` com um código aleatório forte (≥ 512 bits / HMAC SHA-512).
3. Reinicie todas as instâncias ativas do Cloud Run para forçar a busca da versão mais recente.
   ```bash
   gcloud run services update edtech-backend --update-env-vars=TRIGGER_RESTART=$(date +%s)
   ```
4. **Impacto**: Todos os usuários conectados serão desconectados imediatamente, pois o sistema rejeitará as assinaturas criptográficas antigas incompatíveis. Todos deverão autenticar-se novamente.

---

## Dicas para Logs

Para ler logs estruturados em tempo real diretamente do terminal, utilize:
```bash
gcloud beta run services logs tail edtech-backend --project=edtech-storage-501117
```

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 10/07/2026 | Criação do documento de resposta a incidentes | Pedro Henrique P. Santos |
| `1.1` | 11/07/2026 | Refinamento do texto e tradução de termos em inglês | Pedro Henrique P. Santos |
