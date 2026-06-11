# Configuração CORS — DocVault

## O que é `credentials: 'include'` e suas implicações CORS

Quando o frontend (Vite, porta `5173`) faz requisições ao backend (Spring Boot, porta `8080`),
o navegador trata como **cross-origin** porque as portas diferem. Por padrão, o navegador:

- **Não envia cookies** em requests cross-origin.
- **Bloqueia respostas** que não contenham os headers CORS adequados.

Ao usar `credentials: 'include'` no `fetch`, instruímos o navegador a enviar cookies
(como o JWT `HttpOnly`) junto com a requisição. Porém, isso impõe restrições adicionais
no servidor:

| Requisito | Motivo |
|-----------|--------|
| `Access-Control-Allow-Origin` deve ser uma **origin explícita** (não `*`) | Especificação CORS proíbe wildcard com credentials |
| `Access-Control-Allow-Credentials: true` | Permite o navegador expor a resposta ao JavaScript |
| Cookie `SameSite=Lax` (ou `None` com `Secure`) | `SameSite=Strict` nunca envia o cookie em requests cross-origin |

## Configuração do Backend (Spring Security)

### `SecurityConfig.java`

A configuração CORS é aplicada via `CorsConfigurationSource`:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of(allowedOrigins.split(",")));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("Content-Type", "Authorization"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

E ativada na cadeia de segurança:

```java
http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
```

### `application.yml`

A origin permitida é configurável via variável de ambiente:

```yaml
cors:
  allowed-origins: ${CORS_ALLOWED_ORIGINS:http://localhost:5173}
```

### Cookie `SameSite`

O cookie JWT usa `SameSite=Lax`, que permite o envio em:

- Navegações top-level (links, redirects)
- Requests AJAX com `credentials: 'include'` para a mesma origin **ou** cross-origin quando o servidor responde com headers CORS válidos

## Configuração do Frontend

### `api.js`

Todas as chamadas `fetch` usam `credentials: 'include'`:

```js
const resposta = await fetch(`${BASE_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email, senha }),
})
```

### `.env`

```
VITE_API_URL=http://localhost:8080
```

## Proxy do Vite (Alternativa para Dev)

Como alternativa ao CORS direto, é possível usar o proxy reverso do Vite.
Com ele, o frontend faz requests para si mesmo (`:5173/api/...`), e o Vite
redireciona para o backend (`:8080/api/...`). Isso elimina o cross-origin em dev.

Para ativar, descomente a seção `server.proxy` em `vite.config.js`:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
},
```

E altere `VITE_API_URL` para string vazia no `.env`:

```
VITE_API_URL=
```

> **Nota:** O proxy do Vite só funciona em desenvolvimento. Em produção,
> a configuração CORS do backend é obrigatória.

## Configuração para Produção

Em ambiente de produção, ajuste as seguintes variáveis de ambiente:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `CORS_ALLOWED_ORIGINS` | `https://seu-dominio.com` | Origin do frontend em produção |
| `JWT_COOKIE_SECURE` | `true` | Cookie só é enviado via HTTPS |
| `JWT_SECRET` | Chave forte (≥ 32 chars) | Chave de assinatura do JWT |

### Checklist de produção

- [ ] `CORS_ALLOWED_ORIGINS` aponta para o domínio de produção
- [ ] `JWT_COOKIE_SECURE=true` (requer HTTPS)
- [ ] Se usar `SameSite=None`, o cookie **deve** ter `Secure=true`
- [ ] `JWT_SECRET` é uma chave criptograficamente forte
- [ ] Múltiplas origins podem ser separadas por vírgula: `https://app.com,https://admin.app.com`

### SameSite em produção com domínios diferentes

Se o frontend e backend estiverem em **domínios diferentes** (não subdomínios),
é necessário alterar `SameSite` de `Lax` para `None` e garantir que `Secure=true`:

```java
.sameSite("None")
.secure(true)
```

Se estiverem no **mesmo domínio** (ou subdomínios), `SameSite=Lax` é suficiente
e mais seguro.
