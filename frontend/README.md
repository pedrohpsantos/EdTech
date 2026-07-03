# 🎨 EdTech Frontend (SPA)

Bem-vindo ao módulo de **Interface de Usuário** da plataforma EdTech. Esta Single Page Application (SPA) foi projetada para garantir performance, usabilidade e integração segura com o nosso Backend Restful.

---

## 🎯 Objetivo

Fornecer uma interface moderna, reativa e acessível para as personas do sistema:
- **Pesquisador:** Acesso rápido ao upload de arquivos e ingressos em projetos.
- **Orientador:** Dashboard de gestão, listagem de artefatos e fluxos de aprovação.
- **Auditor:** Telas focadas em rastreabilidade de eventos e visualização de *Logs Imutáveis*.

---

## 🛠️ Tecnologias Utilizadas

A base do frontend foi escolhida para alinhar agilidade de desenvolvimento com alta performance de compilação:

| Tecnologia | Função na Aplicação |
| :--- | :--- |
| **React 19** | Biblioteca declarativa e baseada em componentes para UI. |
| **Vite 8** | Bundler extremamente rápido, substituindo Webpack. |
| **React Router 7** | Orquestração de Rotas Privadas e baseadas em Permissões (Roles). |
| **React Query** | (*TanStack Query*) Gestão eficiente do estado do servidor e cache HTTP. |
| **Vanilla CSS & Bootstrap**| Estilização customizada em *Pure CSS* e uso do Bootstrap exclusivamente para grid responsivo, abolindo a sobrecarga do Tailwind. |
| **Axios** | Cliente HTTP configurado com Interceptors para captura de headers e tokens. |

---

## 🔒 Mecanismos de Segurança (Frontend)

Visando os padrões *Enterprise Grade*, este frontend **não armazena Tokens no LocalStorage**. 
Toda a comunicação de autenticação ocorre via cookies `HttpOnly` com proteção Cross-Site Request Forgery (CSRF).

O arquivo `/src/services/api.ts` implementa *Interceptors* que leem o cookie neutro enviado pelo Spring Boot e reempacotam o token no cabeçalho estrito `X-XSRF-TOKEN`, garantindo imunidade de ponta a ponta.

---

## 📂 Arquitetura de Diretórios

```text
frontend/src/
├── components/     # Componentes de UI modulares (Botões, Modals, Loaders)
├── pages/          # Telas completas que compõem a hierarquia de rotas
├── services/       # Instâncias Axios e camadas de chamadas para a API
├── utils/          # Helpers de formatação (datas, tamanhos de arquivos)
├── App.tsx         # Configuração central de rotas e Context Providers
└── main.tsx        # Ponto de entrada (Montagem do React Tree)
```

---

## 🚀 Como Executar

### Pré-Requisitos
- Node.js (Versão 20 LTS ou superior)
- NPM

### Passos
1. Entre na pasta: `cd frontend`
2. Instale os pacotes: `npm install`
3. Execute o servidor de desenvolvimento: `npm run dev`

Para emular o build de produção localmente, utilize:
```bash
npm run build
npm run preview
```
