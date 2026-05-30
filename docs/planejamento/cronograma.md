# :material-calendar-check: Cronograma e Sprints

Planejamento de desenvolvimento do EdTech, organizado em sprints semanais com entregas incrementais.

---

## Roadmap Geral

```mermaid
gantt
    title Cronograma de Desenvolvimento (Sprints)
    dateFormat YYYY-MM-DD
    axisFormat %d/%m

    section Fase 1
    Requisitos e Lean Inception      :done, f1, 2026-05-12, 7d
    Arquitetura de Software          :done, f2, 2026-05-19, 7d

    section Fase 2
    Backend (Autenticação JWT)       :active, f3, 2026-05-26, 7d
    Frontend (Tela de Login)         :active, f4, 2026-05-26, 7d

    section Fase 3
    Integrações (GCS Uploads)        :f5, 2026-06-02, 10d
    Testes de Segurança e e2e        :f6, 2026-06-12, 5d
    Deploy de Produção               :f7, 2026-06-17, 3d
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
flowchart TD
    %%{init: {"flowchart": {"nodeSpacing": 60, "rankSpacing": 80}}}%%
    subgraph Main["Branch: main"]
        M1["init"]
    end
    subgraph FeatAuth["Branch: feat_auth"]
        M1 --> A1["user-model"]
        A1 --> A2["login-endpoint"]
        A2 --> A3["jwt-cookie"]
    end
    subgraph Main2["Branch: main"]
        A3 --> M2["merge feat_auth (PR1)"]
    end
    subgraph FeatUpload["Branch: feat_upload"]
        M2 --> U1["upload-api"]
        U1 --> U2["gcs-integration"]
    end
    subgraph Main3["Branch: main"]
        U2 --> M3["merge feat_upload (PR2)"]
    end
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


---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 29/05/2026 | Criação do documento | Pedro Henrique P. Santos |
