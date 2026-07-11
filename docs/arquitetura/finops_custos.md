---
title: 'FinOps e Previsibilidade de Custos'
---

# :material-cash-multiple: FinOps e Previsibilidade de Custos (TCO)

A arquitetura do **EdTech** foi concebida primariamente sobre serviços gerenciados (Serverless e PaaS) no Google Cloud Platform (GCP). O objetivo deste documento é fornecer uma estimativa de custo baseada no tráfego esperado, permitindo planejamento orçamentário.

---

## 1. Topologia de Custos e Drivers

Os principais ofensores de custo do projeto são:

1. **Cloud SQL (PostgreSQL)**: Custo fixo por hora (Instância + Disco + Backup).
2. **Cloud Run (Backend)**: Custo variável por invocação, CPU e Memória alocados por milissegundo de execução.
3. **Cloud Storage (GCS)**: Custo variável por volume de GBs armazenados e banda de rede de saída (Egress).
4. **Secret Manager / Build**: Custos marginais e quase sempre dentro do *Free Tier*.

---

## 2. Cenário Base (Estimativa)
*Contexto: Uma instituição acadêmica de médio porte com 50 pesquisadores ativos diários, enviando ~10 GB de datasets/PDFs por mês.*

### 2.1. Cloud SQL (Banco de Dados)
Para produção, recomendamos no mínimo a classe `db-custom-1-3840` (1 vCPU, 3.75 GB RAM) ou `db-f1-micro` (para homologação).
- **Homologação (`db-f1-micro`, 10GB SSD)**: ~$9 a $15 / mês
- **Produção (`db-custom-1-3840`, 50GB SSD, HA Zonal)**: ~$65 a $85 / mês

### 2.2. Cloud Run (Backend API)
Cálculo considerando:
- **Alocação**: 1 vCPU, 1 GB RAM por container.
- **Requisições**: ~100.000 requisições / mês.
- **Duração Média**: 300ms por requisição.
- **Min Instances**: 0 (Scale to zero habilitado).

**Custo Estimado**: Graças ao *Free Tier* de 2 milhões de requisições mensais do Cloud Run, o custo deste serviço para o cenário base será de **$0.00 a $2.00 / mês**.
*(Nota: Se `min-instances=1` for ativado para evitar cold starts, o custo fixo sobe para ~$25/mês devido à CPU ligada 24/7).*

### 2.3. Cloud Storage (Armazenamento de Arquivos)
Armazenamento Standard (Multi-Region US).
- **Volume**: 100 GB (acumulado).
- **Custo de Armazenamento**: ~$0.026 por GB = **$2.60 / mês**.
- **Custo de Egress (Downloads)**: Assumindo 50 GB de download = ~$0.12 por GB = **$6.00 / mês**.

### 2.4. Resumo Total Mensal (Cenário Produção Inicial)
| Recurso | Custo Estimado (USD) | 
| :--- | :--- |
| Cloud SQL (Prod) | $ 75.00 |
| Cloud Run | $ 2.00 |
| Cloud Storage | $ 8.60 |
| Rede / Load Balancer | $ 18.00 |
| **Total Estimado** | **~$ 103.60 / mês** |

---

## 3. Práticas de Otimização Adotadas

O projeto já possui arquitetura orientada a eficiência de custo:
- **Upload Direto ao GCS**: O frontend utiliza URLs pre-assinadas para fazer upload diretamente ao Google Cloud Storage. O Cloud Run não processa o fluxo binário do arquivo em memória, o que poupa custos enormes de RAM e duração de CPU na API.
- **Scale-to-Zero**: O frontend estático no Vercel/Firebase Hosting custa quase zero. O Cloud Run zera instâncias de madrugada, pagando apenas pelo Banco de Dados.

## 4. Alertas Orçamentários (Billing Alerts)

É mandatório que a conta de faturamento do GCP possua um orçamento (`Budget`) configurado em:
- **50% do limite mensal** (Aviso por email)
- **90% do limite mensal** (Aviso Crítico)
- **100% do limite mensal** (Alerta para DevOps)
