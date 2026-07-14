---
title: 'ADR 0002: Autenticação baseada em JWT com Cookies HttpOnly'
---

# :material-text-box-check: ADR 0002: Autenticação baseada em JWT com Cookies HttpOnly

## Status

Aceito — revisado em 14/07/2026 (substitui decisão anterior de LocalStorage / Bearer Token)

## Contexto

A plataforma EdTech lida com dados acadêmicos sensíveis (artigos não publicados, patentes e datasets sigilosos). Precisamos garantir que as sessões dos pesquisadores e orientadores sejam seguras contra ataques de Cross-Site Scripting (XSS).
Originalmente (versão 1.3), devido à hospedagem do frontend (Firebase) e do backend (Cloud Run) em domínios diferentes, utilizamos provisoriamente `localStorage` e `Bearer Token`. Essa abordagem expôs o token a ataques XSS e falhou em auditorias de segurança.

Uma tentativa posterior de encaminhar `/api/**` por Firebase Hosting Rewrites não preservou o cookie de sessão até o Cloud Run. O fluxo autenticado deve, portanto, chamar a API do Cloud Run diretamente.

## Decisão

Optamos por utilizar **JWT (JSON Web Token)** armazenado exclusivamente em **cookies `HttpOnly`, `Secure` e `SameSite=None`**. A SPA chama a URL pública do Cloud Run definida por `VITE_API_URL`, sempre com `withCredentials`.

Como a sessão cruza origens, a API aceita credenciais somente para as origens explicitamente configuradas em `CORS_ALLOWED_ORIGINS`. O token não é exposto ao JavaScript e não é armazenado em `localStorage`.

## Consequências

### Positivas

- **Segurança contra XSS:** Tokens JWT não são acessíveis via JavaScript (graças à flag `HttpOnly`), mitigando significativamente o impacto de ataques XSS.
- **Interoperabilidade entre origens:** `SameSite=None; Secure` permite a sessão entre Firebase Hosting e Cloud Run em navegadores modernos.
- **Transparência:** O gerenciamento de credenciais é automático com `axios.defaults.withCredentials = true`.

### Negativas / Riscos

- **Política de origem:** O ambiente precisa manter `CORS_ALLOWED_ORIGINS` estritamente limitado às origens confiáveis.
- **Proteção CSRF:** `SameSite=None` não é uma defesa CSRF. Mudanças em rotas mutáveis devem manter verificação de origem e, quando aplicável, proteção anti-CSRF.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento original (Cookies HttpOnly) | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica | Pedro Henrique P. Santos |
| `1.2` | 04/07/2026 | Revisão e formatação | Pedro Henrique P. Santos |
| `1.3` | 06/07/2026 | Migração de Cookies para Bearer Token no LocalStorage devido ao bloqueio Third-Party Cookies | Pedro Henrique P. Santos |
| `1.4` | 13/07/2026 | Retorno para Cookies HttpOnly mitigando bloqueio através de Firebase Rewrites | Pedro Henrique P. Santos |
| `1.5` | 14/07/2026 | Chamada direta ao Cloud Run com `SameSite=None`; removida a dependência de Rewrites para sessão | Pedro Henrique P. Santos |

