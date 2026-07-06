---
title: 'Pipeline CI/CD e Deploy'
---

# :material-rocket-launch: Pipeline CI/CD e Deploy

A integração e entrega contínua do projeto ocorrem através do **GitHub Actions**.

## O Pipeline

Toda abertura de um `Pull Request` ou envio para a branch `develop` engatilha nossa bateria automatizada de testes e checks. 

Existem fluxos independentes:


1. **Unified CI/CD (`ci.yml`)**: Compila o código Java, roda todos os testes unitários (`mvn verify`), roda lint/build/test no Frontend, e faz o deploy de ambos para Produção caso a branch seja a `main`.

2. **Docs CI (`ci-docs.yml`)**: Publica automaticamente esta documentação (MkDocs) para o GitHub Pages. Disparada em alterações na `main` dentro da pasta `docs/` ou em modificações no backend que afetem relatórios de cobertura.

## Regras de Proteção

A branch `develop` possui regras (Branch Protection Rules) no repositório. O "Merge" de um Pull Request só é permitido se:

- Pelo menos um desenvolvedor revisou e aprovou o código (Code Review).

- Os jobs de CI (Backend e Frontend) passaram com a bolinha verde (sem quebrar a build ou testes).

## Processo de Deploy em Produção (Automático)

De acordo com o ADR 0003, o deploy das partes ativas do sistema ocorre de forma automatizada pelo **GitHub Actions** (`ci.yml`):

### Frontend
- **Provedor**: Firebase Hosting
- **GCP Project ID**: `edtech-academic`
- **Gatilho**: Job `deploy` no GitHub Actions após sucesso nos testes, autenticado pela secret `FIREBASE_SERVICE_ACCOUNT_EDTECH`.

### Backend
- **Provedor**: Google Cloud Run
- **GCP Project ID**: `edtech-storage-501117`
- **Registry Docker**: Google Artifact Registry (repositório: `cloud-run-source-deploy` em `southamerica-east1`).
- **Bucket de Armazenamento**: `edtech-vault-storage`.
- **Segurança (Secret Manager)**: No ambiente de produção, o Cloud Run não consome variáveis de ambiente do repositório, mas busca dados sensíveis (como `SPRING_DATASOURCE_URL`, senhas do banco e `JWT_SECRET`) diretamente do Google Cloud Secret Manager.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 13/06/2026 | Criação do documento de suporte ao DevEx | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `1.2` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |


