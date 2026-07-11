# ADR 0015: Auditoria Imutável Absoluta e Melhorias de Developer Experience (DX)

**Status:** Aceito
**Data:** 2026-07-10

## Contexto

Durante um ciclo de auditoria e elevação de padrões arquiteturais, constatou-se que nossa camada de auditoria, embora funcional, permitia mutabilidade na camada de aplicação (existência de métodos "setters" no modelo `AuditLog.java` do Hibernate). Além disso, o ambiente de desenvolvimento local (DX) possuía fricção devido à falta de emuladores para serviços na nuvem (Google Cloud Storage) e gerenciadores de banco de dados, o que prejudicava o *onboarding* de novos desenvolvedores.

Adicionalmente, verificamos que as execuções do Flyway no momento do boot da aplicação no Cloud Run podiam causar *Timeouts* e quedas de serviço. 

## Decisão

Para alcançar a maturidade *Enterprise* em nosso produto, decidimos implementar as seguintes melhorias:

1. **Auditoria Imutável Absoluta:** Foram removidos todos os métodos modificadores (setters) da entidade `AuditLog.java` e aplicadas anotações `@Column(updatable = false)`. Uma vez instanciado e salvo via repositório, o registro é imutável em nível de aplicação e ORM, garantindo o mais alto nível de conformidade e integridade.
2. **Hardening de Segurança (Containers):** A imagem Docker do Frontend (Next.js/React) foi migrada para `nginxinc/nginx-unprivileged:alpine`, removendo completamente o acesso `root` no container de produção.
3. **Desacoplamento de Migrations:** O processo de CI/CD via GitHub Actions (`ci.yml`) foi alterado para executar o Flyway como um *Cloud Run Job* isolado antes de direcionar tráfego para a API.
4. **Developer Experience (DX) - Emuladores Locais:** O `docker-compose.yml` de desenvolvimento recebeu as imagens `fsouza/fake-gcs-server` e `adminer`. Criamos também um `docker-compose.prod.yml` para emulação do build final localmente.

## Consequências

- **Positivas:** Aumento severo da confiabilidade do sistema e velocidade de desenvolvimento local. Menor risco de vulnerabilidades e indisponibilidades durante *deploys*.
- **Negativas:** Desenvolvedores terão que se habituar à nova porta `8080` do frontend local devido ao Nginx *unprivileged*, e a injeção do GCS Emulator pode exigir ajustes na inicialização do serviço local.
