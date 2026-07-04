---
title: 'ADR 0005: Framework Backend (Spring Boot + Java 17)'
---

# :material-text-box-check: ADR 0005: Framework Backend (Spring Boot + Java 17)

## Status

Aceito

## Contexto

A plataforma necessita de uma fundação sólida, segura (para gerenciamento de papéis de Pesquisador, Orientador e Auditor) e sustentável a longo prazo, sendo desenvolvida por equipes que costumam rotacionar em ambiente universitário. Além disso, a aplicação lida intensivamente com autenticação e transações financeiras/acadêmicas.

## Decisão

Optamos por utilizar **Java 17** com **Spring Boot 3**.

## Consequências

### Positivas

- **Segurança Nativa:** O Spring Security fornece de imediato implementações maduras e testadas para gerenciar filtros JWT, CSRF e CORS, itens críticos para a auditoria.

- **Integração:** Excelente suporte nativo para bibliotecas de terceiros como Google Cloud Storage (via Spring Cloud GCP) e Flyway.

- **Manutenibilidade:** Java é estaticamente tipado e amplamente ensinado nas grades da universidade, facilitando o onboarding de novos alunos e pesquisadores no AILAB Makers.

### Negativas / Riscos

- **Consumo de Memória:** Aplicativos Java Spring Boot tradicionalmente consomem mais memória do que alternativas como Node.js ou Go, o que pode encarecer ligeiramente a instância no Cloud Run.

- **Cold Starts Lentos:** Sem GraalVM/AOT, os tempos de inicialização são maiores, o que agrava o ponto negativo levantado na adoção do Cloud Run (ADR 0003).

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |


