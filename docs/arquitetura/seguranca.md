# :material-shield-lock: Segurança e JWT

Guia completo da estratégia de segurança do EdTech, cobrindo autenticação, autorização, proteção de sessão e auditoria.

---

## Visão Geral

O EdTech utiliza **Spring Security** como camada de segurança, com autenticação baseada em **JWT (JSON Web Tokens)** transmitidos via **cookies seguros** — nunca via `localStorage` ou `sessionStorage`.

```mermaid
sequenceDiagram
    participant C as Cliente
    participant S as Spring Boot
    participant DB as PostgreSQL

    C->>S: POST /api/auth/login (email, senha)
    S->>DB: Valida credenciais
    DB-->>S: Usuario encontrado
    S->>S: Gera JWT (payload: id, role, exp)
    S-->>C: Set-Cookie: token=JWT (HttpOnly, Secure, SameSite)
    Note over C: Cookie armazenado pelo navegador

    C->>S: GET /api/documents (Cookie: token=JWT)
    S->>S: Valida JWT e extrai claims
    S->>DB: Query filtrada por role + user_id
    DB-->>S: Documentos do usuario
    S-->>C: 200 OK + JSON
```

---

## Configuração de Cookies

Os tokens JWT são transmitidos exclusivamente via cookies com as seguintes flags:

| Flag | Valor | Proteção |
| :--- | :---: | :--- |
| `HttpOnly` | `true` | Impede acesso via JavaScript (proteção contra **XSS**) |
| `Secure` | `true` | Cookie só é enviado em conexões **HTTPS** |
| `SameSite` | `Strict` | Impede envio em requisições cross-site (proteção contra **CSRF**) |
| `Max-Age` | `3600` | Expiração de 1 hora |
| `Path` | `/api` | Cookie limitado às rotas da API |

!!! danger "Por que NÃO usar localStorage?"
    Qualquer script injetado (XSS) pode ler o `localStorage` e roubar tokens. Com `HttpOnly`, o cookie é **invisível** para o JavaScript, tornando o roubo de sessão drasticamente mais difícil.

---

## Roles e Permissões

O Spring Security aplica autorização baseada em roles em todas as rotas da API:

```mermaid
flowchart LR
    subgraph Publico
        A["/api/auth/login"]
        B["/api/auth/register"]
    end

    subgraph Researcher
        C["/api/documents"]
        D["/api/documents/upload"]
    end

    subgraph Advisor
        E["/api/documents do projeto"]
        F["/api/projects"]
    end

    subgraph Auditor
        G["/api/audit-logs"]
    end

    style Publico fill:#e8f5e9,stroke:#2e7d32
    style Researcher fill:#e3f2fd,stroke:#1565c0
    style Advisor fill:#f3e5f5,stroke:#7b1fa2
    style Auditor fill:#fff3e0,stroke:#ef6c00
```

| Rota | Roles permitidos | Descrição |
| :--- | :---: | :--- |
| `POST /api/auth/login` | Público | Autenticação |
| `POST /api/auth/register` | Público | Cadastro de pesquisador |
| `GET /api/documents` | `researcher`, `advisor` | Listar documentos (filtrado por role) |
| `POST /api/documents/upload` | `researcher` | Upload de novo documento |
| `GET /api/projects` | `advisor` | Listar projetos do orientador |
| `GET /api/audit-logs` | `auditor` | Consultar logs de auditoria |

---

## Fluxo de Autorização

Toda requisição autenticada passa pelo seguinte filtro no Spring Security:

```mermaid
flowchart TD
    A["Request HTTP"] --> B{"Cookie token presente?"}
    B -->|Nao| C["401 Unauthorized"]
    B -->|Sim| D{"JWT valido e nao expirado?"}
    D -->|Nao| E["401 Unauthorized"]
    D -->|Sim| F{"Role tem permissao na rota?"}
    F -->|Nao| G["403 Forbidden"]
    F -->|Sim| H["Processa request"]
    H --> I["Registra audit_log"]

    style C fill:#ffcdd2,stroke:#c62828
    style E fill:#ffcdd2,stroke:#c62828
    style G fill:#fff9c4,stroke:#f57f17
    style H fill:#c8e6c9,stroke:#2e7d32
    style I fill:#e8eaf6,stroke:#3949ab
```

---

## Logs de Auditoria

Todas as ações de segurança geram registros imutáveis na tabela `audit_logs`:

| Ação | Descrição | Severidade |
| :--- | :--- | :---: |
| `LOGIN_SUCCESS` | Login bem-sucedido | :material-information: Info |
| `LOGIN_FAILED` | Senha incorreta ou usuário inexistente | :material-alert: Warning |
| `LOGOUT` | Logout explícito | :material-information: Info |
| `ACCESS_DENIED` | Tentativa de acessar recurso sem permissão | :material-alert-octagon: Critical |
| `TOKEN_EXPIRED` | JWT expirado em request autenticada | :material-alert: Warning |
| `UPLOAD_SUCCESS` | Documento enviado com sucesso | :material-information: Info |
| `DOCUMENT_DELETED` | Documento removido pelo autor | :material-alert: Warning |

!!! info "Campos registrados em cada log"
    Cada entrada registra: `user_id`, `action`, `resource_type`, `resource_id`, `ip_address`, `timestamp` e um campo `details` em JSON com informações adicionais como user-agent e payload.

---

## Boas Práticas Implementadas

<div class="grid cards" markdown>

- :material-key-variant: **Senhas com Bcrypt**

    ---

    Senhas nunca são armazenadas em texto puro. Utilizamos `BCryptPasswordEncoder` do Spring Security com fator de custo 12.

- :material-timer-sand: **Expiração de Tokens**

    ---

    Tokens JWT expiram em **1 hora**. O refresh é feito via re-autenticação — sem refresh tokens para reduzir superfície de ataque.

- :material-bug-check: **Proteção contra Enumeração**

    ---

    As respostas de login retornam mensagens genéricas (`Credenciais inválidas`) para evitar que atacantes descubram e-mails cadastrados.

- :material-certificate: **HTTPS Obrigatório**

    ---

    Cloud Run aplica HTTPS por padrão. Cookies `Secure` garantem que tokens nunca trafeguem em HTTP.

</div>


---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 29/05/2026 | Criação do documento | Pedro Henrique P. Santos |
