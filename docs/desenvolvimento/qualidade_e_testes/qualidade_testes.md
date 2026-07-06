---
title: 'Qualidade e Testes (JaCoCo)'
---

# :material-shield-check: Qualidade e Testes (JaCoCo)

Esta página centraliza as métricas de qualidade de código do backend.
O nosso pipeline de CI está configurado para executar os testes e extrair a cobertura usando o **JaCoCo**.

## Relatório de Cobertura (JaCoCo)

<iframe id="jacoco-frame" src="../../../jacoco/index.html" width="100%" height="800px" style="border:none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" onload="injectJacocoStyles()"></iframe>

<script>
function injectJacocoStyles() {
    var iframe = document.getElementById('jacoco-frame');
    try {
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        var style = doc.createElement('style');
        style.innerHTML = `
            body { font-family: 'Inter', system-ui, sans-serif !important; background-color: #ffffff; color: #333; padding: 20px; }
            table.coverage { width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #eaeaea; }
            table.coverage thead { background-color: #f8f9fa; color: #202124; border-bottom: 2px solid #e0e0e0; }
            table.coverage thead td { padding: 12px 16px; font-weight: 600; border: none; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px; }
            table.coverage tbody tr { border-bottom: 1px solid #f0f0f0; background: white; transition: background-color 0.2s; }
            table.coverage tbody tr:hover { background: #f8f9fa; }
            table.coverage tbody td { padding: 12px 16px; border: none; font-size: 0.95rem; color: #444; }
            a { color: #2563eb; text-decoration: none; font-weight: 500; }
            a:hover { color: #1d4ed8; text-decoration: underline; }
            img { border-radius: 3px; }
            .bar { height: 8px !important; border-radius: 4px !important; margin-top: 4px; }
            .ctr2 { font-weight: 600; color: #111; }
            .footer { margin-top: 30px; color: #888; text-align: center; font-size: 0.85em; padding-top: 15px; border-top: 1px solid #eee; }
            h1 { font-size: 1.75rem; color: #111; margin-bottom: 24px; font-weight: 700; letter-spacing: -0.5px; }
            .breadcrumb { margin-bottom: 20px; font-size: 0.95em; color: #666; background: #f8f9fa; padding: 10px 15px; border-radius: 6px; }
            .breadcrumb a { color: #2563eb; }
        `;
        doc.head.appendChild(style);
    } catch(e) {
        console.warn('Could not inject styles into JaCoCo iframe', e);
    }
}
</script>

*(O relatório acima é gerado automaticamente pelo pipeline de CI/CD)*


## Histórico de Versões

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| `1.0` | 28/06/2026 | Criação e estruturação do documento | Pedro Henrique P. Santos |
| `1.1` | 04/07/2026 | Revisão profunda, correção de metadados e melhorias visuais | Pedro Henrique P. Santos |


