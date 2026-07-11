# Integração e Entrega Contínuas (CI/CD)

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Automated-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-Active-brightgreen?style=for-the-badge)
![CodeQL](https://img.shields.io/badge/CodeQL-Security_Scan-black?style=for-the-badge)

Este diretório (`.github`) concentra a configuração das esteiras automatizadas do GitHub Actions, além dos templates e políticas que orientam o fluxo de trabalho e a padronização no repositório do EdTech.

## Estrutura do Diretório

- **`/workflows`**: Contém os arquivos YAML responsáveis por toda automação de Integração Contínua (CI) e Entrega Contínua (CD).
- **`PULL_REQUEST_TEMPLATE.md`**: Template obrigatório para submissão de Pull Requests. Padroniza a descrição do que foi alterado e o checklist de aceite técnico.
- **`ISSUE_TEMPLATE`**: Formulários estruturados para criação padronizada de relatórios de bugs e propostas de funcionalidades.
- **Políticas e Manuais**: Documentação estática sobre diretrizes e regras de convivência, como `SECURITY.md` (Protocolo de Segurança) e `CODE_OF_CONDUCT.md`.

---

## Fluxo Automatizado (CI/CD)

Toda vez que um código é enviado ou um *Pull Request* é aberto em direção à branch `main` ou `develop`, o sistema dispara as seguintes rotinas de automação:

1. **Varredura de Segurança (CodeQL):** Análise estática do código buscando vulnerabilidades conhecidas, credenciais expostas e falhas estruturais.
2. **Qualidade e Testes (CI):** 
   - No Backend: Instalação das dependências (`mvn verify`), validação do Checkstyle e geração do relatório de cobertura do JaCoCo (que reprova sumariamente *builds* com menos de 80% de alcance).
   - No Frontend: Execução da suíte de testes do Node.js, validação de componentes e varredura de acessibilidade.
   - Testes de Carga: Validação de performance automatizada através do disparo do **K6**, atuando contra a API para atestar que o SLO de latência e o *Rate Limiting* seguem respeitados.
3. **Migração Estrutural:** Execução do **Cloud Run Job** de migração do banco de dados (Flyway) logo antes da virada da release.
4. **Deploy Contínuo (CD):** Após a aprovação técnica e migração estrutural, a esteira de deploy provisiona as atualizações para o Cloud Run (Backend) e Firebase Hosting (Frontend) de maneira contínua.

> O uso estrito do padrão **Conventional Commits** e a aprovação mandatória nas barreiras de qualidade automatizadas são requisitos básicos para qualquer mesclagem (*merge*) neste repositório.
