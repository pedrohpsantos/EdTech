# ADR 0001: Armazenamento em Nuvem (Google Cloud Storage)

## Status

Aceito

## Contexto

O repositório acadêmico espera receber um grande volume de Artigos e Teses em formato PDF e datasets (CSV, JSON). O tamanho limite estipulado no requisito `RF02.1` é de 50 MB por arquivo. A atual infraestrutura da Instituição não possui instâncias em disco com alta disponibilidade nativa prontas para I/O massivo simultâneo.

## Decisão

Optou-se por integrar a aplicação backend ao **Google Cloud Storage (GCS)** para hospedagem de arquivos binários. O banco de dados PostgreSQL armazenará apenas a URI (metadados) do arquivo apontando para o bucket do GCS.

## Consequências

### Positivas

- **Escalabilidade e Redundância:** Altíssima escalabilidade e redundância de hardware garantida pelo SLA do Google Cloud.

- **Desempenho:** Desonera o disco e a memória da máquina virtual de backend (Cloud Run), impedindo gargalos de I/O.

### Negativas / Riscos

- **Complexidade de Autenticação:** Exige o gerenciamento de credenciais via `Service Accounts` do GCP, aumentando o escopo das regras de segurança de ambiente local e CI/CD.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Documento de Registro de Decisão Arquitetural | Pedro Henrique P. Santos |
| `1.1` | 04/06/2026 | Padronização do formato do documento | Pedro Henrique P. Santos |
| `1.2` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
