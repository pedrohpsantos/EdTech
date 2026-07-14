# Documentação — EdTech

> Aqui, decisões viram conhecimento compartilhado e verificável.

## Visão geral

Portal técnico mantido como código, publicado em [pedrohpsantos.github.io/EdTech](https://pedrohpsantos.github.io/EdTech/).

## Estrutura

| Diretório | Conteúdo |
| --- | --- |
| `arquitetura/` | C4, ADRs, desenho técnico e FinOps |
| `desenvolvimento/` | Guias de desenvolvimento, qualidade, testes e operação |
| `produto/` | Requisitos, histórias de usuário e critérios de aceitação |
| `gestao/` | Planejamento e acompanhamento do projeto |
| `assets/` | Recursos visuais do portal |

## Comece aqui

Pré-requisitos: Python 3.11+ e [uv](https://docs.astral.sh/uv/).

```bash
uv sync
uv run mkdocs serve
```

Abra `http://localhost:8000`. Para validar uma alteração antes do commit:

```bash
uv run mkdocs build --strict
```

Como alternativa, instale as dependências descritas em `pyproject.toml` com `pip` e execute `mkdocs serve`.

## Validação e convenções

- Atualize a documentação junto com mudanças de comportamento, rotas, infraestrutura ou pipeline.
- Tecnologias aparecem como texto no portal; badges ficam reservados ao README raiz.
- Use Mermaid para relações/fluxos e ADRs para decisões arquiteturais duráveis.
- Evite segredos, URLs efêmeras de execução e instruções não reproduzíveis.

A publicação é feita por `.github/workflows/ci-docs.yml` após mudanças integradas à `main`.

## Referências

- [README raiz](../README.md)
- [Pipelines](../.github/PIPELINES.md)
- [Infraestrutura](../infra/README.md)
