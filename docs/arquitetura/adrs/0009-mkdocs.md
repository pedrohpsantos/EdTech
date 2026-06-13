# ADR 0009: Docs-as-Code com MkDocs e Material

## Status

Aceito

## Contexto

A documentação de arquitetura, negócio (Discovery/Jornadas) e código costuma se desatualizar rapidamente quando mantida em wikis separadas (Confluence, Notion) ou documentos do Word, pois ficam distantes do ciclo de vida natural do desenvolvimento (o código). Isso gera ambiguidade e falhas de comunicação entre a equipe de desenvolvimento e os stakeholders do projeto acadêmico.

## Decisão

Decidimos adotar a filosofia **Docs-as-Code (Documentação como Código)**, utilizando **MkDocs** com o tema **Material for MkDocs**.

## Consequências

### Positivas

- **Proximidade:** A documentação vive dentro do próprio repositório Git (`/docs`). Se uma Pull Request altera a arquitetura, a mesma PR deve alterar a documentação, forçando a atualização contínua.

- **Manutenibilidade:** Tudo é escrito em Markdown puro (incluindo diagramas Mermaid como o C4 Model), permitindo diffs claros no Git e dispensando licenças caras de software de diagramação corporativa (ex: Visio ou Lucidchart).

- **Publicação Automática:** A documentação estática é gerada e implantada automaticamente via GitHub Actions no GitHub Pages de forma gratuita.

### Negativas / Riscos

- **Curva de Aprendizado para Negócios:** Stakeholders não-técnicos (ex: Coordenação Universitária) podem ter dificuldade no início para revisar e sugerir alterações de texto via "Pull Requests" de Markdown, em vez de um editor visual amigável (WYSIWYG) como o Google Docs.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento | Pedro Henrique P. Santos |
| 1.1 | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
