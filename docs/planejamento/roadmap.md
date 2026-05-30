# :material-road-variant: Roadmap de Estudos por Função

Como a equipe utilizará um esquema de rotações para atuar como **Full Stack**, criamos este roadmap de estudos focado no que cada pessoa deve focar durante o seu ciclo em cada função.

Isso garante que, a cada nova rotação, o integrante saiba exatamente quais tecnologias, conceitos e práticas deve aprender e aplicar.

*(Nota: O Tech Lead é uma função fixa focada em mentoria, revisão e arquitetura geral, não entrando neste roadmap de estudos rotativos).*

---

## 💻 Frontend (React & UI)

**Foco:** Construir interfaces de usuário, gerenciar estado no navegador e consumir APIs do backend.

### O que estudar durante a rotação:
- **React Básico:** Componentes, JSX, Props, e State (`useState`, `useEffect`).
- **Roteamento:** Configuração de rotas no frontend (ex: React Router).
- **Estilização:** Integração com Bootstrap 5 e CSS customizado.
- **Integração HTTP:** Consumo da API REST usando `fetch` ou `axios`.
- **Autenticação no Client:** Gerenciamento da sessão e reação a status `401 Unauthorized`.
- **UX/UI Básica:** Garantir que o design atenda aos requisitos de usabilidade.

---

## ⚙️ Backend (Spring Boot & Java)

**Foco:** Desenvolver a lógica de negócios, endpoints da API, regras de segurança e persistência de dados.

### O que estudar durante a rotação:
- **Spring Boot Básico:** Estrutura do projeto, Controllers, Services e Repositories.
- **REST APIs:** Criação de endpoints (GET, POST, PUT, DELETE) e padrão de respostas (JSON).
- **Spring Security & JWT:** Implementação de filtros, geração e validação de tokens JWT usando cookies `HttpOnly`.
- **JPA / Hibernate:** Mapeamento de entidades para o banco de dados PostgreSQL e consultas básicas.
- **Tratamento de Exceções:** Retornos padronizados de erro (`@ExceptionHandler`).

---

## 🛡️ QA (Quality Assurance & Testes)

**Foco:** Garantir que as entregas funcionem conforme os requisitos e não quebrem funcionalidades existentes.

### O que estudar durante a rotação:
- **Testes Unitários:** Criação de testes no backend usando JUnit e Mockito.
- **Cobertura de Código:** Entender métricas básicas de testes.
- **Validação de Casos de Uso:** Revisar os Critérios de Aceitação das User Stories e testar o sistema manualmente cobrindo os "caminhos felizes" e "caminhos de erro".
- **Testes de Integração:** Validar a comunicação entre o frontend (React) e a API (Spring Boot).

---

## 🚀 DevOps (Infra, Deploy & Cloud)

**Foco:** Gerenciar o ambiente em que a aplicação roda, garantindo integrações contínuas, banco de dados e deployments.

### O que estudar durante a rotação:
- **Docker:** Entender `Dockerfile` e `docker-compose.yml`, subindo o banco PostgreSQL e a aplicação localmente.
- **CI/CD:** Entender e ajustar as Actions do GitHub (ex: lint, testes automáticos).
- **Cloud Básica:** Deploy no Google Cloud Run e configuração do Google Cloud Storage (GCS) para upload de documentos.
- **Gestão de Segredos:** Como gerenciar variáveis de ambiente e não vazar chaves de API.

---

## 📝 Docs & Logs (Observabilidade e Documentação)

**Foco:** Manter a rastreabilidade do sistema através de auditoria e garantir que o MkDocs esteja atualizado.

### O que estudar durante a rotação:
- **Auditoria / Logs no Spring:** Implementação de logs estruturados (AOP ou logs manuais nos controllers/services) para rastrear quem acessou, baixou ou modificou dados.
- **Markdown & MkDocs:** Atualizar a documentação técnica, atas de reunião e arquitetura usando sintaxe Markdown e Material for MkDocs.
- **Mermaid:** Criação de fluxogramas e diagramas arquiteturais para manter o projeto legível.
- **Monitoramento:** Compreender a estrutura e armazenamento de logs imutáveis conforme definido nos Requisitos Não Funcionais.


---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 29/05/2026 | Criação do documento | Pedro Henrique P. Santos |
