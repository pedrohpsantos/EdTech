# :material-database: Arquitetura de Dados

A camada de persistência garante os pilares de confidencialidade e trilha de autoria. O sistema não permite apagar dados de auditoria e garante forte integridade referencial.

## Diagrama Entidade-Relacionamento (ERD)

```mermaid
erDiagram
    users ||--o{ documents : "uploads"
    users ||--o{ projects : "creates"
    users ||--o{ audit_logs : "generates"
    projects ||--o{ documents : "contains"
    projects ||--o{ project_members : "has"
    users ||--o{ project_members : "participates"

    users {
        bigint id PK
        varchar name
        varchar email UK
        varchar role "researcher, advisor, auditor"
    }
    projects {
        bigint id PK
        varchar title
        bigint owner_id FK
    }
    project_members {
        bigint id PK
        bigint project_id FK
        bigint user_id FK
    }
    documents {
        bigint id PK
        varchar title
        varchar gcs_path
        bigint author_id FK
        bigint project_id FK
    }
    audit_logs {
        bigint id PK
        varchar action
        varchar resource_type
        bigint resource_id
    }
```

## Regras de Isolamento (Multi-tenancy Lógico)
Um Orientador (`advisor`) só consegue consultar metadados e arquivos dos artefatos de projetos nos quais ele está listado explicitamente na tabela de junção `project_members`. Consultas SQL abstraídas via JPA forçam *Query Filters* em tempo de compilação usando este relacionamento.

## Evolução do Esquema (Migrations)
Utilizamos a ferramenta **Flyway** atrelada ao build do Spring Boot. Nenhum script DDL (Data Definition Language) pode ser rodado manualmente no Cloud SQL; todas as criações de tabelas e índices estão versionadas dentro da pasta `src/main/resources/db/migration`.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Criação do documento | Pedro Henrique P. Santos |
