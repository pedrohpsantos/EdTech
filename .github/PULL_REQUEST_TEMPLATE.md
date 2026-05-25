# 📝 Descrição do PR

## 🎯 Objetivo / Requisito

- [ ] Qual funcionalidade ou correção foi implementada?
- [ ] Esta tarefa está relacionada a qual requisito da Fase 2?
- [ ] A funcionalidade atende ao critério de isolamento de dados (autores/orientadores)?

## 🛠️ Checklist de Qualidade (Obrigatório)

Antes de solicitar a revisão, certifique-se de que todos os itens foram atendidos:

### Código e Segurança

- [ ] O código respeita o isolamento estrito de dados (rascunhos visíveis apenas para os autorizados).
- [ ] Logs de auditoria foram implementados para esta funcionalidade (login, upload, falha de acesso, etc).
- [ ] O código foi testado localmente e não apresenta comportamentos anômalos.
- [ ] **Nenhum dado sensível** (chaves de API, credenciais, segredos) foi exposto no código.

### Testes e Documentação

- [ ] Testes unitários (JUnit) criados ou atualizados para esta funcionalidade?
- [ ] A documentação no MkDocs (arquitetura/logs/segurança) foi atualizada?
- [ ] O código segue a convenção de commits (`feat`, `fix`, `docs`, `refactor`)?

### Integração

- [ ] A branch está atualizada com a `main` e não possui conflitos de merge.
- [ ] Todos os passos do checklist foram validados manualmente.

---
*Ao submeter este PR, declaro que as políticas de qualidade do laboratório foram respeitadas e que a funcionalidade está pronta para ser auditada pelos tutores.*
