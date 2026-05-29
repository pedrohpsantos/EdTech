# auth/ — Serviço de Autenticação do DocVault Academic

Serviço responsável pela autenticação e autorização dos usuários do DocVault Academic. Gerencia a emissão, validação e revogação de tokens JWT para os três perfis da plataforma.

---

## Responsabilidade

- Autenticar usuários com credenciais seguras
- Emitir tokens JWT armazenados em cookies HttpOnly e Secure
- Autorizar acesso conforme o perfil: Pesquisador, Orientador ou Admin do Laboratório
- Proteger rotas contra acesso não autorizado e ataques XSS/CSRF

---

## Perfis de Usuário

| Perfil | Permissões |
| :--- | :--- |
| **Pesquisador** | Acessa e gerencia apenas seus próprios documentos |
| **Orientador** | Visualiza documentos de todos os pesquisadores do seu laboratório |
| **Admin do Laboratório** | Gerencia usuários, laboratórios e configurações administrativas |

---

## Stack

| Tecnologia | Função |
| :--- | :--- |
| **Spring Security** | Framework de autenticação e autorização |
| **JWT** | Tokens de sessão stateless |
| **Cookies HttpOnly + Secure** | Armazenamento seguro do token (inacessível por JavaScript) |

---

## Estratégia de Segurança

Os tokens JWT **não são armazenados em `localStorage`** (vulnerável a XSS). A estratégia adotada é:

- **Cookie `HttpOnly`**: inacessível por JavaScript malicioso
- **Cookie `Secure`**: transmitido apenas via HTTPS
- **`SameSite=Strict`**: proteção contra CSRF

---

## Como Rodar

> Instruções completas serão adicionadas após o scaffold inicial.
