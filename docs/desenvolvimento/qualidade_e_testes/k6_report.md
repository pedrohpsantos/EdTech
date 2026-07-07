---
title: 'Relatório K6 (Carga)'
---

# :material-speedometer: Relatório de Testes de Carga e Stress (K6)

Abaixo você encontra o relatório interativo dos testes de carga (Load Testing) executados via **K6** contra o ambiente de Produção.

Estes testes validam a conformidade com os requisitos **RNF07** e **RNF09**, forçando concorrência (ex: 100 usuários simultâneos) e monitorando taxas de erro, métricas de hardware (quando em loop com o backend) e degradação do p(95).

<div style="margin-top: 20px; margin-bottom: 20px; text-align: center;">
  <a href="../../../k6/index.html" target="_blank" class="md-button md-button--primary">
    :material-open-in-new: Abrir Relatório K6 em Tela Cheia
  </a>
</div>

<iframe src="../../../k6/index.html" width="100%" height="800px" style="border:none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #fff;">
  Seu navegador não suporta iframes. <a href="../../../k6/index.html" target="_blank">Clique aqui</a> para ver o relatório.
</iframe>
