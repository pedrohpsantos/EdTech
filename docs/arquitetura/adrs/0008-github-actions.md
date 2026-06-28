# ADR 0008: Integração e Entrega Contínuas com GitHub Actions

## Status

Aceito

## Contexto

Um repositório acadêmico com frontend e backend desacoplados (ADR 0006) precisa de uma garantia rigorosa de que as alterações propostas (Pull Requests) não quebram o contrato de API e passam nos testes de segurança e negócio (JUnit). Fazer o deploy de aplicações conteinerizadas manualmente no Cloud Run (ADR 0003) é um processo propenso a falhas de segurança (vazamento de chaves) e de operação humana.

## Decisão

Adotamos o **GitHub Actions** como nossa plataforma oficial de Integração Contínua (CI) e Entrega Contínua (CD).

## Consequências

### Positivas

- **Fricção Zero:** O GitHub Actions já é nativo na mesma plataforma de versionamento do código, evitando a necessidade de gerenciar infraestrutura separada (como instâncias de Jenkins).

- **Integração com GCP:** Integração extremamente forte com o Google Cloud via `Workload Identity Federation`, permitindo deploys sem precisar armazenar senhas fixas/Service Accounts em texto plano no repositório.

- **Verificação de Qualidade:** Pipelines automatizados garantem que código que falha no JUnit ou na cobertura mínima nunca atinja o ambiente de produção.

### Negativas / Riscos

- **Vendor Lock-in Parcial:** Os scripts `.yaml` escritos para o GitHub Actions não são facilmente portáveis para GitLab CI ou AWS CodePipeline sem refatoração considerável caso haja migração de provedor Git.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |


## Histórico de Versão

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| 1.0 | 28/06/2026 | Criação e estruturação do documento | Pedro Henrique P. Santos |
