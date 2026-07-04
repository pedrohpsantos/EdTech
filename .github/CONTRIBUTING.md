# 🤝 Como Contribuir para o EdTech

> *"Olá! Seja muito bem-vindo ao projeto EdTech. Eu sou o Mentor Amigável. Fico extremamente feliz que você queira contribuir conosco. Quer você esteja resolvendo um bug crítico, consertando um erro de digitação na documentação ou propondo uma arquitetura nova, sua ajuda é muito valiosa! Puxe uma cadeira, pegue um café e vamos codar juntos."* ☕

Para garantirmos que o repositório se mantenha organizado e que seus Pull Requests (PRs) sejam aprovados rapidamente, peço que você siga algumas regras simples.

## 🧭 O Caminho do Contribuidor

1. **Encontre um Problema:** Procure na aba de *Issues* por tarefas com as tags `good first issue` ou `help wanted`. Se quiser propor algo novo, abra uma issue primeiro para discutirmos a ideia!
2. **Faça um Fork:** Crie a sua própria cópia do repositório.
3. **Crie uma Branch:** Não commite diretamente na sua `main`. Crie uma branch descritiva (ex: `feat/login-page` ou `fix/jwt-validation`).
4. **Code com Cuidado:** Siga os padrões do projeto. Se você mexeu no backend, garanta que o Maven (`mvn test`) ainda sorri para você. Se mexeu no frontend, verifique se não quebrou o layout.
5. **Abra o Pull Request:** Preencha o nosso template de PR com carinho. O robô revisor do GitHub Actions passará para verificar seu código.

---

## 📝 Regras de Ouro: Conventional Commits

Nós amamos automação! E para que a automação funcione, precisamos que o histórico do Git seja limpo. Seus commits **devem** seguir o formato do [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```text
<tipo>[escopo opcional]: <descrição breve>
```

**Tipos permitidos:**
- `feat:` Nova funcionalidade (Isso geralmente gera uma versão nova minor).
- `fix:` Correção de bug (Gera uma versão patch).
- `docs:` Mudanças apenas na documentação (READMEs, MkDocs).
- `chore:` Tarefas de manutenção ou atualização de pacotes (ex: `chore(deps): update vite`).
- `refactor:` Refatoração de código que não adiciona funcionalidade nem corrige bug.
- `test:` Adição ou correção de testes E2E / Unitários.
- `style:` Formatação de código (tabs, espaços), sem mudança lógica.

**Exemplo Perfeito:**
`feat(auth): adiciona fluxo de login com validacao JWT`

*Se o seu commit for apenas `ajustes` ou `arrumei o bug`, meu amigo... eu terei que pedir amavelmente para você reescrever o histórico (rebase).* 😅

---

## 🏗️ Padrões de Código

- **Backend (Java):** Usamos a convenção oficial do Google/Spring. Nomes de variáveis em `camelCase`, classes em `PascalCase`. Tipagem estrita.
- **Frontend (React):** Componentes sempre em `PascalCase`. Usamos CSS puro para estilos organizados.
- **Documentação:** Mantenha um tom profissional mas acolhedor. Arquivos sempre em formato Markdown (`.md`).

## 💬 Precisa de Ajuda?

Se travar em alguma etapa de configuração (o Docker às vezes tem vida própria), abra uma issue com a tag `question` ou marque os mantenedores. Nós não mordemos! E lembre-se: todo Mestre Sênior um dia já foi um Estagiário que quebrou a produção. O importante é aprender. 🚀
