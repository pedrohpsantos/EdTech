# EdTech — Repositório Acadêmico

[![Deploy MkDocs](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml)
![Python](https://img.shields.io/badge/python-%3E%3D3.11-3776ab?logo=python&logoColor=white)
![MkDocs Material](https://img.shields.io/badge/docs-MkDocs%20Material-7c4dff?logo=materialformkdocs&logoColor=white)

Plataforma acadêmica para centralização, gerenciamento e auditoria de publicações científicas, relatórios de pesquisa e datasets — desenvolvida no laboratório **AILAB Makers** (UnB FCTE).

> **📖 Portal da Documentação:** [pedrohpsantos.github.io/EdTech](https://pedrohpsantos.github.io/EdTech/)

---

## 📌 Estado Atual do Repositório

O projeto encontra-se atualmente na fase de **fundação de governança e arquitetura técnica**.
- **✅ Concluído:** Documentação rica e consolidada (*Docs-as-Code*), arquitetura técnica (C4 Model, ADRs) e Design System.
- **🚧 Em Desenvolvimento:** Os módulos de aplicação (Backend Java e Frontend React) estão em fase de *scaffolding* e construção ativa. Ainda não há uma versão funcional do produto.

Para entender as prioridades atuais e como ajudar na documentação, leia nosso [Guia de Contribuição](CONTRIBUTING.md).

---

## 🚀 Quick Start (Documentação Local)

```bash
# Clone o repositório
git clone https://github.com/pedrohpsantos/EdTech.git
cd EdTech

# Instale as dependências com uv
uv sync

# Sirva a documentação localmente
uv run mkdocs serve
```

Acesse `http://127.0.0.1:8000` no navegador.

---

## Stack Tecnológica

| Camada | Tecnologias |
| :--- | :--- |
| **Backend** | Java 17 · Spring Boot · Spring Security · JWT |
| **Frontend** | React · HTML5 · CSS3 · Bootstrap 5 |
| **Cloud** | Google Cloud Run · Cloud SQL (PostgreSQL) · Cloud Storage |
| **Docs & CI** | MkDocs Material · GitHub Actions · uv |

---

## Equipa

| Nome | Papel | GitHub |
| :--- | :--- | :--- |
| Pedro Henrique P. Santos | Tech Lead | [@pedrohpsantos](https://github.com/pedrohpsantos) |
| Alana Cristyna F. Dias | Full Stack | [@alanafeitosa-ui](https://github.com/alanafeitosa-ui) |
| Arthur Carvalho Leite | Full Stack | [@arthurlleite](https://github.com/arthurlleite) |
| Luis Gustavo F. Nunes | Full Stack | [@LuisGFNunes](https://github.com/LuisGFNunes) |
| Mariana S. F. Andrade | Full Stack | [@mariana-farias12](https://github.com/mariana-farias12) |
| Mateus Alves Araújo | Full Stack | [@mateusaraujo2006](https://github.com/mateusaraujo2006) |

---

## Licença

Projeto acadêmico desenvolvido para fins educacionais no Laboratório de Inteligência Artificial (AILAB).
O código fonte é disponibilizado sob a [MIT License](LICENSE).

---
*Consulte o [Changelog](CHANGELOG.md) para o histórico de versões e nossa [Política de Segurança](SECURITY.md) para o fluxo de relato de vulnerabilidades.*
