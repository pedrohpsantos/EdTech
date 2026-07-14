# Backend — EdTech

![Java](https://img.shields.io/badge/Java-007396?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![JUnit](https://img.shields.io/badge/JUnit-25A162?logo=junit5&logoColor=white)

> A camada que preserva contexto, autoria e confiança em cada documento acadêmico.

## Visão geral

API REST em Java 21 e Spring Boot. Concentra as regras de negócio, autenticação, autorização, auditoria, armazenamento de arquivos e integração com Cloud SQL/GCS.

## Autenticação e segurança

- A sessão é um JWT entregue no cookie `jwt`, com `HttpOnly`, `Secure` e `SameSite=None`; a API aceita credenciais apenas da origem CORS configurada.
- O cliente deve enviar credenciais de cookie (`withCredentials` no frontend). Não há token JWT no `localStorage`.
- As rotas de autenticação e recuperação têm rate limiting; respostas `429` devem ser tratadas pelo cliente.
- A API fornece `X-Request-ID`, HSTS, CSP, `X-Frame-Options: DENY` e `X-Content-Type-Options: nosniff`.
- CORS é limitado à origem configurada em `CORS_ALLOWED_ORIGINS`.

## Rotas principais

| Área | Rota base | Exemplos |
| --- | --- | --- |
| Autenticação | `/api/auth` | cadastro, verificação, login, 2FA, recuperação, logout e `/me` |
| Projetos | `/api/projects` | criar, listar e adicionar membros |
| Documentos | `/api/documents` | upload multipart, listagem, download, revisão, comentários e auditoria por documento |
| Auditoria | `/api/audit-logs` | consulta paginada e exportação CSV para Auditor |
| Painel | `/api/dashboard` | métricas e conformidade |
| Laboratório | `/api/v1/laboratory` | emissão e uso de tokens de vínculo |
| Operação | `/actuator/health` | health check público |

Em desenvolvimento, a especificação pode ser explorada em [Swagger UI](http://localhost:8080/swagger-ui.html). Em produção, a interface OpenAPI fica desabilitada.

## Comece aqui

Pré-requisitos: JDK 21. Para banco, variáveis e serviços auxiliares, prefira o [Docker Compose](../infra/README.md).

```bash
cd backend

# Unix/macOS
./mvnw spring-boot:run

# Windows PowerShell
.\mvnw.cmd spring-boot:run
```

Para executar sem Docker, copie `.env.example`, configure PostgreSQL e SMTP de desenvolvimento e exporte as variáveis antes de iniciar a aplicação.

## Validação

```bash
# testes e cobertura JaCoCo
./mvnw clean test jacoco:report -B

# qualidade estática
./mvnw compile checkstyle:check spotbugs:check -B

# mutação
./mvnw test-compile org.pitest:pitest-maven:mutationCoverage -B
```

Os relatórios locais ficam em `target/site/jacoco/` e `target/pit-reports/`. A CI também executa OWASP Dependency-Check.

JaCoCo mantém o piso estrutural do bundle; PIT aplica pisos de cobertura e mutação aos serviços críticos. Os dois indicadores andam juntos: cobertura sem testes que detectam mutações não é confiança suficiente.

## Operação em produção

O deploy é realizado pela pipeline GitHub Actions: a imagem é publicada no Artifact Registry, o Job Flyway é executado e o Terraform atualiza o Cloud Run. Não execute migrações diretamente na inicialização da API de produção.

## Referências

- [Frontend](../frontend/README.md)
- [Infraestrutura](../infra/README.md)
- [Pipelines](../.github/PIPELINES.md)
