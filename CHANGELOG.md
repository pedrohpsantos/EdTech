# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.
O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), e este projeto adota [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-07-06

### Adicionado
- **MVP Inicial do EdTech**: Plataforma completa para gerenciamento e auditoria de publicações acadêmicas.
- **Backend (API)**: Autenticação baseada em JWT (Bearer Token), CRUD de documentos, integração com Google Cloud Storage para uploads.
- **Frontend (SPA)**: Interface React responsiva para pesquisadores, orientadores e auditores.
- **Infraestrutura**: Configuração Docker e migrações Flyway.
- **Documentação**: Portal MkDocs com arquitetura, guias de desenvolvimento e manuais.
- **Segurança**: Trilha de auditoria imutável, Rate Limiting (Bucket4j) e backups automatizados.
- **Resiliência e Recuperação de Desastres:** Provisão de rotina de Backup Automático assíncrona diária (PostgreSQL Dump) pelo Cloud Scheduler e Cloud SQL Export, com políticas de expurgo rotativo no GCS.
- **Trilha de Auditoria (Audit Logs):** Endpoint e logs irremovíveis nativos na base de dados (registrando vínculo de membros e deleções), integrados à interface de interface administrativa.
- **Gestão de Qualidade Integrada:** Barreiras rígidas de validação de qualidade em pipeline contínuo (JaCoCo imposto acima de 80% e verificação total do Checkstyle).
- **Associação Pesquisador-Laboratório:** Liberação das operações transacionais e da interface no Frontend para navegação e associação a projetos ativados na plataforma.

### Changed
- Refatoração massiva da base documental técnica (MkDocs e READMEs globais) padronizando terminologia estritamente corporativa e abolindo "personas" (tons informais).
- Atualização completa de referências nas ADRs para aderir ao novo modelo IaC.

### Removed
- **Legado de Armazenamento:** Extinção de operações e suportes a salvamento de artefatos localmente (arquivos em disco), convertidos compulsoriamente para Storage Cloud.
- **Histórico Antigo (Pré-MVP):** Reset geral do Changelog local para inaugurar adequadamente o estágio 1.0.0 do projeto.
