# ⚙️ EdTech Backend

![Java](https://img.shields.io/badge/Java-21_LTS-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Security](https://img.shields.io/badge/Security-JWT-red?style=for-the-badge&logo=springsecurity)

API RESTful do EdTech desenvolvida em **Java 21** com **Spring Boot 4.1**. Responsável pelas regras de negócio, autenticação, controle de acesso e persistência de dados.

## Arquitetura em Camadas

| Camada | Pacote | Responsabilidade |
| :--- | :--- | :--- |
| Controllers | `/controller` | Recepção de requisições HTTP, validação de entrada (Bean Validation) e serialização de resposta |
| Services | `/service` | Regras de negócio e coordenação de transações |
| Repositories | `/repository` | Acesso ao banco de dados via Spring Data JPA |
| Configurações | `/config` | Segurança (CORS, JWT), beans de infraestrutura e integração com GCS |

---

## Segurança

- **JWT via Cabeçalho:** A comunicação entre SPA e API utiliza tokens no cabeçalho `Authorization` (Bearer), sem uso de cookies e anulando riscos de CSRF.
- **CORS Restrito:** Apenas origens cadastradas explicitamente têm permissão de consumir a API.
- **Rate Limiting (Bucket4j):** Endpoints de autenticação bloqueiam IPs após 5 tentativas por minuto (HTTP 429).
- **Auditoria:** Operações críticas (upload, aprovação, rejeição) geram registros imutáveis na trilha de auditoria.

---

## Setup Local

**Pré-requisitos:**
- JDK 21
- Maven 3.9+
- PostgreSQL em execução (pode ser iniciado via Docker Compose em `/infra`)

```bash
# Compile e instale as dependências sem executar os testes
./mvnw clean install -DskipTests

# Inicie a aplicação com o perfil de desenvolvimento
./mvnw spring-boot:run
```

A forma recomendada para desenvolvimento local é utilizar o Docker Compose disponível em `/infra`, que provisiona automaticamente o banco de dados e as dependências de infraestrutura.

---

## Testes

```bash
# Executar todos os testes unitários e de integração
./mvnw test

# Gerar relatório de cobertura JaCoCo (mínimo: 80%)
./mvnw test jacoco:report
```

O relatório de cobertura é gerado em `target/site/jacoco/index.html`. A pipeline de CI bloqueia merges com cobertura abaixo de **80% de instruções** e **80% de branches**.

Novos endpoints devem vir acompanhados de testes unitários ou de integração antes de serem submetidos via PR.
