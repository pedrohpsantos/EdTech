# :material-eye: Visão do Produto

Definição clara e compartilhada do que o EdTech é, para quem ele existe e qual valor entrega.

---

## Template de Visão

!!! quote "Visão do Produto"
    **Para** pesquisadores, orientadores e laboratórios universitários

    **Cujo** problema é a falta de centralização segura, organizada e auditável de publicações acadêmicas, rascunhos e datasets

    **O** EdTech

    **É um** repositório acadêmico digital

    **Que** permite upload, gerenciamento e rastreabilidade de documentos científicos com isolamento por autor e projeto

    **Diferentemente de** soluções genéricas como Google Drive, Dropbox ou Notion

    **O nosso produto** garante isolamento estrito de dados entre pesquisadores, logs de auditoria inalteráveis e autenticação segura via JWT em cookies `HttpOnly`, projetado especificamente para o contexto acadêmico.

---

## Objetivos de Negócio

<div class="grid cards" markdown>

- :material-target: **Centralização**

    ---

    Reunir todas as produções acadêmicas (artigos, relatórios, datasets) em um único ponto de acesso seguro e organizado.

- :material-shield-check: **Segurança e Isolamento**

    ---

    Garantir que cada pesquisador acesse apenas seus próprios dados, e orientadores vejam apenas os projetos vinculados.

- :material-clipboard-text-clock: **Auditabilidade**

    ---

    Manter registros inalteráveis de todas as ações do sistema para fins de compliance e rastreabilidade acadêmica.

- :material-rocket-launch: **Acessibilidade**

    ---

    Oferecer uma interface simples e intuitiva, sem curva de aprendizado, para pesquisadores de qualquer nível técnico.

</div>

---

## Métricas de Sucesso

| Métrica | Meta | Como medir |
| :--- | :---: | :--- |
| Uploads realizados por semana | ≥ 10 | Contagem de registros na tabela `documents` |
| Tempo médio de upload | < 5s | Logs de auditoria (`UPLOAD_SUCCESS`) |
| Tentativas de acesso negado | 0 cross-project | Logs de `ACCESS_DENIED` |
| Cobertura de testes | ≥ 80% | JUnit + relatório de cobertura |


---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 29/05/2026 | Criação do documento | Pedro Henrique P. Santos |
