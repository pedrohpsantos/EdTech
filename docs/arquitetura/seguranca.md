# Segurança e JWT

A proteção contra vulnerabilidades de sequestro de sessão e a trilha de responsabilidade são pilares do sistema EdTech.

## 1. Políticas de Cookie Stateless

O DocVault Academic aboliu completamente o armazenamento de contexto transiente em provedores locais vulneráveis.

*   **Sessão Estateless**: A API Java não armazena contexto de sessão na memória (`STATELESS`), o que escala melhor os containers no Cloud Run. Todo o contexto navega envelopado de forma criptografada pelo próprio JWT.
*   **Defesas Embutidas no Browser**:
    *   `HttpOnly`: O cookie de autorização, enviado na hora do login, contém esta flag. Isso bloqueia leituras via `document.cookie` e previne ataques devastadores de XSS (Cross-Site Scripting).
    *   `Secure`: Impede que navegadores clientes trafeguem o Cookie se o protocolo da página rebaixar para HTTP puro. Exige conexão criptografada (HTTPS).
    *   `SameSite=Strict`: Como nossa SPA interage diretamente com o mesmo domínio/subdomínio que a nossa API, ativamos o padrão `Strict` para bloquear envio de cookies por intermédio de imagens embedadas e form POSTs externos (Prevenção robusta contra CSRF - Cross-Site Request Forgery).

---

## 2. Autenticação Baseada em Regras e Rotas

O sistema delega a autorização das rotas web a regras verticais do framework de acesso:

| Role (Papel) | Exemplo de Rota Restrita | Explicação de Escopo |
| :--- | :--- | :--- |
| `researcher` | `/api/documents/upload` | Apenas pesquisadores alimentam o sistema ativamente com uploads de PDFs |
| `advisor` | `/api/projects/{id}/validation` | Permite visualizar escopo completo daquele projeto, vetando edições diretas |
| `auditor` | `/api/audit-logs/` | Acesso exclusivo para listar os eventos sensíveis globais e emitir flags de risco |

---

## 3. Logs de Auditoria

A segurança passiva atua com o registro rigoroso e histórico centralizado (em `audit_logs`). 

A aplicação backend não possui permissão (GRANT do PostgreSQL) para executar comandos de `DELETE` ou `UPDATE` nestas tabelas específicas, protegendo a empresa/faculdade de acobertamentos caso credenciais ou servidores sejam eventualmente comprometidos. Toda e qualquer quebra, ou até *tentativa* (`ACCESS_DENIED`), de privilégio é eternizada em banco para inspeção posterior.
