# Backend e API (Spring Boot)

O backend do EdTech atua como uma API RESTful independente, empacotada e orquestrada via **Spring Boot 3**.

## Arquitetura em Camadas

Seguimos a arquitetura padrão baseada em domínio de negócio isolado:
1. **Controllers (`com.edTech.controller`)**: Pontos de entrada HTTP.
2. **Services (`com.edTech.service`)**: Onde a lógica de negócio principal e regras de autorização habitam.
3. **Repositories (`com.edTech.repository`)**: Interfaces JPA para persistência de dados.
4. **Models/Entities (`com.edTech.model`)**: Mapeamento Objeto-Relacional (ORM) e Enums.
5. **DTOs (`com.edTech.dto`)**: Objetos que blindam a entidade para o envio ou recebimento de dados da internet.

## Segurança e Autenticação

A arquitetura utiliza **JWT** injetados via cookies seguros HTTPOnly (`SameSite=Strict`), blindando a aplicação contra ataques XSS.
Qualquer rota protegida passa pelo `JwtAuthenticationFilter` antes de chegar no Controller.

## Persistência de Dados (Flyway)

Para garantir que o banco de dados possa ser replicado consistentemente entre o computador dos desenvolvedores e a nuvem, nós **não utilizamos o gerador automático do Hibernate** (`ddl-auto=update`).

Toda evolução do banco de dados (novas tabelas, colunas, chaves estrangeiras) é feita explicitamente através dos scripts de migração do **Flyway**, contidos em `src/main/resources/db/migration/`.
