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
| **Frontend** | ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white) |
| **Backend** | ![Java](https://img.shields.io/badge/Java-21_LTS-007396?logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?logo=springboot&logoColor=white) ![Spring Security](https://img.shields.io/badge/Spring_Security-JWT-6DB33F?logo=springsecurity&logoColor=white) |
| **Dados** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white) ![Cloud Storage](https://img.shields.io/badge/Google_Cloud_Storage-4285F4?logo=googlecloud&logoColor=white) ![Flyway](https://img.shields.io/badge/Flyway-Migrations-CC0200?logo=flyway&logoColor=white) |
| **Infraestrutura e Nuvem** | ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) ![Terraform](https://img.shields.io/badge/Terraform-7B42BC?logo=terraform&logoColor=white) ![Cloud Run](https://img.shields.io/badge/Cloud_Run-4285F4?logo=googlecloud&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase_Hosting-FFCA28?logo=firebase&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white) |
| **Garantia de Qualidade (QA)** | ![JUnit5](https://img.shields.io/badge/JUnit_5-25A162?logo=junit5&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-729B1B?logo=vitest&logoColor=white) ![JaCoCo](https://img.shields.io/badge/JaCoCo-Coverage-red) ![PiTest](https://img.shields.io/badge/PiTest-Mutation-orange) ![Stryker](https://img.shields.io/badge/Stryker-Mutation-E36209?logo=stryker&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white) ![K6](https://img.shields.io/badge/K6-Load_Testing-7D64FF?logo=k6&logoColor=white) ![Lighthouse](https://img.shields.io/badge/Lighthouse-UX_%26_SEO-F44B21?logo=lighthouse&logoColor=white) |
| **Scripts e Documentação** | ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white) ![Pandas](https://img.shields.io/badge/Pandas-150458?logo=pandas&logoColor=white) ![MkDocs](https://img.shields.io/badge/MkDocs_Material-526CFE?logo=materialformkdocs&logoColor=white) |

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
