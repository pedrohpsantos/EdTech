# :material-flag-checkered: Entrega da Semana 4 (Sprint 4)

**Período:** 06/06/2026 a 12/06/2026
**Foco da Sprint:** Integração Frontend-Backend, Proteção de Rotas e Refinamento de Escopo.

---

## 🚀 Resumo das Entregas

A quarta semana foi marcada por dois grandes eixos: a consolidação técnica da integração entre as camadas de Frontend e Backend, e um importante alinhamento de escopo gerencial frente aos protótipos de design.

### 1. Integração e Camada de Rede
- **CORS e Autenticação Cross-Origin:** O backend foi configurado para aceitar requisições do frontend local (`localhost:5173`) permitindo o envio de credenciais (`allowCredentials = true`).
- **Camada de Serviço HTTP (`api.js`):** A comunicação com o Spring Boot foi totalmente mapeada no React, garantindo que o envio de formulários (Login e Registro) se comunique perfeitamente com a API e manipule o cookie `HttpOnly` com sucesso.

### 2. Experiência e Rotas Protegidas
- **Private Routes:** Foi implementada uma arquitetura de rotas protegidas (`PrivateRoute`) no React. O frontend agora valida a sessão automaticamente chamando `GET /api/auth/me`.
- **Modo Claro/Escuro:** Entregue a feature de acessibilidade/visual, permitindo ao usuário alternar a paleta de cores de forma persistente (via `localStorage`).

### 3. Refinamento de Escopo (Contenção de Scope Creep)
- Um protótipo visual de alta fidelidade foi apresentado, porém, o Tech Lead identificou rapidamente que o design expandia o escopo para além do acordado (com adição de Analytics, Compliance LGPD, e um Design System excessivamente complexo).
- **Ação:** Foi feito um *hard reset* de documentações e issues para blindar o projeto e retornar estritamente às Personas e Funcionalidades Core (F01 a F22). As issues extras foram permanentemente fechadas.

### 4. Gestão e Rotação da Equipe
- Executamos a nossa **primeira rotação de papéis** no dia 12/06. O plano de rotações foi atualizado para acontecer a cada duas semanas exatas, visando o ganho de proficiência full-stack de todos.

---

## 📊 Status das Issues

| Issue | Descrição | Status |
| :--- | :--- | :---: |
| #16 | Configuração CORS e Integração | :material-check-circle:{ .green } |
| #17 | Camada de Serviço HTTP (api.js) | :material-check-circle:{ .green } |
| #7 | Página Dashboard + Proteção de Rotas | :material-check-circle:{ .green } |
| #18 | Modo Claro/Escuro no Frontend | :material-check-circle:{ .green } |

---

## 🚧 Desafios Enfrentados
- **Ausência Técnica:** O desenvolvedor Arthur precisou se ausentar por problemas de saúde, o que impactou o ritmo nas tarefas sob sua gestão. A equipe foi alertada e se organizou para suprir qualquer gargalo decorrente na transição para a Sprint 5.
- **Alinhamento entre Design e Código:** O desafio de garantir que a equipe de UI não projete features que a engenharia não planejou codar no MVP foi contornado com o reforço da documentação base.
