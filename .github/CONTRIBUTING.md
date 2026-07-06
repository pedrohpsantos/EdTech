# Diretrizes de Contribuição

O projeto EdTech adota normas rigorosas de padronização, automação e qualidade. Quaisquer contribuições (resoluções de problemas, atualizações de arquitetura ou correções de código) devem aderir aos protocolos detalhados neste documento para serem incorporadas.

## Fluxo de Trabalho (Git Flow)

1. **Rastreamento:** Procure na aba de *Issues* por itens com *tags* correspondentes (`good first issue`, `bug`, etc). Caso proponha algo novo, crie uma Issue descritiva primeiramente.
2. **Branching:** A partir de um *fork* ou da branch `develop` (se você for mantenedor interno), crie uma nova branch com prefixo descritivo, por exemplo: `feat/nome-da-funcionalidade` ou `fix/nome-da-correcao`.
3. **Desenvolvimento:** Submeta alterações seguindo estritamente os padrões de codificação do ecossistema correspondente, garantindo que o código passe pelos requisitos mínimos de *linting* e baterias de testes (e.g. `mvn verify` e `npm test`).
4. **Submissão (Pull Request):** Abra o Pull Request apontando para a branch `develop`. Preencha de forma metódica o formulário do PR (Pull Request Template), garantindo que os *Checks* de CI do GitHub Actions finalizem com sucesso.

---

## Padronização de Commits

A integridade do histórico do Git e a automação de releases dependem da adesão unânime ao padrão **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)**:

```text
<tipo>[escopo opcional]: <descrição breve>
```

### Tipos Permitidos

- `feat:` Inclusão de nova funcionalidade.
- `fix:` Correção de defeito/bug.
- `docs:` Alterações exclusivas na base documental (arquivos Markdown, documentação do MkDocs).
- `chore:` Atualizações de infraestrutura, dependências ou manutenções na esteira de build (ex: `chore(deps): update vite`).
- `refactor:` Ajustes de código que não adicionam funcionalidades nem corrigem bugs (ex: otimização estrutural).
- `test:` Inserção ou correção nas baterias de testes.
- `style:` Alterações exclusivas de formatação (espaçamentos, quebras de linha), sem impacto na lógica de negócios.

**Exemplo de Commit Válido:**
`feat(auth): adiciona fluxo de login com validacao JWT`

> Mensagens vagas e submissões fora do padrão de Conventional Commits resultarão em falha automática na esteira de CI ou exigirão a refatoração completa do histórico (rebase).

---

## Padrões de Código e Estrutura

- **Backend (Java):** Adoção das convenções arquiteturais do Spring Boot e Google Java Style. Nomenclatura rigorosa (`camelCase` para métodos/variáveis, `PascalCase` para classes/interfaces). Todo o código é submetido à avaliação do Checkstyle.
- **Frontend (React):** Componentização lógica, utilizando estilos modulares (Vanilla CSS) ou padrões de classes consistentes e componentes isolados declarados em `PascalCase`.
- **Documentação:** Estilo de escrita técnico, objetivo, formal e alinhado aos padrões corporativos do MkDocs. Arquivos textuais devem utilizar exclusivamente a extensão Markdown (`.md`).

## Suporte

Em caso de impasses técnicos profundos — especialmente de infraestrutura local via Docker —, registre o erro via Issue contendo obrigatoriamente os *stacktraces* do terminal ou evidências contextuais. Problemas documentados corretamente garantem resolução sistêmica acelerada.
