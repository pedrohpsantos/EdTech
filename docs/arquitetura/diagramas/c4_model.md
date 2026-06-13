---
description: C4 Model do EdTech — Diagramas de Contexto e Container da arquitetura do sistema.
---

# :material-vector-arrange-below: C4 Model (Contexto e Containers)

O projeto adota o **C4 Model** (desenvolvido por Simon Brown), uma taxonomia padrão de mercado para visualização de arquitetura de software de forma clara para desenvolvedores e stakeholders de negócios.

## Nível 1: Diagrama de Contexto de Sistema

O Diagrama de Contexto mostra o sistema EdTech no centro, rodeado pelos seus atores (Personas) e sistemas externos com os quais ele interage.

```mermaid
%%{init: {"theme": "base", "flowchart": {"nodeSpacing": 60, "rankSpacing": 80, "curve": "basis"}}}%%
flowchart LR
    Pesq["Pesquisadora"]
    Ori["Orientador"]
    Aud["Auditora"]

    EdTech["Plataforma"]

    subgraph GCP["Google Cloud"]
        GCS["GCS"]
    end

    Pesq -->|Login e Upload| EdTech
    Ori -->|Gestão de Projetos| EdTech
    Aud -->|Auditoria| EdTech
    EdTech -->|Arquivos| GCS
```

### Walkthrough do diagrama

A plataforma centraliza a interação de pesquisa, orientação e auditoria, enquanto o GCS atua como storage externo para arquivos de pesquisa.

## Nível 2: Diagrama de Container

No C4 Model, um "Container" representa algo que precisa estar rodando para que o sistema funcione (uma API, um App Web, um Banco de Dados).

```mermaid
%%{init: {"theme": "base", "flowchart": {"nodeSpacing": 60, "rankSpacing": 80, "curve": "basis"}}}%%
flowchart LR
    Usu["Usuario"]

    subgraph EdTech["Plataforma"]
        direction LR
        SPA["SPA"]
        API["Backend API"]
        DB["PostgreSQL"]
    end

    subgraph Suporte["Servicos de Suporte"]
        direction TB
        Auth["Auth Module"]
        Audit["Audit Service"]
    end

    GCS["GCS"]

    Usu -->|HTTPS| SPA
    SPA -->|API| API
    API -->|SQL| DB
    API -->|Objetos| GCS
    Auth -.->|JWT| API
    Audit -.->|Eventos| API

    classDef support fill:#eef2ff,stroke:#6c7cff,color:#1a1a1a;
    class Auth,Audit support;
```

### Walkthrough do diagrama

O fluxo principal segue da esquerda para a direita (Usuário → SPA → API → DB/GCS), com autenticação e auditoria como serviços auxiliares conectados à API.

---

## Histórico de Versões

| Versão |    Data    | Descrição                                      | Autor                    |
| :---: | :---: | :--- | :--- |
| `1.0`  | 30/05/2026 | Diagramas C4 para documentação ágil de mercado | Pedro Henrique P. Santos |
| `1.1`  | 30/05/2026 | Refinamento visual dos diagramas C4            | Pedro Henrique P. Santos |
| 1.2 | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
