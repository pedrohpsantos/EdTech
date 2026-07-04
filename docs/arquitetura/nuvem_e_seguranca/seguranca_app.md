---
title: 'AppSec e Segurança'
---

# :material-shield-lock: AppSec e Segurança

A proteção do EdTech gira em torno de duas engrenagens centrais: Autenticação Restrita (JWT em cookies) e Log de Auditoria irrefutável.

## 1. Segurança de Sessão (JWT)

A aplicação não armazena sessão em banco ou memória do servidor (`STATELESS`).

### Confinamento do Cookie
Para evitar roubo de token, o token JWT nunca deve ser lido pelo código JavaScript do frontend. O Backend Spring devolve o cookie configurado com defesas embutidas para o navegador:

    
- **`HttpOnly`:** Bloqueia leituras via JavaScript (`document.cookie`), blindando o sistema contra XSS.

- **`Secure`:** Exige tráfego via HTTPS.

- **`SameSite=Lax`:** Permite navegações top-level e requisições cross-origin autenticadas via CORS, enquanto mitiga ataques CSRF de sites de terceiros.

## 2. Controle de Acesso Baseado em Papéis (RBAC)

O sistema barra usuários em rotas específicas baseado em seu perfil institucional:

| Papel (Role) | Permissão de Rota Restrita | Comportamento Bloqueado |
| :--- | :--- | :--- |
| `researcher` | `/api/documents/upload` | Não pode ver documentos de colegas que não sejam do seu laboratório. |
| `advisor` | `/api/projects/{id}/validation` | Não pode aprovar projetos de outros orientadores. |
| `auditor` | `/api/audit-logs/` | É a única pessoa que pode ler os acessos de quebra de sigilo. |

## 3. Dinâmica do Processo Seguro (Diagrama de Upload)

O diagrama abaixo prova que todo evento de negócio vital resulta inexoravelmente num log de auditoria no banco.

```mermaid
sequenceDiagram
    participant U as Usuário
    participant L as Frontend Login
    participant S as Spring Security
    participant J as JWT Provider

    U->>L: Insere Credenciais
    L->>S: POST /auth/login
    S->>S: Valida Hash no Banco
    S->>J: Solicita Geração de Token
    J-->>S: Retorna Token Assinado
    S-->>L: Retorna Cookie HttpOnly (JWT)
    L-->>U: Redireciona para Dashboard
```

### Modelo de Ameaças

```mermaid
%%{init: {"theme": "base", "flowchart": {"nodeSpacing": 60, "rankSpacing": 80, "curve": "basis"}}}%%
flowchart LR
    subgraph Atores["Atores Hostis"]
        AE["Atacante Externo"]
        UM["Usuário Mal-Intencionado"]
    end

    subgraph Vetores["Vetores"]
        SQL["Injeção SQL"]
        XSS["XSS"]
        SP["Spoofing Auth"]
        TAM["Tampering Arquivos"]
    end

    subgraph Ativos["Pontos de Entrada / Ativos"]
        FE["Frontend"]
        API["Endpoints API"]
        DB["Banco de Dados"]
        GCS["GCS"]
    end

    subgraph Controles["Controles"]
        WAF["WAF"]
        JWT["JWT HttpOnly"]
        VAL["Validação de Input"]
        LOG["Logs Imutáveis"]
    end

    AE --> SQL
    AE --> XSS
    UM --> SP
    UM --> TAM

    SQL --> API
    SQL --> DB
    XSS --> FE
    SP --> API
    TAM --> DB
    TAM --> GCS

    FE --> JWT
    API --> WAF
    API --> VAL
    DB --> LOG
    GCS --> LOG

    classDef threat fill:#ffe5e5,stroke:#cc3b3b,color:#1a1a1a;
    classDef asset fill:#f4f5f7,stroke:#9aa0a6,color:#1a1a1a;
    classDef control fill:#e7f5ff,stroke:#2f7dd1,color:#1a1a1a;
    class AE,UM,SQL,XSS,SP,TAM threat;
    class FE,API,DB,GCS asset;
    class WAF,JWT,VAL,LOG control;
```

### Walkthrough do diagrama

Atores hostis disparam vetores de ataque que impactam os pontos de entrada e ativos, enquanto os controles mitigam as superfícies críticas do frontend, API e persistência.

---

## Histórico de Versões

| Versão |    Data    | Descrição                                | Autor                    |
| :---: | :---: | :--- | :--- |
| `1.0`  | 30/05/2026 | Criação do documento                     | Pedro Henrique P. Santos |
| `1.1`  | 30/05/2026 | Refino do threat model e estilos visuais | Pedro Henrique P. Santos |
| `1.2` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `2.0` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |

