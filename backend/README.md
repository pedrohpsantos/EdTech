# ⚙️ EdTech Backend (API Restful)

Este módulo abrange a **Inteligência Central** da plataforma EdTech. O backend atua como um escudo protetor para o Banco de Dados (PostgreSQL) e o sistema de arquivos distribuído na nuvem, encarregando-se da pesada lógica de governança.

---

## 🎯 Objetivo

Garantir o isolamento e controle absoluto sobre os dados da pesquisa acadêmica. Suas premissas são:
- Receber, desempacotar e injetar de forma segura datasets e PDFs em *Object Storages*.
- Garantir a autorização correta mediante tokens JWT em rotas públicas e privadas.
- Auditar ininterruptamente **todas** as ações (CRUDS), garantindo a existência de *Logs Imutáveis* necessários para o "Painel do Auditor".

---

## 🛠️ Tecnologias Utilizadas

Para garantir a robustez de uma aplicação *Enterprise Grade*, o ecossistema Spring foi adotado por completo:

| Tecnologia | Função na Aplicação |
| :--- | :--- |
| **Java 21 LTS** | Linguagem principal. Utiliza a potência do *Project Loom (Virtual Threads)* para concorrência de alta escala em limites curtos de hardware. |
| **Spring Boot 4.1.x** | Framework base, injeção de dependência e servidor Tomcat embutido. |
| **Spring Security 6.x**| Segurança de APIs (Filtros de JWT, Headers CORS estritos e Anti-CSRF). |
| **Spring Data JPA** | ORM (Hibernate) abstrato para comunicação fluida com o banco. |
| **Flyway 10.x** | *Database Migration Tool* para versionamento declarativo das tabelas. |
| **Google Cloud SDK** | Cliente nativo para integrações Cloud (Cloud Storage SDK). |
| **JUnit 5 & Mockito** | Frameworks de testes (Unitários e de Integração) garantindo confiabilidade. |

---

## 🔒 Governança e Arquitetura de Nuvem

O Backend é compilado no formato "Uber-Jar" (ou "Fat Jar") e encapsulado numa imagem Docker otimizada.

**Tolerância a Falhas e Isolamento:**
Esta API hospeda-se em um serviço escalável (Google Cloud Run) atuando com rede privada. Os dados repousam num banco *PostgreSQL* Cloud SQL invisível ao mundo exterior. Apenas a API, portando o *Google Cloud SQL Auth Proxy*, é capaz de injetar queries no banco.

---

## 📂 Arquitetura do Diretório

```text
api/src/main/java/com/docvault/
├── config/         # Beans e injeções primárias (CloudStorage, Flyway, WebSecurity)
├── controller/     # Endpoints HTTP (REST)
├── dto/            # Data Transfer Objects para requests/responses JSON
├── model/          # Classes e mapeamento de Entidades (JPA/Hibernate)
├── repository/     # Interfaces de Queries estendendo JpaRepository
├── service/        # Camada de transações e lógicas de negócios complexas
└── audit/          # Implementação transversal para salvar rastros irrefutáveis
```

---

## 🚀 Como Executar

### Pré-Requisitos
- Java 21 (JDK 21)
- Maven
- Banco PostgreSQL (Recomendado via Docker Compose da raiz)

### Passos Locais

1. Na pasta raiz do monorepo, inicie o banco de dados:
   ```bash
   docker-compose up -d db
   ```
2. Acesse a pasta do backend e rode com o *Maven Wrapper*:
   ```bash
   cd docvault/api
   ./mvnw spring-boot:run
   ```
3. A API inicializará na porta padrão `8080`.
