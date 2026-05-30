# Visão de Processos

A modelagem da dinâmica do sistema em tempo de execução revela como os objetos de domínio interagem durante os fluxos transacionais e de negócio.

## 1. Diagrama de Classes (Domínio Principal)

A estrutura semântica dos dados reflete as entidades de negócio em memória e seus relacionamentos diretos:

```mermaid
classDiagram
    class User {
        +Long id
        +String name
        +String email
        +String password_hash
        +Role role
        +boolean active
    }
    class Project {
        +Long id
        +String title
        +String description
        +Long owner_id
        +boolean archived
    }
    class ProjectMember {
        +Long id
        +Role role
        +Date joined_at
    }
    class Document {
        +Long id
        +String title
        +String gcs_path
        +Type type
        +Status status
        +Long file_size_bytes
    }
    class AuditLog {
        +Long id
        +String action
        +String resource_type
        +Long resource_id
        +String ip_address
        +String details
    }

    User "1" -- "*" Document : uploads
    User "1" -- "*" Project : creates
    User "1" -- "*" AuditLog : generates
    Project "1" -- "*" Document : contains
    User "1" -- "*" ProjectMember : participates
    Project "1" -- "*" ProjectMember : has
```

---

## 2. Diagrama de Sequência: Upload e Auditoria

O fluxo crítico de negócio envolvendo a submissão de um documento acadêmico e seu correlato registro de segurança imutável:

```mermaid
sequenceDiagram
    participant FE as Frontend (Pesquisador)
    participant Auth as Auth Filter (Spring Security)
    participant C as DocumentController
    participant S as DocumentService
    participant R as DocumentRepository
    participant Audit as AuditService
    participant GCS as Cloud Storage
    participant DB as PostgreSQL

    FE->>Auth: POST /api/documents/upload (File + Metadata)
    Auth->>Auth: Validate JWT & Extract UserID (Role: Researcher)
    Auth->>C: Forward Request
    C->>S: uploadDocument(file, metadata, userId)
    S->>GCS: Salvar binario do arquivo
    GCS-->>S: Retorna GCS Path (URI)
    S->>R: INSERT INTO documents (title, path, author_id, ...)
    R->>DB: Executa commit no banco
    DB-->>R: Retorna Entidade Salva
    S->>Audit: logAction("UPLOAD_SUCCESS", userId, docId)
    Audit->>DB: INSERT INTO audit_logs (...)
    S-->>C: Document DTO
    C-->>FE: 201 Created (Document Metadata)
```
