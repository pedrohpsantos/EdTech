# :material-calendar-check: Cronograma e Sprints

Planejamento de desenvolvimento do EdTech, organizado em sprints semanais com entregas incrementais.

---

## Roadmap Geral

```mermaid
gantt
    title Cronograma de Desenvolvimento (Sprints)
    dateFormat YYYY-MM-DD
    axisFormat %d/%m

    section Fase 1: Fundação
    Requisitos e Lean Inception      :done, f1, 2026-05-12, 7d
    Arquitetura de Software          :done, f2, 2026-05-19, 7d

    section Fase 2: Auth
    Backend (Autenticação JWT)       :active, f3, 2026-05-26, 7d
    Frontend (Tela de Login)         :active, f4, 2026-05-26, 7d

    section Fase 3: Paralelização
    Integrações (GCS Uploads)        :f5, 2026-06-02, 14d
    Fluxo do Orientador (Painel SPA) :f6, 2026-06-04, 14d
    Módulo de Auditoria (Backend)    :f7, 2026-06-06, 14d

    section Fase 4: Entrega
    Testes de Segurança e e2e        :f8, 2026-06-20, 10d
    Integrações Extras (ML/SSO)      :f9, 2026-06-24, 7d
    Deploy de Produção               :f10, 2026-07-01, 7d
```

---

## Estrutura das Sprints

Cada sprint tem duração de **1 semana** e segue o ciclo:

```mermaid
flowchart LR
    A["Planning\n(segunda)"] --> B["Desenvolvimento\n(terça-quinta)"]
    B --> C["Code Review\n(sexta)"]
    C --> D["Merge e Deploy\n(sexta)"]
    D --> E["Retrospectiva\n(sexta)"]
    E --> A

```

---

## Fluxo de Desenvolvimento

### Branches

| Branch       | Propósito                    |         Proteção          |
|:-------------|:-----------------------------|:-------------------------:|
| `main`       | Branch estável de deploy     | :material-lock: Protegida |
| `develop`    | Integração e validação       | :material-lock: Protegida |
| `feat/*`     | Funcionalidades novas        |             —             |
| `fix/*`      | Correções de bugs            |             —             |
| `docs/*`     | Atualizações de documentação |             —             |
| `refactor/*` | Melhorias de código          |             —             |

!!! warning "Regra de Ouro"
    **Nunca commitar diretamente na `main`.** Todo fluxo passa por `develop` antes da integração final.

### Fluxo de uma Feature

```mermaid
%%{init: {"flowchart": {"nodeSpacing": 60, "rankSpacing": 80}}}%%
flowchart LR
    subgraph Main["Branch: main"]
        M1["release"]
    end
    subgraph Develop["Branch: develop"]
        D1["integração"]
    end
    subgraph FeatAuth["Branch: feat_auth"]
        F1["user-model"]
        F2["login-endpoint"]
        F3["jwt-cookie"]
    end

    M1 --> D1
    D1 --> F1 --> F2 --> F3
    F3 --> D1
    D1 --> M1
```

---

## Convenção de Commits

Todos os commits devem seguir rigorosamente a especificação do **Conventional Commits**, facilitando a geração de *Changelogs* automáticos e clareza no histórico do Git:

| Tipo | Prefixo | Quando usar | Exemplo |
| :--- | :---: | :--- | :--- |
| Funcionalidade | `feat` | Uma nova funcionalidade ou regra de negócio | `feat: implement secure jwt cookie storage` |
| Correção | `fix` | Correção de um bug em produção ou staging | `fix: adjust spring security blocking path` |
| Documentação | `docs` | Alterações exclusivas na documentação (MkDocs, README) | `docs: update adr 0009 mkdocs format` |
| Estilo | `style` | Ajustes de formatação que não afetam a lógica (espaçamento, aspas) | `style: format java classes with spotless` |
| Refatoração | `refactor` | Melhoria estrutural de código que não corrige bug nem cria feature | `refactor: optimize postgresql connection pooling` |
| Performance | `perf` | Mudança de código que especificamente melhora a performance | `perf: add caching to document query` |
| Testes | `test` | Adição ou correção de testes (unitários, integração, e2e) | `test: add junit cases for jwt validation` |
| Build | `build` | Alterações que afetam o build system ou dependências externas (npm, maven) | `build: update spring boot version to 3.2.0` |
| Integração (CI) | `ci` | Alterações nos scripts e configurações de CI/CD (GitHub Actions) | `ci: add workflow for running frontend tests` |
| Tarefas | `chore` | Manutenções de rotina, scripts secundários ou atualizações pequenas | `chore: update .gitignore with IDE files` |

!!! example "Formato completo"
    ```text
    tipo(escopo-opcional): descrição curta em inglês e no imperativo

    Corpo opcional explicando o *por que* e *o que* mudou, em detalhes.
    
    Refs: #numero-da-issue
    ```

---

## Marcos do Projeto

| Marco | Data Prevista | Status |
| :--- | :---: | :---: |
| **S1:** Setup completo (repo, infra, docs) | 18/05 | :material-check-circle:{ .green } Concluído |
| **S2:** Lean Inception e Arquitetura fechados | 25/05 | :material-check-circle:{ .green } Concluído |
| **S3:** Autenticação funcional (API + Frontend) | 01/06 | :material-progress-clock: Em andamento |
| **S4:** GCS Uploads & Base do Orientador | 10/06 | :material-circle-outline: Pendente |
| **S5:** Painel Concluído & Auditoria Integrada | 20/06 | :material-circle-outline: Pendente |
| **S6:** Bateria de Testes e2e & Integrações ML | 30/06 | :material-circle-outline: Pendente |
| **S7:** Homologação Final e Deploy de Produção | 07/07 | :material-circle-outline: Pendente |


---

## Histórico de Versões

| Versão |    Data    | Descrição                           | Autor                    |
|:------:|:----------:|:------------------------------------|:-------------------------|
| `1.0`  | 29/05/2026 | Criação do documento                | Pedro Henrique P. Santos |
| `1.1`  | 30/05/2026 | Fluxo atualizado com branch develop | Pedro Henrique P. Santos |
