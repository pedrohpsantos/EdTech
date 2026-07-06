---
title: 'Mapeamento de Jornadas (User Journey)'
---

# :material-map-marker-path: Mapeamento de Jornadas (User Journey)

Abaixo estão os fluxos principais que cada perfil institucional percorre ao utilizar o EdTech, desenhados durante os workshops de Discovery.

!!! info "Legenda de Satisfação (Carinhas nos diagramas)"
    Os diagramas utilizam um escore de 1 a 5 para mapear a jornada emocional do usuário em cada etapa:


    - :material-emoticon-sad: **Frustração (Pontuação 1 a 2):** Etapas de atrito, dor ou em que o usuário está enfrentando problemas (como tentar usar e-mail pessoal ou lidar com sistemas defasados).

    - :material-emoticon-neutral: **Neutro (Pontuação 3):** Tarefas burocráticas ou transições de estado, sem forte emoção atrelada.

    - :material-emoticon-happy: **Satisfação (Pontuação 4 a 5):** Etapas onde o usuário teve facilidade, atingiu o sucesso na tarefa e ficou feliz com o fluxo.

## Jornada 1 — Submissão de Artigo (Pesquisador)


1. **Descoberta:** O pesquisador recebe o link do repositório pelo seu orientador.

2. **Onboarding:** Cadastra-se utilizando obrigatoriamente o e-mail institucional (`@instituicao.edu.br`).

3. **Ação Principal:** Faz upload do `artigo_final.pdf`.

4. **Retenção/Acompanhamento:** Entra semanalmente na plataforma para verificar se o status mudou.

```mermaid
journey
    title Jornada de Submissão de Pesquisa (Perfil: Pesquisador)
    section 1. Descoberta e Onboarding
      Recebe link do orientador: 3: Pesquisador
      Tenta usar e-mail pessoal: 1: Pesquisador, Sistema
      Cadastra com email institucional: 5: Pesquisador, Sistema
    section 2. Submissão (Ação Core)
      Acessa Dashboard: 5: Pesquisador
      Arrasta arquivo PDF/Zip: 4: Pesquisador, GCS
      Confirma envio: 5: Pesquisador
    section 3. Retenção
      Recebe status "Draft": 4: Pesquisador
      Verifica status diário: 3: Pesquisador
      Tese Aprovada: 5: Pesquisador, Orientador
```

## Jornada 2 — Revisão de Submissões (Orientador)


1. **Acesso:** Faz login como orientador e acessa o painel do projeto.

2. **Revisão:** Filtra por documentos recentes, abre o PDF de um aluno e aprova ou solicita correções.

3. **Acompanhamento:** Verifica quem ainda não entregou e envia lembrete ao aluno.

```mermaid
journey
    title Orientador revisa submissões
    section Acesso
        Faz login como orientador: 5: Orientador, Sistema
        Acessa o painel do projeto: 4: Orientador, Sistema
    section Revisão
        Filtra por documentos recentes: 4: Orientador, Sistema
        Abre o PDF de um aluno: 5: Orientador, GCS
        Aprova ou solicita correções: 3: Orientador, Aluno
    section Acompanhamento
        Verifica quem ainda não entregou: 4: Orientador, Sistema
        Envia lembrete ao aluno: 2: Orientador, Aluno
```

## Jornada 3 — Investigação de Acesso (Auditor)


1. **Acesso:** Faz login como auditor e acessa o módulo de auditoria.

2. **Investigação:** Filtra logs por `ACCESS_DENIED`, identifica usuário e horário, e verifica qual recurso foi acessado.

3. **Relatório:** Exporta evidências e encaminha para a coordenação.

```mermaid
journey
    title Auditor investiga acesso indevido
    section Acesso
        Faz login como auditor: 5: Auditor, Sistema
        Acessa módulo de auditoria: 4: Auditor, Sistema
    section Investigação
        Filtra logs por ACCESS_DENIED: 5: Auditor, Sistema
        Identifica usuário e horário: 4: Auditor, Sistema
        Verifica recurso acessado: 4: Auditor, Sistema
    section Relatório
        Exporta evidências: 3: Auditor, Sistema
        Encaminha para coordenação: 4: Auditor, Coordenação
```

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `2.0` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |
| `3.0` | 06/07/2026 | Atualização para tom mais formal, removendo nomes de personas e focando nos papéis institucionais | Pedro Henrique P. Santos |

