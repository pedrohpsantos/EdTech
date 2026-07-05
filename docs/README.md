# 📄 EdTech Documentação

![MkDocs](https://img.shields.io/badge/MkDocs-Material-526CFE?style=for-the-badge&logo=markdown&logoColor=white)
![Docs as Code](https://img.shields.io/badge/Docs-as--Code-ffb142?style=for-the-badge)

Portal de documentação técnica do EdTech, construído com a filosofia **Docs-as-Code**: a documentação vive junto ao código, é versionada no Git, revisada em PRs e publicada automaticamente via GitHub Actions.

**Portal publicado:** [pedrohpsantos.github.io/EdTech](https://pedrohpsantos.github.io/EdTech/)

## Estrutura

| Diretório | Conteúdo |
| :--- | :--- |
| `/docs/arquitetura` | Diagramas C4, decisões arquiteturais (ADRs) e design técnico |
| `/docs/desenvolvimento` | Guias de contribuição, qualidade e testes |
| `/docs/produto` | Requisitos, histórias de usuário e critérios de aceitação |
| `/docs/gestao` | Planejamento de sprints e gestão do projeto |
| `/docs/assets` | Imagens, diagramas e recursos visuais |

---

## Visualização Local

```bash
# A partir da raiz do projeto
pip install mkdocs-material mkdocs-awesome-pages-plugin

# Inicie o servidor local com hot reload
mkdocs serve
```

Acesse `http://localhost:8000`. O portal é atualizado automaticamente ao salvar qualquer arquivo Markdown.

---

## Diretrizes para Contribuição

1. **Seja claro e objetivo:** Evite informações efêmeras (ex: "recentemente corrigimos..."). Escreva pensando no leitor de longo prazo.
2. **Use diagramas:** Diagramas Mermaid são preferíveis a longas descrições textuais de fluxos e arquiteturas.
3. **Use admonitions:** Utilize as caixas `!!! tip`, `!!! warning` e `!!! note` do MkDocs Material para destacar informações importantes.
4. **ADRs para decisões relevantes:** Toda decisão arquitetural significativa deve ser registrada como um novo ADR em `/docs/arquitetura/decisoes_adrs/`.
