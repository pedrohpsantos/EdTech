# frontend/ — UI do EdTech

Interface de usuário (SPA) da plataforma EdTech, construída para proporcionar uma experiência fluida, responsiva e segura para pesquisadores, orientadores e auditores.

---

## 🎯 Responsabilidade

- Consumir as APIs seguras do backend de forma eficiente.
- Gerenciar o estado global e cache das listagens (artigos, painéis, auditoria).
- Lidar com os formulários de upload e controle de acesso baseado em roles (Pesquisador/Orientador/Auditor).
- Aplicar proteção no roteamento e enviar os tokens de segurança (`X-XSRF-TOKEN`).

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Função |
| :--- | :---: | :--- |
| **React** | 19.x | Biblioteca principal de renderização |
| **Vite** | 8.x | Bundler super-rápido de build e dev server |
| **React Router** | 7.x | Gerenciamento de rotas e navegação |
| **React Query (TanStack)** | 5.x | Data Fetching, cache e sincronização |
| **Bootstrap** | 5.3.x | Framework de UI, layout e responsividade |
| **Axios** | 1.x | Cliente HTTP (com interceptors de segurança) |

---

## 📂 Arquitetura do Diretório

```text
frontend/src/
├── components/     # Componentes de UI reutilizáveis (NavBar, Modals, Loaders)
├── pages/          # Páginas inteiras correspondentes às rotas (Login, Dashboard, Documentos)
├── services/       # Módulo de chamadas de API (api.js centralizado com Axios)
├── utils/          # Funções utilitárias e helpers
├── App.jsx         # Orquestrador de Rotas
└── main.jsx        # Ponto de entrada (Montagem do React DOM)
```

---

## 🔒 Segurança Embutida

Esta aplicação não armazena tokens sensíveis no `localStorage`.  
O login devolve um cookie JWT `HttpOnly` com flag `SameSite=Strict`.

O frontend é configurado para, a cada requisição, ler automaticamente o cookie neutro `XSRF-TOKEN` enviado pelo Spring Boot e reempacotá-lo no cabeçalho `X-XSRF-TOKEN`. Isso mitiga integralmente ataques de **Cross-Site Request Forgery (CSRF)** e é feito pelo nosso *Axios Interceptor* configurado no `services/api.js`.

---

## 🚀 Como Rodar Localmente

Certifique-se de estar com o **Node.js 24+** (ou mínimo 20 LTS).

```bash
# 1. Entre no diretório do frontend
cd frontend

# 2. Instale as dependências atualizadas
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev
```

Por padrão, o Vite rodará em `http://localhost:5173`.  
*Atenção: Você precisará que o backend (Spring Boot) esteja rodando em `localhost:8080` para testar logins e requisições.*

### Scripts Adicionais

- `npm run build` — Cria a versão otimizada para produção na pasta `dist/`.
- `npm run lint` — Roda as checagens do ESLint (garantia de qualidade).
