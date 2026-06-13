# Pipeline CI/CD e Deploy

A integração e entrega contínua do projeto ocorrem através do **GitHub Actions**.

## O Pipeline

Toda abertura de um `Pull Request` ou envio para a branch `develop` engatilha nossa bateria automatizada de testes e checks. 

Existem fluxos independentes:
1. **Frontend CI (`ci-frontend.yml`)**: Baixa as dependências Node e roda o comando de build do Vite.
2. **Backend CI (`ci-backend.yml`)**: Compila o código Java, roda todos os testes unitários (`mvn verify`) e expõe relatórios.
3. **Docs CI (`ci-docs.yml`)**: Publica automaticamente esta documentação (MkDocs) para o GitHub Pages (rodando sempre que há alterações na branch `main`).

## Regras de Proteção

A branch `develop` possui regras (Branch Protection Rules) no repositório. O "Merge" de um Pull Request só é permitido se:
- Pelo menos um desenvolvedor revisou e aprovou o código (Code Review).
- Os jobs de CI (Backend e Frontend) passaram com a bolinha verde (sem quebrar a build ou testes).

## Processo de Deploy em Produção

De acordo com o ADR 0003, o deploy das partes ativas do sistema (Frontend e Backend) ocorrerão via Google Cloud Run de forma conteinerizada. (Documentação de instruções manuais de deploy ainda a ser elaborada nas próximas fases).
