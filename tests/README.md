# 🕵️ EdTech Tests — O Escritório de Qualidade

![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![k6](https://img.shields.io/badge/k6-Performance-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![Quality](https://img.shields.io/badge/Bugs_Allowed-Zero-red?style=for-the-badge)

> *"Você acha que seu código está pronto? Eu sou o Inspetor Implacável. Meu trabalho não é escrever features, meu trabalho é destruí-las antes que cheguem em produção. Aqui neste diretório, nós simulamos usuários mal-intencionados, cliques furiosos e quedas de rede. Eu desconfio de tudo e de todos. Seu PR não é aceito até passar por interrogatório completo aqui. Mãos ao alto!"* 🔎

Bem-vindo ao diretório (`/tests`), a alfândega que garante a qualidade da plataforma EdTech. Nós testamos não apenas se a aplicação roda, mas se ela resiste à dor. Usamos abordagens de ponta para simular a realidade de forma brutal e determinística.

## 🔬 Nossos Métodos de Investigação

Dividimos nossos esforços em pastas específicas para cada tipo de crime que precisamos investigar:

- **`/tests/e2e` (End-to-End com Playwright):** Nossos robôs abrem navegadores invisíveis (Chromium, Firefox, WebKit) e clicam em todos os botões do sistema inteiro. Eles confirmam desde o login via JWT até o upload final do arquivo, interagindo tanto com o Frontend quanto com o Backend simultaneamente.
- **`/tests/k6` (Performance e Stress):** Simulações de carga pesada. O que acontece quando 5.000 alunos tentam acessar um edital ao mesmo tempo? O k6 esmurra nossa API para garantir que não haverá lentidão.

---

## 🚔 Como Participar do Interrogatório (Rodar localmente)

Para rodar a suíte de testes de ponta a ponta na sua máquina:

### Requisitos

- Node.js (>= 20)
- Garanta que o ecossistema local (via `docker-compose`) está **TOTALMENTE DE PÉ** (Frontend em `5173`, Backend em `8080`). Nós testamos um sistema vivo, não um mock estático.

### Execução

```bash
# Entre na sala de interrogatório
cd tests

# Instale os equipamentos (isso instala também os binários dos browsers do Playwright)
npm install
npx playwright install

# Inicie a bateria de testes no modo terminal (headless)
npm run test:e2e

# Quer assistir os robôs clicando na tela? (Com interface de UI)
npx playwright test --ui
```

---

## 🚫 Regras da Cena do Crime

1. **Testes Flaky são inaceitáveis:** Se um teste E2E passa na sua máquina, mas falha no CI do GitHub Actions porque "demorou pra carregar", a culpa não é da máquina virtual. O seu teste precisa usar espera explícita (`await page.waitForSelector`).
2. **Nova feature = Novo teste:** Não aceitamos código novo em rotas críticas sem a devida cobertura de testes ponta a ponta.
3. **Mantenha tudo Limpo:** Nossos scripts de teste limpam o banco de dados (geralmente criando um banco `_test`) antes e depois das operações. Nunca teste na base de dados de produção.

> *"Todo código é culpado até que meus robôs provem a sua inocência."*
