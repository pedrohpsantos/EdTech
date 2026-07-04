---
title: '📄 EdTech Docs (Docs-as-Code)'
---

# 📄 EdTech Docs (Docs-as-Code)

Este módulo hospeda toda a infraestrutura de documentação do sistema EdTech (Manuais, Arquitetura, Requisitos e Relatórios de Sprints). Seguimos rigorosamente a filosofia **Docs-as-Code**, em que a documentação é tratada, versionada e revisada com o mesmo rigor do código-fonte.

---

## 🎯 Objetivo

Criar uma Fonte Única de Verdade (*Single Source of Truth*) para toda a equipe de engenharia e stakeholders. 
A documentação não vive isolada em ferramentas terceiras; ela coabita com a base de código e evolui automaticamente nos processos de Integração Contínua (CI).

---

## 🛠️ Stack Tecnológica

| Tecnologia | Função na Aplicação |
| :--- | :--- |
| **MkDocs** | Gerador estático de documentação oficial em Python. |
| **Material for MkDocs** | Framework visual premium, que entrega temas reativos, modo noturno nativo, busca e interatividade nativa. |
| **Markdown** | Linguagem de marcação utilizada para a escrita limpa e portável de todos os documentos. |
| **Giscus** | Sistema de comentários e discussões injetado nativamente na documentação integrado ao GitHub Discussions. |
| **GitHub Pages** | Hospedagem estática automatizada para o portal da documentação gerada no CI/CD. |

---

## 📂 Arquitetura do Diretório

```text
docs/
├── assets/         # Arquivos estáticos (Imagens estáticas, ícones, banners)
├── desenvolvimento/# Guias focados nos engenheiros de software (Padrões, Smoke Tests, IaC)
├── gestao/         # Relatórios de Sprint, Planejamento e Atas de Reunião
├── produto/        # Requisitos funcionais (RFs), Não Funcionais (RNFs) e Arquitetura C4
└── index.md        # A página inicial da documentação
```
*(O arquivo `mkdocs.yml` de configuração global se encontra na raiz do projeto)*

---

## 🚀 Como Executar e Contribuir Localmente

Como a documentação é feita com Python/MkDocs, aconselha-se o uso do instalador super-rápido `uv`.

1. Na raiz do repositório, faça o sync para instalar as dependências:
   ```bash
   uv sync
   ```
2. Inicialize o servidor e faça edições visuais em "Live Reload" (Hot Reloading):
   ```bash
   uv run mkdocs serve
   ```
3. O portal subirá localmente em `http://127.0.0.1:8000`.


---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `2.0` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |
