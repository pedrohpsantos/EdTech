# :material-cloud: Arquitetura de Nuvem (GCP)

A topologia cloud do projeto foca em escalabilidade Serverless usando o ecossistema gerenciado do Google Cloud Platform.

## Diagrama de Implantação

```mermaid
flowchart TB
    classDef person font-weight:bold
    classDef container stroke-width:2px
    classDef cloud stroke-width:2px,stroke-dasharray: 5 5

    Browser(["Navegador Web do Cliente\n(Chrome/Safari)"]):::person
    
    subgraph GCP ["Google Cloud Platform (us-central1)"]
        direction TB
        
        subgraph CloudRun ["Cloud Run (Serverless)"]
            API["EdTech Backend API\n(Docker / Spring Boot)"]:::container
        end
        
        subgraph CloudSQL ["Cloud SQL"]
            DB[("PostgreSQL 15+\n(Banco Relacional)")]:::container
        end
        
        subgraph CloudStorage ["Cloud Storage"]
            GCS["Bucket de Submissões\n(Blob Storage)"]:::container
        end
    end

    Browser -- "HTTPS / REST" --> API
    API -- "JDBC TCP/IP" --> DB
    API -- "gRPC Upload" --> GCS
    
    class GCP,CloudRun,CloudSQL,CloudStorage cloud
```

## Benefícios da Topologia
- **Cloud Run:** Permite *cold starts* e escalonamento até zero instâncias quando não houver alunos acessando de madrugada, economizando custos.
- **Cloud SQL:** Isola a base relacional da internet pública, limitando o tráfego exclusivamente para a rede VPC interna do Cloud Run.
- **Cloud Storage:** Separa o armazenamento de grandes volumes binários (PDFs) do banco relacional, garantindo performance nas requisições textuais (APIs).

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Criação do documento | Pedro Henrique P. Santos |
