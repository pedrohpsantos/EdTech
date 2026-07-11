---
title: 'ADR 0014: Terraform para Infraestrutura como Código'
---

# :material-text-box-check: ADR 0014: Terraform para Infraestrutura como Código

## Status

Aceita

## Contexto

O EdTech já opera no Google Cloud com Cloud Run, Cloud SQL, Cloud Storage, Artifact Registry e Firebase Hosting. Antes desta decisão, parte relevante da infraestrutura era descrita em scripts, workflows e configurações operacionais, o que dificultava revisão, reprodutibilidade e auditoria de mudanças.

Também havia risco de documentar ou versionar identificadores concretos de projeto, buckets, imagens e instâncias de banco em arquivos que deveriam ser reutilizáveis. Para reduzir esse risco, a infraestrutura precisa ser declarativa, parametrizada e revisável no mesmo fluxo de Pull Request do restante do código.

## Decisão

Adotamos **Terraform** como ferramenta de Infraestrutura como Código para os recursos principais de backend na Google Cloud.

A definição fica em `infra/terraform` e é organizada em módulos:

| Módulo | Responsabilidade |
| :--- | :--- |
| `modules/cloud_run` | Serviço backend, imagem, variáveis de ambiente e integração com storage |
| `modules/cloud_sql` | Instância PostgreSQL gerenciada |
| `modules/cloud_storage` | Bucket de arquivos acadêmicos |

Os valores concretos de ambiente devem ser fornecidos por variáveis em `terraform.tfvars`, criado localmente a partir de `terraform.tfvars.example`. O arquivo real de variáveis, o estado local e a pasta `.terraform/` não devem ser versionados.

## Consequências

### Positivas

- Mudanças de infraestrutura passam pelo mesmo fluxo de revisão do código.
- A topologia cloud fica reprodutível e documentada de forma executável.
- Reduzimos hardcode de projeto, bucket, região e imagem em arquivos versionados.
- A separação por módulos facilita evolução futura, como VPC, Workload Identity Federation e alertas de budget.

### Negativas

- A equipe precisa manter disciplina sobre estado remoto e variáveis locais.
- O Terraform adiciona uma etapa operacional para quem for provisionar ou alterar recursos.
- Alterações manuais feitas diretamente no console do GCP podem gerar drift e precisam ser reconciliadas.

## Alternativas Consideradas

### Manter apenas scripts e GitHub Actions

Foi descartado porque scripts imperativos são mais difíceis de revisar, comparar e reaplicar com segurança.

### Google Cloud Deployment Manager

Foi descartado por menor adoção no ecossistema atual e por não oferecer a mesma portabilidade e familiaridade do Terraform.

### Provisionamento manual pelo console

Foi descartado por não ser auditável o suficiente para um projeto com foco em governança e rastreabilidade.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.1` | 11/07/2026 | Correção ortográfica e de acentuação | Pedro Henrique P. Santos |
| `1.0` | 09/07/2026 | Registro da decisão de adotar Terraform | Pedro Henrique P. Santos |
