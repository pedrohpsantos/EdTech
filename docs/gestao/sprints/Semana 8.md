---
title: 'Semana 8 — Infraestrutura Avançada, Performance e Encerramento'
---

# :material-rocket-launch: Semana 8 — Infraestrutura Avançada, Performance e Encerramento

<span class="status-badge"> Concluída (Enterprise Grade Total)</span>

**Período:** 04/07/2026 – 11/07/2026

---

## Objetivo da Sprint

O objetivo desta última sprint foi lapidar as engrenagens finais da nossa plataforma para atingir oficialmente a resiliência "Enterprise Grade". Focamos em isolar concorrências de banco de dados, implementar testes de carga agressivos, criar suporte visual para grandes volumes de dados (Datasets) e consolidar uma malha documental voltada para a Operação em Produção (FinOps e Runbooks).

E, mais importante, fechar o ciclo de aprendizado do time, consolidando a mentalidade de engenharia de software para a vida profissional.

---

## Entregas Realizadas

Nesta semana, fechamos o escopo técnico do projeto com chave de ouro:

### :material-server-network: Infraestrutura e Performance
- [x] Extração da rotina de migração do banco de dados (Flyway) para um **Cloud Run Job** isolado, evitando concorrência e instabilidade no *scale-up* do backend.
- [x] Implementação de bateria de testes de Carga e Stress via **K6**, com integração na pipeline CI recebendo a `API_URL` dinamicamente.
- [x] Suporte e visualização inteligente de arquivos **CSV e JSON** no frontend através do componente `DatasetPreview`, essencial para o Painel do Orientador.

### :material-shield-check: Segurança
- [x] Implementação de **Verificação de Malwares** no fluxo de upload de documentos, bloqueando assinaturas maliciosas com integração à API do ClamAV antes da persistência no Storage.

### :material-file-document-edit: Developer Experience e Documentação
- [x] Criação da documentação de **FinOps e Custos (TCO)**, trazendo previsibilidade orçamentária à nossa arquitetura Cloud.
- [x] Criação de **Runbooks** para Troubleshooting e Resposta a Incidentes, orientando a operação contra falhas comuns.
- [x] Consolidação de todas as rotas da API em uma única **Coleção Postman** oficial versionada na raiz do repositório para novos engenheiros.
- [x] Auditoria comparativa final contra repositórios concorrentes, consagrando o EdTech como referência técnica isolada.

---

## Resumo Técnico

| Métrica | Valor |
| :--- | :---: |
| Veredito Final de Cloud | 🟢 Produção Estável e Segura |
| Status de Maturidade | Enterprise Grade |

---
## Contribuições da Equipe e Mentorias

Esta semana marcou a nossa retrospectiva final e fechamento de ciclo. Toda a equipe se empenhou não apenas em entregar código, mas em absorver a estrutura sistêmica da plataforma.

### Tech Lead (Pedro Henrique)
- **Foco:** Fechamento de arquitetura, testes de carga, auditoria final e mentoria contínua.
- **Entregas:** Dedicação extrema ao ensino do grupo. Realização de *pair programmings*, resolução de dúvidas de todos os membros e auxílio ostensivo a **outros grupos da disciplina**. Meu objetivo foi garantir que todos absorvessem o máximo de conhecimento prático de engenharia.

### Equipe (Alana, Arthur, Luis, Mariana e Mateus)
- **Foco:** Entendimento do fluxo completo de ponta a ponta e preparação para a apresentação.
- **Entregas:** Participação ativa nas discussões de arquitetura, compreendendo como cada pedaço (Frontend, Backend, Nuvem, CI/CD) se interliga para formar um produto real.

---

## Aprendizados e Decisões

!!! tip "Um Modelo para a Vida"
    O modelo de projeto que adotamos aqui — com pull requests, CI/CD, Nuvem, segurança rigorosa e documentação Docs-as-Code — foi amplamente validado. A equipe reconheceu que os padrões aprendidos durante a construção do EdTech serão levados para toda a vida profissional e acadêmica ao longo da Engenharia de Software.

!!! quote "Agradecimento Final"
    Gostaria de registrar minha profunda gratidão ao grupo pela jornada. Dediquei o máximo dos meus conhecimentos para ensinar e moldar a visão técnica de todos. E o mais importante: deixei claro que a porta estará sempre aberta. Qualquer dúvida, tanto no final deste projeto quanto no decorrer do curso de Engenharia de Software, estarei disponível para ajudar, não apenas o nosso grupo, mas a todos que precisarem.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 11/07/2026 | Criação do documento de fechamento da Sprint 8 | Pedro Henrique P. Santos |
| `1.1` | 11/07/2026 | Correção de exibição no menu lateral (`.pages`) | Pedro Henrique P. Santos |
