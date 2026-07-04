---
title: 'Trilha de Estudos por Função'
---

# :material-road-variant: Trilha de Estudos por Função

Como a equipe utilizará um esquema de rotações para atuar como **Full Stack**, criamos esta trilha de estudos focada no desenvolvimento gradativo. 

Sabemos que a equipe está em formação ("crua"), por isso cada trilha foi desenhada em **Níveis**, começando da fundação absoluta até chegar no conhecimento necessário para atuar no projeto EdTech.

---

##  Frontend (React & UI)

**Foco:** Construir interfaces de usuário, gerenciar estado no navegador e consumir APIs do backend.

###  Nível 1: Fundações Web

- **HTML & CSS:** Estrutura de páginas, semântica, Flexbox e Grid.

- **Lógica em JavaScript:** Variáveis, Funções (Arrow Functions), Arrays (`map`, `filter`), Promises e `async/await`.

- **DOM:** Como o JavaScript manipula o HTML.

###  Nível 2: O Mundo React

- **Componentização:** O que são componentes e o que é JSX.

- **Props & State:** Como passar dados entre componentes e usar o `useState`.

- **Efeitos Colaterais:** Como carregar dados ao abrir a tela usando `useEffect`.

- **CSS Puro e Design System:** Como estruturar estilos robustos usando variáveis nativas (`--var`), Flexbox, Grid e criar temas claros/escuros sem depender de frameworks como Tailwind.

###  Nível 3: O Padrão EdTech

- **Roteamento:** Configuração de rotas de tela (ex: React Router).

- **Consumo de APIs REST:** Como usar `fetch` ou `axios` para buscar e enviar dados para o backend.

- **Autenticação Segura:** Como o Frontend lida com Sessão via Cookies HttpOnly e como reagir a um erro `401 Unauthorized` (redirecionando para login).

---

##  Backend (Spring Boot & Java)

**Foco:** Desenvolver a lógica de negócios, endpoints da API, regras de segurança e persistência de dados.

###  Nível 1: Lógica Java e Internet

- **Java Core:** Orientação a Objetos (Classes, Interfaces), Coleções (Lists, Maps), Tratamento de Exceções (`try/catch`).

- **Web Básico:** O que é o protocolo HTTP, Verbos REST (GET, POST, PUT, DELETE), e o formato JSON.

###  Nível 2: Fundamentos do Spring Boot

- **Injeção de Dependência:** Entender as anotações `@Component`, `@Service`, `@RestController`.

- **Camadas:** A diferença entre um Controller (recebe a requisição) e um Service (regras de negócio).

- **Tratamento de Exceções Globais:** Como usar o `@ExceptionHandler` para retornar erros legíveis em JSON.

###  Nível 3: O Padrão EdTech (Dados e Segurança)
- **Banco de Dados & Migrações:** Conexão com PostgreSQL via Spring Data JPA e versionamento de esquema com **Flyway**.

- **Segurança Avançada:** Uso do Spring Security para validar Token JWT, enviar Cookies `HttpOnly`/`Secure` e proteger contra **CSRF** (Cross-Site Request Forgery) ajustando regras de **CORS**.

- **Integração Cloud:** Uso do Google Cloud Storage (GCS) para lidar com upload/download de binários (PDFs).

---

##  QA (Quality Assurance & Testes)

**Foco:** Garantir que as entregas funcionem conforme os requisitos e não quebrem funcionalidades existentes.

###  Nível 1: Fundamentos da Qualidade

- **O que é Teste de Software?** Diferença entre Teste Unitário, Teste de Integração e Teste End-to-End.

- **Leitura de Requisitos:** Como ler as Histórias de Usuário e os Critérios de Aceite para extrair "O que deve ser testado".

- **Caminhos de Teste:** O que é "Caminho Feliz" (Happy Path) vs "Caminho de Erro" ou "Cenário Alternativo".

###  Nível 2: Testes Manuais e de API

- **Testes de API:** Como usar Postman ou Insomnia para bater nas rotas criadas pelo Backend.

- **Exploração do Sistema:** Como simular as personas do EdTech de forma manual na tela para caçar bugs visuais.

###  Nível 3: O Padrão EdTech (Automação)
- **JUnit 5 & Mockito:** Como escrever um teste automatizado no Java isolando o Banco de Dados.

- **Cobertura de Código:** Como ler um relatório para saber se a lógica crítica do backend foi coberta pelos testes unitários.

---

##  DevOps (Infra, Deploy & Cloud)

**Foco:** Gerenciar o ambiente em que a aplicação roda, garantindo integrações contínuas, banco de dados e deployments.

###  Nível 1: Linha de Comando e Versionamento

- **Git Avançado:** Além do commit: como fazer branches, lidar com conflitos (merge) e abrir Pull Requests (PRs).

- **Terminal Linux:** Comandos básicos para navegação e permissões.

###  Nível 2: Conteinerização

- **O que é Docker?** A diferença entre Imagens e Containers.

- **Docker Compose:** Como usar o arquivo `docker-compose.yml` da pasta `infra/` para subir o Banco de Dados PostgreSQL na máquina de todo o time com um só comando.

###  Nível 3: O Padrão EdTech (Nuvem e Pipelines)
- **CI/CD Automático:** Como o **GitHub Actions** roda testes (JUnit) e faz o deploy seguro para o provedor nas mesclagens de código.

- **Google Cloud Run (Serverless):** Entender aplicações "Stateless" e como subir contêineres Docker que escalam elasticamente.

- **Segurança Cloud & IAM:** Uso do *Workload Identity Federation* para não vazar variáveis sensíveis de banco/arquivos em repositórios (sem chaves fixas no `.env`).

---

##  Docs & Logs (Observabilidade e Documentação)

**Foco:** Manter a rastreabilidade do sistema através de auditoria e garantir que o MkDocs esteja atualizado.

###  Nível 1: Comunicação Técnica

- **Markdown (MD):** Sintaxe básica para criar títulos, negrito, tabelas e links.

- **Boas Práticas de Escrita:** Como escrever de forma clara, direta e orientada a desenvolvedores.

###  Nível 2: Documentação Viva

- **MkDocs / Material:** Como subir o servidor de documentação localmente (`uv run mkdocs serve`) e como editar o menu (`mkdocs.yml`).

- **Mermaid JS & ADRs:** Como desenhar diagramas arquiteturais via código e como documentar escolhas em *Architecture Decision Records* (ADRs).

###  Nível 3: O Padrão EdTech (Rastreabilidade)
- **Cultura de Logs:** O que é importante registrar no backend (Níveis de log: INFO, WARN, ERROR).

- **Logs de Auditoria:** Como criar um registro imutável no banco sempre que um orientador ou pesquisador manipular arquivos importantes.

- **Proteção de Dados:** Saber o que NUNCA deve ser guardado em logs (senhas, tokens e dados sensíveis dos usuários).

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 29/05/2026 | Recuperação da Trilha de Estudos para o EdTech | Pedro Henrique P. Santos |
| `1.1` | 30/05/2026 | Expansão da trilha (Do Básico ao Padrão EdTech) para desenvolvedores iniciantes | Pedro Henrique P. Santos |
| `1.2` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |

