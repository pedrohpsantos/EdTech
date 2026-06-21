# Changelog

Todos os recursos notáveis deste projeto serão documentados neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e este projeto segue [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.2.0] - 2026-06-21

### Added
- Integração com Supabase Storage via AWS S3 SDK para upload de documentos.
- Migrations Flyway V1–V7 cobrindo users, projects, project_members, documents e audit_logs.
- Endpoints de Projetos (CRUD) e Documentos (Upload, Listagem, Exclusão).
- Suíte de testes de integração com AuthController, JwtService e UserService.
- Configuração CORS completa com documentação de produção.
- Página de documentos no frontend com filtros por título e projeto.
- ADR 0001 atualizada para estratégia dual Supabase + GCS (fallback).

### Changed
- Upgrade de Spring Boot 3.3.6 → 4.1.0 (major version).
- Migração do armazenamento de GCS/disco local para Supabase Storage (S3).
- SameSite do cookie JWT alterado de `Strict` para `Lax`.

### Fixed
- Correção de testes quebrando após upgrade do Spring Boot 4.1 (`@AutoConfigureMockMvc` → `MockMvcBuilders`).
- Correção do Maven Wrapper (`.mvn/wrapper`).
- Remoção de alerta duplicado do JaCoCo no `pom.xml`.

## [0.1.0] - 2026-06-10

> **Nota de Release:** Esta é a primeira versão oficial da base documental e de governança do repositório. O produto (API e Frontend) ainda não possui uma versão funcional distribuível e segue em desenvolvimento ativo.

### Added
- Fundação completa da documentação técnica (*Docs-as-Code*) utilizando MkDocs.
- Definições de Arquitetura (C4 Model, Threat Model e ADRs documentadas).
- Documentos de Gestão de Produto (Canvas MVP, Requisitos Funcionais).
- Configuração base de CI/CD para documentação via GitHub Actions.
- Design System e Identidade Visual.
- Arquivos base do repositório (`CONTRIBUTING.md`, `LICENSE`, `SECURITY.md`, `CODE_OF_CONDUCT.md`).

### Changed
- Estruturação do `README.md` como portal do repositório, deixando claro o estágio atual da aplicação.
- Revisão do sumário do MkDocs para adequação técnica (traduções e correções de menu).

### Fixed
- Remoção de placeholders públicos confidenciais nos arquivos de segurança e conduta.
- Correção de conflitos entre a stack do README e a documentação técnica real.
