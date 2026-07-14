---
title: 'ADR 0002: Autenticação baseada em JWT com Cookies HttpOnly via Firebase Rewrites'
---

# :material-text-box-check: ADR 0002: Autenticação baseada em JWT com Cookies HttpOnly via Firebase Rewrites

## Status

Aceito (Substitui decisão anterior de LocalStorage / Bearer Token)

## Contexto

A plataforma EdTech lida com dados acadêmicos sensíveis (artigos não publicados, patentes e datasets sigilosos). Precisamos garantir que as sessões dos pesquisadores e orientadores sejam seguras contra ataques de Cross-Site Scripting (XSS).
Originalmente (versão 1.3), devido à hospedagem do frontend (Firebase em `.web.app`) e do backend (Cloud Run em `.run.app`) em domínios diferentes, os navegadores modernos bloqueavam os cookies `HttpOnly` considerando-os "Third-Party Cookies". Para resolver provisoriamente, utilizamos o LocalStorage e `Bearer Token`.
Entretanto, essa abordagem expôs o token a ataques XSS e falhou em auditorias de segurança. Para resolver o bloqueio sem comprometer a segurança, utilizamos os Rewrites do Firebase Hosting.

## Decisão

Optamos por utilizar **JWT (JSON Web Token)** armazenado exclusivamente em **Cookies HttpOnly, Secure e SameSite=Strict**. 
Para permitir que o navegador trate os cookies como First-Party (Primeira Parte), configuramos o `firebase.json` do frontend para atuar como um proxy reverso (`rewrites`). Todas as requisições para `/api/**` são roteadas internamente pelo Firebase para o serviço do Cloud Run correspondente. Dessa forma, tanto o frontend quanto a API compartilham a mesma origem (origin).

## Consequências

### Positivas

- **Segurança contra XSS:** Tokens JWT não são acessíveis via JavaScript (graças à flag `HttpOnly`), mitigando significativamente o impacto de ataques XSS.
- **First-Party Cookies:** O proxy resolve as restrições de navegadores modernos (Safari, Chrome) sobre Cookies de Terceiros, mantendo a interoperabilidade.
- **Transparência:** O gerenciamento de credenciais na API do frontend torna-se automático através do `axios.defaults.withCredentials = true`.

### Negativas / Riscos

- **Acoplamento de Infraestrutura:** Dependemos do Firebase Hosting para fazer o roteamento reverso para o Cloud Run. Mudar de provedor de frontend exigiria uma reconfiguração do proxy (ex: Nginx, Cloudflare).
- **Proteção CSRF:** Retorna a necessidade de nos preocuparmos com ataques CSRF, exigindo verificações rígidas de origem ou tokens CSRF se o atributo `SameSite=Strict` não for suportado por navegadores muito antigos.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento original (Cookies HttpOnly) | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica | Pedro Henrique P. Santos |
| `1.2` | 04/07/2026 | Revisão e formatação | Pedro Henrique P. Santos |
| `1.3` | 06/07/2026 | Migração de Cookies para Bearer Token no LocalStorage devido ao bloqueio Third-Party Cookies | Pedro Henrique P. Santos |
| `1.4` | 13/07/2026 | Retorno para Cookies HttpOnly mitigando bloqueio através de Firebase Rewrites | Pedro Henrique P. Santos |

