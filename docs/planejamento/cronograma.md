# :material-calendar-check: Cronograma e Sprints

Planejamento de desenvolvimento do EdTech, organizado em sprints semanais com entregas incrementais.

---

## Roadmap Geral

```mermaid
gantt
    title Roadmap EdTech - Fase 2
    dateFormat YYYY-MM-DD
    axisFormat %d/%m

    section Fundacao
        Setup do repositorio e CI/CD       :done, s1a, 2026-05-12, 7d
        Estrutura MkDocs e docs iniciais    :done, s1b, 2026-05-12, 7d
        Docker Compose e ambiente local     :done, s1c, 2026-05-12, 7d

    section Autenticacao
        Modelagem do banco de dados         :active, s2a, 2026-05-19, 7d
        API de registro e login             :active, s2b, 2026-05-19, 7d
        JWT e Cookies seguros               :active, s2c, 2026-05-19, 7d
        Frontend de login                   :active, s2d, 2026-05-19, 7d

    section Upload e Documentos
        API de upload de documentos         :s3a, 2026-05-26, 7d
        Integracao com Cloud Storage        :s3b, 2026-05-26, 7d
        Listagem filtrada por usuario       :s3c, 2026-05-26, 7d

    section Orientador e Isolamento
        Painel do orientador                :s4a, 2026-06-02, 7d
        Isolamento de dados por projeto     :s4b, 2026-06-02, 7d
        Validacao de submissoes             :s4c, 2026-06-02, 7d

    section Auditoria e Deploy
        Sistema de audit logs               :s5a, 2026-06-09, 7d
        Testes e2e e integracao             :s5b, 2026-06-09, 7d
        Deploy em Cloud Run                 :s5c, 2026-06-09, 7d
```

---

## Estrutura das Sprints

Cada sprint tem duração de **1 semana** e segue o ciclo:

```mermaid
flowchart LR
    A["Planning\n(segunda)"] --> B["Desenvolvimento\n(terca-quinta)"]
    B --> C["Code Review\n(sexta)"]
    C --> D["Merge e Deploy\n(sexta)"]
    D --> E["Retrospectiva\n(sexta)"]
    E --> A

    style A fill:#e8eaf6,stroke:#3949ab
    style B fill:#f3e5f5,stroke:#7b1fa2
    style C fill:#fff3e0,stroke:#ef6c00
    style D fill:#e8f5e9,stroke:#2e7d32
    style E fill:#fce4ec,stroke:#c62828
```

---

## Fluxo de Desenvolvimento

### Branches

| Branch | Propósito | Proteção |
| :--- | :--- | :---: |
| `main` | Branch estável de deploy | :material-lock: Protegida |
| `feat/*` | Funcionalidades novas | — |
| `fix/*` | Correções de bugs | — |
| `docs/*` | Atualizações de documentação | — |
| `refactor/*` | Melhorias de código | — |

!!! warning "Regra de Ouro"
    **Nunca commitar diretamente na `main`.** Toda integração ocorre exclusivamente via Pull Requests revisados pela liderança técnica.

### Fluxo de uma Feature

```mermaid
gitgraph
    commit id: "main"
    branch feat/auth
    commit id: "feat: user model"
    commit id: "feat: login endpoint"
    commit id: "feat: jwt cookie auth"
    checkout main
    merge feat/auth id: "PR 1 - Auth"
    branch feat/upload
    commit id: "feat: upload"
    commit id: "feat: gcs integration"
    checkout main
    merge feat/upload id: "PR 2 - Upload"
```

---

## Convenção de Commits

Todos os commits seguem o padrão **Conventional Commits** para rastreabilidade:

| Tipo | Prefixo | Quando usar | Exemplo |
| :--- | :---: | :--- | :--- |
| Funcionalidade | `feat` | Nova feature | `feat: implement secure jwt cookie storage` |
| Correção | `fix` | Bug fix | `fix: adjust spring security blocking path` |
| Documentação | `docs` | Docs somente | `docs: update mkdocs architecture guides` |
| Refatoração | `refactor` | Melhoria sem mudar comportamento | `refactor: optimize postgresql connection pooling` |

!!! example "Formato completo"
    ```
    tipo: descrição curta em inglês (imperativo)

    Corpo opcional com mais detalhes sobre a mudança.

    Refs: #issue-number
    ```

---

## Marcos do Projeto

| Marco | Data | Status |
| :--- | :---: | :---: |
| Setup completo (repo + CI/CD + docs) | 18/05 | :material-check-circle:{ .green } Concluído |
| Autenticação funcional (login + JWT) | 25/05 | :material-progress-clock: Em andamento |
| Upload e listagem de documentos | 01/06 | :material-circle-outline: Pendente |
| Painel do orientador + isolamento | 08/06 | :material-circle-outline: Pendente |
| Auditoria + deploy final | 15/06 | :material-circle-outline: Pendente |
