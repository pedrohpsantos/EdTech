# Padrões de Projeto (Design Patterns)

Nesta documentação, detalhamos os Padrões de Projeto (baseados nos conceitos do [Refactoring.Guru](https://refactoring.guru/pt-br/design-patterns)) que empregamos em nossa arquitetura de software, tanto no Frontend quanto no Backend.

Utilizamos padrões para manter o código flexível, manutenível e para resolver problemas comuns de design de forma padronizada.

---

## 1. Padrões Comportamentais

### Strategy (Estratégia)
O padrão **Strategy** é usado para definir uma família de algoritmos, encapsular cada um deles e torná-los intercambiáveis. 

Em nosso backend, temos uma necessidade clara: precisamos armazenar arquivos localmente (durante o desenvolvimento) ou na nuvem (Google Cloud Storage) durante a produção. O serviço que usa isso (`DocumentService`) não precisa saber *como* o arquivo é salvo, apenas chama a interface abstrata.

**A Interface (A Estratégia Base):**
```java
// backend/src/main/java/com/edtech/service/StorageService.java
public interface StorageService {
  void uploadFile(MultipartFile file, String fileKey, String contentType) throws Exception;
  String getPresignedUrl(String fileKey) throws Exception;
  void deleteFile(String fileKey) throws Exception;
}
```

**Implementações Concretas:**
Temos o `GcsStorageServiceImpl` e o `LocalStorageServiceImpl`. O Spring Boot injeta a implementação correta com base no ambiente ativo (via propriedades e perfis `dev`/`prod`). O nosso contexto base (`DocumentService`) faz uso do serviço genericamente:
```java
// Trecho de DocumentService.java
private final StorageService storageService; // Injetado automaticamente

public Document uploadDocument(MultipartFile file, ...) {
    // ...
    // Delegação para a estratégia instanciada
    storageService.uploadFile(file, fileKey, contentType);
    // ...
}
```

### Chain of Responsibility (Cadeia de Responsabilidade)
Permite passar pedidos por uma corrente de handlers (filtros). Ao receber um pedido, cada handler decide se processa o pedido ou o passa adiante.

No nosso ecossistema Spring Boot, utilizamos *Filters* para tratar segurança e limites de acesso.
```java
// Exemplo: RateLimitFilter.java
public class RateLimitFilter extends OncePerRequestFilter {
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
    if (excedeuLimite(ip)) {
      response.setStatus(429); // Rejeita e encerra a cadeia
      return;
    }
    // Passa para o próximo elo da cadeia
    filterChain.doFilter(request, response);
  }
}
```

### Observer (Observador)
Define um mecanismo de assinatura para notificar múltiplos objetos sobre eventos que ocorram. No frontend, usamos isso largamente através da **Context API** do React e da biblioteca **React Query**.

Os componentes subscrevem ao contexto de autenticação:
```tsx
// frontend/src/context/authContext.tsx
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Qualquer alteração neste estado notificará e atualizará 
  // todos os componentes filhos (Observadores) de forma reativa.
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 2. Padrões Estruturais

### Facade (Fachada)
Fornece uma interface simplificada para uma biblioteca, framework ou um conjunto complexo de classes.

No frontend, a nossa integração de rede feita através do **Axios** requer o gerenciamento de cabeçalhos complexos, interceptores e recuperação de cookies CSRF. Escondemos toda essa complexidade atrás do arquivo `api.ts`, criando uma Fachada simples para o restante da aplicação:
```typescript
// frontend/src/services/api.ts
// Configurações complexas ocultas dos componentes React
const api = axios.create({ baseURL, withCredentials: true });

api.interceptors.request.use((config) => {
  config.headers['X-XSRF-TOKEN'] = getCsrfToken();
  return config;
});

// Fachada amigável exportada para o frontend
export const login = async (email, senha) => {
  const resposta = await api.post('/api/auth/login', { email, password: senha });
  return resposta.data;
};
```

---

## 3. Padrões Criacionais

### Singleton
Garante que uma classe tenha apenas uma instância, enquanto provê um ponto de acesso global.
O framework Spring injeta o Singleton por baixo dos panos na nossa API. Ao marcarmos nossas classes com anotações de infraestrutura, garantimos economia de memória e reaproveitamento de componentes.
```java
@Service // O Spring garante que essa classe seja instanciada apenas UMA vez no ciclo de vida
public class EmailService {
    // ...
}
```

### Factory Method
Utilizamos também a infraestrutura do `@Bean` no Spring Security, onde classes de configuração implementam métodos que servem como fábricas de dependências, permitindo customizações complexas antes da devolução da instância.
```java
// backend/src/main/java/com/edtech/config/SecurityConfig.java
@Configuration
public class SecurityConfig {

  // O método age como uma Fábrica para o PasswordEncoder
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12); // Definimos a força do hash e inicializamos
  }
}
```
