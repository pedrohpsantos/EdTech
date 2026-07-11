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

## Histórico de Versões

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| `1.0` | 11/07/2026 | Adição do relatório de performance de produção Lighthouse | Pedro Henrique P. Santos |
