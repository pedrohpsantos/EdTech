# :material-shield-lock: AppSec e Segurança

A proteção do EdTech gira em torno de duas engrenagens centrais: Autenticação Restrita (JWT em cookies) e Log de Auditoria irrefutável.

## 1. Segurança de Sessão (JWT)

A aplicação não armazena sessão em banco ou memória do servidor (`STATELESS`).

### Confinamento do Cookie
Para evitar roubo de token, o token JWT nunca deve ser lido pelo código JavaScript do frontend. O Backend Spring devolve o cookie configurado com defesas embutidas para o navegador:
    
- **`HttpOnly`:** Bloqueia leituras via JavaScript (`document.cookie`), blindando o sistema contra XSS.
- **`Secure`:** Exige tráfego via HTTPS.
- **`SameSite=Strict`:** Impede ataques CSRF bloqueando envios em sites de terceiros.

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
flowchart TD
    %%{init: {"flowchart": {"nodeSpacing": 60, "rankSpacing": 80}}}%%
    Atacante["Atacante Externo"]
    FE["Frontend Web"]
    API["Backend API"]
    Token["JWT Validation"]
    DB["Banco de Dados"]

    Atacante -->|XSS / Phishing| FE
    Atacante -->|Força Bruta / Injeção| API
    FE --> API
    API --> Token
    Token -->|Falha: Bloqueio 401/403| API
    Token -->|Sucesso: Autorizado| DB
    
    style Atacante fill:#ffcccc,stroke:#cc0000,color:#000
    style Token fill:#ccffcc,stroke:#00cc00,color:#000
```

### Fluxo de Auditoria

```mermaid
sequenceDiagram
    participant U as Usuário / Sistema
    participant S as Sistema Principal
    participant A as Serviço de Auditoria
    participant L as Banco de Logs
    participant Aud as Auditora

    U->>S: Executa Ação Sensível
    S->>A: Dispara Evento Assíncrono
    A->>L: Armazena Log Imutável
    Aud->>A: Consulta Filtro de Logs
    A->>L: Busca Registros
    L-->>A: Retorna Dados
    A-->>Aud: Exibe Relatório de Segurança
```

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Criação do documento | Pedro Henrique P. Santos |
