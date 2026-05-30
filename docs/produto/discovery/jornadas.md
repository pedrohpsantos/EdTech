# :material-map-marker-path: Mapeamento de Jornadas (User Journey)

Abaixo estão os fluxos principais que cada persona percorre ao utilizar o EdTech, desenhados durante os workshops de Discovery.

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

## Jornada 3 — Dra. Márcia (Auditora) investiga acesso

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

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Criação do documento | Pedro Henrique P. Santos |
