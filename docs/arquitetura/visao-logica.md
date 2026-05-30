# Visão Lógica e Stack Tecnológica

O sistema é logicamente particionado em camadas cliente-servidor padrão, com o backend organizado em um monorepo.

## 1. Camada Cliente (Frontend)

A interface de usuário é uma **SPA** desenvolvida em **React 18.x** com estilização via **Tailwind CSS 3.x** e **Bootstrap 5**. O frontend consome a API REST através de requisições AJAX assíncronas (ex: via Axios/Fetch API).

| Tecnologia | Versão | Função |
| :--- | :---: | :--- |
| **HTML5** | — | Estrutura semântica das páginas |
| **CSS3** | — | Estilização e responsividade |
| **JavaScript Vanilla** | ES6+ | Lógica de interação e requisições à API |
| **Bootstrap 5** | 5.x | Sistema de grid, componentes prontos e layout responsivo |
| **React** | 18.x | Biblioteca para construção de interfaces de usuário reativas e baseadas em componentes |

!!! info "Por que usar React?"
    O React foi escolhido pela sua popularidade, ecossistema robusto e capacidade de criar componentes modulares e reutilizáveis, facilitando a colaboração e a escalabilidade do frontend no desenvolvimento em equipe.

---

## 2. Camada Servidora (Backend)

O backend é um monólito modular **Spring Boot**, que orquestra a lógica de negócio, autenticação e comunicação externa.

| Tecnologia | Versão | Função |
| :--- | :---: | :--- |
| **Java** | 17 LTS | Linguagem principal — tipagem forte, ecossistema maduro |
| **Spring Boot** | 3.x | Framework web, injeção de dependências, autoconfiguração |
| **Spring Security** | — | Autenticação, autorização e proteção de rotas |
| **JWT** | — | Tokens de sessão em cookies `HttpOnly` + `Secure` |
| **Flyway** | — | Migrações de banco de dados versionadas |

O fluxo lógico na camada servidora é dividido nos seguintes componentes principais:

### Spring Security
Atua como um Gateway lógico interno para validação de JWTs extraídos dos cookies, protegendo rotas baseando-se no papel (Role) do usuário.

### Camada Web (Controllers)
Responsável pela exposição de APIs RESTful estruturadas, que recebem as requisições, realizam validações de entrada e delegam o processamento aos serviços de domínio.

### Integrações e Persistência
- **Google Cloud Storage (GCS)**: Cliente embarcado para manipulação direta de artefatos de arquivos (como os PDFs e datasets pesados).
- **Spring Data JPA / Hibernate**: Abstração de acesso a dados para comunicação eficiente e segura com o banco PostgreSQL.
