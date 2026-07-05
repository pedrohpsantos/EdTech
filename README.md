<div align="center">
  <img src="docs/assets/imgs/banner-github.png" alt="EdTech Banner" width="100%">
</div>

# EdTech — O Ecossistema Acadêmico e Repositório Científico

[![Deploy MkDocs](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci-docs.yml)
[![CI Pipeline](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml/badge.svg)](https://github.com/pedrohpsantos/EdTech/actions/workflows/ci.yml)
![NodeJS](https://img.shields.io/badge/Node.js-%3E%3D20-339933?logo=nodedotjs&logoColor=white)
![Java](https://img.shields.io/badge/Java-21_LTS-007396?logo=openjdk&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GCP-Cloud_Run_%26_SQL-4285F4?logo=googlecloud&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=white)

*"Eu sou o Arquiteto. Criei o EdTech."* 🕴️ — Olá! Seja muito bem-vindo ao coração do nosso monorepo. Se você está aqui, é porque busca a verdade (ou pelo menos um código limpo e uma infraestrutura resiliente).

**EdTech** é uma solução de software Enterprise-Grade, um monorepo meticulosamente orquestrado para digitalizar, armazenar e auditar publicações, relatórios científicos e datasets de laboratórios acadêmicos. Nós construímos sistemas não apenas para funcionar, mas para escalar com perfeição e rastreabilidade ponta a ponta.

> **📖 Portal Oficial da Documentação (Docs-as-Code):** [pedrohpsantos.github.io/EdTech](https://pedrohpsantos.github.io/EdTech/)

---

## 🎯 O Grande Plano (Visão)

O objetivo principal do EdTech é erradicar o caos. Chega de pen drives perdidos, planilhas sobrescritas e e-mails como sistema de versionamento. Substituímos isso por um **Repositório Centralizado e Auditável**, onde cada byte de dado é tratado com o rigor de uma operação cirúrgica.

- **Transparência Absoluta:** O que acontece no laboratório, fica imutavelmente logado na nuvem.
- **Governança:** Controles estritos de acesso. O Orientador é a chave mestra.
- **Segurança de Outro Mundo:** JWT rotativo, defesas Anti-CSRF e HTTPS isolado. Não deixe as portas abertas.

---

## 🏗️ O Mapa do Tesouro (Estrutura do Monorepo)

Como um bom maestro, dividi este projeto em domínios de responsabilidade estrita. Cada pasta tem uma alma e um propósito. E, claro, uma documentação com sua própria personalidade esperando por você:

| Módulo | A Alma (O que faz) | Stack de Poder |
| :--- | :--- | :--- |
| **[🎨 Frontend (UI)](frontend/README.md)** | SPA vibrante e responsiva. *A interface é o rosto da nossa operação.* | React 19, Vite 8, Tailwind (Brincadeira, Vanilla css!) |
| **[⚙️ Backend (API)](backend/README.md)** | A engrenagem implacável. *Sem o backend, não há sistema.* | Java 21, Spring Boot 4.1 |
| **[☁️ Infraestrutura](infra/README.md)** | O chão de fábrica na nuvem. *Se a nuvem cair, nós a levantamos.* | GCP, Docker, Docker Compose |
| **[📄 Documentação](docs/README.md)** | Nossa biblioteca de Alexandria. *Código não documentado não existe.* | MkDocs Material |
| **[📊 Scripts](scripts/README.md)** | Telemetria e análises avançadas para o Orientador. | Python, Pandas |
| **[🕵️ Testes](tests/README.md)** | O detetive da qualidade. *Nenhum bug escapa à inspeção.* | Playwright, K6 |

---

## 🛡️ Telemetria e Status

Nós operamos na nuvem do Google (GCP), mas mantemos as luzes acesas localmente.

| Status | Diretriz de Operação |
| :---: | :--- |
| ✅ | Autenticação JWT e malha de CORS configurada |
| ✅ | CI/CD Implacável (GitHub Actions + Cloud Run) |
| ✅ | Modelagem via Flyway (Migrações como Código) |
| ✅ | Armazenamento dinâmico (GCS em prod, Local no dev) |
| 🚧 | Integração profunda com SAST e Dependency Check |
| 🚧 | Painel de controle analítico do Orientador |

---

## 🚀 O Despertar (Quick Start Local)

Para orquestrar tudo isso na sua máquina, você só precisa de **Docker**. Eu escondi as complexidades para que você só precise de *um único comando* para dar vida ao ecossistema.

### A Mágica de 1 Clique

```bash
# Siga o coelho branco (Clone o repositório)
git clone https://github.com/pedrohpsantos/EdTech.git
cd EdTech

# Pegue a pílula vermelha (Variáveis locais)
cp infra/.env.example infra/.env

# Acorde o sistema
cd infra
docker compose up --build -d
```

- **Frontend (A Matrix visual):** `http://localhost:5173`
- **Backend (O Núcleo):** `http://localhost:8080`

---

## 🤝 Comunidade e As Leis Universais

Nós seguimos regras. A anarquia não escala. Por isso, ao se juntar ao projeto, certifique-se de conhecer nossos pilares:

- 📖 **[Como Contribuir (CONTRIBUTING)](.github/CONTRIBUTING.md):** O manual do bom cidadão EdTech.
- 📜 **[Código de Conduta](.github/CODE_OF_CONDUCT.md):** Respeito mútuo não é opcional.
- 🔒 **[Segurança (SECURITY)](.github/SECURITY.md):** Como reportar uma vulnerabilidade (antes que ela quebre tudo).
- ⚖️ **[Licença (LICENSE)](LICENSE):** MIT. Livre, mas com responsabilidade.

E sobre commits... use **Conventional Commits**. Mantenha o histórico limpo, ou os scripts de CI irão te julgar silenciosamente.

> *Dica: Se você não sabe o que fazer a seguir, olhe a aba de Issues. Sempre há uma anomalia precisando de um desenvolvedor habilidoso.*
