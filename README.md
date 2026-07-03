<div align="center">
  <img src="docs/assets/imgs/banner-github.png" alt="EdTech Banner" width="100%">
</div>

# EdTech — Plataforma Acadêmica e Repositório Científico

[![Deploy MkDocs](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml)
[![CI Pipeline](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml)
![NodeJS](https://img.shields.io/badge/Node.js-%3E%3D20-339933?logo=nodedotjs&logoColor=white)
![Java](https://img.shields.io/badge/Java-21_LTS-007396?logo=openjdk&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GCP-Cloud_Run_%26_SQL-4285F4?logo=googlecloud&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=white)

**EdTech** é uma solução de software completa (Monorepo) desenvolvida para digitalizar, armazenar e auditar publicações, relatórios científicos e datasets de laboratórios acadêmicos. Construído sob rígidos padrões de segurança (Enterprise Grade), oferece rastreabilidade e governança de dados ponta a ponta.

> **📖 Portal Oficial da Documentação (Docs-as-Code):** [pedrohpsantos.github.io/EdTech](https://pedrohpsantos.github.io/EdTech/)

---

## 🎯 Objetivo e Visão

O principal objetivo do EdTech é modernizar laboratórios acadêmicos substituindo processos baseados em planilhas e drives compartilhados inseguros por um **Repositório Centralizado e Auditável**. 

- **Transparência:** Todas as operações críticas geram logs de auditoria imutáveis.
- **Eficiência:** Orientadores aprovam publicações diretamente pelo painel.
- **Segurança:** Acesso controlado via JWT, proteção Anti-CSRF e tráfego HTTPS 100% isolado na nuvem.

---

## 🏗️ Estrutura do Monorepo

O repositório adota a arquitetura de monorepo para facilitar a integração, rastreamento de issues e implantação via CI/CD. 

Navegue pela documentação específica de cada módulo:

| Módulo | Descrição | Stack Principal |
| :--- | :--- | :--- |
| **[🎨 Frontend (UI)](frontend/README.md)** | Single Page Application (SPA) responsiva para a interação dos usuários. | React 19, Vite 8, React Query |
| **[⚙️ Backend (API)](docvault/api/README.md)** | Serviços RESTful para regras de negócio, persistência e auditoria. | Java 21, Spring Boot 4.1 |
| **[☁️ Infraestrutura (IaC)](infra/README.md)** | Configurações de Nuvem, Banco de Dados, CI/CD e Secrets. | Google Cloud, Docker, GitHub Actions |
| **[📄 Documentação (Docs)](docs/README.md)** | Diretório central da documentação (C4 Model, Manuais, FinOps). | MkDocs Material, Markdown |

---

## 🚀 Quick Start (Desenvolvimento Local)

### 1. Requisitos
- **Docker e Docker Compose**
- **Node.js 20+**
- **Java 21** e **Maven**

### 2. Levantando o Ambiente

```bash
# Clone o repositório
git clone https://github.com/pedrohpsantos/EdTech.git
cd EdTech

# Suba a infraestrutura base de dados (PostgreSQL local)
docker-compose up -d db

# Instale dependências e inicie o Frontend
cd frontend
npm install
npm run dev

# Instale dependências e inicie a API Backend (em outro terminal)
cd ../docvault/api
./mvnw spring-boot:run
```

A aplicação web estará disponível em `http://localhost:5173`.

---

## 🛡️ Status Atual: Enterprise Grade (Produção)
O projeto encerrou seu ciclo de MVP (Minimum Viable Product) e opera atualmente em infraestrutura *Serverless* na nuvem (Google Cloud Run + Firebase Hosting) com conectividade criptografada, pipelines GitHub Actions independentes (CI/CD) e gerenciamento de segredos otimizado pelo Google Secret Manager.
