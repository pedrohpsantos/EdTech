---
title: 'ADR 0002: Autenticação baseada em JWT com Bearer Token'
---

# :material-text-box-check: ADR 0002: Autenticação baseada em JWT com Bearer Token

## Status

Aceito (Substitui decisão anterior de Cookies HttpOnly)

## Contexto

A plataforma EdTech lida com dados acadêmicos sensíveis (artigos não publicados, patentes e datasets sigilosos). Precisamos garantir que as sessões dos pesquisadores e orientadores sejam seguras. 
Originalmente, havíamos optado por armazenar o JSON Web Token (JWT) em cookies com as flags `HttpOnly` e `Secure`. No entanto, como o Frontend (Firebase em `.web.app`) e o Backend (Cloud Run em `.run.app`) estão hospedados em domínios diferentes, os navegadores modernos (como Safari, Chrome, Firefox) bloqueiam os cookies em solicitações cross-site por padrão, devido a políticas de privacidade contra rastreamento de Terceiros (Third-Party Cookies).

## Decisão

Optamos por utilizar **JWT (JSON Web Token)** armazenado no **LocalStorage** do navegador, sendo enviado explicitamente via cabeçalho HTTP `Authorization: Bearer <token>` em todas as requisições para a API. A proteção contra CSRF no backend foi completamente desabilitada, uma vez que não há envio automático de credenciais pelo navegador.

## Consequências

### Positivas

- **Compatibilidade Cross-Origin:** O login funciona perfeitamente independente dos domínios em que a SPA e a API estejam hospedados.
- **Fim da Vulnerabilidade CSRF:** Sem envio automático de cookies de autenticação pelo navegador, ataques de Cross-Site Request Forgery (CSRF) tornam-se impossíveis para a autenticação baseada em Bearer Token.
- **Simplificação do Backend:** O backend não precisa gerenciar geração e envio de cookies CSRF e a configuração de CORS fica mais simples e permissiva (`credentials: include` não é estritamente necessário).

### Negativas / Riscos

- **Exposição a XSS:** O token fica vulnerável a ataques de Cross-Site Scripting (XSS), pois pode ser lido pelo JavaScript. Devemos reforçar as políticas de CSP (Content Security Policy) e garantir a sanitização rigorosa de qualquer input exibido na interface.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento original (Cookies HttpOnly) | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica | Pedro Henrique P. Santos |
| `2.0.0` | 04/07/2026 | Revisão e formatação | Pedro Henrique P. Santos |
| `3.0` | 06/07/2026 | Migração de Cookies para Bearer Token no LocalStorage devido ao bloqueio Third-Party Cookies | Pedro Henrique P. Santos |


