---
title: 'Relatório de Testes de Mutação'
---

# :material-dna: Relatórios de Testes de Mutação

Esta página publica os relatórios HTML de **Testes de Mutação**, responsáveis por avaliar a efetividade dos testes automatizados inserindo "bugs" (mutações) intencionais no código para verificar se os testes falham.

!!! note "JaCoCo/Vitest e Testes de Mutação medem coisas diferentes"
    Ferramentas de cobertura tradicionais medem linhas e branches executados. Testes de mutação vão além: eles avaliam a **qualidade** da suíte de testes.

=== "Backend (PiTest)"

    <div style="display: flex; justify-content: flex-end; margin-bottom: 15px;" markdown="1">
      [Abrir em Tela Cheia :material-open-in-new:](https://pedrohpsantos.github.io/EdTech/pitest/index.html){ .md-button target="_blank" }
    </div>

    <iframe id="pitest-frame" src="https://pedrohpsantos.github.io/EdTech/pitest/index.html" width="100%" height="860px" style="border:none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #fff;" onload="injectPitestStyles()">
    </iframe>

=== "Frontend (Stryker)"

    <div style="display: flex; justify-content: flex-end; margin-bottom: 15px;" markdown="1">
      [Abrir em Tela Cheia :material-open-in-new:](https://pedrohpsantos.github.io/EdTech/stryker/index.html){ .md-button target="_blank" }
    </div>

    <iframe id="stryker-frame" src="https://pedrohpsantos.github.io/EdTech/stryker/index.html" width="100%" height="860px" style="border:none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #fff;">
    </iframe>

<script>
function injectPitestStyles() {
    var iframe = document.getElementById('pitest-frame');
    try {
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        var style = doc.createElement('style');
        style.innerHTML = `
            :root { color-scheme: light; }
            body {
                font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
                background: #ffffff !important;
                color: #202124 !important;
                margin: 0 !important;
                padding: 24px !important;
                line-height: 1.5 !important;
            }
            h1 {
                margin: 0 0 20px !important;
                color: #111827 !important;
                font-size: 1.8rem !important;
                font-weight: 750 !important;
                letter-spacing: 0 !important;
            }
            h3 {
                margin: 28px 0 12px !important;
                color: #1f2937 !important;
                font-size: 1.1rem !important;
                font-weight: 700 !important;
            }
            table {
                width: 100% !important;
                border-collapse: separate !important;
                border-spacing: 0 !important;
                overflow: hidden !important;
                border: 1px solid #e5e7eb !important;
                border-radius: 8px !important;
                box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06) !important;
                background: #ffffff !important;
                margin-bottom: 18px !important;
            }
            thead { background: #f8fafc !important; }
            th {
                padding: 12px 16px !important;
                border: 0 !important;
                border-bottom: 1px solid #e5e7eb !important;
                color: #374151 !important;
                font-size: 0.78rem !important;
                font-weight: 700 !important;
                text-align: left !important;
                text-transform: uppercase !important;
                letter-spacing: 0 !important;
                white-space: nowrap !important;
            }
            td {
                padding: 14px 16px !important;
                border: 0 !important;
                border-bottom: 1px solid #f1f5f9 !important;
                color: #374151 !important;
                font-size: 0.95rem !important;
                vertical-align: middle !important;
            }
            tbody tr:last-child td { border-bottom: 0 !important; }
            tbody tr:hover { background: #f9fafb !important; }
            a {
                color: #2563eb !important;
                font-weight: 600 !important;
                text-decoration: none !important;
            }
            a:hover { color: #1d4ed8 !important; text-decoration: underline !important; }
            .coverage_percentage {
                min-width: 42px !important;
                margin-bottom: 5px !important;
                color: #111827 !important;
                font-weight: 700 !important;
            }
            .coverage_bar {
                position: relative !important;
                height: 12px !important;
                min-width: 140px !important;
                overflow: hidden !important;
                border-radius: 999px !important;
                background: #fee2e2 !important;
                border: 1px solid #fecaca !important;
                box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.08) !important;
            }
            .coverage_complete {
                height: 100% !important;
                border-radius: 999px !important;
                background: linear-gradient(90deg, #16a34a, #22c55e) !important;
            }
            .coverage_legend {
                margin-top: 4px !important;
                color: #6b7280 !important;
                font-size: 0.78rem !important;
                font-weight: 600 !important;
            }
            ul {
                margin: 16px 0 !important;
                padding: 14px 18px 14px 34px !important;
                border: 1px solid #fde68a !important;
                border-radius: 8px !important;
                background: #fffbeb !important;
                color: #78350f !important;
            }
            hr { border: 0 !important; border-top: 1px solid #e5e7eb !important; margin: 28px 0 18px !important; }
            body > br { display: none !important; }
            body > a, body > p { color: #4b5563 !important; font-size: 0.9rem !important; }
        `;
        doc.head.appendChild(style);
    } catch(e) {
        console.warn('Could not inject styles into PiTest iframe', e);
    }
}
</script>

*(O relatorio acima e gerado automaticamente pelo pipeline de documentacao.)*

## Historico de Versoes

| Versao | Data | Descricao | Autor |
|--------|------|-----------|-------|
| `1.0` | 09/07/2026 | Criacao da pagina de relatorio de mutacao PiTest | Pedro Henrique P. Santos |
| `1.1` | 09/07/2026 | Melhoria visual do relatorio embarcado do PiTest | Pedro Henrique P. Santos |
| `1.2` | 11/07/2026 | Adicao da aba de Frontend (Stryker) | Pedro Henrique P. Santos |
