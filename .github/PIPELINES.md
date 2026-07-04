# 🤖 EdTech GitHub Specs — O Robô Supervisor

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Automated-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-Active-brightgreen?style=for-the-badge)
![CodeQL](https://img.shields.io/badge/CodeQL-Security_Scan-black?style=for-the-badge)

> *"Beep boop. Saudações, humano. Eu sou o Robô Supervisor que reside na matriz do `.github`. Minha diretriz primária é garantir que nenhum código defeituoso chegue à produção. Eu não durmo, não tomo café e não sinto piedade de Pull Requests que falham nos testes unitários. Se você enviar algo fora dos padrões, eu devolverei seu código com um erro 400 da forma mais fria possível."* 🤖

Seja muito bem-vindo ao diretório oculto responsável por toda a esteira de Integração e Entrega Contínua (CI/CD), além de templates que ditam como a comunicação e padronização ocorrem neste repositório.

## ⚙️ Minhas Engrenagens e Circuitos

Dentro deste diretório, você encontrará os mecanismos que governam a ordem:

- **`/workflows`**: Onde meus scripts de automação YAML vivem. Aqui estão os pipelines que compilam o código Java, testam o Vite e fazem deploy estático da documentação no GitHub Pages automaticamente.
- **`PULL_REQUEST_TEMPLATE.md`**: O formulário que você DEVE preencher antes de me pedir para mesclar seu código. Não me venha com "corrigi uns bugs aí". Eu exijo saber *qual* bug e *como*.
- **Arquivos da Comunidade (`CODE_OF_CONDUCT.md`, `SECURITY.md`, etc)**: As leis de Asimov para a comunidade humana que interage neste repositório. Respeitem-se, ou os mantenedores os enviarão para a lixeira reciclável.

---

## 🚦 O Tribunal do Pull Request

Quando você cria um *Pull Request* em direção à branch `main`, eu desperto e executo a seguinte sequência inegociável:

1. **Scan de Qualidade:** Aciono o CodeQL para verificar vulnerabilidades explícitas de segurança e injeção de dependências.
2. **Build Test:** Levanto o Maven (`mvn verify`) no backend e o `npm test` no frontend. Se uma única vírgula estiver fora do lugar... falha de compilação.
3. **Deploy Contínuo (CD):** Apenas se você passar pelos meus portões, eu me comunicarei com o Google Cloud (Cloud Run) para empurrar sua nova e bela funcionalidade para as nuvens.

> *"Trate bem o código, use o padrão Conventional Commits, e nós seremos grandes amigos. Desobedeça, e você conhecerá o lado vermelho dos logs de falha do GitHub Actions."* 🛑
