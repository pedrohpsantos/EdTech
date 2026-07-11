---
title: 'EdTech'
hide:
  - navigation
  - toc
---

<div class="animated-hero" markdown="1">

  <h1 class="hero-title">Pesquisa Segura,<br>Auditoria Transparente.</h1>
  
  <p class="hero-subtitle">
    O EdTech digitaliza e protege o fluxo de produções acadêmicas de ponta a ponta. 
    Uma plataforma inteligente para laboratórios universitários e programas de pós-graduação.
  </p>
  
  <div class="hero-cta" markdown="1">

  [Explorar o MVP :material-rocket-launch:](produto/estrategia_e_descoberta/canvas_mvp.md){ .md-button .md-button--primary }
  [Ver Entregas :material-package-variant-closed:](gestao/sprints/Semana 1.md){ .md-button }

  </div>

</div>

---

<div class="section-heading" markdown>

## :material-lightbulb-on: O que o EdTech resolve?

</div>

<p class="section-subtitle">
Pesquisadores precisam de um lugar seguro, organizado e auditável para armazenar suas produções. Nós cuidamos do resto.
</p>

<div class="grid cards" markdown>

- :material-shield-lock: **Autenticação Inquebrável**
  
    ---
    Sessões blindadas contra XSS e CSRF usando JWT em cookies `HttpOnly` + `Secure`. A segurança vem primeiro.

- :material-file-upload: **Uploads de Alta Performance**
  
    ---
    Envio instantâneo de artigos, relatórios e datasets diretamente para a robustez do Google Cloud Storage.

- :material-lock-check: **Isolamento de Dados Estrito**
  
    ---
    Zero cruzamento de informações não autorizadas. Cada autor e laboratório vê apenas os projetos aos quais tem acesso.

- :material-clipboard-text-clock: **Auditoria 100% Rastreada**
  
    ---
    Logs inalteráveis de logins, uploads, downloads e tentativas de acesso negadas. Tudo gravado no banco de dados.

- :material-api: **API RESTful Escalável**
  
    ---
    Arquitetura robusta em Spring Boot 4.1 construída para escalar, integrando perfeitamente Frontend e serviços de nuvem.

- :material-google-cloud: **Infraestrutura Cloud-Native**
  
    ---
    Deploy automatizado via CI/CD no Google Cloud Run, garantindo alta disponibilidade e custos otimizados sob demanda.

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

## :material-layers-triple: Stack Tecnológica

</div>

<p class="section-subtitle">
Tecnologias selecionadas para máxima robustez, segurança e automação.
</p>

<div align="center" markdown>

| Camada | Tecnologias |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, Bootstrap 5 |
| **Backend** | Java 21, Spring Boot 4.1, Spring Security (JWT) |
| **Dados** | PostgreSQL (Cloud SQL), Google Cloud Storage, Flyway |
| **Infraestrutura e Nuvem** | Docker, Terraform, Cloud Run, Firebase Hosting |
| **Garantia de Qualidade (QA)** | JUnit 5, Vitest, Playwright (E2E), K6 (Testes de Carga) |

[:material-arrow-right: Ver C4 Model Completo](arquitetura/diagramas/c4_model.md){ .md-button style="margin-top: 1rem;" }

</div>

---

<div class="section-heading" markdown>

## :material-account-heart: Time AILAB Makers

</div>

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

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 10/06/2026 | Fundação da documentação técnica e governança | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Reestruturação arquitetural da documentação e introdução de guias DevEx | Pedro Henrique P. Santos |
| `1.2` | 01/07/2026 | Refinamento Premium de UX/UI | Pedro Henrique P. Santos |
| `1.3` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |
| `1.4` | 06/07/2026 | Redesign completo da Home com animações de alto impacto | Pedro Henrique P. Santos |
| `1.5` | 11/07/2026 | Atualização da Stack (K6, Terraform) e simplificação visual da tabela | Pedro Henrique P. Santos |
