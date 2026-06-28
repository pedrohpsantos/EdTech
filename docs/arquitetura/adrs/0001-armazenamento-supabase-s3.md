# ADR 0001: Armazenamento em Nuvem (Supabase Storage / GCS)

## Status

Aceito e Implementado

## Contexto

O repositório acadêmico espera receber um grande volume de Artigos e Teses em formato PDF e datasets (CSV, JSON). O tamanho limite estipulado no requisito `RF07` é de 50 MB por arquivo. A atual infraestrutura da Instituição não possui instâncias em disco com alta disponibilidade nativa prontas para I/O massivo simultâneo.
Além disso, a persistência em disco local se mostrou frágil e inadequada para ambientes efêmeros como Render ou Heroku. A solução anterior com Google Cloud Storage esbarrava em limitações de Billing para ambientes gratuitos/iniciais.

## Decisão

Optou-se por integrar a aplicação backend ao **Supabase Storage** (via API compatível com **AWS S3**) para hospedagem de arquivos binários no momento atual. O banco de dados PostgreSQL armazenará apenas a URI (metadados) do arquivo apontando para a URL pública do bucket S3.

**Estratégia de Transição e Fallback (Google Cloud):**
Apesar de utilizarmos o Supabase primariamente neste momento, **todo o código e configuração referentes ao Google Cloud Storage (GCS) serão mantidos intactos no repositório**. Essa decisão estratégica visa garantir um fallback imediato e facilitar uma futura transição de infraestrutura, caso a adoção corporativa do Google Cloud seja oficializada ou se os limites gratuitos do Supabase exigirem uma mudança brusca para o ecossistema do GCP em ambiente Enterprise.

## Consequências

### Positivas

- **Escalabilidade e Redundância:** Alta escalabilidade, usando a estrutura do Supabase Storage que abstrai o provedor Cloud.
- **Desempenho:** Desonera o disco local e a memória da máquina virtual do backend, impedindo gargalos de I/O de rede e disco no servidor da API.
- **Compatibilidade S3:** Ao adotar a dependência `software.amazon.awssdk:s3`, o projeto fica cloud-agnostic e pronto para migrar para a AWS de verdade com zero mudanças de código, apenas trocando credenciais e endpoint.
- **Isenção de Billing Imediato:** Supera a restrição de faturamento do Google Cloud, pois o Supabase oferece uma cota livre generosa.

### Negativas / Riscos

- **Exposição de Chaves:** Exige configuração correta das variáveis `SUPABASE_ACCESS_KEY` e `SUPABASE_SECRET_KEY` nos ambientes de CI/CD e produção.
- **Lock-in Parcial de Endpoint:** Apesar de usar S3, o parseamento das URLs do Supabase (para montar a URL final pública) tem pequenas particularidades de endpoint.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Documento de Registro de Decisão Arquitetural (GCS) | Pedro Henrique P. Santos |
| `1.1` | 04/06/2026 | Padronização do formato do documento | Pedro Henrique P. Santos |
| `1.2` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `2.0` | 21/06/2026 | Migração de GCS/Disco Local para Supabase Storage via S3 | Pedro Henrique P. Santos |
