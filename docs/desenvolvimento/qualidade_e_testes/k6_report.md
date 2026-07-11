---
title: 'Relatório K6 (Carga)'
---

# :material-speedometer: Relatório de Testes de Carga e Stress (K6)

Abaixo você encontra o relatório interativo dos testes de carga (Load Testing) executados via **K6** contra o ambiente de Produção.

Estes testes validam a conformidade com os requisitos **RNF07** e **RNF09**, forçando concorrência (ex: 100 usuários simultâneos) e monitorando taxas de erro, métricas de hardware (quando em loop com o backend) e degradação do p(95).

<div style="display: flex; justify-content: flex-end; margin-bottom: 15px;" markdown="1">
  [Abrir Relatório K6 em Tela Cheia :material-open-in-new:](https://pedrohpsantos.github.io/EdTech/k6/index.html){ .md-button target="_blank" }
</div>

<iframe src="https://pedrohpsantos.github.io/EdTech/k6/index.html" width="100%" height="800px" style="border:none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #fff;">
  Seu navegador não suporta iframes. <a href="https://pedrohpsantos.github.io/EdTech/k6/index.html" target="_blank">Clique aqui</a> para ver o relatório.
</iframe>

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| `1.0` | 11/07/2026 | Criação da página de relatório interativo K6 | Pedro Henrique P. Santos |
