<div align="center">
  <img src="docs/assets/imgs/banner-github.png" alt="EdTech Banner" width="100%">
</div>

> Um repositório para transformar rigor acadêmico em software verificável — com decisões, evidências e responsabilidade.

# EdTech — Governança Acadêmica e Repositório Científico

[![Documentação](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml)
[![CI/CD](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/Java-007396?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?logo=googlecloud&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-DD2C00?logo=firebase&logoColor=white)

## Visão geral

O **EdTech** centraliza a submissão, revisão, armazenamento e auditoria de documentos e datasets acadêmicos. A plataforma atende Pesquisadores, Orientadores e Auditores com rastreabilidade, autorização por perfil e trilha de auditoria.

> **Documentação oficial:** [pedrohpsantos.github.io/EdTech](https://pedrohpsantos.github.io/EdTech/)

## Capacidades

- Cadastro com verificação por e-mail, recuperação de senha e autenticação em dois fatores opcional.
- Sessão JWT em cookie `HttpOnly`, `Secure` e `SameSite=Strict`; a SPA usa `withCredentials`.
- Projetos, membros de laboratório e permissões por perfil.
- Upload de PDF, CSV e JSON para o Google Cloud Storage, revisão, comentários, favoritos e links de download autorizados.
- Auditoria filtrável e exportável, painel de métricas e indicadores de conformidade.
- Migrações Flyway em Cloud Run Job e deploy automatizado para Cloud Run e Firebase Hosting.

## Módulos

| Módulo | Responsabilidade | Guia |
| --- | --- | --- |
| Frontend | SPA React/Vite, acessibilidade e jornadas dos perfis. | [frontend/README.md](frontend/README.md) |
| Backend | API Java/Spring Boot, regras de negócio, segurança e persistência. | [backend/README.md](backend/README.md) |
| Infraestrutura | Ambiente local Docker, Terraform e recursos GCP. | [infra/README.md](infra/README.md) |
| Testes | E2E, carga, contrato de segurança e Lighthouse. | [tests/README.md](tests/README.md) |
| Documentação | Portal MkDocs Material e ADRs. | [docs/README.md](docs/README.md) |
| Scripts | Verificação de backup e carga de contas demo locais. | [scripts/README.md](scripts/README.md) |
| Postman | Coleção manual da API. | [.postman/README.md](.postman/README.md) |

## Comece aqui

Pré-requisitos: Docker Desktop com Docker Compose.

```bash
git clone https://github.com/pedrohpsantos/EdTech.git
cd EdTech

Copy-Item infra/dev/.env.example infra/dev/.env
# Edite infra/dev/.env e defina POSTGRES_PASSWORD e JWT_SECRET.

docker compose --env-file infra/dev/.env -f infra/dev/docker-compose.yml up --build -d
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080/actuator/health`
- Adminer: `http://localhost:8081`

Para encerrar: `docker compose --env-file infra/dev/.env -f infra/dev/docker-compose.yml down`.

## Validação e entrega

`main` publica produção e `develop` publica staging. A CI valida backend, frontend e infraestrutura em paralelo; após o deploy, executa testes de produção conforme suas dependências:

- **k6** e **contrato de segurança da API** dependem do backend;
- **E2E Playwright** e **Lighthouse** dependem do backend e do frontend.

Os relatórios são disponibilizados como artefatos da execução. Veja o fluxo completo em [.github/PIPELINES.md](.github/PIPELINES.md).

### Evidência que orienta decisões

O projeto não usa uma única métrica como selo de qualidade. JaCoCo mostra alcance do backend; PIT e Stryker testam a força das asserções; Playwright/Allure percorrem jornadas essenciais; k6 observa a API sob carga; Lighthouse acompanha a experiência da primeira visita. Os relatórios publicados transformam cada entrega em uma conversa objetiva sobre comportamento, segurança e desempenho.

## Referências e contribuição

1. Crie uma branch a partir de `develop`.
2. Execute as validações do módulo alterado.
3. Abra um PR para `develop` usando Conventional Commits.
4. Promova para `main` somente após a CI de `develop` passar.

Consulte as [pipelines](.github/PIPELINES.md), o [guia de contribuição](.github/CONTRIBUTING.md), o [código de conduta](.github/CODE_OF_CONDUCT.md), a [política de segurança](.github/SECURITY.md), o [changelog](CHANGELOG.md) e a [licença MIT](LICENSE).
