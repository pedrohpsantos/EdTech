# ADR 0012: Adoção do Firebase Hosting para o Frontend

## Status

Aceito

## Contexto

A plataforma foi dividida em um monólito modular para o backend (API) e uma aplicação SPA (Single Page Application) para o frontend (ADR 0006). Enquanto o backend precisa de processamento dinâmico e recursos computacionais em contêineres (Cloud Run - ADR 0003), o frontend gerado (construído em React/Vite) consiste apenas em arquivos estáticos (HTML, CSS e JavaScript) e não necessita de capacidade computacional contínua em servidor, pois a execução ocorre no navegador do usuário.
Hospedar arquivos estáticos em instâncias de contêiner ou máquinas virtuais introduziria sobrecarga de infraestrutura, além de não usufruir de distribuições em borda (CDN) de forma nativa e econômica.

## Decisão

Optamos por utilizar o **Firebase Hosting** como plataforma para hospedar o frontend da aplicação (SPA).

## Consequências

### Positivas

- **Distribuição Global (CDN Automática):** O Firebase armazena em cache o conteúdo estático nas bordas globais, reduzindo a latência consideravelmente, independentemente de onde o usuário (aluno/pesquisador) acessar a aplicação.
- **Certificado SSL Gratuito:** O Firebase Hosting provê o provisionamento automático de certificados SSL, dispensando operações manuais.
- **Custo Efetivo:** Para o tráfego esperado, a hospedagem de estáticos cobrirá totalmente a entrega, reduzindo severamente os custos em comparação a manter um servidor Node/Nginx rodando.
- **Integração CI/CD:** A publicação via GitHub Actions é nativamente suportada e de fácil manutenção (`action-hosting-deploy`).

### Negativas / Riscos

- **Vendor Lock-in (Ecossistema Google):** Aumenta o grau de dependência da suíte do Google (já adotada para o backend via Google Cloud). Contudo, a migração para outra CDN (ex: AWS S3+CloudFront, Cloudflare Pages ou Vercel) seria de baixíssima complexidade caso necessária no futuro.

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 01/07/2026 | Criação do documento | Pedro Henrique P. Santos |
