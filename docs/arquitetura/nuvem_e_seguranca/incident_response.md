---
title: 'Plano de Resposta a Incidentes'
---

# :material-alarm-light: Plano de Resposta a Incidentes

Este documento orienta os procedimentos de contingência do EdTech em casos de falhas graves e violações de segurança. Os protocolos listados aqui foram definidos adotando premissas básicas e diretrizes da norma **ISO 27001**.

## 1. Organograma de Resposta

O acionamento de um protocolo de crise (P1) escala hierarquicamente na seguinte ordem:

1. **DevOps / Infraestrutura em Nuvem (L1):** Detecção anômala via Google Cloud Monitoring ou denúncia anônima; primeiro isolamento do incidente.
2. **Tech Lead (L2):** Acesso a logs de produção, análise forense da aplicação e autorização de manutenções de rede.
3. **C-Level / Comitê Diretivo (L3):** Acionado exclusivamente em caso de exfiltração de dados (Vazamento) que fira a LGPD, orientando a postura legal e comunicação.

## 2. Fases de Resposta a Incidentes

Em conformidade com a ISO 27001, um incidente de Segurança da Informação é tratado nas seguintes fases:

### 2.1 Preparação
- Realização de backups automáticos diários assíncronos no Cloud Storage (`edtech-backups`).
- Implantação prévia de WAF e controle de autenticação (JWT / Bucket4j).
- Simulação de testes de estresse (Sprint 8 K6 Tests) para medir resiliência sob carga.

### 2.2 Identificação
O incidente pode ser identificado via:
- Alertas gerados pelo Google Cloud Operations (Ex: Spike de CPU na Cloud Run).
- Reporte direto de usuários à central de Suporte.
- Alertas bloqueados pela API do ClamAV em múltiplos *attempts* de infecção no mesmo intervalo de IP.

### 2.3 Contenção
- **Curto Prazo:** Desativar temporariamente o endpoint afetado ou isolar a instância específica bloqueando faixas de IPs maliciosos pelo Firewall VPC / WAF.
- **Ações Imediatas:** Se for comprometimento de dados ou banco de dados, interromper o tráfego HTTP na Cloud Run (scale to 0) para cessar qualquer interação com o banco.

### 2.4 Erradicação
- Remoção da vulnerabilidade por meio da correção do código fonte (Patch de emergência - Hotfix).
- Rotação completa de Segredos, JWT Secrets, Credenciais do Banco e Chaves de Serviço (Service Accounts do GCP).

### 2.5 Recuperação
- Restauração de integridade utilizando o dump PostgreSQL mais recente e limpo, caso tenha ocorrido exclusão ou violação em massa.
- Redirecionamento gradual do tráfego para a plataforma acompanhado de logs detalhados (Warm-up).

### 2.6 Lições Aprendidas
- Em até **48 horas** após o restabelecimento total, toda a equipe técnica e Tech Lead realizam um *Post-Mortem*. O registro documentará a brecha, o tempo de inatividade (Downtime) e medidas técnicas corretivas definitivas para o backlog.

## 3. SLA e Matriz de Comunicação

| Nível (Severidade) | Descrição do Impacto | Tempo de Resposta Alvo | Canal Principal |
| :---: | :--- | :---: | :--- |
| **P1 - Crítico** | Indisponibilidade total do Backend (Downtime) ou Exfiltração massiva (Risco LGPD). | 30 minutos | Pager / Chamada |
| **P2 - Alto** | Degradação severa (ex: Uploads parados, PDF não carregam). | 2 Horas | Slack / Email |
| **P3 - Médio** | Bugs funcionais que afetam a visualização, mas com "Workarounds" disponíveis. | 1 Dia Útil | Jira / Issue Board |
| **P4 - Baixo** | Erros de formatação e instabilidades não interruptivas. | Backlog Padrão | Jira / Issue Board |

---

> *Em caso de detecção confirmada de incidente P1 envolvendo exfiltração, acione o Tech Lead de imediato e não reinicie as máquinas corrompidas antes de copiar um snapshot dos logs para análise forense externa.*
