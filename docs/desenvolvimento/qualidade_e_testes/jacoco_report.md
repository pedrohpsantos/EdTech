---
title: 'Relatório de Cobertura (JaCoCo)'
---

# :material-shield-check: Relatório de Cobertura do Backend (JaCoCo)

Esta página publica o relatório HTML do **JaCoCo**, responsável por medir a cobertura estrutural (linhas, instruções e branches) dos testes unitários e de integração do backend.

!!! note "O que o JaCoCo mede?"
    Diferente dos testes de mutação (PiTest), o JaCoCo mede **quais linhas de código** foram executadas durante a suíte de testes do Spring Boot. A meta do projeto é manter a cobertura global acima de 80%.

<div style="display: flex; justify-content: flex-end; margin-bottom: 15px;" markdown="1">
  [Abrir em Tela Cheia :material-open-in-new:](https://pedrohpsantos.github.io/EdTech/jacoco/index.html){ .md-button target="_blank" }
</div>

<iframe id="jacoco-frame" src="https://pedrohpsantos.github.io/EdTech/jacoco/index.html" width="100%" height="860px" style="border:none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #fff;" onload="injectJacocoStyles()">
</iframe>

<script>
function injectJacocoStyles() {
    var iframe = document.getElementById('jacoco-frame');
    try {
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        var style = doc.createElement('style');
        style.innerHTML = `
            :root { color-scheme: light; }
            body {
                font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
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
            }
            table {
                width: 100% !important;
                border-collapse: separate !important;
                border-spacing: 0 !important;
                border: 1px solid #e5e7eb !important;
                border-radius: 8px !important;
                box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06) !important;
                background: #ffffff !important;
                margin-bottom: 18px !important;
            }
            thead { background: #f8fafc !important; }
            th, td {
                padding: 12px 16px !important;
                border: 0 !important;
                border-bottom: 1px solid #e5e7eb !important;
                color: #374151 !important;
                text-align: left !important;
            }
            tbody tr:last-child td { border-bottom: 0 !important; }
            tbody tr:hover { background: #f9fafb !important; }
            a { color: #2563eb !important; text-decoration: none !important; font-weight: 600 !important; }
            a:hover { text-decoration: underline !important; }
        `;
        doc.head.appendChild(style);
    } catch(e) {
        console.warn('Could not inject styles into JaCoCo iframe', e);
    }
}
</script>

*(O relatório acima é gerado automaticamente pelo pipeline de documentação.)*

## Histórico de Versões

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| `1.0` | 11/07/2026 | Criação da página de relatório JaCoCo | Pedro Henrique P. Santos |
