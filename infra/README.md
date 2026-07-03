# ☁️ EdTech Infraestrutura e Nuvem (DevOps)

Este módulo (pasta `infra`) centraliza todos os manifestos, scripts de pipeline e definições de arquitetura necessários para colocar e manter a aplicação EdTech funcionando em produção e nos ambientes locais de forma robusta e transparente.

---

## 🎯 Objetivo

Eliminar a fricção entre desenvolvimento e operação, aderindo firmemente aos princípios de **Infraestrutura como Código (IaC)** e *Platform Engineering*.

Através desta pasta, nós:
- Padronizamos o ambiente de desenvolvimento local usando contêineres (*Docker Compose*).
- Concentramos variáveis de ambiente unificadas (sem *hardcoded secrets*).
- Planejamos a evolução de implantação em nuvem (Terraform, Manifestos K8s, Scripts).

---

## 🛠️ Tecnologias e Ferramentas

| Tecnologia | Função na Aplicação |
| :--- | :--- |
| **Docker Engine** | Isolamento e padronização do ambiente local (Banco de dados, Serviços). |
| **Docker Compose** | Orquestração simplificada de contêineres locais para rápida configuração. |
| **Google Cloud (GCP)** | O provedor de nuvem adotado como padrão arquitetural deste monorepo (Cloud Run, Cloud SQL, Secret Manager). |
| **GitHub Actions** | Motor padrão para integração contínua (CI) e entrega contínua (CD), declarado na pasta `.github/workflows`. |

---

## 📂 Arquitetura do Diretório

```text
infra/
├── .env.example       # Template com as variáveis de ambiente necessárias para rodar o app
├── docker-compose.yml # Orquestração do banco PostgreSQL e PgAdmin para desenvolvimento
└── banco/             # (Futuro) Arquivos e Dumps iniciais
```

---

## 🚀 Guia de Desenvolvimento Local

Nós utilizamos a orquestração via Docker para eliminar problemas como *"na minha máquina funciona"*. 

Para levantar a infraestrutura de apoio (PostgreSQL), basta rodar na raiz do projeto (onde se localiza um link simbólico ou executando direto nesta pasta):

```bash
docker-compose up -d
```

### Setup Inicial (Variáveis de Ambiente)
Duplique o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente base:
```bash
cp infra/.env.example infra/.env
```
*(Nota: O arquivo `.env` definitivo está devidamente incluído no `.gitignore` por razões de segurança.)*
