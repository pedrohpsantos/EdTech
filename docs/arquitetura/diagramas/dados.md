---
title: 'Arquitetura de Dados'
---

# :material-database: Arquitetura de Dados

A camada de persistência garante os pilares de confidencialidade e trilha de autoria. O sistema não permite apagar dados de auditoria e garante forte integridade referencial.

## Diagrama Entidade-Relacionamento (ERD)

```mermaid
%%{init: {"theme": "base"}}%%
erDiagram
    direction LR

    USUARIO {
        string nome
        string email
        string papel
    }

    PROJETO {
        string titulo
        string orientador
        boolean deleted
    }

    DOCUMENTO {
        string titulo
        string arquivo_pdf
        string status
        boolean deleted
        string feedback
    }

    AUDITORIA {
        string acao
        datetime data
    }

    VERIFICATION_TOKEN {
        string token
        datetime expires_at
    }

    USUARIO }o--o{ PROJETO : participa
    PROJETO ||--o{ DOCUMENTO : possui
    USUARIO ||--o{ AUDITORIA : gera
    USUARIO ||--o| VERIFICATION_TOKEN : "confirma 2FA"
```

### Walkthrough do diagrama

O ERD resume as entidades centrais e suas relações principais: usuários participam de projetos, projetos possuem documentos e usuários geram auditoria. A entidade de token lida com autenticação e validações temporárias.

## Regras de Isolamento (Multi-tenancy Lógico)
Um Orientador (`advisor`) só consegue consultar metadados e arquivos dos artefatos de projetos nos quais ele está listado explicitamente na tabela de junção `project_members`. Consultas SQL abstraídas via JPA forçam *Query Filters* em tempo de compilação usando este relacionamento.

## Evolução do Esquema (Migrations)
Utilizamos a ferramenta **Flyway** atrelada ao build do Spring Boot. Nenhum script DDL (Data Definition Language) pode ser rodado manualmente no Cloud SQL; todas as criações de tabelas e índices estão versionadas dentro da pasta `src/main/resources/db/migration`.

---

## Histórico de Versões

| Versão |    Data    | Descrição                                 | Autor                    |
| :---: | :---: | :--- | :--- |
| `1.0`  | 30/05/2026 | Criação do documento                      | Pedro Henrique P. Santos |
| `1.1`  | 30/05/2026 | ERD simplificado com foco em legibilidade | Pedro Henrique P. Santos |
| `1.2` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `1.3` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |
| `1.4` | 11/07/2026 | Inclusão de VerificationToken, flags de soft-delete e feedback | Pedro Henrique P. Santos |
