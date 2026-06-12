# :material-flag-checkered: Entrega da Semana 4 (Sprint 4)

<span class="status-badge"> Concluída</span>

**Período:** 06/06/2026 – 12/06/2026

---

## Objetivo das Sprints

A quarta semana foi marcada por dois grandes eixos: a consolidação técnica da integração entre as camadas de Frontend e Backend, e um importante alinhamento de escopo gerencial frente aos protótipos de design propostos para evitar *scope creep*.

---

## Entregas Realizadas

### :material-server-network: Backend e Integração

- [x] Configuração de `CorsConfigurationSource` no `SecurityConfig`
- [x] Aceite de origens cruzadas (`localhost:5173`)
- [x] Aceite de envio de credenciais (cookies JWT) via `allowCredentials = true`
- [x] Liberação de métodos `GET, POST, PUT, DELETE, OPTIONS`

**Branch:** `feat/cors-integration`  
**Issue:** [#16](https://github.com/pedrohpsantos/EdTech/issues/16)

---

### :material-monitor-cellphone: Frontend — Serviços e Experiência

- [x] Camada de serviço HTTP `api.js` mapeada com funções completas (login, register, logout, getMe)
- [x] Envio de formulários de Login e Registro perfeitamente acoplado ao Spring Boot
- [x] Implementação de rotas protegidas (`PrivateRoute`) com validação automática da sessão
- [x] Implementação da acessibilidade visual de Modo Claro/Escuro via `localStorage` e variáveis CSS globais

**Branches:** `feat/api-service`, `feat/theme-toggle`  
**Issues:** [#17](https://github.com/pedrohpsantos/EdTech/issues/17), [#7](https://github.com/pedrohpsantos/EdTech/issues/7), [#18](https://github.com/pedrohpsantos/EdTech/issues/18)

---

### :material-file-document-edit: Gestão e Refinamento de Escopo

- [x] Avaliação do protótipo UX/UI de alta fidelidade
- [x] Identificação de *scope creep* (Analytics, Compliance LGPD, Design System complexo)
- [x] Reversão e *hard reset* de documentações e issues para o MVP core (F01 a F22)
- [x] Documentação da primeira rotação de papéis da equipe (ciclo exato de duas semanas)
- [x] Criação de Issues da Sprint 5 e documentação de Atas de Reunião

**Issues Relacionadas:** Extras do protótipo permanentemente fechadas (#62 a #67)

---

## Resumo Técnico

| Métrica | Valor |
| :--- | :---: |
| Issues entregues / fechadas | 4 (Issues #7, #16, #17, #18) |
| Issues de Scope Creep fechadas | 6 (Issues #62 a #67) |
| Reuniões e Atas documentadas | 1 (12/06/2026) |
| Entregas de Frontend | Integração da API, Rotas Protegidas, Modo Escuro |
| Mudanças de Gestão | Primeira Rotação, Ajustes de Escopo |

---

## Contribuições da Equipe

| Membro | Frente | Contribuição Principal |
| :--- | :--- | :--- |
| **Pedro Henrique** (Tech Lead) | Gestão e Arquitetura | Identificação do scope creep, reversão para o MVP, criação de novas issues, atas e relatórios |
| **Equipe Dev** | Frontend/Backend | Resolução do CORS, componentização do PrivateRoute e do ThemeToggle, configuração do `api.js` |
| **Arthur** | - | *Ausente por motivos de saúde* |

---

## Aprendizados e Decisões

!!! note "Decisão: Contenção de Scope Creep"
    O desafio de garantir que a equipe de UI não projete features além do MVP foi resolvido com um "hard reset". Voltamos o foco estritamente às Personas e Funcionalidades Core originais.

!!! note "Decisão: Novo Ciclo de Rotações"
    O plano de rotações da equipe foi refinado para acontecer a cada **duas semanas exatas**, visando acelerar a proficiência full-stack de todos.

!!! warning "Desafio: Ausência Técnica"
    O desenvolvedor Arthur precisou se ausentar por problemas de saúde, impactando as tarefas sob sua gestão. A equipe foi alertada e se organizou para suprir os gargalos na transição para a Sprint 5.

---

## Débitos Técnicos para a Próxima Sprint

| Issue | Descrição | Impacto |
| :---: | :--- | :--- |
| #72 | Implementação Definitiva do Flyway (Correção do DDL-Auto) | Crítico — essencial para a base de dados em produção |
| #73 | Contratos de API (Requests/Responses) | Alto — necessário para o trabalho em paralelo Frontend/Backend |
| #13, #14 | Upload de Documentos e GCS | Alto — feature core do sistema |
| #15 | Entidade de Projetos (Orientador) | Médio — preparação do painel |

---

## Próximos Passos

→ Sprint 5: Fechar débitos de arquitetura (Flyway, Contratos API), iniciar Upload de Documentos e Painel de Auditoria/Orientador.

← [Semanas 3 — Implementação da Autenticação e Estrutura Base](semana3.md)

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 12/06/2026 | Criação do documento | Pedro Henrique P. Santos |
