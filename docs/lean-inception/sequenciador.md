# :material-view-sequential: Sequenciador de Funcionalidades

Organização das funcionalidades em ondas de entrega, respeitando dependências técnicas e valor de negócio.

---

## Regras do Sequenciador

!!! info "Critérios de ordenação"
    1. **Cada onda** deve ter no máximo **3 funcionalidades** de alta complexidade
    2. **Dependências** técnicas determinam a ordem entre ondas
    3. Funcionalidades de **maior valor** e **menor esforço** vêm primeiro
    4. O **MVP** é composto pelas **Ondas 1 e 2**

---

## Ondas de Entrega

```mermaid
flowchart TB
    subgraph Onda1["🌊 Onda 1 — Fundação"]
        F01["F01: Cadastro"]
        F02["F02: Login JWT"]
        F03["F03: Logout"]
        F04["F04: Filtro Auth"]
        F18["F18: Log login/logout"]
    end

    subgraph Onda2["🌊 Onda 2 — Core"]
        F07["F07: Upload PDF"]
        F09["F09: Cloud Storage"]
        F10["F10: Listagem filtrada"]
        F11["F11: Download"]
        F19["F19: Log uploads"]
    end

    subgraph Onda3["🌊 Onda 3 — Orientador"]
        F13["F13: Painel orientador"]
        F14["F14: Docs orientandos"]
        F15["F15: Isolamento"]
        F20["F20: Log acesso negado"]
    end

    subgraph Onda4["🌊 Onda 4 — Refinamento"]
        F05["F05: Token expirado"]
        F08["F08: Upload datasets"]
        F12["F12: Exclusão rascunhos"]
        F16["F16: Aprovação"]
        F21["F21: Filtros auditoria"]
    end

    Onda1 --> Onda2
    Onda2 --> Onda3
    Onda3 --> Onda4

    style Onda1 fill:#e8eaf6,stroke:#3949ab
    style Onda2 fill:#f3e5f5,stroke:#7b1fa2
    style Onda3 fill:#e0f7fa,stroke:#00838f
    style Onda4 fill:#fff3e0,stroke:#ef6c00
```

---

## Detalhamento por Onda

### :material-numeric-1-circle: Onda 1 — Fundação (Sprint 2)

| Funcionalidade | Esforço | Valor | Responsável |
| :--- | :---: | :---: | :---: |
| F01: Cadastro de pesquisador | Médio | Alto | Full Stack (Backend) |
| F02: Login com JWT | Alto | Alto | Full Stack (Backend) |
| F03: Logout com invalidação | Baixo | Alto | Full Stack (Backend) |
| F04: Filtro de autenticação | Alto | Alto | Full Stack (Backend) + Tech Lead |
| F18: Log de login/logout | Baixo | Médio | Full Stack (Docs & Logs) |

### :material-numeric-2-circle: Onda 2 — Core (Sprint 3)

| Funcionalidade | Esforço | Valor | Responsável |
| :--- | :---: | :---: | :---: |
| F07: Upload de PDF | Médio | Alto | Full Stack (Backend) |
| F09: Integração GCS | Alto | Alto | Full Stack (DevOps) |
| F10: Listagem filtrada | Médio | Alto | Full Stack (Frontend + Backend) |
| F11: Download de documentos | Baixo | Alto | Full Stack (Backend) |
| F19: Log de uploads | Baixo | Médio | Full Stack (Docs & Logs) |

### :material-numeric-3-circle: Onda 3 — Orientador (Sprint 4)

| Funcionalidade | Esforço | Valor | Responsável |
| :--- | :---: | :---: | :---: |
| F13: Painel do orientador | Alto | Alto | Full Stack (Frontend) |
| F14: Visualização de docs | Médio | Alto | Full Stack (Frontend + Backend) |
| F15: Isolamento por projeto | Alto | Alto | Full Stack (Backend) + Tech Lead |
| F20: Log de acesso negado | Baixo | Médio | Full Stack (Docs & Logs) |

### :material-numeric-4-circle: Onda 4 — Refinamento (Sprint 5)

| Funcionalidade | Esforço | Valor | Responsável |
| :--- | :---: | :---: | :---: |
| F05: Token expirado | Baixo | Médio | Full Stack (Backend) |
| F08: Upload de datasets | Baixo | Médio | Full Stack (Backend) |
| F12: Exclusão de rascunhos | Baixo | Médio | Full Stack (Backend) |
| F16: Aprovação de submissões | Médio | Médio | Full Stack (Frontend + Backend) |
| F21: Filtros de auditoria | Médio | Médio | Full Stack (QA) |


---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 29/05/2026 | Criação do documento | Pedro Henrique P. Santos |
