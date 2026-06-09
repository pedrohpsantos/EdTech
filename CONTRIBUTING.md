# Guia de Contribuição — EdTech

Bem-vindo ao projeto EdTech do AILAB Makers (UnB FCTE)! Este documento é a fonte de verdade para a configuração do ambiente e o fluxo de trabalho da equipe.

## 1. Pré-requisitos

Para contribuir com o projeto, você precisa ter as seguintes ferramentas instaladas:
- **Java**: 17 LTS (Backend)
- **Node.js**: 20.x ou superior (Frontend Vite)
- **Python**: 3.11 ou superior (Documentação MkDocs)
- **uv**: Gerenciador de pacotes Python
- **Docker**: Engine e Docker Compose (Banco de dados e serviços isolados)

## 2. Setup do Ambiente Local

### 2.1 Banco de Dados (Docker)
Suba a infraestrutura base (PostgreSQL 15):
```bash
docker-compose -f infra/docker-compose.yml up -d db
```

### 2.2 Backend (Spring Boot)
!!! note "Em construção"
    Comandos exatos do Maven/Gradle pendentes (o diretório do backend está sendo estruturado).

### 2.3 Frontend (React + Vite)
Para rodar a interface de usuário:
```bash
cd docvault/frontend
!!! note "Em construção"
    - Comandos de instalação (ex: `npm install`).
    - Comandos de execução (ex: `npm run dev`).
```

### 2.4 Documentação (MkDocs)
Para rodar o site de documentação localmente e visualizar suas edições:
```bash
# Na raiz do projeto, instale as dependências com uv
uv sync

# Sirva a documentação localmente
uv run mkdocs serve
```
Acesse `http://127.0.0.1:8000` no navegador.

## 3. Fluxo de Branches

Adotamos a seguinte estrutura de ramificações:
- `main`: Branch de produção, contendo apenas código estável.
- `develop`: Branch principal de desenvolvimento, alvo dos PRs de features.
- Prefixos de ramificações temporárias:
  - `feat/`: para novas funcionalidades (ex: `feat/filtro-orientador`)
  - `fix/`: para correção de bugs (ex: `fix/login-pesquisador`)
  - `docs/`: para adições na documentação MkDocs
  - `chore/`: para tarefas de infraestrutura ou manutenção (ex: dependabot, lint)

## 4. Padrões de Commit (Conventional Commits)

Nossos títulos e mensagens de commit devem seguir as regras do **Conventional Commits**. Exemplos no contexto do EdTech:
- `feat(publicacoes): adicionar filtro por orientador`
- `fix(auth): corrigir expiração de sessão para perfil Pesquisador`
- `docs(adr): registrar decisão de uso do Flyway`
- `refactor(api): melhorar tratamento de erros no upload`
- `test(auth): cobrir geração de JWT`
- `chore(deps): atualizar versão do vite`

## 5. Pull Requests (PR)

Nosso repositório exige que cada PR preencha um Checklist (já disponibilizado automaticamente via `PULL_REQUEST_TEMPLATE.md`). No template, você precisará:
- Informar a motivação (Contexto) da mudança.
- Checar se o código atende às regras de isolamento de dados (onde aplicável) e ausência de senhas hardcoded.
- Executar os testes e o lint locais. 

Ao abrir o PR, verifique minuciosamente as políticas da seção de "Validação e Qualidade".
