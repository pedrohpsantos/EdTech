# 📝 Descrição do PR

Escreva um breve resumo do que está sendo adicionado, alterado ou corrigido nesta documentação.

## 🎯 Objetivo / Contexto

- Qual a motivação para essa mudança? (ex: nova ata de reunião, documentação de arquitetura, etc)
- Existe alguma Issue relacionada? (Se sim, inclua o link)

## 🛠️ Checklist de Revisão (Obrigatório)

Antes de solicitar a revisão, certifique-se de que os itens abaixo foram atendidos:

### Validação e Qualidade
- [ ] A documentação foi testada localmente (`uv run mkdocs serve`) e não apresenta erros na build ou links quebrados.
- [ ] O padrão de formatação foi respeitado, conforme as regras locais definidas em `.markdownlint-cli2.jsonc`.
- [ ] **Nenhum dado sensível** (chaves de API, credenciais, segredos de infra) foi exposto no texto.

### Padrões do Repositório
- [ ] O título do PR e os commits seguem a convenção do projeto (ex: `docs: ...`, `chore: ...`).
- [ ] O PR **não adiciona placeholders públicos** (ex: e-mails falsos) ou **comandos não verificáveis** de módulos ainda não finalizados.
- [ ] Links cruzados entre `README.md`, `CONTRIBUTING.md` e a documentação interna foram atualizados se necessário.
- [ ] (Opcional) Se for uma nova página, ela foi devidamente registrada na estrutura de navegação do `mkdocs.yml`?

---
*Ao submeter este PR, declaro que as políticas do projeto foram respeitadas e que o conteúdo está pronto para revisão.*

---

## 🔒 Security & Compliance Checklist

- [ ] Nenhum segredo (API keys, tokens, senhas) foi adicionado ao código-fonte ou logs
- [ ] Inputs do usuário são validados no backend (tipo, tamanho, formato)
- [ ] Endpoints novos/modificados possuem autorização adequada (`@PreAuthorize` ou verificação de ownership)
- [ ] Nenhuma query nativa sem bind de parâmetros foi introduzida (prevenção de SQL Injection)
- [ ] Respostas de erro não expõem stack traces, nomes de tabelas ou paths internos
- [ ] Rate limiting está aplicado em endpoints sensíveis (auth, recovery, upload)

## 🗄️ Flyway & Database Checklist

- [ ] Migrações SQL usam nomenclatura sequencial correta (`V{N}__description.sql`)
- [ ] Migrações já aplicadas em produção **não foram alteradas** (checksum imutável)
- [ ] Novas colunas NOT NULL possuem valor DEFAULT ou migração em duas fases
- [ ] Índices foram considerados para queries frequentes em colunas filtradas

## 📱 Mobile (React Native) Compatibility

- [ ] Nenhum contrato de API foi quebrado (campos, status codes, formato de resposta)
- [ ] Novos endpoints retornam status codes semânticos (não 200 com payload de erro)
- [ ] Payloads de resposta são enxutos (sem campos desnecessários para mobile)
- [ ] Tokens são enviados via header `Authorization: Bearer` (não dependem de cookies)

## ✅ Tests

- [ ] Testes unitários cobrem o caminho feliz e casos de erro
- [ ] Testes de autorização verificam que usuários não autorizados recebem 401/403
- [ ] Nenhum teste existente foi removido ou enfraquecido
- [ ] `./mvnw clean test` passa localmente
