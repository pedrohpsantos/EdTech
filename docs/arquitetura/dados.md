# :material-database: Arquitetura de Dados

A camada de persistência garante os pilares de confidencialidade e trilha de autoria. O sistema não permite apagar dados de auditoria e garante forte integridade referencial.

## Diagrama Entidade-Relacionamento (ERD)

```mermaid
flowchart LR
    %%{init: {"flowchart": {"nodeSpacing": 60, "rankSpacing": 80}}}%%
    U["users<br>id PK<br>name<br>email UK<br>role"]
    P["projects<br>id PK<br>title<br>owner_id FK"]
    PM["project_members<br>id PK<br>project_id FK<br>user_id FK"]
    D["documents<br>id PK<br>title<br>gcs_path<br>author_id FK<br>project_id FK"]
    AL["audit_logs<br>id PK<br>action<br>resource_type<br>resource_id"]

    U -->|uploads| D
    U -->|creates| P
    U -->|generates| AL
    P -->|contains| D
    P -->|has| PM
    U -->|participates| PM
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
