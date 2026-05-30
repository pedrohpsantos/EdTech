# :material-vector-arrange-below: C4 Model (Contexto e Containers)

Para substituir mapas mentais acadêmicos e diagramas rígidos, o projeto adota o **C4 Model** (desenvolvido por Simon Brown), uma taxonomia padrão de mercado para visualização de arquitetura de software de forma clara para desenvolvedores e stakeholders de negócios.

## Nível 1: Diagrama de Contexto de Sistema

O Diagrama de Contexto mostra o sistema EdTech no centro, rodeado pelos seus atores (Personas) e sistemas externos que ele interage.

```mermaid
flowchart LR
    %%{init: {"flowchart": {"nodeSpacing": 60, "rankSpacing": 80}}}%%
    Pesq["Pesquisadora (Ana)"]
    Ori["Orientador (Carlos)"]
    Aud["Auditora (Márcia)"]

    EdTech["Plataforma de Repositório"]

    subgraph GCP["Google Cloud Platform"]
        GCS["Google Cloud Storage"]
    end

    Pesq -->|Autentica e Faz Upload| EdTech
    Ori -->|Gerencia projetos e aprova teses| EdTech
    Aud -->|Consulta e exporta logs imutáveis| EdTech
    EdTech -->|Envia Arquivos| GCS
```

## Nível 2: Diagrama de Container

No C4 Model, um "Container" representa algo que precisa estar rodando para que o sistema funcione (uma API, um App Web, um Banco de Dados).

```mermaid
flowchart LR
    %%{init: {"flowchart": {"nodeSpacing": 60, "rankSpacing": 80}}}%%
    Usu["Usuário Logado"]

    subgraph EdTech["Plataforma de Repositório"]
        SPA["Frontend (React/Vue)"]
        API["Backend API (Spring Boot)"]
        DB["Banco de Dados (PostgreSQL)"]
    end

    GCS["Cloud Storage (Google)"]

    Usu -->|HTTPS| SPA
    SPA -->|JSON HTTPS| API
    API -->|TCP/IP| DB
    API -->|gRPC| GCS
```

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Diagramas C4 para documentação ágil de mercado | Pedro Henrique P. Santos |
