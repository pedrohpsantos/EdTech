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

## Cenário e limites

O cenário mantém a mesma janela curta de carga para não pressionar produção além do necessário. Ele simula usuários em rampa e mede, na mesma execução, `health`, login inválido, cadastro e recuperação de senha. As chamadas que podem receber limitação legítima (`429`) ou indisponibilidade transitória durante cold start (`503` no health) são tratadas como comportamento esperado, não como falso erro.

Além do p95 global, o relatório segmenta p95 por endpoint: saúde até 500 ms, login até 750 ms e cadastro/recuperação até 900 ms. A taxa técnica de falhas HTTP deve permanecer abaixo de 1%. Assim, uma degradação localizada aparece no relatório sem aumentar duração, VUs ou volume de dados criados.

## Histórico de Versões

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| `1.0` | 11/07/2026 | Criação da página de relatório interativo K6 | Pedro Henrique P. Santos |
| `1.1` | 14/07/2026 | Métricas por endpoint e limiares de confiabilidade | Pedro Henrique P. Santos |
