---
hide:
  - navigation
  - toc
---

<div class="md-hero" markdown>

<span class="hero-badge">🚧 Em Desenvolvimento — AILAB Makers · UnB FCTE</span>

# :material-school: EdTech

Plataforma acadêmica para centralização, gerenciamento e auditoria de publicações científicas, relatórios de pesquisa e datasets — construída para laboratórios universitários, grupos de iniciação científica e programas de pós-graduação.

<div class="hero-actions" markdown>

[Explorar Arquitetura :material-arrow-right:](arquitetura/stack.md){ .md-button .md-button--primary }
[Ver Entregas :material-rocket-launch:](entregas/semana1.md){ .md-button }

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

    Login com JWT armazenado em cookies `HttpOnly` + `Secure`. Sessões protegidas contra XSS e CSRF.

- :material-file-upload: **Upload de Documentos**

    ---

    Envio de artigos em PDF, relatórios de pesquisa e datasets com armazenamento em nuvem de alta disponibilidade via Google Cloud Storage.

- :material-filter-variant: **Listagem Filtrada**

    ---

    Cada pesquisador visualiza e gerencia apenas seus próprios rascunhos não publicados, vinculados à sua conta autenticada.

- :material-lock-check: **Isolamento de Dados**

    ---

    Garantia de isolamento estrito entre autores e projetos. Orientadores acessam apenas produções de seus laboratórios.

- :material-clipboard-text-clock: **Logs de Auditoria**

    ---

    Registros centralizados e inalteráveis de login, logout, uploads, downloads, exclusões e tentativas de acesso negadas.

- :material-cloud-check: **Alta Disponibilidade**

    ---

    Infraestrutura em Google Cloud Run com banco de dados gerenciado (Cloud SQL for PostgreSQL) e storage distribuído.

</div>

---

<div class="section-heading" markdown>

## :material-account-group: Perfis de Usuário

</div>

<p class="section-subtitle">
O sistema foi projetado para atender três perfis distintos, cada um com permissões e visões específicas.
</p>

=== ":material-flask: Pesquisador"

    O perfil principal do sistema. O pesquisador pode:

    - [x] Criar conta e fazer login seguro
    - [x] Enviar artigos em PDF, relatórios de pesquisa e datasets
    - [x] Visualizar e gerenciar apenas seus próprios rascunhos não publicados
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

| Camada | Tecnologias |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript Vanilla, Bootstrap 5, React |
| **Backend** | Java 17, Spring Boot, Spring Security, JWT (`HttpOnly` + `Secure`) |
| **Banco de Dados & Storage** | Google Cloud SQL for PostgreSQL, Google Cloud Storage |
| **Infraestrutura & DevOps** | Docker, Google Cloud Run |
| **CI/CD & Qualidade** | GitHub Actions, JUnit, Python 3.11 (scripts de telemetria) |
| **Documentação** | MkDocs + Material for MkDocs |

[:material-arrow-right: Ver detalhes completos da arquitetura](arquitetura/stack.md){ .md-button }

---

<div class="section-heading" markdown>

## :material-account-heart: Equipe

</div>

<p class="section-subtitle">
Time multidisciplinar do AILAB Makers — UnB FCTE.
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
<a href="https://github.com/yhikariTsuy" target="_blank" class="team-card">
<img src="https://github.com/yhikariTsuy.png" alt="Luis" class="team-avatar">
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

    Utilize o **menu superior** para alternar entre os grandes módulos do projeto:
    **Planejamento**, **Arquitetura** e **Entregas**.

    Para buscas rápidas, pressione '**s**' ou '**f**' no seu teclado e digite o termo desejado.

    Use o toggle :material-brightness-6: no cabeçalho para alternar entre **modo claro** e **modo escuro**.