# ADR 0003: Adoção de Google Cloud Run (Serverless)

## Status

Aceito

## Contexto

A plataforma atende grupos de pesquisa universitários. O tráfego de acesso é altamente sazonal: há picos enormes durante as semanas de entrega de teses, artigos de fim de semestre e submissões para congressos, enquanto o sistema fica praticamente ocioso durante madrugadas, feriados e férias escolares.
Manter servidores virtuais (VMs) tradicionais rodando 24/7 geraria custos desnecessários para o orçamento do laboratório. Por outro lado, precisamos que a aplicação suporte picos repentinos de dezenas de uploads simultâneos sem cair.

## Decisão

Optamos por hospedar o backend da aplicação utilizando o **Google Cloud Run**, uma plataforma Serverless para contêineres Docker.

## Consequências

### Positivas

- **Escalabilidade Automática:** O Cloud Run escala instâncias automaticamente (Scale to N) durante picos de tráfego, garantindo estabilidade durante as semanas de entrega.

- **Redução de Custos (Scale to Zero):** Quando não há tráfego (ex: madrugadas), as instâncias são desligadas, resultando em cobrança zero para o tempo de computação.

- **Agilidade no Deploy:** Por ser conteinerizado, a integração com o GitHub Actions se torna natural. Basta construir a imagem Docker e enviá-la para o Artifact Registry.

### Negativas / Riscos

- **Cold Starts:** Como o sistema pode escalar a zero, o primeiro usuário a acessar a plataforma após um longo período de inatividade pode enfrentar uma demora (Cold Start) de alguns segundos enquanto o contêiner Java/Spring Boot sobe. Isso será mitigado mantendo 1 instância mínima rodando no horário comercial.

- **Stateless Obrigatório:** Obriga a aplicação a ser estritamente stateless (sem estado interno). Todo armazenamento persistente precisa ser delegado (PostgreSQL, GCS), o que já está alinhado com a arquitetura definida.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |


## Histórico de Versão

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| 1.0 | 28/06/2026 | Criação e estruturação do documento | Pedro Henrique P. Santos |
