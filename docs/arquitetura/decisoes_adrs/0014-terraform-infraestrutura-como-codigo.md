---
title: 'ADR 0014: Terraform para Infraestrutura como Codigo'
---

# :material-text-box-check: ADR 0014: Terraform para Infraestrutura como Codigo

## Status

Aceita

## Contexto

O EdTech ja opera em Google Cloud com Cloud Run, Cloud SQL, Cloud Storage, Artifact Registry e Firebase Hosting. Antes desta decisao, parte relevante da infraestrutura era descrita em scripts, workflows e configuracoes operacionais, o que dificultava revisao, reproducibilidade e auditoria de mudancas.

Tambem havia risco de documentar ou versionar identificadores concretos de projeto, buckets, imagens e instancia de banco em arquivos que deveriam ser reutilizaveis. Para reduzir esse risco, a infraestrutura precisa ser declarativa, parametrizada e revisavel no mesmo fluxo de Pull Request do restante do codigo.

## Decisao

Adotamos **Terraform** como ferramenta de Infraestrutura como Codigo para os recursos principais de backend na Google Cloud.

A definicao fica em `infra/terraform` e e organizada em modulos:

| Modulo | Responsabilidade |
| :--- | :--- |
| `modules/cloud_run` | Servico backend, imagem, variaveis de ambiente e integracao com storage |
| `modules/cloud_sql` | Instancia PostgreSQL gerenciada |
| `modules/cloud_storage` | Bucket de arquivos academicos |

Os valores concretos de ambiente devem ser fornecidos por variaveis em `terraform.tfvars`, criado localmente a partir de `terraform.tfvars.example`. O arquivo real de variaveis, o estado local e a pasta `.terraform/` nao devem ser versionados.

## Consequencias

### Positivas

- Mudancas de infraestrutura passam pelo mesmo fluxo de revisao do codigo.
- A topologia cloud fica reproduzivel e documentada de forma executavel.
- Reduzimos hardcode de projeto, bucket, regiao e imagem em arquivos versionados.
- A separacao por modulos facilita evolucao futura, como VPC, Workload Identity Federation e alertas de budget.

### Negativas

- A equipe precisa manter disciplina sobre estado remoto e variaveis locais.
- O Terraform adiciona uma etapa operacional para quem for provisionar ou alterar recursos.
- Alteracoes manuais feitas diretamente no console da GCP podem gerar drift e precisam ser reconciliadas.

## Alternativas Consideradas

### Manter apenas scripts e GitHub Actions

Foi descartado porque scripts imperativos sao mais dificeis de revisar, comparar e reaplicar com seguranca.

### Google Cloud Deployment Manager

Foi descartado por menor adocao no ecossistema atual e por nao oferecer a mesma portabilidade e familiaridade do Terraform.

### Provisionamento manual pelo console

Foi descartado por nao ser auditavel o suficiente para um projeto com foco em governanca e rastreabilidade.

## Historico de Versoes

| Versao | Data | Descricao | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 09/07/2026 | Registro da decisao de adotar Terraform para IaC | Pedro Henrique P. Santos |
