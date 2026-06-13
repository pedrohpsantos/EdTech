# Setup e Arquitetura Frontend (Vite + React)

O frontend do EdTech é construído utilizando **React** e empacotado através do **Vite**, garantindo uma experiência de desenvolvimento excepcionalmente ágil graças ao Hot Module Replacement (HMR).

## Estrutura de Diretórios

```text
frontend/
├── src/
│   ├── components/      # Componentes reutilizáveis (UI Kit)
│   ├── context/         # Contextos da aplicação (AuthContext, etc)
│   ├── hooks/           # Custom hooks (useTheme, etc)
│   ├── pages/           # Views das páginas mapeadas em rotas
│   ├── App.jsx          # Entrypoint de rotas
│   └── index.css        # Estilos globais e tokens (Design System)
├── public/              # Assets estáticos
├── index.html           # Template HTML raiz
└── vite.config.js       # Configuração do compilador e proxy
```

## Por que Vite?

Diferente do `create-react-app` ou do Webpack tradicional, o Vite não agrupa toda a aplicação para servi-la no modo de desenvolvimento. Ele serve o código fonte sobre ES Modules nativos, resultando em:
1. **Inicialização quase instantânea** do servidor local.
2. **HMR rápido**, independentemente do tamanho da aplicação.

## Fluxo de Comandos

- `npm run dev`: Inicia o servidor local de desenvolvimento. Por padrão, ele ouve na porta `5173`.
- `npm run build`: Roda o compilador Rollup (por baixo dos panos) para gerar os arquivos minificados prontos para produção na pasta `/dist`.
- `npm run preview`: Inicia um servidor simples local para testar a build gerada na pasta `/dist`.

## Proxy Reverso no Desenvolvimento

Para evitar configuração pesada de CORS apenas para rodar a aplicação em localhost, utilizamos o proxy nativo do `vite.config.js`. 
Todas as chamadas do cliente para `/api` são interceptadas pelo servidor do Vite e repassadas ao Spring Boot (`http://localhost:8080/api`).

Isso permite que você programe como se frontend e backend estivessem no mesmo domínio. Em produção (Cloud Run), regras explícitas de CORS são aplicadas.
