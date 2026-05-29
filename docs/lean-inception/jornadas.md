# :material-map-marker-path: Jornadas de Usuário

Fluxos principais que cada persona percorre ao utilizar o EdTech, desde o primeiro acesso até a conclusão da tarefa.

---

## Jornada 1 — Ana envia um artigo

**Persona:** Ana (Pesquisadora de IC)
**Objetivo:** Fazer upload de um rascunho de artigo no sistema

```mermaid
journey
    title Ana envia um rascunho de artigo
    section Acesso
        Abre o EdTech no navegador: 5: Ana
        Faz login com e-mail institucional: 4: Ana
    section Upload
        Clica em Novo Documento: 5: Ana
        Seleciona o PDF do artigo: 4: Ana
        Preenche titulo e tipo: 3: Ana
        Confirma o upload: 5: Ana
    section Verificacao
        Visualiza o documento na lista: 5: Ana
        Confirma que o status é rascunho: 4: Ana
```

| Etapa | Ação | Sentimento | Ponto de atenção |
| :---: | :--- | :---: | :--- |
| 1 | Acessa o sistema | 😊 | URL deve ser fácil de lembrar |
| 2 | Faz login | 😐 | Formulário claro com feedback de erro |
| 3 | Inicia upload | 😊 | Botão visível e intuitivo |
| 4 | Preenche metadados | 😕 | Campos obrigatórios devem ser mínimos |
| 5 | Confirma upload | 😊 | Feedback visual de sucesso |
| 6 | Verifica na lista | 😊 | Documento aparece imediatamente |

---

## Jornada 2 — Prof. Carlos revisa submissões

**Persona:** Prof. Carlos (Orientador)
**Objetivo:** Verificar quais alunos já entregaram o relatório semanal

```mermaid
journey
    title Prof. Carlos revisa submissoes
    section Acesso
        Faz login como orientador: 5: Carlos
        Acessa o painel do projeto: 4: Carlos
    section Revisao
        Filtra por documentos recentes: 4: Carlos
        Abre o PDF de um aluno: 5: Carlos
        Aprova ou solicita correcoes: 3: Carlos
    section Acompanhamento
        Verifica quem ainda nao entregou: 4: Carlos
        Envia lembrete ao aluno: 2: Carlos
```

| Etapa | Ação | Sentimento | Ponto de atenção |
| :---: | :--- | :---: | :--- |
| 1 | Login | 😊 | Acesso rápido ao painel |
| 2 | Visualiza projeto | 😊 | Lista clara de orientandos |
| 3 | Filtra documentos | 😐 | Filtros por data e status |
| 4 | Revisa documento | 😊 | Visualização inline ou download |
| 5 | Aprova/rejeita | 😕 | Feedback claro de status *(planejado)* |

---

## Jornada 3 — Dra. Márcia investiga acesso

**Persona:** Dra. Márcia (Auditora)
**Objetivo:** Verificar se houve tentativa de acesso indevido a documentos de outro laboratório

```mermaid
journey
    title Dra. Marcia investiga acesso indevido
    section Acesso
        Faz login como auditora: 5: Marcia
        Acessa modulo de auditoria: 4: Marcia
    section Investigacao
        Filtra logs por ACCESS_DENIED: 5: Marcia
        Identifica usuario e horario: 4: Marcia
        Verifica recurso acessado: 4: Marcia
    section Relatorio
        Exporta evidencias: 3: Marcia
        Encaminha para coordenacao: 4: Marcia
```

| Etapa | Ação | Sentimento | Ponto de atenção |
| :---: | :--- | :---: | :--- |
| 1 | Login | 😊 | Acesso restrito ao módulo de auditoria |
| 2 | Filtra logs | 😊 | Filtros por ação, data e usuário |
| 3 | Analisa detalhes | 😐 | IP, user-agent e timestamp claros |
| 4 | Exporta dados | 😕 | Formato adequado *(planejado)* |
