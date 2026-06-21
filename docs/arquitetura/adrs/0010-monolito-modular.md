# ADR 0010: Adoção de Arquitetura Monolítica Modular vs. Microsserviços

## Status
Aceito

## Data
21 de Junho de 2026

## Contexto
Durante as fases iniciais de desenvolvimento do EdTech, surgiu a necessidade de definir como os domínios do sistema (ex: Autenticação, Gestão de Documentos, Gestão de Projetos) seriam separados. A estrutura inicial de diretórios chegou a prever pastas separadas (`docvault/auth` e `docvault/api`), sugerindo uma arquitetura orientada a Microsserviços, onde o serviço de Autenticação rodaria de forma isolada do restante do backend.

No entanto, o escopo atual (MVP - Produto Mínimo Viável) exige velocidade de iteração, facilidade no fluxo de CI/CD (Integração e Entrega Contínuas), além de baixa complexidade em infraestrutura (redução de custos operacionais e da necessidade de orquestrar diversos containers).

## Decisão
Decidimos consolidar toda a lógica de negócio, incluindo Autenticação (Login, Registro e JWT) e o Core do repositório, dentro de um **único aplicativo Spring Boot** (`edtech-api`), adotando o padrão de **Monolito Modular**.

A antiga pasta de microsserviço de autenticação (`docvault/auth`) foi removida da base de código, e os `Controllers` e `Services` referentes à segurança encontram-se isolados de forma lógica (em pacotes Java específicos) dentro do próprio projeto principal.

## Consequências

### Positivas
* **Simplicidade de Deploy:** Apenas um Dockerfile e um serviço no Cloud Run.
* **Agilidade de Desenvolvimento:** Desenvolvedores front-end e back-end só precisam levantar um único backend local na porta `8080` para terem todo o sistema funcional.
* **Menor Complexidade de Rede:** Sem necessidade de chamadas de rede internas (HTTP/gRPC) para validação de tokens entre serviços. Transações e consultas ao banco de dados são diretas.
* **Organização Lógica:** O código segue bem estruturado em pacotes (módulos lógicos), o que facilita a refatoração ou até a futura quebra em microsserviços, caso o produto ganhe tração e exija escala horizontal isolada de algum módulo.

### Negativas
* O backend (Spring Boot) sofre um acoplamento temporal: caso o serviço de upload de arquivos tenha um pico altíssimo de processamento e consuma toda a CPU, as rotas de login também serão penalizadas.
* Todos os módulos escalam juntos, mesmo os que possuem pouca demanda, o que poderia (no longo prazo) gerar ineficiência computacional.

## Alternativas Consideradas
* **Microsserviços Completos (Auth + API Isolados):** Rejeitado. Isso demandaria a criação de um API Gateway, tratamento complexo de CORS e o dobro do trabalho no setup local dos desenvolvedores. Para o estágio de MVP, isso violaria o princípio de simplicidade (KISS).
