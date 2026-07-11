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
- **Gatilho**: Job de deploy no GitHub Actions após sucesso nos testes, autenticado por secrets do repositório.

### Backend
- **Provedor**: Google Cloud Run
- **Registry Docker**: Google Artifact Registry configurado por variáveis da pipeline e do Terraform.
- **Bucket de Armazenamento**: Google Cloud Storage definido via variável de infraestrutura, sem hardcode no repositório.
- **Segurança (Secret Manager)**: No ambiente de produção, o Cloud Run não consome variáveis de ambiente do repositório, mas busca dados sensíveis (como `SPRING_DATASOURCE_URL`, senhas do banco e `JWT_SECRET`) diretamente do Google Cloud Secret Manager.

### Infraestrutura
- **Terraform**: A pasta `infra/prod/terraform` mantém módulos para Cloud Run, Cloud SQL e Cloud Storage. O arquivo `terraform.tfvars` real não deve ser versionado; use `terraform.tfvars.example` como base.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 13/06/2026 | Criação do documento de suporte ao DevEx | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `1.2` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |
| `1.3` | 09/07/2026 | Atualização do deploy para infraestrutura parametrizada com Terraform | Pedro Henrique P. Santos |


