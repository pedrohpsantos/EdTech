---
title: 'Relatório de Produção (Lighthouse UX & SEO)'
---

# :material-lighthouse: Auditoria de Produção (Lighthouse)

Esta página publica o relatório HTML do **Google Lighthouse**, executado automaticamente na URL de Produção do Frontend. O Lighthouse avalia Performance, Acessibilidade, Boas Práticas e SEO.

!!! note "Testes em Produção"
    O Lighthouse roda como parte da **Matrix: Production Tests** (junto com o Smoke Test e o Teste de Carga K6), garantindo que cada novo deploy em produção passe pelos rígidos padrões de usabilidade do Google.

<div style="display: flex; justify-content: flex-end; margin-bottom: 15px;" markdown="1">
  [Abrir em Tela Cheia :material-open-in-new:](https://pedrohpsantos.github.io/EdTech/lighthouse/index.html){ .md-button target="_blank" }
</div>

<iframe id="lighthouse-frame" src="https://pedrohpsantos.github.io/EdTech/lighthouse/index.html" width="100%" height="860px" style="border:none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #fff;">
</iframe>

*(O relatório acima é gerado automaticamente pela ferramenta Google Lighthouse CLI durante o pipeline de Deploy em Produção.)*

## Como interpretar os diagnósticos

O relatório é uma fotografia de uma execução em produção. Nem todo item informativo é um defeito: um TTFB curto confirma que a origem respondeu prontamente, enquanto avisos de *unused JavaScript* indicam oportunidade de reduzir bytes na primeira tela.

- A rota pública de login mantém bibliotecas de animação fora do seu chunk inicial; elas só são carregadas nas jornadas que as utilizam.
- A animação de entrada não bloqueia a pintura do título principal, que é o elemento de LCP dessa tela.
- SVGs decorativos são ocultados da árvore de acessibilidade; controles de senha têm nome, estado e foco visível.
- CSP, HSTS, proteção contra frame e cache também são validados pelo [Contrato de Segurança da API](api_security_contract.md).

Os limites do CI continuam em `80` para Performance, Acessibilidade, Boas Práticas e SEO. Use o detalhe por recurso para orientar otimizações; não aumente um limite apenas para mascarar uma regressão.

## Histórico de Versões

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| `1.0` | 11/07/2026 | Adição do relatório de performance de produção Lighthouse | Pedro Henrique P. Santos |
| `1.1` | 14/07/2026 | Critérios de leitura e otimizações da rota pública de login | Pedro Henrique P. Santos |
