---
title: 'Acordos do Time (Team Agreements)'
---

# :material-handshake: Acordos do Time (Team Agreements)

Para mantermos a coesão de um time distribuído e garantirmos a evolução sadia da plataforma EdTech, a nossa Squad opera baseada em clareza, automação e registro rigoroso de decisões.

## Canais de Comunicação

A fluidez da informação é crítica. Nossos canais estão estritamente divididos para evitar ruídos e o esquecimento de decisões operacionais:


1. **WhatsApp:** Comunicação assíncrona rápida, tira-dúvidas e alinhamentos triviais do dia a dia.

2. **Discord:** Canal oficial para as Daily Syncs (formato assíncrono em texto) e também utilizado como ambiente para a nossa única reunião de sexta-feira (quando a equipe não se encontrar presencialmente no laboratório).

3. **Atas de Reunião:** Durante a nossa única reunião da semana (nas sextas-feiras), **sempre** formalizamos as pautas e os planos de ação através das Atas de Reunião (presentes na seção `Gestão > Reuniões`). Elas são a nossa principal ferramenta de rastreabilidade humana, garantindo que o que foi falado presencialmente/verbalmente vire conhecimento documentado para o histórico do projeto.

4. **GitHub (Issues/PRs):** Todo debate focado em *revisão de código ou resolução de bugs* deve acontecer no PR, e não perdido no chat instantâneo.

---

## Nossos Ritos de Engenharia (Scrum / Kanban)

### 1. Daily Syncs Assíncronas
Nossas dailies são 100% assíncronas através do **Discord** (canal de texto). Cada membro digita sua pauta: "O que fiz? Qual meu bloqueio (Impedimento)? O que vou puxar hoje do quadro?"

!!! warning "Regra de Ouro"
    Dailies não servem para resolver o problema, servem para sinalizar que o problema existe. Se alguém reportar um bloqueio crítico, os envolvidos realizam um "Spin-off" imediato (Pair Programming) sem arrastar o time inteiro para a call.

### 2. Backlog Refinement (Refinamento Contínuo)
Regularmente olhamos o topo do Backlog (os itens categorizados como `NOW` no Roadmap) de forma assíncrona. O objetivo é garantir que a história possua valor claro e que **não fira nossas ADRs**, alinhando-se estritamente à *Definition of Ready (DoR)* antes de entrar para a próxima semana.

### 3. Reunião Única Semanal (Sextas-feiras)
Temos apenas **uma única reunião síncrona na semana**, que ocorre todas as sextas-feiras (podendo ser presencial ou via Discord). É nela que concentramos nossos esforços humanos para não perdermos tempo em calls dispersas ao longo da semana. Nesta call agrupamos:


- **Review:** Focamos em demonstrar o software rodando (Deploy da funcionalidade) em vez de enviar relatórios acadêmicos monótonos.

- **Retrospectiva:** O rito contínuo de melhoria de pessoas e processos ("O que foi bom? O que foi ruim?").

- **Planning:** O que iremos atacar na próxima segunda-feira.
  
*Lembrete: Toda e qualquer decisão ou "Action Item" gerado nesta reunião ÚNICA de sexta-feira vira material oficial para a respectiva **Ata da Reunião**.*

---

## Engenharia e Versionamento


- **Docs-as-Code e ADRs:** Toda decisão técnica de alto impacto (uso de Flyway, adoção de SPA, Cloud Run) não é guardada "na cabeça" dos devs. Ela vira um documento markdown de *Architecture Decision Record (ADR)* dentro do portal.

- **Git Flow Ágil:** Trabalhamos com branches derivativas (`feat/`, `fix/`, `docs/`) e a integração ocorre via `develop` até chegar à blindada branch `main`.

- **Regras de CI e Commits:**
    - O título das mensagens deve seguir rigorosamente a especificação do **Conventional Commits** (tabela documentada no nosso Cronograma).

    - Nenhum PR (Pull Request) passa para aprovação sem que o Pipeline automatizado do *GitHub Actions* sinalize luz verde nos testes e no linter de código. A revisão do Tech Lead é obrigatória conforme a *Definition of Done (DoD)*.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Consolidação inicial dos acordos | Pedro Henrique P. Santos |
| `1.1` | 04/06/2026 | Refinamento das políticas: adoção de uma ÚNICA reunião síncrona semanal (Sexta) presencial/Discord, formalização das Dailies totalmente assíncronas no Discord e rastreabilidade vital via Atas | Pedro Henrique P. Santos |
| `1.2` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `1.3` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |

