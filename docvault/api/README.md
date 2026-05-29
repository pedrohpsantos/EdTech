# api/ — Backend do DocVault Academic

Backend principal do DocVault Academic, responsável pelas regras de negócio, upload de documentos, controle de versões e geração de logs auditáveis.

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
| **Java** | 21 LTS | Linguagem principal |
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

> Instruções completas serão adicionadas após o scaffold inicial do Spring Boot.

```bash
cd docvault/api
./mvnw spring-boot:run
```
