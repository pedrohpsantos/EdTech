---
description: EdTech — Plataforma acadêmica para centralização, gerenciamento e auditoria de publicações científicas.
hide:

  - navigation

  - toc
---

<div class="md-hero" markdown>

<span class="hero-badge"> Em Desenvolvimento — AILAB Makers</span>

# EdTech

Plataforma acadêmica para centralização, gerenciamento e auditoria de publicações científicas, relatórios de pesquisa e datasets — construída para laboratórios universitários, grupos de iniciação científica e programas de pós-graduação.

<div class="hero-actions" markdown>

[Explorar MVP :material-star-shooting:](produto/strategy/canvas_mvp.md){ .md-button .md-button--primary }
[Ver Entregas :material-rocket-launch:](gestao/historico_sprints/semana1.md){ .md-button }

</div>

</div>

---

<div class="section-heading" markdown>

## :material-lightbulb-on: O que o EdTech resolve?

</div>

<p class="section-subtitle">
Pesquisadores precisam de um lugar seguro, organizado e auditável para armazenar suas produções. O EdTech digitaliza e protege esse fluxo de ponta a ponta.
</p>

<div class="grid cards" markdown>


- :material-shield-lock: **Autenticação Segura**

    ---

    Login com JWT em cookies `HttpOnly` + `Secure`, com sessões protegidas contra XSS e CSRF.


- :material-file-upload: **Upload de Documentos**

    ---

    Envio de artigos em PDF, relatórios e datasets com armazenamento de alta disponibilidade via Google Cloud Storage.


- :material-filter-variant: **Listagem Filtrada**

    ---

    Cada pesquisador visualiza e gerencia apenas seus próprios rascunhos não publicados, vinculados à sua conta.


- :material-lock-check: **Isolamento de Dados**

    ---

    Isolamento estrito entre autores e projetos. Orientadores acessam apenas produções dos seus laboratórios.


- :material-clipboard-text-clock: **Logs de Auditoria**

    ---

    Registros centralizados e inalteráveis de login, logout, uploads, downloads, exclusões e acessos negados.


- :material-cloud-check: **Alta Disponibilidade**

    ---

    Google Cloud Run com banco gerenciado (Cloud SQL for PostgreSQL) e storage nativo (Google Cloud Storage), com Frontend servido no Firebase Hosting.

</div>

---

<div class="section-heading" markdown>

## :material-rocket-launch-outline: Início Rápido

</div>

<p class="section-subtitle">
Sirva a documentação localmente em segundos com <code>uv</code>.
</p>

```bash
# Clone o repositório
git clone https://github.com/pedrohpsantos/EdTech.git
cd EdTech

# Instale as dependências
uv sync

# Sirva a documentação em http://127.0.0.1:8000
uv run mkdocs serve
```

---

<div class="section-heading" markdown>

## :material-account-group: Perfis de Usuário

</div>

<p class="section-subtitle">
O sistema atende três perfis distintos, cada um com permissões e visões específicas.
</p>

=== ":material-flask: Pesquisador"

    O perfil principal do sistema. O pesquisador pode:


    - [x] Criar conta e fazer login seguro

    - [x] Enviar artigos em PDF, relatórios de pesquisa e datasets

    - [x] Visualizar e gerenciar apenas seus próprios rascunhos

    - [ ] Solicitar revisão ao orientador *(planejado)*

=== ":material-school: Orientador / Administrador"

    Visão ampliada para supervisão acadêmica:


    - [x] Visualizar rascunhos e documentos de todos os pesquisadores vinculados

    - [x] Validar submissões e acompanhar o andamento das pesquisas

    - [x] Bloqueio automático de acesso a projetos sem vínculo direto

    - [ ] Painel de métricas do laboratório *(planejado)*

=== ":material-shield-search: Auditor"

    Módulo de compliance e rastreabilidade:


    - [x] Registrar logs inalteráveis de todas as ações do sistema

    - [x] Consultar histórico de login, logout, uploads e downloads

    - [x] Monitorar tentativas de acesso negadas

    - [ ] Exportação de relatórios de auditoria *(planejado)*

---

<div class="section-heading" markdown>

## :material-layers-triple: Stack Tecnológica

</div>

<p class="section-subtitle">
Tecnologias selecionadas para robustez, segurança e escalabilidade em ambiente acadêmico.
</p>

<div align="center" markdown>

| Camada | Tecnologias |
| :--- | :--- |
| **Frontend** | HTML5, CSS Puro (Design System), Bootstrap 5 (Grid), React 19, Vite 8 |
| **Backend** | Java 21, Spring Boot 4.1, Spring Security, JWT (`HttpOnly` + `Secure`) |
| **Banco de Dados & Storage** | Google Cloud SQL for PostgreSQL, Google Cloud Storage, Flyway |
| **Infraestrutura & DevOps** | Docker, Google Cloud Run, Firebase Hosting |
| **CI/CD & Qualidade** | GitHub Actions, JUnit, Python 3.11 (scripts de telemetria - Pós-MVP) |
| **Documentação** | MkDocs + Material for MkDocs |

[:material-arrow-right: Ver detalhes completos da arquitetura](arquitetura/diagramas/c4_model.md){ .md-button style="margin-top: 1rem;" }

</div>

---

<div class="section-heading" markdown>

## :material-account-heart: Equipe

</div>

<p class="section-subtitle">
Time multidisciplinar do AILAB Makers.
</p>

<div class="team-grid">
<a href="https://github.com/pedrohpsantos" target="_blank" class="team-card">
<img src="https://github.com/pedrohpsantos.png" alt="Pedro" class="team-avatar">
<span class="team-name">Pedro Henrique P. Santos</span>
<span class="team-role">Tech Lead</span>
</a>
<a href="https://github.com/alanafeitosa-ui" target="_blank" class="team-card">
<img src="https://github.com/alanafeitosa-ui.png" alt="Alana" class="team-avatar">
<span class="team-name">Alana Cristyna F. Dias</span>
<span class="team-role">Full Stack</span>
</a>
<a href="https://github.com/arthurlleite" target="_blank" class="team-card">
<img src="https://github.com/arthurlleite.png" alt="Arthur" class="team-avatar">
<span class="team-name">Arthur Carvalho Leite</span>
<span class="team-role">Full Stack</span>
</a>
<a href="https://github.com/LuisGFNunes" target="_blank" class="team-card">
<img src="https://github.com/LuisGFNunes.png" alt="Luis" class="team-avatar">
<span class="team-name">Luis Gustavo F. Nunes</span>
<span class="team-role">Full Stack</span>
</a>
<a href="https://github.com/mariana-farias12" target="_blank" class="team-card">
<img src="https://github.com/mariana-farias12.png" alt="Mariana" class="team-avatar">
<span class="team-name">Mariana S. F. Andrade</span>
<span class="team-role">Full Stack</span>
</a>
<a href="https://github.com/mateusaraujo2006" target="_blank" class="team-card">
<img src="https://github.com/mateusaraujo2006.png" alt="Mateus" class="team-avatar">
<span class="team-name">Mateus Alves Araújo</span>
<span class="team-role">Full Stack</span>
</a>
</div>

---

!!! tip "Como navegar na documentação"

    - Use o **menu superior** para alternar entre os módulos: **Produto e Negócio**, **Arquitetura de Software**, **Desenvolvimento (DevEx)** e **Gestão e Metodologia Ágil**.

    - Pressione ++s++ ou ++f++ para busca rápida.

    - Clique no toggle :material-brightness-6: para alternar entre **modo claro** e **modo escuro**.

    - Cada página possui o botão :material-pencil: para editar diretamente no GitHub.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `0.1.0` | 10/06/2026 | Fundação da documentação técnica e governança. | Pedro Henrique P. Santos |
| `0.2.0` | 13/06/2026 | Reestruturação arquitetural da documentação e introdução de guias DevEx. | Pedro Henrique P. Santos |
| `0.3.0` | 20/06/2026 | Consolidação do Backend (Spring Boot 4.1 + Java 21) e Infra CI. | Pedro Henrique P. Santos |
| `0.4.0` | 26/06/2026 | Integração de UI (Vite), Google Cloud SQL/Storage e fechamento do MVP Sprint 6. | Pedro Henrique P. Santos |
| `0.5.0` | 01/07/2026 | Refinamento Premium de UX/UI (Animações, Design System CSS Puro, Trilha de Pesquisa). | Pedro Henrique P. Santos |