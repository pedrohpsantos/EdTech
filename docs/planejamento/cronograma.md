# :material-calendar-check: Cronograma e Sprints

Planejamento de desenvolvimento do EdTech, organizado em sprints semanais com entregas incrementais.

---

## Roadmap Geral

<div style="overflow-x: auto; min-width: 100%;" markdown="1">
```mermaid
gantt
    title Roadmap EdTech - Ciclos e Sprints
    dateFormat YYYY-MM-DD
    axisFormat %d/%m

    section S1: Fundacao
        Setup, Docker, Docs, Stack          :done, s1, 2026-05-12, 7d

    section S2: Planejamento
        Lean Inception, Requisitos, Arq     :done, s2, 2026-05-19, 7d

    section S3: MVP 1 (Auth)
        API de registro e login             :active, s3a, 2026-05-26, 7d
        JWT e Cookies seguros               :active, s3b, 2026-05-26, 7d
        Frontend de Autenticacao            :active, s3c, 2026-05-26, 7d

    section S4: MVP 2 (Upload)
        Integracao Google Cloud Storage     :s4a, 2026-06-02, 7d
        API de upload de documentos         :s4b, 2026-06-02, 7d
        Listagem filtrada por usuario       :s4c, 2026-06-02, 7d

    section S5: MVP 3 (Orientador)
        Painel do Orientador                :s5a, 2026-06-09, 7d
        Isolamento de dados por projeto     :s5b, 2026-06-09, 7d
        Logs de Auditoria e Testes e2e      :s5c, 2026-06-09, 7d
```
</div>

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
    branch "feat/auth"
    commit id: "feat: user model"
    commit id: "feat: login endpoint"
    commit id: "feat: jwt cookie auth"
    checkout main
    merge "feat/auth" id: "PR-1-Auth"
    branch "feat/upload"
    commit id: "feat: upload"
    commit id: "feat: gcs integration"
    checkout main
    merge "feat/upload" id: "PR-2-Upload"
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

| Marco | Data Prevista | Status |
| :--- | :---: | :---: |
| **S1:** Setup completo (repo, infra, docs) | 18/05 | :material-check-circle:{ .green } Concluído |
| **S2:** Lean Inception e Arquitetura fechados | 25/05 | :material-check-circle:{ .green } Concluído |
| **S3:** Autenticação funcional (API + Frontend) | 01/06 | :material-progress-clock: Em andamento |
| **S4:** Upload de documentos no GCS | 08/06 | :material-circle-outline: Pendente |
| **S5:** Fluxo do Orientador, Auditoria e Deploy | 15/06 | :material-circle-outline: Pendente |
