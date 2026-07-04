# ⚙️ EdTech Backend — O Núcleo

![Java](https://img.shields.io/badge/Java-21_LTS-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Security](https://img.shields.io/badge/Security-Strict-red?style=for-the-badge&logo=springsecurity)

> *"Bem-vindo. Eu sou o Guardião deste sistema. Aqui, os dados entram estruturados e saem validados. Se você está procurando rotas não documentadas ou endpoints sem segurança, está no lugar errado. Tudo aqui exige credenciais, tipagem estática rigorosa e tratamento impecável de exceções."* 🛡️

Bem-vindo ao serviço RESTful que suporta todo o EdTech. Este é um ambiente governado por regras estritas, performance e segurança. Adotamos o Spring Boot 4.1 rodando na JVM (Java 21 LTS). Nenhuma requisição avança sem ser escrutinada pelo nosso filtro JWT.

## 🏗️ Arquitetura e Engenharia

Não gostamos de código "macarrão". A estrutura deste serviço é meticulosamente dividida em camadas lógicas:

- **Controllers (`/controller`):** As portas do castelo. Tudo o que entra aqui é imediatamente sanitizado e validado (Bean Validation). Nada de lixo entra, nada de lixo sai.
- **Services (`/service`):** Onde as regras de negócios residem. Isolamos lógicas complexas e transações de banco de dados. 
- **Repositories (`/repository`):** Os arquivistas. Acesso limpo via Spring Data JPA ao PostgreSQL.
- **Configurações (`/config`):** A estrutura que sustenta a segurança e conectividade em nuvem (CORS, JWT, Beans).

---

## 🔒 Segurança em Primeiro Lugar

Se você quer apenas bater num endpoint, prepare-se para ser barrado com um `403 Forbidden` a menos que tenha a chave (JWT).

1. **Tokens Assinados (HMAC-256):** Somente nós sabemos como gerar o token e validar assinaturas. Sem chave vazada, sem acesso.
2. **CORS Rígido:** Nós não aceitamos origens genéricas (nada de `*`). Apenas o frontend mapeado tem permissão para consumir nossos recursos.
3. **Auditoria:** Toda operação de upload no `GCS` (Google Cloud Storage) é controlada e autenticada.

---

## 🛠️ Como Iniciar o Núcleo (Localmente)

Se você precisa debugar algo ou desenvolver uma nova feature, siga este ritual:

### Pré-requisitos
- JDK 21 (Não negocie, é 21).
- Maven 3.9+
- Banco de dados PostgreSQL rodando (pode usar o Docker da pasta infra).

### Execução Padrão

```bash
# 1. Tenha certeza de que suas variáveis locais estão no lugar.
# Se faltar alguma configuração no application.yml, o sistema irá gritar.

# 2. Instale as dependências
mvn clean install -DskipTests

# 3. Levante o serviço
mvn spring-boot:run
```

Ou, como eu prefiro, deixe que a infraestrutura cuide disso via Docker Compose (na raiz do repositório).

---

## 🧪 Testes

*"Inocente até que se prove que não compila."* 
Não adicione endpoints sem escrever testes unitários ou de integração apropriados. Nós usamos JUnit 5. Faça o seu dever de casa antes de abrir um PR.

Se encontrar algum erro interno `500`, a culpa possivelmente é sua. Verifique seus logs de stacktrace (que nós, cuidadosamente, registramos) e tente novamente.
