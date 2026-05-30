# :material-handshake: Team Agreements & Ritos Ágeis

No lugar de "Atas Formais" burocráticas (onde alguém fica anotando tudo que é falado) ou "Rotações Acadêmicas de Papéis" (onde você é o Scrum Master de mentira por uma semana), o mercado exige velocidade, alinhamento e autonomia.

A Squad do Repositório Acadêmico opera com os seguintes acordos vitais de comunicação e entrega:

## Nossos Ritos de Engenharia (Scrum / Kanban)

### 1. Daily Syncs Assíncronas (Ou de 15 minutos)
Ninguém lê atas gigantes. Nosso combinado diário é: "O que fiz? Qual meu bloqueio (Impediment)? O que vou puxar hoje do quadro?"
**Regra de Ouro:** Dailies não servem para resolver o problema, servem para sinalizar que o problema existe. Se precisar parear, o time faz o "Spin-off" após os 15 minutos.

### 2. Backlog Refinement (Refinamento)
Toda semana olhamos o topo do Backlog (os itens categorizados como `NOW` no Roadmap).
O objetivo não é dar uma data exata, mas sim garantir que a tarefa se enquadra na nossa `Definition of Ready (DoR)` (Ver o documento *DoR & DoD* na raiz de planejamento).

### 3. Sprint Review e Retrospectivas
A *Review* substitui o "Envio da Entrega da Semana X". Nela, nós demonstramos o software rodando (Deploy) e coletamos feedback do "Cliente" (Reitoria / Docentes).
A *Retrospectiva* é o único rito sagrado obrigatório onde o time fala sobre as *pessoas e processos*: "O que foi bom? O que foi ruim? O que vamos testar na próxima sprint para melhorar?"

---

## Engenharia e Versionamento (Git Flow Ágil)

- **Trunk-Based vs Git Flow:** Não travamos dezenas de `branches`. Trabalhamos com branches curtas focadas em features (ex: `feat/upload-gcs`) que vão para a `main` via Pull Request (PR).
- **Regras do PR:**
  - O título deve seguir a especificação do `Conventional Commits` (ex: `feat: add PDF validation middleware`).
  - Nenhum PR entra na branch principal sem pelo menos **1 aprovação** de código de um colega (Code Review) e sem a pipeline CI/CD passar.
- **Ambiente Centralizado:** Todas as discussões sobre código e arquitetura devem estar atreladas na aba de Issues e PRs do GitHub, não no WhatsApp, Slack e nunca em Atas do Word.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Consolidação dos combinados de mercado, abolindo Atas acadêmicas | Pedro Henrique P. Santos |
