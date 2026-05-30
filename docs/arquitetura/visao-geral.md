# Visão Geral e Contexto

O projeto EdTech (DocVault Academic) adota uma arquitetura monolítica no backend, aliada a um frontend Single Page Application (SPA), focada em garantir **isolamento de dados**, **alta rastreabilidade (auditoria)** e **segurança em nível bancário** para instituições de pesquisa.

## 1. Atores do Sistema
- **Pesquisador (`researcher`)**: Faz o upload de documentos e versões de rascunhos em seus próprios projetos.
- **Orientador (`advisor`)**: Supervisiona projetos associados, validando artefatos e aprovando versões finais.
- **Auditor / Admin (`auditor`)**: Avalia métricas de sistema e analisa logs imutáveis para fins de compliance.

---

## 2. Metas e Restrições Estratégicas

### 2.1 Metas de Negócio e Arquiteturais
*   **Centralização Segura**: Criar um repositório único e confiável para a custódia de propriedade intelectual produzida em laboratórios acadêmicos.
*   **Auditoria Irrefutável**: Toda operação sensível de leitura, escrita ou deleção lógica deve ser passível de rastreio (quem, quando, o quê e de onde).
*   **Isolamento Hermético (Multi-tenancy Lógico)**: Assegurar que pesquisadores e orientadores vejam estritamente os documentos de projetos aos quais estão designados.

### 2.2 Restrições Técnicas
*   **Plataforma Cloud Obrigatória**: Implantação exclusiva na **Google Cloud Platform (GCP)** (Cloud Run, Cloud SQL e Cloud Storage).
*   **Linguagem de Backend Padrão**: Uso mandatório do **Java 17 LTS** e ecossistema **Spring Boot 3.x**.
*   **Armazenamento de Sessão Seguro**: Proibição estrita do uso de `localStorage` ou `sessionStorage` para guarda de tokens JWT, exigindo o uso de cookies `HttpOnly` e `Secure`.
*   **Imutabilidade de Logs**: Proibido o uso de `UPDATE` ou `DELETE` na tabela de auditoria a nível de banco de dados.

---

## 3. Atributos de Qualidade e Requisitos Não Funcionais (NFRs)

A arquitetura atende às demandas exigidas nas seguintes frentes:

*   **Desempenho e Latência**: O envio binário direto (upload) e retorno de arquivos estáticos devem suportar manipulação off-loaded (através de Signed URLs do GCS para uploads volumosos, poupando a memória dos contêineres Spring).
*   **Escalabilidade (Elástica)**: Sendo implantado no Cloud Run, o backend provisiona novas instâncias baseadas no volume simultâneo de requisições, podendo escalar para zero (Scale-to-Zero) em períodos ociosos, poupando recursos orçamentários.
*   **Manutenibilidade**: Camadas bem definidas no monorepo e separação baseada em DTOs protegem as APIs de quebras por mudanças internas de bancos de dados.
*   **Auditoria e Compliance**: Todos os dados cruciais inseridos na tabela `audit_logs` viabilizam rastreabilidade retroativa absoluta de acessos não autorizados ou vazamentos.
