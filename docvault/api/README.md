# api/ — Backend do EdTech

Backend principal do EdTech, responsável pelas regras de negócio, upload de documentos (S3), controle de versões, segurança robusta com JWT/CSRF e geração de logs de auditoria imutáveis (Supabase RLS).

---

## 🎯 Responsabilidade

- Receber, validar e processar requisições HTTP do frontend.
- Gerenciar upload de PDFs e datasets via Cloud Storage (Supabase).
- Controlar papéis e acessos granulares (Pesquisador, Orientador, Auditor).
- Gerar Logs Inalteráveis de todas as operações sensíveis (inseridos sob RLS estrito).
- Expor contratos de API coesos e bem estruturados.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Função |
| :--- | :---: | :--- |
| **Java** | 21 LTS | Linguagem principal, utilizando Virtual Threads (Project Loom) |
| **Spring Boot** | 4.1.x | Framework web, injeção de dependência e Data JPA |
| **Spring Security** | 6.x | Proteção de rotas, controle CORS e mitigação CSRF |
| **Flyway** | 10.x | Versionamento e migrações do banco de dados relacional |
| **PostgreSQL** | 15+ | Banco hospedado via Supabase (com Row Level Security) |
| **Mockito / JUnit 5**| 5.x | Suíte de testes unitários e de integração |

---

## 📂 Arquitetura em Camadas

```text
api/src/main/java/com/docvault/
├── controller/     # Rotas HTTP, leitura de cookies CSRF e DTOs de entrada
├── service/        # Regras de negócio, transações (Transactional)
├── repository/     # Queries ao banco via Spring Data JPA
├── model/          # Entidades mapeadas ao PostgreSQL (@Entity)
├── dto/            # Objetos de Transferência de Dados (request/response)
├── config/         # Beans (SecurityConfig, Flyway, AWS S3 / GCS, Web)
└── audit/          # Lógica de Logs de Auditoria injetada transversalmente
```

---

## 🔒 Segurança e Conexão (Supabase)

O Backend conecta ao PostgreSQL usando a string **Admin/Service Role** do Supabase. Como a política de RLS (Row Level Security) bloqueia todo acesso anônimo diretamente na API pública do Supabase, nosso Spring Boot atua como um escudo protetor e orquestrador de regras.

1. **Autenticação:** Cookies `HttpOnly`, `SameSite=Strict`.
2. **Proteção:** Ativação dupla de segurança utilizando token Anti-CSRF (`XSRF-TOKEN`).

---

## 🚀 Como Rodar Localmente

O backend requer variáveis de ambiente para injetar os provedores de nuvem (Storage) e o Banco de Dados.

### 1. Com Docker Compose (Recomendado)

```bash
# Na raiz do projeto EdTech, copie as variáveis de exemplo
cp infra/.env.example infra/.env

# (Preencha POSTGRES_PASSWORD, JWT_SECRET e credenciais de nuvem em infra/.env)

# Suba a infraestrutura completa
docker compose --env-file infra/.env -f infra/docker-compose.yml up --build backend
```

O backend usará `db:5432` da rede interna.

### 2. Com Maven CLI (Ambiente Dev)

Exporte as variáveis localmente e rode:

```bash
cd docvault/api
mvn spring-boot:run
```

---

## 🧪 Notas de Desenvolvimento e Testes (Java 21)

Se estiver rodando a suíte de testes unitários localmente (`mvn test`), o framework do Mockito precisa de privilégios especiais devido ao encapsulamento restrito do Java 21. Nosso `pom.xml` já está configurado com a *JVM Arg* necessária no `maven-surefire-plugin`:
`-XX:+EnableDynamicAgentLoading`.

---

### Teste Rápido de Saúde (Cadastro)

```bash
curl -i -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Local Admin",
    "email": "admin@edtech.unb.br",
    "password": "senha-local-forte"
  }'
```
