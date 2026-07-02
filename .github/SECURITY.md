# Política de Segurança — EdTech

Este repositório acadêmico do laboratório **AILAB Makers (UnB FCTE)** segue diretrizes de segurança no tratamento de dados e vulnerabilidades.

## Versões Suportadas

O projeto é atualmente suportado com as seguintes versões mínimas e configurações:

| Camada | Tecnologia |
| :--- | :--- |
| **Backend** | Java 21 LTS / Spring Boot 4.1.x |
| **Frontend** | React 19.x / Vite 8.x |
| **Banco de Dados** | PostgreSQL 15 (Google Cloud SQL) |
| **Gerenciamento (Docs)** | Python 3.11+ via `uv` |

## Reportando Vulnerabilidades

> [!CAUTION]
> **NÃO ABRA UMA ISSUE PÚBLICA** para relatar falhas de segurança que afetem a autenticação (JWT), auditoria ou isolamento de dados (autores/orientadores).

Relate vulnerabilidades exclusivamente via **GitHub Security Advisories** (na aba `Security` > `Advisories` deste repositório) para um envio privado e criptografado direto à equipe.
Como *fallback*, contate o Tech Lead diretamente pelo perfil do GitHub associado ao projeto.

### O que esperar após o relato?

1. **Confirmação:** Nosso time fará o possível para responder acusando o recebimento em até **7 dias úteis**.
2. **Triagem e Correção:** O relato será classificado em criticidade e a equipe desenvolverá um patch confidencial na branch interna.
3. **Divulgação Responsável:** Após o patch ser testado e integrado aos ambientes principais (com a trilha de auditoria devidamente reforçada), a vulnerabilidade será divulgada publicamente com os devidos créditos a quem a relatou.
