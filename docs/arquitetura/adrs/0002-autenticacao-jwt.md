---
title: 'ADR 0002: Autenticação baseada em JWT com cookies HttpOnly'
---

# :material-text-box-check: ADR 0002: Autenticação baseada em JWT com cookies HttpOnly

## Status

Aceito

## Contexto

A plataforma EdTech lidará com dados acadêmicos sensíveis (artigos não publicados, patentes e datasets sigilosos). Precisamos garantir que as sessões dos pesquisadores e orientadores sejam seguras contra ataques de roubo de sessão. 
A adoção de JSON Web Tokens (JWT) é o padrão de mercado para APIs RESTful, porém, armazenar JWTs no `localStorage` ou `sessionStorage` do navegador deixa o token exposto a ataques de Cross-Site Scripting (XSS).

## Decisão

Optamos por utilizar **JWT (JSON Web Token)** armazenado exclusivamente em **Cookies com as flags `HttpOnly` e `Secure`**.

## Consequências

### Positivas

- **Segurança contra XSS:** O JavaScript do frontend não consegue ler o cookie `HttpOnly`, impedindo que scripts maliciosos roubem o token de acesso.

- **Transparência:** O navegador anexa o cookie automaticamente nas requisições para o backend, simplificando o código no frontend.

- **Stateless:** O backend continua stateless, facilitando a escalabilidade horizontal no Cloud Run.

### Negativas / Riscos

- **Proteção contra CSRF:** Precisamos implementar proteção contra Cross-Site Request Forgery (CSRF), já que os cookies são enviados automaticamente pelo navegador. Adotaremos o padrão *Double Submit Cookie* ou o cabeçalho `X-CSRF-Token` fornecido pelo Spring Security.

- **Complexidade de CORS:** A configuração de *Cross-Origin Resource Sharing* (CORS) entre o frontend e a API exigirá o parâmetro `credentials: 'include'`.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `2.0` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |


