# EdTech — DocVault Monorepo

Sistema web para centralização, gerenciamento e auditoria de publicações acadêmicas, relatórios de pesquisa e datasets. Desenvolvido para modernizar fluxos de aprovação e garantir rastreabilidade total das operações.

---

## Estrutura do Monorepo

O repositório adota a arquitetura de monorepo para facilitar o controle de versão e integração contínua:

```text
docvault/
├── api/           # Backend — regras de negócio, aprovações, auditoria e integração GCS
└── frontend/      # Interface Web — SPA construída em Vue 3
```

---

## 🛠 Stack Tecnológica Atualizada

### Backend (`api/`)
* **Linguagem:** Java 21
* **Framework:** Spring Boot 3
* **Banco de Dados:** PostgreSQL 16 (via Docker / Cloud SQL)
* **Migrations:** Flyway
* **Armazenamento de Arquivos:** Google Cloud Storage (GCS)
* **Qualidade de Código & Testes:** 
  * JUnit 5 & Mockito (Testes Unitários)
  * JaCoCo (Cobertura de Código)
  * PiTest (Testes de Mutação)
  * SpotBugs & Checkstyle (Análise Estática e Padronização)
* **Documentação de API:** Swagger / OpenAPI

### Frontend (`frontend/`)
* **Framework:** Vue 3 (Composition API)
* **Build Tool:** Vite
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS + UI Components Modernos
* **Qualidade de Código:** ESLint, Prettier, Vue TSC

### DevOps & CI/CD
* **Pipeline:** GitHub Actions
* **Fluxo:** Unified Pipeline (Lint -> Build -> Test -> Deploy) com verificação estrita de qualidade em Pull Requests.

---

## ⚙️ Principais Funcionalidades Implementadas

1. **Gestão de Documentos (Lifecycle)**
   * Fluxo de aprovação em estados: `DRAFT` (Rascunho) ➔ `IN_REVIEW` (Em Análise) ➔ `APPROVED` (Aprovado) ou `REJECTED` (Rejeitado).
2. **Logs de Auditoria (Audit Trail)**
   * Sistema inteligente baseado em AOP (Aspect-Oriented Programming) que rastreia e armazena de forma imutável quem fez o quê e quando.
3. **Google Cloud Storage (GCS)**
   * Armazenamento escalável e seguro para arquivos PDF e metadados na nuvem do Google.
4. **API Segura e Documentada**
   * Endpoints protegidos, documentados de forma nativa e interativa no Swagger UI.

---

## 🚀 Como Rodar Localmente

### 1. Preparando o Banco de Dados
A maneira mais fácil de subir o banco é utilizando Docker:
```bash
cd infra
docker-compose up -d
```
*Isso vai subir uma instância do PostgreSQL configurada para a aplicação na porta 5432.*

### 2. Rodando o Backend (API)
```bash
cd docvault/api
```
Configure as variáveis de ambiente necessárias para conectar ao banco e ao Google Cloud Storage (ou utilize o arquivo `.env`/configurações da sua IDE).

```bash
# Para compilar e rodar os testes
./mvnw clean verify

# Para iniciar o Spring Boot
./mvnw spring-boot:run
```
*Acesse o Swagger em: http://localhost:8080/swagger-ui.html*

### 3. Rodando o Frontend
```bash
cd docvault/frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
*Acesse o sistema no navegador no endereço informado no terminal (geralmente http://localhost:5173).*
