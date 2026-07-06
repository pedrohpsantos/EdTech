---
title: 'ADR 0007: Versionamento de Banco de Dados com Flyway'
---

# :material-text-box-check: ADR 0007: Versionamento de Banco de Dados com Flyway

## Status

Aceito

## Contexto

Como escolhemos um banco de dados relacional (PostgreSQL - ADR 0004), o esquema do banco de dados evoluirá ao longo do tempo (criação de tabelas de log, membros, projetos, etc.). Em ambientes distribuídos e equipes colaborativas, alterações manuais de DDL (Data Definition Language) via scripts SQL pontuais geram inconsistências graves entre ambientes (Dev, Homologação e Produção), dificultando rastreabilidade e causando "quebras" durante o deploy da aplicação.

## Decisão

Optamos por adotar o **Flyway** como ferramenta de migração contínua e versionamento do esquema do banco de dados.

## Consequências

### Positivas

- **Controle de Versão:** Todos os scripts SQL ficam armazenados no próprio repositório (ex: `V1__init.sql`), garantindo que o esquema acompanhe exatamente a versão do código-fonte.

- **Automação:** O Flyway se integra nativamente ao Spring Boot (ADR 0005), executando as migrações automaticamente no momento em que a aplicação "sobe", sem necessidade de intervenção humana (Zero-downtime migrations se bem planejadas).

- **Rastreabilidade:** Cria uma tabela de histórico automática no PostgreSQL, permitindo saber exatamente quando cada migração foi aplicada.

### Negativas / Riscos

- **Rigidez:** Uma vez que uma migração é aplicada, ela não deve ser alterada. Erros em scripts requerem a criação de novos scripts de reparo, o que exige disciplina do time para não alterar arquivos antigos no Git.

- **Rollback complexo:** Reverter versões do banco de dados com Flyway na versão comunitária exige scripts de "undo" geridos manualmente ou estratégias cuidadosas de compatibilidade retroativa.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `1.2` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |


