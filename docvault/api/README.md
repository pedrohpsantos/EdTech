# api/ — Backend do EdTech

Backend principal do EdTech, responsável pelas regras de negócio, upload de documentos, controle de versões e geração de logs auditáveis.

---

## Responsabilidade

- Receber e processar requisições HTTP autenticadas
- Gerenciar upload de documentos (PDFs, datasets, relatórios)
- Controlar versões de documentos por usuário
- Registrar logs de auditoria centralizados e inalteráveis
- Aplicar isolamento estrito entre usuários e projetos

---

## Stack

| Tecnologia | Versão | Função |
| :--- | :---: | :--- |
| **Java** | 17 LTS | Linguagem principal |
| **Spring Boot** | 3.x | Framework web e autoconfiguração |
| **Spring Security** | — | Proteção de rotas e controle de acesso |
| **Flyway** | — | Migrações de banco de dados versionadas |
| **PostgreSQL** | — | Banco de dados relacional |

---

## Arquitetura em Camadas

```text
api/src/main/java/com/docvault/
├── controller/     # Recebe as requisições HTTP e delega ao service
├── service/        # Regras de negócio e orquestração
├── repository/     # Acesso ao banco de dados (Spring Data JPA)
├── model/          # Entidades JPA mapeadas para as tabelas do banco
├── dto/            # Objetos de transferência de dados (request/response)
├── config/         # Configurações (Security, Flyway, Cloud Storage)
└── audit/          # Lógica de logs auditáveis centralizados
```

### Fluxo de uma Requisição

```
HTTP Request → Controller → Service → Repository → Database
                                  ↘ Audit (log)
```

Cada camada tem responsabilidade única:

| Camada | Responsabilidade |
| :--- | :--- |
| **controller/** | Mapeamento de rotas, validação de entrada, serialização da resposta |
| **service/** | Regras de negócio, transações, orquestração entre repositórios |
| **repository/** | Queries ao banco via Spring Data JPA |
| **model/** | Entidades persistidas (`@Entity`, `@Table`) |
| **dto/** | Contratos de entrada e saída da API (desacoplados do modelo) |
| **config/** | Beans de configuração: SecurityConfig, FlywayConfig, StorageConfig |
| **audit/** | Interceptors e serviços de log imutável de ações do sistema |

---

## Como Rodar

### Com Maven local

Configure um PostgreSQL local ou use o Docker Compose da raiz do projeto. O backend le as seguintes variaveis:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION_MINUTES`

```bash
cd docvault/api
mvn spring-boot:run
```

### Com Docker Compose

```bash
cp infra/.env.example infra/.env
# Preencha POSTGRES_PASSWORD e JWT_SECRET em infra/.env
docker compose --env-file infra/.env -f infra/docker-compose.yml up --build
```

Se a porta local `5432` ja estiver ocupada, altere `POSTGRES_PORT` em `infra/.env`.
Essa porta e usada apenas para acesso externo ao PostgreSQL; o backend usa `db:5432` dentro da rede do Compose.

### Teste de cadastro

```bash
curl -i -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Pesquisadora",
    "email": "ana.pesquisadora@unb.br",
    "password": "senha-segura-123"
  }'
```
