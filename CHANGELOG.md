# Changelog

Todos os recursos notáveis deste projeto serão documentados neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e este projeto segue [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-07-05

> **Nota de Release (MVP - Enterprise Ready):** Esta é a primeira versão oficial de produção (Minimum Viable Product). A plataforma transita do estágio de desenvolvimento local para a infraestrutura de Nuvem, consolidando a estabilidade da governança de dados, segurança da informação e esteiras ágeis.

### Added
- **Deploy de Produção:** Lançamento do Frontend SPA via Firebase Hosting (com SSL e CDN) e Backend API via Google Cloud Run (com Auto-scaling).
- **Segurança IaC:** Centralização do gerenciamento de variáveis críticas e secrets pelo Google Cloud Secret Manager.
- **Defesa Cibernética (AppSec):** Implementação de Rate Limiting via Bucket4j em rotas abertas de autenticação (mitigação de ataques de força bruta e repetições de carga com erro 429).
- **Gerenciamento de Storage Nativo S3:** Implantação de arquitetura robusta acoplada ao Supabase Storage / S3 para o ciclo de vida completo de documentos acadêmicos e PDFs.
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
