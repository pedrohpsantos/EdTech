# :material-vector-arrange-below: C4 Model (Contexto e Containers)

Para substituir mapas mentais acadêmicos e diagramas rígidos, o projeto adota o **C4 Model** (desenvolvido por Simon Brown), uma taxonomia padrão de mercado para visualização de arquitetura de software de forma clara para desenvolvedores e stakeholders de negócios.

## Nível 1: Diagrama de Contexto de Sistema

O Diagrama de Contexto mostra o sistema EdTech no centro, rodeado pelos seus atores (Personas) e sistemas externos que ele interage.

```mermaid
C4Context
    title Diagrama de Contexto de Sistema (Nível 1) - Repositório Acadêmico
    
    Person(pesquisador, "Pesquisadora", "Estudante ou Docente (Ana) que produz e envia artigos.")
    Person(orientador, "Orientador", "Professor Doutor (Carlos) que gerencia laboratórios e revisa artigos.")
    Person(auditora, "Auditora", "Time de Compliance (Márcia) que monitora os acessos e rastros do sistema.")

    System(edtech_sys, "Plataforma de Repositório", "Gerencia submissão, armazenamento, controle de acesso e log imutável de PDFs de teses.")

    System_Ext(gcs, "Google Cloud Storage", "Plataforma externa em nuvem onde os arquivos binários são depositados.")

    Rel(pesquisador, edtech_sys, "Autentica e Faz Upload de Arquivos", "HTTPS/Web")
    Rel(orientador, edtech_sys, "Gerencia projetos e aprova teses", "HTTPS/Web")
    Rel(auditora, edtech_sys, "Consulta e exporta logs imutáveis", "HTTPS/Web")
    
    Rel(edtech_sys, gcs, "Envia Streams de Arquivos (PDFs/CSVs)", "gRPC/API")
```

## Nível 2: Diagrama de Container

No C4 Model, um "Container" representa algo que precisa estar rodando para que o sistema funcione (uma API, um App Web, um Banco de Dados).

```mermaid
C4Container
    title Diagrama de Container (Nível 2) - Repositório Acadêmico

    Person(usuario, "Usuário Logado", "Qualquer persona autenticada via Web")

    System_Boundary(c1, "Plataforma de Repositório") {
        Container(spa, "Single Page Application", "React/Vue", "Provê todas as funcionalidades da interface web para os usuários através do navegador.")
        Container(api, "API Backend", "Python / FastAPI", "Gerencia o fluxo de segurança, regras de isolamento de laboratório, e gera JWTs.")
        ContainerDb(db, "Banco de Dados Relacional", "PostgreSQL", "Armazena dados de usuários, projetos, referências dos documentos e a tabela de audit_logs.")
    }

    System_Ext(gcs, "Google Cloud Storage", "Bucket de Armazenamento")

    Rel(usuario, spa, "Visita a aplicação web usando", "HTTPS")
    Rel(spa, api, "Faz chamadas a API (envia/recebe JSON)", "HTTPS")
    Rel(api, db, "Lê de e escreve em", "TCP/IP")
    Rel(api, gcs, "Gera Links Presigned e Faz Upload", "gRPC")
```

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Diagramas C4 para documentação ágil de mercado | Pedro Henrique P. Santos |
