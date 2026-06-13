# :material-map-marker-path: Mapeamento de Jornadas (User Journey)

Abaixo estão os fluxos principais que cada persona percorre ao utilizar o EdTech, desenhados durante os workshops de Discovery.

!!! info "Legenda de Satisfação (Carinhas nos diagramas)"
    Os diagramas utilizam um escore de 1 a 5 para mapear a jornada emocional do usuário em cada etapa:


    - ☹️ **Frustração (Pontuação 1 a 2):** Etapas de atrito, dor ou em que o usuário está enfrentando problemas (como tentar usar e-mail pessoal ou lidar com sistemas defasados).

    - 😐 **Neutro (Pontuação 3):** Tarefas burocráticas ou transições de estado, sem forte emoção atrelada.

    - 😃 **Satisfação (Pontuação 4 a 5):** Etapas onde o usuário teve facilidade, atingiu o sucesso na tarefa e ficou feliz com o fluxo.

## Jornada 1 — Ana (Pesquisadora) envia um artigo


1. **Descoberta:** Ana recebe o link do repositório pelo seu orientador.

2. **Onboarding:** Ela se cadastra utilizando obrigatoriamente o e-mail institucional (`@instituicao.edu.br`).

3. **Ação Principal:** Faz upload do `artigo_final.pdf`.

4. **Retenção/Acompanhamento:** Entra semanalmente na plataforma para verificar se o status mudou.

```mermaid
journey
    title Jornada de Submissão de Pesquisa (Persona: Ana)
    section 1. Descoberta e Onboarding
      Recebe link do orientador: 3: Ana
      Tenta usar e-mail pessoal: 1: Ana, Sistema
      Cadastra com email institucional: 5: Ana, Sistema
    section 2. Submissão (Ação Core)
      Acessa Dashboard: 5: Ana
      Arrasta arquivo PDF/Zip: 4: Ana, GCS
      Confirma envio: 5: Ana
    section 3. Retenção
      Recebe status "Draft": 4: Ana
      Verifica status diário: 3: Ana
      Tese Aprovada: 5: Ana, Orientador
```

## Jornada 2 — Prof. Carlos (Orientador) revisa submissões


1. **Acesso:** Faz login como orientador e acessa o painel do projeto.

2. **Revisão:** Filtra por documentos recentes, abre o PDF de um aluno e aprova ou solicita correções.

3. **Acompanhamento:** Verifica quem ainda não entregou e envia lembrete ao aluno.

```mermaid
journey
    title Prof. Carlos revisa submissoes
    section Acesso
        Faz login como orientador: 5: Carlos, Sistema
        Acessa o painel do projeto: 4: Carlos, Sistema
    section Revisao
        Filtra por documentos recentes: 4: Carlos, Sistema
        Abre o PDF de um aluno: 5: Carlos, GCS
        Aprova ou solicita correcoes: 3: Carlos, Aluno
    section Acompanhamento
        Verifica quem ainda nao entregou: 4: Carlos, Sistema
        Envia lembrete ao aluno: 2: Carlos, Aluno
```

## Jornada 3 — Dra. Márcia (Auditora) investiga acesso


1. **Acesso:** Faz login como auditora e acessa o módulo de auditoria.

2. **Investigação:** Filtra logs por `ACCESS_DENIED`, identifica usuário e horário, e verifica qual recurso foi acessado.

3. **Relatório:** Exporta evidências e encaminha para a coordenação.

```mermaid
journey
    title Dra. Marcia investiga acesso indevido
    section Acesso
        Faz login como auditora: 5: Marcia, Sistema
        Acessa modulo de auditoria: 4: Marcia, Sistema
    section Investigacao
        Filtra logs por ACCESS_DENIED: 5: Marcia, Sistema
        Identifica usuario e horario: 4: Marcia, Sistema
        Verifica recurso acessado: 4: Marcia, Sistema
    section Relatorio
        Exporta evidencias: 3: Marcia, Sistema
        Encaminha para coordenacao: 4: Marcia, Coordenacao
```

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Criação do documento | Pedro Henrique P. Santos |
| 1.1 | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
