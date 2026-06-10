# ADR 0006: Separação de API e Frontend (SPA)

## Status

Aceito

## Contexto

Na evolução de plataformas acadêmicas, frequentemente começamos com monolitos renderizados no servidor (Server-Side Rendering). Porém, os requisitos de usabilidade exigem uma experiência rápida, com `drag-and-drop` nativo e dashboards dinâmicos para orientadores e auditores. Além disso, no futuro, a plataforma pode precisar expor endpoints para integrações com outros sistemas universitários (SIGAA, Moodle).

## Decisão

Optamos por uma **Arquitetura Desacoplada**, utilizando um Frontend **SPA (Single Page Application)** construído em React e uma **API RESTful** independente no backend.

## Alternativas Consideradas

* **Monolito com Server-Side Rendering (SSR - Thymeleaf):** Descartado pois, embora simplificasse o deploy inicial e não exigisse tratamento complexo de tokens (CORS), limitaria a reusabilidade da API para integrações futuras (como uso por outros sistemas universitários) e dificultaria a interatividade fluida esperada em *dashboards* de auditoria.

## Consequências

### Positivas
- **Experiência de Usuário (UX):** Transições rápidas e interativas sem recarregar a página, melhorando a percepção de performance.
- **Separação de Preocupações:** O time de frontend pode trabalhar e fazer deploys independentes do time de backend.
- **Reaproveitamento de API:** A mesma API que atende o React poderá atender eventuais integrações via scripts ou aplicativos móveis no futuro.

### Negativas / Riscos
- **Complexidade de Deploy:** Exige dois pipelines de CI/CD distintos (um para o frontend, outro para o backend).
- **Gerenciamento de Estado de Autenticação:** Diferente de um monolito tradicional, exige a troca de tokens ou configuração fina de cookies CORS (ADR 0002) entre domínios distintos.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 04/06/2026 | Criação do documento | Pedro Henrique P. Santos |
