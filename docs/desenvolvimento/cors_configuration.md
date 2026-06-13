# Configuração CORS — DocVault

Este documento detalha a configuração de Cross-Origin Resource Sharing (CORS) adotada no projeto DocVault, cobrindo os aspectos de comunicação entre o frontend (Vite/React) e o backend (Spring Boot), além de especificidades para os ambientes de desenvolvimento e produção.

---

## O que é `credentials: 'include'` e suas implicações CORS

Quando o frontend (Vite, porta `5173`) faz requisições ao backend (Spring Boot, porta `8080`), o navegador trata como **cross-origin** porque as portas diferem. Por padrão, o navegador:


- **Não envia cookies** em requests cross-origin.

- **Bloqueia respostas** que não contenham os headers CORS adequados.

Ao usar `credentials: 'include'` na API `fetch`, instruímos o navegador a enviar cookies (como o JWT `HttpOnly`) junto com a requisição. Porém, isso impõe restrições adicionais no servidor:

| Requisito | Motivo |
|-----------|--------|
| `Access-Control-Allow-Origin` explícito | A especificação CORS proíbe o uso do wildcard (`*`) quando `credentials: 'include'` é utilizado. É necessário especificar a origin exata. |
| `Access-Control-Allow-Credentials: true` | Permite que o navegador exponha a resposta ao JavaScript quando as credenciais estão presentes. |
| Cookie `SameSite=Lax` ou `None` (com `Secure`) | `SameSite=Strict` nunca envia o cookie em requests cross-origin, impossibilitando a autenticação via API de domínios/portas distintos. |

---

## Configuração do Backend (Spring Security)

A camada de segurança no backend é gerenciada pelo Spring Security e configurada para aceitar essas requisições.

### `SecurityConfig.java`

A configuração CORS é aplicada via `CorsConfigurationSource`:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    // A origin não pode ser '*', deve ser a URL exata do frontend
    configuration.setAllowedOrigins(List.of(allowedOrigins.split(",")));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("Content-Type", "Authorization"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

E ativada na cadeia de filtros de segurança:

```java
http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
```

### `application.yml`

As origins permitidas são parametrizadas para facilitar a troca entre ambientes via variáveis de ambiente:

```yaml
cors:
  allowed-origins: ${CORS_ALLOWED_ORIGINS:http://localhost:5173}
```

### Cookie `SameSite`

O cookie contendo o token JWT usa a política `SameSite=Lax`, que permite o envio em:


- Navegações *top-level* (links, redirects).

- Requisições assíncronas (AJAX) com `credentials: 'include'` para a mesma origin **ou** cross-origin, desde que o servidor responda com headers CORS válidos.

---

## Configuração do Frontend

### Client HTTP (`api.js`)

Para garantir o tráfego dos cookies de sessão, todas as chamadas `fetch` incluem o parâmetro de credenciais:

```js
const resposta = await fetch(`${BASE_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email, senha }),
})
```

### Variáveis de Ambiente (`.env`)

```env
VITE_API_URL=http://localhost:8080
```

---

## Proxy do Vite (Alternativa para Desenvolvimento)

Como alternativa ao CORS direto em ambiente local, é possível utilizar o proxy reverso embutido no servidor de desenvolvimento do Vite. Dessa forma, o frontend faz requisições para si mesmo (`:5173/api/...`), e o Vite as redireciona de forma transparente para o backend (`:8080/api/...`). Isso elimina totalmente os bloqueios cross-origin em tempo de desenvolvimento.

Para ativar, ajuste o arquivo `vite.config.js`:

```js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

E altere a URL base da API no `.env` do frontend para ser relativa:

```env
VITE_API_URL=
```

!!! warning "Atenção"
    O proxy do Vite funciona **apenas** em ambiente de desenvolvimento local. Em produção (após o build gerando os arquivos estáticos), a configuração de CORS no backend será o único mecanismo validado pelos navegadores.

---

## Configuração para Produção

Ao fazer o deploy da aplicação em produção, é imperativo ajustar o ambiente para manter a segurança do tráfego das credenciais e definir adequadamente as regras de acesso.

| Variável | Exemplo de Valor | Descrição |
|----------|-------|-----------|
| `CORS_ALLOWED_ORIGINS` | `https://seu-dominio.com` | URL exata do frontend em produção. Múltiplas origins podem ser separadas por vírgula (`https://app.com,https://admin.app.com`). |
| `JWT_COOKIE_SECURE` | `true` | Restringe o tráfego do cookie exclusivamente para conexões HTTPS. |
| `JWT_SECRET` | `[chave complexa e forte]` | Chave secreta de assinatura do token JWT. Deve ter pelo menos 32 caracteres. |

### Checklist de Deploy


- [ ] A variável `CORS_ALLOWED_ORIGINS` está apontando para o domínio correto de produção (sem a barra `/` no final).

- [ ] A variável `JWT_COOKIE_SECURE` está configurada como `true` e a aplicação responde em HTTPS.

- [ ] O `JWT_SECRET` é gerado usando uma fonte criptograficamente segura.

- [ ] Se o frontend e o backend estiverem em domínios completamente diferentes (não subdomínios), validar a política de `SameSite`.

### Estratégia de `SameSite` com Domínios Distintos

Caso o frontend (`app.meusistema.com`) e o backend (`api.outrosistema.com`) residam em domínios distintos, é obrigatório alterar o `SameSite` de `Lax` para `None` e definir o cookie como `Secure=true`. No Spring:

```java
.sameSite("None")
.secure(true)
```

!!! tip "Melhor Prática"
    Sempre que possível, hospede ambos os serviços no mesmo domínio ou em subdomínios da mesma raiz (ex: `app.sistema.com` e `api.sistema.com`). Dessa forma, a política `SameSite=Lax` é aplicável e oferece uma camada extra de proteção contra ataques CSRF.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| 1.0 | 30/05/2026 | Criação do documento | Pedro Henrique P. Santos |
| 1.1 | 30/05/2026 | Refino do threat model e estilos visuais | Pedro Henrique P. Santos |
| 1.2 | 13/06/2026 | Reestruturação e movido para a trilha DevEx | Pedro Henrique P. Santos |
