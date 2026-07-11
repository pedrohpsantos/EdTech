---
title: 'FinOps e Previsibilidade de Custos'
---

# :material-cash-multiple: FinOps e Previsibilidade de Custos (TCO)

A arquitetura do **EdTech** foi concebida primariamente sobre serviços gerenciados (*Serverless* e *PaaS*) no Google Cloud Platform (GCP). Como o projeto foi desenvolvido em um contexto acadêmico, nosso principal requisito é manter o custo total do projeto estritamente abaixo do orçamento estudantil disponibilizado de **$50.00 USD/mês**.

---

## 1. Topologia de Custos e Direcionadores

Os principais ofensores de custo do projeto são:

1. **Cloud SQL (PostgreSQL)**: Custo fixo por hora (Instância + Disco).
2. **Cloud Run (Backend)**: Custo variável por invocação, CPU e Memória (amparado pela cota gratuita).
3. **Cloud Storage (GCS)**: Custo variável por volume armazenado e tráfego de rede de saída (*Egress*).
4. **Firebase Hosting (Frontend)**: Custo variável de hospedagem estática e banda (amparado pela cota gratuita).

---

## 2. Cenário Base (Orçamento de Estudante)

*Contexto: Ambiente acadêmico com tráfego moderado, visando validação e demonstração, operando sob uma bolsa do Google Cloud for Students.*

### 2.1. Cloud SQL (Banco de Dados)

Para mantermos o custo baixo sem perder a consistência, utilizaremos instâncias de núcleo compartilhado (*Shared Core*):

- **Homologação/Produção Inicial (`db-f1-micro`, 10GB SSD)**: $\approx \$9.00$ a $\$15.00$ / mês.

### 2.2. Cloud Run (Backend da API)

Cálculo considerando:

- **Alocação**: 1 vCPU, 1 GB RAM por contêiner.
- **Requisições**: ~10.000 requisições / mês.
- **Instâncias Mínimas**: 0 (Escalonamento para zero habilitado para economizar recursos).

**Custo Estimado**: Graças à Cota Gratuita (*Free Tier*) de 2 milhões de requisições mensais do Cloud Run, o custo deste serviço para o cenário base será de **$0.00 a $2.00 / mês**.

### 2.3. Cloud Storage (Armazenamento de Arquivos)

Armazenamento Padrão (*Standard*):

- **Volume**: 20 GB (documentos e metadados).
- **Custo de Armazenamento**: $\approx \$0.026$ por GB = **$\approx \$0.52$ / mês**.
- **Custo de Tráfego (*Egress*)**: Assumindo 10 GB de download = $\approx \$0.12$ por GB = **$\approx \$1.20$ / mês**.

### 2.4. Resumo Total Mensal

| Recurso | Custo Estimado (USD) |
| :--- | :--- |
| Cloud SQL (F1-Micro) | $ 15.00 |
| Cloud Run | $ 0.00 (Coberto pela Cota Gratuita) |
| Cloud Storage | $ 1.72 |
| Firebase Hosting / Rede | $ 0.00 (Coberto pela Cota Gratuita) |
| **Total Estimado** | **$\approx \$16.72$ / mês** |

> **Aviso**: O custo estimado de **$16.72** está perfeitamente alinhado com a restrição orçamentária do balancete acadêmico de **$50.00 USD**.

---

## 3. Práticas de Otimização Adotadas

O projeto já possui uma arquitetura altamente focada em eficiência de custo:

- **Upload Direto ao GCS**: O frontend (interface de usuário) envia arquivos diretamente ao Google Cloud Storage usando URLs pré-assinadas (*Signed URLs*). O Cloud Run não processa o fluxo binário do arquivo, poupando custos enormes de memória e CPU.
- **Escalonamento para Zero (*Scale-to-Zero*)**: O frontend estático custa zero na maior parte do tempo. O Cloud Run desliga instâncias completamente de madrugada.
- **Limpeza Automática (*Lifecycle Rules*)**: Arquivos temporários e exportações no bucket de armazenamento são configurados para expiração automática após 7 dias.

---

## 4. Alertas Orçamentários (*Billing Alerts*)

Para evitar surpresas no cartão de crédito do estudante, é mandatório que a conta de faturamento do GCP possua um orçamento (`Budget`) configurado de **$50.00** com disparos em:

- **50% ($25.00)**: Aviso por email.
- **90% ($45.00)**: Aviso Crítico.
- **100% ($50.00)**: Alerta para o Time de Desenvolvimento atuar e pausar recursos não críticos.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 10/07/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 11/07/2026 | Ajuste para orçamento estudantil (< $50) e correção de formatação | Pedro Henrique P. Santos |
