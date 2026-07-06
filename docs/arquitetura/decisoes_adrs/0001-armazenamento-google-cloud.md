---
title: 'ADR 0001: Armazenamento em Nuvem Nativo (Google Cloud)'
---

# :material-text-box-check: ADR 0001: Armazenamento em Nuvem Nativo (Google Cloud)

## Status

Aceito e Implementado

## Contexto

O repositório acadêmico espera receber um grande volume de Artigos e Teses em formato PDF e datasets (CSV, JSON). O tamanho limite estipulado no requisito `RF07` é de 50 MB por arquivo. A atual infraestrutura da Instituição não possui instâncias em disco com alta disponibilidade nativa prontas para I/O massivo simultâneo.
Além disso, a persistência em disco local se mostrou frágil e inadequada para ambientes efêmeros. Soluções alternativas de terceiros foram testadas, mas divergiam da estratégia institucional de consolidação tecnológica.

## Decisão

Optou-se por consolidar a infraestrutura de armazenamento e banco de dados no ecossistema nativo do **Google Cloud Platform (GCP)**. Os arquivos binários serão armazenados no **Google Cloud Storage (GCS)**, enquanto os dados relacionais residirão no **Google Cloud SQL (PostgreSQL)**, com o frontend distribuído via **Firebase Hosting**.

A aplicação backend (Cloud Run) fará comunicação direta com as APIs nativas do Google Cloud, eliminando integrações e bibliotecas de terceiros (como S3 SDK) e garantindo maior performance e coesão de segurança através da VPC do GCP.

## Consequências

### Positivas

- **Ecossistema Unificado:** Facilidade no gerenciamento de faturamento, infraestrutura e segurança com a centralização no GCP.
- **Segurança Nativa (IAM):** Autenticação *passwordless* entre os serviços (Cloud Run para GCS e Cloud SQL) baseada em Service Accounts padrão do Google Cloud.
- **Desempenho:** Comunicação na rede interna de alta velocidade do Google entre a API, o banco e o storage, desonerando conexões externas.
- **Escalabilidade:** O GCS absorve 100% da carga de tráfego estático, evitando engarrafamentos no tráfego da API.

### Negativas / Riscos

- **Lock-in:** Dependência completa da infraestrutura do Google Cloud (GCP/Firebase) e de suas bibliotecas nativas, dificultando a migração pontual para outros provedores (AWS/Azure) sem refatoração.
- **Complexidade de IAM:** Requer curva de aprendizado inicial para gerenciar permissões no painel do GCP.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Documento de Registro de Decisão Arquitetural (GCS inicial) | Pedro Henrique P. Santos |
| `1.1` | 04/06/2026 | Padronização do formato do documento | Pedro Henrique P. Santos |
| `1.2` | 21/06/2026 | Transição temporária de Storage (removido) | Pedro Henrique P. Santos |
| `1.3` | 01/07/2026 | Consolidação final no ecossistema nativo Google Cloud e Firebase | Pedro Henrique P. Santos |
| `1.4` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |


