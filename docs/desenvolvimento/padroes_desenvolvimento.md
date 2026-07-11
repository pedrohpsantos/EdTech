# Padrões de Desenvolvimento (Code Standards)

A fim de garantir consistência, segurança e qualidade ao longo de todo o repositório **EdTech**, nossa equipe definiu os seguintes padrões de engenharia de software baseados nas metodologias ágeis adotadas.

## 1. Fluxo de Versionamento (Git Flow)

Adotamos um **Git Flow Simplificado** em combinação com **Trunk-Based Development** nas sprints:
- **`main`**: Branch de produção. Somente aceita código testado via Pull Request (PR).
- **`develop`**: Branch de integração. Recebe os artefatos em homologação.
- **`feature/nome-da-funcionalidade`**: Criação de novas funcionalidades. Ex: `feature/exportacao-csv`.
- **`fix/nome-do-bug`**: Correção de defeitos. Ex: `fix/jwt-timeout`.
- **`chore/nome-da-tarefa`**: Manutenção e atualizações de infraestrutura (ex: `chore/atualiza-pom`).

*Obrigatório:* Todo Pull Request deve ser aprovado via **Code Review** e não pode possuir vulnerabilidades mapeadas pelos fluxos de CI/CD (GitHub Actions).

## 2. Padrões de Nomenclatura

| Contexto | Padrão | Exemplo |
| :--- | :--- | :--- |
| Pastas/Arquivos (Frontend) | `kebab-case` ou `PascalCase` | `user-profile.tsx` / `UserProfile.tsx` |
| Pastas/Arquivos (Backend Java) | `PascalCase` (Classes) | `DocumentController.java` |
| Endpoints REST | Nomes no plural, `kebab-case` | `POST /api/v1/documents` |
| Variáveis de Ambiente | `UPPER_SNAKE_CASE` | `DATABASE_URL` |
| Commits | Conventional Commits | `feat: adiciona swagger` |

## 3. Qualidade de Código (Linting & Formatting)

O projeto exige ferramentas de formatação rigorosa:
- **Frontend**: Utilizamos ESLint integrado com Prettier. O CI falhará se `npm run lint` reportar erros.
- **Backend**: Utilizamos Checkstyle. As regras estão consolidadas nos arquivos XML da raiz e do backend. O CI não permite builds com violações de estilo de Java padrão.

## 4. Testes e Documentação

- Todo PR que introduzir novas rotas (Endpoints) deve possuir:
  1. Anotações de documentação nativas para o Swagger/OpenAPI (`@Operation`, `@ApiResponse`).
  2. Testes End-to-End associados, com asserções positivas e cenários de falha.
- A cobertura de testes do backend será monitorada na esteira de Continuous Integration utilizando contêineres de serviços nativos (PostgreSQL 15 real em ambiente de testes).
