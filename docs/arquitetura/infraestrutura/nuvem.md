# :material-cloud: Arquitetura de Nuvem

A topologia cloud do projeto adota uma **estratégia 100% nativa no Google Cloud**, utilizando serviços gerenciados e serverless.

## Diagrama de Implantação (Google Cloud & Firebase)

```mermaid
flowchart TB
    %%{init: {"flowchart": {"nodeSpacing": 60, "rankSpacing": 80}}}%%
    User["Usuário"]
    Internet["Internet"]

    subgraph GCP["Google Cloud Platform & Firebase"]
        Firebase["Firebase Hosting<br>(Frontend React/Vite)"]
        Run["Cloud Run<br>(Backend Spring Boot)"]
        SQL["Cloud SQL<br>(PostgreSQL)"]
        Storage["Cloud Storage<br>(Bucket PDFs)"]
    end

    User --> Internet
    Internet --> Firebase
    Internet --> Run
    Run -->|JDBC (Socket)| SQL
    Run -->|API/gRPC| Storage
```

## Benefícios da Topologia

### Ecossistema Google Cloud
- **Firebase Hosting:** Distribuição global via CDN super rápida para o Frontend (React/Vite), com suporte a domínios personalizados e certificados SSL automáticos.
- **Cloud Run:** Permite *cold starts* e escalonamento até zero instâncias quando não houver alunos acessando de madrugada, economizando custos. A comunicação com o Firebase Hosting é natural e rápida.
- **Cloud SQL:** Isola a base relacional da internet pública, limitando o tráfego exclusivamente para a rede VPC interna do Cloud Run através do Cloud SQL Auth Proxy.
- **Cloud Storage:** Separa o armazenamento de grandes volumes binários (PDFs) do banco relacional, garantindo performance nas requisições textuais (APIs) da aplicação.

!!! info "Decisão Arquitetural"
    Consulte a [ADR 0001](../adrs/0001-armazenamento-google-cloud.md) para detalhes completos da consolidação da infraestrutura.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 30/05/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |
| `2.0` | 21/06/2026 | Inclusão do Supabase como provedor primário e GCP como fallback | Pedro Henrique P. Santos |
