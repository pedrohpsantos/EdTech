# 🎨 EdTech Frontend

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS](https://img.shields.io/badge/Vanilla_CSS-3-ff69b4?style=for-the-badge&logo=css3&logoColor=white)

Interface web do EdTech — uma Single Page Application (SPA) construída com **React 19** e **Vite 8**, com estilização em Vanilla CSS para controle total sobre o design sem dependência de frameworks utilitários.

## Estrutura de Diretórios

| Diretório | Responsabilidade |
| :--- | :--- |
| `/src/components` | Componentes reutilizáveis (botões, cards, modais, layouts) |
| `/src/pages` | Páginas associadas às rotas da SPA |
| `/src/assets` | Imagens, ícones SVG e recursos estáticos |
| `/src/styles` | Variáveis globais de CSS e keyframes de animação |

---

## Setup Local

```bash
# Instale as dependências
npm install

# Configure a variável de ambiente com a URL do backend
# Crie ou edite o arquivo .env na raiz do frontend:
# VITE_API_URL=http://localhost:8080

# Inicie o servidor de desenvolvimento (com HMR)
npm run dev
```

Acesse `http://localhost:5173` após iniciar o servidor.

---

## Decisões de Design

- **Vanilla CSS:** Sem frameworks de utilitários (como Tailwind). As variáveis de design são centralizadas no `:root` do `index.css`, garantindo consistência e manutenibilidade.
- **Responsividade:** A interface é desenvolvida para funcionar corretamente em diferentes tamanhos de tela — de smartphones a monitores ultrawide.
- **Componentes reutilizáveis:** Novos elementos visuais devem verificar se já existe um componente padronizado em `/src/components` antes de criar um novo.
- **Suporte a Datasets:** Interfaces de revisão (Orientador) contam com renderização nativa de grandes volumes de dados via componente utilitário `DatasetPreview` para arquivos `.csv` e `.json`.

---

## Testes

```bash
# Testes unitários e de componente (Vitest)
npm run test

# Testes E2E (Playwright — requer backend em execução)
npm run test:e2e
```
